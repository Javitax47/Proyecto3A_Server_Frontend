let previousOzoneTimestamp = null; // Variable para almacenar la última fecha de ozono
let previousTemperatureTimestamp = null; // Variable para almacenar la última fecha de temperatura

/**
 * @brief Función asíncrona para obtener los datos más recientes de ozono y temperatura del servidor.
 *
 * Esta función realiza una solicitud a la API del servidor para obtener los últimos datos
 * de los sensores de ozono y temperatura. Los datos se utilizan para actualizar la interfaz
 * de usuario con los valores actuales.
 *
 * @async
 * @function fetchLatestSensorData
 * @returns {Promise<void>} No devuelve ningún valor.
 */
async function fetchLatestSensorData() {
    try {
        // Realiza una solicitud HTTP GET a la URL del servidor para obtener los datos más recientes
        const response = await fetch(`http://localhost:13000/latestByEmail/correo@gmail.com`);
        const data = await response.json(); // Convierte la respuesta a formato JSON

        // Actualizar los valores de ozono en la página
if (data.ozono) {
    const ozoneTimestamp = new Date(data.ozono.timestamp).toLocaleString();

    if (ozoneTimestamp !== previousOzoneTimestamp) {
        document.getElementById('ozone-value').textContent = data.ozono.value;
        document.getElementById('ozone-last-updated').textContent = ozoneTimestamp;
        // Mostrar el indicador solo si la fecha es diferente
        document.getElementById('indicador-deteccion-ozono-izq').textContent = "·";
        document.getElementById('indicador-deteccion-ozono-der').textContent = "·";
        setTimeout(() => {
            document.getElementById('indicador-deteccion-ozono-izq').textContent = "";
            document.getElementById('indicador-deteccion-ozono-der').textContent = "";
        }, 200);
        previousOzoneTimestamp = ozoneTimestamp;
    }
} else {
    document.getElementById('ozone-value').textContent = 'No disponible';
    document.getElementById('ozone-last-updated').textContent = 'No disponible';
}

// Actualizar los valores de temperatura en la página
if (data.temperature) {
    const temperatureTimestamp = new Date(data.temperature.timestamp).toLocaleString();

    if (temperatureTimestamp !== previousTemperatureTimestamp) {
        document.getElementById('temperature-value').textContent = data.temperature.value;
        document.getElementById('temperature-last-updated').textContent = temperatureTimestamp;
        // Mostrar el indicador solo si la fecha es diferente
        document.getElementById('indicador-deteccion-temp-izq').textContent = "·";
        document.getElementById('indicador-deteccion-temp-der').textContent = "·";
        setTimeout(() => {
            document.getElementById('indicador-deteccion-temp-izq').textContent = "";
            document.getElementById('indicador-deteccion-temp-der').textContent = "";
        }, 200);
        previousTemperatureTimestamp = temperatureTimestamp;
    }
} else {
    document.getElementById('temperature-value').textContent = 'No disponible';
    document.getElementById('temperature-last-updated').textContent = 'No disponible';
}

    } catch (error) {
        document.getElementById('ozone-value').textContent = 'Sin conexión';
        document.getElementById('ozone-last-updated').textContent = '--/--/----, --:--:--';
        document.getElementById('temperature-value').textContent = 'Sin conexión';
        document.getElementById('temperature-last-updated').textContent = '--/--/----, --:--:--';
        console.log(error);
    }
}

/**
 * @brief Función que se ejecuta al cargar la página.
 *
 * Llama a la función `fetchLatestSensorData` para obtener los datos iniciales de los sensores
 * y configura un intervalo para actualizar los datos cada 1 segundo.
 */
window.onload = () => {
    fetchLatestSensorData(); // Obtener datos iniciales
    setInterval(fetchLatestSensorData, 1000); // Actualizar cada segundo
};