import styles from "./styles.module.scss";

export default function Payments() {
  return (
    <div className={styles.footer__payment}>
        <h3>NÓS ACEITAMOS</h3>
        <div className={styles.footer__flexwrap}>
            <img src="../../../images/payments/visa.webp" alt="Visa"/>
            <img src="../../../images/payments/paypal.webp" alt="Paypal"/>
            <img src="../../../images/payments/mastercard.webp" alt="Mastercard"/>
            <img src="../../../images/payments/american_express.webp" alt="American_express"/>
        </div>
    </div>
  )
}
