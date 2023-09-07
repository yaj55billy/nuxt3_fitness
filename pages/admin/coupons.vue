<script setup>
import Pagination from "@/components/Pagination.vue";
import { useToastStore } from "@/stores/useToast.js";
import { useStatusStore } from "@/stores/useStatus.js";

// cart Store
const statusStore = useStatusStore();

// bootstrap js
const { $bootstrap } = useNuxtApp();

// toast store
const store = useToastStore();

// 取 .env
const config = useRuntimeConfig();

// 資料定義
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

// dom
const couponModal = ref(null);
const delCouponModal = ref(null);
let couponModalHandle;
let delCouponModalHandle;

// about api
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
		couponModalHandle.show();
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
				? couponModalHandle.show() // 編輯
				: delCouponModalHandle.show(); // 刪除
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
		.then((res) => {
			couponModalHandle.hide();
			store.messageHandle(successText);
			store.isShowHandle();
			getCoupons();
		})
		.catch(() => {
			couponModalHandle.hide();
			store.messageHandle(failText);
			store.isShowHandle();
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
			store.messageHandle("優惠券已刪除");
			store.isShowHandle();
			getCoupons();
		})
		.catch(() => {
			store.messageHandle("優惠券刪除失敗，請再檢查看看");
			store.isShowHandle();
		})
		.finally(() => {
			delCouponModalHandle.hide();
			statusStore.isLoading = false;
		});
};

onMounted(() => {
	getCoupons();

	couponModalHandle = new $bootstrap.Modal(couponModal.value, {});
	delCouponModalHandle = new $bootstrap.Modal(delCouponModal.value, {});
});
</script>

<template>
	<div class="mt-4">
		<h2>優惠券列表</h2>
		<div class="text-end mt-sm-2 mt-4">
			<button
				type="button"
				class="btn btn-primary"
				@click="openCouponModal('new')"
			>
				新增優惠券
			</button>
		</div>
		<table class="table table-admin table-rwd mt-3">
			<thead>
				<tr>
					<th>名稱</th>
					<th>折扣百分比</th>
					<th>到期日</th>
					<th>是否啟用</th>
					<th>編輯</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in coupons" :key="item.id">
					<td data-th="名稱">{{ item.title }}</td>
					<td data-th="折扣百分比">{{ item.percent }}</td>
					<td data-th="到期日">{{ item.deadline.datetime }}</td>
					<td data-th="是否啟用">
						<span v-if="item.enabled" class="text-success">啟用</span>
						<span v-else>未啟用</span>
					</td>
					<td data-th="編輯">
						<div class="btn-group">
							<button
								type="button"
								class="btn btn-outline-primary btn-sm"
								@click="openCouponModal('edit', item)"
							>
								編輯
							</button>
							<button
								type="button"
								class="btn btn-outline-danger btn-sm"
								@click="openCouponModal('delete', item)"
							>
								刪除
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<pagination :pagedata="pagination" @update="getCoupons"></pagination>

		<div
			id="couponModal"
			ref="couponModal"
			class="modal fade"
			tabindex="-1"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content border-0">
					<div class="modal-header bg-dark text-white">
						<h5 id="exampleModalLabel" class="modal-title">
							<span v-if="tempCoupons.id">編輯 {{ tempCoupons.title }}</span>
							<span v-else>新增優惠券</span>
						</h5>
						<button
							type="button"
							class="btn-close white"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body text-left">
						<div class="row">
							<div class="col-sm-12">
								<div class="form-group">
									<label for="title">優惠券名稱</label>
									<input
										id="couponTitle"
										v-model="tempCoupons.title"
										type="text"
										class="form-control"
										placeholder="請輸入名稱"
									/>
								</div>
								<div class="form-group">
									<label for="coupon_code">優惠碼</label>
									<input
										id="coupon_code"
										v-model="tempCoupons.code"
										type="text"
										class="form-control"
										placeholder="請輸入優惠碼"
									/>
								</div>
								<div class="form-group">
									<label for="title">折扣百分比</label>
									<input
										id="couponPercent"
										v-model="tempCoupons.percent"
										type="text"
										class="form-control"
										placeholder="請輸入折扣百分比"
									/>
								</div>
								<div class="form-group">
									<label for="couponDeadline">到期日</label>
									<input
										id="couponDeadline"
										v-model="coupon_date"
										type="date"
										class="form-control"
									/>
								</div>
								<div class="form-group">
									<label for="couponDeadtime">到期時間</label>
									<input
										id="couponDeadtime"
										v-model="coupon_time"
										type="time"
										step="1"
										class="form-control"
									/>
								</div>
								<div class="form-group">
									<div class="form-check">
										<input
											id="enabled"
											v-model="tempCoupons.enabled"
											class="form-check-input"
											type="checkbox"
										/>
										<label class="form-check-label" for="enabled"
											>是否啟用</label
										>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-outline-secondary"
							data-bs-dismiss="modal"
						>
							取消
						</button>
						<button type="button" class="btn btn-primary" @click="updateCoupon">
							確認
						</button>
					</div>
				</div>
			</div>
		</div>
		<div
			id="delCouponModal"
			ref="delCouponModal"
			class="modal fade"
			tabindex="-1"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog" role="document">
				<div class="modal-content border-0">
					<div class="modal-header bg-danger text-white">
						<h5 id="exampleModalLabel" class="modal-title">
							<span>刪除優惠券</span>
						</h5>
						<button
							type="button"
							class="btn-close white"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						是否刪除
						<strong class="text-danger">{{ tempCoupons.title }}</strong>
						優惠券(刪除後將無法恢復)。
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-outline-secondary"
							data-bs-dismiss="modal"
						>
							取消
						</button>
						<button type="button" class="btn btn-danger" @click="deleteCoupon">
							確認刪除
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
