<script setup>
const route = useRoute();
const event = useRequestEvent();
setResponseStatus(event, 404);
</script>

<template>
	<div class="container">
		<div class="notfound">
			<div class="notfound__content">
				<h1 class="notfound__status">404</h1>
				<h2 class="notfound__title">Oops...找不到此頁面</h2>
			</div>
		</div>
	</div>
</template>
