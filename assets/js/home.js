
const list=document.querySelectorAll('.list');
function activeLink(){
    list.forEach((item)=> item.classList.remove('active'));
    this.classList.add('active');

}
list.forEach((item)=>item.addEventListener('click', activeLink));

function assignedClick(){
    document.getElementById('orders-assigned').style.display ='block';
    document.getElementById('orders-in-progress').style.display ='none';
    document.getElementById('orders-completed').style.display ='none';
}
function progressClick(){
    document.getElementById('orders-assigned').style.display ='none';
    document.getElementById('orders-in-progress').style.display ='block';
    document.getElementById('orders-completed').style.display ='none';
}
function completedClick(){
    document.getElementById('orders-assigned').style.display ='none';
    document.getElementById('orders-in-progress').style.display ='none';
    document.getElementById('orders-completed').style.display ='block';
}
