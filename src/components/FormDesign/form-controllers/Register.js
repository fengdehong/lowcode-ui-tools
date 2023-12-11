import {FormDate} from "./FormDate";
// import {FormImage} from "./FormImage";
import {FormInput} from "./FormInput";
import {FormSelect} from "./FormSelect";

export default {
    install(vue) {
        FormDate.registry(vue);
        // FormImage.registry(vue);
        FormInput.registry(vue);
        FormSelect.registry(vue);
    }
}
