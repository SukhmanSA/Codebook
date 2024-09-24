import { useState, useEffect } from "react"
import { Rating } from "../components/index";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { useCart } from "../context"
import { getProductDetail } from "../services/productService";
import { toast } from "react-toastify";

export const ProductDetail = () => {
  const [product, setProduct] = useState({})
  const [errorMessage,setErrorMessage] = useState("")
  const { id } = useParams()
  const { addToCart, removeFromCart,cartList } = useCart()
  const [inCart, setInCart] = useState(false)
  useEffect(() => {
    async function FetchProducts() {
      try{
      const data = await getProductDetail(id) 
      setProduct(data);
      const productInCart = cartList.find(item => item.id === product.id)
      if (productInCart) {
          setInCart(true)
      } else {
          setInCart(false)
      }
      setErrorMessage("")  
    }
      catch(error){
        setErrorMessage(error.message)
        toast.error(errorMessage)
      }
    }
    FetchProducts();
  }, [id,cartList,product.id]);
  const { name, poster, price, best_seller, overview, rating, long_description, in_stock } = product
  useTitle(name)
  return (
    <main>    
      <section>
      <div className="text-zinc-50 text-xl">{errorMessage}</div>
        <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{name}</h1>
        <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">{overview}</p>
        <div className="flex flex-wrap justify-around">
          <div className="max-w-xl my-3">
            <img className="rounded" src={poster} alt="" />
          </div>
          <div className="max-w-xl my-3">
            <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
              <span className="mr-1">$</span>
              <span className="">{price}</span>
            </p>
            <p className="my-3">
              <span>
                <Rating rating={rating} />
              </span>
            </p>
            <p className="my-4 select-none">
              {best_seller ? <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">BEST SELLER</span> : ""}
              {in_stock ? <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">INSTOCK</span> : <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span>}

              <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">5 MB</span>
            </p>
            <p className="my-3">
            { inCart ? <button onClick={() => removeFromCart(product)} className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}>Remove Item <i className="ml-1 bi bi-trash3"></i></button>
                    : <button onClick={() => addToCart(product)} disabled={in_stock ? false : true } className={` inline-flex ${in_stock ? "cursor-default" : "cursor-not-allowed" } items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800`}>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button>}
            </p>
            <p className="text-lg text-gray-900 dark:text-slate-200">
              {long_description}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}