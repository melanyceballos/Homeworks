# Challenge 7: tareas con Firebase

Copie `.env.example` a `.env` y complete la configuración de la aplicación web de Firebase. En Firebase Console active Email/Password en Authentication y cree Firestore. Proteja cada documento de `tasks` para que solo el usuario cuyo UID coincide con `request.auth.uid` pueda leerlo o modificarlo. Ejecute `npm install` y `npm run dev`. Las operaciones de Firebase requieren la configuración real; no se incluyen claves.
