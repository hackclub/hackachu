"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import styles from "./TrainerDashboard.module.css";
import Image from "next/image";
import SubmitForm from "./SubmitForm";
import Gravity, { MatterBody } from "./fancy/physics/gravity";
const TIPS = [
  "join #hackachu!",
  "pikapika",
  "hack club loves you",
  "your prizes are waiting....",
  "lock in"
];

const PIKAS = ["flying_pika.png", "magic_pika.png", "pika_with_cup.png"]
const PRIZES = [
  {
    name: "5 decks",
    hours: "+5 hours",
    img: "/prizes/decks.png",
    tilt: "tiltA",
  },
  {
    name: "awesome plushies",
    hours: "+10 hours",
    img: "/prizes/plushie.png",
    tilt: "tiltB",
  },
  {
    name: "watch or booster pack",
    hours: "+30 hours",
    img: "/prizes/booster.png",
    tilt: "tiltC",
  },
] as const;

export default function TrainerDashboard() {
  const [trainerName, setTrainerName] = useState("");
  const [tipIndex, setTipIndex] = useState(0);
  const [tipVisible, setTipVisible] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [shipped, setShipped] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [codeUrl, setCodeUrl] = useState("");
  const [playableUrl, setPlayableUrl] = useState("");
  const [description, setDescription] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [hoursSpent, setHoursSpent] = useState("");
  const [prize, setPrize] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipVisible(false);
      setTimeout(() => {
        setTipIndex((i) => (i + 1) % TIPS.length);
        setTipVisible(true);
      }, 250);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const togglePanel = () => {
    const opening = !panelOpen;
    setPanelOpen(opening);
    if (opening) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const resetForm = () => {
    setShipped(false);
    setSubmitError(null);
    setCodeUrl("");
    setPlayableUrl("");
    setDescription("");
    setGithubUsername("");
    setHoursSpent("");
    setPrize("");
    setScreenshot(null);
  };

  const shipProject = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.set("codeUrl", codeUrl);
    formData.set("playableUrl", playableUrl);
    formData.set("description", description);
    formData.set("githubUsername", githubUsername);
    formData.set("hoursSpent", hoursSpent);
    formData.set("prize", prize);
    if (screenshot) {
      formData.set("screenshot", screenshot);
    }

    const res = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    setSubmitting(false);

    if (res.ok) {
      setShipped(true);
    } else {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.page}>
      <Gravity className={styles.gravityLayer}>
        {PIKAS.map((pika, i) => {
          return (
        <MatterBody
          x="20%"
          y="5%"
          matterBodyOptions={{
            friction: 0.5,
            restitution: 0.7,
            density: 0.001,
            isStatic: false,
          }}
          key={i}
        >
          <Image
            src={`/${pika}`}
            alt="pikachu"
            width={150}
            height={175}
          />
        </MatterBody>
          )
})}

      </Gravity>
      <div className={styles.wrap}>
        <div className={styles.nav}>
          <div className={styles.brand}>

            <div className={styles.brandText}>
              <span className={styles.brandEyebrow}>Hack Club · YSWS</span>
              <Image
              src="/hackachu.png"
              alt="Hackachu logo"
              width={200}
              height={48}
              className={styles.brandLogo}
              />
            </div>
          </div>

        </div>



        <div className={styles.dex}>


            <div className={styles.scanlines} />
            <div className={styles.screenGlow} />
            <div className={styles.greet}>
              WELCOME TRAINER,
              <br />
              <input
                className={styles.nameField}
                placeholder="YOU"
                maxLength={14}
                aria-label="Enter your trainer name"
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
                style={
                  trainerName
                    ? { width: `${Math.max(3, trainerName.length + 1)}ch` }
                    : undefined
                }
              />
              .
            </div>
            <div
              className={styles.tip}
              style={{ opacity: tipVisible ? 1 : 0 }}
            >
              {TIPS[tipIndex]}
            </div>
            {/* <a
              className={styles.hackatimeLink}
              href="https://hackatime.hackclub.com"
              target="_blank"
              rel="noopener"
            >
              &gt; connect your hackatime
            </a> */}

            {/* <div className={styles.statGrid}>
              <div className={styles.stat}>
                <div className={styles.statNum}>0</div>
                <div className={styles.statLabel}>Projects Shipped</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>0h</div>
                <div className={styles.statLabel}>Hours Logged</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>I</div>
                <div className={styles.statLabel}>Trainer Rank</div>
              </div>

            </div> */}

        </div>

        <div className={styles.ctaRow}>
          <button className={styles.cta} onClick={togglePanel}>
            &gt; SUBMIT YOUR PROJECT
          </button>
        </div>
        {panelOpen && (
           <div
          ref={panelRef}
          className="min-h-[80vh]"
        >

          <SubmitForm />
          {/* <div className={styles.panelInner}>
            {!shipped ? (
              <div>
                <h3 className={styles.panelTitle}>Log your catch</h3>
                <p className={styles.panelSub}>
                  Tell us what you built. Your name, email, birthday, and
                  address are pulled from your Hack Club account automatically.
                </p>
                <div className={styles.field}>
                  <label htmlFor="codeUrl">Code URL</label>
                  <input
                    id="codeUrl"
                    type="url"
                    placeholder="https://github.com/you/project"
                    value={codeUrl}
                    onChange={(e) => setCodeUrl(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="playableUrl">Playable URL</label>
                  <input
                    id="playableUrl"
                    type="url"
                    placeholder="https://your-project.com"
                    value={playableUrl}
                    onChange={(e) => setPlayableUrl(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    placeholder="What does it do?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="githubUsername">GitHub username</label>
                  <input
                    id="githubUsername"
                    type="text"
                    placeholder="yourusername"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="hoursSpent">Hours spent</label>
                  <input
                    id="hoursSpent"
                    type="number"
                    min={0}
                    step="0.5"
                    placeholder="0"
                    value={hoursSpent}
                    onChange={(e) => setHoursSpent(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="prize">Prize you want</label>
                  <input
                    id="prize"
                    type="text"
                    placeholder="e.g. surging sparks booster pack, sick watch..."
                    value={prize}
                    onChange={(e) => setPrize(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="screenshot">Screenshot</label>
                  <input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)}
                  />
                </div>
                {submitError && <p>{submitError}</p>}
                <button
                  className={styles.shipBtn}
                  onClick={shipProject}
                  disabled={submitting}
                >
                  {submitting ? "Shipping..." : "SHIP IT →"}
                </button>
              </div>
            ) : (
              <div className={styles.success}>
                <div className={styles.successMark}>&#10003;</div>
                <h4>PROJECT SHIPPED!</h4>
                <p>
                  It&apos;s in the tall grass, awaiting review. We&apos;ll be
                  in touch soon.
                </p>
                <button className={styles.resetBtn} onClick={resetForm}>
                  Submit another
                </button>
              </div>
            )}
          </div> */}
        </div>
        ) }
       

        <div className={styles.prizes}>
          <h2 className={styles.prizesTitle}>
            prizes<span className={styles.bang}>!!</span>
          </h2>
          <div className={styles.prizeRow}>
            {PRIZES.map((prize, i) => (
              <Fragment key={prize.name}>
                {i > 0 && <div className={styles.prizeArrow}>⮕</div>}
                <div className={styles.prize}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={`${styles.prizeImg} ${styles[prize.tilt]}`}
                    src={prize.img}
                    alt={prize.name}
                  />
                  <div className={styles.prizeCaption}>
                    {prize.name}
                    <span className={styles.bang}>!</span>
                  </div>
                  <div className={styles.prizeHours}>{prize.hours}</div>
                </div>
              </Fragment>
            ))}
          </div>
          <div className={styles.prizeTotals}>(total hours: 5, 15, 40)</div>
        </div>

        <footer className={styles.footer}>
          hackachu · Hack Club YSWS · gotta ship &apos;em all
        </footer>
      </div>
    </div>
  );
}
