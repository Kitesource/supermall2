export default {
    addCart(context, payload) {
        //payload 新添加的商品
        /* let oldProduct = null;
        for(let item of state.cartList) {
          if(item.iid === payload.iid) {
            oldProduct = item;
          }
        } */
        //查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        //判断oldProduct
        if (oldProduct) {
            //添加的商品已存在
            // oldProduct.count += 1;
            context.commit('addCounter', oldProduct)
        } else {
            //添加的商品不存在
            payload.count = 1;
            context.commit('addToCart', payload)
            // contex.state.cartList.push(payload);
        }
    }
}