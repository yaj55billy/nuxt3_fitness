import { ref } from "vue";

import { useToastStore } from "@/stores/useToast.js";
import { useStatusStore } from "@/stores/useStatus.js";

export function useAdminOrder() {
	const config = useRuntimeConfig();
	const statusStore = useStatusStore();
	const toastStore = useToastStore();

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

		const api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/orders`;
		$fetch(api, {
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
			api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/orders/${item.id}/unpaid`;
			message = "此筆訂單修改為: 尚未付款";
		} else {
			api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/orders/${item.id}/paid`;
			message = "此筆訂單修改為: 已付款";
		}
		$fetch(api, {
			method: "PATCH",
			headers: headers,
		})
			.then((res) => {
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
