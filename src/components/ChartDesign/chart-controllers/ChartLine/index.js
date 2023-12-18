import ConfigPanel from "./ConfigPanel.vue";
import {BaseController} from "@/components/FormDesign/controllers/BaseController";
import {defineAsyncComponent} from "vue";

const COMPONENT_TYPE = "ChartLine";

export class ChartLine extends BaseController {
    static _compType = COMPONENT_TYPE;
    static _compName = "折线图";
    static _compIcon = {chartIcon: "chart-line"};

    /**
     *
     * @param register { (name:String,component:import("vue").Component|import("vue").DefineComponent) => void }
     */
    static registry(register) {
        register(COMPONENT_TYPE, defineAsyncComponent(() => import("./Controller.vue")))
        register(COMPONENT_TYPE + "H5", defineAsyncComponent(() => import("./ControllerH5.vue")))
        register(COMPONENT_TYPE + "ConfigPanel", ConfigPanel)
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
