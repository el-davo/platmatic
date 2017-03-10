import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme  from 'material-ui/styles/getMuiTheme';
import ReduxToastr from 'react-redux-toastr';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import './app.global.css';
import routes from './routes';
import {configureStore} from './store/configureStore';
import theme from './theme/themeLight';
import {zIndex} from './theme/theme-z-indexes';
import {CredentialsDialogContainer} from './settings/credentialsDialog.container';

injectTapEventPlugin();

const store = configureStore.configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
	<MuiThemeProvider muiTheme={getMuiTheme(theme, zIndex)}>
		<Provider store={store}>
			<div>
				<CredentialsDialogContainer />
				<Router history={history} routes={routes}/>
				<ReduxToastr
					timeOut={3000}
					newestOnTop={false}
					position="bottom-left"/>
			</div>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root')
);
