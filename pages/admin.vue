<script setup>
import Toast from "@/components/Toast";

// layout default false
definePageMeta({
	layout: false,
});

// 取 .env
const config = useRuntimeConfig();

// toast store
import { useToastStore } from "@/stores/useToast.js";
const store = useToastStore();

// router
const router = useRouter();

const token = ref("");
const checkSuccess = ref(false);
const checkLogin = () => {
	token.value = document.cookie.replace(
		/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
		"$1"
	);
	const api = `${config.public.apiUrl}/auth/check`;
	$fetch(api, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: {
			api_token: token.value,
		},
	})
		.then((res) => {
			checkSuccess.value = true;
		})
		.catch(() => {
			router.push("/login");
		});
};

const signout = () => {
	const api = `${config.public.apiUrl}/auth/logout`;

	$fetch(api, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token.value}`,
		},
		body: {
			api_token: token.value,
		},
	}).then((res) => {
		document.cookie = "token=; expires=; path=/";
		store.messageHandle(res.message);
		store.isShowHandle();
		router.push("/");
	});
};

onMounted(() => {
	checkLogin();
});
</script>

<template>
	<Toast />
	<div ref="pageLoading"></div>
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
						<a href="#" class="nav-link" @click.prevent="signout">登出</a>
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
