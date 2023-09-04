<script setup>
import LoadingCustom from "@/components/LoadingCustom.vue";
import { useToastStore } from "@/stores/useToast.js";

// route
const route = useRoute();
const router = useRouter();

// toast store
const store = useToastStore();

// 取 .env
const config = useRuntimeConfig();

// 資料定義
const classNum = ref(1);
const classMax = ref(36);
const product = ref({});
const relatedProducts = ref([]);
const isLoading = ref(false); // api use

// api
const getRelatedProducts = () => {
	const api = `${config.public.apiUrl}/${config.public.uuid}/ec/products`;
	relatedProducts.value = [];
	$fetch(api).then((res) => {
		const resData = res.data;
		resData.filter((item) => {
			return item.category === product.value.category &&
				item.title !== product.value.title
				? relatedProducts.value.push(item)
				: "";
		});
	});
};
try {
	const { id } = route.params;
	const api = `${config.public.apiUrl}/${config.public.uuid}/ec/product/${id}`;

	const { data: productRes } = await useFetch(api);
	product.value = productRes.value.data;
	if (product.value.category === "體驗課程") {
		classMax.value = 1;
	}
	getRelatedProducts();
} catch (error) {
	store.messageHandle("Oops...發生了一些錯誤，請稍候重整看看。");
	store.isShowHandle();
}

const goOtherPage = (id) => {
	router.push(`/product/${id}`);
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
		<div class="container prod-detail">
			<div class="row align-items-start">
				<div class="col-md-6">
					<div
						id="carouselExampleControls"
						class="carousel slide"
						data-bs-ride="carousel"
					>
						<div class="carousel-inner">
							<div
								class="carousel-item"
								v-for="(item, index) in product.imageUrl"
								:key="item.id"
								:class="{ active: index === 0 }"
							>
								<img :src="item" class="d-block w-100" :alt="product.title" />
							</div>
						</div>
						<button
							v-if="product.imageUrl.length > 1"
							class="carousel-control-prev"
							type="button"
							data-bs-target="#carouselExampleControls"
							data-bs-slide="prev"
						>
							<span
								class="carousel-control-prev-icon"
								aria-hidden="true"
							></span>
							<span class="visually-hidden">Previous</span>
						</button>
						<button
							v-if="product.imageUrl.length > 1"
							class="carousel-control-next"
							type="button"
							data-bs-target="#carouselExampleControls"
							data-bs-slide="next"
						>
							<span
								class="carousel-control-next-icon"
								aria-hidden="true"
							></span>
							<span class="visually-hidden">Next</span>
						</button>
					</div>
				</div>
				<div class="col-md-6">
					<h2 class="h2 prod-detail__title">{{ product.title }}</h2>
					<div class="prod-detail__price">
						<span
							class="prod-detail__price--discount"
							v-thousands="`$${product.price}`"
						>
						</span>
						<del
							class="prod-detail__price--origin"
							v-thousands="`$${product.origin_price}`"
						>
						</del>
					</div>
					<p class="prod-detail__description">
						{{ product.description }}
					</p>
					<div class="form-group mt-2">
						<label for="classNum" class="prod-detail__label">課程數量：</label>
						<select
							class="form-select prod-detail__select"
							id="classNum"
							v-model="classNum"
						>
							<option :value="item" v-for="item in classMax" :key="item">
								{{ item }}
							</option>
						</select>
					</div>
					<div class="btn-area right">
						<NuxtLink
							to="/products"
							class="btn btn-outline-primary btn-md rounded-pill"
							>回課程頁</NuxtLink
						>
						<a
							href=""
							class="btn btn-primary btn-md rounded-pill"
							@click.prevent="addToCart(product.id, classNum)"
							>加入購物車</a
						>
					</div>
				</div>
			</div>
			<div class="prod-detail__need mt-4">
				<h3 class="prod-detail__subtitle">購課須知</h3>
				<ul class="prod-detail__list">
					<li>
						購課後我們將於 1~3 個工作天跟您聯繫，若有任何問題也歡迎撥打
						02-3456-7890。
					</li>
					<li>我們的教練都有經過嚴格篩選，並且教育不得強迫推銷課程。</li>
					<li>上課時，記得自備水壺跟毛巾，並著裝適合運動的服裝、鞋子。</li>
					<li>疫情期間入館內皆須量體溫，我們也會頻繁實施館內消毒清潔。</li>
				</ul>
			</div>
			<div class="prod-detail__maybelike" v-if="relatedProducts.length !== 0">
				<h3 class="prod-detail__subtitle">您可能也會喜歡</h3>
				<div class="row">
					<div
						class="col-lg-4 col-md-6"
						v-for="item in relatedProducts"
						:key="item.id"
					>
						<div class="card prod-card mb-4">
							<div class="prod-pic">
								<img
									:src="item.imageUrl[0]"
									class="card-img-top"
									:alt="item.title"
								/>
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
							<a
								href="javascript:"
								class="prod-link"
								@click.prevent="goOtherPage(item.id)"
							></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
