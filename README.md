# proyecto-9-scrapper

🎮 **API de Gestión de Juegos**

Esta API REST permite gestionar juegos obtenidos mediante scraping. Incluye la inserción, eliminación y recuperación de juegos desde una base de datos MongoDB.

---

📌 **Características principales**
✅ Gestión de juegos con información detallada (título, precio e imagen).
✅ Eliminación automática de juegos antes de insertar nuevos.
✅ Uso de MongoDB y Mongoose como base de datos.
✅ Servidor construido con Node.js y Express.js.
✅ Scraping de datos con Puppeteer.
✅ Manejo de errores y respuestas estructuradas.

---

🛠 **Tecnologías utilizadas**
- **Node.js**: entorno de ejecución de JavaScript en el servidor.
- **Express.js**: framework para construir la API de manera eficiente.
- **MongoDB**: base de datos NoSQL para almacenar juegos.
- **Mongoose**: ODM para modelar los datos en MongoDB.
- **Puppeteer**: para extraer datos de páginas web.
- **Dotenv**: manejo de variables de entorno.

---

🚀 **Instalación y configuración**

1️⃣ **Clonar el repositorio:**
 **Configurar variables de entorno:**
Crea un archivo `.env` en la raíz del proyecto y agrega:
```env
DB_URL=mongodb://localhost:27017/tu_basededatos
PORT=3000
```

4️⃣ **Iniciar el servidor:**

npm start
```

---

💽 **Puntos finales disponibles**

### 🔄 Gestión de Juegos
| Método  | Endpoint | Descripción |
|---------|-------------------------|--------------------------------------|
| `POST`  | `/api/v1/games/Collect_games` | Borra todos los juegos y agrega los nuevos |
| `GET`   | `/api/v1/games/` | Obtiene todos los juegos almacenados |


---

📥 **Ejecutar el Scraper**
Para obtener datos actualizados desde una web externa y guardarlos en `products.json`, ejecuta:
mpm run scrapper


Luego, para insertar los datos en la base de datos, usa el endpoint `POST /api/v1/games/Collect_games`.



