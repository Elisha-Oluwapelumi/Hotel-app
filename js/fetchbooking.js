document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the bookings from localStorage
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const bookingList = document.getElementById('booking-list');

    if (bookings.length > 0) {
        bookings.forEach(booking => {
            const bookingItem = document.createElement('div');
            bookingItem.classList.add('booking-item');
            bookingItem.innerHTML = `
                <div class="room-details">  
                    <h4>${booking.room}</h4>
                    <p>Check-In: ${booking.checkIn}</p>
                    <p>Check-Out: ${booking.checkOut}</p>
                    <p>Price: $${booking.price}</p>
                    <p>Special Request: ${booking.specialRequest}</p>
                </div>
                <hr>
            `;
            bookingList.appendChild(bookingItem);
        });
    } else {
        bookingList.innerHTML = '<p>No rooms have been booked yet.</p>';
    }
});