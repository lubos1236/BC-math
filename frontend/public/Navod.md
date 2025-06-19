# Navod
Úlohy a témy sú písane v jazyku Markdown, ktorý umožňuje jednoduché formátovanie textu. Tu sú základné pravidlá a príklady, ako písať úlohy a témy v Markdown:

## Základné pravidlá Markdown 

Markdown je jednoduchý značkovací jazyk, ktorý umožňuje formátovanie textu pomocou špeciálnych znakov. Tu sú základné pravidlá:
## Nadpisy
Nadpisy Použite `#` pre nadpisy. Počet `#` určuje úroveň nadpisu
# Nadpis1
## Nadpis2
### Nadpis3
#### Nadpis4


## Textové formátovanie
**tucny text**

*kurzíva*


## Zoznamy

- polozka 1
  - polozka 1.1
    - polozka 1.1.1
    
1. Číslované zoznamy
2. Nečíslované zoznamy
   3. Podpoložka


## Tabulky
| Hlavička 1 | Hlavička 2 |
|------------|------------|
| Hodnota 1  | Hodnota 2  |
| Hodnota 3  | Hodnota 4  |
| Hodnota 5  | Hodnota 6  |

## Blokové citácie
> Toto je bloková citácia.
>> Môže byť aj vnorená.

## Oddelenie sekcií

---
# Ako písať úlohy a témy v Markdown
Teraz prejdeme k príkladom, ako písať úlohy a témy v Markdown.
Každá úloha má id témy ktoré zodpovedá jej kategórii. Id témy je jedinečné číslo, ktoré identifikuje tému v databáze.

Zadanie úlohy je písané v Markdown formáte. Tu je príklad úlohy:
V pole Ulohy píšte zadanie úlohy. Použite Markdown pre formátovanie textu.
Premenne sa píšu v tvare {%x%} kde x je názov premennej.
V poli premenne definujete premenné, ktoré sa použijú v úlohe. Premenné sú definované ako:{nazov_premennej,typ_premennej,minimálna_hodnota,maximálna_hodnota}
ako typ premennej sa používa: 'd' ako cele cisla alebo 'f' ako desatinné čísla. V prípade, že 
chcete definovať aj počet desatinných miest, použite 'f.x' a kde x oznacuje pocet miest.
## Príklad úlohy
V triede je {%x%} žiakov a z tohe je {%y%} chlapcov. Určte percento chlapcov v triede.

Premenne:

{x,d,10,30};{y,d,2,9}
## X

nazov premennej je x

typ premennej je d (cele cislo)

minimálna hodnota je 10

maximálna hodnota je 30

## Y
nazov premennej je y

typ premennej je d (cele cislo)

minimálna hodnota je 2

maximálna hodnota je 9


## Riešenie úlohy
Riešenie úlohy je písané v Markdown formáte. Tu je príklad riešenia úlohy:

{%y%}/{%x%} * 100

## Reťazce
Ak chceme pouzit reťazce ako premenu tak ich definujeme ako:

{a:10{z,f,1,5}}

## z
označenie ze ide o retazce je a

nazov premennej je z

typ premennej je f (Desatinné číslo, kedže nieje definovy počet desatinných miest, tak sa použije 2 desatinné miesta)

minimálna hodnota je 1

maximálna hodnota je 5

Aplikacia ma aj vstavane funkcie ako mod(), med(), sum(), min(), max(), q1()-qvartil 25, q2()-qvartil 50, q3()-qvartil 75 var()-variacie com()-kombinacie rozptyl
V zatvorkách sa píšu hodnoty, ktoré sa použijú v týchto funkciách.
