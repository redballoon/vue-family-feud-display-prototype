<script>
import Answer from '@/components/board/board-answer.vue';

export default {
	name: 'board-answer-list',

	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},

	computed: {
		placeholderList() {
			const MAX = 8;

			if (this.list.length === MAX || !this.list.length) {
				return [];
			}

			const totalNeeded = MAX - this.list.length;
			const placeholders = Array(totalNeeded).fill(totalNeeded).map((na, idx) => ({
				id: idx + 1 + this.list.length, // `placeholder-${}`,
				skip: true,
			}));

			return placeholders;
		},
	},

	components: {
		answer: Answer,
	},
};
</script>

<template lang="html">
	<div class="answer-list">

		<div class="message is-warning" v-if="!list.length">
			<div class="message-body">empty...</div>
		</div>

		<answer
			v-for="entry in list"
			v-bind:key="entry.id"
			:data="entry"/>

		<answer
			v-for="entry in placeholderList"
			v-bind:key="entry.id"
			:data="entry"
			isStub />

	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/_variables';
@import '@/styles/_mixins';

.answer-list {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;

	width: 100%;

	background: #000;

	max-height: rem-calc(300px);
}
</style>
