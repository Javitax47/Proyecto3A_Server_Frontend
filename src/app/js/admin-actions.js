document.addEventListener("DOMContentLoaded", () => {
    // Función para determinar si un usuario está inactivo (más de 24 horas sin medición)
    const isInactive = (lastMeasurementDate) => {
        if (!lastMeasurementDate) return true; // Sin datos, inactivo
        const now = new Date(); // Fecha actual
        const differenceInMs = now - lastMeasurementDate; // Diferencia en milisegundos
        return differenceInMs > 24 * 60 * 60 * 1000; // Más de 24 horas
    };

    // Poblar la tabla con los datos de los usuarios
    const populateUserTable = (users) => {
        const userTableBody = document.getElementById("user-table");
        userTableBody.innerHTML = ""; // Limpia la tabla antes de llenarla

        users.forEach((user) => {
            const lastMeasurementDate = user.fecha ? new Date(user.fecha) : null; // Convertir fecha del backend
            const userInactive = isInactive(lastMeasurementDate);

            // Crear fila de la tabla
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <span class="status-indicator ${userInactive ? "inactive" : "active"}" 
                          title="${userInactive ? "Inactivo" : "Activo"}"></span>
                    ${user.usuario}
                </td>
                <td>${user.correo}</td>
                <td>${user.sensor}</td>
                <td>${lastMeasurementDate ? lastMeasurementDate.toLocaleString() : "Sin datos"}</td>
                <td class="status">${user.activo ? "Habilitado" : "Deshabilitado"}</td>
                <td>
                    <button class="suspend-btn" data-email="${user.correo}" data-estado="${user.activo}">
                        <img src="images/turn-off-svgrepo-com.svg" 
                             alt="${user.activo ? "Suspender usuario" : "Reactivar usuario"}" 
                             title="${user.activo ? "Suspender cuenta" : "Reactivar cuenta"}">
                    </button>
                </td>
            `;
            userTableBody.appendChild(row);
        });

        addSuspendListeners(); // Configurar los botones de suspensión
    };

    // Configurar los botones de suspensión
    const addSuspendListeners = () => {
        const suspendButtons = document.querySelectorAll(".suspend-btn");

        suspendButtons.forEach((button) => {
            button.addEventListener("click", async () => {
                const row = button.closest("tr");
                const statusCell = row.querySelector(".status");
                const email = button.getAttribute("data-email");
                const isHabilitado = statusCell.textContent.trim() === "Habilitado";

                try {
                    // Realizar la solicitud al backend para alternar el estado del usuario
                    const response = await fetch("http://localhost:13000/toggleUserStatus", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, activo: !isHabilitado }),
                    });

                    if (!response.ok) {
                        throw new Error("Error al cambiar el estado del usuario");
                    }

                    // Alternar estado visualmente
                    statusCell.textContent = isHabilitado ? "Deshabilitado" : "Habilitado";
                    button.innerHTML = `
                        <img src="images/turn-off-svgrepo-com.svg" 
                             alt="${isHabilitado ? "Reactivar usuario" : "Suspender usuario"}" 
                             title="${isHabilitado ? "Reactivar cuenta" : "Suspender cuenta"}">
                    `;
                } catch (error) {
                    console.error(error);
                    alert("Hubo un error al cambiar el estado del usuario.");
                }
            });
        });
    };

    // Función para obtener usuarios desde el backend
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:13000/infoUsers");
            if (!response.ok) {
                throw new Error("Error al obtener la información de usuarios");
            }
            const users = await response.json();
            populateUserTable(users);
            updateTableStatus(); // Actualizar estados visuales
        } catch (error) {
            console.error(error);
            alert("Hubo un error al cargar los usuarios.");
        }
    };

    // Actualizar las filas de la tabla con las circunferencias
    const updateTableStatus = () => {
        const rows = document.querySelectorAll("#user-table tr");
        rows.forEach((row) => {
            const lastMeasurementCell = row.cells[3];
            const statusIndicator = row.querySelector(".status-indicator");
            const lastMeasurementText = lastMeasurementCell.textContent.trim();

            const lastMeasurementDate = lastMeasurementText
                ? new Date(lastMeasurementText.replace(" ", "T"))
                : null;

            const inactive = isInactive(lastMeasurementDate);
            statusIndicator.classList.remove("active", "inactive");
            statusIndicator.classList.add(inactive ? "inactive" : "active");
            statusIndicator.setAttribute("data-tooltip", inactive ? "Inactivo" : "Activo");
        });
    };

    // Llamar a la función para obtener y mostrar los datos
    fetchUsers();
});