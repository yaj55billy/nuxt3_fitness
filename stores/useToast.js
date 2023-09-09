import { ref } from "vue";
import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", () => {
	const isShow = ref(false);
	const message = ref("");
	const isShowHandle = () => {
		isShow.value = true;

		setTimeout(() => {
			isShow.value = false;
		}, 4000);
	};
	const messageHandle = (value) => {
		message.value = value;
	};
	return { isShow, isShowHandle, message, messageHandle };
});
