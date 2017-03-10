import * as React from 'react';
import * as ReactPaginate from 'react-paginate';

interface props {
	apps: any;
	space_guid: string;
	goToPage(page: number);
	fetchApps(apce_guid: string);
}

export class AppsPaginationComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._updatePage = this._updatePage.bind(this);
	}

	_updatePage({selected}) {
		this.props.goToPage(++selected);
		this.props.fetchApps(this.props.space_guid);
	}

	render() {
		return (
			<div>
				{
					this.props.apps.result.total_pages > 1 ? (
							<div style={{textAlign: 'center'}}>
								<ReactPaginate pageCount={this.props.apps.result.total_pages || 0}
															 onPageChange={this._updatePage}
															 containerClassName="pagination"
															 activeClassName="pagination-active"
															 pageLinkClassName="pagination-link"
															 previousLinkClassName="pagination-prev"
															 nextLinkClassName="pagination-next"
															 nextLabel=">"
															 previousLabel="<"
															 initialPage={this.props.apps.page - 1}
															 pageRangeDisplayed={10}
															 marginPagesDisplayed={10}/>
							</div>
						) : (
							<div />
						)
				}
			</div>
		)
	}
}
