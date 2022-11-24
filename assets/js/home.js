function renderizeAvailable(response){
    $('#orders-Avalaible').html('');
    response.forEach((order, orderindex) => {
        
        $('#orders-Available').append(
            `<div class="order-item">
            <div class="row">
                <div class="col headerOrder">
                    <span>ID: ${order.id}</span>
                    <span>${order.date}</span>
                </div>
            </div>
            <span class="text">${order.status}</span>
            <div class="moreDetails" data-orderindex="${order.id}" onclick="viewModalOrder(this)">
                <span>more details <i class="fa-solid fa-chevron-right"></i></span>
            </div>
        </div> `
        );
    })
}
function assignedClick(){
    document.getElementById('orders-assigned').style.display ='block';
    document.getElementById('orders-Available').style.display ='none';
    document.getElementById('orders-completed').style.display ='none';
    $('.active').removeClass('active');
    $('.assigned').addClass('active');
    
    const options = {method: 'GET',credentials: 'include'};

    fetch('http://localhost:3000/roundsman/ordersName', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

    
} 

function progressClick(){
    document.getElementById('orders-assigned').style.display ='none';
    document.getElementById('orders-Available').style.display ='block';
    document.getElementById('orders-completed').style.display ='none';
    $('.active').removeClass('active');
    $('.available').addClass('active');
    const options = {method: 'GET',credentials: 'include'};

    fetch('http://localhost:3000/roundsman/ordersAvailables', options)
    .then(response => response.json())
    .then(response => renderizeAvailable(response))
    .catch(err => console.error(err));
    
}
function completedClick(){
    document.getElementById('orders-assigned').style.display ='none';
    document.getElementById('orders-Available').style.display ='none';
    document.getElementById('orders-completed').style.display ='block';
    $('.active').removeClass('active');
    $('.completed').addClass('active');
    const options = {method: 'GET',credentials: 'include'};

    fetch('http://localhost:3000/roundsman/ordersCompleted', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

let orders = [];

(async () => {
assignedClick();
});



    $('#orders-completed').html('');
    $('#orders-assigned').html('');
    orders.forEach((order, orderindex) => {
        if (order.status == 'Delivered') {
            $('#orders-completed').append(
                `<div class="order-item">
                <div class="row">
                    <div class="col headerOrder">
                        <span>ID: ${order.ID}</span>
                        <span>${order.date}</span>
                    </div>
                </div>
                <span class="text">${order.status}</span>
                <div class="moreDetails" data-orderindex="${order.ID}" onclick="viewModalOrder(this)">
                    <span>more details <i class="fa-solid fa-chevron-right"></i></span>
                </div>
            </div> `
            );
        }else{
            $('#orders-assigned').append(
                `<div class="order-item">
                <div class="row">
                    <div class="col headerOrder">
                        <span>ID: ${order.ID}</span>
                        <span>${order.date}</span>
                    </div>
                </div>
                <span class="text">${order.status}</span>
                <div class="moreDetails" data-orderindex="${order.ID}" onclick="viewModalOrder(this)">
                    <span>more details <i class="fa-solid fa-chevron-right"></i></span>
                </div>
            </div> `
            );
        }
    });

function markDelivered(){
    $.post
}
function details(){
    $('#modalOrder').append(
        `
        `
    )
}
