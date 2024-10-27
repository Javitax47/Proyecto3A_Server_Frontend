document.getElementById('accountForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
        return;
    }

    // Verificar que la contraseña tenga al menos 8 caracteres
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    try {
        const response = await fetch('http://localhost:13000/users/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Perfil actualizado correctamente.');
        } else {
            const errorMessage = await response.text(); // Obtener mensaje de error del servidor
            alert(`Error al actualizar el perfil: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en la conexión al servidor. Por favor, intenta de nuevo más tarde.');
    }
});
