document.addEventListener("DOMContentLoaded", function () {
    const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
    const ozoneCtx = document.getElementById('ozoneChart').getContext('2d');

    // Temperatura
    new Chart(temperatureCtx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `Día ${i + 1}`),
            datasets: [{
                label: 'Temperatura (°C)',
                data: Array.from({ length: 30 }, () => Math.random() * 10 + 20),
                borderColor: 'rgba(171, 44, 121, 1)',
                backgroundColor: 'rgba(171, 44, 121, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
            }],
        },
    });

    // Ozono
    new Chart(ozoneCtx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `Día ${i + 1}`),
            datasets: [{
                label: 'Ozono (ppm)',
                data: Array.from({ length: 30 }, () => Math.random() * 50 + 10),
                borderColor: 'rgba(171, 44, 121, 1)',
                backgroundColor: 'rgba(171, 44, 121, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
            }],
        },
    });
});
