<template>
  <ui-button raised class="btn">
    <slot></slot>
  </ui-button>
</template>

<script>
export default {
  name: 'custom-button'
}
</script>

<style scoped>

.btn{
  border-radius: 20px;
  background-color: rgba(90, 114, 132, 0.83);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  font-size: 18px;
  color: rgba(214, 218, 222, 1);
}
</style>
