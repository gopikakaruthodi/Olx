const email=localStorage.getItem("email")
document.getElementById('forms').addEventListener('input', function () {
    validateForm();
});

function validateForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const submitBtn = document.getElementById('submitBtn');
    const errorElement = document.getElementById('passwordError');

    let isValid = true;
    
    if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match';
        errorElement.classList.remove('success');
        errorElement.classList.add('error');
        isValid = false;
    } else {
        errorElement.textContent = 'Passwords match';
        errorElement.classList.remove('error');
        errorElement.classList.add('success');
    }

    if (isValid) {
        submitBtn.classList.add('enabled');
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove('enabled');
        submitBtn.disabled = true;
    }
}


document.getElementById("forms").addEventListener("submit",async(e)=>{
    e.preventDefault()
    const password = document.getElementById('password').value;
    const cpassword = document.getElementById('confirmPassword').value;

    await fetch("http://localhost:3003/api/changepassword",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({password,cpassword,email})
    }).then(async(res)=>{
        const data=await res.json()
        if(res.status==201){
            alert(data.msg)
            window.location.href="./signin.html"
        }
        else{
            alert("Password cannot changed")
        }
    })
})
