import ConfigPanel from "./ConfigPanel.vue";
import Controller from "./Controller.vue";
import {BaseController} from "../BaseController";

const COMPONENT_TYPE = "GridLayout";

export class GridLayout extends BaseController {
    static _compType = COMPONENT_TYPE;
    static _compName = "栅格布局";
    static _compIcon = 'icon--wenbenmiaoshu';

    static registry(Vue) {
        Vue.component(COMPONENT_TYPE, Controller)
        Vue.component(COMPONENT_TYPE + "ConfigPanel", ConfigPanel)
    }

    constructor() {
        super(COMPONENT_TYPE, {
            gap: 10,
            columns: [
                {
                    id: 0,
                    list: []
                },
                {
                    id: 1,
                    list: []
                },
                {
                    id: 3,
                    list: []
                },
                {
                    id: 4,
                    list: []
                }
            ],
        });
    }
}
