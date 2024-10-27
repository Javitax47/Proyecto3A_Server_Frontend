// registro.js

// Validar que la contraseña tenga al menos 8 caracteres y que el correo tenga un formato válido
document.querySelector('.register-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Validación de la contraseña
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    // Validación del formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return;
    }

    try {
        const response = await fetch('http://localhost:13000/usuarios', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Registro exitoso. Puedes iniciar sesión ahora.');
            window.location.href = 'login.html'; // Redirigir a la página de login
        } else {
            const errorMessage = await response.json();
            alert(`Error al registrar: ${errorMessage.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el registro. Por favor, intenta de nuevo más tarde.');
    }
});
