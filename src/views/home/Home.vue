<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"  @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>
    <!-- 滚动区域 -->
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingup="loadMore">
        <!-- 轮播区域 -->
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <!-- 推荐区域 -->
        <recommend-view :recommends="recommends" />
        <!-- 本周流行区域 -->
        <feature-view />
        <!-- 控制导航 -->
        <tab-control :titles="['流行', '新款', '精选']"  @tabClick="tabClick" ref="tabControl2"/>
        <!-- 流行新款精选商品列表 -->
        <goods-list :goods="showGoods"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from 'components/common/scroll/Scroll';
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from 'components/content/goods/GoodsList';
import BackTop from 'components/content/backtop/BackTop'

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from 'common/utils'

export default {
  components: {
    NavBar,
    Scroll,
    BackTop,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods:{
        'pop' :{page: 0, list: []},
        'new' :{page: 0, list: []},
        'sell' :{page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  //进入界面时调用
  activated() {
    // console.log('activated');
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  //离开时调用
  deactivated() {
    // console.log('deactivated');
    this.saveY = this.$refs.scroll.getScrollY();
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //调用导入的防抖函数, 减少刷新次数
    const renovate = debounce(this.$refs.scroll.refresh, 50)
    //监听item中的发射图片加载事件
    this.$bus.$on('itemImageLoad', () => {
      renovate();
    })
  },
  methods: {
    /* 事件监听相关的方法 */
    tabClick(index){
      // console.log(index);
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex  = index;
      this.$refs.tabControl2.currentIndex  = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    //监听滚动事件
    contentScroll(position) {
      // console.log(position);
      //1. 监听backTop 是否显示
      this.isShowBackTop = (-position.y) > 1000;

      //2. 决定tabControl是否吸顶(position : fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    loadMore() {
      // console.log('上拉加载更多！');
      this.getHomeGoods(this.currentType)
    },
    //监听发射来的轮播图片的加载
    swiperImageLoad() {
      //获取tabControl的offsetTop
      //所有的组件都有一个属性$el, 用来获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /* 网络请求的相关的方法 */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 实现可多次上拉加载
        this.$refs.scroll.finishPullUp()
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在使用浏览器原生滚动时 */
  /* position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  /* position: sticky;
  top: 44px; */
  background-color: #fff;
  position: relative;
  z-index: 9;
}

.content {
  /* height: calc(100% - 93px);
  margin-top: 44px; */
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
</style>