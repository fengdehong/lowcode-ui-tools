import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import {zhCn} from "element-plus/es/locale/index";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ControllersRegister from "./components/FormDesign/controllers/Register.js"
import FormRegister from "./components/FormDesign/form-controllers/Register.js"

const app = createApp(App);
app.use(ElementPlus, {locale: zhCn});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ControllersRegister);
app.use(FormRegister);
app.mount('#app')
