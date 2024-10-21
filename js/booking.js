// booking.js
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
                Swal.fire({
                    title: "Error!",
                    text: "Booking cancelled. Please provide valid check-in and check-out dates!",
                    icon: "error"
                });
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

                Swal.fire({
                    title: 'Payment Complete!',
                    text: `You have successfully booked the ${room} for $${price}. Your payment reference is ${transactionReference}.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                displayBookings(); 
            },
            onClose: function() {
                Swal.fire({
                    title: "Error!",
                    text: "Payment cancelled!",
                    icon: "error"
                });
            }
        });

        handler.openIframe();
    }

    function displayBookings() {
       
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const bookingList = document.getElementById('booking-list');

       
        bookingList.innerHTML = '';

        if (bookings.length > 0) {
            bookings.forEach((booking, index) => {
                const bookingItem = document.createElement('div');
                bookingItem.classList.add('booking-item');
                bookingItem.innerHTML = `
                    <div class="card p-3">
                        <h4>${booking.room}</h4>
                        <p><strong>Check-In:</strong> ${booking.checkIn}</p>
                        <p><strong>Check-Out:</strong> ${booking.checkOut}</p>
                        <p><strong>Price:</strong> $${booking.price}</p>
                        <p><strong>Special Request:</strong> ${booking.specialRequest}</p>
                        <div class="card-footer">
                            <button class="delete-btn" data-index="${index}">&times; Delete</button>
                        </div>
                    </div>
                    <hr>
                `;
                bookingList.appendChild(bookingItem);
            });

            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');

                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            bookings.splice(index, 1); 
                            localStorage.setItem('bookings', JSON.stringify(bookings)); 
                            displayBookings();
                            Swal.fire(
                                'Deleted!',
                                'Your booking has been deleted.',
                                'success'
                            );
                        }
                    });
                });
            });
        } else {
            bookingList.innerHTML = '<p>No rooms have been booked yet.</p>';
        }
    }

    displayBookings();
});
