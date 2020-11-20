<template>
  <div id="detail">
    <!-- 顶部导航 -->
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <!-- 滚动区域 -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"/>
        <detail-param-info ref="params" :paramInfo="paramInfo"/>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
        <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <!-- 底部导航 -->
    <detail-bottom-bar @addCart="addCart"/>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'
import {BACK_POSITION} from 'common/const'

export default {
  name: 'Detail',
  props:{},
  components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
        iid: null,
        topImages: [],
        goods: {},
        shop:{},
        detailInfo:{},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
        themeTopYs:[],
        getThemeTopY: null,
        currentIndex: 0,
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    
    //2.根据iid请求详情页数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      //1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      //4.获取商品详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //6.获取评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    })

    //3.请求推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list;
    })

    //4.给getThemeTopY赋值（给赋值操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [],
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100)
  },
  mounted() {
    //通过mixin混入
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener);
  },
  methods: {
    //监听发射来的图片加载完成事件
    detailImageLoad() {
      this.newRefresh();
      // 调用导航对应的内容高度的函数
      this.getThemeTopY();
    },
    //监听发射来的顶部导航栏的点击事件
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, (-this.themeTopYs[index]), 100)
    },
    //监听发射来的滚动事件
    contentScroll(position) {
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y;
      // 2.将获取的y值与导航栏标题中的值进行对比
      // [0, 11143, 11741, 11936]
      //js中最大值Number.MAX_VALUE
      // positionY在[0~11143]之间， index = 0
      // positionY在[11143~11741]之间， index = 1 ...
        let length = this.themeTopYs.length;
      /* for(let i = 0; i <.length; i++) {
        if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] || i === length - 1 && positionY >= this.themeTopYs[i]) ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      } */

      // [0, 11143, 11741, 11936, 非常大的值]（hack做法）
      for(let i = 0; i < length - 1; i ++){
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      //3. 监听backTop 是否显示
      this.isShowBackTop = (-position.y) > 1000;
    },

    //监听发射来的点击加入购物车事件
    addCart() {
      //1.获取在购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.先将商品添加到store中
      // this.$store.commit('addCart', product);
      this.$store.dispatch('addCart', product);
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>