<script>
export default {
	name: 'board-question',

	props: ['question'],
};
</script>

<template lang="html">
	<div class="question">
		<span class="value"></span>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables';
@import '@/styles/_mixins';

.question {
	box-sizing: content-box;
	text-align: center;
	width: 94%;
	margin: auto;

	color: #003c7b;
	background: #deeeff;

	font-size: 30px;
	min-height: 100px;
	line-height: 100px;

	// text-shadow: initial;
	// text-align: center;
	border: 1px solid black;

	padding: 10px;
	margin-bottom: 15px;

	// box-shadow: inset 0 1px 24px 1px rgba(0, 0, 0, 0.48);

	.value {
		display: inline-block;
		vertical-align: middle;
		line-height: normal;
	}
}
</style>
