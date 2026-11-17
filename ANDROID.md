# AstralWorld para Android

AstralWorld se prepara como aplicación Android mediante Capacitor. La interfaz actual HTML/CSS/JavaScript se conserva y se empaqueta dentro de una aplicación Android (WebView nativa); no se instala desde el navegador como PWA.

- Identificador Android: `com.noverse.astralworld`
- Nombre visible: `AstralWorld`
- Directorio web generado: `www/` (no se versiona; se crea desde los archivos actuales antes de sincronizar).
- Proyecto Android: se genera con `npx cap add android`.
- Plugins nativos: App (botón Atrás y ciclo de vida), Status Bar, Screen Orientation y Keep Awake (base para control de pantalla activa).

## Preparación local

1. Instala Node.js 22, Android Studio y un JDK 21.
2. Ejecuta `npm install`.
3. Ejecuta `npm run prepare:web`.
4. Ejecuta `npx cap add android` (solo la primera vez).
5. Ejecuta `npx cap sync android`.
6. Abre Android Studio con `npx cap open android` o compila un APK de depuración con `cd android && ./gradlew assembleDebug`.

## APK automático

El workflow **Build AstralWorld Android APK** genera un APK de depuración y lo publica como artefacto de GitHub Actions. Ese APK sirve para pruebas e instalación directa; antes de distribuir una versión oficial en Noverse se debe configurar firma de lanzamiento protegida mediante secretos y generar un APK release firmado.

## Estado y limitaciones

Esta es la base de empaquetado. No implica que todas las funciones de archivos, reproducción multimedia, subtítulos, audio, ciclo de vida o navegación Android ya estén adaptadas a APIs nativas. La primera capa incluye integración del botón Atrás, ocultación de la barra de estado en el reproductor y bloqueo horizontal cuando está abierto. La selección de carpetas depende de APIs que Android WebView puede no ofrecer; en ese caso se debe usar la selección múltiple de vídeos. Estas integraciones requieren auditoría y pruebas en dispositivos reales. No se debe publicar el APK de depuración como versión final.
