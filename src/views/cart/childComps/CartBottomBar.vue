<template>
  <div class="bottom-menu">
    <CheckButton
      :is-checked="isSelectAll"
      class="select-all"
      @click.native="checkClick"
    ></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{ totalPrice }}</span>
    <span class="buy-product" @click="clacClick">去计算({{ checkedLength }})</span>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "",
  props: {},
  components: {
    CheckButton,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkedLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    //   全选按钮状态
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      //  return !(this.cartList.filter(item => !item.checked).length)
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全部选中
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        //部分或全部未选中
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    clacClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品~', 1500)
      }
    }
  },
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}
.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}
.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  display: block;
  width: 100px;
  float: right;
  text-align: center;
  line-height: 44px;
}
</style>