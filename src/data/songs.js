export const songs = [
  { id: 'luna', title: 'Luna', artist: 'Feid, ATL Jacob', album: 'FERXXOCALIPSIS', duration: '3:16', popularity: 98, genre: 'Urbano', cover: 'cover-lime', symbol: '☾' },
  { id: 'ojitos', title: 'Ojitos Lindos', artist: 'Bad Bunny, Bomba Estéreo', album: 'Un Verano Sin Ti', duration: '4:18', popularity: 96, genre: 'Urbano', cover: 'cover-sunset', symbol: '☀' },
  { id: 'provenza', title: 'PROVENZA', artist: 'KAROL G', album: 'MAÑANA SERÁ BONITO', duration: '3:30', popularity: 94, genre: 'Urbano', cover: 'cover-pink', symbol: '✿' },
  { id: 'telepatia', title: 'telepatía', artist: 'Kali Uchis', album: 'Sin Miedo', duration: '2:40', popularity: 91, genre: 'Pop', cover: 'cover-violet', symbol: '✧' },
  { id: 'vampiros', title: 'VAMPIROS', artist: 'ROSALÍA, Rauw Alejandro', album: 'RR', duration: '3:09', popularity: 88, genre: 'Pop', cover: 'cover-red', symbol: '♜' },
  { id: 'ojala', title: 'Oj Alá', artist: 'Rawayana', album: '¿Quién trae las cornetas?', duration: '3:42', popularity: 85, genre: 'Alternativa', cover: 'cover-blue', symbol: '◎' },
  { id: 'si-antes', title: 'Si Antes Te Hubiera Conocido', artist: 'KAROL G', album: 'Tropicoqueta', duration: '3:15', popularity: 84, genre: 'Urbano', cover: 'cover-orange', symbol: '♫' },
  { id: 'hasta-raiz', title: 'Hasta la Raíz', artist: 'Natalia Lafourcade', album: 'Hasta la Raíz', duration: '3:41', popularity: 80, genre: 'Alternativa', cover: 'cover-green', symbol: '❋' },
  { id: 'disfruto', title: 'Disfruto', artist: 'Carla Morrison', album: 'Déjenme Llorar', duration: '3:44', popularity: 77, genre: 'Pop', cover: 'cover-rose', symbol: '♡' },
  { id: 'ojitos-mentirosos', title: 'Ojos Marrones', artist: 'Lasso', album: 'Eva', duration: '3:18', popularity: 74, genre: 'Pop', cover: 'cover-sky', symbol: '◉' },
];

export const connections = [
  ['luna', 'provenza'], ['luna', 'si-antes'], ['luna', 'ojitos'], ['ojitos', 'provenza'],
  ['ojitos', 'telepatia'], ['provenza', 'si-antes'], ['provenza', 'vampiros'], ['telepatia', 'disfruto'],
  ['telepatia', 'vampiros'], ['vampiros', 'ojala'], ['ojala', 'hasta-raiz'], ['hasta-raiz', 'disfruto'],
  ['disfruto', 'ojitos-mentirosos'], ['ojitos-mentirosos', 'ojala'], ['si-antes', 'vampiros'],
];
