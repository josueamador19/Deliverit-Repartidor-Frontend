function assignedClick(){
    document.getElementById('orders-assigned').style.display ='block';
    document.getElementById('orders-Available').style.display ='none';
    document.getElementById('orders-completed').style.display ='none';
    $('.active').removeClass('active');
    $('.assigned').addClass('active');
}
function progressClick(){
    document.getElementById('orders-assigned').style.display ='none';
    document.getElementById('orders-Available').style.display ='block';
    document.getElementById('orders-completed').style.display ='none';
    $('.active').removeClass('active');
    $('.available').addClass('active');
}
function completedClick(){
    document.getElementById('orders-assigned').style.display ='none';
    document.getElementById('orders-Available').style.display ='none';
    document.getElementById('orders-completed').style.display ='block';
    $('.active').removeClass('active');
    $('.completed').addClass('active');
}

let orders = [];
(async () => {
    orders = [
        {
                ID: 12335,
                date: '12:05 - 30/10/2022',
                status: 'Received',
                dealer: {
                    name: 'Carlos',
                    tel: '5551234567'
                },
                products: [
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    }
                ]
            },
            {
                ID: 12342,
                date: '12:54 - 31/10/2022',
                status: 'Preparing',
                dealer: {
                    name: 'Mario',
                    tel: '5551234598'
                },
                products: [
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    },
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    }
                ]
            },
            {
                ID: 12343,
                date: '10:20 - 31/10/2022',
                status: 'OnTheWay',
                dealer: {
                    name: 'pedro',
                    tel: '55512386667'
                },
                products: [
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    },
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    }
                ]
            },
            {
                ID: 12347,
                date: '10:20 - 31/10/2022',
                status: 'Delivered',
                dealer: {
                    name: 'pedro',
                    tel: '55512386667'
                },
                products: [
                    {
                        img: '/assets//img/tmp/image_2022-10-12_221845364-removebg-preview.png',
                        name: 'Burger',
                        store: 'McDonalds',
                        price: 12.99
                    }
                ]
            },
        ];
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
    })
})();

function details(){
    
}
