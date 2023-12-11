import {jsonConfigDeserialize} from "./utils/ControllerConfigUtils";
import {formConf} from "./utils/FormConfigUtils";

export class DesignStore {
    formConfig = Object.assign({}, formConf);
    list = [];
    lastActiveItem = {};
    activeItem = {};
    hoverItem = {};
    controllers = [];
    customData = {};

    setControllers(controllers) {
        this.controllers = controllers;
    }

    loadJsonString(jsonString) {
        let json = JSON.parse(jsonString);
        this.loadJson(json);
    }

    loadJson(json) {
        jsonConfigDeserialize(json.list, this.controllers);
        console.log("loaded json:", json, this.controllers)
        this.list = json.list;
        this.formConfig = json.config || Object.assign({}, formConf);
    }

    getJsonString() {
        let json = {};
        json.config = this.formConfig;
        json.list = this.list;
        console.log("get json string:", json);
        return JSON.stringify(json, null, 4);
    }

    clear() {
        this.list = [];
        this.activeItem = {};
    }

    setActiveItem(item) {
        this.activeItem = item;
    }

    setHoverItem(item) {
        this.hoverItem = item;
    }

    insertItem(index, item) {
        console.log("插入新控件：", index, item);
        this.list.splice(index, 0, item);
    }
}




