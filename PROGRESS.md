# Arbeitsstand

Prüfung: `./build-pages.sh && node scripts/check.mjs`

## Offen

- [ ] **Antwortlängen ausgleichen.** Die richtige Antwort ist fast immer die längste. Pro Kategorie die Optionen so umschreiben, dass richtige und falsche Antworten ähnlich lang und gleich plausibel sind. Fertig, wenn `check.mjs` unter 40 % meldet.
  - [x] agent
  - [x] werkzeug
  - [ ] konzepte
  - [ ] anwendung
  - [ ] risiko
  - [ ] mythen
  - [ ] cio
  - [ ] architektur
  - [ ] betrieb
  - [ ] orgmodell
- [ ] **Lektion „Risiko und Regulierung“** schreiben (EU AI Act, Datenschutz, Aufsicht). Die Kategorie `risiko` hat noch keine Lektion. Danach fachlich durch Compliance prüfen lassen.
- [ ] **Produktnamen prüfen** (Lektion 2, Plattform-Stack): Sind die Namen noch aktuell?
- [ ] **Claude-Code-Fakten nachprüfen** (Lektionen 13–15) vor jeder Weitergabe gegen den Changelog unter code.claude.com/docs. Stand der Prüfung: 03.11.2026. Routinen waren da noch eine Research Preview.
- [ ] **GitHub Pages aktivieren** (nur der Repo-Owner): Settings → Pages → Branch `claude/bold-ride-jie18d`, Ordner `/docs`.
- [ ] **Feedback aus einem Testdurchlauf einarbeiten**: Welche Fragen sind zu leicht, welche passen nicht zu den Mandaten?

## Erledigt

- Quiz mit 55 Fragen in 10 Kategorien und 4 Spuren
- 15 Lektionen: Grundlagen, Plattform, Agenten bauen, Werkzeugkasten (Prompts, Claude Code, Skills/Hooks/Routinen, MCP und Agent SDK)
- GitHub-Pages-Version über `build-pages.sh`
- Harness: `CLAUDE.md`, `PROGRESS.md`, `scripts/check.mjs`

## Gelernt

- Tabellen in Lektionen ließen die Seite am Handy zu breit werden. Ursache: verschachtelte `.wrap`-Container mit `margin: 0 auto`. Fix: `.wrap > .wrap { width: 100% }`. Bei neuen Containern darauf achten.
- Beim Schreiben von Fragen entsteht von selbst ein Muster: Die richtige Antwort wird die ausführlichste. Das muss man aktiv gegensteuern; `check.mjs` misst es.
- Was beim Ausgleich der Kategorie `agent` funktioniert hat: Die richtige Antwort knapp formulieren. Die falschen Antworten als das schreiben, was ein Kunde tatsächlich vorschlagen würde („größeres Modell“, „mehr Regeln in den Prompt“, „mehr Werkzeuge“), mit Begründung im Halbsatz. Das macht sie länger und plausibler zugleich.
- Fakten zu Werkzeugen, die sich schnell ändern (Claude Code, Routinen, Modi), vor dem Schreiben gegen die offizielle Doku prüfen und das Prüfdatum in PROGRESS.md festhalten.
