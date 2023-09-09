export function useApiPath() {
	const config = useRuntimeConfig();
	const apiBase = `${config.public.apiUrl}/${config.public.uuid}`;

	/* 後台 產品 */
	const apiAdminGetProducts = `${apiBase}/admin/ec/products`;
	const apiAdminGetProduct = (itemId) =>
		`${apiBase}/admin/ec/product/${itemId}`;
	const apiAdminPostProduct = `${apiBase}/admin/ec/product`;
	const apiAdminPatchProduct = (itemId) =>
		`${apiBase}/admin/ec/product/${itemId}`;
	const apiAdminDeleteProduct = (itemId) =>
		`${apiBase}/admin/ec/product/${itemId}`;

	/* 後台 Storages */
	const apiAdminStorage = `${apiBase}/admin/storage`;
	const apiAdminDeleteStorage = (itemId) =>
		`${apiBase}/admin/storage/${itemId}`;

	/* 後台 優惠券 */
	const apiAdminGetCoupons = `${apiBase}/admin/ec/coupons`;
	const apiAdminGetCoupon = (itemId) => `${apiBase}/admin/ec/coupon/${itemId}`;
	const apiAdminPostCoupon = `${apiBase}/admin/ec/coupon`;
	const apiAdminPatchCoupon = (itemId) =>
		`${apiBase}/admin/ec/coupon/${itemId}`;
	const apiAdminDeleteCoupon = (itemId) =>
		`${apiBase}/admin/ec/coupon/${itemId}`;

	/* 後台 訂單 */
	const apiAdminGetOrders = `${apiBase}/admin/ec/orders`;
	const apiAdminPatchOrdersUnpaid = (itemId) =>
		`${apiBase}/admin/ec/orders/${itemId}/unpaid`;
	const apiAdminPatchOrdersPaid = (itemId) =>
		`${apiBase}/admin/ec/orders/${itemId}/paid`;

	/* Auth */
	const apiAuthLogin = `${config.public.apiUrl}/auth/login`;
	const apiAuthCheck = `${config.public.apiUrl}/auth/check`;
	const apiAuthLogout = `${config.public.apiUrl}/auth/logout`;

	/* 前台 產品 */
	const apiGetProducts = `${apiBase}/ec/products`;
	const apiGetProduct = (itemId) => `${apiBase}/ec/product/${itemId}`;

	/* 前台 訂單 */
	const apiPostOrdersPay = (value) => `${apiBase}/ec/orders/${value}/paying`;
	const apiGetOrders = (value) => `${apiBase}/ec/orders/${value}`;
	const apiPostOrders = `${apiBase}/ec/orders`;

	/* 前台 優惠券 */
	const apiPostCouponSearch = `${apiBase}/ec/coupon/search`;

	return {
		apiAdminGetProducts,
		apiAdminGetProduct,
		apiAdminPostProduct,
		apiAdminPatchProduct,
		apiAdminDeleteProduct,
		apiAdminStorage,
		apiAdminDeleteStorage,
		apiAdminGetCoupons,
		apiAdminGetCoupon,
		apiAdminPostCoupon,
		apiAdminPatchCoupon,
		apiAdminDeleteCoupon,
		apiAdminGetOrders,
		apiAdminPatchOrdersUnpaid,
		apiAdminPatchOrdersPaid,
		apiAuthLogin,
		apiAuthCheck,
		apiAuthLogout,
		apiPostOrdersPay,
		apiGetOrders,
		apiPostOrders,
		apiGetProducts,
		apiGetProduct,
		apiPostCouponSearch,
	};
}
