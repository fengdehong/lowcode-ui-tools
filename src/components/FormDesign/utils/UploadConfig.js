export const UploadConfig = {
    action() {
        return '/admin/resource/with-suffix-upload';
    },
    headers() {
        // return {Authorization: 'Bearer ' + GlobalContext.token};
        return {}
    }
}
