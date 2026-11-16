# AstralWorld

**AstralWorld 1.00 · Preparación de lanzamiento**

Reproductor audiovisual móvil para organizar y reproducir vídeos locales, con una interfaz cinematográfica y una identidad visual propia.

## Experiencia

- **Explora:** acceso a la colección y a las secciones de contenido.
- **Biblioteca:** vídeos importados desde el dispositivo; en Android nativo, consulta de vídeos mediante MediaStore y permiso multimedia.
- **Shorts:** clasificación automática de vídeos de hasta 1 minuto.
- **Películas:** colección disponible desde Explora para vídeos de 90 minutos o más.
- **Reproductor:** reproducción local, pantalla completa, control de progreso, velocidad y mini reproductor.
- **Portadas personalizadas:** asigna, cambia o quita una imagen de portada desde el menú del reproductor → Editar información.
- **Ajustes:** opciones agrupadas y diseño móvil reorganizado.
- **Modo Online:** espacio de descubrimiento en desarrollo.

## Clasificación de contenido

La app clasifica los vídeos que el usuario importa o selecciona en AstralWorld:

| Categoría | Duración |
|---|---:|
| Shorts | Hasta 1 minuto |
| Películas | 90 minutos o más |
| Vídeos | Resto de duraciones |

La clasificación utiliza metadatos locales y no mueve ni duplica los archivos originales. La versión web/PWA no escanea automáticamente el almacenamiento Android: el usuario debe seleccionar los vídeos. En la compilación Android, el botón de escaneo solicita permiso de vídeos y consulta MediaStore. Los elementos se guardan como referencias al contenido del dispositivo; si un archivo se mueve o elimina, puede dejar de estar disponible.

## Tecnología actual

- HTML, CSS y JavaScript.
- IndexedDB para la biblioteca, progreso, actividad y metadatos de portadas.
- Service Worker para caché de la aplicación.
- Web App Manifest para instalación como PWA.

## Ejecutar localmente

Sirve la carpeta del proyecto mediante un servidor HTTP local. La importación persistente y el Service Worker requieren un contexto seguro (HTTPS o localhost).

## Android y distribución

Esta rama prepara la experiencia móvil y los recursos visuales. Se añadió la configuración de Capacitor y un flujo de GitHub Actions para generar un APK Android de depuración como artefacto de prueba. Aún faltan la integración MediaStore nativa, la firma de lanzamiento y las pruebas en dispositivos reales antes de generar un APK publicable. No se debe distribuir un APK de depuración como versión final.

## Identidad visual

Tema **Electric Aurora**: azul nocturno, violeta, turquesa y acentos solares. Los recursos separados de icono se encuentran en `icons/foreground.svg` y `icons/background.svg`.

## Estado de la versión

La rama `release/astralworld-1.00-prep` reúne cambios de preparación para AstralWorld 1.00. La Release pública se debe crear después de completar la integración Android, compilar y probar el APK firmado.
