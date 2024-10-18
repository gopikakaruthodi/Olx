async function generateOTP(){
    const email=document.getElementById("email").value
    console.log(email);

    await fetch("http://localhost:3003/api/otp",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email})
    }).then(async(res)=>{
        const data=await res.json()

        if(res.status==201){
            alert(data.msg)
            localStorage.setItem("email",email)
            window.location.href="./OTP.html"
        }
        else{
            alert("cannot send")
        }
    }).catch((error)=>{
        console.log(error);
        
    })
    
}