import Image from "next/image";
import styles from "./page.module.css";

const ASSETS = "";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.presents}>lola &amp; seba at hack club hq present...</p>
        <h1 className={styles.title}>
          <Image
            className={styles.titleImage}
            src={`${ASSETS}/hackachu.png`}
            alt="hackachu"
            width={923}
            height={230}
            priority
          />
        </h1>
        <div className={styles.heroDialog}>
          <span className={styles.heroDialogText}>
            build a card game, gamble with pokemon cards.
          </span>
        </div>
        <Image
          className={styles.trainer}
          src={`${ASSETS}/trainer.png`}
          alt="pokemon trainer seen from behind"
          width={327}
          height={361}
          priority
        />
        <Image
          className={styles.pokeball}
          src={`${ASSETS}/pokeball.gif`}
          alt="spinning pokeball"
          width={1024}
          height={1024}
          unoptimized
        />
      </header>

      <main className={styles.main}>
        <section className={`${styles.row} ${styles.rowRight}`}>
          <div className={styles.gbBox}>
            a card game?
            <br />
            what does
            <br />
            that mean?
            <span className={styles.arrow}>&#9660;</span>
          </div>
          <Image
            className={styles.magicPika}
            src={`${ASSETS}/magic_pika.png`}
            alt="pikachu wearing a party hat"
            width={198}
            height={228}
          />
        </section>

        <section className={`${styles.row} ${styles.rowLeft}`}>
          <Image
            className={styles.flyingPika}
            src={`${ASSETS}/flying_pika.png`}
            alt="pikachu floating with balloons"
            width={244}
            height={285}
          />
          <div className={styles.gbBox}>
            any game that
            <br />
            involves
            <br />
            playing with
            <br />
            cards!
            <span className={styles.arrow}>&#9660;</span>
          </div>
        </section>

        <section className={`${styles.row} ${styles.rowRight}`}>
          <div className={styles.gbBox}>
            and i get
            <br />
            POKEMON
            <br />
            CARDS?? for
            <br />
            FREE?????
            <span className={styles.arrow}>&#9660;</span>
          </div>
          <Image
            className={styles.magicPika}
            src={`${ASSETS}/magic_pika.png`}
            alt="pikachu wearing a party hat"
            width={198}
            height={228}
          />
        </section>

        <section className={`${styles.row} ${styles.rowLeft}`}>
          <Image
            className={styles.flyingPika}
            src={`${ASSETS}/flying_pika.png`}
            alt="pikachu floating with balloons"
            width={244}
            height={285}
          />
          <div className={styles.gbBox}>
            yep.{" "}
            <a
              className={styles.link}
              href="https://hackclub.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              hack club.
            </a>
            <br />
            the longer you code,
            <br />
            the more chances you
            <br />
            get.
            <span className={styles.arrow}>&#9660;</span>
          </div>
        </section>

        <section className={`${styles.row} ${styles.rowRight}`}>
          <div className={`${styles.gbBox} ${styles.tallBox}`}>
            chances????
            <span className={styles.arrow}>&#9660;</span>
          </div>
          <Image
            className={styles.magicPika}
            src={`${ASSETS}/magic_pika.png`}
            alt="pikachu wearing a party hat"
            width={198}
            height={228}
          />
        </section>

        <section className={`${styles.row} ${styles.rowLeft}`}>
          <Image
            className={styles.flyingPika}
            src={`${ASSETS}/flying_pika.png`}
            alt="pikachu floating with balloons"
            width={244}
            height={285}
          />
          <div className={styles.gbBox}>
            oh yeah. you&apos;ll
            <br />
            always get cards,
            <br />
            but the cards you
            <br />
            get are up to the
            <br />
            fates...
            <span className={styles.arrow}>&#9660;</span>
          </div>
        </section>

        <section className={`${styles.row} ${styles.rowRight}`}>
          <div className={`${styles.gbBox} ${styles.cryBox}`}>
            <Image
              className={styles.cryImg}
              src={`${ASSETS}/crying_emojis.png`}
              alt="two crying emojis"
              width={153}
              height={82}
            />
            <span className={styles.arrow}>&#9660;</span>
          </div>
          <Image
            className={styles.magicPika}
            src={`${ASSETS}/magic_pika.png`}
            alt="pikachu wearing a party hat"
            width={198}
            height={228}
          />
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          start now. #hackachu on slack.
          <br />
          releases thursday, july 9th.
          <br />
          <a
            className={styles.link}
            href="https://auth.hackclub.com/join/hackachu"
            target="_blank"
            rel="noopener noreferrer"
          >
            join now.
          </a>
        </p>
        <Image
          className={styles.footerPika}
          src={`/pika_with_cup.png`}
          alt="pikachu floating with balloons"
          width={244}
          height={285}
        />
      </footer>
    </div>
  );
}
