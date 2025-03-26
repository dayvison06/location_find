// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/send-location", async (req, res) => {
  const { latitude, longitude } = req.body;

  const data = new Date();
  const opcoes = {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // ou true se quiser 12h com AM/PM
  };
  
  const horaBrasilia = data.toLocaleTimeString("pt-BR", opcoes);

  const message = `Localização do usuário: ${horaBrasilia} - https://www.google.com.br/maps/place/${latitude},${longitude}`;

  try {
    
    console.log(message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao enviar a localização para o Telegram." });
  }
});

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});
