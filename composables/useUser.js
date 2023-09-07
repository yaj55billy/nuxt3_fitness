import { ref, onMounted } from "vue";
import { useToastStore } from "@/stores/useToast.js";
import { useStatusStore } from "@/stores/useStatus.js";
// 登入、登出、驗證
export function useUser() {
	const router = useRouter(); // router
	const config = useRuntimeConfig(); // 取 .env
	const statusStore = useStatusStore(); // Store
	const toastStore = useToastStore();

	// 狀態
	const user = ref({ email: "", password: "" });
	const token = ref("");
	const checkSuccess = ref(false);

	const signIn = () => {
		statusStore.isLoading = true;
		const api = `${config.public.apiUrl}/auth/login`;

		$fetch(api, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token.value}`,
			},
			body: user.value,
		})
			.then((res) => {
				const { token } = res;
				const { expired } = res;
				document.cookie = `token=${token}; expires=${new Date(
					expired * 1000
				)}; path=/`;
				toastStore.messageHandle("登入成功~~");
				toastStore.isShowHandle();
				router.push("/admin/products");
			})
			.catch(() => {
				toastStore.messageHandle("登入失敗，請再檢查帳密!");
				toastStore.isShowHandle();
			})
			.finally(() => {
				statusStore.isLoading = false;
			});
	};

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
			.then(() => {
				checkSuccess.value = true;
			})
			.catch(() => {
				router.push("/login");
			});
	};

	const signOut = () => {
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
			toastStore.messageHandle(res.message);
			toastStore.isShowHandle();
			document.cookie = "token=; expires=; path=/";
			router.push("/");
		});
	};

	return { user, signIn, checkSuccess, checkLogin, signOut };
}
