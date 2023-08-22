<script setup>
const props = defineProps({
	pagedata: Object,
});

const emit = defineEmits(["update"]);

const nowPage = (num) => {
	emit("update", num);
};

// pagination: {
//   count: 14
//   current_page: 1
//   links: {}
//   per_page: 25
//   total: 14
//   total_pages: 1
// }
</script>

<template>
	<nav aria-label="Page navigation example">
		<ul class="pagination">
			<li
				class="page-item"
				:disabled="pagedata.current_page - 1 === 0"
				:class="{ disabled: pagedata.current_page - 1 === 0 }"
			>
				<a
					class="page-link"
					href="#"
					aria-label="Previous"
					@click.prevent="nowPage(pagedata.current_page - 1)"
				>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li
				class="page-item mx-2"
				v-for="item in pagedata.total_pages"
				:key="item"
				:class="{ active: item === pagedata.current_page }"
			>
				<a class="page-link" href="#" @click.prevent="nowPage(item)"
					>{{ item }}
				</a>
			</li>
			<li
				class="page-item"
				:disabled="pagedata.current_page === pagedata.total_pages"
				:class="{ disabled: pagedata.current_page === pagedata.total_pages }"
			>
				<a
					class="page-link"
					href="#"
					aria-label="Next"
					@click.prevent="nowPage(pagedata.current_page + 1)"
				>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
</template>
