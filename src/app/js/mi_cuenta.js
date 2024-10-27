document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
        return;
    }

    // Aquí puedes agregar lógica para guardar los datos del formulario
    alert('Datos guardados correctamente.');
});
