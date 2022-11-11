function loginClick() {
   validate();
}

function validate(){
    let username= document.getElementById('username').value;
    let password= document.getElementById('password').value;

    if(username ==='test1' && password==='1234'){
        alert('Login succesfuly!');
    }else{
        alert('Login failed!');
    }
}