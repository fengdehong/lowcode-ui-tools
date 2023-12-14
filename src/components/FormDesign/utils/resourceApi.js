import {UploadConfig} from "./UploadConfig.js";
import axios from "axios";

/**
 * @typedef {{
 *     uid: String,
 *     name: String,
 *     totalSize: Number
 * }} UploadedFileResource
 */

/**
 *
 * @param file {File}
 * @param onUploadProgress {(progressEvent: AxiosProgressEvent) => void}
 * @return {Promise<NormalResponse<UploadedFileResource>>}
 */
export function uploadFile(file, onUploadProgress = undefined) {
    const formDate = new FormData();
    formDate.append("file", file); //imageFile文件名和后端统一
    return axios({
        url: `/admin/resource/with-suffix-upload`,
        method: "post",
        headers: {'Content-Type': 'multipart/form-data', ...UploadConfig.headers()},
        data: formDate,
        onUploadProgress
    })
}
