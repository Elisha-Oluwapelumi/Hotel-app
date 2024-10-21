document.addEventListener('DOMContentLoaded', function () {
    const bookNowButtons = document.querySelectorAll('.book-now');
    
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            let room = this.getAttribute('data-room');
            let price = this.getAttribute('data-price');

            let checkIn = prompt("Please enter your check-in date (MM/DD/YYYY):", "");
            let checkOut = prompt("Please enter your check-out date (MM/DD/YYYY):", "");
            let specialRequest = prompt("Any special requests for your stay?", "None");

            if (checkIn && checkOut) {
                payWithPaystack(room, price, checkIn, checkOut, specialRequest);
            } else {
                alert("Booking cancelled. Please provide valid check-in and check-out dates.");
            }
        });
    });

    function payWithPaystack(room, price, checkIn, checkOut, specialRequest) {
        var handler = PaystackPop.setup({
            key: 'pk_test_42badfc7543f1620c47d0274527f3536bef546e7', 
            email: 'SerenitySuites123@gmail.com', 
            amount: price * 100, 
            currency: 'NGN',
            callback: function(response) {
                let transactionReference = response.reference;

                let booking = {
                    room: room,
                    price: price,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    specialRequest: specialRequest,
                    paymentReference: transactionReference
                };

                let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
                
                bookings.push(booking);

                localStorage.setItem('bookings', JSON.stringify(bookings));

                alert(`Payment complete! You have successfully booked the ${room} for $${price}. Your payment reference is ${transactionReference}.`);
            },
            onClose: function() {
                alert('Payment cancelled.');
            }
        });

        handler.openIframe();
    }
});