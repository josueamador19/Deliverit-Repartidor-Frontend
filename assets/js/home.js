
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

let orders = [];
(async () => {
    orders = [
        {
                ID: 123342,
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
                ID: 123423,
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
                ID: 123424,
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
                ID: 123425,
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
    orders.forEach((order, orderindex) => {
        if (order.status == 'Delivered') {
            $('#orders-completed').append(
                `<div class="order-item">
                <span class="icon material-symbols-rounded">${order.ID}</span>
                <span class="text">${order.status}</span>
                <div class="date-and-time">
                    ${order.date}
                </div>
                <button data=orderindex="${order.ID}" class="show-Details" type="submit" onclick="viewModalOrder(this)">show details</button>
            </div>`
            );
        }else{
            $('#orders-assigned').append(
                `<div class="order-item">
                <span class="icon material-symbols-rounded">${order.ID}</span>
                <span class="text">${order.status}</span>
                <div class="date-and-time">
                    ${order.date}
                </div>
                <button data-orderindex="${order.ID}" class="show-Details" type="submit" onclick="viewModalOrder(this)" >show details</button>
            </div>`
            );
        }
    })
})();

function details(){
    
}
