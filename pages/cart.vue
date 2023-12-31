<script setup>
import { useToastStore } from "@/stores/useToast.js";
import { useCartStore } from "@/stores/useCart.js";
import { useStatusStore } from "@/stores/useStatus.js";
import { useOrder } from "@/composables/useOrder.js";
import { useApiPath } from "@/composables/useApiPath";
const { createOrder } = useOrder();
const { apiPostCouponSearch } = useApiPath();
const toastStore = useToastStore();
const statusStore = useStatusStore();
const cartStore = useCartStore();
const coupon = ref({});
const couponPercent = ref(100);
const discount = ref({ code: "" });

const classDiscount = () => {
	statusStore.isLoading = true;
	$fetch(apiPostCouponSearch, {
		method: "POST",
		body: discount.value,
	})
		.then((res) => {
			toastStore.messageHandle("恭喜已為您折扣課程費用");
			toastStore.isShowHandle();
			couponPercent.value = res.data.percent;
			coupon.value = res.data;
		})
		.catch(() => {
			toastStore.messageHandle("折扣碼錯誤，請再確認看看是否輸入錯誤");
			toastStore.isShowHandle();
			couponPercent.value = 100;
			cartStore.getCart();
		})
		.finally(() => {
			statusStore.isLoading = false;
		});
};

const sendForm = (formdata) => {
	const orderData = formdata;
	if (coupon.value.enabled) {
		orderData.coupon = coupon.value.code;
	}
	createOrder(orderData);
};

onMounted(() => {
	cartStore.getCart();
});
</script>
<template>
	<div class="page">
		<section class="section">
			<div class="cart-page">
				<div class="container">
					<ul class="shop-step">
						<li
							class="shop-step__list"
							:class="{ complete: !cartStore.cartsEmpty }"
						>
							<div class="shop-step__num">1</div>
							<div>訂單</div>
						</li>
						<li class="shop-step__list">
							<div class="shop-step__num">2</div>
							<div>付款</div>
						</li>
						<li class="shop-step__list">
							<div class="shop-step__num">3</div>
							<div>完成</div>
						</li>
					</ul>
					<div class="cart-title">
						<h2 style="">訂單</h2>
						<NuxtLink
							to="/products"
							class="btn btn-outline-primary btn-md rounded-pill"
							>繼續購物</NuxtLink
						>
					</div>
					<div v-if="cartStore.cartsEmpty === true">
						<div class="cart-empty">
							<h2 class="cart-empty__title">
								QQ~~<br />
								購物車內沒有商品，<br />
								點擊上方按鈕去物色喜歡的課程吧 !
							</h2>
						</div>
					</div>
					<div v-else>
						<ul class="cart-info">
							<li
								class="cart-info__list"
								v-for="item in cartStore.carts"
								:key="item.product.id + 1"
							>
								<div class="cart-info__pic">
									<img
										:src="item.product.imageUrl[0]"
										:alt="item.product.title"
									/>
								</div>
								<div class="cart-info__con">
									<h4 class="cart-info__title">{{ item.product.title }}</h4>
									<div class="cart-info__count">
										<button
											type="button"
											class="btn-cart"
											:disabled="item.quantity === 1"
											@click="
												item.quantity--;
												cartStore.editCartItemNum(
													item.product.id,
													item.quantity
												);
											"
										>
											-
										</button>
										<input
											type="number"
											class="cart-info__input"
											v-model="item.quantity"
											min="1"
											disabled
										/>
										<button
											type="button"
											class="btn-cart"
											:disabled="item.product.category === '體驗課程'"
											@click="
												item.quantity++;
												cartStore.editCartItemNum(
													item.product.id,
													item.quantity
												);
											"
										>
											+
										</button>
									</div>
								</div>
								<div
									class="cart-info__price"
									v-thousands="`$${item.product.price}`"
								></div>
								<div
									class="cart-info__close"
									@click="cartStore.deleteCartItem(item.product.id)"
								>
									<i class="far fa-trash-alt"></i>
								</div>
							</li>
						</ul>
						<div class="row cart-footer">
							<div class="col-md-8 cart-footer__coupon">
								<div class="input-group">
									<input
										type="text"
										class="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
										placeholder="折價券"
										v-model="discount.code"
									/>
									<div class="input-group-append">
										<button
											class="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
											type="button"
											id="button-discount"
											@click="classDiscount()"
										>
											<i class="fas fa-paper-plane"></i>
										</button>
									</div>
								</div>
								<div class="congratulate">
									<i class="fas fa-bullhorn congratulate-icon"></i>
									<p class="congratulate-text">
										慶祝 <span class="font-ubuntu">FitSpace</span>
										網站開幕，在 12/31 前，結帳輸入 fitspacegogo8 就享有課程售價
										8 折優惠。
									</p>
								</div>
							</div>
							<div class="col-md-4 cart-footer__total">
								<div class="cart-footer__total--item">
									<p class="mb-0">小計</p>
									<p class="mb-0" v-thousands="`$${cartStore.cartPrice}`"></p>
								</div>
								<div class="cart-footer__total--item">
									<p class="mb-0">折扣</p>
									<p
										class="mb-0"
										v-thousands="
											`$${Math.round(
												cartStore.cartPrice * ((100 - couponPercent) / 100)
											)}`
										"
									></p>
								</div>
								<div class="cart-footer__total--item mt-2">
									<p class="mb-0 h4 fw-bold">總計</p>
									<p
										class="mb-0 h4 fw-bold"
										v-thousands="
											`$${cartStore.cartPrice * (couponPercent / 100)}`
										"
									></p>
								</div>
							</div>
						</div>
						<VForm
							class="form mt-5 needs-validation"
							v-slot="{ meta, errors, values }"
							novalidate
							@submit="sendForm"
						>
							<h3 class="text-left">填寫資料</h3>
							<div class="form-group">
								<label for="name" class="text-left w-100">收件人姓名</label>
								<VField
									id="name"
									label="收件人姓名"
									name="name"
									type="text"
									rules="required"
									class="form-control"
									:class="{
										'is-invalid': errors.name,
										'is-valid': !errors.name && values.name,
									}"
									autocomplete="off"
								/>
								<VErrorMessage name="name" v-slot="{ message }">
									<div class="invalid-feedback">{{ message }}</div>
								</VErrorMessage>
							</div>
							<div class="form-group">
								<label for="email" class="text-left w-100">Email</label>
								<VField
									id="email"
									name="email"
									type="email"
									rules="required|email"
									class="form-control"
									:class="{
										'is-invalid': errors.email,
										'is-valid': !errors.email && values.email,
									}"
									autocomplete="off"
								/>
								<VErrorMessage name="email" v-slot="{ message }">
									<div class="invalid-feedback">{{ message }}</div>
								</VErrorMessage>
							</div>
							<div class="form-group">
								<label for="tel" class="text-left w-100">電話</label>
								<VField
									id="tel"
									label="電話"
									name="tel"
									type="tel"
									rules="required|min:8"
									class="form-control"
									:class="{
										'is-invalid': errors.tel,
										'is-valid': !errors.tel && values.tel,
									}"
									autocomplete="off"
								/>
								<VErrorMessage name="tel" v-slot="{ message }">
									<div class="invalid-feedback">{{ message }}</div>
								</VErrorMessage>
							</div>
							<div class="form-group">
								<label for="address" class="text-left w-100">地址</label>
								<VField
									id="address"
									label="地址"
									name="address"
									type="text"
									rules="required"
									class="form-control"
									:class="{
										'is-invalid': errors.address,
										'is-valid': !errors.address && values.address,
									}"
									autocomplete="off"
								/>
								<VErrorMessage name="address" v-slot="{ message }">
									<div class="invalid-feedback">{{ message }}</div>
								</VErrorMessage>
							</div>
							<div class="form-group">
								<label for="payment" class="text-left w-100">購買方式</label>
								<VField
									as="select"
									class="form-select"
									id="payment"
									label="購買方式"
									name="payment"
									rules="required"
									:class="{
										'is-invalid': errors.payment,
										'is-valid': !errors.payment && values.payment,
									}"
								>
									<option value="" disabled="disabled" selected>
										請選擇付款方式
									</option>
									<option value="WebATM">WebATM</option>
									<option value="ATM">ATM</option>
									<option value="Barcode">Barcode</option>
									<option value="Credit">Credit</option>
									<option value="ApplePay">ApplePay</option>
									<option value="GooglePay">GooglePay</option>
								</VField>
								<VErrorMessage name="payment" v-slot="{ message }">
									<div class="invalid-feedback">{{ message }}</div>
								</VErrorMessage>
							</div>
							<div class="form-group">
								<label for="message" class="text-left w-100">留言</label>
								<VField
									as="textarea"
									cols="30"
									rows="3"
									id="message"
									name="message"
									class="form-control"
								/>
							</div>
							<div class="btn-area right">
								<button
									type="submit"
									class="btn btn-primary rounded-pill btn-xl"
									:disabled="!meta.valid"
								>
									前往結帳
								</button>
							</div>
						</VForm>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
