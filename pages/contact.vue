<script setup>
import LoadingCustom from "@/components/LoadingCustom.vue";
import { useToastStore } from "@/stores/useToast.js";
import { useStatusStore } from "@/stores/useStatus.js";

// toast store
const store = useToastStore();
const statusStore = useStatusStore();

const sendMail = (formData, actions) => {
	statusStore.isLoading = true;
	store.messageHandle("成功寄出，我們將會在三個工作天內回覆您。");
	store.isShowHandle();
	setTimeout(() => {
		actions.resetForm();
		statusStore.isLoading = false;
	}, 1500);
};
</script>

<template>
	<PageBanner :text="'聯絡我們'" />
	<div class="mt-6 mb-6">
		<div class="container">
			<h2 class="home-title">聯絡我們</h2>
			<div class="row align-items-center">
				<div class="col-md-4">
					<div class="contact">
						<h4 class="contact-title">跟我們說說?</h4>
						<p>
							有任何問題都歡迎透過電話或表單聯繫我們，表單聯繫會在三個工作天回覆您。
						</p>
						<div class="contact-info">
							<i class="fas fa-phone"></i> 電話：02-3456-7890
						</div>
						<div class="contact-info">
							<i class="far fa-clock"></i> 營業時間：10:00 ~ 22:00
						</div>
						<div class="contact-info">
							<i class="fas fa-map-marker-alt"></i>
							地址：新北市土城區海山路18號 (土城海山捷運站3號出口步行約3分鐘)
						</div>
					</div>
				</div>
				<div class="col-md-8 me-auto">
					<VForm
						class="form mt-5 needs-validation"
						v-slot="{ meta, errors, values }"
						novalidate
						@submit="sendMail"
					>
						<div class="form-group">
							<label for="contactName" class="text-left w-100">姓名</label>
							<VField
								id="contactName"
								label="姓名"
								name="contactName"
								type="text"
								rules="required"
								class="form-control"
								:class="{
									'is-invalid': errors.contactName,
									'is-valid': !errors.contactName && values.contactName,
								}"
								autocomplete="off"
							/>
							<VErrorMessage name="contactName" v-slot="{ message }">
								<div class="invalid-feedback">{{ message }}</div>
							</VErrorMessage>
						</div>
						<div class="form-group">
							<label for="contactEmail" class="text-left w-100">Email</label>
							<VField
								id="contactEmail"
								name="contactEmail"
								type="email"
								label="信箱"
								rules="required|email"
								class="form-control"
								:class="{
									'is-invalid': errors.contactEmail,
									'is-valid': !errors.contactEmail && values.contactEmail,
								}"
								autocomplete="off"
							/>
							<VErrorMessage name="contactEmail" v-slot="{ message }">
								<div class="invalid-feedback">{{ message }}</div>
							</VErrorMessage>
						</div>
						<div class="form-group">
							<label for="contactTel" class="text-left w-100">電話</label>
							<VField
								id="contactTel"
								label="電話"
								name="contactTel"
								type="tel"
								rules="required|min:8"
								class="form-control"
								:class="{
									'is-invalid': errors.contactTel,
									'is-valid': !errors.contactTel && values.contactTel,
								}"
								autocomplete="off"
							/>
							<VErrorMessage name="contactTel" v-slot="{ message }">
								<div class="invalid-feedback">{{ message }}</div>
							</VErrorMessage>
						</div>
						<div class="form-group">
							<label for="contactMessage" class="text-left w-100">留言</label>
							<VField
								as="textarea"
								rules="required"
								cols="30"
								rows="3"
								id="contactMessage"
								name="contactMessage"
								label="留言"
								class="form-control"
								:class="{
									'is-invalid': errors.contactMessage,
									'is-valid': !errors.contactMessage && values.contactMessage,
								}"
							/>
							<VErrorMessage name="contactMessage" v-slot="{ message }">
								<div class="invalid-feedback">{{ message }}</div>
							</VErrorMessage>
						</div>
						<div class="btn-area right">
							<button
								type="submit"
								class="btn btn-primary rounded-pill btn-xl"
								:disabled="!meta.valid"
							>
								留言
							</button>
						</div>
					</VForm>
				</div>
			</div>
		</div>
	</div>
</template>
