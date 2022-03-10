import { openGuard } from "@kidneed/utils";
import styles from 'landing/styles/index.module.css'
import Image from 'next/image'
import logo from 'landing/media/images/logo.png'
import Link from "next/link";

export default function Home() {
  return <div className={styles.landing}>
    <div className={styles.menubar}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo" />
        </div>
        <div className={styles.menuItems}>
          <div>
            <Link href="/">صفحه اصلی</Link>
          </div>
          <div>
            <Link href="/">درباره ما</Link>
          </div>
          <div>
            <Link href="/">تماس با ما</Link>
          </div>
          <div>
            <Link href="/">بلاگ</Link>
          </div>
        </div>
      </div>
      <div className={styles.login}>
        <Link href="/login">
          <button type="button" className={styles.loginBtn}>ورود</button>
        </Link>
      </div>
    </div>
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>با برنامه دقیق، راه پیشرفت کودکانمان را خود بسازیم </h1>
      </div>
      <div className={styles.desc}>
        <h3>
          پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما
        </h3>
      </div>
      <div className={styles.buttons}>
        <Link href="" >
          <button type="button" className={styles.btnStartTrip}>سفر را شروع کنید</button>
        </Link>
        <Link href="">
          <button type="button" className={styles.knowMoreBtn}>بیشتر بدانید</button>
        </Link>
      </div>
    </div>
  </div>;
}

Home.guard = () => true;
