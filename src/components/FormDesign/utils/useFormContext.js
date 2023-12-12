import {inject} from "vue";

export function useFormContext() {
    /**
     *
     * @type {import("vue").reactive<{[String]:Object}>}
     */
    const form = inject("form");
    /**
     *
     * @type {FormField[]}
     */
    const formFields = inject("form-fields");
    /**
     *
     * @type {import('vue').Ref<Boolean>}
     */
    const readonly = inject("form-readonly");
    /**
     *
     * @type {import('vue').Ref<Boolean>}
     */
    const isResult = inject("form-isResult");


    /**
     *
     * @param key
     * @return {Boolean}
     */
    function fieldReadonly(key) {
        const field = formFields.find(field => field.id === key);
        if (!field) return true;
        return readonly.value || field.permission === 'read';
    }

    /**
     *
     * @param formItemConfig {FormItemConfig}
     * @return {Boolean}
     */
    function fieldVisible(formItemConfig) {
        if (!formItemConfig) return false;
        console.log("isResult.value", isResult.value, formItemConfig.showOnResult)
        if (isResult.value && formItemConfig.showOnResult) return true;
        console.log("formFields:", formFields);
        const field = formFields.find(field => field.key === formItemConfig.key);
        const result = field && field.permission !== 'hidden' && !(readonly.value && field.permission === 'write');
        console.log("result:", field, formItemConfig, result);
        return result;
    }

    return {form, formFields, readonly, isResult, fieldVisible, fieldReadonly}
}
