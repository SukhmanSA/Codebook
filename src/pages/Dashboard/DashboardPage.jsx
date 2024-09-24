import { useState,useEffect } from "react"
import { DashboardCard } from "./components/DashboardCard"
import { DashboardEmpty } from "./components/DashboardEmpty"
import { getUserOrders } from "../../services/dataService"
import { useTitle } from "../../hooks/useTitle"

export const DashboardPage = () =>{
  const [orders,setOrders] = useState([]) 
  useEffect(()=>{
    async function getOrders(){
      const data = await getUserOrders()
    setOrders(data)
  }
  getOrders()
},[])
  useTitle("Order History")
    return (
        <main>
          <section>
            <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
          </section>
          <section>
            { orders.length > 0 ? orders.map((order)=>(<DashboardCard key={order.id} order={order}/>)) : <DashboardEmpty/> }
          </section>
        </main>
      )
}