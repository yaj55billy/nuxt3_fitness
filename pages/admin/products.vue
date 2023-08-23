<script setup>
import { useLoading } from "vue-loading-overlay";
import Pagination from "@/components/Pagination.vue";

// bootstrap js
const { $bootstrap } = useNuxtApp();

// Loading
const pageLoading = ref(null);

const $loading = useLoading({
	container: pageLoading.value,
	zIndex: 999,
	opacity: 0.4,
});

// toast store
import { useToastStore } from "@/stores/useToast.js";
const store = useToastStore();

// 取 .env
const config = useRuntimeConfig();

// 資料定義
const products = ref([]);
const pagination = ref({});
const tempProduct = ref({ imageUrl: [] });
const fileUpLoading = ref(false);

// 取 dom
const productModal = ref(null);
const delProductModal = ref(null);
let productModalHandle;
let delProductModalHandle;

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

const getProducts = (num = 1) => {
	const loader = $loading.show();

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
			loader.hide();
		});
	tempProduct.value = {
		imageUrl: [],
	};
	// if (this.tempProduct.id) {
	// 	this.tempProduct = {
	// 		imageUrl: [],
	// 	};
	// } else {
	// 	this.tempProduct = {
	// 		imageUrl: [],
	// 	};
	// }
};

const openModal = (status, item) => {
	if (status === "new") {
		tempProduct.value = {
			imageUrl: [],
		};
		productModalHandle.show();
	} else {
		const loader = $loading.show();

		const api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/product/${item.id}`;
		$fetch(api, {
			method: "GET",
			headers: headers,
		}).then((res) => {
			console.log(res.data);
			tempProduct.value = res.data;
			status === "edit"
				? productModalHandle.show() // 編輯
				: delProductModalHandle.show(); // 刪除
			loader.hide();
		});
	}
};

const updateData = () => {
	const loader = $loading.show();

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
			productModalHandle.hide();
			store.messageHandle(successText);
			store.isShowHandle();
			loader.hide();
			getProducts();
		})
		.catch(() => {
			loader.hide();
			productModalHandle.hide();
			store.messageHandle(failText);
			store.isShowHandle();
		});
};

const deleteProduct = () => {
	const loader = $loading.show();
	const api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/product/${tempProduct.value.id}`;
	$fetch(api, {
		method: "DELETE",
		headers: headers,
	})
		.then((res) => {
			store.messageHandle("產品已刪除");
			store.isShowHandle();
			getProducts();
		})
		.catch(() => {
			store.messageHandle("產品刪除失敗，請再檢查看看");
			store.isShowHandle();
		})
		.finally(() => {
			delProductModalHandle.hide();
			loader.hide();
		});
};

const customFile = ref(null);
// 上傳圖片
const uploadFile = (e) => {
	fileUpLoading.value = true;
	// const catchFile = customFile.value.files[0];
	// const catchFile = document.querySelector("#customFile").files[0];
	// const catchFile = e.target.files[0];

	let formData = new FormData();
	formData.append("file", e.target.files[0]);

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
			console.log(res);
			if (res.status === 200) {
				console.log(res.data);
				// tempProduct.value.imageUrl.push(res.data.path);
			}
			document.querySelector("#customFile").value = "";
			fileUpLoading.value = false;
		})
		.catch(() => {
			store.messageHandle("檔案上傳失敗，請再檢查是不是檔案大小超過 2MB");
			store.isShowHandle();
			fileUpLoading.value = false;
		});
};

onMounted(() => {
	getProducts();

	productModalHandle = new $bootstrap.Modal(productModal.value, {});
	delProductModalHandle = new $bootstrap.Modal(delProductModal.value, {});
});
</script>

<template>
	<div ref="pageLoading"></div>
	<div class="mt-4">
		<h2>產品列表</h2>
		<div class="text-end mt-sm-2 mt-4">
			<button type="button" class="btn btn-primary" @click="openModal('new')">
				建立新的產品
			</button>
		</div>
		<table class="table table-admin table-rwd mt-3">
			<thead>
				<tr>
					<th width="160">分類</th>
					<th width="780">產品名稱</th>
					<th width="100">原價</th>
					<th width="100">售價</th>
					<th width="160">是否啟用</th>
					<th width="140">編輯</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in products" :key="item.id">
					<td data-th="分類">{{ item.category }}</td>
					<td data-th="產品名稱">{{ item.title }}</td>
					<td data-th="原價" v-thousands="item.origin_price"></td>
					<td data-th="售價" v-thousands="item.price"></td>
					<td data-th="是否啟用">
						<span v-if="item.enabled" class="text-success">啟用</span>
						<span v-else>未啟用</span>
					</td>
					<td data-th="編輯">
						<div class="btn-group">
							<button
								type="button"
								class="btn btn-outline-primary btn-sm"
								@click="openModal('edit', item)"
							>
								編輯
							</button>
							<button
								type="button"
								class="btn btn-outline-danger btn-sm"
								@click="openModal('delete', item)"
							>
								刪除
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<pagination :pagedata="pagination" @update="getProducts"></pagination>

		<div
			class="modal fade"
			id="productModal"
			ref="productModal"
			tabindex="-1"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-xl" role="document">
				<div class="modal-content border-0">
					<div class="modal-header bg-dark text-white">
						<h5 id="exampleModalLabel" class="modal-title">
							<span v-if="tempProduct.id">編輯 {{ tempProduct.title }}</span>
							<span v-else>新增產品</span>
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
							<div class="col-sm-4">
								<div v-for="item in 3" :key="item + 'img'" class="form-group">
									<label :for="'imageUrl_' + (item - 1)">輸入圖片網址</label>
									<input
										:id="'imageUrl_' + (item - 1)"
										v-model="tempProduct.imageUrl[item - 1]"
										type="text"
										class="form-control"
										placeholder="請輸入圖片連結"
									/>
								</div>
								<div class="form-group">
									上傳圖片
									<div
										class="spinner-border text-primary"
										role="status"
										style="width: 12px; height: 12px"
										v-if="fileUpLoading"
									>
										<span class="sr-only">Loading...</span>
									</div>
									<input
										type="file"
										class="form-control h-auto"
										id="customFile"
										ref="customFile"
										@change="uploadFile"
									/>
								</div>
								<div v-for="item in 3" :key="item + 'img-show'">
									<img
										class="img-fluid"
										:src="tempProduct.imageUrl[item - 1]"
										:alt="'課程示意: ' + tempProduct.title"
									/>
								</div>
							</div>
							<div class="col-sm-8">
								<div class="form-group">
									<label for="title">標題</label>
									<input
										id="title"
										v-model="tempProduct.title"
										type="text"
										class="form-control"
										placeholder="請輸入標題"
									/>
								</div>
								<div class="form-row">
									<div class="form-group col-md-6">
										<label for="category">分類</label>
										<input
											id="category"
											v-model="tempProduct.category"
											type="text"
											class="form-control"
											placeholder="請輸入分類"
										/>
									</div>
									<div class="form-group col-md-6">
										<label for="price">單位</label>
										<input
											id="unit"
											v-model="tempProduct.unit"
											type="unit"
											class="form-control"
											placeholder="請輸入單位"
										/>
									</div>
								</div>
								<div class="form-row">
									<div class="form-group col-md-6">
										<label for="origin_price">原價</label>
										<input
											id="origin_price"
											v-model="tempProduct.origin_price"
											type="number"
											class="form-control"
											placeholder="請輸入原價"
										/>
									</div>
									<div class="form-group col-md-6">
										<label for="price">售價</label>
										<input
											id="price"
											v-model="tempProduct.price"
											type="number"
											class="form-control"
											placeholder="請輸入售價"
										/>
									</div>
								</div>
								<hr />
								<div class="form-group">
									<label for="description">產品描述</label>
									<textarea
										id="description"
										v-model="tempProduct.description"
										type="text"
										class="form-control"
										placeholder="請輸入產品描述"
									>
									</textarea>
								</div>
								<div class="form-group">
									<label for="content">說明內容</label>
									<textarea
										id="description"
										v-model="tempProduct.content"
										type="text"
										class="form-control"
										placeholder="請輸入說明內容"
									>
									</textarea>
								</div>
								<div class="form-group">
									<div class="form-check">
										<input
											id="enabled"
											v-model="tempProduct.enabled"
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
						<button type="button" class="btn btn-primary" @click="updateData">
							確認
						</button>
					</div>
				</div>
			</div>
		</div>

		<div
			id="delProductModal"
			ref="delProductModal"
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
							<span>刪除產品</span>
						</h5>
						<button
							type="button"
							class="btn-close btn-white"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						是否刪除
						<strong class="text-danger">{{ tempProduct.title }}</strong>
						商品(刪除後將無法恢復)。
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-outline-secondary"
							data-bs-dismiss="modal"
						>
							取消
						</button>
						<button type="button" class="btn btn-danger" @click="deleteProduct">
							確認刪除
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
