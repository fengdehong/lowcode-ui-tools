<template>
  <div>
    <el-tooltip class="item" effect="dark" content="选择文章" placement="top">
      <el-button icon="el-icon-document-add" @click="show=true"/>
    </el-tooltip>
    <el-dialog title="选择文章" :visible.sync="show" class="article-select-dialog" top="20px" width="80%"
               append-to-body destroy-on-close>
      <CategoryOutlineTreeLayout class="article-select-form" @selected="onOutlineLeafSelected"
                                 :hidden-category="true" :limit-l2-category-id="DesignStore.customData.categoryId">
        <div class="right-wrap">
          <div class="article-info" v-if="articleInfo.id">
            <div class="article-title">
              <div>{{ articleInfo.title }}</div>
              <i class="el-icon-success"/>
            </div>
            <div class="article-content" v-html="articleInfo.contentHtml"/>
          </div>
          <el-alert
            v-else
            title="未选中文章"
            type="info"
            description="请从左边大纲树选择文章节点"
            show-icon>
          </el-alert>
        </div>
      </CategoryOutlineTreeLayout>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAction" :disabled="!articleInfo.id" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CategoryOutlineTreeLayout from "@/components/CategoryOutlineTreeLayout";
import {DesignStore} from "@/components/HtmlDesigner/DesignStore";
import {getArticle} from "@/api/article/article";

export default {
  name: "ArticleSelect",
  components: {CategoryOutlineTreeLayout},
  props: {
    title: {},
    link: {}
  },
  data() {
    return {
      DesignStore,
      show: false,
      articleInfo: {}
    }
  },
  methods: {
    handleAction() {
      this.$emit("update:title", this.articleInfo.title);
      this.$emit("update:link", "/doc/article/" + this.articleInfo.id);
      this.show = false;
    },
    onOutlineLeafSelected(outlineLeaf) {
      if (outlineLeaf.articleId) {
        let articleId = outlineLeaf.articleId;
        this.$emit("selected", outlineLeaf);
        getArticle(articleId).then(res => {
          this.articleInfo = res.data.data;
        })
      }
    }
  }
}
</script>

<style scoped>
.right-wrap {
  margin: 0 20px;
}

.article-info {
  /*box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);*/
  border: 1px solid #67c23a;
  border-radius: 4px;
  overflow: hidden;
}

.article-info .article-title {
  font-size: 14px;
  background-color: #f0f9eb;
  color: #67c23a;
  font-weight: 500;
  border-bottom: 1px solid #f0f0f0;
  padding: 6px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-info .article-content {
  height: calc(100vh - 330px);
  padding: 6px 16px;
  overflow-y: auto;
}
</style>
<style>
.article-select-dialog .content-wrap .content-left {
  height: calc(100vh - 295px);
}

.article-select-dialog .el-dialog__body {
  padding-top: 0;
}
</style>
