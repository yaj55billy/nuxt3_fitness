<script setup>
import { h } from "vue";
import { useLoading } from "vue-loading-overlay";
import LoadingCustom from "@/components/LoadingCustom";

// layout cancel
definePageMeta({
	layout: false,
});

// Loading
const pageLoading = ref(null);

const $loading = useLoading(
	{
		container: pageLoading.value,
		zIndex: 999,
		opacity: 0.4,
	},
	{
		default: () => h(LoadingCustom),
	}
);

// 取 .env
const config = useRuntimeConfig();

// 資料定義
const user = ref({ email: "", password: "" });
const token = ref("");

const signin = async () => {
	const loader = $loading.show();
	const api = `${config.public.apiUrl}/auth/login`;

	$fetch(api, {
		method: "POST",
		body: user.value,
	})
		.then((res) => {
			const { token } = res;
			const { expired } = res;
			document.cookie = `token=${token}; expires=${new Date(
				expired * 1000
			)}; path=/`;
			console.log("登入成功");
			// 					this.$bus.$emit("notice-user", "登入成功~~");
			// 					this.$router.push("/admin/products");
		})
		.catch(() => {
			// 					this.$bus.$emit("notice-user", "登入失敗，請再檢查帳密");
			console.log("登入失敗");
		})
		.finally(() => {
			loader.hide();
		});
};
</script>

<template>
	<div class="login-page">
		<div ref="pageLoading"></div>
		<form class="form-signin" @submit.prevent="signin">
			<h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
			<div class="form-group">
				<label for="inputEmail" class="sr-only">Email address</label>
				<input
					id="inputEmail"
					v-model="user.email"
					type="email"
					class="form-control"
					placeholder="Email address"
					required
					autofocus
				/>
			</div>
			<div class="form-group mt-3">
				<label for="inputPassword" class="sr-only">Password</label>
				<input
					id="inputPassword"
					v-model="user.password"
					type="password"
					class="form-control"
					placeholder="Password"
					required
				/>
			</div>
			<button class="btn btn-lg btn-primary d-block w-100 mt-3" type="submit">
				登入
			</button>
		</form>
	</div>
</template>

<style lang="scss" scoped>
.login-page {
	height: 100vh;
	display: flex;
	align-items: center;
	padding-top: 40px;
	padding-bottom: 40px;
	background-color: #f5f5f5;
}
.form-signin {
	width: 100%;
	max-width: 330px;
	padding: 15px;
	margin: auto;
}
</style>
