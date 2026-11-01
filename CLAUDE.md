# KI-Kompass für Berater

Lern-Tool für Management Consultants: Lektionen und Quiz zu LLM-Deployments im Konzern und zum Bau von Agenten. Zielniveau: Ein Berater kann mit einem CIO auf Augenhöhe über Architekturentscheidungen sprechen. Tiefer geht es nicht.

## Aufbau

- `index.html` ist die einzige Quelle. Sie enthält HTML, CSS und JS in einer Datei, ohne `<head>`, weil sie auch als Claude-Artifact veröffentlicht wird.
- Inhalte stehen als Daten im `<script>`-Block:
  - `TRACKS`, `CATS`: Spuren und Quiz-Kategorien
  - `QUESTIONS`: Quizfragen
  - `STACK`, `CROSS`: Ebenen der Referenzarchitektur
  - `LESSONS`: Lektionen, aufgebaut aus Blöcken (`h`, `p`, `ul`, `flow`, `cols`, `table`, `calc`, `callout`, `stack`, `roles`)
- `docs/index.html` ist die GitHub-Pages-Version. Sie wird erzeugt, niemals von Hand bearbeiten.
- `PROGRESS.md` ist der Arbeitsstand: offene Aufgaben, erledigte Aufgaben, Erkenntnisse.

## Arbeitsweise

1. Zu Beginn `PROGRESS.md` lesen und die nächste offene Aufgabe wählen.
2. Immer nur eine Aufgabe auf einmal.
3. Nach jeder Änderung: `./build-pages.sh && node scripts/check.mjs`. Die Aufgabe ist erst erledigt, wenn die Prüfung keine Fehler meldet.
4. `PROGRESS.md` aktualisieren: Aufgabe abhaken, neue Erkenntnisse unter „Gelernt“ eintragen.
5. Committen mit einer Nachricht, die sagt, was sich inhaltlich geändert hat.

## Regeln für Fragen

- Genau 4 Antworten. Die erste im Array ist die richtige; die Anzeige mischt sie.
- Die richtige Antwort darf nicht systematisch die längste oder die differenzierteste sein. Falsche Antworten müssen plausibel sein, also etwas, das ein Kunde ernsthaft vorschlagen würde.
- `w` erklärt, warum die Antwort stimmt. `k` ist ein Satz für das Kundengespräch in „…“.
- Fallfragen vor Wissensfragen: „Ein Kunde will X. Was …?“

## Regeln für Texte

- Deutsch, du-Form in Anleitungen, sachlich und konkret.
- Kurze Sätze. Keine Einschübe mit Gedankenstrich.
- Keine konkreten Preise oder Fristen als Fakten. Beispielzahlen als Annahme kennzeichnen.
- Produktnamen nur als Beispiele, Stand im Footer pflegen.
- Regulatorik (EU AI Act, Aufsicht) vereinfacht darstellen und vor Weitergabe fachlich prüfen lassen.

## Nicht tun

- `docs/index.html` von Hand ändern.
- Prüfungen in `scripts/check.mjs` lockern, damit sie bestehen.
- Neue Bibliotheken einbinden. Die Seite kommt ohne Framework aus.
