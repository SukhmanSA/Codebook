import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { CartReducer } from "../reducer/CartReducer";
import { createUserProducts } from "../services/productService";

const cartInitialState ={
    cartList:[],
    total:0
}

const CartContext = createContext(cartInitialState)

export const CartProvider = ({children}) =>{

    const [state,dispatch] = useReducer(CartReducer,cartInitialState)

    function addToCart(product){
        const updatedCartList = state.cartList.concat(product)
        const updatedTotal = state.total + product.price
        dispatch({
            type: "ADD_TO_CART",
            payload:{
                addCart:updatedCartList,
                total:updatedTotal
            }
        })
    }

    function removeFromCart(product){
        const updatedCartList = state.cartList.filter((item)=> item.id !== product.id);
        const updatedTotal = state.total - product.price
        dispatch({
            type: "REMOVE_FROM_CART",
            payload:{
                removeCart:updatedCartList,
                total:updatedTotal
            }
        })
    }

    const clearCart = () =>{
        dispatch({
            type:"CLEAR_CART",
            payload:{
                products:[],
                total:0
            }
        })
    }


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            localStorage.setItem('cartList', JSON.stringify(state.cartList));
            const userCart = JSON.parse(localStorage.getItem("cartList")); 
            const total = userCart.reduce((acc, product) => acc + product.price, 0);
            localStorage.setItem("total",JSON.stringify(total))
            createUserProducts()
        } else {
            localStorage.setItem('cartList', JSON.stringify([]));
        }
    }, [state.cartList]);
    

    const value = {
        cartList:state.cartList,
        total:state.total,
        addToCart,
        removeFromCart,
        clearCart
    }

    

return(
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
    )
}

export const useCart = () =>{
    const context = useContext(CartContext)
    return context
}
