// Función para obtener los datos más recientes de CO2 y temperatura del servidor
async function fetchLatestSensorData() {
    try {
        const response = await fetch('http://localhost:13000/latest'); // Cambia a la URL de tu servidor
        const data = await response.json();

        // Actualizar los valores de CO2 y temperatura en la página
        if (data.co2) {
            document.getElementById('co2Value').textContent = data.co2.value;
        } else {
            document.getElementById('co2Value').textContent = 'No disponible';
        }

        if (data.temperature) {
            document.getElementById('temperatureValue').textContent = data.temperature.value;
        } else {
            document.getElementById('temperatureValue').textContent = 'No disponible';
        }

    } catch (error) {
        console.error('Error al obtener los datos de sensores:', error);
    }
}

// Llamar a la función al cargar la página y actualizar cada 5 segundos
window.onload = () => {
    fetchLatestSensorData(); // Obtener datos iniciales
    setInterval(fetchLatestSensorData, 1000); // Actualizar cada 5 segundos
};
