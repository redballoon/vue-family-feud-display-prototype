<script>
export default {
	name: 'board-answer',

	props: ['data', 'isStub'],
};
//  v-if="data"
</script>

<template lang="html">
	<div :id="`answer-card-${data.id}`" :class="['answer-card', { 'is-placeholder': isStub }]">
		<div class="wrapper">
			<div class="content">

				<div class="front" v-if="!data.show || data.skip">
					<span class="number-badge" v-if="!data.skip">{{ data.id }}</span>
				</div>

				<div class="back" v-else>
					<span class="answer">{{ data.answer }}</span>
					<span class="points">{{ data.points }}</span>
				</div>

			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables';
@import '@/styles/_mixins';

.answer-card {
	box-sizing: content-box;
	position: relative;
	width: 100%;
	max-width: 50%;

	// home tv 120px height per answer
	.wrapper {
		// box-sizing: content-box;
		// position: relative;
		// width: 100%;
		// max-width: 50%;
		// overflow: hidden;

		// vertical-align: top;
		// width: 95%;

		height: rem-calc(54px);
		margin: rem-calc(4px);

		border: 4px solid white;
		background: #ccc;
		color: #fff;
		text-transform: capitalize;

		// https://davidwalsh.name/css-flip
		// flip
		// perspective: 1000px;

		.content {
			border: 2px solid #003c7b;

			// flip
			// transition: 0.6s;
			// transform-style: preserve-3d;
			// position: relative;

			// flip
			// &:hover {
			// 	transform: rotateY(180deg);
			// }
		}

		.front, .back {
			height: rem-calc(50px);
			line-height: rem-calc(50px);
			// flip
			// backface-visibility: hidden;
		}

		.front {
			@include gloss-gradient;

			// flip
			// z-index: 2;
			// for firefox 31
			// transform: rotateY(0deg);

			.number-badge {
				@include matte-gradient;

				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				display: block;
				margin: auto;
				text-align: center;
				border-radius: 50%;

				border: 2px solid #003c7b;

				font-size: rem-calc(30px);
				line-height: rem-calc(35px);
				width: rem-calc(45px);
				height: rem-calc(35px);
			}
		}

		.back {
			@include matte-gradient;
			display: flex;

			font-size: rem-calc(25px);
			text-align: left;

			// flip
			// transform: rotateY(180deg);

			.answer, .points {
				display: inline-block;
				padding: 0 20px;
			}

			.answer {
				flex: 1 0 auto;
				// width: 80%;
			}

			.points {
				@include gloss-gradient;
				border-left: 2px solid #003c7b;
				// width: 20%;
			}
		}
	}
}
</style>
