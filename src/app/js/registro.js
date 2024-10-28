// registro.js

document.querySelector('.register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

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

            // Guardar email y contraseña en localStorage
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            window.location.href = 'login.html';
        } else {
            const errorMessage = await response.json();
            alert(`Error al registrar: ${errorMessage.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el registro. Por favor, intenta de nuevo más tarde.');
    }
});
