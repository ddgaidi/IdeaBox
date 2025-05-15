const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: '*' }
});

io.on('connection', (socket) => {
    console.log('Client connecté');
    socket.on('newSuggestion', (data) => {
        io.emit('refreshSuggestions', data);
    });
});

http.listen(PORT, () => {
    console.log(`Serveur socket en écoute sur http://localhost:${PORT}`);
});
