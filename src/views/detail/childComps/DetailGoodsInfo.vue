<template>
  <div v-if="Object.keys(detailInfo).length !== 0" id="detail-goods_info">
    <div class="goods_info_desc">
      <div style="float: left" class="desc_line"></div>
      <div class="desc_text">{{ detailInfo.desc }}</div>
      <div style="float: right" class="end"></div>
    </div>
    <div class="goods_info_key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="goods_info_imgs">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  methods: {
    imgLoad() {
      //判断所有的图片加载完,就可以只发射一次事件
      //if (++this.counter === this.imagesLength) {
      this.$emit("detailImageLoad");
      //   }
    },
  },
  watch: {
    detailInfo() {
      //获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
#detail_goods-info {
  font-size: 13px;
}

.goods_info_desc {
  font-size: 12px;
  padding: 10px 12px;
}

.desc_line {
  width: 100%;
  height: 1px;
  background-color: rgba(100, 100, 100, 0.1);
}

.desc_text {
  padding: 5px 0px;
  color: #999;
}

.goods_info_key {
  padding: 8px 6px;
}

.goods_info_imgs img {
  width: 100%;
}
</style>