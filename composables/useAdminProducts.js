import { ref } from "vue";

import { useToastStore } from "@/stores/useToast.js";
import { useStatusStore } from "@/stores/useStatus.js";

export function useAdminProducts() {
	const config = useRuntimeConfig();
	const statusStore = useStatusStore();
	const toastStore = useToastStore();

	// 狀態
	const products = ref([]);
	const pagination = ref({});
	const tempProduct = ref({ imageUrl: [] });
	const fileUpLoading = ref(false);
	const customFile = ref(null);
	const token = ref("");
	let productModalHandle = ref(null);
	let delProductModalHandle = ref(null);
	token.value = document.cookie.replace(
		/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
		"$1"
	);
	let headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${token.value}`,
	};

	const getProducts = (num = 1) => {
		statusStore.isLoading = true;

		const api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/products`;
		$fetch(api, {
			method: "GET",
			query: { page: num },
			headers: headers,
		})
			.then((res) => {
				products.value = res.data;
				pagination.value = res.meta.pagination;
			})
			.finally(() => {
				statusStore.isLoading = false;
			});
		tempProduct.value = {
			imageUrl: [],
		};
	};

	const openModal = (status, item) => {
		if (status === "new") {
			tempProduct.value = {
				imageUrl: [],
			};
			productModalHandle.value.show();
		} else {
			statusStore.isLoading = true;

			const api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/product/${item.id}`;
			$fetch(api, {
				method: "GET",
				headers: headers,
			}).then((res) => {
				tempProduct.value = res.data;
				status === "edit"
					? productModalHandle.value.show() // 編輯
					: delProductModalHandle.value.show(); // 刪除
				statusStore.isLoading = false;
			});
		}
	};

	const updateData = () => {
		statusStore.isLoading = true;

		let api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/product`,
			httpMethod = "POST",
			successText = "產品新增成功",
			failText = "產品新增失敗，請再檢查看看";

		if (tempProduct.value.id) {
			api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/product/${tempProduct.value.id}`;
			httpMethod = "PATCH";
			successText = "產品編輯成功";
			failText = "產品編輯失敗，請再檢查看看";
		}

		$fetch(api, {
			method: httpMethod,
			headers: headers,
			body: tempProduct.value,
		})
			.then((res) => {
				productModalHandle.value.hide();
				toastStore.messageHandle(successText);
				toastStore.isShowHandle();
				getProducts();
			})
			.catch(() => {
				productModalHandle.value.hide();
				toastStore.messageHandle(failText);
				toastStore.isShowHandle();
			})
			.finally(() => {
				statusStore.isLoading = false;
			});
	};
	const deleteProduct = () => {
		statusStore.isLoading = true;
		const api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/product/${tempProduct.value.id}`;
		$fetch(api, {
			method: "DELETE",
			headers: headers,
		})
			.then((res) => {
				toastStore.messageHandle("產品已刪除");
				toastStore.isShowHandle();
				getProducts();
			})
			.catch(() => {
				toastStore.messageHandle("產品刪除失敗，請再檢查看看");
				toastStore.isShowHandle();
			})
			.finally(() => {
				delProductModalHandle.value.hide();
				statusStore.isLoading = false;
			});
	};

	// 上傳圖片
	const uploadFile = () => {
		fileUpLoading.value = true;
		const catchFile = customFile.value.files[0];

		const formData = new FormData();
		formData.append("file", catchFile);

		headers = {
			Accept: "application/json",
			Authorization: `Bearer ${token.value}`,
		};

		const api = `${config.public.apiUrl}/${config.public.uuid}/admin/storage`;

		$fetch(api, {
			method: "POST",
			headers: headers,
			body: formData,
		})
			.then((res) => {
				tempProduct.value.imageUrl.push(res.data.path);
				customFile.value.value = "";
			})
			.catch(() => {
				toastStore.messageHandle(
					"檔案上傳失敗，請再檢查是不是檔案大小超過 2MB"
				);
				toastStore.isShowHandle();
			})
			.finally(() => {
				fileUpLoading.value = false;
			});
	};
	return {
		products,
		pagination,
		tempProduct,
		productModalHandle,
		delProductModalHandle,
		fileUpLoading,
		customFile,
		getProducts,
		openModal,
		updateData,
		deleteProduct,
		uploadFile,
	};
}
