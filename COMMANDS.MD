- Commandos
- SQL cloud
-Crear instancia
 gcloud sql instances create bdproyecto --database-version=MYSQL_8_0
-Crear una base de datos mysql
gcloud sql databases create proyecto \
--instance=bdproyecto \
--charset=utf8mb4 \
--collation=utf8mb4_0900_ai_ci

- Comprobar que todo esté correcto
gcloud sql databases list \
--instance=bdproyecto

- Cambiar la contraseña de root en la gui
- Conectarse a instancia
gcloud sql connect bdproyecto --user=root

- Ejecutar script





