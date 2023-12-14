<template>
  <FormItemWrap :formItemConfig="model.formItemConfig">
    <el-upload class="image-uploader"
               :action="UploadConfig.action()"
               :headers="UploadConfig.headers()"
               accept="image/png,image/jpeg,image/gif"
               list-type="picture"
               :on-success="handleUploadSuccess"
               :on-error="handleUploadError"
               :on-progress="onUploadProgress">
      <el-button>
        <el-icon class="el-icon--right" style="margin-right: 8px">
          <Picture/>
        </el-icon>
        图片上传
      </el-button>
    </el-upload>
  </FormItemWrap>
</template>

<script setup>
import {Picture} from "@element-plus/icons-vue";
import {ref} from "vue";
import FormItemWrap from "../components/FormItemWrap.vue";
import {UploadConfig} from "../../utils/UploadConfig.js";
import {ElNotification} from "element-plus";


const props = defineProps({
  model: {type: Object, required: true},
  form: {type: Object, required: true},
  readonly: {type: Boolean, required: false},
});

const uploadProcess = ref(undefined);

function handleUploadSuccess(e) {
  console.log(e)
  let uid = e.data.uid;
  uploadProcess.value = undefined;
  props.form[props.model.formItemConfig.key] = uid;
  ElNotification.success("上传成功");
}

function handleUploadError(e) {
  ElNotification.error("上传失败");
  uploadProcess.value = undefined;
}

function onUploadProgress(event, file, fileList) {
  let percent = event.percent;
  if (typeof percent === "number") {
    uploadProcess.value = percent.toFixed(2);
  }
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
.image-uploader {
  width: 100%;
}

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

.el-upload > .el-button {
  padding: 6px 8px;
}
</style>
