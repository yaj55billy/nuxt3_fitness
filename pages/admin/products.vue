<script setup>
import Pagination from "@/components/Pagination.vue";
import { useAdminProducts } from "@/composables/useAdminProducts.js";
// bootstrap js
const { $bootstrap } = useNuxtApp();

// 取 dom
const productModal = ref(null);
const delProductModal = ref(null);

const {
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
} = useAdminProducts();

onMounted(() => {
	getProducts();

	productModalHandle.value = new $bootstrap.Modal(productModal.value, {});
	delProductModalHandle.value = new $bootstrap.Modal(delProductModal.value, {});
});
</script>

<template>
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
							<div class="col-sm-4 mb-4">
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
									<label for="customFile">上傳圖片</label>
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
										:alt="'上傳縮圖處'"
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
								<div class="row">
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
								<div class="row">
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
