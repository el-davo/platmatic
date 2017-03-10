import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SearchOverlayComponent} from './search-overlay.component';
import * as searchActions from './search.actions';
import * as sshActions from '../../instance/ssh/ssh.actions';
import * as logsActions from '../../instance/logs/logs.actions';
import * as marketActions from '../../instance/market/market.actions';

export const SearchOverlayContainer = (props) => {

  return (
    <SearchOverlayComponent search={props.search}
                            hideSearchOverlay={props.actions.hideSearchOverlay}
                            requestSearch={props.actions.requestSearch}
                            requestLoginSSH={props.actions.requestLoginSSH}
                            requestLogStream={props.actions.requestLogStream}
                            requestFetchPurchasePlans={props.actions.requestFetchPurchasePlans}/>
  );
};

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...searchActions, ...sshActions, ...logsActions, ...marketActions}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchOverlayContainer);
