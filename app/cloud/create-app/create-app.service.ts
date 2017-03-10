import {remote} from 'electron';
import * as tmp from 'tmp';
import {stat, createWriteStream} from 'fs';
import {join} from 'path';
import * as uuidV4 from 'uuid/v4';
import * as gitIgnore from 'parse-gitignore';
import * as archiver from 'archiver';
import * as CF from 'cf-nodejs-client';

export function selectDirectory() {
  return new Promise((resolve, reject) => {
    remote.dialog.showOpenDialog({properties: ['openDirectory']}, (filePath) => {
      !!filePath && filePath.length > 0 ? resolve(filePath[0]) : reject();
    });
  });
}

export function createTmpDir() {
  return new Promise((resolve, reject) => {
    tmp.dir({unsafeCleanup: true}, (err, tmpDir, cleanup) => {
      err ? reject(err) : resolve({tmpDir, cleanup});
    });
  });
}

export function getCfignoreGlobs(targetDirectory) {
  return new Promise(resolve => {
    let ignoreFile = join(targetDirectory, '.cfignore');
    stat(ignoreFile, err => {
      err ? resolve([]) : resolve(gitIgnore(ignoreFile, {cache: false}));
    })
  });
}

export function zipFolder(tmpDir, targetDirectory, ignoreGlobs) {
  return new Promise((resolve, reject) => {
    let zipFile = join(tmpDir, `${uuidV4()}.zip`);
    let output = createWriteStream(zipFile);
    let archive = archiver('zip', {store: true});

    archive.on('error', err => reject(err));
    output.on('close', () => resolve(zipFile));

    archive.pipe(output);

    archive.glob('**/*', {
      cwd: targetDirectory,
      ignore: ignoreGlobs
    });

    archive.finalize();
  });
}

export function createApp(settings, app) {
  let Apps = new CF.Apps(settings.cfInstance);
  Apps.setToken(settings.token);

  return Apps.add(app);
}

export function uploadAppBits(settings, app, zipFile) {
  let Apps = new CF.Apps(settings.cfInstance);
  Apps.setToken(settings.token);

  return Apps.upload(app.metadata.guid, zipFile, true);
}

export function startApp(settings, app) {
  let Apps = new CF.Apps(settings.cfInstance);
  Apps.setToken(settings.token);

  return Apps.start(app.metadata.guid);
}

export function hasJobCompleted(settings, job) {
  let Jobs = new CF.Jobs(settings.cfInstance);
  Jobs.setToken(settings.token);

  return Jobs.getJob(job.entity.guid);
}
