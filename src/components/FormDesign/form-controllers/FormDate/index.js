import ConfigPanel from "./ConfigPanel.vue";
import Controller from "./Controller.vue";
import {FormBaseController} from "../FormBaseController";

const COMPONENT_TYPE = "FormDate";
const COMPONENT_NAME = "日期";

export class FormDate extends FormBaseController {
    static _compType = COMPONENT_TYPE;
    static _compName = COMPONENT_NAME;
    static _compIcon = {elIcon: "Calendar"};

    static registry(Vue) {
        Vue.component(COMPONENT_TYPE, Controller)
        Vue.component(COMPONENT_TYPE + "ConfigPanel", ConfigPanel)
    }

    constructor() {
        super(COMPONENT_TYPE, COMPONENT_NAME, {
            placeholder: "",
        });
    }
}
