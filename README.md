# Conectando y administrando una base de datos PostgreSQL con Node.js

## Respuestas Prácticas

### a. ¿Por qué es mejor utilizar un pool de conexión, en vez de una simple?

Es mejor utilizar un **Pool de conexión** debido a los siguientes factores de rendimiento y arquitectura:

- **Reutilización de conexiones:** Abrir y cerrar una conexión física con la base de datos por cada consulta genera un alto costo de tiempo y recursos de CPU. El pool mantiene un conjunto de conexiones "vivas" listas para ser usadas.
- **Manejo de concurrencia:** Si tu aplicación recibe 100 peticiones simultáneas, una conexión simple fallaría o bloquearía el hilo. El pool distribuye esas solicitudes eficientemente entre las conexiones disponibles.
- **Prevención de colapsos:** Evita que la aplicación sature el servidor de base de datos abriendo infinitas conexiones, limitando el número máximo según la configuración definida.

### b. Generación de un error en la conexión y explicación

Si modificamos intencionalmente el archivo `.env` cambiando la contraseña a una incorrecta (ej: `DB_PASSWORD=clave_falsa`), al intentar arrancar o consultar el endpoint recibiremos el siguiente error en la consola:

`Error: password authentication failed for user "tu_usuario"`

**Explicación del tipo de error:**
Se trata de un **Error de Autenticación / Acceso (código de error de PostgreSQL `28P01`)**. Pertenece a la capa de seguridad de la base de datos. Significa que el cliente Node.js logró establecer contacto con el socket/puerto del servidor PostgreSQL (`5432`), pero el servidor rechazó la solicitud de inicio de sesión porque las credenciales (usuario o contraseña) provistas no coinciden con los registros internos del gestor de base de datos.
