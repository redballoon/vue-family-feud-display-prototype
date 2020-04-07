<script>
import Score from '@/components/board/board-score.vue';
import Question from '@/components/board/board-question.vue';
import AnswerList from '@/components/board/board-answer-list.vue';

export default {
	name: 'board-view',

	props: ['data', 'teams'],

	components: {
		score: Score,
		question: Question,
		answerList: AnswerList,
	},
};
</script>

<template lang="html">
	<div class="board-view">

		<div class="bg-container">
			<div class="bg-image"></div>
		</div>

		<div class="title-container c-margin-bottom-1">
			<h2 class="title title-box">Round #{{ data.round }}</h2>
		</div>

		<div class="score-container c-margin-bottom-1">
			<score :value="data.finalscore" size="large" />

			<h3 class="multiplier title-box">{{ `x${data.multiplier}` }}</h3>
		</div>

		<div class="question-container c-margin-bottom-1">
			<question :question="data.question" />
		</div>

		<div class="answer-list-container c-margin-bottom-1">
			<answerList :list="data.answers"/>
		</div>

		<div class="team-a team-score-container">
			<div class="wrapper">
				<h3 class="title title-box">Team A</h3>
				<score :value="teams.teamMap['team-a'].score" />
			</div>
		</div>

		<div class="team-b team-score-container">
			<div class="wrapper">
				<h3 class="title title-box">Team B</h3>
				<score :value="teams.teamMap['team-b'].score" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables';
@import '@/styles/_mixins';

.board-view {
	width: 100%;
	height: 100%;
	padding: 0 15%;
	text-align: center;
	color: #fff;

	position: relative;

	.title-box {
		color: #fff;
		background-color: #003c7b;
		padding: rem-calc(10px);
		border: 2px solid #fff;
	}

	& > div:not(.bg-container):not(.team-score-container) {
		position: relative;
	}

	.bg-container {
		.bg-image {
			border-radius: 50%;
			border: 5px solid #003c7b;
			background: #0C4779 url('~@/assets/family-feud-bg.svg') repeat center center;

			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}

	.title-container {

	}

	.score-container .score {
		margin: 0 auto;
	}

	.multiplier {
		max-width: 75px;
		margin: 0 auto;
		font-size: 24px;
		@include gloss-gradient;

		position: absolute;
		left: calc(50% + 84px + 20px);
		top: 0;
	}

	// .score-container .multiplier-box {
	// 	position: absolute;
	// 	top: 0;
	// 	width: 45px;
	// 	height: 45px;
	// 	padding: rem-calc(10px);
	// }

	.team-score-container {
		position: absolute;
		top: 0;
		bottom: 0;
		height: rem-calc(94px);
		margin: auto 0;

		&.team-a {
			left: 1%;
		}

		&.team-b {
			right: 1%;
		}
	}
}
</style>
