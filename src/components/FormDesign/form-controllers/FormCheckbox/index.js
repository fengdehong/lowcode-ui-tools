import ConfigPanel from "./ConfigPanel.vue";
import {FormBaseController} from "../FormBaseController";
import {defineAsyncComponent} from "vue";
import {nanoid} from "nanoid";

const COMPONENT_TYPE = "FormCheckbox";
const COMPONENT_NAME = "多选框";

export class FormCheckbox extends FormBaseController {
    static _compType = COMPONENT_TYPE;
    static _compName = COMPONENT_NAME;
    static _compIcon = {elIcon: "Check"};

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
            placehold: "",
            options: [
                {key: nanoid(), label: "选项1", value: "选项1"},
                {key: nanoid(), label: "选项2", value: "选项2"},
                {key: nanoid(), label: "选项3", value: "选项3"},
            ]
        });

    }
}
