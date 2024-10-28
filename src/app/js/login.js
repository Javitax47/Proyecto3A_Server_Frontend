// login.js

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:13000/usuarios/login/${email}/${password}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Guardar email y contraseña en localStorage
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            window.location.href = 'mi_cuenta.html';
        } else {
            alert('Email o contraseña incorrectos.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
