import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import {zhCn} from "element-plus/es/locale/index";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ControllersRegister from "./components/FormDesign/controllers/Register.js"
import FormRegister from "./components/FormDesign/form-controllers/Register.js"
import ChartRegister from "./components/ChartDesign/chart-controllers/Register.js"
import router from "./router";

import VueGridLayout from 'vue-grid-layout'

const app = createApp(App);
app.use(ElementPlus, {locale: zhCn});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(VueGridLayout);
app.use(ControllersRegister);
app.use(FormRegister);
app.use(ChartRegister);
app.use(router);
app.mount('#app')
