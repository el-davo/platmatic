import * as React from 'react';
import SidebarContainer from './sidebar.container';
import AppInitContainer from './app-init.container';
import SearchOverlayContainer from '../instance/search/search-overlay.container';
import SshContainer from '../instance/ssh/ssh.container';
import LogsContainer from '../instance/logs/logs.container';
import CreateAppFloatingButtonContainer from '../instance/create-app/floating-button/create-app-floating-button.container';
import CreateAppModalContainer from '../instance/create-app/create-app-modal.container';
import PurchaseContainer from '../instance/market/purchase/purchase.container';

const style = {
	container: {
		width: '100%',
		tableLayout: 'fixed'
	},
	sidebar: {
		width: 160,
		minWidth: 160
	},
	content: {
		marginRight: 10
	}
};

export class LayoutComponent extends React.Component<any, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div>
				{
					this.props.settings.isLoggedIn ? (
							<table style={style.container}>
								<tbody>
								<tr>
									<td style={style.sidebar}>
										<SidebarContainer />
									</td>
									<td>
										<div style={style.content} className="box">
											<SearchOverlayContainer />
											<SshContainer />
											<LogsContainer />
											<CreateAppFloatingButtonContainer />
											<PurchaseContainer />
											{
												this.props.createApp.showCreateAppDialog ? (
														<CreateAppModalContainer />
													) : (
														<div/>
													)
											}
											{this.props.children}
										</div>
									</td>
								</tr>
								</tbody>
							</table>
						) : (
							<AppInitContainer />
						)
				}
			</div>
		)
	}
}
