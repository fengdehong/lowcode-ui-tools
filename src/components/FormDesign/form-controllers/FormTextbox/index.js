import ConfigPanel from "./ConfigPanel.vue";
import {FormBaseController} from "../FormBaseController";
import {defineAsyncComponent} from "vue";

const COMPONENT_TYPE = "FormTextbox";
const COMPONENT_NAME = "文本框";

export class FormTextbox extends FormBaseController {
    static _compType = COMPONENT_TYPE;
    static _compName = COMPONENT_NAME;
    static _compIcon = {elIcon: "Edit"};

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
        super(COMPONENT_TYPE, COMPONENT_NAME, {
            placeholder: "请输入",
        });
    }
}
