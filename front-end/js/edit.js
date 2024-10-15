const url=window.location.href
const urlParams=new URLSearchParams(url.split("?")[1])
const id=urlParams.get("id")
let profile;



async function editUser() {
    const res=await fetch(`http://localhost:3003/api/getuser/${id}`)
    console.log(res);
    
    const user=await res.json()
    console.log(user);
    profile=user.profile;
    
    document.getElementById("forms").innerHTML=`
        <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value=${user.email} >
            </div>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" value=${user.username}>
            </div>
            <div class="form-group">
                <label for="place">Place:</label>
                <input type="text" id="place" name="place" value=${user.place}>
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <textarea id="address" name="address" >${user.address}</textarea>
            </div>
            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" value=${user.phone}>
            </div>
            <div class="form-group">
                <label for="pincode">Pincode:</label>
                <input type="text" id="pincode" name="pincode" value=${user.pincode}>
            </div>
            <div class="form-group">
                <label for="profile">Profile Image:</label>
                <input type="file"  id="profile"  onchange="getProfile()">
            </div>
             <div ><img src="${profile}" alt="" id="user-img"> </div>
            <button type="submit">Register</button>`
    
}

editUser()

document.getElementById("forms").addEventListener("submit",async(e)=>{
    e.preventDefault()
    const username=document.getElementById("username").value
    const email=document.getElementById("email").value
    const place=document.getElementById("place").value
    const address=document.getElementById("address").value
    const phone=document.getElementById("phone").value
    const pincode=document.getElementById("pincode").value
    console.log(profile);
    

    await fetch(`http://localhost:3003/api/updateuser/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,email,place,address,phone,pincode,profile})
    }).then(async(res)=>{
        console.log(res);
        const data= await res.json()
        if(res.status==201){
            alert(data.msg)
            window.location.href="../index.html"

        }
        else{
            alert(data.msg)

        }
       
    }).catch((error)=>{
        alert(error)

    })

})


async function getProfile() {
    console.log(document.getElementById("profile").files[0]);
    profile=await convertBase64(document.getElementById("profile").files[0]);
    document.getElementById("user-img").src=profile

    
    
}

function convertBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader()
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    })

}