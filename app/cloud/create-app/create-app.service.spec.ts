import * as sinon from 'sinon';
import * as CF from 'cf-nodejs-client';
import {createApp} from './create-app.service';

describe('Create App Service', () => {

  describe('createApp()', () => {
    let appsStub;
    let setTokenStub;
    let addStub;

    beforeEach(() => {
      setTokenStub = sinon.spy();
      addStub = sinon.spy();
      appsStub = sinon.stub(CF, 'Apps', () => {
        return {
          setToken: setTokenStub,
          add: addStub
        }
      });
    });

    afterEach(() => {
      appsStub.restore();
    });

    it('should initialize a new app', () => {
      let settings = {cfInstance: 'test.cloud.com', token: 'abc123'};
      let app = {name: 'newApp'};

      createApp(settings, app);

      appsStub.calledOnce.should.equal(true);
      setTokenStub.calledOnce.should.equal(true);
      addStub.calledOnce.should.equal(true);

      sinon.assert.calledWith(appsStub, settings.cfInstance);
      sinon.assert.calledWith(setTokenStub, settings.token);
      sinon.assert.calledWith(addStub, app);
    });
  });
});
