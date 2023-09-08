import { ref } from "vue";

import { useToastStore } from "@/stores/useToast.js";
import { useStatusStore } from "@/stores/useStatus.js";
import { useApiPath } from "@/composables/useApiPath";

export function useAdminOrder() {
	const statusStore = useStatusStore();
	const toastStore = useToastStore();
	const {
		apiAdminGetOrders,
		apiAdminPatchOrdersUnpaid,
		apiAdminPatchOrdersPaid,
	} = useApiPath();

	// 狀態
	const orders = ref([]);
	const pagination = ref({});
	const paidLoading = ref(false);
	const token = ref("");
	token.value = document.cookie.replace(
		/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
		"$1"
	);
	let headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${token.value}`,
	};

	const getOrders = (num = 1) => {
		statusStore.isLoading = true;
		$fetch(apiAdminGetOrders, {
			method: "GET",
			query: { page: num },
			headers: headers,
		})
			.then((res) => {
				orders.value = res.data;
				pagination.value = res.meta.pagination;
			})
			.finally(() => {
				statusStore.isLoading = false;
			});
	};

	const changePaidStatus = (item) => {
		paidLoading.value = true;
		let api = "";
		let message = "";
		if (item.paid) {
			api = apiAdminPatchOrdersUnpaid(item.id);
			message = "此筆訂單修改為: 尚未付款";
		} else {
			api = apiAdminPatchOrdersPaid(item.id);
			message = "此筆訂單修改為: 已付款";
		}
		$fetch(api, {
			method: "PATCH",
			headers: headers,
		})
			.then(() => {
				toastStore.messageHandle(message);
				toastStore.isShowHandle();
				getOrders();
			})
			.finally(() => {
				paidLoading.value = false;
			});
	};

	return { orders, pagination, paidLoading, getOrders, changePaidStatus };
}
