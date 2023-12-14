import {FormDate} from "./FormDate";
import {FormImage} from "./FormImage";
import {FormInput} from "./FormInput";
import {FormRadioGroup} from "./FormRadioGroup";
import {FormSelect} from "./FormSelect";

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

        FormDate.registry(register);
        FormImage.registry(register);
        FormRadioGroup.registry(register);
        FormInput.registry(register);
        FormSelect.registry(register);
    }
}
