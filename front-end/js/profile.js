const url=window.location.href
const urlParams=new URLSearchParams(url.split("?")[1])
const id=urlParams.get("id")

async function getUser(){
    const res=await fetch(`http://localhost:3003/api/getuser/${id}`)
    const user=await res.json()
    str=``
    document.getElementById("left").innerHTML=`
        <img src="${user.user.profile}" alt="pro pic" id="profile">
            <h2 id="username">${user.user.username}</h2>
            <div class="details">
                <h5>Email:</h5>
                <div id="email">${user.user.email}</div>
            </div>
            <div class="details">
                <h5>Place:</h5>
                <div id="place">${user.user.place}</div>
            </div>
            <div class="details">
                <h5>Address:</h5>
                <div id="address">${user.user.address}</div>
            </div>
            <div class="details">
                <h5>Pincode:</h5>
                <div id="pincode">${user.user.pincode}</div>
            </div>
            <div class="details">
                <h5>Phone:</h5>
                <div id="phone">${user.user.phone}</div>
            </div>
            <a href="./edit.html?id=${user.user._id}"><button>Edit</button></a>
            <button onclick="deleteUser('${user.user._id}')">Delete</button>`

            // console.log(user.userProducts);
            
            user.userProducts.map((product)=>{
                console.log(product);
                
                str+=`
                <a href="./product.html?id=${product._id}"><div class="e-card">
                    <div class="e-img">
                        <img src="${product.images[0]}" alt="">
                    </div>
                    <div class="e-doc">
                        <h4>${product.pname}</h4>
                        <div class="prices"><span class="price" style="margin-top: 10px;">₹${product.price}</span></div>
                    </div>
                    
                </div></a>`

            })
            document.getElementById("right").innerHTML=str

}
getUser()

async function deleteUser(id) {
    
    if(confirm("Do you want to delete the user?")){
        await fetch(`http://localhost:3003/api/deleteuser/${id}`,{
            method:"DELETE"
        }).then(async(res)=>{
            const data=await res.json()
            if(res.status==200){
                alert(data.msg)
                getUser()
                window.location.href="../index.html"
            } 
            else{
                alert("cannot delete the user")
            }  
        })
    }

    
}
