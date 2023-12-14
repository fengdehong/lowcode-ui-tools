<template>
  <Field :name="model.formItemConfig.key"
         :label="model.formItemConfig.label"
         :readonly="readOnly"
         :required="!readOnly&&model.formItemConfig.required"
         :rules="[{ required: !readOnly&&model.formItemConfig.required, message: '请填写'+model.formItemConfig.label }]">
    <template #input>
      <div v-if="readOnly" style="height:88px">
        <Image v-for="file in fileList" :src="file.url"
               width="80px" height="80px" fit="contain" @click="showImagePreview(fileList.map(f=>f.url))"/>
      </div>
      <Uploader v-else v-model="fileList"
                @update:modelValue="handleListChange"
                :after-read="handleAfterRead"/>
    </template>
  </Field>
</template>

<script setup>
import {Field, Image, showImagePreview, Uploader} from 'vant';
import "vant/es/image/style";
import "vant/es/image-preview/style";
import "vant/es/uploader/style";
import "vant/es/field/style";

import {computed, defineProps, ref} from "vue";
import {useFormContext} from "../../utils/useFormContext.js";
import {UploadConfig} from "../../utils/UploadConfig.js";
import {uploadFile} from "../../utils/resourceApi.js";

const props = defineProps({
  model: {type: Object, required: true},
  form: {type: Object, required: true},
  readonly: {type: Boolean, required: false},
});

const {form, fieldReadonly} = useFormContext();

const readOnly = computed(() => fieldReadonly(props.model.formItemConfig.key));

const fileList = ref([]);
let rawList = form[props.model.formItemConfig.key];
rawList = rawList && JSON.parse(rawList) || [];
fileList.value = rawList.map(item => {
  return {
    url: UploadConfig.getResourceUrl(item.resourceId)
  }
})

function handleListChange() {
  const result = fileList.value.map(item => {
    return {
      resourceId: item.resourceId
    }
  });
  form[props.model.formItemConfig.key] = result.length === 0 ? undefined : JSON.stringify(result);
}

/**
 *
 * @param fileInfo {import("vant").UploaderFileListItem}
 */
function handleAfterRead(fileInfo) {
  fileInfo.status = "uploading";
  return uploadFile(fileInfo.file).then(res => {
    Object.assign(fileInfo, {status: "done", resourceId: res.data.uid, url: UploadConfig.getResourceUrl(res.data.uid)})
    handleListChange();
    fileInfo.status = "done";
    return Promise.resolve()
  }).catch(e => {
    console.error("upload error:", e);
    fileInfo.status = "failed";
  })
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
