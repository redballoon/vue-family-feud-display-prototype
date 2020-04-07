// Not Used. Ignore.


/* eslint-disable class-methods-use-this, no-param-reassign */

// @todo: change to singleton/parser
export const DataParser = {
	parse(data) {
		const keyList = this.getKeys(data.keys);
		const valueList = this.getValues(data);
		const kvMap = this.getKVMap(keyList, valueList);

		return {
			...kvMap,
			primary: data.primary,
		};
	},

	getKeys(keyStr) {
		const keys = keyStr.split(',');
		const keysTrimmed = keys.map(key => key.trim());

		return keysTrimmed;
	},

	getValues(data) {
		const valueKeys = Object.keys(data).filter(key => key.indexOf('value') > -1);
		const valueList = valueKeys.map(key => data[key]);

		return valueList;
	},

	getKVMap(keyList, valueList) {
		const kvMap = keyList.reduce((map, key, idx) => {
			if (key !== 'na') {
				map[key] = valueList[idx];
			}
			return map;
		}, {});

		return kvMap;
	},
};

export const RoundSheetHelper = class RoundSheetHelper {
	constructor(data) {
		this.initialize(data);
	}

	initialize(data) {
		const filteredEntries = this.getElements(data.elements);
		const elementList = this.getElementList(filteredEntries);
		const elementMap = this.getElementMap(elementList);
		// /\r?\n|\r/g

		Object.assign(this, {
			elementMap,
		});
	}

	getElements(elements) {
		return elements.filter(element => element.primary && element.keys);
	}

	getElementList(elements) {
		return elements.map(element => DataParser.parse(element));
	}

	getElementMap(elementList) {
		return elementList.reduce((map, element) => {
			if (element.primary === 'answer') {
				map.answers.push(element);
			} else {
				map[element.primary] = element;
			}

			return map;
		}, {
			answers: [],
		});
	}
};


export const SheetHelper = class SheetHelper {
	constructor(data) {
		// this.data = data;
		// this.rounds = null;
		// this.tabletop = null;
		this.initialize(data);
	}

	initialize(data) {
		// !! big assumption
		const defaultSheet = data.main;

		if (!defaultSheet) {
			// eslint-disable-next-line no-console
			console.error('SheetHelper: init: was expecting first sheet to be "meta"');
			return false;
		}

		const { tabletop } = defaultSheet;
		const sheetList = tabletop.foundSheetNames;

		const roundSheetList = this.getSheetList(sheetList, 'round'); // sheetListForRounds
		const roundSheets = this.getSheetMap(roundSheetList, data);
		const roundHelper = this.getRoundsHelper(roundSheetList, roundSheets);


		Object.assign(this, {
			sheetList,
			roundSheetList,
			roundSheets,
			roundHelper,
			data,
		});

		return true;
	}

	getSheetList(sheetList, findName) {
		return sheetList.filter(name => name.indexOf(findName) > -1);
	}

	getSheetMap(sheetList, data) {
		return sheetList.reduce((map, key) => {
			map[key] = data[key];
			return map;
		}, {});
	}

	getRoundsHelper(roundSheetList, roundSheets) {
		return roundSheetList.reduce((map, key) => {
			map[key] = new RoundSheetHelper(roundSheets[key]);
			return map;
		}, {});
	}

	// setTableTop() {
	//   this.tabletop = this.data.meta.tabletop;
	// }

	// setHelpers() {
	//   const { foundSheetNames } = this.tabletop;
	//
	//   this.rounds = new RoundsHelper(foundSheetNames, this.data);
	// }
};
/* eslint-enable class-methods-use-this, no-param-reassign */
