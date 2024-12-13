const map = L.map('map').setView([38.9958, -0.1651], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

let heatLayer;
let pointLayer = L.layerGroup();

const NORMAL_LIMITS = {
    1: { min: 0, max: 5 },
    2: { min: -50, max: 50 }
};

var fecha = ''; // Variable para almacenar la fecha seleccionada

let selectedGasType = 'todo'; // Valor por defecto es 'Todo'

// Evento para cambiar el tipo de gas seleccionado
document.getElementById('gas-type').addEventListener('change', (event) => {
    selectedGasType = event.target.value; // Actualiza el tipo de gas
    fetchDataAndUpdateView(); // Vuelve a cargar los datos filtrados por el tipo de gas
});

// Función para obtener los datos de la API y actualizar la vista
function fetchDataAndUpdateView() {
    if (!fecha) {
        alert('Por favor, selecciona una fecha.');
        return;
    }

    fetch('http://localhost:13000/mediciones/' + fecha)
        .then(response => response.json())
        .then(data => {
            // Filtra los datos según el tipo de gas seleccionado
            let filteredData;
            if (selectedGasType === 'todo') {
                filteredData = data; // Muestra todos los datos
            } else if (selectedGasType === 'calidad') {
                filteredData = data.filter(item => item.tipo === 1 || item.tipo === 2); // Filtra por ozono o temperatura
            } else {
                filteredData = data.filter(item => item.tipo === parseInt(selectedGasType)); // Filtra por el tipo de gas (1 para Ozono, 2 para Temperatura)
            }

            // Preparar los datos para el heatmap y los puntos
            const heatData = filteredData.map(item => [item.location.x, item.location.y, item.valor]);
            const pointData = filteredData.map(item => {
                return L.circleMarker([item.location.x, item.location.y], {
                    radius: 5,
                    color: getColorByValue(item.valor, item.tipo),
                    fillOpacity: 0.8
                }).bindPopup(`Valor: ${item.valor} \n Tipo: ${item.tipo}`);
            });

            if (heatLayer) {
                map.removeLayer(heatLayer);
            }

            pointLayer.clearLayers();

            const selectedView = document.querySelector('.view-selector .active').dataset.view;
            if (selectedView === 'heatmap') {
                heatLayer = L.heatLayer(heatData, { radius: 25 }).addTo(map);
            } else {
                pointData.forEach(marker => pointLayer.addLayer(marker));
                map.addLayer(pointLayer);
            }
        });
}

// Función para obtener el color según el valor del índice de calidad del aire
function getColorByValue(value, type) {
    const limits = NORMAL_LIMITS[type];
    if (!limits) return 'blue'; // Si no existe el tipo, se devuelve azul por defecto

    const range = limits.max - limits.min;
    const normalizedValue = (value - limits.min) / range;

    if (normalizedValue > 0.9) return 'red';
    if (normalizedValue > 0.7) return 'orange';
    if (normalizedValue > 0.5) return 'yellow';
    if (normalizedValue > 0.3) return 'green';
    return 'blue';
}


// Evento para el selector de fecha
document.getElementById('fecha').addEventListener('change', (event) => {
    fecha = event.target.value; // Actualiza la variable 'fecha' con el valor seleccionado
    fetchDataAndUpdateView(); // Realiza la petición a la API con la fecha seleccionada
});

// Función para establecer la fecha actual como valor por defecto
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
    document.getElementById('fecha').value = today; // Establece la fecha actual como valor del input
    fecha = today; // Asigna la fecha actual a la variable 'fecha'
    fetchDataAndUpdateView(); // Realiza la petición a la API con la fecha por defecto
}

// Llama a la función para establecer la fecha actual cuando la página cargue
setDefaultDate();

// Eventos para la búsqueda
document.querySelector('.search-box input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

document.querySelector('.search-box button').addEventListener('click', () => {
    performSearch();
});

// Función para realizar la búsqueda
function performSearch() {
    const query = document.querySelector('.search-box input').value.trim();
    if (!query) {
        alert('Por favor, ingresa una ubicación.');
        return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`)
        .then(response => response.json())
        .then(locations => {
            if (locations.length > 0) {
                const { lat, lon } = locations[0];
                map.setView([lat, lon], 10);
            } else {
                alert('Ubicación no encontrada.');
            }
        })
        .catch(error => {
            console.error('Error al buscar la ubicación:', error);
            alert('Hubo un problema al realizar la búsqueda. Inténtalo de nuevo.');
        });
}

// Llama a la función para cargar los datos inicialmente (sin fecha seleccionada aún)
fetchDataAndUpdateView();
