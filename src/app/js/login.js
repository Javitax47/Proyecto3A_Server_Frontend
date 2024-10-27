// login.js

// Cargar el encabezado desde header.html
fetch('../assets/includes/header.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);
    });

// Validar que la contraseña tenga al menos 8 caracteres
document.querySelector('.login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    try {
        const response = await fetch('http://localhost:13000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert('Inicio de sesión exitoso.');
            window.location.href = 'profile.html'; // Redirigir a la página de perfil
        } else {
            const errorMessage = await response.text();
            alert(`Error al iniciar sesión: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el inicio de sesión. Por favor, intenta de nuevo más tarde.');
    }
});
