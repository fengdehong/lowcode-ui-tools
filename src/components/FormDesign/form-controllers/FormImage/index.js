import ConfigPanel from "./ConfigPanel.vue";
import Controller from "./Controller.vue";
import {FormBaseController} from "../FormBaseController";

const COMPONENT_TYPE = "FormImage";
const COMPONENT_NAME = "图片上传";

export class FormImage extends FormBaseController {
    static _compType = COMPONENT_TYPE;
    static _compName = COMPONENT_NAME;
    static _compIcon = {elIcon: "Picture"};

    static registry(Vue) {
        Vue.component(COMPONENT_TYPE, Controller)
        Vue.component(COMPONENT_TYPE + "ConfigPanel", ConfigPanel)
    }

    constructor() {
        super(COMPONENT_TYPE, COMPONENT_NAME, {
            placeholder: "",
            type: "text",
            isTextarea: false,
        });
    }
}
