<script setup>
import { useToastStore } from "@/stores/useToast.js";
const store = useToastStore();
</script>

<template>
	<div
		class="toast"
		:class="{ show: store.isShow }"
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
			<strong class="me-auto ms-2">訊息通知</strong>
			<button
				type="button"
				class="btn-close"
				data-bs-dismiss="toast"
				aria-label="Close"
			></button>
		</div>
		<div class="toast-body">{{ store.message }}</div>
	</div>
</template>

<style lang="scss" scoped>
.toast {
	position: fixed;
	top: 20px;
	right: 20px;
	max-width: 300px;
	z-index: 1050;
}
</style>
