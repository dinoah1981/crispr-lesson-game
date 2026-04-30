# CRISPR: Mechanism & Consequence

A two-round browser game for an introductory college class on CRISPR and the bioethics of human gene editing.

- **Round 1** — three scenario MCQs at competitive-college level (PAM/target selection, NHEJ vs HDR repair pathway choice, off-target/specificity).
- **Round 2** — a "design your child" simulator. Outcomes are weighted to surface pleiotropy, polygenic complexity, off-target effects, and gene-by-environment uncertainty.

No build step. Three static files:

```
index.html
style.css
game.js
```

---

## Test it locally first

From the `crispr-game/` folder:

```bash
# Python 3 — comes with macOS and most Linux
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just double-click `index.html` (works because there are no fetch calls or modules).

---

## Deploy to GitHub Pages

You'll need: a GitHub account, and `git` installed locally.

### Option A — using the `gh` CLI (fastest)

If you have the [GitHub CLI](https://cli.github.com/) (`brew install gh` or `winget install GitHub.cli`):

```bash
cd crispr-game

git init
git add .
git commit -m "CRISPR lesson game"

# Create a public repo and push (replace REPO-NAME with what you want)
gh repo create crispr-lesson-game --public --source=. --remote=origin --push

# Enable Pages on the main branch, root folder
gh api repos/:owner/crispr-lesson-game/pages \
  -X POST \
  -f "source[branch]=main" \
  -f "source[path]=/"
```

In about 30–60 seconds the site will be live at:

```
https://<your-github-username>.github.io/crispr-lesson-game/
```

### Option B — web UI

1. Go to <https://github.com/new> and create a new public repository called `crispr-lesson-game` (don't initialize with a README — you have one).
2. From this folder, run:

   ```bash
   cd crispr-game

   git init
   git add .
   git commit -m "CRISPR lesson game"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/crispr-lesson-game.git
   git push -u origin main
   ```

3. On GitHub, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)`. Click **Save**.
6. Wait ~30–60 seconds. The URL appears at the top of the Pages settings page:
   `https://<your-username>.github.io/crispr-lesson-game/`

Paste that URL into the slide deck (slide 9: "Open: \<YOUR-GITHUB-PAGES-URL-HERE\>") and the student handout's "Game URL:" line.

---

## Updating the game later

```bash
# After editing any file
git add .
git commit -m "Tweak Round 2 outcomes"
git push
```

GitHub Pages auto-rebuilds within a minute.

---

## Customizing the content

- **Round 1 questions** — edit the `ROUND_1_QUESTIONS` array near the top of `game.js`. Each question has a stem, optional note, and four choices with a `correct` flag and a `why` explanation.
- **Round 2 traits** — edit the `TRAITS` array. Each trait has a `cost` (edit-points) and an `outcomes` array. Outcome weights are arbitrary integers; only the relative ratios matter. Outcome `kind` is one of `"intended"`, `"partial"`, `"unintended"`, `"severe"` and controls the color of the result card.
- **Edit budget** — change `STATE.round2.budget` (default `6`).

---

## Notes on the science

The biology in Round 2 is intentionally simplified — but the **uncertainty** is not. Each trait's outcome distribution reflects something real:

- **CCR5** — the He Jiankui case; novel indels of unknown function, plus pleiotropic effects on West Nile susceptibility and immune signaling.
- **MSTN (myostatin)** — animal studies show muscle hypertrophy but with tendon/ligament and cardiac concerns.
- **Height / IQ / athletic ability** — polygenic; single-locus edits have effectively no measurable effect on the population.
- **APOE** — well-established Alzheimer's-risk locus; ε4→ε3 base editing is a target but APOE has roles in lipid metabolism.
- **HBB / BCL11A** — the sickle cell case; this is the closest the game gets to a clearly therapeutic edit, and that's deliberate. It seeds the discussion about therapy vs. enhancement.
- **OCA2/HERC2** — eye color, a deliberately frivolous option.
- **ACTN3** — the "sprint gene," whose effect size in elite-athlete cohorts is small enough that GxE swamps it for most people.

If you want to dig deeper, the game.js comments call out which biological phenomenon each outcome is meant to dramatize.
