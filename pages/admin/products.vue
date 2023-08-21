<script setup>
definePageMeta({
	layout: false,
});

// const props = defineProps({
// 	test: String,
// });

// console.log(props);

const config = useRuntimeConfig(); // 取 .env
const products = ref([]);

// const getProducts = async (num = 1) => {
// 	const api = `${config.public.apiUrl}/${config.public.uuid}/admin/ec/products`;
// 	const { data } = await $fetch(api, { query: { page: num } }).catch(
// 		(err) => err.data
// 	);
// 	console.log(data);
// };

onMounted(() => {
	// products
	// getProducts();
});
</script>

<template>
	<NuxtLayout name="dashboard">
		<div class="mt-4">
			<!-- <loading :active.sync="isLoading"></loading> -->
			<h2>產品列表</h2>
			<div class="text-right mt-sm-2 mt-4">
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
				<!-- <tbody>
					<tr v-for="item in products" :key="item.id">
						<td data-th="分類">{{ item.category }}</td>
						<td data-th="產品名稱">{{ item.title }}</td>
						<td data-th="原價">{{ item.origin_price | toThousands }}</td>
						<td data-th="售價">{{ item.price | toThousands }}</td>
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
				</tbody> -->
			</table>
		</div>
	</NuxtLayout>
</template>
