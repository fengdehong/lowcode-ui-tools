import {getSimpleId} from "../utils/IdGenerate";

/**
 *
 * @typedef {{
 * marginRight: number,
 * paddingBottom: number,
 * paddingRight: number,
 * marginBottom: number,
 * paddingTop: number,
 * paddingLeft: number,
 * marginTop: number,
 * marginLeft: number
 * }} LayoutConfig
 */

export class BaseController {
    /**
     *
     * @type {String|Number}
     */
    id = undefined;

    /**
     *
     * @param compType {String}
     * @param customConfig {Object}
     */
    constructor(compType, customConfig) {
        this.compType = compType;
        /**
         *
         * @type {LayoutConfig}
         */
        this.layoutConfig = {
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            //单位px
            fontSize: 14,
            //字重
            fontWeight: 400,
            //单位px
            lineHeight: 48,
            //字体颜色
            color: "#000000",
            //字体颜色
            backgroundColor: "#FFFFFF",
            textAlign: "center",
            border: null,
            borderLeft: null,
            borderRight: null,
            borderTop: null,
            borderBottom: null,
        };
        this.customConfig = customConfig;
        this.id = getSimpleId();
    }

    generateId() {
        this.id = getSimpleId();
    }

    clone() {
        let destin = new this.constructor();
        Object.assign(destin,
            {id: getSimpleId()},
            {layoutConf: Object.assign({}, this.layoutConfig)},
            {customConfig: Object.assign({}, this.customConfig)});
        console.log("clone:", this, destin);
        return destin;
    }
}
