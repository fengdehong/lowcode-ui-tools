import ConfigPanel from "./ConfigPanel.vue";
import Controller from "./Controller.vue";
import {BaseController} from "../BaseController";

const COMPONENT_TYPE = "FenText";

export class FenText extends BaseController {
    static _compType = COMPONENT_TYPE;
    static _compName = "文本";
    static _compIcon = {elIcon: "Document"};

    static registry(Vue) {
        Vue.component(COMPONENT_TYPE, Controller)
        Vue.component(COMPONENT_TYPE + "ConfigPanel", ConfigPanel)
    }

    constructor() {
        super(COMPONENT_TYPE, {
            //内容
            content: "文本",
            leftIconClass: null,
            rightIconClass: null,
        });
    }
}
