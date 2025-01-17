document.querySelector('.reset-password-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validación de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.');
        return;
    }

    // Validación de coincidencia de contraseñas
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, intenta de nuevo.');
        return;
    }

    try {
        const response = await fetch('http://localhost:13000/users/updatePass', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Se ha enviado un correo para confirmar el restablecimiento de tu contraseña.');
            window.location.href = 'index.html';
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        alert('Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.');
    }
});
