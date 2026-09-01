# Biblioteca del Repositorio (Corpus Estático)

Esta carpeta aloja textos de dominio público (transcripciones Staferla de Lacan y tomos
de las Gesammelte Werke de Freud) que se despliegan **junto con la aplicación**. A
diferencia de los archivos que cada usuario sube desde su PC (que solo se guardan en el
IndexedDB de su propio navegador y no persisten entre dispositivos), todo lo que está acá
queda disponible para cualquiera que abra la app —en cualquier navegador, dispositivo o
remix— porque viaja dentro del repositorio y se sirve como parte del deploy.

## Cómo agregar un texto

1. Convertí el archivo a texto plano (`.txt`, codificado en UTF-8) y colocalo dentro de
   `lacan/` o `freud/` (podés crear subcarpetas si preferís organizarlo por seminario o
   volumen, ej. `lacan/seminaire-xxiii/`).
2. Agregá una entrada en `manifest.json` (es un array JSON) con esta forma:

   ```json
   {
     "id": "lacan-seminaire-xxiii",
     "title": "Séminaire XXIII: Le Sinthome",
     "author": "Jacques Lacan",
     "sourceReference": "Staferla, transcription critique (Séances 1975-1976)",
     "language": "french",
     "file": "lacan/seminaire-xxiii.txt"
   }
   ```

   Campos: `id` único, `title`, `author` (`"Jacques Lacan"`, `"Sigmund Freud"` u
   `"Otro / Mixto"`), `sourceReference` (referencia bibliográfica), `language`
   (`"french"`, `"german"`, `"spanish"` o `"mixed"`) y `file` (ruta relativa a esta
   carpeta).

3. Hacé commit y push. En el próximo deploy (o al recargar la página en desarrollo), el
   texto aparece automáticamente en la pestaña **«Biblioteca del Repositorio»** de la
   app, sin que nadie tenga que volver a subirlo.

## Por qué no PDFs directamente

Convertí los PDF/DOCX a texto plano antes de subirlos acá — podés usar la propia app
para eso: subí el PDF en la pestaña **«Cargar Archivos de PC»**, copiá el texto extraído
del área de trabajo y pegalo en un `.txt`. Esto mantiene el repositorio liviano y evita
depender de la extracción de PDF/DOCX en cada carga de la biblioteca.
