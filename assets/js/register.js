

function registerClick(){
    const username = $('#username').val();
    const email = $('#email').val();
    const phoneNumber = $('#phoneNumber').val();
    const password = $('#password').val();
    //console.log(username, email, phoneNumber, password);
    if(username.length>0 && email.length>0 && phoneNumber.length>0 && password.length>0){
        $.post("https://deliverit-backend.vercel.app/roundsman/register",{
            "name":username,
            "email":email,
            "phoneNumber":phoneNumber,
            "password": password
        }).done(function(response){
            //console.log(response);
            document.cookie = 'username='+response.username+'; expire=31536000;';
            document.cookie = 'idRoundsman='+response._id+'; expire=31536000;';
            window.location.href='home.html';
        }).fail(function(xhr,status,res){
            alert(xhr.responseText);
        })
    }
}


form.addEventListener("submit",e=>{
    e.preventDefault()
    registerClick();
    
})