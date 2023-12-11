import ConfigPanel from "./ConfigPanel.vue";
import Controller from "./Controller.vue";
import {BaseController} from "../BaseController";


export class FenTextContainerLayout extends BaseController {
    static _compType = "ContainerLayout";
    static _compName = "普通容器";
    static _compIcon = "icon-rongqi";

    constructor() {
        super(ContainerLayout._compType);
        this.customConfig = {
            contentMaxWidth: 1200,
            columns: [
                {
                    id: 0,
                    list: []
                }
            ],
        }
    }

    static registry(Vue) {
        Vue.component(ContainerLayout._compType, Controller)
        Vue.component(ContainerLayout._compType + "ConfigPanel", ConfigPanel)
    }

    newInstance() {
        return ContainerLayout.newInstance();
    }

    static newInstance() {
        return new ContainerLayout();
    }
}
