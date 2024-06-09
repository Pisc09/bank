import "../../../../designs/css/main.css";
import imgHero from "../../../../designs/img/bank-tree.jpeg";
import styles from "./Hero.module.css";

function Hero() {
  const heroStyle = {
    backgroundImage: `url(${imgHero})`,
  };

  return (
    <div className={styles.hero} style={heroStyle}>
      <section className={styles["hero-content"]}>
        <h2 className="sr-only">Promoted Content</h2>
        <p className={styles.subtitle}>No fees.</p>
        <p className={styles.subtitle}>No minimum deposit.</p>
        <p className={styles.subtitle}>High interest rates.</p>
        <p className={styles.text}>
          Open a savings account with Argent Bank today!
        </p>
      </section>
    </div>
  );
}

export default Hero;
