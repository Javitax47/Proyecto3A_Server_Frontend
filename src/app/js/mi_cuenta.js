
document.addEventListener('DOMContentLoaded', async function() {
    // Obtener email y contraseña del localStorage
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (!email || !password) {
        alert('No se ha encontrado información de usuario. Por favor, inicie sesión nuevamente.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:13000/usuarios/login/${email}/${password}`);
        if (response.ok) {
            const data = await response.json();
            const user = data.user;

            // Prellenar los campos con los valores actuales del usuario
            document.getElementById('username').value = user.username || '';
            document.getElementById('email').value = user.email || '';
        } else {
            alert('Error al cargar datos de usuario.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('accountForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const passwordActual = document.getElementById('password_actual').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
        return;
    }

    // Verificar que la nueva contraseña tenga al menos 8 caracteres
    if (password.length < 8) {
        alert('La nueva contraseña debe tener al menos 8 caracteres.');
        return;
    }

    // Verificar que la contraseña actual sea correcta
    try {
        const verifyResponse = await fetch('http://localhost:13000/usuarios/verify-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: passwordActual })
        });

        const verifyResult = await verifyResponse.json();
        if (!verifyResponse.ok || !verifyResult.success) {
            alert('La contraseña actual es incorrecta. Por favor, inténtalo de nuevo.');
            return;
        }
    } catch (error) {
        console.error('Error en la verificación de la contraseña actual:', error);
        alert('Error en la conexión al servidor. Por favor, intenta de nuevo más tarde.');
        return;
    }

    // Si la contraseña actual es correcta, proceder con la actualización
    try {
        const updateResponse = await fetch('http://localhost:13000/users/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (updateResponse.ok) {
            alert('Perfil actualizado correctamente.');
            window.location.href = 'index.html';
        } else {
            const errorMessage = await updateResponse.text(); // Obtener mensaje de error del servidor
            alert('Error al actualizar el perfil: ' + errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en la conexión al servidor. Por favor, intenta de nuevo más tarde.');
    }
});