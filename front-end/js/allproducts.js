const url=window.location.href
const urlParams=new URLSearchParams(url.split("?")[1])
const id=urlParams.get("id")
console.log(id);

const wish=localStorage.getItem(id)
console.log(wish);





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
   wish? document.getElementById("button").innerHTML=`<a href="./addToWishlist.html"><button  class="last-btn2" >GO TO WISHLIST</button></a>`:document.getElementById("button").innerHTML=`<button  class="last-btn2" onclick="wishlist('${product._id}')">ADD TO WISHLIST</button>`

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

async function wishlist(id){
    const res=await fetch(`http://localhost:3003/api/getProductdetails/${id}`)
    const product=await res.json()

    const buyerId=product.sellerId
    console.log(product);
    await fetch("http://localhost:3003/api/addwish",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({buyerId,product})
    }).then(async(res)=>{
        const data=await res.json()
        if(res.status==201){
            localStorage.setItem(id,id)
            alert(data.msg)
        }
        else{
            alert("enable to add")
        }
    }).catch((error)=>{
        console.log(error);
        
    })


}



