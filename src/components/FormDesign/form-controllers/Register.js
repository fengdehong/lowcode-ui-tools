import {FormDate} from "./FormDate";
import {FormImage} from "./FormImage";
import {FormInput} from "./FormInput";
import {FormRadioGroup} from "./FormRadioGroup";
import {FormSelect} from "./FormSelect";

export default {
    install(vue) {
        FormDate.registry(vue);
        FormImage.registry(vue);
        FormRadioGroup.registry(vue);
        FormInput.registry(vue);
        FormSelect.registry(vue);
    }
}
