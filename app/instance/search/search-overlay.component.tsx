import * as React from 'react';
import {AppResultsComponent} from './results/app-results.component';
import {MarketResultsComponent} from './results/market.results.component';

interface props {
	search: any;
	hideSearchOverlay();
	requestSearch(page?: number);
	requestLoginSSH(app: any, appInstance: number);
	requestLogStream(app: any);
	requestFetchPurchasePlans(service: any, page?: number);
}

export class SearchOverlayComponent extends React.Component<props, any> {

	refs: {
		searchInput: HTMLInputElement
	};

	constructor(props, context) {
		super(props, context);

		this._hideSearchOverlay = this._hideSearchOverlay.bind(this);
		this._requestSearch = this._requestSearch.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		nextProps.search.showSearchOverlay ? this._searchFocus() : null;
	}

	_searchFocus() {
		setTimeout(() => this.refs.searchInput.focus(), 500);
	}

	_hideSearchOverlay() {
		this.props.hideSearchOverlay();
	}

	_requestSearch(event) {
		if (event.target.value.length === 0) {
			return;
		}
		this.props.requestSearch(event.target.value);
	}

	render() {
		return (
			<div>
				<div className={this.props.search.showSearchOverlay ? 'morphsearch open' : 'morphsearch'}>
					<form className="morphsearch-form">
						<input ref="searchInput"
									 className="morphsearch-input"
									 type="search"
									 placeholder="Search..."
									 onChange={this._requestSearch}/>
					</form>
					<div className="morphsearch-content">
						<AppResultsComponent search={this.props.search}
																 hideSearchOverlay={this.props.hideSearchOverlay}
																 requestLoginSSH={this.props.requestLoginSSH}
																 requestLogStream={this.props.requestLogStream}/>
						<MarketResultsComponent search={this.props.search}
																		requestFetchPurchasePlans={this.props.requestFetchPurchasePlans}
																		hideSearchOverlay={this.props.hideSearchOverlay}/>
					</div>
					<span className="morphsearch-close" onClick={this._hideSearchOverlay}/>
				</div>
			</div>
		)
	}
}
