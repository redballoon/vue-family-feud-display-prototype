<script>
export default {
	name: 'board-score',

	props: {
		size: {
			type: String,
			default: 'medium',
		},

		value: {
			type: String,
			default: '0',
		},
	},

	computed: {
		isMedium() {
			return this.size === 'medium';
		},

		isLarge() {
			return this.size === 'large';
		},
	},
};
</script>

<template lang="html">
	<div :class="['score', { 'score--medium': isMedium }, { 'score--large': isLarge }]">
		<span class="value">{{ value }}</span>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables';
@import '@/styles/_mixins';

.score {
	box-sizing: content-box;
	text-align: center;
	padding: rem-calc(20px);
	border: rem-calc(2px) solid #fff;
	box-shadow: inset 0 1px 24px 1px rgba(0, 0, 0, 0.48);
	color: #fff;

	@include matte-gradient;

	&.score--medium {
		font-size: 45px;
		width: 75px;
		height: 50px;
		line-height: 50px;
	}

	&.score--large {
		font-size: 65px;
		width: 125px;
		height: 75px;
		line-height: 75px;
	}

	/* left: 0;
	right: 0;
	top: 20px; */
}
</style>
