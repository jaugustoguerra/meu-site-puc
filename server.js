const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o pacote cors
const app = express();
const port = 3000;

// Configura o middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Usa o middleware cors

// Conecta ao banco de dados SQLite
const db = new sqlite3.Database('./recordes.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Cria a tabela de recordes se não existir
db.run(`CREATE TABLE IF NOT EXISTS recordes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT NOT NULL,
    acertos INTEGER NOT NULL,
    data TEXT NOT NULL
)`);

// Rota para salvar os recordes
app.post('/salvar-recorde', (req, res) => {
    const { nickname, acertos } = req.body;
    const data = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    db.run(`INSERT INTO recordes (nickname, acertos, data) VALUES (?, ?, ?)`, [nickname, acertos, data], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Recorde salvo com sucesso!' });
    });
});

// Rota para obter os recordes
app.get('/recordes', (req, res) => {
    db.all(`SELECT * FROM recordes ORDER BY acertos DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});