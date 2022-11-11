
const nombre= document.getElementById('username');
const password= document.getElementById('password');
const email= document.getElementById('email');
const phoneNumber= document.getElementById('phoneNumber');
const form=document.getElementById('form')
form.addEventListener("submit",e=>{
    e.preventDefault()
    let entrar=false
    let regexEmail=/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(nombre.value.length<6){
        alert("Nombre muy corto");
        entrar=true
    }
    if(!regexEmail.test(email.value)){
        alert("El email no es valido");
        entrar=true
    }
    if(phoneNumber.value.length!==8){
        alert("El campo debe de tener 8 digitos")
    }
    if(password.value.length<8){
        alert("La contraseña no es valida");
        entrar=true
    }
    form.reset();
})