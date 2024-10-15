const url=window.location.href
const urlParams=new URLSearchParams(url.split("?")[1])
const id=urlParams.get("id")
console.log(id);


async function getProduct() {
    const res=await fetch(`http://localhost:3003/api/getProductdetails/${id}`)
    const product=await res.json()
    console.log(product);
    

    
}
getProduct()