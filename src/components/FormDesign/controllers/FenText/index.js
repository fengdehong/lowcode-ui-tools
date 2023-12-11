import ConfigPanel from "./ConfigPanel.vue";
import Controller from "./Controller.vue";
import {BaseController} from "../BaseController";

const COMPONENT_TYPE = "FenText";

export class FenText extends BaseController {
    static _compType = COMPONENT_TYPE;
    static _compName = "文本";
    static _compIcon = 'iconfont icon-ABC';

    static registry(Vue) {
        Vue.component(COMPONENT_TYPE, Controller)
        Vue.component(COMPONENT_TYPE + "ConfigPanel", ConfigPanel)
    }

    constructor() {
        super(COMPONENT_TYPE, {
            //内容
            content: "文本",
            //单位px
            fontSize: 14,
            //字重
            fontWeight: 400,
            //单位px
            lineHeight: 48,
            //字体颜色
            color: "#000000",
            //字体颜色
            backgroundColor: "#FFFFFF",
            textAlign: "center",
            leftIconClass: null,
            rightIconClass: null,
        });
    }
}
