import  { Link } from "react-router-dom"
import { useCart } from "../../../context"

export const CartCard = ({product}) =>{
  const {id,name,poster,price} = product
  const { removeFromCart } = useCart()
    return (
        <div className="flex flex-wrap justify-between border-b dark:border-slate-700 max-w-4xl m-auto p-2 mb-5 ">
          <div className="flex">
              <Link to={`/products/${id}`}>
                <img className="w-32 rounded" src={poster} alt="" />
              </Link>
              <div className="">
                <Link to={`/products/${id}`}>
                  <p className="text-lg ml-2 dark:text-slate-200">{name}</p>
                </Link>            
                <button onClick={()=> (  removeFromCart(product))} className="inline-flex items-center py-1 ml-5 mt-2 px-1 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800">Remove Item <i className="ml-1 bi bi-trash3"></i></button>
              </div>
          </div>
          <div className="text-lg m-2 dark:text-slate-200">
            <span>${price}</span>
          </div>
        </div>
      )
}