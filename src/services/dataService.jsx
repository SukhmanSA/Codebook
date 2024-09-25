
export async function getUser(){
    const token = JSON.parse(sessionStorage.getItem("token"));
    const id = JSON.parse(sessionStorage.getItem("cbid"))
    const response = await fetch(`https://codebook-mock-server-lon1.onrender.com/600/users/${id}`,{
        method:"GET",
        headers:  {"content-Type": "application/json", Authorization: `Bearer ${token}`}
    })
    const  data = await response.json()
    return data
}

export async function getUserOrders(){
    const token = JSON.parse(sessionStorage.getItem("token"));
    const id = JSON.parse(sessionStorage.getItem("cbid"));
    const response = await fetch(`https://codebook-mock-server-lon1.onrender.com/660/orders?users.id=${id}`,{
        method:"GET",
        headers:  {"content-Type": "application/json", Authorization: `Bearer ${token}`}
    })
    const  data = await response.json()
    return data
}

export async function createOrders(total,cartList,user){
    const token = JSON.parse(sessionStorage.getItem("token"));
    const id = JSON.parse(sessionStorage.getItem("cbid"));
    const order={
            cartList,
            amount_paid:total,
            number_of_order:cartList.length,
            user:{
                name:user.name,
                email:user.email,
                id
            },
        }
    const response = await fetch("https://codebook-mock-server-lon1.onrender.com/660/orders",{
        method: "POST",
        headers: { "Content-Type":  "application/json", Authorization: `Bearer ${token}` },
        body:JSON.stringify(order)
    })
    const data = await response.json()
    return data
}