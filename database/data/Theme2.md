# Náhodná premenná

Náhodná premenná je v matematickej štatistike základným pojmom, ktorý opisuje jav, ktorého výsledok je náhodný. Používa sa na modelovanie neistoty a variability v rôznych situáciách, ako sú výsledky hodu mincí alebo počet zákazníkov v obchode za určitý čas. Tento koncept je kľúčový pre analýzu náhodných javov vo vedeckom výskume, priemysle, ekonómii a ďalších oblastiach. Pomáha pri predikcii, hodnotení rizika a rozhodovaní na základe pravdepodobnosti.

---

# Distribučná funkcia

Majme zadanie:

**Súťažiaci hádže šipky do terča až pokým sa netrafí. Pravdepodobnosť zásahu je 0,4.**

Nájdite:

a) distribučnú funkciu  
b) P(2 <= X <= 4)

Distribučná funkcia nám hovorí pravdepodobnosť, že náhodná premenná X nadobudne hodnoty menšie alebo rovné určitému číslu x.

Distribučnú funkciu môžeme spočítať pomocou geometrického rozdelenia, ktoré je vhodné pre situácie, kde vykonáme sériu nezávislých pokusov s konštantnou pravdepodobnosťou úspechu.

---

### Pravdepodobnosti

X – počet výstrelov (1,2,3,4,5)

$$P(X=1) = 0.6$$
$$P(X=2) = 0.4 * 0.6 = 0.24$$
$$P(X=3) = 0.4^2 * 0.6 = 0.096$$
$$P(X=4) = 0.4^3 * 0.6 = 0.0384$$
$$P(X=5) = 0.4^4 * 1 = 0.44$$


Poznámka: Posledný člen (5. pokus) má pravdepodobnosť doplnenú do 1.

---

### a) Distribučná funkcia F(x)

| x     | F(x)                         |
|-------|------------------------------|
| <=1   | 0                            |
| <=2   | 0 + 0.6 = 0.6                |
| <=3   | 0.6 + 0.24 = 0.84            |
| <=4   | 0.84 + 0.096 = 0.936         |
| <=5   | 0.936 + 0.0384 = 0.9744      |
| >5    | 0.9744 + 0.44 = **1.0**      |

---

### b) P(2 <= X <= 4)

Spočítame:

`P(2 <= X <= 4) = P(2) + P(3) + P(4)`

`= 0.24 + 0.096 + 0.0384`

`= 0.3744`

---

# Príklad – Guľky v krabičke

V krabičke sú 3 biele guľky a 5 čiernych guliek. Náhodne z nej vyberáme po jednej guľke bez návratu dovtedy, kým nevytiahneme prvú bielu guľku. Určte zákon rozdelenia pravdepodobnosti náhodnej premennej X, ktorá nadobúda hodnoty počtu vytiahnutých guliek.

`P(X=1) = 3/8`

`P(X=2) = 5/8 * 3/7 = 15/56`

`P(X=3) = 5/8 * 4/7 * 3/6 = 5/28`

`P(X=4) = 5/8 * 4/7 * 3/6 * 3/5 = 3/28`

`P(X=5) = 5/8 * 4/7 * 3/6 * 2/5 * 3/4 = 3/56`

`P(X=6) = 5/8 * 4/7 * 3/6 * 2/5 * 1/4 = 1/56`

---

# Stredná hodnota

Stredná hodnota alebo priemer je základný štatistický ukazovateľ, ktorý predstavuje priemernú hodnotu v súbore dát. Vypočítame ju sčítaním všetkých hodnôt a vydelením ich počtom.

**Vzorec:**
`x̄ = (Σ xi) / n`
kde:

- `xi` je jednotlivá hodnota
- `n` je počet hodnôt

---

# Disperzia (rozptyl)

Disperzia ukazuje, ako sú jednotlivé hodnoty vzdialené od strednej hodnoty. Čím väčšia je disperzia, tým väčšia je variabilita.

**Vzorec:**
`σ² = (Σ (xi − x̄)²) / n`
---

# Štandardná odchýlka

Štandardná odchýlka je druhá odmocnina z rozptylu a má rovnaké jednotky ako pôvodné dáta.

**Vzorec:**
`σ = √σ²`

---

### Príklad:

Majme súbor dát: `4, 8, 6, 5, 3, 7`

**Stredná hodnota:**
`x̄ = (4 + 8 + 6 + 5 + 3 + 7) / 6 = 33/6 = 5.5`

**Rozptyl:**
`σ² = [(4−5.5)² + (8−5.5)² + (6−5.5)² + (5−5.5)² + (3−5.5)² + (7−5.5)²] / 6`

`= [2.25 + 6.25 + 0.25 + 0.25 + 6.25 + 2.25] / 6`

`= 17.5 / 6 ≈ 2.92`

**Štandardná odchýlka:**
`σ = √2.92 ≈ 1.71`
---
### Zhrnutie:

- Stredná hodnota **x̄ = 5.5**
- Disperzia (rozptyl) **σ² ≈ 2.92**
- Štandardná odchýlka **σ ≈ 1.71**
