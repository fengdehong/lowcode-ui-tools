import ConfigPanel from "./ConfigPanel.vue";
import {BaseController} from "@/components/FormDesign/controllers/BaseController";
import {defineAsyncComponent} from "vue";

const COMPONENT_TYPE = "PageHtml";

export class PageHtml extends BaseController {
    static _compType = COMPONENT_TYPE;
    static _compName = "HTML片段";
    static _compIcon = {elIcon: "Document"};

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
            html: "<div>html内容</div>",
        });
    }
}
