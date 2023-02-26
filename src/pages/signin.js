import Footer from "components/footer";
import Header from "components/header";
import React, { useState } from "react";
import styles from "../../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginIput from "components/inputs/loginInput";
import BtnLogin from "components/buttons/roundedBtn";
import { getProviders, signIn } from "next-auth/react";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  register_email: "",
  password: "",
  confirm_password: "",
};

export default function signin({ providers }) {
  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_password,
    name,
    register_email,
    password,
    confirm_password,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("O campo E-mail está vázio")
      .email("Por favor digite um e-mail válido."),
    login_password: Yup.string().required("A senha é obrigatória."),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Por favor digite o seu nome.")
      .min(2, "Seu nome deve ter pelo menos duas letras.")
      .max(16, "Digite um nome menor do que 16 letras.")
      .matches(
        /^[aA-zZ]/,
        "Números e caracteres especiais não são permitidos."
      ),
    register_email: Yup.string()
      .required("Por favor digite seu e-mail para se cadastrar.")
      .email("Digite um e-mail válido."),
    password: Yup.string()
      .required(
        "Digite uma senha de pelo menos 6  números, com letras e caracteres especiais."
      )
      .min(6, "A senha deve ter pelo menos 6 caracteres.")
      .max(36, "A senha deve ter no máximo 36 caracteres."),
    confirm_password: Yup.string()
      .required("Confirme sua senha.")
      .oneOf([Yup.ref("password")], "As senhas sevem ser iguais."),
  });
  return (
    <>
      <Header country="Brasil" />
      <div className={styles.login}>
        <div className={styles.login__container}>
          {/* header */}
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Ficamos felizes se você se juntar a nós!{" "}
              <Link href="/">Compre Agora</Link>{" "}
            </span>
          </div>
          {/* header */}

          <div className={styles.login__form}>
            <h1>JÁ TEM CONTA ? </h1>
            <p>Tenha acesso ao um dos melhores sites de vendas do mundo.</p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form>
                  <LoginIput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Digite seu Email"
                    onChange={handleChange}
                  />
                  <LoginIput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Digite sua Senha"
                    onChange={handleChange}
                  />
                  <BtnLogin type="submit" text="Login" />
                  <div className={styles.forgot__password}>
                    <Link href="/forgotPassword">Esqueceu a senha ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Ou continue com</span>
              <div className={styles.login__socials__wrap}>
                {providers.map((provider) => (
                  <div key={provider.name}>
                    <button
                      onClick={() => signIn(provider.id)}
                      className={styles.social__btn}
                    >
                      <img src={`../../icons/${provider.name}.png`} alt="" />
                      Increva-se com {provider.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>INSCREVA-SE</h1>
            <p>Volte a acessar um dos melhores sites de vendas do mundo.</p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                register_email,
                password,
                confirm_password,
              }}
              validationSchema={registerValidation}
            >
              {(form) => (
                <Form>
                  <LoginIput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Seu nome completo"
                    onChange={handleChange}
                  />
                  <LoginIput
                    type="text"
                    name="register_email"
                    icon="email"
                    placeholder="Digite seu e-mail"
                    onChange={handleChange}
                  />
                  <LoginIput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Digite sua Senha"
                    onChange={handleChange}
                  />
                  <LoginIput
                    type="password"
                    name="confirm_password"
                    icon="password"
                    placeholder="Confirme sua Senha"
                    onChange={handleChange}
                  />
                  <BtnLogin type="submit" text="Entre" />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="Brasil" />
    </>
  );
}

// Social Providers

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());
  return {
    props: { providers },
  };
}
