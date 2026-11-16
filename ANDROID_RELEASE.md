# Preparación Android — AstralWorld 1.00

## Estado verificado del repositorio

La base web usa HTML/CSS/JavaScript. Ya se añadieron `package.json`, `capacitor.config.json` y un script que prepara los recursos en `www/`. El flujo `.github/workflows/android-debug.yml` genera el proyecto Android durante GitHub Actions y compila un APK de depuración descargable como artefacto. El directorio `android/` generado no se guarda en el repositorio.

## Siguiente integración requerida

1. Añadir Capacitor y configurar un identificador de aplicación estable (por ejemplo, el que el propietario confirme).
2. Generar el proyecto Android y sincronizar los recursos web.
3. Probar la consulta MediaStore ya añadida, incluyendo permisos en Android 13+ y versiones anteriores; validar la reproducción de URI content:// en WebView.
4. Conectar el selector de imágenes del sistema para portadas y mantener el acceso mínimo necesario.
5. Verificar reproducción, orientación, modo inmersivo, navegación del sistema y ciclo de vida en teléfonos reales.
6. Configurar una clave de firma de lanzamiento privada y persistente.
7. Crear un flujo de CI que genere el APK firmado y publique una GitHub Release solo cuando estén configurados los secretos de firma.

## Secretos de CI esperados

No subir una keystore ni contraseñas al repositorio. Cuando se prepare el flujo firmado, guardar las credenciales como secretos de GitHub Actions (keystore codificada en Base64, contraseña del almacén, alias y contraseña de la clave).

## Importante

La PWA y el contenedor Capacitor pueden importar archivos mediante el selector del sistema. La rama ya incluye un plugin Android inicial que consulta MediaStore y una acción de escaneo en Biblioteca. La compilación y la prueba real todavía están pendientes; también debe comprobarse que WebView reproduzca correctamente los URI content:// devueltos. La detección Shorts/Películas trabaja sobre los vídeos que ya forman parte de la biblioteca de AstralWorld. Shorts incluye duraciones de hasta 60 segundos (incluido); Películas incluye 90 minutos o más.
\n\n## Compilación de prueba\n\nEn GitHub, abre **Actions → Android debug APK → Run workflow**. Al terminar, descarga el artefacto `astralworld-android-debug`. Es un APK de depuración para pruebas, no una versión firmada de distribución.\n