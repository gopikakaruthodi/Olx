document.getElementById("forms").addEventListener("submit",async(e)=>{
    e.preventDefault()
    const username=document.getElementById("username").value
    const email=document.getElementById("email").value
    const password=document.getElementById("password").value
    const cpassword=document.getElementById("cpassword").value
    const place=document.getElementById("place").value
    const address=document.getElementById("address").value
    const phone=document.getElementById("phone").value
    const pincode=document.getElementById("pincode").value
    
    console.log(username,email,password,cpassword,place,address,phone,pincode);

    await fetch("http://localhost:3003/api/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,email,password,cpassword,place,address,phone,pincode,profile})
    }).then(async(res)=>{
        console.log(res);
        const data= await res.json()
        if(res.status==201){

            alert(data.msg)
            window.location.href="./signin.html"

        }
        else{
            alert(data.msg)

        }
       
    }).catch((error)=>{
        alert(error)

    })
})


function emailValidation(email){
    let regEx=/^[A-Z,a-z][a-z,0-9,.]+@[a-z]+([\.][a-z]{3})/
    if ((regEx.test(email))){
        document.getElementById("em").textContent=""
    }
    else{
        document.getElementById("em").textContent="Invalid"
        document.getElementById("em").style.color="red"
        document.getElementById("em").style.fontSize=12+"px"
        document.getElementById("em").style.fontWeight="bold"




    }
    document.getElementById("email").addEventListener("keyup", function() {
        if (document.getElementById("email").value== "") {
            document.getElementById("em").textContent = "";
        }
    });


}

function passwordValidation(pswd){
    let regEx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if(regEx.test(pswd)){
        document.getElementById("pswds").textContent=""

    }
    else{
        document.getElementById("pswds").textContent="Invalid"
        document.getElementById("pswds").style.color="red"
        document.getElementById("pswds").style.fontSize=12+"px"
        document.getElementById("pswds").style.fontWeight="bold"

    }
}

function passwordMatch(pswd,cpswd){
    console.log(pswd,cpswd);
    if(pswd==cpswd){
        document.getElementById("cpswds").textContent=""
    }
    else{
        document.getElementById("cpswds").textContent="Password doesn't match"
        document.getElementById("cpswds").style.color="red"
        document.getElementById("cpswds").style.fontSize=12+"px"
        document.getElementById("cpswds").style.fontWeight="bold"
    }

    

}

let profile;

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





