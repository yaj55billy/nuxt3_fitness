<script setup>
definePageMeta({
	layout: false,
});
import Toast from "@/components/Toast";
import LoadingCustom from "@/components/LoadingCustom";
import { useStatusStore } from "@/stores/useStatus.js";
import { useUser } from "@/composables/useUser.js";
const statusStore = useStatusStore();
const { user, signIn } = useUser();
</script>

<template>
	<Toast />
	<LoadingCustom v-if="statusStore.isLoading" />
	<div class="login-page">
		<form class="form-signin" @submit.prevent="signIn">
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
