import {buffers, eventChannel, END} from 'redux-saga';
import {get} from 'request';

export function fetchOrganizations({cfInstance, token}) {
  return new Promise((resolve, reject) => {
    get(`${cfInstance}/v2/organizations`, {
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
        Accept: "application/json"
      },
      json: true,
      rejectUnauthorized: false
    }, (err, response, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

export function fetchOrganizationSummary({cfInstance, token}, organization_guid) {
  return new Promise((resolve, reject) => {
    get(`${cfInstance}/v2/organizations/${organization_guid}/summary`, {
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
        Accept: "application/json"
      },
      json: true,
      rejectUnauthorized: false
    }, (err, response, data) => {
      err ? reject(err) : resolve(data);
    });
  });

}
