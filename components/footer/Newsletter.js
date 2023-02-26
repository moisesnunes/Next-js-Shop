import Link from "next/link";
import styles from "./styles.module.scss";

export default function Newsletter() {
  return (
    <div className={styles.footer__newsletter}>
      <h3>INSCREVA-SE NO NOSSO NEWSLETTER</h3>
      <div className={styles.footer__flex}>
        <input type="text" placeholder="Seu E-mail" />
        <button className={styles.btn_primary}>INSCREVA</button>
      </div>
      <p>
        Ao clicar no botão de se inscrever, você aceita os nossos{" "}
        <Link href=""> Politica de Privacidade & Cookies</Link>
      </p>
    </div>
  );
}
