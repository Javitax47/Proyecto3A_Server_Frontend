let map;
let heatLayer;
let markersLayer;
let currentView = 'heatmap';
let heatData = [];

const RADIO_METROS = 150;

// Definición de rangos AQI y colores
const AQI_RANGES = {
    GOOD: { min: 0, max: 50, color: [0, 228, 0] },      // Verde
    MODERATE: { min: 51, max: 100, color: [255, 255, 0] }, // Amarillo
    SENSITIVE: { min: 101, max: 150, color: [255, 126, 0] }, // Naranja
    UNHEALTHY: { min: 151, max: 200, color: [255, 0, 0] },  // Rojo
    VERY_UNHEALTHY: { min: 201, max: 300, color: [143, 63, 151] }, // Morado
    HAZARDOUS: { min: 301, max: 500, color: [126, 0, 35] }  // Marrón
};

function actualizarRadioHeatmap() {
    const center = map.getCenter();
    const lat = center.lat;
    const zoom = map.getZoom();

    const scale = 1 << zoom;
    const groundResolution = (Math.cos(lat * Math.PI / 180) * 40075016.686) / (256 * scale);
    const radioEnPixeles = RADIO_METROS / groundResolution;
    const radioPixelsClamped = Math.max(5, Math.min(radioEnPixeles, 200));

    if (heatLayer) {
        map.removeLayer(heatLayer);
    }

    heatLayer = L.heatLayer(heatData, {
        radius: radioPixelsClamped,
        blur: radioPixelsClamped / 2,
        maxZoom: 15,
        gradient: createAQIGradient(),
        max: 500  // Máximo valor AQI
    }).addTo(map);
}

// Crear gradiente de colores basado en rangos AQI
function createAQIGradient() {
    const gradient = {};
    const ranges = Object.values(AQI_RANGES);

    ranges.forEach((range, index) => {
        const position = range.max / 500;  // Normalizar a [0,1]
        const color = `rgb(${range.color.join(',')})`;
        gradient[position] = color;
    });

    return gradient;
}

// Inicializamos el mapa cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.createElement('div');
    mapContainer.setAttribute('id', 'map');
    document.querySelector('.map-placeholder').appendChild(mapContainer);

    map = L.map('map').setView([39.4699, -0.3763], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 16
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);
    map.on('zoomend', actualizarRadioHeatmap);

    const fechaHoy = new Date().toISOString().split('T')[0];
    fetchDataAndUpdateView(fechaHoy);
    actualizarRadioHeatmap();
});

/***************************************************************
 * 2) Manejo de checkboxes para filtrar (Temperatura, Ozono, etc.)
 ***************************************************************/
// IDs de tipos: 1=Ozono, 2=Temperatura, 3=Actividad, etc. (según tu lógica)
const temperaturaCheckbox = document.getElementById('temperatura');
const ozonoCheckbox       = document.getElementById('ozono');
const actividadCheckbox   = document.getElementById('actividad');

[temperaturaCheckbox, ozonoCheckbox, actividadCheckbox].forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Podrías almacenar la fecha seleccionada en algún input date
        // o usar una fecha fija de ejemplo
        const fecha = new Date().toISOString().split('T')[0];
        fetchDataAndUpdateView(fecha);
    });
});

/***************************************************************
 * 3) Búsqueda de ubicación (Nominatim)
 ***************************************************************/
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        alert('Por favor, ingresa una ubicación.');
        return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`)
        .then(response => response.json())
        .then(locations => {
            if (locations && locations.length > 0) {
                const { lat, lon } = locations[0];
                map.setView([lat, lon], 12);
            } else {
                alert('Ubicación no encontrada.');
            }
        })
        .catch(error => {
            console.error('Error en la búsqueda:', error);
            alert('Hubo un problema al realizar la búsqueda. Inténtalo de nuevo.');
        });
}

/***************************************************************
 * 4) Carga y procesamiento de datos con AQI
 ***************************************************************/
async function fetchDataAndUpdateView(fecha) {
    const data = await getMediciones(fecha);

    // Convertir valores a AQI
    heatData = data.map(item => {
        const aqi = calculateAQI(item.valor, item.tipo);
        return [item.location.x, item.location.y, aqi];
    });

    const pointData = data.map(item => {
        const aqi = calculateAQI(item.valor, item.tipo);
        return {
            lat: item.location.x,
            lng: item.location.y,
            tipo: item.tipo,
            valor: item.valor,
            aqi: aqi
        };
    });

    updateMapLayers(heatData, pointData);
}

async function getMediciones(fecha) {
    try {
        const url = `http://localhost:13000/mediciones/${fecha}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Si la respuesta es correcta, parseamos como JSON
            const data = await response.json();
            // Aquí puedes trabajar con los datos
            console.log('Mediciones recibidas:', data);
            return data;
        } else {
            // Error no-200
            console.error('Error al obtener las mediciones:', response.statusText);
            alert('Error al obtener las mediciones.');
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        alert('Ocurrió un error al hacer la solicitud.');
    }
}

/***************************************************************
 * 5) Actualización de capas del mapa
 ***************************************************************/
function updateMapLayers(heatData, pointData) {
    if (heatLayer) {
        map.removeLayer(heatLayer);
        heatLayer = null;
    }

    markersLayer.clearLayers();

    if (currentView === 'heatmap') {
        heatLayer = L.heatLayer(heatData, {
            radius: 25,
            blur: 15,
            maxZoom: 17,
            gradient: createAQIGradient(),
            max: 500
        }).addTo(map);
    } else {
        pointData.forEach(d => {
            const marker = L.circleMarker([d.lat, d.lng], {
                radius: 6,
                color: getColorForAQI(d.aqi),
                fillOpacity: 0.8
            }).bindPopup(`
                Tipo: ${getTipoName(d.tipo)}<br>
                Valor: ${d.valor}<br>
                AQI: ${d.aqi}
            `);

            markersLayer.addLayer(marker);
        });
    }
}

/***************************************************************
 * 6) Cálculos de AQI y utilidades de color
 ***************************************************************/
function calculateAQI(concentration, type) {
    switch (type) {
        case 1: // Ozono
            return computeAqiOzone(concentration);
        case 2: // Temperatura
            // Convertir temperatura a un pseudo-AQI (ejemplo)
            return computeAqiTemperature(concentration);
        case 3: // Actividad
            // Otro tipo de conversión
            return computeAqiActivity(concentration);
        default:
            return concentration;
    }
}

function computeAqiOzone(concentration) {
    if (concentration <= 0) return 0;
    else if (concentration <= 54)  return linearInterpolate(concentration, 0,  54,  0,   50);
    else if (concentration <= 70)  return linearInterpolate(concentration, 55, 70,  51,  100);
    else if (concentration <= 85)  return linearInterpolate(concentration, 71, 85,  101, 150);
    else if (concentration <= 105) return linearInterpolate(concentration, 86, 105, 151, 200);
    else if (concentration <= 200) return linearInterpolate(concentration, 106, 200, 201, 300);
    else return 500;
}

function computeAqiTemperature(temperature) {
    // Ejemplo de conversión de temperatura a AQI
    if (temperature <= 20) return 50;  // Comfortable
    else if (temperature <= 25) return 75;  // Warm
    else if (temperature <= 30) return 100;  // Hot
    else if (temperature <= 35) return 150;  // Very Hot
    else return 200;  // Extreme Heat
}

function computeAqiActivity(activity) {
    // Ejemplo de conversión de nivel de actividad a AQI
    return Math.min(500, activity * 2);
}

function linearInterpolate(c, cLow, cHigh, iLow, iHigh) {
    return Math.round(((iHigh - iLow) / (cHigh - cLow)) * (c - cLow) + iLow);
}

function getColorForAQI(aqi) {
    for (const range of Object.values(AQI_RANGES)) {
        if (aqi <= range.max) {
            return `rgb(${range.color.join(',')})`;
        }
    }
    return `rgb(${AQI_RANGES.HAZARDOUS.color.join(',')})`;
}

function getTipoName(tipo) {
    switch (tipo) {
        case 1: return 'Ozono';
        case 2: return 'Temperatura';
        case 3: return 'Actividad';
        default: return 'Desconocido';
    }
}