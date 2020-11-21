<template>
  <div id="cart">
    <!-- 购物车顶部导航区域 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar';

import { mapGetters } from 'vuex'

export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    /* cartLength() {
      return this.$store.getters.cartLength;
    } */
    // mapGetters辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
    ...mapGetters(['cartLength'])
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: bold;
}
</style>