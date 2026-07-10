"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./OnboardingWizard.module.css";
import { AUTH_STRING } from "@/lib/utils";
const SCREENS = ["welcome", "loot", "rules", "start"] as const;
type ScreenId = (typeof SCREENS)[number];

const SCREEN_LABELS: Record<ScreenId, string> = {
  welcome: "welcome",
  loot: "the loot",
  rules: "trainer rules",
  start: "ready to start",
};

const JOIN_URL = AUTH_STRING;

const LOOT_TIERS = [
  {
    tag: "LVL 1",
    hours: "5 HOURS",
    desc: "Complete your first prototype and secure your deck foundations.",
    reward: "4X BOOSTER PACKS",
    img: "/prizes/decks.png",
  },
  {
    tag: "LVL 2",
    hours: "15 HOURS",
    desc: "Show true dedication to your RPG or card mechanics.",
    reward: "PLUSHIE OR MERCH",
    img: "/prizes/plushie.png",
  },
  {
    tag: "BOSS",
    hours: "40 HOURS",
    desc: "The ultimate grind. Legendary status achieved.",
    reward: "BOOSTER BOX OR SICK WATCH",
    img: "/prizes/booster.png",
  },
] as const;

const QUESTS = [
  {
    title: "QUEST 01: THE CREATOR",
    desc: "Build a Card Game or RPG (any theme!). Let your imagination run wild in the tall grass.",
    exp: 85,
  },
  {
    title: "QUEST 02: AI SYNERGY",
    desc: "AI is allowed, but keep it honest (no slop!). Use the machine, don't let it use you.",
    exp: 40,
  },
  {
    title: "QUEST 03: PURE CREATIVITY",
    desc: "Projects must be creative. We want to see your unique spark. No two trainers are the same.",
    exp: 65,
  },
] as const;

const BOOSTER_PACKS = [
  { name: "Trick or Trade", desc: "Halloween Special Edition" },
  { name: "Silver Tempest", desc: "Alolan Vulpix Art" },
  { name: "Surging Sparks", desc: "Electric Type Focus" },
] as const;

type WizardProps = {
  isButtonBigger: boolean;
}

export default function OnboardingWizard(props: WizardProps) {
  const [step, setStep] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const isOpen = step !== null;
  const isLast = step === SCREENS.length - 1;

  const open = () => {
    setStep(0);
    setMenuOpen(false);
  };

  const close = () => {
    setStep(null);
    setMenuOpen(false);
  };

  const goNext = () => {
    setStep((s) => (s === null || s >= SCREENS.length - 1 ? s : s + 1));
  };

  const goBack = () => {
    setStep((s) => {
      if (s === null) return s;
      if (s === 0) return null;
      return s - 1;
    });
  };

  const jumpTo = (index: number) => {
    setStep(index);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        jumpTo(SCREENS.length - 1);
        return;
      }
      if (e.key.toLowerCase() === "a") {
        e.preventDefault();
        goNext();
      } else if (e.key.toLowerCase() === "b") {
        e.preventDefault();
        goBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className={styles.launcher}>
      <button type="button" className={props.isButtonBigger ? `${styles.triggerButton} ${styles.btnLarger}` : styles.triggerButton} onClick={open}>
        start adventure
      </button>
      <Link href="/dashboard" className={styles.loginLink}>
        already a trainer? login.
      </Link>

      {isOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <div className={styles.frame}>
            <div className={styles.topBar}>
              <span className={styles.topBarLogo}>HACKACHU</span>
              <button
                type="button"
                className={styles.closeButton}
                onClick={close}
                aria-label="close"
              >
                &times;
              </button>
            </div>

            <div className={styles.screenArea}>
              {step === 0 && <WelcomeScreen key="welcome" />}
              {step === 1 && <LootScreen key="loot" />}
              {step === 2 && <RulesScreen key="rules" />}
              {step === 3 && <StartScreen key="start" onStart={close} />}
            </div>

            <div className={styles.bottomBar}>
              <button
                type="button"
                className={styles.navButton}
                onClick={goBack}
              >
                &larr; back [b]
              </button>

              <div className={styles.menuWrap}>
                <button
                  type="button"
                  className={styles.menuButton}
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                >
                  menu
                </button>
                {menuOpen && (
                  <ul className={styles.menuList}>
                    {SCREENS.map((id, i) => (
                      <li key={id}>
                        <button
                          type="button"
                          className={styles.menuItem}
                          onClick={() => jumpTo(i)}
                          aria-current={step === i}
                        >
                          {SCREEN_LABELS[id]}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {!isLast ? (
                <button
                  type="button"
                  className={styles.navButtonPrimary}
                  onClick={goNext}
                >
                  next [a] &rarr;
                </button>
              ) : (
                <span className={styles.navSpacer} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WelcomeScreen() {
  return (
    <div className={styles.screen}>
      <span className={styles.badge}>the legendary you-ship-we-ship</span>
      <h2 className={styles.headline}>welcome to hackachu!</h2>

      <div className={styles.welcomeArt}>
        <Image
          src="/trainer.png"
          alt="pokemon trainer seen from behind"
          width={200}
          height={221}
        />
      </div>

      <div className={styles.dialogueBox}>
        <span className={styles.speakerTag}>prof. hacker</span>
        <p className={styles.dialogueText}>
          Welcome, Trainer! I&apos;m here to show you the rules of Hackachu, 
          the infamous Pokemon-themed YSWS. Ready to see what you can win?
        </p>
      </div>
    </div>
  );
}

function LootScreen() {
  return (
    <div className={`${styles.screen} ${styles.screenLoot}`}>
      <h2 className={styles.headlineBanner}>the loot</h2>

      <div className={styles.lootList}>
        {LOOT_TIERS.map((tier) => (
          <div className={styles.lootCard} key={tier.hours}>
            <span className={styles.lootTag}>{tier.tag}</span>
            <div className={styles.lootIcon}>
              <Image src={tier.img} alt={tier.reward} width={72} height={72} />
            </div>
            <p className={styles.lootHours}>{tier.hours}</p>
            <p className={styles.lootDesc}>{tier.desc}</p>
            <p className={styles.lootReward}>
              reward unlocked: <span>{tier.reward}</span>
            </p>
          </div>
        ))}
      </div>

      <div className={styles.systemMessage}>
        <strong>system message:</strong> the more you build, the better the
        loot! prizes are cumulative — submit the same project across
        milestones to stack rewards.
      </div>
    </div>
  );
}

function RulesScreen() {
  return (
    <div className={styles.screen}>
      <h2 className={styles.headlineBanner}>trainer rules</h2>

      <div className={styles.questList}>
        {QUESTS.map((quest) => (
          <div className={styles.questCard} key={quest.title}>
            <p className={styles.questTitle}>{quest.title}</p>
            <p className={styles.questDesc}>{quest.desc}</p>
            <div className={styles.expBar}>
              <div
                className={styles.expFill}
                style={{ width: `${quest.exp}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.prizeSummary}>
        <p>1st prize: 5h project = 4 booster packs.</p>
        <p>2nd prize: 15h cumulative = plushie/merch.</p>
        <p>3rd prize: 40h cumulative = booster box or sick watch.</p>
      </div>
    </div>
  );
}

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className={styles.screen}>
      <h2 className={styles.headline}>ready to start?</h2>

      <div className={styles.incomingMessage}>
        <span className={styles.incomingTag}>incoming message</span>
        <p>
          Pick your path and start building. We can&apos;t wait to see what
          you create, adventurer!
        </p>
      </div>

      <a
        href={JOIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.startButton}
        onClick={onStart}
      >
        start adventure
      </a>

      <div className={styles.boosterPreview}>
        <div className={styles.boosterHeader}>
          <span>booster packs</span>
          <span className={styles.stockTag}>in stock</span>
        </div>
        <ul className={styles.boosterList}>
          {BOOSTER_PACKS.map((pack) => (
            <li key={pack.name} className={styles.boosterItem}>
              <span className={styles.boosterName}>{pack.name}</span>
              <span className={styles.boosterDesc}>{pack.desc}</span>
            </li>
          ))}
        </ul>
        <div className={styles.challengeTag}>
          current challenge: build an rpg or card game in 15h+
        </div>
      </div>
    </div>
  );
}
