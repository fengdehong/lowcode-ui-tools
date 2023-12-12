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

<script>
import FormItemWrap from "../components/FormItemWrap.vue";
import {Picture, Plus, Upload} from "@element-plus/icons-vue";
import {UploadConfig} from "../../utils/UploadConfig.js";

export default {
  components: {Picture, Upload, Plus, FormItemWrap},
  props: {
    model: {type: Object, required: true},
  },
  data() {
    return {
      UploadConfig,
      uploadProcess: undefined,
      mockValue: undefined
    }
  },
  methods: {
    handleUploadSuccess(e) {
      console.log(e)
      let uid = e.data.uid;
      this.uploadProcess = undefined;
      this.form[this.model.formItemConfig.key] = uid;
      this.$message.success("上传成功");
    },
    handleUploadError(e) {
      this.$message.error("上传失败");
      this.uploadProcess = undefined;
    },
    onUploadProgress(event, file, fileList) {
      console.log(event);
      let percent = event.percent;
      if (typeof percent === "number") {
        this.uploadProcess = percent.toFixed(2);
      }
    }
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
