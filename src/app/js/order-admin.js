document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("user-table");
    const tableHeaders = document.querySelectorAll("thead th");

    // Función para normalizar texto (ignorar acentos y mayúsculas)
    const normalizeText = (text) => {
        return text
            .normalize("NFD") // Descompone caracteres con acentos
            .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
            .toLowerCase(); // Convierte todo a minúsculas
    };

    // Obtener filas de la tabla como un array
    const getTableRows = () => Array.from(tableBody.querySelectorAll("tr"));

    // Actualizar la tabla con las filas ordenadas
    const updateTable = (rows) => {
        tableBody.innerHTML = "";
        rows.forEach((row) => tableBody.appendChild(row));
    };

    // Ordenar tabla por columna y orden
    const sortTable = (column, order) => {
        const rows = getTableRows();

        rows.sort((a, b) => {
            const aText = a.cells[column].innerText.toLowerCase();
            const bText = b.cells[column].innerText.toLowerCase();

            if (column === 3) {
                // Columna de última medición (ordenar por fecha)
                const aDate = new Date(aText);
                const bDate = new Date(bText);
                return order === "asc" ? aDate - bDate : bDate - aDate;
            } else {
                // Ordenar alfabéticamente
                return order === "asc" ? aText.localeCompare(bText) : bText.localeCompare(aText);
            }
        });

        updateTable(rows);
    };

    // Manejar clics en encabezados para ordenar
    tableHeaders.forEach((header, index) => {
        header.addEventListener("click", () => {
            const currentOrder = header.getAttribute("data-order");
            const newOrder = currentOrder === "asc" ? "desc" : "asc";

            // Actualizar las flechas
            tableHeaders.forEach((h) => {
                h.querySelector(".sort-arrow").textContent = "▲";
                h.setAttribute("data-order", "asc");
            });
            header.querySelector(".sort-arrow").textContent = newOrder === "asc" ? "▲" : "▼";
            header.setAttribute("data-order", newOrder);

            // Ordenar tabla
            sortTable(index, newOrder);
        });
    });

    // Búsqueda de usuarios
    const searchInput = document.getElementById('user-search');
    searchInput.addEventListener('input', function () {
        const searchValue = normalizeText(this.value);
        const tableRows = getTableRows();

        tableRows.forEach(row => {
            const rowData = normalizeText(row.textContent);
            row.style.display = rowData.includes(searchValue) ? '' : 'none';
        });
    });
});
