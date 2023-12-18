import {ChartLine} from "./ChartLine";
import {ChartBar} from "./ChartBar";
import {ChartPie} from "./ChartPie";

export default {

    /**
     *
     * @param vue {import("vue").App}
     */
    install(vue) {
        function register(name, com) {
            if (!vue.component(name)) {
                vue.component(name, com);
            }
        }

        ChartLine.registry(register);
        ChartBar.registry(register);
        ChartPie.registry(register);
    }
}
