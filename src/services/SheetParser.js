/*
 * Sheet Parser
 * Expects a very specific structure in the Google sheet data response.
 * Will do some data massaging to make it easier for Vue to ingest.
 */

// TODO: Document individual methods.

/* eslint-disable class-methods-use-this, no-param-reassign */
const SheetParser = {
	parse(data) {
		// NOTE: We are making a big assumption here.
		const FIRST_SHEET_NAME = 'teams';

		const defaultSheet = data[FIRST_SHEET_NAME];

		if (!defaultSheet) {
			// eslint-disable-next-line no-console
			console.error('parse: was expecting first sheet to be:', FIRST_SHEET_NAME);
			return false;
		}

		const { tabletop } = defaultSheet;

		const teamMap = this.getTeamMap(data.teams);
		const roundMap = this.getRoundMetaMap(data.meta);

		const sheetList = tabletop.foundSheetNames;
		const roundSheetList = this.getSheetList(sheetList, 'round'); // sheetListForRounds
		const roundSheets = this.getSheetData(roundSheetList, data);
		// const roundHelper = this.getRoundsHelper(roundSheetList, roundSheets);

		this.updateRoundMapWithAnswers(roundMap, roundSheets);

		if (!teamMap || !roundMap) {
			// eslint-disable-next-line no-console
			console.error('parse: unable to parse sheets', teamMap, roundMap);
			return false;
		}

		return {
			team: teamMap,
			rounds: roundMap,
			// roundSheets,
		};
	},

	getMapFromList(list, key) {
		return list.reduce((map, entry) => {
			map[entry[key]] = entry;
			return map;
		}, {});
	},

	getTeamMap(data) {
		if (!data || !data.elements) {
			// eslint-disable-next-line no-console
			console.error('getTeamMap: unable to find data', data);
			return false;
		}

		const teamMap = this.getMapFromList(data.elements, 'team');
		const orderByName = Object.keys(teamMap);

		return {
			orderByName,
			teamMap,
		};
	},

	getRoundMetaMap(data) {
		if (!data || !data.elements) {
			// eslint-disable-next-line no-console
			console.error('getMetaMap: unable to find data', data);
			return false;
		}

		const roundMap = this.getMapFromList(data.elements, 'round');
		const orderByName = Object.keys(roundMap);
		const filterSelected = data.elements.filter(entry => entry.selected);
		const selected = filterSelected.length ? filterSelected[0].round : false;

		return {
			roundMap,
			orderByName,
			selected,
		};
	},

	getSheetList(sheetList, findName) {
		return sheetList.filter(name => name.indexOf(findName) > -1);
	},

	getSheetData(sheetList, data) {
		return sheetList.reduce((map, key) => {
			map[key] = data[key];
			return map;
		}, {});
	},

	updateRoundMapWithAnswers(rounds, roundSheets) {
		rounds.orderByName.forEach((key) => {
			const name = `round-${key}`;
			const map = rounds.roundMap[key];
			const sheet = roundSheets[name];

			// ignore the sudden death rounds
			if (sheet) {
				map.name = name;
				map.answers = sheet.elements;
			}
		});
	},
};

export {
	SheetParser,
	SheetParser as default,
};
