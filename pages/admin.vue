<script setup>
import Toast from "@/components/Toast";
import LoadingAdmin from "@/components/LoadingAdmin.vue";
import { useStatusStore } from "@/stores/useStatus.js";
import { useUser } from "@/composables/useUser";
definePageMeta({
	layout: false,
});
const statusStore = useStatusStore();
const { checkSuccess, checkLogin, signOut } = useUser();
onMounted(() => {
	checkLogin();
});
</script>

<template>
	<Toast />
	<LoadingAdmin v-if="statusStore.isLoading" />
	<div class="app">
		<h2>後台管理頁面</h2>

		<nav
			class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap shadow navbar-expand"
		>
			<a href="#" class="navbar-brand col-sm-3 col-md-2 mr-0 active text-left"
				>後台管理頁面</a
			>
			<div class="ms-auto">
				<ul class="navbar-nav px-3">
					<li class="nav-item text-nowrap">
						<NuxtLink to="/" class="nav-link active">回首頁</NuxtLink>
					</li>
					<li class="nav-item text-nowrap">
						<a href="#" class="nav-link" @click.prevent="signOut">登出</a>
					</li>
				</ul>
			</div>
		</nav>
		<div class="container-fluid">
			<div class="row">
				<nav class="col-lg-2 col-md-3 d-md-block bg-light sidebar">
					<div class="sidebar-sticky mt-4">
						<ul class="nav">
							<li class="nav-item">
								<NuxtLink
									to="/admin/products"
									class="nav-link font-weight-bold router-link-exact-active active"
								>
									產品列表
								</NuxtLink>
							</li>
							<li class="nav-item">
								<NuxtLink to="/admin/coupons" class="nav-link font-weight-bold">
									優惠券列表
								</NuxtLink>
							</li>
							<li class="nav-item">
								<NuxtLink to="/admin/order" class="nav-link font-weight-bold">
									訂單列表
								</NuxtLink>
							</li>
							<li class="nav-item">
								<NuxtLink
									to="/admin/storages"
									class="nav-link font-weight-bold"
								>
									圖片列表
								</NuxtLink>
							</li>
						</ul>
					</div>
				</nav>
				<div class="col-lg-10 col-md-9 px-4">
					<NuxtPage v-if="checkSuccess" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.nav {
	.nav-item {
		width: 100%;
		text-align: left;
		font-weight: 500;
		@media (max-width: 767px) {
			width: 25%;
			text-align: center;
		}
		@media (max-width: 575px) {
			width: 50%;
		}
	}
}
.router-link-active {
	color: lighten(#274555, 25%);
	&:hover {
		color: lighten(#274555, 25%);
	}
}
</style>
