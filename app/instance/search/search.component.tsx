import * as React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchIcon from 'material-ui/svg-icons/action/search';

const style = {
	marginLeft: 25
};

interface props {
	search: any;
	showSearchOverlay();
	requestSearchCache(page?: number);
}

export class SearchComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._getCachedData = this._getCachedData.bind(this);
		this._showSearchOverlay = this._showSearchOverlay.bind(this);
	}

	componentDidMount() {
		this._getCachedData();
	}

	_getCachedData() {
		this.props.requestSearchCache();
	}

	_showSearchOverlay() {
		this.props.showSearchOverlay();
	}

	render() {
		return (
			<div>
				<FloatingActionButton secondary={true} style={style} onClick={this._showSearchOverlay}>
					<SearchIcon />
				</FloatingActionButton>
			</div>
		)
	}
}
