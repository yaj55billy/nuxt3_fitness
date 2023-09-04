<script setup>
import LoadingCustom from "@/components/LoadingCustom.vue";
import { useToastStore } from "@/stores/useToast.js";
// toast store
const store = useToastStore();

// 取 .env
const config = useRuntimeConfig();

// 資料定義
const products = ref([]);
const nowProducts = ref([]);
const nowCategory = ref("全部課程");
const isLoading = ref(false);
const num = ref(1);

try {
	const api = `${config.public.apiUrl}/${config.public.uuid}/ec/products`;
	const { data: productsData } = await useFetch(api, {
		method: "GET",
		query: { page: num },
	});

	products.value = productsData.value.data;
	nowProducts.value = productsData.value.data;
	productHandler();
} catch (error) {}

const filterNotRepeat = computed(() => {
	return products.value
		.map((item) => item.category)
		.filter((element, index, arr) => arr.indexOf(element) === index);
});

const productHandler = (catchVal = "全部課程") => {
	nowProducts.value = [];
	if (catchVal === "全部課程") {
		nowCategory.value = catchVal;
		nowProducts.value = products.value;
	} else {
		nowCategory.value = catchVal;
		nowProducts.value = products.value.filter(
			(item) => item.category === catchVal
		);
	}
};

const addToCart = (id, quantity = 1) => {
	isLoading.value = true;
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
			store.messageHandle("商品已成功加入購物車");
			store.isShowHandle();
			isLoading.value = false;
		})
		.catch((error) => {
			store.messageHandle(error.response._data.errors[0]);
			store.isShowHandle();
			isLoading.value = false;
		});
};
</script>

<template>
	<div>
		<LoadingCustom v-if="isLoading" />
		<PageBanner :text="'課程列表'" />
		<div class="container prod">
			<div class="congratulate">
				<i class="fas fa-bullhorn congratulate-icon"></i>
				<p class="congratulate-text">
					慶祝 <span class="font-ubuntu">FitSpace</span>
					網站開幕，在 12/31 前，結帳輸入 fitspacegogo8 就享有課程售價 8
					折優惠。
				</p>
			</div>
			<ul class="list-unstyled prod-filter">
				<li class="prod-filter__list">
					<a
						href="#"
						class="btn btn-outline-primary btn-sm rounded-pill"
						:class="{ active: nowCategory === '全部課程' }"
						@click.prevent="productHandler('全部課程')"
					>
						全部課程
					</a>
				</li>
				<li
					v-for="item in filterNotRepeat"
					:key="item"
					class="prod-filter__list"
				>
					<a
						href="#"
						class="btn btn-outline-primary btn-sm rounded-pill"
						:class="{ active: item === nowCategory }"
						@click.prevent="productHandler(item)"
						>{{ item }}</a
					>
				</li>
			</ul>
			<div class="row mt-4">
				<div
					class="col-lg-4 col-md-6"
					v-for="item in nowProducts"
					:key="item.id"
				>
					<div class="card prod-card mb-4">
						<div class="prod-pic">
							<img
								:src="item.imageUrl[0]"
								class="card-img-top"
								:alt="item.title"
							/>
							<a href="" class="prod-cart" @click.prevent="addToCart(item.id)">
								<i class="fas fa-cart-plus"></i>
							</a>
						</div>
						<div class="card-body prod-body text-left">
							<h4 class="mb-0">{{ item.title }}</h4>
							<p class="text-muted mt-3 prod-content">{{ item.content }}</p>
							<div class="prod-price d-flex">
								<div class="me-auto">
									<del v-thousands="`NT$${item.origin_price}`"></del>
								</div>
								<div
									class="prod-price__special"
									v-thousands="`NT$${item.price}`"
								></div>
							</div>
						</div>
						<NuxtLink :to="`/product/${item.id}`" class="prod-link"> </NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
