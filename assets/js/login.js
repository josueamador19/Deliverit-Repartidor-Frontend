let users=[
  {
    name:'admin',
    pass:'admin'
  }
]




function loginClick(){
  const phoneNumber = $('#phoneNumber').val();
  const password = $('#password').val();
  //console.log(phoneNumber,password);
  if(phoneNumber.length>0 && password.length>0 ){
    $.post("http://localhost:3000/roundsman/login",
    {
      "phoneNumber": phoneNumber,
      "password": password})
      .done(function(response){
        //console.log(response);
        document.cookie='id='+response._id+'; expire=3253600;';
        window.location.href='home.html';
      }).fail(function(xhr,status,res){
        alert(xhr.responseText);
      })}}
      

form.addEventListener("submit",e=>{
  e.preventDefault();
  loginClick();
  
  
})


