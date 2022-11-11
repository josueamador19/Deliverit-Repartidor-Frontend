
const nombre= document.getElementById('username');
const password= document.getElementById('password');
const form=document.getElementById('form')
form.addEventListener("submit",e=>{
    if(nombre.value==="amador" && password.value==="1234"){
      windows.location.href('home.html');
    }else{
      alert("Usuario invalido")
    }
})