/* CRISPR: Mechanism & Consequence
 * Round 1 — three scenario MCQs at competitive-college level.
 * Round 2 — "Design your child" simulator that surfaces polygenic complexity,
 *           pleiotropy, off-targets, and gene-by-environment uncertainty.
 *
 * No frameworks. Pure DOM. Designed to be served as static files from GitHub Pages.
 */

// ----------------------------------------------------------------------------
// Round 1 — questions
// ----------------------------------------------------------------------------
const ROUND_1_QUESTIONS = [
  {
    id: "q1_pam_targeting",
    title: "Question 1 of 3 — Target selection",
    stem:
      "You want to use SpCas9 (which requires an NGG PAM, immediately 3' of the 20-nt protospacer) to disrupt a coding exon of a gene. Your collaborator hands you four candidate 23-nt sequences from the gene. Which is a viable Cas9 target?",
    note:
      "Reminder: SpCas9 cleaves ~3 bp upstream of the PAM, on the strand that contains the protospacer. The 20 nt of homology to the gRNA are 5' of the PAM.",
    plain:
      "We're trying to break a specific gene so it stops working. The CRISPR scissors only cut DNA when TWO things are true: (1) we hand them a 20-letter \"target sequence\" to look for, AND (2) the next 3 letters of DNA right after that target spell N-G-G (any letter, then G, then G). That \"NGG\" is like a barcode that says \"yes, you're allowed to cut here.\" Below are 4 stretches of DNA. Pick the one where the NGG barcode is in the right place — and the cut would actually break the part of the gene that matters.",
    choices: [
      {
        text: "5'-GACTTCAGGTACGTAGCCAATTC-AAA-3' (no NGG immediately 3' of the 20-mer)",
        correct: false,
        why:
          "AAA is not an NGG PAM. SpCas9 requires NGG immediately 3' of the protospacer; without it, no cleavage.",
      },
      {
        text: "5'-GACTTCAGGTACGTAGCCAATTC-TGG-3' (NGG PAM present, target in coding exon)",
        correct: true,
        why:
          "TGG matches NGG and sits immediately 3' of a 20-nt protospacer in a coding exon — a valid target. (You'd still want to check off-target risk and the editing window, but this is the only sequence here that even satisfies the PAM rule.)",
      },
      {
        text: "5'-TGG-GACTTCAGGTACGTAGCCAATTC-3' (NGG is on the 5' side of the 20-mer)",
        correct: false,
        why:
          "PAM position matters. SpCas9 reads the PAM 3' of the protospacer, not 5' of it.",
      },
      {
        text: "5'-GACTTCAGGTACGTAGCCAATTC-CGG-3', but the target lies entirely in an intron 4 kb from the nearest exon",
        correct: false,
        why:
          "The PAM rule is satisfied, but a deep-intronic cut is unlikely to disrupt protein function — frameshifts in coding exons (or splice sites) are how you knock out a gene.",
      },
    ],
  },
  {
    id: "q2_repair_pathway",
    title: "Question 2 of 3 — Repair pathway",
    stem:
      "You want to introduce a single defined point mutation (a precise A→G substitution) into a gene in human iPSCs. You provide a single-stranded oligo donor with ~40 bp homology arms flanking the desired change. Results: most edited alleles show indels at the cut site rather than the intended substitution. What is the most likely cause?",
    plain:
      "You don't want to break a gene this time — you want to make ONE precise change: swap a single letter (an A) for another letter (a G). To help the cell do it right, you also hand it a little reference strip with the correct spelling. But when you check the results, most cells didn't make the precise swap — they just patched the cut messily, like sloppy autocorrect, and added or deleted random letters. Why didn't the precise edit work?",
    choices: [
      {
        text: "The cells are repairing the double-strand break primarily by NHEJ rather than HDR.",
        correct: true,
        why:
          "In dividing human cells, HDR is restricted largely to S/G2 and competes poorly with NHEJ, which is fast and ligates broken ends with frequent small indels. To bias toward HDR you can synchronize cells, use small-molecule NHEJ inhibitors, or switch tools entirely (e.g., a base editor for an A→G change avoids the DSB problem).",
      },
      {
        text: "The PAM was destroyed by the cut, so the donor can no longer be templated.",
        correct: false,
        why:
          "Donors are typically designed to disrupt the PAM precisely so Cas9 can't re-cut after a successful HDR event. PAM disruption is a feature, not a bug.",
      },
      {
        text: "The Cas9 protein is the wrong species — SpCas9 cannot cut human DNA.",
        correct: false,
        why:
          "SpCas9 cuts human DNA routinely; that's what makes it useful. The species name refers to the bacterium it was discovered in (S. pyogenes), not the substrate it can act on.",
      },
      {
        text: "Single-stranded oligo donors cannot template precise edits; only plasmid donors can.",
        correct: false,
        why:
          "ssODNs are in fact a standard donor format for small precise edits and often outperform plasmid donors for single-nucleotide changes.",
      },
    ],
  },
  {
    id: "q3_off_target",
    title: "Question 3 of 3 — Specificity",
    stem:
      "Your gRNA scores well on-target in cells, but whole-genome sequencing reveals indels at three off-target sites that share 17–18 of 20 nt with your guide. A colleague suggests \"just use more Cas9 to get a cleaner edit.\" What should you actually do?",
    plain:
      "Your CRISPR scissors are cutting where you want them to — that's good. But when you check the rest of the genome, you find the scissors ALSO cut in a few other places: spots that look 17 or 18 letters like your target instead of all 20. These are \"off-target\" cuts — the scissors got close-enough matches and snipped them too. A friend says: \"Just dump more scissors in there, they'll figure it out.\" Is that a good idea — and if not, what should you actually do to make the cuts more specific?",
    choices: [
      {
        text: "Increase Cas9 concentration; higher activity will outcompete off-target editing.",
        correct: false,
        why:
          "More Cas9 generally increases off-target activity. Specificity is about how Cas9 discriminates near-cognate sites, not how much of it is around.",
      },
      {
        text: "Switch to a high-fidelity Cas9 variant (e.g. eSpCas9, SpCas9-HF1, or HiFi Cas9), redesign the gRNA, and/or deliver as RNP for a shorter active window.",
        correct: true,
        why:
          "High-fidelity variants reduce tolerance for mismatches; redesigning the gRNA can move you to a more specific genomic neighborhood; RNP delivery gives a transient burst rather than sustained expression. These are the standard, evidence-based responses.",
      },
      {
        text: "Ignore the off-targets — they're in non-coding regions, so they can't matter.",
        correct: false,
        why:
          "Non-coding does not mean inert. Off-targets in regulatory elements, splice sites, or near tumor-suppressor loci have real consequences. \"Non-coding\" is not a free pass, especially for any therapeutic application.",
      },
      {
        text: "Run the experiment again and average the results to cancel out the off-targets.",
        correct: false,
        why:
          "Off-targets aren't noise that averages out. They're systematic edits at predictable sites, and they accumulate.",
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// Round 2 — traits with realistic outcome distributions
// ----------------------------------------------------------------------------
const TRAITS = [
  {
    id: "ccr5",
    name: "HIV resistance",
    gene: "CCR5 Δ32",
    naive: "Knock out CCR5 so the child cannot be infected by R5-tropic HIV.",
    cost: 2,
    outcomes: [
      { weight: 35, kind: "intended", text: "CCR5 disrupted on both alleles. Reduced susceptibility to R5-tropic HIV strains." },
      { weight: 30, kind: "partial",  text: "Mosaic edit — only some cells carry the disruption. Protection unclear, and there's no way to remove the edit later." },
      { weight: 20, kind: "unintended", text: "Increased susceptibility to West Nile virus and influenza-related complications. CCR5 has roles beyond HIV entry." },
      { weight: 15, kind: "severe", text: "Off-target indel in a nearby gene of unknown function. Effect — if any — will not be apparent for years or decades." },
    ],
  },
  {
    id: "myostatin",
    name: "Greater muscle mass",
    gene: "MSTN (myostatin)",
    naive: "Disrupt myostatin so muscles grow larger and stronger.",
    cost: 2,
    outcomes: [
      { weight: 25, kind: "intended", text: "Increased muscle mass observed in animal models replicates in this child. Strength above population mean." },
      { weight: 35, kind: "partial",  text: "Modest increase in muscle mass, but tendon and ligament strength did not scale. Elevated lifetime injury risk." },
      { weight: 25, kind: "unintended", text: "Cardiac muscle hypertrophy. Long-term implications for heart function unclear; close monitoring required." },
      { weight: 15, kind: "severe", text: "Embryonic mosaicism: muscle development is uneven across the body. Functional consequences variable." },
    ],
  },
  {
    id: "height",
    name: "Above-average height",
    gene: "(polygenic — ~700 known variants)",
    naive: "Edit a 'height gene' to make the child taller.",
    cost: 3,
    outcomes: [
      { weight: 60, kind: "partial", text: "Adult height ~0.4 cm above what it would otherwise have been. Height is influenced by hundreds of variants, each with tiny effects; single edits barely move the needle." },
      { weight: 20, kind: "unintended", text: "No measurable effect on height. Within the noise of nutrition, sleep, and other environmental factors during development." },
      { weight: 15, kind: "unintended", text: "Edit at the chosen locus had unintended effects on bone density. Slight increase in fracture risk in later life." },
      { weight: 5, kind: "severe", text: "Edit fell within a regulatory region affecting an unrelated developmental pathway. Subtle facial or skeletal differences emerged in childhood." },
    ],
  },
  {
    id: "iq",
    name: "Higher cognitive ability",
    gene: "(polygenic — thousands of variants, each tiny)",
    naive: "Edit a 'smart gene' to raise the child's IQ.",
    cost: 4,
    outcomes: [
      { weight: 65, kind: "partial", text: "No measurable effect on cognitive test scores. Cognition is influenced by thousands of variants with tiny additive effects, plus enormous environmental contributions; single-locus edits are almost cosmetic." },
      { weight: 20, kind: "unintended", text: "No cognitive effect, but the edit altered expression of a neighboring gene linked to mood regulation. Adolescent mental-health implications uncertain." },
      { weight: 10, kind: "unintended", text: "Edited variant is associated with both higher educational attainment AND higher rates of certain neurodevelopmental conditions. The two are statistically inseparable in current data." },
      { weight: 5, kind: "severe", text: "Subtle developmental differences in early childhood — etiology unclear, but the embryonic edit cannot be ruled out." },
    ],
  },
  {
    id: "alzheimers",
    name: "Reduced Alzheimer's risk",
    gene: "APOE (ε4 → ε3)",
    naive: "Convert APOE ε4 alleles to ε3 to lower lifetime Alzheimer's risk.",
    cost: 3,
    outcomes: [
      { weight: 55, kind: "intended", text: "Successful base edit on both alleles. Lifetime Alzheimer's risk reduced (though not eliminated — it's polygenic and environmental)." },
      { weight: 25, kind: "partial", text: "Only one allele edited. Modest risk reduction; child still carries above-average risk relative to ε3/ε3 genotypes." },
      { weight: 15, kind: "unintended", text: "APOE has roles in lipid metabolism. Slightly altered cholesterol profile detected in childhood; cardiovascular implications uncertain." },
      { weight: 5, kind: "severe", text: "Bystander base edit nearby created a missense variant of unknown significance. Effect, if any, may not appear for decades." },
    ],
  },
  {
    id: "sicklecell",
    name: "Cure for sickle cell disease",
    gene: "HBB or BCL11A (fetal hemoglobin reactivation)",
    naive: "Both parents are carriers. Edit the embryo to prevent sickle cell disease.",
    cost: 2,
    outcomes: [
      { weight: 70, kind: "intended", text: "Both HBB alleles successfully edited (or BCL11A enhancer disrupted to reactivate fetal hemoglobin). Child will not develop sickle cell disease — a clear medical benefit." },
      { weight: 15, kind: "partial", text: "Mosaic edit; some hematopoietic precursors retain sickle alleles. Likely milder disease, but long-term outcome unclear." },
      { weight: 10, kind: "partial", text: "Edit successful, but loss of sickle-trait protection against malaria — relevant if the family lives in or returns to a malaria-endemic region." },
      { weight: 5, kind: "severe", text: "Off-target indel detected in a gene linked to hematologic malignancy risk. Lifetime monitoring recommended." },
    ],
  },
  {
    id: "eyecolor",
    name: "Blue eyes",
    gene: "OCA2 / HERC2 region",
    naive: "Edit the OCA2/HERC2 regulatory region for blue eyes.",
    cost: 1,
    outcomes: [
      { weight: 50, kind: "intended", text: "Blue or grey-blue eyes. Cosmetic edit successful. (Note: the trait you spent capacity on has no health benefit.)" },
      { weight: 30, kind: "partial", text: "Hazel/intermediate eye color. Eye color is polygenic; single-locus edits don't always produce the predicted phenotype." },
      { weight: 15, kind: "unintended", text: "Slight increase in light sensitivity. OCA2 also influences retinal pigmentation." },
      { weight: 5, kind: "severe", text: "Subtle visual differences detected in early childhood eye exams; may be unrelated, but cannot be ruled out." },
    ],
  },
  {
    id: "athletic",
    name: "Athletic ability",
    gene: "ACTN3 / ACE / many others",
    naive: "Edit ACTN3 (the 'sprint gene') for elite athletic potential.",
    cost: 3,
    outcomes: [
      { weight: 55, kind: "partial", text: "Slight statistical advantage in fast-twitch muscle composition. In elite-athlete cohorts, ACTN3 explains a small fraction of variance; effect on this child likely undetectable without measurement." },
      { weight: 25, kind: "unintended", text: "ACTN3 variants also influence cold tolerance and recovery from muscle damage. Mixed effects observed." },
      { weight: 15, kind: "partial", text: "Effect of edit completely swamped by training, nutrition, coaching, and motivation. Indistinguishable from baseline." },
      { weight: 5, kind: "severe", text: "Off-target indel in a regulatory region near a metabolic gene. Effects subtle and chronic; full picture may take a lifetime to emerge." },
    ],
  },
];

const STATE = {
  scene: "intro",
  round1: { index: 0, answers: [] },
  round2: { budget: 6, selected: new Set(), results: null },
};

// ----------------------------------------------------------------------------
// Renderer
// ----------------------------------------------------------------------------
const $app = document.getElementById("app");

function setScene(name) {
  STATE.scene = name;
  updateProgress();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateProgress() {
  const phaseMap = {
    intro: "intro",
    round1: "round1",
    round1_done: "round1",
    round2: "round2",
    round2_results: "round2",
    end: "end",
  };
  const order = ["intro", "round1", "round2", "end"];
  const phase = phaseMap[STATE.scene] || "intro";
  const idx = order.indexOf(phase);
  document.querySelectorAll("#progress-nav .progress__step").forEach((el) => {
    const stepIdx = order.indexOf(el.dataset.step);
    el.classList.toggle("is-active", stepIdx === idx);
    el.classList.toggle("is-done", stepIdx >= 0 && stepIdx < idx);
  });
}

function render() {
  $app.innerHTML = "";
  if (STATE.scene === "intro") return renderIntro();
  if (STATE.scene === "round1") return renderRound1();
  if (STATE.scene === "round1_done") return renderRound1Done();
  if (STATE.scene === "round2") return renderRound2();
  if (STATE.scene === "round2_results") return renderRound2Results();
  if (STATE.scene === "end") return renderEnd();
}

// ----------------------------------------------------------------------------
// Intro
// ----------------------------------------------------------------------------
function renderIntro() {
  const card = document.createElement("section");
  card.className = "card";
  card.innerHTML = `
    <span class="card__eyebrow">How this works</span>
    <h2>Two rounds. About <em>twenty minutes</em>.</h2>
    <p class="card__lede">You'll start by proving you understand the mechanism. Then we'll hand you the technology and watch what you do with it.</p>

    <ol class="intro-list">
      <li><span class="num">01</span><div><strong>Round 1 — Mechanism.</strong> Three scenario questions on how CRISPR/Cas9 actually finds and edits a target. College-level. Work with a neighbor.</div></li>
      <li><span class="num">02</span><div><strong>Round 2 — Design a Child.</strong> You're a prospective parent. Pick traits to edit within a budget. See what really happens — including the things you didn't ask for.</div></li>
      <li><span class="num">03</span><div><strong>Reflect.</strong> Bring your reactions to your group for the ethics discussion on the handout.</div></li>
    </ol>

    <div class="callout">
      The biology in Round 2 is simplified, but the <em>uncertainty</em> is not. Every outcome reflects something real: pleiotropy, polygenic complexity, off-target effects, mosaicism, or gene-by-environment interaction.
    </div>

    <div class="btn-row">
      <button class="btn btn--primary" id="start-r1">Begin Round 1 →</button>
    </div>
  `;
  $app.appendChild(card);
  document.getElementById("start-r1").onclick = () => {
    STATE.round1.index = 0;
    STATE.round1.answers = [];
    setScene("round1");
  };
}

// ----------------------------------------------------------------------------
// Round 1
// ----------------------------------------------------------------------------
function renderRound1() {
  const i = STATE.round1.index;
  const q = ROUND_1_QUESTIONS[i];
  const cleanTitle = q.title.replace(/^Question\s+\d+\s+of\s+\d+\s+—\s+/i, "");

  const card = document.createElement("section");
  card.className = "card";
  card.innerHTML = `
    <div class="question__counter">Round 1  ·  Question ${i + 1} of ${ROUND_1_QUESTIONS.length}</div>
    <h2>${cleanTitle}</h2>
    <div class="question__stem">
      ${q.stem}
      ${q.note ? `<div class="question__note">${q.note}</div>` : ""}
    </div>
    ${q.plain ? `
      <details class="plain-toggle" open>
        <summary><span class="plain-toggle__icon">★</span> In plain English <span class="plain-toggle__hint">(click to hide)</span></summary>
        <div class="plain-toggle__body">${q.plain}</div>
      </details>
    ` : ""}
    <div class="choices" id="choices"></div>
    <div id="feedback-slot"></div>
    <div class="btn-row" id="actions"></div>
  `;
  $app.appendChild(card);

  const letters = ["A", "B", "C", "D", "E"];
  const $choices = card.querySelector("#choices");
  q.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.innerHTML = `
      <span class="choice__letter">${letters[idx]}</span>
      <span class="choice__text">${choice.text}</span>
    `;
    btn.onclick = () => handleR1Answer(idx, btn);
    $choices.appendChild(btn);
  });
}

function handleR1Answer(choiceIdx, btn) {
  const i = STATE.round1.index;
  const q = ROUND_1_QUESTIONS[i];
  const choice = q.choices[choiceIdx];

  document.querySelectorAll(".choice").forEach((b, idx) => {
    b.disabled = true;
    if (q.choices[idx].correct) b.classList.add("is-correct");
    if (idx === choiceIdx && !choice.correct) b.classList.add("is-incorrect");
  });

  STATE.round1.answers.push({
    qid: q.id,
    choiceIndex: choiceIdx,
    correct: choice.correct,
  });

  const $feedback = document.getElementById("feedback-slot");
  const fb = document.createElement("div");
  fb.className = "feedback" + (choice.correct ? "" : " is-bad");
  fb.innerHTML = `
    <div class="feedback__title">${choice.correct ? "Correct." : "Not quite."}</div>
    <p>${choice.why}</p>
  `;
  $feedback.appendChild(fb);

  const $actions = document.getElementById("actions");
  const next = document.createElement("button");
  next.className = "btn btn--primary";
  next.textContent =
    i + 1 < ROUND_1_QUESTIONS.length ? "Next question →" : "Finish Round 1 →";
  next.onclick = () => {
    if (i + 1 < ROUND_1_QUESTIONS.length) {
      STATE.round1.index = i + 1;
      render();
    } else {
      setScene("round1_done");
    }
  };
  $actions.appendChild(next);
}

function renderRound1Done() {
  const correct = STATE.round1.answers.filter((a) => a.correct).length;
  const total = ROUND_1_QUESTIONS.length;
  const card = document.createElement("section");
  card.className = "card";
  card.innerHTML = `
    <span class="card__eyebrow">Round 1 complete</span>
    <h2>You got <em>${correct}</em> of ${total}.</h2>

    <div class="score-banner">
      <div class="score-banner__num">${correct}/${total}</div>
      <div class="score-banner__lbl">Mechanism scenarios answered correctly. The point isn't the score — it's that you now know how the cut actually happens.</div>
    </div>

    <p>With that mechanism in mind, the technology is in your hands. Round 2 asks <em>what you'd do with it</em>.</p>

    <div class="callout">
      You're a prospective parent. Your embryo can be edited. You have a budget of edits to spend. Choose carefully — and read what actually happened.
    </div>

    <div class="btn-row">
      <button class="btn btn--primary" id="start-r2">Begin Round 2 →</button>
    </div>
  `;
  $app.appendChild(card);
  document.getElementById("start-r2").onclick = () => setScene("round2");
}

// ----------------------------------------------------------------------------
// Round 2 — selection
// ----------------------------------------------------------------------------
function renderRound2() {
  const card = document.createElement("section");
  card.className = "card";
  const totalCost = sumSelectedCost();
  const remaining = STATE.round2.budget - totalCost;

  let pips = "";
  for (let i = 0; i < STATE.round2.budget; i++) {
    pips += `<span class="budget__pip${i < totalCost ? " is-spent" : ""}"></span>`;
  }

  card.innerHTML = `
    <span class="card__eyebrow">Round 2  ·  Design your child</span>
    <h2>You have <em>${STATE.round2.budget}</em> edit-points to spend.</h2>
    <p class="card__lede">Each trait costs more or fewer points depending on how many loci it would actually require — and how much risk that carries. Choose deliberately.</p>

    <div class="budget" role="status" aria-live="polite">
      <div>
        <div class="budget__label">Remaining</div>
        <div class="budget__bar" aria-hidden="true">${pips}</div>
      </div>
      <div class="budget__count">${remaining}<span style="font-size:14px;color:var(--ink-muted);font-family:var(--font-ui);font-weight:500;"> / ${STATE.round2.budget}</span></div>
    </div>

    <div class="trait-grid" id="trait-grid"></div>

    <div class="btn-row">
      <button class="btn btn--primary" id="commit" ${STATE.round2.selected.size === 0 ? "disabled" : ""}>
        Commit edits and begin gestation →
      </button>
      <button class="btn btn--ghost" id="select-none">Decline all edits</button>
    </div>

    <div class="callout" style="margin-top:24px;">
      You don't have to spend any points. <em>"Decline all edits"</em> is a real option — and discussing why you would or wouldn't is part of the point.
    </div>
  `;
  $app.appendChild(card);

  const $grid = card.querySelector("#trait-grid");
  TRAITS.forEach((t) => {
    const tEl = document.createElement("div");
    tEl.className = "trait" + (STATE.round2.selected.has(t.id) ? " is-selected" : "");
    tEl.innerHTML = `
      <div class="trait__head">
        <h3 class="trait__name">${t.name}</h3>
        <span class="trait__cost">${t.cost} pt${t.cost > 1 ? "s" : ""}</span>
      </div>
      <div class="trait__gene">${t.gene}</div>
      <p class="trait__naive">${t.naive}</p>
      <button class="trait__select" data-id="${t.id}">
        ${STATE.round2.selected.has(t.id) ? "Selected ✓" : "Select edit"}
      </button>
    `;
    tEl.querySelector("button").onclick = () => toggleTrait(t);
    $grid.appendChild(tEl);
  });

  document.getElementById("commit").onclick = () => {
    STATE.round2.results = computeResults();
    setScene("round2_results");
  };
  document.getElementById("select-none").onclick = () => {
    STATE.round2.selected.clear();
    STATE.round2.results = computeResults();
    setScene("round2_results");
  };
}

function sumSelectedCost() {
  let s = 0;
  STATE.round2.selected.forEach((id) => {
    const t = TRAITS.find((x) => x.id === id);
    if (t) s += t.cost;
  });
  return s;
}

function toggleTrait(t) {
  if (STATE.round2.selected.has(t.id)) {
    STATE.round2.selected.delete(t.id);
  } else {
    if (sumSelectedCost() + t.cost > STATE.round2.budget) {
      alert(`Not enough edit-points. You have ${STATE.round2.budget - sumSelectedCost()} remaining; this trait costs ${t.cost}.`);
      return;
    }
    STATE.round2.selected.add(t.id);
  }
  render();
}

function pickOutcome(trait) {
  const total = trait.outcomes.reduce((a, o) => a + o.weight, 0);
  let roll = Math.random() * total;
  for (const o of trait.outcomes) {
    roll -= o.weight;
    if (roll <= 0) return o;
  }
  return trait.outcomes[trait.outcomes.length - 1];
}

function computeResults() {
  const selected = TRAITS.filter((t) => STATE.round2.selected.has(t.id));
  return selected.map((t) => ({ trait: t, outcome: pickOutcome(t) }));
}

function renderRound2Results() {
  const results = STATE.round2.results || [];
  const counts = { intended: 0, partial: 0, unintended: 0, severe: 0 };
  results.forEach((r) => counts[r.outcome.kind]++);

  const card = document.createElement("section");
  card.className = "card";

  if (results.length === 0) {
    card.innerHTML = `
      <span class="card__eyebrow">Outcome</span>
      <h2>Your child is born.</h2>
      <p class="card__lede">You declined all edits. Your child carries the genome they were given by the lottery of meiosis.</p>
      <div class="callout">
        You haven't avoided choices about your child's genome — you just didn't make any <em>with this technology</em>. Discuss in your group: is that morally different from making edits? If so, why?
      </div>
      <div class="btn-row">
        <button class="btn btn--primary" id="to-end">Continue to reflection →</button>
        <button class="btn btn--ghost" id="replay">Reconsider</button>
      </div>
    `;
  } else {
    const outcomeHtml = results
      .map(
        (r, idx) => `
      <article class="outcome ${r.outcome.kind}" style="animation-delay:${idx * 100}ms">
        <div>
          <span class="outcome__tag">${labelFor(r.outcome.kind)}</span>
        </div>
        <div>
          <h4 class="outcome__name">${r.trait.name}</h4>
          <div class="outcome__gene">${r.trait.gene}</div>
          <p class="outcome__body">${r.outcome.text}</p>
        </div>
      </article>`
      )
      .join("");

    card.innerHTML = `
      <span class="card__eyebrow">Outcome</span>
      <h2>Your child is <em>born</em>.</h2>
      <p class="card__lede">Here is what your edits actually did. Each outcome was drawn from a weighted distribution reflecting what we currently know about that gene's biology.</p>

      <div class="outcomes-summary">
        <div class="summary-pip intended"><div class="summary-pip__num">${counts.intended}</div><div class="summary-pip__label">As intended</div></div>
        <div class="summary-pip partial"><div class="summary-pip__num">${counts.partial}</div><div class="summary-pip__label">Partial</div></div>
        <div class="summary-pip unintended"><div class="summary-pip__num">${counts.unintended}</div><div class="summary-pip__label">Unintended</div></div>
        <div class="summary-pip severe"><div class="summary-pip__num">${counts.severe}</div><div class="summary-pip__label">Serious</div></div>
      </div>

      ${outcomeHtml}

      <div class="callout" style="margin-top:24px;">
        Re-running this game gives different outcomes — <em>that's the point</em>. The genome isn't a control panel. The same edit, in the same parents, can produce different children.
      </div>

      <div class="btn-row">
        <button class="btn btn--primary" id="to-end">Continue to reflection →</button>
        <button class="btn btn--ghost" id="replay">Try a different set of edits</button>
      </div>
    `;
  }
  $app.appendChild(card);

  const toEnd = document.getElementById("to-end");
  if (toEnd) toEnd.onclick = () => setScene("end");
  const replay = document.getElementById("replay");
  if (replay)
    replay.onclick = () => {
      STATE.round2.selected.clear();
      STATE.round2.results = null;
      setScene("round2");
    };
}

function labelFor(kind) {
  return {
    intended: "Worked as intended",
    partial: "Partial / minimal effect",
    unintended: "Unintended consequence",
    severe: "Serious unintended outcome",
  }[kind];
}

// ----------------------------------------------------------------------------
// End / reflection
// ----------------------------------------------------------------------------
function renderEnd() {
  const correct = STATE.round1.answers.filter((a) => a.correct).length;
  const total = ROUND_1_QUESTIONS.length;
  const card = document.createElement("section");
  card.className = "card";
  card.innerHTML = `
    <span class="card__eyebrow">Reflect with your group</span>
    <h2>Now: turn to your group.</h2>
    <p class="card__lede">The questions on your handout aren't about whether CRISPR <em>works</em>. They're about what we should do with it. Bring the experience of the simulator with you.</p>

    <p style="font-size:13px;color:var(--ink-muted);margin-top:8px;">Round 1 score: <strong style="color:var(--ink);">${correct} / ${total}</strong>.</p>

    <div class="callout" style="margin-top:16px;">
      <strong style="color:var(--brand);">A few things to keep in mind:</strong>
      <ul style="margin:12px 0 0;padding-left:20px;line-height:1.6;">
        <li>Almost every trait people most want to enhance is polygenic, environment-sensitive, or both.</li>
        <li>Editing one gene almost never affects only one trait (pleiotropy).</li>
        <li>Off-target effects are rare-per-site but common-per-genome.</li>
        <li>The line between "therapy" (e.g., sickle cell) and "enhancement" (e.g., height, IQ) is not as clean as it sounds.</li>
      </ul>
    </div>

    <div class="btn-row">
      <button class="btn btn--ghost" id="restart">Restart the game</button>
    </div>
  `;
  $app.appendChild(card);
  document.getElementById("restart").onclick = () => {
    STATE.round1 = { index: 0, answers: [] };
    STATE.round2 = { budget: 6, selected: new Set(), results: null };
    setScene("intro");
  };
}

// ----------------------------------------------------------------------------
// Boot
// ----------------------------------------------------------------------------
setScene("intro");
orrect = STATE.round1.answers.filter((a) => a.correct).length;
  const total = ROUND_1_QUESTIONS.length;
  const card = document.createElement("section");
  card.className = "card";
  card.innerHTML = `
    <span class="card__eyebrow">Reflect with your group</span>
    <h2>Now: turn to your group.</h2>
    <p class="card__lede">The questions on your handout aren't about whether CRISPR <em>works</em>. They're about what we should do with it. Bring the experience of the simulator with you.</p>

    <p style="font-size:13px;color:var(--ink-muted);margin-top:8px;">Round 1 score: <strong style="color:var(--ink);">${correct} / ${total}</strong>.</p>

    <div class="callout" style="margin-top:16px;">
      <strong style="color:var(--brand);">A few things to keep in mind:</strong>
      <ul style="margin:12px 0 0;padding-left:20px;line-height:1.6;">
        <li>Almost every trait people most want to enhance is polygenic, environment-sensitive, or both.</li>
        <li>Editing one gene almost never affects only one trait (pleiotropy).</li>
        <li>Off-target effects are rare-per-site but common-per-genome.</li>
        <li>The line between "therapy" (e.g., sickle cell) and "enhancement" (e.g., height, IQ) is not as clean as it sounds.</li>
      </ul>
    </div>

    <div class="btn-row">
      <button class="btn btn--ghost" id="restart">Restart the game</button>
    </div>
  ` ;
  $app.appendChild(card);
  document.getElementById("restart").onclick = () => {
    STATE.round1 = { index: 0, answers: [] };
    STATE.round2 = { budget: 6, selected: new Set(), results: null };
    setScene("intro");
  };
}

// ----------------------------------------------------------------------------
// Boot
// ----------------------------------------------------------------------------
setScene("intro");
