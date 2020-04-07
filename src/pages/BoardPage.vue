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
/*
	v-if="flags.hasRoundMap"
<section class="section">
	<div class="container">

		<h2 class="title">Round #{{roundNum}}</h2>

		<div class="multiplier-container">
			<div class="tag is-success is-large">x{{roundMap.elementMap.meta.multiplier}}</div>
		</div>

		<div class="question-container">
			<h1 class="title">{{roundMap.elementMap.question.question}}</h1>
		</div>

		<!-- <h1 class="title">Section</h1>
		<h2 class="subtitle">a simple container</h2> -->
		<div class="board-view__entries">
			<div class="columns">

				<div class="entry-container column is-6"
					v-for="answer in roundMap.elementMap.answers"
					v-bind:key="answer.id">

					<div class="entry" v-if="!answer.skip">

						<div class="entry__hidden" v-if="!answer.show"></div>

						<div class="entry__visible">
							<div class="columns">
								<div class="column is-7">
									{{ answer.answer }}
								</div>

								<div class="column">
									{{ answer.points }}
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>


		<div class="sandbox">
			<board-view></board-view>
		</div>
	</div>
</section>
*/
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
