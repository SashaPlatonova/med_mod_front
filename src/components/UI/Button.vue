<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'custom-button'
}
</script>

<style scoped>

.btn{
  padding: 15px;
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 10px;
  min-width: 120px;
  border-radius: 15px;
  border: none;
  background: rgba(90, 114, 132, 0.83);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  font-size: 16px;
  color: rgba(214, 218, 222, 1);
}
</style>
