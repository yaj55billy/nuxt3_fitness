import { ref } from "vue";

import { useToastStore } from "@/stores/useToast.js";
import { useStatusStore } from "@/stores/useStatus.js";

export function useAdminCoupons() {
	const config = useRuntimeConfig();
	const statusStore = useStatusStore();
	const toastStore = useToastStore();

	// 狀態
	const coupons = ref([]);
	const pagination = ref({});
	const tempCoupons = ref({
		title: "",
		code: "",
		percent: 0,
		enabled: false,
		deadline_at: 0,
	});
	const coupon_date = ref("");
	const coupon_time = ref("");
	const token = ref("");
	let couponModalHandle = ref(null);
	let delCouponModalHandle = ref(null);
	token.value = document.cookie.replace(
		/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
		"$1"
	);
	let headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${token.value}`,
	};

	const getCoupons = (num = 1) => {
		statusStore.isLoading = true;

		const api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/coupons`;
		$fetch(api, {
			method: "GET",
			query: { page: num },
			headers: headers,
		})
			.then((res) => {
				coupons.value = res.data;
				pagination.value = res.meta.pagination;
			})
			.finally(() => {
				statusStore.isLoading = false;
			});
		if (tempCoupons.value.id) {
			tempCoupons.value = {
				title: "",
				code: "",
				percent: 0,
				enabled: false,
				deadline_at: 0,
			};
			coupon_date.value = "";
			coupon_time.value = "";
		}
	};

	const openCouponModal = (status, item) => {
		if (status === "new") {
			tempCoupons.value = {
				title: "",
				code: "",
				percent: 0,
				enabled: false,
				deadline_at: 0,
			};
			couponModalHandle.value.show();
		} else {
			statusStore.isLoading = true;

			const api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/coupon/${item.id}`;

			$fetch(api, {
				method: "GET",
				headers: headers,
			}).then((res) => {
				tempCoupons.value = res.data;

				[coupon_date.value, coupon_time.value] =
					tempCoupons.value.deadline.datetime.split(" ");

				status === "edit"
					? couponModalHandle.value.show() // 編輯
					: delCouponModalHandle.value.show(); // 刪除
				statusStore.isLoading = false;
			});
		}
	};

	const updateCoupon = () => {
		statusStore.isLoading = true;
		tempCoupons.value.deadline_at = `${coupon_date.value} ${coupon_time.value}`;

		let api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/coupon`,
			httpMethod = "POST",
			successText = "優惠券新增成功",
			failText = "優惠券新增失敗，請再檢查看看";

		if (tempCoupons.value.id) {
			api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/coupon/${tempCoupons.value.id}`;
			httpMethod = "PATCH";
			successText = "優惠券編輯成功";
			failText = "優惠券編輯失敗，請再檢查看看";
		}

		$fetch(api, {
			method: httpMethod,
			headers: headers,
			body: tempCoupons.value,
		})
			.then(() => {
				couponModalHandle.value.hide();
				toastStore.messageHandle(successText);
				toastStore.isShowHandle();
				getCoupons();
			})
			.catch(() => {
				couponModalHandle.value.hide();
				toastStore.messageHandle(failText);
				toastStore.isShowHandle();
			})
			.finally(() => {
				statusStore.isLoading = false;
			});
	};

	const deleteCoupon = () => {
		statusStore.isLoading = true;
		const api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/coupon/${tempCoupons.value.id}`;
		$fetch(api, {
			method: "DELETE",
			headers: headers,
		})
			.then((res) => {
				toastStore.messageHandle("優惠券已刪除");
				toastStore.isShowHandle();
				getCoupons();
			})
			.catch(() => {
				toastStore.messageHandle("優惠券刪除失敗，請再檢查看看");
				toastStore.isShowHandle();
			})
			.finally(() => {
				delCouponModalHandle.value.hide();
				statusStore.isLoading = false;
			});
	};

	return {
		coupons,
		pagination,
		tempCoupons,
		coupon_date,
		coupon_time,
		couponModalHandle,
		delCouponModalHandle,
		getCoupons,
		openCouponModal,
		updateCoupon,
		deleteCoupon,
	};
}
