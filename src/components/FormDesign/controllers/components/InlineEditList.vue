<template>
  <draggable v-model="listLocal" class="inline-edit-list">
    <InlineEditCard v-for="(item,index) in list" :key="index" @deleteClick="onDelete(index)">
      <template #buttons>
        <slot name="buttons" :item="item" :list="list" :itemKey="index"/>
      </template>
      <slot :item="item"/>
    </InlineEditCard>

    <slot name="addButton">
      <div :class="{'add-btn':true,'active':!list.length}" @click="onAdd">
        <i class="el-icon-plus"/>
      </div>
    </slot>
  </draggable>
</template>

<script>
import InlineEditCard from "@/components/HtmlDesigner/controllers/components/InlineEditCard.vue";
import draggable from "vuedraggable";

export default {
  name: "InlineEditList",
  components: {draggable, InlineEditCard},
  props: {
    list: {required: true},
    template: {}
  },
  emits: ['update:list'],
  computed: {
    listLocal: {
      get() {
        return this.list;
      },
      set(val) {
        this.$emit("update:list", val);
      }
    }
  },
  methods: {
    onAdd() {
      if (!this.template) {
        this.$emit("addClick");
      } else {
        let newOne = JSON.parse(JSON.stringify(this.template));
        newOne.id = new Date().getTime();
        let newList = [...this.list, newOne];
        console.log(this.list, newList);
        this.$emit("update:list", newList)
      }

    },
    onDelete(index) {
      let list = [...this.list];
      list.splice(index, 1)
      this.$emit("update:list", list);
    }
  }
}
</script>

<style scoped>
.inline-edit-list {
  height: 100%;
}

.inline-edit-list:hover {
  outline: 2px solid #e6a23c;
}

.add-btn {
  justify-content: center;
  align-items: center;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 2px;
  cursor: pointer;
  font-size: inherit;
  display: none;
}

.inline-edit-list > .add-btn.active,
.inline-edit-list:hover > .add-btn {
  display: flex;
}


.add-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.add-btn > .el-icon-plus {
  font-weight: 400;
  font-size: inherit;
  color: #8c939d;
}
</style>
