import { debounce } from './utils';
import BackTop from 'components/content/backtop/BackTop'

export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 100)

        this.itemImageListener = () => {
            this.newRefresh();
        }
        this.$bus.$on('itemImageLoad', this.itemImageListener);
    },
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backTopClick() {
            this.$refs.scroll.scrollTo(0, 0)
          },
    },
}