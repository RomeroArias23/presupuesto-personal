# Proyecto de Administración de Presupuesto Personal

Proyecto de **administración de presupuesto personal!** Esta API te ayuda a manejar tus finanzas usando el método de "Envelope Budgeting". Desarrollado con **Node.js** y **Express**, puedes crear, leer, actualizar y eliminar sobres de presupuesto, ¡además de transferir dinero entre ellos!


# Funcionalidades

-   **1. Crear Sobre de Presupuesto**
    
    -   **Endpoint:**  `POST /api/envelopes`
    -   **Descripción:**  Añade un nuevo sobre de presupuesto con un título y un presupuesto inicial.
    -   **Parámetros del cuerpo json:**
        -   `title`: (String) El nombre del sobre.
        -   `budget`: (Number) La cantidad de dinero inicial para el sobre.
-   **2. Obtener Todos los Sobres**
    
    -   **Endpoint:**  `GET /api/envelopes`
    -   **Descripción:**  Obtén una lista de todos tus sobres de presupuesto.
-   **3. Obtener un Sobre por ID**
    
    -   **Endpoint:**  `GET /api/envelopes/:id`
    -   **Descripción:**  Encuentra un sobre específico usando su ID.
    -   **Parámetros de URL:**
        -   `id`: (Number) ID del sobre que quieres ver.
-   **4. Actualizar un Sobre**
    
    -   **Endpoint:**  `PUT /api/envelopes/:id`
    -   **Descripción:**  Actualiza los detalles de un sobre, como su nombre o presupuesto.
    -   **Parámetros de URL:**
        -   `id`: (Number) ID del sobre que quieres actualizar.
    -   **Parámetros del cuerpo:**
        -   `title`  (opcional): (String) Nuevo nombre para el sobre.
        -   `budget`  (opcional): (Number) Nuevo presupuesto para el sobre.
        -   `amount`  (opcional): (Number) Cantidad a restar del presupuesto actual.
-   **5. Eliminar un Sobre**
    
    -   **Endpoint:**  `DELETE /api/envelopes/:id`
    -   **Descripción:**  Elimina un sobre de tu lista.
    -   **Parámetros de URL:**
        -   `id`: (Number) ID del sobre que quieres eliminar.
-   **5. Transferir Fondos entre Sobres**
    
    -   **Endpoint:**  `POST /api/envelopes/transfer/:from/:to`
    -   **Descripción:**  Mueve dinero de un sobre a otro.
    -   **Parámetros de URL:**
        -   `from`: (Number) ID del sobre de donde se sacará el dinero.
        -   `to`: (Number) ID del sobre al que se añadirá el dinero.
    -   **Parámetros del cuerpo:**
        -   `amount`: (Number) Cantidad de dinero a transferir.

## Cómo Empezar

1.  Clona este repositorio:
 
    `git clone https://github.com/tu-usuario/tu-proyecto.git
    cd tu-proyecto` 
    
2.  Instala las dependencias:
    
    `npm install` 
    
3.  Configura las variables de entorno en un archivo  `.env`  (si es necesario).
    
4.  Arranca el servidor:

    
    `npm start` 
    

## Pruebas

Los endpoints de esta API fueron probados utilizando Postman. Puedes probarlo tú mismo utilizando Postman o una tecnología similar. Asegúrate de que el servidor esté corriendo en  `http://localhost:3030`.
