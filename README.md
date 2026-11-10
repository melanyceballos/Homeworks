# Challenge 7: tareas con Firebase

Copie `.env.example` a `.env` y complete la configuración de la aplicación web de Firebase. En Firebase Console active Email/Password en Authentication y cree Firestore. Aplique `firestore.rules` para que solo el usuario cuyo UID coincide con `request.auth.uid` pueda leer o modificar sus documentos. Ejecute `npm install` y `npm run dev`. Las operaciones de Firebase requieren la configuración real; no se incluyen claves.
