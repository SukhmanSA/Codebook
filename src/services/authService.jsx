
export async function login(authDetail){
    const requestOptions ={
        method:"POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(authDetail)        
      }
      const response = await fetch(`https://codebook-mock-server-lon1.onrender.com/login`,requestOptions)
      const data = await response.json()
      if(data.accessToken){
        sessionStorage.setItem("token",JSON.stringify(data.accessToken))
        sessionStorage.setItem("cbid",JSON.stringify(data.user.id))
      }
      return data
}

export async function register(authDetail){
    const requestOptions ={
        method:"POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(authDetail)        
      }
      const response = await fetch(`https://codebook-mock-server-lon1.onrender.com/register`,requestOptions)
      const data = await response.json()
      if(data.accessToken){
        sessionStorage.setItem("token",JSON.stringify(data.accessToken))
        sessionStorage.setItem("cbid",JSON.stringify(data.user.id))
      }
      return data
}

