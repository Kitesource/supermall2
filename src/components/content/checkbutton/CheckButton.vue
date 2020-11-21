<template>
  <div class="check-button" :class="{check: isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: '',
  props:{
      isChecked: {
          type: Boolean,
          default() {
              return false
          }
      }
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
}
.check {
    border-color: rgb(250, 96, 96);
    background-color: rgb(250, 96, 96);
}
</style>