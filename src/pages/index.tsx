import { openGuard } from "@kidneed/utils";
import styles from 'landing/styles/index.module.css'
import Image from 'next/image'
import logo from 'landing/media/images/logo.png'

export default function Home() {
  return <div className={styles.landing}>
    <div className={styles.menubar}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo" />
        </div>
      </div>
    </div>
  </div>;
}

Home.guard = openGuard;
