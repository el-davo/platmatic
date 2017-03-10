import {fork} from 'redux-saga/effects';
import {loginSaga} from './settings/saga/login.saga';
import {logoutSaga} from './settings/saga/logout-saga';
import {getSettingsSaga} from './settings/saga/get-settings.saga';
import {fetchOrganizationsSaga} from './cloud/organizations/fetch-organizations.saga';
import {fetchOrganizationSummarySaga} from './cloud/organizations/fetch-organization-summary.saga';
import {fetchSpacesSaga} from './cloud/spaces/fetch-spaces.saga';
import {fetchQuotasSaga} from './cloud/spaces/fetch-quota.saga';
import {appsSaga} from './cloud/apps/apps.saga';
import {appStartSaga} from './cloud/apps/app-start.saga';
import {appStopSaga} from './cloud/apps/app-stop.saga';
import {appDeleteSaga} from './cloud/apps/app-delete.saga';
import {searchSaga} from './cloud/search/search.saga';
import {fetchStatsSaga} from './cloud/stacks/fetch-stacks.saga';
import {fetchEventsSaga} from './cloud/events/fetch-events.saga';

// Stats
import {appStatsSaga} from './cloud/app-stats/app-stats.saga';
import {refreshAppStatsSaga} from './cloud/app-stats/refresh-app-stats.saga';
import {scaleAppSaga} from './cloud/app-stats/scale-app.saga';

// Service Instances
import {fetchServiceInstancesSaga} from './cloud/service-instances/fetch-service-instances.saga';

// SSH
import {sshLoginSaga} from './cloud/ssh/ssh-login.saga';

// Create App Form
import {selectTargetDirectorySaga} from './cloud/create-app/select-target-directory.saga';
import {createAppGetModalDataSaga} from './cloud/create-app/modal/create-app-get-modal-data.saga';
import {createAppSaga} from './cloud/create-app/create-app.saga';

// Logs
import {logsSaga} from './cloud/logs/logs.saga';

// Token
import {refreshTokenSaga} from './cloud/token/refresh-token.saga';

// Market
import {fetchMarketAssetsSaga} from './cloud/market/fetch-market-assets.saga';
import {fetchPurchaseInfoSaga} from './cloud/market/fetch-purchase-info.saga';
import {fetchPurchaseSpacesSaga} from './cloud/market/fetch-purchase-spaces.saga';
import {purchaseServiceSaga} from './cloud/market/purchase-service.saga';

// Users
import {fetchUsersSaga} from './cloud/users/fetch-users.saga';

// Search cache
import {searchCacheSaga} from './cloud/search/cache/search-cache.saga';

export default function* rootSaga() {
  yield [
    fork(loginSaga),
    fork(logoutSaga),
    fork(getSettingsSaga),
    fork(fetchOrganizationsSaga),
    fork(fetchOrganizationSummarySaga),
    fork(fetchSpacesSaga),
    fork(fetchQuotasSaga),
    fork(appsSaga),
    fork(appStartSaga),
    fork(appStopSaga),
    fork(appDeleteSaga),
    fork(searchSaga),
    fork(fetchStatsSaga),
    fork(fetchEventsSaga),

    // Stats
    fork(appStatsSaga),
    fork(refreshAppStatsSaga),
    fork(scaleAppSaga),

    // Service Instances
    fork(fetchServiceInstancesSaga),

    // SSH
    fork(sshLoginSaga),

    // Create App Form
    fork(selectTargetDirectorySaga),
    fork(createAppGetModalDataSaga),
    fork(createAppSaga),

    // Logs
    fork(logsSaga),

    // Token
    fork(refreshTokenSaga),

    // Market
    fork(fetchMarketAssetsSaga),
    fork(fetchPurchaseInfoSaga),
    fork(fetchPurchaseSpacesSaga),
    fork(fetchPurchaseSpacesSaga),
    fork(purchaseServiceSaga),

    // Users
    fork(fetchUsersSaga),

    // Search cache
    fork(searchCacheSaga)
  ];
}
