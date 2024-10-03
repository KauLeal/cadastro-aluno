const express = require("express");
const router = express.Router();

const validDDDs = [
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "21",
  "22",
  "24",
  "31",
  "32",
  "33",
  "34",
  "35",
  "37",
  "38",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "51",
  "53",
  "54",
  "55",
  "61",
  "62",
  "64",
  "63",
  "71",
  "73",
  "74",
  "75",
  "77",
  "81",
  "82",
  "83",
  "85",
  "88",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
];

router.post("/submit", (req, res) => {
  const {
    nome,
    nascimento,
    nomeMae,
    nomePai,
    telefone,
    email,
    serie,
    turno,
    atividades,
  } = req.body;

  if (
    !nome ||
    !nascimento ||
    !nomeMae ||
    !nomePai ||
    !telefone ||
    !email ||
    !serie ||
    !turno
  ) {
    return res.render("error", {
      message: "Todos os campos são obrigatórios.",
    });
  }

  if (!/\d{2}\/\d{2}\/\d{4}/.test(nascimento)) {
    return res.render("error", { message: "Data de nascimento inválida." });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.render("error", { message: "Email inválido." });
  }

  const ddd = telefone.replace(/\D/g, "").substring(0, 2);

  if (!validDDDs.includes(ddd)) {
    return res.render("error", {
      message: "DDD ou número de telefone inválido.",
    });
  }

  // Força a conversão de `atividades` para array
  const atividadesArray = Array.isArray(atividades)
    ? atividades
    : atividades
    ? [atividades]
    : [];

  if (atividadesArray.length > 3) {
    return res.render("error", {
      message: "Máximo de 3 atividades extracurriculares permitido.",
    });
  }

  res.render("success");
});

module.exports = router;
