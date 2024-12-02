// loadHeaderFooter.js

// Función para cargar el header
function loadHeader() {
    fetch('../includes/header.html')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al cargar el header');
            }
            return response.text();
        })
        .then((data) => {
            document.querySelector('header').innerHTML = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Función para cargar el footer
function loadFooter() {
    fetch('../includes/footer.html')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al cargar el footer');
            }
            return response.text();
        })
        .then((data) => {
            document.querySelector('footer').innerHTML = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Cargar header y footer cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
});
