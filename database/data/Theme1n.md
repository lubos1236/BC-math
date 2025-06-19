
# Téma 1: Úvod do Matematickej štatistiky

Matematická štatistika je odbor matematiky zaoberajúci sa zberom, analýzou a
interpretáciou dát. Jej hlavným cieľom je odhadovať vlastnosti populácie na
základe informácií obsiahnutých vo vzorke. Popisná štatistika sa zameriava na
zhrnutie dát pomocou mier centrálnej tendencie a variability.

Teória pravdepodobnosti je základom matematickej štatistiky a umožňuje kvantifikovať
neistotu v rôznych javoch. Inferenčná štatistika poskytuje metódy na odvodzovanie
záverov o celej populácii na základe dát získaných z jej vzorky. Regresná analýza
skúma vzťahy medzi premennými a umožňuje predikciu hodnôt na základe znalostí
iných premenných. Bayesovská štatistika využíva Bayesovu vetu na aktualizáciu
pravdepodobností na základe nových dôkazov.

Matematická štatistika má široké uplatnenie v rôznych oblastiach, vrátane vedeckého výskumu, ekonómie a
zdravotníctva. Je mocným nástrojom pre interpretáciu dát a rozhodovacie procesy.
Pomáha vytvárať informované rozhodnutia a porozumieť javom vo svete okolo nás.


## Medián

Medián označujeme ako _med(x)_. Je to prostredný člen z usporiadaných hodnôt $x_i$.  
Ak je veľkosť súboru párna $(n)$, medián určíme:

$$
\text{med}(x) = \frac{x_i + x_{i+1}}{2}, \quad i = \frac{n}{2}
$$



## Modus

Modus označujeme ako _mod(x)_. Je to najčastejšie sa vyskytujúca hodnota.

---

## Príklad: Známky žiakov 6. A

Žiaci dostali nasledovné známky:

$$
3, 2, 1, 1, 2, 2, 3, 4, 4, 1, 2, 3, 3, 3, 5
$$
### Usporiadanie dát
Usporiadame dáta od najmenšej po najväčšiu hodnotu:
$$
1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5
$$
### Výpočet štatistických charakteristík
**Medián:3**


**Modus:** 3 (najčastejšie sa vyskytujúca hodnota)

# Kvartily a kvantily

Kvartily a kvantily sú hodnoty, ktoré rozdeľujú súbor dát do určitých častí. Používajú sa v štatistike na analýzu rozloženia dát a poskytujú informáciu o polohe dát v rámci súboru. Vysvetlím obidve pojmy:

## Kvantily

Kvantily sú hodnoty, ktoré rozdeľujú usporiadaný dátový súbor na rovnaké časti podľa určitej pravdepodobnosti alebo percenta. Napríklad, *p-kvantily* sú hodnoty, ktoré rozdeľujú súbor dát na *p* častí. Najčastejšie používané kvantily sú:

- **Medián (0,5-kvantil)**: Hodnota, ktorá rozdeľuje dáta na dve rovnaké časti (50 % dát je pod mediánom a 50 % nad ním).
- **Kvartily (0,25, 0,5 a 0,75-kvantily)**: Hodnoty, ktoré rozdeľujú dáta na štyri časti (25 %, 50 % a 75 %).
- **Decily**: Rozdeľujú dáta na desať častí.
- **Percentily**: Rozdeľujú dáta na sto častí.

## Kvartily

Kvartily sú špeciálnym prípadom kvantilov, ktoré rozdeľujú dátový súbor na štyri rovnaké časti. Každý kvartil reprezentuje 25 % dát.

Kvartily sa označujú ako:

- **Prvý kvartil (Q1)**: Hodnota, pod ktorou leží 25 % dát.
- **Druhý kvartil (Q2)**: Hodnota, pod ktorou leží 50 % dát, čo je vlastne medián.
- **Tretí kvartil (Q3)**: Hodnota, pod ktorou leží 75 % dát.

## Postup výpočtu kvartilov a kvantilov – 25. a 60. percentil

Povedzme, že máme súbor dát:

`5, 7, 8, 12, 13, 14, 18, 21, 22`

1. **Usporiadajte dáta**: Tento súbor dát je už usporiadaný.
2. **Nájdite medián (Q2)**:  
   Pre `n = 10` (párny počet prvkov):  
   `Q2 = (13 + 14) / 2 = 13.5`
3. **Nájdite prvý kvartil (Q1)**:  
   Medián prvej polovice dát (prvých 5 hodnôt):  
   `Q1 = 8`
4. **Nájdite tretí kvartil (Q3)**:  
   Medián druhej polovice dát (posledných 5 hodnôt):  
   `Q3 = 21`
5. **Nájdite 25. percentil**:

   Použijeme vzorec:  
   `x = (n + 1) * p`
   kde `x` je pozícia v dátovom súbore

   `p = 0.25`

   `x = (10+ 1) * 0.25 = 2.75`

   Keďže 2,75 je medzi 2. a 3. hodnotou, použijeme lineárnu interpoláciu:  
   `7+0,75 * (8 - 7) = 7+0.75= 7.75`

   takže 25. percentil(Q1) je `7.75`

6. **Výpočet 60. percentilu:**

   `p = 0.60`

   `x = (10 + 1) * 0.60 = 6.6`

   Interpolácia medzi 6. a 7. prvkom:

   `14 + 0.6 * (18 − 14) = 14 + 2.4 = 16.4`

   **60. percentil ≈ 16.4**

## Zhrnutie

- **Prvý kvartil (Q1):** 8
- **Druhý kvartil (Q2 – medián):** 13.5
- **Tretí kvartil (Q3):** 21
- **25. percentil:** ≈ 7.75 *(blízko Q1)*
- **60. percentil:** ≈ 16.4


