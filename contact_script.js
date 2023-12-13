
emailjs.init("l9nDzmzqsbo5U9jLs");

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');

    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        
        var data = {
            user_name: document.getElementById('user_name').value,
            user_email: document.getElementById('user_email').value,
            message: document.getElementById('message').value
        };

        
        emailjs.send('service_gdxzcrs', 'template_4ssz3ta', data)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message sent successfully!');
                form.reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send the message, please try again.');
            });
    });
});
