(function() {
    emailjs.init("2YqYr7l5SXL6S99X5");  
})();

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    emailjs.send('service_rl73jcd', 'template_gwce0ou', templateParams)
        .then(function(response) {
            alert('Message Sent Successfully!'); 
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById('contactForm').reset();
        }, function(error) {
            alert('Failed to send message. Please try again later.'); 
            console.log('FAILED...', error);
        });
});
