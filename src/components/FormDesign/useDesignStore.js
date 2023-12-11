import {inject} from "vue";

export function useDesignStore() {
    const designStore = inject("design-store");
    return {designStore}
}
