const token=localStorage.getItem("Token")

async function getProfile() {
    const res=await fetch("http://localhost:3003/api/getProducts",{headers:{
        "authorization" : `Bearer ${token}`}})
        console.log(res);
        if(res.status==200){
            const data=await res.json()
        console.log(data);
        str=``
        data.products.map((product)=>{
            str+=`<a href="./pages/allProducts.html?id=${product._id}"><div class="e-card">
                <div class="e-img">
                    <img src="${product.images[0]}" alt="">
                </div>
                <div class="e-doc">
                    <h4>${product.pname}</h4>
                    <div class="prices"><span class="price" style="margin-top: 10px;">₹${product.price}</span></div>
                </div>
                
            </div></a>`

        })
        document.getElementById("cards").innerHTML=str

            
        document.getElementById("sell").innerHTML=`<a href="./pages/addProducts.html?id=${data.id}"><button class="sell-button">+ SELL</button></a>`
        
        if(token){
            document.getElementById("profile").innerHTML=`<img src="${data.profile}" alt="" id="profileImage" class="profile-image" onclick="popup()">
            <div class="dropdown" id="dropdownMenu">
            
                <div class="dropdown-option" ><a href="./pages/profile.html?id=${data.id}"><button>View Profile</button></a></div>
                <div class="dropdown-option"><button onclick="logOut()" id="hover">Logout</button></div>
            </div>`
        }

        }
        else if(res.status==403){
            const data=await res.json()
            console.log(data);
            str=``
            data.products.map((product)=>{
                str+=`<a href="./pages/allProducts.html?id=${product._id}"><div class="e-card">
                    <div class="e-img">
                        <img src="${product.images[0]}" alt="">
                    </div>
                    <div class="e-doc">
                        <h4>${product.pname}</h4>
                        <div class="prices"><span class="price" style="margin-top: 10px;">₹${product.price}</span></div>
                    </div>
                    
                </div></a>`
    
            })
            document.getElementById("cards").innerHTML=str

        }
    }

getProfile()


function popup() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown if clicked outside
window.addEventListener('click', (event) => {
    if (!profileImage.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

function logOut(){
    localStorage.removeItem("Token")
    window.location.reload()
}



async function search(e) {
    try {
        const res=await fetch(`http://localhost:3003/api/getproductss`);
        const products=await res.json();
        str=``;
        products.filter((i)=>i.pname.toLowerCase().includes(e.value.toLowerCase())).map((product)=>{
            str+=`
            <a href="./pages/allProducts.html?id=${product._id}"><div class="e-card">
                <div class="e-img">
                    <img src="${product.images[0]}" alt="">
                </div>
                <div class="e-doc">
                    <h4>${product.pname}</h4>
                    <div class="prices"><span class="price" style="margin-top: 10px;">₹${product.price}</span></div>
                </div>
                
            </div></a>
        `
        })

        document.getElementById("cards").innerHTML=str;
    } catch (error) {
        console.log(error);
    }
}



