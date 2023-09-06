<script setup>
import Toast from "@/components/Toast.vue";
</script>

<template>
	<Toast />
	<div class="app">
		<NuxtLoadingIndicator
			color="#fdc23e"
			:height="5"
			:duration="4000"
			:throttle="0"
		/>
		<Navbar />
		<slot />
		<Footer />
	</div>
</template>
