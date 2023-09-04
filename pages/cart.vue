<script setup>
const createOrder = (values) => {
	console.log(values);
};
</script>
<template>
	<br />
	<br />
	<br />
	<h1>購物車</h1>
	<div class="container">
		<VForm
			class="form mt-5 needs-validation"
			v-slot="{ meta, errors, values }"
			novalidate
			@submit="createOrder"
		>
			<h3 class="text-left">填寫資料</h3>
			<pre>
        {{ errors }}
        {{ values }}
      </pre>
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
				/>
				<VErrorMessage name="address" v-slot="{ message }">
					<div class="invalid-feedback">{{ message }}</div>
				</VErrorMessage>
			</div>
			<div class="form-group">
				<label for="payment" class="text-left w-100">購買方式</label>
				<VField
					class="form-control"
					id="payment"
					label="購買方式"
					name="payment"
					as="select"
					rules="required"
				>
					<option value="" disabled="disabled" selected>請選擇付款方式</option>
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
</template>

<style></style>
