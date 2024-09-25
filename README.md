# Sistema de Monitoreo de Sensores

Este proyecto consiste en un sistema de monitoreo que utiliza un sensor de temperatura y un sensor de CO2. Los datos son enviados desde un dispositivo Arduino a una aplicación frontend, donde se visualizan en tiempo real. La aplicación se comunica con un servidor que almacena y procesa la información.

## Tabla de Contenidos
- [Características](#características)
- [Requisitos](#requisitos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Características

- Monitoreo en tiempo real de los niveles de CO2 y temperatura.
- Interfaz web que muestra los datos de los sensores.
- Actualización automática de datos cada 5 segundos.
- Almacenamiento de datos en una base de datos PostgreSQL a través de una API REST.

## Requisitos

- Arduino con sensor de temperatura y CO2.
- Node.js y npm para el backend.
- PostgreSQL para la base de datos.
- Un entorno web compatible con JavaScript.

## Estructura del Proyecto

```
/Proyecto3A_Server_Frontend
    /public
        index.html # Archivo HTML principal
    /src
        /app
            /css
                styles.css # Estilos para la interfaz
            /img
            /js
            api.js # Lógica del frontend
```

## Instalación

1. Clona el repositorio:
2. 
    ```
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias del backend:

    ```
    cd backend
    npm install
    ```
   
3. Configura la base de datos PostgreSQL:

   - Crea una base de datos y configura las tablas necesarias.

4. Carga el código de Arduino en tu placa.

 ## Uso

1. Inicia el servidor:

    ```
    cd backend
    node server.js
    ```

2. Abre index.html en un navegador web para ver los datos en tiempo real.

 ## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

    1. Haz un fork del proyecto.
    2. Crea una nueva rama (git checkout -b feature/nueva-característica).
    3. Realiza tus cambios y haz un commit (git commit -m 'Agregué una nueva característica').
    4. Haz un push a la rama (git push origin feature/nueva-característica).
    5. Abre un Pull Request.

 ## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.