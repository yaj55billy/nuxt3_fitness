import { ref } from "vue";
import { useToastStore } from "@/stores/useToast.js";
import { useStatusStore } from "@/stores/useStatus.js";
import { useApiPath } from "@/composables/useApiPath";

export function useOrder() {
	const route = useRoute();
	const router = useRouter();
	const statusStore = useStatusStore();
	const toastStore = useToastStore();
	const { apiPostOrdersPay, apiGetOrders, apiPostOrders } = useApiPath();

	// 狀態
	const orderId = ref("");
	const order = ref({});

	const payOrder = () => {
		statusStore.isLoading = true;

		$fetch(apiPostOrdersPay(orderId.value), {
			method: "POST",
		})
			.then((res) => {
				if (res.data.paid) {
					toastStore.messageHandle("付款成功");
					toastStore.isShowHandle();
					router.push(`/complete/${orderId.value}`);
				}
			})
			.catch(() => {
				toastStore.messageHandle("Oops~您已經付過款項了");
				toastStore.isShowHandle();
			})
			.finally(() => {
				statusStore.isLoading = false;
			});
	};

	const getOrder = () => {
		orderId.value = route.params.id;
		if (orderId.value) {
			statusStore.isLoading = true;
			$fetch(apiGetOrders(orderId.value))
				.then((res) => {
					order.value = res.data;
				})
				.finally(() => {
					statusStore.isLoading = false;
				});
		}
	};

	const createOrder = (orderData) => {
		statusStore.isLoading = true;
		$fetch(apiPostOrders, {
			method: "POST",
			body: orderData,
		})
			.then((res) => {
				if (res.data.id) {
					router.push(`/checkout/${res.data.id}`);
				}
			})
			.catch(() => {
				toastStore.messageHandle("訂單送出失敗，再檢查看看");
				toastStore.isShowHandle();
			})
			.finally(() => {
				statusStore.isLoading = false;
			});
	};

	return { order, getOrder, payOrder, createOrder };
}
