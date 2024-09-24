import { useEffect, useState } from "react"
import { ProductCard } from "../../../components/index"
import { getFeaturedProducts } from "../../../services/productService";
import { toast } from "react-toastify";

export const FeaturedProduct = () =>{
    const [products,setProducts] = useState([])
    const [errorMessage,setErrorMessage] = useState("")
    
    useEffect(() => {
        async function FetchProducts() {
            try{
            const data = await getFeaturedProducts()
            setProducts(data);
            setErrorMessage("")
            }catch(error){
                setErrorMessage(error.message)
                toast.error("Sorry Not Found! Server Error")
            }
        }
        FetchProducts(); 
    }, []);
    
    return (
        <section className="my-20">
            <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured eBooks</h1>    
            <div className="flex flex-wrap justify-center lg:flex-row">
            <div className="text-zinc-50 text-xl">{errorMessage}</div>
            {products.map((product)=>(
            <ProductCard key={product.id} product={product} />                
            ))}
            </div>
        </section>
      )
}