import Sheet from 'tabletop';

// import { SheetHelper } from './SheetHelper';
import { SheetParser } from './SheetParser';


export default {
	async getSheet(id) {
		let error;

		// eslint-disable-next-line no-return-assign
		const errorHandler = e => (error = e) && false;

		// get sheet data
		const results = await Sheet.init({
			key: id, // `https://docs.google.com/spreadsheets/d/${SHEET_ID}/pubhtml`,
			prettyColumnNames: false,
		}).catch(errorHandler);

		// handle if request fails
		if (!results) {
			// eslint-disable-next-line no-console
			console.error('getSheet: failed', id, error);
			return false;
		}

		const parsed = SheetParser.parse(results);

		// eslint-disable-next-line no-console
		console.log('getSheet: done', results, parsed);

		return parsed;
	},

	// async getSheetTest(id) {
	// 	const cache = window.localStorage.getItem(`sheet-${id}`);
	//
	// 	if (cache) {
	// 		const parsed = JSON.parse(cache);
	// 		console.warn('getSheet: from cache', parsed);
	// 		return parsed;
	// 	}
	//
	// 	const results = await this.getSheetRequest(id);
	//
	// 	// window.localStorage.setItem(`sheet-${id}`, JSON.stringify(results));
	//
	// 	return results;
	// },
};
