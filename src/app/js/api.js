/**
 * @brief Función asíncrona para obtener los datos más recientes de CO2 y temperatura del servidor.
 *
 * Esta función realiza una solicitud a la API del servidor para obtener los últimos datos
 * de los sensores de CO2 y temperatura. Los datos se utilizan para actualizar la interfaz
 * de usuario con los valores actuales.
 *
 * @async
 * @function fetchLatestSensorData
 * @returns {Promise<void>} No devuelve ningún valor.
 */
async function fetchLatestSensorData() {
    try {
        // Realiza una solicitud HTTP GET a la URL del servidor para obtener los datos más recientes
        const response = await fetch('http://localhost:13000/latest'); // Cambia a la URL de tu servidor
        const data = await response.json(); // Convierte la respuesta a formato JSON

        // Actualizar los valores de CO2 en la página
        if (data.co2) {
            document.getElementById('co2Value').textContent = data.co2.value; // Muestra el valor de CO2
        } else {
            document.getElementById('co2Value').textContent = 'No disponible'; // Mensaje si no hay datos
        }

        // Actualizar los valores de temperatura en la página
        if (data.temperature) {
            document.getElementById('temperatureValue').textContent = data.temperature.value; // Muestra el valor de temperatura
        } else {
            document.getElementById('temperatureValue').textContent = 'No disponible'; // Mensaje si no hay datos
        }

    } catch (error) {
        // Manejo de errores: muestra un mensaje en la consola si ocurre un error al obtener los datos
        console.error('Error al obtener los datos de sensores:', error);
    }
}

/**
 * @brief Función que se ejecuta al cargar la página.
 *
 * Llama a la función `fetchLatestSensorData` para obtener los datos iniciales de los sensores
 * y configura un intervalo para actualizar los datos cada 5 segundos.
 */
window.onload = () => {
    fetchLatestSensorData(); // Obtener datos iniciales
    setInterval(fetchLatestSensorData, 1000); // Actualizar cada 5 segundos
};
