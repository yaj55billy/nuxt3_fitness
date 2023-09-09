<script setup>
import Toast from "@/components/Toast.vue";
import LoadingCustom from "@/components/LoadingCustom.vue";
import { useStatusStore } from "@/stores/useStatus.js";
const statusStore = useStatusStore();
</script>

<template>
	<div class="app">
		<Toast />
		<NuxtLoadingIndicator
			color="#fdc23e"
			:height="5"
			:duration="4000"
			:throttle="0"
		/>
		<LoadingCustom v-if="statusStore.isLoading" />
		<Navbar />
		<slot />
		<Footer />
	</div>
</template>
