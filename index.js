const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

let porta = 4000;

app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'harrypotter',
  password: 'ds564',
  port: 5432,
});

// Rotas para varinhas
app.get('/varinhas', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM varinhas');
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar varinhas:', error);
      res.status(500).send('Erro ao buscar varinhas');
    }
});

app.post('/varinhas', async (req, res) => {
    const { material, comprimento, nucleo, data_fabricacao, bruxo_id } = req.body;
    try {
      await pool.query('INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao, bruxo_id) VALUES ($1, $2, $3, $4, $5)', [material, comprimento, nucleo, data_fabricacao, bruxo_id]);
      res.status(201).send('Varinha adicionada com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar varinha:', error);
      res.status(500).send('Erro ao adicionar varinha');
    }
});

app.put('/varinhas/:id', async (req, res) => {
    const { id } = req.params;
    const { material, comprimento, nucleo, data_fabricacao, bruxo_id } = req.body;
    try {
      await pool.query('UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_fabricacao = $4, bruxo_id = $5 WHERE id = $6', [material, comprimento, nucleo, data_fabricacao, bruxo_id, id]);
      res.send({ mensagem: 'Varinha atualizada com sucesso'});
    } catch (error) {
      console.error('Erro ao atualizar varinha:', error);
      res.status(500).send('Erro ao atualizar varinha');
    }
});

app.delete('/varinhas/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM varinhas WHERE id = $1', [id]);
      res.send({ mensagem: 'Varinha removida com sucesso'});
    } catch (error) {
      console.error('Erro ao remover varinha:', error);
      res.status(500).send('Erro ao remover varinha');
    }
});

// Rotas para bruxos
app.get('/bruxos', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM bruxos');
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar bruxos:', error);
      res.status(500).send('Erro ao buscar bruxos');
    }
});

app.post('/bruxos', async (req, res) => {
    const { nome, casa, varinha_id } = req.body;
    try {
      await pool.query('INSERT INTO bruxos (nome, casa, varinha_id) VALUES ($1, $2, $3)', [nome, casa, varinha_id]);
      res.status(201).send('Bruxo adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar bruxo:', error);
      res.status(500).send('Erro ao adicionar bruxo');
    }
});

app.put('/bruxos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, casa, varinha_id } = req.body;
    try {
      await pool.query('UPDATE bruxos SET nome = $1, casa = $2, varinha_id = $3 WHERE id = $4', [nome, casa, varinha_id, id]);
      res.send({ mensagem: 'Bruxo atualizado com sucesso'});
    } catch (error) {
      console.error('Erro ao atualizar bruxo:', error);
      res.status(500).send('Erro ao atualizar bruxo');
    }
});

app.delete('/bruxos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
      res.send({ mensagem: 'Bruxo removido com sucesso'});
    } catch (error) {
      console.error('Erro ao remover bruxo:', error);
      res.status(500).send('Erro ao remover bruxo');
    }
});

// Rota para frase aleatória
app.get('/', (req, res) => {
    const frases = [
        'Não é bom viver sonhando e se esquecer de viver.',
        'Palavras são, na minha não tão humilde opinião, nossa inesgotável fonte de magia.',
        'Não tenha pena dos mortos, Harry. Tenha pena dos vivos, e acima de tudo, daqueles que vivem sem amor.',
    ];
    const feiticos = [
        'Expecto Patronum',
        'Wingardium Leviosa',
        'Expelliarmus',
    ];
    const fraseOuFeitico = Math.random() < 0.5 ? frases : feiticos;
    const indexAleatorio = Math.floor(Math.random() * fraseOuFeitico.length);
    res.send(fraseOuFeitico[indexAleatorio]);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});