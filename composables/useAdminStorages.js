import { ref } from "vue";

import { useToastStore } from "@/stores/useToast.js";
import { useStatusStore } from "@/stores/useStatus.js";

export function useAdminStorages() {
	const config = useRuntimeConfig();
	const statusStore = useStatusStore();
	const toastStore = useToastStore();

	// 狀態
	const storages = ref([]);
	const tempStorage = ref([]);
	const pagination = ref({});
	const delStorageModalHandle = ref(null);

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

	const getData = (page = 1) => {
		statusStore.isLoading = true;

		const api = `${config.public.apiUrl}/${config.public.uuid}/admin/storage`;
		$fetch(api, {
			method: "GET",
			query: { page: page },
			headers: headers,
		})
			.then((res) => {
				storages.value = res.data;
				pagination.value = res.meta.pagination;
			})
			.finally(() => {
				statusStore.isLoading = false;
			});
	};

	const openDelModal = (item) => {
		tempStorage.value = item;
		delStorageModalHandle.value.show();
	};

	const deleteStorage = (id) => {
		statusStore.isLoading = true;
		const api = `${config.public.apiUrl}/${config.public.uuid}/admin/storage/${id}`;

		$fetch(api, {
			method: "DELETE",
			headers: headers,
		})
			.then(() => {
				toastStore.messageHandle("圖片刪除成功~~");
				toastStore.isShowHandle();
				getData();
			})
			.catch(() => {
				toastStore.messageHandle("圖片刪除失敗，請再檢查看看");
				toastStore.isShowHandle();
			})
			.finally(() => {
				delStorageModalHandle.value.hide();
				statusStore.isLoading = false;
			});
	};

	return {
		storages,
		tempStorage,
		pagination,
		delStorageModalHandle,
		getData,
		openDelModal,
		deleteStorage,
	};
}
