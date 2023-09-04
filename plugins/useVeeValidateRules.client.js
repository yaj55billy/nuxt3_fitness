import { defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
export default defineNuxtPlugin((nuxtApp) => {
	configure({
		generateMessage: (context) => {
			const messages = {
				required: `${context.field} 為必填項目`,
				min: `請輸入至少 8 碼`,
				max: `This field ${context.field} is too long.`,
				email: `請輸入正確的 ${context.field} 格式`,
			};
			const message = messages[context.rule.name]
				? messages[context.rule.name]
				: `The field ${context.field} is invalid`;
			return message;
		},
		validateOnBlur: true,
		validateOnChange: true,
		validateOnInput: false,
		validateOnModelUpdate: true,
	});

	Object.keys(AllRules).forEach((rule) => {
		defineRule(rule, AllRules[rule]);
	});
});
