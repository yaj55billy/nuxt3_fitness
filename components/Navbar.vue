<script setup>
// export default {
//   data() {
//     return {
//       carts: [],
//     };
//   },
//   created() {
//     this.getCart();
//     this.$bus.$on('cart-num', () => {
//       this.getCart();
//     });
//   },
//   methods: {
//     getCart() {
//       this.isLoading = true;
//       const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
//       this.axios.get(url)
//         .then((res) => {
//           this.carts = res.data.data;
//         })
//         .catch(() => {
//           this.carts = 0;
//         });
//     },
//   },
// };
</script>

<template>
	<nav class="navbar navbar-dark bg-dark navbar-expand-lg fixed-top shadow">
		<NuxtLink to="/" class="navbar-brand logo"> FitSpace </NuxtLink>
		<!-- <button
			data-toggle="collapse"
			data-target="#navbarNavAltMarkup"
			aria-controls="navbarNavAltMarkup"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button> -->

		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
			<div class="navbar-nav">
				<NuxtLink to="/about" class="nav-item nav-link"> 關於我們 </NuxtLink>
				<NuxtLink to="/products" class="nav-item nav-link"> 課程列表 </NuxtLink>
				<NuxtLink to="/qa" class="nav-item nav-link"> 常見問題 </NuxtLink>
				<NuxtLink to="/contact" class="nav-item nav-link"> 聯絡我們 </NuxtLink>
				<router-link to="/cart" class="nav-item nav-link">
					<i class="fas fa-shopping-cart"></i>
					<!-- <span class="badge badge-light">{{ carts.length }}</span> -->
					<span class="badge badge-light">2</span>
				</router-link>
			</div>
		</div>
	</nav>
</template>
