<script>
import isEmpty from 'lodash/isEmpty';

import SheetService from '@/services/Sheet';

import BoardView from '@/components/board/board-view.vue';

// TEMP: For quick easy changing on main event, update .env.example file
/* eslint-disable no-unused-vars */
const { VUE_APP_SHEET_DRY_RUN } = process.env;
const { VUE_APP_SHEET_SESSION_1 } = process.env;
const { VUE_APP_SHEET_SESSION_2 } = process.env;
/* eslint-enable no-unused-vars */


export default {
	name: 'board-page',

	data: () => ({
		initialLoad: true,
		data: {},
	}),

	computed: {
		hasData() {
			return !isEmpty(this.data);
		},

		current() {
			if (!this.hasData) {
				return {};
			}

			if (!this.data.rounds.selected) {
				// eslint-disable-next-line no-console
				console.error('current: no current round selected.');
				return {};
			}

			return this.data.rounds.roundMap[this.data.rounds.selected];
		},
	},

	methods: {
		async initialize() {
			this.loader = this.$buefy.loading.open();

			const results = await this.getState();

			if (!results) {
				this.loader.close();
				this.$buefy.toast.open('Whoops! something failed.');
				return false;
			}

			this.initialLoad = false;

			this.loader.close();

			// temp
			window.refresh = () => this.getState();

			return true;
		},

		async getState() {
			const results = await SheetService.getSheet(VUE_APP_SHEET_SESSION_1);

			if (!results) {
				// eslint-disable-next-line no-console
				console.error('getState: failed');
				return false;
			}

			this.data = results;

			return true;
		},
	},

	mounted() {
		this.initialize();
	},

	components: {
		'board-view': BoardView,
	},
};
</script>

<template>
	<div class="page-board page">

		<board-view v-if="!initialLoad && hasData" :data="current" :teams="data.team"></board-view>

	</div>
</template>

<style lang="scss">
	.page-board {
		background: #a7cfdf;
		background: -moz-linear-gradient(top, #a7cfdf 0%, #23538a 100%);
		background: -webkit-linear-gradient(top, #a7cfdf 0%, #23538a 100%);
		background: linear-gradient(to bottom, #a7cfdf 0%, #23538a 100%);

		padding: 25px;
	}

	.sandbox {
		width: 100%;
		height: 100%;
	}
</style>
