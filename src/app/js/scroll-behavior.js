// Agregar un evento de clic al enlace
document.querySelector('.scroll-link').addEventListener('click', function(e) {
    e.preventDefault(); // Previene el comportamiento predeterminado del enlace

    // Scroll suave a la sección destino
    document.querySelector('#about-section').scrollIntoView({
        behavior: 'smooth'
    });
});
