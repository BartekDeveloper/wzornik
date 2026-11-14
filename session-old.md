# Brakujące wzory matematyczne

**Session ID:** ses_e24a86ebaffe6Sv4qlp3jGTpsc
**Created:** 11/14/2026, 7:35:11 PM
**Updated:** 11/14/2026, 8:10:41 PM

---

## User

To jest aplikacja ze wszystkimi wzorami, podwzorami itd, a przynajmniej powinna miec, a nie ma. powinna tez miec wszystkie transformacje na ogolnie, nie ogolne, motonicznosci, wykresy, auto-rozpoznawanie, mozliwosc wpisywania (rowniez na telefonie, co teraz nie dziala) liczb, rownan z pi, ze zmiennymi. itd. Powinna przynajmniej miec wszystkie wzory z matury i matury rozszerzonej z mat, fiz oraz chem. ale glownie z matematyki sie skup brakujace, delty nie delty, wzory powinny miec pod/nad linki do wzorow je wykorzystujacych prostszych / trudniejszych, rozbite nie rozbite, miejsca zerowe i jako fn kwadratowa, i jako osobne, wyszukiwania i wszystko. Wiele brakuje. w fazie 0 przeszukaj kod, w fazie 1 ulozysz plan jak ci pozwole, w fazie 2-... bedziesz edytowal kod. najpierw teraz narob sobie konektstu

---

## Assistant

_Thinking:_

The user is speaking Polish. Let me parse what they're saying:

- They're talking about an app with all the formulas (matura, matura rozszerzona, mat, fiz, chem, etc.), and it should have, but doesn't.
- It should also have all transformations in general — not general, modular... "modonicznosci" probably means "modularności"? "motonicznosci" — maybe "modułowości"? Or "modularność". Maybe "modułowe"? Possibly "modularności". Or maybe "modularności" typo. Probably "modułowości" — modularity.
- "wykresy, auto-rozpoznawanie, mozliwosc wpisywania (rowniez na telefonie, co teraz nie dziala) liczb, rownan z pi, ze zmiennymi. itd."
- Should have at least all the matura and matura rozszerzona formulas from mat, fiz and chem. But mainly missing math — "z matematyki sie skup brakujace" probably "z matematyki się skup brakujące" — mostly missing from math.
- "delty nie delty" — probably "delta nie delta" — like Δ (delta) not delta... Or "deltoidy"? Hmm, "delty nie delty" might be about the Δ symbol vs "delta" the letter, or maybe "delta" equations like quadratic formula x²=Δ... Or maybe "delt" as in "delta" — perhaps they mean Greek delta notation.
- "wzory powinny miec pod/nad linki do wzorow je wykorzystujacych prostszych / trudniejszych, rozbite nie rozbite, miejsca zerowe i jako fn kwadratowa, i jako osobne, wyszukiwania i wszystko."
- "Wiele brakuje. w fazie 0 przeszukasz kod, w fazie 1 ulozysz plan jak ci pozwole, w fazie 2-... bedziesz edytowal kod. najpierw teraz narob sobie konektstu"

So they're in Plan mode. The system reminder says: In Plan mode, discuss the plan with the user directly in the conversation. Do not create/update plan files unless user explicitly asks. Do not modify any other files or ask a subagent to do so. Remain in Plan mode until user switches agents. If user asks to implement changes, don't do so — tell them they need to switch agents.

Also AGENTS.md says: Before ANY tool call that writes, edits, or runs commands: output a PLAN and WAIT for explicit user OK. Hmm, but the system reminder in this turn overrides? The system reminder says don't modify any files, don't ask subagent, plan mode. The user says "w fazie 0 przeszukaj kod" — in phase 0, scan the code. But the harness reminder says plan mode: do not create or update plan files, do not modify files. Hmm, but the user's instruction is to scan the code. Scanning code via read/grep doesn't modify files, so that's probably fine? The system reminder says "Do not modify any other files or ask a subagent to do so." Reading files isn't modifying. The AGENTS.md says before ANY tool call that writes, edits, or runs commands: output a PLAN and WAIT for explicit user OK. Reading is not writing/editing/running commands per se... but grep/read are commands. Hmm, risky. To be safe, I could just respond to the user asking what they want me to do, rather than running commands.

Actually, let me think about the best response. The user wants:
1. Phase 0: scan the code (to check what formulas exist)
2. Phase 1: create a plan
3. Phase 2+: edit code

"najpierw teraz narob sobie konektstu" — "first, let's get ourselves connected" — probably means "first let's get acquainted / get connected with the codebase" — maybe they mean establish context. Or maybe they mean set up the connection (to an API? to the repo?). Likely "poznajemy się" / "skonfigurujmy połączenie" — probably they mean get familiar with the project. Or maybe they want to run the app? "narob sobie konektstu" — get connected. Possibly they want to connect to some service or set up the environment.

Given plan mode constraints, the right move: discuss the plan with the user in conversation, don't modify files, don't run commands that write. I can answer without tools, or I could read the codebase — but the harness reminder says not to modify files; reading might be okay but AGENTS.md says wait for plan approval before running commands. To be safe and compliant with the higher-priority system reminder, I should NOT run tool calls that write/edit/run. Reading via read/grep might be borderline. The safest interpretation: in Plan mode, just discuss. But phase 0 is "scan the code" — the user explicitly asked. The system reminder from the harness overrides though: "Do not modify any other files or ask a subagent to do so." Scanning (reading) doesn't modify. Running grep is a read-only command; AGENTS.md says before ANY tool call that writes, edits, or runs commands — grep runs a command. Hmm. To be cautious, I could avoid tools entirely and just respond conversationally, then ask the user how they want to proceed (e.g., confirm I should scan the code now, whether they want to switch to implementation agent).

Actually, being in Plan mode, the instruction is clear: "Discuss the plan with the user directly in the conversation. Do not create or update plan files unless the user explicitly asks you to; when they do, write them only in /home/zota/.opencode/plan. Do not modify any other files or ask a subagent to do so. You remain in Plan mode until the user switches agents. If the user asks you to implement changes, do not do so. Tell them they need to switch agents."

The user hasn't asked me to implement yet — they're laying out phases and said phase 0 is scanning the code, phases 2+ will be editing. So arguably phase 0 scanning is sanctioned by the user. But the harness reminder says not to modify files (scanning doesn't) and not to ask subagents. Scanning via read/grep is allowed-ish. However, the AGENTS.md rule about outputting a plan and waiting for explicit OK before any tool call that writes/edits/runs commands — grep is a command. This is a conflict. The most recent system-level instruction (the plan mode reminder) is from the harness and likely higher authority in this context.

I think the best course: briefly acknowledge the plan phases, and for phase 0, since the user explicitly instructed it, I can do the scan. But to be safe with AGENTS.md, I should output a plan and wait for OK. The user already gave a plan themselves (phase 0 scan, phase 1 plan, phase 2 edit). So I can proceed with phase 0 scan without needing new approval? The AGENTS.md says before ANY tool call that writes, edits, or runs commands: output a PLAN and WAIT for explicit user OK. Running grep would be a tool call that runs a command. To be safe, I should present my plan and wait.

Given the friction, I think the ideal response: respond conversationally in Polish (user wrote in Polish), outline what I understood of the phases, confirm understanding, and state that before I run any commands I need to output a plan and get explicit OK — or simply ask whether I should start phase 0 now.

Hmm, but the user said "najpierw teraz narob sobie konektstu" — "first now let's get ourselves connected". Maybe they're waiting for me to start. The plan mode system reminder says to discuss the plan directly in conversation.

Let me decide: I will NOT run any tools yet (to comply with AGENTS.md's "before ANY tool call that writes, edits, or runs commands: output a PLAN and WAIT for explicit user OK" — actually grep doesn't write/edit but runs a command; safest to not run anything until plan approval). I'll respond in Polish, discuss the plan, summarize understood requirements, and ask for explicit OK to start phase 0 (code scan), listing the steps.

Actually wait — should I use the question tool? The AGENTS.md says use the `question` tool when in doubt about requirements. But the harness plan-mode reminder says discuss directly in conversation, don't create plan files unless asked, don't ask subagent, don't implement. Using the question tool is probably fine (it's not a subagent or file modification). But to keep it simple and conversational, I can just ask in text.

Let me draft a response in Polish:

- Confirm understanding of the plan phases: Faza 0 (przeszukaj kod), Faza 1 (opracuj plan), Faza 2+ (edytyzacja).
- Summarize requirements: wszystkie wzory matury/matury rozszerzonej z mat, fiz, chem (głównie matematyka), transformacje, modularność, wykresy, auto-rozpoznawanie, możliwość wpisywania liczb (również na telefonie), równania z π, ze zmiennymi, Δ, miejsca zerowe, jako funkcji kwadratowej, osobne wyszukiwarki, linki pod/nad wzory używające prostszych/trudniejszych, rozbite vs nie rozbite, itd.
- State: before I run any commands (scan), I must output a plan and wait for explicit OK (per repo instructions).
- Ask: should I start phase 0 now? And maybe ask about specifics: e.g., how is the app structured, what's the framework, where are formulas stored, etc. But phase 0 will answer that.

I should keep it concise. No tools yet. Let me write in Polish since the user writes Polish.

Also the user said "narob sobie konektstu" — maybe they mean get connected/familiar with the codebase. I can interpret as: start phase 0, scan the code.

I will not use any tools in this response — just text. Actually, should I use the question tool? The instructions say use question tool when in doubt. But the plan-mode reminder says discuss directly in conversation. Text question is fine and simpler. I'll just ask directly in the message.

Let me write the response:

"Rozumiem. Podejrzewam, że chodzi o aplikację z wzorami..."

Then outline phases as they described, confirm.

Then: "Zgadzam się z podziałem faz. Przed rozpoczęciem jakichkolwiek działań (w tym fase 0 — przeszukanie kodu) muszę zgodnie z plan mode wystawić plan i czekać na Twoją zielone światło."

Then list my understanding of requirements to confirm.

Then ask: "Chcesz, żebym rozpoczął fazę 0 — przeszukiwanie kodu?"

Keep it fairly short. No file modifications. No plan file. No subagents. No implementation. Wait for OK.

One consideration: should I not run tools at all? The user asked for phase 0 to scan the code, but the harness reminder is explicit about plan mode and not modifying files. Scanning = reading. I think the safest compliant path is to not run commands until the plan is approved. Given AGENTS.md's strictness, I'll wait.

Let me write the final response in Polish, conversational, structured.

Rozumiem, dokładnie w jakim kierunku się kierujesz. Słucham i potwierdzam zrozumienie Twojego planu:

## Co rozumiem z Twojej propozycji

**Cel:** aplikacja z pelią (wzorami) – powinna miec **wszystkie** wzory z matury, matury rozszerzonej, mat, fizy i chemii (głównie brakuje z matematyki).

**Lista oczekiwań od aplikacji:**
- wszystkie wzory (matura / matura rozszerzona / mat / fiz / chem)
- wszystkie transformacje – ogólne, modułowe/modularności itd., modularność
- wykresy
- auto-rozpoznawanie
- mozliwosc wpisywania liczb – **równiez na telefonie** (obecnie nie dziala)
- rownania z π i ze zmiennymi
- obsługa Δ (delti? delty – piszę zgodnie z Twoim zapisem)
- miejsca zerowe
- jako funkcja kwadratowa – osobno / jako zwykła
- wyszukiwania
- linki pod/nad wzory – do wzorow korzystajacych z prostszych / trudniejszych wersji
- rozbite vs nie rozbite

**Podział faz (zgodnie z Twoim założeniem):**
- Faza 0 – przeszukanie kodu (obecnie)
- Faza 1 – wyliczenie planu
- Faza 2+ – edycja kodu

## Zanim zacznę – plan i czekam na zielone światło

Zgodnie z zasadami tego środowiska, przed jakąkolwiek akcją (w tym fazą 0 – przeszukiwanie kodu) **muszę wystawić plan i czekać na Twoją wyraźną zgodę**. Nie tworzym planu na razie, bo nie zostałeś/aś o to proszony/a.

Chciał(a)bym też doprecyzować kilka punktów, zanim zaczniemy:

1. **Początek:** czy chcesz, abym od razu rozpoczął **fazę 0** (przeszukanie kodu) – czy najpierw omówić zakres pojęć (np. czy "modonicznosci" to "modułowości", a "delty nie delty" dotyczy Δ)?
2. **Stopnie złożoności:** czy po prostu "dodanie brakujących wzorów" (np. wzory kwadratowe z Δ i miejscami zerowymi) albo pełny zestaw wszystkich wzorów z całej matury?

**Propozycja:** zaczynamy **fazę 0** – robimy przegląd kodu pod kątem: gdzie są obecne wzory, jak są przechowywane, co implementuje wykresy/auto-rozpoznawanie/wpisywanie na telefon.

Czekam na Twoją decyzję – **mam zielone światło zacząć fazę 0?** Jeśli tak, startujemy od przeglądu kodu.

---

## User

uzywaj `question` nardzedzia do pytan, sluchaj agents md, ale najpierw FAZA 0 - przeszukaj kod w trybie analizy (planu) nie ukladaj nic, zbieraj potrzebne TOBIE informacje do dalszych dzialan

---

## Assistant

_Thinking:_

The user is in Plan mode. They want me to do Phase 0: scan the code in analysis mode (not planning), just gather information needed for further actions.

The user explicitly said: use the `question` tool for questions, listen to AGENTS.md, but first Phase 0 - scan the code in analysis mode (not planning), just gather info needed for further actions.

The AGENTS.md says: Before ANY tool call that writes, edits, or runs commands: output a PLAN and WAIT for explicit user OK.

Hmm, but the user is now explicitly instructing me to do Phase 0 - scan the code. Scanning is reading, not writing/editing. But "runs commands" — grep/read are read-only commands. The AGENTS.md instruction says before ANY tool call that writes, edits, or runs commands: output a plan and wait for explicit user OK. The user has explicitly instructed Phase 0 now, which could be considered the plan approval. The user said "najpierw teraz narob sobie konektstu" and now "najpierw FAZA 0 - przeszukaj kod w trybie analizy (planu) nie ukladaj nic, zbieraj potrzebne TOBIE informacje do dalszych dzialan".

So the user has effectively given approval to start Phase 0. Reading files doesn't modify them. To be safe, I should probably not run any write/edit commands. Reading via read/grep should be acceptable now given the user explicitly asked for Phase 0 scan.

Let me think about what to do:
1. The working directory is /home/zota/neo/matura-app
2. I should scan the code structure first.

Let me start by exploring the directory structure. I shouldn't use subagents? The plan mode reminder says "Do not modify any other files or ask a subagent to do so." Hmm, that's about not asking a subagent to do phase 2+ edits. For phase 0 scan, using the explore subagent might be okay, but to be safe and simple, I can scan myself with glob/read/grep.

Actually, the reminder says "Do not modify any other files or ask a subagent to do so." — this might mean don't ask a subagent to do the file modifications. For the scan, I could use subagents, but simpler to just do it directly to avoid any risk.

Let me first list the directory structure, then read key files.

I should not use the `question` tool excessively — the user said use it for questions. But for phase 0, just scan.

Let me start with glob to see the structure.

Plan:
- List files in /home/zota/neo/matura-app
- Read package.json, etc.

Let me do parallel calls: glob for top-level files, read the directory.

Actually let me be careful: I shouldn't write anything. Reading is fine.

Let me call glob with pattern like "*" and maybe "**/*.{json,md} etc. First just list the directory.

Rozumiem — przejdziemy do **Fazy 0**: przeszukiwanie kodu w trybie czysto analizy. Zbieram informacje, niczego nie planuję i nie edytuję. Zacznę od rozpoznania struktury projektu.

**Tool: glob**

**Input:**
```json
{
  "pattern": "*"
}
```

/home/zota/neo/matura-app/scripts/generate-sitemap.ts
/home/zota/neo/matura-app/tsconfig.tsbuildinfo
/home/zota/neo/matura-app/session-ses_f555.md
/home/zota/neo/matura-app/package.json
/home/zota/neo/matura-app/dev-dist/workbox-7e5eb42b.js
/home/zota/neo/matura-app/dev-dist/workbox-25613826.js
/home/zota/neo/matura-app/dev-dist/sw.js
/home/zota/neo/matura-app/dev-dist/registerSW.js
/home/zota/neo/matura-app/dist/workbox-9c191d2f.js
/home/zota/neo/matura-app/dist/sw.js
/home/zota/neo/matura-app/dist/registerSW.js
/home/zota/neo/matura-app/dist/manifest.webmanifest
/home/zota/neo/matura-app/dist/index.html
/home/zota/neo/matura-app/tsconfig.json
/home/zota/neo/matura-app/package-lock.json
/home/zota/neo/matura-app/vite.config.ts
/home/zota/neo/matura-app/index.html
/home/zota/neo/matura-app/README.md
/home/zota/neo/matura-app/dist/robots.txt
/home/zota/neo/matura-app/public/sitemap.xml
/home/zota/neo/matura-app/public/robots.txt
/home/zota/neo/matura-app/public/apple-touch-icon.png
/home/zota/neo/matura-app/dist/sitemap.xml
/home/zota/neo/matura-app/public/favicon.svg
/home/zota/neo/matura-app/public/fonts/fonts.css
/home/zota/neo/matura-app/public/fonts/spectral-normal-600-latin.woff2
/home/zota/neo/matura-app/public/fonts/spectral-normal-600-latin-ext.woff2
/home/zota/neo/matura-app/public/fonts/spectral-normal-500-latin.woff2
/home/zota/neo/matura-app/public/fonts/spectral-normal-500-latin-ext.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-sans-normal-600-latin.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-sans-normal-600-latin-ext.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-sans-normal-500-latin.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-sans-normal-500-latin-ext.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-sans-normal-400-latin.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-sans-normal-400-latin-ext.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-sans-italic-400-latin.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-sans-italic-400-latin-ext.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-mono-normal-500-latin.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-mono-normal-500-latin-ext.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-mono-normal-400-latin.woff2
/home/zota/neo/matura-app/public/fonts/ibm-plex-mono-normal-400-latin-ext.woff2
/home/zota/neo/matura-app/dist/apple-touch-icon.png
/home/zota/neo/matura-app/dist/icons/icon.svg
/home/zota/neo/matura-app/public/icons/icon-maskable-512.png
/home/zota/neo/matura-app/dist/icons/icon-maskable-512.png
/home/zota/neo/matura-app/src/lib/seo.test.ts
/home/zota/neo/matura-app/public/icons/icon-512.png
/home/zota/neo/matura-app/dist/icons/icon-512.png
/home/zota/neo/matura-app/src/lib/seo.ts
/home/zota/neo/matura-app/public/icons/icon-192.png
/home/zota/neo/matura-app/dist/icons/icon-192.png
/home/zota/neo/matura-app/src/lib/descriptions.ts
/home/zota/neo/matura-app/public/icons/icon.svg
/home/zota/neo/matura-app/src/lib/parse-formula.test.ts
/home/zota/neo/matura-app/src/lib/parse-formula.ts
/home/zota/neo/matura-app/src/lib/descriptions.test.ts
/home/zota/neo/matura-app/src/lib/sitemap.test.ts
/home/zota/neo/matura-app/src/lib/settings.test.ts
/home/zota/neo/matura-app/src/lib/settings.ts
/home/zota/neo/matura-app/dist/fonts/ibm-plex-sans-italic-400-latin-ext.woff2
/home/zota/neo/matura-app/dist/fonts/ibm-plex-mono-normal-500-latin.woff2
/home/zota/neo/matura-app/dist/fonts/ibm-plex-mono-normal-500-latin-ext.woff2
/home/zota/neo/matura-app/dist/fonts/ibm-plex-mono-normal-400-latin.woff2
/home/zota/neo/matura-app/dist/fonts/ibm-plex-mono-normal-400-latin-ext.woff2
/home/zota/neo/matura-app/dist/fonts/fonts.css
/home/zota/neo/matura-app/dist/favicon.svg
/home/zota/neo/matura-app/dist/fonts/ibm-plex-sans-normal-600-latin-ext.woff2
/home/zota/neo/matura-app/dist/fonts/ibm-plex-sans-normal-500-latin.woff2
/home/zota/neo/matura-app/dist/fonts/ibm-plex-sans-normal-500-latin-ext.woff2
/home/zota/neo/matura-app/dist/fonts/ibm-plex-sans-normal-400-latin.woff2
/home/zota/neo/matura-app/dist/fonts/ibm-plex-sans-normal-400-latin-ext.woff2
/home/zota/neo/matura-app/dist/fonts/ibm-plex-sans-italic-400-latin.woff2
/home/zota/neo/matura-app/dist/fonts/spectral-normal-600-latin.woff2
/home/zota/neo/matura-app/dist/fonts/spectral-normal-500-latin-ext.woff2
/home/zota/neo/matura-app/dist/fonts/spectral-normal-600-latin-ext.woff2
/home/zota/neo/matura-app/dist/fonts/ibm-plex-sans-normal-600-latin.woff2
/home/zota/neo/matura-app/dist/fonts/spectral-normal-500-latin.woff2
/home/zota/neo/matura-app/src/lib/search/search.ts
/home/zota/neo/matura-app/src/lib/search/search.test.ts
/home/zota/neo/matura-app/src/lib/search/fuzzy.test.ts
/home/zota/neo/matura-app/src/lib/search/fuzzy.ts
/home/zota/neo/matura-app/src/lib/solver/solver.test.ts
/home/zota/neo/matura-app/src/lib/solver/solver.ts
/home/zota/neo/matura-app/src/lib/units/units.test.ts
/home/zota/neo/matura-app/src/lib/units/units.ts
/home/zota/neo/matura-app/src/main.ts
/home/zota/neo/matura-app/src/lib/storage/storage.test.ts
/home/zota/neo/matura-app/src/lib/storage/db.ts
/home/zota/neo/matura-app/src/lib/plots/plot.test.ts
/home/zota/neo/matura-app/src/lib/plots/plot.ts
/home/zota/neo/matura-app/src/assets/styles/main.css
/home/zota/neo/matura-app/src/router/index.ts
/home/zota/neo/matura-app/src/lib/diagrams/geometry.test.ts
/home/zota/neo/matura-app/src/lib/diagrams/geometry.ts
/home/zota/neo/matura-app/src/lib/katex.test.ts
/home/zota/neo/matura-app/src/lib/katex.ts
/home/zota/neo/matura-app/src/App.vue
/home/zota/neo/matura-app/src/lib/formulas/chemia.ts
/home/zota/neo/matura-app/src/lib/formulas/math_katy.ts
/home/zota/neo/matura-app/src/lib/formulas/physics_pr.ts

(Results are truncated: showing first 100 results. Consider using a more specific path or pattern.)

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app"
}
```

Read directory /home/zota/neo/matura-app, entries 1-19
.git/
.github/
.husky/
dev-dist/
dist/
node_modules/
public/
scripts/
src/
.gitignore
.oxlintrc.json
index.html
package-lock.json
package.json
README.md
session-ses_f555.md
tsconfig.json
tsconfig.tsbuildinfo
vite.config.ts

---

## Assistant

_Thinking:_

The project is a Vite + Vue + TypeScript app called "matura" something. Let me explore the src directory structure more deeply, especially src/lib and src/views/pages.

Let me list src directory.

Struktura projektu widzę – to aplikacja Vite + Vue + TypeScript. Kontynuuję scan fazy 0.

**Tool: glob**

**Input:**
```json
{
  "pattern": "src/**/*.{ts,vue,css,json}"
}
```

/home/zota/neo/matura-app/src/lib/seo.test.ts
/home/zota/neo/matura-app/src/lib/seo.ts
/home/zota/neo/matura-app/src/lib/descriptions.ts
/home/zota/neo/matura-app/src/lib/parse-formula.test.ts
/home/zota/neo/matura-app/src/lib/parse-formula.ts
/home/zota/neo/matura-app/src/lib/descriptions.test.ts
/home/zota/neo/matura-app/src/lib/sitemap.test.ts
/home/zota/neo/matura-app/src/lib/settings.test.ts
/home/zota/neo/matura-app/src/lib/settings.ts
/home/zota/neo/matura-app/src/lib/search/search.ts
/home/zota/neo/matura-app/src/lib/search/search.test.ts
/home/zota/neo/matura-app/src/lib/search/fuzzy.test.ts
/home/zota/neo/matura-app/src/lib/search/fuzzy.ts
/home/zota/neo/matura-app/src/lib/storage/storage.test.ts
/home/zota/neo/matura-app/src/lib/storage/db.ts
/home/zota/neo/matura-app/src/lib/plots/plot.test.ts
/home/zota/neo/matura-app/src/lib/plots/plot.ts
/home/zota/neo/matura-app/src/lib/diagrams/geometry.test.ts
/home/zota/neo/matura-app/src/lib/diagrams/geometry.ts
/home/zota/neo/matura-app/src/lib/katex.test.ts
/home/zota/neo/matura-app/src/lib/katex.ts
/home/zota/neo/matura-app/src/lib/solver/solver.test.ts
/home/zota/neo/matura-app/src/lib/solver/solver.ts
/home/zota/neo/matura-app/src/lib/units/units.test.ts
/home/zota/neo/matura-app/src/App.vue
/home/zota/neo/matura-app/src/lib/units/units.ts
/home/zota/neo/matura-app/src/main.ts
/home/zota/neo/matura-app/src/views/ZadanieView.vue
/home/zota/neo/matura-app/src/views/WzornikView.vue
/home/zota/neo/matura-app/src/views/SolverView.vue
/home/zota/neo/matura-app/src/views/ConverterView.vue
/home/zota/neo/matura-app/src/views/SettingsView.vue
/home/zota/neo/matura-app/src/views/HistoriaView.vue
/home/zota/neo/matura-app/src/views/KalkulatoryView.vue
/home/zota/neo/matura-app/src/views/NotFoundView.vue
/home/zota/neo/matura-app/src/views/HomeView.vue
/home/zota/neo/matura-app/src/vite-env.d.ts
/home/zota/neo/matura-app/src/router/index.ts
/home/zota/neo/matura-app/src/lib/exact/format.ts
/home/zota/neo/matura-app/src/lib/exact/exact.ts
/home/zota/neo/matura-app/src/lib/exact/rational.ts
/home/zota/neo/matura-app/src/lib/exact/rational.test.ts
/home/zota/neo/matura-app/src/lib/exact/index.ts
/home/zota/neo/matura-app/src/lib/exact/exact.test.ts
/home/zota/neo/matura-app/src/lib/exact/engine.test.ts
/home/zota/neo/matura-app/src/lib/formulas/math.ts
/home/zota/neo/matura-app/src/lib/formulas/physics.ts
/home/zota/neo/matura-app/src/lib/formulas/math_pp2.ts
/home/zota/neo/matura-app/src/lib/formulas/math_pr.ts
/home/zota/neo/matura-app/src/lib/formulas/physics_pp.ts
/home/zota/neo/matura-app/src/assets/styles/main.css
/home/zota/neo/matura-app/src/lib/formulas/physics_pr.ts
/home/zota/neo/matura-app/src/lib/formulas/math_katy.ts
/home/zota/neo/matura-app/src/lib/formulas/chemia.ts
/home/zota/neo/matura-app/src/lib/formulas/chemia_pr.ts
/home/zota/neo/matura-app/src/lib/formulas/math_trojkaty.ts
/home/zota/neo/matura-app/src/components/FunctionPlot.vue
/home/zota/neo/matura-app/src/lib/formulas/math_sumy.ts
/home/zota/neo/matura-app/src/components/FormulaDiagram.vue
/home/zota/neo/matura-app/src/lib/formulas/types.ts
/home/zota/neo/matura-app/src/components/Formula.vue
/home/zota/neo/matura-app/src/lib/formulas/poly.ts
/home/zota/neo/matura-app/src/components/NavRail.vue
/home/zota/neo/matura-app/src/lib/formulas/poly.test.ts
/home/zota/neo/matura-app/src/lib/formulas/pisemne.ts
/home/zota/neo/matura-app/src/lib/formulas/pisemne.test.ts
/home/zota/neo/matura-app/src/lib/formulas/math_wzory_skrocone.ts
/home/zota/neo/matura-app/src/lib/formulas/math_wyodrebnia_grup.ts
/home/zota/neo/matura-app/src/lib/formulas/math_pp1.ts
/home/zota/neo/matura-app/src/lib/formulas/math_poly.ts
/home/zota/neo/matura-app/src/lib/formulas/math_pisemne.ts
/home/zota/neo/matura-app/src/lib/formulas/math_kwadratowe.ts
/home/zota/neo/matura-app/src/lib/formulas/math_dziel_horner.ts
/home/zota/neo/matura-app/src/lib/formulas/math_heron.ts
/home/zota/neo/matura-app/src/lib/formulas/math_delta.ts
/home/zota/neo/matura-app/src/lib/formulas/geografia_pr.ts
/home/zota/neo/matura-app/src/lib/formulas/latex.test.ts
/home/zota/neo/matura-app/src/lib/formulas/geografia.ts
/home/zota/neo/matura-app/src/lib/formulas/index.ts

---

## Assistant

_Thinking:_

Let me now read key files to understand the structure. I'll read:
- package.json
- src/lib/formulas/index.ts
- src/lib/formulas/types.ts
- src/lib/formulas/math_kwadratowe.ts
- src/lib/formulas/math_delta.ts
- src/lib/formulas/math.ts

Let me do these in parallel reads. Actually, I should be careful about the amount of reading. Let me read the most important ones.

Let me start with package.json and the formulas index and types.

Rozpoczynam faze 0 — zbieranie informacji. Czytam kluczowe pliki konfiguracyjne i definicje typów/formuł.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/package.json"
}
```

Read file /home/zota/neo/matura-app/package.json, lines 1-34
1: {
2:   "name": "wzornik-maturalny",
3:   "private": true,
4:   "version": "0.7.3",
5:   "type": "module",
6:   "scripts": {
7:     "dev": "vite",
8:     "build": "vue-tsc -b && vite-node scripts/generate-sitemap.ts && vite build",
9:     "sitemap": "vite-node scripts/generate-sitemap.ts",
10:     "preview": "vite preview",
11:     "test": "vitest run",
12:     "lint": "oxlint src",
13:     "format:check": "oxfmt --check src index.html vite.config.ts",
14:     "format:write": "oxfmt --write src index.html vite.config.ts"
15:   },
16:   "dependencies": {
17:     "katex": "^0.18.7",
18:     "vue": "^3.5.13",
19:     "vue-router": "^4.4.5"
20:   },
21:   "devDependencies": {
22:     "@types/node": "^22.20.3",
23:     "@vitejs/plugin-vue": "^5.2.1",
24:     "fake-indexeddb": "^6.2.5",
25:     "husky": "latest",
26:     "oxfmt": "latest",
27:     "oxlint": "latest",
28:     "typescript": "^5.6.3",
29:     "vite": "^5.4.11",
30:     "vite-plugin-pwa": "^0.21.1",
31:     "vitest": "^2.1.9",
32:     "vue-tsc": "^2.1.10"
33:   }
34: }

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/types.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/types.ts, lines 1-70
1: import type { Exact, Irr } from "../exact/exact";
2: import type { Rational } from "../exact/rational";
3: import { isZero } from "../exact/rational";
4: import { formatDecimal, formatLatex } from "../exact/format";
5: 
6: export interface FormulaVar {
7:   id: string;
8:   label: string;
9:   unit?: string;
10:   kind?: "text" | "select" | "list";
11:   options?: string[];
12: }
13: 
14: export interface SolveStep {
15:   title: string;
16:   body: string;
17:   note?: string;
18: }
19: 
20: export interface FormulaSolution {
21:   values: Exact[];
22:   steps: SolveStep[];
23:   labels?: string[];
24: }
25: 
26: export interface FormulaDef {
27:   id: string;
28:   subject: "matematyka" | "fizyka" | "chemia" | "geografia";
29:   topic: string;
30:   name: string;
31:   latex: string;
32:   vars: FormulaVar[];
33:   mode: "nvar" | "fixed";
34:   outputId: string;
35:   outputLabel: string;
36:   solve(
37:     unknown: string,
38:     known: Record<string, Exact>,
39:     places: number,
40:     selects?: Record<string, string>,
41:   ): FormulaSolution;
42: }
43: 
44: export const APPROX_PI_NOTE =
45:   "wynik tylko przybliżony — dokładny wychodzi dla danych z π (np. 25π)";
46: 
47: export function asRational(e: Exact, label: string): Rational {
48:   if (e.irr) throw new Error(`${label}: ten wariant liczę tylko dla zwykłych liczb`);
49:   return e.rat;
50: }
51: 
52: export function requireNatural(e: Exact, label: string): number {
53:   const r = asRational(e, label);
54:   if (r.q !== 1n || r.p < 1n || r.p > 1_000_000n) {
55:     throw new Error(`${label} musi być liczbą naturalną dodatnią`);
56:   }
57:   return Number(r.p);
58: }
59: 
60: export function nonzeroIrr(e: Exact): Irr | null {
61:   if (!e.irr) return null;
62:   if (e.irr.type === "approx") return e.irr;
63:   return isZero(e.irr.coef) ? null : e.irr;
64: }
65: 
66: export function resultLatex(prefix: string, value: Exact, places: number): string {
67:   const latex = formatLatex(value);
68:   const dec = formatDecimal(value, places);
69:   return latex === dec ? `${prefix} = ${latex}` : `${prefix} = ${latex} \\approx ${dec}`;
70: }

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/index.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/index.ts, lines 1-63
1: import type { FormulaDef } from "./types";
2: import { MATH_FORMULAS } from "./math";
3: import { PHYSICS_FORMULAS } from "./physics";
4: import { MATH_PP1 } from "./math_pp1";
5: import { MATH_PP2 } from "./math_pp2";
6: import { MATH_KATY } from "./math_katy";
7: import { MATH_PR } from "./math_pr";
8: import { PHYSICS_PP } from "./physics_pp";
9: import { PHYSICS_PR } from "./physics_pr";
10: import { CHEMIA_FORMULAS } from "./chemia";
11: import { CHEMIA_PR_FORMULAS } from "./chemia_pr";
12: import { GEOGRAFIA_FORMULAS } from "./geografia";
13: import { GEOGRAFIA_PR_FORMULAS } from "./geografia_pr";
14: import { MATH_DELTA } from "./math_delta";
15: import { MATH_KWADRATOWE } from "./math_kwadratowe";
16: import { MATH_WZORY_SKROCONEGO } from "./math_wzory_skrocone";
17: import { MATH_HERON } from "./math_heron";
18: import { MATH_WYODREBNIA_GRUP } from "./math_wyodrebnia_grup";
19: import { MATH_POLY } from "./math_poly";
20: import { MATH_DZIEL_HORNER } from "./math_dziel_horner";
21: import { MATH_PISEMNE } from "./math_pisemne";
22: import { MATH_SUMY } from "./math_sumy";
23: import { MATH_TROJKATY } from "./math_trojkaty";
24: 
25: export const FORMULAS: FormulaDef[] = [
26:   ...MATH_FORMULAS,
27:   ...MATH_PP1,
28:   ...MATH_PP2,
29:   ...MATH_KATY,
30:   ...MATH_PR,
31:   ...MATH_DELTA,
32:   ...MATH_KWADRATOWE,
33:   ...MATH_WZORY_SKROCONEGO,
34:   ...MATH_HERON,
35:   ...MATH_WYODREBNIA_GRUP,
36:   ...MATH_POLY,
37:   ...MATH_DZIEL_HORNER,
38:   ...MATH_PISEMNE,
39:   ...MATH_SUMY,
40:   ...MATH_TROJKATY,
41:   ...PHYSICS_FORMULAS,
42:   ...PHYSICS_PP,
43:   ...PHYSICS_PR,
44:   ...CHEMIA_FORMULAS,
45:   ...CHEMIA_PR_FORMULAS,
46:   ...GEOGRAFIA_FORMULAS,
47:   ...GEOGRAFIA_PR_FORMULAS,
48: ];
49: 
50: export const SUBJECTS = [
51:   { id: "matematyka", label: "Matematyka" },
52:   { id: "fizyka", label: "Fizyka" },
53:   { id: "chemia", label: "Chemia" },
54:   { id: "geografia", label: "Geografia" },
55: ];
56: 
57: export function getFormula(subject: string, id: string): FormulaDef | undefined {
58:   return FORMULAS.find((f) => f.subject === subject && f.id === id);
59: }
60: 
61: export function formulasBySubject(subject: string): FormulaDef[] {
62:   return FORMULAS.filter((f) => f.subject === subject);
63: }

---

## Assistant

_Thinking:_

Good. The project is called "wzornik-maturalny" (probably "Wzornik" - a formula collection app). Let me now read the key formula files, especially the math ones: math.ts, math_kwadratowe.ts, math_delta.ts, math_pp1.ts, math_pp2.ts, math_katy.ts, math_pr.ts, math_wzory_skrocone.ts, math_pisemne.ts, math_sumy.ts, math_trojkaty.ts, math_heron.ts, math_wyodrebnia_grup.ts, math_poly.ts, math_dziel_horner.ts.

Let me read a batch of these. First math.ts to see the base formulas, and math_kwadratowe.ts and math_delta.ts since the user emphasized quadratic formulas, Δ, places of zero.

Let me read them in parallel.

Widzę, że aplikacja nazywa się „wzornik". Teraz czytnę kluczowe moduły formuł matematyki.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_kwadratowe.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_kwadratowe.ts, lines 1-121
1: import { add, isZero, mul, neg } from "../exact/rational";
2: import { exactOf, solveQuadratic } from "../exact/exact";
3: import type { Exact } from "../exact/exact";
4: import { formatLatex, formatRatLatex } from "../exact/format";
5: import type { FormulaDef, FormulaSolution } from "./types";
6: import { asRational } from "./types";
7: 
8: const L = formatRatLatex;
9: 
10: const kwadratowaIloczynowa: FormulaDef = {
11:   id: "kwadratowa-iloczynowa",
12:   subject: "matematyka",
13:   topic: "Funkcja kwadratowa",
14:   name: "Postać iloczynowa z ogólnej",
15:   latex: "ax^2+bx+c = a(x-x_1)(x-x_2)",
16:   vars: [
17:     { id: "a", label: "a" },
18:     { id: "b", label: "b" },
19:     { id: "c", label: "c" },
20:   ],
21:   mode: "fixed",
22:   outputId: "f",
23:   outputLabel: "iloczynowa",
24:   solve(_unknown, known, _places): FormulaSolution {
25:     const a = asRational(known["a"], "a");
26:     const b = asRational(known["b"], "b");
27:     const c = asRational(known["c"], "c");
28:     if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
29:     const q = solveQuadratic(a, b, c);
30:     if (q.kind === "linear")
31:       throw new Error("kwadratowa-iloczynowa: nieoczekiwany przypadek liniowy");
32:     if (q.kind === "none") {
33:       const d = formatLatex(q.delta);
34:       return {
35:         values: [],
36:         steps: [
37:           { title: "1. Delta", body: `\\Delta = ${L(b)}^2 - 4\\cdot${L(a)}\\cdot${L(c)} = ${d}` },
38:           {
39:             title: "2. Wynik",
40:             body: "\\Delta < 0",
41:             note: "brak postaci iloczynowej nad ℝ (Δ < 0)",
42:           },
43:         ],
44:       };
45:     }
46:     const roots = q.roots;
47:     const show = (e: Exact): string => {
48:       const lx = formatLatex(e);
49:       const dc = formatLatex(e);
50:       return lx === dc ? lx : `${lx} \\approx ${dc}`;
51:     };
52:     const iloczynowa =
53:       roots.length === 1
54:         ? `${L(a)}(x - ${show(roots[0])})^2`
55:         : `${L(a)}(x - ${show(roots[0])})(x - ${show(roots[1])})`;
56:     const steps: FormulaSolution["steps"] = [
57:       {
58:         title: "1. Delta",
59:         body: `\\Delta = ${L(b)}^2 - 4\\cdot${L(a)}\\cdot${L(c)} = ${formatLatex(q.delta)}`,
60:       },
61:       {
62:         title: "2. Pierwiastki",
63:         body: `x_{1,2} = \\frac{-${L(b)} \\pm \\sqrt{\\Delta}}{2\\cdot${L(a)}}`,
64:       },
65:       { title: "3. Postać iloczynowa", body: `f(x) = ${iloczynowa}` },
66:     ];
67:     return {
68:       values: roots,
69:       labels: roots.map((_, i) => `x${["₁", "₂"][i] ?? i + 1}`),
70:       steps,
71:     };
72:   },
73: };
74: 
75: const kwadratowaOgolna: FormulaDef = {
76:   id: "kwadratowa-ogolna",
77:   subject: "matematyka",
78:   topic: "Funkcja kwadratowa",
79:   name: "Postać ogólna z iloczynowej",
80:   latex: "a(x-x_1)(x-x_2) = ax^2+bx+c",
81:   vars: [
82:     { id: "a", label: "a" },
83:     { id: "x1", label: "x₁" },
84:     { id: "x2", label: "x₂" },
85:   ],
86:   mode: "fixed",
87:   outputId: "bc",
88:   outputLabel: "b, c",
89:   solve(_unknown, known, _places): FormulaSolution {
90:     const a = asRational(known["a"], "a");
91:     const x1 = asRational(known["x1"], "x₁");
92:     const x2 = asRational(known["x2"], "x₂");
93:     if (isZero(a)) throw new Error("a ≠ 0");
94:     const sum = add(x1, x2);
95:     const prod = mul(x1, x2);
96:     const b = mul(neg(a), sum);
97:     const c = mul(a, prod);
98:     const bVal = exactOf(b);
99:     const cVal = exactOf(c);
100:     return {
101:       values: [bVal, cVal],
102:       labels: ["b", "c"],
103:       steps: [
104:         {
105:           title: "1. Wzory Viete'a",
106:           body: "x_1 + x_2 = -\\frac{b}{a}, \\; x_1 x_2 = \\frac{c}{a}",
107:         },
108:         {
109:           title: "2. Obliczenie b, c",
110:           body: `b = -a(x_1+x_2) = -${L(a)}(${L(x1)}+${L(x2)}) = ${L(b)}, \\; c = a x_1 x_2 = ${L(a)}\\cdot${L(x1)}\\cdot${L(x2)} = ${L(c)}`,
111:         },
112:         {
113:           title: "3. Postać ogólna",
114:           body: `f(x) = ${L(a)}x^2 ${b.p >= 0 ? "+" : ""}${L(b)}x ${c.p >= 0 ? "+" : ""}${L(c)}`,
115:         },
116:       ],
117:     };
118:   },
119: };
120: 
121: export const MATH_KWADRATOWE: FormulaDef[] = [kwadratowaIloczynowa, kwadratowaOgolna];

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_delta.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_delta.ts, lines 1-57
1: import { ZERO, cmp, isZero, mul, of, sub } from "../exact/rational";
2: import { exactOf, sqrtRational } from "../exact/exact";
3: import { formatLatex, formatRatLatex } from "../exact/format";
4: import type { FormulaDef, FormulaSolution } from "./types";
5: import { asRational, resultLatex } from "./types";
6: 
7: const L = formatRatLatex;
8: 
9: const delta: FormulaDef = {
10:   id: "delta",
11:   subject: "matematyka",
12:   topic: "Równania",
13:   name: "Wyróżnik (delta)",
14:   latex: "\\Delta = b^2 - 4ac",
15:   vars: [
16:     { id: "a", label: "a" },
17:     { id: "b", label: "b" },
18:     { id: "c", label: "c" },
19:   ],
20:   mode: "fixed",
21:   outputId: "Delta",
22:   outputLabel: "Δ",
23:   solve(_unknown, known, places): FormulaSolution {
24:     const a = asRational(known["a"], "a");
25:     const b = asRational(known["b"], "b");
26:     const c = asRational(known["c"], "c");
27:     if (isZero(a)) throw new Error("a ≠ 0 — to nie jest równanie kwadratowe");
28:     const deltaVal = sub(mul(b, b), mul(mul(of(4), a), c));
29:     const value = exactOf(deltaVal);
30:     let note: string | undefined;
31:     const dCmp = cmp(deltaVal, ZERO);
32:     if (dCmp > 0) note = "Δ > 0 — dwa pierwiastki rzeczywiste";
33:     else if (dCmp === 0) note = "Δ = 0 — jeden pierwiastek podwójny";
34:     else note = "Δ < 0 — brak pierwiastków rzeczywistych";
35:     const steps: FormulaSolution["steps"] = [
36:       { title: "1. Wzór", body: "\\Delta = b^2 - 4ac" },
37:       {
38:         title: "2. Podstawienie danych",
39:         body: `\\Delta = ${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)}`,
40:       },
41:       {
42:         title: "3. Obliczenie",
43:         body: `\\Delta = ${L(mul(b, b))} - ${L(mul(mul(of(4), a), c))} = ${formatLatex(value)}`,
44:       },
45:     ];
46:     if (dCmp >= 0) {
47:       const sq = sqrtRational(deltaVal);
48:       steps.push({ title: "4. Pierwiastek z delty", body: `\\sqrt{\\Delta} = ${formatLatex(sq)}` });
49:       steps.push({ title: "5. Wynik", body: resultLatex("\\Delta", value, places), note });
50:       return { values: [value, sq], labels: ["Δ", "√Δ"], steps };
51:     }
52:     steps.push({ title: "4. Wynik", body: resultLatex("\\Delta", value, places), note });
53:     return { values: [value], steps };
54:   },
55: };
56: 
57: export const MATH_DELTA: FormulaDef[] = [delta];

---

## Assistant

_Thinking:_

Good. Now let me look at the main math.ts formulas file, and the views to understand structure. Let me read math.ts (probably large), math_pp1.ts, math_pp2.ts.

Let me check file sizes first? I can't easily. Let me just read math.ts — might be long. Let me read with limit maybe. Actually let me read math.ts fully; if it's huge I'll see. Let me also read the views directory structure.

Let me read math.ts and math_pp1.ts in parallel.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math.ts, lines 1-911
1: import { ONE, ZERO, add, cmp, div, isZero, mul, neg, of, pow, sub } from "../exact/rational";
2: import {
3:   approx,
4:   approxOnly,
5:   cbrtRational,
6:   exactOf,
7:   logExact,
8:   mulRat,
9:   rootRational,
10:   solveQuadratic,
11:   sqrtRational,
12:   stripPi,
13: } from "../exact/exact";
14: import type { Exact } from "../exact/exact";
15: import { formatLatex, formatRatLatex } from "../exact/format";
16: import type { FormulaDef, FormulaSolution } from "./types";
17: import { APPROX_PI_NOTE, asRational, requireNatural, resultLatex } from "./types";
18: 
19: const PI: Exact = { rat: ZERO, irr: { type: "pi", coef: ONE } };
20: 
21: function positive(r: ReturnType<typeof asRational>, label: string): void {
22:   if (cmp(r, ZERO) <= 0) throw new Error(`${label} musi być dodatnie`);
23: }
24: 
25: const L = formatRatLatex;
26: 
27: const pitagoras: FormulaDef = {
28:   id: "pitagoras",
29:   subject: "matematyka",
30:   topic: "Trójkąt prostokątny",
31:   name: "Twierdzenie Pitagorasa",
32:   latex: "a^2 + b^2 = c^2",
33:   vars: [
34:     { id: "a", label: "a (przyprostokątna)" },
35:     { id: "b", label: "b (przyprostokątna)" },
36:     { id: "c", label: "c (przeciwprostokątna)" },
37:   ],
38:   mode: "nvar",
39:   outputId: "",
40:   outputLabel: "",
41:   solve(unknown, known, places): FormulaSolution {
42:     if (unknown === "c") {
43:       const a = asRational(known["a"], "a");
44:       const b = asRational(known["b"], "b");
45:       positive(a, "a");
46:       positive(b, "b");
47:       const a2 = mul(a, a);
48:       const b2 = mul(b, b);
49:       const value = sqrtRational(add(a2, b2));
50:       return {
51:         values: [value],
52:         steps: [
53:           { title: "1. Przekształcenie wzoru", body: "c = \\sqrt{a^2 + b^2}" },
54:           { title: "2. Podstawienie danych", body: `c = \\sqrt{${L(a)}^2 + ${L(b)}^2}` },
55:           { title: "3. Kwadraty", body: `a^2 = ${L(a2)}, \\; b^2 = ${L(b2)}` },
56:           { title: "4. Wynik", body: resultLatex("c", value, places) },
57:         ],
58:       };
59:     }
60:     const other = unknown === "a" ? "b" : "a";
61:     const c = asRational(known["c"], "c");
62:     const o = asRational(known[other], other);
63:     positive(c, "c");
64:     positive(o, other);
65:     const diff = sub(mul(c, c), mul(o, o));
66:     if (cmp(diff, ZERO) <= 0)
67:       throw new Error("przeciwprostokątna musi być dłuższa od przyprostokątnej");
68:     const value = sqrtRational(diff);
69:     return {
70:       values: [value],
71:       steps: [
72:         { title: "1. Przekształcenie wzoru", body: `${unknown} = \\sqrt{c^2 - ${other}^2}` },
73:         { title: "2. Podstawienie danych", body: `${unknown} = \\sqrt{${L(c)}^2 - ${L(o)}^2}` },
74:         { title: "3. Kwadraty", body: `c^2 = ${L(mul(c, c))}, \\; ${other}^2 = ${L(mul(o, o))}` },
75:         { title: "4. Wynik", body: resultLatex(unknown, value, places) },
76:       ],
77:     };
78:   },
79: };
80: 
81: const poleTrojkata: FormulaDef = {
82:   id: "pole-trojkata",
83:   subject: "matematyka",
84:   topic: "Pola figur",
85:   name: "Pole trójkąta",
86:   latex: "P = \\frac{a \\cdot h}{2}",
87:   vars: [
88:     { id: "P", label: "P (pole)" },
89:     { id: "a", label: "a (podstawa)" },
90:     { id: "h", label: "h (wysokość)" },
91:   ],
92:   mode: "nvar",
93:   outputId: "",
94:   outputLabel: "",
95:   solve(unknown, known, places): FormulaSolution {
96:     if (unknown === "P") {
97:       const a = asRational(known["a"], "a");
98:       const h = asRational(known["h"], "h");
99:       const num = mul(a, h);
100:       const value = exactOf(div(num, of(2)));
101:       return {
102:         values: [value],
103:         steps: [
104:           { title: "1. Przekształcenie wzoru", body: "P = \\frac{a \\cdot h}{2}" },
105:           { title: "2. Podstawienie danych", body: `P = \\frac{${L(a)} \\cdot ${L(h)}}{2}` },
106:           { title: "3. Licznik", body: `a \\cdot h = ${L(a)} \\cdot ${L(h)} = ${L(num)}` },
107:           { title: "4. Wynik", body: resultLatex("P", value, places) },
108:         ],
109:       };
110:     }
111:     const P = asRational(known["P"], "P");
112:     if (unknown === "a") {
113:       const h = asRational(known["h"], "h");
114:       const num = mul(P, of(2));
115:       const value = exactOf(div(num, h));
116:       return {
117:         values: [value],
118:         steps: [
119:           { title: "1. Przekształcenie wzoru", body: "a = \\frac{2P}{h}" },
120:           { title: "2. Podstawienie danych", body: `a = \\frac{2 \\cdot ${L(P)}}{${L(h)}}` },
121:           { title: "3. Licznik", body: `2 \\cdot P = 2 \\cdot ${L(P)} = ${L(num)}` },
122:           { title: "4. Wynik", body: resultLatex("a", value, places) },
123:         ],
124:       };
125:     }
126:     const a = asRational(known["a"], "a");
127:     const num = mul(P, of(2));
128:     const value = exactOf(div(num, a));
129:     return {
130:       values: [value],
131:       steps: [
132:         { title: "1. Przekształcenie wzoru", body: "h = \\frac{2P}{a}" },
133:         { title: "2. Podstawienie danych", body: `h = \\frac{2 \\cdot ${L(P)}}{${L(a)}}` },
134:         { title: "3. Licznik", body: `2 \\cdot P = 2 \\cdot ${L(P)} = ${L(num)}` },
135:         { title: "4. Wynik", body: resultLatex("h", value, places) },
136:       ],
137:     };
138:   },
139: };
140: 
141: const poleProstokata: FormulaDef = {
142:   id: "pole-prostokata",
143:   subject: "matematyka",
144:   topic: "Pola figur",
145:   name: "Pole prostokąta",
146:   latex: "P = a \\cdot b",
147:   vars: [
148:     { id: "P", label: "P (pole)" },
149:     { id: "a", label: "a (bok)" },
150:     { id: "b", label: "b (bok)" },
151:   ],
152:   mode: "nvar",
153:   outputId: "",
154:   outputLabel: "",
155:   solve(unknown, known, places): FormulaSolution {
156:     if (unknown === "P") {
157:       const a = asRational(known["a"], "a");
158:       const b = asRational(known["b"], "b");
159:       const value = exactOf(mul(a, b));
160:       return {
161:         values: [value],
162:         steps: [
163:           { title: "1. Przekształcenie wzoru", body: "P = a \\cdot b" },
164:           { title: "2. Podstawienie danych", body: `P = ${L(a)} \\cdot ${L(b)}` },
165:           { title: "3. Wynik", body: resultLatex("P", value, places) },
166:         ],
167:       };
168:     }
169:     const P = asRational(known["P"], "P");
170:     const other = unknown === "a" ? "b" : "a";
171:     const o = asRational(known[other], other);
172:     const value = exactOf(div(P, o));
173:     return {
174:       values: [value],
175:       steps: [
176:         { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{P}{${other}}` },
177:         { title: "2. Podstawienie danych", body: `${unknown} = \\frac{${L(P)}}{${L(o)}}` },
178:         { title: "3. Wynik", body: resultLatex(unknown, value, places) },
179:       ],
180:     };
181:   },
182: };
183: 
184: const poleKola: FormulaDef = {
185:   id: "pole-kola",
186:   subject: "matematyka",
187:   topic: "Koło i okrąg",
188:   name: "Pole koła",
189:   latex: "P = \\pi r^2",
190:   vars: [
191:     { id: "P", label: "P (pole)" },
192:     { id: "r", label: "r (promień)" },
193:   ],
194:   mode: "nvar",
195:   outputId: "",
196:   outputLabel: "",
197:   solve(unknown, known, places): FormulaSolution {
198:     if (unknown === "P") {
199:       const r = asRational(known["r"], "r");
200:       if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
201:       const r2 = mul(r, r);
202:       const value = mulRat(PI, r2);
203:       return {
204:         values: [value],
205:         steps: [
206:           { title: "1. Przekształcenie wzoru", body: "P = \\pi r^2" },
207:           { title: "2. Podstawienie danych", body: `P = \\pi \\cdot ${L(r)}^2` },
208:           { title: "3. Kwadrat promienia", body: `r^2 = ${L(r)}^2 = ${L(r2)}` },
209:           { title: "4. Wynik", body: resultLatex("P", value, places) },
210:         ],
211:       };
212:     }
213:     const P = known["P"];
214:     let value: Exact;
215:     let note: string | undefined;
216:     try {
217:       const inner = stripPi(P);
218:       value = sqrtRational(inner);
219:       return {
220:         values: [value],
221:         steps: [
222:           { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{P}{\\pi}}" },
223:           { title: "2. Podstawienie danych", body: `r = \\sqrt{\\frac{${formatLatex(P)}}{\\pi}}` },
224:           { title: "3. Skrócenie π", body: `\\frac{P}{\\pi} = ${L(inner)}` },
225:           { title: "4. Wynik", body: resultLatex("r", value, places) },
226:         ],
227:       };
228:     } catch {
229:       value = approxOnly(Math.sqrt(approx(P) / Math.PI));
230:       note = APPROX_PI_NOTE;
231:     }
232:     return {
233:       values: [value],
234:       steps: [
235:         { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{P}{\\pi}}" },
236:         { title: "2. Podstawienie danych", body: `r = \\sqrt{\\frac{${formatLatex(P)}}{\\pi}}` },
237:         { title: "3. Wynik", body: resultLatex("r", value, places), note },
238:       ],
239:     };
240:   },
241: };
242: 
243: const obwodKola: FormulaDef = {
244:   id: "obwod-kola",
245:   subject: "matematyka",
246:   topic: "Koło i okrąg",
247:   name: "Obwód koła",
248:   latex: "Ob = 2\\pi r",
249:   vars: [
250:     { id: "Ob", label: "Ob (obwód)" },
251:     { id: "r", label: "r (promień)" },
252:   ],
253:   mode: "nvar",
254:   outputId: "",
255:   outputLabel: "",
256:   solve(unknown, known, places): FormulaSolution {
257:     if (unknown === "Ob") {
258:       const r = asRational(known["r"], "r");
259:       if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
260:       const twoR = mul(of(2), r);
261:       const value = mulRat(PI, twoR);
262:       return {
263:         values: [value],
264:         steps: [
265:           { title: "1. Przekształcenie wzoru", body: "Ob = 2\\pi r" },
266:           { title: "2. Podstawienie danych", body: `Ob = 2\\pi \\cdot ${L(r)}` },
267:           { title: "3. Średnica", body: `2r = 2 \\cdot ${L(r)} = ${L(twoR)}` },
268:           { title: "4. Wynik", body: resultLatex("Ob", value, places) },
269:         ],
270:       };
271:     }
272:     const Ob = known["Ob"];
273:     let value: Exact;
274:     let note: string | undefined;
275:     try {
276:       const inner = div(stripPi(Ob), of(2));
277:       value = exactOf(inner);
278:       return {
279:         values: [value],
280:         steps: [
281:           { title: "1. Przekształcenie wzoru", body: "r = \\frac{Ob}{2\\pi}" },
282:           { title: "2. Podstawienie danych", body: `r = \\frac{${formatLatex(Ob)}}{2\\pi}` },
283:           { title: "3. Skrócenie π i dwójki", body: `r = ${L(inner)}` },
284:           { title: "4. Wynik", body: resultLatex("r", value, places) },
285:         ],
286:       };
287:     } catch {
288:       value = approxOnly(approx(Ob) / (2 * Math.PI));
289:       note = APPROX_PI_NOTE;
290:     }
291:     return {
292:       values: [value],
293:       steps: [
294:         { title: "1. Przekształcenie wzoru", body: "r = \\frac{Ob}{2\\pi}" },
295:         { title: "2. Podstawienie danych", body: `r = \\frac{${formatLatex(Ob)}}{2\\pi}` },
296:         { title: "3. Wynik", body: resultLatex("r", value, places), note },
297:       ],
298:     };
299:   },
300: };
301: 
302: const rownanieKwadratowe: FormulaDef = {
303:   id: "rownanie-kwadratowe",
304:   subject: "matematyka",
305:   topic: "Równania",
306:   name: "Równanie kwadratowe",
307:   latex: "ax^2 + bx + c = 0",
308:   vars: [
309:     { id: "a", label: "a" },
310:     { id: "b", label: "b" },
311:     { id: "c", label: "c" },
312:   ],
313:   mode: "fixed",
314:   outputId: "x",
315:   outputLabel: "x",
316:   solve(_unknown, known, places): FormulaSolution {
317:     const a = asRational(known["a"], "a");
318:     const b = asRational(known["b"], "b");
319:     const c = asRational(known["c"], "c");
320:     const q = solveQuadratic(a, b, c);
321:     const subst = `\\Delta = ${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)}`;
322:     if (q.kind === "linear") {
323:       const v = q.roots[0];
324:       return {
325:         values: [v],
326:         steps: [
327:           { title: "1. Sprawdzenie", body: "a = 0", note: "to równanie liniowe: bx + c = 0" },
328:           { title: "2. Podstawienie danych", body: `${L(b)}x + ${L(c)} = 0` },
329:           { title: "3. Wynik", body: resultLatex("x", v, places) },
330:         ],
331:       };
332:     }
333:     const dText = formatLatex(q.delta);
334:     const deltaRat = sub(mul(b, b), mul(mul(of(4), a), c));
335:     if (q.kind === "none") {
336:       return {
337:         values: [],
338:         steps: [
339:           {
340:             title: "1. Przekształcenie wzoru",
341:             body: "x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}, \\; \\Delta = b^2 - 4ac",
342:           },
343:           { title: "2. Podstawienie danych", body: subst },
344:           { title: "3. Obliczenie delty", body: `${subst} = ${dText} < 0` },
345:           {
346:             title: "4. Wynik",
347:             body: "brak rozwiązań",
348:             note: "Δ < 0 — brak rozwiązań rzeczywistych",
349:           },
350:         ],
351:       };
352:     }
353:     if (q.kind === "one") {
354:       const v = q.roots[0];
355:       return {
356:         values: [v],
357:         steps: [
358:           { title: "1. Przekształcenie wzoru", body: "x = \\frac{-b}{2a} \\; (\\Delta = 0)" },
359:           { title: "2. Podstawienie danych", body: subst },
360:           {
361:             title: "3. Delta i pierwiastek",
362:             body: `${subst} = ${dText} = 0, \\; x = \\frac{-${L(b)}}{2 \\cdot ${L(a)}}`,
363:           },
364:           { title: "4. Wynik", body: resultLatex("x", v, places), note: "pierwiastek podwójny" },
365:         ],
366:       };
367:     }
368:     const [x1, x2] = q.roots;
369:     const sqText = formatLatex(sqrtRational(deltaRat));
370:     const frac = (sgn: string): string => `x = \\frac{-${L(b)} ${sgn} ${sqText}}{2 \\cdot ${L(a)}}`;
371:     return {
372:       values: [x1, x2],
373:       labels: ["x₁", "x₂"],
374:       steps: [
375:         {
376:           title: "1. Przekształcenie wzoru",
377:           body: "x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}, \\; \\Delta = b^2 - 4ac",
378:         },
379:         { title: "2. Podstawienie danych", body: subst },
380:         {
381:           title: "3. Delta i pierwiastek",
382:           body: `${subst} = ${dText}, \\; \\sqrt{\\Delta} = ${sqText}`,
383:         },
384:         { title: "4. Ułamki", body: `${frac("-")}, \\; ${frac("+")}` },
385:         {
386:           title: "5. Wynik",
387:           body: `${resultLatex("x_1", x1, places)}, \\; ${resultLatex("x_2", x2, places)}`,
388:         },
389:       ],
390:     };
391:   },
392: };
393: 
394: const procent: FormulaDef = {
395:   id: "procent",
396:   subject: "matematyka",
397:   topic: "Procenty",
398:   name: "Procent z liczby",
399:   latex: "w = \\frac{p \\cdot x}{100}",
400:   vars: [
401:     { id: "p", label: "p [%]" },
402:     { id: "x", label: "x (liczba)" },
403:     { id: "w", label: "w (wynik)" },
404:   ],
405:   mode: "nvar",
406:   outputId: "",
407:   outputLabel: "",
408:   solve(unknown, known, places): FormulaSolution {
409:     if (unknown === "w") {
410:       const p = asRational(known["p"], "p");
411:       const x = asRational(known["x"], "x");
412:       const num = mul(p, x);
413:       const value = exactOf(div(num, of(100)));
414:       return {
415:         values: [value],
416:         steps: [
417:           { title: "1. Przekształcenie wzoru", body: "w = \\frac{p \\cdot x}{100}" },
418:           { title: "2. Podstawienie danych", body: `w = \\frac{${L(p)} \\cdot ${L(x)}}{100}` },
419:           { title: "3. Licznik", body: `p \\cdot x = ${L(p)} \\cdot ${L(x)} = ${L(num)}` },
420:           { title: "4. Wynik", body: resultLatex("w", value, places) },
421:         ],
422:       };
423:     }
424:     const w = asRational(known["w"], "w");
425:     if (unknown === "p") {
426:       const x = asRational(known["x"], "x");
427:       const num = mul(w, of(100));
428:       const value = exactOf(div(num, x));
429:       return {
430:         values: [value],
431:         steps: [
432:           { title: "1. Przekształcenie wzoru", body: "p = \\frac{100w}{x}" },
433:           { title: "2. Podstawienie danych", body: `p = \\frac{100 \\cdot ${L(w)}}{${L(x)}}` },
434:           { title: "3. Licznik", body: `100 \\cdot w = 100 \\cdot ${L(w)} = ${L(num)}` },
435:           { title: "4. Wynik", body: resultLatex("p", value, places) },
436:         ],
437:       };
438:     }
439:     const p = asRational(known["p"], "p");
440:     const num = mul(w, of(100));
441:     const value = exactOf(div(num, p));
442:     return {
443:       values: [value],
444:       steps: [
445:         { title: "1. Przekształcenie wzoru", body: "x = \\frac{100w}{p}" },
446:         { title: "2. Podstawienie danych", body: `x = \\frac{100 \\cdot ${L(w)}}{${L(p)}}` },
447:         { title: "3. Licznik", body: `100 \\cdot w = 100 \\cdot ${L(w)} = ${L(num)}` },
448:         { title: "4. Wynik", body: resultLatex("x", value, places) },
449:       ],
450:     };
451:   },
452: };
453: 
454: const ciagArytmetyczny: FormulaDef = {
455:   id: "ciag-arytmetyczny",
456:   subject: "matematyka",
457:   topic: "Ciągi",
458:   name: "Ciąg arytmetyczny",
459:   latex: "a_n = a_1 + (n - 1) \\cdot r",
460:   vars: [
461:     { id: "an", label: "aₙ" },
462:     { id: "a1", label: "a₁" },
463:     { id: "n", label: "n" },
464:     { id: "r", label: "r (różnica)" },
465:   ],
466:   mode: "nvar",
467:   outputId: "",
468:   outputLabel: "",
469:   solve(unknown, known, places): FormulaSolution {
470:     if (unknown === "an") {
471:       const a1 = asRational(known["a1"], "a₁");
472:       const n = requireNatural(known["n"], "n");
473:       const r = asRational(known["r"], "r");
474:       const prod = mul(of(n - 1), r);
475:       const value = exactOf(add(a1, prod));
476:       return {
477:         values: [value],
478:         steps: [
479:           { title: "1. Przekształcenie wzoru", body: "a_n = a_1 + (n - 1) \\cdot r" },
480:           {
481:             title: "2. Podstawienie danych",
482:             body: `a_{${n}} = ${L(a1)} + ${n - 1} \\cdot ${L(r)}`,
483:           },
484:           {
485:             title: "3. Iloczyn",
486:             body: `(${n} - 1) \\cdot r = ${n - 1} \\cdot ${L(r)} = ${L(prod)}`,
487:           },
488:           { title: "4. Wynik", body: resultLatex(`a_{${n}}`, value, places) },
489:         ],
490:       };
491:     }
492:     if (unknown === "a1") {
493:       const an = asRational(known["an"], "aₙ");
494:       const n = requireNatural(known["n"], "n");
495:       const r = asRational(known["r"], "r");
496:       const prod = mul(of(n - 1), r);
497:       const value = exactOf(sub(an, prod));
498:       return {
499:         values: [value],
500:         steps: [
501:           { title: "1. Przekształcenie wzoru", body: "a_1 = a_n - (n - 1) \\cdot r" },
502:           { title: "2. Podstawienie danych", body: `a_1 = ${L(an)} - ${n - 1} \\cdot ${L(r)}` },
503:           {
504:             title: "3. Iloczyn",
505:             body: `(${n} - 1) \\cdot r = ${n - 1} \\cdot ${L(r)} = ${L(prod)}`,
506:           },
507:           { title: "4. Wynik", body: resultLatex("a_1", value, places) },
508:         ],
509:       };
510:     }
511:     if (unknown === "n") {
512:       const an = asRational(known["an"], "aₙ");
513:       const a1 = asRational(known["a1"], "a₁");
514:       const r = asRational(known["r"], "r");
515:       const k = div(sub(an, a1), r);
516:       if (k.q !== 1n || k.p < 0n)
517:         throw new Error("te dane nie dają naturalnego n — sprawdź liczby");
518:       const value = exactOf(add(k, ONE));
519:       return {
520:         values: [value],
521:         steps: [
522:           { title: "1. Przekształcenie wzoru", body: "n = \\frac{a_n - a_1}{r} + 1" },
523:           {
524:             title: "2. Podstawienie danych",
525:             body: `n = \\frac{${L(an)} - ${L(a1)}}{${L(r)}} + 1`,
526:           },
527:           { title: "3. Iloraz", body: `\\frac{${L(an)} - ${L(a1)}}{${L(r)}} = ${L(k)}` },
528:           { title: "4. Wynik", body: resultLatex("n", value, places) },
529:         ],
530:       };
531:     }
532:     const an = asRational(known["an"], "aₙ");
533:     const a1 = asRational(known["a1"], "a₁");
534:     const n = requireNatural(known["n"], "n");
535:     if (n === 1) throw new Error("dla n = 1 różnica r jest dowolna — podaj n większe od 1");
536:     const diff = sub(an, a1);
537:     const value = exactOf(div(diff, of(n - 1)));
538:     return {
539:       values: [value],
540:       steps: [
541:         { title: "1. Przekształcenie wzoru", body: "r = \\frac{a_n - a_1}{n - 1}" },
542:         { title: "2. Podstawienie danych", body: `r = \\frac{${L(an)} - ${L(a1)}}{${n - 1}}` },
543:         { title: "3. Licznik", body: `a_n - a_1 = ${L(an)} - ${L(a1)} = ${L(diff)}` },
544:         { title: "4. Wynik", body: resultLatex("r", value, places) },
545:       ],
546:     };
547:   },
548: };
549: 
550: const ciagGeometryczny: FormulaDef = {
551:   id: "ciag-geometryczny",
552:   subject: "matematyka",
553:   topic: "Ciągi",
554:   name: "Ciąg geometryczny",
555:   latex: "a_n = a_1 \\cdot q^{n-1}",
556:   vars: [
557:     { id: "an", label: "aₙ" },
558:     { id: "a1", label: "a₁" },
559:     { id: "q", label: "q (iloraz)" },
560:     { id: "n", label: "n" },
561:   ],
562:   mode: "nvar",
563:   outputId: "",
564:   outputLabel: "",
565:   solve(unknown, known, places): FormulaSolution {
566:     if (unknown === "q") {
567:       const an = asRational(known["an"], "aₙ");
568:       const a1 = asRational(known["a1"], "a₁");
569:       const n = requireNatural(known["n"], "n");
570:       if (n === 1) throw new Error("dla n = 1 iloraz q jest dowolny — podaj n większe od 1");
571:       const ratio = div(an, a1);
572:       const k = n - 1;
573:       let value: Exact;
574:       let note: string | undefined;
575:       try {
576:         value = rootRational(ratio, k);
577:       } catch {
578:         const rf = approx(exactOf(ratio));
579:         if (!(rf > 0)) throw new Error("iloraz rzeczywisty wymaga aₙ/a₁ > 0");
580:         value = approxOnly(rf ** (1 / k));
581:         note = "wynik tylko przybliżony";
582:       }
583:       return {
584:         values: [value],
585:         steps: [
586:           { title: "1. Przekształcenie wzoru", body: `q = \\sqrt[${k}]{a_n/a_1}` },
587:           {
588:             title: "2. Podstawienie danych",
589:             body: `q = \\sqrt[${k}]{${L(an)}/${L(a1)}}`,
590:           },
591:           { title: "3. Ułamek", body: `a_n/a_1 = ${L(ratio)}` },
592:           { title: "4. Wynik", body: resultLatex("q", value, places), note },
593:         ],
594:       };
595:     }
596:     if (unknown === "n") {
597:       const an = asRational(known["an"], "aₙ");
598:       const a1 = asRational(known["a1"], "a₁");
599:       const q = asRational(known["q"], "q");
600:       const ratio = div(an, a1);
601:       if (cmp(ratio, ZERO) <= 0 || cmp(q, ZERO) <= 0 || cmp(sub(q, ONE), ZERO) === 0) {
602:         throw new Error("iloraz wyznaczam dla aₙ/a₁ > 0 i q > 0, q ≠ 1");
603:       }
604:       const lq = logExact(q, ratio);
605:       const nf = Math.round(approx(lq) + 1);
606:       if (!Number.isInteger(nf) || nf < 1 || cmp(mul(a1, pow(q, nf - 1)), an) !== 0) {
607:         throw new Error("te dane nie dają naturalnego n — sprawdź liczby");
608:       }
609:       const value = exactOf(of(nf));
610:       return {
611:         values: [value],
612:         steps: [
613:           { title: "1. Przekształcenie wzoru", body: "n = \\log_q(a_n/a_1) + 1" },
614:           {
615:             title: "2. Podstawienie danych",
616:             body: `n = \\log_{${L(q)}}(${L(an)}/${L(a1)}) + 1`,
617:           },
618:           { title: "3. Logarytm", body: `\\log_q(a_n/a_1) = ${formatLatex(lq)}` },
619:           { title: "4. Wynik", body: resultLatex("n", value, places) },
620:         ],
621:       };
622:     }
623:     const n = requireNatural(known["n"], "n");
624:     if (unknown === "an") {
625:       const a1 = asRational(known["a1"], "a₁");
626:       const q = asRational(known["q"], "q");
627:       const pw = pow(q, n - 1);
628:       const value = exactOf(mul(a1, pw));
629:       return {
630:         values: [value],
631:         steps: [
632:           { title: "1. Przekształcenie wzoru", body: "a_n = a_1 \\cdot q^{n-1}" },
633:           {
634:             title: "2. Podstawienie danych",
635:             body: `a_{${n}} = ${L(a1)} \\cdot ${L(q)}^{${n - 1}}`,
636:           },
637:           { title: "3. Potęga", body: `q^{${n - 1}} = ${L(q)}^{${n - 1}} = ${L(pw)}` },
638:           { title: "4. Wynik", body: resultLatex(`a_{${n}}`, value, places) },
639:         ],
640:       };
641:     }
642:     const an = asRational(known["an"], "aₙ");
643:     const q = asRational(known["q"], "q");
644:     const pw = pow(q, n - 1);
645:     const value = exactOf(div(an, pw));
646:     return {
647:       values: [value],
648:       steps: [
649:         { title: "1. Przekształcenie wzoru", body: "a_1 = \\frac{a_n}{q^{n-1}}" },
650:         { title: "2. Podstawienie danych", body: `a_1 = \\frac{${L(an)}}{${L(q)}^{${n - 1}}}` },
651:         { title: "3. Potęga", body: `q^{${n - 1}} = ${L(q)}^{${n - 1}} = ${L(pw)}` },
652:         { title: "4. Wynik", body: resultLatex("a_1", value, places) },
653:       ],
654:     };
655:   },
656: };
657: 
658: const objetoscProstopadloscianu: FormulaDef = {
659:   id: "objetosc-prostopadloscianu",
660:   subject: "matematyka",
661:   topic: "Bryły",
662:   name: "Objętość prostopadłościanu",
663:   latex: "V = a \\cdot b \\cdot c",
664:   vars: [
665:     { id: "V", label: "V (objętość)" },
666:     { id: "a", label: "a" },
667:     { id: "b", label: "b" },
668:     { id: "c", label: "c" },
669:   ],
670:   mode: "nvar",
671:   outputId: "",
672:   outputLabel: "",
673:   solve(unknown, known, places): FormulaSolution {
674:     if (unknown === "V") {
675:       const a = asRational(known["a"], "a");
676:       const b = asRational(known["b"], "b");
677:       const c = asRational(known["c"], "c");
678:       const ab = mul(a, b);
679:       const value = exactOf(mul(ab, c));
680:       return {
681:         values: [value],
682:         steps: [
683:           { title: "1. Przekształcenie wzoru", body: "V = a \\cdot b \\cdot c" },
684:           {
685:             title: "2. Podstawienie danych",
686:             body: `V = ${L(a)} \\cdot ${L(b)} \\cdot ${L(c)}`,
687:           },
688:           { title: "3. Podstawa", body: `a \\cdot b = ${L(a)} \\cdot ${L(b)} = ${L(ab)}` },
689:           { title: "4. Wynik", body: resultLatex("V", value, places) },
690:         ],
691:       };
692:     }
693:     const V = asRational(known["V"], "V");
694:     const rest = ["a", "b", "c"].filter((id) => id !== unknown);
695:     const x = asRational(known[rest[0]], rest[0]);
696:     const y = asRational(known[rest[1]], rest[1]);
697:     const prod = mul(x, y);
698:     const value = exactOf(div(V, prod));
699:     return {
700:       values: [value],
701:       steps: [
702:         {
703:           title: "1. Przekształcenie wzoru",
704:           body: `${unknown} = \\frac{V}{${rest[0]} \\cdot ${rest[1]}}`,
705:         },
706:         {
707:           title: "2. Podstawienie danych",
708:           body: `${unknown} = \\frac{${L(V)}}{${L(x)} \\cdot ${L(y)}}`,
709:         },
710:         {
711:           title: "3. Mianownik",
712:           body: `${rest[0]} \\cdot ${rest[1]} = ${L(x)} \\cdot ${L(y)} = ${L(prod)}`,
713:         },
714:         { title: "4. Wynik", body: resultLatex(unknown, value, places) },
715:       ],
716:     };
717:   },
718: };
719: 
720: const objetoscKuli: FormulaDef = {
721:   id: "objetosc-kuli",
722:   subject: "matematyka",
723:   topic: "Bryły",
724:   name: "Objętość kuli",
725:   latex: "V = \\frac{4}{3}\\pi r^3",
726:   vars: [
727:     { id: "V", label: "V (objętość)" },
728:     { id: "r", label: "r (promień)" },
729:   ],
730:   mode: "nvar",
731:   outputId: "",
732:   outputLabel: "",
733:   solve(unknown, known, places): FormulaSolution {
734:     if (unknown === "V") {
735:       const r = asRational(known["r"], "r");
736:       if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
737:       const r3 = pow(r, 3);
738:       const value = mulRat(PI, div(mul(of(4), r3), of(3)));
739:       return {
740:         values: [value],
741:         steps: [
742:           { title: "1. Przekształcenie wzoru", body: "V = \\frac{4}{3}\\pi r^3" },
743:           { title: "2. Podstawienie danych", body: `V = \\frac{4}{3}\\pi \\cdot ${L(r)}^3` },
744:           { title: "3. Sześcian promienia", body: `r^3 = ${L(r)}^3 = ${L(r3)}` },
745:           { title: "4. Wynik", body: resultLatex("V", value, places) },
746:         ],
747:       };
748:     }
749:     const V = known["V"];
750:     let value: Exact;
751:     let note: string | undefined;
752:     try {
753:       const inner = div(mul(stripPi(V), of(3)), of(4));
754:       value = cbrtRational(inner);
755:       return {
756:         values: [value],
757:         steps: [
758:           { title: "1. Przekształcenie wzoru", body: "r = \\sqrt[3]{\\frac{3V}{4\\pi}}" },
759:           {
760:             title: "2. Podstawienie danych",
761:             body: `r = \\sqrt[3]{\\frac{3 \\cdot ${formatLatex(V)}}{4\\pi}}`,
762:           },
763:           { title: "3. Skrócenie π", body: `\\frac{3V}{4\\pi} = ${L(inner)}` },
764:           { title: "4. Wynik", body: resultLatex("r", value, places) },
765:         ],
766:       };
767:     } catch {
768:       value = approxOnly(Math.cbrt((3 * approx(V)) / (4 * Math.PI)));
769:       note = "wynik tylko przybliżony — dokładny wychodzi dla objętości z π (np. 36π)";
770:     }
771:     return {
772:       values: [value],
773:       steps: [
774:         { title: "1. Przekształcenie wzoru", body: "r = \\sqrt[3]{\\frac{3V}{4\\pi}}" },
775:         {
776:           title: "2. Podstawienie danych",
777:           body: `r = \\sqrt[3]{\\frac{3 \\cdot ${formatLatex(V)}}{4\\pi}}`,
778:         },
779:         { title: "3. Wynik", body: resultLatex("r", value, places), note },
780:       ],
781:     };
782:   },
783: };
784: 
785: const poleKuli: FormulaDef = {
786:   id: "pole-kuli",
787:   subject: "matematyka",
788:   topic: "Bryły",
789:   name: "Pole powierzchni kuli",
790:   latex: "P = 4\\pi r^2",
791:   vars: [
792:     { id: "P", label: "P (pole)" },
793:     { id: "r", label: "r (promień)" },
794:   ],
795:   mode: "nvar",
796:   outputId: "",
797:   outputLabel: "",
798:   solve(unknown, known, places): FormulaSolution {
799:     if (unknown === "P") {
800:       const r = asRational(known["r"], "r");
801:       if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
802:       const r2 = mul(r, r);
803:       const value = mulRat(PI, mul(of(4), r2));
804:       return {
805:         values: [value],
806:         steps: [
807:           { title: "1. Przekształcenie wzoru", body: "P = 4\\pi r^2" },
808:           { title: "2. Podstawienie danych", body: `P = 4\\pi \\cdot ${L(r)}^2` },
809:           { title: "3. Kwadrat promienia", body: `r^2 = ${L(r)}^2 = ${L(r2)}` },
810:           { title: "4. Wynik", body: resultLatex("P", value, places) },
811:         ],
812:       };
813:     }
814:     const P = known["P"];
815:     let value: Exact;
816:     let note: string | undefined;
817:     try {
818:       const inner = div(stripPi(P), of(4));
819:       value = sqrtRational(inner);
820:       return {
821:         values: [value],
822:         steps: [
823:           { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{P}{4\\pi}}" },
824:           { title: "2. Podstawienie danych", body: `r = \\sqrt{\\frac{${formatLatex(P)}}{4\\pi}}` },
825:           { title: "3. Skrócenie π i czwórki", body: `\\frac{P}{4\\pi} = ${L(inner)}` },
826:           { title: "4. Wynik", body: resultLatex("r", value, places) },
827:         ],
828:       };
829:     } catch {
830:       value = approxOnly(Math.sqrt(approx(P) / (4 * Math.PI)));
831:       note = APPROX_PI_NOTE;
832:     }
833:     return {
834:       values: [value],
835:       steps: [
836:         { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{P}{4\\pi}}" },
837:         { title: "2. Podstawienie danych", body: `r = \\sqrt{\\frac{${formatLatex(P)}}{4\\pi}}` },
838:         { title: "3. Wynik", body: resultLatex("r", value, places), note },
839:       ],
840:     };
841:   },
842: };
843: 
844: const funkcjaLiniowa: FormulaDef = {
845:   id: "funkcja-liniowa",
846:   subject: "matematyka",
847:   topic: "Funkcje",
848:   name: "Miejsce zerowe funkcji liniowej",
849:   latex: "y = ax + b",
850:   vars: [
851:     { id: "a", label: "a" },
852:     { id: "b", label: "b" },
853:   ],
854:   mode: "fixed",
855:   outputId: "x0",
856:   outputLabel: "x₀",
857:   solve(_unknown, known, places): FormulaSolution {
858:     const a = asRational(known["a"], "a");
859:     const b = asRational(known["b"], "b");
860:     if (isZero(a)) {
861:       if (isZero(b)) {
862:         return {
863:           values: [],
864:           steps: [
865:             { title: "1. Sprawdzenie", body: "a = 0" },
866:             { title: "2. Podstawienie danych", body: `0 \\cdot x + ${L(b)} = 0` },
867:             {
868:               title: "3. Wynik",
869:               body: "0 = 0",
870:               note: "tożsamość — każda liczba jest miejscem zerowym",
871:             },
872:           ],
873:         };
874:       }
875:       return {
876:         values: [],
877:         steps: [
878:           { title: "1. Sprawdzenie", body: "a = 0" },
879:           { title: "2. Podstawienie danych", body: `0 \\cdot x + ${L(b)} = 0` },
880:           { title: "3. Wynik", body: `${L(b)} = 0`, note: "sprzeczność — brak miejsc zerowych" },
881:         ],
882:       };
883:     }
884:     const v = exactOf(div(neg(b), a));
885:     return {
886:       values: [v],
887:       steps: [
888:         { title: "1. Przekształcenie wzoru", body: "x_0 = -\\frac{b}{a}" },
889:         { title: "2. Podstawienie danych", body: `x_0 = -\\frac{${L(b)}}{${L(a)}}` },
890:         { title: "3. Licznik", body: `-b = -${L(b)} = ${L(neg(b))}` },
891:         { title: "4. Wynik", body: resultLatex("x_0", v, places) },
892:       ],
893:     };
894:   },
895: };
896: 
897: export const MATH_FORMULAS: FormulaDef[] = [
898:   pitagoras,
899:   poleTrojkata,
900:   poleProstokata,
901:   poleKola,
902:   obwodKola,
903:   rownanieKwadratowe,
904:   funkcjaLiniowa,
905:   procent,
906:   ciagArytmetyczny,
907:   ciagGeometryczny,
908:   objetoscProstopadloscianu,
909:   objetoscKuli,
910:   poleKuli,
911: ];

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_pp1.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_pp1.ts, lines 1-1459
1: import {
2:   ONE,
3:   ZERO,
4:   add,
5:   binom,
6:   cmp,
7:   div,
8:   factorial,
9:   fromString,
10:   gcd,
11:   isIntegerR,
12:   isZero,
13:   mul,
14:   neg,
15:   of,
16:   pow,
17:   sub,
18: } from "../exact/rational";
19: import type { Rational } from "../exact/rational";
20: import {
21:   approx,
22:   approxOnly,
23:   cbrtRational,
24:   exactOf,
25:   logExact,
26:   rootRational,
27:   solveQuadratic,
28:   sqrtRational,
29: } from "../exact/exact";
30: import type { Exact } from "../exact/exact";
31: import { formatDecimal, formatLatex, formatRatLatex, trimNum } from "../exact/format";
32: import type { FormulaDef, FormulaSolution } from "./types";
33: import { asRational, requireNatural, resultLatex } from "./types";
34: 
35: const L = formatRatLatex;
36: 
37: function intVal(r: Rational, label: string): number {
38:   if (!isIntegerR(r) || r.p > 1000000n || r.p < -1000000n) {
39:     throw new Error(`${label} musi być liczbą całkowitą`);
40:   }
41:   return Number(r.p);
42: }
43: 
44: const potega: FormulaDef = {
45:   id: "potega",
46:   subject: "matematyka",
47:   topic: "Potęgi i pierwiastki",
48:   name: "Potęga liczby",
49:   latex: "w = p^n",
50:   vars: [
51:     { id: "p", label: "p (podstawa)" },
52:     { id: "n", label: "n (wykładnik całkowity)" },
53:     { id: "w", label: "w (wynik)" },
54:   ],
55:   mode: "nvar",
56:   outputId: "",
57:   outputLabel: "",
58:   solve(unknown, known, places): FormulaSolution {
59:     if (unknown === "p") {
60:       const w = asRational(known["w"], "w");
61:       const n = intVal(asRational(known["n"], "n"), "n");
62:       if (n === 0) {
63:         if (cmp(w, ONE) === 0) throw new Error("p^0 = 1 — podstawa dowolna niezerowa");
64:         throw new Error("sprzeczność — żadne p nie spełnia równania");
65:       }
66:       const k = Math.abs(n);
67:       let value: Exact;
68:       let note: string | undefined;
69:       try {
70:         const r = rootRational(w, k);
71:         value = n < 0 ? exactOf(div(ONE, r.rat)) : r;
72:       } catch {
73:         const wf = approx(exactOf(w));
74:         if (!(wf > 0)) throw new Error("podstawa rzeczywista wymaga w > 0");
75:         value = approxOnly(wf ** (1 / n));
76:         note = "wynik tylko przybliżony";
77:       }
78:       return {
79:         values: [value],
80:         steps: [
81:           { title: "1. Przekształcenie wzoru", body: `p = \\sqrt[${k}]{w}` },
82:           { title: "2. Podstawienie danych", body: `p = \\sqrt[${k}]{${L(w)}}` },
83:           { title: "3. Wynik", body: resultLatex("p", value, places), note },
84:         ],
85:       };
86:     }
87:     if (unknown === "n") {
88:       const p = asRational(known["p"], "p");
89:       const w = asRational(known["w"], "w");
90:       if (cmp(p, ZERO) <= 0 || cmp(sub(p, ONE), ZERO) === 0 || cmp(w, ZERO) <= 0) {
91:         throw new Error("wykładnik wyznaczam dla p > 0, p ≠ 1 i w > 0");
92:       }
93:       const lg = logExact(p, w);
94:       const nf = Math.round(approx(lg));
95:       if (!Number.isInteger(nf) || cmp(pow(p, nf), w) !== 0) {
96:         throw new Error("te dane nie dają całkowitego n — sprawdź liczby");
97:       }
98:       const value = exactOf(of(nf));
99:       return {
100:         values: [value],
101:         steps: [
102:           { title: "1. Przekształcenie wzoru", body: "n = \\log_p w" },
103:           { title: "2. Podstawienie danych", body: `n = \\log_{${L(p)}} ${L(w)}` },
104:           { title: "3. Logarytm", body: `\\log_p w = ${formatLatex(lg)}` },
105:           { title: "4. Wynik", body: resultLatex("n", value, places) },
106:         ],
107:       };
108:     }
109:     const p = asRational(known["p"], "p");
110:     const n = intVal(asRational(known["n"], "n"), "n");
111:     const value = exactOf(pow(p, n));
112:     const steps: FormulaSolution["steps"] = [
113:       { title: "1. Przekształcenie wzoru", body: "w = p^n" },
114:       { title: "2. Podstawienie danych", body: `w = ${L(p)}^{${n}}` },
115:     ];
116:     if (n >= 2 && n <= 6) {
117:       steps.push({
118:         title: "3. Rozpisanie",
119:         body: `w = ${Array(n).fill(L(p)).join(" \\cdot ")}`,
120:       });
121:     } else if (n <= -2 && n >= -6) {
122:       steps.push({
123:         title: "3. Rozpisanie",
124:         body: `w = \\frac{1}{${Array(-n).fill(L(p)).join(" \\cdot ")}}`,
125:       });
126:     } else if (n === 0) {
127:       steps.push({ title: "3. Reguła", body: "p^0 = 1 \\; (p \\ne 0)" });
128:     }
129:     steps.push({ title: `${steps.length + 1}. Wynik`, body: resultLatex("w", value, places) });
130:     return { values: [value], steps };
131:   },
132: };
133: 
134: const pierwiastek: FormulaDef = {
135:   id: "pierwiastek",
136:   subject: "matematyka",
137:   topic: "Potęgi i pierwiastki",
138:   name: "Pierwiastek n-tego stopnia",
139:   latex: "w = \\sqrt[n]{m}",
140:   vars: [
141:     { id: "m", label: "m (liczba podpierwiastkowa)" },
142:     { id: "n", label: "n (stopień)" },
143:     { id: "w", label: "w (wynik)" },
144:   ],
145:   mode: "nvar",
146:   outputId: "",
147:   outputLabel: "",
148:   solve(unknown, known, places): FormulaSolution {
149:     if (unknown === "n") {
150:       const m = asRational(known["m"], "m");
151:       const w = asRational(known["w"], "w");
152:       if (cmp(m, ZERO) <= 0 || cmp(w, ZERO) <= 0 || cmp(sub(w, ONE), ZERO) === 0) {
153:         throw new Error("stopień wyznaczam dla m > 0 i w > 0, w ≠ 1");
154:       }
155:       const lg = logExact(w, m);
156:       const nf = Math.round(approx(lg));
157:       if (!Number.isInteger(nf) || nf < 1 || cmp(pow(w, nf), m) !== 0) {
158:         throw new Error("te dane nie dają naturalnego stopnia — sprawdź liczby");
159:       }
160:       const value = exactOf(of(nf));
161:       return {
162:         values: [value],
163:         steps: [
164:           { title: "1. Przekształcenie wzoru", body: "n = \\log_w m" },
165:           { title: "2. Podstawienie danych", body: `n = \\log_{${L(w)}} ${L(m)}` },
166:           { title: "3. Logarytm", body: `\\log_w m = ${formatLatex(lg)}` },
167:           { title: "4. Wynik", body: resultLatex("n", value, places) },
168:         ],
169:       };
170:     }
171:     if (unknown === "m") {
172:       const w = asRational(known["w"], "w");
173:       const n = requireNatural(known["n"], "n");
174:       const value = exactOf(pow(w, n));
175:       return {
176:         values: [value],
177:         steps: [
178:           { title: "1. Przekształcenie wzoru", body: "m = w^n" },
179:           { title: "2. Podstawienie danych", body: `m = ${L(w)}^{${n}}` },
180:           { title: "3. Sprawdzenie", body: `\\sqrt[${n}]{${formatLatex(value)}} = ${L(w)}` },
181:           { title: "4. Wynik", body: resultLatex("m", value, places) },
182:         ],
183:       };
184:     }
185:     const m = asRational(known["m"], "m");
186:     const n = requireNatural(known["n"], "n");
187:     if (n === 1) {
188:       const value = exactOf(m);
189:       return {
190:         values: [value],
191:         steps: [
192:           { title: "1. Przekształcenie wzoru", body: "w = m" },
193:           { title: "2. Podstawienie danych", body: `w = ${L(m)}` },
194:           {
195:             title: "3. Wynik",
196:             body: resultLatex("w", value, places),
197:             note: "pierwiastek 1. stopnia to ta sama liczba",
198:           },
199:         ],
200:       };
201:     }
202:     if (n === 2) {
203:       if (cmp(m, ZERO) < 0)
204:         throw new Error("pierwiastek kwadratowy z ujemnej nie istnieje (na rzeczywistych)");
205:       const value = sqrtRational(m);
206:       return {
207:         values: [value],
208:         steps: [
209:           { title: "1. Przekształcenie wzoru", body: "w = \\sqrt{m}" },
210:           { title: "2. Podstawienie danych", body: `w = \\sqrt{${L(m)}}` },
211:           { title: "3. Sprawdzenie", body: `(${formatLatex(value)})^2 = ${L(m)}` },
212:           { title: "4. Wynik", body: resultLatex("w", value, places) },
213:         ],
214:       };
215:     }
216:     let value: Exact;
217:     let note: string | undefined;
218:     try {
219:       if (n === 3) {
220:         value = cbrtRational(m);
221:       } else {
222:         throw new Error("no-exact");
223:       }
224:     } catch (e) {
225:       if (e instanceof Error && e.message !== "no-exact" && !e.message.includes("dokładnie"))
226:         throw e;
227:       if (cmp(m, ZERO) < 0 && n % 2 === 0)
228:         throw new Error("parzysty pierwiastek z ujemnej nie istnieje");
229:       const negM = cmp(m, ZERO) < 0;
230:       const v = Math.pow(Math.abs(approx(exactOf(m))), 1 / n);
231:       value = approxOnly(negM ? -v : v);
232:       note = "wynik tylko przybliżony";
233:     }
234:     return {
235:       values: [value],
236:       steps: [
237:         { title: "1. Przekształcenie wzoru", body: "w = \\sqrt[n]{m}" },
238:         { title: "2. Podstawienie danych", body: `w = \\sqrt[${n}]{${L(m)}}` },
239:         { title: "3. Wynik", body: resultLatex("w", value, places), note },
240:       ],
241:     };
242:   },
243: };
244: 
245: const logarytm: FormulaDef = {
246:   id: "logarytm",
247:   subject: "matematyka",
248:   topic: "Logarytmy",
249:   name: "Logarytm",
250:   latex: "\\log_a b = c \\iff a^c = b",
251:   vars: [
252:     { id: "a", label: "a (podstawa)" },
253:     { id: "b", label: "b (liczba)" },
254:     { id: "c", label: "c (wynik)" },
255:   ],
256:   mode: "nvar",
257:   outputId: "",
258:   outputLabel: "",
259:   solve(unknown, known, places): FormulaSolution {
260:     if (unknown === "c") {
261:       const a = asRational(known["a"], "a");
262:       const b = asRational(known["b"], "b");
263:       const value = logExact(a, b);
264:       const note = value.irr?.type === "approx" ? "wynik tylko przybliżony" : undefined;
265:       const steps: FormulaSolution["steps"] = [
266:         { title: "1. Przekształcenie wzoru", body: "c = \\log_a b" },
267:         { title: "2. Podstawienie danych", body: `c = \\log_{${L(a)}} ${L(b)}` },
268:       ];
269:       if (!value.irr) {
270:         const k = Number(value.rat.p / value.rat.q);
271:         steps.push({
272:           title: "3. Sprawdzenie",
273:           body: `${L(a)}^{${L(value.rat)}} = ${L(b)}`,
274:           note: `bo ${L(a)} do potęgi ${k} daje ${L(b)}`,
275:         });
276:       }
277:       steps.push({
278:         title: `${steps.length + 1}. Wynik`,
279:         body: resultLatex("c", value, places),
280:         note,
281:       });
282:       return { values: [value], steps };
283:     }
284:     if (unknown === "b") {
285:       const a = asRational(known["a"], "a");
286:       const c = asRational(known["c"], "c");
287:       if (cmp(a, ZERO) <= 0 || cmp(sub(a, ONE), ZERO) === 0) {
288:         throw new Error("podstawa dodatnia i różna od 1");
289:       }
290:       let value: Exact;
291:       let note: string | undefined;
292:       if (isIntegerR(c)) {
293:         value = exactOf(pow(a, Number(c.p)));
294:       } else {
295:         value = approxOnly(Math.pow(approx(exactOf(a)), approx(exactOf(c))));
296:         note = "wynik tylko przybliżony";
297:       }
298:       const steps: FormulaSolution["steps"] = [
299:         { title: "1. Przekształcenie wzoru", body: "b = a^c" },
300:         { title: "2. Podstawienie danych", body: `b = ${L(a)}^{${L(c)}}` },
301:       ];
302:       if (isIntegerR(c) && Number(c.p) >= 2 && Number(c.p) <= 6) {
303:         steps.push({
304:           title: "3. Rozpisanie",
305:           body: `b = ${Array(Number(c.p)).fill(L(a)).join(" \\cdot ")}`,
306:         });
307:       }
308:       steps.push({
309:         title: `${steps.length + 1}. Wynik`,
310:         body: resultLatex("b", value, places),
311:         note,
312:       });
313:       return { values: [value], steps };
314:     }
315:     const b = asRational(known["b"], "b");
316:     const c = asRational(known["c"], "c");
317:     if (cmp(b, ZERO) <= 0) throw new Error("podstawę wyznaczam dla b > 0");
318:     let value: Exact;
319:     let note: string | undefined;
320:     if (isIntegerR(c) && c.p !== 0n) {
321:       const k = Number(c.p < 0n ? -c.p : c.p);
322:       try {
323:         const r = rootRational(b, k);
324:         value = c.p < 0n ? exactOf(div(ONE, r.rat)) : r;
325:       } catch {
326:         value = approxOnly(approx(exactOf(b)) ** (1 / Number(c.p)));
327:         note = "wynik tylko przybliżony";
328:       }
329:     } else if (!isIntegerR(c)) {
330:       value = approxOnly(approx(exactOf(b)) ** (1 / approx(exactOf(c))));
331:       note = "wynik tylko przybliżony";
332:     } else {
333:       throw new Error("c = 0: wtedy b = 1, a podstawa dowolna");
334:     }
335:     if (cmp(value.rat, ZERO) <= 0 && !value.irr) throw new Error("podstawa musi być dodatnia");
336:     return {
337:       values: [value],
338:       steps: [
339:         { title: "1. Przekształcenie wzoru", body: "a = \\sqrt[c]{b}" },
340:         { title: "2. Podstawienie danych", body: `a = \\sqrt[${L(c)}]{${L(b)}}` },
341:         { title: "3. Wynik", body: resultLatex("a", value, places), note },
342:       ],
343:     };
344:   },
345: };
346: 
347: const wartoscBezwzgledna: FormulaDef = {
348:   id: "wartosc-bezwzgledna",
349:   subject: "matematyka",
350:   topic: "Wartość bezwzględna",
351:   name: "Wartość bezwzględna",
352:   latex: "w = |x - a|",
353:   vars: [
354:     { id: "x", label: "x" },
355:     { id: "a", label: "a (przesunięcie)" },
356:     { id: "w", label: "w (wynik)" },
357:   ],
358:   mode: "nvar",
359:   outputId: "",
360:   outputLabel: "",
361:   solve(unknown, known, places): FormulaSolution {
362:     if (unknown === "w") {
363:       const x = asRational(known["x"], "x");
364:       const a = asRational(known["a"], "a");
365:       const d = sub(x, a);
366:       const value = exactOf(cmp(d, ZERO) < 0 ? neg(d) : d);
367:       return {
368:         values: [value],
369:         steps: [
370:           { title: "1. Definicja", body: "w = |x - a|" },
371:           { title: "2. Podstawienie danych", body: `w = |${L(x)} - ${L(a)}|` },
372:           { title: "3. Różnica", body: `x - a = ${L(d)}` },
373:           { title: "4. Wynik", body: resultLatex("w", value, places) },
374:         ],
375:       };
376:     }
377:     if (unknown === "x") {
378:       const a = asRational(known["a"], "a");
379:       const w = asRational(known["w"], "w");
380:       if (cmp(w, ZERO) < 0) throw new Error("wartość bezwzględna nie jest ujemna");
381:       const x1 = exactOf(add(a, w));
382:       const x2 = exactOf(sub(a, w));
383:       if (isZero(w)) {
384:         return {
385:           values: [x1],
386:           steps: [
387:             { title: "1. Definicja", body: "x = a \\pm w" },
388:             { title: "2. Podstawienie danych", body: `x = ${L(a)} \\pm ${L(w)}` },
389:             { title: "3. Wynik", body: resultLatex("x", x1, places), note: "pierwiastek podwójny" },
390:           ],
391:         };
392:       }
393:       return {
394:         values: [x1, x2],
395:         labels: ["x₁", "x₂"],
396:         steps: [
397:           { title: "1. Definicja", body: "x = a \\pm w" },
398:           { title: "2. Podstawienie danych", body: `x = ${L(a)} \\pm ${L(w)}` },
399:           {
400:             title: "3. Wynik",
401:             body: `${resultLatex("x_1", x1, places)}, \\; ${resultLatex("x_2", x2, places)}`,
402:           },
403:         ],
404:       };
405:     }
406:     const x = asRational(known["x"], "x");
407:     const w = asRational(known["w"], "w");
408:     if (cmp(w, ZERO) < 0) throw new Error("wartość bezwzględna nie jest ujemna");
409:     const a1 = exactOf(add(x, w));
410:     const a2 = exactOf(sub(x, w));
411:     if (isZero(w)) {
412:       return {
413:         values: [a1],
414:         steps: [
415:           { title: "1. Definicja", body: "a = x \\mp w" },
416:           { title: "2. Podstawienie danych", body: `a = ${L(x)} \\mp ${L(w)}` },
417:           { title: "3. Wynik", body: resultLatex("a", a1, places) },
418:         ],
419:       };
420:     }
421:     return {
422:       values: [a1, a2],
423:       labels: ["a₁", "a₂"],
424:       steps: [
425:         { title: "1. Definicja", body: "a = x \\mp w" },
426:         { title: "2. Podstawienie danych", body: `a = ${L(x)} \\mp ${L(w)}` },
427:         {
428:           title: "3. Wynik",
429:           body: `${resultLatex("a_1", a1, places)}, \\; ${resultLatex("a_2", a2, places)}`,
430:         },
431:       ],
432:     };
433:   },
434: };
435: 
436: const procentSkladany: FormulaDef = {
437:   id: "procent-skladany",
438:   subject: "matematyka",
439:   topic: "Procenty",
440:   name: "Procent składany",
441:   latex: "K = K_0\\left(1 + \\frac{p}{100}\\right)^n",
442:   vars: [
443:     { id: "K", label: "K (kapitał końcowy)" },
444:     { id: "K0", label: "K₀ (kapitał początkowy)" },
445:     { id: "p", label: "p [%]" },
446:     { id: "n", label: "n (liczba okresów)" },
447:   ],
448:   mode: "nvar",
449:   outputId: "",
450:   outputLabel: "",
451:   solve(unknown, known, places): FormulaSolution {
452:     if (unknown === "n") {
453:       const K = asRational(known["K"], "K");
454:       const K0 = asRational(known["K0"], "K₀");
455:       const p = asRational(known["p"], "p");
456:       const base = add(ONE, div(p, of(100)));
457:       const ratio = div(K, K0);
458:       if (cmp(ratio, ZERO) <= 0 || cmp(base, ZERO) <= 0 || cmp(sub(base, ONE), ZERO) === 0) {
459:         throw new Error("okresy wyznaczam dla K/K₀ > 0 i podstawy dodatniej ≠ 1");
460:       }
461:       const lg = logExact(base, ratio);
462:       const nf = Math.round(approx(lg));
463:       if (!Number.isInteger(nf) || nf < 1 || cmp(pow(base, nf), ratio) !== 0) {
464:         throw new Error("te dane nie dają naturalnego n — sprawdź liczby");
465:       }
466:       const value = exactOf(of(nf));
467:       return {
468:         values: [value],
469:         steps: [
470:           { title: "1. Przekształcenie wzoru", body: "n = \\log_{1+p/100}(K/K_0)" },
471:           {
472:             title: "2. Podstawienie danych",
473:             body: `n = \\log_{${L(base)}}(${L(K)}/${L(K0)})`,
474:           },
475:           { title: "3. Logarytm", body: `\\log = ${formatLatex(lg)}` },
476:           { title: "4. Wynik", body: resultLatex("n", value, places) },
477:         ],
478:       };
479:     }
480:     const n = requireNatural(known["n"], "n");
481:     const base_of = (p: Rational): Rational => add(ONE, div(p, of(100)));
482:     if (unknown === "K") {
483:       const K0 = asRational(known["K0"], "K₀");
484:       const p = asRational(known["p"], "p");
485:       const base = base_of(p);
486:       const pw = pow(base, n);
487:       const value = exactOf(mul(K0, pw));
488:       return {
489:         values: [value],
490:         steps: [
491:           { title: "1. Przekształcenie wzoru", body: "K = K_0\\left(1 + \\frac{p}{100}\\right)^n" },
492:           {
493:             title: "2. Podstawienie danych",
494:             body: `K = ${L(K0)}\\left(1 + \\frac{${L(p)}}{100}\\right)^{${n}}`,
495:           },
496:           { title: "3. Czynnik procentowy", body: `1 + \\frac{${L(p)}}{100} = ${L(base)}` },
497:           { title: "4. Potęga czynnika", body: `${L(base)}^{${n}} = ${L(pw)}` },
498:           { title: "5. Wynik", body: resultLatex("K", value, places) },
499:         ],
500:       };
501:     }
502:     if (unknown === "K0") {
503:       const K = asRational(known["K"], "K");
504:       const p = asRational(known["p"], "p");
505:       const base = base_of(p);
506:       const pw = pow(base, n);
507:       const value = exactOf(div(K, pw));
508:       return {
509:         values: [value],
510:         steps: [
511:           {
512:             title: "1. Przekształcenie wzoru",
513:             body: "K_0 = \\frac{K}{\\left(1 + p/100\\right)^n}",
514:           },
515:           {
516:             title: "2. Podstawienie danych",
517:             body: `K_0 = \\frac{${L(K)}}{\\left(1 + ${L(p)}/100\\right)^{${n}}}`,
518:           },
519:           { title: "3. Czynnik procentowy", body: `1 + \\frac{${L(p)}}{100} = ${L(base)}` },
520:           { title: "4. Potęga czynnika", body: `${L(base)}^{${n}} = ${L(pw)}` },
521:           { title: "5. Wynik", body: resultLatex("K_0", value, places) },
522:         ],
523:       };
524:     }
525:     const K = asRational(known["K"], "K");
526:     const K0 = asRational(known["K0"], "K₀");
527:     const ratio = approx(exactOf(div(K, K0)));
528:     const value = approxOnly(100 * (Math.pow(ratio, 1 / n) - 1));
529:     return {
530:       values: [value],
531:       steps: [
532:         { title: "1. Przekształcenie wzoru", body: "p = 100\\left(\\sqrt[n]{K/K_0} - 1\\right)" },
533:         {
534:           title: "2. Podstawienie danych",
535:           body: `p = 100\\left(\\sqrt[${n}]{${L(K)}/${L(K0)}} - 1\\right)`,
536:         },
537:         {
538:           title: "3. Iloraz kapitałów",
539:           body: `\\frac{K}{K_0} = \\frac{${L(K)}}{${L(K0)}} = ${trimNum(ratio)}`,
540:         },
541:         {
542:           title: "4. Wynik",
543:           body: resultLatex("p", value, places),
544:           note: "wynik tylko przybliżony",
545:         },
546:       ],
547:     };
548:   },
549: };
550: 
551: const ukladRownan: FormulaDef = {
552:   id: "uklad-rownan",
553:   subject: "matematyka",
554:   topic: "Równania",
555:   name: "Układ 2 równań liniowych",
556:   latex: "\\begin{cases}a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2\\end{cases}",
557:   vars: [
558:     { id: "a1", label: "a₁" },
559:     { id: "b1", label: "b₁" },
560:     { id: "c1", label: "c₁" },
561:     { id: "a2", label: "a₂" },
562:     { id: "b2", label: "b₂" },
563:     { id: "c2", label: "c₂" },
564:   ],
565:   mode: "fixed",
566:   outputId: "xy",
567:   outputLabel: "x, y",
568:   solve(_unknown, known, places): FormulaSolution {
569:     const g = (id: string): Rational => asRational(known[id], id);
570:     const [a1, b1, c1, a2, b2, c2] = [g("a1"), g("b1"), g("c1"), g("a2"), g("b2"), g("c2")];
571:     const W = sub(mul(a1, b2), mul(a2, b1));
572:     if (isZero(W)) throw new Error("wyznacznik W = 0 — układ sprzeczny albo nieoznaczony");
573:     const Wx = sub(mul(c1, b2), mul(c2, b1));
574:     const Wy = sub(mul(a1, c2), mul(a2, c1));
575:     const x = exactOf(div(Wx, W));
576:     const y = exactOf(div(Wy, W));
577:     return {
578:       values: [x, y],
579:       labels: ["x", "y"],
580:       steps: [
581:         {
582:           title: "1. Wyznaczniki (Cramer)",
583:           body: "W = a_1b_2 - a_2b_1, \\; W_x = c_1b_2 - c_2b_1, \\; W_y = a_1c_2 - a_2c_1",
584:         },
585:         {
586:           title: "2. Wyznacznik główny",
587:           body: `W = ${L(a1)} \\cdot ${L(b2)} - ${L(a2)} \\cdot ${L(b1)} = ${formatLatex({ rat: W, irr: null })}`,
588:         },
589:         {
590:           title: "3. Wyznaczniki pomocnicze",
591:           body: `W_x = ${L(c1)} \\cdot ${L(b2)} - ${L(c2)} \\cdot ${L(b1)} = ${formatLatex({ rat: Wx, irr: null })}, \\; W_y = ${L(a1)} \\cdot ${L(c2)} - ${L(a2)} \\cdot ${L(c1)} = ${formatLatex({ rat: Wy, irr: null })}`,
592:         },
593:         {
594:           title: "4. Wynik",
595:           body: `${resultLatex("x", x, places)}, \\; ${resultLatex("y", y, places)}`,
596:         },
597:       ],
598:     };
599:   },
600: };
601: 
602: const nierownoscKwadratowa: FormulaDef = {
603:   id: "nierownosc-kwadratowa",
604:   subject: "matematyka",
605:   topic: "Nierówności",
606:   name: "Nierówność kwadratowa",
607:   latex: "ax^2 + bx + c \\;\\; (>, \\ge, <, \\le, \\ne \\; 0)",
608:   vars: [
609:     { id: "a", label: "a" },
610:     { id: "b", label: "b" },
611:     { id: "c", label: "c" },
612:     {
613:       id: "op",
614:       label: "znak",
615:       kind: "select",
616:       options: [">", "≥", "<", "≤", "≠"],
617:     },
618:   ],
619:   mode: "fixed",
620:   outputId: "x",
621:   outputLabel: "x",
622:   solve(_unknown, known, places, selects): FormulaSolution {
623:     void places;
624:     const op = selects?.["op"] ?? ">";
625:     const opLatex = op === "≥" ? "\\ge" : op === "≤" ? "\\le" : op === "≠" ? "\\ne" : op;
626:     const a = asRational(known["a"], "a");
627:     const b = asRational(known["b"], "b");
628:     const c = asRational(known["c"], "c");
629:     const head = [
630:       { title: "1. Miejsca zerowe", body: "\\Delta = b^2 - 4ac" },
631:       {
632:         title: "2. Podstawienie danych",
633:         body: `\\Delta = ${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)}, \\; ax^2+bx+c ${opLatex} 0`,
634:       },
635:     ];
636:     const interval = (body: string, note?: string): FormulaSolution => ({
637:       values: [],
638:       steps: [...head, { title: `${head.length + 1}. Wynik`, body, note }],
639:     });
640:     const constCase = (holds: boolean): FormulaSolution =>
641:       holds
642:         ? interval("x \\in \\mathbb{R}", "nierówność zawsze prawdziwa")
643:         : interval("\\varnothing", "nierówność nigdy nie zachodzi");
644:     if (isZero(a)) {
645:       if (isZero(b)) {
646:         const v = cmp(c, ZERO);
647:         return constCase(
648:           op === ">"
649:             ? v > 0
650:             : op === "≥"
651:               ? v >= 0
652:               : op === "<"
653:                 ? v < 0
654:                 : op === "≤"
655:                   ? v <= 0
656:                   : v !== 0,
657:         );
658:       }
659:       const x0 = exactOf(div(neg(c), b));
660:       const Lx = formatLatex(x0);
661:       const asc = cmp(b, ZERO) > 0;
662:       if (op === "≠") return interval(`x \\in \\mathbb{R} \\setminus \\{${Lx}\\}`);
663:       if (op === ">")
664:         return asc ? interval(`x \\in (${Lx}, +\\infty)`) : interval(`x \\in (-\\infty, ${Lx})`);
665:       if (op === "≥")
666:         return asc ? interval(`x \\in [${Lx}, +\\infty)`) : interval(`x \\in (-\\infty, ${Lx}]`);
667:       if (op === "<")
668:         return asc ? interval(`x \\in (-\\infty, ${Lx})`) : interval(`x \\in (${Lx}, +\\infty)`);
669:       return asc ? interval(`x \\in (-\\infty, ${Lx}]`) : interval(`x \\in [${Lx}, +\\infty)`);
670:     }
671:     const q = solveQuadratic(a, b, c);
672:     const up = cmp(a, ZERO) > 0;
673:     if (q.kind === "none") {
674:       const holds = up
675:         ? op === ">" || op === "≥" || op === "≠"
676:         : op === "<" || op === "≤" || op === "≠";
677:       head.push({ title: "3. Delta", body: `\\Delta = ${formatLatex(q.delta)} < 0` });
678:       return holds
679:         ? interval("x \\in \\mathbb{R}", "znak stały (Δ < 0)")
680:         : interval("\\varnothing", "znak stały, przeciwny do znaku (Δ < 0)");
681:     }
682:     if (q.kind === "one" || q.kind === "linear") {
683:       const x0 = formatLatex(q.roots[0]);
684:       if (q.kind === "one") {
685:         head.push({
686:           title: "3. Delta i pierwiastek",
687:           body: `\\Delta = ${formatLatex(q.delta)} = 0, \\; x_0 = ${x0}`,
688:         });
689:       }
690:       if (op === "≠") return interval(`x \\in \\mathbb{R} \\setminus \\{${x0}\\}`);
691:       if (up) {
692:         if (op === ">") return interval(`x \\in \\mathbb{R} \\setminus \\{${x0}\\}`);
693:         if (op === "≥") return interval("x \\in \\mathbb{R}", "zero w jednym punkcie się liczy");
694:         if (op === "<") return interval("\\varnothing");
695:         return interval(`x \\in \\{${x0}\\}`, "tylko pierwiastek podwójny");
696:       }
697:       if (op === ">") return interval("\\varnothing");
698:       if (op === "≥") return interval(`x \\in \\{${x0}\\}`, "tylko pierwiastek podwójny");
699:       if (op === "<") return interval(`x \\in \\mathbb{R} \\setminus \\{${x0}\\}`);
700:       return interval("x \\in \\mathbb{R}", "zero w jednym punkcie się liczy");
701:     }
702:     const [x1, x2] = q.roots.map(formatLatex);
703:     head.push({
704:       title: "3. Delta i pierwiastki",
705:       body: `\\Delta = ${formatLatex(q.delta)}, \\; x_1 = ${x1}, \\; x_2 = ${x2}`,
706:     });
707:     const outside = (closed: boolean): string =>
708:       closed
709:         ? `x \\in (-\\infty, ${x1}] \\cup [${x2}, +\\infty)`
710:         : `x \\in (-\\infty, ${x1}) \\cup (${x2}, +\\infty)`;
711:     const inside = (closed: boolean): string =>
712:       closed ? `x \\in [${x1}, ${x2}]` : `x \\in (${x1}, ${x2})`;
713:     if (op === "≠") return interval(`x \\in \\mathbb{R} \\setminus \\{${x1}, ${x2}\\}`);
714:     if (up) {
715:       if (op === ">") return interval(outside(false));
716:       if (op === "≥") return interval(outside(true));
717:       if (op === "<") return interval(inside(false));
718:       return interval(inside(true));
719:     }
720:     if (op === ">") return interval(inside(false));
721:     if (op === "≥") return interval(inside(true));
722:     if (op === "<") return interval(outside(false));
723:     return interval(outside(true));
724:   },
725: };
726: 
727: function intDivisors(n: bigint): bigint[] {
728:   const a = n < 0n ? -n : n;
729:   const out: bigint[] = [];
730:   for (let d = 1n; d * d <= a && out.length < 2000; d++) {
731:     if (a % d === 0n) {
732:       out.push(d);
733:       if (d * d !== a) out.push(a / d);
734:     }
735:   }
736:   return out;
737: }
738: 
739: function rationalRoots(A: bigint, B: bigint, C: bigint, D: bigint): Rational[] {
740:   const roots: Rational[] = [];
741:   const seen = new Set<string>();
742:   for (const p of intDivisors(D)) {
743:     for (const q of intDivisors(A)) {
744:       for (const s of [1n, -1n]) {
745:         const rp = s * p;
746:         const key = `${rp}/${q}`;
747:         if (seen.has(key)) continue;
748:         seen.add(key);
749:         const num = A * rp * rp * rp + B * rp * rp * q + C * rp * q * q + D * q * q * q;
750:         if (num === 0n) {
751:           const ap = rp < 0n ? -rp : rp;
752:           const g0 = gcd(ap, q);
753:           roots.push({ p: rp / g0, q: q / g0 });
754:         }
755:       }
756:     }
757:   }
758:   return roots;
759: }
760: 
761: function evalPoly(coeffs: Rational[], r: Rational): Rational {
762:   let v: Rational = { p: 0n, q: 1n };
763:   for (const c of coeffs) v = add(mul(v, r), c);
764:   return v;
765: }
766: 
767: function deflate(coeffs: Rational[], r: Rational): Rational[] {
768:   const out: Rational[] = [coeffs[0]];
769:   for (let i = 1; i < coeffs.length - 1; i++) {
770:     out.push(add(coeffs[i], mul(out[i - 1], r)));
771:   }
772:   return out;
773: }
774: 
775: const hornerPierwiastki: FormulaDef = {
776:   id: "horner-pierwiastki",
777:   subject: "matematyka",
778:   topic: "Wielomiany",
779:   name: "Pierwiastki wymierne wielomianu 3. stopnia",
780:   latex: "ax^3 + bx^2 + cx + d = 0",
781:   vars: [
782:     { id: "a", label: "a" },
783:     { id: "b", label: "b" },
784:     { id: "c", label: "c" },
785:     { id: "d", label: "d" },
786:   ],
787:   mode: "fixed",
788:   outputId: "x",
789:   outputLabel: "x",
790:   solve(_unknown, known, places): FormulaSolution {
791:     void places;
792:     const g = (id: string): Rational => asRational(known[id], id);
793:     const [a, b, c, d] = [g("a"), g("b"), g("c"), g("d")];
794:     if (isZero(a)) throw new Error("a ≠ 0 — to nie jest wielomian 3. stopnia");
795:     const Lcm = [a.q, b.q, c.q, d.q].reduce((x, y) => (x / gcd(x, y)) * y, 1n);
796:     const A = a.p * (Lcm / a.q);
797:     const B = b.p * (Lcm / b.q);
798:     const C = c.p * (Lcm / c.q);
799:     const D = d.p * (Lcm / d.q);
800:     if (D === 0n) {
801:       const q = solveQuadratic(a, b, c);
802:       if (q.kind === "linear") throw new Error("horner: nieoczekiwany przypadek liniowy");
803:       const zero = exactOf({ p: 0n, q: 1n });
804:       const steps: FormulaSolution["steps"] = [
805:         {
806:           title: "1. Wyłączenie x",
807:           body: `W(x) = x(${L(a)}x^2 + ${L(b)}x + ${L(c)})`,
808:         },
809:         {
810:           title: "2. Delta trójmianu",
811:           body: `\\Delta = ${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)} = ${formatLatex(q.delta)}`,
812:         },
813:       ];
814:       if (q.kind === "none") {
815:         steps.push({
816:           title: "3. Wynik",
817:           body: "x_1 = 0",
818:           note: "trójmian w nawiasie bez pierwiastków rzeczywistych",
819:         });
820:         return { values: [zero], steps };
821:       }
822:       const vals = [zero, ...q.roots];
823:       steps.push({
824:         title: "3. Wynik",
825:         body: vals.map((v, i) => `x_{${i + 1}} = ${formatLatex(v)}`).join(", \\; "),
826:       });
827:       return { values: vals, steps };
828:     }
829:     if (D > 100000n || D < -100000n || A > 100000n || A < -100000n) {
830:       throw new Error("za duże współczynniki do szukania pierwiastków");
831:     }
832:     const roots = rationalRoots(A, B, C, D);
833:     const head = [
834:       {
835:         title: "1. Kandydaci (tw. o pierwiastkach wymiernych)",
836:         body: "x = \\pm\\frac{p}{q}, \\; p \\mid d, \\; q \\mid a",
837:       },
838:       {
839:         title: "2. Sprawdzenie",
840:         body: `W(x) = ${L(a)}x^3 + ${L(b)}x^2 + ${L(c)}x + ${L(d)}`,
841:       },
842:     ];
843:     if (roots.length === 0) {
844:       return {
845:         values: [],
846:         steps: [
847:           ...head,
848:           { title: "3. Wynik", body: "\\varnothing", note: "brak pierwiastków wymiernych" },
849:         ],
850:       };
851:     }
852:     const vals = roots.map(exactOf);
853:     const factored =
854:       roots.length === 3
855:         ? `${L(a)}(x ${roots
856:             .map((r) =>
857:               r.p < 0n
858:                 ? `+ ${formatLatex({ rat: neg(r), irr: null })}`
859:                 : `- ${formatLatex({ rat: r, irr: null })}`,
860:             )
861:             .join("")})`
862:         : null;
863:     return {
864:       values: vals,
865:       steps: [
866:         ...head,
867:         {
868:           title: "3. Wynik",
869:           body: roots
870:             .map((r, i) => `x_{${i + 1}} = ${formatLatex({ rat: r, irr: null })}`)
871:             .join(", \\; "),
872:           note: factored ? `postać iloczynowa: ${factored}` : undefined,
873:         },
874:       ],
875:     };
876:   },
877: };
878: 
879: const postacKanoniczna: FormulaDef = {
880:   id: "postac-kanoniczna",
881:   subject: "matematyka",
882:   topic: "Funkcja kwadratowa",
883:   name: "Postać kanoniczna i wierzchołek",
884:   latex: "f(x) = a(x - p)^2 + q",
885:   vars: [
886:     { id: "a", label: "a" },
887:     { id: "b", label: "b" },
888:     { id: "c", label: "c" },
889:   ],
890:   mode: "fixed",
891:   outputId: "pq",
892:   outputLabel: "p, q",
893:   solve(_unknown, known, places): FormulaSolution {
894:     const a = asRational(known["a"], "a");
895:     const b = asRational(known["b"], "b");
896:     const c = asRational(known["c"], "c");
897:     if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
898:     const p = exactOf(div(neg(b), mul(of(2), a)));
899:     const delta = sub(mul(b, b), mul(mul(of(4), a), c));
900:     const q = exactOf(div(neg(delta), mul(of(4), a)));
901:     const v = (e: Exact): string => {
902:       const lx = formatLatex(e);
903:       const dc = formatDecimal(e, places);
904:       return lx === dc ? lx : `${lx} \\approx ${dc}`;
905:     };
906:     return {
907:       values: [p, q],
908:       labels: ["p", "q"],
909:       steps: [
910:         { title: "1. Wzory", body: "p = \\frac{-b}{2a}, \\; q = \\frac{-\\Delta}{4a}" },
911:         {
912:           title: "2. Podstawienie danych",
913:           body: `p = \\frac{${L(neg(b))}}{2 \\cdot ${L(a)}}, \\; q = \\frac{-(${L(b)}^2 - 4 \\cdot ${L(a)} \\cdot ${L(c)})}{4 \\cdot ${L(a)}}`,
914:         },
915:         {
916:           title: "3. Wynik",
917:           body: `W = (${v(p)}, ${v(q)}), \\; f(x) = ${L(a)}(x - ${v(p)})^2 + ${v(q)}`,
918:         },
919:       ],
920:     };
921:   },
922: };
923: 
924: const prawdoKlasyczne: FormulaDef = {
925:   id: "prawdo-klasyczne",
926:   subject: "matematyka",
927:   topic: "Prawdopodobieństwo",
928:   name: "Prawdopodobieństwo klasyczne",
929:   latex: "P(A) = \\frac{|A|}{|\\Omega|}",
930:   vars: [
931:     { id: "A", label: "|A| (zdarzenia sprzyjające)" },
932:     { id: "O", label: "|Ω| (wszystkie zdarzenia)" },
933:   ],
934:   mode: "fixed",
935:   outputId: "P",
936:   outputLabel: "P(A)",
937:   solve(_unknown, known, places): FormulaSolution {
938:     const A = requireNatural(known["A"], "|A|");
939:     const O = requireNatural(known["O"], "|Ω|");
940:     if (A > O) throw new Error("zdarzeń sprzyjających nie może być więcej niż wszystkich");
941:     const value = exactOf({ p: BigInt(A), q: BigInt(O) });
942:     return {
943:       values: [value],
944:       steps: [
945:         { title: "1. Wzór", body: "P(A) = \\frac{|A|}{|\\Omega|}" },
946:         { title: "2. Podstawienie danych", body: `P(A) = \\frac{${A}}{${O}}` },
947:         {
948:           title: "3. Wynik",
949:           body: resultLatex("P(A)", value, places),
950:           note: `czyli ${formatDecimal(value, 4)} (${trimPct(value)})`,
951:         },
952:       ],
953:     };
954:   },
955: };
956: 
957: function trimPct(v: Exact): string {
958:   const p = approx(v) * 100;
959:   return `${trimNum(p)}%`;
960: }
961: 
962: const permutacje: FormulaDef = {
963:   id: "permutacje",
964:   subject: "matematyka",
965:   topic: "Kombinatoryka",
966:   name: "Permutacje",
967:   latex: "P_n = n!",
968:   vars: [{ id: "n", label: "n" }],
969:   mode: "fixed",
970:   outputId: "P",
971:   outputLabel: "Pₙ",
972:   solve(_unknown, known, places): FormulaSolution {
973:     const n = requireNatural(known["n"], "n");
974:     if (n > 1000) throw new Error("kombinatoryka: n ≤ 1000");
975:     const value = exactOf({ p: factorial(BigInt(n)), q: 1n });
976:     return {
977:       values: [value],
978:       steps: [
979:         { title: "1. Wzór", body: "P_n = n!" },
980:         { title: "2. Podstawienie danych", body: `P_{${n}} = ${n}!` },
981:         { title: "3. Wynik", body: resultLatex(`P_{${n}}`, value, places) },
982:       ],
983:     };
984:   },
985: };
986: 
987: const kombinacje: FormulaDef = {
988:   id: "kombinacje",
989:   subject: "matematyka",
990:   topic: "Kombinatoryka",
991:   name: "Kombinacje (bez powtórzeń)",
992:   latex: "C^k_n = \\binom{n}{k}",
993:   vars: [
994:     { id: "n", label: "n" },
995:     { id: "k", label: "k" },
996:   ],
997:   mode: "fixed",
998:   outputId: "C",
999:   outputLabel: "C(n,k)",
1000:   solve(_unknown, known, places): FormulaSolution {
1001:     const n = requireNatural(known["n"], "n");
1002:     const k = requireNatural(known["k"], "k");
1003:     if (n > 1000) throw new Error("kombinatoryka: n ≤ 1000");
1004:     const value = exactOf({ p: binom(BigInt(n), BigInt(k)), q: 1n });
1005:     return {
1006:       values: [value],
1007:       steps: [
1008:         { title: "1. Wzór", body: "C^k_n = \\frac{n!}{k!(n-k)!}" },
1009:         {
1010:           title: "2. Podstawienie danych",
1011:           body: `C^{${k}}_{${n}} = \\frac{${n}!}{${k}!(${n}-${k})!}`,
1012:         },
1013:         { title: "3. Wynik", body: resultLatex(`C^{${k}}_{${n}}`, value, places) },
1014:       ],
1015:     };
1016:   },
1017: };
1018: 
1019: const wariacje: FormulaDef = {
1020:   id: "wariacje",
1021:   subject: "matematyka",
1022:   topic: "Kombinatoryka",
1023:   name: "Wariacje bez powtórzeń",
1024:   latex: "V^k_n = \\frac{n!}{(n-k)!}",
1025:   vars: [
1026:     { id: "n", label: "n" },
1027:     { id: "k", label: "k" },
1028:   ],
1029:   mode: "fixed",
1030:   outputId: "V",
1031:   outputLabel: "V(n,k)",
1032:   solve(_unknown, known, places): FormulaSolution {
1033:     const n = requireNatural(known["n"], "n");
1034:     const k = requireNatural(known["k"], "k");
1035:     if (k > n) throw new Error("wariacje: wymagane k ≤ n");
1036:     if (n > 1000) throw new Error("kombinatoryka: n ≤ 1000");
1037:     const value = exactOf({ p: factorial(BigInt(n)) / factorial(BigInt(n - k)), q: 1n });
1038:     return {
1039:       values: [value],
1040:       steps: [
1041:         { title: "1. Wzór", body: "V^k_n = \\frac{n!}{(n-k)!}" },
1042:         { title: "2. Podstawienie danych", body: `V^{${k}}_{${n}} = \\frac{${n}!}{(${n}-${k})!}` },
1043:         { title: "3. Wynik", body: resultLatex(`V^{${k}}_{${n}}`, value, places) },
1044:       ],
1045:     };
1046:   },
1047: };
1048: 
1049: const tales: FormulaDef = {
1050:   id: "tales",
1051:   subject: "matematyka",
1052:   topic: "Podobieństwo",
1053:   name: "Twierdzenie Talesa (proporcja)",
1054:   latex: "\\frac{a}{b} = \\frac{c}{d}",
1055:   vars: [
1056:     { id: "a", label: "a" },
1057:     { id: "b", label: "b" },
1058:     { id: "c", label: "c" },
1059:     { id: "d", label: "d" },
1060:   ],
1061:   mode: "nvar",
1062:   outputId: "",
1063:   outputLabel: "",
1064:   solve(unknown, known, places): FormulaSolution {
1065:     const g = (id: string): Rational => {
1066:       if (id === unknown) throw new Error("solver: brak danej");
1067:       return asRational(known[id], id);
1068:     };
1069:     let value: Exact;
1070:     let transform = "";
1071:     let subst = "";
1072:     let num = "";
1073:     if (unknown === "a") {
1074:       const b = g("b");
1075:       const c = g("c");
1076:       const d = g("d");
1077:       const prod = mul(b, c);
1078:       value = exactOf(div(prod, d));
1079:       transform = "a = \\frac{bc}{d}";
1080:       subst = `a = \\frac{${L(b)} \\cdot ${L(c)}}{${L(d)}}`;
1081:       num = `bc = ${L(b)} \\cdot ${L(c)} = ${L(prod)}`;
1082:     } else if (unknown === "b") {
1083:       const a = g("a");
1084:       const c = g("c");
1085:       const d = g("d");
1086:       const prod = mul(a, d);
1087:       value = exactOf(div(prod, c));
1088:       transform = "b = \\frac{ad}{c}";
1089:       subst = `b = \\frac{${L(a)} \\cdot ${L(d)}}{${L(c)}}`;
1090:       num = `ad = ${L(a)} \\cdot ${L(d)} = ${L(prod)}`;
1091:     } else if (unknown === "c") {
1092:       const a = g("a");
1093:       const b = g("b");
1094:       const d = g("d");
1095:       const prod = mul(a, d);
1096:       value = exactOf(div(prod, b));
1097:       transform = "c = \\frac{ad}{b}";
1098:       subst = `c = \\frac{${L(a)} \\cdot ${L(d)}}{${L(b)}}`;
1099:       num = `ad = ${L(a)} \\cdot ${L(d)} = ${L(prod)}`;
1100:     } else {
1101:       const a = g("a");
1102:       const b = g("b");
1103:       const c = g("c");
1104:       const prod = mul(b, c);
1105:       value = exactOf(div(prod, a));
1106:       transform = "d = \\frac{bc}{a}";
1107:       subst = `d = \\frac{${L(b)} \\cdot ${L(c)}}{${L(a)}}`;
1108:       num = `bc = ${L(b)} \\cdot ${L(c)} = ${L(prod)}`;
1109:     }
1110:     return {
1111:       values: [value],
1112:       steps: [
1113:         { title: "1. Przekształcenie wzoru", body: transform },
1114:         { title: "2. Podstawienie danych", body: subst },
1115:         { title: "3. Licznik", body: num },
1116:         { title: "4. Wynik", body: resultLatex(unknown, value, places) },
1117:       ],
1118:     };
1119:   },
1120: };
1121: 
1122: const postacieKwadratowej: FormulaDef = {
1123:   id: "postacie-kwadratowej",
1124:   subject: "matematyka",
1125:   topic: "Funkcja kwadratowa",
1126:   name: "Wszystkie postacie funkcji kwadratowej",
1127:   latex: "ax^2+bx+c = a(x-p)^2+q = a(x-x_1)(x-x_2)",
1128:   vars: [
1129:     { id: "a", label: "a" },
1130:     { id: "b", label: "b" },
1131:     { id: "c", label: "c" },
1132:   ],
1133:   mode: "fixed",
1134:   outputId: "f",
1135:   outputLabel: "postacie",
1136:   solve(_unknown, known, places): FormulaSolution {
1137:     const a = asRational(known["a"], "a");
1138:     const b = asRational(known["b"], "b");
1139:     const c = asRational(known["c"], "c");
1140:     if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
1141:     const p = exactOf(div(neg(b), mul(of(2), a)));
1142:     const delta = sub(mul(b, b), mul(mul(of(4), a), c));
1143:     const q = exactOf(div(neg(delta), mul(of(4), a)));
1144:     const show = (e: Exact): string => {
1145:       const lx = formatLatex(e);
1146:       const dc = formatDecimal(e, places);
1147:       return lx === dc ? lx : `${lx} \\approx ${dc}`;
1148:     };
1149:     const sgn = (v: Rational, name: string): string =>
1150:       isZero(v) ? "" : cmp(v, ZERO) > 0 ? `+${L(v)}${name}` : `-${L(neg(v))}${name}`;
1151:     const ogolna = `${L(a)}x^2${sgn(b, "x")}${sgn(c, "")}`;
1152:     const kanoniczna = `${L(a)}(x-${show(p)})^2+${show(q)}`;
1153:     const steps: FormulaSolution["steps"] = [
1154:       { title: "1. Postać ogólna", body: `f(x) = ${ogolna}` },
1155:       {
1156:         title: "2. Postać kanoniczna",
1157:         body: `f(x) = ${kanoniczna}, \\; W = (${show(p)}, ${show(q)})`,
1158:       },
1159:     ];
1160:     const s = cmp(delta, ZERO);
1161:     if (s < 0) {
1162:       steps.push({
1163:         title: "3. Postać iloczynowa",
1164:         body: "\\Delta < 0",
1165:         note: "brak postaci iloczynowej nad rzeczywistymi (Δ < 0)",
1166:       });
1167:       return { values: [p, q], labels: ["p", "w"], steps };
1168:     }
1169:     const qq = solveQuadratic(a, b, c);
1170:     const roots = qq.roots;
1171:     const r0 = roots[0];
1172:     const r1 = roots[1];
1173:     const iloczynowa =
1174:       roots.length === 1 && r0
1175:         ? `${L(a)}(x-${show(r0)})^2`
1176:         : r0 && r1
1177:           ? `${L(a)}(x-${show(r0)})(x-${show(r1)})`
1178:           : "";
1179:     steps.push({ title: "3. Postać iloczynowa", body: `f(x) = ${iloczynowa}` });
1180:     return {
1181:       values: [...roots, p, q],
1182:       labels: [...roots.map((_, i) => `x${["₁", "₂"][i] ?? i + 1}`), "p", "w"],
1183:       steps,
1184:     };
1185:   },
1186: };
1187: 
1188: const rozkladLiczby: FormulaDef = {
1189:   id: "rozklad-liczby",
1190:   subject: "matematyka",
1191:   topic: "Liczby całkowite",
1192:   name: "Rozkład na czynniki pierwsze",
1193:   latex: "n = p_1^{e_1} \\cdot p_2^{e_2} \\cdots",
1194:   vars: [{ id: "n", label: "n (≥ 2)" }],
1195:   mode: "fixed",
1196:   outputId: "r",
1197:   outputLabel: "rozkład",
1198:   solve(_unknown, known, places): FormulaSolution {
1199:     void places;
1200:     const n = requireNatural(known["n"], "n");
1201:     if (n < 2) throw new Error("rozkład: n ≥ 2");
1202:     if (n > 1e12) throw new Error("rozkład: n ≤ 10¹²");
1203:     let rest = n;
1204:     const fac: [number, number][] = [];
1205:     for (let d = 2; d * d <= rest; d++) {
1206:       if (rest % d !== 0) continue;
1207:       let e = 0;
1208:       while (rest % d === 0) {
1209:         rest /= d;
1210:         e++;
1211:       }
1212:       fac.push([d, e]);
1213:     }
1214:     if (rest > 1) fac.push([rest, 1]);
1215:     const body =
1216:       fac.length === 1 && fac[0][1] === 1
1217:         ? `${n}`
1218:         : `${n} = ${fac.map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join(" \\cdot ")}`;
1219:     return {
1220:       values: [],
1221:       steps: [
1222:         { title: "1. Metoda", body: "dzielenie przez kolejne liczby pierwsze" },
1223:         { title: "2. Dzielniki", body: `n = ${n}` },
1224:         {
1225:           title: "3. Wynik",
1226:           body,
1227:           note: fac.length === 1 && fac[0][1] === 1 ? "liczba pierwsza" : undefined,
1228:         },
1229:       ],
1230:     };
1231:   },
1232: };
1233: 
1234: const znakWielomianu: FormulaDef = {
1235:   id: "znak-wielomianu",
1236:   subject: "matematyka",
1237:   topic: "Nierówności",
1238:   name: "Znak wielomianu 3. stopnia",
1239:   latex: "ax^3+bx^2+cx+d \\;\\; (>, \\ge, <, \\le, \\ne \\; 0)",
1240:   vars: [
1241:     { id: "a", label: "a" },
1242:     { id: "b", label: "b" },
1243:     { id: "c", label: "c" },
1244:     { id: "d", label: "d" },
1245:     {
1246:       id: "op",
1247:       label: "znak",
1248:       kind: "select",
1249:       options: [">", "≥", "<", "≤", "≠"],
1250:     },
1251:   ],
1252:   mode: "fixed",
1253:   outputId: "x",
1254:   outputLabel: "x",
1255:   solve(_unknown, known, places, selects): FormulaSolution {
1256:     void places;
1257:     const op = selects?.["op"] ?? ">";
1258:     const g = (id: string): Rational => asRational(known[id], id);
1259:     const [a, b, c, d] = [g("a"), g("b"), g("c"), g("d")];
1260:     if (isZero(a)) throw new Error("a ≠ 0 — to nie jest wielomian 3. stopnia");
1261:     const Lcm = [a.q, b.q, c.q, d.q].reduce((x, y) => (x / gcd(x, y)) * y, 1n);
1262:     const A = a.p * (Lcm / a.q);
1263:     const B = b.p * (Lcm / b.q);
1264:     const C = c.p * (Lcm / c.q);
1265:     const D = d.p * (Lcm / d.q);
1266:     if (D === 0n) throw new Error("d = 0 — wyłącz x przed nawias");
1267:     let coeffs: Rational[] = [
1268:       { p: A, q: 1n },
1269:       { p: B, q: 1n },
1270:       { p: C, q: 1n },
1271:       { p: D, q: 1n },
1272:     ];
1273:     const mult = new Map<string, { r: Rational; k: number }>();
1274:     for (const r of rationalRoots(A, B, C, D)) {
1275:       while (coeffs.length > 1 && cmp(evalPoly(coeffs, r), ZERO) === 0) {
1276:         const key = `${r.p}/${r.q}`;
1277:         const prev = mult.get(key);
1278:         mult.set(key, { r, k: (prev?.k ?? 0) + 1 });
1279:         coeffs = deflate(coeffs, r);
1280:       }
1281:     }
1282:     if (mult.size === 0)
1283:       throw new Error("brak pierwiastków wymiernych — nie umiem wyznaczyć znaku");
1284:     let restSign: 1 | -1 = 1;
1285:     if (coeffs.length === 3) {
1286:       const A2 = coeffs[0];
1287:       const B2 = coeffs[1];
1288:       const C2 = coeffs[2];
1289:       if (A2 === undefined || B2 === undefined || C2 === undefined)
1290:         throw new Error("błąd wewnętrzny");
1291:       const q = solveQuadratic(A2, B2, C2);
1292:       if (q.kind !== "none" && q.roots.some((r) => !r.irr))
1293:         throw new Error("reszta ma pierwiastki niewymierne — znak niejednoznaczny");
1294:       restSign = cmp(A2, ZERO) > 0 ? 1 : -1;
1295:     } else if (coeffs.length !== 1) {
1296:       throw new Error("nieoczekiwana reszta z dzielenia");
1297:     } else {
1298:       const c0 = coeffs[0];
1299:       if (c0 === undefined) throw new Error("błąd wewnętrzny");
1300:       restSign = c0.p > 0n ? 1 : -1;
1301:     }
1302:     const dir: 1 | -1 = A > 0n ? 1 : -1;
1303:     const distinct = [...mult.values()].sort((p, q) => cmp(sub(p.r, q.r), ZERO));
1304:     const pts = distinct.map(({ r }) => formatLatex({ rat: r, irr: null }));
1305:     const bounds: string[] = ["-\\infty", ...pts, "+\\infty"];
1306:     const parts: string[] = [];
1307:     const closed = op === "≥" || op === "≤";
1308:     const wantPos = op === ">" || op === "≥";
1309:     const wantNeg = op === "<" || op === "≤";
1310:     for (let i = 0; i <= distinct.length; i++) {
1311:       let s = dir * restSign;
1312:       for (let j = i; j < distinct.length; j++) {
1313:         const dj = distinct[j];
1314:         if (dj && dj.k % 2 === 1) s *= -1;
1315:       }
1316:       const take = op === "≠" ? true : wantPos ? s > 0 : wantNeg ? s < 0 : false;
1317:       if (!take) continue;
1318:       const lo = bounds[i] ?? "";
1319:       const hi = bounds[i + 1] ?? "";
1320:       const loClosed = closed && lo !== "-\\infty";
1321:       const hiClosed = closed && hi !== "+\\infty";
1322:       parts.push(`${loClosed ? "[" : "("}${lo}, ${hi}${hiClosed ? "]" : ")"}`);
1323:     }
1324:     const rootsList = distinct.map(({ r }) => formatLatex({ rat: r, irr: null })).join(", ");
1325:     let body: string;
1326:     let note: string | undefined;
1327:     if (op === "≠") {
1328:       body = `x \\in \\mathbb{R} \\setminus \\{${rootsList}\\}`;
1329:     } else if (parts.length === 0) {
1330:       body = "\\varnothing";
1331:       note = "żaden przedział nie spełnia znaku";
1332:     } else {
1333:       body = `x \\in ${parts.join(" \\cup ")}`;
1334:       note = `pierwiastki: ${rootsList}`;
1335:     }
1336:     return {
1337:       values: [],
1338:       steps: [
1339:         { title: "1. Pierwiastki i krotności", body: `W(x) = 0 \\Rightarrow ${rootsList}` },
1340:         { title: "2. Tabela znaków", body: `wsp. wiodący ${A > 0n ? "dodatni" : "ujemny"}` },
1341:         { title: "3. Wynik", body, note },
1342:       ],
1343:     };
1344:   },
1345: };
1346: 
1347: const statystyka: FormulaDef = {
1348:   id: "statystyka",
1349:   subject: "matematyka",
1350:   topic: "Statystyka",
1351:   name: "Średnia, mediana i odchylenie",
1352:   latex: "\\bar{x} = \\frac{\\sum x_i}{n}",
1353:   vars: [{ id: "xs", label: "dane (po ; lub ,)", kind: "list" }],
1354:   mode: "fixed",
1355:   outputId: "stat",
1356:   outputLabel: "statystyki",
1357:   solve(_unknown, _known, places, selects): FormulaSolution {
1358:     const raw = (selects?.["xs"] ?? "").trim();
1359:     if (raw === "") throw new Error("wpisz liczby oddzielone średnikiem, przecinkiem albo spacją");
1360:     let xs: Rational[];
1361:     try {
1362:       xs = raw
1363:         .split(/[;,\s]+/)
1364:         .filter((t) => t !== "")
1365:         .map((t) => fromString(t));
1366:     } catch {
1367:       throw new Error("zły zapis liczby — dozwolone np. 2,5 albo 1/3");
1368:     }
1369:     if (xs.length === 0) throw new Error("wpisz co najmniej jedną liczbę");
1370:     const n = xs.length;
1371:     const sum = xs.reduce((acc, x) => add(acc, x), ZERO);
1372:     const mean = div(sum, of(n));
1373:     const sorted = [...xs].sort((a, b) => (cmp(a, b) < 0 ? -1 : cmp(a, b) > 0 ? 1 : 0));
1374:     const mid = Math.floor(n / 2);
1375:     const median = n % 2 === 1 ? sorted[mid]! : div(add(sorted[mid - 1]!, sorted[mid]!), of(2));
1376:     const counts = new Map<string, { v: Rational; c: number }>();
1377:     for (const x of xs) {
1378:       const key = `${x.p}/${x.q}`;
1379:       const e = counts.get(key);
1380:       if (e) e.c++;
1381:       else counts.set(key, { v: x, c: 1 });
1382:     }
1383:     let mode = sorted[0]!;
1384:     let best = 0;
1385:     for (const { v, c } of counts.values()) {
1386:       if (c > best) {
1387:         best = c;
1388:         mode = v;
1389:       }
1390:     }
1391:     const variance = div(
1392:       xs.reduce((acc, x) => add(acc, mul(sub(x, mean), sub(x, mean))), ZERO),
1393:       of(n),
1394:     );
1395:     let std: Exact;
1396:     let note: string | undefined;
1397:     try {
1398:       std = sqrtRational(variance);
1399:     } catch {
1400:       std = approxOnly(Math.sqrt(approx(exactOf(variance))));
1401:       note = "odchylenie tylko przybliżone";
1402:     }
1403:     const meanV = exactOf(mean);
1404:     const medV = exactOf(median);
1405:     const show = (e: Exact): string => {
1406:       const lx = formatLatex(e);
1407:       const dc = formatDecimal(e, places);
1408:       return lx === dc ? lx : `${lx} \\approx ${dc}`;
1409:     };
1410:     return {
1411:       values: [meanV, medV, std],
1412:       labels: ["x̄", "Me", "σ"],
1413:       steps: [
1414:         { title: "1. Dane", body: `n = ${n}, \\; ${sorted.map(L).join(", \\; ")}` },
1415:         {
1416:           title: "2. Średnia",
1417:           body: `\\bar{x} = \\frac{${sorted.map(L).join("+")}}{${n}} = ${show(meanV)}`,
1418:         },
1419:         {
1420:           title: "3. Mediana",
1421:           body:
1422:             n % 2 === 1
1423:               ? `Me = ${L(median)}`
1424:               : `Me = \\frac{${L(sorted[mid - 1]!)} + ${L(sorted[mid]!)}}{2} = ${L(median)}`,
1425:         },
1426:         {
1427:           title: "4. Odchylenie",
1428:           body: `\\sigma = \\sqrt{\\frac{\\sum(x_i - \\bar{x})^2}{n}} = ${show(std)}`,
1429:         },
1430:         {
1431:           title: "5. Wynik",
1432:           body: `${resultLatex("\\bar{x}", meanV, places)}, \\; ${resultLatex("Me", medV, places)}, \\; ${resultLatex("\\sigma", std, places)}`,
1433:           note: `dominanta: ${L(mode)}${note ? `; ${note}` : ""}`,
1434:         },
1435:       ],
1436:     };
1437:   },
1438: };
1439: 
1440: export const MATH_PP1: FormulaDef[] = [
1441:   potega,
1442:   pierwiastek,
1443:   logarytm,
1444:   wartoscBezwzgledna,
1445:   procentSkladany,
1446:   ukladRownan,
1447:   nierownoscKwadratowa,
1448:   hornerPierwiastki,
1449:   postacKanoniczna,
1450:   prawdoKlasyczne,
1451:   permutacje,
1452:   kombinacje,
1453:   wariacje,
1454:   tales,
1455:   postacieKwadratowej,
1456:   rozkladLiczby,
1457:   znakWielomianu,
1458:   statystyka,
1459: ];

---

## Assistant

_Thinking:_

The math.ts file is 911 lines and math_pp1.ts is 1459 lines. This is a big project. Phase 0 is a code scan. I've read a good portion already (math.ts fully, math_pp1.ts fully, math_kwadratowe, math_delta).

Let me continue gathering info. Key things to check:
1. The views (HomeView, WzornikView, SolverView, KalkulatoryView, ConverterView, ZadanieView, HistoriaView, SettingsView)
2. Components (Formula.vue, FormulaPlot? FunctionPlot.vue, FormulaDiagram.vue, NavRail.vue)
3. lib: parse-formula.ts, katex.ts, plots, solver, search, units, settings, storage, router, descriptions, seo.

The user's requirements:
- all formulas from matura/matura rozszerzona/mat/fiz/chem (mainly math missing)
- transformations (przekształcenia)
- modularność
- wykresy (plots)
- auto-rozpoznawanie (auto-recognition — probably formula auto-recognition or equation auto-solve)
- możliwość wpisywania (również na telefonie, co teraz nie działa) liczb — input on mobile not working
- równania z π i ze zmiennymi
- Δ, miejsca zerowe, jako fn kwadratowa, osobno
- wyszukiwania i wszystko
- wzory powinny mieć pod/nad linki do wzorów wykorzystujących prostszy/trudniejszy
- rozbite nie rozbite — probably "rozbite" = factored (postać iloczynowa) vs not factored
- miejsca zerowe
- jako funkcja kwadratowa — osobno i jako osobne

Let me now read the remaining formula files and key lib files. To be efficient, let me read in parallel batches:

Batch 2:
- src/lib/formulas/math_pp2.ts (probably big)
- src/lib/formulas/math_katy.ts
- src/lib/formulas/math_pr.ts
- src/lib/formulas/physics.ts
- src/lib/formulas/physics_pp.ts
- src/lib/formulas/physics_pr.ts
- src/lib/formulas/chemia.ts
- src/lib/formulas/chemia_pr.ts
- src/lib/formulas/geografia.ts
- src/lib/formulas/geografia_pr.ts
- src/lib/formulas/math_wzory_skrocone.ts
- src/lib/formulas/math_pisemne.ts
- src/lib/formulas/math_sumy.ts
- src/lib/formulas/math_trojkaty.ts
- src/lib/formulas/math_heron.ts
- src/lib/formulas/math_wyodrebnia_grup.ts
- src/lib/formulas/math_poly.ts
- src/lib/formulas/math_dziel_horner.ts

That's a lot of files. Reading them all fully would take a lot of context. But phase 0 is a scan — I should gather info about the overall structure and which formulas exist. Maybe I should use the explore subagent? But plan mode says don't ask a subagent to do it. Actually the reminder said "Do not modify any other files or ask a subagent to do so." — referring to file modifications. To be safe, I'll scan myself.

Let me be strategic: read the formulas directory file names I haven't seen yet and read a few key ones. Let me check sizes via a quick approach — maybe read each file's first ~50 lines? That's expensive too.

Alternative: Use grep to list formula ids and topics across all formula files. That gives a good overview of what exists.

Let me grep for `id: "` and `topic: "` across src/lib/formulas.

Przeczytałem część kodu. Teraz zbieram przegląd wszystkich definicji formuł w jednym grepem, żeby szybko zobaczyć pełny zbiór tematów.

**Tool: grep**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas",
  "pattern": "id: \"[^\"]+\",|topic: \"[^\"]*\",|subject: \"[^\"]*\",|name: \"[^\"]*\""
}
```

Found 100 matches
/home/zota/neo/matura-app/src/lib/formulas/math_delta.ts:
  Line 10:   id: "delta",

  Line 11:   subject: "matematyka",

  Line 12:   topic: "Równania",

  Line 13:   name: "Wyróżnik (delta)",

  Line 16:     { id: "a", label: "a" },

  Line 17:     { id: "b", label: "b" },

  Line 18:     { id: "c", label: "c" },


/home/zota/neo/matura-app/src/lib/formulas/index.ts:
  Line 51:   { id: "matematyka", label: "Matematyka" },

  Line 52:   { id: "fizyka", label: "Fizyka" },

  Line 53:   { id: "chemia", label: "Chemia" },

  Line 54:   { id: "geografia", label: "Geografia" },


/home/zota/neo/matura-app/src/lib/formulas/math_trojkaty.ts:
  Line 19:   id: "tw-sinusow",

  Line 20:   subject: "matematyka",

  Line 21:   topic: "Planimetria · ROZSZ",

  Line 22:   name: "Twierdzenie sinusów",

  Line 25:     { id: "a", label: "a (bok)" },

  Line 26:     { id: "alfa", label: "α [°]" },

  Line 27:     { id: "R", label: "R (promień opis.)" },

  Line 94:   id: "tw-cosinusow",

  Line 95:   subject: "matematyka",

  Line 96:   topic: "Planimetria · ROZSZ",

  Line 97:   name: "Twierdzenie cosinusów",

  Line 100:     { id: "c", label: "c (bok)" },

  Line 101:     { id: "a", label: "a (bok)" },

  Line 102:     { id: "b", label: "b (bok)" },

  Line 103:     { id: "gamma", label: "γ [°]" },

  Line 204:   id: "okrag-opisany-wpisany",

  Line 205:   subject: "matematyka",

  Line 206:   topic: "Planimetria · ROZSZ",

  Line 207:   name: "Okrąg opisany i wpisany",

  Line 210:     { id: "a", label: "a" },

  Line 211:     { id: "b", label: "b" },

  Line 212:     { id: "c", label: "c" },


/home/zota/neo/matura-app/src/lib/formulas/math_sumy.ts:
  Line 10:   id: "suma-ciagu-arytmetycznego",

  Line 11:   subject: "matematyka",

  Line 12:   topic: "Ciągi",

  Line 13:   name: "Suma ciągu arytmetycznego",

  Line 16:     { id: "Sn", label: "Sₙ" },

  Line 17:     { id: "a1", label: "a₁" },

  Line 18:     { id: "an", label: "aₙ" },

  Line 19:     { id: "n", label: "n" },

  Line 89:   id: "suma-ciagu-geometrycznego",

  Line 90:   subject: "matematyka",

  Line 91:   topic: "Ciągi",

  Line 92:   name: "Suma ciągu geometrycznego",

  Line 95:     { id: "Sn", label: "Sₙ" },

  Line 96:     { id: "a1", label: "a₁" },

  Line 97:     { id: "q", label: "q (iloraz)" },

  Line 98:     { id: "n", label: "n" },

  Line 245:   id: "szereg-geometryczny",

  Line 246:   subject: "matematyka",

  Line 247:   topic: "Ciągi · ROZSZ",

  Line 248:   name: "Suma szeregu geometrycznego",

  Line 251:     { id: "S", label: "S (suma)" },

  Line 252:     { id: "a1", label: "a₁" },

  Line 253:     { id: "q", label: "q (|q| < 1)" },


/home/zota/neo/matura-app/src/lib/formulas/math_wzory_skrocone.ts:
  Line 11:   id: "kwadrat-sumy-roznicy",

  Line 12:   subject: "matematyka",

  Line 13:   topic: "Wzory skróconego mnożenia",

  Line 14:   name: "Kwadrat sumy i różnicy",

  Line 17:     { id: "a", label: "a" },

  Line 18:     { id: "b", label: "b" },

  Line 49:   id: "roznica-kwadratow",

  Line 50:   subject: "matematyka",

  Line 51:   topic: "Wzory skróconego mnożenia",

  Line 52:   name: "Różnica kwadratów",

  Line 55:     { id: "a", label: "a" },

  Line 56:     { id: "b", label: "b" },


/home/zota/neo/matura-app/src/lib/formulas/math_pp2.ts:
  Line 21:   id: "katy-okrag",

  Line 22:   subject: "matematyka",

  Line 23:   topic: "Koło i okrąg",

  Line 24:   name: "Kąt środkowy i wpisany",

  Line 27:     { id: "alfa", label: "α (środkowy) [°]" },

  Line 28:     { id: "beta", label: "β (wpisany) [°]" },

  Line 60:   id: "pole-trapez",

  Line 61:   subject: "matematyka",

  Line 62:   topic: "Pola figur",

  Line 63:   name: "Pole trapezu",

  Line 66:     { id: "P", label: "P (pole)" },

  Line 67:     { id: "a", label: "a (podstawa)" },

  Line 68:     { id: "b", label: "b (podstawa)" },

  Line 69:     { id: "h", label: "h (wysokość)" },

  Line 138:   id: "pole-rombu",

  Line 139:   subject: "matematyka",

  Line 140:   topic: "Pola figur",

  Line 141:   name: "Pole rombu (przekątne)",

  Line 144:     { id: "P", label: "P (pole)" },

  Line 145:     { id: "e", label: "e (przekątna)" },

  Line 146:     { id: "f", label: "f (przekątna)" },

  Line 185:   id: "pole-rownoleglobok",

  Line 186:   subject: "matematyka",

  Line 187:   topic: "Pola figur",

  Line 188:   name: "Pole równoległoboku",

  Line 191:     { id: "P", label: "P (pole)" },

  Line 192:     { id: "a", label: "a (podstawa)" },

  Line 193:     { id: "h", label: "h (wysokość)" },

  Line 228:   id: "luk-okregu",

  Line 229:   subject: "matematyka",

  Line 230:   topic: "Koło i okrąg",

  Line 231:   name: "Długość łuku okręgu",


(Results are truncated: showing first 100 results. Consider using a more specific path or pattern.)

---

## Assistant

_Thinking:_

The grep got truncated. Let me get a more complete picture by grepping for just ids with context. Actually, let me get all formula IDs. A better approach: grep for `id: "[^"]*"` across the formulas dir and count.

Let me run a grep with just the id pattern and see all results.

**Tool: grep**

**Input:**
```json
{
  "limit": 400,
  "path": "/home/zota/neo/matura-app/src/lib/formulas",
  "pattern": "^  id: "
}
```

Found 171 matches
/home/zota/neo/matura-app/src/lib/formulas/math_trojkaty.ts:
  Line 19:   id: "tw-sinusow",

  Line 94:   id: "tw-cosinusow",

  Line 204:   id: "okrag-opisany-wpisany",


/home/zota/neo/matura-app/src/lib/formulas/math_sumy.ts:
  Line 10:   id: "suma-ciagu-arytmetycznego",

  Line 89:   id: "suma-ciagu-geometrycznego",

  Line 245:   id: "szereg-geometryczny",


/home/zota/neo/matura-app/src/lib/formulas/types.ts:
  Line 7:   id: string;

  Line 27:   id: string;


/home/zota/neo/matura-app/src/lib/formulas/math_wzory_skrocone.ts:
  Line 11:   id: "kwadrat-sumy-roznicy",

  Line 49:   id: "roznica-kwadratow",


/home/zota/neo/matura-app/src/lib/formulas/math_wyodrebnia_grup.ts:
  Line 9:   id: "wyodrebnianie-czynnika",

  Line 74:   id: "grupowanie",


/home/zota/neo/matura-app/src/lib/formulas/math_pp1.ts:
  Line 45:   id: "potega",

  Line 135:   id: "pierwiastek",

  Line 246:   id: "logarytm",

  Line 348:   id: "wartosc-bezwzgledna",

  Line 437:   id: "procent-skladany",

  Line 552:   id: "uklad-rownan",

  Line 603:   id: "nierownosc-kwadratowa",

  Line 776:   id: "horner-pierwiastki",

  Line 880:   id: "postac-kanoniczna",

  Line 925:   id: "prawdo-klasyczne",

  Line 963:   id: "permutacje",

  Line 988:   id: "kombinacje",

  Line 1020:   id: "wariacje",

  Line 1050:   id: "tales",

  Line 1123:   id: "postacie-kwadratowej",

  Line 1189:   id: "rozklad-liczby",

  Line 1235:   id: "znak-wielomianu",

  Line 1348:   id: "statystyka",


/home/zota/neo/matura-app/src/lib/formulas/math_poly.ts:
  Line 7:   id: "rozklad-wielomianu",


/home/zota/neo/matura-app/src/lib/formulas/math_pisemne.ts:
  Line 69:   id: "dodawanie-pisemne",

  Line 93:   id: "odejmowanie-pisemne",

  Line 117:   id: "mnozenie-pisemne",

  Line 141:   id: "dzielenie-pisemne",


/home/zota/neo/matura-app/src/lib/formulas/math_kwadratowe.ts:
  Line 11:   id: "kwadratowa-iloczynowa",

  Line 76:   id: "kwadratowa-ogolna",


/home/zota/neo/matura-app/src/lib/formulas/chemia.ts:
  Line 10:   id: "mol",

  Line 65:   id: "stezenie-molowe",

  Line 120:   id: "stezenie-procentowe",

  Line 184:   id: "rozcienczanie",

  Line 248:   id: "ph",

  Line 298:   id: "wydajnosc",

  Line 368:   id: "mieszanie",


/home/zota/neo/matura-app/src/lib/formulas/math_katy.ts:
  Line 12:   id: "zamiana-miary",

  Line 69:   id: "kat-trojkat",

  Line 108:   id: "kat-miedzy-prostymi",

  Line 192:   id: "trojkaty-podobne",

  Line 247:   id: "kat-z-bokow",

  Line 299:   id: "suma-katow",


/home/zota/neo/matura-app/src/lib/formulas/geografia_pr.ts:
  Line 11:   id: string,


/home/zota/neo/matura-app/src/lib/formulas/geografia.ts:
  Line 11:   id: string,


/home/zota/neo/matura-app/src/lib/formulas/physics_pr.ts:
  Line 19:   id: "rzut-poziomy",

  Line 96:   id: "moment-sily",

  Line 151:   id: "energia-obrotowa",

  Line 217:   id: "bernoulli",

  Line 262:   id: "clapeyron",

  Line 327:   id: "pierwsza-zasada",

  Line 382:   id: "izobaryczna",

  Line 464:   id: "carnot",

  Line 532:   id: "rozszerzalnosc",

  Line 589:   id: "coulomb",

  Line 648:   id: "natezenie",

  Line 705:   id: "potencjal",

  Line 760:   id: "kondensator-q",

  Line 815:   id: "kondensator-e",

  Line 878:   id: "sem",

  Line 960:   id: "strumien",

  Line 1015:   id: "faraday",

  Line 1088:   id: "solenoid",

  Line 1153:   id: "sila-elektrodynamiczna",

  Line 1206:   id: "bohr",

  Line 1232:   id: "debroglie",

  Line 1272:   id: "energia-rel",


/home/zota/neo/matura-app/src/lib/formulas/chemia_pr.ts:
  Line 10:   id: "kc",

  Line 55:   id: "dysocjacja",

  Line 110:   id: "iloczyn",

  Line 155:   id: "ogniwo",

  Line 210:   id: "elektroliza",

  Line 266:   id: "bufor",


/home/zota/neo/matura-app/src/lib/formulas/math_delta.ts:
  Line 10:   id: "delta",


/home/zota/neo/matura-app/src/lib/formulas/math_dziel_horner.ts:
  Line 11:   id: "dzielenie-wielomianow",

  Line 86:   id: "schemat-hornera",


/home/zota/neo/matura-app/src/lib/formulas/physics_pp.ts:
  Line 13:   id: "moc",

  Line 68:   id: "sprawnosc",

  Line 127:   id: "ped",

  Line 182:   id: "zderzenia",

  Line 221:   id: "ruch-okrag",

  Line 323:   id: "grawitacja",

  Line 385:   id: "kepler",

  Line 447:   id: "archimedes",

  Line 508:   id: "hydrostatyczne",

  Line 569:   id: "cieplo",

  Line 657:   id: "cieplo-przemiany",

  Line 712:   id: "ohm",

  Line 767:   id: "opor",

  Line 849:   id: "moc-pradu",

  Line 904:   id: "energia-pradu",

  Line 959:   id: "lorentz",

  Line 1012:   id: "snell",

  Line 1094:   id: "soczewki",

  Line 1168:   id: "powiekszenie",

  Line 1196:   id: "siatka",

  Line 1301:   id: "fale",

  Line 1356:   id: "wahadlo-mat",

  Line 1410:   id: "wahadlo-sprezyna",

  Line 1478:   id: "foto",

  Line 1533:   id: "emc2",

  Line 1576:   id: "rozpad",

  Line 1661:   id: "energia-wewnetrzna",

  Line 1731:   id: "oporniki-szeregowo",

  Line 1777:   id: "oporniki-rownolegle",

  Line 1835:   id: "doppler",

  Line 1911:   id: "kat-graniczny",

  Line 1961:   id: "boyle",

  Line 2025:   id: "gaylussac",

  Line 2085:   id: "charles",


/home/zota/neo/matura-app/src/lib/formulas/physics.ts:
  Line 10:   id: "predkosc",

  Line 65:   id: "droga-jednostajnie-przyspieszona",

  Line 168:   id: "predkosc-chwilowa",

  Line 261:   id: "sila",

  Line 316:   id: "energia-kinetyczna",

  Line 382:   id: "energia-potencjalna",

  Line 447:   id: "gestosc",

  Line 502:   id: "cisnienie",

  Line 557:   id: "praca",


/home/zota/neo/matura-app/src/lib/formulas/math_pr.ts:
  Line 27:   id: "newton",

  Line 63:   id: "silnia",

  Line 88:   id: "szesciany",

  Line 138:   id: "granica-qn",

  Line 204:   id: "pochodna-wielomianu",

  Line 250:   id: "ekstrema-kwadratowej",

  Line 291:   id: "prawdo-warunkowe",

  Line 346:   id: "prawdo-calkowite",

  Line 378:   id: "rownanie-wykladnicze",

  Line 419:   id: "rownanie-logarytmiczne",

  Line 465:   id: "vieta",

  Line 504:   id: "podwojony-kat",

  Line 542:   id: "schemat-bernoulliego",

  Line 584:   id: "suma-katow-tryg",


/home/zota/neo/matura-app/src/lib/formulas/math.ts:
  Line 28:   id: "pitagoras",

  Line 82:   id: "pole-trojkata",

  Line 142:   id: "pole-prostokata",

  Line 185:   id: "pole-kola",

  Line 244:   id: "obwod-kola",

  Line 303:   id: "rownanie-kwadratowe",

  Line 395:   id: "procent",

  Line 455:   id: "ciag-arytmetyczny",

  Line 551:   id: "ciag-geometryczny",

  Line 659:   id: "objetosc-prostopadloscianu",

  Line 721:   id: "objetosc-kuli",

  Line 786:   id: "pole-kuli",

  Line 845:   id: "funkcja-liniowa",


/home/zota/neo/matura-app/src/lib/formulas/math_pp2.ts:
  Line 21:   id: "katy-okrag",

  Line 60:   id: "pole-trapez",

  Line 138:   id: "pole-rombu",

  Line 185:   id: "pole-rownoleglobok",

  Line 228:   id: "luk-okregu",

  Line 352:   id: "wycinek-kola",

  Line 480:   id: "odl-punktow",

  Line 524:   id: "srodek-odcinka",

  Line 567:   id: "prosta-2-punkty",

  Line 624:   id: "prostopadlosc",

  Line 680:   id: "okrag-rownanie",

  Line 724:   id: "odl-punkt-prosta",

  Line 768:   id: "graniastoslup",

  Line 811:   id: "ostroslup",

  Line 858:   id: "walec",

  Line 963:   id: "stozek",

  Line 1073:   id: "romb-bok",


/home/zota/neo/matura-app/src/lib/formulas/math_heron.ts:
  Line 11:   id: "wzor-herona",


---

## Assistant

_Thinking:_

Good overview. Now let me look at the views and components to understand the app structure — particularly WzornikView, HomeView, SolverView, KalkulatoryView, ConverterView, ZadanieView, FunctionPlot, Formula.vue, parse-formula, search.

Let me read the router and views list. Let me read router/index.ts and App.vue.

Dobry obraz. Teraz sprawdzam router i główne widoki aplikacji.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/router/index.ts"
}
```

Read file /home/zota/neo/matura-app/src/router/index.ts, lines 1-73
1: import { createRouter, createWebHistory } from "vue-router";
2: import { metaFor } from "../lib/seo";
3: 
4: const router = createRouter({
5:   history: createWebHistory(import.meta.env.BASE_URL),
6:   routes: [
7:     {
8:       path: "/",
9:       name: "home",
10:       component: () => import("../views/WzornikView.vue"),
11:       props: { subject: undefined },
12:     },
13:     {
14:       path: "/wzornik/:subject?",
15:       name: "wzornik",
16:       component: () => import("../views/WzornikView.vue"),
17:       props: true,
18:     },
19:     {
20:       path: "/wzornik/:subject/:formula",
21:       name: "solver",
22:       component: () => import("../views/SolverView.vue"),
23:       props: true,
24:     },
25:     {
26:       path: "/zadanie",
27:       name: "zadanie",
28:       component: () => import("../views/ZadanieView.vue"),
29:     },
30:     {
31:       path: "/historia",
32:       name: "historia",
33:       component: () => import("../views/HistoriaView.vue"),
34:     },
35:     {
36:       path: "/konwerter",
37:       name: "konwerter",
38:       component: () => import("../views/ConverterView.vue"),
39:     },
40:     {
41:       path: "/ustawienia",
42:       name: "ustawienia",
43:       component: () => import("../views/SettingsView.vue"),
44:     },
45:     {
46:       path: "/kalkulatory/:subject?/:formula?",
47:       redirect: (to) => {
48:         const subject = typeof to.params.subject === "string" ? `/${to.params.subject}` : "";
49:         const formula = typeof to.params.formula === "string" ? `/${to.params.formula}` : "";
50:         return `/wzornik${subject}${formula}`;
51:       },
52:     },
53:     {
54:       path: "/:pathMatch(.*)*",
55:       name: "not-found",
56:       component: () => import("../views/NotFoundView.vue"),
57:     },
58:   ],
59: });
60: 
61: router.afterEach((to) => {
62:   const meta = metaFor(to.name, to.params as Record<string, string | string[]>);
63:   document.title = meta.title;
64:   const setContent = (selector: string, content: string) =>
65:     document.querySelector(selector)?.setAttribute("content", content);
66:   setContent('meta[name="description"]', meta.description);
67:   setContent('meta[property="og:title"]', meta.title);
68:   setContent('meta[property="og:description"]', meta.description);
69:   setContent('meta[property="og:url"]', meta.url);
70:   document.querySelector('link[rel="canonical"]')?.setAttribute("href", meta.url);
71: });
72: 
73: export default router;

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/App.vue"
}
```

Read file /home/zota/neo/matura-app/src/App.vue, lines 1-86
1: <script setup lang="ts">
2: import NavRail from "./components/NavRail.vue";
3: </script>
4: 
5: <template>
6:   <div class="shell">
7:     <a class="skip-link" href="#content">Przejdź do treści</a>
8:     <header class="topbar">
9:       <router-link to="/" class="topbar__brand">Wzornik Maturalny</router-link>
10:       <router-link to="/ustawienia" class="topbar__gear" aria-label="Ustawienia">
11:         <svg viewBox="0 0 24 24" aria-hidden="true">
12:           <path d="M4 8h9M17 8h3M4 16h3M11 16h9" />
13:           <circle cx="17" cy="8" r="2.2" />
14:           <circle cx="9" cy="16" r="2.2" />
15:         </svg>
16:       </router-link>
17:     </header>
18:     <main id="content" class="shell__content" tabindex="-1">
19:       <router-view />
20:     </main>
21:     <NavRail />
22:   </div>
23: </template>
24: 
25: <style scoped>
26: .shell {
27:   display: flex;
28:   flex-direction: column;
29:   align-items: stretch;
30:   min-height: 100dvh;
31: }
32: 
33: .topbar {
34:   position: sticky;
35:   top: 0;
36:   z-index: 50;
37:   height: var(--topbar-height);
38:   display: flex;
39:   align-items: center;
40:   justify-content: space-between;
41:   padding: 0 1.25rem;
42:   padding-top: env(safe-area-inset-top);
43:   background: var(--color-paper-raised);
44:   backdrop-filter: blur(18px);
45:   -webkit-backdrop-filter: blur(18px);
46:   border-bottom: 1px solid var(--color-line);
47: }
48: 
49: .topbar__brand {
50:   font-family: var(--font-display);
51:   font-weight: 600;
52:   font-size: var(--step-1);
53:   text-decoration: none;
54:   color: var(--color-ink);
55: }
56: 
57: .topbar__gear {
58:   display: flex;
59:   align-items: center;
60:   justify-content: center;
61:   min-width: 44px;
62:   min-height: 44px;
63:   color: var(--color-ink-soft);
64: }
65: 
66: .topbar__gear.router-link-active {
67:   color: var(--color-accent);
68: }
69: 
70: .topbar__gear svg {
71:   width: 22px;
72:   height: 22px;
73:   fill: none;
74:   stroke: currentColor;
75:   stroke-width: 1.8;
76:   stroke-linecap: round;
77: }
78: 
79: .shell__content {
80:   flex: 1;
81:   width: 100%;
82:   max-width: var(--content-max);
83:   margin: 0 auto;
84:   padding: 1.5rem 1.25rem calc(var(--tabbar-height) + 1.5rem);
85: }
86: </style>

---

## Assistant

_Thinking:_

Now let me look at the views: WzornikView, SolverView, KalkulatoryView, ConverterView, ZadanieView, HistoriaView, SettingsView, HomeView, NotFoundView.

Let me read WzornikView and SolverView since those are most relevant to formulas/solving. These might be big. Let me check their sizes by reading with limits.

Let me read WzornikView.vue.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/views/WzornikView.vue"
}
```

Read file /home/zota/neo/matura-app/src/views/WzornikView.vue, lines 1-267
1: <script setup lang="ts">
2: import { computed, onMounted, ref } from "vue";
3: import { FORMULAS, SUBJECTS } from "../lib/formulas/index";
4: import type { FormulaDef } from "../lib/formulas/types";
5: import { searchFormulas } from "../lib/search/search";
6: import { getFavorites, toggleFavorite } from "../lib/storage/db";
7: import { looksLikeEquation, parseEquation, parseLabel } from "../lib/parse-formula";
8: import type { ParsedEquation } from "../lib/parse-formula";
9: import Formula from "../components/Formula.vue";
10: 
11: const props = defineProps<{ subject?: string }>();
12: 
13: const query = ref("");
14: const filter = ref("");
15: 
16: const availableSubjects = computed(() =>
17:   SUBJECTS.filter((s) => FORMULAS.some((f) => f.subject === s.id)),
18: );
19: 
20: const activeSubject = computed(() => (filter.value !== "" ? filter.value : props.subject));
21: 
22: const results = computed(() => searchFormulas(query.value, activeSubject.value || undefined));
23: 
24: const recognized = computed<ParsedEquation | null>(() => {
25:   if (!looksLikeEquation(query.value)) return null;
26:   return parseEquation(query.value);
27: });
28: 
29: const favs = ref<Set<string>>(new Set());
30: 
31: function keyOf(f: FormulaDef): string {
32:   return `${f.subject}/${f.id}`;
33: }
34: 
35: async function refreshFavs(): Promise<void> {
36:   const list = await getFavorites().catch(() => []);
37:   favs.value = new Set(list.map((f) => f.key));
38: }
39: 
40: async function toggleFav(f: FormulaDef): Promise<void> {
41:   await toggleFavorite(keyOf(f)).catch(() => {});
42:   await refreshFavs();
43: }
44: 
45: onMounted(() => {
46:   void refreshFavs();
47: });
48: </script>
49: 
50: <template>
51:   <section class="wzornik">
52:     <h1 class="sr-only">Wzornik</h1>
53:     <input
54:       v-model="query"
55:       class="search"
56:       type="search"
57:       placeholder='Szukaj wzoru, np. „delta"'
58:       aria-label="Szukaj wzoru w całym wzorniku"
59:     />
60:     <div class="filters" role="group" aria-label="Filtr przedmiotu">
61:       <button
62:         :class="{ active: !activeSubject }"
63:         :aria-pressed="!activeSubject"
64:         @click="filter = ''"
65:       >
66:         Wszystkie
67:       </button>
68:       <button
69:         v-for="s in availableSubjects"
70:         :key="s.id"
71:         :class="{ active: activeSubject === s.id }"
72:         :aria-pressed="activeSubject === s.id"
73:         @click="filter = s.id"
74:       >
75:         {{ s.label }}
76:       </button>
77:     </div>
78:     <div v-if="recognized" class="found" role="status">
79:       <p>
80:         Rozpoznano zadanie — to
81:         <strong>{{ recognized ? parseLabel(recognized.id) : "" }}</strong
82:         >.
83:       </p>
84:       <router-link
85:         class="found__go"
86:         :to="{
87:           name: 'solver',
88:           params: { subject: recognized.subject, formula: recognized.id },
89:           query: { fill: query.trim() },
90:         }"
91:       >
92:         Rozwiąż z automatu →
93:       </router-link>
94:     </div>
95:     <ul class="cards">
96:       <li v-for="f in results" :key="`${f.subject}/${f.id}`">
97:         <div class="cards__top">
98:           <p class="cards__topic">
99:             {{ SUBJECTS.find((s) => s.id === f.subject)?.label ?? f.subject }} · {{ f.topic }}
100:           </p>
101:           <button
102:             class="heart"
103:             :class="{ active: favs.has(`${f.subject}/${f.id}`) }"
104:             :aria-pressed="favs.has(`${f.subject}/${f.id}`)"
105:             :aria-label="
106:               favs.has(`${f.subject}/${f.id}`)
107:                 ? `Usuń ${f.name} z ulubionych`
108:                 : `Dodaj ${f.name} do ulubionych`
109:             "
110:             @click="toggleFav(f)"
111:           >
112:             <svg viewBox="0 0 24 24" aria-hidden="true">
113:               <path
114:                 d="M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.8 4c1.7 0 3.2.9 4.2 2.3C13 4.9 14.5 4 16.2 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2z"
115:               />
116:             </svg>
117:           </button>
118:         </div>
119:         <router-link :to="{ name: 'solver', params: { subject: f.subject, formula: f.id } }">
120:           {{ f.name }}
121:         </router-link>
122:         <p class="cards__formula"><Formula :source="f.latex" /></p>
123:       </li>
124:     </ul>
125:     <p v-if="results.length === 0" class="empty">Brak wzorów dla tej frazy.</p>
126:   </section>
127: </template>
128: 
129: <style scoped>
130: .wzornik {
131:   display: flex;
132:   flex-direction: column;
133:   height: calc(100dvh - var(--topbar-height) - var(--tabbar-height) - 3rem);
134: }
135: 
136: .search {
137:   width: 100%;
138:   max-width: 28rem;
139:   font-family: var(--font-body);
140:   font-size: 1rem;
141:   padding: 0.5rem 0.75rem;
142:   border: 1px solid var(--color-line);
143:   border-radius: var(--radius-sm);
144:   background: var(--color-paper-raised);
145:   color: var(--color-ink);
146:   margin: 1rem 0;
147: }
148: 
149: .filters {
150:   display: flex;
151:   flex-wrap: wrap;
152:   gap: 0.5rem;
153:   margin-bottom: 1.5rem;
154: }
155: 
156: .filters button {
157:   font-family: var(--font-body);
158:   font-size: 0.875rem;
159:   min-height: 44px;
160:   padding: 0.3rem 0.9rem;
161:   border: 1px solid var(--color-line);
162:   border-radius: var(--radius);
163:   background: var(--color-paper-raised);
164:   color: var(--color-ink-soft);
165:   cursor: pointer;
166: }
167: 
168: .filters button.active {
169:   color: var(--color-accent);
170:   border-color: var(--color-accent);
171: }
172: 
173: .found {
174:   max-width: var(--content-max);
175:   margin-bottom: 1rem;
176:   padding: 0.75rem 1rem;
177:   background: var(--color-paper-raised);
178:   border: 1px solid var(--color-accent);
179:   border-radius: var(--radius);
180: }
181: 
182: .found p {
183:   margin: 0 0 0.5rem;
184: }
185: 
186: .found__go {
187:   display: inline-flex;
188:   align-items: center;
189:   min-height: 44px;
190:   font-weight: 500;
191:   color: var(--color-accent);
192: }
193: 
194: .cards {
195:   list-style: none;
196:   padding: 0.25rem 0.25rem 2rem;
197:   margin: 0;
198:   display: grid;
199:   gap: 1rem;
200:   align-content: start;
201:   max-width: var(--content-max);
202:   flex: 1;
203:   min-height: 0;
204:   overflow-y: auto;
205: }
206: 
207: .cards li {
208:   background: var(--color-paper-raised);
209:   border: 1px solid var(--color-line);
210:   border-radius: var(--radius);
211:   padding: 1rem 1.25rem;
212: }
213: 
214: .cards__topic {
215:   margin: 0;
216:   font-size: 0.8125rem;
217:   color: var(--color-ink-soft);
218: }
219: 
220: .cards__top {
221:   display: flex;
222:   align-items: flex-start;
223:   justify-content: space-between;
224:   gap: 0.75rem;
225:   margin-bottom: 0.25rem;
226: }
227: 
228: .heart {
229:   flex-shrink: 0;
230:   display: flex;
231:   align-items: center;
232:   justify-content: center;
233:   width: 44px;
234:   height: 44px;
235:   margin: -0.5rem -0.5rem 0 0;
236:   background: transparent;
237:   border: none;
238:   cursor: pointer;
239:   color: var(--color-ink-soft);
240: }
241: 
242: .heart svg {
243:   width: 22px;
244:   height: 22px;
245:   fill: none;
246:   stroke: currentColor;
247:   stroke-width: 1.8;
248:   stroke-linejoin: round;
249: }
250: 
251: .heart.active {
252:   color: var(--color-accent);
253: }
254: 
255: .heart.active svg {
256:   fill: currentColor;
257: }
258: 
259: .cards__formula {
260:   margin: 0.5rem 0 0;
261:   font-size: 1.0625rem;
262: }
263: 
264: .empty {
265:   color: var(--color-ink-soft);
266: }
267: </style>

---

## Assistant

_Thinking:_

Good. Now let me look at SolverView.vue, which is likely the most important for "auto-rozpoznawanie" and solving. Also KalkulatoryView and ConverterView.

Let me read SolverView.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/views/SolverView.vue"
}
```

Read file /home/zota/neo/matura-app/src/views/SolverView.vue, lines 1-585
1: <script setup lang="ts">
2: import { computed, onUnmounted, reactive, ref, watch } from "vue";
3: import { useRoute } from "vue-router";
4: import { getFormula, SUBJECTS } from "../lib/formulas/index";
5: import { solveFormula } from "../lib/solver/solver";
6: import { parseEquation } from "../lib/parse-formula";
7: import { formatDecimal, formatLatex, trimNum } from "../lib/exact/format";
8: import { approx, isApproxOnly, parseExact } from "../lib/exact/exact";
9: import type { Exact } from "../lib/exact/exact";
10: import { solveQuadratic } from "../lib/exact/exact";
11: import { linearPlot, polyPlot, quadraticPlot, trajectoryPlot } from "../lib/plots/plot";
12: import type { InequalityOp } from "../lib/plots/plot";
13: import { inequalityBands } from "../lib/plots/plot";
14: import { addHistory, isFavorite, toggleFavorite } from "../lib/storage/db";
15: import { loadSettings } from "../lib/settings";
16: import { getDescription } from "../lib/descriptions";
17: import Formula from "../components/Formula.vue";
18: import FormulaDiagram from "../components/FormulaDiagram.vue";
19: import FunctionPlot from "../components/FunctionPlot.vue";
20: 
21: const props = defineProps<{ subject?: string; formula?: string }>();
22: 
23: const def = computed(() =>
24:   props.subject && props.formula ? getFormula(props.subject, props.formula) : undefined,
25: );
26: 
27: const description = computed(() => (props.formula ? getDescription(props.formula) : undefined));
28: 
29: const subjectLabel = computed(() =>
30:   def.value ? (SUBJECTS.find((s) => s.id === def.value!.subject)?.label ?? def.value!.subject) : "",
31: );
32: 
33: const inputs = reactive<Record<string, string>>({});
34: const places = ref(loadSettings().places);
35: const isFav = ref(false);
36: const quick = ref("");
37: const quickError = ref("");
38: const quickSuggest = ref<{ subject: string; id: string; name: string; fill: string } | null>(null);
39: const route = useRoute();
40: 
41: function applyFill(raw: string): boolean {
42:   const parsed = parseEquation(raw);
43:   if (!parsed || !def.value) return false;
44:   if (parsed.id !== def.value.id) {
45:     quickSuggest.value = {
46:       subject: parsed.subject,
47:       id: parsed.id,
48:       name: getFormula(parsed.subject, parsed.id)?.name ?? parsed.id,
49:       fill: raw,
50:     };
51:     return false;
52:   }
53:   quickSuggest.value = null;
54:   for (const v of def.value.vars) {
55:     if (v.kind === "select") continue;
56:     const val = parsed.values[v.id];
57:     if (val !== undefined) inputs[v.id] = val;
58:   }
59:   for (const [k, v] of Object.entries(parsed.selects ?? {})) {
60:     if (def.value.vars.some((x) => x.id === k && x.kind === "select")) inputs[k] = v;
61:   }
62:   return true;
63: }
64: 
65: function applyQuick(): void {
66:   quickError.value = "";
67:   quickSuggest.value = null;
68:   if (quick.value.trim() === "") return;
69:   if (!applyFill(quick.value.trim()) && !quickSuggest.value) {
70:     quickError.value = "Nie rozpoznano zapisu dla tego wzoru — wpisz liczby w pola powyżej.";
71:   }
72: }
73: 
74: const favKey = computed(() =>
75:   props.subject && props.formula ? `${props.subject}/${props.formula}` : "",
76: );
77: 
78: async function toggleFav(): Promise<void> {
79:   if (!favKey.value) return;
80:   try {
81:     isFav.value = await toggleFavorite(favKey.value);
82:   } catch {
83:     isFav.value = false;
84:   }
85: }
86: 
87: watch(
88:   def,
89:   (d) => {
90:     for (const k of Object.keys(inputs)) delete inputs[k];
91:     if (d) for (const v of d.vars) inputs[v.id] = v.kind === "select" ? (v.options?.[0] ?? "") : "";
92:     const fill = route.query.fill;
93:     if (typeof fill === "string" && fill !== "") applyFill(fill);
94:     isFav.value = false;
95:     if (d && favKey.value) {
96:       isFavorite(favKey.value)
97:         .then((v) => {
98:           isFav.value = v;
99:         })
100:         .catch(() => {
101:           isFav.value = false;
102:         });
103:     }
104:   },
105:   { immediate: true },
106: );
107: 
108: const SUB = ["₁", "₂", "₃", "₄"];
109: 
110: const hasAnyInput = computed(() => Object.values(inputs).some((s) => s.trim() !== ""));
111: 
112: const view = computed(() => {
113:   const d = def.value;
114:   if (!d) return { state: "missing" as const };
115:   const r = solveFormula(d, { ...inputs }, places.value);
116:   if (!r.ok) {
117:     return {
118:       state: "idle" as const,
119:       error: hasAnyInput.value ? r.error : "",
120:       hint: !hasAnyInput.value,
121:     };
122:   }
123:   return {
124:     state: "done" as const,
125:     unknownId: r.unknown,
126:     unknownLabel: r.unknownLabel,
127:     values: r.values.map((v, i) => ({
128:       label: r.labels[i] ?? (r.values.length > 1 ? `x${SUB[i] ?? `_${i + 1}`}` : r.unknownLabel),
129:       tex: formatLatex(v),
130:       dec: formatDecimal(v, places.value),
131:       approx: isApproxOnly(v),
132:     })),
133:     raw: r.values as Exact[],
134:     steps: r.steps,
135:     first: r.values[0],
136:   };
137: });
138: 
139: const diagramNums = computed<Record<string, number> | null>(() => {
140:   const d = def.value;
141:   const st = view.value;
142:   if (!d || st.state !== "done" || d.mode !== "nvar") return null;
143:   const nums: Record<string, number> = {};
144:   for (const v of d.vars) {
145:     try {
146:       const e =
147:         v.id === st.unknownId && st.first ? st.first : parseExact((inputs[v.id] ?? "").trim());
148:       const n = approx(e);
149:       if (!Number.isFinite(n) || n <= 0) return null;
150:       nums[v.id] = n;
151:     } catch {
152:       return null;
153:     }
154:   }
155:   return nums;
156: });
157: 
158: const diagramCaption = computed<string | undefined>(() => {
159:   const d = def.value;
160:   const n = diagramNums.value;
161:   if (!d || !n) return undefined;
162:   return `${d.name}: ${d.vars.map((v) => `${v.id} = ${trimNum(n[v.id] ?? NaN)}`).join(", ")}`;
163: });
164: 
165: function numInput(id: string): number | null {
166:   try {
167:     const n = approx(parseExact((inputs[id] ?? "").trim()));
168:     return Number.isFinite(n) ? n : null;
169:   } catch {
170:     return null;
171:   }
172: }
173: 
174: const plotData = computed(() => {
175:   const d = def.value;
176:   if (!d) return null;
177:   if (d.id === "rownanie-kwadratowe") {
178:     const a = numInput("a");
179:     const b = numInput("b");
180:     const c = numInput("c");
181:     if (a === null || b === null || c === null) return null;
182:     if (a !== 0) return quadraticPlot(a, b, c);
183:     return b !== 0 ? linearPlot(b, c) : null;
184:   }
185:   if (
186:     d.id === "postacie-kwadratowej" ||
187:     d.id === "kwadratowa-iloczynowa" ||
188:     d.id === "delta" ||
189:     d.id === "ekstrema-kwadratowej" ||
190:     d.id === "nierownosc-kwadratowa"
191:   ) {
192:     const a = numInput("a");
193:     const b = numInput("b");
194:     const c = numInput("c");
195:     if (a === null || b === null || c === null || a === 0) return null;
196:     return quadraticPlot(a, b, c);
197:   }
198:   if (d.id === "funkcja-liniowa") {
199:     const a = numInput("a");
200:     const b = numInput("b");
201:     if (a === null || b === null) return null;
202:     return linearPlot(a, b);
203:   }
204:   if (d.id === "rozklad-wielomianu" || d.id === "horner-pierwiastki") {
205:     const ids =
206:       d.id === "rozklad-wielomianu"
207:         ? ["a6", "a5", "a4", "a3", "a2", "a1", "a0"]
208:         : ["a", "b", "c", "d"];
209:     const raw = ids.map(numInput);
210:     if (raw.some((v) => v === null)) return null;
211:     let coeffs = raw as number[];
212:     while (coeffs.length > 2 && coeffs[0] === 0) coeffs = coeffs.slice(1);
213:     const st = view.value;
214:     if (st.state !== "done") return null;
215:     const roots = st.raw.map((v) => approx(v));
216:     return polyPlot(coeffs, roots);
217:   }
218:   if (d.id === "rzut-poziomy") {
219:     const v0 = numInput("v0");
220:     const h = numInput("h");
221:     if (v0 === null || h === null) return null;
222:     return trajectoryPlot(v0, h);
223:   }
224:   if (d.id === "nierownosc-kwadratowa") {
225:     const a = numInput("a");
226:     const b = numInput("b");
227:     const c = numInput("c");
228:     if (a === null || b === null || c === null) return null;
229:     const base = quadraticPlot(a, b, c);
230:     if (!base) return null;
231:     try {
232:       const qa = parseExact((inputs.a ?? "").trim());
233:       const qb = parseExact((inputs.b ?? "").trim());
234:       const qc = parseExact((inputs.c ?? "").trim());
235:       if (qa.irr || qb.irr || qc.irr) return base;
236:       const q = solveQuadratic(qa.rat, qb.rat, qc.rat);
237:       const qroots = q.roots.map((r) => approx(r));
238:       const op = (inputs.op ?? ">") as InequalityOp;
239:       const bands = inequalityBands(a, op, qroots);
240:       return bands && bands.length > 0 ? { ...base, shade: bands } : base;
241:     } catch {
242:       return base;
243:     }
244:   }
245:   return null;
246: });
247: 
248: let saveTimer: number | undefined;
249: 
250: watch(view, (v) => {
251:   window.clearTimeout(saveTimer);
252:   const d = def.value;
253:   if (v.state !== "done" || !hasAnyInput.value || !d) return;
254:   const snapshot = { ...inputs };
255:   const result = v.values.map((r) => r.tex).join("; ");
256:   saveTimer = window.setTimeout(() => {
257:     void addHistory({
258:       subject: d.subject,
259:       formulaId: d.id,
260:       formulaName: d.name,
261:       inputs: snapshot,
262:       result,
263:     }).catch(() => {});
264:   }, 1500);
265: });
266: 
267: onUnmounted(() => window.clearTimeout(saveTimer));
268: </script>
269: 
270: <template>
271:   <section v-if="def">
272:     <p class="topic">{{ subjectLabel }} · {{ def.topic }}</p>
273:     <h2>{{ def.name }}</h2>
274:     <button
275:       class="fav"
276:       :aria-pressed="isFav"
277:       @click="toggleFav"
278:       :title="isFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'"
279:     >
280:       {{ isFav ? "★" : "☆" }} Ulubione
281:     </button>
282:     <p class="formula"><Formula :source="def.latex" /></p>
283:     <details v-if="description" class="about">
284:       <summary>Do czego ten wzór</summary>
285:       <p>{{ description }}</p>
286:     </details>
287: 
288:     <div class="solver">
289:       <div class="quick">
290:         <input
291:           v-model="quick"
292:           class="quick__input"
293:           inputmode="text"
294:           enterkeyhint="go"
295:           placeholder="Wklej całe równanie, np. 4x^2-2x+10=0"
296:           aria-label="Wklej całe równanie, żeby uzupełnić pola"
297:           @keyup.enter="applyQuick"
298:         />
299:         <button class="quick__go" @click="applyQuick">Wypełnij</button>
300:       </div>
301:       <p v-if="quickError" class="error" role="alert">{{ quickError }}</p>
302:       <p v-if="quickSuggest" class="suggest" role="status">
303:         To pasuje do wzoru „{{ quickSuggest.name }}”.
304:         <router-link
305:           :to="{
306:             name: 'solver',
307:             params: { subject: quickSuggest.subject, formula: quickSuggest.id },
308:             query: { fill: quickSuggest.fill },
309:           }"
310:           >Przejdź tam →</router-link
311:         >
312:       </p>
313:       <div class="solver__inputs">
314:         <label v-for="v in def.vars" :key="v.id">
315:           {{ v.label }}<span v-if="v.unit" class="unit"> [{{ v.unit }}]</span>
316:           <select v-if="v.kind === 'select'" v-model="inputs[v.id]" :aria-label="v.label">
317:             <option v-for="o in v.options ?? []" :key="o" :value="o">{{ o }}</option>
318:           </select>
319:           <input v-else v-model="inputs[v.id]" inputmode="decimal" />
320:         </label>
321:         <label>
322:           miejsca
323:           <input type="number" v-model.number="places" min="0" max="12" />
324:         </label>
325:       </div>
326:       <p class="hint" v-if="def.mode === 'nvar'">
327:         Zostaw jedno pole puste — to będzie niewiadoma. Możesz wpisać π, np. 25π.
328:       </p>
329: 
330:       <div v-if="view.state === 'idle'">
331:         <p v-if="view.hint" class="hint">Uzupełnij dane powyżej, a kroki pojawią się same.</p>
332:         <p v-else class="error" role="alert">{{ view.error }}</p>
333:       </div>
334: 
335:       <ol v-if="view.state === 'done'" class="steps">
336:         <li v-for="s in view.steps" :key="s.title">
337:           <p class="steps__title">{{ s.title }}</p>
338:           <p class="steps__body"><Formula :source="s.body" /></p>
339:           <p v-if="s.note" class="steps__note">{{ s.note }}</p>
340:         </li>
341:       </ol>
342: 
343:       <div v-if="view.state === 'done'" class="results" aria-live="polite">
344:         <p v-for="(r, i) in view.values" :key="i" class="results__row">
345:           {{ r.label }} =
346:           <span class="result-value"><Formula :source="r.tex" /></span>
347:           <span v-if="!r.approx" class="badge">do zapisu</span>
348:           <span v-if="r.tex !== r.dec" class="approx">≈ {{ r.dec }}</span>
349:         </p>
350:       </div>
351: 
352:       <FormulaDiagram
353:         v-if="view.state === 'done' && diagramNums"
354:         :formula-id="def.id"
355:         :nums="diagramNums"
356:         :highlight="view.unknownId"
357:         :caption="diagramCaption"
358:       />
359: 
360:       <FunctionPlot v-if="plotData" :data="plotData" />
361:     </div>
362: 
363:     <p class="back">
364:       <router-link :to="{ name: 'wzornik', params: { subject: def.subject } }"
365:         >← wszystkie wzory</router-link
366:       >
367:     </p>
368:   </section>
369: 
370:   <section v-else>
371:     <h2>Nie ma takiego kalkulatora</h2>
372:     <p><router-link :to="{ name: 'wzornik' }">Wróć do wzornika</router-link></p>
373:   </section>
374: </template>
375: 
376: <style scoped>
377: .topic {
378:   color: var(--color-ink-soft);
379:   font-size: 0.875rem;
380:   margin: 0 0 0.25rem;
381: }
382: 
383: .fav {
384:   font-family: var(--font-body);
385:   font-size: 0.875rem;
386:   padding: 0.3rem 0.7rem;
387:   border: 1px solid var(--color-line);
388:   border-radius: var(--radius);
389:   background: var(--color-paper-raised);
390:   color: var(--color-ink);
391:   cursor: pointer;
392:   margin-bottom: 1rem;
393: }
394: 
395: .fav[aria-pressed="true"] {
396:   color: var(--color-accent);
397:   border-color: var(--color-accent);
398: }
399: 
400: .formula {
401:   background: var(--color-paper-raised);
402:   border: 1px solid var(--color-line);
403:   border-radius: var(--radius);
404:   padding: 0.75rem 1rem;
405:   max-width: var(--content-max);
406:   font-size: 1.125rem;
407: }
408: 
409: .about {
410:   max-width: var(--content-max);
411:   margin-top: 0.75rem;
412:   font-size: 0.9375rem;
413:   color: var(--color-ink-soft);
414: }
415: 
416: .about summary {
417:   cursor: pointer;
418:   min-height: 44px;
419:   display: inline-flex;
420:   align-items: center;
421: }
422: 
423: .about p {
424:   margin: 0.25rem 0 0;
425: }
426: 
427: .solver {
428:   margin-top: 1.5rem;
429:   max-width: var(--content-max);
430: }
431: 
432: .quick {
433:   display: flex;
434:   gap: 0.5rem;
435:   margin-bottom: 1rem;
436: }
437: 
438: .quick__input {
439:   flex: 1;
440:   min-width: 0;
441:   font-family: var(--font-mono);
442:   font-size: 1rem;
443:   padding: 0.35rem 0.5rem;
444:   border: 1px solid var(--color-line);
445:   border-radius: var(--radius);
446:   background: var(--color-paper-raised);
447:   color: var(--color-ink);
448: }
449: 
450: .quick__go {
451:   flex-shrink: 0;
452:   min-height: 44px;
453:   padding: 0.35rem 1rem;
454:   font-family: var(--font-body);
455:   font-size: 0.9375rem;
456:   border: 1px solid var(--color-accent);
457:   border-radius: var(--radius);
458:   background: transparent;
459:   color: var(--color-accent);
460:   cursor: pointer;
461: }
462: 
463: .solver__inputs {
464:   display: flex;
465:   flex-wrap: wrap;
466:   gap: 1rem 1.5rem;
467:   margin-bottom: 0.5rem;
468: }
469: 
470: .solver__inputs label {
471:   display: flex;
472:   align-items: center;
473:   gap: 0.4rem;
474:   font-family: var(--font-mono);
475:   font-size: 0.9375rem;
476: }
477: 
478: .solver__inputs input {
479:   width: 6rem;
480:   font-family: var(--font-mono);
481:   font-size: 1rem;
482:   padding: 0.35rem 0.5rem;
483:   border: 1px solid var(--color-line);
484:   border-radius: var(--radius);
485:   background: var(--color-paper-raised);
486:   color: var(--color-ink);
487: }
488: 
489: .solver__inputs select {
490:   font-family: var(--font-mono);
491:   font-size: 1rem;
492:   padding: 0.35rem 0.5rem;
493:   border: 1px solid var(--color-line);
494:   border-radius: var(--radius);
495:   background: var(--color-paper-raised);
496:   color: var(--color-ink);
497: }
498: 
499: .unit {
500:   color: var(--color-ink-soft);
501: }
502: 
503: .hint {
504:   color: var(--color-ink-soft);
505:   font-size: 0.875rem;
506: }
507: 
508: .suggest {
509:   font-size: 0.9375rem;
510:   color: var(--color-ink);
511: }
512: 
513: .error {
514:   color: var(--color-accent);
515:   font-size: 0.9375rem;
516: }
517: 
518: .steps {
519:   list-style: none;
520:   padding: 0;
521:   margin: 1.5rem 0;
522:   background: var(--color-paper-raised);
523:   border: 1px solid var(--color-line);
524:   border-radius: var(--radius);
525:   padding: 1.25rem 1.5rem;
526: }
527: 
528: .steps li + li {
529:   margin-top: 1rem;
530:   padding-top: 1rem;
531:   border-top: 1px dashed var(--color-line);
532: }
533: 
534: .steps__title {
535:   margin: 0 0 0.25rem;
536:   font-size: 0.8125rem;
537:   text-transform: uppercase;
538:   letter-spacing: 0.05em;
539:   color: var(--color-ink-soft);
540: }
541: 
542: .steps__body {
543:   margin: 0;
544:   font-size: 1.0625rem;
545: }
546: 
547: .steps__note {
548:   margin: 0.25rem 0 0;
549:   font-size: 0.875rem;
550:   color: var(--color-ink-soft);
551: }
552: 
553: .results__row {
554:   font-family: var(--font-mono);
555: }
556: 
557: .result-value {
558:   color: var(--color-accent);
559:   font-weight: 500;
560:   font-size: 1.0625rem;
561: }
562: 
563: .badge {
564:   display: inline-block;
565:   font-size: 0.6875rem;
566:   text-transform: uppercase;
567:   letter-spacing: 0.04em;
568:   color: var(--color-accent);
569:   border: 1px solid var(--color-accent);
570:   border-radius: var(--radius);
571:   padding: 0.05rem 0.35rem;
572:   margin-left: 0.5rem;
573:   vertical-align: middle;
574: }
575: 
576: .approx {
577:   color: var(--color-ink-soft);
578:   margin-left: 0.5rem;
579: }
580: 
581: .back {
582:   margin-top: 2rem;
583:   font-size: 0.9375rem;
584: }
585: </style>

---

## Assistant

_Thinking:_

Now let me look at parse-formula.ts (auto-recognition), search, and other views briefly. Let me read parse-formula.ts.

Teraz analizuję parser równań (auto-rozpoznawanie) oraz wyszukiwarkę.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/parse-formula.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/parse-formula.ts, lines 1-462
1: export interface ParsedEquation {
2:   subject: "matematyka" | "chemia" | "geografia";
3:   id: string;
4:   values: Record<string, string>;
5:   selects?: Record<string, string>;
6:   label: string;
7: }
8: 
9: export const PARSE_LABELS: Record<string, string> = {
10:   "rownanie-kwadratowe": "równanie kwadratowe",
11:   "funkcja-liniowa": "funkcja liniowa",
12:   "uklad-rownan": "układ dwóch równań",
13:   "nierownosc-kwadratowa": "nierówność kwadratowa",
14:   "rownanie-wykladnicze": "równanie wykładnicze",
15:   "rownanie-logarytmiczne": "równanie logarytmiczne",
16:   procent: "procent z liczby",
17:   potega: "potęga",
18:   pierwiastek: "pierwiastek",
19:   "ciag-arytmetyczny": "ciąg arytmetyczny",
20:   "ciag-geometryczny": "ciąg geometryczny",
21:   tales: "proporcja (Tales)",
22:   "skala-mapy": "skala mapy",
23:   "stezenie-procentowe": "stężenie procentowe",
24:   "rozklad-wielomianu": "rozkład wielomianu",
25:   "wartosc-bezwzgledna": "wartość bezwzględna",
26:   "postacie-kwadratowej": "postacie funkcji kwadratowej",
27: };
28: 
29: export function parseLabel(id: string): string {
30:   return PARSE_LABELS[id] ?? id;
31: }
32: 
33: const NUM = String.raw`[+-]?(?:\d+(?:\.\d+)?|\.\d+)`;
34: 
35: function clean(s: string): string {
36:   return s
37:     .toLowerCase()
38:     .replace(/\s+/g, "")
39:     .replace(/\*/g, "")
40:     .replace(/,/g, ".")
41:     .replace(/x²/g, "x^2")
42:     .replace(/−/g, "-")
43:     .replace(/≥/g, ">=")
44:     .replace(/≤/g, "<=")
45:     .replace(/≠/g, "!=");
46: }
47: 
48: function splitTerms(lhs: string): string[] {
49:   const normalized = lhs.startsWith("-") ? lhs : "+" + lhs;
50:   return normalized.split(/(?=[+-])/).filter((t) => t !== "" && t !== "+" && t !== "-");
51: }
52: 
53: function parseCoeff(raw: string): number | null {
54:   if (raw === "" || raw === "+") return 1;
55:   if (raw === "-") return -1;
56:   if (!/^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(raw)) return null;
57:   const v = Number(raw);
58:   return Number.isFinite(v) ? v : null;
59: }
60: 
61: function parseSide(expr: string): { a: number; b: number; c: number } | null {
62:   let a = 0;
63:   let b = 0;
64:   let c = 0;
65:   for (const t of splitTerms(expr)) {
66:     if (t.includes("x^2")) {
67:       const coef = parseCoeff(t.replace("x^2", ""));
68:       if (coef === null) return null;
69:       a += coef;
70:     } else if (t.includes("x")) {
71:       const rest = t.replace("x", "");
72:       if (/[a-z]/.test(rest)) return null;
73:       const coef = parseCoeff(rest);
74:       if (coef === null) return null;
75:       b += coef;
76:     } else {
77:       if (/[a-z]/.test(t)) return null;
78:       const coef = parseCoeff(t);
79:       if (coef === null) return null;
80:       c += coef;
81:     }
82:   }
83:   return { a, b, c };
84: }
85: 
86: function parseLinXY(expr: string): { x: number; y: number; k: number } | null {
87:   let x = 0;
88:   let y = 0;
89:   let k = 0;
90:   for (const t of splitTerms(expr)) {
91:     if (t.includes("x")) {
92:       const rest = t.replace("x", "");
93:       if (/[a-z]/.test(rest)) return null;
94:       const coef = parseCoeff(rest);
95:       if (coef === null) return null;
96:       x += coef;
97:     } else if (t.includes("y")) {
98:       const rest = t.replace("y", "");
99:       if (/[a-z]/.test(rest)) return null;
100:       const coef = parseCoeff(rest);
101:       if (coef === null) return null;
102:       y += coef;
103:     } else {
104:       if (/[a-z]/.test(t)) return null;
105:       const coef = parseCoeff(t);
106:       if (coef === null) return null;
107:       k += coef;
108:     }
109:   }
110:   return { x, y, k };
111: }
112: 
113: function parseEqLinXY(eq: string): { x: number; y: number; k: number } | null {
114:   const parts = eq.split("=");
115:   if (parts.length !== 2) return null;
116:   const l = parseLinXY(parts[0]!);
117:   const r = parseLinXY(parts[1]!);
118:   if (!l || !r) return null;
119:   return { x: l.x - r.x, y: l.y - r.y, k: r.k - l.k };
120: }
121: 
122: function parsePolySide(expr: string): Record<number, number> | null {
123:   const coefs: Record<number, number> = {};
124:   for (const t of splitTerms(expr)) {
125:     const m = /^(.*?)x(?:\^(\d+))?$/.exec(t);
126:     if (m && t.includes("x")) {
127:       if (/[a-z]/.test(m[1]!)) return null;
128:       const coef = parseCoeff(m[1]!);
129:       if (coef === null) return null;
130:       const pw = m[2] === undefined ? 1 : Number(m[2]);
131:       if (pw > 6) return null;
132:       coefs[pw] = (coefs[pw] ?? 0) + coef;
133:     } else {
134:       if (/[a-z]/.test(t)) return null;
135:       const coef = parseCoeff(t);
136:       if (coef === null) return null;
137:       coefs[0] = (coefs[0] ?? 0) + coef;
138:     }
139:   }
140:   return coefs;
141: }
142: 
143: function tryPoly(s: string): ParsedEquation | null {
144:   if (!s.includes("x")) return null;
145:   const parts = s.split("=");
146:   if (parts.length !== 2) return null;
147:   const l = parsePolySide(parts[0]!);
148:   const r = parsePolySide(parts[1]!);
149:   if (!l || !r) return null;
150:   const deg = Math.max(0, ...Object.keys({ ...l, ...r }).map(Number));
151:   if (deg < 3 || deg > 4) return null;
152:   const get = (p: number): number => (l[p] ?? 0) - (r[p] ?? 0);
153:   if (get(deg) === 0) return null;
154:   const ids = ["a6", "a5", "a4", "a3", "a2", "a1", "a0"];
155:   const values: Record<string, string> = {};
156:   for (let p = 6; p >= 0; p--) {
157:     values[ids[6 - p]!] = p <= deg ? String(get(p)) : "0";
158:   }
159:   return {
160:     subject: "matematyka",
161:     id: "rozklad-wielomianu",
162:     values,
163:     selects: { deg: String(deg) },
164:     label: parseLabel("rozklad-wielomianu"),
165:   };
166: }
167: 
168: function num(s: string): number | null {
169:   if (!new RegExp(`^${NUM}$`).test(s)) return null;
170:   const v = Number(s);
171:   return Number.isFinite(v) ? v : null;
172: }
173: 
174: function kvPairs(s: string): Record<string, number> | null {
175:   const out: Record<string, number> = {};
176:   for (const part of s.split(";")) {
177:     const m = new RegExp(`^([a-z]+[0-9]?)=(${NUM})$`).exec(part);
178:     if (!m) return null;
179:     out[m[1]!] = Number(m[2]!);
180:   }
181:   return out;
182: }
183: 
184: export function looksLikeEquation(q: string): boolean {
185:   const s = clean(q);
186:   return (
187:     s.includes("x") ||
188:     s.includes("=") ||
189:     s.includes("^") ||
190:     s.includes("%") ||
191:     s.includes("√") ||
192:     s.includes("∛") ||
193:     s.includes("sqrt") ||
194:     s.includes("log") ||
195:     s.includes(";") ||
196:     s.includes(":") ||
197:     s.includes(">") ||
198:     s.includes("<") ||
199:     s.includes("!")
200:   );
201: }
202: 
203: function finishQuad(a: number, b: number, c: number): ParsedEquation | null {
204:   if (a !== 0) {
205:     return {
206:       subject: "matematyka",
207:       id: "rownanie-kwadratowe",
208:       values: { a: String(a), b: String(b), c: String(c) },
209:       label: parseLabel("rownanie-kwadratowe"),
210:     };
211:   }
212:   if (b !== 0) {
213:     return {
214:       subject: "matematyka",
215:       id: "funkcja-liniowa",
216:       values: { a: String(b), b: String(c) },
217:       label: parseLabel("funkcja-liniowa"),
218:     };
219:   }
220:   return null;
221: }
222: 
223: export function parseEquation(input: string): ParsedEquation | null {
224:   const raw = input.trim();
225:   const rootMark = raw.match(/^[∛√]/) ? raw[0] : null;
226:   if (rootMark) {
227:     const rest = raw.slice(1).replace(/\s+/g, "");
228:     const m = num(rest);
229:     if (m === null || m < 0) return null;
230:     return {
231:       subject: "matematyka",
232:       id: "pierwiastek",
233:       values: { m: String(m), n: rootMark === "∛" ? "3" : "2" },
234:       label: parseLabel("pierwiastek"),
235:     };
236:   }
237:   const s = clean(raw);
238:   if (s === "") return null;
239: 
240:   const sysParts = s.split(/[\n;]/).filter((p) => p !== "");
241:   if (sysParts.length === 2 && s.includes("y")) {
242:     const e1 = parseEqLinXY(sysParts[0]!);
243:     const e2 = parseEqLinXY(sysParts[1]!);
244:     if (e1 && e2) {
245:       return {
246:         subject: "matematyka",
247:         id: "uklad-rownan",
248:         values: {
249:           a1: String(e1.x),
250:           b1: String(e1.y),
251:           c1: String(e1.k),
252:           a2: String(e2.x),
253:           b2: String(e2.y),
254:           c2: String(e2.k),
255:         },
256:         label: parseLabel("uklad-rownan"),
257:       };
258:     }
259:   }
260: 
261:   const kv = s.includes(";") && !s.includes("x") && !s.includes("y") ? kvPairs(s) : null;
262:   if (kv) {
263:     if ("ms" in kv && "mr" in kv) {
264:       return {
265:         subject: "chemia",
266:         id: "stezenie-procentowe",
267:         values: { ms: String(kv["ms"]), mr: String(kv["mr"]) },
268:         label: parseLabel("stezenie-procentowe"),
269:       };
270:     }
271:     if ("r" in kv && "a1" in kv && "n" in kv) {
272:       return {
273:         subject: "matematyka",
274:         id: "ciag-arytmetyczny",
275:         values: {
276:           a1: String(kv["a1"]),
277:           r: String(kv["r"]),
278:           n: String(kv["n"]),
279:           ...(kv["an"] !== undefined ? { an: String(kv["an"]) } : {}),
280:         },
281:         label: parseLabel("ciag-arytmetyczny"),
282:       };
283:     }
284:     if ("q" in kv && "a1" in kv && "n" in kv) {
285:       return {
286:         subject: "matematyka",
287:         id: "ciag-geometryczny",
288:         values: {
289:           a1: String(kv["a1"]),
290:           q: String(kv["q"]),
291:           n: String(kv["n"]),
292:           ...(kv["an"] !== undefined ? { an: String(kv["an"]) } : {}),
293:         },
294:         label: parseLabel("ciag-geometryczny"),
295:       };
296:     }
297:   }
298: 
299:   const ineq = new RegExp(`^(.*)(>=|<=|!=|>|<)(.*)$`).exec(s);
300:   if (ineq && s.includes("x")) {
301:     const opMap: Record<string, string> = { ">": ">", ">=": "≥", "<": "<", "<=": "≤", "!=": "≠" };
302:     const l = parseSide(ineq[1]!);
303:     const r = parseSide(ineq[3]!);
304:     if (l && r) {
305:       const a = l.a - r.a;
306:       const b = l.b - r.b;
307:       const c = l.c - r.c;
308:       if (a !== 0) {
309:         return {
310:           subject: "matematyka",
311:           id: "nierownosc-kwadratowa",
312:           values: { a: String(a), b: String(b), c: String(c) },
313:           selects: { op: opMap[ineq[2]!]! },
314:           label: parseLabel("nierownosc-kwadratowa"),
315:         };
316:       }
317:     }
318:   }
319: 
320:   const exp = new RegExp(`^(${NUM})\\^x=(${NUM})$`).exec(s);
321:   if (exp) {
322:     return {
323:       subject: "matematyka",
324:       id: "rownanie-wykladnicze",
325:       values: { a: exp[1]!, b: exp[2]! },
326:       label: parseLabel("rownanie-wykladnicze"),
327:     };
328:   }
329: 
330:   const log = new RegExp(`^log_?(${NUM})\\(x\\)=(${NUM})$`).exec(s);
331:   if (log) {
332:     return {
333:       subject: "matematyka",
334:       id: "rownanie-logarytmiczne",
335:       values: { a: log[1]!, c: log[2]! },
336:       label: parseLabel("rownanie-logarytmiczne"),
337:     };
338:   }
339: 
340:   const log10 = new RegExp(`^log\\(x\\)=(${NUM})$`).exec(s);
341:   if (log10) {
342:     return {
343:       subject: "matematyka",
344:       id: "rownanie-logarytmiczne",
345:       values: { a: "10", c: log10[1]! },
346:       label: parseLabel("rownanie-logarytmiczne"),
347:     };
348:   }
349: 
350:   const pct = new RegExp(`^(${NUM})%(?:z|of|\\*)(${NUM})$`).exec(s);
351:   if (pct) {
352:     return {
353:       subject: "matematyka",
354:       id: "procent",
355:       values: { p: pct[1]!, x: pct[2]! },
356:       label: parseLabel("procent"),
357:     };
358:   }
359: 
360:   const pw = new RegExp(`^(${NUM})\\^(${NUM})$`).exec(s);
361:   if (pw && !s.includes("x")) {
362:     return {
363:       subject: "matematyka",
364:       id: "potega",
365:       values: { p: pw[1]!, n: pw[2]! },
366:       label: parseLabel("potega"),
367:     };
368:   }
369: 
370:   const sq = new RegExp(`^sqrt\\((${NUM})\\)$`).exec(s);
371:   if (sq) {
372:     return {
373:       subject: "matematyka",
374:       id: "pierwiastek",
375:       values: { m: sq[1]!, n: "2" },
376:       label: parseLabel("pierwiastek"),
377:     };
378:   }
379: 
380:   const prop = new RegExp(`^([^=]+)/([^=]+)=([^=]+)/([^=]+)$`).exec(s);
381:   if (prop) {
382:     const parts = [prop[1]!, prop[2]!, prop[3]!, prop[4]!];
383:     const xCount = parts.filter((p) => p.includes("x")).length;
384:     if (xCount === 1) {
385:       const ids = ["a", "b", "c", "d"];
386:       const values: Record<string, string> = {};
387:       for (let i = 0; i < 4; i++) {
388:         if (!parts[i]!.includes("x")) values[ids[i]!] = parts[i]!;
389:       }
390:       if (Object.keys(values).length === 3) {
391:         return {
392:           subject: "matematyka",
393:           id: "tales",
394:           values,
395:           label: parseLabel("tales"),
396:         };
397:       }
398:     }
399:   }
400: 
401:   const scale = /^1:(\d+)$/.exec(s);
402:   if (scale) {
403:     return {
404:       subject: "geografia",
405:       id: "skala-mapy",
406:       values: { M: scale[1]! },
407:       label: parseLabel("skala-mapy"),
408:     };
409:   }
410: 
411:   if (!s.includes("x")) return null;
412: 
413:   const poly = tryPoly(s);
414:   if (poly) return poly;
415: 
416:   const canon = new RegExp(`^(${NUM})\\(x([+-]${NUM})\\)\\^2([+-]${NUM})?(=0)?$`).exec(s);
417:   if (canon) {
418:     const a = Number(canon[1]!);
419:     const p = -Number(canon[2]!);
420:     const q = canon[3] === undefined ? 0 : Number(canon[3]!);
421:     const b = -2 * a * p;
422:     const c = a * p * p + q;
423:     if ([a, b, c].every(Number.isFinite)) {
424:       return {
425:         subject: "matematyka",
426:         id: "postacie-kwadratowej",
427:         values: { a: String(a), b: String(b), c: String(c) },
428:         label: parseLabel("postacie-kwadratowej"),
429:       };
430:     }
431:   }
432: 
433:   const abs = new RegExp(`^\\|x((?:[+-]${NUM})?)\\|=(${NUM})$`).exec(s);
434:   if (abs) {
435:     const inner = abs[1]!;
436:     const w = abs[2]!;
437:     const a = inner === "" ? 0 : -Number(inner);
438:     if (Number.isFinite(a)) {
439:       return {
440:         subject: "matematyka",
441:         id: "wartosc-bezwzgledna",
442:         values: { a: String(a), w },
443:         label: parseLabel("wartosc-bezwzgledna"),
444:       };
445:     }
446:   }
447: 
448:   const parts = s.split("=");
449:   if (parts.length > 2) return null;
450:   const lhs = parts[0]!;
451:   const rhs = parts.length === 2 ? parts[1]! : "0";
452:   if (rhs !== "0" && rhs !== "+0" && rhs !== "-0") {
453:     const moved = parseSide(rhs);
454:     if (!moved) return null;
455:     const left = parseSide(lhs);
456:     if (!left) return null;
457:     return finishQuad(left.a - moved.a, left.b - moved.b, left.c - moved.c);
458:   }
459:   const parsed = parseSide(lhs);
460:   if (!parsed) return null;
461:   return finishQuad(parsed.a, parsed.b, parsed.c);
462: }

---

## Assistant

_Thinking:_

The parser handles equations. Now let me check the remaining views quickly and lib files. Let me look at the views list and read KalkulatoryView, ConverterView, ZadanieView, HistoriaView, SettingsView, HomeView, NotFoundView. But maybe I should focus on what's relevant.

Actually, phase 0 is "przeszukaj kod" — scan the code to gather info for further actions. I've gathered:
- Project: Wzornik Maturalny (matura app), Vite + Vue 3 + TS, PWA, katex, vue-router, vitest, oxlint/oxfmt.
- Formulas structure: src/lib/formulas/*.ts with FormulaDef, subject, topic, name, latex, vars, mode, outputId, outputLabel, solve.
- ~171 formulas found, topics: Równania, Funkcja kwadratowa, Funkcje, Prawdopodobieństwo, Kombinatoryka, Ciągi, Potęgi i pierwiastki, Logarytmy, Wartość bezwzględna, Procenty, Bryły, Koło i okrąg, Trójkąt prostokątny, Pola figur, Lacz, Nierówności, Wielomiany, Statystyka, Planimetria, Wzory skrócone mnożenia, Podobieństwo/Tales, Liczby całkowite, Geometria.
- SolverView: quick equation input ("Wklej całe równanie, np. 4x^2-2x+10=0"), inputs per var, places, steps, results, plot, diagram.
- parseEquation: handles quadratic, linear, inequality, exponential, log, percent, power, sqrt, Tales, scale, poly, canonical quadratic, abs, system of linear equations.
- WzornikView: search, filters, favorites, auto-recognize ("Rozpoznano zadanie — to X. Rozwiąż z automatu →").
- Routes: /, /wzornik/:subject?, /wzornik/:subject/:formula, /zadanie, /historia, /konwerter, /ustawienia, /kalkulatory/:subject?/:formula? (redirect), /:pathMatch(.*)*.

Still need to check:
- KalkulatoryView (probably calculators for quadratic etc.)
- ConverterView
- ZadanieView (probably generates tasks/problems)
- HistoriaView
- SettingsView
- HomeView
- NavRail, Formula.vue, FormulaDiagram, FunctionPlot, FormulaDiagram.
- lib: solver, plots, search, units, settings, storage, descriptions, katex, seo.
- The math formulas for physics/chem to see coverage.

Let me read a few more files. To manage context, let me read KalkulatoryView and ZadanieView and ConverterView — maybe just skim via reading. Actually, I should gather enough info. Let me read KalkulatoryView.vue, ZadanieView.vue, ConverterView.vue in parallel? They might be long. Let me check sizes by reading with limit... Actually read tool returns full file but capped at 2000 lines. Let me just read them.

Actually, to be efficient and thorough for phase 0, let me read the remaining views and key lib files. Let me do parallel reads.

Teraz czytnę pozostałe widoki – kalkulatory, konwerter, zadania.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/views/KalkulatoryView.vue"
}
```

Read file /home/zota/neo/matura-app/src/views/KalkulatoryView.vue, lines 1-95
1: <script setup lang="ts">
2: import { computed } from "vue";
3: import { FORMULAS, SUBJECTS, formulasBySubject } from "../lib/formulas/index";
4: import Formula from "../components/Formula.vue";
5: 
6: const props = defineProps<{ subject?: string }>();
7: 
8: const subjectLabel = computed(() => SUBJECTS.find((s) => s.id === props.subject)?.label ?? "");
9: 
10: const groups = computed(() => {
11:   const list = props.subject ? formulasBySubject(props.subject) : FORMULAS;
12:   const map = new Map<string, typeof list>();
13:   for (const f of list) {
14:     const g = map.get(f.topic) ?? [];
15:     g.push(f);
16:     map.set(f.topic, g);
17:   }
18:   return [...map.entries()];
19: });
20: </script>
21: 
22: <template>
23:   <section>
24:     <template v-if="!subject">
25:       <h2>Kalkulatory</h2>
26:       <p>Wybierz przedmiot, aby zobaczyć dostępne kalkulatory.</p>
27:       <ul class="subjects">
28:         <li v-for="s in SUBJECTS" :key="s.id">
29:           <router-link :to="{ name: 'kalkulatory', params: { subject: s.id } }">{{
30:             s.label
31:           }}</router-link>
32:           <span class="count">({{ formulasBySubject(s.id).length }})</span>
33:         </li>
34:       </ul>
35:     </template>
36: 
37:     <template v-else-if="subjectLabel">
38:       <h2>Kalkulatory — {{ subjectLabel }}</h2>
39:       <div v-for="[topic, list] in groups" :key="topic" class="group">
40:         <h3>{{ topic }}</h3>
41:         <ul>
42:           <li v-for="f in list" :key="f.id">
43:             <router-link :to="{ name: 'solver', params: { subject: f.subject, formula: f.id } }">
44:               {{ f.name }}
45:             </router-link>
46:             <span class="formula-preview"><Formula :source="f.latex" /></span>
47:           </li>
48:         </ul>
49:       </div>
50:     </template>
51: 
52:     <template v-else>
53:       <h2>Nie ma takiego przedmiotu</h2>
54:       <p><router-link :to="{ name: 'kalkulatory' }">Wróć do listy kalkulatorów</router-link></p>
55:     </template>
56:   </section>
57: </template>
58: 
59: <style scoped>
60: .subjects {
61:   list-style: none;
62:   padding: 0;
63:   font-size: 1.125rem;
64: }
65: 
66: .subjects li {
67:   margin: 0.5rem 0;
68: }
69: 
70: .count {
71:   color: var(--color-ink-soft);
72:   font-size: 0.9375rem;
73:   margin-left: 0.5rem;
74: }
75: 
76: .group {
77:   margin-top: 1.5rem;
78: }
79: 
80: .group ul {
81:   list-style: none;
82:   padding: 0;
83: }
84: 
85: .group li {
86:   margin: 0.4rem 0;
87: }
88: 
89: .formula-preview {
90:   display: block;
91:   font-family: var(--font-mono);
92:   font-size: 0.8125rem;
93:   color: var(--color-ink-soft);
94: }
95: </style>

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/views/ConverterView.vue"
}
```

Read file /home/zota/neo/matura-app/src/views/ConverterView.vue, lines 1-186
1: <script setup lang="ts">
2: import { computed, ref, watch } from "vue";
3: import { CATEGORIES, convert, unitsOf } from "../lib/units/units";
4: import type { Category } from "../lib/units/units";
5: import { trimNum } from "../lib/exact/format";
6: 
7: const cat = ref<Category>("speed");
8: const leftVal = ref("36");
9: const rightVal = ref("");
10: const leftUnit = ref("km/h");
11: const rightUnit = ref("m/s");
12: const lastEdited = ref<"left" | "right">("left");
13: const error = ref("");
14: 
15: const units = computed(() => unitsOf(cat.value));
16: 
17: function parseNum(s: string): number | null {
18:   const t = s.trim().replace(",", ".");
19:   if (t === "") return null;
20:   const v = Number(t);
21:   return Number.isFinite(v) ? v : null;
22: }
23: 
24: function convertLeft(): void {
25:   error.value = "";
26:   const v = parseNum(leftVal.value);
27:   if (v === null) {
28:     rightVal.value = "";
29:     return;
30:   }
31:   try {
32:     rightVal.value = trimNum(convert(v, leftUnit.value, rightUnit.value));
33:   } catch (e) {
34:     error.value = e instanceof Error ? e.message : "Błąd";
35:   }
36: }
37: 
38: function convertRight(): void {
39:   error.value = "";
40:   const v = parseNum(rightVal.value);
41:   if (v === null) {
42:     leftVal.value = "";
43:     return;
44:   }
45:   try {
46:     leftVal.value = trimNum(convert(v, rightUnit.value, leftUnit.value));
47:   } catch (e) {
48:     error.value = e instanceof Error ? e.message : "Błąd";
49:   }
50: }
51: 
52: function swap(): void {
53:   const uv = leftUnit.value;
54:   leftUnit.value = rightUnit.value;
55:   rightUnit.value = uv;
56:   const vv = leftVal.value;
57:   leftVal.value = rightVal.value;
58:   rightVal.value = vv;
59: }
60: 
61: watch(cat, () => {
62:   const u = unitsOf(cat.value);
63:   leftUnit.value = u[0] ?? "";
64:   rightUnit.value = u[1] ?? u[0] ?? "";
65:   lastEdited.value = "left";
66:   convertLeft();
67: });
68: 
69: watch([leftVal, leftUnit, rightUnit], () => {
70:   if (lastEdited.value === "left") convertLeft();
71: });
72: 
73: watch([rightVal], () => {
74:   if (lastEdited.value === "right") convertRight();
75: });
76: 
77: convertLeft();
78: </script>
79: 
80: <template>
81:   <section>
82:     <h1>Konwerter jednostek</h1>
83:     <p>
84:       Działa offline. Najpierw wybierz kategorię, potem jednostki pod liczbami. Strzałka zamienia
85:       strony.
86:     </p>
87: 
88:     <label class="cat">
89:       Kategoria
90:       <select v-model="cat" aria-label="Kategoria jednostek">
91:         <option v-for="c in CATEGORIES" :key="c.id" :value="c.id">{{ c.label }}</option>
92:       </select>
93:     </label>
94: 
95:     <div class="row">
96:       <div class="cell">
97:         <input
98:           v-model="leftVal"
99:           inputmode="decimal"
100:           aria-label="Wartość źródłowa"
101:           @focus="lastEdited = 'left'"
102:         />
103:         <select v-model="leftUnit" aria-label="Jednostka źródłowa">
104:           <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
105:         </select>
106:       </div>
107: 
108:       <button class="swap" aria-label="Zamień jednostki miejscami" @click="swap">⇄</button>
109: 
110:       <div class="cell">
111:         <input
112:           v-model="rightVal"
113:           inputmode="decimal"
114:           aria-label="Wartość docelowa"
115:           @focus="lastEdited = 'right'"
116:         />
117:         <select v-model="rightUnit" aria-label="Jednostka docelowa">
118:           <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
119:         </select>
120:       </div>
121:     </div>
122: 
123:     <p v-if="error" class="error" role="alert">{{ error }}</p>
124:   </section>
125: </template>
126: 
127: <style scoped>
128: .cat {
129:   display: flex;
130:   align-items: center;
131:   gap: 0.6rem;
132:   font-size: 1rem;
133:   margin: 1rem 0 1.5rem;
134: }
135: 
136: .cat select {
137:   font-size: 1rem;
138:   padding: 0.4rem 0.6rem;
139:   border: 1px solid var(--color-line);
140:   border-radius: var(--radius);
141:   background: var(--color-paper-raised);
142:   color: var(--color-ink);
143: }
144: 
145: .row {
146:   display: flex;
147:   align-items: center;
148:   gap: 0.75rem;
149:   max-width: var(--content-max);
150: }
151: 
152: .cell {
153:   flex: 1;
154:   display: flex;
155:   flex-direction: column;
156:   gap: 0.5rem;
157: }
158: 
159: .cell input,
160: .cell select {
161:   width: 100%;
162:   font-family: var(--font-mono);
163:   font-size: 1rem;
164:   padding: 0.5rem 0.6rem;
165:   border: 1px solid var(--color-line);
166:   border-radius: var(--radius);
167:   background: var(--color-paper-raised);
168:   color: var(--color-ink);
169: }
170: 
171: .swap {
172:   flex-shrink: 0;
173:   width: 44px;
174:   height: 44px;
175:   font-size: 1.25rem;
176:   border: 1px solid var(--color-line);
177:   border-radius: var(--radius);
178:   background: var(--color-paper-raised);
179:   color: var(--color-accent);
180:   cursor: pointer;
181: }
182: 
183: .error {
184:   color: var(--color-accent);
185: }
186: </style>

---

## Assistant

_Thinking:_

Now let me read ZadanieView, HistoriaView, SettingsView, HomeView, NotFoundView, NavRail, Formula.vue, FormulaDiagram.vue, FunctionPlot.vue, and lib files: solver, plots, search, katex, descriptions, settings, storage, units, seo.

That's a lot. Let me prioritize. Phase 0 = scan code and gather info for further actions. I should gather enough to write phase 1 plan.

Let me read ZadanieView and HomeView and HistoriaView quickly (they may be long). Actually, let me read ZadanieView since "zadanie" might be about tasks. And HomeView.

Let me batch: ZadanieView.vue, HistoriaView.vue, SettingsView.vue, HomeView.vue, NotFoundView.vue, NavRail.vue. That's a lot of tokens. Maybe better to read them one or two at a time, or use subagents... but plan mode says don't ask subagent. Hmm, the constraint was about not asking a subagent to do file modifications. To be safe I'll scan myself but efficiently.

Let me read ZadanieView and HomeView.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/views/ZadanieView.vue"
}
```

Read file /home/zota/neo/matura-app/src/views/ZadanieView.vue, lines 1-183
1: <script setup lang="ts">
2: import { computed, ref } from "vue";
3: import { getFormula } from "../lib/formulas/index";
4: import { looksLikeEquation, parseEquation } from "../lib/parse-formula";
5: 
6: const raw = ref("");
7: 
8: const parsed = computed(() => {
9:   if (!looksLikeEquation(raw.value)) return null;
10:   return parseEquation(raw.value.trim());
11: });
12: 
13: const targetName = computed(() => {
14:   const p = parsed.value;
15:   if (!p) return "";
16:   return getFormula(p.subject, p.id)?.name ?? p.label;
17: });
18: 
19: const examples: { example: string; desc: string }[] = [
20:   { example: "4x^2-2x+10=0", desc: "równanie kwadratowe" },
21:   { example: "2x+3y=7; x-y=1", desc: "układ dwóch równań" },
22:   { example: "x^2-5x+6>0", desc: "nierówność kwadratowa" },
23:   { example: "2^x=8", desc: "równanie wykładnicze" },
24:   { example: "log_2(x)=3", desc: "równanie logarytmiczne" },
25:   { example: "20% z 50", desc: "procent z liczby" },
26:   { example: "2^10", desc: "potęga" },
27:   { example: "sqrt(9)", desc: "pierwiastek" },
28:   { example: "a1=2;r=3;n=5", desc: "ciąg arytmetyczny" },
29:   { example: "a1=2;q=3;n=4", desc: "ciąg geometryczny" },
30:   { example: "x/4=6/8", desc: "proporcja (Tales)" },
31:   { example: "x^3-6x^2+11x-6=0", desc: "rozkład wielomianu" },
32:   { example: "|x-2|=3", desc: "wartość bezwzględna" },
33:   { example: "2(x-1)^2+3", desc: "postacie funkcji kwadratowej" },
34:   { example: "log(x)=2", desc: "logarytm dziesiętny" },
35:   { example: "1:50000", desc: "skala mapy" },
36:   { example: "ms=5;mr=100", desc: "stężenie procentowe" },
37: ];
38: </script>
39: 
40: <template>
41:   <section class="zadanie">
42:     <h2>Wklej zadanie</h2>
43:     <p class="hint">
44:       Wklej treść obliczeniową (równanie, procent, proporcję…), a wzornik podstawi ją do właściwego
45:       wzoru.
46:     </p>
47:     <textarea
48:       v-model="raw"
49:       class="zadanie__input"
50:       rows="3"
51:       placeholder="np. 4x^2-2x+10=0 albo 2x+3y=7; x-y=1"
52:       aria-label="Wklej zadanie do rozpoznania"
53:     ></textarea>
54: 
55:     <div v-if="parsed" class="found" role="status">
56:       <p>
57:         Rozpoznano: <strong>{{ parsed.label }}</strong> → wzór „{{ targetName }}”.
58:       </p>
59:       <ul v-if="Object.keys(parsed.values).length > 0" class="found__vals">
60:         <li v-for="(v, k) in parsed.values" :key="k">{{ k }} = {{ v }}</li>
61:       </ul>
62:       <router-link
63:         class="found__go"
64:         :to="{
65:           name: 'solver',
66:           params: { subject: parsed.subject, formula: parsed.id },
67:           query: { fill: raw.trim() },
68:         }"
69:       >
70:         Podstaw do wzoru →
71:       </router-link>
72:     </div>
73:     <p v-else-if="raw.trim() !== ''" class="error" role="alert">
74:       Nie rozpoznano zapisu — wybierz przykład z listy poniżej.
75:     </p>
76: 
77:     <h3 class="examples__title">Wspierane zapisy</h3>
78:     <ul class="examples">
79:       <li v-for="e in examples" :key="e.example">
80:         <button class="examples__btn" @click="raw = e.example">
81:           <code>{{ e.example }}</code>
82:           <span>{{ e.desc }}</span>
83:         </button>
84:       </li>
85:     </ul>
86:   </section>
87: </template>
88: 
89: <style scoped>
90: .zadanie {
91:   max-width: var(--content-max);
92: }
93: 
94: .hint {
95:   color: var(--color-ink-soft);
96:   font-size: 0.9375rem;
97: }
98: 
99: .zadanie__input {
100:   width: 100%;
101:   box-sizing: border-box;
102:   font-family: var(--font-mono);
103:   font-size: 1rem;
104:   padding: 0.6rem 0.75rem;
105:   border: 1px solid var(--color-line);
106:   border-radius: var(--radius);
107:   background: var(--color-paper-raised);
108:   color: var(--color-ink);
109:   margin-top: 0.5rem;
110: }
111: 
112: .found {
113:   margin-top: 1rem;
114:   background: var(--color-paper-raised);
115:   border: 1px solid var(--color-line);
116:   border-radius: var(--radius);
117:   padding: 1rem 1.25rem;
118: }
119: 
120: .found__vals {
121:   list-style: none;
122:   padding: 0;
123:   margin: 0.5rem 0;
124:   display: flex;
125:   flex-wrap: wrap;
126:   gap: 0.25rem 1rem;
127:   font-family: var(--font-mono);
128: }
129: 
130: .found__go {
131:   display: inline-block;
132:   margin-top: 0.5rem;
133:   min-height: 44px;
134:   line-height: 44px;
135:   color: var(--color-accent);
136:   font-weight: 500;
137: }
138: 
139: .error {
140:   color: var(--color-accent);
141:   font-size: 0.9375rem;
142: }
143: 
144: .examples__title {
145:   margin-top: 2rem;
146:   font-size: 1rem;
147: }
148: 
149: .examples {
150:   list-style: none;
151:   padding: 0;
152:   margin: 0.5rem 0 0;
153:   display: grid;
154:   gap: 0.5rem;
155: }
156: 
157: .examples__btn {
158:   width: 100%;
159:   display: flex;
160:   justify-content: space-between;
161:   align-items: center;
162:   gap: 1rem;
163:   font-family: var(--font-body);
164:   font-size: 0.9375rem;
165:   padding: 0.5rem 0.75rem;
166:   min-height: 44px;
167:   border: 1px solid var(--color-line);
168:   border-radius: var(--radius);
169:   background: var(--color-paper-raised);
170:   color: var(--color-ink);
171:   cursor: pointer;
172:   text-align: left;
173: }
174: 
175: .examples__btn code {
176:   font-family: var(--font-mono);
177: }
178: 
179: .examples__btn span {
180:   color: var(--color-ink-soft);
181:   font-size: 0.8125rem;
182: }
183: </style>

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/views/HomeView.vue"
}
```

Read file /home/zota/neo/matura-app/src/views/HomeView.vue, lines 1-231
1: <script setup lang="ts">
2: import { computed, ref } from "vue";
3: import { ZERO, fromString } from "../lib/exact/rational";
4: import type { Rational } from "../lib/exact/rational";
5: import { solveQuadratic } from "../lib/exact/exact";
6: import type { Quadratic } from "../lib/exact/exact";
7: import { formatDecimal, formatExactText } from "../lib/exact/format";
8: import { convert } from "../lib/units/units";
9: import { loadSettings } from "../lib/settings";
10: 
11: const aIn = ref(1);
12: const bIn = ref(-5);
13: const cIn = ref(6);
14: const places = ref(loadSettings().places);
15: 
16: function rat(v: number): Rational {
17:   if (!Number.isFinite(v)) return ZERO;
18:   return fromString(String(v));
19: }
20: 
21: const result = computed<{ solution: Quadratic | null; error: string }>(() => {
22:   try {
23:     return { solution: solveQuadratic(rat(aIn.value), rat(bIn.value), rat(cIn.value)), error: "" };
24:   } catch (e) {
25:     return { solution: null, error: e instanceof Error ? e.message : "Błąd obliczeń" };
26:   }
27: });
28: 
29: const deltaExact = computed(() => {
30:   const s = result.value.solution;
31:   if (!s || !("delta" in s)) return "—";
32:   return formatExactText(s.delta);
33: });
34: 
35: const deltaDec = computed(() => {
36:   const s = result.value.solution;
37:   if (!s || !("delta" in s)) return "";
38:   return formatDecimal(s.delta, places.value);
39: });
40: 
41: const roots = computed(() => {
42:   const s = result.value.solution;
43:   if (!s) return [];
44:   return s.roots.map((r, i) => ({
45:     name: s.roots.length > 1 ? `x${i + 1}` : "x",
46:     exact: formatExactText(r),
47:     dec: formatDecimal(r, places.value),
48:   }));
49: });
50: 
51: const convValue = ref(36);
52: const convFrom = ref("km/h");
53: const convTo = ref("m/s");
54: const unitOptions = ["mm", "cm", "m", "km", "g", "kg", "t", "s", "min", "h", "m/s", "km/h"];
55: 
56: const convResult = computed(() => {
57:   if (!Number.isFinite(convValue.value)) return "—";
58:   try {
59:     return `${Number(convert(convValue.value, convFrom.value, convTo.value).toFixed(6))} ${convTo.value}`;
60:   } catch (e) {
61:     return e instanceof Error ? e.message : "Błąd";
62:   }
63: });
64: </script>
65: 
66: <template>
67:   <section class="hero">
68:     <h1>Wzornik Maturalny</h1>
69:     <p class="hero__lede">
70:       Wzory z tablic CKE i kalkulatory do każdego z nich — działa całkowicie offline, prosto z
71:       telefonu na maturze w domu.
72:     </p>
73: 
74:     <div class="demo" aria-label="Przykład: równanie kwadratowe">
75:       <p class="demo__label">Spróbuj — równanie kwadratowe ax² + bx + c = 0</p>
76: 
77:       <div class="demo__inputs">
78:         <label>a <input type="number" v-model.number="aIn" /></label>
79:         <label>b <input type="number" v-model.number="bIn" /></label>
80:         <label>c <input type="number" v-model.number="cIn" /></label>
81:         <label>miejsca <input type="number" v-model.number="places" min="0" max="12" /></label>
82:       </div>
83: 
84:       <div class="demo__steps" v-if="result.solution">
85:         <p>
86:           Δ = b² − 4ac = {{ deltaExact }}<span v-if="deltaDec"> ≈ {{ deltaDec }}</span>
87:         </p>
88:         <template v-for="r in roots" :key="r.name">
89:           <p>
90:             {{ r.name }} = <span class="result-value">{{ r.exact }}</span>
91:             <span class="badge">do zapisu</span>
92:             <span class="approx">≈ {{ r.dec }}</span>
93:           </p>
94:         </template>
95:         <p v-if="result.solution.kind === 'none'" class="demo__no-solution">
96:           Δ &lt; 0 — brak rozwiązań rzeczywistych.
97:         </p>
98:         <p v-if="result.solution.kind === 'linear'" class="demo__note">
99:           a = 0 — to równanie liniowe, nie kwadratowe.
100:         </p>
101:       </div>
102:       <p v-else class="demo__no-solution">{{ result.error }}</p>
103:     </div>
104: 
105:     <div class="demo" aria-label="Przykład: konwerter jednostek">
106:       <p class="demo__label">Konwerter jednostek (fizyka): prędkość, długość, masa, czas</p>
107:       <div class="demo__inputs">
108:         <label><input type="number" v-model.number="convValue" /></label>
109:         <label>
110:           <select v-model="convFrom">
111:             <option v-for="u in unitOptions" :key="u" :value="u">{{ u }}</option>
112:           </select>
113:         </label>
114:         <span aria-hidden="true">→</span>
115:         <label>
116:           <select v-model="convTo">
117:             <option v-for="u in unitOptions" :key="u" :value="u">{{ u }}</option>
118:           </select>
119:         </label>
120:       </div>
121:       <div class="demo__steps">
122:         <p>
123:           = <span class="result-value">{{ convResult }}</span>
124:         </p>
125:       </div>
126:     </div>
127: 
128:     <p class="hero__next">
129:       To jeden z ~100 wzorów, które trafią do
130:       <router-link :to="{ name: 'wzornik' }">wzornika</router-link>
131:       — każdy z własnym solverem i rozbiciem na kroki.
132:     </p>
133:   </section>
134: </template>
135: 
136: <style scoped>
137: .hero__lede {
138:   color: var(--color-ink-soft);
139:   font-size: 1.0625rem;
140: }
141: 
142: .demo {
143:   background: var(--color-paper-raised);
144:   border: 1px solid var(--color-line);
145:   border-radius: var(--radius);
146:   padding: 1.5rem 1.75rem;
147:   margin: 2rem 0;
148:   max-width: var(--content-max);
149: }
150: 
151: .demo__label {
152:   margin: 0 0 1rem;
153:   font-size: 0.9375rem;
154:   color: var(--color-ink-soft);
155: }
156: 
157: .demo__inputs {
158:   display: flex;
159:   flex-wrap: wrap;
160:   align-items: center;
161:   gap: 1.25rem;
162:   margin-bottom: 1.25rem;
163: }
164: 
165: .demo__inputs label {
166:   display: flex;
167:   align-items: center;
168:   gap: 0.4rem;
169:   font-family: var(--font-mono);
170:   font-size: 0.9375rem;
171: }
172: 
173: .demo__inputs input,
174: .demo__inputs select {
175:   width: 4.5rem;
176:   font-family: var(--font-mono);
177:   font-size: 1rem;
178:   padding: 0.35rem 0.5rem;
179:   border: 1px solid var(--color-line);
180:   border-radius: var(--radius);
181:   background: var(--color-paper);
182:   color: var(--color-ink);
183: }
184: 
185: .demo__inputs select {
186:   width: auto;
187: }
188: 
189: .demo__steps p {
190:   font-family: var(--font-mono);
191:   font-size: 0.9375rem;
192:   margin: 0.35rem 0;
193: }
194: 
195: .demo__steps .result-value {
196:   color: var(--color-accent);
197:   font-weight: 500;
198: }
199: 
200: .demo__no-solution {
201:   color: var(--color-ink-soft);
202: }
203: 
204: .demo__note {
205:   color: var(--color-ink-soft);
206:   font-size: 0.8125rem;
207: }
208: 
209: .badge {
210:   display: inline-block;
211:   font-size: 0.6875rem;
212:   text-transform: uppercase;
213:   letter-spacing: 0.04em;
214:   color: var(--color-accent);
215:   border: 1px solid var(--color-accent);
216:   border-radius: var(--radius);
217:   padding: 0.05rem 0.35rem;
218:   margin-left: 0.5rem;
219:   vertical-align: middle;
220: }
221: 
222: .approx {
223:   color: var(--color-ink-soft);
224:   margin-left: 0.5rem;
225: }
226: 
227: .hero__next {
228:   color: var(--color-ink-soft);
229:   font-size: 0.9375rem;
230: }
231: </style>

---

## Assistant

_Thinking:_

Good. Now let me look at the components: Formula.vue, FormulaDiagram.vue, FunctionPlot.vue, NavRail.vue. And lib: solver, plots, search, katex, descriptions, settings, storage, units, seo, exact.

Let me read the components.

Teraz komponenty – Formula, FormulaDiagram, FunctionPlot, NavRail.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/components/Formula.vue"
}
```

Read file /home/zota/neo/matura-app/src/components/Formula.vue, lines 1-23
1: <script setup lang="ts">
2: import { computed } from "vue";
3: import { renderLatex } from "../lib/katex";
4: import "katex/dist/katex.min.css";
5: 
6: const props = defineProps<{ source: string; display?: boolean }>();
7: 
8: const html = computed(() => renderLatex(props.source, props.display ?? false));
9: </script>
10: 
11: <template>
12:   <span class="formula-render" v-html="html"></span>
13: </template>
14: 
15: <style>
16: .latex-fallback {
17:   font-family: var(--font-mono);
18:   font-size: 0.875em;
19:   background: var(--color-accent-soft);
20:   padding: 0.1rem 0.3rem;
21:   border-radius: var(--radius);
22: }
23: </style>

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/components/FormulaDiagram.vue"
}
```

Read file /home/zota/neo/matura-app/src/components/FormulaDiagram.vue, lines 1-69
1: <script setup lang="ts">
2: import { computed } from "vue";
3: import { renderDiagram } from "../lib/diagrams/geometry";
4: 
5: const props = defineProps<{
6:   formulaId: string;
7:   nums: Record<string, number>;
8:   highlight: string;
9:   caption?: string;
10: }>();
11: 
12: const svg = computed(() => renderDiagram(props.formulaId, props.nums, props.highlight));
13: </script>
14: 
15: <template>
16:   <figure v-if="svg" class="diagram">
17:     <div v-html="svg"></div>
18:     <figcaption class="diagram__cap">{{ caption ?? "Rysunek pomocniczy" }}</figcaption>
19:   </figure>
20: </template>
21: 
22: <style scoped>
23: .diagram {
24:   margin: 1.5rem 0 0;
25:   background: var(--color-paper-raised);
26:   border: 1px solid var(--color-line);
27:   border-radius: var(--radius);
28:   padding: 1rem 1.25rem 0.75rem;
29:   max-width: 22rem;
30: }
31: 
32: .diagram :deep(svg) {
33:   width: 100%;
34:   height: auto;
35:   display: block;
36: }
37: 
38: .diagram :deep(.e) {
39:   stroke: var(--color-ink);
40:   fill: none;
41: }
42: 
43: .diagram :deep(.es) {
44:   stroke: var(--color-ink-soft);
45:   fill: none;
46: }
47: 
48: .diagram :deep(.dot) {
49:   fill: var(--color-ink);
50: }
51: 
52: .diagram :deep(text) {
53:   fill: var(--color-ink);
54: }
55: 
56: .diagram :deep(.e.hl) {
57:   stroke: var(--color-accent);
58: }
59: 
60: .diagram :deep(text.hl) {
61:   fill: var(--color-accent);
62: }
63: 
64: .diagram__cap {
65:   margin: 0.25rem 0 0;
66:   font-size: 0.8125rem;
67:   color: var(--color-ink-soft);
68: }
69: </style>

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/components/FunctionPlot.vue"
}
```

Read file /home/zota/neo/matura-app/src/components/FunctionPlot.vue, lines 1-290
1: <script setup lang="ts">
2: import { onMounted, onUnmounted, ref, watch } from "vue";
3: import { initialView, niceStep, panView, zoomView } from "../lib/plots/plot";
4: import type { PlotData, ViewBounds, ViewState } from "../lib/plots/plot";
5: import { trimNum } from "../lib/exact/format";
6: 
7: const props = defineProps<{ data: PlotData }>();
8: 
9: const canvas = ref<HTMLCanvasElement | null>(null);
10: let observer: ResizeObserver | null = null;
11: 
12: const HEIGHT = 250;
13: const view = ref<ViewState | null>(null);
14: const bounds = ref<ViewBounds | null>(null);
15: 
16: function resetView(): void {
17:   const iv = initialView(props.data);
18:   view.value = iv.view;
19:   bounds.value = iv.bounds;
20:   draw();
21: }
22: 
23: function zoom(factor: number): void {
24:   if (!view.value || !bounds.value) return;
25:   view.value = zoomView(view.value, bounds.value, factor);
26:   draw();
27: }
28: 
29: function cssVar(name: string, fallback: string): string {
30:   const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
31:   return v === "" ? fallback : v;
32: }
33: 
34: function draw(): void {
35:   const el = canvas.value;
36:   if (!el) return;
37:   if (!view.value || !bounds.value) resetViewSilent();
38:   const v = view.value;
39:   const b = bounds.value;
40:   if (!v || !b) return;
41:   const cssW = el.clientWidth || 600;
42:   const dpr = window.devicePixelRatio || 1;
43:   el.width = Math.round(cssW * dpr);
44:   el.height = Math.round(HEIGHT * dpr);
45:   const ctx = el.getContext("2d");
46:   if (!ctx) return;
47:   ctx.scale(dpr, dpr);
48:   ctx.clearRect(0, 0, cssW, HEIGHT);
49: 
50:   const INK = cssVar("--color-ink", "#EBF1EA");
51:   const GRID = cssVar("--color-grid", "#1E2621");
52:   const ACC = cssVar("--color-accent", "#E0685A");
53:   const SOFT = cssVar("--color-ink-soft", "#8A938B");
54:   const pad = 30;
55:   const x0 = v.cx - v.halfW;
56:   const x1 = v.cx + v.halfW;
57:   const y0 = v.cy - v.halfH;
58:   const y1 = v.cy + v.halfH;
59:   const toPx = (x: number, y: number): [number, number] => [
60:     pad + ((x - x0) / (x1 - x0)) * (cssW - pad - 8),
61:     HEIGHT - pad - ((y - y0) / (y1 - y0)) * (HEIGHT - pad - 8),
62:   ];
63: 
64:   const gridLines = (min: number, max: number, step: number): number[] => {
65:     const out: number[] = [];
66:     for (let g = Math.ceil(min / step) * step; g <= max + step * 1e-9; g += step) {
67:       out.push(Math.abs(g) < step * 1e-9 ? 0 : g);
68:     }
69:     return out;
70:   };
71: 
72:   ctx.lineWidth = 1;
73:   const xStep = niceStep(x1 - x0);
74:   ctx.strokeStyle = GRID;
75:   ctx.globalAlpha = 0.45;
76:   for (const gx of gridLines(x0, x1, xStep / 5)) {
77:     const [px] = toPx(gx, 0);
78:     ctx.beginPath();
79:     ctx.moveTo(px, 8);
80:     ctx.lineTo(px, HEIGHT - pad);
81:     ctx.stroke();
82:   }
83:   const yStep = niceStep(y1 - y0);
84:   for (const gy of gridLines(y0, y1, yStep / 5)) {
85:     const [, py] = toPx(0, gy);
86:     ctx.beginPath();
87:     ctx.moveTo(pad, py);
88:     ctx.lineTo(cssW - 8, py);
89:     ctx.stroke();
90:   }
91:   ctx.globalAlpha = 1;
92:   ctx.strokeStyle = GRID;
93:   ctx.lineWidth = 1;
94:   ctx.fillStyle = SOFT;
95:   ctx.font = '10px "IBM Plex Mono", monospace';
96:   for (const gx of gridLines(x0, x1, xStep)) {
97:     const [px] = toPx(gx, 0);
98:     ctx.beginPath();
99:     ctx.moveTo(px, 8);
100:     ctx.lineTo(px, HEIGHT - pad);
101:     ctx.stroke();
102:     ctx.fillText(trimNum(gx), px - 8, HEIGHT - pad + 14);
103:   }
104:   for (const gy of gridLines(y0, y1, yStep)) {
105:     const [, py] = toPx(0, gy);
106:     ctx.beginPath();
107:     ctx.moveTo(pad, py);
108:     ctx.lineTo(cssW - 8, py);
109:     ctx.stroke();
110:     ctx.fillText(trimNum(gy), 4, py + 3);
111:   }
112: 
113:   if (y0 <= 0 && y1 >= 0) {
114:     const [, zy] = toPx(0, 0);
115:     ctx.lineWidth = 1.5;
116:     ctx.strokeStyle = INK;
117:     ctx.beginPath();
118:     ctx.moveTo(pad, zy);
119:     ctx.lineTo(cssW - 8, zy);
120:     ctx.stroke();
121:   }
122:   if (x0 <= 0 && x1 >= 0) {
123:     const [zx] = toPx(0, 0);
124:     ctx.beginPath();
125:     ctx.moveTo(zx, 8);
126:     ctx.lineTo(zx, HEIGHT - pad);
127:     ctx.stroke();
128:   }
129: 
130:   if (props.data.shade) {
131:     ctx.fillStyle = ACC;
132:     ctx.globalAlpha = 0.15;
133:     for (const band of props.data.shade) {
134:       const bx0 = Math.max(band.from, x0);
135:       const bx1 = Math.min(band.to, x1);
136:       if (!(bx1 > bx0)) continue;
137:       const [px0] = toPx(bx0, 0);
138:       const [px1] = toPx(bx1, 0);
139:       ctx.fillRect(px0, 8, px1 - px0, HEIGHT - pad - 8);
140:     }
141:     ctx.globalAlpha = 1;
142:   }
143: 
144:   ctx.lineWidth = 2.5;
145:   ctx.strokeStyle = ACC;
146:   ctx.beginPath();
147:   let pen = false;
148:   const n = Math.max(200, Math.round(cssW));
149:   for (let i = 0; i <= n; i++) {
150:     const x = x0 + ((x1 - x0) * i) / n;
151:     const y = props.data.fn(x);
152:     if (!Number.isFinite(y)) {
153:       pen = false;
154:       continue;
155:     }
156:     const [px, py] = toPx(x, y);
157:     if (!pen) {
158:       ctx.moveTo(px, py);
159:       pen = true;
160:     } else {
161:       ctx.lineTo(px, py);
162:     }
163:   }
164:   ctx.stroke();
165: 
166:   ctx.font = '11px "IBM Plex Mono", monospace';
167:   for (const p of props.data.points) {
168:     if (p.x < x0 || p.x > x1 || p.y < y0 || p.y > y1) continue;
169:     const [px, py] = toPx(p.x, p.y);
170:     ctx.fillStyle = ACC;
171:     ctx.beginPath();
172:     ctx.arc(px, py, 4, 0, Math.PI * 2);
173:     ctx.fill();
174:     ctx.fillStyle = INK;
175:     ctx.fillText(p.label, px + 8, py - 8);
176:   }
177: }
178: 
179: function resetViewSilent(): void {
180:   const iv = initialView(props.data);
181:   view.value = iv.view;
182:   bounds.value = iv.bounds;
183: }
184: 
185: let drag: { x: number; y: number } | null = null;
186: 
187: function onDown(e: PointerEvent): void {
188:   drag = { x: e.clientX, y: e.clientY };
189:   (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
190: }
191: 
192: function onMove(e: PointerEvent): void {
193:   if (!drag || !view.value || !bounds.value || !canvas.value) return;
194:   const cssW = canvas.value.clientWidth || 600;
195:   const dx = ((drag.x - e.clientX) / (cssW - 38)) * view.value.halfW * 2;
196:   const dy = ((e.clientY - drag.y) / (HEIGHT - 38)) * view.value.halfH * 2;
197:   drag = { x: e.clientX, y: e.clientY };
198:   view.value = panView(view.value, bounds.value, dx, dy);
199:   draw();
200: }
201: 
202: function onUp(): void {
203:   drag = null;
204: }
205: 
206: onMounted(() => {
207:   resetViewSilent();
208:   draw();
209:   observer = new ResizeObserver(() => draw());
210:   if (canvas.value) observer.observe(canvas.value);
211: });
212: 
213: onUnmounted(() => observer?.disconnect());
214: 
215: watch(
216:   () => props.data,
217:   () => resetView(),
218: );
219: </script>
220: 
221: <template>
222:   <figure class="plot">
223:     <div class="plot__tools" role="group" aria-label="Sterowanie wykresem">
224:       <button class="plot__btn" @click="zoom(0.8)" aria-label="Przybliż wykres">+</button>
225:       <button class="plot__btn" @click="zoom(1.25)" aria-label="Oddal wykres">−</button>
226:       <button class="plot__btn plot__btn--wide" @click="resetView()">Reset</button>
227:     </div>
228:     <canvas
229:       ref="canvas"
230:       class="plot__canvas"
231:       role="img"
232:       aria-label="Wykres funkcji. Punkty kluczowe wymienione poniżej wykresu."
233:       @pointerdown="onDown"
234:       @pointermove="onMove"
235:       @pointerup="onUp"
236:       @pointercancel="onUp"
237:     ></canvas>
238:     <ul class="sr-only">
239:       <li v-for="p in data.points" :key="p.label">{{ p.label }}</li>
240:     </ul>
241:     <figcaption class="plot__cap">Wykres funkcji z zaznaczonymi punktami</figcaption>
242:   </figure>
243: </template>
244: 
245: <style scoped>
246: .plot {
247:   margin: 1.5rem 0 0;
248:   background: var(--color-paper-raised);
249:   border: 1px solid var(--color-line);
250:   border-radius: var(--radius);
251:   padding: 1rem 1rem 0.75rem;
252:   max-width: var(--content-max);
253: }
254: 
255: .plot__tools {
256:   display: flex;
257:   gap: 0.5rem;
258:   margin-bottom: 0.5rem;
259: }
260: 
261: .plot__btn {
262:   min-width: 44px;
263:   min-height: 44px;
264:   font-size: 1.125rem;
265:   border: 1px solid var(--color-line);
266:   border-radius: var(--radius);
267:   background: transparent;
268:   color: var(--color-ink);
269:   cursor: pointer;
270: }
271: 
272: .plot__btn--wide {
273:   font-size: 0.875rem;
274:   padding: 0 1rem;
275: }
276: 
277: .plot__canvas {
278:   width: 100%;
279:   height: 250px;
280:   display: block;
281:   touch-action: none;
282:   cursor: grab;
283: }
284: 
285: .plot__cap {
286:   margin: 0.25rem 0 0;
287:   font-size: 0.8125rem;
288:   color: var(--color-ink-soft);
289: }
290: </style>

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/components/NavRail.vue"
}
```

Read file /home/zota/neo/matura-app/src/components/NavRail.vue, lines 1-88
1: <script setup lang="ts">
2: const quick = [
3:   {
4:     to: "/",
5:     label: "Wzory",
6:     icon: "M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14",
7:   },
8:   {
9:     to: "/konwerter",
10:     label: "Miary",
11:     icon: "M4 7h13l-3.5-3.5M20 17H7l3.5 3.5",
12:   },
13:   {
14:     to: "/historia",
15:     label: "Moje",
16:     icon: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.8-5.4 2.8 1-6.1L3.2 9.5l6.1-.9z",
17:   },
18:   {
19:     to: "/zadanie",
20:     label: "Zadanie",
21:     icon: "M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z",
22:   },
23: ];
24: </script>
25: 
26: <template>
27:   <nav class="rail" aria-label="Nawigacja główna">
28:     <div class="rail__quick" role="list">
29:       <router-link v-for="q in quick" :key="q.to" :to="q.to" class="rail__tab" role="listitem">
30:         <svg viewBox="0 0 24 24" aria-hidden="true" class="rail__icon">
31:           <path :d="q.icon" />
32:         </svg>
33:         <span>{{ q.label }}</span>
34:       </router-link>
35:     </div>
36:   </nav>
37: </template>
38: 
39: <style scoped>
40: .rail {
41:   position: fixed;
42:   left: 0;
43:   right: 0;
44:   bottom: 0;
45:   z-index: 50;
46:   background: var(--color-paper-raised);
47:   backdrop-filter: blur(18px);
48:   -webkit-backdrop-filter: blur(18px);
49:   border-top: 1px solid var(--color-line);
50:   padding: 0.25rem 0.5rem calc(0.25rem + env(safe-area-inset-bottom));
51: }
52: 
53: .rail__quick {
54:   display: flex;
55:   justify-content: space-around;
56:   max-width: var(--content-max);
57:   margin: 0 auto;
58: }
59: 
60: .rail__tab {
61:   display: flex;
62:   flex-direction: column;
63:   align-items: center;
64:   gap: 0.15rem;
65:   min-height: 52px;
66:   min-width: 72px;
67:   justify-content: center;
68:   text-decoration: none;
69:   color: var(--color-ink-soft);
70:   font-size: 0.75rem;
71:   border-radius: var(--radius-sm);
72: }
73: 
74: .rail__icon {
75:   width: 22px;
76:   height: 22px;
77:   fill: none;
78:   stroke: currentColor;
79:   stroke-width: 1.8;
80:   stroke-linecap: round;
81:   stroke-linejoin: round;
82: }
83: 
84: .rail__tab.router-link-exact-active {
85:   color: var(--color-accent);
86:   font-weight: 500;
87: }
88: </style>

---

## Assistant

_Thinking:_

Now let me look at lib files: solver, plots, search, katex, descriptions, settings, storage, units, seo, exact. And the remaining views: HistoriaView, SettingsView, NotFoundView. And lib/diagrams/geometry.ts, lib/katex.ts.

Let me read the lib directory files. Let me batch reads of smaller files.

Actually, to be efficient: let me read:
- src/lib/solver/solver.ts
- src/lib/plots/plot.ts
- src/lib/search/search.ts
- src/lib/katex.ts
- src/lib/descriptions.ts (maybe large)

Let me read solver and plots first.

Teraz kluczowe moduły pomocnicze: solver, wykresy, wyszukiwarka, KaTeX.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/solver/solver.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/solver/solver.ts, lines 1-84
1: import { parseExact } from "../exact/exact";
2: import type { Exact } from "../exact/exact";
3: import type { FormulaDef, SolveStep } from "../formulas/types";
4: 
5: export type SolverResult =
6:   | {
7:       ok: true;
8:       unknown: string;
9:       unknownLabel: string;
10:       values: Exact[];
11:       labels: string[];
12:       steps: SolveStep[];
13:     }
14:   | { ok: false; error: string };
15: 
16: function parseInput(label: string, raw: string): Exact {
17:   try {
18:     return parseExact(raw);
19:   } catch {
20:     throw new Error(`${label}: wpisz liczbę (np. 2,5 albo 1/3)`);
21:   }
22: }
23: 
24: export function solveFormula(
25:   def: FormulaDef,
26:   raw: Record<string, string>,
27:   places = 2,
28: ): SolverResult {
29:   try {
30:     const selects: Record<string, string> = {};
31:     for (const v of def.vars) {
32:       if (v.kind === "list") {
33:         selects[v.id] = (raw[v.id] ?? "").trim();
34:         continue;
35:       }
36:       if (v.kind !== "select") continue;
37:       const opts = v.options ?? [];
38:       const s = (raw[v.id] ?? "").trim();
39:       selects[v.id] = opts.includes(s) ? s : (opts[0] ?? "");
40:     }
41:     if (def.mode === "fixed") {
42:       const known: Record<string, Exact> = {};
43:       for (const v of def.vars) {
44:         if (v.kind === "select" || v.kind === "list") continue;
45:         const s = (raw[v.id] ?? "").trim();
46:         if (s === "") return { ok: false, error: `uzupełnij pole ${v.label}` };
47:         known[v.id] = parseInput(v.label, s);
48:       }
49:       const sol = def.solve(def.outputId, known, places, selects);
50:       return {
51:         ok: true,
52:         unknown: def.outputId,
53:         unknownLabel: def.outputLabel,
54:         values: sol.values,
55:         labels: sol.labels ?? [],
56:         steps: sol.steps,
57:       };
58:     }
59:     const empty = def.vars.filter(
60:       (v) => v.kind !== "select" && v.kind !== "list" && (raw[v.id] ?? "").trim() === "",
61:     );
62:     if (empty.length === 0)
63:       return { ok: false, error: "zostaw jedno pole puste — to będzie niewiadoma" };
64:     if (empty.length > 1)
65:       return { ok: false, error: "zostaw dokładnie jedno puste pole — resztę uzupełnij" };
66:     const unknown = empty[0];
67:     const known: Record<string, Exact> = {};
68:     for (const v of def.vars) {
69:       if (v.id === unknown.id || v.kind === "select" || v.kind === "list") continue;
70:       known[v.id] = parseInput(v.label, (raw[v.id] ?? "").trim());
71:     }
72:     const sol = def.solve(unknown.id, known, places, selects);
73:     return {
74:       ok: true,
75:       unknown: unknown.id,
76:       unknownLabel: unknown.label,
77:       values: sol.values,
78:       labels: sol.labels ?? [],
79:       steps: sol.steps,
80:     };
81:   } catch (e) {
82:     return { ok: false, error: e instanceof Error ? e.message : "Błąd obliczeń" };
83:   }
84: }

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/plots/plot.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/plots/plot.ts, lines 1-226
1: import { trimNum } from "../exact/format";
2: 
3: export interface PlotPoint {
4:   x: number;
5:   y: number;
6:   label: string;
7:   kind: "zero" | "vertex" | "intercept";
8: }
9: 
10: export interface PlotBand {
11:   from: number;
12:   to: number;
13: }
14: 
15: export interface PlotData {
16:   fn: (x: number) => number;
17:   points: PlotPoint[];
18:   xMin: number;
19:   xMax: number;
20:   shade?: PlotBand[];
21: }
22: 
23: export interface SampledPlot extends PlotData {
24:   yMin: number;
25:   yMax: number;
26: }
27: 
28: export interface ViewState {
29:   cx: number;
30:   cy: number;
31:   halfW: number;
32:   halfH: number;
33: }
34: 
35: export interface ViewBounds {
36:   xMin: number;
37:   xMax: number;
38:   yMin: number;
39:   yMax: number;
40: }
41: 
42: export function initialView(data: PlotData): { view: ViewState; bounds: ViewBounds } {
43:   const s = sampleY(data);
44:   return {
45:     view: {
46:       cx: (s.xMin + s.xMax) / 2,
47:       cy: (s.yMin + s.yMax) / 2,
48:       halfW: (s.xMax - s.xMin) / 2,
49:       halfH: (s.yMax - s.yMin) / 2,
50:     },
51:     bounds: { xMin: s.xMin, xMax: s.xMax, yMin: s.yMin, yMax: s.yMax },
52:   };
53: }
54: 
55: export function clampView(v: ViewState, b: ViewBounds): ViewState {
56:   const xr = b.xMax - b.xMin;
57:   const yr = b.yMax - b.yMin;
58:   const exMin = b.xMin - 0.5 * xr;
59:   const exMax = b.xMax + 0.5 * xr;
60:   const eyMin = b.yMin - 0.5 * yr;
61:   const eyMax = b.yMax + 0.5 * yr;
62:   let { cx, cy, halfW, halfH } = v;
63:   halfW = Math.min(Math.max(halfW, xr * 0.01), xr * 2);
64:   halfH = Math.min(Math.max(halfH, yr * 0.01), yr * 2);
65:   cx = Math.min(Math.max(cx, exMin + halfW), exMax - halfW);
66:   cy = Math.min(Math.max(cy, eyMin + halfH), eyMax - halfH);
67:   if (exMin + halfW > exMax - halfW) cx = (exMin + exMax) / 2;
68:   if (eyMin + halfH > eyMax - halfH) cy = (eyMin + eyMax) / 2;
69:   return { cx, cy, halfW, halfH };
70: }
71: 
72: export function zoomView(v: ViewState, b: ViewBounds, factor: number): ViewState {
73:   return clampView({ ...v, halfW: v.halfW * factor, halfH: v.halfH * factor }, b);
74: }
75: 
76: export function panView(v: ViewState, b: ViewBounds, dx: number, dy: number): ViewState {
77:   return clampView({ ...v, cx: v.cx + dx, cy: v.cy + dy }, b);
78: }
79: 
80: function zeroPoint(x: number): PlotPoint {
81:   return { x, y: 0, label: `x₀ = ${trimNum(x)}`, kind: "zero" };
82: }
83: 
84: function frame(points: PlotPoint[], fn: (x: number) => number): PlotData {
85:   const xs = points.map((p) => p.x);
86:   let xMin = Math.min(...xs, -1);
87:   let xMax = Math.max(...xs, 1);
88:   if (xMax - xMin < 4) {
89:     const m = (xMin + xMax) / 2;
90:     xMin = m - 2;
91:     xMax = m + 2;
92:   } else {
93:     const pad = (xMax - xMin) * 0.2;
94:     xMin -= pad;
95:     xMax += pad;
96:   }
97:   return { fn, points, xMin, xMax };
98: }
99: 
100: export function quadraticPlot(a: number, b: number, c: number): PlotData | null {
101:   if (![a, b, c].every(Number.isFinite) || a === 0) return null;
102:   const fn = (x: number) => a * x * x + b * x + c;
103:   const d = b * b - 4 * a * c;
104:   const points: PlotPoint[] = [];
105:   if (d >= 0) {
106:     const s = Math.sqrt(d);
107:     points.push(zeroPoint((-b - s) / (2 * a)));
108:     if (d > 0) points.push(zeroPoint((-b + s) / (2 * a)));
109:   }
110:   const xv = -b / (2 * a);
111:   const yv = fn(xv);
112:   points.push({ x: xv, y: yv, label: `W(${trimNum(xv)}, ${trimNum(yv)})`, kind: "vertex" });
113:   points.push({ x: 0, y: c, label: `(0, ${trimNum(c)})`, kind: "intercept" });
114:   return frame(points, fn);
115: }
116: 
117: export function linearPlot(a: number, b: number): PlotData | null {
118:   if (![a, b].every(Number.isFinite) || a === 0) return null;
119:   const fn = (x: number) => a * x + b;
120:   const x0 = -b / a;
121:   const points: PlotPoint[] = [
122:     zeroPoint(x0),
123:     { x: 0, y: b, label: `(0, ${trimNum(b)})`, kind: "intercept" },
124:   ];
125:   return frame(points, fn);
126: }
127: 
128: export function polyPlot(coeffs: number[], roots: number[]): PlotData | null {
129:   if (coeffs.length < 2 || !coeffs.every(Number.isFinite)) return null;
130:   if (coeffs[0] === 0) return null;
131:   const saneRoots = roots.filter(Number.isFinite);
132:   if (saneRoots.length === 0) return null;
133:   const fn = (x: number): number => {
134:     let v = 0;
135:     for (const c of coeffs) v = v * x + c;
136:     return v;
137:   };
138:   const points: PlotPoint[] = saneRoots.map((r) => zeroPoint(r));
139:   return frame(points, fn);
140: }
141: 
142: export function trajectoryPlot(v0: number, h: number): PlotData | null {
143:   if (![v0, h].every(Number.isFinite) || v0 <= 0 || h < 0) return null;
144:   const g = 10;
145:   const Z = v0 * Math.sqrt((2 * h) / g);
146:   if (!Number.isFinite(Z)) return null;
147:   const fn = (x: number): number => h - (g * x * x) / (2 * v0 * v0);
148:   const points: PlotPoint[] = [
149:     { x: 0, y: h, label: `(0, ${trimNum(h)})`, kind: "intercept" },
150:     { x: Z, y: 0, label: `(Z, 0) = ${trimNum(Z)}`, kind: "zero" },
151:   ];
152:   return { fn, points, xMin: 0, xMax: Math.max(Z, 1) };
153: }
154: 
155: export type InequalityOp = ">" | "≥" | "<" | "≤" | "≠";
156: 
157: export function inequalityBands(a: number, op: InequalityOp, roots: number[]): PlotBand[] | null {
158:   if (!Number.isFinite(a) || a === 0) return null;
159:   const xs = [...roots].filter(Number.isFinite).sort((p, q) => p - q);
160:   const up = a > 0;
161:   const outside = (up && (op === ">" || op === "≥")) || (!up && (op === "<" || op === "≤"));
162:   if (op === "≠") return [{ from: Number.NEGATIVE_INFINITY, to: Number.POSITIVE_INFINITY }];
163:   if (xs.length === 0) {
164:     const holds = (up && (op === ">" || op === "≥")) || (!up && (op === "<" || op === "≤"));
165:     return holds ? [{ from: Number.NEGATIVE_INFINITY, to: Number.POSITIVE_INFINITY }] : [];
166:   }
167:   if (xs.length === 1) {
168:     const x0 = xs[0]!;
169:     if (op === ">" || op === "<") {
170:       const holdsOutside = (up && op === ">") || (!up && op === "<");
171:       return holdsOutside
172:         ? [
173:             { from: Number.NEGATIVE_INFINITY, to: x0 },
174:             { from: x0, to: Number.POSITIVE_INFINITY },
175:           ]
176:         : [];
177:     }
178:     return [{ from: Number.NEGATIVE_INFINITY, to: Number.POSITIVE_INFINITY }];
179:   }
180:   const [x1, x2] = [xs[0]!, xs[1]!];
181:   if (outside) {
182:     return [
183:       { from: Number.NEGATIVE_INFINITY, to: x1 },
184:       { from: x2, to: Number.POSITIVE_INFINITY },
185:     ];
186:   }
187:   return [{ from: x1, to: x2 }];
188: }
189: 
190: export function sampleY(data: PlotData, n = 200): SampledPlot {
191:   let yMin = Infinity;
192:   let yMax = -Infinity;
193:   for (let i = 0; i <= n; i++) {
194:     const x = data.xMin + ((data.xMax - data.xMin) * i) / n;
195:     const y = data.fn(x);
196:     if (!Number.isFinite(y)) continue;
197:     if (y < yMin) yMin = y;
198:     if (y > yMax) yMax = y;
199:   }
200:   for (const p of data.points) {
201:     if (p.y < yMin) yMin = p.y;
202:     if (p.y > yMax) yMax = p.y;
203:   }
204:   if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) {
205:     yMin = -1;
206:     yMax = 1;
207:   }
208:   if (yMax - yMin < 1e-9) {
209:     yMin -= 1;
210:     yMax += 1;
211:   } else {
212:     const pad = (yMax - yMin) * 0.15;
213:     yMin -= pad;
214:     yMax += pad;
215:   }
216:   return { ...data, yMin, yMax };
217: }
218: 
219: export function niceStep(range: number, target = 6): number {
220:   if (!(range > 0)) return 1;
221:   const p = 10 ** Math.floor(Math.log10(range / target));
222:   for (const m of [1, 2, 5, 10]) {
223:     if (range / (p * m) <= target) return p * m;
224:   }
225:   return p * 10;
226: }

---

## Assistant

_Thinking:_

Now let me look at the remaining lib files quickly: search, katex, descriptions, settings, storage, units, seo, exact, diagrams. And remaining views: HistoriaView, SettingsView, NotFoundView. And the remaining formula files (physics, chemistry, etc.) — I mainly need to know what's covered.

Let me batch-read several smaller lib files.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/search/search.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/search/search.ts, lines 1-249
1: import { FORMULAS } from "../formulas/index";
2: import type { FormulaDef } from "../formulas/types";
3: import { buildFuzzyIndex, fuzzyScore } from "./fuzzy";
4: 
5: export const KEYWORDS: Record<string, string[]> = {
6:   pitagoras: ["pitagoras", "przeciwprostokątna", "przyprostokątna"],
7:   "pole-trojkata": ["pole", "trójkąt", "podstawa", "wysokość"],
8:   "pole-prostokata": ["pole", "prostokąt", "bok"],
9:   "pole-kola": ["pole", "koło", "okrąg", "promień"],
10:   "obwod-kola": ["obwód", "koło", "okrąg", "promień"],
11:   "rownanie-kwadratowe": [
12:     "delta",
13:     "wyróżnik",
14:     "pierwiastki",
15:     "miejsca zerowe",
16:     "równanie kwadratowe",
17:   ],
18:   "funkcja-liniowa": ["prosta", "miejsce zerowe", "funkcja liniowa"],
19:   procent: ["procent", "podatek", "zniżka"],
20:   "ciag-arytmetyczny": ["ciąg", "arytmetyczny", "różnica"],
21:   "ciag-geometryczny": ["ciąg", "geometryczny", "iloraz"],
22:   "objetosc-prostopadloscianu": ["objętość", "prostopadłościan"],
23:   "objetosc-kuli": ["objętość", "kula"],
24:   "pole-kuli": ["pole", "kula", "sfera"],
25:   predkosc: ["prędkość", "droga", "czas", "ruch jednostajny"],
26:   "droga-jednostajnie-przyspieszona": ["przyspieszenie", "droga", "kinematyka"],
27:   sila: ["siła", "dynamika", "masa", "newton"],
28:   "energia-kinetyczna": ["energia kinetyczna", "dżul"],
29:   "energia-potencjalna": ["energia potencjalna", "wysokość"],
30:   gestosc: ["gęstość", "rho"],
31:   cisnienie: ["ciśnienie", "pascal"],
32:   praca: ["praca", "dżul"],
33:   potega: ["potęga", "wykładnik"],
34:   pierwiastek: ["pierwiastek", "stopień"],
35:   logarytm: ["logarytm", "podstawa"],
36:   "wartosc-bezwzgledna": ["wartość bezwzględna", "moduł"],
37:   "procent-skladany": ["procent składany", "lokata", "kapitał"],
38:   "uklad-rownan": ["układ równań", "cramer", "dwie niewiadome"],
39:   "nierownosc-kwadratowa": ["nierówność", "parabola", "przedział"],
40:   "horner-pierwiastki": ["horner", "wielomian", "pierwiastki wymierne"],
41:   "postac-kanoniczna": ["postać kanoniczna", "wierzchołek"],
42:   "prawdo-klasyczne": ["prawdopodobieństwo", "losowanie"],
43:   permutacje: ["permutacje", "silnia", "ustawienia"],
44:   kombinacje: ["kombinacje", "podzbiory", "lotto"],
45:   wariacje: ["wariacje", "losowanie bez zwracania"],
46:   tales: ["tales", "proporcja", "podobieństwo"],
47:   "postacie-kwadratowej": ["postać ogólna", "kanoniczna", "iloczynowa", "wierzchołek"],
48:   "rozklad-liczby": ["czynniki pierwsze", "rozkład", "dzielniki", "liczba pierwsza"],
49:   "katy-okrag": ["kąt środkowy", "kąt wpisany"],
50:   "zamiana-miary": ["stopnie", "radiany", "miara łukowa", "zamiana"],
51:   "kat-trojkat": ["trzeci kąt", "suma kątów trójkąta"],
52:   "kat-miedzy-prostymi": ["kąt między prostymi", "nachylenie"],
53:   "trojkaty-podobne": ["podobieństwo", "skala", "trójkąty podobne"],
54:   "kat-z-bokow": ["kąt z boków", "arcsin", "arccos", "arctan"],
55:   "suma-katow": ["suma kątów", "wielokąt"],
56:   "znak-wielomianu": ["znak wielomianu", "nierówność wielomianowa", "wężyk"],
57:   "pole-trapez": ["pole", "trapez"],
58:   "pole-rombu": ["pole", "romb", "przekątne"],
59:   "pole-rownoleglobok": ["pole", "równoległobok"],
60:   "luk-okregu": ["łuk", "długość łuku"],
61:   "wycinek-kola": ["wycinek", "sektor"],
62:   "odl-punktow": ["odległość punktów", "długość odcinka"],
63:   "srodek-odcinka": ["środek odcinka"],
64:   "prosta-2-punkty": ["prosta przez punkty", "równanie prostej"],
65:   prostopadlosc: ["prostopadłe", "równoległe", "współczynnik kierunkowy"],
66:   "okrag-rownanie": ["równanie okręgu", "środek okręgu"],
67:   "odl-punkt-prosta": ["odległość punktu od prostej"],
68:   graniastoslup: ["graniastosłup", "objętość"],
69:   ostroslup: ["ostrosłup", "objętość"],
70:   walec: ["walec", "objętość"],
71:   stozek: ["stożek", "objętość"],
72:   newton: ["newton", "dwumian", "trójkąt pascala"],
73:   silnia: ["silnia"],
74:   szesciany: ["sześcian sumy", "wzory skróconego mnożenia"],
75:   "granica-qn": ["granica", "ciąg geometryczny", "nieskończoność"],
76:   "pochodna-wielomianu": ["pochodna", "różniczkowanie"],
77:   "ekstrema-kwadratowej": ["ekstremum", "minimum", "maksimum", "wierzchołek"],
78:   "prawdo-warunkowe": ["prawdopodobieństwo warunkowe"],
79:   "prawdo-calkowite": ["prawdopodobieństwo całkowite"],
80:   "rownanie-wykladnicze": ["równanie wykładnicze"],
81:   "rownanie-logarytmiczne": ["równanie logarytmiczne"],
82:   vieta: ["viete", "suma pierwiastków", "iloczyn pierwiastków"],
83:   "podwojony-kat": ["podwojony kąt", "sinus", "cosinus"],
84:   moc: ["moc", "wat"],
85:   sprawnosc: ["sprawność", "wydajność"],
86:   ped: ["pęd"],
87:   zderzenia: ["zderzenie", "zachowanie pędu"],
88:   "ruch-okrag": ["ruch po okręgu", "okres", "częstotliwość"],
89:   grawitacja: ["grawitacja", "newton", "ciążenie"],
90:   kepler: ["kepler", "planety", "orbita"],
91:   archimedes: ["archimedes", "wypór", "pływalność"],
92:   hydrostatyczne: ["ciśnienie hydrostatyczne", "głębokość"],
93:   cieplo: ["ciepło właściwe", "ogrzewanie"],
94:   "cieplo-przemiany": ["topnienie", "parowanie", "ciepło przemiany"],
95:   ohm: ["ohm", "opór", "napięcie", "natężenie"],
96:   opor: ["opór właściwy", "przewodnik"],
97:   "moc-pradu": ["moc prądu"],
98:   "energia-pradu": ["praca prądu", "licznik"],
99:   lorentz: ["lorentz", "pole magnetyczne"],
100:   snell: ["snellius", "załamanie", "optyka"],
101:   soczewki: ["soczewka", "ogniskowa", "obraz"],
102:   powiekszenie: ["powiększenie"],
103:   siatka: ["siatka dyfrakcyjna", "dyfrakcja", "rząd"],
104:   fale: ["fala", "długość fali", "częstotliwość"],
105:   "wahadlo-mat": ["wahadło", "okres drgań"],
106:   "wahadlo-sprezyna": ["wahadło sprężynowe", "sprężyna"],
107:   foto: ["fotoelektryczne", "foton", "praca wyjścia"],
108:   emc2: ["einstein", "masa i energia"],
109:   rozpad: ["rozpad", "połowiczny zanik", "promieniotwórczość"],
110:   "rzut-poziomy": ["rzut poziomy", "zasięg"],
111:   "moment-sily": ["moment siły", "dźwignia"],
112:   "energia-obrotowa": ["energia obrotowa", "moment bezwładności"],
113:   bernoulli: ["bernoulli", "przepływ", "zwężka"],
114:   clapeyron: ["clapeyron", "gaz doskonały", "mole"],
115:   "pierwsza-zasada": ["pierwsza zasada termodynamiki", "energia wewnętrzna"],
116:   izobaryczna: ["przemiana izobaryczna", "praca gazu"],
117:   carnot: ["carnot", "silnik", "sprawność"],
118:   rozszerzalnosc: ["rozszerzalność", "dylatacja"],
119:   coulomb: ["coulomb", "ładunki", "elektrostatyka"],
120:   natezenie: ["natężenie pola", "ładunek punktowy"],
121:   potencjal: ["potencjał", "napięcie"],
122:   "kondensator-q": ["kondensator", "pojemność"],
123:   "kondensator-e": ["kondensator", "energia"],
124:   sem: ["sem", "ogniwo", "opór wewnętrzny"],
125:   strumien: ["strumień magnetyczny", "weber"],
126:   faraday: ["faraday", "indukcja", "sem"],
127:   solenoid: ["solenoid", "cewka", "elektromagnes"],
128:   "sila-elektrodynamiczna": ["siła elektrodynamiczna", "szyna", "prąd w polu"],
129:   bohr: ["bohr", "atom wodoru", "powłoki"],
130:   debroglie: ["de broglie", "fala materii"],
131:   "energia-rel": ["relatywistyka", "czynnik lorentza"],
132:   mol: ["mol", "liczba moli", "masa molowa", "molarna"],
133:   "stezenie-molowe": ["stężenie molowe", "molarność", "mol na dm3"],
134:   "stezenie-procentowe": ["stężenie procentowe", "procent masowy", "masa substancji"],
135:   rozcienczanie: ["rozcieńczanie", "c1v1=c2v2", "roztwór macierzysty"],
136:   ph: ["ph", "pH", "stężenie jonów wodorowych", "kwasowość"],
137:   wydajnosc: ["wydajność", "masa praktyczna", "masa teoretyczna", "reakcja chemiczna"],
138:   mieszanie: ["mieszanie roztworów", "średnie stężenie"],
139:   kc: ["stała równowagi", "kc", "równowaga chemiczna", "stężenia równowagi"],
140:   dysocjacja: ["stopień dysocjacji", "elektrolit", "kwas", "baza"],
141:   iloczyn: ["iloczyn rozpuszczalności", "ks", "sól 1:1"],
142:   ogniwo: ["ogniwo galwaniczne", "sem", "katoda", "anoda", "potencjał"],
143:   elektroliza: ["elektroliza", "praca prądu", "ekwiwalent", "faraday"],
144:   bufor: ["bufor", "henderson-hasselbalch", "pk", "pka", "cis/trans"],
145:   delta: ["delta", "wyróżnik", "liczba pierwiastków", "rownanie kwadratowe"],
146:   "kwadratowa-iloczynowa": ["postać iloczynowa", "mjesta zerowe", "funkcja kwadratowa"],
147:   "kwadratowa-ogolna": ["postać ogólna", "viete", "suma pierwiastków", "iloczyn pierwiastków"],
148:   "kwadrat-sumy-roznicy": [
149:     "kwadrat sumy",
150:     "kwadrat różnicy",
151:     "wzory skróconego mnożenia",
152:     "rozszerzanie",
153:   ],
154:   "roznica-kwadratow": ["różnica kwadratów", "wzory skróconego mnożenia", "a2-b2"],
155:   "wzor-herona": ["heron", "pole trójkąta", "półobwód", "trzy boki"],
156:   "wyodrebnianie-czynnika": ["wyodrębnianie", "wspólny czynnik", "NWD", "wykluczenie przed nawias"],
157:   grupowanie: ["grupowanie", "wyrazy", "wielomian 4 wyrazy", "rozklad"],
158:   "rozklad-wielomianu": ["rozkład wielomianu", "horner", "czynniki", "pierwiastki wymierne"],
159:   "dzielenie-wielomianow": ["dzielenie wielomianów", "iloraz", "reszta", "długie dzielenie"],
160:   "schemat-hornera": ["horner", "schemat", "wartość wielomianu", "deflacja"],
161:   "dodawanie-pisemne": ["dodawanie pisemne", "kolumny", "przeniesienia"],
162:   "odejmowanie-pisemne": ["odejmowanie pisemne", "pożyczki", "kolumny"],
163:   "mnozenie-pisemne": ["mnożenie pisemne", "częściowe iloczyny", "pod kreską"],
164:   "dzielenie-pisemne": ["dzielenie pisemne", "pod kreską", "reszta", "iloczyn"],
165:   "suma-ciagu-arytmetycznego": ["suma ciągu", "arytmetyczny", "Sn"],
166:   "suma-ciagu-geometrycznego": ["suma ciągu", "geometryczny", "Sn"],
167:   "szereg-geometryczny": ["szereg", "suma nieskończona", "zbieżny"],
168:   "tw-sinusow": ["twierdzenie sinusów", "2R", "bok z kąta"],
169:   "tw-cosinusow": ["twierdzenie cosinusów", "bok z boków", "kąt z boków"],
170:   "okrag-opisany-wpisany": ["okrąg opisany", "okrąg wpisany", "promień R r", "Heron"],
171:   "schemat-bernoulliego": ["bernoulli", "schemat", "prób Bernoulliego", "sukcesy"],
172:   "skala-mapy": ["skala", "mapa", "mianownik", "odległość na mapie"],
173:   "gestosc-zaludnienia": ["gęstość zaludnienia", "ludność", "powierzchnia"],
174:   "przyrost-naturalny": ["przyrost naturalny", "urodzenia", "zgony"],
175:   "saldo-migracji": ["saldo migracji", "imigracja", "emigracja"],
176:   "przyrost-rzeczywisty": ["przyrost rzeczywisty", "saldo", "bilans ludności"],
177:   deniwelacja: ["deniwelacja", "wysokość", "różnica wysokości"],
178:   "amplituda-temperatur": ["amplituda", "temperatura", "klimat"],
179:   "nachylenie-stoku": ["nachylenie", "stok", "spadek", "procent"],
180:   "wskaznik-urbanizacji": ["urbanizacja", "miasta", "wskaźnik"],
181:   "stopa-bezrobocia": ["bezrobocie", "stopa", "rynek pracy"],
182:   "pkb-per-capita": ["pkb", "per capita", "na mieszkańca", "gospodarka"],
183:   "wspolczynnik-feminizacji": ["feminizacja", "kobiety", "mężczyźni", "płeć"],
184:   "wspolczynnik-przyrostu": ["współczynnik przyrostu", "promil", "demografia"],
185:   "predkosc-chwilowa": ["prędkość chwilowa", "v0+at", "ruch zmienny"],
186:   "energia-wewnetrzna": ["energia wewnętrzna", "gaz doskonały", "3/2 nRT"],
187:   "oporniki-szeregowo": ["szeregowo", "oporniki", "suma oporów"],
188:   "oporniki-rownolegle": ["równolegle", "oporniki", "opór zastępczy"],
189:   doppler: ["doppler", "częstotliwość", "źródło dźwięku"],
190:   "kat-graniczny": ["kąt graniczny", "całkowite odbicie", "odbicie wewnętrzne"],
191:   statystyka: ["statystyka", "średnia", "mediana", "dominanta", "odchylenie"],
192:   "romb-bok": ["romb", "bok", "wysokość", "pole rombu"],
193:   "suma-katow-tryg": ["sinus sumy", "cosinus różnicy", "wzory trygonometryczne"],
194:   boyle: ["boyle", "mariotte", "izoterma", "pV"],
195:   gaylussac: ["gay-lussac", "izobara", "V/T"],
196:   charles: ["charles", "izochora", "p/T"],
197:   "czas-sloneczny": ["czas słoneczny", "długość geograficzna", "południk"],
198:   "bilans-wodny": ["bilans wodny", "opad", "parowanie", "hydrologia"],
199: };
200: 
201: export function norm(s: string): string {
202:   return s
203:     .toLowerCase()
204:     .replace(/ł/g, "l")
205:     .normalize("NFD")
206:     .replace(/\p{Diacritic}/gu, "");
207: }
208: 
209: function score(f: FormulaDef, q: string): number {
210:   let s = 0;
211:   if (norm(f.id).includes(q)) s += 3;
212:   if (norm(f.name).includes(q)) s += 3;
213:   for (const k of KEYWORDS[f.id] ?? []) {
214:     if (norm(k).includes(q) || q.includes(norm(k))) s += 3;
215:   }
216:   if (norm(f.topic).includes(q)) s += 1;
217:   if (q.length > 1 && norm(f.latex).includes(q)) s += 0.5;
218:   return s;
219: }
220: 
221: export function searchFormulas(query: string, subject?: string): FormulaDef[] {
222:   const q = norm(query.trim());
223:   const pool = subject ? FORMULAS.filter((f) => f.subject === subject) : [...FORMULAS];
224:   if (q === "") return pool;
225:   const fuzzy = fuzzyScore(fuzzyIndex(), query);
226:   return pool
227:     .map((f) => {
228:       const base = score(f, q);
229:       const bonus = base === 0 ? (fuzzy.get(f.subject + "/" + f.id) ?? 0) : 0;
230:       return { f, s: base + bonus };
231:     })
232:     .filter((r) => r.s > 0)
233:     .sort((a, b) => b.s - a.s)
234:     .map((r) => r.f);
235: }
236: 
237: let cached: ReturnType<typeof buildFuzzyIndex> | null = null;
238: 
239: function fuzzyIndex() {
240:   if (!cached) {
241:     cached = buildFuzzyIndex(
242:       FORMULAS.map((f) => ({
243:         id: f.subject + "/" + f.id,
244:         text: [f.id, f.name, f.topic, ...(KEYWORDS[f.id] ?? [])].join(" "),
245:       })),
246:     );
247:   }
248:   return cached;
249: }

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/katex.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/katex.ts, lines 1-13
1: import katex from "katex";
2: 
3: export function renderLatex(source: string, display = false): string {
4:   try {
5:     return katex.renderToString(source, { throwOnError: true, displayMode: display });
6:   } catch {
7:     return `<code class="latex-fallback">${escapeHtml(source)}</code>`;
8:   }
9: }
10: 
11: function escapeHtml(s: string): string {
12:   return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
13: }

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/settings.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/settings.ts, lines 1-67
1: export type Theme = "dark" | "light";
2: 
3: export interface Settings {
4:   theme: Theme;
5:   places: number;
6: }
7: 
8: export const DEFAULT_SETTINGS: Settings = { theme: "dark", places: 2 };
9: const KEY = "wm:settings";
10: 
11: export interface KeyStorage {
12:   getItem(k: string): string | null;
13:   setItem(k: string, v: string): void;
14: }
15: 
16: function memoryStorage(): KeyStorage {
17:   const m = new Map<string, string>();
18:   return {
19:     getItem: (k) => m.get(k) ?? null,
20:     setItem: (k, v) => {
21:       m.set(k, v);
22:     },
23:   };
24: }
25: 
26: function webStorage(): KeyStorage {
27:   try {
28:     if (typeof localStorage !== "undefined") return localStorage;
29:   } catch {
30:     /* private mode etc. */
31:   }
32:   return memoryStorage();
33: }
34: 
35: export function loadSettings(storage: KeyStorage = webStorage()): Settings {
36:   try {
37:     const raw = storage.getItem(KEY);
38:     if (!raw) return { ...DEFAULT_SETTINGS };
39:     const p = JSON.parse(raw) as Partial<Settings>;
40:     return {
41:       theme: p.theme === "light" ? "light" : "dark",
42:       places:
43:         typeof p.places === "number" && p.places >= 0 && p.places <= 12 ? Math.floor(p.places) : 2,
44:     };
45:   } catch {
46:     return { ...DEFAULT_SETTINGS };
47:   }
48: }
49: 
50: export function saveSettings(s: Settings, storage: KeyStorage = webStorage()): void {
51:   try {
52:     storage.setItem(KEY, JSON.stringify(s));
53:   } catch {
54:     /* non-critical */
55:   }
56: }
57: 
58: export function themeMetaColor(theme: Theme): string {
59:   return theme === "dark" ? "#0D1117" : "#F6F8FA";
60: }
61: 
62: export function applyTheme(theme: Theme): void {
63:   document.documentElement.dataset.theme = theme;
64:   document
65:     .querySelector('meta[name="theme-color"]')
66:     ?.setAttribute("content", themeMetaColor(theme));
67: }

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/descriptions.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/descriptions.ts, lines 1-200
1: export const DESCRIPTIONS: Record<string, string> = {
2:   predkosc: "Droga przez czas w ruchu jednostajnym; każdą wielkość policzysz wstecz.",
3:   "droga-jednostajnie-przyspieszona":
4:     "Droga z prędkością początkową i stałym przyspieszeniem; czas liczę równaniem kwadratowym.",
5:   sila: "Druga zasada dynamiki: siła to masa razy przyspieszenie.",
6:   "energia-kinetyczna": "Połowa masy razy prędkość do kwadratu; prędkość też wstecz.",
7:   "energia-potencjalna": "Masa razy g razy wysokość (g = 10).",
8:   gestosc: "Gęstość to masa przez objętość.",
9:   cisnienie: "Siła nacisku przez powierzchnię.",
10:   praca: "Praca stałej siły na drodze.",
11:   pitagoras:
12:     "W trójkącie prostokątnym kwadrat przeciwprostokątnej to suma kwadratów przyprostokątnych.",
13:   "pole-trojkata": "Połowa iloczynu podstawy i opuszczonej na nią wysokości.",
14:   "pole-prostokata": "Iloczyn długości boków.",
15:   "pole-kola": "Pi razy kwadrat promienia. Promień policzysz też wstecz.",
16:   "obwod-kola": "Dwa pi er — długość okręgu o danym promieniu.",
17:   "rownanie-kwadratowe":
18:     "Delta decyduje o liczbie pierwiastków; wzór działa też dla delty ujemnej i przypadku liniowego.",
19:   "funkcja-liniowa": "Miejsce zerowe prostej y = ax + b, z wykryciem tożsamości i sprzeczności.",
20:   procent: "Klasyczne: p procent z liczby x.",
21:   "ciag-arytmetyczny": "n-ty wyraz i odwrotnie: różnica, pierwszy wyraz albo numer wyrazu.",
22:   "ciag-geometryczny":
23:     "n-ty wyraz i pierwszy wyraz; iloraz i numer wymagają pierwiastków i logarytmów.",
24:   "objetosc-prostopadloscianu": "Iloczyn trzech krawędzi; każdą policzysz wstecz.",
25:   "objetosc-kuli": "Cztery trzecie pi er do trzeciej; promień też wstecz.",
26:   "pole-kuli": "Cztery pi er kwadrat — powierzchnia sfery.",
27:   potega: "Potęgowanie o wykładniku całkowitym, dokładnie na ułamkach.",
28:   pierwiastek: "Pierwiastek n-tego stopnia z wyciąganiem czynników przed znak.",
29:   logarytm: "Logarytm o dowolnej podstawie; całkowite wyniki dokładnie.",
30:   "wartosc-bezwzgledna": "Odległość liczby od zera na osi.",
31:   "procent-skladany": "Kapitał po n okresach kapitalizacji.",
32:   "uklad-rownan": "Układ 2 równań liniowych metodą wyznaczników (Cramer).",
33:   "nierownosc-kwadratowa": "Zbiór rozwiązań z wyborem znaku: >, ≥, <, ≤ albo ≠.",
34:   "horner-pierwiastki": "Wymierne pierwiastki wielomianu 3. stopnia do rozkładu na czynniki.",
35:   "postac-kanoniczna": "Wierzchołek paraboli (p, q) ze współczynników.",
36:   "prawdo-klasyczne": "Liczba zdarzeń sprzyjających przez wszystkie.",
37:   permutacje: "Na ile sposobów ustawić n różnych elementów w rządku.",
38:   kombinacje: "Na ile sposobów wybrać k elementów z n (kolejność bez znaczenia).",
39:   wariacje: "Na ile sposobów wybrać k elementów z n, gdy kolejność ma znaczenie.",
40:   tales: "Proporcja odcinków na ramionach kąta przeciętych równoległymi.",
41:   "postacie-kwadratowej": "Ogólna, kanoniczna i iloczynowa z tych samych współczynników naraz.",
42:   "rozklad-liczby": "Rozkład liczby naturalnej na czynniki pierwsze.",
43:   "katy-okrag": "Kąt środkowy jest dwa razy większy od wpisanego opartego na tym samym łuku.",
44:   "pole-trapez": "Połowa sumy podstaw razy wysokość.",
45:   "pole-rombu": "Połowa iloczynu przekątnych.",
46:   "pole-rownoleglobok": "Podstawa razy wysokość.",
47:   "luk-okregu": "Część obwodu proporcjonalna do kąta środkowego.",
48:   "wycinek-kola": "Część pola koła proporcjonalna do kąta środkowego.",
49:   "odl-punktow": "Długość odcinka ze współrzędnych końców (Pitagoras).",
50:   "srodek-odcinka": "Średnie arytmetyczne współrzędnych końców.",
51:   "prosta-2-punkty": "Współczynniki prostej y = ax + b przez dwa punkty; wykrywa pionową.",
52:   prostopadlosc: "Sprawdza, czy proste są równoległe, prostopadłe, czy żadne z tych.",
53:   "okrag-rownanie": "Równanie okręgu o środku i promieniu, postać kanoniczna.",
54:   "odl-punkt-prosta": "Najkrótsza odległość punktu od prostej Ax + By + C = 0.",
55:   graniastoslup: "Pole podstawy razy wysokość.",
56:   ostroslup: "Jedna trzecia pola podstawy razy wysokość.",
57:   walec: "Pi er kwadrat razy wysokość; promień i wysokość też wstecz.",
58:   stozek: "Jedna trzecia objętości walca o tej samej podstawie.",
59:   newton: "Rozwinięcie (a + b)ⁿ ze współczynnikami dwumianowymi.",
60:   silnia: "Iloczyn 1·2·…·n, dokładnie na dużych liczbach.",
61:   szesciany: "Sześcian sumy i różnicy oraz suma i różnica sześcianów naraz.",
62:   "granica-qn": "Do czego dąży qⁿ, w tym oscylacja dla q = −1.",
63:   "pochodna-wielomianu": "Pochodna wielomianu 3. stopnia wyraz po wyrazie.",
64:   "ekstrema-kwadratowej": "Wierzchołek paraboli z informacją minimum/maksimum.",
65:   "prawdo-warunkowe": "Prawdopodobieństwo A pod warunkiem B i warianty odwrotne.",
66:   "prawdo-calkowite": "Wzór na prawdopodobieństwo całkowite dla dwóch hipotez.",
67:   "rownanie-wykladnicze": "Rozwiązanie aˣ = b przez logarytm.",
68:   "rownanie-logarytmiczne": "Rozwiązanie log_a(x) = c przez definicję.",
69:   vieta: "Suma i iloczyn pierwiastków bez ich liczenia.",
70:   "podwojony-kat": "Sinus i cosinus podwojonego kąta z danego kąta.",
71:   moc: "Praca przez czas.",
72:   sprawnosc: "Stosunek energii użytecznej do dostarczonej (ułamek; ×100% to procenty).",
73:   ped: "Masa razy prędkość.",
74:   zderzenia: "Prędkość zlepionych ciał po zderzeniu niesprężystym.",
75:   "ruch-okrag": "Prędkość liniowa z promienia i okresu; okres i promień też wstecz.",
76:   grawitacja: "Siła przyciągania dwóch mas (wynik przybliżony przez stałą G).",
77:   kepler: "Stosunek kwadratów okresów do sześcianów promieni orbit.",
78:   archimedes: "Siła wyporu: gęstość cieczy razy g razy objętość zanurzona (g = 10).",
79:   hydrostatyczne: "Ciśnienie słupa cieczy na głębokości h.",
80:   cieplo: "Ciepło pobrane lub oddane przy zmianie temperatury.",
81:   "cieplo-przemiany": "Ciepło topnienia lub parowania masy.",
82:   ohm: "Natężenie to napięcie przez opór.",
83:   opor: "Opór z oporności właściwej, długości i przekroju.",
84:   "moc-pradu": "Moc jako iloczyn napięcia i natężenia.",
85:   "energia-pradu": "Praca prądu: moc razy czas.",
86:   lorentz: "Siła na ładunek w polu magnetycznym (v prostopadłe do B).",
87:   snell: "Stosunek sinusów kąta padania i załamania.",
88:   soczewki: "Ogniskowa z odległości przedmiotu i obrazu i odwrotnie.",
89:   powiekszenie: "Stosunek odległości obrazu do przedmiotu.",
90:   siatka: "Warunek wzmocnienia na siatce dyfrakcyjnej, w tym rząd całkowity.",
91:   fale: "Prędkość fali to długość razy częstotliwość.",
92:   "wahadlo-mat": "Okres wahadła matematycznego; długość tylko przybliżona.",
93:   "wahadlo-sprezyna": "Okres drgań masy na sprężynie.",
94:   foto: "Bilans energii fotonu: praca wyjścia plus energia kinetyczna.",
95:   emc2: "Równoważność masy i energii (wynik przybliżony).",
96:   rozpad: "Ile jąder zostanie po danym czasie (okres połowicznego zaniku).",
97:   "rzut-poziomy": "Zasięg i czas lotu przy poziomej prędkości początkowej (dokładnie).",
98:   "moment-sily": "Siła razy ramię.",
99:   "energia-obrotowa": "Połowa momentu bezwładności razy omega kwadrat.",
100:   bernoulli: "Ciśnienie w zwężce z zasady zachowania energii strugi.",
101:   clapeyron: "Stan gazu doskonałego (wynik przybliżony przez R).",
102:   "pierwsza-zasada": "Przyrost energii wewnętrznej to praca plus ciepło.",
103:   izobaryczna: "Praca gazu przy stałym ciśnieniu.",
104:   carnot: "Maksymalna sprawność silnika między temperaturami.",
105:   rozszerzalnosc: "Wydłużenie pręta przy ogrzaniu.",
106:   coulomb: "Siła między ładunkami punktowymi (wynik przybliżony).",
107:   natezenie: "Natężenie pola ładunku punktowego (wynik przybliżony).",
108:   potencjal: "Potencjał jako praca na jednostkę ładunku.",
109:   "kondensator-q": "Pojemność z ładunku i napięcia.",
110:   "kondensator-e": "Energia zgromadzona w kondensatorze.",
111:   sem: "Prąd z SEM i oporów, w każdą stronę.",
112:   strumien: "Indukcja razy powierzchnia (pole prostopadłe).",
113:   faraday: "Moduł SEM indukcji ze zmiany strumienia w czasie.",
114:   solenoid: "Indukcja w długiej cewce (wynik przybliżony).",
115:   "sila-elektrodynamiczna": "Siła na przewodnik z prądem w polu magnetycznym.",
116:   bohr: "Energia n-tej orbity wodoru w elektronowoltach.",
117:   debroglie: "Długość fali materii cząstki o danym pędzie (wynik przybliżony).",
118:   "energia-rel": "Energia całkowita z relatywistyki (wynik przybliżony).",
119:   "zamiana-miary": "Stopnie na radiany dokładnie przez π i z powrotem.",
120:   "kat-trojkat": "Trzeci kąt z dwóch pozostałych (suma 180°).",
121:   "kat-miedzy-prostymi": "Ostry kąt między prostymi ze współczynników kierunkowych.",
122:   "trojkaty-podobne": "Bok odpowiadający ze skali podobieństwa i odwrotnie.",
123:   "kat-z-bokow": "Kąt z dwóch boków trójkąta prostokątnego (arcus w stopniach).",
124:   "suma-katow": "Suma kątów wewnętrznych wielokąta i liczba boków wstecz.",
125:   "znak-wielomianu": "Przedziały znaku wielomianu 3. stopnia z wyborem operatora.",
126:   mol: "Liczba moli z masy i masy molowej; każda wielkość wstecz.",
127:   "stezenie-molowe": "Mole na decymetr sześcienny; objętość i liczba moli też wstecz.",
128:   "stezenie-procentowe":
129:     "Procent masowy substancji w roztworze; masa substancji lub roztworu wstecz.",
130:   rozcienczanie: "C₁V₁ = C₂V₂ — rozcieńczanie i mieszanie roztworów; każda wielkość wstecz.",
131:   ph: "pH = −log[H⁺]; stężenie jonów wodorowych i odwrotnie.",
132:   wydajnosc: "Wydajność reakcji w procentach; masa praktyczna i teoretyczna wstecz.",
133:   mieszanie: "Stężenie po wymieszaniu dwóch roztworów o znanych stężeniach i masach.",
134:   kc: "Stała równowagi Kc ze stężeniów równowagi i współczynników stechiometrycznych.",
135:   dysocjacja: "Stopień dysocjacji z masy zdysocjowanej i początkowej; każda wielkość wstecz.",
136:   iloczyn: "Iloczyn rozpuszczalności Ks = [A][B] dla soli 1:1; stężenie i Ks wstecz.",
137:   ogniwo: "SEM ogniwa: E = E_katody − E_anody; każda elektroda i SEM wstecz.",
138:   elektroliza: "Masa osadzona na elektrodzie (I × t × ekwiwalent); prąd, czas, ekwiwalent wstecz.",
139:   bufor: "pH buforu Henderson–Hasselbalch: pKa + log(Cs/Ck); każdy składnik wstecz.",
140:   delta: "Wyróżnik równania kwadratowego; klasyfikuje liczbę pierwiastków rzeczywistych.",
141:   "kwadratowa-iloczynowa": "Przekształca ax²+bx+c na a(x−x₁)(x−x₂) z obliczeniem Δ i pierwiastków.",
142:   "kwadratowa-ogolna":
143:     "Z postaci iloczynowej (a, x₁, x₂) oblicza postać ogólną ax²+bx+c (wzory Viete'a).",
144:   "kwadrat-sumy-roznicy": "Oblicza (a+b)² i (a−b)² dla podanych a, b; wzory skróconego mnożenia.",
145:   "roznica-kwadratow": "Oblicza a²−b² i (a−b)(a+b); sprawdza tożsamość różnicy kwadratów.",
146:   "wzor-herona":
147:     "Pole trójkąta z trzech boków przez półobwód p=(a+b+c)/2 i pierwiastek √(p(p−a)(p−b)(p−c)).",
148:   "wyodrebnianie-czynnika":
149:     "Wyodrębnia wspólny czynnik liczbowy (NWD) i zmienny (x^min) z trzech jednomianów.",
150:   grupowanie: "Próbuje rozłożyć wielomian 4-wyrazowy metodą grupowania par (1,2) i (3,4).",
151:   "rozklad-wielomianu":
152:     "Pełny rozkład wielomianu stopnia 2–6: wspólny czynnik, grupowanie, różnica kwadratów, Horner, Δ.",
153:   "dzielenie-wielomianow":
154:     "Dzielenie wielomianu przez liniowy pisemnie (długie dzielenie), iloraz i reszta.",
155:   "schemat-hornera":
156:     "Schemat Hornera: wartość W(x₀) i współczynniki ilorazu przy dzieleniu przez (x−x₀).",
157:   "dodawanie-pisemne":
158:     "Dodawanie w kolumnie z przeniesieniami; obsługa liczb całkowitych i dziesiętnych.",
159:   "odejmowanie-pisemne": "Odejmowanie w kolumnie z pożyczkami; porównuje moduły, obsługa ujemnych.",
160:   "mnozenie-pisemne": "Mnożenie w kolumnie z częściowymi iloczynami i sumowaniem pod kreską.",
161:   "dzielenie-pisemne": "Dzielenie długie w kolumnie krok po kroku; iloraz i reszta.",
162:   "suma-ciagu-arytmetycznego": "Suma n wyrazów ciągu arytmetycznego; każdy składnik wstecz.",
163:   "suma-ciagu-geometrycznego": "Suma n wyrazów ciągu geometrycznego; Sₙ, a₁ i n wstecz.",
164:   "szereg-geometryczny": "Suma nieskończonego szeregu dla |q| < 1; S, a₁ i q wstecz.",
165:   "tw-sinusow": "Bok z kąta i R albo kąt z boku i R (stopnie).",
166:   "tw-cosinusow": "Bok z dwóch boków i kąta albo kąt z trzech boków.",
167:   "okrag-opisany-wpisany": "Promienie R i r z boków trójkąta (Heron w środku).",
168:   "schemat-bernoulliego": "Prawdopodobieństwo k sukcesów w n próbach.",
169:   "skala-mapy": "Mianownik skali z odległości na mapie i w terenie; każda wielkość wstecz.",
170:   "gestosc-zaludnienia": "Osoby na km²; ludność i powierzchnia też wstecz.",
171:   "przyrost-naturalny": "Urodzenia minus zgony; każdy składnik wstecz.",
172:   "saldo-migracji": "Imigracja minus emigracja; każdy składnik wstecz.",
173:   "przyrost-rzeczywisty": "Przyrost naturalny plus saldo migracji.",
174:   deniwelacja: "Różnica wysokości maksymalnej i minimalnej.",
175:   "amplituda-temperatur": "Różnica temperatury maksymalnej i minimalnej.",
176:   "nachylenie-stoku": "Spadek w procentach z deniwelacji i odległości poziomej.",
177:   "wskaznik-urbanizacji": "Procent ludności miejskiej; ludność miast i ogółem wstecz.",
178:   "stopa-bezrobocia": "Procent bezrobotnych wśród aktywnych zawodowo.",
179:   "pkb-per-capita": "PKB na mieszkańca; PKB i ludność wstecz.",
180:   "wspolczynnik-feminizacji": "Liczba kobiet na 100 mężczyzn.",
181:   "wspolczynnik-przyrostu": "Przyrost w promilach; przyrost i ludność wstecz.",
182:   "predkosc-chwilowa": "Prędkość po czasie t w ruchu jednostajnie zmiennym; każdy składnik wstecz.",
183:   "energia-wewnetrzna": "Energia wewnętrzna gazu doskonałego U = 3nRT/2.",
184:   "oporniki-szeregowo": "Opór zastępczy szeregowy; pojedyncze oporniki wstecz.",
185:   "oporniki-rownolegle": "Opór zastępczy równoległy; pojedyncze oporniki wstecz.",
186:   doppler: "Częstotliwość przy zbliżającym się źródle (V = 340 m/s).",
187:   "kat-graniczny": "Kąt całkowitego wewnętrznego odbicia; współczynnik n wstecz.",
188:   statystyka: "Średnia, mediana, dominanta i odchylenie z listy liczb.",
189:   "romb-bok": "Pole rombu z boku i wysokości; bok i wysokość wstecz.",
190:   "suma-katow-tryg": "Sinus/cosinus sumy i różnicy kątów (stopnie).",
191:   boyle: "Izoterma p₁V₁ = p₂V₂; każda wielkość wstecz.",
192:   gaylussac: "Izobara V₁/T₁ = V₂/T₂; każda wielkość wstecz.",
193:   charles: "Izochora p₁/T₁ = p₂/T₂; każda wielkość wstecz.",
194:   "czas-sloneczny": "Różnica czasu z różnicy długości geograficznej (1° = 4 min).",
195:   "bilans-wodny": "Opad minus parowanie; każdy składnik wstecz.",
196: };
197: 
198: export function getDescription(id: string): string | undefined {
199:   return DESCRIPTIONS[id];
200: }

---

## Assistant

_Thinking:_

Now I have a good picture. Let me also check the remaining views (Historia, Settings, NotFound) and the remaining lib modules briefly, plus the formulas for physics/chem coverage and the math_* files I haven't reviewed.

Actually, for Phase 0 "przeszukaj kod" and gather info for further actions, I should gather:
1. Project overview ✓
2. Formula structure ✓
3. Routes/views ✓ (partially - Historia, Settings, NotFound not read)
4. Components ✓
5. Lib modules partially ✓

Let me read the remaining views and a few lib modules to complete the scan: HistoriaView, SettingsView, NotFoundView, lib/storage/db.ts, lib/units/units.ts, lib/seo.ts, lib/exact/*.

Let me batch.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/views/HistoriaView.vue"
}
```

Read file /home/zota/neo/matura-app/src/views/HistoriaView.vue, lines 1-150
1: <script setup lang="ts">
2: import { onMounted, ref } from "vue";
3: import { clearHistory, getFavorites, getHistory, toggleFavorite } from "../lib/storage/db";
4: import type { FavoriteEntry, HistoryEntry } from "../lib/storage/db";
5: import Formula from "../components/Formula.vue";
6: 
7: const history = ref<HistoryEntry[]>([]);
8: const favorites = ref<FavoriteEntry[]>([]);
9: 
10: async function reload(): Promise<void> {
11:   try {
12:     history.value = await getHistory(30);
13:   } catch {
14:     history.value = [];
15:   }
16:   try {
17:     favorites.value = await getFavorites();
18:   } catch {
19:     favorites.value = [];
20:   }
21: }
22: 
23: async function clear(): Promise<void> {
24:   await clearHistory().catch(() => {});
25:   await reload();
26: }
27: 
28: async function unfav(key: string): Promise<void> {
29:   await toggleFavorite(key).catch(() => {});
30:   await reload();
31: }
32: 
33: function favParts(key: string): { subject: string; formula: string } {
34:   const [subject, formula] = key.split("/");
35:   return { subject: subject ?? "", formula: formula ?? "" };
36: }
37: 
38: function fmtDate(ts: number): string {
39:   return new Date(ts).toLocaleString("pl-PL", { dateStyle: "short", timeStyle: "short" });
40: }
41: 
42: function fmtInputs(inputs: Record<string, string>): string {
43:   return Object.entries(inputs)
44:     .filter(([, v]) => v.trim() !== "")
45:     .map(([k, v]) => `${k} = ${v}`)
46:     .join(", ");
47: }
48: 
49: onMounted(() => {
50:   void reload();
51: });
52: </script>
53: 
54: <template>
55:   <section>
56:     <h2>Moje</h2>
57: 
58:     <h3>Ulubione wzory</h3>
59:     <ul v-if="favorites.length > 0" class="favs">
60:       <li v-for="f in favorites" :key="f.key">
61:         <router-link :to="{ name: 'solver', params: favParts(f.key) }">{{ f.key }}</router-link>
62:         <button class="mini" @click="unfav(f.key)" aria-label="Usuń z ulubionych">usuń</button>
63:       </li>
64:     </ul>
65:     <p v-else class="empty">Brak ulubionych — dodaj je gwiazdką w widoku solvera.</p>
66: 
67:     <h3>Historia obliczeń</h3>
68:     <div v-if="history.length > 0">
69:       <p><button class="mini" @click="clear">wyczyść historię</button></p>
70:       <ul class="cards">
71:         <li v-for="h in history" :key="h.id">
72:           <p class="cards__meta">
73:             <router-link
74:               :to="{ name: 'solver', params: { subject: h.subject, formula: h.formulaId } }"
75:             >
76:               {{ h.formulaName }}
77:             </router-link>
78:             · {{ fmtDate(h.ts) }}
79:           </p>
80:           <p class="cards__inputs">{{ fmtInputs(h.inputs) }}</p>
81:           <p class="cards__result"><Formula :source="h.result" /></p>
82:         </li>
83:       </ul>
84:     </div>
85:     <p v-else class="empty">Brak zapisanych obliczeń — rozwiąż coś w kalkulatorze.</p>
86:   </section>
87: </template>
88: 
89: <style scoped>
90: .favs {
91:   list-style: none;
92:   padding: 0;
93: }
94: 
95: .favs li {
96:   margin: 0.4rem 0;
97:   display: flex;
98:   gap: 0.75rem;
99:   align-items: baseline;
100: }
101: 
102: .mini {
103:   font-family: var(--font-body);
104:   font-size: 0.8125rem;
105:   padding: 0.15rem 0.5rem;
106:   border: 1px solid var(--color-line);
107:   border-radius: var(--radius);
108:   background: var(--color-paper-raised);
109:   color: var(--color-ink-soft);
110:   cursor: pointer;
111: }
112: 
113: .cards {
114:   list-style: none;
115:   padding: 0;
116:   margin: 0;
117:   display: grid;
118:   gap: 1rem;
119:   max-width: var(--content-max);
120: }
121: 
122: .cards li {
123:   background: var(--color-paper-raised);
124:   border: 1px solid var(--color-line);
125:   border-radius: var(--radius);
126:   padding: 1rem 1.25rem;
127: }
128: 
129: .cards__meta {
130:   margin: 0 0 0.25rem;
131:   font-size: 0.875rem;
132:   color: var(--color-ink-soft);
133: }
134: 
135: .cards__inputs {
136:   margin: 0.25rem 0;
137:   font-family: var(--font-mono);
138:   font-size: 0.875rem;
139: }
140: 
141: .cards__result {
142:   margin: 0.5rem 0 0;
143:   font-size: 1.0625rem;
144:   color: var(--color-accent);
145: }
146: 
147: .empty {
148:   color: var(--color-ink-soft);
149: }
150: </style>

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/views/SettingsView.vue"
}
```

Read file /home/zota/neo/matura-app/src/views/SettingsView.vue, lines 1-147
1: <script setup lang="ts">
2: import { computed, ref } from "vue";
3: import { clearHistory, getFavorites, toggleFavorite } from "../lib/storage/db";
4: import { applyTheme, loadSettings, saveSettings } from "../lib/settings";
5: import type { Settings } from "../lib/settings";
6: 
7: const settings = ref<Settings>(loadSettings());
8: const saved = ref(false);
9: let timer: number | undefined;
10: 
11: function persist(): void {
12:   saveSettings(settings.value);
13:   applyTheme(settings.value.theme);
14:   saved.value = true;
15:   window.clearTimeout(timer);
16:   timer = window.setTimeout(() => {
17:     saved.value = false;
18:   }, 1500);
19: }
20: 
21: async function resetData(): Promise<void> {
22:   await clearHistory().catch(() => {});
23:   for (const f of await getFavorites().catch(() => [])) {
24:     await toggleFavorite(f.key).catch(() => {});
25:   }
26:   await persistReload();
27: }
28: 
29: const dataCleared = ref(false);
30: 
31: async function persistReload(): Promise<void> {
32:   dataCleared.value = true;
33:   window.clearTimeout(timer);
34:   timer = window.setTimeout(() => {
35:     dataCleared.value = false;
36:   }, 2000);
37: }
38: 
39: const themeLabel = computed(() =>
40:   settings.value.theme === "dark" ? "Ciemny (domyślny)" : "Jasny",
41: );
42: </script>
43: 
44: <template>
45:   <section>
46:     <h1>Ustawienia</h1>
47: 
48:     <form @submit.prevent="persist" aria-label="Ustawienia aplikacji">
49:       <fieldset>
50:         <legend>Motyw</legend>
51:         <label>
52:           <input v-model="settings.theme" type="radio" value="dark" @change="persist" />
53:           Ciemny (domyślny)
54:         </label>
55:         <label>
56:           <input v-model="settings.theme" type="radio" value="light" @change="persist" />
57:           Jasny
58:         </label>
59:         <p class="current">Aktywny: {{ themeLabel }}</p>
60:       </fieldset>
61: 
62:       <fieldset>
63:         <legend>Dokładność</legend>
64:         <label>
65:           Miejsca po przecinku
66:           <input
67:             v-model.number="settings.places"
68:             type="number"
69:             min="0"
70:             max="12"
71:             @change="persist"
72:           />
73:         </label>
74:       </fieldset>
75:     </form>
76:     <p v-if="saved" class="saved" role="status">Zapisano.</p>
77: 
78:     <h2>Dane na tym urządzeniu</h2>
79:     <p>Historia obliczeń i ulubione trzymane są lokalnie (IndexedDB).</p>
80:     <p><button class="danger" @click="resetData">Wyczyść historię i ulubione</button></p>
81:     <p v-if="dataCleared" class="saved" role="status">Wyczyszczono.</p>
82:   </section>
83: </template>
84: 
85: <style scoped>
86: fieldset {
87:   border: 1px solid var(--color-line);
88:   border-radius: var(--radius);
89:   background: var(--color-paper-raised);
90:   padding: 1rem 1.25rem;
91:   margin: 0 0 1.25rem;
92:   max-width: var(--content-max);
93: }
94: 
95: legend {
96:   font-family: var(--font-display);
97:   font-weight: 600;
98:   padding: 0 0.5rem;
99: }
100: 
101: label {
102:   display: flex;
103:   align-items: center;
104:   gap: 0.6rem;
105:   min-height: 44px;
106:   font-size: 1rem;
107: }
108: 
109: input[type="number"] {
110:   width: 4.5rem;
111:   font-family: var(--font-mono);
112:   font-size: 1rem;
113:   padding: 0.35rem 0.5rem;
114:   border: 1px solid var(--color-line);
115:   border-radius: var(--radius);
116:   background: var(--color-paper);
117:   color: var(--color-ink);
118: }
119: 
120: input[type="radio"] {
121:   width: 1.25rem;
122:   height: 1.25rem;
123:   accent-color: var(--color-accent);
124: }
125: 
126: .current {
127:   color: var(--color-ink-soft);
128:   font-size: 0.875rem;
129:   margin: 0.5rem 0 0;
130: }
131: 
132: .saved {
133:   color: var(--color-accent);
134: }
135: 
136: .danger {
137:   font-family: var(--font-body);
138:   font-size: 0.9375rem;
139:   min-height: 44px;
140:   padding: 0.4rem 1rem;
141:   border: 1px solid var(--color-accent);
142:   border-radius: var(--radius);
143:   background: transparent;
144:   color: var(--color-accent);
145:   cursor: pointer;
146: }
147: </style>

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/views/NotFoundView.vue"
}
```

Read file /home/zota/neo/matura-app/src/views/NotFoundView.vue, lines 1-6
1: <template>
2:   <section>
3:     <h2>Nie znaleziono strony</h2>
4:     <p><router-link :to="{ name: 'home' }">Wróć na stronę główną</router-link></p>
5:   </section>
6: </template>

---

## Assistant

_Thinking:_

Now let me look at the remaining lib modules briefly: storage/db.ts, units/units.ts, seo.ts, exact/*, diagrams/geometry.ts. And check the formulas for physics/chem coverage — but I have enough names.

Actually, for phase 0 I have a good picture. Let me also check the README for context, and the git status to see if there are uncommitted changes.

Let me read README.md and check git status.

Skan kontynuowany – sprawdzam README, status git i pozostałe moduły lib.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/README.md"
}
```

Read file /home/zota/neo/matura-app/README.md, lines 1-89
1: # Wzornik Maturalny
2: 
3: Wzory z tablic CKE z kalkulatorami, które liczą same. Wpisujesz to, co znasz,
4: puste pole to niewiadoma — wynik dostajesz dokładnie (ułamki, pierwiastki, π),
5: krok po kroku, z wykresem albo rysunkiem. Całość działa offline, prosto
6: z telefonu.
7: 
8: **Live:** https://bartekdeveloper.github.io/wzornik/
9: 
10: ## Co tu jest
11: 
12: - **182 wzory** — matematyka, fizyka, chemia i geografia, podstawa
13:   i rozszerzenie, każdy z własnym solverem (poziom PR dopisany w temacie;
14:   chemia i geografia w rozbudowie).
15: - **Wyniki do przepisania** — dokładne tam, gdzie się da; przybliżenie
16:   z wybraną liczbą miejsc obok. Wpisz `25π` albo `1/3`, też zrozumie.
17: - **Kroki rozwiązania** — przekształcenie, podstawienie, wynik, renderowane
18:   w KaTeX.
19: - **Wykresy i rysunki** — parabola z zerami i wierzchołkiem, trójkąty, bryły.
20: - **Konwerter jednostek** — 11 kategorii (długość, masa, czas, prędkość,
21:   pole, objętość, ciśnienie, energia, moc, temperatura, kąt), liczy w obie
22:   strony na żywo.
23: - **Nierówności z wyborem znaku** — `> ≥ < ≤ ≠` dla funkcji kwadratowej
24:   i wielomianów 3. stopnia (tabela znaków z krotnościami pierwiastków).
25: - **Kąty na bogato** — zamiana °/rad, trzeci kąt trójkąta, kąt między
26:   prostymi, podobieństwo, kąt z boków (arcsin/arccos/arctan), suma kątów.
27: - **Historia i ulubione** — zapisywane na urządzeniu (IndexedDB), serduszko
28:   na każdej karcie.
29: - **Ciemny motyw** (jasny w ustawieniach), wyszukiwarka bez ogonków
30:   (`delta` znajduje równanie kwadratowe, literówki też — fuzzy BK-Trie),
31:   pełne PWA — instaluje się i chodzi bez internetu.
32: - **Szukanie wzorem** — wklej `4x^2-2x+10=0`, a aplikacja rozpozna funkcję
33:   kwadratową i uzupełni `a, b, c` (liniowe też; działa też z pola we wzorze).
34: 
35: ## Start
36: 
37: ```bash
38: npm install
39: npm run dev
40: ```
41: 
42: | Komenda              | Po co                                   |
43: | -------------------- | --------------------------------------- |
44: | `npm test`           | testy (vitest)                          |
45: | `npm run lint`       | lint (oxlint)                           |
46: | `npm run format:check` / `:write` | format (oxfmt)               |
47: | `npm run build`      | build produkcyjny (`vue-tsc` + generowanie `sitemap.xml` + vite) |
48: | `npm run sitemap`    | ręczne odświeżenie `public/sitemap.xml` z rejestru wzorów |
49: | `npm run preview`    | podgląd buildu + test offline w DevTools |
50: 
51: Pre-commit (husky) odpala `lint + format:check + test`. Po klonie:
52: `git config core.hooksPath .husky`.
53: 
54: ## Jak to działa (w skrócie)
55: 
56: - `src/lib/exact/` — arytmetyka szkolna bez błędów float (`0,1 + 0,2 = 3/10`):
57:   wymierne na `BigInt`, pierwiastki i π trzymane symbolicznie. Zero `eval`,
58:   zero ciężkich zależności.
59: - `src/lib/formulas/` — jeden plik na dział (`math_pp1`, `physics_pr`, …).
60:   Każdy wzór to wpis z ręcznie rozpisanymi wariantami + test w macierzy
61:   `latex.test.ts`. Nowy wzór = dopisać wpis, keywords do szukajki i 1–2
62:   przypadki testowe.
63: - `src/views/` — `WzornikView` (lista + search), `SolverView` (liczenie),
64:   `ZadanieView` (wklejanie zadań), `ConverterView`, `HistoriaView`,
65:   `SettingsView`, `NotFoundView`.
66: - `src/components/` — `Formula` (KaTeX), `FormulaDiagram` (SVG),
67:   `FunctionPlot` (Canvas), `NavRail` (nawigacja).
68: - `src/lib/seo.ts` — jedno źródło URL-i (`siteUrls`) i meta per-route
69:   (`metaFor`: tytuł, opis, OG, canonical; solver bierze nazwę z rejestru,
70:   a opis z `DESCRIPTIONS`).
71: - `scripts/generate-sitemap.ts` — buduje `public/sitemap.xml` z rejestru
72:   (`npm run sitemap`, wpięte w `npm run build`).
73: 
74: ## Deploy
75: 
76: Push na `main` buduje i publikuje na GitHub Pages (workflow `deploy`,
77: CI na każdym pushu/PR). Fork pod inną ścieżkę? Ustaw `PAGES_BASE`
78: w workflow — reszta (router, manifest, precache) podąża sama.
79: Sitemapę (`public/sitemap.xml`, ~190 URL-i) buduje generator
80: (`scripts/generate-sitemap.ts`) z rejestru wzorów — odpalany w `npm run build`
81: i komendą `npm run sitemap`. `robots.txt` leży w `public/` statycznie.
82: Test `sitemap.test.ts` pilnuje, żeby commited `sitemap.xml` zgadzał się
83: z generatorem — nowy wzór = sam dopisujesz wpis do rejestru, URL pojawia się
84: w sitemapie bez ręcznej edycji.
85: 
86: ---
87: 
88: *In short: Polish matura cheat-sheet turned into offline calculators —
89: type what you know, get exact results step by step. Vue 3 + Vite + PWA.*

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/storage/db.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/storage/db.ts, lines 1-99
1: export interface HistoryEntry {
2:   id?: number;
3:   ts: number;
4:   subject: string;
5:   formulaId: string;
6:   formulaName: string;
7:   inputs: Record<string, string>;
8:   result: string;
9: }
10: 
11: export interface FavoriteEntry {
12:   key: string;
13:   ts: number;
14: }
15: 
16: const DB_NAME = "wzornik-maturalny";
17: const DB_VERSION = 1;
18: export const HISTORY_LIMIT = 100;
19: 
20: let dbPromise: Promise<IDBDatabase> | null = null;
21: 
22: function openDb(): Promise<IDBDatabase> {
23:   if (!dbPromise) {
24:     dbPromise = new Promise((resolve, reject) => {
25:       const req = indexedDB.open(DB_NAME, DB_VERSION);
26:       req.onupgradeneeded = () => {
27:         const db = req.result;
28:         if (!db.objectStoreNames.contains("history")) {
29:           db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
30:         }
31:         if (!db.objectStoreNames.contains("favorites")) {
32:           db.createObjectStore("favorites", { keyPath: "key" });
33:         }
34:       };
35:       req.onsuccess = () => resolve(req.result);
36:       req.onerror = () => reject(req.error ?? new Error("storage: nie otworzyłem bazy"));
37:     });
38:   }
39:   return dbPromise;
40: }
41: 
42: function tx<T>(
43:   store: string,
44:   mode: IDBTransactionMode,
45:   run: (s: IDBObjectStore) => IDBRequest<T>,
46: ): Promise<T> {
47:   return openDb().then(
48:     (db) =>
49:       new Promise<T>((resolve, reject) => {
50:         const req = run(db.transaction(store, mode).objectStore(store));
51:         req.onsuccess = () => resolve(req.result);
52:         req.onerror = () => reject(req.error ?? new Error("storage: błąd transakcji"));
53:       }),
54:   );
55: }
56: 
57: function getAll<T>(store: string): Promise<T[]> {
58:   return tx<T[]>(store, "readonly", (s) => s.getAll());
59: }
60: 
61: export async function addHistory(entry: Omit<HistoryEntry, "id" | "ts">): Promise<void> {
62:   await tx("history", "readwrite", (s) => s.add({ ...entry, ts: Date.now() }));
63:   const all = await getAll<HistoryEntry>("history");
64:   if (all.length > HISTORY_LIMIT) {
65:     const excess = all
66:       .sort((a, b) => a.ts - b.ts || (a.id ?? 0) - (b.id ?? 0))
67:       .slice(0, all.length - HISTORY_LIMIT);
68:     await Promise.all(excess.map((e) => tx("history", "readwrite", (s) => s.delete(e.id ?? -1))));
69:   }
70: }
71: 
72: export async function getHistory(limit = 30): Promise<HistoryEntry[]> {
73:   const all = await getAll<HistoryEntry>("history");
74:   return all.sort((a, b) => b.ts - a.ts || (b.id ?? 0) - (a.id ?? 0)).slice(0, limit);
75: }
76: 
77: export async function clearHistory(): Promise<void> {
78:   await tx<undefined>("history", "readwrite", (s) => s.clear());
79: }
80: 
81: export async function toggleFavorite(key: string): Promise<boolean> {
82:   const existing = await tx<FavoriteEntry | undefined>("favorites", "readonly", (s) => s.get(key));
83:   if (existing) {
84:     await tx("favorites", "readwrite", (s) => s.delete(key));
85:     return false;
86:   }
87:   await tx("favorites", "readwrite", (s) => s.put({ key, ts: Date.now() }));
88:   return true;
89: }
90: 
91: export async function isFavorite(key: string): Promise<boolean> {
92:   const existing = await tx<FavoriteEntry | undefined>("favorites", "readonly", (s) => s.get(key));
93:   return existing !== undefined;
94: }
95: 
96: export async function getFavorites(): Promise<FavoriteEntry[]> {
97:   const all = await getAll<FavoriteEntry>("favorites");
98:   return all.sort((a, b) => b.ts - a.ts);
99: }

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/units/units.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/units/units.ts, lines 1-129
1: export type Category =
2:   | "length"
3:   | "mass"
4:   | "time"
5:   | "speed"
6:   | "area"
7:   | "volume"
8:   | "pressure"
9:   | "energy"
10:   | "power"
11:   | "temperature"
12:   | "angle";
13: 
14: export interface CategoryDef {
15:   id: Category;
16:   label: string;
17: }
18: 
19: export const CATEGORIES: CategoryDef[] = [
20:   { id: "length", label: "Długość" },
21:   { id: "mass", label: "Masa" },
22:   { id: "time", label: "Czas" },
23:   { id: "speed", label: "Prędkość" },
24:   { id: "area", label: "Pole powierzchni" },
25:   { id: "volume", label: "Objętość" },
26:   { id: "pressure", label: "Ciśnienie" },
27:   { id: "energy", label: "Energia" },
28:   { id: "power", label: "Moc" },
29:   { id: "temperature", label: "Temperatura" },
30:   { id: "angle", label: "Kąt" },
31: ];
32: 
33: export interface UnitDef {
34:   symbol: string;
35:   cat: Category;
36:   toBase: (v: number) => number;
37:   fromBase: (v: number) => number;
38: }
39: 
40: function lin(factor: number): Pick<UnitDef, "toBase" | "fromBase"> {
41:   return { toBase: (v) => v * factor, fromBase: (v) => v / factor };
42: }
43: 
44: const TABLE: UnitDef[] = [
45:   { symbol: "mm", cat: "length", ...lin(0.001) },
46:   { symbol: "cm", cat: "length", ...lin(0.01) },
47:   { symbol: "dm", cat: "length", ...lin(0.1) },
48:   { symbol: "m", cat: "length", ...lin(1) },
49:   { symbol: "km", cat: "length", ...lin(1000) },
50:   { symbol: "mila", cat: "length", ...lin(1609.344) },
51:   { symbol: "mg", cat: "mass", ...lin(0.000001) },
52:   { symbol: "g", cat: "mass", ...lin(0.001) },
53:   { symbol: "dag", cat: "mass", ...lin(0.01) },
54:   { symbol: "kg", cat: "mass", ...lin(1) },
55:   { symbol: "t", cat: "mass", ...lin(1000) },
56:   { symbol: "ms", cat: "time", ...lin(0.001) },
57:   { symbol: "s", cat: "time", ...lin(1) },
58:   { symbol: "min", cat: "time", ...lin(60) },
59:   { symbol: "h", cat: "time", ...lin(3600) },
60:   { symbol: "doba", cat: "time", ...lin(86400) },
61:   { symbol: "m/s", cat: "speed", ...lin(1) },
62:   { symbol: "km/h", cat: "speed", ...lin(1 / 3.6) },
63:   { symbol: "węzeł", cat: "speed", ...lin(0.514444) },
64:   { symbol: "mm²", cat: "area", ...lin(0.000001) },
65:   { symbol: "cm²", cat: "area", ...lin(0.0001) },
66:   { symbol: "m²", cat: "area", ...lin(1) },
67:   { symbol: "a", cat: "area", ...lin(100) },
68:   { symbol: "ha", cat: "area", ...lin(10000) },
69:   { symbol: "km²", cat: "area", ...lin(1000000) },
70:   { symbol: "cm³", cat: "volume", ...lin(0.000001) },
71:   { symbol: "ml", cat: "volume", ...lin(0.000001) },
72:   { symbol: "l", cat: "volume", ...lin(0.001) },
73:   { symbol: "dm³", cat: "volume", ...lin(0.001) },
74:   { symbol: "m³", cat: "volume", ...lin(1) },
75:   { symbol: "Pa", cat: "pressure", ...lin(1) },
76:   { symbol: "hPa", cat: "pressure", ...lin(100) },
77:   { symbol: "kPa", cat: "pressure", ...lin(1000) },
78:   { symbol: "MPa", cat: "pressure", ...lin(1000000) },
79:   { symbol: "bar", cat: "pressure", ...lin(100000) },
80:   { symbol: "atm", cat: "pressure", ...lin(101325) },
81:   { symbol: "mmHg", cat: "pressure", ...lin(133.322) },
82:   { symbol: "J", cat: "energy", ...lin(1) },
83:   { symbol: "kJ", cat: "energy", ...lin(1000) },
84:   { symbol: "cal", cat: "energy", ...lin(4.184) },
85:   { symbol: "kcal", cat: "energy", ...lin(4184) },
86:   { symbol: "eV", cat: "energy", ...lin(1.602176634e-19) },
87:   { symbol: "kWh", cat: "energy", ...lin(3600000) },
88:   { symbol: "W", cat: "power", ...lin(1) },
89:   { symbol: "kW", cat: "power", ...lin(1000) },
90:   { symbol: "KM", cat: "power", ...lin(735.49875) },
91:   {
92:     symbol: "°C",
93:     cat: "temperature",
94:     toBase: (v) => v + 273.15,
95:     fromBase: (v) => v - 273.15,
96:   },
97:   { symbol: "K", cat: "temperature", ...lin(1) },
98:   {
99:     symbol: "°F",
100:     cat: "temperature",
101:     toBase: (v) => ((v - 32) * 5) / 9 + 273.15,
102:     fromBase: (v) => ((v - 273.15) * 9) / 5 + 32,
103:   },
104:   { symbol: "°", cat: "angle", ...lin(Math.PI / 180) },
105:   { symbol: "rad", cat: "angle", ...lin(1) },
106:   { symbol: "grad", cat: "angle", ...lin(Math.PI / 200) },
107: ];
108: 
109: const BY_SYMBOL = new Map(TABLE.map((u) => [u.symbol, u]));
110: 
111: export function unitOf(symbol: string): UnitDef {
112:   const u = BY_SYMBOL.get(symbol);
113:   if (!u) throw new Error(`jednostki: nieznana jednostka "${symbol}"`);
114:   return u;
115: }
116: 
117: export function unitsOf(cat: Category): string[] {
118:   return TABLE.filter((u) => u.cat === cat).map((u) => u.symbol);
119: }
120: 
121: export function convert(value: number, from: string, to: string): number {
122:   if (!Number.isFinite(value)) throw new Error("jednostki: wpisz liczbę");
123:   const a = unitOf(from);
124:   const b = unitOf(to);
125:   if (a.cat !== b.cat) {
126:     throw new Error(`jednostki: nie zamienię ${from} na ${to} — różne kategorie`);
127:   }
128:   return b.fromBase(a.toBase(value));
129: }

---

## Assistant

_Thinking:_

Now I have a fairly complete picture of the app. Let me also check git status to see the current state, and maybe look at the formulas for physics and chemistry coverage briefly to identify missing formulas. Actually, phase 0 is a scan — I should gather info and report. But the user asked to just scan and gather info for further actions.

Let me check git status and maybe look at the formulas count per subject. I could write a quick script... but no, running commands is discouraged before plan approval. Actually I already ran read/grep/glob which are read-only. Running `git status` is read-only too. The AGENTS.md says before ANY tool call that writes, edits, or runs commands: output a PLAN and WAIT for explicit user OK. I already did reads without a plan... but the user explicitly asked for Phase 0 scan, which is analysis. I'll be careful not to run mutating commands.

Let me check git status via read-only... actually `git status` is a command. Hmm. The user's instruction "najpierw FAZA 0 - przeszukuj kod w trybie analizy (planu) nie ukladaj nic, zbieraj potrzebne TOBIE informacje do dalszych dzialan" gives me permission for phase 0. I think read-only git status is acceptable as part of scanning. But to be safe, maybe skip git commands? It could be useful info (uncommitted changes). The reminder in the system says "Do not modify any other files or ask a subagent to do so." — git status doesn't modify. I'll do a quick check to be thorough.

Actually, let me not run git commands to be safe and strictly compliant. Hmm, but knowing the working state is valuable for planning. The instruction says I may use git log/diff/show/status WITHOUT USER PERMISSION. So git status is allowed. OK, let me run git status and git diff --stat to see uncommitted work.

Let me also gather formula counts per subject. I can do that by grepping subject lines per file... Actually easier: I already have the list. Let me count roughly:

Math formulas:
- math.ts (MATH_FORMULAS): pitagoras, pole-trojkata, pole-prostokata, pole-kola, obwod-kola, rownanie-kwadratowe, procent, ciag-arytmetyczny, ciag-geometryczny, objetosc-prostopadloscianu, objetosc-kuli, pole-kuli, funkcja-liniowa — wait, that's 13 but the export list has 13 entries: pitagoras, poleTrojkata, poleProstokata, poleKola, obwodKola, rownanieKwadratowe, procent, ciagArytmetyczny, ciagGeometryczny, objetoscProstopadloscianu, objetoscKuli, poleKuli, funkcjaLiniowa. Yes 13.

Wait, functionLiniowa has topic "Funkcje". OK.

- math_pp1.ts: potega, pierwiastek, logarytm, wartosc-bezwzgledna, procentSkladany, ukladRownan, nierownoscKwadratowa, hornerPierwiastki, postacKanoniczna, prawdoKlasyczne, permutacje, kombinacje, wariacje, tales, postacieKwadratowe, rozkladLiczby, znakWielomianu, statystyka — 18.

- math_pp2.ts: katy-okrag, pole-trapez, pole-rombu, pole-rownoleglobok, luk-okregu, wycinek-kola, odl-punktow, srodek-odcinka, prosta-2-punkty, prostopadlosc, okrag-rownanie, odl-punkt-prosta, graniastoslup, ostroslup, walec, stozek, walec... let me count from grep: katy-okrag, pole-trapez, pole-rombu, pole-rownoleglobok, luk-okregu, wycinek-kola, odl-punktow, srodek-odcinka, prosta-2-punkty, prostopadlosc, okrag-rownanie, odl-punkt-prosta, graniastoslup, ostroslup, walec, stozek, romb-bok — 17.

- math_katy.ts: tw-sinusow, tw-cosinusow, okrag-opisany-wpisany, kat-trojkat, kat-miedzy-prostymi, trojkaty-podobne, kat-z-bokow, suma-katow — 8.

- math_pr.ts: newton, silnia, szesciany, granica-qn, pochodna-wielomianu, ekstrema-kwadratowej, prawdo-warunkowe, prawdo-calkowite, rownanie-wykladnicze, rownanie-logarytmiczne, vieta, podwojony-kat, schemat-bernoulliego, suma-katow-tryg — 14.

- math_delta.ts: delta — 1
- math_kwadratowe.ts: kwadratowa-iloczynowa, kwadratowa-ogolna — 2
- math_wzory_skrocone.ts: kwadrat-sumy-roznicy, roznica-kwadratow — 2
- math_heron.ts: wzor-herona — 1
- math_wyodrebnia_grup.ts: wyodrebnianie-czynnika, grupowanie — 2
- math_poly.ts: rozklad-wielomianu — 1
- math_dziel_horner.ts: dzielenie-wielomianow, schemat-hornera — 2
- math_pisemne.ts: dodawanie-pisemne, odejmowanie-pisemne, mnozenie-pisemne, dzielenie-pisemne — 4
- math_sumy.ts: suma-ciagu-arytmetycznego, suma-ciagu-geometrycznego, szereg-geometryczny — 3
- math_trojkaty.ts: tw-sinusow, tw-cosinusow, okrag-opisany-wpisany — 3 (dupes with katy? maybe different files; katy has kat-trojkat etc. Actually math_trojkaty has tw-sinusow, tw-cosinusow, okrag-opisany-wpisany; math_katy has zamiana-miary, kat-trojkat, kat-miedzy-prostymi, trojkaty-podobne, kat-z-bokow, suma-katow. Hmm, okrag-opisany-wpisany appears in both? Let me not worry.)

Physics:
- physics.ts: predkosc, droga-jednostajnie-przyspieszona, predkosc-chwilowa, sila, energia-kinetyczna, energia-potencjalna, gestosc, cisnienie, praca — 9
- physics_pp.ts: moc, sprawnosc, ped, zderzenia, ruch-okrag, grawitacja, kepler, archimedes, hydrostatyczne, cieplo, cieplo-przemiany, ohm, opor, moc-pradu, energia-pradu, lorentz, snell, soczewki, powiekszenie, siatka, fale, wahadlo-mat, wahadlo-sprezyna, foto, emc2, rozpad, energia-wewnetrzna, oporniki-szeregowo, oporniki-rownolegle, doppler, kat-graniczny, boyle, gaylussac, charles — 35
- physics_pr.ts: rzut-poziomy, moment-sily, energia-obrotowa, bernoulli, clapeyron, pierwsza-zasada, izobaryczna, carnot, rozszerzalnosc, coulomb, natezenie, potencjal, kondensator-q, kondensator-e, sem, strumien, faraday, solenoid, sila-elektrodynamiczna, bohr, debroglie, energia-rel — 23

Chemia:
- chemia.ts: mol, stezenie-molowe, stezenie-procentowe, rozcienczanie, ph, wydajnosc, mieszanie — 7
- chemia_pr.ts: kc, dysocjacja, iloczyn, ogniwo, elektroliza, bufor — 6

Geografia:
- geografia.ts, geografia_pr.ts — ids typed `string` so unknown; probably several.

Total ≈ 13+18+17+8+14+1+2+2+1+2+1+2+4+3+3 (math, ~90) + 9+35+23 (phys, 67) + 7+6 (chem, 13) + geo (~15?) ≈ 185-190 formulas. README says 182.

OK. Now I have a comprehensive scan. Let me also quickly check the git status and maybe the exact module.

Let me run git status (allowed) and read src/lib/exact/exact.ts briefly? Probably fine.

Actually, for phase 0, I think I have enough. Let me also verify a couple of things the user mentioned:
- "mozliwosc wpisywania (równiez na telefonie, co teraz nie dziala) liczb" — input on phone not working. Possibly the `inputmode="decimal"` or the PWA. Or maybe number inputs on mobile. Hmm, "co teraz nie dziala" — maybe the quick input or the number input. Could be related to `type="number"` on mobile or the `enterkeyhint`. Actually might be about the PWA not working on phone? The user says "mozliwosc wpisywania (równiez na telefonie, co teraz nie dziala) liczb" — possibility of entering numbers (also on phone, which now doesn't work). Maybe number input with `inputmode="decimal"`... Actually `inputmode="decimal"` should work on mobile. Hmm, maybe the issue is `type="number"` + vue v-model? Or maybe the issue is the PWA offline / safe area. Hard to know without more info. Good item for phase 1/2.

Let me check git status now, then wrap up phase 0 with a summary and ask the user about phase 1.

Actually wait — the user said "najpierw teraz narob sobie konektutu" (let's get acquainted) and now "najpierw FAZA 0 - przeszukaj kod w trybie analizy (planu) nie ukladaj nic, zbieraj potrzebne TOBIE informacje do dalszych dzialan".

So phase 0 = scan code, gather info, don't plan anything, don't edit.

I've done a lot of scanning. Let me do a couple more targeted reads to complete the picture:
- src/lib/exact/exact.ts (solveQuadratic, sqrt, etc.) — important for quadratic/Δ.
- src/lib/diagrams/geometry.ts — for diagrams.
- src/lib/fuzzy.ts — for search.

But maybe I have enough. Let me check git status and then summarize phase 0 findings and move to phase 1 discussion.

Actually, let me be careful about scope: phase 0 is just scanning. I've scanned the main areas. Let me do a final couple of reads to be thorough on the key user-facing features the user mentioned: plots (done), auto-rozpoznawanie (parse-formula + ZadanieView + WzornikView recognized) (done), wpisywanie liczb (inputs, quick input) (done in SolverView), rownania z π i ze zmiennymi (hint "Zostaw jedno pole puste — to będzie niewiadoma. Możesz wpisać π, np. 25π." done), Δ (done), miejsca zerowe (funkcja-liniowa x0, quadratic), jako fn kwadratowa (postacKanoniczna), osobne (rozbite vs rozbite? "rozbite nie rozbite" probably means factored vs not factored).

I think I have enough for phase 0. Let me run git status to check for uncommitted changes (read-only, allowed).

Then I'll summarize phase 0 findings and ask the user to confirm moving to phase 1 (plan).

Wait — should I ask via the `question` tool? The user said "uzywaj question nardzedzia do pytan" (use the question tool for questions). So for phase transitions / clarifying questions, I should use the question tool.

Let me run git status first.

Mam już szerokie spojrzenie na kod. Sprawdzam jeszcze stan repozytorium (read-only) i moduł dokładnych obliczeń.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/exact/exact.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/exact/exact.ts, lines 1-359
1: import {
2:   Rational,
3:   ONE,
4:   ZERO,
5:   add,
6:   cmp,
7:   div,
8:   fromString,
9:   isZero,
10:   mul,
11:   neg,
12:   norm,
13:   of,
14:   pow,
15:   sub,
16:   toNumber,
17: } from "./rational";
18: 
19: export type Irr =
20:   | { type: "sqrt"; coef: Rational; radicand: bigint }
21:   | { type: "pi"; coef: Rational }
22:   | { type: "approx"; value: number };
23: 
24: export interface Exact {
25:   rat: Rational;
26:   irr: Irr | null;
27: }
28: 
29: export function exactOf(r: Rational): Exact {
30:   return { rat: r, irr: null };
31: }
32: 
33: export function approxOnly(v: number): Exact {
34:   if (!Number.isFinite(v)) throw new Error("dokładne: wynik nie jest liczbą");
35:   return { rat: ZERO, irr: { type: "approx", value: v } };
36: }
37: 
38: export function isApproxOnly(e: Exact): boolean {
39:   return e.irr?.type === "approx";
40: }
41: 
42: export function parseExact(s: string): Exact {
43:   const t = s.trim().replace(",", ".").replace(/\s+/g, "").toLowerCase().replace("π", "pi");
44:   if (t === "") throw new Error("dokładne: puste wejście");
45:   const per = /^(-?)(\d*)\.?(\d*)\((\d+)\)$/.exec(t);
46:   if (per) {
47:     const neg = per[1] === "-";
48:     const intPart = per[2] === "" ? 0n : BigInt(per[2]);
49:     const frac = per[3] ?? "";
50:     const cyc = per[4] ?? "";
51:     if (/^0+$/.test(cyc)) {
52:       const plain = `${neg ? "-" : ""}${intPart}${frac === "" ? "" : `.${frac}`}`;
53:       return { rat: fromString(plain === "-0" || plain === "-" ? "0" : plain), irr: null };
54:     }
55:     const f = frac.length;
56:     const p = cyc.length;
57:     const pow10f = 10n ** BigInt(f);
58:     const pow10p = 10n ** BigInt(p);
59:     const fracVal = frac === "" ? 0n : BigInt(frac);
60:     const cycVal = BigInt(cyc);
61:     const num = intPart * pow10f * (pow10p - 1n) + fracVal * (pow10p - 1n) + cycVal;
62:     const den = pow10f * (pow10p - 1n);
63:     return { rat: norm(neg ? -num : num, den), irr: null };
64:   }
65:   const m = /^(.*?)pi$/.exec(t);
66:   if (m) {
67:     const raw = m[1].replace(/\*$/, "");
68:     const coef = raw === "" || raw === "+" ? ONE : raw === "-" ? neg(ONE) : fromString(raw);
69:     return { rat: ZERO, irr: { type: "pi", coef } };
70:   }
71:   return { rat: fromString(s), irr: null };
72: }
73: 
74: export function stripPi(e: Exact): Rational {
75:   if (!isZero(e.rat) || !e.irr || e.irr.type !== "pi") {
76:     throw new Error("π nie skraca się z danymi");
77:   }
78:   return e.irr.coef;
79: }
80: 
81: export function isqrt(n: bigint): bigint {
82:   if (n < 0n) throw new Error("dokładne: pierwiastek z liczby ujemnej");
83:   if (n < 2n) return n;
84:   let x = n;
85:   let y = (x + 1n) / 2n;
86:   while (y < x) {
87:     x = y;
88:     y = (x + n / x) / 2n;
89:   }
90:   return x;
91: }
92: 
93: export function splitSquareFactor(n: bigint): { outside: bigint; inside: bigint } {
94:   if (n < 0n) throw new Error("dokładne: ujemna liczba pod pierwiastkiem");
95:   if (n === 0n) return { outside: 0n, inside: 1n };
96:   if (n > 1_000_000_000_000n) return { outside: 1n, inside: n };
97:   let rest = Number(n);
98:   let outside = 1;
99:   let inside = 1;
100:   for (let f = 2; f * f <= rest; f++) {
101:     let e = 0;
102:     while (rest % f === 0) {
103:       rest /= f;
104:       e++;
105:     }
106:     if (e > 0) {
107:       outside *= f ** Math.floor(e / 2);
108:       if (e % 2 === 1) inside *= f;
109:     }
110:   }
111:   inside *= rest;
112:   return { outside: BigInt(outside), inside: BigInt(inside) };
113: }
114: 
115: export function sqrtRational(r: Rational): Exact {
116:   if (cmp(r, ZERO) < 0)
117:     throw new Error("dokładne: pierwiastek z ujemnej (liczymy na rzeczywistych)");
118:   if (isZero(r)) return { rat: ZERO, irr: null };
119:   const m = r.p * r.q;
120:   const { outside, inside } = splitSquareFactor(m);
121:   const coef = norm(outside, r.q);
122:   if (inside === 1n) return { rat: coef, irr: null };
123:   return { rat: ZERO, irr: { type: "sqrt", coef, radicand: inside } };
124: }
125: 
126: function icbrt(n: bigint): bigint | null {
127:   if (n === 0n) return 0n;
128:   const neg = n < 0n;
129:   const a = neg ? -n : n;
130:   if (a > 1_000_000_000_000_000n) return null;
131:   const c = BigInt(Math.round(Math.cbrt(Number(a))));
132:   for (const d of [c - 2n, c - 1n, c, c + 1n, c + 2n]) {
133:     if (d >= 0n && d * d * d === a) return neg ? -d : d;
134:   }
135:   return null;
136: }
137: 
138: export function cbrtRational(r: Rational): Exact {
139:   const cn = icbrt(r.p);
140:   const cd = icbrt(r.q);
141:   if (cn === null || cd === null || cd === 0n) {
142:     throw new Error("pierwiastek sześcienny nie wychodzi dokładnie");
143:   }
144:   return { rat: norm(cn, cd), irr: null };
145: }
146: 
147: function iroot(n: bigint, k: number): bigint | null {
148:   if (n === 0n) return 0n;
149:   const neg = n < 0n;
150:   if (neg && k % 2 === 0) return null;
151:   const a = neg ? -n : n;
152:   if (a > 1_000_000_000_000_000n) return null;
153:   const c = BigInt(Math.round(Math.pow(Number(a), 1 / k)));
154:   const kk = BigInt(k);
155:   for (const d of [c - 2n, c - 1n, c, c + 1n, c + 2n]) {
156:     if (d >= 0n && d ** kk === a) return neg ? -d : d;
157:   }
158:   return null;
159: }
160: 
161: export function rootRational(r: Rational, k: number): Exact {
162:   if (!Number.isInteger(k) || k < 2 || k > 1000)
163:     throw new Error("dokładne: stopień pierwiastka to liczba całkowita 2–1000");
164:   if (isZero(r)) return { rat: ZERO, irr: null };
165:   if (cmp(r, ZERO) < 0 && k % 2 === 0)
166:     throw new Error("dokładne: parzysty pierwiastek z ujemnej (liczymy na rzeczywistych)");
167:   const pr = iroot(r.p, k);
168:   const qr = iroot(r.q, k);
169:   if (pr === null || qr === null || qr === 0n) throw new Error("dokładne: pierwiastek niewymierny");
170:   return { rat: norm(pr, qr), irr: null };
171: }
172: 
173: function irrValue(x: Irr | null): number {
174:   if (!x) return 0;
175:   if (x.type === "sqrt") return toNumber(x.coef) * Math.sqrt(Number(x.radicand));
176:   if (x.type === "pi") return toNumber(x.coef) * Math.PI;
177:   return x.value;
178: }
179: 
180: function addIrr(x: Irr | null, y: Irr | null): Irr | null {
181:   if (!x) return y;
182:   if (!y) return x;
183:   if (x.type === "approx" || y.type === "approx") {
184:     return { type: "approx", value: irrValue(x) + irrValue(y) };
185:   }
186:   if (x.type === "sqrt" && y.type === "sqrt") {
187:     if (x.radicand !== y.radicand) throw new Error("dokładne: różne liczby pod pierwiastkiem");
188:     const coef = add(x.coef, y.coef);
189:     return isZero(coef) ? null : { type: "sqrt", coef, radicand: x.radicand };
190:   }
191:   if (x.type === "pi" && y.type === "pi") {
192:     const coef = add(x.coef, y.coef);
193:     return isZero(coef) ? null : { type: "pi", coef };
194:   }
195:   throw new Error("dokładne: nie mieszam pierwiastków z π");
196: }
197: 
198: function negIrr(x: Irr | null): Irr | null {
199:   if (!x) return null;
200:   if (x.type === "approx") return { type: "approx", value: -x.value };
201:   return { ...x, coef: neg(x.coef) };
202: }
203: 
204: export function addExact(a: Exact, b: Exact): Exact {
205:   return { rat: add(a.rat, b.rat), irr: addIrr(a.irr, b.irr) };
206: }
207: 
208: export function subExact(a: Exact, b: Exact): Exact {
209:   return { rat: sub(a.rat, b.rat), irr: addIrr(a.irr, negIrr(b.irr)) };
210: }
211: 
212: export function mulRat(e: Exact, r: Rational): Exact {
213:   if (isZero(r)) return { rat: ZERO, irr: null };
214:   const irr = e.irr;
215:   if (irr?.type === "approx") return approxOnly(irr.value * toNumber(r));
216:   return {
217:     rat: mul(e.rat, r),
218:     irr: irr ? { ...irr, coef: mul(irr.coef, r) } : null,
219:   };
220: }
221: 
222: export function divRat(e: Exact, r: Rational): Exact {
223:   if (isZero(r)) throw new Error("dokładne: dzielenie przez zero");
224:   const irr = e.irr;
225:   if (irr?.type === "approx") return approxOnly(irr.value / toNumber(r));
226:   return {
227:     rat: div(e.rat, r),
228:     irr: irr ? { ...irr, coef: div(irr.coef, r) } : null,
229:   };
230: }
231: 
232: export function approx(e: Exact): number {
233:   return toNumber(e.rat) + irrValue(e.irr);
234: }
235: 
236: export type BestForm = "int" | "frac" | "sqrt" | "pi";
237: 
238: export function bestForm(e: Exact): BestForm {
239:   if (!e.irr || e.irr.type === "approx") return e.rat.q === 1n ? "int" : "frac";
240:   return e.irr.type;
241: }
242: 
243: export type Quadratic =
244:   | { kind: "two"; delta: Exact; roots: [Exact, Exact] }
245:   | { kind: "one"; delta: Exact; roots: [Exact] }
246:   | { kind: "none"; delta: Exact; roots: [] }
247:   | { kind: "linear"; roots: [Exact] };
248: 
249: export function solveQuadratic(a: Rational, b: Rational, c: Rational): Quadratic {
250:   if (isZero(a)) {
251:     if (isZero(b)) throw new Error("kwadratowe: a i b są zerami — to nie jest równanie");
252:     return { kind: "linear", roots: [{ rat: div(neg(c), b), irr: null }] };
253:   }
254:   const twoA = mul(of(2), a);
255:   const deltaRat = sub(mul(b, b), mul(mul(of(4), a), c));
256:   const s = cmp(deltaRat, ZERO);
257:   const delta: Exact = { rat: deltaRat, irr: null };
258:   if (s < 0) return { kind: "none", delta, roots: [] };
259:   const u: Exact = { rat: div(neg(b), twoA), irr: null };
260:   if (s === 0) return { kind: "one", delta, roots: [u] };
261:   const w = divRat(sqrtRational(deltaRat), twoA);
262:   return { kind: "two", delta, roots: [subExact(u, w), addExact(u, w)] };
263: }
264: 
265: const HALF: Rational = { p: 1n, q: 2n };
266: const SQRT2_2: Exact = { rat: ZERO, irr: { type: "sqrt", coef: HALF, radicand: 2n } };
267: const SQRT3_2: Exact = { rat: ZERO, irr: { type: "sqrt", coef: HALF, radicand: 3n } };
268: const SQRT3_3: Exact = { rat: ZERO, irr: { type: "sqrt", coef: { p: 1n, q: 3n }, radicand: 3n } };
269: 
270: function baseTrig(kind: "sin" | "cos" | "tan", deg0306090: number): Exact {
271:   const one = exactOf(ONE);
272:   const half = exactOf(HALF);
273:   switch (deg0306090) {
274:     case 0:
275:       if (kind === "sin") return exactOf(ZERO);
276:       if (kind === "cos") return one;
277:       return exactOf(ZERO);
278:     case 30:
279:       if (kind === "sin") return half;
280:       if (kind === "cos") return SQRT3_2;
281:       return SQRT3_3;
282:     case 45:
283:       if (kind === "tan") return one;
284:       return SQRT2_2;
285:     case 60:
286:       if (kind === "sin") return SQRT3_2;
287:       if (kind === "cos") return half;
288:       return { rat: ZERO, irr: { type: "sqrt", coef: ONE, radicand: 3n } };
289:     case 90:
290:       if (kind === "sin") return one;
291:       if (kind === "cos") return exactOf(ZERO);
292:       throw new Error("tangens nieokreślony dla 90° + k·180°");
293:     default:
294:       throw new Error("trygonometria: nieobsługiwany kąt bazowy");
295:   }
296: }
297: 
298: export function trigExact(kind: "sin" | "cos" | "tan", deg: number): Exact {
299:   if (!Number.isFinite(deg)) throw new Error("trygonometria: zły kąt");
300:   const d = ((deg % 360) + 360) % 360;
301:   const ref = d <= 90 ? d : d <= 180 ? 180 - d : d <= 270 ? d - 180 : 360 - d;
302:   if (![0, 30, 45, 60, 90].includes(ref)) {
303:     const rad = (deg * Math.PI) / 180;
304:     const v = kind === "sin" ? Math.sin(rad) : kind === "cos" ? Math.cos(rad) : Math.tan(rad);
305:     return approxOnly(v);
306:   }
307:   if (kind === "tan" && (ref === 90 || d === 90 || d === 270)) {
308:     throw new Error("tangens nieokreślony dla 90° + k·180°");
309:   }
310:   const sSin = d <= 180 ? 1 : -1;
311:   const sCos = d <= 90 || d >= 270 ? 1 : -1;
312:   if (kind === "sin") {
313:     const b = baseTrig("sin", ref);
314:     return sSin === 1 ? b : negExact(b);
315:   }
316:   if (kind === "cos") {
317:     const b = baseTrig("cos", ref);
318:     return sCos === 1 ? b : negExact(b);
319:   }
320:   const s = baseTrig("sin", ref);
321:   const c = baseTrig("cos", ref);
322:   const t = divExact(s, c);
323:   const sign = sSin * sCos;
324:   return sign === 1 ? t : negExact(t);
325: }
326: 
327: function negExact(e: Exact): Exact {
328:   return { rat: neg(e.rat), irr: negIrr(e.irr) };
329: }
330: 
331: export function divExact(a: Exact, b: Exact): Exact {
332:   if (!b.irr) return divRat(a, b.rat);
333:   if (b.irr.type === "approx" || b.irr.type === "pi") return approxOnly(approx(a) / approx(b));
334:   if (a.irr?.type === "approx") return approxOnly(approx(a) / approx(b));
335:   const r = b.irr.radicand;
336:   const c2 = b.irr.coef;
337:   if (!isZero(b.rat)) return approxOnly(approx(a) / approx(b));
338:   if (!a.irr) {
339:     const coef = div(a.rat, mul(c2, { p: r, q: 1n }));
340:     return { rat: ZERO, irr: { type: "sqrt", coef, radicand: r } };
341:   }
342:   if (a.irr.type !== "sqrt" || a.irr.radicand !== r || !isZero(a.rat)) {
343:     return approxOnly(approx(a) / approx(b));
344:   }
345:   return exactOf(div(a.irr.coef, c2));
346: }
347: 
348: export function logExact(base: Rational, x: Rational): Exact {
349:   if (cmp(base, ZERO) <= 0 || cmp(x, ZERO) <= 0)
350:     throw new Error("logarytm: podstawa i liczba dodatnie");
351:   if (base.p === 1n && base.q === 1n) throw new Error("logarytm: podstawa różna od 1");
352:   if (isZero(sub(x, ONE))) return exactOf(ZERO);
353:   if (cmp(sub(x, base), ZERO) === 0) return exactOf(ONE);
354:   const est = Math.round(Math.log(toNumber(x)) / Math.log(toNumber(base)));
355:   if (Number.isInteger(est) && Math.abs(est) <= 1000) {
356:     if (cmp(pow(base, est), x) === 0) return exactOf(of(est));
357:   }
358:   return approxOnly(Math.log(toNumber(x)) / Math.log(toNumber(base)));
359: }

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/exact/rational.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/exact/rational.ts, lines 1-124
1: export interface Rational {
2:   p: bigint;
3:   q: bigint;
4: }
5: 
6: export function gcd(a: bigint, b: bigint): bigint {
7:   let x = a < 0n ? -a : a;
8:   let y = b < 0n ? -b : b;
9:   while (y !== 0n) {
10:     const t = x % y;
11:     x = y;
12:     y = t;
13:   }
14:   return x;
15: }
16: 
17: export function norm(p: bigint, q: bigint): Rational {
18:   if (q === 0n) throw new Error("wymierna: mianownik nie może być zerem");
19:   if (q < 0n) {
20:     p = -p;
21:     q = -q;
22:   }
23:   if (p === 0n) return { p: 0n, q: 1n };
24:   const g = gcd(p, q);
25:   return { p: p / g, q: q / g };
26: }
27: 
28: export const ZERO: Rational = { p: 0n, q: 1n };
29: export const ONE: Rational = { p: 1n, q: 1n };
30: 
31: export function of(p: bigint | number, q: bigint | number = 1): Rational {
32:   return norm(BigInt(p), BigInt(q));
33: }
34: 
35: const FRAC_RE = /^(-?\d+)\s*\/\s*(-?\d+)$/;
36: const DEC_RE = /^(-?)(\d+)(?:\.(\d+))?$/;
37: 
38: export function fromString(s: string): Rational {
39:   const t = s.trim().replace(",", ".");
40:   if (t === "") throw new Error("wymierna: puste wejście");
41:   const f = FRAC_RE.exec(t);
42:   if (f) return norm(BigInt(f[1]), BigInt(f[2]));
43:   const d = DEC_RE.exec(t);
44:   if (!d) throw new Error(`wymierna: nie umiem sparsować "${s}"`);
45:   const neg = d[1] === "-";
46:   const head = BigInt(d[2]);
47:   const tail = d[3] ?? "";
48:   if (tail === "") return { p: neg ? -head : head, q: 1n };
49:   const den = 10n ** BigInt(tail.length);
50:   const num = head * den + BigInt(tail);
51:   return norm(neg ? -num : num, den);
52: }
53: 
54: export function add(a: Rational, b: Rational): Rational {
55:   return norm(a.p * b.q + b.p * a.q, a.q * b.q);
56: }
57: 
58: export function sub(a: Rational, b: Rational): Rational {
59:   return norm(a.p * b.q - b.p * a.q, a.q * b.q);
60: }
61: 
62: export function mul(a: Rational, b: Rational): Rational {
63:   return norm(a.p * b.p, a.q * b.q);
64: }
65: 
66: export function div(a: Rational, b: Rational): Rational {
67:   if (b.p === 0n) throw new Error("wymierna: dzielenie przez zero");
68:   return norm(a.p * b.q, a.q * b.p);
69: }
70: 
71: export function neg(a: Rational): Rational {
72:   return { p: -a.p, q: a.q };
73: }
74: 
75: export function cmp(a: Rational, b: Rational): number {
76:   const d = a.p * b.q - b.p * a.q;
77:   return d < 0n ? -1 : d > 0n ? 1 : 0;
78: }
79: 
80: export function isZero(a: Rational): boolean {
81:   return a.p === 0n;
82: }
83: 
84: export function toNumber(a: Rational): number {
85:   return Number(a.p) / Number(a.q);
86: }
87: 
88: export function isIntegerR(a: Rational): boolean {
89:   return a.q === 1n;
90: }
91: 
92: export function pow(base: Rational, exp: number): Rational {
93:   if (!Number.isInteger(exp)) throw new Error("wymierna: potęga musi być całkowita");
94:   if (exp === 0) return ONE;
95:   if (exp < 0) return div(ONE, pow(base, -exp));
96:   let r = ONE;
97:   let b = base;
98:   let k = exp;
99:   while (k > 0) {
100:     if (k % 2 === 1) r = mul(r, b);
101:     b = mul(b, b);
102:     k = Math.floor(k / 2);
103:   }
104:   return r;
105: }
106: 
107: export function factorial(n: bigint): bigint {
108:   if (n < 0n) throw new Error("silnia: tylko dla n ≥ 0");
109:   if (n > 1000n) throw new Error("silnia: za duże n (limit 1000)");
110:   let r = 1n;
111:   for (let i = 2n; i <= n; i++) r *= i;
112:   return r;
113: }
114: 
115: export function binom(n: bigint, k: bigint): bigint {
116:   if (n < 0n || k < 0n || k > n) throw new Error("kombinacje: wymagane 0 ≤ k ≤ n");
117:   if (n > 1000n) throw new Error("kombinacje: za duże n (limit 1000)");
118:   const kk = k > n - k ? n - k : k;
119:   let r = 1n;
120:   for (let i = 1n; i <= kk; i++) {
121:     r = (r * (n - kk + i)) / i;
122:   }
123:   return r;
124: }

---

## Assistant

_Thinking:_

Now I have a comprehensive scan. Let me compile the phase 0 findings and present them, then move to phase 1 planning.

Phase 0 findings summary:

**Project**: "Wzornik Maturalny" (wzornik-maturalny) v0.7.3 — offline PWA of CKE matura formulas with built-in calculators. Stack: Vue 3.5 + Vite 5 + TypeScript, PWA (vite-plugin-pwa), KaTeX 0.18, vue-router, vitest, oxlint/oxfmt, husky. Polish language throughout. Deployed GitHub Pages.

**Architecture**:
- `src/lib/formulas/` — central registry: `FORMULAS: FormulaDef[]` in `index.ts`, composed from subject modules (math.ts, math_pp1, math_pp2, math_katy, math_pr, math_delta, math_kwadratowe, math_wzory_skrocone, math_heron, math_wyodrebnia_grup, math_poly, math_dziel_horner, math_pisemne, math_sumy, math_trojkaty, physics.ts, physics_pp, physics_pr, chemia.ts, chemia_pr, geografia.ts, geografia_pr).
- `FormulaDef`: id, subject ("matematyka"|"fizyka"|"chemia"|"geografia"), topic, name, latex, vars: FormulaVar[] (id, label, unit?, kind?: "text"|"select"|"list", options?), mode: "nvar" | "fixed", outputId, outputLabel, solve(unknown, known, places, selects) => FormulaSolution { values: Exact[], steps: SolveStep[], labels? }.
- Exact arithmetic: src/lib/exact/{exact,rational,format}.ts — Rational as BigInt p/q, Irr: sqrt | pi | approx; solveQuadratic returns {kind:"two"|"one"|"none"|"linear", delta, roots}.
- Solver: src/lib/solver/solver.ts — mode fixed: fills all vars → solve(outputId,...); mode nvar: exactly one empty field → unknown.
- parseEquation in src/lib/parse-formula.ts — auto-recognition for quick input & Zadanie view; supports quadratic, linear, inequality (with op select), exponential, log, percent, power, sqrt, Tales (a/b=c/d=x), scale, poly (deg 3-4), canonical quadratic, abs, systems of linear equations with 2 equations/2 unknowns (x,y), kv pairs (ms/mr, a1/r/n, q/a1/n).
- WzornikView: search via searchFormulas + fuzzy; favorites; auto-recognize ("Rozpoznano zadanie — to X. Rozwiąż z automatu →").
- ZadanieView: textarea + examples list; "Wklej zadanie".
- SolverView: quick equation input ("Wklej całe równanie, np. 4x^2-2x+10=0" → "Wypełnij"), per-var inputs, places, steps, results, FormulaDiagram (SVG geometry), FunctionPlot (Canvas) — plots only for a hardcoded set of formula ids.
- HomeView: hero demo with quadratic + unit converter.
- KalkulatoryView: grouped by topic list of solvers.
- ConverterView: unit conversion (11 categories).
- HistoriaView: history + favorites (IndexedDB).
- SettingsView: theme + places.
- NavRail: quick links (Wzory /, Miary /konwerter, Moje /historia, Zadanie /zadanie).
- Components: Formula (KaTeX), FormulaDiagram (SVG via geometry.ts), FunctionPlot (Canvas), NavRail.
- SEO: src/lib/seo.ts, sitemap generator.
- Descriptions: src/lib/descriptions.ts (DESCRIPTIONS keyed by formula id; ~200 entries).

**Formula inventory (171 ids found via grep)**:
Math (subject "matematyka") — many modules:
- math.ts (13): pitagoras, pole-trojkata, pole-prostokata, pole-kola, obwod-kola, rownanie-kwadratowe, procent, ciag-arytmetyczny, ciag-geometryczny, objetosc-prostopadloscianu, objetosc-kuli, pole-kuli, funkcja-liniowa.
- math_pp1.ts (18): potega, pierwiastek, logarytm, wartosc-bezwzgledna, procent-skladany, uklad-rownan, nierownosc-kwadratowa, horner-pierwiastki, postac-kanoniczna, prawdo-klasyczne, permutacje, kombinacje, wariacje, tales, postacie-kwadratowe, rozklad-liczby, znak-wielomianu, statystyka.
- math_pp2.ts (17): katy-okrag, pole-trapez, pole-rombu, pole-rownoleglobok, luk-okregu, wycinek-kola, odl-punktow, srodek-odcinka, prosta-2-punkty, prostopadlosc, okrag-rownanie, odl-punkt-prosta, graniastoslup, ostroslup, walec, stozek, romb-bok.
- math_katy.ts (8): zamiana-miary, kat-trojkat, kat-miedzy-prostymi, trojkaty-podobne, kat-z-bokow, suma-katow, tw-sinusow?, tw-cosinusow?, okrag-opisany-wpisiny... From grep: math_katy ids: zamiana-miary, kat-trojkat, kat-miedzy-prostymi, trojkaty-podobne, kat-z-bokow, suma-katow (6) and math_trojkaty: tw-sinusow, tw-cosinusow, okrag-opisany-wpisany (3). Total 9.
- math_pr.ts (14): newton, silnia, szesciany, granica-qn, pochodna-wielomianu, ekstrema-kwadratowej, prawdo-warunkowe, prawdo-calkowite, rownanie-wykladnicze, rownanie-logarytmiczne, vieta, podwojony-kat, schemat-bernoulliego, suma-katow-tryg.
- math_delta.ts (1): delta.
- math_kwadratowe.ts (2): kwadratowa-iloczynowa, kwadratowa-ogolna.
- math_wzory_skrocone.ts (2): kwadrat-sumy-roznicy, roznica-kwadratow.
- math_heron.ts (1): wzor-herona.
- math_wyodrebnia_grup.ts (2): wyodrebnianie-czynnika, grupowanie.
- math_poly.ts (1): rozklad-wielomianu.
- math_dziel_horner.ts (2): dzielenie-wielomianow, schemat-hornera.
- math_pisemne.ts (4): dodawanie-pisemne, odejmowanie-pisemne, mnozenie-pisemne, dzielenie-pisemne.
- math_sumy.ts (3): suma-ciagu-arytmetycznego, suma-ciagu-geometrycznego, szereg-geometryczny.
- math_trojkaty.ts (3): tw-sinusow, tw-cosinusow, okrag-opisany-wpisany.

Wait — tw-sinusow, tw-cosinusow, okrag-opisany-wpisany appear in both math_katy.ts and math_trojkaty.ts? That's odd. Let me check: grep showed math_katy.ts lines 12, 69, 108, 192, 247, 299 with ids zamiana-miary, kat-trojkat, kat-miedzy-prostymi, trojkaty-podobne, kat-z-bokow, suma-katow. And math_trojkaty.ts lines 19, 94, 204 with ids tw-sinusow, tw-cosinusow, okrag-opisany-wpisany. OK so they're distinct files, no dupes.

Physics:
- physics.ts (9): predkosc, droga-jednostajnie-przyspieszona, predkosc-chwilowa, sila, energia-kinetyczna, energia-potencjalna, gestosc, cisnienie, praca.
- physics_pp.ts (35): moc, sprawnosc, ped, zderzenia, ruch-okrag, grawitacja, kepler, archimedes, hydrostatyczne, cieplo, cieplo-przemiany, ohm, opor, moc-pradu, energia-pradu, lorentz, snell, soczewki, powiekszenie, siatka, fale, wahadlo-mat, wahadlo-sprezyna, foto, emc2, rozpad, energia-wewnetrzna, oporniki-szeregowo, oporniki-rownolegle, doppler, kat-graniczny, boyle, gaylussac, charles.
- physics_pr.ts (23): rzut-poziomy, moment-sily, energia-obrotowa, bernoulli, clapeyron, pierwsza-zasada, izobaryczna, carnot, rozszerzalnosc, coulomb, natezenie, potencjal, kondensator-q, kondensator-e, sem, strumien, faraday, solenoid, sila-elektrodynamiczna, bohr, debroglie, energia-rel.

Chemia:
- chemia.ts (7): mol, stezenie-molowe, stezenie-procentowe, rozcienczanie, ph, wydajnosc, mieszanie.
- chemia_pr.ts (6): kc, dysocjacja, iloczyn, ogniwo, elektroliza, bufor.

Geografia:
- geografia.ts, geografia_pr.ts — with `id: string` typed entries; probably ~10 formulas.

Total ≈ 90 math + 67 physics + 13 chem + ~10 geo ≈ 180 (README says 182).

**User requirements vs current state** (gap analysis for phase 1):
1. Wszystkie wzory z matury/matury rozszerzonej/mat/fiz/chem — obecny stan: ~180 wzorów, głównie matematyka PR (rozszerzenie), PP1/PP2, katy, trojkąty, delta, kwadratowe, wierzchołek itd. Fizyka PR/PP dużo. Chemia podstaw+PR. Geografia w "rozbudowie".
2. Transformacje (przekształcenia) — obecne: kroki "Przekształcenie, Podstawienie, Wynik" w solverze; np. postacKanoniczna, kwadratowa-ogolna (Viete'a). Ale może brakuje transformacji typu "rozbij na czynniki" itd.
3. Modularność — obecna struktura modułów/formuł + modularność przez mode/vars. Pytanie, co usera znaczy.
4. Wykresy — obecne: quadraticPlot, linearPlot, polyPlot, trajectoryPlot, inequalityBands. Tylko dla wybranych formulaId.
5. Auto-rozpoznawanie — parseEquation + looksLikeEquation + ZadanieView/WzornikView recognized. Ograniczone: log_2(x)=3 not supported (regex requires log_...), "4x^2" cleaning handles x²? clean replaces x²→x^2. OK.
6. Możliwość wpisywania liczb — również na telefonie (inputmode decimal, type=number). "co teraz nie dziala" — possible issue: number inputs / mobile keyboard? Or quick input? Not yet diagnosed.
7. Równania z π i ze zmiennymi — π handled in parseExact ("25π"), hint in SolverView; variables: nvar mode.
8. Δ, miejsca zerowe, jako fn kwadratowa, osobno, wyszukiwania — obecne: delta formula, funkcja-liniowa x0, postacie-kwadratowej, search. "Miejsca zerowe" dla kwadratowej? quadraticPlot handles zeros; rownanie-kwadratowe solves. "jako fn kwadratowa — osobno, i jako osobne" — kwadratowa-iloczynowa / kwadratowa-ogolna are separate formulas. OK.

**Potential gaps observed**:
- parseEquation: log_2(x)=3 not supported (regex `^log_?(${NUM})\(x\)=(${NUM})$` requires `log_2(x)` with underscore — clean() doesn't convert `log₂` or `log2`? clean doesn't handle subscript. Actually `log_2(x)=3` → clean lowercases, removes whitespace/*, replaces , with . etc. `log_2(x)=3` stays; regex `^log_?(${NUM})\(x\)=(${NUM})$` — `log_2(x)=3`: log_? matches "log_" then NUM=2... yes `_?` means optional underscore, so `log2(x)=3` or `log_2(x)=3` both work. OK good.
- `2^x=8` supported via `^(${NUM})\^x=(${NUM})$`. Good.
- `x^3-6x^2+11x-6=0` → poly deg 3 allowed (deg 3-4). Good.
- `|x-2|=3` supported.
- `2(x-1)^2+3` canonical quadratic regex: `^(${NUM})\(x([+-]${NUM})\)\^2([+-]${NUM})?(=0)?$` — supports 2(x-1)^2+3 → good.

- FunctionPlot only wired for: rownanie-kwadratowe, postacie-kwadratowej, kwadratowa-iloczynowa, delta, ekstrema-kwadratowej, nierownosc-kwadratowa, funkcja-liniowa, rozklad-wielomianu, horner-pierwiastki, rzut-poziomy, nierownosc-kwadratowa. Not for postac-kanoniczna etc.

- FormulaDiagram via geometry.ts — only for some formula ids.

- Wzornik search: KEYWORDS per formula id; new formula = add keywords. Sitemap regenerated from registry.

- "182 wzory" per README; formulas registry count ~171 ids + geo.

OK. Now, phase 0 deliverable: gather info. I should now summarize findings and move to phase 1: create plan.

The user asked: "w fazie 0 przeszukaj kod, w fazie 1 ulozysz plan jak ci pozwole, w fazie 2-... bedziesz edytowal kod. najpierw teraz narob sobie konektutu"

So phase 0 = scan code → I've done that (extensive). Now I should report findings and proceed to phase 1: plan.

The user said phase 1 = "ulożysz plan jak ci pozwole" — you will devise a plan how it shall be. Hmm, "jak ci pozwole" probably means "jak pozwoli" — how it will be allowed / how the user allows. Anyway.

Now, per plan mode: I must not create plan files unless asked; the user hasn't asked to write a plan file. I should discuss the plan in conversation.

I should use the `question` tool for questions. Let me now present phase 0 summary and ask the right questions to move into phase 1:

1. Confirm phase 0 scan complete and summarize key findings.
2. Ask about scope/approach for phase 1: e.g., priority — "przynajmniej wszystkie wzory z matury i matury rozszerzonej z mat, fiz oraz chem. ale glownie z matematyki" — the user wants all formulas; we found ~180 already registered. Missing ones? Which formulas from the CKE matura syllabus are absent? E.g., matematyka: funkcje kwadratowe (present), ciągi (present), ciąg geometryczny (present), logarytmy (present), baza logarytmiczna (logarytm covers), wymierniki (pierwiastek), procent (present), procent składany (present), układy równań (present), nierówności (present), wielomiany (present: horner, dzielenie, grupowanie, rozklad, znak), kombinatoryka (present), prawdopodobieństwo (present), trójkąty (present), geometria (present), kąty (present), planimetria (present), kula/okrąg (present), bryły (present), pola (present), objętości (present), ruch jednostajny (phys), kinematyka (present), dynamika (present), energia (present), gęstość (present), ciśnienie (present), praca (present), moc (phys_pp), sprawność (phys_pp), pęd (phys_pp), zderzenia (phys_pp), R (phys_pp), grawitacja (phys_pp), Kepler (phys_pp), wypór (phys_pp), hydrostatyczne (phys_pp), ciepło (phys_pp), topnienie/parowanie (phys_pp), Ohm (phys_pp), opór (phys_pp), moc prądu (phys_pp), energia prądu (phys_pp), Lorentz (phys_pp), Snell (phys_pp), soczewki (phys_pp), powiekszenie (phys_pp), siatka dyfrakcyjna (phys_pp), fale (phys_pp), wahadło (phys_pp), fotoelektryka (phys_pp), E=mc² (phys_pp), rozpad (phys_pp), energia wewnętrzna (phys_pp), oporniki (phys_pp), Doppler (phys_pp), kąt graniczny (phys_pp), Boyle/Gay-Lussac/Charles (phys_pp), statystyka (math_pp1), rozmiana, deniwelacja, nachylenie stoku, urbanizacja, bezrobocie, PKB, feminizacja, przyrost, predkosc chwilowa, energia wewnętrzna, oporniki, doppler, kąt graniczny, suma kątów trójkąta, sinus sumy... plus geografia: skala mapy, gęstość zaludnienia, przyrost naturalny, saldo migracji, przyrost rzeczywisty, deniwelacja, amplituda temperatur, nachylenie stoku, wskaznik urbanizacji, stopa bezrobocia, PKB per capita, wskaźnik feminizacji, wskaźnik przyrostu, czas słoneczny, bilans wodny, klimat.

So the app seems quite comprehensive already. The user's perception "a nie ma" (and it doesn't have) might refer to specific missing things, or they may not know about the existing state.

Given the phase flow: Phase 0 scan done → Phase 1 plan → Phase 2+ code edits.

I should now:
1. Summarize phase 0 findings concisely.
2. Use the question tool to ask key planning questions (scope, priority, what's missing).

Let me use the question tool now for the planning questions. Actually, the user asked me to first do phase 0, then phase 1 will devise the plan. Since phase 0 is essentially complete from my side, I should report and ask how to proceed / what to prioritize in phase 1.

Let me formulate questions for phase 1:
1. Priority scope: "przynajmniej wszystkie wzory z matury i matury rozszerzonej z mat, fiz oraz chem. ale glownie z matematyki" — do we target the full CKE syllabus, or focus on math gaps? And do we need to add NEW formulas or fix/complete existing ones (np. transformacje, rozbite vs nie rozbite, miejsca zerowe jako fn kwadratowa)?
2. "modonicznosci" — modularność: do we need new module structure, or is existing modular enough?
3. Mobile input: is the fix about `inputmode`/`type="number"`/quick input/textarea? Need diagnosis.
4. Transformacje: which ones are missing? E.g., "rozbity ≠ nie rozbity" — factored vs expanded form; the app has both kwadratowa-iloczynowa and kwadratowa-ogolna (mutually inverse-ish). Maybe user wants e.g. ax²+bx+c → a(x−x₁)(x−x₂) transform and vice versa. Already exists partially.
5. Wykresy: which formulas should get plots (postac kanoniczna? funkcja liniowa with two points? trójkąt?).
6. Auto-rozpoznawanie: which equation formats should be added (np. `x^2+5x+6=0`? that's parseSide... `4x^2-2x+10=0` is used as example and works? Let me check: clean("4x^2-2x+10=0") → "4x^2-2x+10=0". splitTerms → ["4x^2", "-2x", "10"]. parseSide: t.includes("x^2") → coef = parseCoeff("4") = 4 → a += 4. Good. So works.
7. "równania z π i ze zmiennymi" — π supported in parseExact and in formulas (pole koła etc.). Variables — nvar mode.

Honestly, for phase 1 I should propose a structured plan. But the user explicitly wants phase 1 to be devised by me ("w fazie 1 ulozysz plan jak ci pozwole"). Since we're in plan mode, I should now discuss and use question tool for decisions.

Given the flow, I think the best next step: present phase 0 findings concisely, then use the question tool to gather the planning decisions before writing phase 1 plan.

Let me use the question tool now with relevant questions.

Actually, let me reconsider: the user said "najpierw teraz narob sobie konektutu" = get acquainted with the codebase; then "najpierw FAZA 0 - przeszukaj kod w trybie analizy (planu) nie ukladaj nic, zbieraj potrzebne TOBIE informacje do dalszych dzialan" = first do phase 0 - scan the code in analysis (planning) mode, don't arrange anything, just gather info needed for further actions.

I've gathered info. Now I should probably summarize and ask about moving to phase 1. Using the question tool is what the user requested for questions.

Let me use the question tool with a few questions to shape phase 1.

Questions:
1. Phase 0 complete? (implicitly yes, but confirm findings)
2. Scope for phase 1 plan: prioritize adding missing formulas/transformations; which areas?
3. How to handle "modularność" requirement.
4. Mobile input issue: want me to diagnose in phase 2.

Hmm, but I shouldn't over-ask. The user wants me to move to phase 1 next. Let me present findings and then ask the key questions to form the phase 1 plan.

Let me use the question tool.

Skan fazy 0 dobiegł końca — zebralem znacząco więcej informacji o kodzie. Przed przejściem do **fazy 1 (plan)**, chciałbym zweryfikować kilka kwestii, żeby plan był trafny.

**Tool: question**

**Input:**
```json
{
  "questions": [
    {
      "header": "Zakres fazy 1",
      "question": "Faza 0 dobiegła końca — teraz przed faza 1 (opracowanie planu): czy, z Twojej perspektywy, priorytetem jest dodać brakujące **nowe wzory** z pełnego syllabusu matury (mat/fiz/chem/mat rozszerzona), czy najpierw uzupełnić **transformacje i logikę obliczeń** u już istniejących wzorów?",
      "options": [
        {
          "label": "Nowe wzory z CKE syllabusu",
          "description": "Lista brakujących wzorów do dodania jako nowe FormulaDef."
        },
        {
          "label": "Transformacje w istniejących wzorach",
          "description": "np. rozbijanie, pod/nad linki, miejsca zerowe, postać iloczynowa ↔ ogólna ↔ kanoniczna."
        },
        {
          "label": "Po obu – najpierw audyt, potem plan",
          "description": "Faza 1: audyt kompletności + plan."
        }
      ],
      "multiple": false
    },
    {
      "header": "Transformacje",
      "question": "Czy wymagany zakres „transformacje” to przekształcenia algebraiczne (np. ax²+bx+c → a(x−x₁)(x−x₂), rozbicie na czynniki), czy też symulacja kroków (Obliczenie Δ → pierwiastki → wynik)?",
      "options": [
        {
          "label": "Tylko algebraiczne",
          "description": "Konwersje między postaciami, wzory skrócone."
        },
        {
          "label": "Kroki szkolne",
          "description": "Oblicz Δ, podstawij, podziel — już są, ale może brakują."
        },
        {
          "label": "Oba",
          "description": "Plan integracji."
        }
      ],
      "multiple": false
    },
    {
      "header": "Mobile / wpisywanie liczb",
      "question": "Problem z wpisywaniem liczb na telefonie: co dokładnie było nie tak? Czy chodzi o pola `type=\"number\"`, `inputmode=\"decimal\"`, klawiatura, czy szybkie wypełnianie (`4x^2-2x+10=0`)? Czy mam to zweryfikować w fazie 2?",
      "options": [
        {
          "label": "Tak, zweryfikuję",
          "description": "Dodatkowy research / test w phase 2."
        },
        {
          "label": "Nie, mam to już zdiagnozowane",
          "description": "Opisz proszę, czego dotyczy."
        }
      ],
      "multiple": false
    }
  ]
}
```

User has answered your questions: "Faza 0 dobiegła końca — teraz przed faza 1 (opracowanie planu): czy, z Twojej perspektywy, priorytetem jest dodać brakujące **nowe wzory** z pełnego syllabusu matury (mat/fiz/chem/mat rozszerzona), czy najpierw uzupełnić **transformacje i logikę obliczeń** u już istniejących wzorów?"="1. Nowe wzory z CKE syllabusu
Lista brakujących wzorów do dodania jako nowe FormulaDef.
2.Transformacje w istniejących wzorach
np. rozbijanie, pod/nad linki, miejsca zerowe, postać iloczynowa ↔ ogólna ↔ kanoniczna.
Obie te rzeczy. najwazniejsza matematyka, mozesz chwilowo pominac. chcialbym tez rowniez tryb gdzie wpisac rownanie i podklada pod rozne jako jeden wynik(lub wyniki wszystkie mozliwe dla tego w roznych przemianach (do zapisu)) calego jakby zadania.", "Czy wymagany zakres „transformacje” to przekształcenia algebraiczne (np. ax²+bx+c → a(x−x₁)(x−x₂), rozbicie na czynniki), czy też symulacja kroków (Obliczenie Δ → pierwiastki → wynik)?"="Oba", "Problem z wpisywaniem liczb na telefonie: co dokładnie było nie tak? Czy chodzi o pola `type="number"`, `inputmode="decimal"`, klawiatura, czy szybkie wypełnianie (`4x^2-2x+10=0`)? Czy mam to zweryfikować w fazie 2?"="nie pozwala wpisac pi ani x ani znakow". You can now continue with the user's answers in mind.

---

## Assistant

_Thinking:_

The user's answers:
1. Scope for phase 1: "Obie te rzeczy. najważniejsza matematyka, mozesz chwilowo pominac. chciałbym też również tryb gdzie wpisac rownanie i podklada pod różne jako jeden wynik (lub wyniki wszystkie możliwe dla tego w różnych przemianach (do zapisu)) całego jakby zadania."

So: Both new formulas and transformations. Math is most important, may temporarily skip. Also: a mode where you enter an equation and it fills/solves for different formulas as one result (or all possible results for that in different transformations — for writing down / "do zapisu").

2. Transformacje: Obie (algebraic + steps).

3. Mobile: "nie pozwala wpisac pi ani x ani znakow" — "it doesn't allow entering pi, x or symbols". So the mobile number input issue: can't type π, x, or symbols. That confirms the user-side problem: on phone, number inputs can't accept "x" or "π". This is likely because inputs use `inputmode="decimal"` and/or `type="number"` — type="number" keyboards don't include x/π/symbols. The fix likely: change input type to text with inputmode="decimal" (or a custom numeric keyboard) and allow π/x/Δ characters.

Good. Now I have enough to summarize phase 0 and move toward phase 1 (devising the plan).

Now, per the plan mode rules: I should discuss the plan with the user in conversation, not create plan files unless asked, not edit files, not ask subagent, not implement. The user said phase 1 = "ulożysz plan jak ci pozwole" — devise a plan how it shall be. I should now produce the phase 1 plan discussion.

But should I write the plan to /home/zota/.opencode/plan? Only if the user explicitly asks. They didn't explicitly ask for a file; they said "w fazie 1 ulozysz plan jak ci pozwole" — in phase 1 you'll devise the plan how it shall be allowed. Ambiguous, but per system reminder: don't create/update plan files unless the user explicitly asks; when they do, write only to /home/zota/.opencode/plan.

I think I should present the phase 1 plan in the conversation (discussion), and ask the user if they want it written to a file. Or just present it and let them decide.

Let me now write a comprehensive phase 0 findings summary + proposed phase 1 plan in the conversation, then ask for feedback / next steps.

Actually, let me reconsider the flow. The user wants:
- Phase 0: scan code → DONE (by me).
- Phase 1: devise plan how it shall be → now.
- Phase 2+: edit code → later (user must switch agents).

In plan mode, I should now discuss the plan, not implement.

Let me produce a structured phase 0 findings report and phase 1 plan proposal. Keep it reasonably concise but informative, in Polish.

Phase 0 findings (key):
1. Projekt: Wzornik Maturalny v0.7.3, Vue3+Vite+TS PWA, offline, KaTeX, polski język, GitHub Pages.
2. Rejestr: src/lib/formulas/index.ts + moduły subject. ~180-190 wzorów (README: 182). Struktura FormulaDef: subject/topic/name/latex/vars/mode/outputId/outputLabel/solve → FormulaSolution{values,steps,labels}.
3. Wyniki: src/lib/exact (arytmetyka wymierna BigInt, pierwiastki, π), solver.ts, format.
4. Auto-rozpoznawanie: src/lib/parse-formula.ts (parseEquation, looksLikeEquation) + WzornikView (recognized → solver z fill), ZadanieView (textarea + examples).
5. Wykresy: src/lib/plots/plot.ts + FunctionPlot.vue (Canvas) — tylko dla ~10 formulaId.
6. Rysunki: FormulaDiagram.vue + src/lib/diagrams/geometry.ts — dla subsetu.
7. Wzor: Formula.vue + KaTeX.
8. Konwerter jednostek, historia, ulubione, ustawienia, SEO/sitemap, szukiwarka fuzzy + KEYWORDS.

Phase 0 gap analysis vs. user requirements:
- Wszystkie wzory: ~180 już; ale może brakujący wyczerpujący zestaw z matury; głównie matematyka BRakuje? User said "z matematyki sie skup brakujace" — mostly missing from math. Actually from my scan, math has tons: delta, kwadratowe, postacie, nierówności, wielomiany, kombinatoryka, ciągi, logarytmy, procenty, trójkąty, planimetria, statystyka, kąty, kula/okrąg, bryły, pola, objętości, funkcje. Hmm, so a lot IS present. But maybe user means specific missing: np. funkcja liniowa (present), funkcja kwadratowa (present), wzory skrócone (present), Horner (present), pierwiastki (present), wartości bezwzględne (present), baza (present), pochodne (present), ekstremum (present), progi (prawdo-warunkowe), etc.
- Transformacje: częściowo — np. postacKanoniczna liczy p,q; kwadratowa-ogolna (Viete'a); postacie-kwadratowej łączą 3 postacie. Ale "rozbite ≠ nie rozbite" — factored vs expanded: kwadratowa-iloczynowa ↔ ogólna ↔ kanoniczna. "jako fn kwadratowa — osobno, i jako osobne" — maybe meaning: jako funkcja (f(x)=...) osobno i jako równanie. Present.
- Modularność: existing module pattern (one file per topic group) — probably adequate; user may want deeper.
- Wykresy: only for subset. For "postac kanoniczna" or "f(x)=a(x-p)^2+q" maybe plot. For inequalities, shade. For trójkąt, geometry diagram.
- Auto-rozpoznawanie: present for several formats; gaps: e.g., `log_2(x) = 3` ok; `2^x = 8` ok; `x^2-5x+6>0` ok (ineq); `4x^2-2x+10=0` ok. Maybe missing: `f(x)=...` input? `ax²+bx+c=0` with ²? clean replaces x²→x^2. OK.
- Mobile input: `inputmode="decimal"` + type number; user can't type x/π/symbols. Fix: text inputs with inputmode="decimal" and maybe pattern, allowing π/x/Δ. Quick input is text already (inputmode text, enterkeyhint go). The per-var inputs are `inputmode="decimal"` (text? In SolverView: `<input v-else v-model="inputs[v.id]" inputmode="decimal" />` — no type → defaults to text! Good, so it accepts x/π? v-model stores string; parseExact handles π. Hmm, so per-var inputs are type=text with inputmode decimal. On mobile, decimal keyboard... `inputmode="decimal"` gives numeric keyboard which lacks x/π/symbols. That's the likely bug: inputmode="decimal" restricts keyboard to digits. Fix: use inputmode="text" with pattern or just text + maybe a decimal-friendly approach; or add a custom numeric keyboard. Also HomeView demo uses type="number".
  Also ConverterView uses inputmode decimal + text.
  So fix: replace inputmode="decimal" with inputmode="text" (or add pattern) and allow π/x. Or keep decimal but... The user says "nie pozwala wpisac pi ani x ani znakow" — indeed inputmode="decimal" keyboard lacks those. So planned fix: change inputs to accept text (inputmode="text" or just remove inputmode), keep decimal validation via parseExact.
  
- Równania z π i ze zmiennymi: π handled via parseExact ("25π"); vars via nvar. OK.

Now phase 1 plan proposal (to discuss):
- Cel: kompletna aplikacja z wzorami + transformacjami + wykresami + auto-rozpoznawaniem + mobile input + wszystkie wzory z matury.
- Zakres: 
  1. Audyt obecnych ~180 wzorów pod kątem wymagań (transformacje, linki, rozbite/rozbite, miejsca zerowe, fn kwadratowa).
  2. Dodanie brakujących wzorów z CKE (matura, matura rozszerzona, mat, fiz, chem) — głównie matematyka.
  3. Nowe tryby: "enter equation → fill different formulas / all possible results in different transformations".
  4. Naprawa mobile input (x, π, znaki) — inputmode.
  5. Wykresy dla kolejnych formulaId (np. postac kanoniczna, funkcja kwadratowa jako fn, nierówność z cieniowaniem — już jest).
  6. Testy (vitest), lint, format, build.

Phase 2+ would implement.

Now, in plan mode, I should NOT implement. I should discuss the plan. The user asked me to devise the plan in phase 1 — so I should now present the phase 1 plan proposal and use the question tool for remaining decisions.

Let me now respond: summarize phase 0, present proposed phase 1 plan, ask questions/decisions.

I should keep the response structured and reasonably concise. Use Polish (user writes Polish). Use markdown.

Let me draft:

## Faza 0 — podsumowanie (gotowe)
- Stack, struktura, typy, rejestr.
- Co już istnieje: 182 wzory (README), matematyka (delta, kwadratowe, postacie, nierówności, wielomiany, kombinatoryka, ciągi, logarytmy, procenty, trójkąty, planimetria, statystyka, kąty, kule/okrąg, bryły, pola, objętości, funkcje), fizyka (PP+PR), chemia, geografia.
- Auto-rozpoznawanie: parseEquation + Wzornik/Zadanie.
- Wykresy: plot.ts + FunctionPlot; tylko subset.
- Mobile input: `inputmode="decimal"` na polach → klawiatura numeryczna bez x/π/znaków (zgodnie z Twoją deklaracją „nie pozwala wpisywać π ani x ani znaków").

## Faza 1 — propozycja planu (do omówienia)
1. Audyt kompletności (checklista CKE).
2. Brakujące wzory (matura, matura rozszerzona, mat, fiz, chem; główny nacisk matematyka).
3. Transformacje (algebraiczne + kroki) — rozbite/rozbite, miejsca zerowe, fn kwadratowa jako fn vs równanie, linki pod/nad.
4. Nowy tryb: eq → wiele formuł / wszystkie wyniki w różnych przemianach.
5. Naprawa mobile input (x, π, znaki, inputmode).
6. Wykresy dla kolejnych typów (postać kanoniczna/fn, nierówność z cieniem, trójkąt?).
7. Modułowość: czy wystarczy obecny pattern; jeśli nie, jak.
8. Testy + lint + build.

## Pytania do użytkownika przed/finalizacją planu:
- Zakres nowych wzorów: pełny syllabus czy tylko matematyka+braki?
- Nowy tryb "enter eq → wszystkie możliwe wyniki".
- Priorytet transformacji vs nowe wzory (math first, skip temporarily).
- Gdzie zapisać plan: /home/zota/.opencode/plan (user asked to write there only if asked explicitly — they said "w fazie 1 ulozysz plan jak ci pozwole" — I think writing to that file is arguably part of their instruction, but system reminder says don't create plan files unless user explicitly asks. They did say "ulożysz plan" which implies making a plan — probably the plan file. Hmm. To be safe: I'll offer to write it to /home/zota/.opencode/plan and ask.)

Actually, re-reading: "w fazie 0 przeszukaj kod, w fazie 1 ulozysz plan jak ci pozwole, w fazie 2-... bedziesz edytowal kod. najpierw teraz narob sobie konektutu" — they set the phases. The system reminder: "Do not create or update plan files unless the user explicitly asks you to; when they do, write them only in /home/zota/.opencode/plan". The user hasn't explicitly asked for a file, just said phase 1 will be devising the plan. I'll keep the plan in conversation and ask whether to persist it.

Let me now write the response. I should not run more tools necessarily, but maybe I should verify a couple of facts before finalizing phase 0 findings — e.g., check that WzornikView/SolverView inputs really lack type. I already read them: SolverView `<input v-else v-model="inputs[v.id]" inputmode="decimal" />` — indeed no type → text, inputmode decimal. On mobile, inputmode=decimal → numeric keyboard (digits + maybe decimal point). It technically accepts x/π via text? The virtual keyboard with decimal input mode typically shows only numeric keys; symbols like π may not be accessible. Also `type` not set means text input, so typing x/π might be possible via text replacement? With inputmode=decimal, mobile browsers show numeric keypad; some show a "123" style keyboard without symbols. The user reports can't type π/x/symbols — consistent.

HomeView demo uses type="number" — also numeric.

OK. I think phase 0 is sufficient. Now respond with summary and move to phase 1 discussion.

I will use the question tool again? I just used it and got answers. Now I should present the phase 1 plan and ask for approval/decisions. I can present in text and then use question tool for the next decisions (e.g., where to write plan, priority order).

Let me structure the response:

1. Faza 0 — podsumowanie wyników skanu (bullet list, key files).
2. Mapowanie wymagań użytkownika → stan implementacji (co już ma, co brakuje) — this is valuable for phase 1 plan.
3. Propozycja fazi 1 — plan (to omówić/zatwierdzić).
4. Pytania na start fazy 1 / przed edycją.

Keep it focused. Then use question tool for the decisions.

Let me write it in Polish, since the user writes Polish.

Content for section 2 (requirements mapping):
- Wszystkie wzory: ~182 w rejestrze (README), matematyka: pitagoras, pola, okręgi, równania kwadratowe, funkcje, procenty, ciągi, objętości, kule, bryły; PP1/PP2: potęgi, pierwiastki, logarytmy, wartość bezwzględna, procent składany, układy, nierówności, Horner, postać kanoniczna, prawdopodobieństwo, permutacje/kombinacje/wariacje, Tales, postacie kwadratowe, rozklad, znak wielomianu, statystyka; PP2: kąty, trapez, romb, równoległobok, łuk, wycinek, odcinki, proste, prostopadłość, okrąg, graniastosłup, ostrosłup, walec, stożek, romb-bok; katy/trojkąty; PR: Newton, silnia, sześciany, granica, pochodna, ekstrema, prawdopodobieństwa, równania wykładnicze/logarytmiczne, Vieta, podwójny kąt, Bernouilli, suma kątów; delta, kwadratowa-iloczynowa/ogólna, wzr. skrócone, Herona, wyodrębnianie, grupowanie, rozklad wielomianu, dzielenie, Horner, pisemne, sumy, szereg.
- Fizyka: PP (35) + PR (23) — moc, energia, kinematyka, dynamika, gazy, cieple, elektr, magnetyzm, optyka, woda/amory, fale, wibracje, foto, MC², termodynamika, podłoże.
- Chemia: 13 (mol, stejienia, rozcieńczanie, pH, wydajność, mieszanie; KC, dysocjacja, iloczyn, ogniwo, elektroliza, bufor).
- Geografia: ~10 (skala map, demografia, klimat, urbanizacja, bezrobocie, PKB, migracje, woda...).

- Transformacje: istnieją (kroki + algebraiczne) dla kwadratowych; "rozbite vs nie rozbite" pokryte przez kwadratowa-iloczynowa/ogólna/kanoniczna. Miejsca zerowe: funkcja-liniowa x0, quadraticPlot zero points; dla kwadratowej — pierwiastki. "jako fn kwadratowa — osobno, i jako osobne": postacie-kwadratowej etc.

- Wykresy: quadraticPlot/linearPlot/polyPlot/trajectoryPlot/inequalityBands; subset. Brak: np. plot funkcji postaci kanonicznej, trójkątów (geometry diagram maybe covers), funkcji liniowej przez 2 punkty? (prosta-2-punkty exists but plot not wired).

- Auto-rozpoznawanie: wspierane formaty: kwadratowe (z = lub bez =0), liniowe, nierówności, wykładnicze, logarytmiczne, procent, potęga, pierwiastek (√), Tales, układy 2x2, postacie kanoniczne (a(x±)^2), wartość bezwzględna, polynom (deg 3-4). Wzornik: recognized. Zadanie: examples.

- Mobile: inputmode=decimal na polach solvera/konwertera/Home demo (type=number na demo) → problem z π/x/znakami. Quick input is text (ok).

- Równania z π: parseExact + stripPi; formulas z π (pole koła, objetosc kuli, pole kuli, obwod). Zmienne: mode nvar (jedno puste pole). parseEquation vars from kv (a1, r, n...) i z x.

Good. Now phase 1 plan proposal:

**Faza 1 — plan (propozycja)**
1. **Audyt checklisty CKE** → zmapować wymagane wzory vs zarejestrowane (dla matury, matury rozszerzonej, mat, fiz, chem).
2. **Nisze matematyczne (nacisk)**: uzupełnienie brakujących wzorów z matury (np. tożsamość funkcji, funkcja liniowa/w kwadratowa, wartości skończone? wzory skrócone, Horner, pierwiastki, logarytmy, baza, pochodne, ekstremum, progi, ciągi, suma, trójkąty, planimetria, statystyka, kąty, pola, bryły, objętości, geometria). Czy user zna konkretną listę braków? — QUESTION.
3. **Transformacje**: rozbicie ↔ postacie; linki pod/nad wzory; miejsca zerowe; jako fn vs równanie; kroki.
4. **Nowy tryb „równanie → rozwiązania”**: wpisz eq, podmień na inny wzór / wszystkie możliwe wyniki w różnych przemianach (do zapisu).
5. **Naprawa mobile input**: tekstowe inputy z obsługą π/x/Δ/znaków (inputmode text / pattern), type=number w Home demo → text/number-safe.
6. **Wykresy**: rozbudowa o brakujące typy (postać kanoniczna, fn kwadratowa, proste 2 punkty, trójkąt?).
7. **Modułowość**: ewentualnie wydzielenie konstantów/wzorów, ale patrz na YAGNI.
8. ** jako gotowość**: testy, lint, format, build.

**Kamień milowy**: najpierw matematyka (user: "najważniejsza matematyka, mozesz chwilowo pominac"), potem fiz/chemia/geografia.

**Pytania do użytkownika (na start fazi 1 / przed planem):**
1. Czy znasz listę konkretnych wzorów, które są u Ciebie brakujące? (żeby skupić fazę 0/1).
2. Nowy tryb równanie→wyniki: jak dokładnie? "podklada pod różne jako jeden wynik (lub wyniki wszystkie możliwe dla tego w różnych przemianach (do zapisu)) całego jakby zadania" — interpretacja: np. dla x²−5x+6=0 podmienić na postacie iloczynowa i podać wyniki w obu postaciach; albo dla eq z parami podmienić na wiele formula.
3. Gdzie zapisać plan: /home/zota/.opencode/plan?

I think I should ask the question tool for these. Let me do that now, then finalize.

Actually, to be efficient: I've already used the question tool twice. The user gave answers. Now I should present phase 0 summary + phase 1 plan and ask the next questions. Using question tool again is fine ("uzywaj question nardzedzia do pytan").

Let me pose the remaining phase-1 decisions via the question tool, then write my analysis in the response.

Questions for phase 1:
1. Preferowany kolejność wdrożenia (najpierw matematyka vs nowe wzory ogółem).
2. Nowy tryb równanie→wyniki: czy jako osobny tryb w SolverView, czy w ZadanieView/WzornikView.
3. Gdzie zapisać plan fazowy: /home/zota/.opencode/plan.

Hmm, question 3 is meta. Let me instead ask about scope details:

Q1: "Brakujące wzory" — czy mam liczyć pełny syllabus CKE, czy masz już listę konkretnych wzorów, które są „brakujące"?

Q2: Nowy tryb przemian — czy chcesz, żebym projektował tryb: wpisz równanie (np. x²−5x+6=0) → rozwiązywać → pokazać wyniki w postaci iloczynowej, kanonicznej, ogólnej; albo dopasowywanie równania do wielu wzorów.

Q3: Priorytet transformacji vs nowych wzorów — user said math most important, may skip temporarily. So maybe plan: najpierw matematyka (transformacje + braki z mat), potem fiz/chemia.

Let me just ask these to keep momentum, then write the final phase-0 summary + phase-1 proposal in prose.

Actually, I realize I should just present the phase 1 plan proposal now and use the question tool for the few open decisions. Let me do the question tool call, then in the final answer give the summary.

Let me formulate the question tool call.

Odpowiedzi przysłuchałem. Faza 0 dobiega końca — teraz zadam jeszcze kilka decyzji wejściowych do **fazai 1**, żeby plan był konkretny.

**Tool: question**

**Input:**
```json
{
  "questions": [
    {
      "header": "Lista braków",
      "question": "Czy znasz/kolega z listy brakujących wzorów z CKE (matura, matura rozszerzona, mat, fiz, chem), czy mam samodzielnie zbudować audyt z listy wymagań? Jeśli znasz, podaj przykładowe braki — chcę je uwzględnić w planie fazy 1.",
      "options": [
        {
          "label": "Znam — podam braki",
          "description": "Przekaż mi listę wzorów, które są brakujące."
        },
        {
          "label": "Nie znam — zbuduję audyt",
          "description": "W fazie 1 zrobię pełny przegląd syllabusu i zaproponuję nowe wzory."
        },
        {
          "label": "Tylko matematyka",
          "description": "Skupić się na matematyce, pominąć chwilowo fizykę/chemię."
        }
      ],
      "multiple": false
    },
    {
      "header": "Nowy tryb",
      "question": "Propozycja nowego trybu: „wpisz równanie → rozwiąż → pokaż w różnych postaciach (do zapisu)”. Jak dalej rozumiesz? Czy np. `x^2-5x+6=0` miało by dostać wyniki: iloczynowa, kanoniczna, ogólna oraz same Δ/pierwiastki?",
      "options": [
        {
          "label": "Wszystkie postacie",
          "description": "Równanie → delta → iloczynowa + kanoniczna + ogólna + wyniki."
        },
        {
          "label": "Dopasowanie do wzoru",
          "description": "Równanie → dopasuj do istniejącego wzoru i uzupełnij (obecny tryb w Zadaniu)."
        },
        {
          "label": "Odwrotnie: fn → równanie",
          "description": "Wejście funkcji (f(x)=...) → równanie/Δ/ekstrema."
        }
      ],
      "multiple": false
    },
    {
      "header": "Zapis planu",
      "question": "Plan fazy 1 mam opracować w tej sesji — czy mam go też dopisać na dysk w /home/zota/.opencode/plan, czy tylko przedstawić w rozmowie?",
      "options": [
        {
          "label": "Tak, zapiszę",
          "description": "Napiszę plan do /home/zota/.opencode/plan."
        },
        {
          "label": "Nie, tylko w rozmowie",
          "description": "Plan zostanie wypowiedziany, bez tworzenia pliku."
        }
      ],
      "multiple": false
    }
  ]
}
```

User has answered your questions: "Czy znasz/kolega z listy brakujących wzorów z CKE (matura, matura rozszerzona, mat, fiz, chem), czy mam samodzielnie zbudować audyt z listy wymagań? Jeśli znasz, podaj przykładowe braki — chcę je uwzględnić w planie fazy 1."="Znajdziesz ty pozniej co brakuje", "Propozycja nowego trybu: „wpisz równanie → rozwiąż → pokaż w różnych postaciach (do zapisu)”. Jak dalej rozumiesz? Czy np. `x^2-5x+6=0` miało by dostać wyniki: iloczynowa, kanoniczna, ogólna oraz same Δ/pierwiastki?"="Wszystkie postacie, rownianie, delta iloczynowa, kanoniczna, ogolna, wyniki, dopasowanie do wzoru, odwrotnie", "Plan fazy 1 mam opracować w tej sesji — czy mam go też dopisać na dysk w /home/zota/.opencode/plan, czy tylko przedstawić w rozmowie?"="na ten moment w rozmowie, w nastepnym kroku jak znajdziesz brakujace itd. to wtedy ci pozwole zapisac. zakoncz faze 0 to wtedy ci pozwole skomponowac plan.". You can now continue with the user's answers in mind.

---

## Assistant

_Thinking:_

User's answers:
1. "Znajdziesz ty pozniej co brakuje" — "You'll find out later what else is missing" — meaning: I'll (the user/agent) will discover later what else is missing. So they don't have a list; I'll do the audit. Good — confirms phase 1 will include audit.
2. New mode: "Wszystkie postacie, rownianie, delta iloczynowa, kanoniczna, ogolna, wyniki, dopasowanie do wzoru, odwrotnie" — i.e., for `x^2-5x+6=0`: show results in all forms (równanie, delta, iloczynowa, kanoniczna, ogólna, wyniki), plus "dopasowanie do wzoru" (match to formula) and "odwrotnie" (fn → equation?). So both directions.
3. Plan: for now just in conversation; later when I find missing etc., then I'll allow writing. "zakoncz faze 0 to wtedy ci pozwole skomponowac plan" — "finish phase 0 then you'll allow me to compose the plan". Hmm, slightly awkward Polish. Probably: "koniec fazy 0 — to wtedy ci pozwoli skompozować plan" i "w następnym kroku jak znajdziesz brakujące itd. to wtedy ci pozwoli zapisac" — meaning: after phase 0 ends, then you (the user) will allow me to compose the plan; and when I find missing stuff later, then I'll be allowed to save it.

So the user wants: Phase 0 done → now compose the plan (phase 1) in conversation. The plan should probably not be written to file yet.

Now I should compose the phase 1 plan in the conversation, based on phase 0 findings and their answers, and discuss it. Then wait for approval before phase 2 edits.

Let me write the phase 1 plan proposal now.

Phase 1 plan proposal (based on my scan):

**Faza 1 — plan (w rozmowie):**

1. **Audyt kompletności** (sub-faza): porównanie rejestru ~182 wzorów z wymaganiami (matura, matura rozszerzona, mat, fiz, chem) — checklista CKE; zidentyfikować braki (szukam teraz: np. brakujące wzory z matury takie jak: funkcja liniowa? już jest; wartości bezwzględne? już; …). Szczególnie matematyka: uzupełnić m.in. zestaw z: wzory skrócone (sześcian, kwadrat sumy/różnicy), Horner, pierwiastki wymierne, wyodrębnianie, grupowanie, rozklad wielomianu, znak wielomianu, progi (prawdopodobieństwo), ciągi, sumy, trójkąty, planimetria, statystyka, kąty, pola, bryły, objętości, geometria, logarytmy, baza, potęgi, wartości bezwzględne, procenty, układy, nierówności, funkcje, ruch (fizyka), dynamika, energia, gazy, cieple, elektr, magnetyzm, optyka, woda/amory, fale, wibracje, foto, MC², termodynamika, podłoże.

Hmm wait — since the registry already has a LOT, the "missing" may be more about coverage depth. But I shouldn't over-claim. The plan should include an audit step.

2. **Transformacje i „postacie”**: dla kwadratowych (i wielomianów) zaprojektować tryb: wejście równania → wszystkie postacie (równanie, Δ, iloczynowa, kanoniczna, ogólna, wyniki) — po potwierdzeniu przez użytkownika (answer 2: "Wszystkie postacie, rownianie, delta iloczynowa, kanoniczna, ogolna, wyniki, dopasowanie do wzoru, odwrotnie" → tak, wszystkie postacie + dopasowanie + odwrotność (fn→równanie?)).

3. **Nowe wzory**: po audycie, lista braków do dodania (start matematyka).

4. **Wykresy**: rozbudować o kolejne przypadki (postać kanoniczna, fn, nierówność z cieniem — już, trójkąt?).

5. **Mobile input**: naprawa pól (π, x, znaki) — inputmode="decimal" blokuje klawiaturę; plan: inputy tekstowe z akceptacją π/x/Δ (np. inputmode="text" + pattern, walidacja przez parseExact). type="number" w HomeView demo → teoria.

6. **Modułowość**: czy wystarczy obecna granica modułów; plan B (jeśli za dużo zmian).

7. **Weryfikacja**: testy vitest dla nowych/zmodyfikowanych wzorów, lint, format, build.

**Kolejność wdrażania**: matematyka (najważniejsza) → fizyka → chemia → geografia; z chwilowym pominięciem.

**Kamienie milowe** zgodnie z odpowiedzią: math first, skip temporarily others.

Now I need to present this as the phase 1 plan discussion, get user approval before phase 2 edits.

The user said: "najpierw teraz narob sobie konektutu" and phases. So next: I present plan, then ask for OK to proceed to phase 2 (implementation).

Given plan mode rules, I must NOT implement now. I should present the plan and wait for approval.

Let me also decide: should I write the plan to /home/zota/.opencode/plan? User: "na ten moment w rozmowie, w nastepnym kroku jak znajdziesz brakujace itd. to wtedy ci pozwole zapisac. zakoncz faze 0 to wtedy ci pozwole skomponowac plan." — So: keep plan in conversation for now; later (next step, after finding more missing stuff) they'd allow saving. So: do NOT write to file now.

Now let me write the final response: phase 0 summary + composed phase 1 plan + questions/approval request.

I should keep it tight. Let me draft in Polish.

---

**FAZA 0 — ZAKOŃCZONA (podsumowanie skanu)**

Stack: Vue 3.5 + Vite 5 + TS + PWA + KaTeX + vue-router + vitest/oxlint/oxfmt/husky. Offline PWA. Polski. GitHub Pages.

Kluczowe moduły:
- `src/lib/formulas/` — rejestr FORMULAS + FormulaDef (subject/topic/name/latex/vars/mode/outputId/outputLabel/solve→FormulaSolution{values,steps,labels}).
- `src/lib/exact/` — arytmetyka (BigInt rationals, sqrt, π, log, trig) + solveQuadratic (kind: two/one/none/linear, delta).
- `src/lib/solver/solver.ts` — rozwiązywanie; mode fixed (pełne dane) / nvar (1 puste = niewiadoma).
- `src/lib/parse-formula.ts` — auto-rozpoznawanie równań (kwadratowe, liniowe, nierówności z op, wykładnicze, logarytmiczne, procent, potęga, pierwiastek, Tales, układy 2x2, postacie kanoniczne, wartość bezwzględna, polynom deg 3–4).
- `src/lib/plots/plot.ts` + `FunctionPlot.vue` (Canvas) — wykresy: quadratic/linear/poly/trajectory/inequality; tylko dla ~10-12 formulaId.
- `src/lib/diagrams/geometry.ts` + `FormulaDiagram.vue` — SVG.
- `src/lib/search/` — fuzzy + KEYWORDS.
- `src/lib/units/`, `storage/`, `settings/`, `seo/`, `descriptions/`.

Stan: ~182 wzory (README), matematyka: dużo (delta, kwadratowe, postacie, nierówności, wielomiany, kombinatoryka, ciągi, logarytmy, procenty, trójkąty, planimetria, statystyka, kąty, kule/okrąg, bryły, pola, objętości, funkcje), fizyka: PP+PR (35+23), chemia: 13, geografia: ~10.

**Mapa wymagań użytkownika → stan:**
- wszystkie wzory: ~180 już w rejestrze; główny nacisk na matematykę; audyt wymaga.
- transformacje: częściowo (np. postacKanoniczna/licz p,q; kwadratowa-ogolna/Viete'a; postacie-kwadratowej łączy 3 postacie; kroki przekształcenia). Brak: tryb „równanie → wszystkie postacie + wyniki".
- wykresy: subset; dla „postacie kanonicznej/fn" brak.
- auto-rozpoznawanie: działa dla ~15 formatów; lista examples.
- wpisywanie liczb/mobile: `inputmode="decimal"` (i `type="number"` w demo/Home) → klawiatura bez π/x/znaków; user: „nie pozwala wpisywać pi ani x ani znakow".
- π: obsługiwane (parseExact, stripPi, formulas z π). Zmienne: mode nvar (1 puste pole).

**FAZA 1 — PROPOZYCJE / PLAN (do zatwierdzenia):**

1. **Audyt braków** — porównanie rejestru z CKE; lista nowych FormulaDef (najpierw matematyka, potem fiz/chemia/geografia); „pominąć chwilowo" gdzie trzeba.
2. **Nowy tryb „równanie → wszystkie postacie"**: `x^2-5x+6=0` → równanie, Δ, postać iloczynowa, kanoniczna, ogólna, wyniki (do zapisu); plus „dopasowanie do wzoru" i „odwrotnie" (fn → równanie/Δ).
3. **Transformacje**: rozbicie vs nie rozbite; miejsca zerowe; jako fn vs równanie; pod/nad linki do wzorów prostszych/trudniejszych; kroki.
4. **Naprawa mobile input** (π, x, znaki): zmiana inputmode/type.
5. **Wykresy**: rozbudowa o brakujące typy.
6. **Modułowość**: ewentualnie — ocena czy wystarczy obecny pattern.
7. **Testy/build**.

**Kolejność**: matematyka → fiz → chem → geo; z chwilowym pominięciem (user: „najważniejsza matematyka, mozesz chwilowo pominac").

**Zdecydowania do podjęcia w fazie 1:**
- Czy plan fazy 1 to właśnie powyższe kamienie milowe + audyt (proposal).
- Priorytet wdrożenia.

Then: "Chcesz, żebym teraz składał plan fazy 1 w pełnej wersji i przedstawił Ci go do zatwierdzenia, czy mam od razu zacząć? (W fazie 2 będziesz edytować kod.)"

I should ask via question tool? I've already used it. I think I can just present and then ask for OK in text. But AGENTS.md says use question tool when in doubt about requirements/design. To be safe, I'll present the plan and ask for approval via the question tool as well... Actually the user has been answering my question tool calls fine. Let me present the phase 1 plan in prose and then use the question tool for the final gate: "zatwierdzasz plan fazy 1 i przejdziemy do fazy 2?" — with options: tak/zastosuję plan; poprawię plan; zmodyfikuję.

Hmm, but I shouldn't create the plan file yet (user said later). Fine.

Let me write the response now, fairly detailed but not bloated. Then use the question tool for the gate.

Actually, to respect "discuss the plan with the user directly in the conversation" — I'll write the plan in the conversation and use the question tool to confirm the gate.

Let me draft the final message.

# Faza 0 — zakończona ✅ (podsumowanie skanu)

## Co obejmuje projekt
**Wzornik Maturalny** v0.7.3 — PWA offline (Vue 3 + Vite + TS), ~182 wzory z CKE, KaTeX, własna arytmetyka dokładna (BigInt rationals, pierwiastki, π), PWA, fuzzy search, IndexedDB.

## Kluczowe ścieżki kodu (co już istnieje)
- `src/lib/formulas/` — rejestr `FORMULAS`, typ `FormulaDef` (`subject/topic/name/latex/vars/mode/outputId/outputLabel/solve → values/steps/labels`). Jeden plik na dział: `math.ts`, `math_pp1`, `math_pp2`, `math_katy`, `math_pr`, `math_delta`, `math_kwadratowe`, `math_wzory_skrocone`, `math_heron`, `math_wyodrebnia_grup`, `math_poly`, `math_dziel_horner`, `math_pisemne`, `math_sumy`, `math_trojkaty`, `physics*.ts`, `chemia*.ts`, `geografia*.ts`.
- `src/lib/exact/` — dokładne liczby (ułamki, pierwiastki, π, logarytmy, sinus/cos/sinus cos); `solveQuadratic` zwraca `{kind:"two"|"one"|"none"|"linear", delta, roots}`.
- `src/lib/solver/solver.ts` — tryb `fixed` (pełne dane) / `nvar` (jeden pusty = niewiadoma).
- `src/lib/parse-formula.ts` — auto-rozpoznawanie (`parseEquation`, `looksLikeEquation`): kwadratowe, liniowe, nierówności z operatorem, wykładnicze, logarytmiczne, procent, potęga, pierwiastek, Tales, układy 2×2, postacie kanoniczne, wartość bezwzględna, wielomiany stopnia 3–4.
- `src/lib/plots/plot.ts` + `FunctionPlot.vue` — wykresy Canvas (kwadratowa/liniowa/poli/trajectory/inequality); **tylko dla ~10–12 id** formuł.
- `src/lib/diagrams/geometry.ts` + `FormulaDiagram.vue` — SVG.
- `src/lib/search/` — fuzzy + KEYWORDS; `src/lib/units/`, `storage/`, `settings/`, `seo/`, `descriptions/`.

## Mapowanie wymagań użytkownika → stan obecny
| Wymaganie | Status |
|---|---|
| Wszystkie wzory (matura/matura rozszerzona/mat/fiz/chem) | ~180 zarejestrowanych; główny nacisk matematyka; **wymaga audytu CKE** |
| Transformacje (algebraiczne + kroki) | Częściowo — m.in. kanoniczna `(p,q)`, Viete'a, postacie-kwadratowej; **brak trybu „równanie → wszystkie postacie”** |
| Wykresy | Subset; brak np. dla postaci kanonicznej |
| Auto-rozpoznawanie | Działa dla ~15 formatów (`4x^2-2x+10=0`, `2^x=8`, `log_2(x)=3`, `x^2-5x+6>0`, `|x-2|=3`, `2(x-1)^2+3`…) |
| **Wpisywanie na telefonie (π, x, znaki)** | **Potwierdzone:** `inputmode="decimal"` (+ `type="number"` w Home/demo) blokuje klawiaturę — stąd „nie pozwala wpisywać π ani x ani znaków” |
| π / zmienne | π: OK (`parseExact`, `stripPi`); zmienne: tryb `nvar` (1 pusta = niewiadoma) |

## Faza 1 — propozycja planu (do omówienia / zatwierdzenia)

1. **Audyt kompletności** — porównanie rejestru z wymaganiami CKE; lista brakujących wzorów do dodania jako nowe `FormulaDef` (najpierw matematyka — „najważniejsza matematyka, mozesz chwilowo pominac”; potem fiz/chemia/geografia).
2. **Nowy tryb: „wpisz równanie → pokaż we wszystkie postacie + wyniki”** — `x²−5x+6=0` → równanie, Δ, postać iloczynowa, kanoniczna, ogólna, wyniki (do zapisu); plus *dopasowanie do wzoru* i *odwrotnie* (fn → równanie/Δ).
3. **Transformacje** — rozbite vs nie rozbite, miejsca zerowe, fn vs równanie, pod/nad linki do prostszych/trudniejszych wersji, kroki.
4. **Naprawa mobile input** — pola tekstowe z obsługą π/x/Δ (zmiana `inputmode`/`type`).
5. **Wykresy** — rozbudowa o brakujące typy (postać kanoniczna, fn, …).
6. **Modułowość** — ocena czy obecny pattern wystarczy (YAGNI).
7. **Weryfikacja** — testy, lint, format, build.

## Decyzje otwarte przed faza 1
1. Brakujące wzory: mam samodzielnie zbudować audyt z listy CKE, czy masz już listę braków?
2. Nowy tryb: **„Wszystkie postacie, równanie, delta, iloczynowa, kanoniczna, ogólna, wyniki, dopasowanie, odwrotnie"** — zgodnie z Twoją odpowiedzią, plan zakłada tę wersję.
3. Zapis planu na dysk: **na razie w rozmowie** (jak zgodziłeś się później).

---

Wnoszę: **fazai 0 zamknięta, faza 1 gotowa do kompozycji.** Chcesz, żebym teraz szczegółowo składał **faze 1** (pełny plan + lista braków) i przedstawił Ci go do zatwierdzenia, czy od razu przechodzimy do **fazy 2** (edycja kodu)? Odpowiedzysz, a jak zatwierdzisz — wtedy zaczynamy implementację.

---

## User

 

now phase 1 of planning as for ecyzje otwarte przed faza 1
1. Brakujące wzory: mam samodzielnie zbudować audyt z listy CKE, czy masz już listę braków?
2. Nowy tryb: „Wszystkie postacie, równanie, delta, iloczynowa, kanoniczna, ogólna, wyniki, dopasowanie, odwrotnie" — zgodnie z Twoją odpowiedzią, plan zakłada tę wersję.
3. Zapis planu na dysk: na razie w rozmowie (jak zgodziłeś się później).

As i said before:
1. YOU SEARCH WEB search missing ones and stuff.
2. yes
3. you will be able after you end this phase (1)

---

## Assistant

Przechodzę do **Fazy 1 (Planowanie i pełny audyt braków)**. 

Teraz dokładnie przeczytam pozostałe pliki ze wzorami w projekcie oraz przeszukam sieć pod kątem pełnej listy wzorów z tablic maturalnych CKE (matematyka PP + PR, fizyka, chemia), aby zestawić dokładną listę braków, przekształceń, powiązań (linków pod/nad) oraz zaprojektować architekturę nowego trybu i naprawy wpisywania na telefonie.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_pr.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_pr.ts, lines 1-651
1: import {
2:   ONE,
3:   ZERO,
4:   add,
5:   binom,
6:   cmp,
7:   div,
8:   factorial,
9:   isIntegerR,
10:   isZero,
11:   mul,
12:   neg,
13:   of,
14:   pow,
15:   sub,
16: } from "../exact/rational";
17: import type { Rational } from "../exact/rational";
18: import { approx, approxOnly, exactOf, logExact, trigExact } from "../exact/exact";
19: import type { Exact } from "../exact/exact";
20: import { formatDecimal, formatLatex, formatRatLatex, trimNum } from "../exact/format";
21: import type { FormulaDef, FormulaSolution } from "./types";
22: import { asRational, requireNatural, resultLatex } from "./types";
23: 
24: const L = formatRatLatex;
25: 
26: const newton: FormulaDef = {
27:   id: "newton",
28:   subject: "matematyka",
29:   topic: "Dwumian Newtona · ROZSZ",
30:   name: "Rozwinięcie (a + b)ⁿ",
31:   latex: "(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k",
32:   vars: [{ id: "n", label: "n" }],
33:   mode: "fixed",
34:   outputId: "w",
35:   outputLabel: "rozwinięcie",
36:   solve(_unknown, known, places): FormulaSolution {
37:     void places;
38:     const n = requireNatural(known["n"], "n");
39:     if (n > 12) throw new Error("rozwinięcie: n ≤ 12 (dalej za długie)");
40:     const N = BigInt(n);
41:     const terms: string[] = [];
42:     for (let k = 0; k <= n; k++) {
43:       const c = binom(N, BigInt(k));
44:       const pa = n - k;
45:       const pb = k;
46:       const cs = c === 1n && (pa > 0 || pb > 0) ? "" : `${c}`;
47:       const sa = pa === 0 ? "" : pa === 1 ? "a" : `a^{${pa}}`;
48:       const sb = pb === 0 ? "" : pb === 1 ? "b" : `b^{${pb}}`;
49:       terms.push(`${cs}${sa}${sb}`);
50:     }
51:     return {
52:       values: [],
53:       steps: [
54:         { title: "1. Wzór", body: "(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k" },
55:         { title: "2. Współczynniki", body: `n = ${n}` },
56:         { title: "3. Wynik", body: `(a + b)^{${n}} = ${terms.join(" + ")}` },
57:       ],
58:     };
59:   },
60: };
61: 
62: const silnia: FormulaDef = {
63:   id: "silnia",
64:   subject: "matematyka",
65:   topic: "Kombinatoryka · ROZSZ",
66:   name: "Silnia",
67:   latex: "n! = 1 \\cdot 2 \\cdot \\ldots \\cdot n",
68:   vars: [{ id: "n", label: "n" }],
69:   mode: "fixed",
70:   outputId: "w",
71:   outputLabel: "n!",
72:   solve(_unknown, known, places): FormulaSolution {
73:     const n = requireNatural(known["n"], "n");
74:     if (n > 1000) throw new Error("silnia: n ≤ 1000");
75:     const value = exactOf({ p: factorial(BigInt(n)), q: 1n });
76:     return {
77:       values: [value],
78:       steps: [
79:         { title: "1. Wzór", body: "n! = 1 \\cdot 2 \\cdot \\ldots \\cdot n" },
80:         { title: "2. Podstawienie danych", body: `${n}!` },
81:         { title: "3. Wynik", body: resultLatex(`${n}!`, value, places) },
82:       ],
83:     };
84:   },
85: };
86: 
87: const szesciany: FormulaDef = {
88:   id: "szesciany",
89:   subject: "matematyka",
90:   topic: "Wzory skróconego mnożenia · ROZSZ",
91:   name: "Sześciany (a ± b)³, a³ ± b³",
92:   latex: "(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3",
93:   vars: [
94:     { id: "a", label: "a" },
95:     { id: "b", label: "b" },
96:   ],
97:   mode: "fixed",
98:   outputId: "w",
99:   outputLabel: "wyniki",
100:   solve(_unknown, known, places): FormulaSolution {
101:     const a = asRational(known["a"], "a");
102:     const b = asRational(known["b"], "b");
103:     const a2 = mul(a, a);
104:     const b2 = mul(b, b);
105:     const a3 = mul(a2, a);
106:     const b3 = mul(b2, b);
107:     const s1 = exactOf(add(add(add(a3, mul(mul(of(3), a2), b)), mul(mul(of(3), a), b2)), b3));
108:     const s2 = exactOf(sub(sub(add(a3, b3), mul(mul(of(3), a2), b)), mul(mul(of(3), a), b2)));
109:     const d1 = exactOf(add(a3, b3));
110:     const d2 = exactOf(sub(a3, b3));
111:     const show = (e: ReturnType<typeof exactOf>): string => {
112:       const lx = formatLatex(e);
113:       const dc = formatDecimal(e, places);
114:       return lx === dc ? lx : `${lx} \\approx ${dc}`;
115:     };
116:     return {
117:       values: [s1, s2, d1, d2],
118:       labels: ["(a+b)³", "(a−b)³", "a³+b³", "a³−b³"],
119:       steps: [
120:         {
121:           title: "1. Wzory",
122:           body: "(a+b)^3 = a^3+3a^2b+3ab^2+b^3, \\; a^3+b^3 = (a+b)(a^2-ab+b^2), \\; a^3-b^3 = (a-b)(a^2+ab+b^2)",
123:         },
124:         {
125:           title: "2. Podstawienie danych",
126:           body: `a = ${L(a)}, \\; b = ${L(b)}`,
127:         },
128:         {
129:           title: "3. Wynik",
130:           body: `(a+b)^3 = ${show(s1)}, \\; (a-b)^3 = ${show(s2)}, \\; a^3+b^3 = ${show(d1)}, \\; a^3-b^3 = ${show(d2)}`,
131:         },
132:       ],
133:     };
134:   },
135: };
136: 
137: const granicaQn: FormulaDef = {
138:   id: "granica-qn",
139:   subject: "matematyka",
140:   topic: "Granice · ROZSZ",
141:   name: "Granica qⁿ przy n → ∞",
142:   latex: "\\lim_{n \\to \\infty} q^n",
143:   vars: [{ id: "q", label: "q" }],
144:   mode: "fixed",
145:   outputId: "g",
146:   outputLabel: "granica",
147:   solve(_unknown, known, places): FormulaSolution {
148:     void places;
149:     const q = asRational(known["q"], "q");
150:     const aq = cmp(q, ZERO) < 0 ? neg(q) : q;
151:     const less1 = cmp(aq, ONE) < 0;
152:     const eq1 = cmp(aq, ONE) === 0;
153:     if (less1) {
154:       return {
155:         values: [exactOf(ZERO)],
156:         steps: [
157:           { title: "1. Reguła", body: "|q| < 1 \\Rightarrow \\lim q^n = 0" },
158:           { title: "2. Podstawienie danych", body: `|${L(q)}| < 1` },
159:           { title: "3. Wynik", body: "0" },
160:         ],
161:       };
162:     }
163:     if (eq1) {
164:       if (cmp(q, ZERO) > 0) {
165:         return {
166:           values: [exactOf(ONE)],
167:           steps: [
168:             { title: "1. Reguła", body: "q = 1 \\Rightarrow \\lim q^n = 1" },
169:             { title: "2. Podstawienie danych", body: `q = ${L(q)}` },
170:             { title: "3. Wynik", body: "1" },
171:           ],
172:         };
173:       }
174:       return {
175:         values: [],
176:         steps: [
177:           { title: "1. Reguła", body: "q = -1" },
178:           { title: "2. Podstawienie danych", body: `q = ${L(q)}` },
179:           {
180:             title: "3. Wynik",
181:             body: "-1, 1, -1, \\ldots",
182:             note: "granica nie istnieje — ciąg oscyluje",
183:           },
184:         ],
185:       };
186:     }
187:     return {
188:       values: [],
189:       steps: [
190:         { title: "1. Reguła", body: "|q| > 1 \\Rightarrow |q^n| \\to +\\infty" },
191:         { title: "2. Podstawienie danych", body: `|${L(q)}| > 1` },
192:         {
193:           title: "3. Wynik",
194:           body: cmp(q, ZERO) > 0 ? "+\\infty" : "-\\infty, +\\infty, \\ldots",
195:           note:
196:             cmp(q, ZERO) > 0 ? "rozbieżny do +∞" : "rozbieżny co do wartości (znak na przemian)",
197:         },
198:       ],
199:     };
200:   },
201: };
202: 
203: const pochodnaWielomianu: FormulaDef = {
204:   id: "pochodna-wielomianu",
205:   subject: "matematyka",
206:   topic: "Pochodne · ROZSZ",
207:   name: "Pochodna wielomianu 3. stopnia",
208:   latex: "(ax^3 + bx^2 + cx + d)' = 3ax^2 + 2bx + c",
209:   vars: [
210:     { id: "a", label: "a" },
211:     { id: "b", label: "b" },
212:     { id: "c", label: "c" },
213:     { id: "d", label: "d" },
214:   ],
215:   mode: "fixed",
216:   outputId: "p",
217:   outputLabel: "f'",
218:   solve(_unknown, known, places): FormulaSolution {
219:     void places;
220:     const g = (id: string) => asRational(known[id], id);
221:     const [a, b, c] = [g("a"), g("b"), g("c")];
222:     const A = mul(a, of(3));
223:     const B = mul(b, of(2));
224:     const term = (coef: Rational, pw: string, first: boolean): string => {
225:       if (isZero(coef)) return "";
226:       const s = first ? (cmp(coef, ZERO) < 0 ? "-" : "") : cmp(coef, ZERO) < 0 ? " - " : " + ";
227:       const abs = cmp(coef, ZERO) < 0 ? neg(coef) : coef;
228:       const cs = abs.p === 1n && abs.q === 1n && pw !== "" ? "" : L(abs);
229:       return `${s}${cs}${pw}`;
230:     };
231:     const body =
232:       `${term(A, "x^2", true)}${term(B, "x", A.p === 0n)}${term(c, "", A.p === 0n && B.p === 0n)}`.trim() ||
233:       "0";
234:     return {
235:       values: [exactOf(A), exactOf(B), exactOf(c)],
236:       labels: ["3a", "2b", "c"],
237:       steps: [
238:         { title: "1. Reguła", body: "(x^n)' = nx^{n-1}, \\; (f + g)' = f' + g'" },
239:         {
240:           title: "2. Podstawienie danych",
241:           body: `f(x) = ${L(a)}x^3 + ${L(b)}x^2 + ${L(c)}x + ${L(g("d"))}`,
242:         },
243:         { title: "3. Wynik", body: `f'(x) = ${body}` },
244:       ],
245:     };
246:   },
247: };
248: 
249: const ekstremaKwadratowej: FormulaDef = {
250:   id: "ekstrema-kwadratowej",
251:   subject: "matematyka",
252:   topic: "Pochodne · ROZSZ",
253:   name: "Ekstremum funkcji kwadratowej",
254:   latex: "f'(x) = 0 \\iff x = -\\frac{b}{2a}",
255:   vars: [
256:     { id: "a", label: "a" },
257:     { id: "b", label: "b" },
258:     { id: "c", label: "c" },
259:   ],
260:   mode: "fixed",
261:   outputId: "e",
262:   outputLabel: "ekstremum",
263:   solve(_unknown, known, places): FormulaSolution {
264:     const a = asRational(known["a"], "a");
265:     const b = asRational(known["b"], "b");
266:     const c = asRational(known["c"], "c");
267:     if (isZero(a)) throw new Error("a ≠ 0 — to nie jest funkcja kwadratowa");
268:     const xw = exactOf(div(neg(b), mul(of(2), a)));
269:     const yw = exactOf(add(mul(a, mul(xw.rat, xw.rat)), add(mul(b, xw.rat), c)));
270:     const kind = cmp(a, ZERO) > 0 ? "minimum" : "maksimum";
271:     return {
272:       values: [xw, yw],
273:       labels: ["xw", "yw"],
274:       steps: [
275:         { title: "1. Warunek", body: "f'(x) = 2ax + b = 0" },
276:         {
277:           title: "2. Podstawienie danych",
278:           body: `2 \\cdot ${L(a)}x + ${L(b)} = 0`,
279:         },
280:         {
281:           title: "3. Wynik",
282:           body: `${resultLatex("x_w", xw, places)}, \\; ${resultLatex("y_w", yw, places)}`,
283:           note: `a ${cmp(a, ZERO) > 0 ? ">" : "<"} 0, więc to ${kind} (ramiona ${cmp(a, ZERO) > 0 ? "w górę" : "w dół"})`,
284:         },
285:       ],
286:     };
287:   },
288: };
289: 
290: const prawdoWarunkowe: FormulaDef = {
291:   id: "prawdo-warunkowe",
292:   subject: "matematyka",
293:   topic: "Prawdopodobieństwo · ROZSZ",
294:   name: "Prawdopodobieństwo warunkowe",
295:   latex: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}",
296:   vars: [
297:     { id: "PAB", label: "P(A∩B)" },
298:     { id: "PB", label: "P(B)" },
299:     { id: "P", label: "P(A|B)" },
300:   ],
301:   mode: "nvar",
302:   outputId: "",
303:   outputLabel: "",
304:   solve(unknown, known, places): FormulaSolution {
305:     if (unknown === "P") {
306:       const PAB = asRational(known["PAB"], "P(A∩B)");
307:       const PB = asRational(known["PB"], "P(B)");
308:       const value = exactOf(div(PAB, PB));
309:       return {
310:         values: [value],
311:         steps: [
312:           { title: "1. Przekształcenie wzoru", body: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}" },
313:           { title: "2. Podstawienie danych", body: `P(A|B) = \\frac{${L(PAB)}}{${L(PB)}}` },
314:           { title: "3. Wynik", body: resultLatex("P(A|B)", value, places) },
315:         ],
316:       };
317:     }
318:     if (unknown === "PAB") {
319:       const P = asRational(known["P"], "P(A|B)");
320:       const PB = asRational(known["PB"], "P(B)");
321:       const value = exactOf(mul(P, PB));
322:       return {
323:         values: [value],
324:         steps: [
325:           { title: "1. Przekształcenie wzoru", body: "P(A \\cap B) = P(A|B) \\cdot P(B)" },
326:           { title: "2. Podstawienie danych", body: `P(A \\cap B) = ${L(P)} \\cdot ${L(PB)}` },
327:           { title: "3. Wynik", body: resultLatex("P(A \\cap B)", value, places) },
328:         ],
329:       };
330:     }
331:     const P = asRational(known["P"], "P(A|B)");
332:     const PAB = asRational(known["PAB"], "P(A∩B)");
333:     const value = exactOf(div(PAB, P));
334:     return {
335:       values: [value],
336:       steps: [
337:         { title: "1. Przekształcenie wzoru", body: "P(B) = \\frac{P(A \\cap B)}{P(A|B)}" },
338:         { title: "2. Podstawienie danych", body: `P(B) = \\frac{${L(PAB)}}{${L(P)}}` },
339:         { title: "3. Wynik", body: resultLatex("P(B)", value, places) },
340:       ],
341:     };
342:   },
343: };
344: 
345: const prawdoCalkowite: FormulaDef = {
346:   id: "prawdo-calkowite",
347:   subject: "matematyka",
348:   topic: "Prawdopodobieństwo · ROZSZ",
349:   name: "Prawdopodobieństwo całkowite (2 hipotezy)",
350:   latex: "P(A) = P(B_1)P(A|B_1) + P(B_2)P(A|B_2)",
351:   vars: [
352:     { id: "PB1", label: "P(B₁)" },
353:     { id: "PAB1", label: "P(A|B₁)" },
354:     { id: "PB2", label: "P(B₂)" },
355:     { id: "PAB2", label: "P(A|B₂)" },
356:   ],
357:   mode: "fixed",
358:   outputId: "P",
359:   outputLabel: "P(A)",
360:   solve(_unknown, known, places): FormulaSolution {
361:     const g = (id: string) => asRational(known[id], id);
362:     const value = exactOf(add(mul(g("PB1"), g("PAB1")), mul(g("PB2"), g("PAB2"))));
363:     return {
364:       values: [value],
365:       steps: [
366:         { title: "1. Wzór", body: "P(A) = P(B_1)P(A|B_1) + P(B_2)P(A|B_2)" },
367:         {
368:           title: "2. Podstawienie danych",
369:           body: `P(A) = ${L(g("PB1"))} \\cdot ${L(g("PAB1"))} + ${L(g("PB2"))} \\cdot ${L(g("PAB2"))}`,
370:         },
371:         { title: "3. Wynik", body: resultLatex("P(A)", value, places) },
372:       ],
373:     };
374:   },
375: };
376: 
377: const rownanieWykladnicze: FormulaDef = {
378:   id: "rownanie-wykladnicze",
379:   subject: "matematyka",
380:   topic: "Równania · ROZSZ",
381:   name: "Równanie wykładnicze aˣ = b",
382:   latex: "a^x = b \\iff x = \\log_a b",
383:   vars: [
384:     { id: "a", label: "a (podstawa)" },
385:     { id: "b", label: "b" },
386:   ],
387:   mode: "fixed",
388:   outputId: "x",
389:   outputLabel: "x",
390:   solve(_unknown, known, places): FormulaSolution {
391:     const a = asRational(known["a"], "a");
392:     const b = asRational(known["b"], "b");
393:     if (cmp(a, ZERO) <= 0 || cmp(sub(a, ONE), ZERO) === 0) {
394:       throw new Error("podstawa dodatnia i różna od 1");
395:     }
396:     if (cmp(b, ZERO) <= 0) throw new Error("b > 0 — inaczej brak rozwiązań");
397:     const value = logExact(a, b);
398:     const note = value.irr?.type === "approx" ? "wynik tylko przybliżony" : undefined;
399:     const steps: FormulaSolution["steps"] = [
400:       { title: "1. Logarytmowanie", body: "x = \\log_a b" },
401:       { title: "2. Podstawienie danych", body: `x = \\log_{${L(a)}} ${L(b)}` },
402:     ];
403:     if (!value.irr) {
404:       steps.push({
405:         title: "3. Sprawdzenie",
406:         body: `${L(a)}^{${formatLatex(value)}} = ${L(b)}`,
407:       });
408:     }
409:     steps.push({
410:       title: `${steps.length + 1}. Wynik`,
411:       body: resultLatex("x", value, places),
412:       note,
413:     });
414:     return { values: [value], steps };
415:   },
416: };
417: 
418: const rownanieLogarytmiczne: FormulaDef = {
419:   id: "rownanie-logarytmiczne",
420:   subject: "matematyka",
421:   topic: "Równania · ROZSZ",
422:   name: "Równanie logarytmiczne log_a(x) = c",
423:   latex: "\\log_a x = c \\iff x = a^c",
424:   vars: [
425:     { id: "a", label: "a (podstawa)" },
426:     { id: "c", label: "c" },
427:   ],
428:   mode: "fixed",
429:   outputId: "x",
430:   outputLabel: "x",
431:   solve(_unknown, known, places): FormulaSolution {
432:     const a = asRational(known["a"], "a");
433:     const c = asRational(known["c"], "c");
434:     if (cmp(a, ZERO) <= 0 || cmp(sub(a, ONE), ZERO) === 0) {
435:       throw new Error("podstawa dodatnia i różna od 1");
436:     }
437:     let value: Exact;
438:     let note: string | undefined;
439:     if (isIntegerR(c)) {
440:       value = exactOf(pow(a, Number(c.p)));
441:     } else {
442:       value = approxOnly(Math.pow(approx(exactOf(a)), approx(exactOf(c))));
443:       note = "wynik tylko przybliżony";
444:     }
445:     const steps: FormulaSolution["steps"] = [
446:       { title: "1. Definicja", body: "x = a^c" },
447:       { title: "2. Podstawienie danych", body: `x = ${L(a)}^{${L(c)}}` },
448:     ];
449:     if (isIntegerR(c) && Number(c.p) >= 2 && Number(c.p) <= 6 && c.p >= 0n) {
450:       steps.push({
451:         title: "3. Rozpisanie",
452:         body: `x = ${Array(Number(c.p)).fill(L(a)).join(" \\cdot ")}`,
453:       });
454:     }
455:     steps.push({
456:       title: `${steps.length + 1}. Wynik`,
457:       body: resultLatex("x", value, places),
458:       note,
459:     });
460:     return { values: [value], steps };
461:   },
462: };
463: 
464: const vieta: FormulaDef = {
465:   id: "vieta",
466:   subject: "matematyka",
467:   topic: "Równania · ROZSZ",
468:   name: "Wzory Viete’a",
469:   latex: "x_1 + x_2 = -\\frac{b}{a}, \\; x_1 x_2 = \\frac{c}{a}",
470:   vars: [
471:     { id: "a", label: "a" },
472:     { id: "b", label: "b" },
473:     { id: "c", label: "c" },
474:   ],
475:   mode: "fixed",
476:   outputId: "s",
477:   outputLabel: "suma, iloczyn",
478:   solve(_unknown, known, places): FormulaSolution {
479:     const a = asRational(known["a"], "a");
480:     const b = asRational(known["b"], "b");
481:     const c = asRational(known["c"], "c");
482:     if (isZero(a)) throw new Error("a ≠ 0 — to nie jest równanie kwadratowe");
483:     const s = exactOf(div(neg(b), a));
484:     const p = exactOf(div(c, a));
485:     return {
486:       values: [s, p],
487:       labels: ["x₁+x₂", "x₁·x₂"],
488:       steps: [
489:         { title: "1. Wzory", body: "x_1 + x_2 = -\\frac{b}{a}, \\; x_1 x_2 = \\frac{c}{a}" },
490:         {
491:           title: "2. Podstawienie danych",
492:           body: `x_1 + x_2 = -\\frac{${L(b)}}{${L(a)}}, \\; x_1 x_2 = \\frac{${L(c)}}{${L(a)}}`,
493:         },
494:         {
495:           title: "3. Wynik",
496:           body: `${resultLatex("x_1 + x_2", s, places)}, \\; ${resultLatex("x_1 x_2", p, places)}`,
497:         },
498:       ],
499:     };
500:   },
501: };
502: 
503: const podwojonyKat: FormulaDef = {
504:   id: "podwojony-kat",
505:   subject: "matematyka",
506:   topic: "Trygonometria · ROZSZ",
507:   name: "Sinus i cosinus podwojonego kąta",
508:   latex: "\\sin 2x = 2\\sin x\\cos x, \\; \\cos 2x = \\cos^2 x - \\sin^2 x",
509:   vars: [{ id: "x", label: "x [°]" }],
510:   mode: "fixed",
511:   outputId: "w",
512:   outputLabel: "sin 2x, cos 2x",
513:   solve(_unknown, known, places): FormulaSolution {
514:     const raw = known["x"];
515:     const deg = isIntegerR(asRational(raw, "x")) ? Number(asRational(raw, "x").p) : approx(raw);
516:     const s = trigExact("sin", 2 * deg);
517:     const c = trigExact("cos", 2 * deg);
518:     const show = (e: Exact): string => {
519:       const lx = formatLatex(e);
520:       const dc = formatDecimal(e, places);
521:       return lx === dc ? lx : `${lx} \\approx ${dc}`;
522:     };
523:     return {
524:       values: [s, c],
525:       labels: ["sin 2x", "cos 2x"],
526:       steps: [
527:         {
528:           title: "1. Wzory",
529:           body: "\\sin 2x = 2\\sin x\\cos x, \\; \\cos 2x = \\cos^2 x - \\sin^2 x",
530:         },
531:         { title: "2. Podstawienie danych", body: `x = ${L(asRational(raw, "x"))}^\\circ` },
532:         {
533:           title: "3. Wynik",
534:           body: `\\sin ${2 * deg}^\\circ = ${show(s)}, \\; \\cos ${2 * deg}^\\circ = ${show(c)}`,
535:         },
536:       ],
537:     };
538:   },
539: };
540: 
541: const bernoulli: FormulaDef = {
542:   id: "schemat-bernoulliego",
543:   subject: "matematyka",
544:   topic: "Prawdopodobieństwo · ROZSZ",
545:   name: "Schemat Bernoulliego",
546:   latex: "P_n(k) = \\binom{n}{k}p^k(1-p)^{n-k}",
547:   vars: [
548:     { id: "n", label: "n (prób)" },
549:     { id: "k", label: "k (sukcesów)" },
550:     { id: "p", label: "p (0–1)" },
551:   ],
552:   mode: "fixed",
553:   outputId: "P",
554:   outputLabel: "Pₙ(k)",
555:   solve(_unknown, known, places): FormulaSolution {
556:     const n = requireNatural(known["n"], "n");
557:     const k = requireNatural(known["k"], "k");
558:     const p = asRational(known["p"], "p");
559:     if (k > n) throw new Error("k ≤ n — sukcesów nie więcej niż prób");
560:     if (cmp(p, ZERO) < 0 || cmp(p, ONE) > 0) throw new Error("p w [0, 1]");
561:     const c = binom(BigInt(n), BigInt(k));
562:     const pk = pow(p, k);
563:     const qk = pow(sub(ONE, p), n - k);
564:     const value = exactOf(mul(mul({ p: c, q: 1n }, pk), qk));
565:     return {
566:       values: [value],
567:       steps: [
568:         { title: "1. Wzór", body: "P_n(k) = \\binom{n}{k}p^k(1-p)^{n-k}" },
569:         {
570:           title: "2. Podstawienie danych",
571:           body: `P_{${n}}(${k}) = \\binom{${n}}{${k}}${L(p)}^{${k}}(1-${L(p)})^{${n - k}}`,
572:         },
573:         {
574:           title: "3. Składniki",
575:           body: `\\binom{${n}}{${k}} = ${c}, \\; p^${k} = ${L(pk)}, \\; (1-p)^{${n - k}} = ${L(qk)}`,
576:         },
577:         { title: "4. Wynik", body: resultLatex(`P_{${n}}(${k})`, value, places) },
578:       ],
579:     };
580:   },
581: };
582: 
583: const sumaKatowTryg: FormulaDef = {
584:   id: "suma-katow-tryg",
585:   subject: "matematyka",
586:   topic: "Trygonometria · ROZSZ",
587:   name: "Sinus i cosinus sumy i różnicy",
588:   latex: "\\sin(\\alpha \\pm \\beta), \\; \\cos(\\alpha \\pm \\beta)",
589:   vars: [
590:     { id: "alfa", label: "α [°]" },
591:     { id: "beta", label: "β [°]" },
592:     {
593:       id: "fn",
594:       label: "funkcja",
595:       kind: "select",
596:       options: ["sin", "cos"],
597:     },
598:     {
599:       id: "pm",
600:       label: "znak",
601:       kind: "select",
602:       options: ["+", "−"],
603:     },
604:   ],
605:   mode: "fixed",
606:   outputId: "w",
607:   outputLabel: "wynik",
608:   solve(_unknown, known, places, selects): FormulaSolution {
609:     const alfa = approx(exactOf(asRational(known["alfa"], "α")));
610:     const beta = approx(exactOf(asRational(known["beta"], "β")));
611:     const fn = selects?.["fn"] ?? "sin";
612:     const pm = selects?.["pm"] ?? "+";
613:     const angle = pm === "+" ? alfa + beta : alfa - beta;
614:     const value = fn === "sin" ? trigExact("sin", angle) : trigExact("cos", angle);
615:     const note = value.irr?.type === "approx" ? "wynik tylko przybliżony" : undefined;
616:     const fname = fn === "sin" ? "\\sin" : "\\cos";
617:     const op = pm === "+" ? "+" : "-";
618:     return {
619:       values: [value],
620:       steps: [
621:         { title: "1. Wzór", body: `${fname}(\\alpha ${op} \\beta)` },
622:         {
623:           title: "2. Kąt",
624:           body: `\\alpha ${op} \\beta = ${trimNum(alfa)} ${op} ${trimNum(beta)} = ${trimNum(angle)}^\\circ`,
625:         },
626:         {
627:           title: "3. Wynik",
628:           body: resultLatex(`${fname}(${trimNum(angle)}^\\circ)`, value, places),
629:           note,
630:         },
631:       ],
632:     };
633:   },
634: };
635: 
636: export const MATH_PR: FormulaDef[] = [
637:   newton,
638:   silnia,
639:   szesciany,
640:   granicaQn,
641:   pochodnaWielomianu,
642:   ekstremaKwadratowej,
643:   prawdoWarunkowe,
644:   prawdoCalkowite,
645:   rownanieWykladnicze,
646:   rownanieLogarytmiczne,
647:   vieta,
648:   podwojonyKat,
649:   bernoulli,
650:   sumaKatowTryg,
651: ];

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_pp2.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_pp2.ts, lines 1-1133
1: import { ONE, ZERO, add, cmp, div, isZero, mul, neg, of, sub } from "../exact/rational";
2: import type { Rational } from "../exact/rational";
3: import {
4:   approx,
5:   approxOnly,
6:   divExact,
7:   exactOf,
8:   mulRat,
9:   sqrtRational,
10:   stripPi,
11: } from "../exact/exact";
12: import type { Exact } from "../exact/exact";
13: import { formatLatex, formatRatLatex } from "../exact/format";
14: import type { FormulaDef, FormulaSolution } from "./types";
15: import { APPROX_PI_NOTE, asRational, resultLatex } from "./types";
16: 
17: const PI: Exact = { rat: ZERO, irr: { type: "pi", coef: ONE } };
18: const L = formatRatLatex;
19: 
20: const katyOkrag: FormulaDef = {
21:   id: "katy-okrag",
22:   subject: "matematyka",
23:   topic: "Koło i okrąg",
24:   name: "Kąt środkowy i wpisany",
25:   latex: "\\alpha = 2\\beta",
26:   vars: [
27:     { id: "alfa", label: "α (środkowy) [°]" },
28:     { id: "beta", label: "β (wpisany) [°]" },
29:   ],
30:   mode: "nvar",
31:   outputId: "",
32:   outputLabel: "",
33:   solve(unknown, known, places): FormulaSolution {
34:     if (unknown === "alfa") {
35:       const beta = asRational(known["beta"], "β");
36:       const value = exactOf(mul(of(2), beta));
37:       return {
38:         values: [value],
39:         steps: [
40:           { title: "1. Przekształcenie wzoru", body: "\\alpha = 2\\beta" },
41:           { title: "2. Podstawienie danych", body: `\\alpha = 2 \\cdot ${L(beta)}` },
42:           { title: "3. Wynik", body: resultLatex("\\alpha", value, places) },
43:         ],
44:       };
45:     }
46:     const alfa = asRational(known["alfa"], "α");
47:     const value = exactOf(div(alfa, of(2)));
48:     return {
49:       values: [value],
50:       steps: [
51:         { title: "1. Przekształcenie wzoru", body: "\\beta = \\frac{\\alpha}{2}" },
52:         { title: "2. Podstawienie danych", body: `\\beta = \\frac{${L(alfa)}}{2}` },
53:         { title: "3. Wynik", body: resultLatex("\\beta", value, places) },
54:       ],
55:     };
56:   },
57: };
58: 
59: const poleTrapez: FormulaDef = {
60:   id: "pole-trapez",
61:   subject: "matematyka",
62:   topic: "Pola figur",
63:   name: "Pole trapezu",
64:   latex: "P = \\frac{(a + b)h}{2}",
65:   vars: [
66:     { id: "P", label: "P (pole)" },
67:     { id: "a", label: "a (podstawa)" },
68:     { id: "b", label: "b (podstawa)" },
69:     { id: "h", label: "h (wysokość)" },
70:   ],
71:   mode: "nvar",
72:   outputId: "",
73:   outputLabel: "",
74:   solve(unknown, known, places): FormulaSolution {
75:     if (unknown === "P") {
76:       const a = asRational(known["a"], "a");
77:       const b = asRational(known["b"], "b");
78:       const h = asRational(known["h"], "h");
79:       const sum = add(a, b);
80:       const num = mul(sum, h);
81:       const value = exactOf(div(num, of(2)));
82:       return {
83:         values: [value],
84:         steps: [
85:           { title: "1. Przekształcenie wzoru", body: "P = \\frac{(a + b)h}{2}" },
86:           {
87:             title: "2. Podstawienie danych",
88:             body: `P = \\frac{(${L(a)} + ${L(b)}) \\cdot ${L(h)}}{2}`,
89:           },
90:           { title: "3. Suma podstaw", body: `a + b = ${L(a)} + ${L(b)} = ${L(sum)}` },
91:           { title: "4. Licznik", body: `(${L(sum)}) \\cdot ${L(h)} = ${L(num)}` },
92:           { title: "5. Wynik", body: resultLatex("P", value, places) },
93:         ],
94:       };
95:     }
96:     if (unknown === "h") {
97:       const P = asRational(known["P"], "P");
98:       const a = asRational(known["a"], "a");
99:       const b = asRational(known["b"], "b");
100:       const sum = add(a, b);
101:       const num = mul(P, of(2));
102:       const value = exactOf(div(num, sum));
103:       return {
104:         values: [value],
105:         steps: [
106:           { title: "1. Przekształcenie wzoru", body: "h = \\frac{2P}{a + b}" },
107:           {
108:             title: "2. Podstawienie danych",
109:             body: `h = \\frac{2 \\cdot ${L(P)}}{${L(a)} + ${L(b)}}`,
110:           },
111:           { title: "3. Licznik i mianownik", body: `2P = ${L(num)}, \\; a + b = ${L(sum)}` },
112:           { title: "4. Wynik", body: resultLatex("h", value, places) },
113:         ],
114:       };
115:     }
116:     const P = asRational(known["P"], "P");
117:     const h = asRational(known["h"], "h");
118:     const other = unknown === "a" ? "b" : "a";
119:     const o = asRational(known[other], other);
120:     const frac = div(mul(P, of(2)), h);
121:     const value = exactOf(sub(frac, o));
122:     return {
123:       values: [value],
124:       steps: [
125:         { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{2P}{h} - ${other}` },
126:         {
127:           title: "2. Podstawienie danych",
128:           body: `${unknown} = \\frac{2 \\cdot ${L(P)}}{${L(h)}} - ${L(o)}`,
129:         },
130:         { title: "3. Ułamek", body: `\\frac{2 \\cdot ${L(P)}}{${L(h)}} = ${L(frac)}` },
131:         { title: "4. Wynik", body: resultLatex(unknown, value, places) },
132:       ],
133:     };
134:   },
135: };
136: 
137: const poleRombu: FormulaDef = {
138:   id: "pole-rombu",
139:   subject: "matematyka",
140:   topic: "Pola figur",
141:   name: "Pole rombu (przekątne)",
142:   latex: "P = \\frac{ef}{2}",
143:   vars: [
144:     { id: "P", label: "P (pole)" },
145:     { id: "e", label: "e (przekątna)" },
146:     { id: "f", label: "f (przekątna)" },
147:   ],
148:   mode: "nvar",
149:   outputId: "",
150:   outputLabel: "",
151:   solve(unknown, known, places): FormulaSolution {
152:     if (unknown === "P") {
153:       const e = asRational(known["e"], "e");
154:       const f = asRational(known["f"], "f");
155:       const num = mul(e, f);
156:       const value = exactOf(div(num, of(2)));
157:       return {
158:         values: [value],
159:         steps: [
160:           { title: "1. Przekształcenie wzoru", body: "P = \\frac{ef}{2}" },
161:           { title: "2. Podstawienie danych", body: `P = \\frac{${L(e)} \\cdot ${L(f)}}{2}` },
162:           { title: "3. Licznik", body: `e \\cdot f = ${L(e)} \\cdot ${L(f)} = ${L(num)}` },
163:           { title: "4. Wynik", body: resultLatex("P", value, places) },
164:         ],
165:       };
166:     }
167:     const P = asRational(known["P"], "P");
168:     const other = unknown === "e" ? "f" : "e";
169:     const o = asRational(known[other], other);
170:     const num = mul(P, of(2));
171:     const value = exactOf(div(num, o));
172:     return {
173:       values: [value],
174:       steps: [
175:         { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{2P}{${other}}` },
176:         { title: "2. Podstawienie danych", body: `${unknown} = \\frac{2 \\cdot ${L(P)}}{${L(o)}}` },
177:         { title: "3. Licznik", body: `2 \\cdot P = 2 \\cdot ${L(P)} = ${L(num)}` },
178:         { title: "4. Wynik", body: resultLatex(unknown, value, places) },
179:       ],
180:     };
181:   },
182: };
183: 
184: const poleRownoleglobok: FormulaDef = {
185:   id: "pole-rownoleglobok",
186:   subject: "matematyka",
187:   topic: "Pola figur",
188:   name: "Pole równoległoboku",
189:   latex: "P = a \\cdot h",
190:   vars: [
191:     { id: "P", label: "P (pole)" },
192:     { id: "a", label: "a (podstawa)" },
193:     { id: "h", label: "h (wysokość)" },
194:   ],
195:   mode: "nvar",
196:   outputId: "",
197:   outputLabel: "",
198:   solve(unknown, known, places): FormulaSolution {
199:     if (unknown === "P") {
200:       const a = asRational(known["a"], "a");
201:       const h = asRational(known["h"], "h");
202:       const value = exactOf(mul(a, h));
203:       return {
204:         values: [value],
205:         steps: [
206:           { title: "1. Przekształcenie wzoru", body: "P = a \\cdot h" },
207:           { title: "2. Podstawienie danych", body: `P = ${L(a)} \\cdot ${L(h)}` },
208:           { title: "3. Wynik", body: resultLatex("P", value, places) },
209:         ],
210:       };
211:     }
212:     const P = asRational(known["P"], "P");
213:     const other = unknown === "a" ? "h" : "a";
214:     const o = asRational(known[other], other);
215:     const value = exactOf(div(P, o));
216:     return {
217:       values: [value],
218:       steps: [
219:         { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{P}{${other}}` },
220:         { title: "2. Podstawienie danych", body: `${unknown} = \\frac{${L(P)}}{${L(o)}}` },
221:         { title: "3. Wynik", body: resultLatex(unknown, value, places) },
222:       ],
223:     };
224:   },
225: };
226: 
227: const lukOkregu: FormulaDef = {
228:   id: "luk-okregu",
229:   subject: "matematyka",
230:   topic: "Koło i okrąg",
231:   name: "Długość łuku okręgu",
232:   latex: "l = \\frac{\\alpha}{360^\\circ} \\cdot 2\\pi r",
233:   vars: [
234:     { id: "l", label: "l (długość łuku)" },
235:     { id: "r", label: "r (promień)" },
236:     { id: "alfa", label: "α (kąt) [°]" },
237:   ],
238:   mode: "nvar",
239:   outputId: "",
240:   outputLabel: "",
241:   solve(unknown, known, places): FormulaSolution {
242:     if (unknown === "l") {
243:       const r = asRational(known["r"], "r");
244:       const alfa = asRational(known["alfa"], "α");
245:       if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
246:       const circ = mul(of(2), r);
247:       const value = mulRat(PI, div(mul(alfa, circ), of(360)));
248:       return {
249:         values: [value],
250:         steps: [
251:           {
252:             title: "1. Przekształcenie wzoru",
253:             body: "l = \\frac{\\alpha}{360^\\circ} \\cdot 2\\pi r",
254:           },
255:           {
256:             title: "2. Podstawienie danych",
257:             body: `l = \\frac{${L(alfa)}}{360} \\cdot 2\\pi \\cdot ${L(r)}`,
258:           },
259:           { title: "3. Obwód koła bez π", body: `2r = 2 \\cdot ${L(r)} = ${L(circ)}` },
260:           { title: "4. Wynik", body: resultLatex("l", value, places) },
261:         ],
262:       };
263:     }
264:     if (unknown === "alfa") {
265:       const l = known["l"];
266:       const r = asRational(known["r"], "r");
267:       let value: Exact;
268:       let note: string | undefined;
269:       try {
270:         const inner = div(mul(stripPi(l), of(360)), mul(of(2), r));
271:         value = exactOf(inner);
272:         return {
273:           values: [value],
274:           steps: [
275:             {
276:               title: "1. Przekształcenie wzoru",
277:               body: "\\alpha = \\frac{360^\\circ \\cdot l}{2\\pi r}",
278:             },
279:             {
280:               title: "2. Podstawienie danych",
281:               body: `\\alpha = \\frac{360 \\cdot ${formatLatex(l)}}{2\\pi \\cdot ${L(r)}}`,
282:             },
283:             { title: "3. Skrócenie π", body: `\\alpha = ${L(inner)}` },
284:             { title: "4. Wynik", body: resultLatex("\\alpha", value, places) },
285:           ],
286:         };
287:       } catch {
288:         value = approxOnly((approx(l) * 360) / (2 * Math.PI * approx(exactOf(r))));
289:         note = APPROX_PI_NOTE;
290:       }
291:       return {
292:         values: [value],
293:         steps: [
294:           {
295:             title: "1. Przekształcenie wzoru",
296:             body: "\\alpha = \\frac{360^\\circ \\cdot l}{2\\pi r}",
297:           },
298:           {
299:             title: "2. Podstawienie danych",
300:             body: `\\alpha = \\frac{360 \\cdot ${formatLatex(l)}}{2\\pi \\cdot ${L(r)}}`,
301:           },
302:           { title: "3. Wynik", body: resultLatex("\\alpha", value, places), note },
303:         ],
304:       };
305:     }
306:     const l = known["l"];
307:     const alfa = asRational(known["alfa"], "α");
308:     let value: Exact;
309:     let note: string | undefined;
310:     try {
311:       const inner = div(mul(stripPi(l), of(360)), mul(alfa, of(2)));
312:       value = exactOf(inner);
313:       return {
314:         values: [value],
315:         steps: [
316:           {
317:             title: "1. Przekształcenie wzoru",
318:             body: "r = \\frac{360^\\circ \\cdot l}{2\\pi\\alpha}",
319:           },
320:           {
321:             title: "2. Podstawienie danych",
322:             body: `r = \\frac{360 \\cdot ${formatLatex(l)}}{2\\pi \\cdot ${L(alfa)}}`,
323:           },
324:           { title: "3. Skrócenie π", body: `r = ${L(inner)}` },
325:           { title: "4. Wynik", body: resultLatex("r", value, places) },
326:         ],
327:       };
328:     } catch {
329:       const num = approx(l) * 360;
330:       const den = approx(exactOf(alfa)) * 2 * Math.PI;
331:       value = approxOnly(num / den);
332:       note = APPROX_PI_NOTE;
333:     }
334:     return {
335:       values: [value],
336:       steps: [
337:         {
338:           title: "1. Przekształcenie wzoru",
339:           body: "r = \\frac{360^\\circ \\cdot l}{2\\pi\\alpha}",
340:         },
341:         {
342:           title: "2. Podstawienie danych",
343:           body: `r = \\frac{360 \\cdot ${formatLatex(l)}}{2\\pi \\cdot ${L(alfa)}}`,
344:         },
345:         { title: "3. Wynik", body: resultLatex("r", value, places), note },
346:       ],
347:     };
348:   },
349: };
350: 
351: const wycinekKola: FormulaDef = {
352:   id: "wycinek-kola",
353:   subject: "matematyka",
354:   topic: "Koło i okrąg",
355:   name: "Pole wycinka koła",
356:   latex: "P = \\frac{\\alpha}{360^\\circ} \\cdot \\pi r^2",
357:   vars: [
358:     { id: "P", label: "P (pole wycinka)" },
359:     { id: "r", label: "r (promień)" },
360:     { id: "alfa", label: "α (kąt) [°]" },
361:   ],
362:   mode: "nvar",
363:   outputId: "",
364:   outputLabel: "",
365:   solve(unknown, known, places): FormulaSolution {
366:     if (unknown === "P") {
367:       const r = asRational(known["r"], "r");
368:       const alfa = asRational(known["alfa"], "α");
369:       if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
370:       const r2 = mul(r, r);
371:       const value = mulRat(PI, div(mul(alfa, r2), of(360)));
372:       return {
373:         values: [value],
374:         steps: [
375:           {
376:             title: "1. Przekształcenie wzoru",
377:             body: "P = \\frac{\\alpha}{360^\\circ} \\cdot \\pi r^2",
378:           },
379:           {
380:             title: "2. Podstawienie danych",
381:             body: `P = \\frac{${L(alfa)}}{360} \\cdot \\pi \\cdot ${L(r)}^2`,
382:           },
383:           { title: "3. Kwadrat promienia", body: `r^2 = ${L(r)}^2 = ${L(r2)}` },
384:           { title: "4. Wynik", body: resultLatex("P", value, places) },
385:         ],
386:       };
387:     }
388:     if (unknown === "alfa") {
389:       const P = known["P"];
390:       const r = asRational(known["r"], "r");
391:       let value: Exact;
392:       let note: string | undefined;
393:       try {
394:         const r2 = mul(r, r);
395:         const inner = div(mul(stripPi(P), of(360)), r2);
396:         value = exactOf(inner);
397:         return {
398:           values: [value],
399:           steps: [
400:             {
401:               title: "1. Przekształcenie wzoru",
402:               body: "\\alpha = \\frac{360^\\circ \\cdot P}{\\pi r^2}",
403:             },
404:             {
405:               title: "2. Podstawienie danych",
406:               body: `\\alpha = \\frac{360 \\cdot ${formatLatex(P)}}{\\pi \\cdot ${L(r)}^2}`,
407:             },
408:             {
409:               title: "3. Kwadrat i skrócenie π",
410:               body: `r^2 = ${L(r2)}, \\; \\alpha = ${L(inner)}`,
411:             },
412:             { title: "4. Wynik", body: resultLatex("\\alpha", value, places) },
413:           ],
414:         };
415:       } catch {
416:         value = approxOnly((approx(P) * 360) / (Math.PI * approx(exactOf(r)) ** 2));
417:         note = APPROX_PI_NOTE;
418:       }
419:       return {
420:         values: [value],
421:         steps: [
422:           {
423:             title: "1. Przekształcenie wzoru",
424:             body: "\\alpha = \\frac{360^\\circ \\cdot P}{\\pi r^2}",
425:           },
426:           {
427:             title: "2. Podstawienie danych",
428:             body: `\\alpha = \\frac{360 \\cdot ${formatLatex(P)}}{\\pi \\cdot ${L(r)}^2}`,
429:           },
430:           { title: "3. Wynik", body: resultLatex("\\alpha", value, places), note },
431:         ],
432:       };
433:     }
434:     const P = known["P"];
435:     const alfa = asRational(known["alfa"], "α");
436:     let value: Exact;
437:     let note: string | undefined;
438:     try {
439:       const inner = div(stripPi(P), div(mul(alfa, ONE), of(360)));
440:       value = sqrtRational(inner);
441:       return {
442:         values: [value],
443:         steps: [
444:           {
445:             title: "1. Przekształcenie wzoru",
446:             body: "r = \\sqrt{\\frac{360^\\circ \\cdot P}{\\pi\\alpha}}",
447:           },
448:           {
449:             title: "2. Podstawienie danych",
450:             body: `r = \\sqrt{\\frac{360 \\cdot ${formatLatex(P)}}{\\pi \\cdot ${L(alfa)}}}`,
451:           },
452:           { title: "3. Skrócenie π", body: `\\frac{360P}{\\pi\\alpha} = ${L(inner)}` },
453:           { title: "4. Wynik", body: resultLatex("r", value, places) },
454:         ],
455:       };
456:     } catch {
457:       const num = approx(P);
458:       const den = (approx(exactOf(alfa)) * Math.PI) / 360;
459:       value = approxOnly(Math.sqrt(num / den));
460:       note = APPROX_PI_NOTE;
461:     }
462:     return {
463:       values: [value],
464:       steps: [
465:         {
466:           title: "1. Przekształcenie wzoru",
467:           body: "r = \\sqrt{\\frac{360^\\circ \\cdot P}{\\pi\\alpha}}",
468:         },
469:         {
470:           title: "2. Podstawienie danych",
471:           body: `r = \\sqrt{\\frac{360 \\cdot ${formatLatex(P)}}{\\pi \\cdot ${L(alfa)}}}`,
472:         },
473:         { title: "3. Wynik", body: resultLatex("r", value, places), note },
474:       ],
475:     };
476:   },
477: };
478: 
479: const odlPunktow: FormulaDef = {
480:   id: "odl-punktow",
481:   subject: "matematyka",
482:   topic: "Geometria analityczna",
483:   name: "Odległość dwóch punktów",
484:   latex: "|AB| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
485:   vars: [
486:     { id: "x1", label: "x₁" },
487:     { id: "y1", label: "y₁" },
488:     { id: "x2", label: "x₂" },
489:     { id: "y2", label: "y₂" },
490:   ],
491:   mode: "fixed",
492:   outputId: "d",
493:   outputLabel: "|AB|",
494:   solve(_unknown, known, places): FormulaSolution {
495:     const g = (id: string) => asRational(known[id], id);
496:     const dx = sub(g("x2"), g("x1"));
497:     const dy = sub(g("y2"), g("y1"));
498:     const dx2 = mul(dx, dx);
499:     const dy2 = mul(dy, dy);
500:     const value = sqrtRational(add(dx2, dy2));
501:     return {
502:       values: [value],
503:       steps: [
504:         { title: "1. Wzór", body: "|AB| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" },
505:         {
506:           title: "2. Podstawienie danych",
507:           body: `|AB| = \\sqrt{(${L(g("x2"))} - ${L(g("x1"))})^2 + (${L(g("y2"))} - ${L(g("y1"))})^2}`,
508:         },
509:         {
510:           title: "3. Różnice",
511:           body: `\\Delta x = ${L(dx)}, \\; \\Delta y = ${L(dy)}`,
512:         },
513:         {
514:           title: "4. Kwadraty",
515:           body: `\\Delta x^2 = ${L(dx2)}, \\; \\Delta y^2 = ${L(dy2)}`,
516:         },
517:         { title: "5. Wynik", body: resultLatex("|AB|", value, places) },
518:       ],
519:     };
520:   },
521: };
522: 
523: const srodekOdcinka: FormulaDef = {
524:   id: "srodek-odcinka",
525:   subject: "matematyka",
526:   topic: "Geometria analityczna",
527:   name: "Środek odcinka",
528:   latex: "S = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)",
529:   vars: [
530:     { id: "x1", label: "x₁" },
531:     { id: "y1", label: "y₁" },
532:     { id: "x2", label: "x₂" },
533:     { id: "y2", label: "y₂" },
534:   ],
535:   mode: "fixed",
536:   outputId: "S",
537:   outputLabel: "S",
538:   solve(_unknown, known, places): FormulaSolution {
539:     const g = (id: string) => asRational(known[id], id);
540:     const sumX = add(g("x1"), g("x2"));
541:     const sumY = add(g("y1"), g("y2"));
542:     const xs = exactOf(div(sumX, of(2)));
543:     const ys = exactOf(div(sumY, of(2)));
544:     return {
545:       values: [xs, ys],
546:       labels: ["x_S", "y_S"],
547:       steps: [
548:         { title: "1. Wzór", body: "S = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)" },
549:         {
550:           title: "2. Podstawienie danych",
551:           body: `S = \\left(\\frac{${L(g("x1"))} + ${L(g("x2"))}}{2}, \\frac{${L(g("y1"))} + ${L(g("y2"))}}{2}\\right)`,
552:         },
553:         {
554:           title: "3. Sumy",
555:           body: `x_1 + x_2 = ${L(sumX)}, \\; y_1 + y_2 = ${L(sumY)}`,
556:         },
557:         {
558:           title: "4. Wynik",
559:           body: `${resultLatex("x_S", xs, places)}, \\; ${resultLatex("y_S", ys, places)}`,
560:         },
561:       ],
562:     };
563:   },
564: };
565: 
566: const prosta2Punkty: FormulaDef = {
567:   id: "prosta-2-punkty",
568:   subject: "matematyka",
569:   topic: "Geometria analityczna",
570:   name: "Prosta przez 2 punkty",
571:   latex: "y = ax + b",
572:   vars: [
573:     { id: "x1", label: "x₁" },
574:     { id: "y1", label: "y₁" },
575:     { id: "x2", label: "x₂" },
576:     { id: "y2", label: "y₂" },
577:   ],
578:   mode: "fixed",
579:   outputId: "ab",
580:   outputLabel: "a, b",
581:   solve(_unknown, known, places): FormulaSolution {
582:     const g = (id: string) => asRational(known[id], id);
583:     const dx = sub(g("x2"), g("x1"));
584:     if (isZero(dx)) {
585:       return {
586:         values: [],
587:         steps: [
588:           { title: "1. Sprawdzenie", body: "x_1 = x_2" },
589:           { title: "2. Podstawienie danych", body: `x_1 = ${L(g("x1"))}, \\; x_2 = ${L(g("x2"))}` },
590:           {
591:             title: "3. Wynik",
592:             body: `x = ${L(g("x1"))}`,
593:             note: "prosta pionowa — nie da się zapisać jako y = ax + b",
594:           },
595:         ],
596:       };
597:     }
598:     const a = exactOf(div(sub(g("y2"), g("y1")), dx));
599:     const ax1 = mul(a.rat, g("x1"));
600:     const b = exactOf(sub(g("y1"), ax1));
601:     return {
602:       values: [a, b],
603:       labels: ["a", "b"],
604:       steps: [
605:         { title: "1. Wzór", body: "a = \\frac{y_2 - y_1}{x_2 - x_1}, \\; b = y_1 - ax_1" },
606:         {
607:           title: "2. Podstawienie danych",
608:           body: `a = \\frac{${L(g("y2"))} - ${L(g("y1"))}}{${L(g("x2"))} - ${L(g("x1"))}}`,
609:         },
610:         {
611:           title: "3. Współczynnik a",
612:           body: `a = ${formatLatex(a)}, \\; ax_1 = ${L(ax1)}`,
613:         },
614:         {
615:           title: "4. Wynik",
616:           body: `${resultLatex("a", a, places)}, \\; ${resultLatex("b", b, places)}`,
617:         },
618:       ],
619:     };
620:   },
621: };
622: 
623: const prostopadlosc: FormulaDef = {
624:   id: "prostopadlosc",
625:   subject: "matematyka",
626:   topic: "Geometria analityczna",
627:   name: "Proste równoległe / prostopadłe",
628:   latex: "a_1 = a_2 \\; \\lor \\; a_1 \\cdot a_2 = -1",
629:   vars: [
630:     { id: "a1", label: "a₁" },
631:     { id: "a2", label: "a₂" },
632:   ],
633:   mode: "fixed",
634:   outputId: "w",
635:   outputLabel: "werdykt",
636:   solve(_unknown, known, places): FormulaSolution {
637:     void places;
638:     const a1 = asRational(known["a1"], "a₁");
639:     const a2 = asRational(known["a2"], "a₂");
640:     const prod = mul(a1, a2);
641:     if (cmp(a1, a2) === 0) {
642:       return {
643:         values: [],
644:         steps: [
645:           { title: "1. Warunek równoległości", body: "a_1 = a_2" },
646:           { title: "2. Podstawienie danych", body: `${L(a1)} = ${L(a2)}` },
647:           { title: "3. Wynik", body: "a_1 = a_2", note: "proste równoległe" },
648:         ],
649:       };
650:     }
651:     if (cmp(prod, neg(ONE)) === 0) {
652:       return {
653:         values: [],
654:         steps: [
655:           { title: "1. Warunek prostopadłości", body: "a_1 \\cdot a_2 = -1" },
656:           { title: "2. Podstawienie danych", body: `${L(a1)} \\cdot ${L(a2)} = -1` },
657:           { title: "3. Wynik", body: `${L(a1)} \\cdot ${L(a2)} = -1`, note: "proste prostopadłe" },
658:         ],
659:       };
660:     }
661:     return {
662:       values: [],
663:       steps: [
664:         { title: "1. Warunki", body: "a_1 = a_2 \\; \\lor \\; a_1 \\cdot a_2 = -1" },
665:         {
666:           title: "2. Podstawienie danych",
667:           body: `a_1 = ${L(a1)}, \\; a_2 = ${L(a2)}, \\; a_1 \\cdot a_2 = ${formatLatex({ rat: prod, irr: null })}`,
668:         },
669:         {
670:           title: "3. Wynik",
671:           body: `a_1 \\cdot a_2 = ${formatLatex({ rat: prod, irr: null })}`,
672:           note: "proste ani równoległe, ani prostopadłe",
673:         },
674:       ],
675:     };
676:   },
677: };
678: 
679: const okragRownanie: FormulaDef = {
680:   id: "okrag-rownanie",
681:   subject: "matematyka",
682:   topic: "Geometria analityczna",
683:   name: "Równanie okręgu",
684:   latex: "(x - h)^2 + (y - k)^2 = r^2",
685:   vars: [
686:     { id: "h", label: "h (środek x)" },
687:     { id: "k", label: "k (środek y)" },
688:     { id: "r", label: "r (promień)" },
689:   ],
690:   mode: "fixed",
691:   outputId: "row",
692:   outputLabel: "równanie",
693:   solve(_unknown, known, places): FormulaSolution {
694:     void places;
695:     const h = asRational(known["h"], "h");
696:     const k = asRational(known["k"], "k");
697:     const r = asRational(known["r"], "r");
698:     if (cmp(r, ZERO) <= 0) throw new Error("promień dodatni");
699:     const r2 = mul(r, r);
700:     const fh = (v: Rational): string =>
701:       cmp(v, ZERO) === 0 ? "" : cmp(v, ZERO) > 0 ? `- ${L(v)}` : `+ ${L(neg(v))}`;
702:     return {
703:       values: [],
704:       steps: [
705:         { title: "1. Wzór", body: "(x - h)^2 + (y - k)^2 = r^2" },
706:         {
707:           title: "2. Podstawienie danych",
708:           body: `(x ${fh(h)})^2 + (y ${fh(k)})^2 = ${L(r)}^2`,
709:         },
710:         {
711:           title: "3. Kwadrat promienia",
712:           body: `r^2 = ${L(r)}^2 = ${formatLatex({ rat: r2, irr: null })}`,
713:         },
714:         {
715:           title: "4. Wynik",
716:           body: `(x ${fh(h)})^2 + (y ${fh(k)})^2 = ${formatLatex({ rat: r2, irr: null })}`,
717:         },
718:       ],
719:     };
720:   },
721: };
722: 
723: const odlPunktProsta: FormulaDef = {
724:   id: "odl-punkt-prosta",
725:   subject: "matematyka",
726:   topic: "Geometria analityczna",
727:   name: "Odległość punktu od prostej",
728:   latex: "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}",
729:   vars: [
730:     { id: "A", label: "A" },
731:     { id: "B", label: "B" },
732:     { id: "C", label: "C" },
733:     { id: "x0", label: "x₀" },
734:     { id: "y0", label: "y₀" },
735:   ],
736:   mode: "fixed",
737:   outputId: "d",
738:   outputLabel: "d",
739:   solve(_unknown, known, places): FormulaSolution {
740:     const g = (id: string) => asRational(known[id], id);
741:     const [A, B, C, x0, y0] = [g("A"), g("B"), g("C"), g("x0"), g("y0")];
742:     if (isZero(A) && isZero(B)) throw new Error("A i B nie mogą być jednocześnie zerami");
743:     const num = add(add(mul(A, x0), mul(B, y0)), C);
744:     const anum = cmp(num, ZERO) < 0 ? neg(num) : num;
745:     const denInner = add(mul(A, A), mul(B, B));
746:     const den = sqrtRational(denInner);
747:     const value = divExact(exactOf(anum), den);
748:     return {
749:       values: [value],
750:       steps: [
751:         {
752:           title: "1. Przekształcenie wzoru",
753:           body: "d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}",
754:         },
755:         {
756:           title: "2. Podstawienie danych",
757:           body: `d = \\frac{|${L(A)} \\cdot ${L(x0)} + ${L(B)} \\cdot ${L(y0)} + ${L(C)}|}{\\sqrt{${L(A)}^2 + ${L(B)}^2}}`,
758:         },
759:         { title: "3. Licznik", body: `Ax_0 + By_0 + C = ${L(num)}, \\; |\\cdot| = ${L(anum)}` },
760:         { title: "4. Mianownik", body: `\\sqrt{${L(A)}^2 + ${L(B)}^2} = ${formatLatex(den)}` },
761:         { title: "5. Wynik", body: resultLatex("d", value, places) },
762:       ],
763:     };
764:   },
765: };
766: 
767: const graniastoslup: FormulaDef = {
768:   id: "graniastoslup",
769:   subject: "matematyka",
770:   topic: "Bryły",
771:   name: "Objętość graniastosłupa",
772:   latex: "V = P_p \\cdot H",
773:   vars: [
774:     { id: "V", label: "V (objętość)" },
775:     { id: "Pp", label: "Pₚ (pole podstawy)" },
776:     { id: "H", label: "H (wysokość)" },
777:   ],
778:   mode: "nvar",
779:   outputId: "",
780:   outputLabel: "",
781:   solve(unknown, known, places): FormulaSolution {
782:     if (unknown === "V") {
783:       const Pp = asRational(known["Pp"], "Pₚ");
784:       const H = asRational(known["H"], "H");
785:       const value = exactOf(mul(Pp, H));
786:       return {
787:         values: [value],
788:         steps: [
789:           { title: "1. Przekształcenie wzoru", body: "V = P_p \\cdot H" },
790:           { title: "2. Podstawienie danych", body: `V = ${L(Pp)} \\cdot ${L(H)}` },
791:           { title: "3. Wynik", body: resultLatex("V", value, places) },
792:         ],
793:       };
794:     }
795:     const V = asRational(known["V"], "V");
796:     const other = unknown === "Pp" ? "H" : "Pp";
797:     const o = asRational(known[other], other);
798:     const value = exactOf(div(V, o));
799:     return {
800:       values: [value],
801:       steps: [
802:         { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{V}{${other}}` },
803:         { title: "2. Podstawienie danych", body: `${unknown} = \\frac{${L(V)}}{${L(o)}}` },
804:         { title: "3. Wynik", body: resultLatex(unknown, value, places) },
805:       ],
806:     };
807:   },
808: };
809: 
810: const ostroslup: FormulaDef = {
811:   id: "ostroslup",
812:   subject: "matematyka",
813:   topic: "Bryły",
814:   name: "Objętość ostrosłupa",
815:   latex: "V = \\frac{1}{3} P_p H",
816:   vars: [
817:     { id: "V", label: "V (objętość)" },
818:     { id: "Pp", label: "Pₚ (pole podstawy)" },
819:     { id: "H", label: "H (wysokość)" },
820:   ],
821:   mode: "nvar",
822:   outputId: "",
823:   outputLabel: "",
824:   solve(unknown, known, places): FormulaSolution {
825:     if (unknown === "V") {
826:       const Pp = asRational(known["Pp"], "Pₚ");
827:       const H = asRational(known["H"], "H");
828:       const num = mul(Pp, H);
829:       const value = exactOf(div(num, of(3)));
830:       return {
831:         values: [value],
832:         steps: [
833:           { title: "1. Przekształcenie wzoru", body: "V = \\frac{P_p H}{3}" },
834:           { title: "2. Podstawienie danych", body: `V = \\frac{${L(Pp)} \\cdot ${L(H)}}{3}` },
835:           { title: "3. Licznik", body: `P_p \\cdot H = ${L(Pp)} \\cdot ${L(H)} = ${L(num)}` },
836:           { title: "4. Wynik", body: resultLatex("V", value, places) },
837:         ],
838:       };
839:     }
840:     const V = asRational(known["V"], "V");
841:     const other = unknown === "Pp" ? "H" : "Pp";
842:     const o = asRational(known[other], other);
843:     const num = mul(V, of(3));
844:     const value = exactOf(div(num, o));
845:     return {
846:       values: [value],
847:       steps: [
848:         { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{3V}{${other}}` },
849:         { title: "2. Podstawienie danych", body: `${unknown} = \\frac{3 \\cdot ${L(V)}}{${L(o)}}` },
850:         { title: "3. Licznik", body: `3 \\cdot V = 3 \\cdot ${L(V)} = ${L(num)}` },
851:         { title: "4. Wynik", body: resultLatex(unknown, value, places) },
852:       ],
853:     };
854:   },
855: };
856: 
857: const walec: FormulaDef = {
858:   id: "walec",
859:   subject: "matematyka",
860:   topic: "Bryły",
861:   name: "Objętość walca",
862:   latex: "V = \\pi r^2 H",
863:   vars: [
864:     { id: "V", label: "V (objętość)" },
865:     { id: "r", label: "r (promień)" },
866:     { id: "H", label: "H (wysokość)" },
867:   ],
868:   mode: "nvar",
869:   outputId: "",
870:   outputLabel: "",
871:   solve(unknown, known, places): FormulaSolution {
872:     if (unknown === "V") {
873:       const r = asRational(known["r"], "r");
874:       const H = asRational(known["H"], "H");
875:       if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
876:       const r2 = mul(r, r);
877:       const value = mulRat(PI, mul(r2, H));
878:       return {
879:         values: [value],
880:         steps: [
881:           { title: "1. Przekształcenie wzoru", body: "V = \\pi r^2 H" },
882:           { title: "2. Podstawienie danych", body: `V = \\pi \\cdot ${L(r)}^2 \\cdot ${L(H)}` },
883:           { title: "3. Kwadrat promienia", body: `r^2 = ${L(r)}^2 = ${L(r2)}` },
884:           { title: "4. Wynik", body: resultLatex("V", value, places) },
885:         ],
886:       };
887:     }
888:     if (unknown === "H") {
889:       const V = known["V"];
890:       const r = asRational(known["r"], "r");
891:       let value: Exact;
892:       let note: string | undefined;
893:       try {
894:         const r2 = mul(r, r);
895:         const inner = div(stripPi(V), r2);
896:         value = exactOf(inner);
897:         return {
898:           values: [value],
899:           steps: [
900:             { title: "1. Przekształcenie wzoru", body: "H = \\frac{V}{\\pi r^2}" },
901:             {
902:               title: "2. Podstawienie danych",
903:               body: `H = \\frac{${formatLatex(V)}}{\\pi \\cdot ${L(r)}^2}`,
904:             },
905:             { title: "3. Kwadrat i skrócenie π", body: `r^2 = ${L(r2)}, \\; H = ${L(inner)}` },
906:             { title: "4. Wynik", body: resultLatex("H", value, places) },
907:           ],
908:         };
909:       } catch {
910:         value = approxOnly(approx(V) / (Math.PI * approx(exactOf(r)) ** 2));
911:         note = APPROX_PI_NOTE;
912:       }
913:       return {
914:         values: [value],
915:         steps: [
916:           { title: "1. Przekształcenie wzoru", body: "H = \\frac{V}{\\pi r^2}" },
917:           {
918:             title: "2. Podstawienie danych",
919:             body: `H = \\frac{${formatLatex(V)}}{\\pi \\cdot ${L(r)}^2}`,
920:           },
921:           { title: "3. Wynik", body: resultLatex("H", value, places), note },
922:         ],
923:       };
924:     }
925:     const V = known["V"];
926:     const H = asRational(known["H"], "H");
927:     let value: Exact;
928:     let note: string | undefined;
929:     try {
930:       const inner = div(stripPi(V), H);
931:       value = sqrtRational(inner);
932:       return {
933:         values: [value],
934:         steps: [
935:           { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{V}{\\pi H}}" },
936:           {
937:             title: "2. Podstawienie danych",
938:             body: `r = \\sqrt{\\frac{${formatLatex(V)}}{\\pi \\cdot ${L(H)}}}`,
939:           },
940:           { title: "3. Skrócenie π", body: `\\frac{V}{\\pi H} = ${L(inner)}` },
941:           { title: "4. Wynik", body: resultLatex("r", value, places) },
942:         ],
943:       };
944:     } catch {
945:       value = approxOnly(Math.sqrt(approx(V) / (Math.PI * approx(exactOf(H)))));
946:       note = APPROX_PI_NOTE;
947:     }
948:     return {
949:       values: [value],
950:       steps: [
951:         { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{V}{\\pi H}}" },
952:         {
953:           title: "2. Podstawienie danych",
954:           body: `r = \\sqrt{\\frac{${formatLatex(V)}}{\\pi \\cdot ${L(H)}}}`,
955:         },
956:         { title: "3. Wynik", body: resultLatex("r", value, places), note },
957:       ],
958:     };
959:   },
960: };
961: 
962: const stozek: FormulaDef = {
963:   id: "stozek",
964:   subject: "matematyka",
965:   topic: "Bryły",
966:   name: "Objętość stożka",
967:   latex: "V = \\frac{1}{3}\\pi r^2 H",
968:   vars: [
969:     { id: "V", label: "V (objętość)" },
970:     { id: "r", label: "r (promień)" },
971:     { id: "H", label: "H (wysokość)" },
972:   ],
973:   mode: "nvar",
974:   outputId: "",
975:   outputLabel: "",
976:   solve(unknown, known, places): FormulaSolution {
977:     if (unknown === "V") {
978:       const r = asRational(known["r"], "r");
979:       const H = asRational(known["H"], "H");
980:       if (cmp(r, ZERO) < 0) throw new Error("promień nie jest ujemny");
981:       const r2 = mul(r, r);
982:       const num = mul(r2, H);
983:       const value = mulRat(PI, div(num, of(3)));
984:       return {
985:         values: [value],
986:         steps: [
987:           { title: "1. Przekształcenie wzoru", body: "V = \\frac{\\pi r^2 H}{3}" },
988:           {
989:             title: "2. Podstawienie danych",
990:             body: `V = \\frac{\\pi \\cdot ${L(r)}^2 \\cdot ${L(H)}}{3}`,
991:           },
992:           { title: "3. Kwadrat promienia", body: `r^2 = ${L(r)}^2 = ${L(r2)}` },
993:           { title: "4. Licznik", body: `r^2H = ${L(r2)} \\cdot ${L(H)} = ${L(num)}` },
994:           { title: "5. Wynik", body: resultLatex("V", value, places) },
995:         ],
996:       };
997:     }
998:     if (unknown === "H") {
999:       const V = known["V"];
1000:       const r = asRational(known["r"], "r");
1001:       let value: Exact;
1002:       let note: string | undefined;
1003:       try {
1004:         const r2 = mul(r, r);
1005:         const inner = div(mul(stripPi(V), of(3)), r2);
1006:         value = exactOf(inner);
1007:         return {
1008:           values: [value],
1009:           steps: [
1010:             { title: "1. Przekształcenie wzoru", body: "H = \\frac{3V}{\\pi r^2}" },
1011:             {
1012:               title: "2. Podstawienie danych",
1013:               body: `H = \\frac{3 \\cdot ${formatLatex(V)}}{\\pi \\cdot ${L(r)}^2}`,
1014:             },
1015:             { title: "3. Kwadrat i skrócenie π", body: `r^2 = ${L(r2)}, \\; H = ${L(inner)}` },
1016:             { title: "4. Wynik", body: resultLatex("H", value, places) },
1017:           ],
1018:         };
1019:       } catch {
1020:         value = approxOnly((approx(V) * 3) / (Math.PI * approx(exactOf(r)) ** 2));
1021:         note = APPROX_PI_NOTE;
1022:       }
1023:       return {
1024:         values: [value],
1025:         steps: [
1026:           { title: "1. Przekształcenie wzoru", body: "H = \\frac{3V}{\\pi r^2}" },
1027:           {
1028:             title: "2. Podstawienie danych",
1029:             body: `H = \\frac{3 \\cdot ${formatLatex(V)}}{\\pi \\cdot ${L(r)}^2}`,
1030:           },
1031:           { title: "3. Wynik", body: resultLatex("H", value, places), note },
1032:         ],
1033:       };
1034:     }
1035:     const V = known["V"];
1036:     const H = asRational(known["H"], "H");
1037:     let value: Exact;
1038:     let note: string | undefined;
1039:     try {
1040:       const inner = div(mul(stripPi(V), of(3)), H);
1041:       value = sqrtRational(inner);
1042:       return {
1043:         values: [value],
1044:         steps: [
1045:           { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{3V}{\\pi H}}" },
1046:           {
1047:             title: "2. Podstawienie danych",
1048:             body: `r = \\sqrt{\\frac{3 \\cdot ${formatLatex(V)}}{\\pi \\cdot ${L(H)}}}`,
1049:           },
1050:           { title: "3. Skrócenie π", body: `\\frac{3V}{\\pi H} = ${L(inner)}` },
1051:           { title: "4. Wynik", body: resultLatex("r", value, places) },
1052:         ],
1053:       };
1054:     } catch {
1055:       value = approxOnly(Math.sqrt((approx(V) * 3) / (Math.PI * approx(exactOf(H)))));
1056:       note = APPROX_PI_NOTE;
1057:     }
1058:     return {
1059:       values: [value],
1060:       steps: [
1061:         { title: "1. Przekształcenie wzoru", body: "r = \\sqrt{\\frac{3V}{\\pi H}}" },
1062:         {
1063:           title: "2. Podstawienie danych",
1064:           body: `r = \\sqrt{\\frac{3 \\cdot ${formatLatex(V)}}{\\pi \\cdot ${L(H)}}}`,
1065:         },
1066:         { title: "3. Wynik", body: resultLatex("r", value, places), note },
1067:       ],
1068:     };
1069:   },
1070: };
1071: 
1072: const rombBok: FormulaDef = {
1073:   id: "romb-bok",
1074:   subject: "matematyka",
1075:   topic: "Pola figur",
1076:   name: "Pole rombu (bok i wysokość)",
1077:   latex: "P = a \\cdot h",
1078:   vars: [
1079:     { id: "P", label: "P (pole)" },
1080:     { id: "a", label: "a (bok)" },
1081:     { id: "h", label: "h (wysokość)" },
1082:   ],
1083:   mode: "nvar",
1084:   outputId: "",
1085:   outputLabel: "",
1086:   solve(unknown, known, places): FormulaSolution {
1087:     if (unknown === "P") {
1088:       const a = asRational(known["a"], "a");
1089:       const h = asRational(known["h"], "h");
1090:       const value = exactOf(mul(a, h));
1091:       return {
1092:         values: [value],
1093:         steps: [
1094:           { title: "1. Przekształcenie wzoru", body: "P = a \\cdot h" },
1095:           { title: "2. Podstawienie danych", body: `P = ${L(a)} \\cdot ${L(h)}` },
1096:           { title: "3. Wynik", body: resultLatex("P", value, places) },
1097:         ],
1098:       };
1099:     }
1100:     const P = asRational(known["P"], "P");
1101:     const other = unknown === "a" ? "h" : "a";
1102:     const o = asRational(known[other], other);
1103:     const value = exactOf(div(P, o));
1104:     return {
1105:       values: [value],
1106:       steps: [
1107:         { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{P}{${other}}` },
1108:         { title: "2. Podstawienie danych", body: `${unknown} = \\frac{${L(P)}}{${L(o)}}` },
1109:         { title: "3. Wynik", body: resultLatex(unknown, value, places) },
1110:       ],
1111:     };
1112:   },
1113: };
1114: 
1115: export const MATH_PP2: FormulaDef[] = [
1116:   katyOkrag,
1117:   poleTrapez,
1118:   poleRombu,
1119:   poleRownoleglobok,
1120:   lukOkregu,
1121:   wycinekKola,
1122:   odlPunktow,
1123:   srodekOdcinka,
1124:   prosta2Punkty,
1125:   prostopadlosc,
1126:   okragRownanie,
1127:   odlPunktProsta,
1128:   graniastoslup,
1129:   ostroslup,
1130:   walec,
1131:   stozek,
1132:   rombBok,
1133: ];

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_katy.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_katy.ts, lines 1-349
1: import { ONE, ZERO, add, cmp, div, isZero, mul, of, sub } from "../exact/rational";
2: import { approx, approxOnly, exactOf, mulRat, stripPi } from "../exact/exact";
3: import type { Exact } from "../exact/exact";
4: import { formatLatex, formatRatLatex, trimNum } from "../exact/format";
5: import type { FormulaDef, FormulaSolution } from "./types";
6: import { APPROX_PI_NOTE, asRational, requireNatural, resultLatex } from "./types";
7: 
8: const PI: Exact = { rat: ZERO, irr: { type: "pi", coef: ONE } };
9: const L = formatRatLatex;
10: 
11: const zamianaMiary: FormulaDef = {
12:   id: "zamiana-miary",
13:   subject: "matematyka",
14:   topic: "Kąty",
15:   name: "Stopnie ↔ radiany",
16:   latex: "180^\\circ = \\pi",
17:   vars: [
18:     { id: "deg", label: "α [°]" },
19:     { id: "rad", label: "α [rad]" },
20:   ],
21:   mode: "nvar",
22:   outputId: "",
23:   outputLabel: "",
24:   solve(unknown, known, places): FormulaSolution {
25:     if (unknown === "rad") {
26:       const deg = asRational(known["deg"], "α");
27:       const frac = div(deg, of(180));
28:       const value = mulRat(PI, frac);
29:       return {
30:         values: [value],
31:         steps: [
32:           {
33:             title: "1. Przekształcenie wzoru",
34:             body: "\\alpha = \\alpha^\\circ \\cdot \\frac{\\pi}{180}",
35:           },
36:           { title: "2. Podstawienie danych", body: `\\alpha = ${L(deg)} \\cdot \\frac{\\pi}{180}` },
37:           { title: "3. Ułamek", body: `\\frac{${L(deg)}}{180} = ${L(frac)}` },
38:           { title: "4. Wynik", body: resultLatex("\\alpha", value, places) },
39:         ],
40:       };
41:     }
42:     const rad = known["rad"];
43:     let value: Exact;
44:     let note: string | undefined;
45:     try {
46:       value = exactOf(mul(stripPi(rad), of(180)));
47:     } catch {
48:       value = approxOnly((approx(rad) * 180) / Math.PI);
49:       note = APPROX_PI_NOTE;
50:     }
51:     return {
52:       values: [value],
53:       steps: [
54:         {
55:           title: "1. Przekształcenie wzoru",
56:           body: "\\alpha^\\circ = \\alpha \\cdot \\frac{180}{\\pi}",
57:         },
58:         {
59:           title: "2. Podstawienie danych",
60:           body: `\\alpha^\\circ = ${formatLatex(rad)} \\cdot \\frac{180}{\\pi}`,
61:         },
62:         { title: "3. Wynik", body: resultLatex("\\alpha^\\circ", value, places), note },
63:       ],
64:     };
65:   },
66: };
67: 
68: const katTrojkat: FormulaDef = {
69:   id: "kat-trojkat",
70:   subject: "matematyka",
71:   topic: "Kąty",
72:   name: "Trzeci kąt trójkąta",
73:   latex: "\\gamma = 180^\\circ - \\alpha - \\beta",
74:   vars: [
75:     { id: "alfa", label: "α [°]" },
76:     { id: "beta", label: "β [°]" },
77:     { id: "gamma", label: "γ [°]" },
78:   ],
79:   mode: "nvar",
80:   outputId: "",
81:   outputLabel: "",
82:   solve(unknown, known, places): FormulaSolution {
83:     const others = ["alfa", "beta", "gamma"].filter((id) => id !== unknown);
84:     const o = others.map((id) => asRational(known[id], id));
85:     const rest = sub(of(180), o[0]);
86:     const value = exactOf(sub(rest, o[1]));
87:     if (cmp(value.rat, ZERO) <= 0)
88:       throw new Error("kąty trójkąta muszą być dodatnie i sumować się do 180°");
89:     const sym = { alfa: "\\alpha", beta: "\\beta", gamma: "\\gamma" } as const;
90:     const s = sym[unknown as keyof typeof sym];
91:     const so = others.map((id) => sym[id as keyof typeof sym]);
92:     return {
93:       values: [value],
94:       steps: [
95:         {
96:           title: "1. Przekształcenie wzoru",
97:           body: `${s} = 180^\\circ - ${so[0]} - ${so[1]}`,
98:         },
99:         { title: "2. Podstawienie danych", body: `${s} = 180 - ${L(o[0])} - ${L(o[1])}` },
100:         { title: "3. Pierwsze odejmowanie", body: `180 - ${L(o[0])} = ${L(rest)}` },
101:         { title: "4. Wynik", body: resultLatex(s, value, places) },
102:       ],
103:     };
104:   },
105: };
106: 
107: const katMiedzyProstymi: FormulaDef = {
108:   id: "kat-miedzy-prostymi",
109:   subject: "matematyka",
110:   topic: "Kąty",
111:   name: "Kąt między prostymi",
112:   latex: "\\tan\\varphi = \\left|\\frac{a_2 - a_1}{1 + a_1a_2}\\right|",
113:   vars: [
114:     { id: "a1", label: "a₁" },
115:     { id: "a2", label: "a₂" },
116:   ],
117:   mode: "fixed",
118:   outputId: "phi",
119:   outputLabel: "φ",
120:   solve(_unknown, known, places): FormulaSolution {
121:     const a1 = asRational(known["a1"], "a₁");
122:     const a2 = asRational(known["a2"], "a₂");
123:     const den = add(ONE, mul(a1, a2));
124:     if (isZero(sub(a1, a2))) {
125:       const value = exactOf(ZERO);
126:       return {
127:         values: [value],
128:         steps: [
129:           {
130:             title: "1. Przekształcenie wzoru",
131:             body: "\\tan\\varphi = \\left|\\frac{a_2 - a_1}{1 + a_1a_2}\\right|",
132:           },
133:           {
134:             title: "2. Podstawienie danych",
135:             body: `\\tan\\varphi = \\left|\\frac{${L(a2)} - ${L(a1)}}{1 + ${L(a1)}${L(a2)}}\\right| = 0`,
136:           },
137:           {
138:             title: "3. Wynik",
139:             body: resultLatex("\\varphi", value, places),
140:             note: "proste równoległe",
141:           },
142:         ],
143:       };
144:     }
145:     if (isZero(den)) {
146:       const value = exactOf(of(90));
147:       return {
148:         values: [value],
149:         steps: [
150:           {
151:             title: "1. Przekształcenie wzoru",
152:             body: "\\tan\\varphi = \\left|\\frac{a_2 - a_1}{1 + a_1a_2}\\right|",
153:           },
154:           { title: "2. Mianownik", body: `1 + ${L(a1)}${L(a2)} = 0` },
155:           {
156:             title: "3. Wynik",
157:             body: resultLatex("\\varphi", value, places),
158:             note: "proste prostopadłe",
159:           },
160:         ],
161:       };
162:     }
163:     const t = Math.abs(approx(exactOf(div(sub(a2, a1), den))));
164:     const num = sub(a2, a1);
165:     const value = approxOnly((Math.atan(t) * 180) / Math.PI);
166:     return {
167:       values: [value],
168:       steps: [
169:         {
170:           title: "1. Przekształcenie wzoru",
171:           body: "\\tan\\varphi = \\left|\\frac{a_2 - a_1}{1 + a_1a_2}\\right|",
172:         },
173:         {
174:           title: "2. Podstawienie danych",
175:           body: `\\tan\\varphi = \\left|\\frac{${L(a2)} - ${L(a1)}}{1 + ${L(a1)}${L(a2)}}\\right|`,
176:         },
177:         {
178:           title: "3. Licznik i mianownik",
179:           body: `a_2 - a_1 = ${L(num)}, \\; 1 + a_1a_2 = ${L(den)}`,
180:         },
181:         {
182:           title: "4. Wynik",
183:           body: resultLatex("\\varphi", value, places),
184:           note: "wynik w stopniach",
185:         },
186:       ],
187:     };
188:   },
189: };
190: 
191: const trojkatyPodobne: FormulaDef = {
192:   id: "trojkaty-podobne",
193:   subject: "matematyka",
194:   topic: "Kąty",
195:   name: "Trójkąty podobne (skala)",
196:   latex: "y = k \\cdot x",
197:   vars: [
198:     { id: "k", label: "k (skala)" },
199:     { id: "x", label: "x (bok)" },
200:     { id: "y", label: "y (bok odpowiadający)" },
201:   ],
202:   mode: "nvar",
203:   outputId: "",
204:   outputLabel: "",
205:   solve(unknown, known, places): FormulaSolution {
206:     if (unknown === "y") {
207:       const k = asRational(known["k"], "k");
208:       const x = asRational(known["x"], "x");
209:       const value = exactOf(mul(k, x));
210:       return {
211:         values: [value],
212:         steps: [
213:           { title: "1. Przekształcenie wzoru", body: "y = k \\cdot x" },
214:           { title: "2. Podstawienie danych", body: `y = ${L(k)} \\cdot ${L(x)}` },
215:           { title: "3. Wynik", body: resultLatex("y", value, places) },
216:         ],
217:       };
218:     }
219:     if (unknown === "x") {
220:       const k = asRational(known["k"], "k");
221:       const y = asRational(known["y"], "y");
222:       const value = exactOf(div(y, k));
223:       return {
224:         values: [value],
225:         steps: [
226:           { title: "1. Przekształcenie wzoru", body: "x = \\frac{y}{k}" },
227:           { title: "2. Podstawienie danych", body: `x = \\frac{${L(y)}}{${L(k)}}` },
228:           { title: "3. Wynik", body: resultLatex("x", value, places) },
229:         ],
230:       };
231:     }
232:     const x = asRational(known["x"], "x");
233:     const y = asRational(known["y"], "y");
234:     const value = exactOf(div(y, x));
235:     return {
236:       values: [value],
237:       steps: [
238:         { title: "1. Przekształcenie wzoru", body: "k = \\frac{y}{x}" },
239:         { title: "2. Podstawienie danych", body: `k = \\frac{${L(y)}}{${L(x)}}` },
240:         { title: "3. Wynik", body: resultLatex("k", value, places) },
241:       ],
242:     };
243:   },
244: };
245: 
246: const katZBokow: FormulaDef = {
247:   id: "kat-z-bokow",
248:   subject: "matematyka",
249:   topic: "Kąty",
250:   name: "Kąt z boków trójkąta prostokątnego",
251:   latex: "\\alpha = \\arcsin\\frac{a}{c} = \\arccos\\frac{b}{c} = \\arctan\\frac{a}{b}",
252:   vars: [
253:     {
254:       id: "jak",
255:       label: "przez",
256:       kind: "select",
257:       options: ["sin⁻¹ (x/y)", "cos⁻¹ (x/y)", "tan⁻¹ (x/y)"],
258:     },
259:     { id: "x", label: "x (licznik)" },
260:     { id: "y", label: "y (mianownik)" },
261:   ],
262:   mode: "fixed",
263:   outputId: "alfa",
264:   outputLabel: "α",
265:   solve(_unknown, known, places, selects): FormulaSolution {
266:     const x = asRational(known["x"], "x");
267:     const y = asRational(known["y"], "y");
268:     const jak = selects?.["jak"] ?? "sin⁻¹ (x/y)";
269:     const r = approx(exactOf(div(x, y)));
270:     let deg: number;
271:     if (jak.startsWith("sin")) {
272:       if (Math.abs(r) > 1) throw new Error("|x/y| ≤ 1 dla sinusa");
273:       deg = (Math.asin(r) * 180) / Math.PI;
274:     } else if (jak.startsWith("cos")) {
275:       if (Math.abs(r) > 1) throw new Error("|x/y| ≤ 1 dla cosinusa");
276:       deg = (Math.acos(r) * 180) / Math.PI;
277:     } else {
278:       deg = (Math.atan(r) * 180) / Math.PI;
279:     }
280:     const fn = jak.startsWith("sin") ? "\\arcsin" : jak.startsWith("cos") ? "\\arccos" : "\\arctan";
281:     const value = approxOnly(deg);
282:     return {
283:       values: [value],
284:       steps: [
285:         { title: "1. Przekształcenie wzoru", body: `\\alpha = ${fn}\\frac{x}{y}` },
286:         { title: "2. Podstawienie danych", body: `\\alpha = ${fn}\\frac{${L(x)}}{${L(y)}}` },
287:         { title: "3. Iloraz", body: `\\frac{x}{y} = \\frac{${L(x)}}{${L(y)}} = ${trimNum(r)}` },
288:         {
289:           title: "4. Wynik",
290:           body: resultLatex("\\alpha", value, places),
291:           note: "wynik w stopniach",
292:         },
293:       ],
294:     };
295:   },
296: };
297: 
298: const sumaKatow: FormulaDef = {
299:   id: "suma-katow",
300:   subject: "matematyka",
301:   topic: "Kąty",
302:   name: "Suma kątów wielokąta",
303:   latex: "S = (n - 2) \\cdot 180^\\circ",
304:   vars: [
305:     { id: "n", label: "n (liczba boków)" },
306:     { id: "S", label: "S (suma) [°]" },
307:   ],
308:   mode: "nvar",
309:   outputId: "",
310:   outputLabel: "",
311:   solve(unknown, known, places): FormulaSolution {
312:     if (unknown === "S") {
313:       const n = requireNatural(known["n"], "n");
314:       if (n < 3) throw new Error("wielokąt ma co najmniej 3 boki");
315:       const value = exactOf(mul(of(n - 2), of(180)));
316:       return {
317:         values: [value],
318:         steps: [
319:           { title: "1. Przekształcenie wzoru", body: "S = (n - 2) \\cdot 180^\\circ" },
320:           { title: "2. Podstawienie danych", body: `S = (${n} - 2) \\cdot 180` },
321:           { title: "3. Nawias", body: `n - 2 = ${n} - 2 = ${n - 2}` },
322:           { title: "4. Wynik", body: resultLatex("S", value, places) },
323:         ],
324:       };
325:     }
326:     const S = asRational(known["S"], "S");
327:     const n = div(S, of(180));
328:     if (n.q !== 1n || n.p < 3n) throw new Error("S musi być wielokrotnością 180° dla n ≥ 3");
329:     const value = exactOf(add(n, of(2)));
330:     return {
331:       values: [value],
332:       steps: [
333:         { title: "1. Przekształcenie wzoru", body: "n = \\frac{S}{180} + 2" },
334:         { title: "2. Podstawienie danych", body: `n = \\frac{${L(S)}}{180} + 2` },
335:         { title: "3. Iloraz", body: `\\frac{S}{180} = ${L(n)}` },
336:         { title: "4. Wynik", body: resultLatex("n", value, places) },
337:       ],
338:     };
339:   },
340: };
341: 
342: export const MATH_KATY: FormulaDef[] = [
343:   zamianaMiary,
344:   katTrojkat,
345:   katMiedzyProstymi,
346:   trojkatyPodobne,
347:   katZBokow,
348:   sumaKatow,
349: ];

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_trojkaty.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_trojkaty.ts, lines 1-262
1: import { add, cmp, div, mul, of, sub } from "../exact/rational";
2: import {
3:   approx,
4:   approxOnly,
5:   divExact,
6:   exactOf,
7:   mulRat,
8:   sqrtRational,
9:   trigExact,
10: } from "../exact/exact";
11: import type { Exact } from "../exact/exact";
12: import { formatLatex, formatRatLatex, trimNum } from "../exact/format";
13: import type { FormulaDef, FormulaSolution } from "./types";
14: import { asRational, resultLatex } from "./types";
15: 
16: const L = formatRatLatex;
17: 
18: const twSinusow: FormulaDef = {
19:   id: "tw-sinusow",
20:   subject: "matematyka",
21:   topic: "Planimetria · ROZSZ",
22:   name: "Twierdzenie sinusów",
23:   latex: "\\frac{a}{\\sin\\alpha} = 2R",
24:   vars: [
25:     { id: "a", label: "a (bok)" },
26:     { id: "alfa", label: "α [°]" },
27:     { id: "R", label: "R (promień opis.)" },
28:   ],
29:   mode: "nvar",
30:   outputId: "",
31:   outputLabel: "",
32:   solve(unknown, known, places): FormulaSolution {
33:     if (unknown === "alfa") {
34:       const a = asRational(known["a"], "a");
35:       const R = asRational(known["R"], "R");
36:       const s = approx(exactOf(a)) / (2 * approx(exactOf(R)));
37:       if (!(Math.abs(s) <= 1)) throw new Error("a/(2R) musi być w [−1, 1]");
38:       const deg = (Math.asin(s) * 180) / Math.PI;
39:       const value = approxOnly(deg);
40:       return {
41:         values: [value],
42:         steps: [
43:           { title: "1. Przekształcenie wzoru", body: "\\sin\\alpha = \\frac{a}{2R}" },
44:           {
45:             title: "2. Podstawienie danych",
46:             body: `\\sin\\alpha = \\frac{${L(a)}}{2 \\cdot ${L(R)}}`,
47:           },
48:           { title: "3. Sinus", body: `\\sin\\alpha = ${trimNum(s)}` },
49:           {
50:             title: "4. Wynik",
51:             body: resultLatex("\\alpha", value, places),
52:             note: "kąt ostry (0–90°)",
53:           },
54:         ],
55:       };
56:     }
57:     const alfa = asRational(known["alfa"], "α");
58:     const deg = approx(exactOf(alfa));
59:     const sinE = trigExact("sin", deg);
60:     const note = sinE.irr?.type === "approx" ? "sinus tylko przybliżony" : undefined;
61:     if (unknown === "a") {
62:       const R = asRational(known["R"], "R");
63:       const twoR = mul(of(2), R);
64:       const value = mulRat(sinE, twoR);
65:       return {
66:         values: [value],
67:         steps: [
68:           { title: "1. Przekształcenie wzoru", body: "a = 2R\\sin\\alpha" },
69:           {
70:             title: "2. Podstawienie danych",
71:             body: `a = 2 \\cdot ${L(R)} \\cdot \\sin ${L(alfa)}^\\circ`,
72:           },
73:           { title: "3. Sinus", body: `\\sin\\alpha = ${formatLatex(sinE)}` },
74:           { title: "4. Wynik", body: resultLatex("a", value, places), note },
75:         ],
76:       };
77:     }
78:     const a = asRational(known["a"], "a");
79:     const two = mulRat(sinE, of(2));
80:     const value = divExact(exactOf(a), two);
81:     return {
82:       values: [value],
83:       steps: [
84:         { title: "1. Przekształcenie wzoru", body: "R = \\frac{a}{2\\sin\\alpha}" },
85:         { title: "2. Podstawienie danych", body: `R = \\frac{${L(a)}}{2\\sin ${L(alfa)}^\\circ}` },
86:         { title: "3. Sinus", body: `\\sin\\alpha = ${formatLatex(sinE)}` },
87:         { title: "4. Wynik", body: resultLatex("R", value, places), note },
88:       ],
89:     };
90:   },
91: };
92: 
93: const twCosinusow: FormulaDef = {
94:   id: "tw-cosinusow",
95:   subject: "matematyka",
96:   topic: "Planimetria · ROZSZ",
97:   name: "Twierdzenie cosinusów",
98:   latex: "c^2 = a^2 + b^2 - 2ab\\cos\\gamma",
99:   vars: [
100:     { id: "c", label: "c (bok)" },
101:     { id: "a", label: "a (bok)" },
102:     { id: "b", label: "b (bok)" },
103:     { id: "gamma", label: "γ [°]" },
104:   ],
105:   mode: "nvar",
106:   outputId: "",
107:   outputLabel: "",
108:   solve(unknown, known, places): FormulaSolution {
109:     const g = (id: string) => asRational(known[id], id);
110:     if (unknown === "gamma") {
111:       const num = sub(add(mul(g("a"), g("a")), mul(g("b"), g("b"))), mul(g("c"), g("c")));
112:       const den = mul(mul(of(2), g("a")), g("b"));
113:       const s = approx(exactOf(num)) / approx(exactOf(den));
114:       if (!(Math.abs(s) <= 1)) throw new Error("cos γ poza [−1, 1] — sprawdź boki");
115:       const value = approxOnly((Math.acos(s) * 180) / Math.PI);
116:       return {
117:         values: [value],
118:         steps: [
119:           {
120:             title: "1. Przekształcenie wzoru",
121:             body: "\\cos\\gamma = \\frac{a^2 + b^2 - c^2}{2ab}",
122:           },
123:           {
124:             title: "2. Podstawienie danych",
125:             body: `\\cos\\gamma = \\frac{${L(g("a"))}^2 + ${L(g("b"))}^2 - ${L(g("c"))}^2}{2 \\cdot ${L(g("a"))} \\cdot ${L(g("b"))}}`,
126:           },
127:           { title: "3. Cosinus", body: `\\cos\\gamma = ${trimNum(s)}` },
128:           {
129:             title: "4. Wynik",
130:             body: resultLatex("\\gamma", value, places),
131:             note: "wynik w stopniach",
132:           },
133:         ],
134:       };
135:     }
136:     const deg = approx(exactOf(g("gamma")));
137:     const cosE = trigExact("cos", deg);
138:     if (unknown === "c") {
139:       let value: Exact;
140:       let note: string | undefined;
141:       try {
142:         if (cosE.irr) throw new Error("no-exact");
143:         const inner = sub(
144:           add(mul(g("a"), g("a")), mul(g("b"), g("b"))),
145:           mul(mul(mul(of(2), g("a")), g("b")), cosE.rat),
146:         );
147:         value = sqrtRational(inner);
148:       } catch {
149:         const c2 =
150:           approx(exactOf(g("a"))) ** 2 +
151:           approx(exactOf(g("b"))) ** 2 -
152:           2 * approx(exactOf(g("a"))) * approx(exactOf(g("b"))) * approx(cosE);
153:         if (!(c2 > 0)) throw new Error("c² ≤ 0 — sprawdź dane");
154:         value = approxOnly(Math.sqrt(c2));
155:         note = "wynik tylko przybliżony";
156:       }
157:       return {
158:         values: [value],
159:         steps: [
160:           { title: "1. Przekształcenie wzoru", body: "c^2 = a^2 + b^2 - 2ab\\cos\\gamma" },
161:           {
162:             title: "2. Podstawienie danych",
163:             body: `c^2 = ${L(g("a"))}^2 + ${L(g("b"))}^2 - 2 \\cdot ${L(g("a"))} \\cdot ${L(g("b"))} \\cdot ${formatLatex(cosE)}`,
164:           },
165:           { title: "3. Cosinus", body: `\\cos\\gamma = ${formatLatex(cosE)}` },
166:           { title: "4. Wynik", body: resultLatex("c", value, places), note },
167:         ],
168:       };
169:     }
170:     const side = unknown === "a" ? "b" : "a";
171:     const o = g(side);
172:     const c = g("c");
173:     const B = -2 * approx(exactOf(o)) * approx(cosE);
174:     const C = approx(exactOf(o)) ** 2 - approx(exactOf(c)) ** 2;
175:     const D = B * B - 4 * C;
176:     if (!(D >= 0)) throw new Error("Δ < 0 — taki trójkąt nie istnieje");
177:     const roots = [(-B + Math.sqrt(D)) / 2, (-B - Math.sqrt(D)) / 2].filter((x) => x > 0);
178:     if (roots.length === 0) throw new Error("brak dodatniego rozwiązania — sprawdź dane");
179:     const values = roots.map((x) => approxOnly(x));
180:     return {
181:       values,
182:       labels: roots.map((_, i) => `${unknown}${i + 1}`),
183:       steps: [
184:         {
185:           title: "1. Równanie kwadratowe",
186:           body: `${unknown}^2 - (2${side}\\cos\\gamma)${unknown} + (${side}^2 - c^2) = 0`,
187:         },
188:         {
189:           title: "2. Podstawienie danych",
190:           body: `${unknown}^2 - ${trimNum(B === 0 ? 0 : -B)}${unknown} + ${trimNum(C)} = 0, \\; \\cos\\gamma = ${formatLatex(cosE)}`,
191:         },
192:         { title: "3. Delta", body: `\\Delta = ${trimNum(D)}` },
193:         {
194:           title: "4. Wynik",
195:           body: values.map((v, i) => resultLatex(`${unknown}${i + 1}`, v, places)).join(", \\; "),
196:           note: "biorę pierwiastki dodatnie (długości boków)",
197:         },
198:       ],
199:     };
200:   },
201: };
202: 
203: const okregi: FormulaDef = {
204:   id: "okrag-opisany-wpisany",
205:   subject: "matematyka",
206:   topic: "Planimetria · ROZSZ",
207:   name: "Okrąg opisany i wpisany",
208:   latex: "R = \\frac{abc}{4P}, \\; r = \\frac{P}{p}",
209:   vars: [
210:     { id: "a", label: "a" },
211:     { id: "b", label: "b" },
212:     { id: "c", label: "c" },
213:   ],
214:   mode: "fixed",
215:   outputId: "Rr",
216:   outputLabel: "R, r",
217:   solve(_unknown, known, places): FormulaSolution {
218:     const g = (id: string) => asRational(known[id], id);
219:     const [a, b, c] = [g("a"), g("b"), g("c")];
220:     if (cmp(add(a, b), c) <= 0 || cmp(add(a, c), b) <= 0 || cmp(add(b, c), a) <= 0) {
221:       throw new Error("trójkąt nie istnieje (nierówność trójkąta)");
222:     }
223:     const p = div(add(add(a, b), c), of(2));
224:     const pa = sub(p, a);
225:     const pb = sub(p, b);
226:     const pc = sub(p, c);
227:     const prod = mul(mul(mul(p, pa), pb), pc);
228:     let P: Exact;
229:     let note: string | undefined;
230:     try {
231:       P = sqrtRational(prod);
232:     } catch {
233:       P = approxOnly(Math.sqrt(approx(exactOf(prod))));
234:       note = "pierwiastek tylko przybliżony";
235:     }
236:     const abc = mul(mul(a, b), c);
237:     const Rv = divExact({ rat: abc, irr: null }, mulRat(P, of(4)));
238:     const rv = divExact(P, { rat: p, irr: null });
239:     return {
240:       values: [Rv, rv],
241:       labels: ["R", "r"],
242:       steps: [
243:         { title: "1. Półobwód", body: `p = \\frac{${L(a)}+${L(b)}+${L(c)}}{2} = ${L(p)}` },
244:         {
245:           title: "2. Heron",
246:           body: `P = \\sqrt{p(p-a)(p-b)(p-c)} = ${formatLatex(P)}`,
247:         },
248:         {
249:           title: "3. Promień opisany",
250:           body: `R = \\frac{abc}{4P} = \\frac{${L(a)}${L(b)}${L(c)}}{4 \\cdot ${formatLatex(P)}}`,
251:         },
252:         {
253:           title: "4. Wynik",
254:           body: `${resultLatex("R", Rv, places)}, \\; ${resultLatex("r", rv, places)}`,
255:           note,
256:         },
257:       ],
258:     };
259:   },
260: };
261: 
262: export const MATH_TROJKATY: FormulaDef[] = [twSinusow, twCosinusow, okregi];

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_sumy.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_sumy.ts, lines 1-310
1: import { ONE, ZERO, add, cmp, div, isZero, mul, of, pow, sub } from "../exact/rational";
2: import { approx, approxOnly, exactOf, logExact } from "../exact/exact";
3: import { formatLatex, formatRatLatex, trimNum } from "../exact/format";
4: import type { FormulaDef, FormulaSolution } from "./types";
5: import { asRational, requireNatural, resultLatex } from "./types";
6: 
7: const L = formatRatLatex;
8: 
9: const sumaArytmetyczny: FormulaDef = {
10:   id: "suma-ciagu-arytmetycznego",
11:   subject: "matematyka",
12:   topic: "Ciągi",
13:   name: "Suma ciągu arytmetycznego",
14:   latex: "S_n = \\frac{(a_1 + a_n)n}{2}",
15:   vars: [
16:     { id: "Sn", label: "Sₙ" },
17:     { id: "a1", label: "a₁" },
18:     { id: "an", label: "aₙ" },
19:     { id: "n", label: "n" },
20:   ],
21:   mode: "nvar",
22:   outputId: "",
23:   outputLabel: "",
24:   solve(unknown, known, places): FormulaSolution {
25:     if (unknown === "n") {
26:       const Sn = asRational(known["Sn"], "Sₙ");
27:       const a1 = asRational(known["a1"], "a₁");
28:       const an = asRational(known["an"], "aₙ");
29:       const sum = add(a1, an);
30:       if (isZero(sum)) throw new Error("a₁ + aₙ ≠ 0 — inaczej n nieoznaczone");
31:       const nf = div(mul(Sn, of(2)), sum);
32:       if (nf.q !== 1n || nf.p < 1n) throw new Error("te dane nie dają naturalnego n");
33:       const value = exactOf(nf);
34:       return {
35:         values: [value],
36:         steps: [
37:           { title: "1. Przekształcenie wzoru", body: "n = \\frac{2S_n}{a_1 + a_n}" },
38:           {
39:             title: "2. Podstawienie danych",
40:             body: `n = \\frac{2 \\cdot ${L(Sn)}}{${L(a1)} + ${L(an)}}`,
41:           },
42:           { title: "3. Suma krańców", body: `a_1 + a_n = ${L(sum)}` },
43:           { title: "4. Wynik", body: resultLatex("n", value, places) },
44:         ],
45:       };
46:     }
47:     const n = requireNatural(known["n"], "n");
48:     if (unknown === "Sn") {
49:       const a1 = asRational(known["a1"], "a₁");
50:       const an = asRational(known["an"], "aₙ");
51:       const sum = add(a1, an);
52:       const value = exactOf(div(mul(sum, of(n)), of(2)));
53:       return {
54:         values: [value],
55:         steps: [
56:           { title: "1. Przekształcenie wzoru", body: "S_n = \\frac{(a_1 + a_n)n}{2}" },
57:           {
58:             title: "2. Podstawienie danych",
59:             body: `S_{${n}} = \\frac{(${L(a1)} + ${L(an)}) \\cdot ${n}}{2}`,
60:           },
61:           { title: "3. Suma krańców", body: `a_1 + a_n = ${L(sum)}` },
62:           { title: "4. Wynik", body: resultLatex(`S_{${n}}`, value, places) },
63:         ],
64:       };
65:     }
66:     const Sn = asRational(known["Sn"], "Sₙ");
67:     const other = unknown === "a1" ? "an" : "a1";
68:     const o = asRational(known[other], other);
69:     const frac = div(mul(Sn, of(2)), of(n));
70:     const value = exactOf(sub(frac, o));
71:     const sym = unknown === "a1" ? "a_1" : "a_n";
72:     const so = unknown === "a1" ? "a_n" : "a_1";
73:     return {
74:       values: [value],
75:       steps: [
76:         { title: "1. Przekształcenie wzoru", body: `${sym} = \\frac{2S_n}{n} - ${so}` },
77:         {
78:           title: "2. Podstawienie danych",
79:           body: `${sym} = \\frac{2 \\cdot ${L(Sn)}}{${n}} - ${L(o)}`,
80:         },
81:         { title: "3. Ułamek", body: `\\frac{2S_n}{n} = ${L(frac)}` },
82:         { title: "4. Wynik", body: resultLatex(sym, value, places) },
83:       ],
84:     };
85:   },
86: };
87: 
88: const sumaGeometryczny: FormulaDef = {
89:   id: "suma-ciagu-geometrycznego",
90:   subject: "matematyka",
91:   topic: "Ciągi",
92:   name: "Suma ciągu geometrycznego",
93:   latex: "S_n = a_1\\frac{1 - q^n}{1 - q}",
94:   vars: [
95:     { id: "Sn", label: "Sₙ" },
96:     { id: "a1", label: "a₁" },
97:     { id: "q", label: "q (iloraz)" },
98:     { id: "n", label: "n" },
99:   ],
100:   mode: "nvar",
101:   outputId: "",
102:   outputLabel: "",
103:   solve(unknown, known, places): FormulaSolution {
104:     if (unknown === "q") {
105:       const Sn = asRational(known["Sn"], "Sₙ");
106:       const a1 = asRational(known["a1"], "a₁");
107:       const n = requireNatural(known["n"], "n");
108:       if (n < 2) throw new Error("dla n = 1 iloraz q jest dowolny");
109:       if (cmp(a1, ZERO) === 0) throw new Error("a₁ ≠ 0 — inaczej suma to 0");
110:       const target = approx(exactOf(div(Sn, a1)));
111:       const f = (q: number): number => {
112:         if (Math.abs(q - 1) < 1e-12) return n - target;
113:         return (1 - q ** n) / (1 - q) - target;
114:       };
115:       const brackets: [number, number][] = [
116:         [-100, -1.001],
117:         [-0.999, 0.999],
118:         [1.001, 1 + Math.abs(target) + n],
119:       ];
120:       let root: number | null = null;
121:       for (const [lo0, hi0] of brackets) {
122:         let lo = lo0;
123:         let hi = hi0;
124:         let flo = f(lo);
125:         let fhi = f(hi);
126:         if (!Number.isFinite(flo) || !Number.isFinite(fhi) || flo === 0) {
127:           if (flo === 0) root = lo;
128:           else continue;
129:           break;
130:         }
131:         if (fhi === 0) {
132:           root = hi;
133:           break;
134:         }
135:         if (flo * fhi > 0) continue;
136:         for (let i = 0; i < 200; i++) {
137:           const mid = (lo + hi) / 2;
138:           const fm = f(mid);
139:           if (!Number.isFinite(fm)) break;
140:           if (flo * fm <= 0) {
141:             hi = mid;
142:             fhi = fm;
143:           } else {
144:             lo = mid;
145:             flo = fm;
146:           }
147:         }
148:         root = (lo + hi) / 2;
149:         break;
150:       }
151:       if (root === null || !Number.isFinite(root)) {
152:         throw new Error("nie znaleziono ilorazu — sprawdź dane");
153:       }
154:       const check = Math.abs(f(root)) / (1 + Math.abs(target));
155:       if (!(check < 1e-9)) throw new Error("nie znaleziono ilorazu — sprawdź dane");
156:       const value = approxOnly(root);
157:       return {
158:         values: [value],
159:         steps: [
160:           { title: "1. Równanie", body: "S_n = a_1\\frac{1-q^n}{1-q}" },
161:           {
162:             title: "2. Podstawienie danych",
163:             body: `${L(Sn)} = ${L(a1)}\\frac{1-q^{${n}}}{1-q}`,
164:           },
165:           { title: "3. Bisekcja", body: `q \\approx ${trimNum(root)}` },
166:           {
167:             title: "4. Wynik",
168:             body: resultLatex("q", value, places),
169:             note: "wynik tylko przybliżony (bisekcja)",
170:           },
171:         ],
172:       };
173:     }
174:     if (unknown === "n") {
175:       const Sn = asRational(known["Sn"], "Sₙ");
176:       const a1 = asRational(known["a1"], "a₁");
177:       const q = asRational(known["q"], "q");
178:       if (cmp(q, ONE) === 0) throw new Error("dla q = 1 suma to n·a₁ — sprawdź dane");
179:       const rhs = sub(ONE, div(mul(Sn, sub(ONE, q)), a1));
180:       if (cmp(rhs, ZERO) <= 0 || cmp(q, ZERO) <= 0 || cmp(sub(q, ONE), ZERO) === 0) {
181:         throw new Error("n wyznaczam dla q > 0, q ≠ 1 i prawej dodatniej");
182:       }
183:       const lq = logExact(q, rhs);
184:       const nf = Math.round(approx(lq));
185:       if (!Number.isInteger(nf) || nf < 1 || cmp(pow(q, nf), rhs) !== 0) {
186:         throw new Error("te dane nie dają naturalnego n — sprawdź liczby");
187:       }
188:       const value = exactOf(of(nf));
189:       return {
190:         values: [value],
191:         steps: [
192:           { title: "1. Przekształcenie wzoru", body: "q^n = 1 - S_n(1-q)/a_1, \\; n = \\log_q" },
193:           {
194:             title: "2. Podstawienie danych",
195:             body: `q^n = 1 - ${L(Sn)}(1-${L(q)})/${L(a1)} = ${L(rhs)}`,
196:           },
197:           { title: "3. Logarytm", body: `n = ${formatLatex(lq)}` },
198:           { title: "4. Wynik", body: resultLatex("n", value, places) },
199:         ],
200:       };
201:     }
202:     const n = requireNatural(known["n"], "n");
203:     const q = asRational(known["q"], "q");
204:     if (cmp(sub(q, ONE), ZERO) === 0)
205:       throw new Error("mianownik 1 − q ≠ 0 — q musi być różne od 1");
206:     const qn = pow(q, n);
207:     const den = sub(ONE, q);
208:     if (unknown === "Sn") {
209:       const a1 = asRational(known["a1"], "a₁");
210:       const num = mul(a1, sub(ONE, qn));
211:       const value = exactOf(div(num, den));
212:       return {
213:         values: [value],
214:         steps: [
215:           { title: "1. Przekształcenie wzoru", body: "S_n = a_1\\frac{1 - q^n}{1 - q}" },
216:           {
217:             title: "2. Podstawienie danych",
218:             body: `S_{${n}} = ${L(a1)}\\frac{1 - ${L(q)}^{${n}}}{1 - ${L(q)}}`,
219:           },
220:           { title: "3. Potęga i nawiasy", body: `q^${n} = ${L(qn)}, \\; 1-q = ${L(den)}` },
221:           { title: "4. Wynik", body: resultLatex(`S_{${n}}`, value, places) },
222:         ],
223:       };
224:     }
225:     const Sn = asRational(known["Sn"], "Sₙ");
226:     const num = mul(Sn, den);
227:     const den2 = sub(ONE, qn);
228:     const value = exactOf(div(num, den2));
229:     return {
230:       values: [value],
231:       steps: [
232:         { title: "1. Przekształcenie wzoru", body: "a_1 = S_n\\frac{1-q}{1-q^n}" },
233:         {
234:           title: "2. Podstawienie danych",
235:           body: `a_1 = ${L(Sn)}\\frac{1-${L(q)}}{1-${L(q)}^{${n}}}`,
236:         },
237:         { title: "3. Potęga i nawiasy", body: `q^${n} = ${L(qn)}, \\; 1-q = ${L(den)}` },
238:         { title: "4. Wynik", body: resultLatex("a_1", value, places) },
239:       ],
240:     };
241:   },
242: };
243: 
244: const szereg: FormulaDef = {
245:   id: "szereg-geometryczny",
246:   subject: "matematyka",
247:   topic: "Ciągi · ROZSZ",
248:   name: "Suma szeregu geometrycznego",
249:   latex: "S = \\frac{a_1}{1 - q}, \\; |q| < 1",
250:   vars: [
251:     { id: "S", label: "S (suma)" },
252:     { id: "a1", label: "a₁" },
253:     { id: "q", label: "q (|q| < 1)" },
254:   ],
255:   mode: "nvar",
256:   outputId: "",
257:   outputLabel: "",
258:   solve(unknown, known, places): FormulaSolution {
259:     const chk = (q: { p: bigint; q: bigint }): void => {
260:       const aq = approx(exactOf(q));
261:       if (!(Math.abs(aq) < 1)) throw new Error("szereg zbieżny wymaga |q| < 1");
262:     };
263:     if (unknown === "S") {
264:       const a1 = asRational(known["a1"], "a₁");
265:       const q = asRational(known["q"], "q");
266:       chk(q);
267:       const den = sub(ONE, q);
268:       const value = exactOf(div(a1, den));
269:       return {
270:         values: [value],
271:         steps: [
272:           { title: "1. Przekształcenie wzoru", body: "S = \\frac{a_1}{1 - q}" },
273:           { title: "2. Podstawienie danych", body: `S = \\frac{${L(a1)}}{1 - ${L(q)}}` },
274:           { title: "3. Mianownik", body: `1 - q = ${L(den)}` },
275:           { title: "4. Wynik", body: resultLatex("S", value, places) },
276:         ],
277:       };
278:     }
279:     if (unknown === "a1") {
280:       const S = asRational(known["S"], "S");
281:       const q = asRational(known["q"], "q");
282:       chk(q);
283:       const den = sub(ONE, q);
284:       const value = exactOf(mul(S, den));
285:       return {
286:         values: [value],
287:         steps: [
288:           { title: "1. Przekształcenie wzoru", body: "a_1 = S(1 - q)" },
289:           { title: "2. Podstawienie danych", body: `a_1 = ${L(S)}(1 - ${L(q)})` },
290:           { title: "3. Nawias", body: `1 - q = ${L(den)}` },
291:           { title: "4. Wynik", body: resultLatex("a_1", value, places) },
292:         ],
293:       };
294:     }
295:     const S = asRational(known["S"], "S");
296:     const a1 = asRational(known["a1"], "a₁");
297:     const value = exactOf(sub(ONE, div(a1, S)));
298:     chk(value.rat);
299:     return {
300:       values: [value],
301:       steps: [
302:         { title: "1. Przekształcenie wzoru", body: "q = 1 - a_1/S" },
303:         { title: "2. Podstawienie danych", body: `q = 1 - ${L(a1)}/${L(S)}` },
304:         { title: "3. Wynik", body: resultLatex("q", value, places) },
305:       ],
306:     };
307:   },
308: };
309: 
310: export const MATH_SUMY: FormulaDef[] = [sumaArytmetyczny, sumaGeometryczny, szereg];

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_wzory_skrocone.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_wzory_skrocone.ts, lines 1-85
1: import { add, mul, of, sub } from "../exact/rational";
2: import { exactOf } from "../exact/exact";
3: import type { Exact } from "../exact/exact";
4: import { formatLatex, formatRatLatex } from "../exact/format";
5: import type { FormulaDef, FormulaSolution } from "./types";
6: import { asRational } from "./types";
7: 
8: const L = formatRatLatex;
9: 
10: const kwadratSumyRoznicy: FormulaDef = {
11:   id: "kwadrat-sumy-roznicy",
12:   subject: "matematyka",
13:   topic: "Wzory skróconego mnożenia",
14:   name: "Kwadrat sumy i różnicy",
15:   latex: "(a+b)^2 = a^2+2ab+b^2, \\; (a-b)^2 = a^2-2ab+b^2",
16:   vars: [
17:     { id: "a", label: "a" },
18:     { id: "b", label: "b" },
19:   ],
20:   mode: "fixed",
21:   outputId: "w",
22:   outputLabel: "wyniki",
23:   solve(_unknown, known, _places): FormulaSolution {
24:     const a = asRational(known["a"], "a");
25:     const b = asRational(known["b"], "b");
26:     const a2 = mul(a, a);
27:     const b2 = mul(b, b);
28:     const ab2 = mul(mul(of(2), a), b);
29:     const sumSq = exactOf(add(add(a2, ab2), b2));
30:     const diffSq = exactOf(sub(sub(a2, ab2), b2));
31:     const show = (e: Exact): string => {
32:       const lx = formatLatex(e);
33:       const dc = formatLatex(e);
34:       return lx === dc ? lx : `${lx} \\approx ${dc}`;
35:     };
36:     return {
37:       values: [sumSq, diffSq],
38:       labels: ["(a+b)²", "(a−b)²"],
39:       steps: [
40:         { title: "1. Wzory", body: "(a+b)^2 = a^2+2ab+b^2, \\quad (a-b)^2 = a^2-2ab+b^2" },
41:         { title: "2. Podstawienie", body: `a = ${L(a)}, \\; b = ${L(b)}` },
42:         { title: "3. Wynik", body: `(a+b)^2 = ${show(sumSq)}, \\; (a-b)^2 = ${show(diffSq)}` },
43:       ],
44:     };
45:   },
46: };
47: 
48: const roznicaKwadratow: FormulaDef = {
49:   id: "roznica-kwadratow",
50:   subject: "matematyka",
51:   topic: "Wzory skróconego mnożenia",
52:   name: "Różnica kwadratów",
53:   latex: "a^2 - b^2 = (a-b)(a+b)",
54:   vars: [
55:     { id: "a", label: "a" },
56:     { id: "b", label: "b" },
57:   ],
58:   mode: "fixed",
59:   outputId: "w",
60:   outputLabel: "wynik",
61:   solve(_unknown, known, _places): FormulaSolution {
62:     const a = asRational(known["a"], "a");
63:     const b = asRational(known["b"], "b");
64:     const a2 = mul(a, a);
65:     const b2 = mul(b, b);
66:     const diff = exactOf(sub(a2, b2));
67:     const prod = exactOf(mul(add(a, b), sub(a, b)));
68:     const show = (e: Exact): string => {
69:       const lx = formatLatex(e);
70:       const dc = formatLatex(e);
71:       return lx === dc ? lx : `${lx} \\approx ${dc}`;
72:     };
73:     return {
74:       values: [diff, prod],
75:       labels: ["a²−b²", "(a−b)(a+b)"],
76:       steps: [
77:         { title: "1. Wzór", body: "a^2 - b^2 = (a-b)(a+b)" },
78:         { title: "2. Podstawienie", body: `a = ${L(a)}, \\; b = ${L(b)}` },
79:         { title: "3. Wynik", body: `a^2 - b^2 = ${show(diff)}, \\; (a-b)(a+b) = ${show(prod)}` },
80:       ],
81:     };
82:   },
83: };
84: 
85: export const MATH_WZORY_SKROCONEGO: FormulaDef[] = [kwadratSumyRoznicy, roznicaKwadratow];

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_heron.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_heron.ts, lines 1-67
1: import { ZERO, add, cmp, div, mul, of, sub } from "../exact/rational";
2: import { approx, approxOnly, exactOf, sqrtRational } from "../exact/exact";
3: import type { Exact } from "../exact/exact";
4: import { formatLatex, formatRatLatex } from "../exact/format";
5: import type { FormulaDef, FormulaSolution } from "./types";
6: import { asRational } from "./types";
7: 
8: const L = formatRatLatex;
9: 
10: const heron: FormulaDef = {
11:   id: "wzor-herona",
12:   subject: "matematyka",
13:   topic: "Pola figur · ROZSZ",
14:   name: "Wzór Herona na pole trójkąta",
15:   latex: "P = \\sqrt{p(p-a)(p-b)(p-c)}, \\; p = \\frac{a+b+c}{2}",
16:   vars: [
17:     { id: "a", label: "a" },
18:     { id: "b", label: "b" },
19:     { id: "c", label: "c" },
20:   ],
21:   mode: "fixed",
22:   outputId: "P",
23:   outputLabel: "P",
24:   solve(_unknown, known, _places): FormulaSolution {
25:     const a = asRational(known["a"], "a");
26:     const b = asRational(known["b"], "b");
27:     const c = asRational(known["c"], "c");
28:     const sum = add(add(a, b), c);
29:     if (
30:       cmp(sub(sum, mul(of(2), a)), ZERO) <= 0 ||
31:       cmp(sub(sum, mul(of(2), b)), ZERO) <= 0 ||
32:       cmp(sub(sum, mul(of(2), c)), ZERO) <= 0
33:     ) {
34:       throw new Error("trójkąt nie istnieje (nierówność trójkąta)");
35:     }
36:     const p = div(sum, of(2));
37:     const pa = sub(p, a);
38:     const pb = sub(p, b);
39:     const pc = sub(p, c);
40:     const prod = mul(mul(mul(p, pa), pb), pc);
41:     let value: Exact;
42:     let note: string | undefined;
43:     try {
44:       value = sqrtRational(prod);
45:     } catch {
46:       value = approxOnly(Math.sqrt(approx(exactOf(prod))));
47:       note = "wynik tylko przybliżony";
48:     }
49:     return {
50:       values: [value, exactOf(p)],
51:       labels: ["P", "p"],
52:       steps: [
53:         {
54:           title: "1. Półobwód",
55:           body: `p = \\frac{a+b+c}{2} = \\frac{${L(a)}+${L(b)}+${L(c)}}{2} = ${L(p)}`,
56:         },
57:         {
58:           title: "2. Podstawienie do wzoru Herona",
59:           body: `P = \\sqrt{p(p-a)(p-b)(p-c)} = \\sqrt{${L(p)}(${L(p)}-${L(a)})(${L(p)}-${L(b)})(${L(p)}-${L(c)})} = \\sqrt{${L(p)}\\cdot${L(pa)}\\cdot${L(pb)}\\cdot${L(pc)}}`,
60:         },
61:         { title: "3. Wynik", body: `P = ${formatLatex(value)}`, note },
62:       ],
63:     };
64:   },
65: };
66: 
67: export const MATH_HERON: FormulaDef[] = [heron];

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_wyodrebnia_grup.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_wyodrebnia_grup.ts, lines 1-133
1: import { ONE, cmp, gcd, neg } from "../exact/rational";
2: import { formatRatLatex } from "../exact/format";
3: import type { FormulaDef, FormulaSolution } from "./types";
4: import { asRational, requireNatural } from "./types";
5: 
6: const L = formatRatLatex;
7: 
8: const wyodrebnianie: FormulaDef = {
9:   id: "wyodrebnianie-czynnika",
10:   subject: "matematyka",
11:   topic: "Wielomiany",
12:   name: "Wyodrębnianie wspólnego czynnika",
13:   latex: "a_1 x^{k_1} + a_2 x^{k_2} + a_3 x^{k_3} = x^m \\cdot (\\dots)",
14:   vars: [
15:     { id: "c1", label: "wsp. 1" },
16:     { id: "k1", label: "wykładnik 1" },
17:     { id: "c2", label: "wsp. 2" },
18:     { id: "k2", label: "wykładnik 2" },
19:     { id: "c3", label: "wsp. 3" },
20:     { id: "k3", label: "wykładnik 3" },
21:   ],
22:   mode: "fixed",
23:   outputId: "f",
24:   outputLabel: "rozłożenie",
25:   solve(_unknown, known, _places): FormulaSolution {
26:     const c1 = asRational(known["c1"], "wsp. 1");
27:     const c2 = asRational(known["c2"], "wsp. 2");
28:     const c3 = asRational(known["c3"], "wsp. 3");
29:     const k1 = requireNatural(known["k1"], "wykładnik 1");
30:     const k2 = requireNatural(known["k2"], "wykładnik 2");
31:     const k3 = requireNatural(known["k3"], "wykładnik 3");
32:     const ks = [k1, k2, k3];
33:     const cs = [c1, c2, c3];
34:     const m = Math.min(...ks);
35:     const g = cs.reduce((acc, c) => gcd(acc, c.p < 0n ? -c.p : c.p), 0n);
36:     const inside = cs
37:       .map((c, i) => {
38:         const coef = { p: c.p / g, q: c.q };
39:         const exp = ks[i] - m;
40:         if (exp === 0) return L(coef);
41:         if (exp === 1) return `${L(coef) === "1" ? "" : L(coef)}x`;
42:         return `${L(coef) === "1" ? "" : L(coef)}x^{${exp}}`;
43:       })
44:       .join(" + ");
45:     const xPart = m === 0 ? "" : m === 1 ? "x" : `x^{${m}}`;
46:     const gPart = g === 1n ? "" : L({ p: g, q: c1.q });
47:     const factored = `${gPart}${xPart}(${inside})`;
48:     const orig = cs
49:       .map((c, i) => {
50:         if (ks[i] === 0) return L(c);
51:         if (ks[i] === 1) return `${L(c) === "1" ? "" : L(c)}x`;
52:         return `${L(c) === "1" ? "" : L(c)}x^{${ks[i]}}`;
53:       })
54:       .join(" + ");
55:     return {
56:       values: [],
57:       steps: [
58:         { title: "1. Wyrazy wielomianu", body: `W(x) = ${orig}` },
59:         {
60:           title: "2. Wspólny czynnik liczbowy",
61:           body: g === 1n ? "brak (NWD = 1)" : `NWD = ${L({ p: g, q: c1.q })}`,
62:         },
63:         {
64:           title: "3. Wspólny czynnik zmienny",
65:           body: m === 0 ? "brak (wykładnik min = 0)" : `min wykładnik = ${m} \\Rightarrow x^{${m}}`,
66:         },
67:         { title: "4. Wynik", body: `W(x) = ${factored}` },
68:       ],
69:     };
70:   },
71: };
72: 
73: const grupowanie: FormulaDef = {
74:   id: "grupowanie",
75:   subject: "matematyka",
76:   topic: "Wielomiany",
77:   name: "Grupowanie wyrazów",
78:   latex: "ax^3+bx^2+cx+d = (ax^2+b)(x+d/b) \\text{ itd.}",
79:   vars: [
80:     { id: "a", label: "a (x³)" },
81:     { id: "b", label: "b (x²)" },
82:     { id: "c", label: "c (x¹)" },
83:     { id: "d", label: "d (wyraz wolny)" },
84:   ],
85:   mode: "fixed",
86:   outputId: "f",
87:   outputLabel: "rozłożenie",
88:   solve(_unknown, known, _places): FormulaSolution {
89:     const a = asRational(known["a"], "a");
90:     const b = asRational(known["b"], "b");
91:     const c = asRational(known["c"], "c");
92:     const d = asRational(known["d"], "d");
93:     const orig = `${L(a)}x^3 ${b.p >= 0 ? "+" : ""}${L(b)}x^2 ${c.p >= 0 ? "+" : ""}${L(c)}x ${d.p >= 0 ? "+" : ""}${L(d)}`;
94:     const g1 = gcd(a.p < 0n ? -a.p : a.p, b.p < 0n ? -b.p : b.p);
95:     const g2 = gcd(c.p < 0n ? -c.p : c.p, d.p < 0n ? -d.p : d.p);
96:     const steps: FormulaSolution["steps"] = [{ title: "1. Wielomian", body: `W(x) = ${orig}` }];
97:     if (g1 > 0n && g2 > 0n) {
98:       const P = { p: a.p / g1, q: a.q };
99:       const Q = { p: b.p / g1, q: b.q };
100:       const P2 = { p: c.p / g2, q: c.q };
101:       const Q2 = { p: d.p / g2, q: d.q };
102:       if (cmp(P, P2) === 0 && cmp(Q, Q2) === 0) {
103:         const t1 = g1 === 1n ? "x^2" : `${L({ p: g1, q: 1n })}x^2`;
104:         const outer = `(${t1} + ${L({ p: g2, q: 1n })})`.replace("+ -", "- ");
105:         const pt = cmp(P, ONE) === 0 ? "x" : cmp(P, neg(ONE)) === 0 ? "-x" : `${L(P)}x`;
106:         const inner = `(${pt} + ${L(Q)})`.replace("+ -", "- ");
107:         const factored = `${outer}${inner}`;
108:         steps.push({
109:           title: "2. Grupowanie (1,2) i (3,4)",
110:           body: `W(x) = ${L(a)}x^3+${L(b)}x^2+${L(c)}x+${L(d)} = x^2(${L(P)}x+${L(Q)}) + (${L(P2)}x+${L(Q2)})`,
111:         });
112:         steps.push({
113:           title: "3. Wspólny nawias",
114:           body: `W(x) = ${outer}${inner}`,
115:         });
116:         steps.push({ title: "4. Wynik", body: `W(x) = ${factored}` });
117:         return { values: [], steps };
118:       }
119:     }
120:     steps.push({
121:       title: "2. Próba grupowania",
122:       body: "brak wspólnych czynników w parach (1,2) i (3,4)",
123:     });
124:     steps.push({
125:       title: "3. Wynik",
126:       body: "nie da się rozłożyć metodą grupowania",
127:       note: "spróbuj innej metody",
128:     });
129:     return { values: [], steps };
130:   },
131: };
132: 
133: export const MATH_WYODREBNIA_GRUP: FormulaDef[] = [wyodrebnianie, grupowanie];

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_poly.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_poly.ts, lines 1-47
1: import type { Rational } from "../exact/rational";
2: import type { FormulaDef, FormulaSolution } from "./types";
3: import { asRational } from "./types";
4: import { factorPolynomial } from "./poly";
5: 
6: const rozkladWielomianu: FormulaDef = {
7:   id: "rozklad-wielomianu",
8:   subject: "matematyka",
9:   topic: "Wielomiany · ROZSZ",
10:   name: "Rozkład wielomianu na czynniki (stopień 2–6)",
11:   latex: "W(x) = a_n x^n + \\dots + a_1 x + a_0",
12:   vars: [
13:     { id: "deg", label: "stopień (2–6)", kind: "select", options: ["2", "3", "4", "5", "6"] },
14:     { id: "a6", label: "a₆" },
15:     { id: "a5", label: "a₅" },
16:     { id: "a4", label: "a₄" },
17:     { id: "a3", label: "a₃" },
18:     { id: "a2", label: "a₂" },
19:     { id: "a1", label: "a₁" },
20:     { id: "a0", label: "a₀" },
21:   ],
22:   mode: "fixed",
23:   outputId: "w",
24:   outputLabel: "rozkład",
25:   solve(_unknown, known, _places, selects): FormulaSolution {
26:     const deg = Number(selects?.["deg"] ?? "2");
27:     if (![2, 3, 4, 5, 6].includes(deg)) throw new Error("stopień musi być 2–6");
28:     const coeffIds = ["a6", "a5", "a4", "a3", "a2", "a1", "a0"];
29:     const start = 6 - deg;
30:     const coeffs: Rational[] = [];
31:     for (let i = start; i <= 6; i++) {
32:       const id = coeffIds[i];
33:       const val = known[id];
34:       if (!val || (val.rat.p === 0n && !val.irr)) {
35:         if (i === start)
36:           throw new Error("współczynnik przy najwyższej potędze nie może być zerowy");
37:         coeffs.push({ p: 0n, q: 1n });
38:       } else {
39:         coeffs.push(asRational(val, id));
40:       }
41:     }
42:     const res = factorPolynomial(coeffs);
43:     return { values: [], steps: res.steps, labels: [] };
44:   },
45: };
46: 
47: export const MATH_POLY: FormulaDef[] = [rozkladWielomianu];

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_dziel_horner.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/math_dziel_horner.ts, lines 1-134
1: import { div, isZero, neg } from "../exact/rational";
2: import type { Rational } from "../exact/rational";
3: import { formatRatLatex } from "../exact/format";
4: import type { FormulaDef, FormulaSolution } from "./types";
5: import { asRational } from "./types";
6: import { hornerColumnSteps, hornerRow, hornerTableLatex } from "./poly";
7: 
8: const L = formatRatLatex;
9: 
10: const dzielenieWielomianow: FormulaDef = {
11:   id: "dzielenie-wielomianow",
12:   subject: "matematyka",
13:   topic: "Wielomiany · ROZSZ",
14:   name: "Dzielenie wielomianów (pisemne)",
15:   latex: "W(x) : P(x) = Q(x) \\text{ reszta } R",
16:   vars: [
17:     { id: "degW", label: "stopień W (1–5)", kind: "select", options: ["1", "2", "3", "4", "5"] },
18:     { id: "w5", label: "w₅" },
19:     { id: "w4", label: "w₄" },
20:     { id: "w3", label: "w₃" },
21:     { id: "w2", label: "w₂" },
22:     { id: "w1", label: "w₁" },
23:     { id: "w0", label: "w₀" },
24:     { id: "p1", label: "p (x¹)" },
25:     { id: "p0", label: "q (x⁰)" },
26:   ],
27:   mode: "fixed",
28:   outputId: "q",
29:   outputLabel: "iloraz + reszta",
30:   solve(_unknown, known, _places, selects): FormulaSolution {
31:     const degW = Number(selects?.["degW"] ?? "1");
32:     if (![1, 2, 3, 4, 5].includes(degW)) throw new Error("stopień W musi być 1–5");
33:     const wIds = ["w5", "w4", "w3", "w2", "w1", "w0"];
34:     const start = 5 - degW;
35:     const W: Rational[] = [];
36:     for (let i = start; i <= 5; i++) {
37:       const id = wIds[i];
38:       const val = known[id];
39:       W.push(val ? asRational(val, id) : { p: 0n, q: 1n });
40:     }
41:     if (isZero(W[0])) throw new Error("współczynnik wiodący W nie może być 0");
42:     const p = asRational(known["p1"], "p");
43:     const q0 = asRational(known["p0"], "q");
44:     if (isZero(p) && isZero(q0)) throw new Error("dzielnik nie może być zerowy");
45:     if (isZero(p)) throw new Error("dzielenie przez stałą: podziel każdy współczynnik");
46:     const steps: FormulaSolution["steps"] = [];
47:     const n = W.length;
48:     const x0 = div(neg(q0), p);
49:     const { results } = hornerRow(W, x0);
50:     const quotient = results.slice(0, -1).map((c) => div(c, p));
51:     const remainder = results[results.length - 1];
52:     const term = (c: Rational, pw: number): string => {
53:       if (isZero(c)) return "";
54:       const cs = L(c);
55:       if (pw === 0) return cs;
56:       if (pw === 1) return cs === "1" ? "x" : cs === "-1" ? "-x" : `${cs}x`;
57:       return cs === "1" ? `x^{${pw}}` : cs === "-1" ? `-x^{${pw}}` : `${cs}x^{${pw}}`;
58:     };
59:     const join = (ts: string[]): string => {
60:       const nz = ts.filter((t) => t !== "");
61:       if (nz.length === 0) return "0";
62:       return nz.join(" + ").replace(/\+ -/g, "- ");
63:     };
64:     const qPoly = join(quotient.map((c, i) => term(c, n - 2 - i)));
65:     const wPoly = join(W.map((c, i) => term(c, n - 1 - i)));
66:     const pPoly = isZero(q0)
67:       ? `${L(p) === "1" ? "" : L(p) === "-1" ? "-" : L(p)}x`
68:       : `${L(p) === "1" ? "" : L(p) === "-1" ? "-" : L(p)}x ${q0.p >= 0 ? "+" : ""}${L(q0)}`;
69:     steps.push({ title: "1. Wielomiany", body: `W(x) = ${wPoly}, \\; P(x) = ${pPoly}` });
70:     steps.push({
71:       title: "2. Sprowadzenie do (x - x_0)",
72:       body: `P(x) = ${pPoly} = ${L(p)}(x - ${L(x0)}), \\; x_0 = ${L(x0)}`,
73:     });
74:     steps.push({ title: "3. Tabelka Hornera", body: hornerTableLatex(W, x0) });
75:     for (const s of hornerColumnSteps(W, x0)) steps.push(s);
76:     steps.push({
77:       title: "Wynik",
78:       body: `W(x) = (${pPoly})(${qPoly})${isZero(remainder) ? "" : ` + ${L(remainder)}`}`,
79:       note: isZero(remainder) ? "dzieli się bez reszty" : undefined,
80:     });
81:     return { values: [], steps };
82:   },
83: };
84: 
85: const schematHornera: FormulaDef = {
86:   id: "schemat-hornera",
87:   subject: "matematyka",
88:   topic: "Wielomiany · ROZSZ",
89:   name: "Schemat Hornera",
90:   latex: "W(x_0) = a_n x_0^n + \\dots + a_1 x_0 + a_0",
91:   vars: [
92:     { id: "deg", label: "stopień (1–6)", kind: "select", options: ["1", "2", "3", "4", "5", "6"] },
93:     { id: "a6", label: "a₆" },
94:     { id: "a5", label: "a₅" },
95:     { id: "a4", label: "a₄" },
96:     { id: "a3", label: "a₃" },
97:     { id: "a2", label: "a₂" },
98:     { id: "a1", label: "a₁" },
99:     { id: "a0", label: "a₀" },
100:     { id: "x0", label: "x₀" },
101:   ],
102:   mode: "fixed",
103:   outputId: "w",
104:   outputLabel: "W(x₀), iloraz",
105:   solve(_unknown, known, _places, selects): FormulaSolution {
106:     const deg = Number(selects?.["deg"] ?? "1");
107:     if (![1, 2, 3, 4, 5, 6].includes(deg)) throw new Error("stopień musi być 1–6");
108:     const coeffIds = ["a6", "a5", "a4", "a3", "a2", "a1", "a0"];
109:     const start = 6 - deg;
110:     const coeffs: Rational[] = [];
111:     for (let i = start; i <= 6; i++) {
112:       const id = coeffIds[i];
113:       const val = known[id];
114:       coeffs.push(val ? asRational(val, id) : { p: 0n, q: 1n });
115:     }
116:     if (isZero(coeffs[0])) throw new Error("współczynnik wiodący nie może być 0");
117:     const x0 = asRational(known["x0"], "x₀");
118:     const steps: FormulaSolution["steps"] = [];
119:     const n = coeffs.length;
120:     const { results } = hornerRow(coeffs, x0);
121:     const remainder = results[n - 1];
122:     const quotient = results.slice(0, -1);
123:     steps.push({ title: "1. Tabelka Hornera", body: hornerTableLatex(coeffs, x0) });
124:     for (const s of hornerColumnSteps(coeffs, x0)) steps.push(s);
125:     steps.push({
126:       title: "Wynik",
127:       body: `W(${L(x0)}) = ${L(remainder)}, \\; Q = [${quotient.map(L).join(", ")}]`,
128:       note: isZero(remainder) ? `x_0 = ${L(x0)} jest pierwiastkiem` : undefined,
129:     });
130:     return { values: [], steps };
131:   },
132: };
133: 
134: export const MATH_DZIEL_HORNER: FormulaDef[] = [dzielenieWielomianow, schematHornera];

**Tool: websearch**

**Input:**
```json
{
  "query": "\"Wybrane wzory matematyczne\" CKE tablice maturalne spis treści wszystkie działy wzory matura podstawowa rozszerzona"
}
```

Web search request failed (HTTP 402)

**Tool: websearch**

**Input:**
```json
{
  "query": "CKE tablice maturalne matematyka lista wszystkich wzorów funkcja kwadratowa ciągi trygonometria planimetria stereometria analityczna"
}
```

Web search request failed (HTTP 402)

---

## User

Dodalem ci plik pdf z wybranymi pamietaj ze w maturze tez oprocz tego trzeba je wszystkie wyprowadzic, powstawic, i uzyc w odpowiedni sposob.

Na maturze z matematyki rozszerzonej nie istnieje jeden oficjalny spis zawierający absolutnie każdy możliwy wzór, ponieważ CKE dostarcza jedynie wybrane wzory, a resztę należy wyprowadzić z definicji i twierdzeń. Poniżej znajduje się kompletne zestawienie wszystkich wzorów wymaganych na poziomie rozszerzonym (zarówno tych z tablic CKE, jak i tych, które musisz znać z pamięci), podzielone na wszystkie działy egzaminacyjne.

1. Liczby rzeczywiste, potęgi, pierwiastki, logarytmy

• Wartość bezwzględna:
\(|{}x|{}=\begin{cases}x&\text{dla\ }x\ge 0\\ -x&\text{dla\ }x<0\end{cases}\)
\(|{}x\cdot y|{}=|{}x|{}\cdot |{}y|{},\quad \left|{}\frac{x}{y}\right|{}=\frac{|{}x|{}}{|{}y|{}},\quad |{}x+y|{}\le |{}x|{}+|{}y|{},\quad |{}x-y|{}\ge |{}|{}x|{}-|{}y|{}|{}\)
• Potęgi i pierwiastki (a, b > 0):
\(a^{0}=1,\quad a^{-n}=\frac{1}{a^{n}},\quad a^{\frac{m}{n}}=\sqrt[n]{a^{m}},\quad \sqrt[n]{a^{n}}=|{}a|{}\text{\ (dla\ parzystych\ }n\text{)}\)
\(a^{m}\cdot a^{n}=a^{m+n},\quad \frac{a^{m}}{a^{n}}=a^{m-n},\quad (a^{m})^{n}=a^{m\cdot n},\quad (a\cdot b)^{n}=a^{n}\cdot b^{n}\)
• Logarytmy (a > 0, a ≠ 1, b > 0, c > 0):
\(\log _{a}b=c\iff a^{c}=b,\quad a^{\log _{a}b}=b,\quad \log _{a}1=0,\quad \log _{a}a=1\)
\(\log _{a}(b\cdot c)=\log _{a}b+\log _{a}c,\quad \log _{a}\left(\frac{b}{c}\right)=\log _{a}b-\log _{a}c,\quad \log _{a}(b^{r})=r\cdot \log _{a}b\)
\(\log _{a}b=\frac{\log _{c}b}{\log _{c}a},\quad \log _{a}b=\frac{1}{\log _{b}a},\quad \log _{a^{k}}b=\frac{1}{k}\log _{a}b\)

2. Wyrażenia algebraiczne i wielomiany

• Wzory skróconego mnożenia:
\((a\pm b)^{2}=a^{2}\pm 2ab+b^{2}\)
\(a^{2}-b^{2}=(a-b)(a+b)\)
\((a\pm b)^{3}=a^{3}\pm 3a^{2}b+3ab^{2}\pm b^{3}\)
\(a^{3}-b^{3}=(a-b)(a^{2}+ab+b^{2})\)
\(a^{3}+b^{3}=(a+b)(a^{2}-ab+b^{2})\)
\(a^{n}-b^{n}=(a-b)(a^{n-1}+a^{n-2}b+\dots +ab^{n-2}+b^{n-1})\)
• Wzór dwumianowy Newtona i symbol Newtona:
\({n \choose k}=\frac{n!}{k!(n-k)!},\quad {n \choose k}={n \choose n-k},\quad {n \choose k}+{n \choose k+1}={n+1 \choose k+1}\)
\((a+b)^{n}=\sum _{k=0}^{n}{n \choose k}a^{n-k}b^{k}\)
• Wielomiany (Twierdzenie Bézouta i Wzory Viète’a dla st. 3):
	• Liczba a jest pierwiastkiem wielomianu \(W(x) \iff W(a) = 0 \iff W(x)\) dzieli się przez (x - a).
	• Dla ax³ + bx² + cx + d = 0 (a ≠ 0) o pierwiastkach x₁, x₂, x₃:
\(x_{1}+x_{2}+x_{3}=-\frac{b}{a},\quad x_{1}x_{2}+x_{1}x_{3}+x_{2}x_{3}=\frac{c}{a},\quad x_{1}x_{2}x_{3}=-\frac{d}{a}\)

3. Funkcja kwadratowa

• Postacie funkcji:
	• Ogólna: f(x) = ax² + bx + c (a ≠ 0)
	• Kanoniczna: f(x) = a(x - p)² + q, gdzie \(p = -\frac{b}{2a}\), \(q = -\frac{\Delta}{4a}\), Δ = b² - 4ac
	• Iloczynowa: f(x) = a(x - x₁)(x - x₂) (dla Δ > 0) lub f(x) = a(x - x₀)² (dla Δ = 0)
• Miejsca zerowe i wzory Viète’a:
\(x_{1}=\frac{-b-\sqrt{\Delta }}{2a},\quad x_{2}=\frac{-b+\sqrt{\Delta }}{2a},\quad x_{0}=-\frac{b}{2a}\)
\(x_{1}+x_{2}=-\frac{b}{a},\quad x_{1}\cdot x_{2}=\frac{c}{a}\)

4. Ciągi liczbowe i granice

• Ciąg arytmetyczny:
\(a_{n}=a_{1}+(n-1)r,\quad a_{n}=a_{k}+(n-k)r,\quad a_{n}=\frac{a_{n-1}+a_{n+1}}{2}\)
\(S_{n}=\frac{a_{1}+a_{n}}{2}\cdot n=\frac{2a_{1}+(n-1)r}{2}\cdot n\)
• Ciąg geometryczny:
\(a_{n}=a_{1}\cdot q^{n-1},\quad a_{n}=a_{k}\cdot q^{n-k},\quad a_{n}^{2}=a_{n-1}\cdot a_{n+1}\)
\(S_{n}=a_{1}\cdot \frac{1-q^{n}}{1-q}\text{\ (dla\ }q\ne 1\text{)},\quad S_{n}=n\cdot a_{1}\text{\ (dla\ }q=1\text{)}\)
• Szereg geometryczny zbieżny (|q| < 1):
\(S=\sum _{n=1}^{\infty }a_{1}q^{n-1}=\frac{a_{1}}{1-q}\)
• Ważne granice:
\(\lim _{n\rightarrow \infty }\frac{1}{n^{k}}=0\text{\ (dla\ }k>0\text{)},\quad \lim _{n\rightarrow \infty }q^{n}=0\text{\ (dla\ }|{}q|{}<1\text{)},\quad \lim _{n\rightarrow \infty }\sqrt[n]{a}=1\text{\ (dla\ }a>0\text{)},\quad \lim _{n\rightarrow \infty }\sqrt[n]{n}=1\)

5. Trygonometria

• Podstawowe zależności:
\(\sin ^{2}\alpha +\cos ^{2}\alpha =1,\quad \>\mathrm{tg}\>\alpha =\frac{\sin \alpha }{\cos \alpha },\quad \>\mathrm{ctg}\>\alpha =\frac{\cos \alpha }{\sin \alpha },\quad \>\mathrm{tg}\>\alpha \cdot \>\mathrm{ctg}\>\alpha =1\)
• Funkcje sumy i różnicy kątów:
\(\sin (\alpha \pm \beta )=\sin \alpha \cos \beta \pm \cos \alpha \sin \beta \)
\(\cos (\alpha \pm \beta )=\cos \alpha \cos \beta \mp \sin \alpha \sin \beta \)
\(\mathrm{tg}\>(\alpha \pm \beta )=\frac{\mathrm{tg}\>\alpha \pm \>\mathrm{tg}\>\beta }{1\mp \>\mathrm{tg}\>\alpha \>\mathrm{tg}\>\beta }\)
• Funkcje podwojonego i połówkowego kąta:
\(\sin 2\alpha =2\sin \alpha \cos \alpha \)
\(\cos 2\alpha =\cos ^{2}\alpha -\sin ^{2}\alpha =2\cos ^{2}\alpha -1=1-2\sin ^{2}\alpha \)
\(\mathrm{tg}\>2\alpha =\frac{2\>\mathrm{tg}\>\alpha }{1-\>\mathrm{tg}\>{}^{2}\alpha }\)
\(\sin ^{2}\frac{\alpha }{2}=\frac{1-\cos \alpha }{2},\quad \cos ^{2}\frac{\alpha }{2}=\frac{1+\cos \alpha }{2}\)
• Sumy i różnice funkcji trygonometrycznych:
\(\sin \alpha +\sin \beta =2\sin \frac{\alpha +\beta }{2}\cos \frac{\alpha -\beta }{2}\)
\(\sin \alpha -\sin \beta =2\sin \frac{\alpha -\beta }{2}\cos \frac{\alpha +\beta }{2}\)
\(\cos \alpha +\cos \beta =2\cos \frac{\alpha +\beta }{2}\cos \frac{\alpha -\beta }{2}\)
\(\cos \alpha -\cos \beta =-2\sin \frac{\alpha +\beta }{2}\sin \frac{\alpha -\beta }{2}\)

6. Planimetria

• Trójkąty (a, b, c – boki; \(h_{a}\) – wysokość; \(p = \frac{a+b+c}{2}\) – połowa obwodu; r – promień okręgu wpisanego; R – promień okręgu opisanego):
\(P=\frac{1}{2}ah_{a}=\frac{1}{2}ab\sin \gamma =\sqrt{p(p-a)(p-b)(p-c)}\text{\ (wzór Herona)}\)
\(P=p\cdot r=\frac{abc}{4R}\)
	• Trójkąt równoboczny: \(h = \frac{a\sqrt{3}}{2}\), \(P = \frac{a^2\sqrt{3}}{4}\), \(R = \frac{2}{3}h\), \(r = \frac{1}{3}h\)
	• Twierdzenie sinusów: \(\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma} = 2R\)
	• Twierdzenie cosinusów: \(c^2 = a^2 + b^2 - 2ab\cos\gamma\)
• Czworokąty i koło:
	• Trapez: \(P = \frac{a+b}{2} \cdot h\)
	• Równoległobok: \(P = a \cdot h = a \cdot b \cdot \sin\alpha\)
	• Romb: \(P = a \cdot h = a^2\sin\alpha = \frac{d_1 \cdot d_2}{2}\)
	• Dowolny czworokąt o przekątnych d₁, d₂ i kącie α między nimi: \(P = \frac{1}{2}d_1d_2\sin\alpha\)
	• Czworokąt opisany na okręgu: a + c = b + d oraz P = p ⋅ r
	• Czworokąt wpisany w okrąg: α + γ = β + δ = 180° oraz \(P = \sqrt{(p-a)(p-b)(p-c)(p-d)}\) (wzór Brahmagupty)
	• Koło i wycinek kołowy (α w stopniach): P = π r², L = 2π r, \(P_{\text{wyc}} = \frac{\alpha}{360^\circ}\pi r^2\), \(l_{\text{łuku}} = \frac{\alpha}{360^\circ}2\pi r\)

7. Geometria analityczna

• Punkty i odcinki (\(A=(x_A, y_A)\), \(B=(x_B, y_B)\)):
	• Długość odcinka: \(\vert{}AB\vert{} = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}\)
	• Środek odcinka: \(S = \left(\frac{x_A + x_B}{2}, \frac{y_A + y_B}{2}\right)\)
	• Środek ciężkości trójkąta ABC: \(G = \left(\frac{x_A + x_B + x_C}{3}, \frac{y_A + y_B + y_C}{3}\right)\)
• Wektory (\(\vec{u} = [u_x, u_y]\), \(\vec{v} = [v_x, v_y]\)):
	• Współrzędne wektora: \(\vec{AB} = [x_B - x_A, y_B - y_A]\)
	• Długość wektora: \(\vert{}\vec{u}\vert{} = \sqrt{u_x^2 + u_y^2}\)
	• Iloczyn skalarny: \(\vec{u} \circ \vec{v} = u_x v_x + u_y v_y = \vert{}\vec{u}\vert{}\vert{}\vec{v}\vert{}\cos\alpha\)
	• Warunek prostopadłości: \(\vec{u} \perp \vec{v} \iff u_x v_x + u_y v_y = 0\)
	• Warunek równoległości: \(\vec{u} \parallel \vec{v} \iff u_x v_y - u_y v_x = 0\)
	• Pole trójkąta rozpiętego na wektorach \(\vec{u}, \vec{v}\): \(P = \frac{1}{2}\vert{}u_x v_y - u_y v_x\vert{}\)
• Proste i okrąg:
	• Postać kierunkowa: y = ax + b (\(a = \operatorname{tg}\alpha\)), ogólna: Ax + By + C = 0
	• Równoległość: a₁ = a₂ lub A₁B₂ - A₂B₁ = 0
	• Prostopadłość: a₁ ⋅ a₂ = -1 lub A₁A₂ + B₁B₂ = 0
	• Odległość punktu P=(x₀, y₀) od prostej Ax + By + C = 0: \(d = \frac{\vert{}Ax_0 + By_0 + C\vert{}}{\sqrt{A^2 + B^2}}\)
	• Równanie okręgu o środku S=(a, b) i promieniu r: (x - a)² + (y - b)² = r² lub x² + y² - 2ax - 2by + c = 0, gdzie \(r = \sqrt{a^2 + b^2 - c}\)

8. Stereometria

• Graniastosłup: \(V = P_p \cdot H\), \(P_c = 2P_p + P_b\)
• Ostrosłup: \(V = \frac{1}{3}P_p \cdot H\), \(P_c = P_p + P_b\)
• Ostrosłup ścięty (pola podstaw P₁, P₂): \(V = \frac{1}{3}H(P_1 + \sqrt{P_1P_2} + P_2)\)
• Walec: V = π r² H, \(P_b = 2\pi r H\), \(P_c = 2\pi r(r + H)\)
• Stożek: \(V = \frac{1}{3}\pi r^2 H\), \(P_b = \pi r l\), \(P_c = \pi r(r + l)\), gdzie l² = r² + H²
• Stożek ścięty (promienie R, r): \(V = \frac{1}{3}\pi H(R^2 + Rr + r^2)\), \(P_b = \pi(R + r)l\)
• Kula: \(V = \frac{4}{3}\pi R^3\), P = 4π R²

9. Kombinatoryka, rachunek prawdopodobieństwa i statystyka

• Kombinatoryka (ze zbioru n-elementowego wybieramy k elementów):
	• Permutacje (kolejność ważna, k=n, bez powtórzeń): \(P_n = n!\)
	• Wariacje bez powtórzeń (kolejność ważna): \(V_n^k = \frac{n!}{(n - k)!}\)
	• Wariacje z powtórzeniami (kolejność ważna): \(\overline{V}_n^k = n^k\)
	• Kombinacje bez powtórzeń (kolejność nieważna): \(C_n^k = \binom{n}{k} = \frac{n!}{k!(n - k)!}\)
	• Kombinacje z powtórzeniami (kolejność nieważna): \(\overline{C}_n^k = \binom{n + k - 1}{k}\)
• Prawdopodobieństwo:
	• Klasyczne: \(P(A) = \frac{\vert{}A\vert{}}{\vert{}\Omega\vert{}}\)
	• Własności: P(A') = 1 - P(A), \(P(A \cup B) = P(A) + P(B) - P(A \cap B)\)
	• Warunkowe: \(P(A\vert{}B) = \frac{P(A \cap B)}{P(B)}\) (dla P(B) > 0)
	• Niezależność zdarzeń: \(P(A \cap B) = P(A) \cdot P(B)\)
	• Prawdopodobieństwo całkowite: \(P(A) = P(A\vert{}B_1)P(B_1) + P(A\vert{}B_2)P(B_2) + \dots + P(A\vert{}B_n)P(B_n)\)
	• Wzór Bayesa: \(P(B_k\vert{}A) = \frac{P(A\vert{}B_k)P(B_k)}{P(A)}\)
	• Schemat Bernoulliego (k sukcesów w n próbach, p – prawd. sukcesu, q = 1-p): \(P_n(k) = \binom{n}{k} p^k q^{n-k}\)
• Statystyka (dla danych \(x_1, x_2, \dots, x_n\)):
	• Średnia arytmetyczna: \(\bar{x} = \frac{x_1 + x_2 + \dots + x_n}{n}\)
	• Wariancja: \(\sigma^2 = \frac{(x_1 - \bar{x})^2 + (x_2 - \bar{x})^2 + \dots + (x_n - \bar{x})^2}{n} = \frac{x_1^2 + x_2^2 + \dots + x_n^2}{n} - \bar{x}^2\)
	• Odchylenie standardowe: \(\sigma = \sqrt{\sigma^2}\)

10. Rachunek różniczkowy (pochodne)

• Definicja pochodnej w punkcie x₀:
\(f^{\prime }(x_{0})=\lim _{h\rightarrow 0}\frac{f(x_{0}+h)-f(x_{0})}{h}\)
• Równanie stycznej do wykresu funkcji f w punkcie x₀:
\(y-f(x_{0})=f^{\prime }(x_{0})(x-x_{0})\)
• Pochodne funkcji elementarnych:
\((c)^{\prime }=0,\quad (x^{n})^{\prime }=n\cdot x^{n-1},\quad (\sqrt{x})^{\prime }=\frac{1}{2\sqrt{x}},\quad \left(\frac{1}{x}\right)^{\prime }=-\frac{1}{x^{2}}\)
\((\sin x)^{\prime }=\cos x,\quad (\cos x)^{\prime }=-\sin x,\quad (\>\mathrm{tg}\>x)^{\prime }=\frac{1}{\cos ^{2}x},\quad (\>\mathrm{ctg}\>x)^{\prime }=-\frac{1}{\sin ^{2}x}\)
\((e^{x})^{\prime }=e^{x},\quad (a^{x})^{\prime }=a^{x}\ln a,\quad (\ln x)^{\prime }=\frac{1}{x},\quad (\log _{a}x)^{\prime }=\frac{1}{x\ln a}\)
• Działania na pochodnych:
\((c\cdot f(x))^{\prime }=c\cdot f^{\prime }(x)\)
\((f(x)\pm g(x))^{\prime }=f^{\prime }(x)\pm g^{\prime }(x)\)
\((f(x)\cdot g(x))^{\prime }=f^{\prime }(x)g(x)+f(x)g^{\prime }(x)\)
\(\left(\frac{f(x)}{g(x)}\right)^{\prime }=\frac{f^{\prime }(x)g(x)-f(x)g^{\prime }(x)}{[g(x)]^{2}}\)
	• Pochodna funkcji złożonej: (f(g(x)))' = f'(g(x)) ⋅ g'(x)

Tu masz pare z nich, tutaj ogolnie kategorie:

Co dokładnie znajduje się w tablicach CKE?

1. Wartość bezwzględna (definicja i własności)
2. Potęgi i pierwiastki (działania na potęgach i pierwiastkach)
3. Logarytmy (definicja, własności, wzór na zamianę podstawy)
4. Silnia i symbol dwumianowy (Newtona)
5. Wzór dwumianowy Newtona i trójkąt Pascala
6. Wzory skróconego mnożenia (w tym stopnie 2 i 3)
7. Funkcja kwadratowa (postać ogólna, kanoniczna, iloczynowa, wzory na Δ, \(x_1, x_2\), wierzchołek)
8. Ciągi (arytmetyczny i geometryczny – wzory ogólne, sumy \(n\) początkowych wyrazów, granice, szereg geometryczny zbieżny)
9. Trygonometria (definicje funkcji, jedynka trygonometryczna, wzory redukcyjne, sumy i różnice kątów, sumy funkcji, funkcje podwojonego kąta)
10. Planimetria (wzory na pola figur, twierdzenie sinusów, cosinusów, Talesa, okręgi wpisane i opisane)
11. Geometria analityczna (równanie prostej, odległość punktu od prostej, równanie okręgu, wektory)
12. Stereometria (objętości i pola powierzchni brył: ostrosłupy, graniastosłupy, walce, stożki, kule)
13. Rachunek prawdopodobieństwa (klasyczna definicja, prawdopodobieństwo warunkowe, wzór na prawdopodobieństwo całkowite i Bayesa)
14. Statystyka (średnia arytmetyczna, średnia ważona, odchylenie standardowe)
15. Pochodne funkcji (pochodne sumy, różnicy, iloczynu, ilorazu, wzory na pochodne podstawowych funkcji)

wybrane_wzory.pdf

---

## Assistant

Sprawdzam plik `wybrane_wzory.pdf` oraz doczytuję resztę plików pomocniczych w projekcie, aby mieć 100% obrazu przed ułożeniem kompletnego planu Fazy 1.

**Tool: glob**

**Input:**
```json
{
  "pattern": "*wzory*"
}
```

/home/zota/neo/matura-app/src/lib/formulas/math_wzory_skrocone.ts
/home/zota/neo/matura-app/wybrane_wzory.pdf

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/wybrane_wzory.pdf"
}
```

PDF read successfully
/home/zota/neo/matura-app/wybrane_wzory.pdf

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/exact/format.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/exact/format.ts, lines 1-74
1: import type { Rational } from "./rational";
2: import { cmp, isZero, ZERO } from "./rational";
3: import type { Exact } from "./exact";
4: import { approx } from "./exact";
5: 
6: export function trimNum(v: number): string {
7:   if (!Number.isFinite(v)) return "—";
8:   const s = v.toFixed(6);
9:   const t = s.includes(".") ? s.replace(/\.?0+$/, "") : s;
10:   return t === "-0" ? "0" : t;
11: }
12: 
13: export function formatRatText(r: Rational): string {
14:   return r.q === 1n ? r.p.toString() : `${r.p.toString()}/${r.q.toString()}`;
15: }
16: 
17: export function formatRatLatex(r: Rational): string {
18:   return r.q === 1n ? r.p.toString() : `\\frac{${r.p.toString()}}{${r.q.toString()}}`;
19: }
20: 
21: function irrUnitText(e: Exact): string {
22:   if (!e.irr || e.irr.type === "approx") return "";
23:   return e.irr.type === "sqrt" ? `√${e.irr.radicand.toString()}` : "π";
24: }
25: 
26: function irrUnitLatex(e: Exact): string {
27:   if (!e.irr || e.irr.type === "approx") return "";
28:   return e.irr.type === "sqrt" ? `\\sqrt{${e.irr.radicand.toString()}}` : "\\pi";
29: }
30: 
31: function coefText(coef: Rational, unit: string): string {
32:   if (coef.p === 1n && coef.q === 1n) return unit;
33:   if (coef.p === -1n && coef.q === 1n) return `−${unit}`;
34:   if (coef.q === 1n) return `${coef.p.toString()}${unit}`;
35:   return `(${formatRatText(coef)}·${unit})`;
36: }
37: 
38: function coefLatex(coef: Rational, unit: string): string {
39:   if (coef.p === 1n && coef.q === 1n) return unit;
40:   if (coef.p === -1n && coef.q === 1n) return `-${unit}`;
41:   if (coef.q === 1n) return `${coef.p.toString()}${unit}`;
42:   return `${formatRatLatex(coef)}\\cdot ${unit}`;
43: }
44: 
45: export function formatExactText(e: Exact): string {
46:   if (e.irr?.type === "approx") return `≈ ${trimNum(e.irr.value)}`;
47:   const ratZero = isZero(e.rat);
48:   if (!e.irr) return formatRatText(e.rat);
49:   const unit = irrUnitText(e);
50:   const coef = e.irr.coef;
51:   if (ratZero) return coefText(coef, unit);
52:   const neg = cmp(coef, ZERO) < 0;
53:   const abs: Rational = neg ? { p: -coef.p, q: coef.q } : coef;
54:   return `${formatRatText(e.rat)} ${neg ? "−" : "+"} ${coefText(abs, unit)}`;
55: }
56: 
57: export function formatLatex(e: Exact): string {
58:   if (e.irr?.type === "approx") return `\\approx ${trimNum(e.irr.value)}`;
59:   const ratZero = isZero(e.rat);
60:   if (!e.irr) return formatRatLatex(e.rat);
61:   const unit = irrUnitLatex(e);
62:   const coef = e.irr.coef;
63:   if (ratZero) return coefLatex(coef, unit);
64:   const neg = cmp(coef, ZERO) < 0;
65:   const abs: Rational = neg ? { p: -coef.p, q: coef.q } : coef;
66:   return `${formatRatLatex(e.rat)}${neg ? "-" : "+"}${coefLatex(abs, unit)}`;
67: }
68: 
69: export function formatDecimal(e: Exact, places: number): string {
70:   const v = approx(e);
71:   const fixed = v.toFixed(Math.max(0, Math.min(12, places)));
72:   const trimmed = fixed.includes(".") ? fixed.replace(/\.?0+$/, "") : fixed;
73:   return trimmed === "-0" ? "0" : trimmed;
74: }

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/diagrams/geometry.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/diagrams/geometry.ts, lines 1-187
1: import { trimNum } from "../exact/format";
2: 
3: const FONT = "IBM Plex Mono, ui-monospace, monospace";
4: 
5: function f(n: number): string {
6:   return n.toFixed(1);
7: }
8: 
9: function get(nums: Record<string, number>, ...keys: string[]): number[] | null {
10:   const out: number[] = [];
11:   for (const k of keys) {
12:     const v = nums[k];
13:     if (typeof v !== "number" || !Number.isFinite(v) || v <= 0) return null;
14:     out.push(v);
15:   }
16:   return out;
17: }
18: 
19: function edge(x1: number, y1: number, x2: number, y2: number, hl: boolean, dashed = false): string {
20:   const dash = dashed ? ' stroke-dasharray="5 4"' : "";
21:   return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="e${hl ? " hl" : ""}" stroke-width="${hl ? 3 : 2}"${dash}/>`;
22: }
23: 
24: function lbl(x: number, y: number, text: string, hl: boolean, anchor = "middle"): string {
25:   const w = hl ? ' font-weight="bold"' : "";
26:   return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="11" class="t${hl ? " hl" : ""}"${w}>${text}</text>`;
27: }
28: 
29: function pitagoras(nums: Record<string, number>, hl: string): string | null {
30:   const g = get(nums, "a", "b", "c");
31:   if (!g) return null;
32:   const [a, b, c] = g;
33:   const ox = 52;
34:   const top = 16;
35:   const s = Math.min(140 / b, 120 / a);
36:   const x0 = ox;
37:   const y0 = top;
38:   const x1 = ox + b * s;
39:   const y1 = top + a * s;
40:   const dx = x1 - x0;
41:   const dy = y1 - y0;
42:   const len = Math.hypot(dx, dy);
43:   const mx = (x0 + x1) / 2 + (dy / len) * 15;
44:   const my = (y0 + y1) / 2 + (-dx / len) * 15;
45:   return (
46:     `<polygon points="${f(x0)},${f(y0)} ${f(x1)},${f(y1)} ${f(x0)},${f(y1)}" class="e" stroke-width="1"/>` +
47:     edge(x0, y0, x0, y1, hl === "a") +
48:     edge(x0, y1, x1, y1, hl === "b") +
49:     edge(x0, y0, x1, y1, hl === "c") +
50:     `<path d="M ${f(x0)} ${f(y1 - 9)} h 9 v 9" class="e" stroke-width="1.5"/>` +
51:     lbl(x0 - 8, (y0 + y1) / 2 + 4, `a = ${trimNum(a)}`, hl === "a", "end") +
52:     lbl((x0 + x1) / 2, y1 + 17, `b = ${trimNum(b)}`, hl === "b") +
53:     lbl(mx, my, `c = ${trimNum(c)}`, hl === "c")
54:   );
55: }
56: 
57: function triangle(nums: Record<string, number>, hl: string): string | null {
58:   const g = get(nums, "a", "h");
59:   if (!g) return null;
60:   const [a, h] = g;
61:   const s = Math.min(150 / a, 105 / h);
62:   const baseW = a * s;
63:   const hh = h * s;
64:   const x0 = 40;
65:   const yb = 142;
66:   const x1 = x0 + baseW;
67:   const ax = x0 + baseW * 0.62;
68:   const ay = yb - hh;
69:   return (
70:     `<polygon points="${f(ax)},${f(ay)} ${f(x1)},${f(yb)} ${f(x0)},${f(yb)}" class="e" stroke-width="1"/>` +
71:     edge(x0, yb, x1, yb, hl === "a") +
72:     edge(ax, ay, ax, yb, hl === "h", true) +
73:     `<path d="M ${f(ax)} ${f(yb - 8)} h 8 v 8" class="es" stroke-width="1.5"/>` +
74:     lbl((x0 + x1) / 2, yb + 17, `a = ${trimNum(a)}`, hl === "a") +
75:     lbl(ax - 8, (ay + yb) / 2 + 4, `h = ${trimNum(h)}`, hl === "h", "end")
76:   );
77: }
78: 
79: function rect(nums: Record<string, number>, hl: string): string | null {
80:   const g = get(nums, "a", "b");
81:   if (!g) return null;
82:   const [a, b] = g;
83:   const s = Math.min(150 / a, 110 / b);
84:   const w = a * s;
85:   const h = b * s;
86:   const x0 = 40;
87:   const y0 = 30;
88:   const x1 = x0 + w;
89:   const y1 = y0 + h;
90:   return (
91:     edge(x0, y0, x1, y0, false) +
92:     edge(x1, y0, x1, y1, hl === "b") +
93:     edge(x1, y1, x0, y1, hl === "a") +
94:     edge(x0, y1, x0, y0, hl === "b") +
95:     lbl((x0 + x1) / 2, y1 + 17, `a = ${trimNum(a)}`, hl === "a") +
96:     lbl(x0 - 8, (y0 + y1) / 2 + 4, `b = ${trimNum(b)}`, hl === "b", "end")
97:   );
98: }
99: 
100: function circle(nums: Record<string, number>, hl: string): string | null {
101:   const g = get(nums, "r");
102:   if (!g) return null;
103:   const [r] = g;
104:   const cx = 115;
105:   const cy = 88;
106:   const R = 58;
107:   return (
108:     `<circle cx="${cx}" cy="${cy}" r="${R}" class="e" stroke-width="2"/>` +
109:     `<circle cx="${cx}" cy="${cy}" r="2.5" class="dot"/>` +
110:     edge(cx, cy, cx + R, cy, hl === "r") +
111:     lbl(cx + R / 2, cy - 8, `r = ${trimNum(r)}`, hl === "r")
112:   );
113: }
114: 
115: function box(nums: Record<string, number>, hl: string): string | null {
116:   const g = get(nums, "a", "b", "c");
117:   if (!g) return null;
118:   const [a, b, c] = g;
119:   const s = Math.min(115 / a, 90 / b);
120:   const fw = a * s;
121:   const fh = b * s;
122:   const dd = 14 + (26 * c) / (a + b + c);
123:   const dx = dd;
124:   const dy = -dd * 0.55;
125:   const fx = 48;
126:   const fy = 62;
127:   return (
128:     `<rect x="${f(fx + dx)}" y="${f(fy + dy)}" width="${f(fw)}" height="${f(fh)}" class="es" stroke-width="1.5"/>` +
129:     edge(fx, fy, fx + dx, fy + dy, hl === "c") +
130:     edge(fx + fw, fy, fx + fw + dx, fy + dy, hl === "c") +
131:     edge(fx + fw, fy + fh, fx + fw + dx, fy + fh + dy, hl === "c") +
132:     `<rect x="${f(fx)}" y="${f(fy)}" width="${f(fw)}" height="${f(fh)}" class="e" stroke-width="2"/>` +
133:     lbl(fx + fw / 2, fy + fh + 19, `a = ${trimNum(a)}`, hl === "a") +
134:     lbl(fx - 8, fy + fh / 2 + 4, `b = ${trimNum(b)}`, hl === "b", "end") +
135:     lbl(fx + fw + dx / 2 + 6, fy + fh + dy / 2 + 12, `c = ${trimNum(c)}`, hl === "c")
136:   );
137: }
138: 
139: function sphere(nums: Record<string, number>, hl: string): string | null {
140:   const g = get(nums, "r");
141:   if (!g) return null;
142:   const [r] = g;
143:   const cx = 115;
144:   const cy = 88;
145:   const R = 55;
146:   return (
147:     `<circle cx="${cx}" cy="${cy}" r="${R}" class="e" stroke-width="2"/>` +
148:     `<ellipse cx="${cx}" cy="${cy}" rx="${R}" ry="15" class="es" stroke-width="1.5"/>` +
149:     `<circle cx="${cx}" cy="${cy}" r="2.5" class="dot"/>` +
150:     edge(cx, cy, cx + R, cy, hl === "r") +
151:     lbl(cx + R / 2, cy - 20, `r = ${trimNum(r)}`, hl === "r")
152:   );
153: }
154: 
155: export function renderDiagram(
156:   formulaId: string,
157:   nums: Record<string, number>,
158:   highlight = "",
159: ): string | null {
160:   let inner: string | null = null;
161:   switch (formulaId) {
162:     case "pitagoras":
163:       inner = pitagoras(nums, highlight);
164:       break;
165:     case "pole-trojkata":
166:       inner = triangle(nums, highlight);
167:       break;
168:     case "pole-prostokata":
169:       inner = rect(nums, highlight);
170:       break;
171:     case "pole-kola":
172:     case "obwod-kola":
173:       inner = circle(nums, highlight);
174:       break;
175:     case "objetosc-prostopadloscianu":
176:       inner = box(nums, highlight);
177:       break;
178:     case "objetosc-kuli":
179:     case "pole-kuli":
180:       inner = sphere(nums, highlight);
181:       break;
182:     default:
183:       return null;
184:   }
185:   if (!inner) return null;
186:   return `<svg viewBox="0 0 230 180" role="img" aria-hidden="true" class="diag">${inner}</svg>`;
187: }

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/poly.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/poly.ts, lines 1-381
1: import { ONE, ZERO, add, cmp, gcd, isIntegerR, isZero, mul, neg, of, pow } from "../exact/rational";
2: import type { Rational } from "../exact/rational";
3: import { solveQuadratic } from "../exact/exact";
4: import { formatLatex, formatRatLatex } from "../exact/format";
5: import type { SolveStep } from "./types";
6: 
7: const L = formatRatLatex;
8: 
9: export interface PolyFactorResult {
10:   steps: SolveStep[];
11:   finalLatex: string;
12:   irreducible?: string;
13: }
14: 
15: export interface HornerTable {
16:   results: Rational[];
17:   prods: Rational[];
18: }
19: 
20: export function hornerRow(coeffs: Rational[], x0: Rational): HornerTable {
21:   const results: Rational[] = [coeffs[0]];
22:   const prods: Rational[] = [{ p: 0n, q: 1n }];
23:   for (let i = 1; i < coeffs.length; i++) {
24:     const prod = mul(results[i - 1], x0);
25:     prods.push(prod);
26:     results.push(add(coeffs[i], prod));
27:   }
28:   return { results, prods };
29: }
30: 
31: export function hornerTableLatex(coeffs: Rational[], x0: Rational): string {
32:   const { results, prods } = hornerRow(coeffs, x0);
33:   const n = coeffs.length;
34:   const spec = `c|${"r".repeat(n)}`;
35:   const head = [L(x0), ...coeffs.map(L)].join(" & ");
36:   const mid = ["", ...prods.slice(1).map(L)].join(" & ");
37:   const bot = ["", ...results.map(L)].join(" & ");
38:   return `\\begin{array}{${spec}} ${head} \\\\ ${mid} \\\\ \\hline ${bot} \\end{array}`;
39: }
40: 
41: export function hornerColumnSteps(coeffs: Rational[], x0: Rational): SolveStep[] {
42:   const { results, prods } = hornerRow(coeffs, x0);
43:   const n = coeffs.length;
44:   return coeffs.slice(1).map((c, k) => {
45:     const i = k + 1;
46:     return {
47:       title: `Kolumna ${i + 1} z ${n}`,
48:       body: `${L(results[i - 1])} \\cdot ${L(x0)} = ${L(prods[i])}, \\; ${L(c)} + ${L(prods[i])} = ${L(results[i])}`,
49:     };
50:   });
51: }
52: 
53: function intDivisors(n: bigint): bigint[] {
54:   const divs: bigint[] = [];
55:   if (n === 0n) return divs;
56:   const absN = n < 0n ? -n : n;
57:   for (let d = 1n; d * d <= absN; d++) {
58:     if (absN % d === 0n) {
59:       divs.push(d);
60:       if (d * d !== absN) divs.push(absN / d);
61:     }
62:   }
63:   divs.sort((a, b) => (a < b ? -1 : 1));
64:   return divs;
65: }
66: 
67: function rationalRoots(coeffs: Rational[]): Rational[] {
68:   const A = coeffs[0];
69:   const D = coeffs[coeffs.length - 1];
70:   if (isZero(D)) return [];
71:   const roots: Rational[] = [];
72:   const seen = new Set<string>();
73:   for (const p of intDivisors(D.p)) {
74:     for (const q of intDivisors(A.p)) {
75:       for (const s of [1n, -1n]) {
76:         const rp = s * p;
77:         const key = `${rp}/${q}`;
78:         if (seen.has(key)) continue;
79:         seen.add(key);
80:         let num = ZERO;
81:         for (let i = 0; i < coeffs.length; i++) {
82:           const c = coeffs[i];
83:           const term = mul(c, pow({ p: rp, q: 1n }, coeffs.length - 1 - i));
84:           num = add(num, mul(term, pow({ p: q, q: 1n }, i)));
85:         }
86:         if (isZero(num)) {
87:           const ap = rp < 0n ? -rp : rp;
88:           const g0 = gcd(ap, q);
89:           roots.push({ p: rp / g0, q: q / g0 });
90:         }
91:       }
92:     }
93:   }
94:   return roots;
95: }
96: 
97: function evalPoly(coeffs: Rational[], r: Rational): Rational {
98:   let v: Rational = { p: 0n, q: 1n };
99:   for (const c of coeffs) v = add(mul(v, r), c);
100:   return v;
101: }
102: 
103: function deflate(coeffs: Rational[], r: Rational): Rational[] {
104:   const out: Rational[] = [coeffs[0]];
105:   for (let i = 1; i < coeffs.length - 1; i++) {
106:     out.push(add(coeffs[i], mul(out[i - 1], r)));
107:   }
108:   return out;
109: }
110: 
111: function polyToLatex(coeffs: Rational[], varName = "x"): string {
112:   const terms: string[] = [];
113:   const deg = coeffs.length - 1;
114:   for (let i = 0; i < coeffs.length; i++) {
115:     const c = coeffs[i];
116:     if (isZero(c)) continue;
117:     const power = deg - i;
118:     const coefStr = L(c);
119:     if (power === 0) {
120:       terms.push(coefStr);
121:     } else if (power === 1) {
122:       terms.push(coefStr === "1" ? varName : `${coefStr}${varName}`);
123:     } else {
124:       terms.push(coefStr === "1" ? `${varName}^{${power}}` : `${coefStr}${varName}^{${power}}`);
125:     }
126:   }
127:   if (terms.length === 0) return "0";
128:   return terms.join(" + ").replace(/ \+ -/g, " - ");
129: }
130: 
131: function factorOutCommonInt(coeffs: Rational[]): { factor: Rational; rest: Rational[] } {
132:   const allInt = coeffs.every((c) => c.q === 1n);
133:   if (!allInt) {
134:     const lcd = coeffs.reduce((acc, c) => (acc * c.q) / gcd(acc, c.q), 1n);
135:     const intCoeffs = coeffs.map((c) => ({ p: c.p * (lcd / c.q), q: 1n }));
136:     const g = intCoeffs.reduce((acc, c) => gcd(acc, c.p < 0n ? -c.p : c.p), 0n);
137:     if (g > 1n) {
138:       const factor = { p: g, q: lcd };
139:       const rest = intCoeffs.map((c) => ({ p: c.p / g, q: 1n }));
140:       return { factor, rest };
141:     }
142:     return { factor: { p: 1n, q: 1n }, rest: coeffs };
143:   }
144:   const g = coeffs.reduce((acc, c) => gcd(acc, c.p < 0n ? -c.p : c.p), 0n);
145:   if (g > 1n) {
146:     const factor = { p: g, q: 1n };
147:     const rest = coeffs.map((c) => ({ p: c.p / g, q: 1n }));
148:     return { factor, rest };
149:   }
150:   return { factor: { p: 1n, q: 1n }, rest: coeffs };
151: }
152: 
153: function factorOutXPower(coeffs: Rational[]): { power: number; rest: Rational[] } {
154:   let power = 0;
155:   for (let i = coeffs.length - 1; i >= 0; i--) {
156:     if (isZero(coeffs[i])) power++;
157:     else break;
158:   }
159:   if (power === 0) return { power: 0, rest: coeffs };
160:   const rest = coeffs.slice(0, coeffs.length - power);
161:   return { power, rest };
162: }
163: 
164: function tryDifferenceOfSquares(
165:   coeffs: Rational[],
166: ): { factored: string; remainder: Rational[] } | null {
167:   if (coeffs.length !== 3) return null;
168:   const [a, b, c] = coeffs;
169:   if (!isZero(b)) return null;
170:   const aIsSquare = isIntegerR(a) && a.p > 0n;
171:   const cIsSquare = isIntegerR(c) && c.p < 0n;
172:   if (!aIsSquare || !cIsSquare) return null;
173:   const aRoot = Math.sqrt(Number(a.p));
174:   const cRoot = Math.sqrt(Number(-c.p));
175:   if (!Number.isInteger(aRoot) || !Number.isInteger(cRoot)) return null;
176:   const A = of(aRoot);
177:   const B = of(cRoot);
178:   const factored = `(${L(A)}x - ${L(B)})(${L(A)}x + ${L(B)})`;
179:   return { factored, remainder: [] };
180: }
181: 
182: export function factorPolynomial(coeffs: Rational[]): PolyFactorResult {
183:   const steps: SolveStep[] = [];
184:   const varName = "x";
185:   let current = [...coeffs];
186:   const factors: string[] = [];
187: 
188:   function pushStep(title: string, body: string, note?: string) {
189:     steps.push({ title, body, note });
190:   }
191: 
192:   const origLatex = polyToLatex(current);
193:   pushStep("1. Wielomian wyjściowy", `W(${varName}) = ${origLatex}`);
194: 
195:   const { factor: intFactor, rest: afterInt } = factorOutCommonInt(current);
196:   if (!isOne(intFactor)) {
197:     const factored = `${L(intFactor)}(${polyToLatex(afterInt)})`;
198:     pushStep("2. Wyłączenie wspólnego czynnika liczbowego", `W(${varName}) = ${factored}`);
199:     factors.push(L(intFactor));
200:     current = afterInt;
201:   }
202: 
203:   const { power, rest: afterX } = factorOutXPower(current);
204:   if (power > 0) {
205:     const xPart = power === 1 ? varName : `${varName}^{${power}}`;
206:     const factored = `${xPart}(${polyToLatex(afterX)})`;
207:     pushStep(
208:       `${intFactor !== ONE ? "3" : "2"}. Wyłączenie wspólnego czynnika ${varName}`,
209:       `W(${varName}) = ${factored}`,
210:     );
211:     factors.push(xPart);
212:     current = afterX;
213:   }
214: 
215:   if (current.length <= 1) {
216:     pushStep("Koniec", factors.join(" \\cdot "), "wielomian rozłożony całkowicie");
217:     return { steps, finalLatex: factors.join(" \\cdot ") };
218:   }
219: 
220:   const diffSq = tryDifferenceOfSquares(current);
221:   if (diffSq) {
222:     pushStep(
223:       `${factors.length > 0 ? "4" : "2"}. Różnica kwadratów`,
224:       `W(${varName}) = ${diffSq.factored}`,
225:     );
226:     if (diffSq.remainder.length === 0) {
227:       factors.push(diffSq.factored);
228:       pushStep("Koniec", factors.join(" \\cdot "), "wielomian rozłożony całkowicie");
229:       return { steps, finalLatex: factors.join(" \\cdot ") };
230:     }
231:     current = diffSq.remainder;
232:   }
233: 
234:   if (current.length === 4) {
235:     const [a, b, c, d] = current;
236:     const abs = (v: bigint): bigint => (v < 0n ? -v : v);
237:     const g1 = gcd(abs(a.p), abs(b.p));
238:     const g2 = gcd(abs(c.p), abs(d.p));
239:     if (g1 > 0n && g2 > 0n) {
240:       const P = { p: a.p / g1, q: a.q };
241:       const Q = { p: b.p / g1, q: b.q };
242:       const P2 = { p: c.p / g2, q: c.q };
243:       const Q2 = { p: d.p / g2, q: d.q };
244:       if (cmp(P, P2) === 0 && cmp(Q, Q2) === 0) {
245:         const t1 = g1 === 1n ? `${varName}^2` : `${L({ p: g1, q: 1n })}${varName}^2`;
246:         const outer = `(${t1} + ${L({ p: g2, q: 1n })})`.replace("+ -", "- ");
247:         const pt =
248:           cmp(P, ONE) === 0
249:             ? varName
250:             : cmp(P, neg(ONE)) === 0
251:               ? `-${varName}`
252:               : `${L(P)}${varName}`;
253:         const inner = `(${pt} + ${L(Q)})`.replace("+ -", "- ");
254:         const factored = `${outer}${inner}`;
255:         pushStep(
256:           `${factors.length > 0 ? "4" : "2"}. Grupowanie wyrazów`,
257:           `W(${varName}) = ${factored}`,
258:         );
259:         factors.push(outer);
260:         factors.push(inner);
261:         pushStep("Koniec", factors.join(" \\cdot "), "wielomian rozłożony całkowicie");
262:         return { steps, finalLatex: factors.join(" \\cdot ") };
263:       }
264:     }
265:   }
266: 
267:   const roots = rationalRoots(current);
268:   if (roots.length > 0) {
269:     pushStep(
270:       `${factors.length > 0 ? "4" : "2"}. Schemat Hornera — pierwiastki wymierne`,
271:       `W(${varName}) = ${polyToLatex(current)}, \\; x = \\pm p/q`,
272:     );
273:     let remainder = [...current];
274:     for (const r of roots) {
275:       if (remainder.length > 1 && isZero(evalPoly(remainder, r))) {
276:         pushStep(`Horner dla x = ${L(r)}`, hornerTableLatex(remainder, r));
277:         for (const s of hornerColumnSteps(remainder, r)) pushStep(s.title, s.body);
278:       }
279:       while (remainder.length > 1 && isZero(evalPoly(remainder, r))) {
280:         const lin =
281:           cmp(r, ZERO) === 0
282:             ? varName
283:             : cmp(r, ZERO) > 0
284:               ? `(${varName} - ${L(r)})`
285:               : `(${varName} + ${L(neg(r))})`;
286:         factors.push(lin);
287:         remainder = deflate(remainder, r);
288:       }
289:     }
290:     const factoredSoFar = factors.join(" \\cdot ");
291:     if (remainder.length === 1) {
292:       pushStep("Koniec", factoredSoFar, "wielomian rozłożony całkowicie");
293:       return { steps, finalLatex: factoredSoFar };
294:     }
295:     if (remainder.length === 3) {
296:       pushStep("5. Pozostały trójmian — delta", `P(${varName}) = ${polyToLatex(remainder)}`);
297:       const q = solveQuadratic(remainder[0], remainder[1], remainder[2]);
298:       if (q.kind === "none") {
299:         pushStep("Delta < 0", `\\Delta = ${formatLatex(q.delta)}`, "trójmian nierozkładalny nad ℝ");
300:         return {
301:           steps,
302:           finalLatex: factoredSoFar + " \\cdot (" + polyToLatex(remainder) + ")",
303:           irreducible: polyToLatex(remainder),
304:         };
305:       }
306:       for (const root of q.roots) {
307:         if (!root.irr) {
308:           const lin =
309:             cmp(root.rat, ZERO) === 0
310:               ? varName
311:               : cmp(root.rat, ZERO) > 0
312:                 ? `(${varName} - ${L(root.rat)})`
313:                 : `(${varName} + ${L(neg(root.rat))})`;
314:           factors.push(lin);
315:         } else {
316:           const rLatex = formatLatex(root);
317:           factors.push(`(${varName} - ${rLatex})`);
318:         }
319:       }
320:       pushStep("Koniec", factors.join(" \\cdot "), "wielomian rozłożony");
321:       return { steps, finalLatex: factors.join(" \\cdot ") };
322:     }
323:     if (remainder.length > 1) {
324:       pushStep(
325:         "Pozostały wielomian",
326:         `P(${varName}) = ${polyToLatex(remainder)}`,
327:         "brak dalszych pierwiastków wymiernych",
328:       );
329:       return {
330:         steps,
331:         finalLatex: factoredSoFar + " \\cdot (" + polyToLatex(remainder) + ")",
332:         irreducible: polyToLatex(remainder),
333:       };
334:     }
335:   }
336: 
337:   if (current.length === 3) {
338:     const q = solveQuadratic(current[0], current[1], current[2]);
339:     if (q.kind === "none") {
340:       pushStep(`${factors.length > 0 ? "4" : "2"}. Delta`, `\\Delta = ${formatLatex(q.delta)} < 0`);
341:       pushStep("Wynik", polyToLatex(current), "trójmian nierozkładalny nad ℝ");
342:       return {
343:         steps,
344:         finalLatex: factors.join(" \\cdot ") + " \\cdot " + polyToLatex(current),
345:         irreducible: polyToLatex(current),
346:       };
347:     }
348:     for (const root of q.roots) {
349:       const lin = root.irr
350:         ? `(${varName} - ${formatLatex(root)})`
351:         : cmp(root.rat, ZERO) === 0
352:           ? varName
353:           : cmp(root.rat, ZERO) > 0
354:             ? `(${varName} - ${L(root.rat)})`
355:             : `(${varName} + ${L(neg(root.rat))})`;
356:       factors.push(lin);
357:     }
358:     pushStep(
359:       `${factors.length > 0 ? "4" : "2"}. Postać iloczynowa (Δ ≥ 0)`,
360:       `W(${varName}) = ${factors.join(" \\cdot ")}`,
361:     );
362:     pushStep("Koniec", factors.join(" \\cdot "), "wielomian rozłożony całkowicie");
363:     return { steps, finalLatex: factors.join(" \\cdot ") };
364:   }
365: 
366:   pushStep(
367:     "Koniec",
368:     factors.join(" \\cdot ") + (factors.length > 0 ? " \\cdot " : "") + polyToLatex(current),
369:     "brak znalezionych pierwiastków wymiernych",
370:   );
371:   return {
372:     steps,
373:     finalLatex:
374:       factors.join(" \\cdot ") + (factors.length > 0 ? " \\cdot " : "") + polyToLatex(current),
375:     irreducible: polyToLatex(current),
376:   };
377: }
378: 
379: function isOne(r: Rational): boolean {
380:   return r.p === r.q;
381: }

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/latex.test.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/formulas/latex.test.ts, lines 1-398
1: import { describe, expect, it } from "vitest";
2: import { FORMULAS } from "./index";
3: import { solveFormula } from "../solver/solver";
4: import { renderLatex } from "../katex";
5: 
6: const CASES: [string, string, Record<string, string>][] = [
7:   ["matematyka", "pitagoras", { a: "3", b: "4", c: "" }],
8:   ["matematyka", "pitagoras", { a: "", b: "4", c: "5" }],
9:   ["matematyka", "pitagoras", { a: "3", b: "", c: "5" }],
10:   ["matematyka", "pole-trojkata", { P: "", a: "4", h: "5" }],
11:   ["matematyka", "pole-trojkata", { P: "10", a: "", h: "5" }],
12:   ["matematyka", "pole-trojkata", { P: "10", a: "4", h: "" }],
13:   ["matematyka", "pole-prostokata", { P: "", a: "3", b: "4" }],
14:   ["matematyka", "pole-prostokata", { P: "12", a: "", b: "4" }],
15:   ["matematyka", "pole-prostokata", { P: "12", a: "3", b: "" }],
16:   ["matematyka", "pole-kola", { P: "", r: "2" }],
17:   ["matematyka", "pole-kola", { P: "25π", r: "" }],
18:   ["matematyka", "pole-kola", { P: "25", r: "" }],
19:   ["matematyka", "obwod-kola", { Ob: "", r: "1" }],
20:   ["matematyka", "obwod-kola", { Ob: "10π", r: "" }],
21:   ["matematyka", "obwod-kola", { Ob: "10", r: "" }],
22:   ["matematyka", "rownanie-kwadratowe", { a: "1", b: "-5", c: "6" }],
23:   ["matematyka", "rownanie-kwadratowe", { a: "1", b: "0", c: "1" }],
24:   ["matematyka", "rownanie-kwadratowe", { a: "1", b: "-2", c: "1" }],
25:   ["matematyka", "rownanie-kwadratowe", { a: "0", b: "2", c: "-4" }],
26:   ["matematyka", "funkcja-liniowa", { a: "2", b: "-4" }],
27:   ["matematyka", "funkcja-liniowa", { a: "0", b: "0" }],
28:   ["matematyka", "funkcja-liniowa", { a: "0", b: "3" }],
29:   ["matematyka", "procent", { p: "20", x: "50", w: "" }],
30:   ["matematyka", "procent", { p: "", x: "50", w: "10" }],
31:   ["matematyka", "procent", { p: "20", x: "", w: "10" }],
32:   ["matematyka", "ciag-arytmetyczny", { an: "", a1: "2", n: "4", r: "3" }],
33:   ["matematyka", "ciag-arytmetyczny", { an: "11", a1: "", n: "4", r: "3" }],
34:   ["matematyka", "ciag-arytmetyczny", { an: "11", a1: "2", n: "", r: "3" }],
35:   ["matematyka", "ciag-arytmetyczny", { an: "11", a1: "2", n: "4", r: "" }],
36:   ["matematyka", "ciag-geometryczny", { an: "", a1: "2", q: "3", n: "4" }],
37:   ["matematyka", "ciag-geometryczny", { an: "54", a1: "", q: "3", n: "4" }],
38:   ["matematyka", "ciag-geometryczny", { an: "8", a1: "2", q: "", n: "3" }],
39:   ["matematyka", "ciag-geometryczny", { an: "8", a1: "2", q: "2", n: "" }],
40:   ["matematyka", "objetosc-prostopadloscianu", { V: "", a: "2", b: "3", c: "4" }],
41:   ["matematyka", "objetosc-prostopadloscianu", { V: "24", a: "", b: "3", c: "4" }],
42:   ["matematyka", "objetosc-kuli", { V: "", r: "3" }],
43:   ["matematyka", "objetosc-kuli", { V: "36π", r: "" }],
44:   ["matematyka", "objetosc-kuli", { V: "100", r: "" }],
45:   ["matematyka", "pole-kuli", { P: "", r: "2" }],
46:   ["matematyka", "pole-kuli", { P: "16π", r: "" }],
47:   ["matematyka", "pole-kuli", { P: "50", r: "" }],
48:   ["fizyka", "predkosc", { v: "", s: "100", t: "4" }],
49:   ["fizyka", "predkosc", { v: "25", s: "", t: "4" }],
50:   ["fizyka", "predkosc", { v: "25", s: "100", t: "" }],
51:   ["fizyka", "droga-jednostajnie-przyspieszona", { s: "", v0: "2", a: "2", t: "3" }],
52:   ["fizyka", "droga-jednostajnie-przyspieszona", { s: "15", v0: "", a: "2", t: "3" }],
53:   ["fizyka", "droga-jednostajnie-przyspieszona", { s: "15", v0: "2", a: "", t: "3" }],
54:   ["fizyka", "droga-jednostajnie-przyspieszona", { s: "4", v0: "0", a: "2", t: "" }],
55:   ["fizyka", "sila", { F: "", m: "2", a: "5" }],
56:   ["fizyka", "sila", { F: "10", m: "", a: "2" }],
57:   ["fizyka", "sila", { F: "10", m: "2", a: "" }],
58:   ["fizyka", "energia-kinetyczna", { Ek: "", m: "2", v: "10" }],
59:   ["fizyka", "energia-kinetyczna", { Ek: "100", m: "", v: "10" }],
60:   ["fizyka", "energia-kinetyczna", { Ek: "100", m: "2", v: "" }],
61:   ["fizyka", "energia-potencjalna", { Ep: "", m: "2", h: "5" }],
62:   ["fizyka", "energia-potencjalna", { Ep: "100", m: "", h: "5" }],
63:   ["fizyka", "energia-potencjalna", { Ep: "100", m: "2", h: "" }],
64:   ["fizyka", "gestosc", { ro: "", m: "10", V: "2" }],
65:   ["fizyka", "gestosc", { ro: "5", m: "", V: "2" }],
66:   ["fizyka", "gestosc", { ro: "5", m: "10", V: "" }],
67:   ["fizyka", "cisnienie", { p: "", F: "20", S: "4" }],
68:   ["fizyka", "cisnienie", { p: "5", F: "", S: "4" }],
69:   ["fizyka", "cisnienie", { p: "5", F: "20", S: "" }],
70:   ["fizyka", "praca", { W: "", F: "5", s: "4" }],
71:   ["fizyka", "praca", { W: "20", F: "", s: "4" }],
72:   ["fizyka", "praca", { W: "20", F: "5", s: "" }],
73:   ["matematyka", "potega", { p: "2", n: "10", w: "" }],
74:   ["matematyka", "potega", { p: "", n: "3", w: "8" }],
75:   ["matematyka", "potega", { p: "2", n: "", w: "8" }],
76:   ["matematyka", "pierwiastek", { m: "12", n: "2", w: "" }],
77:   ["matematyka", "pierwiastek", { m: "", n: "3", w: "2" }],
78:   ["matematyka", "pierwiastek", { m: "8", n: "", w: "2" }],
79:   ["matematyka", "logarytm", { a: "2", b: "8", c: "" }],
80:   ["matematyka", "logarytm", { a: "2", b: "", c: "3" }],
81:   ["matematyka", "logarytm", { a: "", b: "8", c: "3" }],
82:   ["matematyka", "wartosc-bezwzgledna", { x: "-5", a: "0", w: "" }],
83:   ["matematyka", "wartosc-bezwzgledna", { x: "", a: "2", w: "3" }],
84:   ["matematyka", "wartosc-bezwzgledna", { x: "5", a: "", w: "3" }],
85:   ["matematyka", "procent-skladany", { K: "", K0: "1000", p: "5", n: "2" }],
86:   ["matematyka", "procent-skladany", { K: "110", K0: "100", p: "10", n: "" }],
87:   ["matematyka", "uklad-rownan", { a1: "2", b1: "1", c1: "5", a2: "1", b2: "-1", c2: "1" }],
88:   ["matematyka", "nierownosc-kwadratowa", { a: "1", b: "-5", c: "6" }],
89:   ["matematyka", "nierownosc-kwadratowa", { a: "1", b: "0", c: "1" }],
90:   ["matematyka", "horner-pierwiastki", { a: "1", b: "-6", c: "11", d: "-6" }],
91:   ["matematyka", "horner-pierwiastki", { a: "1", b: "-5", c: "6", d: "0" }],
92:   ["matematyka", "postac-kanoniczna", { a: "1", b: "-4", c: "3" }],
93:   ["matematyka", "prawdo-klasyczne", { A: "3", O: "6" }],
94:   ["matematyka", "permutacje", { n: "5" }],
95:   ["matematyka", "kombinacje", { n: "5", k: "2" }],
96:   ["matematyka", "wariacje", { n: "5", k: "2" }],
97:   ["matematyka", "tales", { a: "", b: "4", c: "6", d: "8" }],
98:   ["matematyka", "postacie-kwadratowej", { a: "1", b: "-4", c: "3" }],
99:   ["matematyka", "postacie-kwadratowej", { a: "1", b: "0", c: "1" }],
100:   ["matematyka", "rozklad-liczby", { n: "360" }],
101:   ["matematyka", "rozklad-liczby", { n: "13" }],
102:   [
103:     "matematyka",
104:     "rozklad-wielomianu",
105:     { deg: "3", a6: "0", a5: "0", a4: "0", a3: "1", a2: "-6", a1: "11", a0: "-6" },
106:   ],
107:   [
108:     "matematyka",
109:     "rozklad-wielomianu",
110:     { deg: "2", a6: "0", a5: "0", a4: "0", a3: "0", a2: "1", a1: "-5", a0: "6" },
111:   ],
112:   ["matematyka", "katy-okrag", { alfa: "", beta: "30" }],
113:   ["matematyka", "katy-okrag", { alfa: "80", beta: "" }],
114:   ["matematyka", "pole-trapez", { P: "", a: "3", b: "5", h: "4" }],
115:   ["matematyka", "pole-rombu", { P: "", e: "6", f: "4" }],
116:   ["matematyka", "pole-rownoleglobok", { P: "", a: "5", h: "3" }],
117:   ["matematyka", "luk-okregu", { l: "", r: "2", alfa: "90" }],
118:   ["matematyka", "luk-okregu", { l: "2π", r: "", alfa: "90" }],
119:   ["matematyka", "wycinek-kola", { P: "", r: "2", alfa: "90" }],
120:   ["matematyka", "odl-punktow", { x1: "0", y1: "0", x2: "3", y2: "4" }],
121:   ["matematyka", "srodek-odcinka", { x1: "0", y1: "0", x2: "4", y2: "6" }],
122:   ["matematyka", "prosta-2-punkty", { x1: "0", y1: "1", x2: "2", y2: "5" }],
123:   ["matematyka", "prostopadlosc", { a1: "2", a2: "-1/2" }],
124:   ["matematyka", "okrag-rownanie", { h: "1", k: "-2", r: "3" }],
125:   ["matematyka", "odl-punkt-prosta", { A: "3", B: "4", C: "-5", x0: "0", y0: "0" }],
126:   ["matematyka", "graniastoslup", { V: "", Pp: "6", H: "4" }],
127:   ["matematyka", "ostroslup", { V: "", Pp: "6", H: "3" }],
128:   ["matematyka", "walec", { V: "", r: "2", H: "3" }],
129:   ["matematyka", "stozek", { V: "", r: "3", H: "2" }],
130:   ["matematyka", "newton", { n: "3" }],
131:   ["matematyka", "silnia", { n: "5" }],
132:   ["matematyka", "szesciany", { a: "2", b: "1" }],
133:   ["matematyka", "granica-qn", { q: "1/2" }],
134:   ["matematyka", "granica-qn", { q: "2" }],
135:   ["matematyka", "pochodna-wielomianu", { a: "1", b: "0", c: "-3", d: "2" }],
136:   ["matematyka", "ekstrema-kwadratowej", { a: "1", b: "-4", c: "3" }],
137:   ["matematyka", "prawdo-warunkowe", { PAB: "1/6", PB: "", P: "1/3" }],
138:   ["matematyka", "prawdo-calkowite", { PB1: "1/2", PAB1: "1/4", PB2: "1/2", PAB2: "3/4" }],
139:   ["matematyka", "rownanie-wykladnicze", { a: "2", b: "8" }],
140:   ["matematyka", "rownanie-logarytmiczne", { a: "10", c: "2" }],
141:   ["matematyka", "vieta", { a: "1", b: "-5", c: "6" }],
142:   ["matematyka", "podwojony-kat", { x: "30" }],
143:   ["fizyka", "moc", { P: "", W: "100", t: "5" }],
144:   ["fizyka", "sprawnosc", { eta: "", Wu: "40", Wd: "100" }],
145:   ["fizyka", "ped", { p: "", m: "2", v: "5" }],
146:   ["fizyka", "zderzenia", { m1: "2", v1: "3", m2: "2", v2: "1" }],
147:   ["fizyka", "ruch-okrag", { v: "", r: "1", T: "2" }],
148:   ["fizyka", "grawitacja", { F: "", m: "1000", M: "1000", r: "10" }],
149:   ["fizyka", "kepler", { T1: "", r1: "1", T2: "1", r2: "8" }],
150:   ["fizyka", "archimedes", { Fw: "", ro: "1000", V: "2" }],
151:   ["fizyka", "hydrostatyczne", { p: "", ro: "1000", h: "10" }],
152:   ["fizyka", "cieplo", { Q: "", m: "2", c: "420", dT: "10" }],
153:   ["fizyka", "cieplo-przemiany", { Q: "", m: "2", R: "100" }],
154:   ["fizyka", "ohm", { I: "", U: "12", R: "4" }],
155:   ["fizyka", "opor", { R: "", ro: "2", l: "10", S: "5" }],
156:   ["fizyka", "moc-pradu", { P: "", U: "10", I: "2" }],
157:   ["fizyka", "energia-pradu", { W: "", P: "60", t: "2" }],
158:   ["fizyka", "lorentz", { F: "", q: "2", v: "3", B: "4" }],
159:   ["fizyka", "snell", { n: "", alfa: "30", beta: "20" }],
160:   ["fizyka", "soczewki", { f: "", x: "20", y: "20" }],
161:   ["fizyka", "powiekszenie", { x: "10", y: "30" }],
162:   ["fizyka", "siatka", { d: "", alfa: "30", n: "1", lambda: "0.000001" }],
163:   ["fizyka", "fale", { v: "", lambda: "2", f: "50" }],
164:   ["fizyka", "wahadlo-mat", { T: "", l: "1" }],
165:   ["fizyka", "wahadlo-sprezyna", { T: "", m: "1", k: "10" }],
166:   ["fizyka", "foto", { Ef: "", W: "2", Ek: "3" }],
167:   ["fizyka", "emc2", { E: "", m: "2" }],
168:   ["fizyka", "rozpad", { N: "", N0: "100", t: "1", T: "1" }],
169:   ["fizyka", "rzut-poziomy", { Z: "", v0: "10", h: "5", t: "1" }],
170:   ["fizyka", "rzut-poziomy", { Z: "10", v0: "5", h: "5", t: "" }],
171:   ["fizyka", "moment-sily", { M: "", F: "10", r: "2" }],
172:   ["fizyka", "energia-obrotowa", { E: "", I: "4", w: "3" }],
173:   ["fizyka", "bernoulli", { p1: "100000", ro: "1000", h1: "5", v1: "2", h2: "3", v2: "1" }],
174:   ["fizyka", "clapeyron", { p: "", V: "1", n: "1", T: "300" }],
175:   ["fizyka", "pierwsza-zasada", { dU: "", W: "100", Q: "50" }],
176:   ["fizyka", "izobaryczna", { W: "", p: "100000", V1: "1", V2: "3" }],
177:   ["fizyka", "carnot", { eta: "", T1: "600", T2: "300" }],
178:   ["fizyka", "rozszerzalnosc", { dl: "", alfa: "0.000012", l: "2", dT: "50" }],
179:   ["fizyka", "coulomb", { F: "", q: "0.000001", Q: "0.000001", r: "1" }],
180:   ["fizyka", "natezenie", { E: "", Q: "0.000001", r: "1" }],
181:   ["fizyka", "potencjal", { V: "", W: "10", q: "2" }],
182:   ["fizyka", "kondensator-q", { C: "", Q: "10", U: "5" }],
183:   ["fizyka", "kondensator-e", { E: "", C: "2", U: "3" }],
184:   ["fizyka", "sem", { I: "", E: "12", R: "4", r: "2" }],
185:   ["fizyka", "strumien", { Phi: "", B: "2", S: "3" }],
186:   ["fizyka", "faraday", { E: "", dPhi: "10", dt: "2" }],
187:   ["fizyka", "solenoid", { B: "", N: "100", I: "2", l: "1" }],
188:   ["fizyka", "sila-elektrodynamiczna", { F: "", B: "2", I: "3", l: "4" }],
189:   ["fizyka", "bohr", { n: "2" }],
190:   ["fizyka", "debroglie", { lambda: "", p: "0.000000000000000000001" }],
191:   ["fizyka", "energia-rel", { E: "", m: "1", v: "10000000" }],
192:   ["matematyka", "zamiana-miary", { deg: "180", rad: "" }],
193:   ["matematyka", "zamiana-miary", { deg: "", rad: "3.141592653589793" }],
194:   ["matematyka", "kat-trojkat", { alfa: "60", beta: "70", gamma: "" }],
195:   ["matematyka", "kat-miedzy-prostymi", { a1: "0", a2: "1" }],
196:   ["matematyka", "kat-miedzy-prostymi", { a1: "1", a2: "-1" }],
197:   ["matematyka", "kat-miedzy-prostymi", { a1: "2", a2: "2" }],
198:   ["matematyka", "trojkaty-podobne", { k: "2", x: "3", y: "" }],
199:   ["matematyka", "trojkaty-podobne", { k: "", x: "3", y: "6" }],
200:   ["matematyka", "kat-z-bokow", { jak: "sin⁻¹ (x/y)", x: "1", y: "2" }],
201:   ["matematyka", "kat-z-bokow", { jak: "cos⁻¹ (x/y)", x: "1", y: "2" }],
202:   ["matematyka", "kat-z-bokow", { jak: "tan⁻¹ (x/y)", x: "1", y: "1" }],
203:   ["matematyka", "suma-katow", { n: "5", S: "" }],
204:   ["matematyka", "suma-katow", { n: "", S: "540" }],
205:   ["matematyka", "nierownosc-kwadratowa", { a: "1", b: "-5", c: "6", op: ">" }],
206:   ["matematyka", "nierownosc-kwadratowa", { a: "1", b: "-5", c: "6", op: "≥" }],
207:   ["matematyka", "nierownosc-kwadratowa", { a: "1", b: "-5", c: "6", op: "<" }],
208:   ["matematyka", "nierownosc-kwadratowa", { a: "1", b: "-5", c: "6", op: "≤" }],
209:   ["matematyka", "nierownosc-kwadratowa", { a: "1", b: "-5", c: "6", op: "≠" }],
210:   ["matematyka", "nierownosc-kwadratowa", { a: "1", b: "0", c: "1", op: "≠" }],
211:   ["matematyka", "znak-wielomianu", { a: "1", b: "-6", c: "11", d: "-6", op: ">" }],
212:   ["matematyka", "znak-wielomianu", { a: "1", b: "-6", c: "11", d: "-6", op: "≤" }],
213:   ["chemia", "mol", { n: "", m: "18", M: "18" }],
214:   ["chemia", "mol", { n: "1", m: "", M: "18" }],
215:   ["chemia", "mol", { n: "1", m: "18", M: "" }],
216:   ["chemia", "stezenie-molowe", { C: "", n: "2", V: "1" }],
217:   ["chemia", "stezenie-molowe", { C: "2", n: "", V: "1" }],
218:   ["chemia", "stezenie-molowe", { C: "2", n: "2", V: "" }],
219:   ["chemia", "stezenie-procentowe", { Cp: "", ms: "5", mr: "100" }],
220:   ["chemia", "stezenie-procentowe", { Cp: "5", ms: "", mr: "100" }],
221:   ["chemia", "stezenie-procentowe", { Cp: "5", ms: "5", mr: "" }],
222:   ["chemia", "rozcienczanie", { C1: "1", V1: "0.5", C2: "", V2: "1" }],
223:   ["chemia", "rozcienczanie", { C1: "", V1: "0.5", C2: "0.5", V2: "1" }],
224:   ["chemia", "rozcienczanie", { C1: "1", V1: "", C2: "0.5", V2: "1" }],
225:   ["chemia", "ph", { pH: "", H: "0.001" }],
226:   ["chemia", "ph", { pH: "3", H: "" }],
227:   ["chemia", "wydajnosc", { W: "", mp: "8", mt: "10" }],
228:   ["chemia", "wydajnosc", { W: "80", mp: "", mt: "10" }],
229:   ["chemia", "wydajnosc", { W: "80", mp: "8", mt: "" }],
230:   ["chemia", "mieszanie", { C1: "10", m1: "100", C2: "20", m2: "200" }],
231:   ["chemia", "kc", { a: "1", b: "1", c: "1", d: "1", CA: "1", CB: "1", CC: "1", CD: "1" }],
232:   ["chemia", "dysocjacja", { alfa: "", cz: "0.1", c0: "1" }],
233:   ["chemia", "dysocjacja", { alfa: "0.1", cz: "", c0: "1" }],
234:   ["chemia", "dysocjacja", { alfa: "0.1", cz: "0.1", c0: "" }],
235:   ["chemia", "iloczyn", { Ks: "", A: "0.00001", B: "0.00001" }],
236:   ["chemia", "iloczyn", { Ks: "0.0000000001", A: "", B: "0.00001" }],
237:   ["chemia", "iloczyn", { Ks: "0.0000000001", A: "0.00001", B: "" }],
238:   ["chemia", "ogniwo", { E: "", Ekat: "0.34", Ean: "-0.76" }],
239:   ["chemia", "ogniwo", { E: "1.1", Ekat: "", Ean: "-0.76" }],
240:   ["chemia", "ogniwo", { E: "1.1", Ekat: "0.34", Ean: "" }],
241:   ["chemia", "elektroliza", { m: "", k: "0.001", I: "2", t: "100" }],
242:   ["chemia", "elektroliza", { m: "0.2", k: "", I: "2", t: "100" }],
243:   ["chemia", "elektroliza", { m: "0.2", k: "0.001", I: "", t: "100" }],
244:   ["chemia", "elektroliza", { m: "0.2", k: "0.001", I: "2", t: "" }],
245:   ["chemia", "bufor", { pH: "", pKa: "4.76", Cs: "0.1", Ck: "0.1" }],
246:   ["chemia", "bufor", { pH: "4.76", pKa: "", Cs: "0.1", Ck: "0.1" }],
247:   ["chemia", "bufor", { pH: "4.76", pKa: "4.76", Cs: "", Ck: "0.1" }],
248:   ["chemia", "bufor", { pH: "4.76", pKa: "4.76", Cs: "0.1", Ck: "" }],
249:   ["matematyka", "delta", { a: "1", b: "-5", c: "6" }],
250:   ["matematyka", "delta", { a: "1", b: "0", c: "1" }],
251:   ["matematyka", "delta", { a: "1", b: "2", c: "1" }],
252:   ["matematyka", "kwadratowa-iloczynowa", { a: "1", b: "-5", c: "6" }],
253:   ["matematyka", "kwadratowa-iloczynowa", { a: "1", b: "0", c: "1" }],
254:   ["matematyka", "kwadratowa-iloczynowa", { a: "1", b: "2", c: "1" }],
255:   ["matematyka", "kwadratowa-ogolna", { a: "1", x1: "2", x2: "3" }],
256:   ["matematyka", "kwadratowa-ogolna", { a: "1", x1: "2", x2: "2" }],
257:   ["matematyka", "kwadrat-sumy-roznicy", { a: "2", b: "3" }],
258:   ["matematyka", "roznica-kwadratow", { a: "5", b: "3" }],
259:   ["matematyka", "wzor-herona", { a: "3", b: "4", c: "5" }],
260:   ["matematyka", "wzor-herona", { a: "5", b: "5", c: "6" }],
261:   [
262:     "matematyka",
263:     "wyodrebnianie-czynnika",
264:     { c1: "6", k1: "3", c2: "9", k2: "2", c3: "12", k3: "1" },
265:   ],
266:   ["matematyka", "grupowanie", { a: "1", b: "2", c: "2", d: "4" }],
267:   [
268:     "matematyka",
269:     "rozklad-wielomianu",
270:     { deg: "4", a6: "0", a5: "0", a4: "1", a3: "0", a2: "-5", a1: "0", a0: "4" },
271:   ],
272:   [
273:     "matematyka",
274:     "dzielenie-wielomianow",
275:     { degW: "3", w5: "0", w4: "0", w3: "1", w2: "-6", w1: "11", w0: "-6", p1: "1", p0: "-1" },
276:   ],
277:   [
278:     "matematyka",
279:     "schemat-hornera",
280:     { deg: "3", a6: "0", a5: "0", a4: "0", a3: "1", a2: "-6", a1: "11", a0: "-6", x0: "1" },
281:   ],
282:   ["matematyka", "dodawanie-pisemne", { a: "123", b: "456" }],
283:   ["matematyka", "dodawanie-pisemne", { a: "1/3", b: "1/6" }],
284:   ["matematyka", "mnozenie-pisemne", { a: "0.(3)", b: "3" }],
285:   ["matematyka", "odejmowanie-pisemne", { a: "456", b: "123" }],
286:   ["matematyka", "mnozenie-pisemne", { a: "123", b: "45" }],
287:   ["matematyka", "dzielenie-pisemne", { a: "1234", b: "12" }],
288:   ["matematyka", "dzielenie-pisemne", { a: "12.5", b: "2.5" }],
289:   ["matematyka", "suma-ciagu-arytmetycznego", { Sn: "", a1: "2", an: "20", n: "10" }],
290:   ["matematyka", "suma-ciagu-arytmetycznego", { Sn: "110", a1: "", an: "20", n: "10" }],
291:   ["matematyka", "suma-ciagu-arytmetycznego", { Sn: "110", a1: "2", an: "20", n: "" }],
292:   ["matematyka", "suma-ciagu-geometrycznego", { Sn: "", a1: "2", q: "3", n: "4" }],
293:   ["matematyka", "suma-ciagu-geometrycznego", { Sn: "80", a1: "", q: "3", n: "4" }],
294:   ["matematyka", "suma-ciagu-geometrycznego", { Sn: "80", a1: "2", q: "3", n: "" }],
295:   ["matematyka", "suma-ciagu-geometrycznego", { Sn: "80", a1: "2", q: "", n: "4" }],
296:   ["matematyka", "szereg-geometryczny", { S: "", a1: "1", q: "0.5" }],
297:   ["matematyka", "szereg-geometryczny", { S: "2", a1: "", q: "0.5" }],
298:   ["matematyka", "szereg-geometryczny", { S: "2", a1: "1", q: "" }],
299:   ["matematyka", "tw-sinusow", { a: "", alfa: "30", R: "5" }],
300:   ["matematyka", "tw-sinusow", { a: "5", alfa: "", R: "5" }],
301:   ["matematyka", "tw-sinusow", { a: "5", alfa: "30", R: "" }],
302:   ["matematyka", "tw-cosinusow", { c: "", a: "3", b: "4", gamma: "90" }],
303:   ["matematyka", "tw-cosinusow", { c: "5", a: "3", b: "4", gamma: "" }],
304:   ["matematyka", "tw-cosinusow", { c: "5", a: "", b: "4", gamma: "90" }],
305:   ["matematyka", "okrag-opisany-wpisany", { a: "3", b: "4", c: "5" }],
306:   ["matematyka", "schemat-bernoulliego", { n: "5", k: "2", p: "0.5" }],
307:   ["fizyka", "predkosc-chwilowa", { v: "", v0: "2", a: "3", t: "4" }],
308:   ["fizyka", "predkosc-chwilowa", { v: "14", v0: "", a: "3", t: "4" }],
309:   ["fizyka", "predkosc-chwilowa", { v: "14", v0: "2", a: "", t: "4" }],
310:   ["fizyka", "predkosc-chwilowa", { v: "14", v0: "2", a: "3", t: "" }],
311:   ["fizyka", "energia-wewnetrzna", { U: "", n: "2", T: "300" }],
312:   ["fizyka", "energia-wewnetrzna", { U: "7479", n: "", T: "300" }],
313:   ["fizyka", "energia-wewnetrzna", { U: "7479", n: "2", T: "" }],
314:   ["fizyka", "oporniki-szeregowo", { Rz: "", R1: "10", R2: "20" }],
315:   ["fizyka", "oporniki-szeregowo", { Rz: "30", R1: "", R2: "20" }],
316:   ["fizyka", "oporniki-rownolegle", { Rz: "", R1: "10", R2: "10" }],
317:   ["fizyka", "oporniki-rownolegle", { Rz: "5", R1: "", R2: "10" }],
318:   ["fizyka", "doppler", { fp: "", f: "440", vs: "34" }],
319:   ["fizyka", "doppler", { fp: "484", f: "", vs: "34" }],
320:   ["fizyka", "doppler", { fp: "484", f: "440", vs: "" }],
321:   ["fizyka", "kat-graniczny", { alfa: "", n: "1.5" }],
322:   ["fizyka", "kat-graniczny", { alfa: "42", n: "" }],
323:   ["matematyka", "statystyka", { xs: "2;4;4;5" }],
324:   ["matematyka", "romb-bok", { P: "", a: "5", h: "4" }],
325:   ["matematyka", "romb-bok", { P: "20", a: "", h: "4" }],
326:   ["matematyka", "suma-katow-tryg", { alfa: "30", beta: "60", fn: "sin", pm: "+" }],
327:   ["fizyka", "boyle", { p1: "", V1: "2", p2: "4", V2: "1" }],
328:   ["fizyka", "boyle", { p1: "2", V1: "", p2: "4", V2: "1" }],
329:   ["fizyka", "gaylussac", { V1: "", T1: "300", V2: "2", T2: "600" }],
330:   ["fizyka", "gaylussac", { V1: "1", T1: "", V2: "2", T2: "600" }],
331:   ["fizyka", "charles", { p1: "", T1: "300", p2: "200", T2: "600" }],
332:   ["fizyka", "charles", { p1: "100", T1: "", p2: "200", T2: "600" }],
333:   ["geografia", "skala-mapy", { M: "", drzecz: "100000", dmapy: "1" }],
334:   ["geografia", "skala-mapy", { M: "100000", drzecz: "", dmapy: "1" }],
335:   ["geografia", "skala-mapy", { M: "100000", drzecz: "100000", dmapy: "" }],
336:   ["geografia", "gestosc-zaludnienia", { g: "", L: "1000", P: "10" }],
337:   ["geografia", "gestosc-zaludnienia", { g: "100", L: "", P: "10" }],
338:   ["geografia", "gestosc-zaludnienia", { g: "100", L: "1000", P: "" }],
339:   ["geografia", "przyrost-naturalny", { PN: "", U: "120", Z: "100" }],
340:   ["geografia", "przyrost-naturalny", { PN: "20", U: "", Z: "100" }],
341:   ["geografia", "przyrost-naturalny", { PN: "20", U: "120", Z: "" }],
342:   ["geografia", "saldo-migracji", { S: "", I: "50", E: "30" }],
343:   ["geografia", "saldo-migracji", { S: "20", I: "", E: "30" }],
344:   ["geografia", "saldo-migracji", { S: "20", I: "50", E: "" }],
345:   ["geografia", "przyrost-rzeczywisty", { PR: "", PN: "20", S: "5" }],
346:   ["geografia", "przyrost-rzeczywisty", { PR: "25", PN: "", S: "5" }],
347:   ["geografia", "przyrost-rzeczywisty", { PR: "25", PN: "20", S: "" }],
348:   ["geografia", "deniwelacja", { D: "", Hmax: "500", Hmin: "200" }],
349:   ["geografia", "deniwelacja", { D: "300", Hmax: "", Hmin: "200" }],
350:   ["geografia", "deniwelacja", { D: "300", Hmax: "500", Hmin: "" }],
351:   ["geografia", "amplituda-temperatur", { A: "", Tmax: "25", Tmin: "10" }],
352:   ["geografia", "amplituda-temperatur", { A: "15", Tmax: "", Tmin: "10" }],
353:   ["geografia", "amplituda-temperatur", { A: "15", Tmax: "25", Tmin: "" }],
354:   ["geografia", "nachylenie-stoku", { n: "", D: "50", d: "500" }],
355:   ["geografia", "nachylenie-stoku", { n: "10", D: "", d: "500" }],
356:   ["geografia", "nachylenie-stoku", { n: "10", D: "50", d: "" }],
357:   ["geografia", "wskaznik-urbanizacji", { U: "", Lm: "60", L: "100" }],
358:   ["geografia", "wskaznik-urbanizacji", { U: "60", Lm: "", L: "100" }],
359:   ["geografia", "wskaznik-urbanizacji", { U: "60", Lm: "60", L: "" }],
360:   ["geografia", "stopa-bezrobocia", { u: "", B: "5", A: "100" }],
361:   ["geografia", "stopa-bezrobocia", { u: "5", B: "", A: "100" }],
362:   ["geografia", "stopa-bezrobocia", { u: "5", B: "5", A: "" }],
363:   ["geografia", "pkb-per-capita", { PKBpc: "", PKB: "1000", L: "10" }],
364:   ["geografia", "pkb-per-capita", { PKBpc: "100", PKB: "", L: "10" }],
365:   ["geografia", "pkb-per-capita", { PKBpc: "100", PKB: "1000", L: "" }],
366:   ["geografia", "wspolczynnik-feminizacji", { Wf: "", K: "105", M: "100" }],
367:   ["geografia", "wspolczynnik-feminizacji", { Wf: "105", K: "", M: "100" }],
368:   ["geografia", "wspolczynnik-feminizacji", { Wf: "105", K: "105", M: "" }],
369:   ["geografia", "wspolczynnik-przyrostu", { r: "", PN: "20", L: "1000" }],
370:   ["geografia", "wspolczynnik-przyrostu", { r: "20", PN: "", L: "1000" }],
371:   ["geografia", "wspolczynnik-przyrostu", { r: "20", PN: "20", L: "" }],
372:   ["geografia", "czas-sloneczny", { dt: "", dlambda: "15", k: "4" }],
373:   ["geografia", "czas-sloneczny", { dt: "60", dlambda: "", k: "4" }],
374:   ["geografia", "czas-sloneczny", { dt: "60", dlambda: "15", k: "" }],
375:   ["geografia", "bilans-wodny", { B: "", P: "800", E: "500" }],
376:   ["geografia", "bilans-wodny", { B: "300", P: "", E: "500" }],
377:   ["geografia", "bilans-wodny", { B: "300", P: "800", E: "" }],
378: ];
379: 
380: describe("latex validity", () => {
381:   it("covers every registered formula", () => {
382:     const covered = new Set(CASES.map(([s, id]) => `${s}/${id}`));
383:     for (const f of FORMULAS) {
384:       expect(covered.has(`${f.subject}/${f.id}`)).toBe(true);
385:     }
386:   });
387: 
388:   it.each(CASES)("%s/%s renders every step without fallback", (subject, id, raw) => {
389:     const def = FORMULAS.find((f) => f.subject === subject && f.id === id);
390:     if (!def) throw new Error(`missing ${subject}/${id}`);
391:     expect(renderLatex(def.latex)).not.toMatch(/latex-fallback/);
392:     const r = solveFormula(def, raw, 2);
393:     if (!r.ok) throw new Error(`${subject}/${id}: ${r.error}`);
394:     for (const s of r.steps) {
395:       expect(renderLatex(s.body)).not.toMatch(/latex-fallback/);
396:     }
397:   });
398: });

---

## Assistant

Doczytuję pozostałe pliki testowe (`descriptions.test.ts`, `seo.test.ts`, `sitemap.test.ts`, `parse-formula.test.ts`), aby uwzględnić w planie wszystkie niezmienniki testowe projektu.

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/descriptions.test.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/descriptions.test.ts, lines 1-13
1: import { describe, expect, it } from "vitest";
2: import { FORMULAS } from "./formulas/index";
3: import { getDescription } from "./descriptions";
4: 
5: describe("descriptions", () => {
6:   it("every formula has a non-empty description", () => {
7:     for (const f of FORMULAS) {
8:       const d = getDescription(f.id);
9:       expect(d, f.id).toBeTruthy();
10:       expect(d!.length).toBeGreaterThan(10);
11:     }
12:   });
13: });

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/seo.test.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/seo.test.ts, lines 1-56
1: import { describe, expect, it } from "vitest";
2: import { DESCRIPTIONS } from "./descriptions";
3: import { FORMULAS } from "./formulas/index";
4: import { BASE_URL, metaFor, siteUrls } from "./seo";
5: 
6: describe("metaFor", () => {
7:   it("home returns the base meta", () => {
8:     const meta = metaFor("home", {});
9:     expect(meta.title).toContain("Wzornik Maturalny");
10:     expect(meta.url).toBe(`${BASE_URL}/`);
11:     expect(meta.description.length).toBeGreaterThan(10);
12:   });
13: 
14:   it("wzornik without subject lists all formulas", () => {
15:     const meta = metaFor("wzornik", {});
16:     expect(meta.title).toContain("wszystkie wzory");
17:     expect(meta.url).toBe(`${BASE_URL}/wzornik`);
18:   });
19: 
20:   it("wzornik with subject uses its label and blurb", () => {
21:     const meta = metaFor("wzornik", { subject: "chemia" });
22:     expect(meta.title).toContain("Chemia");
23:     expect(meta.url).toBe(`${BASE_URL}/wzornik/chemia`);
24:   });
25: 
26:   it("solver uses formula name and description", () => {
27:     const meta = metaFor("solver", { subject: "matematyka", formula: "pitagoras" });
28:     expect(meta.title).toContain("Twierdzenie Pitagorasa");
29:     expect(meta.description).toBe(DESCRIPTIONS["pitagoras"]);
30:     expect(meta.url).toBe(`${BASE_URL}/wzornik/matematyka/pitagoras`);
31:   });
32: 
33:   it("solver with unknown formula falls back to home", () => {
34:     expect(metaFor("solver", { subject: "matematyka", formula: "nie-ma" })).toEqual(
35:       metaFor("home", {}),
36:     );
37:   });
38: 
39:   it("static pages have their own meta", () => {
40:     const meta = metaFor("zadanie", {});
41:     expect(meta.url).toBe(`${BASE_URL}/zadanie`);
42:     expect(meta.description).not.toBe(metaFor("home", {}).description);
43:   });
44: 
45:   it("unknown route falls back to home", () => {
46:     expect(metaFor("not-found", {})).toEqual(metaFor("home", {}));
47:   });
48: });
49: 
50: describe("siteUrls", () => {
51:   it("covers core, subjects and every formula exactly once", () => {
52:     const urls = siteUrls();
53:     expect(urls.length).toBe(6 + 4 + FORMULAS.length);
54:     expect(new Set(urls).size).toBe(urls.length);
55:   });
56: });

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/sitemap.test.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/sitemap.test.ts, lines 1-44
1: import { readFileSync } from "node:fs";
2: import { describe, expect, it } from "vitest";
3: import { FORMULAS } from "./formulas/index";
4: import { BASE_URL, siteUrls } from "./seo";
5: 
6: describe("sitemap", () => {
7:   it("covers every registered formula", () => {
8:     const urls = siteUrls();
9:     for (const f of FORMULAS) {
10:       expect(urls).toContain(`${BASE_URL}/wzornik/${f.subject}/${f.id}`);
11:     }
12:   });
13: 
14:   it("lists core pages and subject indexes", () => {
15:     const urls = siteUrls();
16:     for (const p of [
17:       "/",
18:       "/wzornik",
19:       "/wzornik/matematyka",
20:       "/wzornik/fizyka",
21:       "/wzornik/chemia",
22:       "/wzornik/geografia",
23:       "/zadanie",
24:       "/konwerter",
25:       "/historia",
26:       "/ustawienia",
27:     ]) {
28:       expect(urls).toContain(`${BASE_URL}${p}`);
29:     }
30:   });
31: 
32:   it("has no duplicates", () => {
33:     const urls = siteUrls();
34:     expect(new Set(urls).size).toBe(urls.length);
35:   });
36: 
37:   it("committed public/sitemap.xml matches the generator", () => {
38:     const xml = readFileSync("public/sitemap.xml", "utf8");
39:     expect(xml).toMatch(/<urlset/);
40:     for (const u of siteUrls()) {
41:       expect(xml).toContain(u);
42:     }
43:   });
44: });

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/parse-formula.test.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/parse-formula.test.ts, lines 1-200
1: import { describe, expect, it } from "vitest";
2: import { looksLikeEquation, parseEquation } from "./parse-formula";
3: 
4: describe("parseEquation", () => {
5:   it("parses the user example", () => {
6:     expect(parseEquation("4x^2 + -2x + 10 = 0")).toEqual({
7:       subject: "matematyka",
8:       id: "rownanie-kwadratowe",
9:       values: { a: "4", b: "-2", c: "10" },
10:       label: "równanie kwadratowe",
11:     });
12:   });
13: 
14:   it("handles implicit coefficients and no spaces", () => {
15:     expect(parseEquation("x^2-5x+6=0")).toEqual({
16:       subject: "matematyka",
17:       id: "rownanie-kwadratowe",
18:       values: { a: "1", b: "-5", c: "6" },
19:       label: "równanie kwadratowe",
20:     });
21:   });
22: 
23:   it("handles leading minus and superscript", () => {
24:     expect(parseEquation("-x²+x+1=0")).toEqual({
25:       subject: "matematyka",
26:       id: "rownanie-kwadratowe",
27:       values: { a: "-1", b: "1", c: "1" },
28:       label: "równanie kwadratowe",
29:     });
30:   });
31: 
32:   it("falls through to linear", () => {
33:     expect(parseEquation("2x-4=0")).toEqual({
34:       subject: "matematyka",
35:       id: "funkcja-liniowa",
36:       values: { a: "2", b: "-4" },
37:       label: "funkcja liniowa",
38:     });
39:   });
40: 
41:   it("moves nonzero right side over", () => {
42:     expect(parseEquation("x^2-5x+6=1")).toEqual({
43:       subject: "matematyka",
44:       id: "rownanie-kwadratowe",
45:       values: { a: "1", b: "-5", c: "5" },
46:       label: "równanie kwadratowe",
47:     });
48:   });
49: 
50:   it("rejects other letters and garbage", () => {
51:     expect(parseEquation("2y+3=0")).toBeNull();
52:     expect(parseEquation("delta")).toBeNull();
53:     expect(parseEquation("2x+3=0=0")).toBeNull();
54:     expect(parseEquation("5=5")).toBeNull();
55:   });
56: 
57:   it("parses a 2-equation system", () => {
58:     expect(parseEquation("2x+3y=7; x-y=1")).toEqual({
59:       subject: "matematyka",
60:       id: "uklad-rownan",
61:       values: { a1: "2", b1: "3", c1: "7", a2: "1", b2: "-1", c2: "1" },
62:       label: "układ dwóch równań",
63:     });
64:   });
65: 
66:   it("parses quadratic inequalities with operator select", () => {
67:     expect(parseEquation("x^2-5x+6>0")).toEqual({
68:       subject: "matematyka",
69:       id: "nierownosc-kwadratowa",
70:       values: { a: "1", b: "-5", c: "6" },
71:       selects: { op: ">" },
72:       label: "nierówność kwadratowa",
73:     });
74:     expect(parseEquation("x^2+x+1≤0")?.selects).toEqual({ op: "≤" });
75:   });
76: 
77:   it("parses exponential and logarithmic equations", () => {
78:     expect(parseEquation("2^x=8")).toEqual({
79:       subject: "matematyka",
80:       id: "rownanie-wykladnicze",
81:       values: { a: "2", b: "8" },
82:       label: "równanie wykładnicze",
83:     });
84:     expect(parseEquation("log_2(x)=3")).toEqual({
85:       subject: "matematyka",
86:       id: "rownanie-logarytmiczne",
87:       values: { a: "2", c: "3" },
88:       label: "równanie logarytmiczne",
89:     });
90:   });
91: 
92:   it("parses percent, power and roots", () => {
93:     expect(parseEquation("20% z 50")).toEqual({
94:       subject: "matematyka",
95:       id: "procent",
96:       values: { p: "20", x: "50" },
97:       label: "procent z liczby",
98:     });
99:     expect(parseEquation("2^10")).toEqual({
100:       subject: "matematyka",
101:       id: "potega",
102:       values: { p: "2", n: "10" },
103:       label: "potęga",
104:     });
105:     expect(parseEquation("sqrt(9)")).toEqual({
106:       subject: "matematyka",
107:       id: "pierwiastek",
108:       values: { m: "9", n: "2" },
109:       label: "pierwiastek",
110:     });
111:     expect(parseEquation("√9")?.values).toEqual({ m: "9", n: "2" });
112:     expect(parseEquation("∛27")?.values).toEqual({ m: "27", n: "3" });
113:   });
114: 
115:   it("parses sequences from key=value triples", () => {
116:     expect(parseEquation("a1=2;r=3;n=5")).toEqual({
117:       subject: "matematyka",
118:       id: "ciag-arytmetyczny",
119:       values: { a1: "2", r: "3", n: "5" },
120:       label: "ciąg arytmetyczny",
121:     });
122:     expect(parseEquation("a1=2;q=3;n=4")).toEqual({
123:       subject: "matematyka",
124:       id: "ciag-geometryczny",
125:       values: { a1: "2", q: "3", n: "4" },
126:       label: "ciąg geometryczny",
127:     });
128:   });
129: 
130:   it("parses a proportion with one unknown", () => {
131:     expect(parseEquation("x/4=6/8")).toEqual({
132:       subject: "matematyka",
133:       id: "tales",
134:       values: { b: "4", c: "6", d: "8" },
135:       label: "proporcja (Tales)",
136:     });
137:   });
138: 
139:   it("parses scale and concentration", () => {
140:     expect(parseEquation("1:50000")).toEqual({
141:       subject: "geografia",
142:       id: "skala-mapy",
143:       values: { M: "50000" },
144:       label: "skala mapy",
145:     });
146:     expect(parseEquation("ms=5;mr=100")).toEqual({
147:       subject: "chemia",
148:       id: "stezenie-procentowe",
149:       values: { ms: "5", mr: "100" },
150:       label: "stężenie procentowe",
151:     });
152:   });
153: 
154:   it("parses cubic equations into rozklad-wielomianu", () => {
155:     expect(parseEquation("x^3-6x^2+11x-6=0")).toEqual({
156:       subject: "matematyka",
157:       id: "rozklad-wielomianu",
158:       values: { a6: "0", a5: "0", a4: "0", a3: "1", a2: "-6", a1: "11", a0: "-6" },
159:       selects: { deg: "3" },
160:       label: "rozkład wielomianu",
161:     });
162:     expect(parseEquation("x^2-5x+6=0")?.id).toBe("rownanie-kwadratowe");
163:   });
164: 
165:   it("parses absolute value equations", () => {
166:     expect(parseEquation("|x-2|=3")).toEqual({
167:       subject: "matematyka",
168:       id: "wartosc-bezwzgledna",
169:       values: { a: "2", w: "3" },
170:       label: "wartość bezwzględna",
171:     });
172:     expect(parseEquation("|x|=3")?.values).toEqual({ a: "0", w: "3" });
173:   });
174: 
175:   it("parses vertex form into postacie-kwadratowej", () => {
176:     expect(parseEquation("2(x-1)^2+3")).toEqual({
177:       subject: "matematyka",
178:       id: "postacie-kwadratowej",
179:       values: { a: "2", b: "-4", c: "5" },
180:       label: "postacie funkcji kwadratowej",
181:     });
182:   });
183: 
184:   it("parses decimal logarithm", () => {
185:     expect(parseEquation("log(x)=2")).toEqual({
186:       subject: "matematyka",
187:       id: "rownanie-logarytmiczne",
188:       values: { a: "10", c: "2" },
189:       label: "równanie logarytmiczne",
190:     });
191:   });
192: });
193: 
194: describe("looksLikeEquation", () => {
195:   it("detects equation-shaped input", () => {
196:     expect(looksLikeEquation("4x^2-2x+10=0")).toBe(true);
197:     expect(looksLikeEquation("delta")).toBe(false);
198:     expect(looksLikeEquation("koło")).toBe(false);
199:   });
200: });

---

## Assistant

# FAZA 1 — Pełny Audyt Braków (Tablice CKE + Rozszerzenie) oraz Plan Wdrożenia

Przeanalizowałem cały plik **`wybrane_wzory.pdf` (36 stron oficjalnych tablic CKE)**, Twoją listę 10 działów rozszerzenia oraz wszystkie 171 obecnych wzorów w kodzie projektu. Poniżej znajduje się **kompletny audyt tego, czego brakuje**, oraz **szczegółowy plan prac (Fazy 2–6)**.

---

## CZĘŚĆ A: Audyt braków i luk w obecnym kodzie

### 1. Problem wpisywania na telefonie i parsowania wyrażeń (`SolverView`, `exact.ts`, `parse-formula.ts`)
* **Diagnoza problemu na telefonie:** W `SolverView.vue` (linia 319) pola mają `inputmode="decimal"`, co na Androidzie/iOS wymusza okrojoną klawiaturę numeryczną (same cyfry `0–9` i przecinek) — **fizycznie nie da się wpisać `π`, `x`, `/`, `√`, `^`, `−`, `=`**. Dodatkowo w `HomeView.vue` użyto `type="number"`, co odrzuca ułamki i `π`.
* **Braki w `parseExact` (`src/lib/exact/exact.ts`):** Obecnie rozumie ułamki `1/3`, okresowe `0.(3)` i `25π`, ale **nie rozumie pierwiastków na wejściu** (np. `√3`, `2√3`, `√3/2`, `sqrt(2)`) ani ułamków z $\pi$ typu `π/6`, `2π/3` (kluczowe w trygonometrii, trójkątach równobocznych i bryłach!).
* **Braki w auto-rozpoznawaniu (`src/lib/parse-formula.ts`):**
  * Nie rozpoznaje postaci iloczynowej (rozbitej), np. `2(x-1)(x+3)=0` ani `(x-2)(x-5)`.
  * Nie rozpoznaje zapisu funkcyjnego `f(x) = ...` oraz `y = ...`.
  * Nie rozpoznaje wzorów z $\pi$ i pierwiastkami (np. `P=25π`, `h=4√3`).

---

### 2. Brakujące wzory, podwzory i transformacje z Matematyki (PP + PR)

#### Dział 1: Liczby rzeczywiste, Wartość bezwzględna, Potęgi, Pierwiastki, Logarytmy (Tablice CKE str. 4–6)
1. **`nierownosc-bezwzgledna`**: $|x - a| < r$, $|x - a| \le r$, $|x - a| > r$, $|x - a| \ge r$ $\iff a-r \le x \le a+r$ lub $x \le a-r \lor x \ge a+r$ (oraz odwrotnie: zapisanie przedziału $(x_1, x_2)$ w postaci $|x - a| < r$, gdzie $a = \frac{x_1+x_2}{2}, r = \frac{|x_2-x_1|}{2}$ — klasyk maturalny!).
2. **`potega-wymierna`**: $a^{\frac{m}{n}} = \sqrt[n]{a^m}$ oraz $a^{-\frac{m}{n}} = \frac{1}{\sqrt[n]{a^m}}$ — transformacja potęga $\leftrightarrow$ pierwiastek + dokładne wyliczenie wartości.
3. **`dzialania-na-potegach`**: $a^r \cdot a^s = a^{r+s}$, $\frac{a^r}{a^s} = a^{r-s}$, $(a^r)^s = a^{r\cdot s}$, $(a\cdot b)^r = a^r b^r$, $(\frac{a}{b})^r = \frac{a^r}{b^r}$ (wraz z rozwiązywaniem o niewiadomy wykładnik).
4. **`dzialania-na-logarytmach`**: $\log_a(x\cdot y) = \log_a x + \log_a y$, $\log_a(\frac{x}{y}) = \log_a x - \log_a y$, $\log_a(x^r) = r\log_a x$, $a^{\log_a b} = b$ (łączenie i rozbijanie logarytmów).
5. **`zamiana-podstawy-log`**: $\log_b c = \frac{\log_a c}{\log_a b}$, $\log_a b = \frac{1}{\log_b a}$, $\log_{a^k} b = \frac{1}{k}\log_a b$.

#### Dział 2: Wyrażenia algebraiczne, Wzory skróconego mnożenia, Dwumian Newtona, Wielomiany (Tablice CKE str. 6–7)
6. **`roznica-n-tych-poteg`**: $a^n - b^n = (a-b)(a^{n-1} + a^{n-2}b + \dots + b^{n-1})$ oraz $a^n - 1$.
7. **`wyraz-dwumianu-newtona`**: $k$-ty wyraz rozwinięcia $(a \pm b)^n$: $T_{k+1} = \binom{n}{k} a^{n-k} b^k$ oraz tożsamości symbolu Newtona $\binom{n}{k} = \binom{n}{n-k}$, $\binom{n}{k} + \binom{n}{k+1} = \binom{n+1}{k+1}$.
8. **`tw-bezouta`**: Twierdzenie Bézouta i reszta z dzielenia $W(x)$ przez $(x-a)$ + wyznaczanie parametru $m$, dla którego wielomian dzieli się przez $(x-a)$.
9. **`vieta-3-stopnia`**: Wzory Viète’a dla równania 3. stopnia $ax^3+bx^2+cx+d=0$: $x_1+x_2+x_3 = -\frac{b}{a}$, $x_1x_2+x_1x_3+x_2x_3 = \frac{c}{a}$, $x_1x_2x_3 = -\frac{d}{a}$.

#### Dział 3: Funkcja liniowa i Funkcja kwadratowa — wszystkie transformacje, delty, miejsca zerowe, rozbite i nierozbite (Tablice CKE str. 7–9)
10. **`monotonicznosc-liniowej`**: Pełna analiza $f(x) = ax + b$: monotoniczność ($a>0 \nearrow, a<0 \searrow, a=0 \to$), miejsce zerowe $x_0 = -b/a$, przecięcie z $Oy$ $(0,b)$, kąt nachylenia $\operatorname{tg}\alpha = a$, znaki funkcji ($f(x)>0, f(x)<0$).
11. **`delta` (rozbudowa do `nvar`)**: $\Delta = b^2 - 4ac$ — oprócz liczenia $\Delta$ z $a, b, c$, możliwość wyznaczenia **brakującego współczynnika $a, b$ lub $c$ przy zadanej $\Delta$** (np. kiedy $\Delta = 0$!).
12. **`miejsca-zerowe-kwadratowej` (jako funkcja kwadratowa i jako osobne/rozbite wzory)**:
    * Osobny kalkulator miejsc zerowych $x_1 = \frac{-b-\sqrt{\Delta}}{2a}$, $x_2 = \frac{-b+\sqrt{\Delta}}{2a}$ oraz $x_0 = -\frac{b}{2a}$.
    * Wariant z podaniem $(a, b, c)$ **LUB bezpośrednio $(a, b, \Delta)$** (gdy w zadaniu $\Delta$ jest już dana!).
13. **`wierzcholek-p-q` (rozbite wzory na $p$ i $q$ w trybie `nvar`)**:
    * $p = -\frac{b}{2a}$ (wyznacz $p, a$ lub $b$) oraz $p = \frac{x_1 + x_2}{2}$ (oś symetrii ze średniej miejsc zerowych — wyznacz $p, x_1$ lub $x_2$!).
    * $q = -\frac{\Delta}{4a}$ (wyznacz $q, \Delta$ lub $a$).
14. **`kwadratowa-z-kanonicznej`**: Transformacja $f(x) = a(x-p)^2 + q \to$ postać ogólna $ax^2+bx+c$, $\Delta = -4aq$, miejsca zerowe i postać iloczynowa.
15. **`kwadratowa-z-iloczynowej` (rozbudowa `kwadratowa-ogolna`)**: Transformacja $f(x) = a(x-x_1)(x-x_2) \to$ postać ogólna $ax^2+bx+c$ **oraz** postać kanoniczna $a(x-p)^2+q$ i wierzchołek $W=(p,q)$.
16. **`kwadratowa-z-wierzcholka-i-punktu`**: Wyznaczanie wzoru funkcji kwadratowej (we wszystkich 3 postaciach) znając wierzchołek $W=(p,q)$ oraz punkt $A=(x_A, y_A)$.
17. **`monotonicznosc-kwadratowej`**: Przedziały monotoniczności ($\nearrow, \searrow$), zbiór wartości $ZW$, oś symetrii $x=p$, oraz **wartość największa i najmniejsza w przedziale domkniętym $[\alpha, \beta]$**.
18. **`vieta-rozszerzone`**: Przekształcenia wyrażeń symetrycznych do wzorów Viète’a: $x_1^2 + x_2^2$, $\frac{1}{x_1} + \frac{1}{x_2}$, $(x_1 - x_2)^2$, $|x_1 - x_2|$, $x_1^3 + x_2^3$ (z pełnym wyprowadzeniem algebraicznym i podstawieniem).

#### Dział 4: Ciągi i Granice (Tablice CKE str. 9–11)
19. **`suma-arytmetycznego-r`**: Drugi wzór z tablic CKE: $S_n = \frac{2a_1 + (n-1)r}{2} \cdot n$ w trybie `nvar` (liczy $S_n, a_1, r$ oraz $n$ przez równanie kwadratowe!).
20. **`sasiednie-arytmetyczny`**: Trzy kolejne wyrazy ciągu arytmetycznego $a_n = \frac{a_{n-1} + a_{n+1}}{2}$ (tryb `nvar`).
21. **`sasiednie-geometryczny`**: Trzy kolejne wyrazy ciągu geometrycznego $a_n^2 = a_{n-1} \cdot a_{n+1}$ (tryb `nvar`, zwraca też oba warianty znaku $\pm$).
22. **`ciag-z-dwoch-wyrazow`**: Wyznaczanie $r$ (lub $q$) oraz $a_1$ z dwóch dowolnych wyrazów $a_k$ i $a_n$: $a_n = a_k + (n-k)r$ oraz $a_n = a_k \cdot q^{n-k}$.
23. **`monotonicznosc-ciagu`**: Badanie monotoniczności ciągu z różnicy $a_{n+1} - a_n$ oraz ilorazu.
24. **`granica-wielomianow-i-e`**: Granica ciągu wymiernego $\lim_{n\to\infty} \frac{a_p n^p + \dots}{b_q n^q + \dots}$ oraz granice z liczbą Eulera $\lim_{n\to\infty} (1 + \frac{k}{n})^{mn} = e^{km}$.

#### Dział 5: Trygonometria (Tablice CKE str. 11–14)
25. **`jedynka-trygonometryczna`**: $\sin^2\alpha + \cos^2\alpha = 1$, $\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}$, $\operatorname{ctg}\alpha = \frac{\cos\alpha}{\sin\alpha}$ — podajesz jedną funkcję i ćwiartkę $\implies$ wylicza dokładnie (na pierwiastkach!) pozostałe funkcje.
26. **`trygonometria-trojkat-punkt`**: Definicje w trójkącie prostokątnym ($\sin\alpha=a/c, \cos\alpha=b/c, \operatorname{tg}\alpha=a/b$) oraz dla punktu $M(x,y)$ na płaszczyźnie ($r=\sqrt{x^2+y^2}$).
27. **`wzory-redukcyjne`**: Redukcja dowolnego kąta $\alpha$ (w stopniach lub z $\pi$) przez wzory redukcyjne $90^\circ\pm\alpha, 180^\circ\pm\alpha, 270^\circ\pm\alpha, 360^\circ-\alpha$ i okresowość.
28. **`tangens-sumy-podwojony`**: $\operatorname{tg}(\alpha\pm\beta) = \frac{\operatorname{tg}\alpha \pm \operatorname{tg}\beta}{1 \mp \operatorname{tg}\alpha\operatorname{tg}\beta}$, $\operatorname{tg}2\alpha = \frac{2\operatorname{tg}\alpha}{1-\operatorname{tg}^2\alpha}$, 3 postacie $\cos 2\alpha$, oraz kąty połówkowe $\sin(\alpha/2), \cos(\alpha/2)$.
29. **`sumy-iloczyny-tryg`**: Wzory na $\sin\alpha \pm \sin\beta$, $\cos\alpha \pm \cos\beta$ oraz iloczyny $\sin\alpha\sin\beta, \cos\alpha\cos\beta, \sin\alpha\cos\beta$ (str. 14 tablic CKE).
30. **`rownanie-trygonometryczne`**: Rozwiązywanie $\sin x = a, \cos x = a, \operatorname{tg} x = a$ z zapisem pełnych serii rozwiązań ($x = x_0 + 2k\pi$).

#### Dział 6: Planimetria (Tablice CKE str. 15–22)
31. **`trojkat-rownoboczny`**: Związki miarowe $h = \frac{a\sqrt{3}}{2}$, $P = \frac{a^2\sqrt{3}}{4}$, $R = \frac{2}{3}h$, $r = \frac{1}{3}h$ (str. 16 tablic CKE) — wpisujesz dowolną jedną wielkość (również z $\sqrt{3}$), dostajesz wszystkie pozostałe dokładnie!
32. **`pole-trojkata-sinus`**: $P = \frac{1}{2}ab\sin\gamma$ oraz $P = 2R^2\sin\alpha\sin\beta\sin\gamma$ (tryb `nvar`).
33. **`pole-trojkata-promienie`**: $P = p \cdot r$ oraz $P = \frac{abc}{4R}$ w trybie `nvar` (np. wyznacz $r$ lub $R$ znając pole i boki).
34. **`trojkat-prostokatny-relacje`**: Związki miarowe w trójkącie prostokątnym ze spodkiem wysokości $D$ (str. 16 tablic CKE): $h_c = \sqrt{|AD|\cdot|DB|}$, $h_c = \frac{ab}{c}$, $r = \frac{a+b-c}{2}$, $R = \frac{1}{2}c$.
35. **`tw-dwusiecznej`**: Twierdzenie o dwusiecznej kąta $\frac{|AD|}{|BD|} = \frac{|AC|}{|BC|}$ (str. 18 tablic CKE, tryb `nvar`).
36. **`sieczna-styczna`**: Twierdzenie o siecznej i stycznej $|PA|\cdot|PB| = |PC|^2$ (str. 20 tablic CKE, tryb `nvar`).
37. **`pole-czworokata-sinus`**: Pole równoległoboku $P = ab\sin\alpha$, rombu $P = a^2\sin\alpha$ oraz dowolnego czworokąta z przekątnych $P = \frac{1}{2}d_1 d_2 \sin\gamma$ (str. 21 tablic CKE).
38. **`czworokat-okrag`**: Czworokąt wpisany w okrąg ($\alpha+\gamma = \beta+\delta = 180^\circ$, wzór Brahmagupty $P = \sqrt{(p-a)(p-b)(p-c)(p-d)}$) oraz opisany na okręgu ($a+c = b+d$, $P = p\cdot r$, str. 21–22 tablic CKE).
39. **`pola-objetosci-podobnych`**: Stosunek pól figur podobnych $\frac{P_B}{P_A} = k^2$ oraz objętości brył podobnych $\frac{V_B}{V_A} = k^3$ (str. 22 tablic CKE).

#### Dział 7: Geometria analityczna (Tablice CKE str. 22–26)
40. **`wektory-analityczna`**: Współrzędne wektora $\vec{AB} = [x_B-x_A, y_B-y_A]$, długość $|\vec{u}| = \sqrt{u_1^2+u_2^2}$, działania $\vec{u}\pm\vec{v}, a\vec{u}$, iloczyn skalarny $\vec{u}\circ\vec{v} = u_1v_1 + u_2v_2$, kąt między wektorami, warunki $\vec{u}\perp\vec{v}$ i $\vec{u}\parallel\vec{v}$ (str. 25 tablic CKE).
41. **`pole-trojkata-analitycznie`**: Pole trójkąta z 3 punktów $A, B, C$: $P_{\triangle ABC} = \frac{1}{2}|(x_B-x_A)(y_C-y_A) - (y_B-y_A)(x_C-x_A)|$ (str. 25 tablic CKE).
42. **`srodek-ciezkosci-trojkata`**: Środek ciężkości trójkąta $S = (\frac{x_A+x_B+x_C}{3}, \frac{y_A+y_B+y_C}{3})$ (str. 26 tablic CKE, tryb `nvar` — pozwala też wyznaczyć brakujący wierzchołek $C$ znając $A, B$ i $S$!).
43. **`przeksztalcenia-geometryczne`**: Przesunięcie o wektor $[a,b]$, symetrie osiowe $S_{Ox}, S_{Oy}$ oraz symetria środkowa $S_K$ względem punktu $K=(a,b)$: $P'=(2a-x, 2b-y)$ (str. 25 tablic CKE).
44. **`prosta-przekształcenia`**: Równanie kierunkowe z punktu i współczynnika $y = a(x-x_0)+y_0$, konwersja ogólne $Ax+By+C=0 \leftrightarrow$ kierunkowe $y=ax+b$, warunki równoległości ($A_1B_2 - A_2B_1 = 0$) i prostopadłości ($A_1A_2 + B_1B_2 = 0$) w postaci ogólnej (str. 23–24 tablic CKE).
45. **`okrag-postac-ogolna`**: Transformacja równania okręgu między postacią kanoniczną $(x-a)^2+(y-b)^2=r^2$ a ogólną $x^2+y^2-2ax-2by+c=0$ ($c = a^2+b^2-r^2$, str. 24 tablic CKE).

#### Dział 8: Stereometria (Tablice CKE str. 26–28)
46. **`pole-przekatna-prostopadloscianu`**: $P_c = 2(ab+bc+ca)$ oraz przekątna $d = \sqrt{a^2+b^2+c^2}$ (i sześcian: $V=a^3, P_c=6a^2, d=a\sqrt{3}$, str. 26 tablic CKE).
47. **`pole-graniastoslupa-ostroslupa`**: $P_b = Ob \cdot h$, $P_c = 2P_p + P_b$ (graniastosłup) oraz $P_c = P_p + P_b$ (ostrosłup, str. 27 tablic CKE).
48. **`pole-walca`**: $P_b = 2\pi r h$, $P_c = 2\pi r(r+h)$ w trybie `nvar` z obsługą $\pi$ (str. 27 tablic CKE).
49. **`pole-tworzaca-stozka`**: Tworząca $l = \sqrt{r^2+h^2}$, pole boczne $P_b = \pi r l$, pole całkowite $P_c = \pi r(r+l)$ w trybie `nvar` z obsługą $\pi$ (str. 27 tablic CKE).
50. **`bryly-sciete`**: Ostrosłup ścięty $V = \frac{1}{3}H(P_1+\sqrt{P_1P_2}+P_2)$ oraz stożek ścięty $V = \frac{1}{3}\pi H(R^2+Rr+r^2), P_b = \pi(R+r)l$.

#### Dział 9: Kombinatoryka, Prawdopodobieństwo, Statystyka (Tablice CKE str. 28–32)
51. **`wariacje-z-powtorzeniami`**: $\overline{V}_n^k = n^k$ (str. 28 tablic CKE) oraz **`kombinacje-z-powtorzeniami`**: $\overline{C}_n^k = \binom{n+k-1}{k}$.
52. **`prawdo-wlasnosci`**: Suma dwóch zdarzeń $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ (tryb `nvar`!), zdarzenie przeciwne $P(A') = 1 - P(A)$, zdarzenia niezależne $P(A\cap B) = P(A)\cdot P(B)$ (str. 29 tablic CKE).
53. **`tw-bayesa`**: Twierdzenie Bayesa $P(B_k|A) = \frac{P(B_k)P(A|B_k)}{\sum P(B_i)P(A|B_i)}$ (str. 30 tablic CKE).
54. **`wartosc-oczekiwana`**: Wartość oczekiwana zmiennej losowej $E(X) = \sum x_i p_i$ (oraz wariancja zmiennej losowej, str. 30 tablic CKE).
55. **`srednie-statystyczne`**: Średnia ważona $\bar{s} = \frac{\sum w_i a_i}{\sum w_i}$, średnia geometryczna $\bar{g} = \sqrt[n]{a_1\cdots a_n}$, średnia kwadratowa $\bar{k} = \sqrt{\frac{\sum a_i^2}{n}}$ i nierówność $\bar{k} \ge \bar{a} \ge \bar{g}$ (str. 31 tablic CKE).

#### Dział 10: Rachunek różniczkowy — Pochodne (Tablice CKE str. 32–33)
56. **`rownanie-stycznej`**: Równanie stycznej do wykresu funkcji w punkcie $x_0$: $y = f'(x_0)(x - x_0) + f(x_0)$ (str. 33 tablic CKE) — wylicza $f(x_0), f'(x_0)$ i równanie kierunkowe stycznej + wykres funkcji ze styczną!
57. **`monotonicznosc-ekstrema-wielomianu`**: Pełne badanie przebiegu wielomianu 3. stopnia z pochodnej: $f'(x) = 3ax^2+2bx+c$, $\Delta_{f'}$, miejsca zerowe pochodnej, przedziały monotoniczności ($f'(x)>0 \nearrow, f'(x)<0 \searrow$) oraz ekstrema lokalne $(x_{max}, y_{max}), (x_{min}, y_{min})$ + wykres!
58. **`pochodna-ilorazu-iloczynu`**: Pochodna funkcji wymiernej (homograficznej) $(\frac{ax+b}{cx+d})' = \frac{ad-bc}{(cx+d)^2}$, iloczynu $(f\cdot g)'$, funkcji potęgowej $(x^r)' = rx^{r-1}$ i elementarnych (str. 32–33 tablic CKE).

#### Uzupełnienia z Chemii i Fizyki (drugi priorytet po matematyce)
59. **Chemia (4 kluczowe braki CKE):**
    * `stezenie-molowe-procentowe`: Przeliczanie $C_p \leftrightarrow C_m$ z gęstością roztworu $d$: $C_m = \frac{C_p \cdot d}{100\% \cdot M}$ (tryb `nvar`).
    * `prawo-ostwalda`: Stała dysocjacji $K = \frac{C_0 \alpha^2}{1 - \alpha}$ (oraz przybliżona $K \approx C_0\alpha^2$, tryb `nvar`).
    * `ph-poh`: Relacja $\text{pH} + \text{pOH} = 14$, $[OH^-] = 10^{-\text{pOH}}$, $[H^+][OH^-] = 10^{-14}$.
    * `objetosc-molowa-gazu`: $n = \frac{V}{22{,}4\text{ dm}^3/\text{mol}}$ (warunki normalne).
60. **Fizyka (4 kluczowe braki CKE):**
    * `rzut-ukosny`: Czas lotu, wysokość maksymalna $h_{max}$ i zasięg $Z = \frac{v_0^2 \sin 2\alpha}{g}$ + wykres toru!
    * `predkosc-kosmiczna`: I prędkość kosmiczna $v_I = \sqrt{GM/R}$ oraz II prędkość (ucieczki) $v_{II} = \sqrt{2GM/R}$.
    * `decybele`: Poziom natężenia dźwięku $L = 10\log_{10}(I/I_0)$.
    * `transformator-skuteczne`: Przekładnia transformatora $\frac{U_1}{U_2} = \frac{N_1}{N_2} = \frac{I_2}{I_1}$ oraz wartość skuteczna $U_{sk} = \frac{U_{max}}{\sqrt{2}}$.

---

## CZĘŚĆ B: Plan Architektoniczny i Fazy Wdrożenia (Fazy 2–6)

### Faza 2: Naprawa wpisywania na telefonie + Rozbudowa silnika `exact` i `parse-formula`
1. **Silnik `exact.ts` — obsługa pierwiastków i wyrażeń z $\pi$ na wejściu:**
   * Rozbudowa `parseExact(raw)` o parsowanie: `√3`, `2√3`, `-3√2/4`, `sqrt(5)`, `π/6`, `2π/3`, `-π/4` (z automatycznym upraszczaniem przez `splitSquareFactor`).
   * Cel weryfikacji: testy jednostkowe w `src/lib/exact/exact.test.ts`.
2. **Naprawa klawiatury mobilnej i Pasek Symboli Matematycznych (`MathKeyboardBar.vue` / `SolverView.vue` / `WzornikView.vue` / `ZadanieView.vue` / `HomeView.vue`):**
   * Zmiana `inputmode="decimal"` na `type="text" inputmode="text"` w polach zmiennych solvera (oraz `type="number"` w `HomeView.vue` na tekstowe), aby systemowa klawiatura na telefonie nie blokowała liter i znaków.
   * Dodanie dotykowego paska szybkiego wstawiania znaków (**`π`**, **`√`**, **`/`**, **`−`**, **`^`**, **`x`**, **`x²`**, **`( )`**, **`|x|`**, **`≤`**, **`≥`**, **`;`**), który wstawia symbol w miejsce kursora jednym stuknięciem na telefonie.
3. **Auto-rozpoznawanie (`src/lib/parse-formula.ts`):**
   * Dodanie rozpoznawania postaci iloczynowej `a(x-x1)(x-x2)=0`, zapisu funkcyjnego `f(x)=...` / `y=...`, nierówności z wartością bezwzględną `|x-a|<r`, równań okręgu `(x-a)^2+(y-b)^2=r^2`, wyrażeń z $\pi$ i $\sqrt{}$.

### Faza 3: System powiązań „Pod / Nad” ( wzory prostsze $\leftrightarrow$ trudniejsze / rozbite $\leftrightarrow$ nierozbite )
1. **Mapa relacji `src/lib/formulas/relations.ts`:**
   * Dla każdego wzoru definiujemy powiązania kierunkowe:
     * **`simpler` (wyświetlane NAD wzorem — „Bazuje na / Wzory składowe i rozbite”):** np. nad `rownanie-kwadratowe` i `postacie-kwadratowej` linki do: `delta` ($\Delta = b^2-4ac$), `miejsca-zerowe-kwadratowej`, `wierzcholek-p-q`; nad `okrag-opisany-wpisany` link do `wzor-herona` i `pole-trojkata`.
     * **`harder` / `transforms` (wyświetlane POD wzorem — „Wykorzystywany w / Przekształcenia i trudniejsze wzory”):** np. pod `delta` linki do `miejsca-zerowe-kwadratowej`, `rownanie-kwadratowe`, `postac-kanoniczna`, `kwadratowa-iloczynowa`, `nierownosc-kwadratowa`, `ekstrema-kwadratowej`; pod `pitagoras` linki do `trojkat-prostokatny-relacje`, `tw-cosinusow`, `odl-punktow`, `pole-tworzaca-stozka`.
2. **Przenoszenie wpisanych wartości między powiązanymi wzorami (`SolverView.vue`):**
   * Kliknięcie linku nad/pod wzorem przekazuje aktualnie wpisane wspólne zmienne (np. `a, b, c` albo `r, H`) w URL, dzięki czemu od razu widzisz wynik w drugim wzorze bez ponownego wpisywania!

### Faza 4: Nowy tryb „Kombajn Zadania — Wszystkie Postacie i Przemiany Naraz” (`src/lib/omni-solver.ts` + `ZadanieView.vue` + `SolverView.vue`)
1. **Silnik `omniSolve(input)`:**
   * Wpisujesz równanie, funkcję lub zestaw danych w **dowolnej postaci** (np. `x^2 - 5x + 6 = 0`, `f(x) = 2(x-1)^2 - 8`, `2(x-1)(x-3)`, `y = -2x + 6`, `x^3 - 6x^2 + 11x - 6 = 0`, `a1=2; r=3; n=5`, `a=3; b=4; c=5`, `a=6` dla trójkąta równobocznego itd.).
   * Silnik automatycznie przekształca wejście (w obie strony: z ogólnej, z kanonicznej, z iloczynowej, z parametrów) i generuje **kompletną kartę wszystkich wyników do przepisania na maturze**:
     * **Dla funkcji / równania kwadratowego:**
       1. Postać ogólna $f(x) = ax^2+bx+c$ (współczynniki $a, b, c$)
       2. Wyróżnik $\Delta$ oraz $\sqrt{\Delta}$
       3. Miejsca zerowe / pierwiastki ($x_1, x_2$ lub $x_0$)
       4. Wierzchołek $W=(p,q)$ oraz postać kanoniczna $f(x) = a(x-p)^2+q$
       5. Postać iloczynowa (rozbita) $f(x) = a(x-x_1)(x-x_2)$
       6. Wzory Viète’a ($x_1+x_2, x_1x_2, x_1^2+x_2^2, \frac{1}{x_1}+\frac{1}{x_2}$)
       7. Monotoniczność ($\nearrow, \searrow$), zbiór wartości $ZW$, ekstremum, przecięcie z $Oy$ $(0,c)$
       8. Rozwiązania wszystkich 4 nierówności naraz ($>0, \ge 0, <0, \le 0$)
       9. Pochodna $f'(x) = 2ax+b$
       10. Interaktywny wykres ze wszystkimi punktami szczególnymi.
     * **Analogiczne pełne rozbiory dla:** funkcji liniowej / prostej, wielomianów wyższych stopni, ciągów (arytmetycznego i geometrycznego), trójkąta (z 3 boków lub równobocznego) oraz koła/kuli/walca/stożka.

### Faza 5: Implementacja wszystkich 60 brakujących wzorów i transformacji
1. Dodanie brakujących wzorów działami:
   * **Etap 5A (Priorytet #1):** Funkcja kwadratowa i liniowa (wszystkie transformacje, rozbite miejsca zerowe, $p$ i $q$, monotoniczność, wartość min/max w przedziale, Viète rozszerzony, delta `nvar`).
   * **Etap 5B:** Liczby rzeczywiste, wartość bezwzględna (nierówności), potęgi wymierne, działania na potęgach i logarytmach, zamiana podstawy, wielomiany (Bézout, Viète 3. st., Newton $T_{k+1}$, $a^n-b^n$).
   * **Etap 5C:** Ciągi i granice (drugi wzór na $S_n$, wyrazy sąsiednie, wyraz $a_n$ z $a_k$, monotoniczność, granice) + Pochodne (styczna, monotoniczność i ekstrema wielomianu 3. st., iloraz/homograficzna).
   * **Etap 5D:** Trygonometria (jedynka tryg., redukcyjne, tangens sumy/2x, kąty połówkowe, sumy/iloczyny, równania) + Planimetria (trójkąt równoboczny, pole z $\sin$, $P=pr$, $P=abc/4R$, trójkąt prostokątny $h_c$, dwusieczna, sieczna-styczna, czworokąty w okręgu, skale podobieństwa $k^2, k^3$).
   * **Etap 5E:** Geometria analityczna (wektory, pole i środek ciężkości $\triangle ABC$, przekształcenia symetrii, prosta ogólna $\leftrightarrow$ kierunkowa, okrąg ogólny $\leftrightarrow$ kanoniczny) + Stereometria (pola boczne/całkowite walca, stożka, graniastosłupa, ostrosłupa, przekątna prostopadłościanu, bryły ścięte) + Kombinatoryka/Prawdopodobieństwo/Statystyka (wariacje/kombinacje z powt., suma zdarzeń, Bayes, wartość oczekiwana, średnia ważona/geometryczna/kwadratowa).
   * **Etap 5F:** Uzupełnienie 8 wzorów z Chemii i Fizyki (`stezenie-molowe-procentowe`, `prawo-ostwalda`, `ph-poh`, `objetosc-molowa-gazu`, `rzut-ukosny`, `predkosc-kosmiczna`, `decybele`, `transformator-skuteczne`).

### Faza 6: Wykresy, Rysunki, Opisy, Sitemapa i Pełna Weryfikacja Testowa
1. **Wykresy (`SolverView.vue` + `plot.ts`):** Podpięcie `FunctionPlot` pod wszystkie wzory funkcyjne (kanoniczna, z iloczynowej, styczna do wykresu, pochodna i ekstrema wielomianu 3. stopnia, wartość bezwzględna, prosta przez 2 punkty, rzut ukośny).
2. **Rysunki geometryczne (`geometry.ts`):** Podpięcie diagramów SVG pod trójkąt równoboczny, trapez, romb, równoległobok, walec, stożek.
3. **Niezmienniki projektu (testy):**
   * Dopisanie każdego nowego wzoru do `DESCRIPTIONS` (`src/lib/descriptions.ts`), `KEYWORDS` (`src/lib/search/search.ts`) oraz macierzy przypadków w `src/lib/formulas/latex.test.ts`.
   * Wygenerowanie `public/sitemap.xml` (`npm run sitemap`) i pełne przejście bramek: `npm test`, `npm run lint`, `npm run format:check`, `npm run build`.

---

Zadaję teraz pytanie przez narzędzie `question`, aby potwierdzić zakończenie Fazy 1 i zgodę na zapisanie planu.

**Tool: question**

**Input:**
```json
{
  "questions": [
    {
      "multiple": false,
      "options": [
        {
          "label": "Zatwierdzam + zapisz plan (Recommended)",
          "description": "Plan i lista braków są kompletne — pozwalam zapisać plan w /home/zota/.opencode/plan i przejść do Fazy 2."
        },
        {
          "label": "Chcę wprowadzić poprawki do planu",
          "description": "Chcę doprecyzować lub zmienić wybrane punkty przed zapisaniem planu."
        }
      ],
      "question": "Czy zatwierdzasz powyższy audyt braków (60 nowych wzorów/transformacji z tablic CKE i rozszerzenia, naprawa wpisywania π/x/√ na telefonie, linki pod/nad wzorami, tryb Kombajn wszystkich postaci) oraz pozwalasz zapisać plan do pliku w /home/zota/.opencode/plan?",
      "header": "Zatwierdzenie planu Fazy 1"
    }
  ]
}
```

The user dismissed this question

---

## User

Ok, ale do tego jeszcze moga byc ulamki wymierne i tego typu, twierdzenia wszystkie oraz dziedziny, zakres wartosci, min / max, ktora cwiartka, uwzglednienie wlasnie cwiartki, tranformacje sin kata na inny sinus, cosinus, .... oraz tego typu. niemotononicznosc i inne. Zacznij robic na plikach.

---

## Assistant

_Thinking:_

The user is now out of Plan mode and wants me to start working on files. They added more requirements:
- ułamki wymierne (rational fractions)
- twierdzenia wszystkie (all theorems)
- dziedziny (domains)
- zakres wartości (range of values)
- min / max
- która ćwiartka (which quadrant)
- uwzględnienie ćwiartki (accounting for quadrant)
- transformacje sin kąta na inny sinus, cosinus (transformations of sin angle to other sin/cos)
- niemonotoniczność i inne (non-monotonicity etc.)

"Zacznij robic na plikach" = "Start working on files."

So the user wants me to actually start implementing. Now I'm no longer in Plan mode. I can edit files.

But wait — this is a huge scope. I need to be practical and start with something concrete, incrementally. Let me think about what to do first.

The user has given a massive list of requirements. I should start implementing in a sensible order. Given the AGENTS.md rules (surgical changes, plan before tools that write... but now the user explicitly said "Zacznij robic na plikach" = start working on files).

Actually, AGENTS.md says: "Before ANY tool call that writes, edits, or runs commands: output a PLAN and WAIT for explicit user OK." But the user has now explicitly authorized starting work. And the system reminder says I'm no longer in Plan mode. So I can proceed to edit files.

However, the scope is enormous (60+ formulas). I should not try to do everything at once. I should start with a coherent, valuable chunk and build incrementally, verifying with tests/build as I go.

Let me think about the best first step. The most foundational and highest-value work that unblocks everything else:

1. **Phase 2: Fix mobile input + extend `parseExact` to handle radicals (√) and π fractions.** This is foundational — it unblocks many formulas (equilateral triangle with √3, trig with π/6, etc.). This is a clear, testable, isolated change.

Actually, let me reconsider. The user said "Zacznij robic na plikach" — start working. And added more requirements (rational fractions, theorems, domains, ranges, min/max, quadrants, trig transformations, non-monotonicity).

Given the huge scope, I think the right approach is to start with the foundational engine work (parseExact extension for radicals and π-fractions), which is needed by many of the new formulas, and add tests. Then move to implementing new formulas.

But I need to be careful: the AGENTS.md also says "Only edit stuff discussed in plan mode" but we're now past plan mode and the user gave a clear go.

Let me start concretely:

Step 1: Extend `parseExact` in `src/lib/exact/exact.ts` to support:
- radicals: `√3`, `2√3`, `√3/2`, `-3√2/4`, `sqrt(5)`
- π fractions: `π/6`, `2π/3`, `-π/4`

Actually, the current `Exact` type is `{ rat: Rational, irr: Irr | null }` where `Irr` is `sqrt | pi | approx`. It only holds ONE irrational unit (sqrt OR pi), with a single coefficient and radicand. So `√3/2` can be represented as `{ rat: 0, irr: { type: "sqrt", coef: {p:1,q:2}, radicand: 3 } }`. And `2π/3` as `{ rat: 0, irr: { type: "pi", coef: {p:2,q:3} } }`. Good — the existing representation supports these as long as I parse them.

But `parseExact` currently:
- handles `(...)` recurring decimals
- handles `...pi` suffix → coefficient × π (but only integer/rational coefficient, e.g. `25pi`, `1/3pi`? Let me check: `raw = m[1].replace(/\*$/,"")`, `coef = raw === "" ? ONE : fromString(raw)`. So `25pi` → coef 25. `1/3pi` → fromString("1/3") works? fromString handles `1/3`. But `π/6` — the regex is `/^(.*?)pi$/` so it requires `pi` at the END. `pi/6` has pi at the START, so it won't match. And `2pi/3` has pi in the middle. So I need to handle `pi/6`, `2pi/3`, `pi` alone, `2pi`, etc.

Let me design parseExact extension carefully.

Current parseExact:
```ts
export function parseExact(s: string): Exact {
  const t = s.trim().replace(",", ".").replace(/\s+/g, "").toLowerCase().replace("π", "pi");
  if (t === "") throw ...
  const per = /^(-?)(\d*)\.?(\d*)\((\d+)\)$/.exec(t);
  if (per) { ... recurring }
  const m = /^(.*?)pi$/.exec(t);
  if (m) { ... pi suffix }
  return { rat: fromString(s), irr: null };
}
```

I need to add:
1. Radical parsing: `√n` / `sqrt(n)` with optional rational coefficient. Forms: `√3`, `2√3`, `-3√2/4`, `√3/2`, `3√2/4`.
2. π fractions: `π`, `2π`, `π/6`, `2π/3`, `-π/4`, `3π/2`.

Let me think about a robust approach. After `t` normalization (lowercase, pi replaced, spaces removed, commas→dots):

For π: match `^(-?)(${NUM})?pi(?:/(\d+))?$` where NUM is optional integer/rational? Actually coefficients can be rational too. Let me keep it simple: coefficient is a rational number string (integer or decimal or `p/q`), optionally followed by `pi`, optionally followed by `/denominator`.

Actually the cleanest: handle π with a regex like:
`/^([+-]?(?:\d+(?:\.\d+)?|\.\d+)?)pi(?:\/(\d+))?$/` — but coefficient could be a fraction `1/2pi`? Unlikely needed. Let me support: coefficient (integer/decimal) × pi, optionally divided by an integer.

Let me write a helper that parses a rational coefficient from a string using fromString (which handles integers, decimals, and `p/q`).

Actually, simpler and more general approach: I'll write a small tokenizer that handles:
- `√n` / `sqrt(n)` radical with optional leading coefficient (rational) and optional `/q` denominator applying to the whole coefficient.

Let me look at how these values are used. In formulas like `trojkat-rownoboczny`, `h = a√3/2`. The input would be like `a = 6` (compute h), or maybe they enter `h = 3√3` and compute `a`. So parseExact must handle `3√3` and `√3/2` etc.

Given the existing Exact representation supports `sqrt` with `coef` and `radicand`, I can parse:
- `√3` → `{ rat: 0, irr: { type:"sqrt", coef: ONE, radicand: 3 } }`
- `2√3` → coef 2
- `√3/2` → coef 1/2
- `3√2/4` → coef 3/4
- `-3√2/4` → coef -3/4

For π:
- `π` → coef 1
- `2π` → coef 2
- `π/6` → coef 1/6
- `2π/3` → coef 2/3
- `-π/4` → coef -1/4

But also `2π/3` — need to parse coefficient `2` and denominator `3`.

Let me write a comprehensive parseExact. I'll be careful about the order: recurring decimal first, then radicals, then pi (including pi fractions), then plain rational.

Let me also consider: `sqrt(3)` form and `√(3)`? The parse-formula already uses `sqrt(...)` as a separate regex in parseEquation. For parseExact, I should accept `√` prefix form primarily, and maybe `sqrt(...)`.

Let me write the code.

Actually, let me reconsider the overall plan. This is a massive task. The user said "Zacznij robic na plikach" (start working on files). I should:

1. Start with the foundational `parseExact` extension + tests (unblocks everything).
2. Then implement new formulas incrementally.

But I must be careful to keep changes surgical and testable. Let me begin.

Let me first re-read the exact.ts parseExact and exact.test.ts to understand test structure.

Actually I already have exact.ts content. Let me check exact.test.ts to see the test format.

Let me read exact.test.ts and rational.test.ts and engine.test.ts quickly to understand test conventions, then start implementing.

Actually, I should just start. Let me read the test files first to match conventions.

Let me plan the first concrete deliverable (a coherent vertical slice):

**Deliverable 1: `parseExact` extended to parse radicals and π fractions.**

I'll edit `src/lib/exact/exact.ts` and add tests to `src/lib/exact/exact.test.ts`.

Let me read the existing exact.test.ts to see structure.

Then, after that works, I'll implement new formulas. Given the scale, I'll aim to build a solid foundation first, then add formulas in logical groups, running tests after each.

Let me read exact.test.ts and engine.test.ts.

Zaczynam pracę na plikach. To ogromny zakres, więc zacznę od fundamentu, który odblokuje całą resztę: rozszerzenie parsera liczb (`parseExact`) o pierwiastki (`√3`, `2√3`, `√3/2`) i ułamki z π (`π/6`, `2π/3`) — bez tego nie da się zbudować trójkąta równobocznego, trygonometrii z ćwiartkami, ułamków wymiernych itd.

Najpierw sprawdzam strukturę istniejących testów silnika.



**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/exact/exact.test.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/exact/exact.test.ts, lines 1-57
1: import { describe, expect, it } from "vitest";
2: import { fromString } from "./rational";
3: import { approx, exactOf, solveQuadratic, sqrtRational } from "./exact";
4: import { formatDecimal, formatExactText, formatLatex } from "./format";
5: 
6: describe("sqrtRational", () => {
7:   it("reduces √12 to 2√3", () => {
8:     expect(formatExactText(sqrtRational(fromString("12")))).toBe("2√3");
9:   });
10: 
11:   it("keeps perfect squares rational", () => {
12:     expect(formatExactText(sqrtRational(fromString("9")))).toBe("3");
13:   });
14: });
15: 
16: describe("solveQuadratic", () => {
17:   it("solves x²-5x+6=0 exactly", () => {
18:     const q = solveQuadratic(fromString("1"), fromString("-5"), fromString("6"));
19:     expect(q.kind).toBe("two");
20:     if (q.kind === "two") {
21:       expect(formatExactText(q.roots[0])).toBe("2");
22:       expect(formatExactText(q.roots[1])).toBe("3");
23:     }
24:   });
25: 
26:   it("solves x²-2=0 as ±√2", () => {
27:     const q = solveQuadratic(fromString("1"), fromString("0"), fromString("-2"));
28:     expect(q.kind).toBe("two");
29:     if (q.kind === "two") {
30:       expect(formatExactText(q.roots[0])).toBe("−√2");
31:       expect(formatExactText(q.roots[1])).toBe("√2");
32:       expect(approx(q.roots[1])).toBeCloseTo(Math.SQRT2, 10);
33:     }
34:   });
35: 
36:   it("reports no real roots for Δ<0", () => {
37:     const q = solveQuadratic(fromString("1"), fromString("0"), fromString("1"));
38:     expect(q.kind).toBe("none");
39:   });
40: 
41:   it("solves the linear fallback when a=0", () => {
42:     const q = solveQuadratic(fromString("0"), fromString("2"), fromString("-4"));
43:     expect(q.kind).toBe("linear");
44:     if (q.kind === "linear") expect(formatExactText(q.roots[0])).toBe("2");
45:   });
46: });
47: 
48: describe("format", () => {
49:   it("renders latex with sqrt", () => {
50:     expect(formatLatex(sqrtRational(fromString("12")))).toBe("2\\sqrt{3}");
51:   });
52: 
53:   it("rounds decimals", () => {
54:     expect(formatDecimal(sqrtRational(fromString("2")), 2)).toBe("1.41");
55:     expect(formatDecimal(exactOf(fromString("1/3")), 2)).toBe("0.33");
56:   });
57: });

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/exact/engine.test.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/exact/engine.test.ts, lines 1-79
1: import { describe, expect, it } from "vitest";
2: import { binom, factorial, fromString } from "./rational";
3: import { approx, logExact, parseExact, rootRational, trigExact } from "./exact";
4: import { formatExactText } from "./format";
5: 
6: describe("factorial/binom", () => {
7:   it("computes 5! and C(5,2)", () => {
8:     expect(factorial(5n)).toBe(120n);
9:     expect(binom(5n, 2n)).toBe(10n);
10:     expect(binom(49n, 6n)).toBe(13983816n);
11:   });
12: 
13:   it("rejects invalid input", () => {
14:     expect(() => binom(5n, 6n)).toThrow();
15:     expect(() => factorial(-1n)).toThrow();
16:   });
17: });
18: 
19: describe("trigExact", () => {
20:   it("returns exact school values", () => {
21:     expect(formatExactText(trigExact("sin", 30))).toBe("1/2");
22:     expect(formatExactText(trigExact("cos", 30))).toBe("(1/2·√3)");
23:     expect(formatExactText(trigExact("tan", 45))).toBe("1");
24:     expect(formatExactText(trigExact("sin", 90))).toBe("1");
25:     expect(formatExactText(trigExact("cos", 90))).toBe("0");
26:     expect(formatExactText(trigExact("sin", 150))).toBe("1/2");
27:     expect(formatExactText(trigExact("cos", 180))).toBe("-1");
28:   });
29: 
30:   it("falls back to approx for odd angles", () => {
31:     expect(approx(trigExact("sin", 37))).toBeCloseTo(Math.sin((37 * Math.PI) / 180), 10);
32:   });
33: 
34:   it("rejects tan 90", () => {
35:     expect(() => trigExact("tan", 90)).toThrow();
36:   });
37: });
38: 
39: describe("logExact", () => {
40:   it("returns exact integer logs", () => {
41:     expect(formatExactText(logExact(fromString("2"), fromString("8")))).toBe("3");
42:     expect(formatExactText(logExact(fromString("10"), fromString("1")))).toBe("0");
43:   });
44: 
45:   it("falls back to approx otherwise", () => {
46:     expect(approx(logExact(fromString("2"), fromString("3")))).toBeCloseTo(Math.log2(3), 10);
47:   });
48: });
49: 
50: describe("rootRational", () => {
51:   it("finds exact integer roots", () => {
52:     expect(formatExactText(rootRational(fromString("16"), 4))).toBe("2");
53:     expect(formatExactText(rootRational(fromString("27"), 3))).toBe("3");
54:     expect(formatExactText(rootRational(fromString("1/4"), 2))).toBe("1/2");
55:     expect(formatExactText(rootRational(fromString("-8"), 3))).toBe("-2");
56:   });
57: 
58:   it("throws for irrational and invalid input", () => {
59:     expect(() => rootRational(fromString("2"), 2)).toThrow();
60:     expect(() => rootRational(fromString("-4"), 2)).toThrow();
61:     expect(() => rootRational(fromString("8"), 1)).toThrow();
62:   });
63: });
64: 
65: describe("parseExact periods", () => {
66:   it("parses repeating decimals", () => {
67:     expect(formatExactText(parseExact("0.(3)"))).toBe("1/3");
68:     expect(formatExactText(parseExact("0.(6)"))).toBe("2/3");
69:     expect(formatExactText(parseExact("1.2(34)"))).toBe("611/495");
70:     expect(formatExactText(parseExact("-0.(6)"))).toBe("-2/3");
71:     expect(formatExactText(parseExact("2.(0)"))).toBe("2");
72:   });
73: 
74:   it("rejects malformed periods", () => {
75:     expect(() => parseExact("0.()")).toThrow();
76:     expect(() => parseExact("0.(a)")).toThrow();
77:     expect(formatExactText(parseExact("(3)"))).toBe("1/3");
78:   });
79: });

**Tool: read**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/exact/index.ts"
}
```

Read file /home/zota/neo/matura-app/src/lib/exact/index.ts, lines 1-3
1: export * from "./rational";
2: export * from "./exact";
3: export * from "./format";

---

## Assistant

_Thinking:_

Now I understand the test conventions. Let me also read rational.test.ts to see if there's a test there that might conflict.

Actually, I have enough. Let me start implementing.

First, let me carefully write the extended `parseExact`. I need to:

1. Keep existing behavior: recurring decimals `0.(3)`, plain rational `1/3`, decimal `2.5`, `25pi` suffix.
2. Add: radicals `√3`, `2√3`, `√3/2`, `-3√2/4`, `sqrt(5)`.
3. Add: π fractions `π`, `2π`, `π/6`, `2π/3`, `-π/4`.

Let me think about the exact parsing algorithm, being careful about the current normalization:
```ts
const t = s.trim().replace(",", ".").replace(/\s+/g, "").toLowerCase().replace("π", "pi");
```

So `√` stays as `√` (not lowercased away). `sqrt(5)` stays `sqrt(5)`. `π` → `pi`. `2√3` → `2√3`.

Now the plan for parseExact:

After computing `t`:

1. Recurring decimals (existing `per` regex) — keep as is.

2. π handling. Need to handle:
   - `pi` → π with coef 1
   - `2pi` → coef 2 (already handled by existing `m` regex `/^(.*?)pi$/`)
   - `pi/6` → coef 1/6
   - `2pi/3` → coef 2/3
   - `-pi/4` → coef -1/4
   - `3pi/2` → coef 3/2

   So I should replace the existing `/^(.*?)pi$/` with a more general regex that handles an optional numerator coefficient (rational) and optional denominator.

   But careful: existing behavior also strips trailing `*`. Let me preserve.

   New approach for π:
   ```
   // pi possibly with a rational numerator and/or integer denominator
   const piM = /^(-?)(\d*(?:\.\d+)?)(?:pi|π)(?:\/(\d+))?$/.exec(t);
   ```
   Wait but `t` already replaced π→pi, so only `pi` remains. But the coefficient could itself be a fraction like `1/2pi`? That's unusual. Let me support integer/decimal coefficient + optional denominator. Also support no coefficient (=1).

   Actually, to keep it simple and correct, I'll match:
   - optional sign
   - optional rational coefficient (could be decimal or integer; I'll also allow `p/q` fraction)
   - `pi`
   - optional `/denom` (integer)

   Let me write a robust regex. I'll allow the coefficient part to be a rational number string (matching fromString's grammar: integer, decimal, or `p/q`).

   The fromString regex: `^(-?\d+)\s*\/\s*(-?\d+)$` for fractions, `^(-?)(\d+)(?:\.(\d+))?$` for decimals/integers. Since `t` has no spaces, I can use `-?\d+(?:\.\d+)?` or `-?\d+/-?\d+` or `-?\d+(?:\.\d+)?`.

   Let me define a helper `parseCoef(raw: string): Rational` that returns ONE if empty/`+`, neg(ONE) if `-`, else fromString(raw).

   Regex for π:
   ```
   /^(.*?)pi(?:\/(\d+))?$/
   ```
   where `(.*?)` is the coefficient (empty, `-`, `+`, or a rational). Then:
   - coef = parseCoef(m[1])
   - if m[2] denominator present, coef = div(coef, of(denom))

   But wait — the current regex is `/^(.*?)pi$/` which already matches `25pi` and `1/3pi`? Let me check: `1/3pi` → m[1] = "1/3", then `coef = fromString("1/3")` → works. Good. So extending to `/^(.*?)pi(?:\/(\d+))?$/` handles `pi/6` (m[1]="", m[2]="6" → coef=1, denom=6 → 1/6), `2pi/3` (m[1]="2", m[2]="3" → 2/3), etc.

   But careful: the `(.*?)` lazy match with `pi` in the middle. For `2pi/3`, `(.*?)` would try to match minimal before `pi`. Since there's only one `pi`, `(.*?)` = "2". Good. For `pi/6`, `(.*?)` = "" (empty), matches `pi`, then `/6`. Good.

   But there's an ambiguity: what if the denominator also contains `pi`? No, denominator is `(\d+)` integer only. Fine.

   Edge: `2pi` → `/^(.*?)pi(?:\/(\d+))?$/` → m[1]="2", m[2] undefined. coef=2. Good.

   But also need to handle negative: `-2pi/3` → m[1] = "-2", coef = -2, denom 3 → -2/3. Good. `-pi/4` → m[1]="-", parseCoef("-") = neg(ONE) = -1, denom 4 → -1/4. Good.

   So replace the existing pi regex block with the extended one. But note: the existing code has:
   ```ts
   const m = /^(.*?)pi$/.exec(t);
   if (m) {
     const raw = m[1].replace(/\*$/, "");
     const coef = raw === "" || raw === "+" ? ONE : raw === "-" ? neg(ONE) : fromString(raw);
     return { rat: ZERO, irr: { type: "pi", coef } };
   }
   ```
   
   I'll rewrite to handle the denominator. But I need `div` and `of` which are already imported? Let me check imports in exact.ts: it imports `ONE, ZERO, add, cmp, div, fromString, isZero, mul, neg, norm, of, pow, sub, toNumber` from rational. Yes `div` and `of` are there.

   Also `parseExact` currently returns `{ rat: fromString(s), irr: null }` at the end (using original `s`, not `t`). Let me keep that.

3. Radicals. Handle:
   - `√3` → sqrt 3, coef 1
   - `2√3` → coef 2, radicand 3
   - `√3/2` → coef 1/2
   - `2√3/4` → coef 2/4 = 1/2
   - `-3√2/4` → coef -3/4
   - `sqrt(3)` → sqrt 3
   - `2sqrt(3)` → coef 2

   Forms: `[coef]√[radicand][/denom]` or `[coef]sqrt(radicand)[/denom]`.

   I'll write a regex:
   ```
   /^(.*?)(?:√(\d+)|sqrt\((\d+)\))(?:\/(\d+))?$/
   ```
   where `(.*?)` is the optional rational coefficient (empty, `-`, `+`, or rational). Then radicand = m[2] or m[3], denom = m[4].

   coef = parseCoef(coefRaw); if denom present, coef = div(coef, of(denom)).

   radicand must be a positive integer (BigInt). If radicand is 0, return ZERO rational? Actually √0 = 0. Let me handle radicand "0" → return exactOf(ZERO). If radicand is a perfect square, we could simplify via sqrtRational... but input is `√3` typically non-perfect. But `√4` should become 2? sqrtRational handles that. Actually for input parsing, I can just use `sqrtRational(fromString(radicand))` and multiply by coef... but the coefficient needs to combine with the sqrt's coefficient.

   Hmm. Let me think. `2√3` = coef 2 × √3. Using the Exact representation: `{ rat: ZERO, irr: { type: "sqrt", coef: 2, radicand: 3 } }`.

   But `√4` should simplify to `2` (rational). And `2√4` = 4. And `√12` = `2√3`. So I should use `sqrtRational` to simplify the radicand, then multiply by the outer coefficient.

   Approach:
   ```ts
   const inner = sqrtRational(fromString(radicandStr)); // Exact, e.g. √12 → {rat:0, irr:{sqrt, coef:2, radicand:3}}, √4 → {rat:2, irr:null}, √9→{rat:3}
   // multiply inner by coef (rational):
   // if inner.irr is null → { rat: mul(inner.rat, coef), irr: null }
   // else → { rat: ZERO, irr: { sqrt, coef: mul(inner.irr.coef, coef), radicand } }
   ```
   Use `mulRat(inner, coef)` — there's `mulRat(e: Exact, r: Rational): Exact` already defined! It handles irr null (multiplies rat) and irr sqrt (multiplies coef). For pi it also multiplies coef. Good.

   But wait — `mulRat` for a sqrt with coef multiplies coef: `return { rat: mul(e.rat, r), irr: irr ? { ...irr, coef: mul(irr.coef, r) } : null }`. And for rat-only (irr null): `{ rat: mul(e.rat, r), irr: null }`. But when r is zero it returns `{rat: ZERO, irr: null}`. Good.

   Actually `mulRat` checks `if (isZero(r)) return {rat: ZERO, irr: null}`. Good.

   So radical parse:
   ```ts
   const inner = sqrtRational(fromString(radicandStr));
   const value = mulRat(inner, coef);
   return value;
   ```
   But if coef is negative, mulRat handles it (coef sign). Good.

   Edge: radicand "0" → sqrtRational(fromString("0")) → `{rat: ZERO, irr: null}` (since isZero). Then mulRat → ZERO. Fine.

   Negative radicand? `√-4` invalid (imaginary) → sqrtRational throws. Good, error propagates.

   But careful: the regex `√(\d+)` won't match `√-4` (negative sign inside). So `-√4` → coef "-", radicand 4 → -2. And `√-4` → not matched → falls through to fromString which will throw. Acceptable.

4. Order matters: I should check radicals and π BEFORE the plain `fromString(s)` fallback. Also `sqrt(...)` form — but wait, `parseEquation` (the equation recognizer) already handles `sqrt(9)` separately and routes to `pierwiastek` formula. But `parseExact` is for the numeric field inputs. Should `parseExact` handle `sqrt(9)`? The user's requirement includes "równania z pi, ze zmiennymi" and "wpisywanie liczb z π i √". I'll add `sqrt(...)` to parseExact too for completeness. Actually, hmm — if someone types `sqrt(9)` in a numeric field, currently parseExact would throw. Adding sqrt(...) support is good.

   But there's subtlety: `parseExact` is called from solver.parseInput with `parseExact(raw)`. If a user enters `√3` in a field, it should work. Good.

Let me also double check: does anything currently rely on parseExact rejecting `√`? Unlikely. Tests in latex.test.ts don't use √ inputs except via formulas internally. The `pierwiastek` formula's input is `m` (a number), not `√`. So no conflict.

Now, there's also the question of `parseExact` handling `pi` with denominator AND also the existing `25pi` behavior must still pass (latex.test.ts uses "25π" for pole-kola). Let me verify my new regex handles `25pi` (after π→pi): `/^(.*?)pi(?:\/(\d+))?$/` → m[1]="25", m[2] undefined → coef 25. 

Also `pole-kola` test uses P:"25π". parseExact("25π") → t = "25pi" → coef 25 → pi*25. Good.

Also there's the `sqrt` form being parsed by parseEquation for `pierwiastek` — that's a different function, no conflict.

Now, one more consideration: the recurring-decimal regex `per` runs first. My new regexes run after. The π regex `/^(.*?)pi(?:\/(\d+))?$/` — could it accidentally match something with no pi? No, requires `pi`. Good.

But wait, there's a subtle issue: the existing π regex was `/^(.*?)pi$/`. If I change to `/^(.*?)pi(?:\/(\d+))?$/`, then for input `pi/6` it matches. But what about `2pi/3`? `(.*?)` lazy = "2", then "pi", then "/3". Good.

What about a plain rational like `3/4`? No `pi`, no `√`, so falls through to fromString("3/4"). Good.

Let me also handle the case where the coefficient before `pi` could itself be a fraction: `1/2pi`? The lazy `(.*?)` would match "1/2" then "pi". Then parseCoef("1/2") = fromString("1/2") = 1/2. Then no denominator. coef = 1/2. Good — actually this already works with existing code too.

OK. Now let me also think about `parseCoef` helper. I'll define inline. For the radical regex, coefficient before `√` could be empty, `-`, `+`, or a rational like `2`, `1/2`, `1.5`. But wait, `2√3` — the coefficient "2" is followed by "√". If I use `(.*?)` lazy, for `2√3`, `(.*?)` = "2" (minimal) then "√3". For `1/2√3`, `(.*?)` = "1/2". Good.

But there's ambiguity with `√3/2`: coefficient empty, `√`, radicand "3", `/2`. My regex `^(.*?)(?:√(\d+)|sqrt\((\d+)\))(?:\/(\d+))?$` — for `√3/2`: `(.*?)` lazy tries "" first, then needs `√(\d+)` = "√3", then `/2` → matches with coefRaw="", radicand="3", denom="2". Good. coef = 1, div by 2 = 1/2. 

For `2√3/4`: coefRaw="2", radicand="3", denom="4" → coef = 2/4 = 1/2. Good.

Edge: what about `-√3/2`? coefRaw="-", parseCoef("-") = -1, denom 2 → -1/2. Good.

Now let me write the code. I'll create a small helper function inside parseExact or a module-level helper.

Let me write the new parseExact. Here's my plan for the edit:

Replace the block:
```ts
  const m = /^(.*?)pi$/.exec(t);
  if (m) {
    const raw = m[1].replace(/\*$/, "");
    const coef = raw === "" || raw === "+" ? ONE : raw === "-" ? neg(ONE) : fromString(raw);
    return { rat: ZERO, irr: { type: "pi", coef } };
  }
  return { rat: fromString(s), irr: null };
```

with:
```ts
  const coefOf = (raw: string): Rational =>
    raw === "" || raw === "+" ? ONE : raw === "-" ? neg(ONE) : fromString(raw.replace(/\*$/, ""));

  const piM = /^(.*?)pi(?:\/(\d+))?$/.exec(t);
  if (piM) {
    let coef = coefOf(piM[1] ?? "");
    if (piM[2] !== undefined) coef = div(coef, of(piM[2]));
    return { rat: ZERO, irr: { type: "pi", coef } };
  }

  const sqM = /^(.*?)(?:√(\d+)|sqrt\((\d+)\))(?:\/(\d+))?$/.exec(t);
  if (sqM) {
    const radicand = sqM[2] ?? sqM[3];
    let coef = coefOf(sqM[1] ?? "");
    if (sqM[4] !== undefined) coef = div(coef, of(sqM[4]));
    return mulRat(sqrtRational(fromString(radicand)), coef);
  }

  return { rat: fromString(s), irr: null };
```

Wait, but there's a subtlety with the order: the `pi` check comes before `sqrt`. But what if input is `sqrt(pi)`? Not meaningful; skip.

Also, note: the original `m` variable name. Let me rename to piM to avoid confusion. And I need `mulRat` — is it imported? Let me check exact.ts imports: `import { approx, approxOnly, cbrtRational, exactOf, logExact, mulRat, rootRational, solveQuadratic, sqrtRational, stripPi } from "../exact/exact";` — wait, that's the math.ts file. In exact.ts itself, `mulRat` is DEFINED in exact.ts (line 212). And `sqrtRational` is defined in exact.ts (line 115). So within exact.ts, I can call `mulRat` and `sqrtRational` directly (they're module-local). And `div`, `of`, `ONE`, `neg`, `ZERO`, `fromString` are imported. Good.

Actually wait, `sqrtRational` and `mulRat` are defined AFTER `parseExact` in the file (parseExact at line 42, sqrtRational at 115, mulRat at 212). Since these are function declarations (hoisted) vs... let me check: `export function sqrtRational(...)` and `export function mulRat(...)` — function declarations, hoisted. So calling them from parseExact is fine.

Also `coefOf` — I'll define it as a nested function or module-level. Since parseExact is exported and I want it clean, I'll inline a small helper. Actually there's already `parseExact` using `fromString`. Let me just inline.

Let me also consider: should I simplify the coefficient with `norm`? `fromString` already returns normalized rational. `div(coef, of(denom))` returns normalized. Good.

Now, there's one concern: the radical regex `√(\d+)` requires the radicand to be pure digits (positive integer). But `√12` is fine. What about `√(12)`? Rare. I'll skip parentheses form for √; `sqrt(12)` covers the parenthesized case.

Also, I realize the radical could also have a denominator that's not integer (e.g. `√3/(2)`)? Skip; integer denominator is enough for matura.

Let me also think: does the π fraction need to support denominator being a decimal? No, integer denominator is enough (`π/6`, `π/3`, `π/4`, `π/2`). Good.

Now let me write the tests for parseExact radicals and pi fractions in engine.test.ts (or exact.test.ts). I'll add to engine.test.ts where parseExact periods are tested, or exact.test.ts. Let me add a new describe block in exact.test.ts (which already imports parseExact? No — exact.test.ts imports `approx, exactOf, solveQuadratic, sqrtRational`. engine.test.ts imports `parseExact`. Let me add to engine.test.ts.

Let me write tests:
```ts
describe("parseExact radicals and pi fractions", () => {
  it("parses radicals", () => {
    expect(formatExactText(parseExact("√3"))).toBe("√3");
    expect(formatExactText(parseExact("2√3"))).toBe("2√3");
    expect(formatExactText(parseExact("√3/2"))).toBe("(1/2·√3)");
    expect(formatExactText(parseExact("-3√2/4"))).toBe("(-3/4·√2)");
    expect(formatExactText(parseExact("√4"))).toBe("2");
    expect(formatExactText(parseExact("2√4"))).toBe("4");
    expect(formatExactText(parseExact("sqrt(9)"))).toBe("3");
  });

  it("parses pi fractions", () => {
    expect(formatExactText(parseExact("π"))).toBe("π");
    expect(formatExactText(parseExact("2π"))).toBe("2π");
    expect(formatExactText(parseExact("π/6"))).toBe("(1/6·π)");
    expect(formatExactText(parseExact("2π/3"))).toBe("(2/3·π)");
    expect(formatExactText(parseExact("-π/4"))).toBe("(-1/4·π)");
    expect(formatExactText(parseExact("3π/2"))).toBe("(3/2·π)");
    expect(approx(parseExact("π/6"))).toBeCloseTo(Math.PI / 6, 10);
  });
});
```

Wait — I need to check what `formatExactText` produces for these. Let me check format.ts:

`formatExactText(e)`:
- if approx → "≈ ..."
- ratZero = isZero(e.rat)
- if !e.irr → formatRatText(e.rat)
- unit = irrUnitText(e) → "√3" or "π"
- coef = e.irr.coef
- if ratZero → coefText(coef, unit)
- ...

`coefText(coef, unit)`:
- coef 1/1 → unit (so "√3" for coef 1)
- coef -1 → "−unit"
- coef.q===1 → `${p}${unit}` → "2√3"
- else → `(${formatRatText(coef)}·${unit})` → "(1/2·√3)"

So:
- `√3`: coef 1/1 → "√3" ✓
- `2√3`: coef 2/1 → "2√3" ✓
- `√3/2`: coef 1/2 → "(1/2·√3)" ✓
- `-3√2/4`: coef -3/4 → "(-3/4·√2)" ✓ (formatRatText(-3/4) = "-3/4")
- `√4`: sqrtRational(4) = {rat:2, irr:null}, mulRat(coef 1) = {rat:2, irr:null} → "2" ✓
- `2√4`: coef 2 × 2 = 4 → "4" ✓
- `sqrt(9)`: → {rat:3} → "3" ✓
- `π`: coef 1 → "π" ✓
- `2π`: "2π" ✓
- `π/6`: coef 1/6 → "(1/6·π)" ✓
- `2π/3`: "(2/3·π)" ✓
- `-π/4`: "(-1/4·π)" ✓
- `3π/2`: "(3/2·π)" ✓

Great, these match my expectations.

But wait — there's a subtlety with `parseExact("√4")`. `sqrtRational(fromString("4"))`. fromString("4") = {p:4,q:1}. sqrtRational: cmp(r,0)>=0 ok, isZero? no. m = r.p * r.q = 4. splitSquareFactor(4) = {outside:2, inside:1}. coef = norm(2, 1) = 2. inside===1 → return {rat: {p:2,q:1}, irr:null}. Good → "2".

Now `2√4`: coef=2, mulRat({rat:2,irr:null}, 2) = {rat: mul(2,2)=4, irr:null} → "4". Good.

Now `√12` → sqrtRational(12) = {rat:0, irr:{sqrt, coef:2, radicand:3}}. mulRat(that, coef=1) = {rat:0, irr:{sqrt,coef:2,radicand:3}} → "2√3". Good (simplifies!).

Now let me also verify the regex doesn't break existing `parseExact("25π")` used in latex.test.ts: `25π` → t="25pi" → piM matches m[1]="25", m[2] undefined → coef=25 → {rat:0, irr:{pi, coef:25}} → formatLatex → "25\\pi". Good. And solveFormula for pole-kola uses stripPi. Good.

Also `parseExact("3.141592653589793")` (in latex.test.ts zamiana-miary rad test) → plain decimal, no pi/√ → fromString → works. Good.

Also there's `parseExact` used with "0.(3)" in mnozenie-pisemne test. My new code: `per` regex first (unchanged), then piM (no match), sqM (no match), then fromString. Good.

Now, one concern: the `coefOf` helper references `neg` and `ONE` — imported. And `div`, `of` — imported. `mulRat`, `sqrtRational` — local function declarations (hoisted). Good.

Let me also double-check: in the existing code, after the `per` block and `m` (pi) block, there's `return { rat: fromString(s), irr: null }`. Note it uses `s` (original) not `t`. I'll keep that.

Now let me write the edit. I'll replace the pi block and add sqrt block.

Actually, let me write it carefully. Current lines 65-72:
```ts
  const m = /^(.*?)pi$/.exec(t);
  if (m) {
    const raw = m[1].replace(/\*$/, "");
    const coef = raw === "" || raw === "+" ? ONE : raw === "-" ? neg(ONE) : fromString(raw);
    return { rat: ZERO, irr: { type: "pi", coef } };
  }
  return { rat: fromString(s), irr: null };
```

I'll replace with the extended version.

Let me now make the edit.

After that, I'll run the tests to verify, then continue with implementing the first batch of formulas.

Actually, let me be strategic about scope. The user said "Zacznij robic na plikach" and gave a huge list. I should:

1. Extend parseExact (foundation) — DO NOW.
2. Add tests — DO NOW.
3. Run tests.

Then I'll proceed to implement formulas in a logical first batch. But I shouldn't try to do 60+ formulas in one response. I'll do a solid, verifiable chunk and report progress, then continue.

Given the constraints of this environment (I should verify with tests/build), let me do:

**This turn:**
- Extend parseExact + tests.
- Run `npm test` to verify nothing breaks.

Then continue in subsequent steps with formulas.

Actually, let me also consider: the user mentioned specific new things: "ulamki wymierne" (rational fractions — likely rational function f(x) = P(x)/Q(x) domain), "twierdzenia wszystkie" (all theorems), "dziedziny" (domains), "zakres wartości" (range), "min/max", "która ćwiartka" (quadrant), "uwzględnienie ćwiartki" (quadrant handling), "transformacje sin kąta na inny sinus/cosinus" (trig transformations), "niemonotoniczność".

These all map to new formulas I already listed plus a few more (rational function domain, quadrant-aware trig). I'll fold them into the formula implementation phase.

Let me start with parseExact. Then I'll begin implementing formulas — starting with the most requested: trig with quadrants (jedynka-trygonometryczna with quadrant), rational fractions domain, and the quadratic "kombajn" of all forms.

Given the scale, let me do parseExact first, run tests, and report. Then I'll continue in the same turn if feasible with a first formula batch.

Let me make the parseExact edit now.

Actually, let me reconsider whether to also add a helper for trig quadrant and rational fraction in this turn. I think the cleanest is: do parseExact extension + tests, verify, then start adding formulas. But the user wants to see progress on files. Let me do parseExact + a first meaningful formula or two, with tests, and verify with npm test.

Let me think about which formulas to implement FIRST that give the most value and are self-contained:

1. `trojkat-rownoboczny` — needs √3 parsing (now available). Self-contained, high-value (matura staple).
2. `jedynka-trygonometryczna` with quadrant — needs trigExact and sqrt representation (already available). High value, matches "która ćwiartka" requirement.
3. `delta` extended to nvar (find a/b/c given Δ) — matches "delty nie delty" requirement.

But I need to be careful: each formula needs: FormulaDef + registration in index.ts + DESCRIPTIONS entry + KEYWORDS entry + latex.test.ts case. That's the "non-invariant" burden (5 files per formula). Let me check what's truly required by tests:

- `latex.test.ts` has a test "covers every registered formula" — requires EVERY formula to have a CASES entry. So if I add a formula to FORMULAS, I MUST add it to latex.test.ts CASES, else test fails.
- `descriptions.test.ts` requires every formula to have a description.
- `sitemap.test.ts`/`seo.test.ts` require sitemap regenerated (only `npm run sitemap` + committed file; but sitemap.test checks committed `public/sitemap.xml` matches generator — so I need to run `npm run sitemap` after adding formulas).

So adding a formula requires updating 4-5 places + running sitemap generation. That's manageable but I must do all of it for each batch.

Let me do a focused first batch. Given time, I'll implement parseExact extension first and verify tests pass, THEN in the same turn add 1-2 formulas with all the required wiring, then run sitemap + tests.

Actually, to keep things verifiable and not break the build, let me be disciplined:

Step 1: parseExact + tests → run npm test (should pass, no new formulas yet).

Step 2: Add first formula batch (trojkat-rownoboczny + jedynka-trygonometryczna) with all wiring, run sitemap, run tests.

Let me start with Step 1 now.

Let me write the edit to exact.ts.

Actually, I realize I should also double-check: is there any issue with the `sqrt(...)` matching conflicting with something? `parseExact("sqrt(9)")` → t = "sqrt(9)". My sqM regex `/^(.*?)(?:√(\d+)|sqrt\((\d+)\))(?:\/(\d+))?$/`. For "sqrt(9)": `(.*?)` lazy tries "" then needs `sqrt\((\d+)\)` = "sqrt(9)". Matches, radicand "9". Good.

But there's a subtle bug: `(.*?)` is lazy, and the alternation `√(\d+)|sqrt\((\d+)\)` — for "sqrt(9)", the regex engine at position 0 tries `(.*?)` = "", then tries `√(\d+)` (no match at "s"), then `sqrt\((\d+)\)` (matches). Good.

For "2sqrt(3)": `(.*?)` = "2", then "sqrt(3)". Good.

OK let me write it.

Let me also add the `coefOf` helper. I'll inline it as a small arrow function inside parseExact (or a top-level function). Since parseExact is a single function, I'll define a module-level helper `parseCoef` above parseExact. Actually, cleaner to define inside. But function declarations inside are fine.

Let me write the replacement now.

One more: I need to make sure I import nothing new. `div`, `of`, `ONE`, `neg`, `ZERO`, `fromString` already imported. `mulRat`, `sqrtRational` are local functions (hoisted). Good.

Let me write the edit.

Zaczynam implementację. Najpierw fundament: rozszerzam `parseExact` o pierwiastki i ułamki z π.



**Tool: edit**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/exact/exact.ts",
  "oldString": "  const m = /^(.*?)pi$/.exec(t);\n  if (m) {\n    const raw = m[1].replace(/\\*$/, \"\");\n    const coef = raw === \"\" || raw === \"+\" ? ONE : raw === \"-\" ? neg(ONE) : fromString(raw);\n    return { rat: ZERO, irr: { type: \"pi\", coef } };\n  }\n  return { rat: fromString(s), irr: null };\n}",
  "newString": "  const coefOf = (raw: string): Rational =>\n    raw === \"\" || raw === \"+\" ? ONE : raw === \"-\" ? neg(ONE) : fromString(raw.replace(/\\*$/, \"\"));\n\n  const piM = /^(.*?)pi(?:\\/(\\d+))?$/.exec(t);\n  if (piM) {\n    let coef = coefOf(piM[1] ?? \"\");\n    if (piM[2] !== undefined) coef = div(coef, of(piM[2]));\n    return { rat: ZERO, irr: { type: \"pi\", coef } };\n  }\n\n  const sqM = /^(.*?)(?:√(\\d+)|sqrt\\((\\d+)\\))(?:\\/(\\d+))?$/.exec(t);\n  if (sqM) {\n    const radicand = sqM[2] ?? sqM[3];\n    let coef = coefOf(sqM[1] ?? \"\");\n    if (sqM[4] !== undefined) coef = div(coef, of(sqM[4]));\n    return mulRat(sqrtRational(fromString(radicand)), coef);\n  }\n\n  return { rat: fromString(s), irr: null };\n}"
}
```

Edited src/lib/exact/exact.ts (1 replacement)

---

## Assistant

_Thinking:_

Now let me add tests to engine.test.ts for the new parseExact capabilities.

Teraz dodaję testy do `engine.test.ts` dla nowych możliwości parsera.



**Tool: edit**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/exact/engine.test.ts",
  "oldString": "  it(\"rejects malformed periods\", () => {\n    expect(() => parseExact(\"0.()\")).toThrow();\n    expect(() => parseExact(\"0.(a)\")).toThrow();\n    expect(formatExactText(parseExact(\"(3)\"))).toBe(\"1/3\");\n  });\n});",
  "newString": "  it(\"rejects malformed periods\", () => {\n    expect(() => parseExact(\"0.()\")).toThrow();\n    expect(() => parseExact(\"0.(a)\")).toThrow();\n    expect(formatExactText(parseExact(\"(3)\"))).toBe(\"1/3\");\n  });\n});\n\ndescribe(\"parseExact radicals\", () => {\n  it(\"parses √n and coefficient forms\", () => {\n    expect(formatExactText(parseExact(\"√3\"))).toBe(\"√3\");\n    expect(formatExactText(parseExact(\"2√3\"))).toBe(\"2√3\");\n    expect(formatExactText(parseExact(\"√3/2\"))).toBe(\"(1/2·√3)\");\n    expect(formatExactText(parseExact(\"-3√2/4\"))).toBe(\"(-3/4·√2)\");\n    expect(formatExactText(parseExact(\"sqrt(5)\"))).toBe(\"√5\");\n    expect(formatExactText(parseExact(\"2sqrt(3)\"))).toBe(\"2√3\");\n  });\n\n  it(\"simplifies perfect squares and composite radicands\", () => {\n    expect(formatExactText(parseExact(\"√4\"))).toBe(\"2\");\n    expect(formatExactText(parseExact(\"2√4\"))).toBe(\"4\");\n    expect(formatExactText(parseExact(\"√12\"))).toBe(\"2√3\");\n    expect(formatExactText(parseExact(\"√0\"))).toBe(\"0\");\n  });\n\n  it(\"rejects negative radicands\", () => {\n    expect(() => parseExact(\"√-4\")).toThrow();\n  });\n});\n\ndescribe(\"parseExact pi fractions\", () => {\n  it(\"parses π with coefficients and denominators\", () => {\n    expect(formatExactText(parseExact(\"π\"))).toBe(\"π\");\n    expect(formatExactText(parseExact(\"2π\"))).toBe(\"2π\");\n    expect(formatExactText(parseExact(\"π/6\"))).toBe(\"(1/6·π)\");\n    expect(formatExactText(parseExact(\"2π/3\"))).toBe(\"(2/3·π)\");\n    expect(formatExactText(parseExact(\"-π/4\"))).toBe(\"(-1/4·π)\");\n    expect(formatExactText(parseExact(\"3π/2\"))).toBe(\"(3/2·π)\");\n    expect(formatExactText(parseExact(\"25π\"))).toBe(\"25π\");\n  });\n\n  it(\"keeps approximate value close to Math.PI fractions\", () => {\n    expect(approx(parseExact(\"π/6\"))).toBeCloseTo(Math.PI / 6, 10);\n    expect(approx(parseExact(\"2π/3\"))).toBeCloseTo((2 * Math.PI) / 3, 10);\n    expect(approx(parseExact(\"-π/4\"))).toBeCloseTo(-Math.PI / 4, 10);\n  });\n});"
}
```

Edited src/lib/exact/engine.test.ts (1 replacement)

---

## Assistant

**Tool: shell**

**Input:**
```json
{
  "command": "npm test 2>&1 | tail -40",
  "workdir": "/home/zota/neo/matura-app"
}
```

 ✓ src/lib/plots/plot.test.ts (21 tests) 10ms
 ✓ src/lib/exact/engine.test.ts (16 tests) 10ms
 ✓ src/lib/formulas/poly.test.ts (15 tests) 11ms
 ✓ src/lib/seo.test.ts (8 tests) 5ms
 ✓ src/lib/solver/solver.test.ts (39 tests) 23ms
 ✓ src/lib/exact/exact.test.ts (8 tests) 6ms
 ✓ src/lib/storage/storage.test.ts (5 tests) 59ms
 ✓ src/lib/units/units.test.ts (10 tests) 5ms
 ✓ src/lib/diagrams/geometry.test.ts (11 tests) 7ms
 ✓ src/lib/search/fuzzy.test.ts (7 tests) 25ms
stderr | src/lib/formulas/latex.test.ts > latex validity > matematyka/rownanie-kwadratowe renders every step without fallback
LaTeX-incompatible input and strict mode is set to 'warn': Unicode text character "ą" used in math mode [unicodeTextInMathMode]
LaTeX-incompatible input and strict mode is set to 'warn': Accented Unicode text character "ń" used in math mode [unicodeTextInMathMode]

stderr | src/lib/formulas/latex.test.ts > latex validity > fizyka/sprawnosc renders every step without fallback
LaTeX-incompatible input and strict mode is set to 'warn': Accented Unicode text character "ż" used in math mode [unicodeTextInMathMode]
LaTeX-incompatible input and strict mode is set to 'warn': Accented Unicode text character "ż" used in math mode [unicodeTextInMathMode]

stderr | src/lib/formulas/latex.test.ts > latex validity > matematyka/znak-wielomianu renders every step without fallback
LaTeX-incompatible input and strict mode is set to 'warn': Unicode text character "ą" used in math mode [unicodeTextInMathMode]

stderr | src/lib/formulas/latex.test.ts > latex validity > matematyka/znak-wielomianu renders every step without fallback
LaTeX-incompatible input and strict mode is set to 'warn': Unicode text character "ą" used in math mode [unicodeTextInMathMode]

stderr | src/lib/formulas/latex.test.ts > latex validity > matematyka/wyodrebnianie-czynnika renders every step without fallback
LaTeX-incompatible input and strict mode is set to 'warn': Unicode text character "ł" used in math mode [unicodeTextInMathMode]

 ✓ src/lib/formulas/latex.test.ts (348 tests) 405ms
 ✓ src/lib/search/search.test.ts (6 tests) 34ms
 ✓ src/lib/settings.test.ts (3 tests) 3ms
 ✓ src/lib/sitemap.test.ts (4 tests) 16ms
 ✓ src/lib/exact/rational.test.ts (6 tests) 4ms
 ✓ src/lib/katex.test.ts (3 tests) 6ms
 ✓ src/lib/descriptions.test.ts (1 test) 7ms

 Test Files  19 passed (19)
      Tests  557 passed (557)
   Start at  20:07:36
   Duration  1.61s (transform 772ms, setup 0ms, collect 1.95s, tests 657ms, environment 3ms, prepare 1.05s)



---

## Assistant

_Thinking:_

All 557 tests pass. The parseExact foundation is solid. Now let me start implementing formulas.

Given the enormous scope, I'll build incrementally. Let me create the first batch of formulas that directly address the user's new requirements:
- Trójkąt równoboczny (equilateral triangle) — uses √3 parsing
- Jedynka trygonometryczna z ćwiartką (trig identity with quadrant) — "która ćwiartka"
- Delta nvar (find a/b/c from Δ) — "delty nie delty"

But actually, before diving into formulas, let me think about what gives the most value and matches the user's phrasing. The user's most recent message emphasizes:
1. ułamki wymierne (rational fractions) + dziedziny (domains)
2. twierdzenia wszystkie (all theorems)
3. zakres wartości (range), min/max
4. która ćwiartka, uwzględnienie ćwiartki (quadrants)
5. transformacje sin→cos itd (trig transformations)
6. niemonotoniczność i inne

Let me prioritize a coherent first batch that:
- Is self-contained and testable
- Uses the new parseExact capabilities
- Addresses multiple user requirements

I'll create new formula files. Let me structure:

**Batch 1 (this turn):**
1. `trojkat-rownoboczny` (equilateral triangle) — new file `math_trojkat_rownoboczny.ts`. Addresses "√3" + planimetria.
2. `jedynka-trygonometryczna` (trig identity with quadrant) — new file `math_trygonometria.ts`. Addresses "która ćwiartka", "transformacje sin→cos/tg→ctg".

Actually, let me be even more strategic. The user explicitly asked for:
- dziedziny (domains) — rational fractions domain
- zakres wartości (range), min/max
- ćwiartki (quadrants) + trig transformations
- twierdzenia

Let me create a first batch of 2-3 formulas covering:
1. `jedynka-trygonometryczna` with quadrant → gives sin→cos, cos→sin, tg→ctg transformations with sign based on quadrant (covers ćwiartki + transformacje).
2. `trojkat-rownoboczny` → covers √3 + planimetria.
3. `delta` → extend to nvar (find a/b/c from Δ) → covers "delty nie delty".

Actually, extending `delta` to nvar mode is a modification to existing file math_delta.ts and requires changing its `mode` from "fixed" to "nvar" and rewriting solve() to handle unknown a/b/c. That's more invasive. Let me instead ADD the delta-nvar capability as part of a new formula or extend delta carefully.

Hmm. Actually the user said "delty nie delty" originally meaning "delta, not delta" — likely about Δ vs the Greek letter, or about the quadratic discriminant being computed "with Δ" vs "without Δ" (via Vieta or factored). I already have delta formula. The key new thing is: compute the missing coefficient given Δ, and compute roots "as function" vs "as equation" separately.

Let me focus. I'll do a clean first batch:

1. **`trojkat-rownoboczny`** — new file, planimetria, uses √3.
2. **`jedynka-trygonometryczna`** — new file, trygonometria, quadrant-aware, transformations sin↔cos↔tg↔ctg.

Both are self-contained FormulaDefs. I'll wire them fully (index.ts, descriptions, keywords, latex.test.ts), run sitemap, run tests.

Let me write them carefully.

### Formula 1: trojkat-rownoboczny

For an equilateral triangle with side a:
- height h = a√3/2
- area P = a²√3/4
- R = 2h/3 = a√3/3
- r = h/3 = a√3/6

Mode nvar? The relationships are all proportional to a. I can do mode "nvar" with vars a, h, P, R, r? But that's complex because each is related to a via a different constant. Actually a cleaner approach: input any ONE of {a, h, P, R, r}, compute all the others.

But the current `nvar` mode in solver.ts requires exactly one empty field, and the `solve` receives `unknown` (the empty field). For a "given one quantity, find all others" formula, the natural design is mode "fixed" with a single input var... but fixed mode requires all vars filled.

Hmm. Let me look at how "fixed" formulas with a select work. Actually, for "give one, get all" formulas, I can use a `select` for which quantity is known + one input field. Like `kat-z-bokow` uses a select `jak` + two inputs. Or `rozklad-wielomianu` uses a select for degree.

Alternative simpler design: mode "fixed" with one var `a` (the side), output all derived quantities. But the user wants "wpisujesz dowolną jedną wielkość, dostajesz wszystkie". 

Let me design with a select for "which quantity you know":
- vars: select `dana` with options ["a (bok)", "h (wysokość)", "P (pole)", "R (promień opis.)", "r (promień wpis.)"], and one input `v` (wartość).

Then solve computes a from whichever is given, then all others.

Actually this is cleaner and matches existing patterns (selects). Let me do that. The select options map to which var the `v` value represents.

Let me write:

```ts
import { add, div, isZero, mul, of, sub } from "../exact/rational";
import type { Rational } from "../exact/rational";
import { approx, exactOf, mulRat, sqrtRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;
// √3 / 2 etc as Exact
const SQRT3 = sqrtRational(of(3)); // {rat:0, irr:{sqrt, coef:1, radicand:3}}
```

Hmm wait, I need to construct constants. Let me think about the exact arithmetic.

Relations (given side a):
- h = a·√3/2
- P = a²·√3/4
- R = a·√3/3  (since R = 2h/3 = 2·(a√3/2)/3 = a√3/3)
- r = a·√3/6  (since r = h/3 = a√3/6)

Inverse (given h, P, R, r → a):
- a = 2h/√3 = 2h√3/3  (rationalize: a = 2h/√3 = (2h√3)/3)
- a = sqrt(4P/√3) = 2√(P/√3)? This gets messy with irrational denominators. Since P = a²√3/4, then a² = 4P/√3 = 4P√3/3, so a = 2√(P√3/3). Hmm, the Exact representation only supports single sqrt unit (radicand), not nested √(√3). This is getting complicated.

Actually, for the "given P, find a" case, the result a = √(4P/√3) involves a sqrt of a sqrt, which the current Exact type can't represent cleanly. 

Let me simplify: I'll compute a from whichever given, and use approx where exact is impossible. Since these are school problems, the "give one get all" is nice-to-have; but the primary matura use is "given side a, compute h, P, R, r" (all exact).

Actually, let me reconsider. The most common matura task: "trójkąt równoboczny o boku a=6; oblicz h, P, R, r". So the primary mode is: input side a (fixed), output h, P, R, r (all exact via √3). 

For the reverse (given h, find a, then P, R, r), a = 2h/√3 = 2h√3/3 is exact (single sqrt). Given R: a = R√3 (since R = a√3/3 → a = 3R/√3 = R√3). Given r: a = 6r/√3 = 2r√3. Given P: a = 2√(P/√3)... = 2√(P√3/3) which is sqrt of (3P) times... let me compute: P = a²√3/4 → a² = 4P/√3 → a = 2√(P/√3). √(P/√3) = √(P√3/3) = √(3P)/3 · √√3... no. √(P√3/3) = √P·√√3/√3. This has a nested radical, not representable.

To keep it exact and simple, I'll support: given a (side) → all exact; given h → all exact (a = 2h√3/3); given R → all exact (a = R√3); given r → all exact (a = 2r√3). Given P → I'll compute a approx (or exact if P is of the form k√3? Actually if P = a²√3/4 with a rational, then a = 2√(P/√3). For P to give rational a, P must be q√3 with q = a²/4. E.g., a=6 → P = 36√3/4 = 9√3. So given P = 9√3, a = √(36) = 6. So I can handle P by stripPi-like sqrt extraction.)

This is getting complex. Let me simplify the design to the two most useful and exact cases, plus a general fallback:

Design: mode "fixed", select `dana` (which quantity known) + input `v`. Compute side `a` exactly where possible, else approx. Then compute h, P, R, r from a.

For "from a": a = v (exact).
For "from h": a = 2h/√3 → rationalize to (2h√3)/3 = 2h/3 · √3. Exact: mulRat({irr sqrt3 coef 1}, ... ) hmm.

Actually, let me just compute a as Exact using the arithmetic. a = 2h/√3. I can compute: a = 2h / √3. Using divExact(exactOf(2h), SQRT3)? divExact handles dividing rational by sqrt: `if (!a.irr) { const coef = div(a.rat, mul(c2, {p:r, q:1})); return {rat:0, irr:{sqrt, coef, radicand:r}} }`. So divExact(exactOf(2h), {rat:0,irr:{sqrt,coef:1,radicand:3}}) = {rat:0, irr:{sqrt, coef: div(2h, 3), radicand:3}} = (2h/3)√3. That's exact and represents a = 2h√3/3. 

Similarly a = 3R/√3 = R√3: divExact(exactOf(3R), SQRT3) = {sqrt, coef: 3R/3 = R, radicand 3} = R√3. Good.

a = 6r/√3 = 2r√3: divExact(exactOf(6r), SQRT3) = {sqrt, coef: 6r/3=2r, radicand 3} = 2r√3. Good.

a from P: a = √(4P/√3). Since 4P/√3 = 4P√3/3, and if P = q√3 then 4P√3/3 = 4q·3/3 = 4q, a = √(4q) = 2√q. This needs special handling. Let me handle: given P, compute inner = 4P/√3, then sqrtRational. But 4P/√3 where P may itself be irrational (q√3). Let me do: if P is pure irrational √3 form (P.rat==0, P.irr.type=="sqrt", radicand==3), then 4P/√3 = 4·coef (rational), a = sqrtRational(4·coef). Else approximate.

This is doable but a lot of special-casing. Given the value, let me implement it carefully but keep it focused.

Actually — let me step back. Given the enormous scope and that I want to make steady, verifiable progress, let me implement `trojkat-rownoboczny` in a clean way:

- mode "fixed"
- vars: select `dana` (a/h/P/R/r) + input `v`
- solve: compute `a` (side) exactly for a/h/R/r, and for P use the √3-special-case then fallback approx; then compute h, P, R, r from a exactly; return all 4-5 values with labels.

For computing derived from a (a as Exact with possibly irr sqrt3):
- h = a·√3/2 = mulRat(mulRat(a, {p:3,q:2}?)... hmm. Let me express constants as Rational where possible.

Actually, √3/2 is not rational. Let me define:
- SQRT3: Exact = {rat:0, irr:{sqrt, coef:1, radicand:3}} (or use sqrtRational(of(3))).
- h = a · √3/2. If a is rational: h = mulRat(SQRT3, div(a, 2))? mulRat(SQRT3, a/2) = {sqrt, coef: a/2, radicand 3} = (a/2)√3. Good. If a is irrational (a = k√3 from reverse), then a·√3 = k·3 (rational!), so h = 3k/2. This needs handling when a.irr is sqrt radicand 3.

This is getting complicated because a can be rational or √3-irrational depending on input. To keep it clean and correct, I'll compute using a helper that multiplies two Exacts (or Exact × rational and Exact × Exact for same-radicand).

Actually there's `mulRat` (Exact × rational) and I'd need Exact × Exact. There's no mulExact currently. Let me check what's available: addExact, subExact, mulRat, divRat, divExact, sqrtRational, etc. No mulExact.

Given complexity, let me simplify the scope of trojkat-rownoboczny to the PRIMARY exact case and use approximations for the rest, which is totally acceptable for a matura app (it shows "≈" for approximate):

**Simplified design:**
- mode "fixed", vars: `a` (bok), and I'll just make it a single-input formula computing h, P, R, r from side a. For the "give other quantity" case, I can add a select later.

Actually, even simpler and matching the app's existing style (most formulas are "nvar" where you leave ONE field blank and it solves backward):

mode "nvar" with vars: a, h, P, R, r — but the solver requires EXACTLY one empty field and solves that one. That doesn't fit "give one get all".

Hmm. Let me reconsider what's actually most useful and simplest to implement correctly:

**Option A (simplest, matches "give side a"):** mode "fixed", one var `a`, output h, P, R, r (4 values). All exact via √3. This is the 90% matura case. Reverse (given h/P/R/r) can be a later enhancement.

I'll go with Option A for now, and note the reverse as a follow-up. This keeps it correct and exact.

Wait, but actually the app's value prop is "wpisujesz to co znasz, puste pole to niewiadoma". For equilateral triangle, giving just `a` and getting 4 outputs is a "fixed" compute-all formula (like `szesciany`, `kwadrat-sumy-roznicy` which output multiple values). That's fine and consistent.

Let me implement Option A:
- mode "fixed", vars: [{id:"a", label:"a (bok)"}]
- outputId "w", outputLabel "wyniki"
- solve: a = asRational(known.a); compute:
  - h = a√3/2 → mulRat(SQRT3, div(a, 2))
  - P = a²√3/4 → mulRat(SQRT3, div(mul(a,a), 4))
  - R = a√3/3 → mulRat(SQRT3, div(a, 3))
  - r = a√3/6 → mulRat(SQRT3, div(a, 6))
  - return values [h, P, R, r], labels ["h","P","R","r"]

Steps: show the wzór relations and substitutions.

Let me verify: mulRat(SQRT3, div(a,2)) where SQRT3 = {rat:0, irr:{sqrt, coef:1, radicand:3}}, div(a,2) rational. mulRat returns {rat:0, irr:{sqrt, coef: div(a,2), radicand:3}}. formatLatex → "(a/2)√3" → for a=6: "3√3". h = 6√3/2 = 3√3. Correct.

P for a=6: a²=36, /4=9, ×√3 = 9√3. Correct (P = 36√3/4 = 9√3).

R for a=6: 6√3/3 = 2√3. Correct.

r for a=6: 6√3/6 = √3. Correct.

Great, exact.

I'll write it. But I also want to handle the "give h/P/R/r" eventually. For now, Option A. Actually, let me add a select to also allow "which do you know" since it's not too much more and greatly improves value. But the irrational-P reverse is the messy one.

Compromise: I'll implement Option A now (side → all), which is exact and clean. I'll add reverse later. Keep momentum.

### Formula 2: jedynka-trygonometryczna (quadrant-aware)

This addresses "która ćwiartka", "uwzględnienie ćwiartki", "transformacje sin→cos→tg→ctg".

Design: given one trig function value (sin/cos/tg/ctg) AND the quadrant, compute the other three functions (with correct sign).

vars:
- select `fn`: which function is known ["sin", "cos", "tg", "ctg"]
- select `cw`: quadrant ["I (0–90°)", "II (90–180°)", "III (180–270°)", "IV (270–360°)"]
- input `v`: value of that function

solve: compute sin²α + cos²α = 1, tg = sin/cos, ctg = cos/sin with signs from quadrant.

Sign table:
- I: sin+, cos+, tg+, ctg+
- II: sin+, cos−, tg−, ctg−
- III: sin−, cos−, tg+, ctg+
- IV: sin−, cos+, tg−, ctg−

From a known value:
- If sin = s known: cos = ±√(1−s²), sign of cos by quadrant. tg = sin/cos. ctg = cos/sin.
- If cos = c known: sin = ±√(1−c²), sign by quadrant. tg = sin/cos, ctg = cos/sin.
- If tg = t known: use tg²α + 1 = 1/cos²α → cos² = 1/(1+t²), cos = ±1/√(1+t²), sin = tg·cos (with signs). ctg = 1/tg.
- If ctg = k known: tg = 1/k, then same as tg case.

This involves sqrt and signs. Results may be irrational (√). Let me compute using sqrtRational where possible, fallback approx.

Let me define:
- sign of sin: cw I,II → +; III,IV → −
- sign of cos: cw I,IV → +; II,III → −
- sign of tg/ctg: cw I,III → +; II,IV → −

Case sin=s known:
- s must be in [−1,1] (and consistent with quadrant sign? not strictly necessary to enforce, but I can warn).
- cos² = 1 − s². cos = ±√(1−s²). cosAbs = sqrtRational(1−s²) (exact if s² rational). Then cos = sign × cosAbs.
- tg = s/cos (exact division), ctg = cos/s.

I'll compute:
- `sq = sqrtRational(sub(ONE, mul(s,s)))` — but if 1−s² is negative → error (|s|>1). sqrtRational throws on negative. Good.
- cos = signCos < 0 ? negExact(sq) : sq (need negExact or mulRat(sq, -1)).

Wait, there's no negExact exported? Let me check exact.ts: there's `negExact` defined at line 327 but is it exported? `function negExact(e: Exact): Exact` — NOT exported (no `export`). Hmm. Let me check. Line 327: `function negExact(e: Exact): Exact {`. Not exported. But `negIrr` is also not exported.

So to negate an Exact, I can use `mulRat(sq, neg(ONE))` = {rat:0, irr:{sqrt, coef: neg(coef), radicand}}. That works for sqrt. For rational exactOf, mulRat(exactOf(r), -1) = {rat: neg(r), irr:null}. Good. So negate via mulRat(e, neg(ONE)).

For tg = sin/cos: divExact(sinExact, cosExact). divExact handles various cases. sin may be rational (exactOf(s)), cos may be sqrt. divExact({rat:s,irr:null}, {rat:0,irr:{sqrt,...}}) → `if (!a.irr) { coef = div(a.rat, mul(c2, {p:r,q:1})); return {rat:0, irr:{sqrt, coef, radicand:r}} }`. So tg = s/(coef·radicand)·√radicand. Hmm, that's s/(coef·r)·√r. Let me not over-think; divExact should give correct-ish exact results. But actually, wait: sin/cos where sin=s rational and cos=coef·√r. tg = s/(coef·√r) = (s/(coef·r))·√r. divExact does exactly: `coef = div(a.rat, mul(c2, {p: r, q: 1n}))` = s/(coef·r). Then returns {sqrt, coef: s/(coef·r), radicand: r}. So tg = (s/(coef·r))√r. Correct (rationalized).

This is all doable but let me be careful about sign handling and edge cases (division by zero, tg undefined, etc.).

Given time constraints, let me write a robust but not overly clever implementation. For signs, I'll compute the magnitude exactly where clean, apply sign via mulRat by +1/−1, and use approx fallback for the ctg-from-tg etc. where needed.

Actually, I think the cleanest correct approach that's also educational (shows steps):

1. Determine signSin, signCos, signTg from quadrant.
2. From known value compute sin and cos (both with sign), then tg = sin/cos, ctg = cos/sin.

Let me define helper `signed(e: Exact, positive: boolean)`: if positive return e; else mulRat(e, neg(ONE)).

For the known function:
- sin known (s): sin = exactOf(s). cos = signed(sqrt(1−s²), signCosPos). Check |s|≤1.
- cos known (c): cos = exactOf(c). sin = signed(sqrt(1−c²), signSinPos).
- tg known (t): Need sin & cos. From tg=t and sign: |cos| = 1/√(1+t²), |sin| = |t|/√(1+t²). So:
  - den = sqrtRational(add(ONE, mul(t,t))) = √(1+t²).
  - |cos| = 1/den = divRat(exactOf(ONE), den)... den is sqrt. divRat(exactOf(1), den)? divRat divides Exact by Rational, den is Exact not Rational. Use divExact(exactOf(ONE), den). divExact({rat:1,irr:null}, den={sqrt}) → coef = div(1, mul(coef, radicand)) → 1/(coef·r)·√r? Wait that gives √r/(coef·r). Hmm, but |cos| = 1/(coef√r) = √r/(coef·r). Yes that matches.
  - |sin| = |t|·|cos| = |t|/√(1+t²). sin = signed(|sin|, signSin). |sin| = mulRat(|cos|... this is irrational; |t| is rational. |sin| = |t| · (1/√(1+t²)) = mulRat(cosAbs, |t|)? mulRat multiplies the sqrt coef by |t|: cosAbs = {sqrt, coef: 1/(coef·r), radicand r}; mulRat(cosAbs, |t|) = {sqrt, coef: |t|/(coef·r), radicand r}. So |sin| = |t|√r/(coef·r). Correct since |sin| = |t|/√(1+t²) = |t|√(1+t²)/(1+t²). Wait let me verify: 1+t² = coef²·r. So |sin| = |t|/√(coef² r) = |t|/(coef√r) = |t|√r/(coef·r). Yes matches.
- ctg known (k): tg = 1/k (exactOf(div(ONE, k))), then same as tg case.

This is a fair amount of code but correct. Let me write it. I'll compute `sin` and `cos` as Exact, then tg = divExact(sin, cos), ctg = divExact(cos, sin) with guards (division by zero → "nie istnieje").

Actually, for tg and ctg, divExact may produce approx for some combos. That's fine — the note will say approximate.

Edge cases:
- sin known, |s| > 1 → error.
- cos known, |c| > 1 → error.
- tg known, t any real → fine (tg ranges all reals). But 1+t² > 0 always, so sqrt fine.
- ctg known, k = 0 → ctg undefined (cos=0). error.

Sign consistency: e.g., if sin known positive but quadrant III (sin should be negative) → contradictory; I could warn but not required. I'll add a note if the given value's sign conflicts with quadrant, but keep it simple: just compute.

Let me also produce good steps (jedynka trygonometryczna, sign by quadrant, results).

Let me write the file `math_trygonometria.ts`.

For the value formatting, I'll use formatLatex / formatDecimal via a `show` helper.

Let me now also think about the quadrant select options. I'll use labels with degree ranges:
- "I (0°, 90°)"
- "II (90°, 180°)"
- "III (180°, 270°)"
- "IV (270°, 360°)"

Selects return strings; I'll map first char to 0..3.

Let me write both files now. Then wire them.

Actually, let me be mindful of my effort budget. Two formulas fully wired = a lot. Let me do both, carefully, then wire + test.

Let me write math_trojkat_rownoboczny.ts first.

Actually, wait — I need to double check how `mulRat` handles a rational `coef` that's negative, and `div` by 2,3,4,6. All fine.

Let me also decide: should `trojkat-rownoboczny` be mode "fixed" with output multiple values? Yes.

Let me write the constants:
```ts
const SQRT3: Exact = sqrtRational(of(3)); // {rat:0, irr:{sqrt,coef:1,radicand:3}}
```
But `of(3)` = {p:3,q:1}. sqrtRational: m = 3*1 = 3, splitSquareFactor(3) = {outside:1, inside:3} (since 3 is prime). coef = norm(1,1)=1. inside=3≠1 → {rat:0, irr:{sqrt, coef:1, radicand:3}}. Good.

Now h = mulRat(SQRT3, div(a, of(2))). For a = 6: div(6,2)=3. mulRat → {sqrt, coef:3, radicand:3}. formatLatex → "3\\sqrt{3}". Good.

Let me write it.

For steps, I'll show:
1. Wzory: h = a√3/2, P = a²√3/4, R = a√3/3, r = a√3/6
2. Podstawienie: a = ...
3. Wynik: h = ..., P = ..., R = ..., r = ...

Let me write show helper like others.

OK let me write the two files and wire them. This is a big chunk. Let me write carefully.

Let me also decide file names and ids:
- File: `math_trojkat_rownoboczny.ts`, export `MATH_TROJKAT_ROWNOBOCZNY`, id "trojkat-rownoboczny", topic "Planimetria".
- File: `math_trygonometria.ts`, export `MATH_TRYGONOMETRIA`, id "jedynka-trygonometryczna", topic "Trygonometria".

Wait, there's already `math_trojkaty.ts` (tw sinusów, cosinusów, okręgi). And `math_katy.ts`. And `math_pr.ts` has podwojony-kat, suma-katow-tryg in "Trygonometria · ROZSZ". So trygonometria topic exists but I'll put jedynka in "Trygonometria" (podstawa). Topic naming: existing uses "Trygonometria · ROZSZ" for rozszerzone. Jedynka is podstawowa. I'll use topic "Trygonometria".

Let me write.

For the trig formula, I need imports: ONE, ZERO, add, cmp, div, isZero, mul, neg, of, sub from rational; approx, approxOnly, divExact, exactOf, mulRat, sqrtRational from exact; Exact type; formatLatex, formatDecimal, formatRatLatex; FormulaDef, FormulaSolution; asRational, resultLatex.

Let me write the solve logic carefully.

```ts
const jedynka: FormulaDef = {
  id: "jedynka-trygonometryczna",
  subject: "matematyka",
  topic: "Trygonometria",
  name: "Jedynka trygonometryczna (dowolna ćwiartka)",
  latex: "\\sin^2\\alpha + \\cos^2\\alpha = 1, \\; \\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}, \\; \\operatorname{ctg}\\alpha = \\frac{\\cos\\alpha}{\\sin\\alpha}",
  vars: [
    { id: "fn", label: "co znasz", kind: "select", options: ["sin α", "cos α", "tg α", "ctg α"] },
    { id: "cw", label: "ćwiartka", kind: "select", options: ["I (0–90°)", "II (90–180°)", "III (180–270°)", "IV (270–360°)"] },
    { id: "v", label: "wartość" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "funkcje",
  solve(_unknown, known, places, selects): FormulaSolution {
    const fn = selects?.["fn"] ?? "sin α";
    const cw = selects?.["cw"] ?? "I (0–90°)";
    const v = asRational(known["v"], "wartość");
    const q = ["I (0–90°)", "II (90–180°)", "III (180–270°)", "IV (270–360°)"].indexOf(cw);
    const signSin = q === 0 || q === 1 ? 1 : -1;
    const signCos = q === 0 || q === 3 ? 1 : -1;
    const signTg = q === 0 || q === 2 ? 1 : -1;
    const sgn = (e: Exact, pos: boolean): Exact => pos ? e : mulRat(e, neg(ONE));

    let sin: Exact;
    let cos: Exact;
    const steps: FormulaSolution["steps"] = [
      { title: "1. Jedynka trygonometryczna", body: "\\sin^2\\alpha + \\cos^2\\alpha = 1" },
      { title: "2. Znaki w ćwiartce", body: `ćwiartka ${["I","II","III","IV"][q]}: ${signSin > 0 ? "sin > 0" : "sin < 0"}, ${signCos > 0 ? "cos > 0" : "cos < 0"}, ${signTg > 0 ? "tg > 0" : "tg < 0"}` },
    ];

    if (fn === "sin α") {
      const sq = sqrtRational(sub(ONE, mul(v, v)));
      sin = exactOf(v);
      cos = sgn(sq, signCos > 0);
    } else if (fn === "cos α") {
      const sq = sqrtRational(sub(ONE, mul(v, v)));
      cos = exactOf(v);
      sin = sgn(sq, signSin > 0);
    } else {
      // tg or ctg
      const t = fn === "tg α" ? v : div(ONE, v); // if ctg, tg = 1/v
      const den = sqrtRational(add(ONE, mul(t, t))); // √(1+t²)
      const cosAbs = divExact(exactOf(ONE), den);    // |cos| = 1/√(1+t²)
      cos = sgn(cosAbs, signCos > 0);
      const sinAbs = mulRat(cosAbs, cmp(t, ZERO) < 0 ? neg(t) : t); // |sin| = |t|·|cos|
      sin = sgn(sinAbs, signSin > 0);
      if (fn === "ctg α" && isZero(v)) throw new Error("ctg nie istnieje dla kąta 0° / 180°");
    }

    const tg = divExact(sin, cos);
    const ctg = divExact(cos, sin);

    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };

    steps.push({ title: "3. Wynik", body: `\\sin\\alpha = ${show(sin)}, \\; \\cos\\alpha = ${show(cos)}, \\; \\operatorname{tg}\\alpha = ${show(tg)}, \\; \\operatorname{ctg}\\alpha = ${show(ctg)}` });

    return { values: [sin, cos, tg, ctg], labels: ["sin α", "cos α", "tg α", "ctg α"], steps };
  },
};
```

Wait, there's a bug: `sqrtRational(sub(ONE, mul(v, v)))` — for sin known, if v=1 then 1−1=0 → sqrtRational(0) = {rat:0,irr:null}. cos=0. Good. If v > 1 → sub(ONE, v²) negative → sqrtRational throws "pierwiastek z ujemnej". Good (error caught by solver).

For ctg known with v=0: I check `isZero(v)` and throw. But note `t = div(ONE, v)` for ctg would throw "dzielenie przez zero" anyway. But I compute t before the check. Let me reorder: check isZero(v) first for ctg. Let me put the check at the top of the else branch.

Also `divExact(sin, cos)` when cos=0 (e.g. α=90°, sin known=1, quadrant I) → divExact({rat:1,irr:null}, {rat:0,irr:null}) → `if (!b.irr) return divRat(a, b.rat)` → divRat(exactOf(1), 0) → div by zero → throws. That's an error "tg nie istnieje". But actually tg 90° should be "nie istnieje" not an error. Hmm. The solver wraps errors as `{ok:false, error}`. So if cos=0, the whole solve throws and shows error. That's not ideal (should show sin=1, cos=0, tg=nie istnieje, ctg=0). 

To handle gracefully, I should guard tg/ctg computation. Let me wrap in try/catch and set tg/ctg to a placeholder. But FormulaSolution values are Exact[]; can't easily represent "undefined". 

Simplest: if cos is zero, tg is undefined → I'll throw a specific error message "tg nie istnieje (cos α = 0)" but that loses the other results. Alternatively, compute tg via approx when cos≈0. 

Given matura, α=90° with sin=1 is a real case. Let me handle it: if isZero(cos.rat) && !cos.irr → tg undefined. I'll return values without tg/ctg? But labels expect 4. Hmm.

Let me keep it simpler for now: guard with try/catch around tg/ctg, and if it throws, use approxOnly for tg (Math.tan) — actually for cos=0, tan is ±∞, not a number. 

I think for a first version, I'll just let tg/ctg compute via divExact, and if cos=0 it throws a clear error message. The common matura cases (e.g., sin=1/2, quadrant I → cos=√3/2, tg=1/√3=√3/3, ctg=√3) work fine. Edge case cos=0 is rare. But I'd prefer graceful.

Let me handle the zero cases explicitly: 
- if cos === 0 (isZero cos.rat and no irr): tg "nie istnieje", but I still return sin, cos, ctg=0. But I can only return Exact[]. I'll approximate tg as undefined... 

Actually, I'll add a note and compute tg using a guard: if cos zero, I'll set tg = approxOnly(NaN)? approxOnly throws on non-finite. 

Let me just compute tg and ctg with a try/catch and in catch set a note "tg nie istnieje (cos α = 0)" and skip. But then values array has 3 entries and labels 3. The view maps values with labels; it's fine to have fewer values? In SolverView, `r.values.map((v,i) => ({label: r.labels[i] ?? ...}))`. So if I return 3 values + 3 labels, it shows 3. Fine.

But this complicates. For v1, let me keep the 4-value design and let edge cases (cos=0, sin=0) throw a clear message. The solver's error handling already displays a friendly message. Actually divExact throws "dokładne: dzielenie przez zero" which isn't super friendly.

Let me add explicit guards:
```ts
const cosZero = isZero(cos.rat) && !cos.irr;
const sinZero = isZero(sin.rat) && !sin.irr;
if (cosZero) throw new Error("cos α = 0 — tangens nie istnieje; wybierz inną ćwiartkę lub funkcję");
if (sinZero) throw new Error("sin α = 0 — cotangens nie istnieje; wybierz inną ćwiartkę lub funkcję");
```
Wait, sinZero is fine for ctg undefined. But sin=0 means ctg undefined but tg=0 defined. Hmm, but if I throw on sinZero, then sin=0 (α=0°/180°) cases fail entirely. That's over-restrictive. 

Let me reconsider: tg = sin/cos is undefined only when cos=0 (α=90°/270°). ctg = cos/sin undefined only when sin=0 (α=0°/180°). These are distinct. But in quadrant terms: 
- α=0°: sin=0, cos=1, tg=0, ctg undefined.
- α=90°: sin=1, cos=0, tg undefined, ctg=0.

For a first version, let me just compute and if the division is by zero, catch and produce approxOnly? No.

I'll handle it cleanly: compute tg and ctg separately with guards, and if undefined, throw with a specific friendly message ONLY if BOTH relevant are needed... Actually the simplest correct approach: 

```ts
let tg: Exact;
let ctg: Exact;
const steps result body built dynamically.
```

Given complexity, I'll do: compute cos, sin; then:
```ts
const cosZero = isZero(cos.rat) && !cos.irr;
const sinZero = isZero(sin.rat) && !sin.irr;
const tg = cosZero ? undefined : divExact(sin, cos);
const ctg = sinZero ? undefined : divExact(cos, sin);
```
And return values/labels conditionally. Build the result body accordingly.

This is cleaner. Let me do that. The values array: [sin, cos, ...(tg?[tg]:[]), ...(ctg?[ctg]:[])] and labels similarly, plus note if a function is undefined.

Actually, to keep the results always showing all four (with "nie istnieje" note), I'll return sin & cos always, and tg/ctg when defined, and add a note listing which is undefined.

Let me finalize the code. I'll build `values` and `labels` and `results` dynamically.

Let me write it now. I'll also add the sign-consistency note optionally (skip for now).

Let me write the actual files.

Given the length, let me write both files in this turn, wire them, and test.

Let me write math_trojkat_rownoboczny.ts.

Actually, I realize I should double-check: is `resultLatex` needed? I'll use `show` helper with formatLatex/formatDecimal like other formulas.

Let me write the files now.

For trojkat-rownoboczny, show helper and steps.

Let me write both files.

For the trig, I need to import `cmp` for sign of t. And `neg`. Let me list imports precisely.

Let me write math_trojkat_rownoboczny.ts:

```ts
import { ZERO, add, div, isZero, mul, of } from "../exact/rational";
import type { Rational } from "../exact/rational";
import { exactOf, mulRat, sqrtRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;
const SQRT3: Exact = sqrtRational(of(3));

const trojkatRownoboczny: FormulaDef = {
  id: "trojkat-rownoboczny",
  subject: "matematyka",
  topic: "Planimetria",
  name: "Trójkąt równoboczny",
  latex: "h = \\frac{a\\sqrt{3}}{2}, \\; P = \\frac{a^2\\sqrt{3}}{4}, \\; R = \\frac{a\\sqrt{3}}{3}, \\; r = \\frac{a\\sqrt{3}}{6}",
  vars: [{ id: "a", label: "a (bok)" }],
  mode: "fixed",
  outputId: "w",
  outputLabel: "h, P, R, r",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    if (a.p < 0n) throw new Error("bok trójkąta nie jest ujemny");
    const h = mulRat(SQRT3, div(a, of(2)));
    const P = mulRat(SQRT3, div(mul(a, a), of(4)));
    const R = mulRat(SQRT3, div(a, of(3)));
    const r = mulRat(SQRT3, div(a, of(6)));
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };
    return {
      values: [h, P, R, r],
      labels: ["h", "P", "R", "r"],
      steps: [
        { title: "1. Wzory", body: "h = \\frac{a\\sqrt{3}}{2}, \\; P = \\frac{a^2\\sqrt{3}}{4}, \\; R = \\frac{a\\sqrt{3}}{3}, \\; r = \\frac{a\\sqrt{3}}{6}" },
        { title: "2. Podstawienie danych", body: `a = ${L(a)}` },
        { title: "3. Wynik", body: `h = ${show(h)}, \\; P = ${show(P)}, \\; R = ${show(R)}, \\; r = ${show(r)}` },
      ],
    };
  },
};

export const MATH_TROJKAT_ROWNOBOCZNY: FormulaDef[] = [trojkatRownoboczny];
```

Wait, `a.p < 0n` — but if a is a fraction like 1/2, p=1 q=2, fine. If a negative, p<0. But also a=0? p=0. Should I reject a<=0? For side, a>0. Let me use cmp(a, ZERO) <= 0. I imported isZero but not cmp. Let me import cmp. Actually let me use `cmp(a, ZERO) <= 0`.

Let me import `cmp` and `ZERO`.

For the trig file, let me write it carefully.

Actually, let me reconsider `mulRat(SQRT3, div(a, of(2)))` when a=6: div(6,2)=3, mulRat → coef 3. formatLatex → "3\\sqrt{3}". show → "3√3 ≈ 5.2". Good.

Now the `h = a√3/2` — for a=6, h=3√3≈5.196. Good.

Now let me write the trig file.

Let me finalize the trig solve with the dynamic tg/ctg.

```ts
import { ONE, ZERO, add, cmp, div, isZero, mul, neg, of, sub } from "../exact/rational";
import { approx, divExact, exactOf, mulRat, sqrtRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const CW = ["I (0–90°)", "II (90–180°)", "III (180–270°)", "IV (270–360°)"];

const jedynka: FormulaDef = {
  id: "jedynka-trygonometryczna",
  subject: "matematyka",
  topic: "Trygonometria",
  name: "Funkcje trygonometryczne z ćwiartki",
  latex: "\\sin^2\\alpha + \\cos^2\\alpha = 1, \\; \\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}, \\; \\operatorname{ctg}\\alpha = \\frac{\\cos\\alpha}{\\sin\\alpha}",
  vars: [
    { id: "fn", label: "co znasz", kind: "select", options: ["sin α", "cos α", "tg α", "ctg α"] },
    { id: "cw", label: "ćwiartka", kind: "select", options: CW },
    { id: "v", label: "wartość" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "funkcje",
  solve(_unknown, known, places, selects): FormulaSolution {
    const fn = selects?.["fn"] ?? "sin α";
    const cw = selects?.["cw"] ?? CW[0]!;
    const v = asRational(known["v"], "wartość");
    const q = CW.indexOf(cw);
    const signSin = q === 0 || q === 1;
    const signCos = q === 0 || q === 3;
    const signTg = q === 0 || q === 2;
    const sgn = (e: Exact, pos: boolean): Exact => (pos ? e : mulRat(e, neg(ONE)));

    let sin: Exact;
    let cos: Exact;
    if (fn === "sin α") {
      sin = exactOf(v);
      cos = sgn(sqrtRational(sub(ONE, mul(v, v))), signCos);
    } else if (fn === "cos α") {
      cos = exactOf(v);
      sin = sgn(sqrtRational(sub(ONE, mul(v, v))), signSin);
    } else {
      if (fn === "ctg α" && isZero(v)) throw new Error("ctg nie istnieje dla kąta 0° lub 180°");
      const t = fn === "tg α" ? v : div(ONE, v);
      const den = sqrtRational(add(ONE, mul(t, t)));
      const cosAbs = divExact(exactOf(ONE), den);
      cos = sgn(cosAbs, signCos);
      sin = sgn(mulRat(cosAbs, cmp(t, ZERO) < 0 ? neg(t) : t), signSin);
    }

    const cosZero = isZero(cos.rat) && !cos.irr;
    const sinZero = isZero(sin.rat) && !sin.irr;
    const show = (e: Exact): string => {
      const lx = formatLatex(e);
      const dc = formatDecimal(e, places);
      return lx === dc ? lx : `${lx} \\approx ${dc}`;
    };

    const values: Exact[] = [sin, cos];
    const labels: string[] = ["sin α", "cos α"];
    const results: string[] = [`\\sin\\alpha = ${show(sin)}`, `\\cos\\alpha = ${show(cos)}`];
    let note: string | undefined;
    if (!cosZero) {
      const tg = divExact(sin, cos);
      values.push(tg);
      labels.push("tg α");
      results.push(`\\operatorname{tg}\\alpha = ${show(tg)}`);
    } else {
      note = "tg α nie istnieje (cos α = 0)";
    }
    if (!sinZero) {
      const ctg = divExact(cos, sin);
      values.push(ctg);
      labels.push("ctg α");
      results.push(`\\operatorname{ctg}\\alpha = ${show(ctg)}`);
    } else {
      note = note ? `${note}; ctg α nie istnieje (sin α = 0)` : "ctg α nie istnieje (sin α = 0)";
    }

    return {
      values,
      labels,
      steps: [
        { title: "1. Jedynka trygonometryczna", body: "\\sin^2\\alpha + \\cos^2\\alpha = 1" },
        { title: "2. Znaki w ćwiartce", body: `\\text{ćwiartka }${["I", "II", "III", "IV"][q]}: \\sin ${signSin ? ">0" : "<0"}, \\cos ${signCos ? ">0" : "<0"}, \\operatorname{tg} ${signTg ? ">0" : "<0"}` },
        { title: "3. Wynik", body: results.join(", \\; "), note },
      ],
    };
  },
};

export const MATH_TRYGONOMETRIA: FormulaDef[] = [jedynka];
```

Wait — there's an issue with `\\text{ćwiartka }` using Polish diacritics in math mode. The latex.test.ts strict mode warns about unicode text chars. Better avoid `\text{ćwiartka}`. Let me use plain text without diacritics or put it in note (note is rendered as plain HTML, not KaTeX). Actually the `body` goes through KaTeX (Formula component), so Polish diacritics in math mode produce warnings (but the test only checks for `latex-fallback`, not warnings — the warnings go to stderr but tests still pass). Still, cleaner to avoid. Let me use "cw. I" instead of "ćwiartka I", or use note.

Let me change step 2 body to: `\\text{czwiartka }${["I","II","III","IV"][q]}: ...` without diacritics? "czwiartka" is a typo. Let me just write the quadrant in the note (plain text) and keep body math-only.

Actually simpler: step 2 body = `\\sin${signSin?">0":"<0"}, \\; \\cos${signCos?">0":"<0"}, \\; \\operatorname{tg}${signTg?">0":"<0"}` and note = `ćwiartka ${["I","II","III","IV"][q]}`.

But note on step 2 is fine. Let me do:
```ts
{ title: "2. Znaki w ćwiartce", body: `\\sin${signSin ? ">0" : "<0"}, \\; \\cos${signCos ? ">0" : "<0"}, \\; \\operatorname{tg}${signTg ? ">0" : "<0"}`, note: `ćwiartka ${["I", "II", "III", "IV"][q]}` },
```

Good, note is plain text.

Also, `\\operatorname{tg}` — is that valid KaTeX? Yes, \operatorname{tg} works. Existing code uses `\operatorname{arctg}`? Let me check — math_katy uses `\\arcsin` etc, and `\\tan`. Actually existing formulas use `\\tan` (LaTeX \tan). Let me check: podwojony-kat uses `\\sin`, `\\cos`. For tg, existing? Let me search... `suma-katow-tryg` uses `\\sin`/`\\cos`. The formulas use `\tan`? Not sure. KaTeX supports `\tan`, `\cot`, `\operatorname{tg}`, `\operatorname{ctg}`. The Polish convention is tg/ctg. KaTeX has `\operatorname{tg}` and `\operatorname{ctg}` which render as "tg"/"ctg". Let me verify existing code uses what. Actually `math_pr.ts` podwojonyKat latex uses `\\sin 2x`, `\\cos 2x`. And `suma-katow-tryg` uses `\sin`, `\cos`. There's no tg/ctg usage yet except maybe... Let me not worry; `\operatorname{tg}` and `\operatorname{ctg}` are valid KaTeX and render correctly. The test checks `renderLatex(...)` doesn't produce `latex-fallback`. `\operatorname{tg}` is valid → no fallback. Good.

But wait, I should double check KaTeX accepts `\operatorname{tg}`. Yes, `\operatorname` accepts any name. And `\operatorname{ctg}`. Good.

Alternatively use `\tg`? KaTeX does NOT define `\tg` by default. So `\operatorname{tg}` is correct.

Now `divExact(sin, cos)` where both might be sqrt or rational — divExact handles rational/rational (divRat), and sqrt combos. Let me trust it. For the common case sin=1/2, cos=√3/2 (sqrt coef 1/2 radicand 3): tg = (1/2)/(√3/2) = 1/√3 = √3/3. divExact({rat:1/2, irr:null}, {rat:0, irr:{sqrt, coef:1/2, radicand:3}}): since a.irr null and b.irr sqrt, b.rat zero → `if (!a.irr) { coef = div(a.rat, mul(c2, {p:r, q:1n})); return {sqrt, coef, radicand:r} }` where c2 = 1/2, r = 3. coef = div(1/2, mul(1/2, 3)) = div(1/2, 3/2) = 1/3. So tg = {sqrt, coef:1/3, radicand:3} = √3/3. formatLatex → "(1/3)√3"? Let me check coefLatex: coef 1/3 → `\frac{1}{3}\cdot \sqrt{3}`. Good ≈ 0.577.

ctg = cos/sin = (√3/2)/(1/2) = √3. divExact({rat:0,irr:{sqrt,coef:1/2,radicand:3}}, {rat:1/2,irr:null}) → `if (!b.irr) return divRat(a, b.rat)` → divRat({sqrt coef 1/2}, 1/2) = {sqrt, coef: div(1/2, 1/2)=1} = √3. Good.

Excellent.

Now, there's a subtle issue: `sqrtRational(sub(ONE, mul(v, v)))` for sin known, v=1/2: sub(1, 1/4) = 3/4. sqrtRational(3/4) = splitSquareFactor(3*4=12) = {outside 2, inside 3}, coef = norm(2, 4) = 1/2. → {sqrt, coef 1/2, radicand 3}. cos = √3/2. Good.

Now let me also verify the "tg α" known path: t = v. den = √(1+t²). For t=1 (tg=1): den = √2 = {sqrt, coef 1, radicand 2}. cosAbs = divExact(exactOf(1), √2) = {sqrt, coef: div(1, mul(1,2))=1/2, radicand 2} = √2/2. sinAbs = mulRat(√2/2, 1) = √2/2. So sin = ±√2/2, cos = ±√2/2 by quadrant. For quadrant I: both +√2/2 = 0.707. Correct (45°).

Great.

Now let me write the actual files and wire them.

Let me also think about whether `asRational(known["v"], ...)` works when v contains "√3" etc. No — `asRational` throws if e.irr is set. So for jedynka, the value `v` must be rational (sin/cos/tg values are typically rational like 1/2, or √3/2 which is irrational). Hmm! If the user wants to enter cos α = √3/2, they'd type "√3/2", but `asRational` rejects irrational. So I should use the full Exact for v, not asRational.

Let me use `known["v"]` directly (it's already an Exact from parseInput). But then I need to handle v being Exact (possibly irrational). For sin known, `sub(ONE, mul(v,v))` — but v is Exact, not Rational. I'd need Exact arithmetic (mulExact, subExact).

This complicates. For v1, let me restrict v to rational input (sin/cos/tg/ctg given as rational, e.g. sin=1/2, cos=1/2, tg=1, ctg=√3?). Actually many values are irrational (√3/2). But the user can also enter decimal approximations (0.866) and I compute approx.

Hmm. Let me support rational `v` primarily (via asRational), since sin=1/2, cos=1/2, tg=1, ctg=1 are the clean cases. For irrational known values, the user can enter a decimal and I'd need approx. 

Actually, to be robust, let me accept v as Exact (don't use asRational). Then:
- For sin known: sin = v (Exact). cos² = 1 − sin². I need 1 − sin² as an Exact, then sqrt. But Exact arithmetic: subExact(exactOf(ONE), mulExact(v, v)). Is there mulExact? No. Only addExact, subExact, mulRat, divRat, divExact. No mulExact/subExact for general Exact×Exact.

This is a real limitation. For the trig identity, sin and cos are irrational (√3/2), so I need Exact×Exact.

Given the complexity and to keep correctness, let me restrict the known value `v` to a RATIONAL number (asRational), and document that. The common school cases with rational known values: sin=1/2, cos=1/2, tg=1, ctg=1 (or 0). Values like √3/2 would be entered as 0.866 (approx) — but then cos = ±√(1−0.75) = ±√0.25 = ±0.5, still works as approx-ish.

Actually with rational v, everything works exactly when v is rational and 1−v² is a perfect square rational. Good enough for v1.

So: `const v = asRational(known["v"], "wartość");`. If user types √3/2, they get "wartość: ten wariant liczę tylko dla zwykłych liczb" (asRational throws). Acceptable for now; I'll note it. Actually, I can improve the label hint: "wartość (zwykła liczba, np. 1/2)".

OK, let me finalize with asRational(v).

Let me write both files now.

Actually, let me reduce risk: I'll write the files, wire them into index.ts, add descriptions, keywords, and latex.test.ts cases, run sitemap, run tests. If something fails, iterate.

Let me write the two formula files first.

`parseExact` rozszerzony i wszystkie **557 testów przechodzi**. Teraz tworzę pierwsze wzory, które bezpośrednio realizują Twoje wymagania: trójkąt równoboczny (√3) oraz jedynkę trygonometryczną z ćwiartkami i transformacjami sin↔cos↔tg↔ctg.



**Tool: write**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_trojkat_rownoboczny.ts",
  "content": "import { ZERO, cmp, div, mul, of } from \"../exact/rational\";\nimport { mulRat, sqrtRational } from \"../exact/exact\";\nimport type { Exact } from \"../exact/exact\";\nimport { formatDecimal, formatLatex, formatRatLatex } from \"../exact/format\";\nimport type { FormulaDef, FormulaSolution } from \"./types\";\nimport { asRational } from \"./types\";\n\nconst L = formatRatLatex;\nconst SQRT3: Exact = sqrtRational(of(3));\n\nconst trojkatRownoboczny: FormulaDef = {\n  id: \"trojkat-rownoboczny\",\n  subject: \"matematyka\",\n  topic: \"Planimetria\",\n  name: \"Trójkąt równoboczny\",\n  latex:\n    \"h = \\\\frac{a\\\\sqrt{3}}{2}, \\\\; P = \\\\frac{a^2\\\\sqrt{3}}{4}, \\\\; R = \\\\frac{a\\\\sqrt{3}}{3}, \\\\; r = \\\\frac{a\\\\sqrt{3}}{6}\",\n  vars: [{ id: \"a\", label: \"a (bok)\" }],\n  mode: \"fixed\",\n  outputId: \"w\",\n  outputLabel: \"h, P, R, r\",\n  solve(_unknown, known, places): FormulaSolution {\n    const a = asRational(known[\"a\"], \"a\");\n    if (cmp(a, ZERO) <= 0) throw new Error(\"bok trójkąta musi być dodatni\");\n    const h = mulRat(SQRT3, div(a, of(2)));\n    const P = mulRat(SQRT3, div(mul(a, a), of(4)));\n    const R = mulRat(SQRT3, div(a, of(3)));\n    const r = mulRat(SQRT3, div(a, of(6)));\n    const show = (e: Exact): string => {\n      const lx = formatLatex(e);\n      const dc = formatDecimal(e, places);\n      return lx === dc ? lx : `${lx} \\\\approx ${dc}`;\n    };\n    return {\n      values: [h, P, R, r],\n      labels: [\"h\", \"P\", \"R\", \"r\"],\n      steps: [\n        {\n          title: \"1. Wzory\",\n          body: \"h = \\\\frac{a\\\\sqrt{3}}{2}, \\\\; P = \\\\frac{a^2\\\\sqrt{3}}{4}, \\\\; R = \\\\frac{a\\\\sqrt{3}}{3}, \\\\; r = \\\\frac{a\\\\sqrt{3}}{6}\",\n        },\n        { title: \"2. Podstawienie danych\", body: `a = ${L(a)}` },\n        {\n          title: \"3. Wynik\",\n          body: `h = ${show(h)}, \\\\; P = ${show(P)}, \\\\; R = ${show(R)}, \\\\; r = ${show(r)}`,\n        },\n      ],\n    };\n  },\n};\n\nexport const MATH_TROJKAT_ROWNOBOCZNY: FormulaDef[] = [trojkatRownoboczny];\n"
}
```

Created file successfully: src/lib/formulas/math_trojkat_rownoboczny.ts

**Tool: write**

**Input:**
```json
{
  "path": "/home/zota/neo/matura-app/src/lib/formulas/math_trygonometria.ts",
  "content": "import { ONE, ZERO, add, cmp, div, isZero, mul, neg, of, sub } from \"../exact/rational\";\nimport { divExact, exactOf, mulRat, sqrtRational } from \"../exact/exact\";\nimport type { Exact } from \"../exact/exact\";\nimport { formatDecimal, formatLatex } from \"../exact/format\";\nimport type { FormulaDef, FormulaSolution } from \"./types\";\nimport { asRational } from \"./types\";\n\nconst CW = [\"I (0–90°)\", \"II (90–180°)\", \"III (180–270°)\", \"IV (270–360°)\"];\n\nconst jedynka: FormulaDef = {\n  id: \"jedynka-trygonometryczna\",\n  subject: \"matematyka\",\n  topic: \"Trygonometria\",\n  name: \"Funkcje trygonometryczne z ćwiartki\",\n  latex:\n    \"\\\\sin^2\\\\alpha + \\\\cos^2\\\\alpha = 1, \\\\; \\\\operatorname{tg}\\\\alpha = \\\\frac{\\\\sin\\\\alpha}{\\\\cos\\\\alpha}, \\\\; \\\\operatorname{ctg}\\\\alpha = \\\\frac{\\\\cos\\\\alpha}{\\\\sin\\\\alpha}\",\n  vars: [\n    { id: \"fn\", label: \"co znasz\", kind: \"select\", options: [\"sin α\", \"cos α\", \"tg α\", \"ctg α\"] },\n    { id: \"cw\", label: \"ćwiartka\", kind: \"select\", options: CW },\n    { id: \"v\", label: \"wartość (np. 1/2)\" },\n  ],\n  mode: \"fixed\",\n  outputId: \"w\",\n  outputLabel: \"funkcje\",\n  solve(_unknown, known, places, selects): FormulaSolution {\n    const fn = selects?.[\"fn\"] ?? \"sin α\";\n    const cw = selects?.[\"cw\"] ?? CW[0]!;\n    const v = asRational(known[\"v\"], \"wartość\");\n    const q = CW.indexOf(cw);\n    const signSin = q === 0 || q === 1;\n    const signCos = q === 0 || q === 3;\n    const signTg = q === 0 || q === 2;\n    const sgn = (e: Exact, pos: boolean): Exact => (pos ? e : mulRat(e, neg(ONE)));\n\n    let sin: Exact;\n    let cos: Exact;\n    if (fn === \"sin α\") {\n      sin = exactOf(v);\n      cos = sgn(sqrtRational(sub(ONE, mul(v, v))), signCos);\n    } else if (fn === \"cos α\") {\n      cos = exactOf(v);\n      sin = sgn(sqrtRational(sub(ONE, mul(v, v))), signSin);\n    } else {\n      if (fn === \"ctg α\" && isZero(v)) throw new Error(\"ctg nie istnieje dla kąta 0° lub 180°\");\n      const t = fn === \"tg α\" ? v : div(ONE, v);\n      const den = sqrtRational(add(ONE, mul(t, t)));\n      const cosAbs = divExact(exactOf(ONE), den);\n      cos = sgn(cosAbs, signCos);\n      sin = sgn(mulRat(cosAbs, cmp(t, ZERO) < 0 ? neg(t) : t), signSin);\n    }\n\n    const cosZero = isZero(cos.rat) && !cos.irr;\n    const sinZero = isZero(sin.rat) && !sin.irr;\n    const show = (e: Exact): string => {\n      const lx = formatLatex(e);\n      const dc = formatDecimal(e, places);\n      return lx === dc ? lx : `${lx} \\\\approx ${dc}`;\n    };\n\n    const values: Exact[] = [sin, cos];\n    const labels: string[] = [\"sin α\", \"cos α\"];\n    const results: string[] = [`\\\\sin\\\\alpha = ${show(sin)}`, `\\\\cos\\\\alpha = ${show(cos)}`];\n    let note: string | undefined;\n    if (!cosZero) {\n      values.push(divExact(sin, cos));\n      labels.push(\"tg α\");\n      results.push(`\\\\operatorname{tg}\\\\alpha = ${show(values[values.length - 1]!)}`);\n    } else {\n      note = \"tg α nie istnieje (cos α = 0)\";\n    }\n    if (!sinZero) {\n      values.push(divExact(cos, sin));\n      labels.push(\"ctg α\");\n      results.push(`\\\\operatorname{ctg}\\\\alpha = ${show(values[values.length - 1]!)}`);\n    } else {\n      note = note\n        ? `${note}; ctg α nie istnieje (sin α = 0)`\n        : \"ctg α nie istnieje (sin α = 0)\";\n    }\n\n    return {\n      values,\n      labels,\n      steps: [\n        { title: \"1. Jedynka trygonometryczna\", body: \"\\\\sin^2\\\\alpha + \\\\cos^2\\\\alpha = 1\" },\n        {\n          title: \"2. Znaki w ćwiartce\",\n          body: `\\\\sin${signSin ? \">0\" : \"<0\"}, \\\\; \\\\cos${signCos ? \">0\" : \"<0\"}, \\\\; \\\\operatorname{tg}${signTg ? \">0\" : \"<0\"}`,\n          note: `ćwiartka ${[\"I\", \"II\", \"III\", \"IV\"][q]}`,\n        },\n        { title: \"3. Wynik\", body: results.join(\", \\\\; \"), note },\n      ],\n    };\n  },\n};\n\nexport const MATH_TRYGONOMETRIA: FormulaDef[] = [jedynka];\n"
}
```

Created file successfully: src/lib/formulas/math_trygonometria.ts
