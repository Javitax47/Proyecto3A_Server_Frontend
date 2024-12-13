document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat-password').value;

    // Validación de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.');
        return;
    }

    // Validación de coincidencia de contraseñas
    if (password !== repeatPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Validación de correo electrónico
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
