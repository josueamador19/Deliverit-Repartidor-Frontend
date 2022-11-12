
const nombre= document.getElementById('username');
const password= document.getElementById('password');
const form=document.getElementById('form')

form.addEventListener("submit",e=>{
    e.preventDefault();
    if(nombre.value==="admin" && password.value==="admin"){
      window.location.href = 'home.html';
    }else{
      alert("Usuario invalido")
    }
})