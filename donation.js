let donations = [];
let currentDisplayCount = 5;
const months = ["Last Year", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Next Year"];

document.addEventListener('DOMContentLoaded', function() {
    createMonthButtons();
    loadDonations(); 
});

function createMonthButtons() {
    const monthRow = document.getElementById('monthButtons');
    months.forEach(month => {
        const th = document.createElement('th');
        const button = document.createElement('button');
        button.innerText = month;
        button.onclick = () => loadMonthlyData(month);
        th.appendChild(button);
        monthRow.appendChild(th);
    });
}

function loadDonations() {
    
    
}
function loadMonthlyData(month) {
    const filename = `donation_${month.toLowerCase()}.json`;
    fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error('No data available for this month');
            }
            return response.json();
        })
        .then(data => {
            donations = data;
            currentDisplayCount = 5;
            updateTableDisplay();
            
            document.querySelector('.donation-table').style.display = 'block';
            document.getElementById('noDataMessage').style.display = 'none';
        })
        .catch(error => {
            console.error(error.message);
            
            document.querySelector('.donation-table').style.display = 'none';
            document.getElementById('noDataMessage').style.display = 'block';
        });
}


function displayNoDataMessage() {
    const tableBody = document.getElementById('donationTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '<tr><td colspan="5">Nothing to show...</td></tr>'; 

    
    document.getElementById('showMoreBtn').style.display = 'none';
    document.getElementById('showLessBtn').style.display = 'none';
}


function updateTableDisplay() {
    const tableBody = document.getElementById('donationTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; 

    for (let i = 0; i < currentDisplayCount && i < donations.length; i++) {
        const donation = donations[i];
        const row = `<tr>
                        <td>${donation.SerialNo}</td>
                        <td>${donation.Date}</td>
                        <td>${donation.Name}</td>
                        <td>${donation.Category}</td>
                        <td>${donation.Amount}</td>
                     </tr>`;
        tableBody.innerHTML += row;
    }

    
    document.getElementById('showMoreBtn').style.display = currentDisplayCount >= donations.length ? 'none' : 'inline-block';
    document.getElementById('showLessBtn').style.display = currentDisplayCount > 5 ? 'inline-block' : 'none';
    calculateTotalDonations();
}


function calculateTotalDonations() {
    let total = 0;
    if (donations.length > 0) {
        total = donations.reduce((acc, donation) => acc + parseInt(donation.Amount.substring(1)), 0);
    }
    document.getElementById('totalDonation').innerHTML = `Total Donation: <span>$${total}</span>`;
}

document.getElementById('showMoreBtn').addEventListener('click', function() {
    currentDisplayCount = Math.min(currentDisplayCount + 5, donations.length);
    updateTableDisplay();
});

document.getElementById('showLessBtn').addEventListener('click', function() {
    currentDisplayCount = Math.max(currentDisplayCount - 5, 5);
    updateTableDisplay();
});
