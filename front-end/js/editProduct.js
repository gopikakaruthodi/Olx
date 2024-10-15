const url=window.location.href
const urlParams=new URLSearchParams(url.split("?")[1])
const id=urlParams.get("id")
// console.log(id);
let images

async function editProduct() {
    const res=await fetch(`http://localhost:3003/api/getProductdetails/${id}`)
    const product=await res.json()
    console.log(product);

    document.getElementById("forms").innerHTML=`<div class="form-group">
                <label for="pname">Product Name:</label>
                <input type="text" id="pname" name="pname" value="${product.pname}">
            </div>
            <div class="form-group">
                <label for="price">Price:</label>
                <input type="text" id="price" name="price" value="${product.price}">
            </div>
            <div class="form-group">
                <label for="category">Category:</label>
                <select id="category" name="category" >
                    <option value="${product.pname}">${product.category}</option>
                    <option value="vehicle">VEHICLE</option>
                    <option value="electronics">ELECTRONICS</option>
                    <option value="pets">PETS</option>
                    <option value="homes">HOMES</option>
                    <option value="land">LAND</option>
                    <option value="furniture">FURNITURE</option>
                    <option value="books">BOOKS</option>
                    <option value="fashion">FASHION</option>
                </select>
            </div>
           
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" name="description" >${product.description}"</textarea>
            </div>
            
            <div class="form-group">
                <label for="images">Product Images:</label>
                <input type="file" id="images" name="images"  multiple>
            </div>
            <div id="pro">

            </div>
            <button type="submit">Edit Product</button>`
    
}
editProduct()

document.getElementById("images").addEventListener('change',(e)=>{
    const arr=Object.values(document.getElementById("images").files)
    document.getElementById("pro").textContent="";
    images=[];
    arr.map(async(i)=>{
        images.push(await convertTBase64(i));
        const data=document.createElement("img");
        data.src=await convertTBase64(i);
        document.getElementById("pro").appendChild(data);
    })
    console.log(images);
    
    // document.getElementById("pro").innerHTML=`<img src="${images}" alt="" >`
})
function convertTBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    });
}