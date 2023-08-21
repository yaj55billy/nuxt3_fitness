<script setup>
const isShow = ref(false);
onMounted(() => {
	isShow.value = true;

	setTimeout(() => {
		isShow.value = false;
	}, 4000);
});
</script>

<template>
	<!-- data-bs-delay="10000" -->
	<div
		class="toast"
		:class="{ show: isShow }"
		role="alert"
		aria-live="assertive"
		aria-atomic="true"
	>
		<div class="toast-header">
			<svg
				class="bd-placeholder-img rounded mr-2"
				width="20"
				height="20"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid slice"
				focusable="false"
				role="img"
			>
				<rect width="100%" height="100%" fill="#274555"></rect>
			</svg>
			<strong class="me-auto">訊息通知</strong>
			<button
				type="button"
				class="btn-close"
				data-bs-dismiss="toast"
				aria-label="Close"
			>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="toast-body">測試</div>
	</div>
</template>

<style lang="scss" scoped>
.toast {
	position: fixed;
	top: 20px;
	right: 20px;
	min-width: 300px;
	z-index: 1050;
}
</style>
