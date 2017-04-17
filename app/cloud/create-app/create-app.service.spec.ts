import * as sinon from 'sinon';
import * as CF from 'cf-nodejs-client';
import {createApp} from './create-app.service';
import {Instance} from "../../settings/settings.state";
import {Token} from "../user/token.interface";

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
      let instance = {cfInstance: 'test.cloud.com', token: {access_token: 'abc123'} as Token} as Instance;
      let app = {name: 'newApp'};

      createApp(instance, app);

      appsStub.calledOnce.should.equal(true);
      setTokenStub.calledOnce.should.equal(true);
      addStub.calledOnce.should.equal(true);

      sinon.assert.calledWith(appsStub, instance.cfInstance);
      sinon.assert.calledWith(setTokenStub, instance.token);
      sinon.assert.calledWith(addStub, app);
    });
  });
});
