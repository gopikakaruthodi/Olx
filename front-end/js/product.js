const url=window.location.href
const urlParams=new URLSearchParams(url.split("?")[1])
const id=urlParams.get("id")
console.log(id);


async function getProduct() {
    const res=await fetch(`http://localhost:3003/api/getProductdetails/${id}`)
    const product=await res.json()
    console.log(product);
    str=``
    product.images.map((image)=>{
        str+=`<div class="pro-card">
               <img onmouseover="changeImg('${image}')" src=${image} alt="" id="images">
            </div>`

    })

    document.getElementById("card").innerHTML=str
    document.getElementById("button").innerHTML=` <a href="./editProduct.html?id=${product._id}"><button  class="last-btn2">EDIT</button></a>
            <button  class="last-btn2">DELETE</button>`

    document.getElementById("img").src=`${product.images[0]}`
    document.getElementById("category").textContent=`${product.category.toUpperCase()}`
    document.getElementById("name").textContent=`${product.pname}`
    document.getElementById("description").textContent=`${product.description}`
    document.getElementById("disc-price").textContent=`₹${product.price}`
    

    
}
getProduct()

function changeImg(img){
    document.getElementById("img").src=img

}
