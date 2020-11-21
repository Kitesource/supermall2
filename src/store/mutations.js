export default {
    //数量+1
    addCounter(state, payload) {
        payload.count++;
    },

    //商品+1
    addToCart(state, payload) {
        payload.checked = true;
        state.cartList.push(payload);
    }
}