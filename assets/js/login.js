let users=[
  {
    name:'admin',
    pass:'admin'
  }
]

const nombre= document.getElementById('username');
const password= document.getElementById('password');
const form=document.getElementById('form')


form.addEventListener("submit",e=>{
  e.preventDefault();
  users.forEach(user => {
    if(nombre.value===user.name && password.value===user.pass){
      window.location.href='home.html';
    }else{
      alert("Usuario Invalido");
    }
  });
  /*
    
    if(nombre.value==="admin" && password.value==="admin"){
      window.location.href = 'home.html';
    }else{
      alert("Usuario invalido")
    }
    */
})