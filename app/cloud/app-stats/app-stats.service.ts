import {get} from 'request';

export function fetchAppSummary({cfInstance, token}, guid) {
  return new Promise((resolve, reject) => {
    get(`${cfInstance}/v2/apps/${guid}/summary`, {
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`
      },
      rejectUnauthorized: false,
      json: true
    }, (err, response, body) => {
      err ? reject(err) : resolve(body);
    });
  });
}

export function fetchAppStats({cfInstance, token}, guid) {
  return new Promise((resolve, reject) => {
    get(`${cfInstance}/v2/apps/${guid}/stats`, {
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`
      },
      rejectUnauthorized: false,
      json: true
    }, (err, response, body) => {
      err ? reject(err) : resolve(body);
    });
  });
}

export function fetchAppEnvironmentVariables({cfInstance, token}, guid) {
  return new Promise((resolve, reject) => {
    get(`${cfInstance}/v2/apps/${guid}/env`, {
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`
      },
      rejectUnauthorized: false,
      json: true
    }, (err, response, body) => {
      err ? reject(err) : resolve(body);
    });
  });
}

export function fetchAppServiceBindings({cfInstance, token}, guid) {
  return new Promise((resolve, reject) => {
    get(`${cfInstance}/v2/apps/${guid}/service_bindings`, {
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`
      },
      qs: {
        'inline-relations-depth': 2
      },
      rejectUnauthorized: false,
      json: true
    }, (err, response, body) => {
      err ? reject(err) : resolve(body);
    });
  });
}
