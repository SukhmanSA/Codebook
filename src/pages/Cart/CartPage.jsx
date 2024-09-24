import { useEffect, useState } from "react";
import { useCart } from "../../context";
import { useTitle } from "../../hooks/useTitle";
import { EmptyCart, CartList } from "../index";
import { createUserProducts } from "../../services/productService";

export const CartPage = () => {
    const [userProducts, setUserProducts] = useState(null);  // Initialize as null
    const token = JSON.parse(sessionStorage.getItem("token"));  // Get token to check login status
    const { cartList } = useCart();  // Get the guest cart list
    const cartLen = cartList.length;  // Get the length of the guest cart

    useEffect(() => {
        async function getUserProducts() {
            if (token) {  // Only fetch user products if the user is logged in
                const data = await createUserProducts();
                const { cart } = data;
                setUserProducts(cart || []);  // Set userProducts or default to empty array
            }
        }
        getUserProducts();
    }, [token]);

    const userCartLen = userProducts ? userProducts.length : 0;  // Handle null userProducts

    useTitle(`Cart(${token ? userCartLen : cartLen})`);  // Dynamically set the cart title

    return (
        <main>
            {token ? (
                userCartLen > 0 ? <CartList cartItems={userProducts} /> : <EmptyCart />
            ) : (
                cartLen > 0 ? <CartList cartItems={cartList} /> : <EmptyCart />
            )}
        </main>
    );
};
