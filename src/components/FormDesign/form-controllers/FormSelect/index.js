import ConfigPanel from "./ConfigPanel.vue";
import Controller from "./Controller.vue";
import {FormBaseController} from "../FormBaseController";

const COMPONENT_TYPE = "FormSelect";
const COMPONENT_NAME = "下拉框";

export class FormSelect extends FormBaseController {
    static _compType = COMPONENT_TYPE;
    static _compName = COMPONENT_NAME;
    static _compIcon = {elIcon: "DocumentChecked"};

    static registry(Vue) {
        Vue.component(COMPONENT_TYPE, Controller)
        Vue.component(COMPONENT_TYPE + "ConfigPanel", ConfigPanel)
    }

    constructor() {
        super(COMPONENT_TYPE, COMPONENT_NAME, {
            placehold: "",
            options: [
                {label: "选项名", value: "选项值"}
            ]
        });
    }
}
