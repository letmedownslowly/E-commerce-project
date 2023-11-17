import { defineStore } from "pinia";
import { ref } from 'vue'
export const useCartStore = defineStore('cart', () => {
    // 1.定义state - cartList
    const cartList = ref([])
    // 2.定义action - addCart
    const addCart = (goods) => {
        // 添加购物车操作
        // 已添加过 - count +1
        // 没添加过 - push
        // 思路：通过匹过来的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            // 找到
            item.count++
        }
        else {
            // 没找到
            cartList.value.push(goods)
        }
    }
    const delCart = (skuId) => {
        // 思路：
        // 1. 找到要删除项的下标值 - splice
        // 2. 使用数组的过滤方法 - filter
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }
    return {
        cartList,
        addCart,
        delCart
    }
}, {
    persist: true,
})