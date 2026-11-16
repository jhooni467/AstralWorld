# Preparación Android — AstralWorld 1.00

## Estado verificado del repositorio

La base actual es una PWA de HTML/CSS/JavaScript. En la rama de preparación todavía no existe un directorio `android/`, configuración de Capacitor, proyecto Gradle ni almacén de firma de lanzamiento. Por eso esta documentación no afirma que exista ya un APK nativo.

## Siguiente integración requerida

1. Añadir Capacitor y configurar un identificador de aplicación estable (por ejemplo, el que el propietario confirme).
2. Generar el proyecto Android y sincronizar los recursos web.
3. Implementar acceso multimedia nativo con MediaStore y los permisos de lectura apropiados según la versión de Android.
4. Conectar el selector de imágenes del sistema para portadas y mantener el acceso mínimo necesario.
5. Verificar reproducción, orientación, modo inmersivo, navegación del sistema y ciclo de vida en teléfonos reales.
6. Configurar una clave de firma de lanzamiento privada y persistente.
7. Crear un flujo de CI que genere el APK firmado y publique una GitHub Release solo cuando estén configurados los secretos de firma.

## Secretos de CI esperados

No subir una keystore ni contraseñas al repositorio. Cuando se prepare el flujo firmado, guardar las credenciales como secretos de GitHub Actions (keystore codificada en Base64, contraseña del almacén, alias y contraseña de la clave).

## Importante

La PWA actual puede importar archivos seleccionados por el usuario. No puede escanear por sí sola toda la biblioteca multimedia Android ni solicitar permisos nativos sin una capa Android. La detección Shorts/Películas de esta rama trabaja sobre los vídeos que ya forman parte de la biblioteca de AstralWorld.
