import {buffers, eventChannel, END} from 'redux-saga';
import CF from 'cf-nodejs-client';

import {updateQuota} from '../../instance/spaces/quota/quota.actions';

const bufferLimit = 1000;

export function fetchQuotas(settings, organization_guid, buffer = buffers.sliding(bufferLimit)) {

  return eventChannel(emitter => {

    let SpacesQuota = new CF.SpacesQuota(settings.cfInstance);
    SpacesQuota.setToken(settings.token);

    SpacesQuota.getQuotaDefinitions()
      .then(result => {
        //emitter(updateSpaces(result.resources));
        emitter(END);
      })
      .catch(err => {
        emitter(END);
      });

    return () => {
    };
  }, buffer);

}
