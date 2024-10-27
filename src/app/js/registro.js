// registro.js

// Cargar el encabezado desde header.html
fetch('../assets/includes/header.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);
    });

// Validar que la contraseña tenga al menos 8 caracteres
document.querySelector('.register-form').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    
    if (password.length < 8) {
        event.preventDefault(); // Evita el envío del formulario
        alert('La contraseña debe tener al menos 8 caracteres.');
    }
});
