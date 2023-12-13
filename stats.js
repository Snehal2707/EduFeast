let chart; 

document.addEventListener('DOMContentLoaded', function() {
    createMonthButtons();
    initializeChart();
    loadMonthlyData(new Date().getMonth() + 1); 
    loadCorrelationData(); 
    loadScatterPlotData();
    loadPiePlotData();
});

function createMonthButtons() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthSelector = document.getElementById('monthSelector');
    
    months.forEach((month, index) => {
        const button = document.createElement('button');
        button.innerText = month;
        button.onclick = () => loadMonthlyData(index + 1);
        monthSelector.appendChild(button);
    });
}

function loadMonthlyData(month) {
    fetch(`fetch_data.php?month=${month}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            updateChart(data);
        })
        .catch(error => console.error('Error loading data:', error));
}


function updateChart(donationData) {
    chart.data.labels = donationData.map(d => d.Date);
    chart.data.datasets[0].data = donationData.map(d => parseFloat(d.Amount));
    chart.update();
}
function initializeChart() {
    const ctx = document.getElementById('donationChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line', 
        data: {
            labels: [],
            datasets: [{
                label: 'Donation Amount',
                data: [],
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

function updateChart(donationData) {
    chart.data.labels = donationData.map(d => d.Date);
    chart.data.datasets[0].data = donationData.map(d => parseFloat(d.Amount));
    chart.update();
}


function loadCorrelationData() {
    fetch('fetch_correlation_data.php')
        .then(response => response.json())
        .then(data => {
            createScatterPlot(data);
        })
        .catch(error => console.error('Error loading correlation data:', error));
}
function loadTimeSeriesData() {
    fetch('fetch_time_series_data.php')
        .then(response => response.json())
        .then(data => createTimeSeriesChart(data))
        .catch(error => console.error('Error loading time series data:', error));
}

function loadScatterPlotData() {
    fetch('fetch_scatter_plot_data.php')
        .then(response => response.json())
        .then(data => createScatterPlot(data))
        .catch(error => console.error('Error loading scatter plot data:', error));
}
function loadPiePlotData() {
    fetch('fetch_pie_chart_data.php') 
     .then(response => response.json())
     .then(data => createPieChart(data))
     .catch(error => console.error('Error loading pie chart data:', error));}
 

function createScatterPlot(data) {
    const canvas = document.getElementById('scatterPlotChart');
    const ctx = canvas.getContext('2d');

    
    if (window.scatterChart) window.scatterChart.destroy();

    
    window.scatterChart = new Chart(ctx, {
            type: 'scatter',
        data: {
            datasets: [{
                label: 'Total Donations Over Time',
                data: data.map(item => ({
                    x: new Date(item.Date),
                    y: item.TotalAmount
                })),
                backgroundColor: 'rgba(75, 192, 192, 1)'
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        let label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += `Total Donation: $${tooltipItem.yLabel}`;
                        return label;
                    }
                }
            }
        }
    });
}
function createPieChart(data) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    
    if (window.pieChart instanceof Chart) {
        window.pieChart.destroy();
    }

    
    window.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.map(item => item.Category), 
            datasets: [{
                data: data.map(item => item.TotalAmount), 
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total Donations by Category'
            }
        }
    });
}
