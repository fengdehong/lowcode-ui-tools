import {FormDate} from "./FormDate";
import {FormImage} from "./FormImage";
import {FormInput} from "./FormInput";
import {FormNumber} from "./FormNumber";
import {FormPassword} from "./FormPassword";
import {FormTextarea} from "./FormTextarea";
import {FormTextbox} from "./FormTextbox";
import {FormCheckbox} from "./FormCheckbox";
import {FormRadioGroup} from "./FormRadioGroup";
import {FormRate} from "./FormRate";
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
        FormNumber.registry(register);
        FormPassword.registry(register);
        FormTextarea.registry(register);
        FormTextbox.registry(register);
        FormSelect.registry(register);
        FormRate.registry(register);
        FormCheckbox.registry(register);
    }
}
