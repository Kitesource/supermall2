<template>
  <div class="goods">
      <goods-list-item v-for="item in goods" :goodsitem="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue';
export default {
  name: '',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {GoodsListItem},
  data() {
    return {};
  },
  created() {},
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>