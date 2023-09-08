import { ref } from "vue";
import { useToastStore } from "@/stores/useToast.js";
import { useStatusStore } from "@/stores/useStatus.js";
import { useApiPath } from "@/composables/useApiPath";

// 登入、登出、驗證
export function useUser() {
	const router = useRouter();
	const statusStore = useStatusStore();
	const toastStore = useToastStore();
	const { apiAuthLogin, apiAuthCheck, apiAuthLogout } = useApiPath();

	// 狀態
	const user = ref({ email: "", password: "" });
	const token = ref("");
	const checkSuccess = ref(false);

	const signIn = () => {
		statusStore.isLoading = true;

		$fetch(apiAuthLogin, {
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
		$fetch(apiAuthCheck, {
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
		$fetch(apiAuthLogout, {
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
