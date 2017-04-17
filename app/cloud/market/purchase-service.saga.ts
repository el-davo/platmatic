import {takeEvery, delay} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {REQUEST_PURCHASE_SERVICE} from '../../instance/market/market.action-types';
import {showPurchaseCompleteScreen} from '../../instance/market/market.actions';
import {purchaseService, fetchServiceInstance} from './market.service';
import {SettingsState} from "../../settings/settings.state";

function* purchase({name, spaceGuid, planGuid}) {
	try {
		let settings: SettingsState = yield select((state: any) => state.settings);

		let service = yield call(purchaseService, settings.activeInstance, name, spaceGuid, planGuid);

		yield put(showPurchaseCompleteScreen());

		for (let i = 0; i < 20; i++) {
			yield call(delay, 5000);

			let instance = yield call(fetchServiceInstance, settings.activeInstance, service.body.metadata.guid);

			if (instance.entity.last_operation.state === 'failed') {
				toastr.error('Error', 'Failed to provision service');
				throw new Error('Provisioning service failed');
			}

			if (instance.entity.last_operation.state === 'succeeded') {
				break;
			}
		}

		toastr.success('Success', 'Service has been provisioned');

	} catch (e) {
		console.log(e);
	}
}

export function* purchaseServiceSaga() {
	yield* takeEvery(REQUEST_PURCHASE_SERVICE, purchase);
}
