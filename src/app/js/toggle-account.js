document.addEventListener("DOMContentLoaded", () => {
    const suspendButtons = document.querySelectorAll(".suspend-btn");

    suspendButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const row = button.closest("tr"); // Obtener la fila de la tabla
            const statusCell = row.querySelector(".status"); // Celda de estado
            const isSuspended = statusCell.textContent.trim() === "Deshabilitado";

            // Cambiar estado del usuario
            if (isSuspended) {
                // Reactivar usuario
                statusCell.textContent = "Habilitado";
                row.classList.remove("inactive-row"); // Eliminar clase de opacidad reducida
                button.innerHTML = `<img src="images/turn-off-svgrepo-com.svg" alt="Suspender usuario" title="Suspender cuenta">`;
            } else {
                // Suspender usuario
                statusCell.textContent = "Deshabilitado";
                row.classList.add("inactive-row"); // Añadir clase de opacidad reducida
                button.innerHTML = `<img src="images/turn-off-svgrepo-com.svg" alt="Reactivar usuario" title="Reactivar cuenta">`;
            }
        });
    });
});
