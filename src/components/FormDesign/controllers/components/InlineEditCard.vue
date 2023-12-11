<template>
  <div class="inline-edit-card">
    <div class="card-btns">
      <slot name="buttons"/>
      <i class="el-icon-delete" @click="$emit('deleteClick')"/>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "InlineEditCard"
}
</script>

<style scoped>
.inline-edit-card {
  position: relative;
}

.inline-edit-card .card-btns {
  position: absolute;
  top: -18px;
  right: -2px;
  display: none;
  cursor: pointer;
  border: 2px solid #e6a23c;
}

.inline-edit-card:hover {
  outline: 2px solid #e6a23c;
}

.inline-edit-card:hover > .card-btns {
  display: flex;
}

.card-btns > i {
  padding: 1px 4px;
  font-size: 12px;
  display: block;
}

.card-btns .el-icon-delete {
  color: #fff;
  background-color: #f56c6c;
}

.card-btns .el-icon-delete:hover {
  background: #f78989;
  border-color: #f78989;
}
</style>
