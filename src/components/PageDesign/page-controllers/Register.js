import {PageHtml} from "./PageHtml";

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

        PageHtml.registry(register);
    }
}
