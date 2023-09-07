<script setup>
import { useOrder } from "@/composables/useOrder";
const { order, getOrder, payOrder } = useOrder();
onMounted(() => {
	getOrder();
});
</script>
<template>
	<div class="page">
		<section class="section">
			<div class="cart-page">
				<div class="container">
					<ul class="shop-step">
						<li class="shop-step__list complete">
							<div class="shop-step__num">1</div>
							<div>訂單</div>
						</li>
						<li class="shop-step__list complete">
							<div class="shop-step__num">2</div>
							<div>付款</div>
						</li>
						<li class="shop-step__list">
							<div class="shop-step__num">3</div>
							<div>完成</div>
						</li>
					</ul>
					<div class="cart-title">
						<h2 style="">付款頁</h2>
					</div>
					<ul class="cart-info">
						<li
							class="cart-info__list"
							v-for="item in order.products"
							:key="item.product.description"
						>
							<div class="cart-info__pic">
								<img
									:src="item.product.imageUrl[0]"
									:alt="item.product.title"
								/>
							</div>
							<div class="cart-info__con">
								<h4 class="cart-info__title">{{ item.product.title }}</h4>
							</div>
							<div class="cart-info__num">
								<span class="fw-bold">{{ item.quantity }}</span> 堂
							</div>
							<div
								class="cart-info__price text-end"
								v-thousands="`$${item.product.price}`"
							></div>
						</li>
					</ul>
					<div class="row justify-content-end">
						<div class="col-md-4 cart-footer__total">
							<div class="cart-footer__total--item mt-2">
								<p class="mb-0 h4 fw-bold">
									總計<span class="h6">(已折扣)</span>
								</p>
								<p
									class="mb-0 h4 fw-bold"
									v-thousands="`$${order.amount ? order.amount : 0}`"
								></p>
							</div>
						</div>
					</div>
					<div class="cart-order">
						<h3 class="text-left">訂購人資料</h3>
						<ul class="cart-order__list" v-if="order.user">
							<li class="cart-order__item">
								<label class="cart-order__label">姓名:</label>
								<p class="cart-order__text">{{ order.user.name }}</p>
							</li>
							<li class="cart-order__item">
								<label class="cart-order__label">Email:</label>
								<p class="cart-order__text">{{ order.user.email }}</p>
							</li>
							<li class="cart-order__item">
								<label class="cart-order__label">電話:</label>
								<p class="cart-order__text">{{ order.user.tel }}</p>
							</li>
							<li class="cart-order__item">
								<label class="cart-order__label">地址:</label>
								<p class="cart-order__text">{{ order.user.address }}</p>
							</li>
							<li class="cart-order__item">
								<label class="cart-order__label">付款方式:</label>
								<p class="cart-order__text">{{ order.payment }}</p>
							</li>
						</ul>
					</div>
					<button
						type="button"
						class="btn btn-primary rounded-pill btn-xl"
						@click="payOrder()"
					>
						付款
					</button>
				</div>
			</div>
		</section>
	</div>
</template>
