import {apiUrl} from "@/utils/getUrlPrefix";

export function resourceUrl(resourceId) {
  return apiUrl + "/admin/resource/file/" + resourceId;
}
