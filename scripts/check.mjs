// Prüft Inhalte und Technik von index.html. Aufruf: node scripts/check.mjs
// Exit-Code 1 bei Fehlern; Warnungen brechen nicht ab.
import { readFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("..", import.meta.url);
const html = readFileSync(new URL("index.html", root), "utf8");
const errors = [], warnings = [];
const err = m => errors.push(m), warn = m => warnings.push(m);

// 1. Skript extrahieren und Syntax prüfen
const script = (html.match(/<script>([\s\S]*?)<\/script>/) || [])[1];
if (!script) { console.error("FEHLER: kein <script> in index.html"); process.exit(1); }
try { new vm.Script(script); } catch (e) { err(`JavaScript-Syntaxfehler: ${e.message}`); }

// 2. Datenteil (alles vor der Logik) ausführen
const cut = script.indexOf("const $ = id");
let data;
try { data = vm.runInNewContext(script.slice(0, cut) + "\n;({TRACKS,CATS,QUESTIONS,LESSONS})", {}); }
catch (e) { console.error(`FEHLER: Daten lassen sich nicht laden: ${e.message}`); process.exit(1); }
const { TRACKS, CATS, QUESTIONS, LESSONS } = data;

// 3. Fragen
const seen = new Set();
let longestCorrect = 0;
QUESTIONS.forEach((q, i) => {
  const id = `Frage ${i + 1} („${q.q.slice(0, 50)}…“)`;
  if (!CATS[q.c]) err(`${id}: unbekannte Kategorie "${q.c}"`);
  if (seen.has(q.q)) err(`${id}: doppelte Frage`); seen.add(q.q);
  if (!Array.isArray(q.o) || q.o.length !== 4) err(`${id}: braucht genau 4 Antworten`);
  else {
    if (new Set(q.o).size !== 4) err(`${id}: doppelte Antwortoptionen`);
    const lens = q.o.map(o => o.length);
    if (lens[0] === Math.max(...lens)) longestCorrect++;
  }
  if (!q.w || q.w.length < 80) err(`${id}: Erklärung (w) fehlt oder ist zu kurz`);
  if (!q.k || !q.k.startsWith("„") || !q.k.endsWith("“")) err(`${id}: Kundensatz (k) muss in „…“ stehen`);
});
const share = longestCorrect / QUESTIONS.length;
const perCat = Object.keys(CATS).map(c => {
  const qs = QUESTIONS.filter(q => q.c === c);
  const n = qs.filter(q => q.o[0].length === Math.max(...q.o.map(o => o.length))).length;
  return `${c} ${n}/${qs.length}`;
}).join(", ");
if (share > 0.4) warn(`Bei ${longestCorrect} von ${QUESTIONS.length} Fragen (${Math.round(share * 100)} %) ist die richtige Antwort die längste. Das verrät die Lösung. Ziel: unter 40 %. Je Kategorie: ${perCat}`);

// 4. Kategorien und Lektionen
for (const [id, c] of Object.entries(CATS)) {
  if (!TRACKS[c.t]) err(`Kategorie ${id}: unbekannte Spur "${c.t}"`);
  const n = QUESTIONS.filter(q => q.c === id).length;
  if (n < 3) warn(`Kategorie ${id}: nur ${n} Fragen`);
}
const known = ["h", "p", "ul", "flow", "cols", "table", "calc", "callout", "stack", "roles"];
const ids = new Set();
LESSONS.forEach((l, i) => {
  const id = `Lektion ${i + 1} (${l.id})`;
  if (ids.has(l.id)) err(`${id}: doppelte id`); ids.add(l.id);
  (l.cats || []).forEach(c => { if (!CATS[c]) err(`${id}: unbekannte Kategorie "${c}"`); });
  if (!l.cats?.length) err(`${id}: keine Quiz-Kategorie`);
  l.blocks.forEach((b, j) => { if (!known.some(k => k in b)) err(`${id}, Block ${j + 1}: unbekannter Blocktyp`); });
  if (l.take?.length !== 3) warn(`${id}: „Das Wichtigste“ sollte genau 3 Punkte haben`);
});
const uncovered = Object.keys(CATS).filter(c => !LESSONS.some(l => l.cats.includes(c)));
if (uncovered.length) warn(`Kategorien ohne Lektion: ${uncovered.join(", ")}`);

// 5. GitHub-Pages-Version aktuell?
try {
  const docs = readFileSync(new URL("docs/index.html", root), "utf8");
  if (!docs.includes(html)) err("docs/index.html ist veraltet. Ausführen: ./build-pages.sh");
} catch { err("docs/index.html fehlt. Ausführen: ./build-pages.sh"); }

// Ergebnis
console.log(`${QUESTIONS.length} Fragen, ${Object.keys(CATS).length} Kategorien, ${LESSONS.length} Lektionen`);
warnings.forEach(w => console.log("WARNUNG: " + w));
errors.forEach(e => console.log("FEHLER:  " + e));
console.log(errors.length ? `\n${errors.length} Fehler` : "\nOK: keine Fehler");
process.exit(errors.length ? 1 : 0);
