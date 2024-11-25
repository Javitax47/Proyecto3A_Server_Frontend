// registro.js

document.querySelector('.register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const checkbox = document.getElementById('terms');


    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    //const emailRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //if (!emailRegex.test(password)) {
    //    alert('La contraseña no es válida.');
    //    return;
    //}

    if (!checkbox.checked) {
        alert('Debes aceptar los términos y la política de privacidad para registrarte.');
        return false;
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
