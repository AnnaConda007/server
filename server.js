const express = require("express");
require('dotenv').config()
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const password = process.env.PASSWORD;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/sendmail", async (req, res) => {
  try {
    const { htmlContent } = req.body;
    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",

      secure: true,
      auth: {
        user: "annahrulkova@yandex.ru",
        pass: "gkxcgpcawppuxwmb",
      },
    });

    const mailOptions = {
      from: "annahrulkova@yandex.ru",
      to: "hrulckovaa@yandex.ru",
      subject: "Новый заказ",
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    if (result) {
      res.status(200).json({ message: "Письмо успешно отправлено" });
    } else {
      res.status(500).json({ message: "Ошибка отправки" });
    }
  } catch (error) {
    console.error("Ошибка отправки:", error);
    res.status(500).json({ message: "Ошибка отправки" });
  }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});