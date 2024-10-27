// Carga el contenido del encabezado desde header.html
fetch('../assets/includes/header.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);
    });
