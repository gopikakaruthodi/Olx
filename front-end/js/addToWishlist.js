async function getWishlist() {
    const res=await fetch("http://localhost:3003/api/getwish")
    console.log(res);
    if(res.status==200){
        const data=await res.json()
        // console.log(data);
        str=``
        data.map((item)=>{
            
            str+=`<div class="e-card">
                <div class="e-img">
                    <img src="${item.product.images[0]}" alt="">
                </div>
                <div class="e-doc">
                    <h4>${item.product.pname}</h4>
                    <div class="prices"><span class="price" style="margin-top: 10px;">₹${item.product.price}</span></div>
                    <button onclick="deleteWish('${item._id}','${item.product._id}')" class="btn">Delete</button>
                </div>

                
            </div>`

        })
        document.getElementById("cards").innerHTML=str

}
}

getWishlist()

async function deleteWish(id,pid) {
    console.log(id);
    if(confirm("Do you want to delete the product from wishlist?")){
        await fetch(`http://localhost:3003/api/deletewish/${id}`,{
            method:"DELETE"
        }).then(async(res)=>{
            const data=await res.json()
            if(res.status==200){
                alert(data.msg)
                localStorage.removeItem(pid)
                window.location.href="../index.html"
            } 
            else{
                alert("cannot delete the user")
            }  
        })
    }

    
}


