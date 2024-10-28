// registro.js

<<<<<<< HEAD
// Validar que la contraseña tenga al menos 8 caracteres y que el correo tenga un formato válido
document.querySelector('.register-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
=======
document.querySelector('.register-form').addEventListener('submit', async function(event) {
    event.preventDefault();
>>>>>>> origin/dev

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

<<<<<<< HEAD
    // Validación de la contraseña
=======
>>>>>>> origin/dev
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

<<<<<<< HEAD
    // Validación del formato del correo
=======
>>>>>>> origin/dev
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return;
    }

    try {
<<<<<<< HEAD
        const response = await fetch('http://localhost:13000/usuarios', { 
=======
        const response = await fetch('http://localhost:13000/usuarios', {
>>>>>>> origin/dev
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Registro exitoso. Puedes iniciar sesión ahora.');
<<<<<<< HEAD
            window.location.href = 'login.html'; // Redirigir a la página de login
=======

            // Guardar email y contraseña en localStorage
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            window.location.href = 'login.html';
>>>>>>> origin/dev
        } else {
            const errorMessage = await response.json();
            alert(`Error al registrar: ${errorMessage.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el registro. Por favor, intenta de nuevo más tarde.');
    }
});
