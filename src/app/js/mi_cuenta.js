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
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
