function assignedClick(){
    document.getElementById('orders-assigned').style.display ='block';
    document.getElementById('orders-Available').style.display ='none';
    document.getElementById('orders-completed').style.display ='none';
    $('.active').removeClass('active');
    $('.assigned').addClass('active');
    
    const options = {method: 'GET',credentials: 'include'};

    fetch('http://localhost:3000/roundsman/ordersName', options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        $('#orders-assigned').html('');
        response.forEach((order, orderindex) => {
            
            $('#orders-assigned').append(
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
    })
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
    .then(response => {
        $('#orders-Available').html('');
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
    })
    
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
    .then(response => {
        $('#orders-completed').html('');
        response.forEach((order, orderindex) => {
            
            $('#orders-completed').append(
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
    })
}

assignedClick();

function takeOrder(btn) {
    const orderID = $(btn).attr('data-idOrder');
    const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('idRoundsman='))
    ?.split('=')[1];

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/roundsman/takedOrder/"+orderID,
        "method": "PUT",
        beforeSend: function(xhr){
            xhr.withCredentials = true;
        },
        data: {"id": cookieValue}}
    
    $.ajax(settings).done(function (response) {
        $('#modalOrder').css('z-index', '-999')
        assignedClick();
    });
}

function deliveredOrder(btn) {
    const orderID = $(btn).attr('data-idOrder');
    const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('idRoundsman='))
    ?.split('=')[1];

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/roundsman/markDeliveredOrder/"+orderID,
        "method": "PUT",
        beforeSend: function(xhr){
            xhr.withCredentials = true;
        },
        data: {"id": cookieValue}}
    
    $.ajax(settings).done(function (response) {
        $('#modalOrder').css('z-index', '-999')
        assignedClick();
    });

}

function otwOrder(btn) {
    const orderID = $(btn).attr('data-idOrder');
    const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('idRoundsman='))
    ?.split('=')[1];

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/roundsman/OrderOnTheWay/"+orderID,
        "method": "PUT",
        beforeSend: function(xhr){
            xhr.withCredentials = true;
        },
        data: {"id": cookieValue}}
    
    $.ajax(settings).done(function (response) {
        $('#modalOrder').css('z-index', '-999')
        assignedClick();
    });
}