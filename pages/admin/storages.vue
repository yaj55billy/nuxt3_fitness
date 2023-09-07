<script setup>
import Pagination from "@/components/Pagination.vue";
import { useToastStore } from "@/stores/useToast.js";
import { useStatusStore } from "@/stores/useStatus.js";

// cart Store
const statusStore = useStatusStore();

// bootstrap js
const { $bootstrap } = useNuxtApp();

// 取 .env
const config = useRuntimeConfig();

// toast store
const store = useToastStore();

// 資料定義
const storages = ref([]);
const tempStorage = ref([]);
const pagination = ref({});

// 取 dom
const delStorageModal = ref(null);
let delStorageModalHandle;

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
	delStorageModalHandle.show();
};

const deleteStorage = (id) => {
	statusStore.isLoading = true;
	const api = `${config.public.apiUrl}/${config.public.uuid}/admin/storage/${id}`;

	$fetch(api, {
		method: "DELETE",
		headers: headers,
	})
		.then(() => {
			delStorageModalHandle.hide();
			store.messageHandle("圖片刪除成功~~");
			store.isShowHandle();
			getData();
		})
		.catch(() => {
			delStorageModalHandle.hide();
			store.messageHandle("圖片刪除失敗，請再檢查看看");
			store.isShowHandle();
		})
		.finally(() => {
			statusStore.isLoading = false;
		});
};

onMounted(() => {
	getData();
	delStorageModalHandle = new $bootstrap.Modal(delStorageModal.value, {});
});
</script>

<template>
	<div class="mt-4">
		<h2 class="mt-sm-5 mt-4">圖片列表</h2>
		<table class="table table-admin mt-4">
			<thead>
				<tr>
					<th width="600" class="text-center">圖片</th>
					<th width="600" class="text-center">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in storages" :key="item.id">
					<td class="text-center">
						<img :src="item.path" alt="" style="max-width: 180px" />
					</td>
					<td class="text-center">
						<button
							type="button"
							class="btn btn-outline-danger btn-sm"
							@click="openDelModal(item)"
						>
							刪除
						</button>
					</td>
				</tr>
			</tbody>
		</table>
		<pagination :pagedata="pagination" @update="getData"></pagination>

		<div
			id="delStorageModal"
			class="modal fade"
			ref="delStorageModal"
			tabindex="-1"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog" role="document">
				<div class="modal-content border-0">
					<div class="modal-header bg-danger text-white">
						<h5 id="exampleModalLabel" class="modal-title">
							<span>刪除圖片素材</span>
						</h5>
						<button
							type="button"
							class="btn-close btn-white"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						是否刪除這張圖片素材? (刪除後將無法恢復)
						<br />
						<img :src="tempStorage.path" alt="" style="max-width: 100%" />
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-outline-secondary"
							data-bs-dismiss="modal"
						>
							取消
						</button>
						<button
							type="button"
							class="btn btn-danger"
							@click="deleteStorage(tempStorage.id)"
						>
							確認刪除
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
