<script setup>
import { useLoading } from "vue-loading-overlay";
import Pagination from "@/components/Pagination.vue";

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
const isLoading = ref(false);

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

onMounted(() => {
	getProducts();
	// store.messageHandle("檔案上傳失敗，請再檢查是不是檔案大小超過 2MB");
	// store.isShowHandle();
});
</script>

<template>
	<div ref="pageLoading"></div>
	<div class="mt-4">
		<h2>產品列表</h2>
		<div class="text-end mt-sm-2 mt-4">
			<button class="btn btn-primary" @click="openModal('new')">
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
	</div>
</template>
