import { ref } from "vue";
import { useToastStore } from "./useToast.js";
import { useStatusStore } from "./useStatus.js";
import { defineStore } from "pinia";

// composition
export const useCartStore = defineStore("cart", () => {
	// 取 .env
	const config = useRuntimeConfig();

	// toastStore
	const toastStore = useToastStore();
	const statusStore = useStatusStore();

	// 資料定義
	const carts = ref([]);
	const cartPrice = ref(0);
	const cartsEmpty = ref(false);
	const isCartLoading = ref(false);

	const getCart = () => {
		statusStore.isLoading = true;
		// isCartLoading.value = true;
		const api = `${config.public.apiUrl}/${config.public.uuid}/ec/shopping`;
		$fetch(api, {
			method: "GET",
		})
			.then((res) => {
				if (res.data.length === 0) {
					cartsEmpty.value = true;
				} else {
					carts.value = res.data;
					// console.log("Pinia", carts.value.length);
					updateTotal();
				}
			})
			.finally(() => {
				statusStore.isLoading = false;
				// isCartLoading.value = false;
			});
	};
	const updateTotal = () => {
		cartPrice.value = 0; // 歸零。
		carts.value.forEach((item) => {
			cartPrice.value += item.product.price * item.quantity;
		});
	};
	const addToCart = (id, quantity = 1) => {
		isCartLoading.value = true;
		const api = `${config.public.apiUrl}/${config.public.uuid}/ec/shopping`;
		const cart = {
			product: id,
			quantity,
		};

		$fetch(api, {
			method: "POST",
			body: cart,
		})
			.then(() => {
				toastStore.messageHandle("商品已成功加入購物車");
				toastStore.isShowHandle();
				getCart();
				statusStore.isLoading = true;
				// isCartLoading.value = false;
			})
			.catch((error) => {
				toastStore.messageHandle(error.response._data.errors[0]);
				toastStore.isShowHandle();
				statusStore.isLoading = false;
				// isCartLoading.value = false;
			});
	};
	const deleteCartItem = (id) => {
		// isCartLoading.value = true;
		statusStore.isLoading = true;
		const api = `${config.public.apiUrl}/${config.public.uuid}/ec/shopping/${id}`;
		$fetch(api, {
			method: "DELETE",
		})
			.then((res) => {
				getCart();
			})
			.finally(() => {
				// isCartLoading.value = false;
				statusStore.isLoading = false;
			});
	};

	const editCartItemNum = (id, quantity) => {
		// isCartLoading.value = true;
		statusStore.isLoading = true;
		const api = `${config.public.apiUrl}/${config.public.uuid}/ec/shopping`;
		const cart = {
			product: id,
			quantity,
		};
		$fetch(api, {
			method: "PATCH",
			body: cart,
		})
			.then((res) => {
				toastStore.messageHandle("課程數量改變成功");
				toastStore.isShowHandle();
				getCart();
			})
			.finally(() => {
				isCartLoading.value = false;
				statusStore.isLoading = false;
			});
	};

	return {
		carts,
		cartPrice,
		cartsEmpty,
		// isCartLoading,
		getCart,
		addToCart,
		deleteCartItem,
		editCartItemNum,
	};
});