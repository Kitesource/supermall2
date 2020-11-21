export default {
  addCart(context, payload) {
    //payload 新添加的商品
    /* let oldProduct = null;
    for(let item of state.cartList) {
      if(item.iid === payload.iid) {
        oldProduct = item;
      }
    } */
    return new Promise((resolve, reject) => {
      //payload 新添加的商品
      //1.在查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid == payload.iid);
      
      //2.判断oldProduct
      if (oldProduct) { //数量+1
        context.commit('addCounter', oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}