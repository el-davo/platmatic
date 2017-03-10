import {filter} from 'async';

export function searchApps(appsCache, searchTerm) {

	return new Promise((resolve, reject) => {
		filter(appsCache, ({entity: {name}}, callback) => {
			callback(null, name.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1)
		}, (err, results) => {
			err ? reject(err) : resolve(results);
		});
	});
}

export function searchMarket(marketCache, searchTerm) {

	return new Promise((resolve, reject) => {
		filter(marketCache, ({entity: {label}}, callback) => {
			callback(null, label.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1)
		}, (err, results) => {
			err ? reject(err) : resolve(results);
		});
	});
}
