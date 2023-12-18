import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/form-design"
        },
        {
            path: "/form-design",
            name: "form-design",
            meta: {title: "表单设计"},
            component: () => import("../views/FormDesignPage.vue")
        },
        {
            path: "/chart-design",
            name: "chart-design",
            meta: {title: "报表设计"},
            component: () => import("../views/ChartDesignPage.vue")
        },
        {
            path: "/resizable-test",
            name: "resizable-test",
            meta: {title: "报表设计"},
            component: () => import("../views/ResizableTestPage.vue")
        },
        {
            path: "/vue-grid-layout",
            name: "vue-grid-layout",
            meta: {title: "布局设计"},
            component: () => import("../views/VueGridLayoutPage.vue")
        },
    ]
})

export default router
