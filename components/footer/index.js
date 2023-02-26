import Copyright from "./Copyright";
import Links from "./Links";
import Newsletter from "./Newsletter";
import Payments from "./Payments";
import Socials from "./Socials";
import styles from "./styles.module.scss";

export default function Footer({ country }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <Socials />
        <Newsletter />
        <Payments />
        <Copyright country={country}/>
      </div>
    </footer>
  );
}
