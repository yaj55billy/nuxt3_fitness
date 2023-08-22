export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("thousands", {
		mounted(el, binding) {
			const number = binding.value;
			el.innerText = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		updated(el, binding) {
			const number = binding.value;
			el.innerText = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
	});
});
