import ConfigPanel from "./ConfigPanel.vue";
import Controller from "./Controller.vue";
import {FormBaseController} from "../FormBaseController";

const COMPONENT_TYPE = "FormInput";
const COMPONENT_NAME = "输入框";

export class FormInput extends FormBaseController {
    static _compType = COMPONENT_TYPE;
    static _compName = COMPONENT_NAME;
    static _compIcon = {elIcon: "Edit"};

    static registry(Vue) {
        Vue.component(COMPONENT_TYPE, Controller)
        Vue.component(COMPONENT_TYPE + "ConfigPanel", ConfigPanel)
    }

    constructor() {
        super(COMPONENT_TYPE, COMPONENT_NAME, {
            placeholder: "",
            type: "text"
        });
    }
}
