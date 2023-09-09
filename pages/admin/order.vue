<script setup>
import Pagination from "@/components/Pagination.vue";
import { useAdminOrder } from "@/composables/useAdminOrder.js";
const { orders, pagination, paidLoading, getOrders, changePaidStatus } =
	useAdminOrder();
onMounted(() => {
	getOrders();
});
</script>

<template>
	<div class="mt-4">
		<h2>訂單列表</h2>
		<table class="table table-admin table-rwd mt-4">
			<thead>
				<tr>
					<th>下單時間</th>
					<th>購買款項</th>
					<th>付款方式</th>
					<th>應付金額</th>
					<th>是否付款</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in orders" :key="item.id">
					<td data-th="下單時間">{{ item.created.datetime }}</td>
					<td data-th="購買款項">{{ item.products[0].product.title }}</td>
					<td data-th="付款方式">{{ item.payment }}</td>
					<td data-th="應付金額" v-thousands="item.amount"></td>
					<td data-th="是否付款">
						<input
							type="checkbox"
							:id="item.id"
							:checked="item.paid"
							@change="changePaidStatus(item)"
						/>
						<label :for="item.id">
							<span v-if="item.paid" class="text-success"> 已付款 </span>
							<span v-else> 尚未付款 </span>
						</label>
						<div
							class="spinner-border text-primary"
							role="status"
							style="width: 12px; height: 12px"
							v-if="paidLoading"
						>
							<span class="sr-only">Loading...</span>
						</div>
					</td>
				</tr>
			</tbody>
		</table>

		<pagination :pagedata="pagination" @update="getOrders"></pagination>
	</div>
</template>

<style lang="scss" scoped>
input[type="checkbox"] {
	margin-right: 3px;
	vertical-align: middle;
}
</style>
