import nc from "next-connect";
import db from "../../../../utils/db";
import bcrypt from "bcrypt";
import { validateEmail } from "../../../../utils/validation";
import { createActivationToken } from "../../../../utils/token";
import User from "../../../../Models/User";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Por favor complete todos os campos." });
    }
    // Validamos o email digitado
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "O e-mail digitado é inválido." });
    }
    //Verificamos se o e-mail já existe no banco de dados
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "O E-mail digitado já existe." });
    }
    // Verificamos se a senha e menor do que 6
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "A senha deve ter pelo menos seis caracteres." });
    }
    // Fazendo o hash da senha do usúario
    const crypedPassword = await bcrypt.hash(password, 12);

    // Criando novo usúario
    const newUser = new User({ name, email, password: crypedPassword });
    const addedUser = await newUser.save();

    //Criando o token de ativação da conta com o envio de e-mail
    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });
    const url = `${process.env.BASE_URL}/activate/${activation_token}`;
    res.send(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
