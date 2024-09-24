import { Hero } from "./components/Hero"
import { FeaturedProduct } from "./components/FeaturedProduct"
import { Testimonials } from "./components/Testimonial"
import { Faq } from "./components/Faq"
import { useTitle } from "../../hooks/useTitle"

export const HomePage = () =>{
    useTitle("Access Latest Commerce Computer Science eBooks")
    return(
        <main>
        <Hero/>
        <FeaturedProduct/>
        <Testimonials/>
        <Faq/>
        </main>
    )
}