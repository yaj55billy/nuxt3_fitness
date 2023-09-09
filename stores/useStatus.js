import { ref } from "vue";
import { defineStore } from "pinia";
export const useStatusStore = defineStore("loadingStatus", () => {
	const isLoading = ref(false);
	return { isLoading };
});
