# Lab IA Agentique — AI Agents Tech · COMEX Capgemini

> **Espace de conception et d'animation du lab agentique Capgemini — matinée du jeudi 18 juin 2026.**

---

## 👋 Contexte express

Tu rejoins l'équipe qui anime **l'un des 3 labs** d'une matinée organisée par **IQ pour le COMEX de Capgemini**. L'objectif global (porté par Jade) : créer un effet « avant / après » pour les dirigeants via une expérience **orientée Build**, pas de slides interminables.

**Les 3 labs de la matinée :**

- **Augmented Thinking** — leader Honoré (avec Amric, Maxime)
- **AI Product Creation** — leader Teo D (avec Teo P, Arman)
- **AI Agents Tech** — leader **Louis** (avec **Nathan**, et **, Arnaud**) ← _c'est nous_

**Qui est qui chez nous :**

- **Jade Dagher** — co-fondateur IQ, chef d'orchestre de l'event (sondage COMEX, logistique, accès & environnement technique côté Capgemini).
- **Nathan Gatto** — IQ depuis ~1 an, expert pédagogie / animation de formations grands comptes.
- **Louis** _(ezalos)_ — lead du lab. A co-conçu le programme IA Agents de l'école 42.
- **Arnaud** — entrepreneur, dernier builder à nous rejoindre. Jade compte sur ton regard produit/entrepreneur pour muscler l'atelier.

**Ce qu'il faut retenir en 30 secondes :** on construit un atelier de **3h** où chaque dirigeant repart avec **un projet d'agent fonctionnel**. On a une **méthodo de sélection** (/Users/nathan/Documents/Entrepreneuriat/Apps/capgemini-workshop/slides/context/Lecture-Slide-Structure.md), une **short-list de 3 use cases à traiter**.

---

## 🎯 Cadre du lab

- **Format** : 3h — **45 min de cadrage max** + **2h15 de build**.
- **Place dans la matinée** : intro Jade (10 min) → les 3 labs (3h) → **démo commune (30 min)**. À la fin, **chaque lab sélectionne 2 projets** à présenter devant tout le COMEX réuni.
- **Public** : dirigeants Capgemini (COMEX), **niveau hétérogène**, **animation en anglais**.
- **Objectif** : chaque participant **repart avec un projet fonctionnel**. Complexité maîtrisée, **finalisable dans le temps imparti**.
- **Outils** : **Claude** comme moteur principal, + une **brique n8n minimale**.
- **Arrivée sur place** : ~8h30–9h (à confirmer par Jade).

---

## 🧭 Approche pédagogique

- **Fil rouge** : _projet terminé > projet impressionnant mais incomplet._
- **Terminologie** : **éviter « Vibe Coding »**. Inscrire le lab dans une logique de **production, sécurité, industrialisation, bonnes pratiques et compréhension des limites**.
- **Bonnes pratiques en voice-over pendant le build** (pas de module théorique lourd) : prototype perso vs projet industrialisable, limites des outils IA, vigilance sécurité / données / qualité / maintenabilité, réflexes avant de déployer ou partager.
- **Notions clés à transmettre** : prompt engineering, context engineering, agents, instructions, skills.

---

## 🎯 3 use cases retenus

1. **Scoring de CV (Talent)**
2. **Synthèse de presse (Radar)**
3. **Veille concurrentielle (Scout)**

**Filet de sécurité (robuste même sans data interne Capgemini)** : **Synthèse de presse** + **Veille concurrentielle** — démontrables avec de la data publique / proxy, donc on les **prépare à fond quoi qu'il arrive**.

**À trancher au call** : format → _plusieurs projets simples au choix_ **vs** _un projet unique très cadré_. (Recommandation à débattre : 2–3 projets cadrés au choix, pour gérer l'hétérogénéité de niveau.)

## ✅ Checklists par projet

Pour chaque projet retenu : ce qu'il faut récupérer pour valider la méthode (80/20 + data), les sujets de tests, et l'angle démo. **Tout doit rester finalisable en 2h15.**

### Talent — Scoring de CV

- [ ] **Référent métier / doc de réf** : recruteur / RH Capgemini, ou grille de critères / fiche de poste type. _(Idéal pour le 80/20.)_
- [ ] **Data source / proxy** : 🟢 _proxy public / anonymisé._ Quelques CV publics ou anonymisés + 1–2 fiches de poste types (consultant, data, manager).
- [ ] **Sujets de tests** : « Évalue ces CV face à cette fiche de poste, attribue un score motivé par critère + un classement et les points de vigilance. »
- [ ] **Tools / skills** : lecture PDF, extraction structurée, skill « scoring / grille d'évaluation ».
- [ ] **Angle démo** : shortlist de CV scorés et classés en live face à une fiche de poste.

### Radar — Synthèse de presse ⭐ _filet de sécurité_

- [ ] **Référent métier / doc de réf** : aucun nécessaire (sujet générique) — au mieux, les **thèmes prioritaires du COMEX** (issus du sondage).
- [ ] **Data source / proxy** : 🟢 _générique._ Flux RSS / API news (NewsAPI, GDELT, endpoints news des moteurs), sources presse business/tech (Les Echos, FT, Reuters, TechCrunch…).
- [ ] **Sujets de tests** : « Produis la synthèse de l'actu business & tech du jour, filtrée sur [thèmes COMEX], format briefing exécutif. »
- [ ] **Tools / skills** : recherche web news, fetch, skill « synthèse ».
- [ ] **Angle démo** : briefing presse du jour généré en live → immédiat et visuel.

### Scout — Veille concurrentielle ⭐ _filet de sécurité_

- [ ] **Référent métier / doc de réf** : dirigeant Capgemini en charge stratégie / market intelligence, ou doc de positionnement concurrentiel. _(Idéal pour le 80/20.)_
- [ ] **Data source / proxy** : 🟢 _dispo immédiatement, public._ Concurrents directs (Accenture, Deloitte, IBM Consulting, Infosys, TCS, Wipro, Cognizant, Atos/Eviden, Sopra Steria) → newsroom, rapports annuels / investisseurs, LinkedIn, Crunchbase.
- [ ] **Sujets de tests** : « Génère un briefing sur les annonces IA/GenAI des 3 derniers mois de [2 concurrents], avec insights + implications pour nous. »
- [ ] **Tools / skills** : recherche web (Exa pour data concurrent structurée), fetch, skill « format briefing exécutif ».
- [ ] **Angle démo** : briefing concurrentiel généré en live sur 2 concurrents.

### Archi — n8n (minimal) - optionnel

- [ ] **Proxy** : un workflow n8n type fourni, à **adapter** (pas de construction from scratch).
- [ ] **Objectif** : montrer l'articulation **agent ↔ workflow** pour une mise en prod fiable, sans temps perdu sur l'interface.

---

## 🛠️ Stack technique & tooling

### Moteur & agent

- **Modèle lead pendant le build** : **Claude** (Opus / Sonnet 4.6) — on vise le **plafond de capacité** pour montrer ce qu'ils pourront faire au mieux.
- **Agent de référence** : **Claude Code**.
- **Pour la démo souveraineté** : **OpenCode** (open-source, **model-agnostic**, `opencode.ai`) — présenté comme l'alternative lead **déployable en interne**.
- **Brique n8n minimale** (cf. projet Archi).

### Environnement jour J (géré par Jade côté IT Capgemini)

MCP · Node.js · localhost accessible · Claude · Codex · + tout requirement qu'on remonte. **À remonter tôt, pas à la dernière minute.**

### Tooling à benchmarker

| Outil      | Usage chez nous                                                  | Note                                                             |
| ---------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Tavily** | Endpoints **news / fraîcheur** → presse + veille concurrentielle | Orienté agents, free tier mensuel _(racheté par Nebius en 2026)_ |

Subject: Lab setup — software & access requirements

Hi Neels,

We're writing on behalf of three labs to consolidate our setup questions.

Lab 1 — AI competitive intelligence (Claude + Cowork)
Participants will: enrich an Excel template with web-sourced data via Claude → generate an interactive HTML dashboard (opened locally in Chrome) → export a PowerPoint → run a weekly automation routine.
Important regarding data & files: everything in Lab 1 runs locally — all generated files (Excel, HTML, PowerPoint) are created and stored on the participant's machine only. No file is uploaded to any cloud storage or SharePoint. The only outbound connection required is to claude.ai / api.anthropic.com — Claude uses this to search the web and return results, but no participant data or files transit through any external service.

Lab 2 — Codex
We've updated the diagnostics in the repository:

- /diagnostic-windows
- /diagnostic-mac
  Could you pull the latest changes, run both diagnostics, and send us the generated reports?

Lab 3 — AI agents (Claude Code + n8n)
Participants will: build a working agent project (press synthesis, competitive-intelligence brief, or CV scoring) using Claude Code as the primary agent, search and synthesize public web/news sources, and wire the agent into a minimal n8n workflow to show how it can run as a reliable, repeatable routine. We'll also briefly demo an open-source, self-hostable alternative (OpenCode). The lab relies on installing Claude Code plugins/skills and pulling reference files from public GitHub repositories, plus outbound web access for news and competitive sources.

Common requirements — all three labs

- Can Node.js be installed without issues, and does npm install run successfully?

Lab 1 only

- Do participants have Excel and PowerPoint installed locally?
- Can they open an HTML file directly in a browser (Chrome)?
- Can Python 3 be installed, along with pip install openpyxl?
- Are claude.ai and api.anthropic.com accessible from the Capgemini network?
- What Claude plan is in place? Enterprise (API, no rate limits) or a plan with usage limits?
- Do participants have access to Dispatch on their mobile devices (iOS/Android)?

Lab 2 only

- Claude Cowork users will have access to Microsoft 365 — which MCP/Codex connectors are currently supported, and at what access level?

Lab 3 only

- Claude Code plugins & skills: can participants install plugins and skills from public GitHub repositories? Examples:
  - https://github.com/anthropics/knowledge-work-plugins/
  - https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CLAUDE.md
- Can participants clone or download files from public GitHub repositories (github.com, raw.githubusercontent.com, codeload.github.com)?
- For participants on Claude Code subscriptions: are there token quotas or model restrictions? If so, which models are available and what are the usage limits, so we can size the live demos accordingly?
- Will https://iq-project.ai/ be reachable from the Capgemini network? We'll host the shared workshop materials there for participants to download.
- n8n: how will it be provided — a hosted instance or self-hosted locally (npm / Docker) — and is it reachable (cloud endpoint or localhost)?
- Outbound web & news access: can participants reach arbitrary external sites, RSS feeds, and news APIs from the network? This is essential for the press-synthesis and competitive-intelligence use cases.

Many thanks,
