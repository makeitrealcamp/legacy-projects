### Airbnb clone

## Descripción

El airbnb es una plataforma de alquiler de viviendas, apartamentos y habitaciones. Los usuarios pueden buscar y reservar alojamiento en más de 190 países.

## Video presentación

https://youtu.be/Mdq2s9HLf00?list=PLxyfMWnjW2ktsDlYU7KVJltXGfHvXVGBE&t=3170

## Tecnologías

### Frontend

- React
- React Router
- SASS
- Redux
- Axios
- Mantine
- sweetalert2
- Places API
- Maps javascript API
- Geocoding API

### Backend

- Node
- Express
- Mongoose
- MongoDB
- bcrypt
- busboy
- morgan
- dotenv
- cors
- nodemailer
- cloudinary
- jsonwebtoken

## Database

<img src="./.img/model.png">

## El trabajo que te toca hacer

El proyecto es un MVP que ya está terminado, pero hay algunas funcionalidades que no están implementadas y existen algunas desiciones tecnicas que no fueron las mas acertadas. Tu trabajo es implementar las siguientes funcionalidades:

- [ ] Crear un repositorio en GitHub para cada uno de los proyectos (client y server). Este repositorio debe ser publico y debe tener como colaboradores a los instructores del curso. El nombre del repositorio debe ser `airbnb-<client o server>`.
- [ ] Ejecutar el proyecto en tu computador y familiarizarte con el código (debes buscar las variables de entorno necesarias para poder ejecutar tu código).
- [ ] Adicionar reglas de ESLint al proyecto (airbnb, standarjs) y correr el linter para que el codigo siga esas reglas.
- [ ] Migrar el Router a la version 6.4 y utilizar [`createbrowserrouter`](https://reactrouter.com/en/main/routers/create-browser-router#createbrowserrouter)
- [ ] Migrar uso de redux a redux-toolkit.
- [ ] Modificar la estructura de carpetas del backend para seguir la convencion basada en [domain modules](https://alexkondov.com/tao-of-node/#structure-in-modules), la vista en clases.
- [ ] Implementar pasarela de pagos Stripe
- [ ] Modificar la carga de imagenes desde el backend haciendo uso de la libreria multer.
- [ ] Cambiar plataforma de envío de correos de nodemailer a sendgrid
- [ ] Documentar backend usando swagger
- [ ] Modificar la carpeta de componentes para que tenga el test y el componente, es decir, debes agregar test unitarios a todos los componentes.

