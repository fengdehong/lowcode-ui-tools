export const UploadConfig = {
    action() {
        return '/admin/resource/with-suffix-upload';
    },
    headers() {
        // return {Authorization: 'Bearer ' + GlobalContext.token};
        return {}
    },
    getResourceUrl(resourceId) {
        return '/request-api/admin/resource/file/' + resourceId;
    }
}
