import {BaseController} from "../controllers/BaseController";
import {nanoid} from "nanoid";

/**
 * @typedef {label:String,key:String,required:Boolean,showOnResult:Boolean} FormItemConfig
 */

export class FormBaseController extends BaseController {
    /**
     *
     * @type {FormItemConfig}
     */
    formItemConfig = undefined;

    /**
     *
     * @param compType {String}
     * @param compName {String}
     * @param customConfig {Object}
     */
    constructor(compType, compName, customConfig) {
        super(compType, customConfig);
        /**
         *
         * @type {FormItemConfig}
         */
        this.formItemConfig = {
            label: compName,
            key: this.genKey(),
            required: false,
            //用于结果展示
            showOnResult: false,
        };
    }

    clone() {
        let destin = super.clone();
        console.log("destin:", destin);
        Object.assign(destin, {
            formItemConfig: Object.assign({}, this.formItemConfig, {key: this.genKey()})
        });
        return destin;
    }

    genKey() {
        return `${this.compType}_${nanoid()}`
    }

}
