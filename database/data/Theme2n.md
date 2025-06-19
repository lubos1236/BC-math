
## Pravdepodobnosť a Kombinatorika

Pravdepodobnosť a Kombinatorika sú základné oblasti matematiky, 
ktoré sú neoddeliteľnou súčasťou štatistiky a analýzy dát. 
Teória pravdepodobnosti nám umožňuje kvantifikovať neistotu a 
modelovať rôzne náhodné javy, čo je kľúčové pre analýzu dát a 
inferenčné štatistiky. Kombinatorika je oblasť, ktorá sa zaoberá 
počítaním rôznych spôsobov, ako môžeme vybrať, usporiadať alebo 
rozdeliť objekty v rôznych situáciách, pričom poradie alebo počet 
prvkov môže byť dôležitý.

Tieto oblasti matematiky sú neoceniteľné v mnohých oblastiach, 
vrátane vedeckého výskumu, ekonomiky a iných disciplín, kde pomáhajú
analyzovať veľké množstvo dát, predikovať výsledky a robiť informované 
rozhodnutia. Či už ide o výpočty pravdepodobnosti rôznych udalostí 
alebo o určenie počtu rôznych kombinácií alebo variácií, tieto metódy
umožňujú lepšie porozumieť a modelovať svet okolo nás.

---

## Príklad: Hádzanie mincí

Predstavme si, že chceme zistiť pravdepodobnosť toho, že pri jednom hode mincí padne hlava. Etapy štatistickej práce:

1. **Zber dát**: Vykonáme sériu hodov mincí. Napríklad 100 hodov.
2. **Spracovanie dát**: Zistíme, že v 60 prípadoch padla hlava.
3. **Analýza dát**: Pravdepodobnosť hlavy je:

$$
P(\text{hlava}) = \frac{60}{100} = 0.6 \quad \text{(60\%)}
$$

4. **Záver**: Odhad pravdepodobnosti, že pri hode mincí padne hlava, je 60 %.

---

## Príklad: Oslava a pravdepodobnosť mien

Na oslave je 100 hostí, z ktorých 10 sa volá Martin a 15 majú meno začínajúce na písmeno F.

1. **a1)** Aká je pravdepodobnosť, že sa bude volať Martin?

   Pravdepodobnosť, že náhodne vybraný host bude mať meno Martin, je:
   $$
   P(\text{Martin}) = \frac{10}{100} = 0.1
   $$

2. **a2)** Aká je pravdepodobnosť, že meno bude Martin alebo začne na F?

   Tu využijeme pravidlo sčítania pravdepodobností:
   $$
   P(\text{Martin alebo F}) = P(\text{Martin}) + P(\text{F}) - P(\text{Martin a F})
   $$
   Pretože žiadny host nemôže mať meno, ktoré začína na F a zároveň sa volať Martin, platí:
   $$
   P(\text{Martin alebo F}) = 0.1 + \frac{15}{100} = 0.25
   $$

3. **a3)** Aká je pravdepodobnosť, že meno nebude Martin, ale začne na F?

   Pravdepodobnosť, že meno nebude Martin, ale začne na F, je:
   $$
   P(\text{F, nie Martin}) = P(\text{F}) - P(\text{Martin a F}) = \frac{15}{100} - 0 = 0.15
   $$

4. **a4)** Aká je pravdepodobnosť, že meno nebude Martin a nezačne na F?

   Pravdepodobnosť, že meno nebude Martin a nezačne na F, je doplnok k predchádzajúcim pravdepodobnostiam:
   $$
   P(\text{nie Martin a nie F}) = 1 - P(\text{Martin alebo F}) = 1 - 0.25 = 0.75
   $$



---

## Hádzanie kockou

Strany kocky sú očíslované 1 až 6.

1. Pravdepodobnosť, že padne číslo 3:  
   $$
   \frac{1}{6}
   $$

2. Pravdepodobnosť, že padne číslo väčšie ako 4:  
   $$
   \frac{2}{6} = \frac{1}{3}
   $$

3. Pravdepodobnosť, že padne číslo menšie ako 5:  
   $$
   \frac{4}{6} = \frac{2}{3}
   $$



---

## Variácie a Kombinácie

### 1. **Variácie**

**Variácie** sa používajú, keď chceme zistiť, koľkými rôznymi spôsobmi môžeme vybrať a usporiadať \( k \) prvkov z množiny \( n \) prvkov, pričom poradie hrá úlohu. Počet variácií sa vypočíta pomocou vzorca:

$$
A(n, k) = \frac{n!}{(n-k)!}
$$


#### Príklad 1: Výber a usporiadanie cien z troch kandidátov

Predstavme si, že máme 5 kandidátov na ocenenie a chceme vybrať a usporiadať 3 z nich na prvé tri miesta (1. miesto, 2. miesto, 3. miesto). Koľkými rôznymi spôsobmi môžeme priradiť tieto miesta?

Počet možných variácií je:

$$
A(5, 3) = \frac{5!}{(5-3)!} = 5 \times 4 \times 3 = 60
$$


Takže existuje **60 rôznych spôsobov**, ako usporiadať 3 kandidátov na prvé tri miesta.

#### Príklad 2: Výber 2 písmen z abecedy

Máme 4 písmená: \( \{A, B, C, D\} \), a chceme vybrať 2 písmená a usporiadať ich (poradie je dôležité). Počet variácií je:

$$
A(4, 2) = \frac{4!}{(4-2)!} = 4 \times 3 = 12
$$


Takže existuje **12 rôznych spôsobov**, ako usporiadať 2 písmená z 4.

---

### 2. **Kombinácie**

**Kombinácie** sa používajú, keď chceme zistiť, koľkými rôznymi spôsobmi môžeme vybrať \( k \) prvkov z množiny \( n \) prvkov, ale poradie nehrá úlohu. Počet kombinácií sa vypočíta pomocou vzorca:

$$
C(n, k) = \frac{n!}{k!(n-k)!}
$$

#### Príklad 1: Výber 3 hráčov z 5

Predstavme si, že máme 5 hráčov, z ktorých chceme vybrať 3 na športové podujatie. Tu záleží len na tom, ktorí hráči budú vybraní, nie na tom, v akom poradí. Počet kombinácií, ako vybrať 3 hráčov z 5, je:

$$
C(5, 3) = \frac{5!}{3!(5-3)!} = \frac{5 \times 4}{2 \times 1} = 10
$$


Takže existuje **10 rôznych spôsobov**, ako vybrať 3 hráčov z 5.

#### Príklad 2: Výber 2 písmen z abecedy

Opäť máme 4 písmená \( \{A, B, C, D\} \), ale tentokrát neberieme do úvahy poradie, len výber 2 písmen. Počet kombinácií je:

$$
C(4, 2) = \frac{4!}{2!(4-2)!} = \frac{4 \times 3}{2 \times 1} = 6
$$


Takže existuje **6 rôznych spôsobov**, ako vybrať 2 písmená z 4, bez ohľadu na poradie.

---

### Zhrnutie:

- **Variácie** sa používajú, keď poradie vybraných prvkov záleží.
- **Kombinácie** sa používajú, keď poradie vybraných prvkov nezáleží.
