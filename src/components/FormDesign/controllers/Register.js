import {FenText} from "./FenText";
import {GridLayout} from "./GridLayout";

export default {
    install(vue) {
        FenText.registry(vue);
        GridLayout.registry(vue);
    }
}
