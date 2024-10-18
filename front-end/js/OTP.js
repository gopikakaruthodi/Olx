const url=window.location.href
const urlParams=new URLSearchParams(url.split("?")[1])
const id=urlParams.get("id")


const inputs = document.getElementById("inputs");


inputs.addEventListener("input", function (e) {
    const target = e.target;
    const val = target.value;

    if (isNaN(val)) {
        target.value = "";
        return;
    }

    if (val != "") {
        const next = target.nextElementSibling;
        if (next) {
            next.focus();
        }
    }
});

inputs.addEventListener("keyup", function (e) {
    const target = e.target;
    const key = e.key.toLowerCase();

    if (key == "backspace" || key == "delete") {
        target.value = "";
        const prev = target.previousElementSibling;
        if (prev) {
            prev.focus();
        }
        return;
    }
});

async function verifyOTP() {
    const otp1=document.getElementById("otp1").value
    const otp2=document.getElementById("otp2").value
    const otp3=document.getElementById("otp3").value
    const otp4=document.getElementById("otp4").value
    const otp5=document.getElementById("otp5").value
    const otp6=document.getElementById("otp6").value
    // console.log(otp1,otp2,otp3,otp4,otp5,otp6);
    let otp=Number(otp1+otp2+otp3+otp4+otp5+otp6)
    // console.log(typeof(otp));
    console.log(otp);

    await fetch(`http://localhost:3003/api/compareotp`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({otp})
    }).then(async(res)=>{
        data=await res.json()
        if(res.status==200){
            alert(data.msg)
            window.location.href="./changePassword.html"
        }
    })
    
}




