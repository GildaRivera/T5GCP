# Commandos
- SQL cloud
## Crear instancia
 gcloud sql instances create proyectobd --database-version=MYSQL_8_0
## Crear una base de datos mysql
gcloud sql databases create gcpBackend \
--instance=proyectobd \
--charset=utf8mb4 \
--collation=utf8mb4_0900_ai_ci

## Comprobar que todo esté correcto
gcloud sql databases list \
--instance=proyectobd

## Cambiar la contraseña de root en la gui
## Conectarse a instancia
gcloud sql connect proyectobd --user=root

## Ejecutar script

## Crear funcion 

gcloud functions describe user

gcloud functions deploy user \
--runtime nodejs16 --trigger-http --allow-unauthenticated




