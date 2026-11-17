# Site de démonstration — résultat attendu du scanner

Site fictif « Atelier Bocal », **volontairement mal configuré**, publié sur GitHub Pages.
Tout est faux : identifiants Google Analytics / Meta Pixel / Crisp, projet et clé Supabase.
Aucun script externe n'est chargé, aucune vraie clé n'est présente.

Résultat attendu de `pnpm scan https://<utilisateur>.github.io/<dépôt>/` (mode public).

## Points de vigilance attendus

| # | id | Gravité | Confiance | Pourquoi |
|---|---|---|---|---|
| 1 | `trackers.no-consent-tool` | HIGH | probable | Imitations de Google Analytics (`gtag('config','G-DEMO000000')`) et Meta Pixel (`fbq('init',…)`), aucun outil de consentement |
| 2 | `headers.missing-csp` | MEDIUM | certain | GitHub Pages n'envoie pas de Content-Security-Policy |
| 3 | `headers.missing-clickjacking-protection` | MEDIUM | certain | Ni X-Frame-Options ni frame-ancestors |
| 4 | `legal.missing-legal-notice` | MEDIUM | probable | Aucun lien « mentions légales » (page avec du vrai texte → pas une application JavaScript) |
| 5 | `legal.missing-privacy-policy` | MEDIUM | probable | Aucun lien « politique de confidentialité » |
| 6 | `ai-act.chatbot-transparency` | LOW | à vérifier | Imitation de Crisp (`$crisp`, `CRISP_WEBSITE_ID`), bulle « Camille » sans mention d'IA. Crisp *peut* inclure une IA → « à vérifier » |
| 7 | `cors.wildcard` | LOW | certain | GitHub Pages répond `Access-Control-Allow-Origin: *` |
| 8 | `headers.missing-nosniff` | LOW | certain | Pas de X-Content-Type-Options (à confirmer : dépend de GitHub Pages) |
| 9 | `headers.missing-referrer-policy` | LOW | certain | Ni en-tête ni balise meta referrer |
| 10 | `hosting.supabase-region-unknown` | LOW | à vérifier | URL `https://demofauxprojet000000.supabase.co` dans `assets/app.js`, aucun indice de région |

## Informations attendues (INFO, sans impact sur la note)

| id | Pourquoi |
|---|---|
| `secrets.supabase-anon-key` | Faux JWT « anon » (projet `demofauxprojet000000`) dans `assets/app.js`, affiché masqué (`eyJhbGci…`) |
| `stack.detected` | **Supabase** (URL du projet) et **GitHub Pages** (adresse en `.github.io`) |

## Ce qui ne doit PAS apparaître

| id | Pourquoi |
|---|---|
| `headers.no-https` | GitHub Pages sert le site en HTTPS |
| `headers.missing-hsts` / `headers.weak-hsts` | GitHub Pages envoie `Strict-Transport-Security: max-age=31556952` (≈ 1 an) |
| `secrets.supabase-service-role` et toute autre clé secrète | Aucune clé secrète dans le site |
| `cookies.*` | GitHub Pages ne dépose aucun cookie, et les imitations de traceurs n'en déposent pas. Limite connue de l'étape 1 : les cookies déposés par JavaScript ne sont de toute façon pas visibles sans navigateur |
| `trackers.consent-to-verify` | Aucun outil de consentement |
| `hosting.supabase-outside-eu` / `hosting.supabase-region-eu` | Aucun indice de région dans le code |

## Note attendue

| Retrait | Points |
|---|---|
| HIGH probable (traceurs) | 20 × 0,75 = 15 |
| 2 × MEDIUM certain (CSP, clickjacking) | 16 |
| 2 × MEDIUM probable (liens légaux) | 12 |
| 3 × LOW certain (CORS, nosniff, referrer) | 9 |
| 2 × LOW à vérifier (chatbot, région Supabase) | 3 |
| **Total** | **55** |

**Note attendue : 45/100 — ROUGE.**
(Si GitHub Pages envoie finalement `X-Content-Type-Options: nosniff`, la note sera 48/100, toujours rouge.)

Autres valeurs attendues dans le rapport JSON : `complete: true`, 9 vérifications réussies, 0 en erreur,
`limits.scriptsFound: 1`, `limits.scriptsFetched: 1`.

Un test automatique (`packages/scanner/test/demo-site.test.ts`) sert ce site sur un serveur local avec des
en-têtes imitant GitHub Pages et vérifie cette liste (avec en plus `headers.no-https`, car le serveur local est en HTTP).
