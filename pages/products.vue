<script setup>
/*
  useFetch 範例
  const { data, pending, error, refresh } = await useFetch('https://api.nuxtjs.dev/mountains', {
    query: { param1, param2: 'value2' }
  })

  // getProducts(num = 1) {
  //   this.isLoading = true;
  //   const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products?page=${num}`;
  //   this.axios.get(url).then((res) => {
  //     this.products = res.data.data;
  //     this.nowProducts = res.data.data;
  //     this.isLoading = false;
  //   });
  // }
*/

const config = useRuntimeConfig(); // 取 .env
const url = `${config.public.apiUrl}/${config.public.uuid}/ec/products?page=1`;

console.log(url);

const { data: productsData } = await useFetch(url);
console.log(productsData);

const products = ref([]);
const nowProducts = ref([]);
const nowCategory = ref("");
const isLoading = ref(false);
// const num = 1;

products.value = productsData.value.data;
nowProducts.value = productsData.value.data;
</script>
<!-- 
<template>
	
	{{ products[0] }}
	<div v-for="item in products" :key="item.id">{{ item.title }}</div>
</template> -->
<template>
	<div>
		<!-- <loading :active.sync="isLoading">
      <div class="loadingio-spinner-ball-h1u60i2wsu">
        <div class="ldio-ivekc1fyg2">
          <div></div>
        </div>
      </div>
    </loading> -->
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
			<!-- <ul class="list-unstyled prod-filter">
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
			</ul> -->
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
							<div class="prod-price">
								<div class="float-left">
									<del>NT$ {{ item.origin_price }}</del>
									<!-- <del>NT${{ item.origin_price | toThousands }}</del> -->
								</div>
								<div class="float-right prod-price__special">
									<!-- NT$ {{ item.price }} NT${{ item.price | toThousands }} -->
								</div>
							</div>
						</div>
						<NuxtLink :to="`/product/${item.id}`" class="prod-link"> </NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style></style>
