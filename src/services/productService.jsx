
export async function getProducts(searchTerm){
    const response = await fetch(
        `https://codebook-mock-server-lon1.onrender.com/444/products?name_like=${searchTerm ? searchTerm : ""}`
    );
    if(!response.ok){
        throw { message:response.statusText, status:response.status }
    }
    const data = await response.json();
    return data
}
export async function getFeaturedProducts(){
    const response = await fetch(`https://codebook-mock-server-lon1.onrender.com/444/featured_products`);
    if(!response.ok){
        throw { message:response.statusText, status:response.status }
    }
    const data = await response.json(); 
    return data
}

export async function getProductDetail(id){
    const response = await fetch(`https://codebook-mock-server-lon1.onrender.com/444/products/${id}`);
    if(!response.ok){
        throw { message:response.statusText, status:response.status }
    }
    const data = await response.json();
    return data
}

export async function createUserProducts(){
    const userCart = JSON.parse(localStorage.getItem("cartList"));
    const token = JSON.parse(sessionStorage.getItem("token"));
    const id = JSON.parse(sessionStorage.getItem("cbid"));
    
    const response1 = await fetch(`https://codebook-mock-server-lon1.onrender.com/660/users/${id}`,{
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`}
    });
    const data1 = await response1.json();

    const user = {
        email: data1.email,
        name: data1.name,
        cart: userCart,
        id
    };

    const response = await fetch(`https://codebook-mock-server-lon1.onrender.com/660/users/${id}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(user)  
    });
    
    return data1;
}

