document.addEventListener('DOMContentLoaded', () => {
    
    const backButton = document.getElementById('back-btn');
    const options1 = document.getElementById('options1');
    const options2 = document.getElementById('options2');
    const nextButton = document.getElementById('next-btn');
    const paymentButton = document.getElementById('payment-btn');
    const donationAmount = document.getElementById('donation-amount');
    const hiddenSelectedOption = document.getElementById('hidden-selected-option');
    const question1 = document.getElementById('question1');
    const question2 = document.getElementById('question2');

    
    let selectedOption = '';
    let googleUser = null; 

    function setActiveButton(selectedButton) {
        document.querySelectorAll('.main-content button').forEach(button => {
            button.classList.remove('active');
        });
        selectedButton.classList.add('active');
    }

    function enableNextButton() {
        nextButton.disabled = false;
    }

    function updateQuestion() {
        question1.style.display = 'none';
        question2.style.display = 'block';
        question2.innerHTML = `<b>Donating for ${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}. How much do you want to donate?</b>`;
    }

    function smoothTransition(hideElementId, showElementId) {
        document.getElementById(hideElementId).style.display = 'none';
        document.getElementById(showElementId).style.display = 'block';
    }

    const queryParams = new URLSearchParams(window.location.search);
    const questionParam = queryParams.get('question');

    if (questionParam === '2') {
        updateQuestion();
        smoothTransition('options1', 'options2');
    }

    backButton.addEventListener('click', () => {
        smoothTransition('options2', 'options1');
    });

    ["education-btn", "food-btn"].forEach(id => {
        document.getElementById(id).addEventListener('click', function() {
            selectedOption = this.id.split('-')[0];
            if (hiddenSelectedOption) {
                hiddenSelectedOption.value = selectedOption;
            }
            setActiveButton(this);
            enableNextButton();
        });
    });

    nextButton.addEventListener('click', () => {
        if (selectedOption) {
            updateQuestion();
            smoothTransition('options1', 'options2');
        } else {
            alert('Please select an option to continue.');
        }
    });

    function redirectToPayment() {
        const donorName = googleUser ? googleUser.getBasicProfile().getName() : 'Anonymous Donor';
        const donationValue = parseFloat(donationAmount.value);
        const donationCategory = selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1);

        if (donationValue > 0) {
            window.location.href = `payment.html?donor=${encodeURIComponent(donorName)}&category=${encodeURIComponent(donationCategory)}&amount=${donationValue}`;
        } else {
            alert('Please enter a valid donation amount.');
        }
    }

    paymentButton.addEventListener('click', redirectToPayment);

    
    window.onSignIn = (user) => {
        googleUser = user;
        
    };
});
