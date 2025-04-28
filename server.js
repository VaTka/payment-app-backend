import express from 'express';
import cors from 'cors';
import { readFile } from 'fs/promises';

const data = await readFile('./db.json', 'utf-8');
const db = JSON.parse(data);

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/transactions', (req, res) => {
  res.json(db.transactions);
});

app.get('/api/user', (req, res) => {
  let points = 0;
  
  db.transactions.forEach(tx => {
    let multiplier = 1;
    
    if (tx.description?.toLowerCase().includes('game')) multiplier = 3;
    if (tx.description?.toLowerCase().includes('grocery')) multiplier = 1.5;
    if (tx.description?.toLowerCase().includes('kitchen')) multiplier = 2;
    
    points += tx.amount * multiplier;
  });

  res.json({ points: Math.floor(points), money: 245, user: 'Valera' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
