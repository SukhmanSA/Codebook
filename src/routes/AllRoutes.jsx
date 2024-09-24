import { Route, Routes } from "react-router-dom"
import { HomePage,ProductList,ProductDetail,Login,Register,CartPage,OrderPage,DashboardPage,PageNotFound } from "../pages/index"
import { ProtectedRoutes } from "./ProtectedRoutes"

export const AllRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/products" element={<ProductList/>}></Route>
            <Route path="/products/:id" element={<ProductDetail/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/cart" element={<ProtectedRoutes><CartPage/></ProtectedRoutes>}></Route>
            <Route path="orders" element={<ProtectedRoutes><OrderPage/></ProtectedRoutes>}></Route>
            <Route path="/dashboard" element={<ProtectedRoutes><DashboardPage/></ProtectedRoutes>}></Route>
            <Route path="*" element={<PageNotFound/>}></Route>
        </Routes>
    )
}