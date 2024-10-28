
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
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
        return;
    }
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
            alert('Error al actualizar el perfil.');
            console.error('Error:', response);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
