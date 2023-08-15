<script setup>
const props = defineProps({
	text: {
		type: String,
		default: "",
		required: true,
	},
});
</script>

<template>
	<div class="position-relative banner">
		<div class="position-absolute banner-prodbg"></div>
		<div class="container d-flex flex-column banner-body banner-body-prod">
			<div class="row justify-content-center my-auto">
				<div class="col-md-6 banner-textarea ani-banner">
					<h3 class="banner-textarea__title">{{ props.text }}</h3>
				</div>
			</div>
		</div>
	</div>
</template>
