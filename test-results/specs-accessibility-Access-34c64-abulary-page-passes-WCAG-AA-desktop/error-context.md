# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/accessibility.spec.ts >> Accessibility + WCAG AA >> Authenticated pages >> [A11Y] Vocabulary page passes WCAG AA
- Location: e2e/specs/accessibility.spec.ts:41:11

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 3
Received array:  [{"description": "Ensure buttons have discernible text", "help": "Buttons must have discernible text", "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/button-name?application=playwright", "id": "button-name", "impact": "critical", "nodes": [{"all": [], "any": [{"data": null, "id": "button-has-visible-text", "impact": "critical", "message": "Element does not have inner text that is visible to screen readers", "relatedNodes": []}, {"data": null, "id": "aria-label", "impact": "critical", "message": "aria-label attribute does not exist or is empty", "relatedNodes": []}, {"data": null, "id": "aria-labelledby", "impact": "critical", "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty", "relatedNodes": []}, {"data": {"messageKey": "noAttr"}, "id": "non-empty-title", "impact": "critical", "message": "Element has no title attribute", "relatedNodes": []}, {"data": null, "id": "implicit-label", "impact": "critical", "message": "Element does not have an implicit (wrapped) <label>", "relatedNodes": []}, {"data": null, "id": "explicit-label", "impact": "critical", "message": "Element does not have an explicit <label>", "relatedNodes": []}, {"data": null, "id": "presentational-role", "impact": "critical", "message": "Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"", "relatedNodes": []}], "failureSummary": "Fix any of the following:
  Element does not have inner text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"", "html": "<button type=\"button\" role=\"combobox\" aria-expanded=\"false\" aria-autocomplete=\"none\" dir=\"ltr\" data-state=\"closed\" class=\"flex h-10 items-cent...\">", "impact": "critical", "none": [], "target": ["button"]}], "tags": ["cat.name-role-value", "wcag2a", "wcag412", "section508", "section508.22.a", "TTv5", "TT6.a", "EN-301-549", "EN-9.4.1.2", "ACT", …]}, {"description": "Ensure links have discernible text", "help": "Links must have discernible text", "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/link-name?application=playwright", "id": "link-name", "impact": "serious", "nodes": [{"all": [], "any": [{"data": null, "id": "has-visible-text", "impact": "serious", "message": "Element does not have text that is visible to screen readers", "relatedNodes": []}, {"data": null, "id": "aria-label", "impact": "serious", "message": "aria-label attribute does not exist or is empty", "relatedNodes": []}, {"data": null, "id": "aria-labelledby", "impact": "serious", "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty", "relatedNodes": []}, {"data": {"messageKey": "noAttr"}, "id": "non-empty-title", "impact": "serious", "message": "Element has no title attribute", "relatedNodes": []}], "failureSummary": "Fix all of the following:
  Element is in tab order and does not have accessible text·
Fix any of the following:
  Element does not have text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute", "html": "<a href=\"/settings\">", "impact": "serious", "none": [{"data": null, "id": "focusable-no-name", "impact": "serious", "message": "Element is in tab order and does not have accessible text", "relatedNodes": []}], "target": ["a[href$=\"settings\"]"]}], "tags": ["cat.name-role-value", "wcag2a", "wcag244", "wcag412", "section508", "section508.22.a", "TTv5", "TT6.a", "EN-301-549", "EN-9.2.4.4", …]}, {"description": "Ensure <meta name=\"viewport\"> does not disable text scaling and zooming", "help": "Zooming and scaling must not be disabled", "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/meta-viewport?application=playwright", "id": "meta-viewport", "impact": "moderate", "nodes": [{"all": [], "any": [{"data": "user-scalable=no", "id": "meta-viewport", "impact": "moderate", "message": "user-scalable=no on <meta> tag disables zooming on mobile devices", "relatedNodes": []}], "failureSummary": "Fix any of the following:
  user-scalable=no on <meta> tag disables zooming on mobile devices", "html": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">", "impact": "moderate", "none": [], "target": ["meta[name=\"viewport\"]"]}], "tags": ["cat.sensory-and-visual-cues", "wcag2aa", "wcag144", "EN-301-549", "EN-9.1.4.4", "ACT", "RGAAv4", "RGAA-10.4.2"]}]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - complementary [ref=e3]:
      - generic [ref=e5]:
        - generic [ref=e7]: W
        - generic [ref=e8]:
          - heading "WortHeld" [level=1] [ref=e9]
          - paragraph [ref=e10]: Deutsch lernen
      - navigation [ref=e11]:
        - link "Dashboard" [ref=e12] [cursor=pointer]:
          - /url: /dashboard
          - img [ref=e13]
          - generic [ref=e18]: Dashboard
          - img [ref=e19]
        - link "Lernen" [ref=e21] [cursor=pointer]:
          - /url: /learn
          - img [ref=e22]
          - generic [ref=e24]: Lernen
          - img [ref=e25]
        - link "Vokabeln" [ref=e27] [cursor=pointer]:
          - /url: /vocabulary
          - img [ref=e28]
          - generic [ref=e31]: Vokabeln
          - img [ref=e32]
        - link "Grammatik" [ref=e34] [cursor=pointer]:
          - /url: /grammar
          - img [ref=e35]
          - generic [ref=e37]: Grammatik
          - img [ref=e38]
        - link "DTZ-Test" [ref=e40] [cursor=pointer]:
          - /url: /dtz
          - img [ref=e41]
          - generic [ref=e44]: DTZ-Test
          - img [ref=e45]
        - link "Üben" [ref=e47] [cursor=pointer]:
          - /url: /review
          - img [ref=e48]
          - generic [ref=e53]: Üben
          - img [ref=e54]
        - link "Rangliste" [ref=e56] [cursor=pointer]:
          - /url: /leaderboard
          - img [ref=e57]
          - generic [ref=e63]: Rangliste
          - img [ref=e64]
      - generic [ref=e67] [cursor=pointer]:
        - generic [ref=e68]: T
        - generic [ref=e69]:
          - paragraph [ref=e70]: Test User
          - paragraph [ref=e71]: test@user.de
        - link [ref=e72]:
          - /url: /settings
          - img [ref=e73]
    - main [ref=e76]:
      - generic [ref=e77]:
        - generic [ref=e78]:
          - heading "Vokabeltrainer" [level=1] [ref=e79]
          - paragraph [ref=e80]: 100 Vokabeln in deiner Sammlung
        - combobox [ref=e82] [cursor=pointer]:
          - generic: Alle Niveaus (100)
          - img [ref=e83]
        - generic [ref=e85]:
          - generic [ref=e88]:
            - generic [ref=e89]: 📚
            - paragraph [ref=e90]: "100"
            - paragraph [ref=e91]: Gesamt
          - generic [ref=e94]:
            - generic [ref=e95]: 🌱
            - paragraph [ref=e96]: "86"
            - paragraph [ref=e97]: A1-A2
          - generic [ref=e100]:
            - generic [ref=e101]: 🎓
            - paragraph [ref=e102]: "14"
            - paragraph [ref=e103]: B1-C1
        - generic [ref=e104]:
          - heading "Meine Vokabeln" [level=2] [ref=e106]
          - generic [ref=e108]:
            - generic [ref=e109]:
              - generic [ref=e110]:
                - generic [ref=e111]:
                  - generic [ref=e112]:
                    - generic [ref=e113]: Bitte
                    - generic [ref=e114]: A1
                  - paragraph [ref=e115]: Please
                - generic [ref=e116]: 📝
              - paragraph [ref=e118]: "\"Ein Kaffee, bitte.\""
            - generic [ref=e119]:
              - generic [ref=e120]:
                - generic [ref=e121]:
                  - generic [ref=e122]:
                    - generic [ref=e123]: Bitte
                    - generic [ref=e124]: A1
                  - paragraph [ref=e125]: please
                - generic [ref=e126]: 📝
              - paragraph [ref=e128]: "\"Ein Kaffee, bitte.\""
            - generic [ref=e129]:
              - generic [ref=e130]:
                - generic [ref=e131]:
                  - generic [ref=e132]:
                    - generic [ref=e133]: das Buch
                    - generic [ref=e134]: A1
                  - paragraph [ref=e135]: book
                - generic [ref=e136]: 📝
              - paragraph [ref=e138]: "\"Das Buch ist interessant.\""
            - generic [ref=e139]:
              - generic [ref=e140]:
                - generic [ref=e141]:
                  - generic [ref=e142]:
                    - generic [ref=e143]: Danke
                    - generic [ref=e144]: A1
                  - paragraph [ref=e145]: Thank you
                - generic [ref=e146]: 📝
              - paragraph [ref=e148]: "\"Danke fur Ihre Hilfe.\""
            - generic [ref=e149]:
              - generic [ref=e150]:
                - generic [ref=e151]:
                  - generic [ref=e152]:
                    - generic [ref=e153]: Danke
                    - generic [ref=e154]: A1
                  - paragraph [ref=e155]: thank you
                - generic [ref=e156]: 📝
              - paragraph [ref=e158]: "\"Danke für Ihre Hilfe.\""
            - generic [ref=e159]:
              - generic [ref=e160]:
                - generic [ref=e161]:
                  - generic [ref=e162]:
                    - generic [ref=e163]: Entschuldigung
                    - generic [ref=e164]: A1
                  - paragraph [ref=e165]: excuse me
                - generic [ref=e166]: 📝
              - paragraph [ref=e168]: "\"Entschuldigung, wo ist der Bahnhof?\""
            - generic [ref=e169]:
              - generic [ref=e170]:
                - generic [ref=e171]:
                  - generic [ref=e172]:
                    - generic [ref=e173]: die Frau
                    - generic [ref=e174]: A1
                  - paragraph [ref=e175]: woman
                - generic [ref=e176]: 📝
              - paragraph [ref=e178]: "\"Die Frau liest ein Buch.\""
            - generic [ref=e179]:
              - generic [ref=e180]:
                - generic [ref=e181]:
                  - generic [ref=e182]:
                    - generic [ref=e183]: Guten Abend
                    - generic [ref=e184]: A1
                  - paragraph [ref=e185]: good evening
                - generic [ref=e186]: 📝
              - paragraph [ref=e188]: "\"Guten Abend, willkommen zum Kurs.\""
            - generic [ref=e189]:
              - generic [ref=e190]:
                - generic [ref=e191]:
                  - generic [ref=e192]:
                    - generic [ref=e193]: Guten Abend
                    - generic [ref=e194]: A1
                  - paragraph [ref=e195]: Good evening
                - generic [ref=e196]: 📝
              - paragraph [ref=e198]: "\"Guten Abend, willkommen zum Kurs.\""
            - generic [ref=e199]:
              - generic [ref=e200]:
                - generic [ref=e201]:
                  - generic [ref=e202]:
                    - generic [ref=e203]: Guten Morgen
                    - generic [ref=e204]: A1
                  - paragraph [ref=e205]: Good morning
                - generic [ref=e206]: 📝
              - paragraph [ref=e208]: "\"Guten Morgen, Herr Muller!\""
            - generic [ref=e209]:
              - generic [ref=e210]:
                - generic [ref=e211]:
                  - generic [ref=e212]:
                    - generic [ref=e213]: Guten Morgen
                    - generic [ref=e214]: A1
                  - paragraph [ref=e215]: good morning
                - generic [ref=e216]: 📝
              - paragraph [ref=e218]: "\"Guten Morgen, Herr Müller!\""
            - generic [ref=e219]:
              - generic [ref=e220]:
                - generic [ref=e221]:
                  - generic [ref=e222]:
                    - generic [ref=e223]: Guten Tag
                    - generic [ref=e224]: A1
                  - paragraph [ref=e225]: Good day
                - generic [ref=e226]: 📝
              - paragraph [ref=e228]: "\"Guten Tag, kann ich Ihnen helfen?\""
            - generic [ref=e229]:
              - generic [ref=e230]:
                - generic [ref=e231]:
                  - generic [ref=e232]:
                    - generic [ref=e233]: Guten Tag
                    - generic [ref=e234]: A1
                  - paragraph [ref=e235]: good day
                - generic [ref=e236]: 📝
              - paragraph [ref=e238]: "\"Guten Tag, kann ich Ihnen helfen?\""
            - generic [ref=e239]:
              - generic [ref=e240]:
                - generic [ref=e241]:
                  - generic [ref=e242]:
                    - generic [ref=e243]: Hallo
                    - generic [ref=e244]: A1
                  - paragraph [ref=e245]: Hello
                - generic [ref=e246]: 📝
              - paragraph [ref=e248]: "\"Hallo, wie geht es dir?\""
            - generic [ref=e249]:
              - generic [ref=e250]:
                - generic [ref=e251]:
                  - generic [ref=e252]:
                    - generic [ref=e253]: Hallo
                    - generic [ref=e254]: A1
                  - paragraph [ref=e255]: hello
                - generic [ref=e256]: 📝
              - paragraph [ref=e258]: "\"Hallo, wie geht es dir?\""
            - generic [ref=e259]:
              - generic [ref=e260]:
                - generic [ref=e261]:
                  - generic [ref=e262]:
                    - generic [ref=e263]: das Haus
                    - generic [ref=e264]: A1
                  - paragraph [ref=e265]: house
                - generic [ref=e266]: 📝
              - paragraph [ref=e268]: "\"Das Haus ist gross.\""
            - generic [ref=e269]:
              - generic [ref=e270]:
                - generic [ref=e271]:
                  - generic [ref=e272]:
                    - generic [ref=e273]: Ja
                    - generic [ref=e274]: A1
                  - paragraph [ref=e275]: "yes"
                - generic [ref=e276]: 📝
              - paragraph [ref=e278]: "\"Ja, ich komme mit.\""
            - generic [ref=e279]:
              - generic [ref=e280]:
                - generic [ref=e281]:
                  - generic [ref=e282]:
                    - generic [ref=e283]: Ja
                    - generic [ref=e284]: A1
                  - paragraph [ref=e285]: "Yes"
                - generic [ref=e286]: 📝
              - paragraph [ref=e288]: "\"Ja, ich komme mit.\""
            - generic [ref=e289]:
              - generic [ref=e290]:
                - generic [ref=e291]:
                  - generic [ref=e292]:
                    - generic [ref=e293]: der Mann
                    - generic [ref=e294]: A1
                  - paragraph [ref=e295]: man
                - generic [ref=e296]: 📝
              - paragraph [ref=e298]: "\"Der Mann trinkt Kaffee.\""
            - generic [ref=e299]:
              - generic [ref=e300]:
                - generic [ref=e301]:
                  - generic [ref=e302]:
                    - generic [ref=e303]: Nein
                    - generic [ref=e304]: A1
                  - paragraph [ref=e305]: "no"
                - generic [ref=e306]: 📝
              - paragraph [ref=e308]: "\"Nein, danke.\""
            - generic [ref=e309]:
              - generic [ref=e310]:
                - generic [ref=e311]:
                  - generic [ref=e312]:
                    - generic [ref=e313]: Nein
                    - generic [ref=e314]: A1
                  - paragraph [ref=e315]: "No"
                - generic [ref=e316]: 📝
              - paragraph [ref=e318]: "\"Nein, danke.\""
            - generic [ref=e319]:
              - generic [ref=e320]:
                - generic [ref=e321]:
                  - generic [ref=e322]:
                    - generic [ref=e323]: der Stuhl
                    - generic [ref=e324]: A1
                  - paragraph [ref=e325]: chair
                - generic [ref=e326]: 📝
              - paragraph [ref=e328]: "\"Der Stuhl ist bequem.\""
            - generic [ref=e329]:
              - generic [ref=e330]:
                - generic [ref=e331]:
                  - generic [ref=e332]:
                    - generic [ref=e333]: der Tisch
                    - generic [ref=e334]: A1
                  - paragraph [ref=e335]: table
                - generic [ref=e336]: 📝
              - paragraph [ref=e338]: "\"Der Tisch ist gross.\""
            - generic [ref=e339]:
              - generic [ref=e340]:
                - generic [ref=e341]:
                  - generic [ref=e342]:
                    - generic [ref=e343]: Tschuss
                    - generic [ref=e344]: A1
                  - paragraph [ref=e345]: Bye
                - generic [ref=e346]: 📝
              - paragraph [ref=e348]: "\"Tschuss, bis morgen!\""
            - generic [ref=e349]:
              - generic [ref=e350]:
                - generic [ref=e351]:
                  - generic [ref=e352]:
                    - generic [ref=e353]: Tschüss
                    - generic [ref=e354]: A1
                  - paragraph [ref=e355]: bye
                - generic [ref=e356]: 📝
              - paragraph [ref=e358]: "\"Tschüss, bis morgen!\""
            - generic [ref=e359]:
              - generic [ref=e360]:
                - generic [ref=e361]:
                  - generic [ref=e362]:
                    - generic [ref=e363]: Wann?
                    - generic [ref=e364]: A1
                  - paragraph [ref=e365]: When?
                - generic [ref=e366]: 📝
              - paragraph [ref=e368]: "\"Wann kommst du?\""
            - generic [ref=e369]:
              - generic [ref=e370]:
                - generic [ref=e371]:
                  - generic [ref=e372]:
                    - generic [ref=e373]: Warum?
                    - generic [ref=e374]: A1
                  - paragraph [ref=e375]: Why?
                - generic [ref=e376]: 📝
              - paragraph [ref=e378]: "\"Warum lernst du Deutsch?\""
            - generic [ref=e379]:
              - generic [ref=e380]:
                - generic [ref=e381]:
                  - generic [ref=e382]:
                    - generic [ref=e383]: Was?
                    - generic [ref=e384]: A1
                  - paragraph [ref=e385]: What?
                - generic [ref=e386]: 📝
              - paragraph [ref=e388]: "\"Was machst du?\""
            - generic [ref=e389]:
              - generic [ref=e390]:
                - generic [ref=e391]:
                  - generic [ref=e392]:
                    - generic [ref=e393]: Wer?
                    - generic [ref=e394]: A1
                  - paragraph [ref=e395]: Who?
                - generic [ref=e396]: 📝
              - paragraph [ref=e398]: "\"Wer ist das?\""
            - generic [ref=e399]:
              - generic [ref=e400]:
                - generic [ref=e401]:
                  - generic [ref=e402]:
                    - generic [ref=e403]: Wie viel?
                    - generic [ref=e404]: A1
                  - paragraph [ref=e405]: How much?
                - generic [ref=e406]: 📝
              - paragraph [ref=e408]: "\"Wie viel kostet das?\""
            - generic [ref=e409]:
              - generic [ref=e410]:
                - generic [ref=e411]:
                  - generic [ref=e412]:
                    - generic [ref=e413]: Wie?
                    - generic [ref=e414]: A1
                  - paragraph [ref=e415]: How?
                - generic [ref=e416]: 📝
              - paragraph [ref=e418]: "\"Wie geht es dir?\""
            - generic [ref=e419]:
              - generic [ref=e420]:
                - generic [ref=e421]:
                  - generic [ref=e422]:
                    - generic [ref=e423]: Wo?
                    - generic [ref=e424]: A1
                  - paragraph [ref=e425]: Where?
                - generic [ref=e426]: 📝
              - paragraph [ref=e428]: "\"Wo wohnst du?\""
            - generic [ref=e429]:
              - generic [ref=e430]:
                - generic [ref=e431]:
                  - generic [ref=e432]:
                    - generic [ref=e433]: aber
                    - generic [ref=e434]: A1
                  - paragraph [ref=e435]: but
                - generic [ref=e436]: 📝
              - paragraph [ref=e438]: "\"Klein, aber fein.\""
            - generic [ref=e439]:
              - generic [ref=e440]:
                - generic [ref=e441]:
                  - generic [ref=e442]:
                    - generic [ref=e443]: abgesehen davon
                    - generic [ref=e444]: B2
                  - paragraph [ref=e445]: apart from that
                - generic [ref=e446]: 📝
              - paragraph [ref=e448]: "\"Abgesehen davon ist alles gut.\""
            - generic [ref=e449]:
              - generic [ref=e450]:
                - generic [ref=e451]:
                  - generic [ref=e452]:
                    - generic [ref=e453]: abgesehen davon
                    - generic [ref=e454]: C1
                  - paragraph [ref=e455]: apart from that
                - generic [ref=e456]: 📝
              - paragraph [ref=e458]: "\"Abgesehen davon ist alles gut.\""
            - generic [ref=e459]:
              - generic [ref=e460]:
                - generic [ref=e461]:
                  - generic [ref=e462]:
                    - generic [ref=e463]: abstimmen
                    - generic [ref=e464]: B1
                  - paragraph [ref=e465]: to vote
                - generic [ref=e466]: 📝
              - paragraph [ref=e468]: "\"Ich stimme ab.\""
            - generic [ref=e469]:
              - generic [ref=e470]:
                - generic [ref=e471]:
                  - generic [ref=e472]:
                    - generic [ref=e473]: analysieren
                    - generic [ref=e474]: B2
                  - paragraph [ref=e475]: to analyze
                - generic [ref=e476]: 📝
              - paragraph [ref=e478]: "\"Wir analysieren die Daten.\""
            - generic [ref=e479]:
              - generic [ref=e480]:
                - generic [ref=e481]:
                  - generic [ref=e482]:
                    - generic [ref=e483]: anmelden
                    - generic [ref=e484]: A2
                  - paragraph [ref=e485]: to log in
                - generic [ref=e486]: 📝
              - paragraph [ref=e488]: "\"Ich melde mich an.\""
            - generic [ref=e489]:
              - generic [ref=e490]:
                - generic [ref=e491]:
                  - generic [ref=e492]:
                    - generic [ref=e493]: anziehen
                    - generic [ref=e494]: A2
                  - paragraph [ref=e495]: to put on
                - generic [ref=e496]: 📝
              - paragraph [ref=e498]: "\"Zieh deine Schuhe an!\""
            - generic [ref=e499]:
              - generic [ref=e500]:
                - generic [ref=e501]:
                  - generic [ref=e502]:
                    - generic [ref=e503]: arbeiten
                    - generic [ref=e504]: A1
                  - paragraph [ref=e505]: to work
                - generic [ref=e506]: 📝
              - paragraph [ref=e508]: "\"Ich arbeite in einem Büro.\""
            - generic [ref=e509]:
              - generic [ref=e510]:
                - generic [ref=e511]:
                  - generic [ref=e512]:
                    - generic [ref=e513]: arbeiten
                    - generic [ref=e514]: A2
                  - paragraph [ref=e515]: to work
                - generic [ref=e516]: 📝
              - paragraph [ref=e518]: "\"Ich arbeite von 9 bis 5.\""
            - generic [ref=e519]:
              - generic [ref=e520]:
                - generic [ref=e521]:
                  - generic [ref=e522]:
                    - generic [ref=e523]: auch
                    - generic [ref=e524]: A1
                  - paragraph [ref=e525]: also/too
                - generic [ref=e526]: 📝
              - paragraph [ref=e528]: "\"Ich komme auch.\""
            - generic [ref=e529]:
              - generic [ref=e530]:
                - generic [ref=e531]:
                  - generic [ref=e532]:
                    - generic [ref=e533]: aufgeregt
                    - generic [ref=e534]: A2
                  - paragraph [ref=e535]: excited
                - generic [ref=e536]: 📝
              - paragraph [ref=e538]: "\"Ich bin aufgeregt.\""
            - generic [ref=e539]:
              - generic [ref=e540]:
                - generic [ref=e541]:
                  - generic [ref=e542]:
                    - generic [ref=e543]: aufräumen
                    - generic [ref=e544]: A2
                  - paragraph [ref=e545]: to tidy up
                - generic [ref=e546]: 📝
              - paragraph [ref=e548]: "\"Ich muss mein Zimmer aufräumen.\""
            - generic [ref=e549]:
              - generic [ref=e550]:
                - generic [ref=e551]:
                  - generic [ref=e552]:
                    - generic [ref=e553]: backen
                    - generic [ref=e554]: A2
                  - paragraph [ref=e555]: to bake
                - generic [ref=e556]: 📝
              - paragraph [ref=e558]: "\"Ich backe einen Kuchen.\""
            - generic [ref=e559]:
              - generic [ref=e560]:
                - generic [ref=e561]:
                  - generic [ref=e562]:
                    - generic [ref=e563]: beenden
                    - generic [ref=e564]: A2
                  - paragraph [ref=e565]: to finish
                - generic [ref=e566]: 📝
              - paragraph [ref=e568]: "\"Ich beende meine Arbeit.\""
            - generic [ref=e569]:
              - generic [ref=e570]:
                - generic [ref=e571]:
                  - generic [ref=e572]:
                    - generic [ref=e573]: befördern
                    - generic [ref=e574]: B1
                  - paragraph [ref=e575]: to promote
                - generic [ref=e576]: 📝
              - paragraph [ref=e578]: "\"Sie wurde befördert.\""
            - generic [ref=e579]:
              - generic [ref=e580]:
                - generic [ref=e581]:
                  - generic [ref=e582]:
                    - generic [ref=e583]: beginnen
                    - generic [ref=e584]: A2
                  - paragraph [ref=e585]: to begin
                - generic [ref=e586]: 📝
              - paragraph [ref=e588]: "\"Der Kurs beginnt um 9 Uhr.\""
            - generic [ref=e589]:
              - generic [ref=e590]:
                - generic [ref=e591]:
                  - generic [ref=e592]:
                    - generic [ref=e593]: besichtigen
                    - generic [ref=e594]: B1
                  - paragraph [ref=e595]: to sightsee
                - generic [ref=e596]: 📝
              - paragraph [ref=e598]: "\"Wir besichtigen das Museum.\""
            - generic [ref=e599]:
              - generic [ref=e600]:
                - generic [ref=e601]:
                  - generic [ref=e602]:
                    - generic [ref=e603]: bestehen
                    - generic [ref=e604]: B1
                  - paragraph [ref=e605]: to pass
                - generic [ref=e606]: 📝
              - paragraph [ref=e608]: "\"Ich habe die Prüfung bestanden.\""
            - generic [ref=e609]:
              - generic [ref=e610]:
                - generic [ref=e611]:
                  - generic [ref=e612]:
                    - generic [ref=e613]: bevor
                    - generic [ref=e614]: B1
                  - paragraph [ref=e615]: before
                - generic [ref=e616]: 📝
              - paragraph [ref=e618]: "\"Bevor ich gehe, rufe ich an.\""
            - generic [ref=e619]:
              - generic [ref=e620]:
                - generic [ref=e621]:
                  - generic [ref=e622]:
                    - generic [ref=e623]: beweisen
                    - generic [ref=e624]: B2
                  - paragraph [ref=e625]: to prove
                - generic [ref=e626]: 📝
              - paragraph [ref=e628]: "\"Können Sie das beweisen?\""
            - generic [ref=e629]:
              - generic [ref=e630]:
                - generic [ref=e631]:
                  - generic [ref=e632]:
                    - generic [ref=e633]: bewölkt
                    - generic [ref=e634]: A2
                  - paragraph [ref=e635]: cloudy
                - generic [ref=e636]: 📝
              - paragraph [ref=e638]: "\"Heute ist es bewölkt.\""
            - generic [ref=e639]:
              - generic [ref=e640]:
                - generic [ref=e641]:
                  - generic [ref=e642]:
                    - generic [ref=e643]: bezahlen
                    - generic [ref=e644]: A1
                  - paragraph [ref=e645]: to pay
                - generic [ref=e646]: 📝
              - paragraph [ref=e648]: "\"Ich bezahle mit Karte.\""
            - generic [ref=e649]:
              - generic [ref=e650]:
                - generic [ref=e651]:
                  - generic [ref=e652]:
                    - generic [ref=e653]: bezahlen
                    - generic [ref=e654]: A2
                  - paragraph [ref=e655]: to pay
                - generic [ref=e656]: 📝
              - paragraph [ref=e658]: "\"Ich möchte bezahlen.\""
            - generic [ref=e659]:
              - generic [ref=e660]:
                - generic [ref=e661]:
                  - generic [ref=e662]:
                    - generic [ref=e663]: billig
                    - generic [ref=e664]: A2
                  - paragraph [ref=e665]: cheap
                - generic [ref=e666]: 📝
              - paragraph [ref=e668]: "\"Das ist billig.\""
            - generic [ref=e669]:
              - generic [ref=e670]:
                - generic [ref=e671]:
                  - generic [ref=e672]:
                    - generic [ref=e673]: blau
                    - generic [ref=e674]: A1
                  - paragraph [ref=e675]: blue
                - generic [ref=e676]: 📝
              - paragraph [ref=e678]: "\"Der Himmel ist blau.\""
            - generic [ref=e679]:
              - generic [ref=e680]:
                - generic [ref=e681]:
                  - generic [ref=e682]:
                    - generic [ref=e683]: brauchen
                    - generic [ref=e684]: A1
                  - paragraph [ref=e685]: to need
                - generic [ref=e686]: 📝
              - paragraph [ref=e688]: "\"Ich brauche Hilfe.\""
            - generic [ref=e689]:
              - generic [ref=e690]:
                - generic [ref=e691]:
                  - generic [ref=e692]:
                    - generic [ref=e693]: daraus folgt
                    - generic [ref=e694]: B2
                  - paragraph [ref=e695]: therefore
                - generic [ref=e696]: 📝
              - paragraph [ref=e698]: "\"Daraus folgt eine wichtige Erkenntnis.\""
            - generic [ref=e699]:
              - generic [ref=e700]:
                - generic [ref=e701]:
                  - generic [ref=e702]:
                    - generic [ref=e703]: das
                    - generic [ref=e704]: A1
                  - paragraph [ref=e705]: the (neuter)
                - generic [ref=e706]: 📝
              - paragraph [ref=e708]: "\"Das Haus.\""
            - generic [ref=e709]:
              - generic [ref=e710]:
                - generic [ref=e711]:
                  - generic [ref=e712]:
                    - generic [ref=e713]: das das Abendessen
                    - generic [ref=e714]: A2
                  - paragraph [ref=e715]: dinner
                - generic [ref=e716]: 📝
              - paragraph [ref=e718]: "\"Was gibt es zum Abendessen?\""
            - generic [ref=e719]:
              - generic [ref=e720]:
                - generic [ref=e721]:
                  - generic [ref=e722]:
                    - generic [ref=e723]: das das Angebot
                    - generic [ref=e724]: A2
                  - paragraph [ref=e725]: offer
                - generic [ref=e726]: 📝
              - paragraph [ref=e728]: "\"Das ist ein gutes Angebot.\""
            - generic [ref=e729]:
              - generic [ref=e730]:
                - generic [ref=e731]:
                  - generic [ref=e732]:
                    - generic [ref=e733]: das das Anschreiben
                    - generic [ref=e734]: B1
                  - paragraph [ref=e735]: cover letter
                - generic [ref=e736]: 📝
              - paragraph [ref=e738]: "\"Das Anschreiben ist wichtig.\""
            - generic [ref=e739]:
              - generic [ref=e740]:
                - generic [ref=e741]:
                  - generic [ref=e742]:
                    - generic [ref=e743]: das das Auge
                    - generic [ref=e744]: A1
                  - paragraph [ref=e745]: eye
                - generic [ref=e746]: 📝
              - paragraph [ref=e748]: "\"Meine Augen sind braun.\""
            - generic [ref=e749]:
              - generic [ref=e750]:
                - generic [ref=e751]:
                  - generic [ref=e752]:
                    - generic [ref=e753]: das das Auto
                    - generic [ref=e754]: A2
                  - paragraph [ref=e755]: car
                - generic [ref=e756]: 📝
              - paragraph [ref=e758]: "\"Das Auto ist schnell.\""
            - generic [ref=e759]:
              - generic [ref=e760]:
                - generic [ref=e761]:
                  - generic [ref=e762]:
                    - generic [ref=e763]: das das Baby
                    - generic [ref=e764]: A1
                  - paragraph [ref=e765]: baby
                - generic [ref=e766]: 📝
              - paragraph [ref=e768]: "\"Das Baby schläft.\""
            - generic [ref=e769]:
              - generic [ref=e770]:
                - generic [ref=e771]:
                  - generic [ref=e772]:
                    - generic [ref=e773]: das das Bad
                    - generic [ref=e774]: A1
                  - paragraph [ref=e775]: bathroom
                - generic [ref=e776]: 📝
              - paragraph [ref=e778]: "\"Das Bad ist klein.\""
            - generic [ref=e779]:
              - generic [ref=e780]:
                - generic [ref=e781]:
                  - generic [ref=e782]:
                    - generic [ref=e783]: das das Badezimmer
                    - generic [ref=e784]: A2
                  - paragraph [ref=e785]: bathroom
                - generic [ref=e786]: 📝
              - paragraph [ref=e788]: "\"Das Badezimmer ist sauber.\""
            - generic [ref=e789]:
              - generic [ref=e790]:
                - generic [ref=e791]:
                  - generic [ref=e792]:
                    - generic [ref=e793]: das das Bein
                    - generic [ref=e794]: A1
                  - paragraph [ref=e795]: leg
                - generic [ref=e796]: 📝
              - paragraph [ref=e798]: "\"Mein Bein ist müde.\""
            - generic [ref=e799]:
              - generic [ref=e800]:
                - generic [ref=e801]:
                  - generic [ref=e802]:
                    - generic [ref=e803]: das das Bett
                    - generic [ref=e804]: A1
                  - paragraph [ref=e805]: bed
                - generic [ref=e806]: 📝
              - paragraph [ref=e808]: "\"Das Bett ist weich.\""
            - generic [ref=e809]:
              - generic [ref=e810]:
                - generic [ref=e811]:
                  - generic [ref=e812]:
                    - generic [ref=e813]: das das Bett
                    - generic [ref=e814]: A2
                  - paragraph [ref=e815]: bed
                - generic [ref=e816]: 📝
              - paragraph [ref=e818]: "\"Das Bett ist bequem.\""
            - generic [ref=e819]:
              - generic [ref=e820]:
                - generic [ref=e821]:
                  - generic [ref=e822]:
                    - generic [ref=e823]: das das Brot
                    - generic [ref=e824]: A2
                  - paragraph [ref=e825]: bread
                - generic [ref=e826]: 📝
              - paragraph [ref=e828]: "\"Das Brot ist frisch.\""
            - generic [ref=e829]:
              - generic [ref=e830]:
                - generic [ref=e831]:
                  - generic [ref=e832]:
                    - generic [ref=e833]: das das Brot
                    - generic [ref=e834]: A1
                  - paragraph [ref=e835]: bread
                - generic [ref=e836]: 📝
              - paragraph [ref=e838]: "\"Ich esse Brot zum Frühstück.\""
            - generic [ref=e839]:
              - generic [ref=e840]:
                - generic [ref=e841]:
                  - generic [ref=e842]:
                    - generic [ref=e843]: das das Büro
                    - generic [ref=e844]: A2
                  - paragraph [ref=e845]: office
                - generic [ref=e846]: 📝
              - paragraph [ref=e848]: "\"Ich arbeite im Büro.\""
            - generic [ref=e849]:
              - generic [ref=e850]:
                - generic [ref=e851]:
                  - generic [ref=e852]:
                    - generic [ref=e853]: das das Essen
                    - generic [ref=e854]: A1
                  - paragraph [ref=e855]: food
                - generic [ref=e856]: 📝
              - paragraph [ref=e858]: "\"Das Essen ist lecker.\""
            - generic [ref=e859]:
              - generic [ref=e860]:
                - generic [ref=e861]:
                  - generic [ref=e862]:
                    - generic [ref=e863]: das das Fach
                    - generic [ref=e864]: B1
                  - paragraph [ref=e865]: subject
                - generic [ref=e866]: 📝
              - paragraph [ref=e868]: "\"Mein Lieblingsfach ist Mathematik.\""
            - generic [ref=e869]:
              - generic [ref=e870]:
                - generic [ref=e871]:
                  - generic [ref=e872]:
                    - generic [ref=e873]: das das Fahrrad
                    - generic [ref=e874]: A2
                  - paragraph [ref=e875]: bicycle
                - generic [ref=e876]: 📝
              - paragraph [ref=e878]: "\"Ich fahre mit dem Fahrrad.\""
            - generic [ref=e879]:
              - generic [ref=e880]:
                - generic [ref=e881]:
                  - generic [ref=e882]:
                    - generic [ref=e883]: das das Fenster
                    - generic [ref=e884]: A1
                  - paragraph [ref=e885]: window
                - generic [ref=e886]: 📝
              - paragraph [ref=e888]: "\"Das Fenster ist geschlossen.\""
            - generic [ref=e889]:
              - generic [ref=e890]:
                - generic [ref=e891]:
                  - generic [ref=e892]:
                    - generic [ref=e893]: das das Fenster
                    - generic [ref=e894]: A2
                  - paragraph [ref=e895]: window
                - generic [ref=e896]: 📝
              - paragraph [ref=e898]: "\"Öffne das Fenster.\""
            - generic [ref=e899]:
              - generic [ref=e900]:
                - generic [ref=e901]:
                  - generic [ref=e902]:
                    - generic [ref=e903]: das das Fieber
                    - generic [ref=e904]: A2
                  - paragraph [ref=e905]: fever
                - generic [ref=e906]: 📝
              - paragraph [ref=e908]: "\"Ich habe Fieber.\""
            - generic [ref=e909]:
              - generic [ref=e910]:
                - generic [ref=e911]:
                  - generic [ref=e912]:
                    - generic [ref=e913]: das das Frühstück
                    - generic [ref=e914]: A2
                  - paragraph [ref=e915]: breakfast
                - generic [ref=e916]: 📝
              - paragraph [ref=e918]: "\"Das Frühstück ist fertig.\""
            - generic [ref=e919]:
              - generic [ref=e920]:
                - generic [ref=e921]:
                  - generic [ref=e922]:
                    - generic [ref=e923]: das das Gehalt
                    - generic [ref=e924]: A2
                  - paragraph [ref=e925]: salary
                - generic [ref=e926]: 📝
              - paragraph [ref=e928]: "\"Mein Gehalt ist gut.\""
            - generic [ref=e929]:
              - generic [ref=e930]:
                - generic [ref=e931]:
                  - generic [ref=e932]:
                    - generic [ref=e933]: das das Geld
                    - generic [ref=e934]: A2
                  - paragraph [ref=e935]: money
                - generic [ref=e936]: 📝
              - paragraph [ref=e938]: "\"Ich habe kein Geld.\""
            - generic [ref=e939]:
              - generic [ref=e940]:
                - generic [ref=e941]:
                  - generic [ref=e942]:
                    - generic [ref=e943]: das das Gemüse
                    - generic [ref=e944]: A2
                  - paragraph [ref=e945]: vegetables
                - generic [ref=e946]: 📝
              - paragraph [ref=e948]: "\"Ich kaufe Gemüse.\""
            - generic [ref=e949]:
              - generic [ref=e950]:
                - generic [ref=e951]:
                  - generic [ref=e952]:
                    - generic [ref=e953]: das das Gemüse
                    - generic [ref=e954]: A1
                  - paragraph [ref=e955]: vegetables
                - generic [ref=e956]: 📝
              - paragraph [ref=e958]: "\"Gemüse ist gesund.\""
            - generic [ref=e959]:
              - generic [ref=e960]:
                - generic [ref=e961]:
                  - generic [ref=e962]:
                    - generic [ref=e963]: das das Gesetz
                    - generic [ref=e964]: B1
                  - paragraph [ref=e965]: law
                - generic [ref=e966]: 📝
              - paragraph [ref=e968]: "\"Das Gesetz ist streng.\""
            - generic [ref=e969]:
              - generic [ref=e970]:
                - generic [ref=e971]:
                  - generic [ref=e972]:
                    - generic [ref=e973]: das das Gewissen
                    - generic [ref=e974]: B2
                  - paragraph [ref=e975]: conscience
                - generic [ref=e976]: 📝
              - paragraph [ref=e978]: "\"Mein Gewissen ist rein.\""
            - generic [ref=e979]:
              - generic [ref=e980]:
                - generic [ref=e981]:
                  - generic [ref=e982]:
                    - generic [ref=e983]: das das Glas
                    - generic [ref=e984]: A2
                  - paragraph [ref=e985]: glass
                - generic [ref=e986]: 📝
              - paragraph [ref=e988]: "\"Ein Glas Wasser, bitte.\""
            - generic [ref=e989]:
              - generic [ref=e990]:
                - generic [ref=e991]:
                  - generic [ref=e992]:
                    - generic [ref=e993]: das das Handy
                    - generic [ref=e994]: A2
                  - paragraph [ref=e995]: mobile phone
                - generic [ref=e996]: 📝
              - paragraph [ref=e998]: "\"Mein Handy ist neu.\""
            - generic [ref=e999]:
              - generic [ref=e1000]:
                - generic [ref=e1001]:
                  - generic [ref=e1002]:
                    - generic [ref=e1003]: das das Haus
                    - generic [ref=e1004]: A1
                  - paragraph [ref=e1005]: house
                - generic [ref=e1006]: 📝
              - paragraph [ref=e1008]: "\"Das Haus ist groß.\""
            - generic [ref=e1009]:
              - generic [ref=e1010]:
                - generic [ref=e1011]:
                  - generic [ref=e1012]:
                    - generic [ref=e1013]: das das Hemd
                    - generic [ref=e1014]: A2
                  - paragraph [ref=e1015]: shirt
                - generic [ref=e1016]: 📝
              - paragraph [ref=e1018]: "\"Das Hemd ist weiß.\""
            - generic [ref=e1019]:
              - generic [ref=e1020]:
                - generic [ref=e1021]:
                  - generic [ref=e1022]:
                    - generic [ref=e1023]: das das Hemd
                    - generic [ref=e1024]: A1
                  - paragraph [ref=e1025]: shirt
                - generic [ref=e1026]: 📝
              - paragraph [ref=e1028]: "\"Das Hemd ist weiß.\""
            - generic [ref=e1029]:
              - generic [ref=e1030]:
                - generic [ref=e1031]:
                  - generic [ref=e1032]:
                    - generic [ref=e1033]: das das Herz
                    - generic [ref=e1034]: A1
                  - paragraph [ref=e1035]: heart
                - generic [ref=e1036]: 📝
              - paragraph [ref=e1038]: "\"Mein Herz schlägt schnell.\""
            - generic [ref=e1039]:
              - generic [ref=e1040]:
                - generic [ref=e1041]:
                  - generic [ref=e1042]:
                    - generic [ref=e1043]: das das Hobby
                    - generic [ref=e1044]: A2
                  - paragraph [ref=e1045]: hobby
                - generic [ref=e1046]: 📝
              - paragraph [ref=e1048]: "\"Was ist dein Hobby?\""
            - generic [ref=e1049]:
              - generic [ref=e1050]:
                - generic [ref=e1051]:
                  - generic [ref=e1052]:
                    - generic [ref=e1053]: das das Internet
                    - generic [ref=e1054]: A2
                  - paragraph [ref=e1055]: internet
                - generic [ref=e1056]: 📝
              - paragraph [ref=e1058]: "\"Das Internet ist nützlich.\""
            - generic [ref=e1059]:
              - generic [ref=e1060]:
                - generic [ref=e1061]:
                  - generic [ref=e1062]:
                    - generic [ref=e1063]: das das Kind
                    - generic [ref=e1064]: A1
                  - paragraph [ref=e1065]: child
                - generic [ref=e1066]: 📝
              - paragraph [ref=e1068]: "\"Das Kind spielt im Garten.\""
            - generic [ref=e1069]:
              - generic [ref=e1070]:
                - generic [ref=e1071]:
                  - generic [ref=e1072]:
                    - generic [ref=e1073]: das das Kino
                    - generic [ref=e1074]: A2
                  - paragraph [ref=e1075]: cinema
                - generic [ref=e1076]: 📝
              - paragraph [ref=e1078]: "\"Wir gehen ins Kino.\""
            - generic [ref=e1079]:
              - generic [ref=e1080]:
                - generic [ref=e1081]:
                  - generic [ref=e1082]:
                    - generic [ref=e1083]: das das Kleid
                    - generic [ref=e1084]: A2
                  - paragraph [ref=e1085]: dress
                - generic [ref=e1086]: 📝
              - paragraph [ref=e1088]: "\"Das Kleid ist schön.\""
            - generic [ref=e1089]:
              - generic [ref=e1090]:
                - generic [ref=e1091]:
                  - generic [ref=e1092]:
                    - generic [ref=e1093]: das das Krankenhaus
                    - generic [ref=e1094]: A2
                  - paragraph [ref=e1095]: hospital
                - generic [ref=e1096]: 📝
              - paragraph [ref=e1098]: "\"Er ist im Krankenhaus.\""
            - generic [ref=e1099]:
              - generic [ref=e1100]:
                - generic [ref=e1101]:
                  - generic [ref=e1102]:
                    - generic [ref=e1103]: das das Magazin
                    - generic [ref=e1104]: A2
                  - paragraph [ref=e1105]: magazine
                - generic [ref=e1106]: 📝
              - paragraph [ref=e1108]: "\"Das Magazin ist interessant.\""
  - alert [ref=e1109]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import AxeBuilder from "@axe-core/playwright";
  3  | const BASE = "http://192.168.178.91:3035";
  4  | 
  5  | const PAGES = [
  6  |   { name: "Landing", path: "/" },
  7  |   { name: "Login", path: "/login" },
  8  |   { name: "Register", path: "/register" },
  9  |   { name: "Onboarding", path: "/onboarding" },
  10 |   { name: "Placement Test", path: "/placement-test" },
  11 |   { name: "Pricing", path: "/pricing" },
  12 | ];
  13 | 
  14 | test.describe("Accessibility + WCAG AA", () => {
  15 |   for (const p of PAGES) {
  16 |     test(`[A11Y] ${p.name} page passes WCAG AA checks`, async ({ page }) => {
  17 |       await page.goto(`${BASE}${p.path}`);
  18 |       const results = await new AxeBuilder({ page })
  19 |         .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  20 |         .analyze();
  21 |       expect(results.violations).toHaveLength(0);
  22 |     });
  23 |   }
  24 | 
  25 |   test.describe("Authenticated pages", () => {
  26 |     test.beforeEach(async ({ page }) => {
  27 |       await page.goto(`${BASE}/login`);
  28 |       await page.fill("#email", "test@user.de");
  29 |       await page.fill("#password", "test123456");
  30 |       await page.click("button[type=submit]");
  31 |       await page.waitForURL(/dashboard/, { timeout: 10000 });
  32 |     });
  33 | 
  34 |     for (const p of [
  35 |       { name: "Dashboard", path: "/dashboard" },
  36 |       { name: "Learn", path: "/learn" },
  37 |       { name: "Vocabulary", path: "/vocabulary" },
  38 |       { name: "Grammar", path: "/grammar" },
  39 |       { name: "Review", path: "/review" },
  40 |     ]) {
  41 |       test(`[A11Y] ${p.name} page passes WCAG AA`, async ({ page }) => {
  42 |         await page.goto(`${BASE}${p.path}`);
  43 |         const results = await new AxeBuilder({ page })
  44 |           .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  45 |           .analyze();
> 46 |         expect(results.violations).toHaveLength(0);
     |                                    ^ Error: expect(received).toHaveLength(expected)
  47 |       });
  48 |     }
  49 |   });
  50 | 
  51 |   test("[A11Y] All buttons have accessible names", async ({ page }) => {
  52 |     await page.goto(BASE);
  53 |     const buttons = page.locator("button:not([aria-label]):not(:has-text(''))");
  54 |     const count = await buttons.count();
  55 |     for (let i = 0; i < count; i++) {
  56 |       const text = await buttons.nth(i).textContent();
  57 |       const ariaLabel = await buttons.nth(i).getAttribute("aria-label");
  58 |       const title = await buttons.nth(i).getAttribute("title");
  59 |       expect(text || ariaLabel || title).toBeTruthy();
  60 |     }
  61 |   });
  62 | 
  63 |   test("[A11Y] Focus ring visible on interactive elements", async ({ page }) => {
  64 |     await page.goto(`${BASE}/login`);
  65 |     await page.keyboard.press("Tab");
  66 |     const focused = page.locator(":focus");
  67 |     await expect(focused).toBeVisible();
  68 |   });
  69 | });
  70 | 
```