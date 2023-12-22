import {inject} from "vue";

export function useDesignStore() {
    /**
     *
     * @type {DesignStore}
     */
    const designStore = inject("design-store");
    return {designStore}
}
