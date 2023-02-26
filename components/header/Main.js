import Link from "next/link";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { AiOutlineShoppingCart, FaOpencart } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Main() {
    const {cart} = useSelector((state) => ({...state}));
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/" className={styles.logo}>
          <img src="../../../logo.png" alt="Logo" />
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Procure aqui..." />
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>
        <Link href="/" className={styles.cart}>
            <AiOutlineShoppingCart/>
            <span>0</span>
        </Link>
      </div>
    </div>
  );
}
