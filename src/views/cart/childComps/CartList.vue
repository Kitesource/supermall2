<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem.vue";

export default {
  name: "CartList",
  props: {},
  components: {
    Scroll,
    CartListItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    // console.log('activated');
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  /* 视口高度 - 顶部导航高度 - 底部导航高度 - 底部结算高度 */
  height: calc(100% - 44px - 49px - 40px);
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>