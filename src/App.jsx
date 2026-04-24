import { useState, useEffect } from "react";

// ─── DATOS DE LOS 72 PARTIDOS ───────────────────────────────────────────────
const MATCHES_DATA = [
  // ── JORNADA 1 ──
  { id: 1,  jornada: 1, grupo: "A", local: "MÉXICO",        visitante: "SUDÁFRICA",    fecha: "JUE 11 JUN", hora: "13:00", sede: "Estadio Azteca, CDMX" },
  { id: 2,  jornada: 1, grupo: "A", local: "COREA",         visitante: "REP. CHECA",   fecha: "JUE 11 JUN", hora: "20:00", sede: "Estadio Akron, Guadalajara" },
  { id: 3,  jornada: 1, grupo: "B", local: "CANADÁ",        visitante: "BOSNIA",       fecha: "VIE 12 JUN", hora: "13:00", sede: "BMO Field, Toronto" },
  { id: 4,  jornada: 1, grupo: "D", local: "EUA",           visitante: "PARAGUAY",     fecha: "VIE 12 JUN", hora: "19:00", sede: "SoFi Stadium, Los Ángeles" },
  { id: 5,  jornada: 1, grupo: "B", local: "CATAR",         visitante: "SUIZA",        fecha: "SAB 13 JUN", hora: "13:00", sede: "Levi's Stadium, San Francisco" },
  { id: 6,  jornada: 1, grupo: "C", local: "BRASIL",        visitante: "MARRUECOS",    fecha: "SAB 13 JUN", hora: "16:00", sede: "MetLife Stadium, Nueva York" },
  { id: 7,  jornada: 1, grupo: "C", local: "HAITÍ",         visitante: "ESCOCIA",      fecha: "SAB 13 JUN", hora: "19:00", sede: "Gillette Stadium, Boston" },
  { id: 8,  jornada: 1, grupo: "D", local: "AUSTRALIA",     visitante: "TURQUÍA",      fecha: "SAB 13 JUN", hora: "22:00", sede: "BC Place, Vancouver" },
  { id: 9,  jornada: 1, grupo: "E", local: "ALEMANIA",      visitante: "CURAZAO",      fecha: "DOM 14 JUN", hora: "11:00", sede: "NRG Stadium, Houston" },
  { id: 10, jornada: 1, grupo: "F", local: "HOLANDA",       visitante: "JAPÓN",        fecha: "DOM 14 JUN", hora: "14:00", sede: "AT&T Stadium, Dallas" },
  { id: 11, jornada: 1, grupo: "E", local: "C. DE MARFIL",  visitante: "ECUADOR",      fecha: "DOM 14 JUN", hora: "17:00", sede: "Lincoln Financial Field, Philadelphia" },
  { id: 12, jornada: 1, grupo: "F", local: "SUECIA",        visitante: "TÚNEZ",        fecha: "DOM 14 JUN", hora: "20:00", sede: "Estadio BBVA, Monterrey" },
  { id: 13, jornada: 1, grupo: "H", local: "ESPAÑA",        visitante: "CABO VERDE",   fecha: "LUN 15 JUN", hora: "10:00", sede: "Mercedes-Benz Stadium, Atlanta" },
  { id: 14, jornada: 1, grupo: "G", local: "BÉLGICA",       visitante: "EGIPTO",       fecha: "LUN 15 JUN", hora: "13:00", sede: "Lumen Field, Seattle" },
  { id: 15, jornada: 1, grupo: "H", local: "ARABIA S.",     visitante: "URUGUAY",      fecha: "LUN 15 JUN", hora: "16:00", sede: "Hard Rock Stadium, Miami" },
  { id: 16, jornada: 1, grupo: "G", local: "IRÁN",          visitante: "N. ZELANDA",   fecha: "LUN 15 JUN", hora: "19:00", sede: "SoFi Stadium, Los Ángeles" },
  { id: 17, jornada: 1, grupo: "I", local: "FRANCIA",       visitante: "SENEGAL",      fecha: "MAR 16 JUN", hora: "13:00", sede: "MetLife Stadium, Nueva York" },
  { id: 18, jornada: 1, grupo: "I", local: "IRAK",          visitante: "NORUEGA",      fecha: "MAR 16 JUN", hora: "16:00", sede: "Gillette Stadium, Boston" },
  { id: 19, jornada: 1, grupo: "J", local: "ARGENTINA",     visitante: "ARGELIA",      fecha: "MAR 16 JUN", hora: "19:00", sede: "Arrowhead Stadium, Kansas City" },
  { id: 20, jornada: 1, grupo: "J", local: "AUSTRIA",       visitante: "JORDANIA",     fecha: "MAR 16 JUN", hora: "22:00", sede: "Levi's Stadium, San Francisco" },
  { id: 21, jornada: 1, grupo: "K", local: "PORTUGAL",      visitante: "REP. D. CONGO",fecha: "MIE 17 JUN", hora: "11:00", sede: "NRG Stadium, Houston" },
  { id: 22, jornada: 1, grupo: "L", local: "INGLATERRA",    visitante: "CROACIA",      fecha: "MIE 17 JUN", hora: "14:00", sede: "AT&T Stadium, Dallas" },
  { id: 23, jornada: 1, grupo: "L", local: "GHANA",         visitante: "PANAMÁ",       fecha: "MIE 17 JUN", hora: "17:00", sede: "BMO Field, Toronto" },
  { id: 24, jornada: 1, grupo: "K", local: "UZBEKISTÁN",    visitante: "COLOMBIA",     fecha: "MIE 17 JUN", hora: "20:00", sede: "Estadio Azteca, CDMX" },
  // ── JORNADA 2 ──
  { id: 25, jornada: 2, grupo: "A", local: "REP. CHECA",    visitante: "SUDÁFRICA",    fecha: "JUE 18 JUN", hora: "10:00", sede: "Mercedes-Benz Stadium, Atlanta" },
  { id: 26, jornada: 2, grupo: "B", local: "SUIZA",         visitante: "BOSNIA",       fecha: "JUE 18 JUN", hora: "13:00", sede: "SoFi Stadium, Los Ángeles" },
  { id: 27, jornada: 2, grupo: "B", local: "CANADÁ",        visitante: "CATAR",        fecha: "JUE 18 JUN", hora: "16:00", sede: "BC Place, Vancouver" },
  { id: 28, jornada: 2, grupo: "A", local: "MÉXICO",        visitante: "COREA",        fecha: "JUE 18 JUN", hora: "19:00", sede: "Estadio Akron, Guadalajara" },
  { id: 29, jornada: 2, grupo: "D", local: "EUA",           visitante: "AUSTRALIA",    fecha: "VIE 19 JUN", hora: "13:00", sede: "Lumen Field, Seattle" },
  { id: 30, jornada: 2, grupo: "C", local: "ESCOCIA",       visitante: "MARRUECOS",    fecha: "VIE 19 JUN", hora: "16:00", sede: "Gillette Stadium, Boston" },
  { id: 31, jornada: 2, grupo: "C", local: "BRASIL",        visitante: "HAITÍ",        fecha: "VIE 19 JUN", hora: "19:00", sede: "Lincoln Financial Field, Philadelphia" },
  { id: 32, jornada: 2, grupo: "D", local: "TURQUÍA",       visitante: "PARAGUAY",     fecha: "VIE 19 JUN", hora: "22:00", sede: "Levi's Stadium, San Francisco" },
  { id: 33, jornada: 2, grupo: "F", local: "HOLANDA",       visitante: "SUECIA",       fecha: "SAB 20 JUN", hora: "11:00", sede: "NRG Stadium, Houston" },
  { id: 34, jornada: 2, grupo: "E", local: "ALEMANIA",      visitante: "C. DE MARFIL", fecha: "SAB 20 JUN", hora: "14:00", sede: "BMO Field, Toronto" },
  { id: 35, jornada: 2, grupo: "E", local: "ECUADOR",       visitante: "CURAZAO",      fecha: "SAB 20 JUN", hora: "18:00", sede: "Arrowhead Stadium, Kansas City" },
  { id: 36, jornada: 2, grupo: "F", local: "TÚNEZ",         visitante: "JAPÓN",        fecha: "SAB 20 JUN", hora: "22:00", sede: "Estadio BBVA, Monterrey" },
  { id: 37, jornada: 2, grupo: "H", local: "ESPAÑA",        visitante: "ARABIA S.",    fecha: "DOM 21 JUN", hora: "10:00", sede: "Mercedes-Benz Stadium, Atlanta" },
  { id: 38, jornada: 2, grupo: "G", local: "BÉLGICA",       visitante: "IRÁN",         fecha: "DOM 21 JUN", hora: "13:00", sede: "SoFi Stadium, Los Ángeles" },
  { id: 39, jornada: 2, grupo: "H", local: "URUGUAY",       visitante: "CABO VERDE",   fecha: "DOM 21 JUN", hora: "16:00", sede: "Hard Rock Stadium, Miami" },
  { id: 40, jornada: 2, grupo: "G", local: "N. ZELANDA",    visitante: "EGIPTO",       fecha: "DOM 21 JUN", hora: "19:00", sede: "BC Place, Vancouver" },
  { id: 41, jornada: 2, grupo: "J", local: "ARGENTINA",     visitante: "AUSTRIA",      fecha: "LUN 22 JUN", hora: "11:00", sede: "AT&T Stadium, Dallas" },
  { id: 42, jornada: 2, grupo: "I", local: "FRANCIA",       visitante: "IRAK",         fecha: "LUN 22 JUN", hora: "15:00", sede: "Lincoln Financial Field, Philadelphia" },
  { id: 43, jornada: 2, grupo: "I", local: "NORUEGA",       visitante: "SENEGAL",      fecha: "LUN 22 JUN", hora: "18:00", sede: "MetLife Stadium, Nueva York" },
  { id: 44, jornada: 2, grupo: "J", local: "JORDANIA",      visitante: "ARGELIA",      fecha: "LUN 22 JUN", hora: "21:00", sede: "Levi's Stadium, San Francisco" },
  { id: 45, jornada: 2, grupo: "K", local: "PORTUGAL",      visitante: "UZBEKISTÁN",   fecha: "MAR 23 JUN", hora: "11:00", sede: "NRG Stadium, Houston" },
  { id: 46, jornada: 2, grupo: "L", local: "INGLATERRA",    visitante: "GHANA",        fecha: "MAR 23 JUN", hora: "14:00", sede: "Gillette Stadium, Boston" },
  { id: 47, jornada: 2, grupo: "L", local: "PANAMÁ",        visitante: "CROACIA",      fecha: "MAR 23 JUN", hora: "17:00", sede: "BMO Field, Toronto" },
  { id: 48, jornada: 2, grupo: "K", local: "COLOMBIA",      visitante: "REP. D. CONGO",fecha: "MAR 23 JUN", hora: "20:00", sede: "Estadio Akron, Guadalajara" },
  // ── JORNADA 3 ──
  { id: 49, jornada: 3, grupo: "B", local: "SUIZA",         visitante: "CANADÁ",       fecha: "MIE 24 JUN", hora: "13:00", sede: "BC Place, Vancouver" },
  { id: 50, jornada: 3, grupo: "B", local: "BOSNIA",        visitante: "CATAR",        fecha: "MIE 24 JUN", hora: "13:00", sede: "Lumen Field, Seattle" },
  { id: 51, jornada: 3, grupo: "C", local: "ESCOCIA",       visitante: "BRASIL",       fecha: "MIE 24 JUN", hora: "16:00", sede: "Hard Rock Stadium, Miami" },
  { id: 52, jornada: 3, grupo: "C", local: "MARRUECOS",     visitante: "HAITÍ",        fecha: "MIE 24 JUN", hora: "16:00", sede: "Mercedes-Benz Stadium, Atlanta" },
  { id: 53, jornada: 3, grupo: "A", local: "REP. CHECA",    visitante: "MÉXICO",       fecha: "MIE 24 JUN", hora: "19:00", sede: "Estadio Azteca, CDMX" },
  { id: 54, jornada: 3, grupo: "A", local: "SUDÁFRICA",     visitante: "COREA",        fecha: "MIE 24 JUN", hora: "19:00", sede: "Estadio BBVA, Monterrey" },
  { id: 55, jornada: 3, grupo: "E", local: "CURAZAO",       visitante: "C. DE MARFIL", fecha: "JUE 25 JUN", hora: "14:00", sede: "Lincoln Financial Field, Philadelphia" },
  { id: 56, jornada: 3, grupo: "E", local: "ECUADOR",       visitante: "ALEMANIA",     fecha: "JUE 25 JUN", hora: "14:00", sede: "MetLife Stadium, Nueva York" },
  { id: 57, jornada: 3, grupo: "F", local: "JAPÓN",         visitante: "SUECIA",       fecha: "JUE 25 JUN", hora: "17:00", sede: "AT&T Stadium, Dallas" },
  { id: 58, jornada: 3, grupo: "F", local: "TÚNEZ",         visitante: "HOLANDA",      fecha: "JUE 25 JUN", hora: "17:00", sede: "Arrowhead Stadium, Kansas City" },
  { id: 59, jornada: 3, grupo: "D", local: "TURQUÍA",       visitante: "EUA",          fecha: "JUE 25 JUN", hora: "20:00", sede: "SoFi Stadium, Los Ángeles" },
  { id: 60, jornada: 3, grupo: "D", local: "PARAGUAY",      visitante: "AUSTRALIA",    fecha: "JUE 25 JUN", hora: "20:00", sede: "Levi's Stadium, San Francisco" },
  { id: 61, jornada: 3, grupo: "I", local: "NORUEGA",       visitante: "FRANCIA",      fecha: "VIE 26 JUN", hora: "13:00", sede: "Gillette Stadium, Boston" },
  { id: 62, jornada: 3, grupo: "I", local: "SENEGAL",       visitante: "IRAK",         fecha: "VIE 26 JUN", hora: "13:00", sede: "BMO Field, Toronto" },
  { id: 63, jornada: 3, grupo: "H", local: "CABO VERDE",    visitante: "ARABIA S.",    fecha: "VIE 26 JUN", hora: "18:00", sede: "NRG Stadium, Houston" },
  { id: 64, jornada: 3, grupo: "H", local: "URUGUAY",       visitante: "ESPAÑA",       fecha: "VIE 26 JUN", hora: "18:00", sede: "Estadio Akron, Guadalajara" },
  { id: 65, jornada: 3, grupo: "G", local: "EGIPTO",        visitante: "IRÁN",         fecha: "VIE 26 JUN", hora: "21:00", sede: "Lumen Field, Seattle" },
  { id: 66, jornada: 3, grupo: "G", local: "N. ZELANDA",    visitante: "BÉLGICA",      fecha: "VIE 26 JUN", hora: "21:00", sede: "BC Place, Vancouver" },
  { id: 67, jornada: 3, grupo: "L", local: "PANAMÁ",        visitante: "INGLATERRA",   fecha: "SAB 27 JUN", hora: "15:00", sede: "MetLife Stadium, Nueva York" },
  { id: 68, jornada: 3, grupo: "L", local: "CROACIA",       visitante: "GHANA",        fecha: "SAB 27 JUN", hora: "15:00", sede: "Lincoln Financial Field, Philadelphia" },
  { id: 69, jornada: 3, grupo: "K", local: "COLOMBIA",      visitante: "PORTUGAL",     fecha: "SAB 27 JUN", hora: "17:30", sede: "Hard Rock Stadium, Miami" },
  { id: 70, jornada: 3, grupo: "K", local: "REP. D. CONGO", visitante: "UZBEKISTÁN",   fecha: "SAB 27 JUN", hora: "17:30", sede: "Mercedes-Benz Stadium, Atlanta" },
  { id: 71, jornada: 3, grupo: "J", local: "ARGELIA",       visitante: "AUSTRIA",      fecha: "SAB 27 JUN", hora: "20:00", sede: "Arrowhead Stadium, Kansas City" },
  { id: 72, jornada: 3, grupo: "J", local: "JORDANIA",      visitante: "ARGENTINA",    fecha: "SAB 27 JUN", hora: "20:00", sede: "AT&T Stadium, Dallas" },
];

const LOGO_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAC/CAYAAAC7f5PnAACjXUlEQVR42ux9d3yVVbb2s/d+y6npCQFCrwpKVaoCFlSKjiWMdexib6MzjoohlrFg72DvmihNpAgaOgKh906AQHo7OeUte6/vj3OCONcp996Z+WBu1m/mJ0lOzjk5737e1Z71LKDZmu0Es4KCArF8+XLvP/lp2bx5H/sBsOZPuNn+L4PLS0TNIGi2E99LFBQUGP/s5yXK403/Li4u1ouKijQAbP78qenFxcV68yffbP8jy8vL40VFRZ5/1+sR5XEiEv9qEBIRLygoED98P/P6pUuXBpvCreYr3mz/ECj+1tf/CUZEvGjatJQffpjV7j/x72u2f5EVFxfrxfPnJ/+n/51FRUVaUdF3/f/az5sR02y/av3793f7n3tu/X/a37V8+fJfJOmhUMiQUh1JeA9WVFSkLV9e4G0GSLP93ejjn32nPjZBPuqlfj0x/pflAIMHD44xxo7+bRkZGWTbIpSfn6+IiEkZOtVxgimJ8Is1A6TZ/i0WDAZZYWGPXxz86urqX61SzZ492zgWOAUFBf+0ZL2goEBfvrzA2/T8gwcPjo4aNaoBABhjKhLB9mHDLjiS+Jqar1yzHfdWUFDwT2sKrp83z58o7f5bPFazNduJmJh7/tGSbnOI1Wwn4gHXjjng/3hSRXEwSNmY3qAaPP9IrtUMkGY74WzhwoWqoaHB/u/+HmNxMAhRXD7qzFGVABgR/U0MNMdezfafbOxveYjZs2ebXq+XjRgxIvaXPysuLta//fZb2exBmu1/ZZs3bzZ+Jek9Xuxvhk9+P0urrKx0mq9is/3LrKCgQByPFI2ioiJtyZJZqb/2s7y8PD579mzzWE/y14iKWvMlbrb/jY0bN04ej+8rM7OSV1cHf5VcOWDAAF0IkQygkogAwP7L8Kp///5Ocw7SbP+nraioSGvdOiq6dh1lAcDMmTN9Y8eOja5Zs0YrKysLmGZENQOk2f56AE8FAshVJ2pHmYjY33jv/yWBTzweAOiHJXN6WKFIffMpaLa/arNnzzb/Xhn0PzGniucjcUJjcxWr2f6qjRo1ymKMqf9wQBytws2cOdP3szdpJis2W7MhNzfXXbhwoQIApZQYN26c3Lt3r9q1a47RTFZstmZrtmZrtv9eYg/ES73NOchxeGGa7f/vNWCM0bx503rX1ZTe0QyQ4+SiUF4eZ4xRQW6uONGAcmxH+kSz2bNnm8uPmTXZUlioz507s7thiEPgvLD5dP5/tmMpGkQU+LXvH+92ImtJFRcX68cCnIjYvHnz/M0n8ziworw8LXFR+M7PPnpo+fjx2/ZPm3ajHgj84ufN9k8x9reBMlmfNm1aSvHkyfpRr94c8v7/C6lyAZH4d/amSU/PWTlkKC3NaUerzh1JW1975UsiagUAeQAHa75O/1svMXfu3DZ/DTgzZ870LVkyK3Xnztnmr4Gi+S71b7SCggLBGFPQNFlRvOLG5Tdc/6i5el17RGJSDwaY3L2Hat5+97er9uw5I1pxYIK3dcf34bgggLFjaBFExCZOnMi2bt3KAKCwouLohc3NyiIAOPnkk2nixIl0PNfyCwoKjNzcLS5j+f+yZmR19VYDyAoXFRVpI0aMcP8ixGXBYJAPHTq8bs2aNRoQ52f95eOa7d+RiOfmNnkNvv2DKZOKR4+mFe06UXHnk9zlnbrS0h496KfOndXqLl2tolY5VHzhRbT54/feIiIvUR7Pjf++9j8orDAAWu5xWAAoKirS/tX5VlFRQWDz5gLjH1FGKS6e6Vu2bF7WPxybNds/ARx5eZzlx++QRNRz1f33PIeFyy6wq2qlaXpYox3lbOTZMM8cLJ3Zc4Rn7QZQIAjZob1jDBsyJ+Ou+67twFhd08XSDQOWZflemTIlY93mza0ikUjnhobqQDTiKE0Inp6RZoPYnpNP7lw58YGHD3k9ngbLso5l5Ync3FwUFhbK/ys3p/+uFy0oKPDm5uZajLFmNu+/9OIUFAg2bpwkIl6+dOEje96c8pBWvN4niEnbdUQ0NRnuxWPJPf10Ej4/5+E6S1u4eE1am7arT7rjro9NxtYyAIoocOlVV/UtKS09u6q6uq/lut1jUmUpqCSlAKlknDwEgHMRBxKHretGmd/r3ZXq9//Url27Re+/9trqrMzMOsd143jLzeUoLFT4J4vE/W9s9uzZ5sqVK538/H8s7CoqKtKGDx8ufw0ECY5VYMSIEXX/kuy+2f4Xrn3YMG3EokUuEbXYOfnNDxq+nHpBdOduGD6fdKyYcHp2B13xW+W0bcdlNALpWItdTXvskt9ctgh2fH7nxhtvHL56y7bcyoa688KW3cmyLEjpxuU5GAMYA2NCMsaPkreJFAjgIMUIBM41CI1DA4PfY5ZmpqXNO6V794+mff754mgs1hSL83/0QP6LK020YMGMFikprWuaBpb+nm3evNno0aOH82sASYSU7O8RLouLi/VQKES/lns0A+Rf4NInMsbyARWurxq4c+KTH0fn/tAF4YiEJnhYScbOOQu4aIxUwSThhMNhDvXHC0Zf+DYA6TNNjLli3KhVazfcUVVdPSpmu+CGDl03iBgUKQJIMVLEEiiJn6xEGs+OXlVGjMU5qUoRkVTCIcmEdGEIgRatWi46vU+vN2d9/lVBYyQCxCtrx5U3+RdeI34saAoKCsSWLbmUnx//XlFRnpaZmcsPHDjQzOb9F1Sp6AmvR+38+ovb1l998/ex6bO7CFdJBSYakpKYvOUGxC692JU+n7AbQ+u4Kc68YPSFb3DO5cN5Dw/M6dHju7mLV3x3sL5+lCM0GF6vS5JUuKaGOZYthCYEGOM/B9YUP9F0zN2OGEDElCKulBKklMY5Yx5DJ93rlVLTcaCqZth3i5Z+1bpnj+9//9BDpwnOZDxl+s9eAVBUVBCYM2fOf2lu5uZuOVrRrazsQVu3boXHg4HNHuSf5DUKGePjAElE3tUPP/yitvSnW62SQ2CmrmKWxa1Te0KMuwTh7Gzp4Vw4sdj0Bhm69cqLriwnIuPciy9+aN3W7X+qD4U9QhdKmDpFQiGBUAOSUlJx1rBhWL12LUp37QJS06B5PNB1Iw4KpUAqDgxiKhFtMRAUOAc4OCzbgtsYAkgB/gD8gaB0HBeKSPhNI9qzU8cXl86d+yRjLJbwJv/2JD4vL4/36NHDHDduXPR/WhULBoPsV8IzBoCKimZmCKGxMxOaWE3ekoj4xIkTccYZfTMBoKbGqs3MzFQxXpPZ7EH+GVUqxmgcIMs3FZ+39KqrVzlfz7xVHi5TpHGyGOf8soug3XYTRbOypCalcGLRt/bs2Xv5lRddWf7F1C86de3Xd9bSdRvyQ7GYx+PxSMeJ8UhFuTilcxe88uKL2LB8KaZ99hm+eG8Kbh4/Hqf36gWfpiFaWY5I+RFEGushmYIwODjjABi4xkDSQbSqGuEjpUgydFxy0YV44elnMLRfP4SrqoTt2MI0dNkYjXjXbNn6SIfefb5//tVXuyfAIf7dn2V+fr7asmWL9Y8+/i+pIpWVlTpw+NeoLwQAmZmxhro6N5zITagpGF22bJl/+PDhSSkpZTWRCAtlZmZyTQsHD/irqpo9yD+nSpW154tPnyh556Prg/sO6Ew3ZMyOCatNK2hXXg6ra2eKWbbymqaI2dEnLhx14WMA8PuHHhrw5cyZ3xyuqm5teLwuE1zE6upY5w7t8OAdd+CWG248+lpK2eDcSHgsiZKSg1hVvAaLVizHiuI12FZSglhDA/RAAEITiNVUw+P1YnC/frj0wrEYdd55aN+uAwDAcWx8+PnneObV17B3zx5409KJFEnHdrQMn1k26uyzcz96552lKr4C7bgpBxcUFIj/rYrKX2kY8h49erDMzEBLoLHOtpN99fX11ampnr7Np/x/GFIVDRvWxKXqtn5i3vaf+vSnpW060U+dussf2rSnObm59OM3BfTd/Hk0/duZ7vcLvqdZs2c9DgC6puG68ePPTWnfoZxlZpG3bXtHtMgmnpxC9z86gRrDjURENGvObNq6bStJKUkpRVK65DgO/aVJ6dLGTZvpmZdfocwuXYmnpNDvH32ENm/d+l8ed+zvV1VX0/W330FISSU9pw152rV3WUYmJbdtG73qpuuv4IwBib/zOAHIf1vlPbGo03Psc/y1humcObPOOfaxRUUFgebT/j/wGvGolmHfgu8uWHLJJQcWte1IS9p1dpa366y+79yd5j/4e5o39zua8d1MmjF9qrNw0Y80e+6st5qe45Z77xyd0bWzI7Jbka9dB4mkZEpv24a+mTmDiIjq6uvpsquvoinvvUtSSpJS/gooJDmO818Ac+OddxAAWl78ExER2Y5NjuOQlOroY5RSv/i9z776igKtc4ilpZOvfQfJ0jMouV0753e3jx8XT2Bzxb/x5sP/mUqNxcXF+j+yU/1YguK8ed9kLV++3Lt8+dy05hzkv+E1CoCmkMpY88yfJx7Mf3aWuXZTG9NjKihXa2jdktFdtyJ67rkIWw7gSOkNBLXGSOh7bzf/fQzA+DvvPL3wuzkfVDdGNa/XKyP1dbxzh3ZYMOtbXDL2Qnxf9CN6DhqIgQMG4OYbbgQYA+f/9TJxzqFpGjRNAwGwbRuulOjfpw8AYO73P0ApBQYGTRPg/OebJmOI/x4RXOniynHjMPebQrRMS0WkroZ7gwHV6Crt2/k/vnfjnXeeXlhYKP9dICksLGTBYPCfGPqvgWVZzt+7tonX1gFASm/9oEGDYoMHn1/TfPL/QXA0/dtxQmevue++n1b17kc/deyufup8sizq0JkWXH01zS34gqbN/pamTptK06ZPc2fPnkWzvptxaO6iOJv0jXfeOLV1717lPKcN+Tp1lkjPoJNOO41KDh4gIqK33n+HIAQ999qrRES/Gk79NXPduJdZuHgRgXG68Korj3qavzSl1C++bnqdLdu3U8eTTyKkpJCvUyfJc9pQy1NOKf3oo4/aNsXqx1tZHX+nl9fkGYiIJWSMWGKldVOILBYs+LY1AEyePFlfvHh2ZtN9ZPnyAm+zB/kHLgJjjIjIOPzD3GfX/u6W7yPTvh1AjRGpSCHqMzi74Rq411yJqMcDxCwwkGuaplBKhUDi0vOHnX/w22+/bf3n1yd/Wl5Tm+XRNRlraOCtW7TAgpkz0DanDR6a+Bhuu+FmPPHM03jwzrvguC407R+/afNEV6RL5w7wtszG5p07YdkWOOdIyGse40F+eaY0TYPrOji5WzfM+3Ymclq1gm073KPrsrKmptWTr778GREZ+fn5wHFEeMzMzNTz8vL+5vthjBFjjNasmaIJITQAmDgxvhIOiS772WePOVxUVKS1a9cu6PO5YQDYvLlAj0aDHZsR8LcS8Z+HmjI2vzxp6U9DhtLiVu3Uqs7d3cU57WnBOSOp6MP36bsF82ja9Kk0Y/o3avqMae687+fQd7NnHf5u7owxid8PdOrXbxVv2ZK8bdu7ek4b8ufk0PadO6n0SCldeuWVBC7ozj88ePSOrui/Z4qIFClyXYt6Dh1CIiuLdu3ZS1KpeJKfeMTfMtu2iIjovgmPElLTKNixM3ly2rhG6xwacM45j3DOgX9jPnI8WLMH+SuJImOMRuTnuwcO7Dll+fXXfdc45eMh8lC5y00TDbYtrHPOAt1xC+paZMNuDIODKS4M5vGawnHseR7Te8bo8y+aRUSek04//YN9pYdP0zTdlURCOA6enDAB8xcvRrdBQ/BNwVdI7dAej/3hDyAicM7/2xwgBkC6EkIY6NPzFMiKChw6XArOGFzXTRBS/vazMi6glMKg004DBINLEgyMKyK1bdfuRyZOnHgSCgvlid5tbwqZZxfNzikq+sBDRKyoqCjQdO2bHjdz5kxf88DUr4dUkoiMbe++fceeG2/N8+09mCwEl5KUFk1OAcu9GG7fPojaNhCNgHMhDY8ppFS2dNw/jRl90YsAYBoGep95xjN7Dhy8THDmckBzHBstc1rioy++wPqfViK7e3d06NQJ2zZvwsHSUmSmZ0DRf58OJaWEpsUvZzgchu7z4a0pU9Ctcye0zG4ZJzESEgk//SpYeKIgcEr37vD6AnBtGxoTTOOcQpFG74fTvn6ZiEafKGqLkydP1k86qU3KGWdcULViRaFn8OBxsaKiIrOwsNABIA2JtJiTLefMmVPDuZPNGHYnaCjWvHnz/Jpmd272IMfcVfIAPi5epeq/Pj+vqO7t91/07NyXLDRNNkajItr7FIg/3o9w/76IxaJgShFxJj0+U9iuswECI0aPvvBF9Ouna0Jg4MiRj27dvece4txlXGikCLqu4/CRCmzctg3C48GFZw3D3ddfD7eiEiUHDza9mf/OO4fruhBCoKa2Fhddfjmmfv0NHCIUfPIJ+gwbgckffgjGODjncKX7Vz1JU27SKjsbGcEg3JiVeChxYXpkeX1o5HW33HgRAJV7AoRat9xyi2xsRANjDJGIN2358uWe4cOHW4FAQCMilpKStY2IwoYhMzinyJw5BWmBAJIAoHXr1g7nbkkzQI5JxB83TXVkxbLLf7ru2gWRT74aLKvqpOKCGpQU6rILwW6/CaHUVKhYDIxxxTljfq9X2Jb9hc/0DRtz/pjld911l8nXrnUuu/53V6zduvVxglCci/g0IQOICEJo8Hr9kEJg7abNyEhNBcCwbsOmJrD+w+/ddeOeY9PWbTjn0ksxc+o0eFNS8MqLL+Lme+5FeWkpbh1/Ky66+mps37ULmtCglIIi9SsAib92MBBATstskG0jzqpn8e68K2n5uvXjTUNHYWHhcc36jTf8GI0aNcoiIpxzztjSwYMHRxljJIRInjPnVaN///7OqFGjGlJSqPbccy86ommmbtsOB4CePXvaI0ZcXPd/GiCMMRTl5WkJr+Hd8darH+yakPeFNX9RMmOQrmuLxow0pm69Ac6YMQg5CtyKQTDuerxezgUPS9e97cKxv7ny3HPPrc/LyzNee+0166a77x70/eJlH4QtC0ITYIj/j1GTZjigFGB6vdi2axe4JmBmZqJ4w4ZjPdrfBAoRHQ2rPvuqAMMvuADrihai16BBWLuwCNf89rd4/blnsfTHBejapxdmfvYZBp1xJt6YMgWcxzlbUsqjz+VKCdeVkFKCMY6Tu3UDHAeMCRA4GCA4SVTWh86648H7hx7vXqSystJpWtq5cOFCs6ioSCMiNn/+/OTzzjuvYtSoe6ymyCEpSZOLFs3q7Pf7IURS9S/Ssv/LIRURsRH5+a5FjX1+uufOebWvTrlO7N6vDL+PwjFLxAadDn7/nQj36IFQqBFQRGBC+v0BTUq1QZjGiNGjL3w7Ly+P5+Xlafn5+fa9Dz7Y/5s5c6fXxyxTExr9Yn0AAxjFUwCCgqZpCNfUoqKyCqf07IHiDeuhKP79pnBHJg6uKyWkUiCieAOQMQgh8PSLL+Lqa69FzYES5F5zNb587x18PWMmWp/cE6cMHoJYNIaNixfj1nvuQV1lBe4cPx6XXnUlDpUeghDi6HNpQhxtPFZWVcFyXXDTBJrgQQzQdBmRUvyw9KcrOGMoLDx+tdXGjRsnd+6cbRYV5WkjRoyINfGvUlNTI39ZBu7adZSlabJs7twllU2PSxQi6P9kkk4/J+LsUNHcu1eNu/4Jfc3GJOJCEhMiYhhgl14MdsZANEoFRGPgDJIzEqbHIyKRyIcej/fec889tz4+bLOF8vPz3U8++aTl7598sqAmFMoyPYaCqzhRfPKPgxKTG+yoRgkDA4iwa+8e9OvVG8VLl+HHJUvQp0dPeL1e+Hw+CCF+1fPZjoMHJjyG1159FbrPixvH34L+p52GUZdchn27d8JMz8CuQwdwzpixuPOWm/D803/GRWNGY/y992Hq51+gePNWvDHpOYwZORJVNVVYu34jipYsxqLlP2Hz3j0IVVYCwSBczsBA8XIngbvKxZHDh8+TSvkYY5H/ycz3v8vWr2/kmZnDJZB/FAwA/ktXvbi4WK+uLuuUnz9xA5Df1IA0AETZ/zWvcczcRsqWV57/IDztu9/E9hyAx+uVsVhURLt2gn7FOFjt2iAWakScocGkaXqE7dphoYkJY0Zd+FJT7pIAhyor29PitLMunH2woqKv4fFIxiDQFFIxBk7xcT2Gn0u4QjCEGxow5oLz0aldO7zy7HOApsETDCI9uwVat2yJju3aoUvHjujWqRM6d+qEk7p2he04uOra6/D9vHlIbt8ewwcPhGNZmD1jJuDzI5CUBFJxwqpUQKzsCDp264ZP3nsXPU86GdfdfTemffoZtJQUDD79dGzZuQPVu3fH35TpQdvu3TB00EAsXb0apaWHYPj8gCSAAKlc0hXY+SPOPuebzz76ITc3VxzHAhCJOZBfl/KZPn16MCcnJ9avXz934cKFYsSIEe7cudPa+Hxm7IwzLqhauHCh0P4PgSM+ZskgG/bvvWjF7bc+i4XLuiFiSc0weMixhTxnOPjFY9Ho8YIaw+BcI8ZAXq9XxGLhYs5wx5hRF64qKCgQubm5CoAaN24ciMjTY+iQrw7X1vU1TI8kVwnoLBHB0s9l1fh0E6AEwOJDTpppYtuuXdi8bRtSWrfCWUOHorS8HCXlR7B60yasWrIEsGLxp9ANtOvaFZquY8/OXfC0aIGA14tlq4pRVV4OX2YWCIDrOGCMQAkoBnJaY29FBYacdz4evPsufPbmm3ipZw/k/fkZLF6xHDnt2uK6O+7AkP79cVr/PujUvgMCgSQULVmMkZddFoc1ERQpcDBpk6vtPrD3LM7YD4WFhcfzTZYAYP/+/RoR/RdhB03TtFAoZDLGHKIiLF++3GtZ5aGaGlsC4PX19d7/Ex7kmLkN797pU/9Y8ckXec7a9dB1UzpWTERSkiEuuwju6ach6jhgrgIXXArOhNA0uK78oGV2yzv79+8fOdYbsQQHpe85Z3+1cdeeXI0xV1m2piXp8AQDaDxUC6HrIEaIByoUF0qkOHCavidBcKqr8f67k3H9FVcBAEKhEMorK7G3pATbdu3EuvXrsWnjJmzbvh3RxkZ4WrQApIrf2IlgGDqUoniJODFV2HQPJWLgQgCcIbL/AK668QY8MeERdDmpB7r06oUVc+YgJSnpF5+Z7dgwdAMTX3ge+U88AV9KGpSUYIC0pSvaZrdYuXftusGJQ3dCzrHPnj07yev1RuKeY26aaZqRESNGxH5WeZ+Xpf2Hew02cfhwwcaNc4mo/dbnnyms/mp6f1lWSYbPS5FoRLg9ToL47aWItsqGE4lAgEEx5uqmqZF0a5WU944dM/ZjJFgHReuKUlr7o1HGmDQNwz1t5LlPb9m3L5eDXBDTENCRNLgjGjceAUkJMrSjbbl4zvGz7wcoXj6tqMCYsaNx/RVXwXEcCE1DMBhEMBhE544dMXLEiETlS6Kisgo33XMXZs9bAF9yChgpIJG4//zEx+ynpPjXJBWEEBABP+rq6/Ht7DmQ4TB6d++GlKQk2LYNLgQ4Y2AM0DUdUko8eu+9mDt3LlauXAVfahpIESdNR9iyuhUWFrYEUHo85yG/Uv7VAGDEiBFu586wGhqCbP78gmRNMxuEiKbOm/exWLjwu+DMmTMbzjvvvAr+H+01GKP8JYvdvSsXnbfsd9csrHn7g/6iulbqpoFGpbh10SioO8ejsUUm3EgsHkgwrvyBgCalXAliw0aPHvsxAMEANalg8jXrt+383VvfzueCc3f4BRc8vGXr9oek7bgAE2QyBM/sAJnhgROKgAkR7/kxAjEJ4vIXIRfjHI5jISs7C689+2yiR8LBGTtarZJSwpUupJQgImS3aIFbr78BRArgLL5LD/Rf+hnH9gIZFAAFUgRp22iVlYVlP60EAPTr1StBb2HQRLyZyBhPVNEImtDw/OP50ISAJIBxzoTgsFwnZc6CBR0SFaMT5hwNHz6cKisrCQC6dh1lRaO1bTQtEBwxYoRr2w4PUpbpusrIyMigJbNmpfL/RK9RkJvbFFIFtrz9xp8PT3hqNl/8UzvONWlJR9SnJDF26w3A2DGISoDZCowLKTSNGYbB7aj1ZhuhnT169OhNieeke95/+qU9Rw493KVl64KXf/9SdNS4S69YUrz6Cdt1JVMkCC4LDGgD2cILGbHAiINrAmAERgyIs7WOOcAMjDPYNbV44c9Po3279lBKgnNxtFLFOYcQAprQIIQA5xxKKQwbMhTtOnRCLBIB4+wXHoMx+tlbJVDCmjwJEWAYML0m1u/cAQSDGDTgdDDGwBKz7MdanAnsYkD/fhg7diysxgbAEACDdJVCTX1tZwCoOEYb+ATofcmmsd3ZRd/kOE6sy4gRow4VFRVp55xzUXlFLOYoZVYPHjw46nLu1/7DwMETrl4SRUeuf+zRVxpmzOouGqNQHlM5sZhw+/eDftlvEEtNgQxHILiAAlyPx6O5rlMHUveMHftzSEVE7S997cF3Y5HI8McuvqnfwG59y26+67bBX86c817UkUzXdeY6Fks+rQOohR/KcsHdRJOPxw8uZ4k+AqOjIQ/XOMK11bj4kktw9bhxcKWExrW/c3E5pHQRDASQO+YCPP/yKxBeH1xIEKM45Z1+DuDYzyJZAOKNRU8ggLLKSuw7VIqcrl1x6sk9j4Lh14pAjAkcOrQfN155BX5atw6VDfXQhAbXslBy4IAPABYtWnTC3UQZY+SNAq5O6d9++23rESNGlBIRmzNnjl1fX88XLPi2tUt66D/GgyRCKkVE7MjiBU+suvaWOQ0ffdldj1iSGKNGzrhz+WVQN12HcHIQbiwG4pyIQfkDfs1x7FUew3NmIqRiGriavmzeZUOeun7JrtrSs68ZMmrcwG59N7z42ot9Z8wvmhayba9hGCRtiwX75AAdUuFadjw0sVyQo+LkP8YRjUShoMCFFk+aGcGyLbRo2RIvP/N0PMSJa8D93Wy36SBfNW4cPIEgHOn+0ksczW5+GWcxFs9D/D4vdu7eC6e2BoP69EIwGIRMNAt/rd8CIpSVlSM7OwvX/PYyuNEoGBEpx4XXNLsLznFLv36MTiCGb1O+NGLUpYeWLl3zpdcLzJ8/8zTGGCmlfJmZSa3POWds6TnnnNPA/wO8xrGjsJ32fPjuj/snPPlo9McljHtMZVuWCGdnMn77eNjnjEhUqQiMa1IIjZmGwe1Y9K22OW3POvfcc5tCquDE6ZNf/eN3kwu3VpbkXHnK2ROuOGPM1E+++STnpQ8++qSqsTHLMHTpug4P9moNcVKLeGk1EcVAxRsQRATXtjCgb29oukC4IQTG47mHW16OCfffh7atcyCV/Ct38F8HiFIKvU85FcOHDoHd0HD0d38Wkot7rLg21s8FT+KAqwillZUAgCGnnR7/kVK/9rkCABoaGxCNWXBdhZM6d4EQcS9GjMFRygCAKWvWOCw/X50IK+SaJgubsDJ0aK9UIhrHGJ1aUFAg0tLSYtxmsimZP6EB0kQyHMeYtMoOXLn2oQeWHnn+tWFuySGpe72wYjEeGzII4u7bEe3UEVZ8bgMgcn0ejxAcdUrRtWPGXHh77969owBgkdXj6jcm/PDaoul3lYbrcdWpZ09/7NJbntxXW5vyxHOvzThcUX2yphtSOq7wn9wCWs9WcKQLzuJHUzAOVRUBFIFxwI3FcMs1V+K9l15Arx7dEAuHEatvwKiLf4Pbrr8BrnQhuPhFZ+vvWVPF6srLLgPZ9i+2hzSpLBLoLzwKgQsOW7poiESheX04c9DgvxFexa2isgqK4mUAUgoa4/Hn5RzgnBQRVk4v7L9r164e4woLZaLyzY5j74GDBw+qgoICQUSAYr8FVJ+zz77w/czMpA4NDZWtmVc2AtAYY3RiAuSXJMP0I3NmvrPmjvs+C38+NZtbjiROosHUmXvtlVDXXo2QxwsZiwFMkEIipHLtVQz8zNGjR38MgOtMqIKV868678m7ln2zZWn/ysY6eXbOKTtfv+GRO2wljTGjzn9/75GyvkLTXGlZwtslHXqvlrDIBhcMirE4h2pHNcIbDkPT9Hjiq+moqW1Aj86d8NakZ3HfbbeAoo3ofeqpsG0bmtDw390iJUT8so069xxktcmBZdlHBeMYHes1En2RpgQeDJzFQdulQ3v07N7951DqVw6SUgrV1dXgIi7w0OQciXNwTUPA5zeICL6qqvsqJjyy7MCcmQ8SkYcxRv/IPo7/X05k/PjxTm5uriosLOTg+lzOtQkLFy40hw8/b49pJh0qK2ussW1bFBUVBU44gBARR4JkSER9d7760o+HHn/mpsiKYqV5vRSNRUS4XXvwu2+DfcYQxCwLTCmAQwoOZuo6t2LW2zmt2551TJXKePTrN16eOP3dT5eUbE52lXT6ZXd07xx60Y2MscP9Rox4ZvehIxdzMFc6rubtkAJP/5awyY1TSBRBM3WwknrUryoBZEJ5nQtASkQiETQ2NsK2LIwcPgxGSgoWLV2Kzdu24OChgz+n0f8gzZ0lmLjpaek4/6yzIBtCYEIDFxqYFj+8QtMgdA1C18F1EyLxf80wQa6NkWedBV3XE+xd9hefcdxD1TfUozEcjrN/wRCLWUdLvVwISOnuBwAecyLejVuSS5964bmtr7/yAxFljxs3Thbl5WnHqzdhjFFODoxzzx2zVyl0se3w5YncJJCbm6uklMJ13ROLanIMyZBXr1pyV/Gt45+ILFyexBzH9fj9WmPMgjz7LLCLRiHiMUGNYbB4+CA9pimUK+ukdO8dO/aij5rCy5pQzSmXv/Xwm0X7Nw8NNYaUaZqyhTeoX3bqsNtGDhqxdNiY859asWbDfUrXXLiuZrYKwnNaDhyS4IgXp4QmgAP1aFhTCoKA8GpQPPECrovqmipoQkPICsHj9aBLx87YvG07wuEwSqIlaGioR5fOXWEYBqhptcE/GGpdf/XV+Kzwazi2Ddtx4tq7kuJ8elI/x1zxZAPw+8CEhn4JeaBfB2X89SvKj4BIgYEgOKGhrg5KxYsPggtwaEeYriFaVtFFuorkwUN23RtTBi9etWrugW0brml7Uq9NyM//L2rqx0sVy7J83WbPnl2qaXy/bUtVUFAgbLvxjIUL520SQhw599xzw9oJ4jVY4bhxPJGIn7Tjg/feqi0oHOZs3QXD51OSSIsGfJC/uxzy9H6wojEwy0KcIsjIH/ALKxJd7fH5b0wk4swUmpryw9QrL3nzobdWV+xJYhLSMA3SudAvOnnwFxN+e+vbwy8Yef3q9VseVoxJijnCaBmAf0BbWFBgMh5yaKYOHAihYXkJyFIwWwaQekpr1KwqAUUdAISyikowMCgi+H0+DB7QH++sKsbOPfswoE8fHCmvRH1DA7p26YqM9IyjB/fvAYVzjtLDh0FKQdd0tG/VCqZpIBAMwOfxwtR0mAlPEgj4kZ6ahr0HDmDazJl47a23ceno0TA9HihS8XCQ6Gh4ZVkxVFRWwhAaFAChazhcUQ5IBQbGhSKkBnwHACDq9dYrr5fplq0JgjR/Wt1r7+13Ld00+Y3net5y+9uMseqC3Fwx7jghNTZVsRYuXL0xPz9fzZs3L+Lx8HAwmGNEG2rKXVcoKR03Ly+PayeK1wAgQwd2X7Hh0YdfrZ7+XQY1NEivP8CjkQiXp54K7fJLEGuRBTscBicAjEsuNKHrBrNi9tuBpOQHR4wY0Zg4fIE/ffX6C099//HN+xrK4dU9knMOmxztvLanrnrvjieuPP/yS85ZtHTFO2HLkoJxrqWZLDCwPWydAYpAxKB5NIjyGGpWHoKKSfjbpsBzehvYhgAEB6QLaAb2lR6G5dgQQkBKhdN698I7QmBpcTEG9u0NTQhYlo0NGzeibZs26NC+w1Fht1/LEZRSEJzjwKFDuO8Pf4SybLz/ykv4zQUXHBWU+2vmui76Dh+O1UVFeP611/DYHx+ClBJc/LLEfKTsMGJWDKbhAQOBMY69Bw8CghMpYppgdt/TTjsy/ZtvUNP31D0t2rZB+KOPSd+9SzO9fmUeKE1qnPLBk5vKK68nsm9kzFhUAIhcInW80FKalgadd9554eXLC1QkgpN8SWnrBg8efFRd/rjOQSgvr8lrGAfmzHxm+8P5nx/++IsMzbakbhqi0YoxZ9R5kLfdgPq0NKjGGDSmASxOT+ec10nXvW7s2LG3jRgxIgIAjZbV55q3JiycvOLbmw/UVqqA7icGjUWVy/tndKz/6u5JF1156/W9flq94YuQ5QiNa4wHdZY0qCNsg4HZCpwYuKmDVcZQs6wE0pII9moFz5AOiAkFRQQR1EFSQvN5sf9QKSprauAxTVgxC106dERmx/b4fuEiVFRXQ9NEvGNuGDhw6CDWrC1GZVVlosPNEkD5uYirlAIxhnsfeRSV+/fh6t9djXEXXQRd148CSymVoKrE6SpSSliWBU3T8NSjj4B5vZj04ivYum0bOOeQSh59PSklDh8pgxAaVKLRGQ3HsH3PPjDdIOnY8BrGgQl//OMeAJAxp2d9Tg7Uvfcw+4ILEHYcrphGqrbWrX3v406Lf/u7b7dO/2b0OCHiVa7jqGdSXFysx286hgao9FAoxJcvn5s2f/78tnPmzOjBj+ewiuXnK9uuH7zrtZeXlj3zwh8jRUspxR8kshwRCgYhb74B1oWjEHYcwHaa1NNUMBgU0nVXCy6GjR079iMMG6bpTKivls254sIX7ln09ealfW3HlV5hciiCRRa186ex24dfdt30l1+OzVm0bGptLJqhM664h/GkwR3hBDTATQw96RxaZQR1C3eDohZST8+B3rclLB6X1yEO6Kk+KACGrqOqqgolBw/B5/PBdmykBAM4Z/AglG3ZilVr18Pn9cZpJiB4DBOWZWPLli3YsnULIpFIwoOwX4zZvj5lCqZ9+glad+uOSRPzEoCgBGM4TlOJU1XidBUhBEzThJQSY8+/AJdfeSUaK8rw1KuvJBqCP+cjpYcPIRyOQAgDypUwdA17SvbjwMFDMAxdEQiBgH+dJkTkgw8+8OiG3oasGBrBmH3JpXBvvBH1SX7mKqkZXo/UVq4OVr34yrerHn3oGSIyWX6+ouNku1lFRZyPOGTIReFzzhk9P56cK6FZlu0n/fgkKzbt3Ng+a0buurv/9EPFa5NPs/cfkrrfy5xImDl9e0G//x7YfXvBiUXBSUGBJOOcmabBbct6OxBIOmvUqFEbASC4sth98NMXX3xsxrufL9q/KWhwLg0hBIHguI5K1jxidJe+L9581sXTH/jy8x8PlVd05MQkfBpPGtoJMsUAXJVYM6tBq46hrmgn4CqkDu0A3iUFjm2BI34HVgSwNF98abMikGujeOMmGIYJAiEWi1ezhNeDGXPmJiYOWYKVK8E4wATHkbIjKF6zGvsP7D9abdKEhr379+Gx/McBxvDiM08ju0V23GsJnuBg/Y34O5HfPJufj/ROnfD11OlYu359YnKRYFkW9peUxD2J68IwTHi8PixevhxOKATOGNOFhvbt2v0olUIgNXASwLq5SkpGkkXDEYT79gG/5y7YPXvBioUF9+tklpZCTJv5xxXXX7do748/Dki8j//vIBk1apSVCGNVUVGR5vV6I2eeOapyxJgxZWdccEHVcQmQcfn5DIzhyIqfrg19/70H0na4qYkGjwH3t5eAj78JkfRUqEgEnAsQmOsxTQFSIde1rx81aszRkCoWi3Uf+fRts95ZM+e+vaEKFTT9JEiI+M2SlKNcMahlt+0vXvvQhMxeJ3914Eh5H41rkkyI4JB2cLO8IEVgnIMLDrPeRu0P28G4QNpZXaBaJ8G240IHYAzg8f6Blh6AluyF6zpgPj+WrlmLULgRuqajMRxGj+7dMGTYMKxatgJbd+2EP+CD49iQSkJKBUgFQzcAAvbs2YPVa4px+EgplJK4b2Ie6g6X4pqbb8a43/wmLvtztNn3t8P7eHlWok3r1vjjvffCrqjAxOcmgaBAJLFv/14IzpGVkQ5fwIdd+/Zh38EDWLJ8BZihk3Sl8Hm91oihQxcREQt6giEi2mWYHgEFxRmBImGEMzJBt90MuuQyWEJjUtPhhm3b/GnNgIqFC28FQIXs+GIBjxgxwm2aPCQivnTpdynHJUAKcnMBIqR07LjNSE8jzsBsywIfcwGioy9Ag+OAOW6c2wTA5wtojmMXMybPGTPmog+bqlRfrph7/Tkv3bHk+9INoyPScf0eH6f4bR4MjCJODCentopOu//Fy0467bSnjxypGMckuYqTCJyeA9U2CKYB3JZx5xGVqPlhGzSvgZSzu8FOM+DaTqI5x0GMQAzQdR1UFoKMOiAhYHhM7C8pwcq16+D3ehO9O8K4iy8C6Rre+fIrGKaBtNRUBP0BeEwz3gykeMikazoaGhpw5Eg5nnjxBcws/AZdTx+I1559Nu4VftEJ//s3ZZ4Qa7jt+uvR8dRTMGvqN9i4dQvAgAMHSrDvQAm+nD4TDzz+JO55+GF8+sVX2F96BIbXp5SUFPR5Vv3x3nt3Msbo/PPP352SlDw0FokVGF5TxKk0DMx1EZIuomNHg198CRzLYgQSltcjA5lpCwEgNzf3OO5FM3XGGWNqj88qVm4uUFiIlFNPXhtpkcVkRQUXjEOFw3AtC5AS0DhARJrQXMuOvZ8UTHngmCpV8sOFrz078bv3btlTXw6vZkqdaxoRAYyBNAbLsVSmLyAeu/rGB04fPPj8PaWldzOCqxi0tAEdobVPQ/RAPewDNfC0SYFhGqhauA1Gmh/BQZ0QMwjKocThjA+ckyAYpgF3exUa1hwE5zp0U49TNRTw1YxvMbh/X2i6hnA4gtP79sWZ556DxYsW486HJ6Bj61Zo2yYHHdq3R6usLKSlpMBjekCk4DE9WLNxE55/4SVomoYHbx+PxlADBGcIBIJHvUf8T/w75WHG4EqJgN+Pu8bfjPvuvg/3PTwBOVmZWLRsOQ7X1sZF4ziH6fVg7uIlkETgRDAYWLuWLT5hjMl9RJ4OQsTOPPPMSgC/nT5rZjFj/HEwmAQwplzYtgXHjkEnQEnirHVL1u43vzmIu+4FcgEcv8IoAOJR8vFnW7YQALTvP3j5wazMBnAtyeCcsHsf0xwJizFwpUjXdSZdVTew46AHWvRs0VhQUCBSu+WcPO61hz5fsGd9z7AVVQGPlymQOLYhJrmUzORi3OBzv/7uxUK2ae++5yGEhCAtpX0myCZUz9kBty6G5NPawNsqHRULtsJsmQpf/xzEHAeQDCwR8ysiQACmEoitLUVsZzUMjxexSAxOLAJPIAiv18SqlSuxsngdBvbvi4ZQGLqmY2i/Pljy4yIsXrkKiyMRAATN60NGegZatWyBVtnZyEpNR06rViiYMR2NFRW4+uab0L/3qdi2cxsM00RqShpaZWcjLTX9KDh+WSL+S6lRAhcCRIQrfzsOT7zyGoqKiuINRq8PptcLM9kPQlxgzlUKwtCUYzs8NeivuuOS3G8Wzp6XsuqpiT+uf2FSYa97739+4sSJ8jdjLpw0feaMa0zTPCVqWQpMcE1KYOceCMaVEIK76Sl7Ajnt1iRuhMe9hOlxCZCmKofweEqKH/nTRsezeih3XcWOHBG8vh4sKQCSLnMdSbqmpxeXru9FRMsZY/LOD566bk7Jup6udGyf4TGkpPjQUiIM4ZxTgxsVo3qefjinwtzwwNSvn9G9XsUZOBMCkfIGRLeXgQsgbXhXGJ3SULVwJ3ytUqD3aIGYZYM1rRSIbyEH1wW0sINI8UE4h8PwJPvRWFONrh074dorrsTEZ56FMHQozvHBl1/htD69wXl8Hn1fSQlIuQh4g5CGJ87AJUJlXT3KqmuwduPmuMdUElCEjqf2wvhrf4fGxjA8Rjxcq6ysRFVlJYLBJLTIzEJ6RgZ8Xi+OpWQBxzYeGVzXgqGbmD9/AeoPH4YvLQ0EAUqoLrq2A3BCU8hEjJHQBG/XMvvDcTffXLO3Y86j3nnz+9S2yD7Fuvf+qfn5+TsWzZvXoTYWbRufflSMazpEfQNUyUEIxpXh9XCWnf0jY6y+AGjqbx3Xdvz2QQpyubIsJJ/UbTlPSwUpSbw+BHaoFEyIeEgDpTweD+dKDWhqPrVp0WJtUDcUBxNHnYaKN/c4GMKOha4tWjeel95z4cRJL/5BDwQCEIIR46QkUbSmEbrJkXpmZ/AWAdQv2wVvqxRoPVvEeV2Eo9OApAhc5xAVEYSKdsM+HIbh9aCxvBwD+vbDvIICPHzPPRg+cCBidfUIJKdi3eYtmPH990hPS0NjuBG79u4DhIDrSChJ8YIAGAzNgNfjhc8XgDcYhC8lBZrfj4bGRoRCjdASeQRAMHQduqYj1BjCzt27sGbtGmzesgUVlZVxZfdEf6MpgbdiMUQjUURjUUx8dhIkF1Aq3v9QisCI4kl70zAvY+RKydNSU6rGDT3zZSJKrZq74Mb6PftVoHVOiQmUAYDN1cmmaSZLVypAMSYE2JEjQHU1IBWzfSaSundbAgC5Bbk4Eew4bhTGP8CknqcsoxaZcFyXC8cB9h1IlESRCG8UlHLPbbo7XtB7yI4Mzc+lVAIUH3YFY4ACHMehJJ/Brup6ZuOfH3n2zLB0g1xoDgHkSoe7ts2CGUEEh3QEa+FHdNshGNnJ4B1SYUftRBkXaBIa1L0a2IF6NCzZDUQUdK+OcFkpci/+DX6YOg3t27aDlBL5D/8BgjNI6cD0+zH5o0+x5+AhuK5CaekhcF2Pz3Cw+NQhJSR2lJSQrgvlKkhXQjdNVFWUo+DbWfAH/HCVTHgcgBiDpukwzXgpuaKqEhs3b8aq1SuxfcdWVFVXQkqJSCSM3Xt3ITk5Bc+9/jp2794DT2paXGGx6YZCrEllIrFtnZTHMFj/Hj2f+P2f/1y698d5450VK9tzj5eLVm02Ml2vBwDLkkMMwwAHFMAhOMAPlMJwbXIhRTQpRbW+YExcXzW3gJoB8k/IQzK691ijMjPrlAI3GEiUHIDuuon4H9x2bLhS9Vu6dG4WAJzSsvv+LH/aERIMnDMwEmAUH0d1bIudmdEd370/PbusriZH55xcIt3j9fDspJRVN46/bkfLUb1hpRnkVDRAZKdCZSfDidpHp7vjh5GgCwbaUYnQqoPQEJf2iVZV4aE//BEF738Iv88XL9eCMOi0gbjj1vGIVlXD9HpQGwrhiUkvYP/Bg6gPheOSPE1nsmmFNzUtc2qir/M45yoYxNfTp2Pn3r2/CKOOzpwTgYFD13UYug7bdlB6+DA2bNyE1WuKsWbdGni9XixYvAjPvPgKzLQ0kKSfy9TAUZmi+AQvU4ogslOSF337xRdvE1Grmpnf3e7s2KFEdjb8HTosheuCioo0Ap0pXQkCODiHJhXY/v3QEjwWltOyKtCiRfk/VI9uBsjfz0MSmeVhvU3rLbppwuBc4fBhiPp6MEOHAmeO7ZImtMyGBnUqAHh1o6p1WuZa06ODNFLgBM4AW7lon5SF7bOLsXLpT4oTg1fX0alV9vx+3Xue/+OiOXmbfTVZeyOVpIEBaX6oZC+UG1+EGWfIEkgwmIzDXluGhvVlMEwPYrEINNfBB5On4OmJE4+qpwvBjy6lefLhR3DyqaciVFsPfyCAdZs244nnnz9GMIGgGMVLxfhZqSQR4iQGluIrpBvravHltBnw+/wgJf/LeWOIv9emZFw3DOi6jmgkAkrMeNz38COwHOeY/snRW8BRL8kYI8eykCRE47UXjbqLMWZv/+LTR7VlP7XhxMnOyKLWw874CQAWOU4HKWWfmG0BIMaEgAiFwUpLwTlXmumBr23OWmbo5XkAP1Fkgo5vLlZuLmeMkb9duyKWlgpJDEaoAVpZObimQ8XF15Rh6JDSOQcAYq6Dbtk5y5N9AbgEYlr8juiDjsrF27G9eLMUKT7evmObI9dfdtnZe1asHPlpwXsV17yV91lx6a5Un8cLpQkGTRxNbFmT5+AMhgWEl5UgurMaXq8Pkfp6tM1uiQUzZuC6K644GvNzxo/OmitSCAaD+GzKWzAZ4MQsePw+lBwpg6R42ZUYJeSBKK6KyAiMq4RKCTuqqSUVQUtOw5wfF2Hr7l3weU2ohEo7O7YPklhbEBdzVCAlQYqQkpyM1999D5s3bIQ3OSmh8E44Gl8xngCogitdpTHwvl07/+Gxx57cVNNQc0Z9wdfXxw4dkYY/KLQWLXZ7s7I2AEB9NHqyYRg+FVfYZkLTwcrKYNbXQQgBlpaCpJ4nL4PjYmJBwQmjgnJ8D0wlGkmpp/Vaplq1hKMUM1wJlByKixwkypgJjlK/pl8b1LHnohTulY6SgkDgug53TyXCNfXK6NdS9B47IPbcq0/d9NLTTxfNWv3jiNxn71+0ufZQml/zqMTpjt9JE3dUpeLNNaPeQbhoD+yDIZh+LxorKzCkb18s+e47DD59AFzXhkgwaZvKrERxbSkrFkVGagruvvUW2KEGMAiYPh9UQraHUZycz4k1vYX4PpFEXgKOoyopui4QjkQw+cNPwMDhujaU40JKBVdJuFJBKgUlVSKRj3OzMjMzsGDxEnxa8DWM5GRI2457G0oIByeAwuIey5W2LU7u2LFg4fcL3goTtd775+c+Yeu3eITfr4TXhKdDzjqm62EAkIyGa5oGDiii+Hgv9u+HZtvEORdWUpKVOWjAzMR1pWaA/BNsYiIPyerWa53KzqxkYJwxRlSyH9yxQfGxUG47Dgjs1MWLF2cCwIiegzalGJ4jBMWICVKuBFomK+3szrxD367WtWMvu+qy00bOXrqpeMSTcz6ZWlyxN2hAU4ljGD8gnAMMcIkgdAGtMoKGhbvg1sWgmxrChw7j6t+Ow/zp09E2JwdSutA0Awy/bNQxxlBbW40169Zi8+YtGHfhGNx4w3WI1teBuEhIWR8bHrHEPHmCn8UYGCOAybikaGIU1vR7UbRwIX4qXocObdsjJTUFyclBJAf9SE4KIi0lGRlpqUhJTobX44UrCYt+WoE/v/QKmG7EsaZUvEPCWPwvFwRoDARypetoXTu2W7xu2bIbHCmNva+9OsWeNqsdMUilbC7S0hDs0m0xXBdExDihd9wbMSYZwFwXbO9eCBbvkuqts0tSczpuP5Hyj+O3UZiwBF+faR5P+eq8vB2WaWQKVyocKhO8th5ITQJzJJOuJMMwssLhcC8AC/yGp+G8p+/YJEjkgKCIMRZO1tDeSIld3+usq+++4Oqpm0p3D7nvw0nfrCjZnhLw+xMTQ0130Z+3Qem6BlZSj7oVeyFIgGkc0coqTHxsAvL++EeAFKSSEIm57SaP1lRW3b9/L/bs2wvGGHw+Pxobw7jrxhtAAN7/+FOYwSCIMTBSiXwjkfM05QGkjnqYo5lJggqr+7x49o03ULxxI9LSUuEzDXChwXIdNDaGUFVVhSOVNaiorsahsnKEy8sBjwcevy+us8vi9SZiBBJx5XmlyAWY1qVdmyVfv/bC1Yyx8N7p37wW/rxgFEINrgoGBEUaYaWmON2GD18FAIsXf9+eMdbXdVwokhyCgdc1gA4egmCaEqaHa63bLmNC2CdK/+OEAMjRPKSwUHra5yx20lOGUlklibo6uKWlEBlpIMsBF0KZhiksKzoYwIKIYyEnmLbEx7ULHOkqCyQ6+NP5rQMuuPb+i6775mBNea9bpjwxdVHJllS/x6tIgbMmobdE3K6goOsa5K5ahNYehKaZcB0bLBTG5FdfxS3XXx8fNOL8aKJ7LDhisSh27NqByqpqaJoJflRrHairrcUd110LjQlM+egTaH4vBPt5OrZJZy4hUHpMDs0hEvpZESsGSIlDVVX46MMPACs+vYimpFvFpUkRTIIvNRWtW7ZA18GDsHHbFhw8WArTNH7uIlJcv10yKCho3dq2WTR10qSrup0+uPTA4oWPHXzquTtlyQGpBQMirt2gcd6yTakvI2MHAITDcoDH602KRaOKgTjXDYgjJeC1dQDjzPYG4O/YqQhKIbegABg3Ds0A+WfmIYWFyDy97w/1mZkPq0NlwmAM9r4SiD69IBPeOj4PgSFNEcsp7buuTN1ZjN31R9AhrSW/bcjYh+8bfXVBNBrtePHrD37xY8mmLI/hkYxx0cTRajosUhAMTYO7rQqhjUfgMTyINISQ6jXx2aeFuOCsc+C4DjSh/Sq1o7qmGtu3b0MsZsEw9J9FqxMvoUihpqYK946/ATk5rfDEpBegNB1KcDBG8UFhhcQKA/w8yAQg1tgIRMPIysnBJWNHo3+vPqitq0VVTQ2iVgxgAhojeEwPkpOSkJmWhszMTGSmpSIrIwNl1dV48PE/Y0Xxahi6Ee+ycyadmCV0Q4ie3bp9VDz/h9sZY5FDxUsfK3vyhXy5bqPSkpK4IsUESalMg3vatVnPDaMBAFxSA0wuiBgUMcY1xsFL9kNYNilDF1bQZ7cZfsa6Y8v3zQD55wFEAUBGpx4b97ZqUa42bGohGBT27ee6I6G4ACnJbdsGKeo9b+myrPOGDKm4eWTujjd++Lq2hT859ZpTz5x43+irnyaijle8+advl5RuP8nj8UgmIYjU0U10RAQlAJPrsDccQXhrOUyvF5H6enRt3wEFH7yPXj16wnXduKzPUSrHz6HV7j27UHLwADSuQTeMn2V3EjKgcdEDIJicgo3btmP56tXgmkiEdBIqMezUtLCGGKAS4ZrQNAwZOgQXnDEYA3r3QWpKChzXTQxHsfhyHsagSIJA0LgO8HiVLByN4YcVKzFzzhxs3bMHWpwESYqkci1HpPh9dv9TTnl0ydzvJzFDx945MyYcefy5fGf1OmmmpnBXKQZwKOkylZYCX6eOCyghlqek21uRyygRCWpKAftKIDRBUoGJ1q0qsjt1KoknlhMJ+fnNAPmn9UMYIwIYN4yqjY/nbWrweVrAcYjKy8Hr6sCSkgBXMtdxyTCNLBVpOBXAAr/pLR31+PjNA1JOLn/u+ofyiaj9je/mfzt7b/HJAlxyYoJAYCQSoU08xPK4DLHiA4jur4HH50OkuhoD+/ZD4UcfIadVqwQ4fv7YmsARiUSwY8c2VNfWwjTMOGBUXOVQIc7mJeUiGAwgZjt4/8tCfPJVIRpDjfAmJyEqXaTI+FRhDTEYugGRqKEwKLiORJJuoHfXrujcoSOUItQ3NMA0zbgie+KxruvAkS5ilo2amhqUlldg6/btWL1+A7bs2wfHsiC8PhKCKVtCmLomclJTF1124YUTnn/mmSXgDIWPTnig8oU3HsfWHZIlp3CpJGOJ0E65ksv0DCSd1ncdACxctKhDbV1NX8u2QUScazp4KAxWegSCa8Q1DXrbNhsBNCb6H6rZg/zzvQinwkIZ6NZ9fTg99Rx2uJyMhhBkaSl4eiqk6wBMKM3URTQSGQJgwYN/+iM/48wzrjh70NkVk8fn+a5/67FPvtm24mTicHXONEUKDDyxy0ZBcQbTUYiuKkH0UANMnxeRinKMGTUan095B8FA4Oi4axOgmkKfisoK7Ni5HbbtwExMDYIo8dwE6UjoukAwJRVrN23CK++8j40bNkD4A9CCAURjEQwwdNyQmg4BwrRQAxZbUYQEh26Y8QqvpqG2MYw33p6MNz76EBnpmUhLDiIjLRWpKanw+7wAYwhHI6hvCKGqpg5lZWWoq64BbAvQdJhJQXgDQelIR5BLIiMpUHFqty7PLPh6xhuMMZtKS33dfnf1n6e8/+E9jwtDcb+PxzUWjiZHxBljeuvWFVmdO+8DgGg0errH602yYjEFgDNdBysvB6+riYeVSUEEu3Sazxgjys3l+YWFaAbIvygPSet16uKKFtkPyINHuKYUaO8+8FN7wkW8sSZdCSg1MO7JJ4IxVmoKHTdPnvjZ9G0rh0pFrsE0TUkATPy8Ek0DTIsQXrEP9uEGmF4vomVluOmWG/H2Cy/H1UiUOrpQ86jYNOIh1f6DB6BzDaZhxvsOrElcgUCkEEwKorquDq+/9DKmzZ4Dl2vwZKQj5tpoYVnI9fsw1htAknQhwfBgMAUXByRmOzbmRaOQmh6nk+kafOnpYCCEGkKora3Fzj17kagqxA+xSKwxEAKG0OBLbI4iIuW6DrluWPh9PtmpTc6UB26+9vmrrrpxL2MMP639qdf5d93++q71m4Z6DUO5viDTXZlIn5p6NUrpPq8wOnXYIDyeIwDgSHuIqXtBYIpAXOMcKCmBZsWImBCx9FTZauTZiwEABQX031WRbAbIPwYQAoCkjl02izatos7qNV5d08jeu49plg2LcTCluOs4SirqU1xcnMwmspDXMPHAFy8+/87KOblR6UivMLS4aCADOIGYAjQBIyYRXrEfTmUUmtdEtLwMDzz4B0x6/PGjCiFNlSoiBc44IpEwduzcgeqaWuiGDo54SBWnhShI14HH9MDwePHj0mV44/0PcWDfXphJyRCcQ0UiGGWa+F1qOjoRELUtRBJdex9jyNINkG1DKUJMEQwlkc0Z6h0bjUoBnIN7PDA5h1IETgpaUz+jqShAiUFapZR0XGFwhpbp6QvOHn7Wkx+8+eaiqxYuxscff5xVGa6+c/WG9fd5k4IBklJGORcRUkhmiKuaJMrO5DrQM7OR1L3zImVZoKIibWZjw0DlSjACp0T/Qxw4BA2cOBdMZmbs97dqd8L1P04ogDDGmlQwDnjatlut/L4z4TgKZWWC19RCZGVCxixlGLqQrlx8+PBhh+czNen7j37/8vKpv6+JNkqvZgpJhKYiLiiuTmLEJBpX7IdbFYPQNVi1dfjz00/jT/fed7SMyxPzH028qaqqSmzbkQipTDOuW5uQdZdSgXGG1NR07DtYijffewk/LFoMZuow0tNgxSx0cgnXBoM4WzOhOw5iCRkfLzHYhoZ50sX7NfUoiXtEdAKQG0jC6aaBMtfFDsfCfumgQkmEHQc2FyiTEmEgLoQdp+MTESlHSaFrXGQlpWw4/dTeL8ydNu2TdzZtQVFRkbZz387fHWmoeFgBnbjrIDk1TcLrFSFSCANIA+Akqm8CBNdxeSw1VbXpf3oRACwE2pOikx3HAUCMOAPq6oEDB6BpmmIeD+ctW6xmmhbJPcH6HyeWBwGwMC9PjGDM3ffNN4uttNQz7cNlpIUaYR8uBVpmS4/XFNFoeFNSUurtI0aMiEz7ae5vJsz68Ll9dRUyqHs4kQJP0B+VUmBcwAwpNPy0F7LWBtcFrPp6vP3ySxh/3fVwpYTg/Be9DaUU9u7bi5IDJdCEBtPQ4zq2FE/ElXQR8PuhGMOX06Zjysefoq6qBmZ6CiwloUdjuMzrxWVeP7KlRNS2EGMMBmMICIESjeHdUD1mx2IAF+imCYzxBDBM9yCLCDLmIEfjOM30wWLxnkdICHwXi6AgGkWjiod9ikgqVwmh6SIjKbm070ndX5r9VeHbjLEwALw25bUxyzas+L3QtOGuVHBsW4KIG4YQ0DVEXBchpSCQ4GUxAiNFjHNG2dnlae3a7QKAWCzWx+v1+GNRS4GIM92AKNsPUVMLgDEkB5HRt89KSInb8/JY4QlUvTrhAFLZo0ec/n563x9KMzIekQdKhc4Auf8g+YcOEbFQfZXPG7xqxIgRVfuqDw269s3897dVHmJBbwBEKu44BEvs49OgNzoILdsLFXLBNA7Z2IgPXnsd111xZVwlRNOOSuQwxhCNRrB12xbU1tbDMHQAOLp4RkoJoXEkpaZg07YdePP9D7FqzVoIrw9aWgrsmIU+nOPalBQM5ALkOIgmOoIGAGV68J2SeDtUj8O2jba6jtGGibEeP1oqBcuxYSX0tmzXhZcBpqZhvZL4pKYGy20H5DWhaVw5jsOglEjxeK0Obdq8+eeHH37+vJEjD7MChidfe7avgHiyqr72AhcKVrhRCsaYLgyREkhGm2wGQzMRdV2EGSASVHsJBQ5SwusRyExfJUyzMp5/OH18hjfe7lfgBteAvfug2RYxIUTE57M6jDz7ewAYPhEKJx4+ThyAJPaSI5DTfiNv07pard2QoYEp/VApyLHDMUO75txzz91ERFkXvXDfxyuP7Er16x5JSok4pYmDGOByBb9FCP20H7LOjie/oSg+evtNXHVZ7tEybpPcP2MMNTXV2LJtGywr3vhrYr6SJCgoJCcnoSFi4a1PPsfHn38JOxaDJyUFMddFpm3hCp8fo71+JEkHUTu+w9xUBEPo2KMJvNVQi0WRELI8XtydlIrzNB2ZkmDbEiEQdMaggUAyTn0pY8A3VhQzLAv1iqB5DAVXwolaPODxoFXrll9dcuGo557Le3LtyJEjgc6dTdq92x51ZOeferXrckGOJ8OFxljAHxRBnw8enw8Nykanjl2R5P8EVdEwQkTQeNMCUIC7LolgCnwdOxarREl31nffDZbxogQjTvH5j737oZEixjjTslvsTE9vuSt+BScS0OxB/qX9kDyAc8OoWZs3cXnM57uQR2OOUV1txvYfeHvMjTfPJSI+/p3HXy86uKWzwTXJwAWp+AZXqSRJTqxLIBslyzfCrXfANQYZasTn77+LcRdfCtd1oGn6L4Sj9+zdjZIDB8EYS3Se42G0lBKGYcDr9WLhshV4+6OPsWv3HpjBJGjJBuxoBCN0EzelpOMkABHHQizR+DPAAMOD6a6FyRXlIAA3JKVijM+PTopg2S4slZgL4QwuJLxcIKwJzIxG8EU4hIOaBs00yZBKOdIVHqEhOz118blDznjq4/ff//7Pq1YDgA7ARZ/drr6b0Zk6l76MVHnuSWew+kijgCL4PV58ubEI3xT/gMlXPoTkoB9V5UdQS+qo4iLjgOu6QqWmIqVHj9UAsHz59xlSqZMd2wEUcdI0sFAIOFwKwYVihsk9OTmrGOdOwQmaf5xQAAGA4Xl5PD8/XyV167xOpqddGN21i7M2OarjgP6FDMDzM95/dM7eNbmSlGtwoZEiCDCyHZtxgOX2PrNx/49bA1sO1UJoOqghhE/fjYPDcR3o2s+EQ9e1sW37dpSVHYFhmPFGHCmoxIBSclIQFbX1eP6tdzBjzhxAE/CmpSFqWWgnCdcGknGuocPjuIiAQIxDg4KpGdjFgcm11djuxHB+IIiLvAG0VQSyHTQmGvuCE1QCUKR58BMUPm9sxAo3BjIN6ASpLFtohikyAoHNPbp2evb7aTO/SBxEDkAZuu5Yts3YuDhDODXob6wK1wklpVRufNakKtaAT5bPxtUDz0eaL4CAzwMoF9VEUAwQAIgxgiKGli3qWw4atB0AwvWyv6HxDMdxiBExrulgR0ri+QfnzPUFEOzceQmITjj+1YkLkEQekjmg34aylBQl2rbRc2669u22p/RZNWflj+f96bv3HqsI1Suf4RVxNUTImO2ILI8PNwwd83XRh3O7LVpbfIrHY5Ld2Mg+mfwmLr/00qO8qjg4OEKhELZu34pQQyje+ItLm8JVEgG/D1xomDb3e0z59HNUlpXDSEmGLV1QJIxLvH78zutHe9dF2LLRyONzHj4wxAwDU+0o5jc2oKNp4pbkbHQggDsSVoIPxni8ImYQwadp2CM4PguHMDcWQUQ34PUH4MYsKNcRqYFg2eD+vfNnfFEw2TQMYoyhX79+enFxsXvbvfd2+2HRojf7DB3aSEvpSsZYWBP6rppIAyQjgmBolZKJSQsLEfQGcWGPwXBcB6n+IGA7qCYJFwlSsSLSTA8z2rTZDOAAANjKPdfr8zLbsV1iTNO4gNhXAs12iDyGiCYHY22GDVsN4ITjXx1rJ9aGqUQeEmzTaZHVuYNrXPybnW3OG/0Hqm/ImDT7s3d2VB8WXs0EETHFSEqmxCnprWvfuvXRm2a+8EXtwmVLTvEauorVN7D3XnoZV156WTysEuJoCbe0NK6uHgmHj5ZwlYpf39TUVJQcOowHHp2Ip55/EVUN9dBTU2DbFk5ShPyUNDzg8yPbdhBSEsQZNGIwuYZdUHi/vhZVjo0/pmbhD74UdHZckCIcYRKRhCqjC0AXAmHDxJeujXvrqzHVteAYJjwgitaHyKvrkVO7dn7541dfub0hFEnqcvqA6a1P7bX5mltuyV2zZo3DGCPh9VYJIQ4fOHTwrDlL5vgAQNf47qhtYV99Bb/zm9fw9sb5+G7HKtw64mLoxAHOkZGWArgKFVIhxinOQpZSidRk+Du2/7Fpk7BUspcrJYhzpjgDd2zwfXugiXhJ3NeuTX3LLl3K4unHxGaA/LvykHgExGrSR4+8MzB65NUe3Qjd9MnzH6ys2NfGZEJxMOYqV3o1Ls5tc/KalU9+0nPCdX9ot37fzpu9/oCMllfyl596EtddGR+PFUKLJ/BE2LlrJ7Zu2xpvBiZUSFwl4Qv4YRgmPvnqa9x8/wNYUrwG3tS0uKxoNIqrDS9eSk7DOUSQMRs2kBhd5XA5x2bXwg4nhnP8AdziS0ZHVwFKodb04DPXwreRRnAhoIHAdRMrCHiwvhrPRMMoNU14DANONAbbjtCAwX3YC489snHTsuX3NVqNuxnQWjfMTEepVvf//rblRCTu/9Ofuidz7rn+6quf9PoD+vzvFmUDQKe0NtGGcCN8mokLeg3GU3M+RPeWbTCs3SkIx2LwaDpaZGQApFAjFcKE+OiwVNxJTUWwb981ALBw4ZzWUsreru0g3jfVoDU2gpUehtA0Bd2Ar0vnvQAa4peNnbAA0U60N5zQL0Cv88e+AwCTvnnn7teWzxrjgqSHcRaKRln79Exxdruek7988KVbB8zbNn5b2cEJum7IaGUFf2TCI7hn/K0JcMT7HLZtY8vWzaiqqkowcHG0mpWeloaN23fglSnvYm1xMfSkZOhBL6J2FL25jptT0tCfCbi2jQjF+ytNM4IuI1S5DlI4x8lGALqScEmiUhNYbMcwNRxCyLHwanomssCxjSl82VCLeXYMMcOAzhichhD0pCScPPx0HEqNsEvOvRiZ3rRWT7z2VOq4i8dtMjRxT6c+fWc44cbuDz6YNyoQ9LfctXvvPW3btH5+9lNPvfHae++Zew4f7A5gU4fkrPJ5oQanMRrWbjt9FPVr1ZGl+YLwGR5YfgdhcqEFfQDnaFASYVJIYSBXEZcZ6ZEWffpsBoBIhHqbpifVcRwCY4zrBviRcmg1NQApsKQgWFrGV4wxl3JzBTtONkv9nwAIAOQR8XzGUHK4pM/Frz/8ZGlDtfJ5PBR1LNEzrVX0moHnPfzQJbe8fP64y0YtKl79ttQ0ZVVX8Ftvv4M9+fAEuAmKOGMcDQ112Lx5M6KxKEzTgErMdQcDfoSjMbw8eQq+mjUbMdclf2YmwqEGluwJ4vLUdFxqS6TZLiLKBnEGxsQxIp/xLeUZQsAAgwChxtCw0IphZrgO21R81cGzGZnoqBv4LBzCV42NOKAUNNOEcBxIV2L4wIG49vJxKAxtQVoshk6eTNSFQpnd2nXLJKK6O+54sMWpp3Z+5v2pUxu27twxZdKEx/qvXL/+i1eee64EgGqRnrpa2U58B0a3PhWvL/4mXBqtSzErSqjKakRx6W7sqS5FdaQe0DU0Hi4D9/vRQIQ6RWjHGdkaZ/6OHfchIRBHRIM8HhOu60gi0jhnYPv2gsVipIQQdkqy22XkyBOWf3VCA4SIGJvIQETmb1/6w/vbG8qChse0STBjQHrH3Y9eeN21Z/cdtjzvqbyTp3xW8EXEdcmub8Bll13C3nrhhQR9JD5zUVZ2BNt3bIuP1hpG3GsIgdTkIFatXY+X3pqMXbt2wkxNlaZpinBjI846vT9+pxnovnMvmGXDYgwC8Z0g1LTVM97PhgBB4wJ1mo4Vjo0ZdfXYSgqkayDHxehACpI9HtxTVYFVRFC6Do8iOLaD7JQUDL90JBpSgE28GmtLdiDv9MsYuS4Zpu4NN4RbMcZ2nj12zOPzli8Yoxhzu3XuMuHqq69eQ0R4ddIkAMDOnTvPmbN7jvXtlwUMQLlpGGUvLfwqJcUMkC4ES9a8yA6kYER2Z3TXAzgU7ILVM5fCYRx1IDBXKSMphXvatlvMGAsXFRVpoVDDcFe6YJwzIoJwHbCSA9A4i9dGWmaXpbRvv7fpkuEEthMOIOMKCznyISd0f+2BhSVbTrUd10pNCppntele9OVdk65njJUQUUqnXqd+WNVQn+RYthzYv7/46PU3ExQTDs4Y9uzZhT379kLXNHAu4LoukpOTUVffgOdefwtTZ8+GazvKTEmDcmyh63rV43feoo08WJbizF9IDucMjEOAjiqPNMnlcFIwhQZLCCx0HXwTqsVa24YSOjy6AQXAY3gQ0nX8qewwagWHQRxCMDBTh4xGEUxOwrmDhuD1lTPx7YKluLzveWhlBNEYaSS/z8cU4zkAMPD0Xk/4U5M+7dGtR8WzEyZsJyKel5d3dJ6/a9euDQBwD+6BR+h23z/8tmRw2+7dL+o8gAwmYHId8HigfTcX9prZaHHzdfB6TURjFhrjiilcZmQg2LPHivgVsNoTU70dxwGR4kxo4I1hsLIKaJpODhPwdGhbAiB0oucfJxxA8iiP57NxsnjXhr43fvTMQxWxOtk+qYV5ySmDP3/hmgfGM8YaPR4P+g4d/FJpXd1prmXL9tktxVfvvQufLy70rJTE5u3bcPjIYRi6DikVdIPD7/VjyYqVeO29D7D3wH7oAb/UNE0w10VSUnLBm/ffVtV2/uJrrBWryfAF4ysNiI5O+zXNiJicwxY6VjguZjTWYYVyEeMChu6J305VnMzoMMKyxnowYjAlgWf7EOiTA1RFEV1ci4raauiNDv406FL8sG8DBrXuBp0LeHxecg2BiGO1BoCnJjx1EMDBmT9/TCo/wXnSdZ2GjRkzOtTQ0O6Re+4puOjCC6t8Hl+tX/fArwTqI42ICg1JVeWonjoNwcsuAUtKhlfX0RCJoi4+c8hj6el2y8GDNwFANOr09ximL2pbihHiA1JlJUBNFYgx0tNSEejabRljTB1Pm23/46tYRMTyJwJE5Jk065M3NlaV+E5OayXuOGP0E2/fNOEqxliYM4YLLr34pp2lpde5ruv6uBCFH3+ItjltQKRg2RY2bNyA8vIKmLoJmfAatQ2NeOKFl3H/k09hb0WFMpJTiAMi1TQOnXXmGb+d/8pTm1OmzrrOXV4c1P2BJp8RJzACkEQQIBi6hh2c47lIIx4J1aJIuXDB4PMaELqISyMm5mhJEoQCtGQD3tPawH9mB7itvXD9AtwwEYvZqI2FEbJjaJfSAiuP7MJ72xdi8q5F9One5Siu3tcOiK+Cvunee3ucP27cWCLyAWDo3NkkIt5zwIC7ysrLZ3GP+cZ9j0/8ThEJ0sSOsHIBzshggC/oB5/3A7wtMiGHDgRsB0GPB5AKNSTJME0gI20rgK0A4Ej3dKFpYMQUKE6XYfv3Q9gOpCLmZmVSi0EDf0zQg3Ci2wnjQeKhVb58qW/7uxcd2jawqy+r4fcjLrn5ppFXFlD875Avv/JK9yfffPN5W0HJhnrx1nvvoX/vviByEQ5HsGHTRliWBSEYhM6RlJSO7xcvwctvvY2yw4fJTE9XChBeTUO7rKx3Nixf/vD0r9+7sXLyh497N+8E8/lIJhgY4PFlNUZC8ueA4JgVieBb20KVig9HGBqDt2MmfOlB1G48HF9/pgjSsiD8Orwnt4DeJR3K1GDZDihMMEwdwmvCUQpTVs6FStXBFSE9kIzWyRnomp6DjunZSHY18SqA4aNHPzz/hwUPS5eo1+DBPxqafpG9e7cV9PvBUtOuu/f222jUyHPt3JtvPv2qcdf17ji6S1VUElhFFZx330Xqaf1Qv2odzGuvRJjr8AuO1KRk4EApqqVLLCsFRuvsFYxzm4jYt7Nm9pZKgiUEigQp0g4dUpplgwhCtsiMJnfovOHYvlUzQP7VoVVeHs8fN04RUbt+D1/5SCsjKfTnS8Zfdv5pw+f3u6WfvmbKGkVEomvf3u/VhULJTkOdvP/ee/g14y4HQaKmthabt2yF4zoQXCApGERlTQ0mvf42Zs6ZB2bqUk9JEUy5okVK8sbT2nUdP3Xm1L33v53/TtfCeb/ptfOIhMfLJRijuHQgQASvEIgIgTm2ha9CYex3XTAu4En2wNM2FVqbVBheHTWLd0FF3bj3MDh8nbJgds6ETDbgKAmyXHCKK/XAEBCGQKzBwqlpbTFswGnwQ4Nf8yDJE8Dktd+xkvJSXN/j7E4AYGhs7+izzj574+6dZ+/ZvffOj7/68rQnJ0269owBA/YWzJhpVVZVIuD3kgaGsurKpNOT+u/fcbAEsnNPFuzeFaEPPwXr1x+R7t1gNzYiOSUFWZlZgNyICstCLC2Nkrp3WQcirPhhVitFqqdl20opyaFpSjSGuKgoF1rPk2H0OPmQ3r/fZwuBKuRCsHEMuQW5KBzXXOb9l9rWrVuZITR16TP3POXVNPH4RTddeHb/YT/mFeVpW9/cqtbz9XLwyHMmHKquGWzX1cnhZ40QTz+WB4BQUV6BrTu2wXVceAwTgUAAC5evwEvvvIODhw6TkZIkpWVpAc5kTsuWf964YuUTc/etGzX2uTunDf2xOLvfnkrler0iMSwISQSdAUroWColvgyHsMqxAM5gpHjha5cGvWMGVJIJaByNqw7APlQPYRow26fC0zMbKs0D11EgW8ZVdxk7ureQCQ5oAnAksngAHfyZqKyrBXFgXdV+fL9nHX94xBWwpd3h3XffDd50001ffvDFF+3nLlnyu8vHjbtixerVXErZtTEaXd23Z4/PZs+fP2jLnt0eEG287oLLV21sKBsSbgyh1nVYxrhxMNp3gMhuCcvvB4tEyIEiX2qQQdNVRTTKq4NJ7OQhQ9YCQJ2NXsnJSZmxmAXLkco0PTxUebDWGDp0UdvfXPhhiz795zLGLFx1TZzDBaDwBJtBP+EAkluQKwrHFcon3n9l8PpDO35718hLLzi7/7Afh+XlaVgIVVhYqB59/PE+b3304YRYOKKyWrXkH775BgzdxKFDB7B9186EaHMKQpEInnntdRR8NxdMcGkmJQnBoLVumbXi3P4D7pw8efLm33/8wmtz9qwdP3jNTpy9s0E6ukcQ4geZKwmfZmIPBz4JN2BeOAILgJHmh69LBrR26ZBegZjjgksXojyG8N4qmG3S4O2WBd46CJcDynbBiB3dfw5GYBqQGN2D0OJq72XVNVCCQdMFTEND4ZqlNKBDD3lKWltW21CfmdoqNfn55583H3niiZUKLLh02bLHurZrN3n3unUjt61eDSLiIy4avb+8vLLtvvXrP2CMxaLR2p1jnv59LORETSOsyaou7XGoopx2L9jAS0pLeVWogVUcKgd8XqE0Aat9+/W+jJa78/LyNIfrOxEN59mWPMswzWF2JLIuuUf3K4Zdf9MOPP4EiKjFu0VfX7D50P5Otut28Xg8LEUYMybk3vZFExOiGSD/ZCvMLVB5BRON8l2Hhw/p3PO8y8/4zY+5BbmiIHeiZHHuidZ9wIDXGhxXJ8dWb730AmuX0xb7S/Zi165dMHQDgaQgVq9fjxffeAu79u4lIyWFwCGSPWZ9tw7tnlz7w8Ln753/3aBLXrh/68JD2zv1312lLt8dgc25UCBwBXgFR7UQ+NqK4qtQCIdIQk8PILVjBkS7dEg/hyUlmOPGZ7MabMS2l8LfOwdGh3S4JOHaLhhxMPGzgiOaBKq5AkkChAYmALguwo2NWHNkN77esAS923dBSU0Zu2P0TZqmazC9nmDL7OykDz/4Uk/yetcYprnRo2mHJGNLHddtouYoj9C/i7q276XCdwbf8lpe19+98dTgksYa49nvC5iIMGE7DoQu4OUavAqRrm3aHMzm3uBB58CaC0Zf8GrbB8YXM8bqE5djN4DHATw+e/bMs71e/7azTx96OFpX1+nRGe/kD86/aVSZHUoNuTZcx4HDCMPSOnQHUNBMd/9XNQUZox4zC7Kdbs7Uqy67anuTRxmXO04AkBdcevFNR2rrhjg1tfL399wlLhl9IfaX7MX27dsRSAqCcw3vfPYp3v/0SziANJKThSZd1iEnZ/bYM4bf9fqLL+999Kspf7z+jcf+vK5iL+9Xaclb94WFx3VhMw4PCJrHg5VK4t2GOqyxLYhUH1K7ZkFrlwbXo8FyXDDLjR/8hGiClArenjlQ6T5YrgR3AcZFfBUcgRQjpRgjxsE4AyfiDKRAnAGmAIhQWlGGDqmtkZKUTO8tn8mu6HVOXTo8P9SH6tcww9g8Z8vKQ98WFjbomjaqSZJoxuLv2w8aOXhEdaSm6/66qoFVsdDpQx65JifiWknM0KHrBlp6U+DX9XBypu9gq9TUra0zs9bnZGRtGnJq7y05OZ0ONO7Zk5x20kkVr6/fgA+efwVL1q3ssbZ0e2dOOo3uMXBHl44dd4wadeEPAHCw5uCpV7//5Jwf9m5s1WBHwQ0DXp8PLlPINP0Y1K3nM4wxt+m6nWgAOaE4AHmJeZDEf6moaFaLq+97eF3pvpIWgwcNoCXfzeZlRw5j/caNSM/IwIHSUjzz8qtYu36D0v1+xjhjyT7v4Z4ndXtoyczZnzhKtrvhncff/mHvhvNLY3XoanH10MoK3rE2BlcAXq6hSjAUWBYKoo2IJXuQ0iULRts0uH4d0nVBDh1drUGJjdBglBB6AI6WvTgDOAdJV1mOxU1Nh2GacLhCLBaDAaEYOBemDrnuMBrWlKB9p3Z4dWIePF6Pu6HugJZlBh69dswVTx1bo5dE+vDhw2nRokX0+ORnr62DNdnQNE14DBwJ1cGKOWjhT0G7jJbgjtqQ7PF/1DapxebeHU/al9wmq4Qx5vy1m9Prsz69Z8GOtdfvqjrUzeJkkgKSTX/4rM6nfvb81fffDyAy7uWHZ83asWoUpGu3DqSw7q3br0pPSdsdjsVam67Ep/c8ewljLNR0s2sGyL/2vTZ9wFwIoU4+vf9bOw+V3qorkit/WCByWrbC6uJVSEpOxo9LlmDSK6+jurZO6sGAMIVApzY5H99163WP3XvT3SXPznj/9i9++vGpzbX7UxxI6WOC37uhhp29LwRbA7jQUGTF8H5tLfYlm0ju2RaejqlwfRyOLQHnl2sOKPH2WGLRDkusUUucNkAw2FAq6PXyLmZaeffsdiuSgskltoq1Lt6zbci2usMtJRjpfpNhWzXqlu5BemoyXnz8MQgh3EbL0hpqax8MV9W/2OOM/i03le+7Zl+48pS6hoZefVLbTnjixt9Pe/Xjt/4gTP1ZDjY96PGvSA2kFnfMyC71czOpvKH2Nxzqx35DhvxwDAj0n376KW3gwIHWo1++ccX2kp0XtPVlTHjxrgl773z/z19+u6N4VHmorgn1ShM6HJI8PTkFud0GPfvK734/uccjV+7eXVtOAU0Xdw6/aHH+JbeNBxABYCV7fOUNVvSETtJPOBZZbm6uKCwslPc/cv/g9z/9emHdkTL+4isv83vHj2fLly+D6fHinc8+xzuffqoIjBm6xtKDwT3DBgx4cNqXX05zbAf3vP/0W7NLNty698gh+DVdujoXuftCuGFbHbxcwxHG8HZ9DeZKC1qnLCSdlA2V6oULCbgKnHEiYk1tdEbH0I0IrEnq9xhBNwVb2irN6+O5p5zx8Uu/++OfGGOHjzmobX8z6Z5Pisq3n8l0TYmDYdQv3qUEONKyMxBhSknX1Yaecuod8z768u0H3n/uga/3/jSpPFqPdH8S7u/3m+vuv+jaj2bOnjksyfCp4eecs+TXPrthecO04RgOb49WAzeVHbh3R+m+7tnJaSnt2rZt/Hrjkm5B3cR7l9035sNlc6+edWjd5dXhRgeWK9KFh3FNZyHlwtQN1ags6pXRpvQPwy6bdM/MKa+GrBhpAE/RTScoPC4DDNMwG7pmtv7x+cvvub1ly5aViTmF5iT9X560FxaSaRiYu2BJXl1lpT5o2Jny5t9dxdauLUbUtpH34iv44ccfXT0pqHl0DR1atnx36ocfPdK5c+cKAJyIcMXrD/XeU12qkrxeZUFpPcvDuGxPGH7dgyI7hjetRuxrF0Rqty7gaT7Y5AK2Aya4cjiRVFIwzhhJgi6EFMTjK6cZEstumqTc42BRIGVywS/qPnDau7fkX/vadQ/jtTmf5R6oqTi9Z8tOsxhjiw4cOXDHmDcfWrGl/qDXq0EIj8nJVujSth1O7t4Z6f4k5LTO3j3voy9R60Tb1lqNkrnKCUjNbJmSvgtE7ELGFiUAl/3m91+O3rB/V+dwLMJ7d+hW+sDY675gjFUuxWJc8dqf7vz20IZLY6Ew9tm1WFG/H9WNtTIjrT3tbaieOH3jsv6WB1In6BeeMhDjB18Exhge+fY9rK84wL2Ghoq66sxGK+I3JWMV0mam0FSZFdaPqJCuxbWVUkvC1ZdOKHirlIPdw8bFc8ZmgPwbvMfl11wzfOr335+j64Z6Om+CKD9ShnWbt+DFtybTtt17yZOerqUFfHvO6N/3D19/8PHUzp07Y/r0r0eEjOgaxljDkzPe//7HfRsHhqRFyTGFa/bFoNuEV+w6TEs3QKd0RkZ2EJbrgGwHAgySSFnS4a1TM9HKlxoWnFVEHTtnX22ZHopEydD1+I7opkAwvlgJjIEcLnmPlJb1b9z46P1v3PgoH//2E++/sOibaxvg4JTdW64vWrmyZ5vsNlvaeFPramP1gfat0nZEunq+NUnUXXjmmapFZlq7UGNkiAbPAQagOtaYqYQmoGzmIS3Wr0vXOjBGRMSfmfHh74c/fds9B+rKWjdKG5IxFB3ciiU7Nt669uDui05r02VXbSycbru29JseshyLQ3HeNthC9G/bNfTD9rX9a50o+QxT9Mtsj2cuGg8ZkfB5PDij7UkoLtkKXfhBXPcmeXxLR3br+2rxkd1315PDFUnYMQvRSIyE4DLqWuxAfWVPgwvECgtPSNKidqJ5DyLifYYPeyhUXs7vvv9e2bNbd7z17vt46e3JqqaujielprLOrVt988z9t9498jdXHn7nnXfSWue0eMZy7GtStdS+ABoGdDypKO2nwISqxkZ+4SEH3oow/iCi2HpqBvzdWoJxIGY7ABi4EHDd+DLLM1p03TW277Bn77rg8nkAyg7Wlp/0zo9T7/uy+MfrDzZWKY/h5ZRY/Akiirf/uNSY0Dqm52zijO3/5McZQxaXbL72QF2Vo3lNtc+tTC+pPpDF+cCy+99+6uEzO/dSf8i9uaApeV4+ey4AYPr06cHZs2fHFJF+/vP3dHOkC24IHvB6Q11adikjInHrO3/+4rv9a3OPhGogwyEJxUgPJiEiuPqxdOtJ5tdT8lJ8wasbrEgbBSUkY65gnJ/bvtfO64aMuSMpkJRx0yfPfeb3e5kTieGsTr1hSI7KWCMMQ0ejHQMQ10BOCfrcdF9K9Ue35d8TI/eNb9cszPLomtugrGsen/Hx7XvKDpGh6aJFcmqFSwrIA5p1sf4N3uOhJyb02bl/3znte/akP951N5/02huY9NLLUnEuMrMyY31P7nbXvBmz3h25eDG+njV9hCn4K4ZhnkIQcFzVF8C2c3oO3JKalFre/UBptm9/LT3ZgrPy3t0RSDYhbRuQ/OgaNOJMkWJ8dJf+Gz+58+kxjLGDd9HlaWt2bW7Xv+spmzyaccODX7wSe2fNnFvDdsyGBHeUyxUH54wx5hKXjoIODgWwdxzL1EwDzNR10zRwcnKr7ddecNn+fY89xvPHP/wJAPyBbk79cME3w7cfOZiU5E2K3T501OqU7Oy9ADB58uSUusaGLHIccFOD3+8pTzZ9NTe/8/hTM3cszy2PNbgBbvBLB4wR3bPaYOqW5dhUeVBJKLXt8P6zqsL1p/TOuzrICHCVI07NyAkV3vv8pYyxzX/8+IVLG8nhTGgKnLF0XzIc14EhGBxIrDmyF7rpkZxpPN0MrBjUsx+G5d0095JJ9+3KCCYftBk6HqqvPudIQ52ySLG23mQ2uvfgtz4hhbyJhPx81gyQf6X30DUNc39YfE+kISQef2GSfPvjj/mzr7+uNL9PdGjRYuPIwYNvemvKlNUHFyy4umTX9mtrBD9TF6YRboxZXr/PcK3Y6QA+8+pm5cWTfr+yJCQvmtYlWVW3TxMGGGTMBZpGZuO7AilGinVPzqp743f3X8YYO/jU15PvGZp3w8O1sXDSNS8//NHHrXrfUTp8xCvztq++baNVYqQaPqQYqWiRlFbdIphymBN3D9VUtOASNToX5IzMXb6pdM9zyYb3jB6t2u176LwbHmaMNSRyh6RHvn7rkeHP3nZNWai6Zdh2wDjDjG1La5+d+dHDD1147dtrdmzKDsei6eRKEqbBfMLcVW9FOvfNu+bB2liD9LtcPHXJjezGQWMQs6Pwer14YOpbED4PIuT41+zc2C9iRZOhJGm6wdqntd7gM8zNuQUFoqpys+a6LhEXcDWB9WV78Zs+Q+FqhDcXfY0NZfvhMX0U0HR2cb8zX3/w8xdvWBctO8+ptc4zNR0WKTQ6FjhjaJeexS/o3O/l3531m8V5eXk8/wTbC3JCAaSp//HOu+92uvmB348bOfJcbNm+C88+8ywLZGWxnp07T1kxb96DANwHzh425fCkSTeTYUC//RYViUYcwRgjJaWAOrWpHt8+PXP5kk4ZF9XChi4VSDJAJGY7ErvJwbjUOOcnZ7dbmZycteuN2Z+c9nbRty9vrT8MEgz8MG6ovvS2J1tnZOw8OaXlp10yWrbpkJq9rGt2u5+uGTZ2hVcYVQRCTDrJC9cs1D+hP4MxFlu7c/NHpx3as2dj6a6Ob8x8rx3ycJAmUtZlL/5+6qKyXYOqrEYg3KjAOXl9fhy2G1JjxfPfmrZ49uLdNaUeiysPAS5zmdYqmLnvgU9evPSgXaczcNkimM7qI2E1/rNJtLn8AJXWlGtM07gjJXRdE5Xh+qRoLOaHK6Xh0UVqIGlnxLEYG8fki4Xvx+Yf2MxCTkz5PAFM27kaRxrrUBuqw8aKfaR5/C7pTO+X1fGnuy+8dmX/31/+SW1jHXTGYcVi8Ogm2niD6JCeXXJ+j/6THrv0tjds6fL8/Pxm0YZ/peXn5zPOGF5+Z/L1mtC8UMp+9qWXjdRWLZ0z+/W/fd7Uqe8yxrDrm88/C7361pXWps2WlZ4lPDW1GrXM5pokCKHBdZzhc36YcxKArSN6D9o8a99aVFUd4obwgBGIEkuhCCBXudxVUgiPzryaJwSAbdm/Z/iBcA2EELaCMjKTUo+k5+Q0JMqX1xxbprmGKPhh0cy+iS/Xj+g/QgHAO/MLh18/Of/H/dEalpSehDE5p0aMJ7TFV6b88YN5BzYMamwMO5neJO38Aefz+lgYC/dsgs6Eu7+xSpu+cflvR54yZFWUSxBnShBHh8zW9bPXLhsctmJkaCZKG6rx6Ndvc+H3IymYjAA30ckT2NM6Nb2hbXLW+2v3bK9wBAM5kBpx4efevSxRdrvvsutXTN2yvPxguKaFTxe2BMSCvRvApEuapgnOoZ/dpsfBd666/8Y1U6ZUDmjf/a22sdYDFUmP1/A0pvj8m3q06vD9nWOu/jFBTzla6G4GyL+WbiKlUsEWXbteJTmX8xcuMlqkpZVdPOq8q6a88saP3U86ydiyZYtzaMbUQw0xC1q79qbetSvCkcaCiOss1y1X4+AmYzRERqxOALaee8rAJVlzPtmzg6v2NjnkEmlMgmlcg8/0IOj1IiiMSKuU9KqAEt8CoEEdTvlhzcHdh/eHKrK7tmhz4PKB597DGGsgIr2yobLD53OmJV93/m9rn5nzybXDnrjl+or62tbEOT5a+t3SRdt/+t2w7gP3ldfXnlZOMVbvRqOpdsDoltFuxYvff3XZpKIvzrekcnP8afrkqx7EWd37IsokLp+Sh4V71jN/SpI60lifcaSuMjtqx8AUmFBAp6xWdTHpdFCuZC4j1jo1E9069F5rcmPDqR06rzy9fTdSEbvut+eMLZjvWrj3k+efd3UG2Jw8TEdGcsoeAMjNy9MZYxWvz/78ztgK94M90cqA5ECyngxTKqQznxzYqefUp0Zd91BGRqumefN7jfjaae43vSpixwAAd+GaozkjTnA77gEybtw4DkBedHnu+Q2RaDtXSpaTlbX2/jtuvvK+2+/bAUDbsmWLyxijmtLSNyLnndc/rW3b3ennjijIbt/5h798voLlBV7k5grBWOjq1x9dmhFM6+QjgWTutVLN4JE0X2BbRnLqiu7Z7TYN6dprc9/OPY7SMa654NK1RDT0uzULLwWxtNH9h32rzf+646WvPfj1wYbK7pblen+qL21YuH9zUk0kBOa4IJKyTDYMfXP21Bd0xi/ZU1nqdbginTNDWC47v9dgdVfhq3+oiDUQiPhp3XuhwY7SH75+Q+2rPULbKw8JZpgsqhQ3ODcqIjWdbCUBYszDNHTJar/LIdfmOocrFQWDfjx06bUfD+3S57sPF3zT6+l5H02sCf+/9t4zPI4q2xpe+5yqrk7KsiU554wxTmAwThiTbAYGWoBNvthkGMwQ7sAgCRhyZgawGRMHGFowzhE8tjHYBBvnnOQsyVZsqUNVnbO/Hy0Zw8y9973ffd87YPd6nv6hR1J39alaZ8ezdmO3O9552nhqZquPr2tY3y6hHeUKwaaQ3CW3oAIAQr17q15FReKOC8d/snTVim0ffLPwmn21FXlBf5A6ZucfOLf34JkXDx71zTRdhJ2fzZtUs2rNMF/7jt8c8dFsIioDQAiFRCgUQjgU0r/U5sRfHEFKS0u15fFgy66yaxOOQ51bt5qxoPSdm7t06Vc5fPhwY9myZW5zy0d269b7IMU5UEmrHo1G2/51xWc9QKJtp5Z5G4b3GbSaiGIIh6QuBfpmtX0qLyNnU9e27XYO7zFwXbe8dhVeaTYmdLIbNuDxorKmqs20hTNa37jiV9892vWNISOK/u2V/fUVrb2GJ2/j1nWz4l6z+/LDW047GqnngBXAlk3l6ZoAQwh4PCab8CDu2HpP9eEhtlbi1y/f39EmJggpTZJHok4ia8+Rg73ZcSjo89HCrasw/dvFBGZpejxI96WhU0Y+Z3p8hwbmd1m09Wh5oeO6IAnh83ic3h26bMsyfBukMPp7pKG3Hjkkx79Z8lImeV+qsRtwxG0Ae018t23dPQjf/VH544t7JRrj0m95ZY7hj47sOWhnUVGR2NSiBW3u3RsYMMAcMfDMDQDub24tYwDPNd2P795+u/jIK68X2Zs3gLr1mJAWCnUF4+4lxUVyZEmJW1paCsKJg581QZqD86deeqn7H17749gu7dt+sv3b764iIrfJhLvH0sDhsCwtLFTsKu/Uzz6+esH6b684veiGgRGVyCTThKlJdcrN+/b9pTOeum7EJbNU0nXbCmBrkytnEpELQIZCIbQ/7/RrtlTte2DIUxNbS4d9Nz44omXZxxWj1jtV/eucBnSUGeqq0ZdEnpz7fid2WKdZfsWajVxfOvXP67hZGoZnxd6NXWw7QUIIEXcdBcAfsxMdXKUgTBNef6D8YHW5EdWOXzKzk7CpVVq2m9eibXka+Xa0ycz9eki3PujbvvuXA7udsjzd8kdOf/jae9hRgCFEwPTVAag4t9egdw9vbLx+S+1B04SpKuIROuDUCFIamcF0nJrboeLXp515r8cw+aonJi8d12HAvtbZLdflBtLn5eTk7G8K9DQACDRtL8OHGxrApPHdaVyrcWcltDsYft+F1XMWDpdff6etgOVqVrJtz65rQGAU4YTEz5ogJU2J8/dKP7orPzN90YblK68iItVEHPWjGklhodpRWdb/yim//9PKwzvOqGyohUokIJiZbKEVkdxz6OiQis9rZ77xWeklRDTz/fmfFmysO3DXwbrqQec9eXv3kg9ffb5o/J0vhcNhcdETd1234OD6HpptdArk28jI8NQ1NrZWWmuv10s+0xtvl9/u8NHamk4J2xYguJZl0UWd+3345sRHbgTQ6fSSG1atr9ztM0ki3fIDQFpNQ6QFKwUmICuY3uj1eh02JMBC27YjR3Tue/TNGx++DMC+heu/HFVUOvWxtjkFA0q7Pf1FfSIaHPHYpDZgaMGkA6Z1EIB6IDRp6WOlr02atXnlo+XR+nzX1fAHLGSbwfLe+e2mPznhnufzMjN3AaAPHnzuDsX6+BhPxGKxNp9+tbjT1sqyjtsPlA3rkJa78ZlbH3yBiPiiyb95zOe1HhZsQpoe0P598Hg9ZCv2UMuWKv+Ms78HgBHFxRq/wAlSv1iCNAfnzz77WPtlK75xih8qvpSI3Gar8hMro5ZvXDX0htcenfVt7YEsJnJdJ0GccITQTGQaMhgIQjM7G2v2m598u/hlZp57z7SnLv/04NoH91dXoIU/DaMCA5rf1pPQbksDQrPwUqbpawRAETva2VWOIClhWdYBAA21sUh7pR1orY1OaS2cB8+f8CQRJSKRSJWrVKOQ0k9CIOAxDwEwYvFYK+W4MCwTBjzlo/sP25T26Z9UtRuDz+vn0lVL89ft2jLH8HvNcrshc091OfapSKffTH3impcm/S5cGYu0SmhXBNkQ6WRV+gxPQodYPhS69U1mnvPmotIzKqprGru0at1w5bCLdhNR+Vu3l6CoqEg0bTpcumTuwO8rdl68p+JA13NKbupRE2voFFF2epWKolOwJS4dPCJERDx7/uwRUPp3jbGotknoYDRG8vBhKYmYhSSZ02JbswXGL1wg7hdHkOa4Qgi/+8TkB0r6DhwYbSLNT8nBdVzX7bI/3D/ju/KdWX5fwE3YtjGyUz/86rShyPSlYd6mr/HJumWwPJbpMYXeG6tuv6l8d/8GN9GmrjGiSEo7wxuwurXtuKfprdPqopEMZhaCCAFpHgaQaLQbO7DrwvB6kW74agCYMeW2dRVDCBJ+snZ0btt5FzPTyi3r29iCsxVBez2W8FnerQCkDcfPWmtDaeEX8ki65d964bN3fX3oUPSsRMJxhCHo+6N7W2gAbBqcEUyn07Lb7Rxz+tmLP/z804z2wezydum5h9tntdjZNj3rzbnKkShNPpxEdBjA9Ob1uQoAQpBFvYp4c+/NVFpYqlbv3DLwjg+eXrqtoSKgmGEnbLBmuNpxWwayjUtPO/vW8SPHfbJ8+Zysqmr7VdPjEY4b19IbMGTFERh1dRCGoaXfL/ydOmwgIRJFgKBfaCHwl+xiMQDce++9B3/gzI/bpUtQAmamG15/5OUvD2/P8ft8bqSuzrhjxK/xyMXXwWRAMzCmW3/sqyrHiv2bEbA8XO808pcbV3esi0ZbatuRQmnLDwM989sdAIANZdty4srOBTFLKSlgefcDCNZHY620SorRMmMHAKqz4+ncpNYYMH37A5Y3FrUTeOvvM9vG2ZWayDFNU6T5MzZ8v+v7XC3YEoITJkmjVXpOdcSO4d4x4/+tcc7b722sPzQ4Eo/Bb5jwkYG8YHasf/vupVNufPB3RHQoFArJ+eFwb6/hqUuo5DknCcBn+RCJR/M+WTanW0aatWvMgDHlRUVFori4WBGRKuZiahpG6v/1S/e+taZ2b0CwsA1pSMvwEDNrwxXGsPyef3vo0olTHy46KGoj6kp/INCnIdKgCJBCEMT+fZDx5HRFM68l0np0+wrMxwYbpQjyLzImzD+ouh+zHkkBa73k0uWnrziw7Tw2SMdiUTmyaz/8buzViDU0ok670JqRm5aFIZ36YPn2NSCPh7TS5JGGN+LG27naBVxHBGA09ijoHGFm+mT5/NYxuB5NShnSMrLSMrdVx6rbuIL9DO1Ihtk6MycGIC8BN1sJKEt6ZNDyHkjYCQDAvuryDrFEnCVB+TyW7Jrfdtfnmzd2rmUXdjzmMTxBys/IOQQAg3ueuo2Zz3n98/Bl+45WDK2LNh5slZG9q3Do+V91z2+/e+q//XtzRk8RUd32vds7L9m6utv28kN9yuuq+h2J1nYb9Oh1bWvj0bzTWnRYxsxjiouLjyUwRhSPkIaQ7r3vPvv8F/s2nmKwVAakh5nBRDrKthyU2373R/c+dXPTJsRqxvQRLDUn2y4BoQHeswtSadYgqQry7Y6jL1h6Iscf/yVBVq2aYg4ceLPzr7Yk/0wcvKSwkAjAh98sDh12G0iYloLNxo3DxsKjCTFWMIUBBQYJgmXI5AhoJhIsuFVWrqfWbcxnAiQJBAyrEsBRIuIn/jalTdRUBEMoj5BGi/TM3Us2fh+IaxcCYA9LZFi+7Z9v+KqlIxgkpDY9HpGbmVHenDmoqK3qWtdQTwk34fVkCgxq1/XI9G+/6NkuvQU6eXPK86z0jT1btJkBAOFwWBJRA4B3m14AgIeZfV9t/X7QVxvXZNTVVu/4w0337b3jlUevHT/t8anVdqMV1S6iyoYDF2DAtm2VgBr+9Mx3bikpKXllc+/NMhwOo7Cw0P3rV/OuLJnz7i0N8YTye7xSC4Yg4kad4C4ZLcW9515xFxEdRVGRWHjmmf5YrGGA4zpEBKGFgGxsBPbsgzBNJhCZbdtuaY4/SJyY7lVTVu8/CpJBlZVtf77SpKWlWjPL/TVVw6K2DUe5lJ/TEqe17wrbdSCEPGZyNDTKag4DHsGKmNIMn90+O788EmvMlRCABnICmSI3LbOama315WW31dhRCGEIy7TQs13nfevLtreNKQdEgCkkd85vu2/9gbJeCWZXae1KQ1JOIP0AkCRcXW1NRoE3E4NadKo4NdB6Tu+WnVb1tjKmP3ruNYNXFr91yqKiN8YUnnvxvqZiqC4qKhLMbL40+8PrfvPhC8+Mf+PhRWOeumP3ze88veKdVQs/Ez7rKgAY1v/09REnoXdHjqiIHXWZlTJZag9LTjN9VNFYxzM3fPl7Zm5TuqmUCwsLFTN3nrp05svbqw6xz7SEbprDGFe2zvIF5WW9z3rhiqEXzZ00ZYrZlO7tQUQdHNtJJksMA6LyCERlBUiSNtKDCLRvs5SInHAoJE/M8Py/sCBJl+bCxM84w8UAMmoaI22044INQRlpaQh6/dCOBkHA1S4sKbG/9giWb1kLy/QxDAPtsvK+a1+QX6uZs1lpNgyD1lbsanXfR8//ccIr95/6+d4Ng0HQYBg+w6NDg0dtnfyXlwqj2nFjbkKTUjSkR7+90z6fcTmxNloHsox23syGdpkFawDA1YqeK33zkcIzzn35V2edu8fnsapK73seAGIAjvzgOiaPoYbCIfFoYYmyu2U+HN72dUl1IoK448BJOHAdW+f7MzknPWsbAFw59Py1933w0jNvrV1U1OjaikASmsEQYGIypVSb6w/m3vbnJx5DCW5gZnHT1JI/rSzf0dLymIqJJQNgTRqC5KjWvTY+FrrzkccL7xKTBgzAVAC2HR9i+fwyGo0qYkgpJcTBAxDxOFyPKWRGBtJ79f4SAFr06kXASUiQXwj8ylWWUIAwBVXWVyPm2sg1A0jEGmAZBrw+L16a8xb2VZXDl57Ouf5MMbr7gNd3lR+Je0yPobVmny+A/fE687mln95e3xCBK9gJBNIRZyUsGG5OWs7RaDQ62PSYRitPS6Odld3Ys12PShm354c6n+FpV9Bm2cBWndYO73fGnuPIu6fpBTSfM2SmIoCKASYiJqLmWEqt2rP5jFveeeLhXVX7Xb83jU0IYVk+igtJmd4g9+jQvSJpDVk8Nf6u577fu+XqLyt3diaGZoZIHl8hmJAi7rh6yZ71E7Zt2/bytMWl/T7bveY8xVpZ0pRNfcocdW2cmtu2vvjiG68mosYiLhKzi2crANCahwIEpmQbo4QAdu+GmZzVLty8lqrg7BE7T/T4479FkOPy6D8nf7NagOpIUrZlmHy4toreWD4HD51/NYIyHUdidXj403fx/nefIS0t4CZc2xic2XbrA5fc8AnQmGO5FHGgAh6CS2RSVSyClsF0Iz8j1yw7Wo52mS2QZ6R/D6A635f28fhuZ27u0qr9xp4t263L8vnKAJQBWAIAHpKwDPOYMAEzU/FxZGgyy1wCcMnxlrC4GMxsXvXyg89vqjpgppl+BU0GgUEEJknkN6za8/oMKgOAKVOmSCJqeP+Lmb/fO+/9D/fWVcGyrKb3S0rRecnE7oYj5qNffDCnvPZo2oFINaeZPqFZgwSQcJXK86UbE04b/VT3tt2TQtPFyXu7cOHCQDQaGeg6NohBMEwYsRjE/v0wDENDCGG0a7UPwI4Tuf7xI4IwM61evdoYOHDgfxiQjxs3Tv5cCNL0wBGAeEFWzt610cPtNTP7LAsvLforFq/7Gq1y8rDlyH7sqSpHMOjXCds2zszrdvSlCXdfSkSOJHH4gfdferFxp/vI4VhEmKZEGzMP5/YYOLNtRu6ebRX71aDufdcUZKQtaWq8e+8nbl6r0i9nd9qwr6zfwdqjpx6sO9rPcVz7scuvG39W77P2FRcXU0lJif7P9tZmxfqXB3e584sDW85kZiVYSG4+zA5mIkkBj/cwgEoAmDRpknvo0CFx06jLP7rixd9OONhYexHAiogkc/OcEiKPMDBr84rWzAS/6YPmpCSRq7UypTTGdDpt4W8uvubZM78pyHG2lz/ibdPmseLi4qr58+f3EsLo4LgKmpkM04Q4sB/G0UoIKZj8fk7r2OkrkqKxqKjohK1//IMF2b1793/qS/5n5PlXIBQOCyJSL8x+95219QdH7K856qYZpjL8frGxaj+tqzoAy/IiIy2DDWJxVl73ZQse/OPtb8/9a3bzqNznb/ht0bTPP9m8eu+2IZbHEzujU9/FhWec+7nd1Kz4FgCLJJg564NFM9rP3/r33V2qs6Nmz1a/OrvkxjcP11VlxQWjQdmwXQe+QABvLl3wgADdtnnzZvFfWeQmxfo2Zz8x8feV8ToOGn6hoZO5E2aAmA0h4Te8e32G6aKpIFfERZQocXD/2Osf3vDW/nM21x32+KTF3GRCmDQkJFgTNymtEBNAkNpOJMTZrbsemHZL0SQicpd98MGlQmtzwIgRtUTEM2dOH+bz+WQ0GncBGCQFqGwfjFgcbAp4C1pRRp++X0IzRgCi5Bd+3uP/iCBNO7L9S7rw0iuuUEVFReKesdd+uKPy0Dlz7W+vKa+vBbOC1+tRpvRKJnDMTuCa08+N3j3m8nmXvfzbot3lh0J7G2vulkK8krjEllcPv/hjAB8fn9kLh8P0XcOey48qe0xNPNJ9wKPXtfeyzL964OgLbrt7wuc3vfHoiNWN5Vm2E3MtSJJCsEeaaIxFac3hPdfsqSh/vn1e3u7mWs0/u/7NvZOK9Xe99+ST6+r25fhMj9Ka5bHEIiV9F0lApj9wOKHc5lgGJVSii7hInELd1z7w0auvHPh+0f0xO6EkGZLRHGUABEEggmAGC3BMJahrVj5NPGvcrUS0LxwOSxP44MyrJ/wZ112HJUuW5EYidVe5SjHAggkQroIo2wvBYMEkG9N8VXlDhy0AgBEnODmApE4U4T8RkGNmMW/ePOtnmMpCcXExE5Hz2o0PXnffqNBdI9v1Wtu3RQflt3wyqmzNzGwJQbO/Xeod98J9Ty/euzm0trIMS9d/9ztXKT9KoWYtmZX7yaxPevz5wz+3avbxQ6GQ9pBsv7pi140ztq486/uKXW2q443coaBtJQBUNda2lWAOWF4YhiGJyGDAMIXEnlhVsPjTKZMFiDcXFtI/t35JndoPls69YPHOtVfHY3ElIeSPbgQTtAZ7yEB2ILibAQwvGn7s18UoZgbEk1fe8egpwYJNSmsJYk3JpQEnZbmSCo8gaK052wjQeV0HPXf1qHFzQuGwLCwsVGeGQnEwMHfu3G6RSO0ywzAG2AkbgiBYCohIPWjfPkgSWkgTti+4ggxzLwNEJ2j1/EcEaa6cJguDq8yNGzd6fvooXnBBg/tzvPikuHsya3Tn+eNfXfDvfxy06rF3B9zQf8xHLfxBEXXjQjkKdcoW++trYRNwWtuuzgUDz5wMID5v3rx0u9ZeIJRcmxPI+W7WnFnX3HzzzU5hYaF4+ob7n/nt8MuuG5rfrZ4UkGb6Ky7of/Y+ZjbqYw1dleMQKYjkVNvkvHUJKWKOw2sObr92T0VZ59LSUl3ELH6aoi7dVMrMnDVt2YyXdlRVsN/wkW56qEHNYxEYil3yCgNtsvN3AUDL3rfz8d89FA4TETXeOHzsfR3SshF3bBCI6cf7CABoRynRN7vtoReun/yIYi16hTYxgwlEPGfOjNGOk1gmDaNXwra1IBC0hvT6YNbUgKqqAEHser2c0bf3PlYulYZCAicBxGefzem0aNGiVgAwe/Zs1bt3b+enDyFR4c/2dFgzSULhkCQil4jWvXz1veNvG3zhfUOyO+zLI79bIIP2oBbtGy/rOujzxy+47vwHL534IRHpeDz6ZDCYNoChPYaUraQ03ps3b15RaWmpcqFx7dnj3nt/4sPnj2536u4Wpj/qM61aAFnV0WhLpZL9gUmxOEoeaGcmw5C6zKkOPjPrvckCxCU/sSKFpYWCSqD//S+vPLS6Zl83UxrJNO2xlNCx/QpKsbBgqh4t25UBwE8n/pUWFqpQOCyvH3Xp/LM79J3iNyyhlNI/9QcYLAQJvbuxKvdPc/86BoDG0hGiNFwq5syZOUkzzRbSyE8kEgpgobQGfH5k1dTAM2c2vNBwQSyysihv4KAtBPCJXv84FoP4fO4Rxwk4AHDBBacHly5dagOI/5K+RJMVVE3FNyIi/t2lNz3HzG/N/2Zxfl08zlcOPydB5Nv9FwBVGzact/HrrydE/IFrIg1RTUTkKq1JuwgE/MVz5s7tDeabx44dW9Mxv+PKysrKoX9ZNqfLPPc1LFvzXYeoE8tRrJoEq4+rdAAwiEQkHuNv9+28trq25sXMzMxdzbFIckpviVq1Z90ZN0x7+vbqWKMOml7BTc1mP1CEQYKYiclvGPGRvQceBoBNmzb9Q0q1ctMmcrVCTjCz1iMkHOXgpw0STARTGtgfrfbM2LT8GWb+gohqFy+e16k+knjNME2pHEcRhFRawfAFkFa2F/SXv8BTcQjSYym2lUn9To3mDxu5+GSJPwDAGDr0kkjzD6effkHkFz7X+oeaQygkiagaQDWQbP3evnDeGLH/4MRdJY9ebuzeA88l41iffoaIxaOQRMRgbmhoUH6/P5RIxLsvWDDrivPPv3hry5YtDwM4DAAby8vax0mTSKZ+5Y+ICgI0yCtMtbvxaPDh0tfuIuCuzYWFgpmJCgvJZ1p4dvaHT+yIVnr9lkex0gJEPyknNIXZginT5z2SlZVVDQDFxcVcclxRLpyMI9xPly849+E5b0+ujTWy17IE/5N4DUTCQ1KtrzrQbfK7zz1mCnlH1aiGMu887zSf1zupwbGbWgd88K3+HvrDvyIQi0H4Pco0DemOGbq2Z3HJRCLa+tNjBye0i/VPduITA6WlipkpHA7LcDgsmdl7dN26P9S+NuXy2BfLbU9dvTLf/YAyli5Dlj+AZFeeJgJkY2OjaxhGX1th6Zz5cy4CgDtfvtMCgF0V+1s1ug5EEzfouFez82+ARMSN8TcHt12hmfNLS0tV8dJiidJS9Ujpa/d8eXj7SFZaEZGEIaBYQ2n1I44wGIaQyPSlHQpavkjy9tCPYpnCZJo4d8rXs1/fEz9q+rxmUwrr2A09/u8hWYjahnq1ZMf6Wxdv/G54IRWqFtn+R+Lx2H5PwC99XksHPvs7zHfeg085cIhdZRjSHnXO/CFTpp4byMxc1VT7YJwkOKEDLSLiwsJCtWnTJiai+JD7HixMm1D4na9dW4+jHAp4DKbSj2FN/xv8RHCkCaU1iMhIJBIKJPKEELPmzZt966t3v2pLEoja0UEJ14Yg0VST+8GN0QA06+R5CSH0nlhVywc/evVeQwiUjCzR9fH6HrPWfPlYZaSGLeERAMHWDuemZSDN409+drL8ASZm0zDgN6xtsaScjjjezBSWFgq/5eU73376ja/Ld3WWQipNIjnfihhgrQn8Y5IA5DUtbKsvFy8t+OhpZvYMGTK6gjzmwwGG8n06HdaM6fCbxG4i4crsbCN43Q0rBz//YiERHV2yZIlRchJkrk4agjSjpKREN7kFe7pNvu/CzNtu+ghtWgnp2OT1BdiY/xlo6p/hj0agvBagXQhBkl3HNYQQmjF50pRJhkECFXXVBQ7rpvRV84ZNTc8hHzMnhjBEfSzOy3esv8mpr88nQN/552ef3VhzKOAVpiZm0qzhl5KuHnyOpiZFx2R/CYM12CNMBK3gbv2TFG84HJalhaXqDx9PmThr88rLEnZCSSGPmTQNzaYlBDcnKJsnMjAAkpIE1DdHdpz+5PS3JwFA/9HnfZr4OHzYt/gz8gd8LtsJmG3bGAX3/ubvfe6ZfBkRNXA4LEeOHOniJIM4Wb5oU7ZLENHRbrfcOb7lbbdcH+/UMWJHGsjw+bRv7VqYf3wD6QcPQ/oDgNIgaGpKUG2devNUJ64cX8SOt9bMkBB0/Co6KjmLrXnDZgUyhdQ7opWZD02fduXfN644/4v9m8ba2lECQoKhXTCfnt95Uwtvxgf1sCGl1MkHmsCsydQSLdIz9x+f4i1iFoWFhepo/dGeH69d9vTBSJX2SlMgafmgwGwJg24ZcvHGDGFpx1VMTY2HzYQxhUlH4hGeteGLR/jo0dZvALE2p/b73kzPIm6MGtynF7d+4LfFHa6cMIaIDjfFTwonIcTJ9GWJSDMzhW1bdhl/zbsdnn7ycjnsbJWINAjD71e+/fthvv4G/Nu2wQgGoWEAINKuWwkAiMVa1sUa80GAEMkDAVpouHDRISefJBE0HytowBBCVMfqeO3RXb//4/IZH+xrqGSvaQoGYLsO8oWPbhty+f3Lt6+LkiGTxqOpDqI0KGBY6JxbUN6c4mVmKkk2N1p3vPPc1A3V+7ICXl+yxUQzWCnNhqDTC7p98/glt5x9WouOKwBNzFoT87GwhAnCNAy9se5gi0mlf3y9GOCed975O4wYFWk8pd+hDo8Wj2039pKSpvU6qWKOk5ogzZYkxKyXDB9utD5t4KJ+rzx/oTXugsOslTQ9hhuMRWBO+zO8y5fB8FrsgKC02g0Ac1cvz43YjelC/rAjMzOU66Kw3/CKtv7sRMK2fxjqyaCA9NFX+7dmL9qxNttvBYlJEASUFCROy26/8MbzL5tXE6kb4NoOiEXT8WJmgIVPGs6p7bodTiblNnFpaamgkhL9+Kdv3rf00MahmrWL5NBoCIBjbgzd01rGi8fddBcR1d5yzmX/3imjhZuADRbNV5W8btJCJhKuWnpg07gPl8++nog2pU24anjXt98a0urUwfPDoZBs6lnTOInxDwRZsSLsa25tP5FJMnLZMjccCklfZu6iwX96bai85Fd/FxlBA4D2gtn711IYH/5VIBaDbXq2AsDmirIOMUMLEDQTkwCgXEelB4JoE8h4rm+L9ktNQzITKxJNwQgTWAsmLVgwQYDYhqKumXn27eeH7q+M1GTZWnVzXNWUpmr6P0EIWr7a/t1POQwAxUtHiMLCQvXV5lX9S9cveagyGtEe0yOT89YJjnZ1tukXY9r1eWJw9z7fDpgyyRw3cPiXZ7XrMc3v9QoN3TRRESBNEAoImD7eW1vlvvf1Z//OzJndBg9e0zo7e184FJKFyfPvjJMc/0CEIUNC8ZMlU1FYWqo4eR5896Cnn7nAO2HCqzq3hdCNCTZNH/sXL4P3nffRJtaYBgA10fqeMbggkpqb/RWtKQATrsKaiwcMf6NVeg7F3QQdqz8g2TTYHMY7cHWmzxLndR8wZfSAYeuXb/i67dHGiJdIJCVYkrV0FqZEwPKWAagCg0pGjtTMnPHk3Pff3FpX7g1IH3RTPyITFGvIgS26rHry2nufYUCsmjQFCpqmTHykpKs/r8qBCwhytWbXdWwVj8c56iYMeAxjY0NF1/vfeu4hLmIxadIks/AEEJ3+f0aQk23XoOSZbUFE9in33n9X5sSJ/0Y9ego7Uk9+j8fJPlSBApYdAeBgVXVBwrHRlE1tEoFgCkgPCrLy4leced6sfi06bCaDiEnr42saTYTRSjmiV7Bg15MTJheBQbsqDrWKacdDzDrZlM5gMEspkOkP7jdJaNw8wPBIQ09+95mXvj68tb/JUoG1ABhEghOaqUtmfuK+i66eTESJuXNnDpk7e/p7HA4Lg8Th83sOfj0nkCkT2jY8hjRyfUHZI6eABrZsf+D8tqcsPL993+e8hvG5KCE9depUN0WLH2CkluCH4L2USPS89vq3atavpx0vvPSn+oWLrEB6wM3r0vVbAqHOiXa1lYKU1OytMDORj8zoyFP6VRORnrrwk2e/r9j19uGGOrbIRPPJLgIQVza3CmSLy/qNeIiIagBg50cHW8e0DUMQU9NoddZgiySyfcF9GgxMXe385auFl/9+1tTr66ONymf5hSYBISTbWqmsQJpxYc/BT4469Yzl27dvtzZtWvdEZlbWsJkB/kyB3yopvOXFjWU7BsTSCrI75OZ/1z43f+3QPgO3n9Wp70af4amJqx+133HqiUgR5J/GJSBSYWaZdcop02zmTSuvu/6VqOMOyu/Xb5NmLYY9OrGj6yiYkERMgABLS5IpjYNpVloZAJo45rK/zli7bHJ5Y6QPwBpEApqhwUqQlANbdlx224UTPrl9+JsGli1zj0Rqu8S1CwnRPEkaGgyPMNE6u2WlTvaXFYx59o4Xd9ZVqKDl1S4rKMeGcgGYpjG0oOv6Jyfc/exTV/8GWzZt+o3HGxhWb7u2b//+F3bO+JSJ6G0AFwY8Xsy3/6HNjhAKiaJevfhkKwKmCPLfBTMKARUOhaSH6GtmHvX9+++HUFZWjg4dWkfi0VacrHYTc7LqLQ1CblrG0aDli2E4DCKKPz/rvRfX1xx4qzrWoD3C0Cyho47NPf35zq3DL/ktESlMGmAaywjV8UgnW7vwQBxXeFRkstABK7BXAjxx2qPPflG+ow08JpSA9MBA0BdAQHjQIavVnolnXjSJiKJLFszsUu/Q70gIba38ViL8SUbFGYNeZ+a6TcuXby159dWdpYAq6tWLevfuzaHkHA9GaakqSd39FEH+W8F7Mi5pAPA2AMz5fnn3GJRfNA9rA4GhtUcYItMX2B13EsCyZIfr5HHXzJi7ceXjSxu2tlKsQKYULQIZGN6+7wujBgxd1TSqwfFaXtQnYm0B1iRIs2a2tRKNti1aB00a2mfA9kemPX/p7H0bxreSQacgK6espT99b54/bX23Nh23Du7Ye8vQ3gM2ElEtAERN/wt5PiM9+lFY6c8WSS8JbljyhbHqpps+dfqdujccDvcnopriJrmh1J1OEeR/HpeUlpqFhYX29vI9eTG2YQrBxETJpnQmj2Eh6PFtVcx4//2Xg9XVSBBRzYPvvvxseXV1cbo/UNUmJ2dHp+yC756++p7ncsrjRm+ASwFE4rGsgb+/rlPCcYXHZwrLtODVEh38udzeylo5uF2PrdNj03N/1WPwtWP7D9vQr1vvnZYwGmz+cZLp+fDzvr6dhhYGDh4aF3v7Xe1Zv06aXp+2YzGkZ2VJ2SJ3y8CrQteTENXHyRKlkCLI/zwuGV40XANARV1N55h2IIShGSRAGloxmQpokZZZBgCBNr36ZuQmOhYBH1w/7OI3ft1zyKeDBg2qM4jqFYBnrpkM4AcJpW/WfxPIkf6GwRntKzu0KCjLDWatbZWRvfaCvmfsOq1bny1No98WAMDvm66paMoUf5/8/I4S6MiufboLnGp5PN3dxcu6RGfOhL+iXBhBv9axhEDnzsifdP1nHUITJhLR3pNBhSRFkP9lLNvckgnA4dqqAoc0SCbF1AgExSCvNjnPm3WIiJC5d+9lCb9/bIlhvF/SsWMcwH4AeP/T9wsy/BkdBBu9BNydF1548bJwOCzn/23+oYXFrw8CUG8JQzVbhoeO+/wZ82d0F0oM1hpdQdwPmnsw63ZSCktmZsJvJ6BnL4BauAheAqTHctnVhntav/3tbr/tzs4XjJ3pFl4NDoflydpP9T/aJFNL8F+vETPj8j89sHxe2dohJgxXay00OxRNOLJPRmt+68p7eg7qO6hsxZ23Hoxt3ZVjjb/qxbpeXbdFD1b0s0zZC6DeJESO1+sFa81K65suPP/Ct37yOWLApEly7OjRVFJYaM/7el66qlK/10rf6rE8ASIBhobrunBsF9Ln1cGqKo0PPiasX0uBYBAqltAyM9MQI4Z92efFF6/2E+0FQFxUdFIILPysLMiqVbP8lZWGuvDCn6d+7/+dpNYxfz2norama8xOCBHweCxpISjS4AsQOqW1/GpQ30G7APQw6hqCxtr1rGLxe9KvuAzBgQMQiyag4nEo1ohFY7bP7/ewUl1nL5g9mFxXjR176WogqaZy8803O6unTsXcuTNHuVXuC5bHOjUaiyEej6vk9Wg4gijo85Fv3XphTJ8uPOWVoEBQOY1RaXbtIswLzpt62r33TSaiRg6HJV1RqKikJBVz/G8TxOvt5Pp8R07oXakYxQSAy2vL0y0bPDCn46HWOXlrWmdkbumS13b9GR1P2TSkS9/tROTadVVp8aPVluGRyqw4xPE//pH06HPYPO8CSvj8ArEoCPA0NDQwEW4VQjxIEM6sWTNf8/sDT44ePbpiy5YtaTt373zE1WqyYUjR2NDgApBEkFoz2OtFViIBzyfTIf7+d/gkMXtMDa2lOOP0SPs7b32m1ZgLH9e/vR9NWbiUS5Vysf531mnDjg1t+nTpE/FKs7Z5TPTxlgZAxupHixbruQv6O1VHYAV8OpGIi0T7jtAXX4JE9x6IxxrBSsM0JJTSABiBYADRxuguwzCmaaVDfr/vtIbGBjCzJhKCNUMRweO1ENi5C2L6LMhdu+D3+zXshKCcDKgzz5zf74WX77OINiGpdcapTFWKIP8qCBQNF6Het3OvUIiLcWw+IDNzi03T3ry7Mhy+O33/3qAW0mVXGw3CgBp1DvSYc9BgSlA8wSBBTec/tGGa0vJYcBwHjm0rDS0YlFSOMz3waobni+UQ8xbAH49DeD3KUEo2tCqIBi86r2jAvQ+8QESaQyFJqUbDFEH+FWia+fcf7szH1xfqy7aetePZl6e5K1Z2V5GIkqZHJKJxSvTqCTXuItgd28NN2BBgJA8XQifVQUEgEmCGywqW5YXvSBX0pzNgrlkLj89ich3tGlJ6hp29u/2dt9xV0HfgXPwgd5QKxFME+XkH9UuLR8iRJctcZm6x+U+vvFL/t+lX0p69EF6fcm1bNnr9UOeMAo8eibjHBOJxgETynEZTsyJMCa804f1uNdTfZsBbUwXDsrQdjQp/5w4wzjt33qkPPHQtEVUtGT7cGLF0aersxs8tSE/hn+w2yYfUbZo5eASWddXBBbP/vnvqnx+Tq9flAVBp2hXO3Dlk79sNefHFiLVuhUQsDtIMJoLl8yFYUwdj/iLQyhXwAQzT0Fq5ks4YEGtxzfjH2o297HkissOhkBxZWuqCUvtcyoL8Aq1JMRGVAJqZu617/LG3ogs/Owvlh+Hx+5Rj2zLu80GNGgVn6JlIeH3wuC7MNetgzJkP79FKSL9Pq1hcONmZyLj4wk19H374diLPsp+6dCmkLMgv1ZrwkqIig4i2M/OoPaf0ufXgX/7yALZuKRAg7U8kKP7Jp4Qt2+EfNRLO92uBr76E3zQgTFOpeFyK/n2dtlcVvtDh0iseJ6KGlEuVsiAnnjUpKhLNlWxmbv3tb+990V25MiQrKiEtSylXS5cJpDVMy8NOQ0RTTpb0jhm9s8vk39yQXtD2S2jdLDWaylKlcGK6XEuKhhsAIPx+bP3g/du+HX9V3be9evHKLp2db/ucor7p3tNd2q4Dr/zVxbzrw3c+YOaWABAGZPP0qBRSOKHR1MlLTaTpseaxktlrx4zhFR0787f9+vPa306urC/bMVH6vElihcMytWopnHRotibM7Nu/YM4DC664Ys3ap556m5k7N7u/KauRwknudv2gP8bMxyxFymqkkMJxsUkzIYqSfVQitSoppPBPiJJahRRSSCGFFFJIIYUUUkghhRRSSCGFFFJIIYUUUkghhRRS+EekCmkppJBCCin8/7AcK1YsyF64cGEgtRwp/G/il3DklgEgkbCiHg9S8/NSSCGFFFL4P8C8efOs1Cqk8K/Ez/rsQXq6kRNOHR5K4V+I/w82LDZFWsF0HAAAAABJRU5ErkJggg==";

const ADMIN_KEY = "mundial2026admin";
const STORAGE_KEY = "quiniela_mundial_2026";

// Usamos variable global en memoria (no localStorage)
let _memStore = {};

function getStorage() {
  return _memStore;
}
function setStorage(data) {
  _memStore = data;
}

function calcPoints(pred, real) {
  if (!pred || pred.local === "" || pred.visitante === "" || !real || real.local === "" || real.visitante === "") return null;
  const pl = parseInt(pred.local), pv = parseInt(pred.visitante);
  const rl = parseInt(real.local), rv = parseInt(real.visitante);
  if (isNaN(pl) || isNaN(pv) || isNaN(rl) || isNaN(rv)) return null;
  if (pl === rl && pv === rv) return 3;
  const predRes = pl > pv ? "L" : pl < pv ? "V" : "E";
  const realRes = rl > rv ? "L" : rl < rv ? "V" : "E";
  if (predRes === realRes) return 1;
  return 0;
}

function getEmoji(team) {
  const flags = {
    "MÉXICO": "🇲🇽", "SUDÁFRICA": "🇿🇦", "COREA": "🇰🇷", "REP. CHECA": "🇨🇿",
    "CANADÁ": "🇨🇦", "BOSNIA": "🇧🇦", "CATAR": "🇶🇦", "SUIZA": "🇨🇭",
    "BRASIL": "🇧🇷", "MARRUECOS": "🇲🇦", "HAITÍ": "🇭🇹", "ESCOCIA": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "EUA": "🇺🇸", "PARAGUAY": "🇵🇾", "AUSTRALIA": "🇦🇺", "TURQUÍA": "🇹🇷",
    "ALEMANIA": "🇩🇪", "CURAZAO": "🇨🇼", "C. DE MARFIL": "🇨🇮", "ECUADOR": "🇪🇨",
    "HOLANDA": "🇳🇱", "JAPÓN": "🇯🇵", "SUECIA": "🇸🇪", "TÚNEZ": "🇹🇳",
    "BÉLGICA": "🇧🇪", "EGIPTO": "🇪🇬", "IRÁN": "🇮🇷", "N. ZELANDA": "🇳🇿",
    "ESPAÑA": "🇪🇸", "CABO VERDE": "🇨🇻", "ARABIA S.": "🇸🇦", "URUGUAY": "🇺🇾",
    "FRANCIA": "🇫🇷", "SENEGAL": "🇸🇳", "IRAK": "🇮🇶", "NORUEGA": "🇳🇴",
    "ARGENTINA": "🇦🇷", "ARGELIA": "🇩🇿", "AUSTRIA": "🇦🇹", "JORDANIA": "🇯🇴",
    "PORTUGAL": "🇵🇹", "REP. D. CONGO": "🇨🇩", "UZBEKISTÁN": "🇺🇿", "COLOMBIA": "🇨🇴",
    "INGLATERRA": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "CROACIA": "🇭🇷", "GHANA": "🇬🇭", "PANAMÁ": "🇵🇦",
    "C. DE MARFIL": "🇨🇮",
  };
  return flags[team] || "🏳️";
}

// ─── ESTILOS ─────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700;900&family=Barlow+Condensed:wght@400;600;700;900&family=Black+Ops+One&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #F5C842;
    --gold2: #E8A020;
    --dark: #0a0e1a;
    --darker: #060910;
    --card: #111827;
    --card2: #1a2235;
    --border: #2a3448;
    --text: #e8eaf0;
    --muted: #7a8499;
    --green: #22c55e;
    --red: #ef4444;
    --blue: #3b82f6;
  }

  body { background: var(--dark); color: var(--text); font-family: 'Barlow', sans-serif; min-height: 100vh; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* HEADER */
  .header {
    background: linear-gradient(135deg, #0a0e1a 0%, #111827 100%);
    border-bottom: 2px solid var(--gold);
    padding: 16px 24px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 4px 30px rgba(245,200,66,0.15);
  }
  .header-logo { display: flex; align-items: center; gap: 12px; }
  .header-logo .trophy { font-size: 28px; }
  .header-logo h1 { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--gold); letter-spacing: 2px; line-height: 1; }
  .header-logo p { font-size: 11px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
  .header-user { display: flex; align-items: center; gap: 10px; }
  .header-user span { font-size: 13px; color: var(--muted); }
  .btn-logout { background: transparent; border: 1px solid var(--border); color: var(--muted); padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 12px; font-family: 'Barlow', sans-serif; transition: all 0.2s; }
  .btn-logout:hover { border-color: var(--gold); color: var(--gold); }

  /* NAV TABS */
  .nav-tabs { display: flex; background: var(--darker); border-bottom: 1px solid var(--border); padding: 0 24px; gap: 4px; overflow-x: auto; }
  .nav-tab { padding: 14px 20px; background: none; border: none; color: var(--muted); cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; border-bottom: 3px solid transparent; transition: all 0.2s; white-space: nowrap; }
  .nav-tab:hover { color: var(--text); }
  .nav-tab.active { color: var(--gold); border-bottom-color: var(--gold); }

  /* MAIN CONTENT */
  .main { flex: 1; padding: 24px; max-width: 1100px; margin: 0 auto; width: 100%; }

  /* LOGIN PAGE */
  .login-page {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: var(--darker);
    position: relative; overflow: hidden;
  }
  .login-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 30% 50%, rgba(245,200,66,0.06) 0%, transparent 60%),
                radial-gradient(ellipse at 70% 20%, rgba(59,130,246,0.04) 0%, transparent 50%);
  }
  .login-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 48px 40px;
    width: 100%; max-width: 420px;
    position: relative; z-index: 1;
    box-shadow: 0 25px 60px rgba(0,0,0,0.5);
  }
  .login-header { text-align: center; margin-bottom: 36px; }
  .login-header .cup-emoji { font-size: 56px; display: block; margin-bottom: 12px; }
  .login-header h1 { font-family: 'Black Ops One', sans-serif; font-size: 28px; color: var(--gold); letter-spacing: 2px; line-height: 1.2; text-shadow: 0 2px 12px rgba(245,200,66,0.4); }
  .login-header p { color: var(--muted); font-size: 13px; margin-top: 6px; letter-spacing: 0.5px; }

  .form-group { margin-bottom: 20px; }
  .form-group label { display: block; font-size: 12px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .form-group input {
    width: 100%; background: var(--darker); border: 1px solid var(--border);
    color: var(--text); padding: 13px 16px; border-radius: 8px;
    font-family: 'Barlow', sans-serif; font-size: 15px; transition: all 0.2s; outline: none;
  }
  .form-group input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(245,200,66,0.1); }

  .btn-primary {
    width: 100%; background: var(--gold); color: #000; border: none;
    padding: 15px; border-radius: 8px; font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; letter-spacing: 2px; cursor: pointer; transition: all 0.2s;
    margin-top: 8px;
  }
  .btn-primary:hover { background: var(--gold2); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(245,200,66,0.3); }
  .btn-primary:active { transform: translateY(0); }

  .login-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-top: 16px; text-align: center; }

  /* PREDICCIONES */
  .group-header {
    display: flex; align-items: center; gap: 10px;
    padding: 6px 0; margin: 28px 0 8px;
    border-bottom: 2px solid var(--border);
  }
  .group-badge {
    background: var(--gold); color: #000;
    font-family: 'Bebas Neue', sans-serif; font-size: 16px;
    width: 30px; height: 30px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .group-header h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; color: var(--text); font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }

  .matches-grid { display: flex; flex-direction: column; gap: 4px; margin-bottom: 4px; }

  /* MATCH CARD — 3 columnas limpias */
  .match-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 8px;
    display: grid;
    grid-template-columns: 1fr 130px 1fr;
    align-items: stretch;
    transition: border-color 0.2s;
    overflow: hidden;
    min-height: 72px;
  }
  .match-card:hover { border-color: #3a4458; }
  .match-card.has-pred { border-color: rgba(245,200,66,0.4); }

  .mc-local {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 10px 8px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px;
    color: var(--text); text-align: center; line-height: 1.2; gap: 4px;
  }
  .mc-flag { font-size: 22px; flex-shrink: 0; line-height: 1; }
  .mc-name { width: 100%; }

  .mc-center {
    display: flex; flex-direction: column; align-items: stretch;
    border-left: 1px solid var(--border); border-right: 1px solid var(--border);
  }
  .mc-info {
    text-align: center; padding: 5px 6px;
    border-bottom: 1px solid var(--border);
    background: var(--card2);
  }
  .mc-hora { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px; color: var(--gold); display: block; }
  .mc-fecha { font-size: 9px; color: var(--muted); display: block; line-height: 1.3; }
  .mc-sede { font-size: 9px; color: var(--muted); display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.3; }
  .mc-scores {
    display: flex; align-items: center; justify-content: center;
    gap: 4px; padding: 10px 8px; flex: 1;
  }
  .mc-input {
    width: 38px; height: 38px; background: var(--darker); border: 1px solid var(--border);
    color: var(--gold); text-align: center; font-family: 'Bebas Neue', sans-serif;
    font-size: 20px; border-radius: 6px; outline: none; transition: all 0.2s; flex-shrink: 0;
  }
  .mc-input:focus { border-color: var(--gold); box-shadow: 0 0 0 2px rgba(245,200,66,0.15); }
  .mc-sep { font-family: 'Bebas Neue', sans-serif; font-size: 16px; color: var(--border); }

  .mc-visitante {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 10px 8px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px;
    color: var(--text); text-align: center; line-height: 1.2; gap: 4px;
  }

  .team-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 6px; }
  .team-name.local { justify-content: flex-end; }
  .team-name.visitante { justify-content: flex-start; }
  .team-flag { font-size: 18px; }

  .score-input {
    width: 48px; height: 44px; background: var(--darker); border: 1px solid var(--border);
    color: var(--gold); text-align: center; font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; border-radius: 6px; outline: none; transition: all 0.2s;
  }
  .score-input:focus { border-color: var(--gold); background: var(--card2); box-shadow: 0 0 0 2px rgba(245,200,66,0.15); }
  .score-sep { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--muted); padding: 0 2px; }

  /* Points display */
  .pts-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 50%; font-family: 'Bebas Neue', sans-serif;
    font-size: 14px; font-weight: bold;
  }
  .pts-3 { background: rgba(34,197,94,0.15); color: var(--green); border: 1px solid rgba(34,197,94,0.4); }
  .pts-1 { background: rgba(245,200,66,0.15); color: var(--gold); border: 1px solid rgba(245,200,66,0.4); }
  .pts-0 { background: rgba(239,68,68,0.1); color: var(--red); border: 1px solid rgba(239,68,68,0.3); }
  .pts-null { background: var(--card2); color: var(--muted); border: 1px solid var(--border); font-size: 10px; }

  /* SAVE BAR */
  .save-bar {
    position: sticky; bottom: 0; background: linear-gradient(to top, var(--darker) 80%, transparent);
    padding: 20px 24px; display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid var(--border);
  }
  .save-info { font-size: 13px; color: var(--muted); }
  .save-info span { color: var(--gold); font-weight: 600; }
  .btn-save {
    background: var(--gold); color: #000; border: none;
    padding: 12px 32px; border-radius: 8px; font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; letter-spacing: 2px; cursor: pointer; transition: all 0.2s;
  }
  .btn-save:hover { background: var(--gold2); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(245,200,66,0.3); }
  .btn-save:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* RESULTADOS PAGE */
  /* Card: fila única con 3 zonas — equipos | marcadores | puntos */
  .results-match-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 10px;
    padding: 10px 14px; margin-bottom: 6px;
    display: flex; align-items: stretch; gap: 0;
  }
  /* Zona izquierda: equipos apilados verticalmente */
  .rc-teams {
    flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 4px;
  }
  .rc-meta { font-size: 9px; color: var(--muted); margin-bottom: 4px; }
  .rc-team {
    display: flex; align-items: center; gap: 6px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px;
    color: var(--text); height: 26px;
  }
  .rc-team-flag { font-size: 17px; flex-shrink: 0; }
  /* Zona central: columnas de marcadores alineadas con los equipos */
  .rc-scores {
    display: flex; gap: 0; border-left: 1px solid var(--border); margin-left: 8px;
  }
  .rc-score-col {
    display: flex; flex-direction: column; align-items: center;
    padding: 0 10px; border-right: 1px solid var(--border);
  }
  .rc-score-col:last-child { border-right: none; }
  .rc-lbl {
    font-size: 9px; color: var(--muted); text-transform: uppercase;
    letter-spacing: 1px; margin-bottom: 4px; height: 13px; display: flex; align-items: center;
  }
  .rc-val {
    font-family: 'Bebas Neue', sans-serif; font-size: 22px;
    text-align: center; line-height: 1; height: 26px; display: flex; align-items: center;
  }
  .rc-val.real { color: var(--text); }
  .rc-val.pred { color: var(--muted); font-size: 18px; }
  .rc-empty { color: var(--border); }
  /* Zona derecha: puntos */
  .rc-pts-cell {
    display: flex; align-items: center; justify-content: center;
    padding-left: 12px; border-left: 1px solid var(--border); margin-left: 8px;
  }
  .results-meta { font-size: 9px; color: var(--muted); margin-top: 4px; }
  .score-display {
    display: flex; align-items: center; gap: 8px;
    font-family: 'Bebas Neue', sans-serif; font-size: 24px;
  }
  .score-display .sep { color: var(--muted); font-size: 20px; }
  .score-real { color: var(--text); }
  .score-pred { color: var(--muted); font-size: 16px; }
  .vs-text { font-family: 'Bebas Neue', sans-serif; color: var(--muted); font-size: 13px; }

  /* TABLA */
  .tabla-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 12px;
    overflow: hidden; margin-bottom: 16px;
  }
  .tabla-header {
    background: var(--card2); padding: 14px 20px;
    display: grid; grid-template-columns: 32px 1fr 80px 80px;
    font-family: 'Barlow Condensed', sans-serif; font-size: 12px;
    font-weight: 700; color: var(--muted); letter-spacing: 1.5px; text-transform: uppercase;
  }
  .tabla-row {
    padding: 12px 20px; border-top: 1px solid var(--border);
    display: grid; grid-template-columns: 32px 1fr 80px 80px;
    align-items: center; transition: background 0.15s;
  }
  .tabla-row:hover { background: var(--card2); }
  .tabla-row.me { background: rgba(245,200,66,0.05); }
  .rank { font-family: 'Bebas Neue', sans-serif; font-size: 18px; color: var(--muted); }
  .rank-1 { color: #FFD700; }
  .rank-2 { color: #C0C0C0; }
  .rank-3 { color: #CD7F32; }
  .player-name { font-weight: 600; font-size: 14px; }
  .player-name .you-tag { font-size: 10px; background: var(--gold); color: #000; padding: 2px 6px; border-radius: 4px; margin-left: 6px; font-family: 'Barlow', sans-serif; font-weight: 700; }
  .pts-col { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--gold); text-align: center; }
  .pred-col { font-size: 12px; color: var(--muted); text-align: center; }

  /* VER PREDICCIONES OTROS */
  .player-select { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
  .player-chip {
    padding: 8px 16px; background: var(--card); border: 1px solid var(--border);
    border-radius: 20px; cursor: pointer; font-size: 13px; font-weight: 600;
    transition: all 0.2s; color: var(--text);
  }
  .player-chip:hover { border-color: var(--gold); color: var(--gold); }
  .player-chip.active { background: var(--gold); color: #000; border-color: var(--gold); }

  /* ADMIN */
  .admin-match {
    background: var(--card); border: 1px solid var(--border); border-radius: 8px;
    margin-bottom: 4px;
    display: grid; grid-template-columns: 1fr 130px 1fr;
    align-items: stretch; overflow: hidden; min-height: 68px;
  }
  .admin-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--gold); letter-spacing: 2px; margin-bottom: 4px; }
  .admin-desc { color: var(--muted); font-size: 13px; margin-bottom: 24px; }
  .admin-tabs { display: flex; gap: 8px; margin-bottom: 24px; }
  .admin-tab { padding: 9px 20px; background: var(--card); border: 1px solid var(--border); border-radius: 8px; color: var(--muted); cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; transition: all 0.2s; }
  .admin-tab:hover { border-color: var(--gold); color: var(--gold); }
  .admin-tab.active { background: var(--gold); color: #000; border-color: var(--gold); }
  .users-list { display: flex; flex-direction: column; gap: 8px; }
  .user-row { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; }
  .user-row-info { display: flex; align-items: center; gap: 12px; }
  .user-avatar { width: 36px; height: 36px; background: var(--card2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 1px solid var(--border); }
  .user-row-name { font-weight: 600; font-size: 14px; }
  .user-row-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .user-status { font-size: 11px; padding: 3px 8px; border-radius: 4px; font-weight: 700; letter-spacing: 0.5px; }
  .user-status.saved { background: rgba(34,197,94,0.15); color: var(--green); }
  .user-status.pending { background: rgba(245,200,66,0.1); color: var(--gold); }
  .btn-delete { background: transparent; border: 1px solid rgba(239,68,68,0.4); color: var(--red); padding: 7px 14px; border-radius: 6px; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; transition: all 0.2s; }
  .btn-delete:hover { background: rgba(239,68,68,0.1); border-color: var(--red); }
  .confirm-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 200; backdrop-filter: blur(4px); }
  .confirm-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 32px; max-width: 380px; width: 90%; text-align: center; box-shadow: 0 25px 60px rgba(0,0,0,0.6); }
  .confirm-icon { font-size: 40px; margin-bottom: 12px; }
  .confirm-title { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--text); letter-spacing: 2px; margin-bottom: 8px; }
  .confirm-msg { color: var(--muted); font-size: 13px; margin-bottom: 24px; line-height: 1.5; }
  .confirm-name { color: var(--gold); font-weight: 700; }
  .confirm-btns { display: flex; gap: 10px; justify-content: center; }
  .btn-cancel { background: transparent; border: 1px solid var(--border); color: var(--muted); padding: 10px 24px; border-radius: 8px; cursor: pointer; font-family: 'Barlow', sans-serif; font-size: 14px; transition: all 0.2s; }
  .btn-cancel:hover { border-color: var(--text); color: var(--text); }
  .btn-confirm-delete { background: var(--red); color: #fff; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 1px; transition: all 0.2s; }
  .btn-confirm-delete:hover { background: #dc2626; transform: translateY(-1px); }

  /* MISC */
  .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--text); letter-spacing: 2px; margin-bottom: 4px; }
  .section-sub { color: var(--muted); font-size: 13px; margin-bottom: 24px; }
  .empty-state { text-align: center; padding: 60px 20px; color: var(--muted); }
  .empty-state .icon { font-size: 48px; margin-bottom: 12px; }
  .empty-state p { font-size: 14px; }
  .jornada-section { margin-bottom: 32px; }
  .jornada-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--muted);
    letter-spacing: 3px; text-transform: uppercase; margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .jornada-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .filter-bar { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
  .filter-chip {
    padding: 6px 14px; background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; cursor: pointer; font-size: 12px; font-weight: 600;
    color: var(--muted); transition: all 0.2s; font-family: 'Barlow Condensed', sans-serif;
    letter-spacing: 0.5px;
  }
  .filter-chip:hover { border-color: var(--gold); color: var(--gold); }
  .filter-chip.active { background: var(--gold); color: #000; border-color: var(--gold); }
  .toast {
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
    background: var(--green); color: #000; padding: 12px 24px; border-radius: 8px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px;
    letter-spacing: 1px; z-index: 999; animation: fadeInUp 0.3s ease;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  }
  @keyframes fadeInUp { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  .progress-bar { height: 4px; background: var(--border); border-radius: 2px; margin-bottom: 24px; }
  .progress-fill { height: 100%; background: var(--gold); border-radius: 2px; transition: width 0.5s ease; }
  .stats-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; }
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 16px 20px; flex: 1; min-width: 120px; }
  .stat-val { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--gold); }
  .stat-lbl { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
`;

export default function App() {
  const [store, setStore] = useState({});
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [page, setPage] = useState("login"); // login | predictions | results | tabla | others | admin
  const [currentUser, setCurrentUser] = useState(null);
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [predictions, setPredictions] = useState({});
  const [adminResults, setAdminResults] = useState({});
  const [toast, setToast] = useState(null);
  const [filterGrupo, setFilterGrupo] = useState("ALL");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [adminKey, setAdminKey] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminSubPage, setAdminSubPage] = useState("results");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const persist = (newStore) => {
    _memStore = newStore;
    setStore(newStore);
    // Guardar en storage persistente de artifacts
    try {
      window.storage?.set(STORAGE_KEY, JSON.stringify(newStore));
    } catch(e) {}
  };

  // Cargar datos al iniciar
  useEffect(() => {
    async function load() {
      try {
        const result = await window.storage?.get(STORAGE_KEY);
        if (result?.value) {
          const data = JSON.parse(result.value);
          _memStore = data;
          setStore(data);
        }
      } catch(e) {}
      setStorageLoaded(true);
    }
    load();
  }, []);

  const handleDeleteUser = (name) => {
    const newUsers = { ...(store.users || {}) };
    delete newUsers[name];
    persist({ ...store, users: newUsers });
    setConfirmDelete(null);
    showToast(`🗑️ Usuario "${name}" eliminado`);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = () => {
    const name = loginName.trim();
    const pass = loginPass.trim();
    if (!name || !pass) { setLoginError("Por favor llena todos los campos."); return; }

    const users = store.users || {};
    if (users[name]) {
      if (users[name].password !== pass) { setLoginError("Contraseña incorrecta."); return; }
    } else {
      if (store.registrationLocked) {
        setLoginError("⛔ La inscripción está cerrada. Ya no se permiten nuevos participantes.");
        return;
      }
      const newStore = { ...store, users: { ...users, [name]: { password: pass, predictions: {}, savedAt: null } } };
      persist(newStore);
    }

    setCurrentUser(name);
    const saved = (store.users?.[name]?.predictions) || {};
    setPredictions(saved);
    const realResults = store.realResults || {};
    setAdminResults(realResults);

    const hasSaved = store.users?.[name]?.savedAt;
    setPage(hasSaved ? "results" : "predictions");
    setLoginError("");
  };

  const handleSave = () => {
    const filled = Object.values(predictions).filter(p => p.local !== "" && p.visitante !== "").length;
    if (filled < 1) { showToast("¡Llena al menos un partido!"); return; }

    const newUsers = {
      ...(store.users || {}),
      [currentUser]: {
        ...(store.users?.[currentUser] || {}),
        predictions,
        savedAt: new Date().toISOString(),
      }
    };
    persist({ ...store, users: newUsers });
    showToast("✅ ¡Predicciones guardadas!");
    setTimeout(() => setPage("results"), 1500);
  };

  const handleAdminSave = () => {
    persist({ ...store, realResults: adminResults });
    showToast("✅ Resultados guardados");
  };

  const handleAdminUnlock = () => {
    if (adminKey === ADMIN_KEY) { setAdminUnlocked(true); setAdminKey(""); }
    else showToast("❌ Clave incorrecta");
  };

  const setPred = (matchId, side, val) => {
    const v = val.replace(/[^0-9]/g, "").slice(0, 2);
    setPredictions(p => ({ ...p, [matchId]: { ...p[matchId], [side]: v } }));
  };
  const setReal = (matchId, side, val) => {
    const v = val.replace(/[^0-9]/g, "").slice(0, 2);
    setAdminResults(r => ({ ...r, [matchId]: { ...r[matchId], [side]: v } }));
  };

  const grupos = [...new Set(MATCHES_DATA.map(m => m.grupo))];
  const filteredMatches = filterGrupo === "ALL" ? MATCHES_DATA : MATCHES_DATA.filter(m => m.grupo === filterGrupo);
  const filledCount = Object.values(predictions).filter(p => p?.local !== "" && p?.local !== undefined && p?.visitante !== "" && p?.visitante !== undefined).length;

  // Calc total points per user
  const allUsers = store.users || {};
  const realRes = store.realResults || {};
  const leaderboard = Object.entries(allUsers).map(([name, data]) => {
    const preds = data.predictions || {};
    let pts = 0, exact = 0, result = 0;
    MATCHES_DATA.forEach(m => {
      const p = calcPoints(preds[m.id], realRes[m.id]);
      if (p === 3) { pts += 3; exact++; }
      else if (p === 1) { pts += 1; result++; }
    });
    return { name, pts, exact, result, saved: !!data.savedAt };
  }).filter(u => u.saved).sort((a, b) => b.pts - a.pts || b.exact - a.exact);

  const myPredictions = allUsers[currentUser]?.predictions || {};

  if (!storageLoaded) {
    return (
      <>
        <style>{css}</style>
        <div className="login-page">
          <div className="login-bg" />
          <div style={{color:"var(--gold)",fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:3}}>CARGANDO...</div>
        </div>
      </>
    );
  }

  if (page === "login") {
    return (
      <>
        <style>{css}</style>
        <div className="login-page">
          <div className="login-bg" />
          <div className="login-card">
            <div className="login-header">
              <img src={LOGO_IMG} alt="QuinielerossMX" style={{width:90,height:90,objectFit:"contain",marginBottom:8}} />
              <h1>Quiniela Mundialista<br/>Copa del Mundo 2026<br/>México, EUA y Canadá</h1>
              <p>Ingresa tu nombre y contraseña para participar</p>
            </div>
            <div className="form-group">
              <label>Nombre completo</label>
              <input value={loginName} onChange={e => setLoginName(e.target.value)} placeholder="Ej. Juan García" onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="Tu contraseña" onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>
            <button className="btn-primary" onClick={handleLogin}>ENTRAR</button>
            {loginError && <div className="login-error">{loginError}</div>}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="header">
          <div className="header-logo">
            <img src={LOGO_IMG} alt="logo" style={{width:44,height:44,objectFit:"contain"}} />
            <div>
              <h1>QUINIELA MUNDIAL 2026</h1>
              <p>🇲🇽 🇺🇸 🇨🇦 · 48 selecciones · 72 partidos</p>
            </div>
          </div>
          <div className="header-user">
            <span>👤 {currentUser}</span>
            <button className="btn-logout" onClick={() => { setCurrentUser(null); setPage("login"); setLoginName(""); setLoginPass(""); setPredictions({}); setAdminUnlocked(false); }}>Salir</button>
          </div>
        </header>

        <nav className="nav-tabs">
          {allUsers[currentUser]?.savedAt && <button className={`nav-tab ${page === "results" ? "active" : ""}`} onClick={() => setPage("results")}>📊 Mis Resultados</button>}
          {!allUsers[currentUser]?.savedAt && <button className={`nav-tab ${page === "predictions" ? "active" : ""}`} onClick={() => setPage("predictions")}>✏️ Mis Predicciones</button>}
          <button className={`nav-tab ${page === "tabla" ? "active" : ""}`} onClick={() => setPage("tabla")}>🏅 Tabla General</button>
          <button className={`nav-tab ${page === "others" ? "active" : ""}`} onClick={() => setPage("others")}>👥 Ver Predicciones</button>
          <button className={`nav-tab ${page === "admin" ? "active" : ""}`} onClick={() => { setPage("admin"); }}>⚙️ Admin</button>
        </nav>

        <main className="main">

          {/* ── PREDICCIONES ── */}
          {page === "predictions" && (
            <div>
              <div className="section-title">MIS PREDICCIONES</div>
              <div className="section-sub">Llena los 72 partidos y guarda cuando estés listo. Solo podrás guardar una vez.</div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${(filledCount / 72) * 100}%` }} /></div>
              <div className="filter-bar">
                <button className={`filter-chip ${filterGrupo === "ALL" ? "active" : ""}`} onClick={() => setFilterGrupo("ALL")}>Todos</button>
                {grupos.map(g => <button key={g} className={`filter-chip ${filterGrupo === g ? "active" : ""}`} onClick={() => setFilterGrupo(g)}>Grupo {g}</button>)}
              </div>

              {grupos.map(g => {
                const gMatches = filteredMatches.filter(m => m.grupo === g);
                if (!gMatches.length) return null;
                return (
                  <div key={g} className="jornada-section">
                    <div className="group-header">
                      <div className="group-badge">G{g}</div>
                      <h3>Grupo {g}</h3>
                    </div>
                    {[1,2,3].map(j => {
                      const jMatches = gMatches.filter(m => m.jornada === j);
                      if (!jMatches.length) return null;
                      return (
                        <div key={j}>
                          <div style={{display:"flex",alignItems:"center",gap:8,margin:"10px 0 6px"}}><span style={{background:"var(--card2)",border:"1px solid var(--border)",borderRadius:4,padding:"2px 10px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:11,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase"}}>JORNADA {j}</span><div style={{flex:1,height:1,background:"var(--border)"}} /></div>
                          <div className="matches-grid">
                            {jMatches.map(m => {
                              const p = predictions[m.id] || {};
                              const hasPred = p.local !== undefined && p.local !== "" && p.visitante !== undefined && p.visitante !== "";
                              return (
                                <div key={m.id} className={`match-card ${hasPred ? "has-pred" : ""}`}>
                                  <div className="mc-local">
                                    <span className="mc-flag">{getEmoji(m.local)}</span>
                                    <span className="mc-name">{m.local}</span>
                                  </div>
                                  <div className="mc-center">
                                    <div className="mc-info">
                                      <span className="mc-hora">{m.hora}</span>
                                      <span className="mc-fecha">{m.fecha}</span>
                                      <span className="mc-sede" title={m.sede}>{m.sede}</span>
                                    </div>
                                    <div className="mc-scores">
                                      <input className="mc-input" value={p.local || ""} onChange={e => setPred(m.id, "local", e.target.value)} placeholder="" maxLength={2} />
                                      <span className="mc-sep">-</span>
                                      <input className="mc-input" value={p.visitante || ""} onChange={e => setPred(m.id, "visitante", e.target.value)} placeholder="" maxLength={2} />
                                    </div>
                                  </div>
                                  <div className="mc-visitante">
                                    <span className="mc-flag">{getEmoji(m.visitante)}</span>
                                    <span className="mc-name">{m.visitante}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <div style={{ height: 100 }} />
            </div>
          )}

          {/* ── MIS RESULTADOS ── */}
          {page === "results" && (
            <div>
              <div className="section-title">MIS PREDICCIONES VS RESULTADOS</div>
              <div className="section-sub">Aquí puedes ver cómo van tus predicciones contra los resultados reales.</div>

              {(() => {
                let totalPts = 0, exact = 0, result = 0, pending = 0;
                MATCHES_DATA.forEach(m => {
                  const p = calcPoints(myPredictions[m.id], realRes[m.id]);
                  if (p === 3) { totalPts += 3; exact++; }
                  else if (p === 1) { totalPts += 1; result++; }
                  else if (p === null) pending++;
                });
                return (
                  <div className="stats-row">
                    <div className="stat-card"><div className="stat-val">{totalPts}</div><div className="stat-lbl">Puntos totales</div></div>
                    <div className="stat-card"><div className="stat-val" style={{color:"var(--green)"}}>{exact}</div><div className="stat-lbl">Marcador exacto (3pts)</div></div>
                    <div className="stat-card"><div className="stat-val" style={{color:"var(--gold)"}}>{result}</div><div className="stat-lbl">Resultado correcto (1pt)</div></div>
                    <div className="stat-card"><div className="stat-val" style={{color:"var(--muted)"}}>{pending}</div><div className="stat-lbl">Pendientes</div></div>
                  </div>
                );
              })()}

              <div className="filter-bar">
                <button className={`filter-chip ${filterGrupo === "ALL" ? "active" : ""}`} onClick={() => setFilterGrupo("ALL")}>Todos</button>
                {grupos.map(g => <button key={g} className={`filter-chip ${filterGrupo === g ? "active" : ""}`} onClick={() => setFilterGrupo(g)}>Grupo {g}</button>)}
              </div>

              {filteredMatches.map(m => {
                const myP = myPredictions[m.id] || {};
                const real = realRes[m.id] || {};
                const pts = calcPoints(myP, real);
                const hasReal = real.local !== "" && real.local !== undefined && real.visitante !== "" && real.visitante !== undefined;
                const hasPred = myP.local !== undefined && myP.local !== "";
                return (
                  <div key={m.id} className="results-match-card">
                    {/* equipos apilados */}
                    <div className="rc-teams">
                      <div className="rc-meta">{m.fecha} {m.hora} · Grp {m.grupo}</div>
                      <div className="rc-team"><span className="rc-team-flag">{getEmoji(m.local)}</span>{m.local}</div>
                      <div className="rc-team"><span className="rc-team-flag">{getEmoji(m.visitante)}</span>{m.visitante}</div>
                    </div>
                    {/* marcadores alineados con equipos */}
                    <div className="rc-scores">
                      <div className="rc-score-col">
                        <div className="rc-lbl">REAL</div>
                        <div className="rc-val real">{hasReal ? real.local : <span className="rc-empty">?</span>}</div>
                        <div className="rc-val real">{hasReal ? real.visitante : <span className="rc-empty">?</span>}</div>
                      </div>
                      <div className="rc-score-col">
                        <div className="rc-lbl">PRED</div>
                        <div className="rc-val pred">{hasPred ? myP.local : <span className="rc-empty">—</span>}</div>
                        <div className="rc-val pred">{hasPred ? myP.visitante : <span className="rc-empty">—</span>}</div>
                      </div>
                    </div>
                    {/* puntos */}
                    <div className="rc-pts-cell">
                      <div className={`pts-badge ${pts === 3 ? "pts-3" : pts === 1 ? "pts-1" : pts === 0 ? "pts-0" : "pts-null"}`}>{pts === null ? "?" : pts}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── TABLA GENERAL ── */}
          {page === "tabla" && (
            <div>
              <div className="section-title">TABLA GENERAL</div>
              <div className="section-sub">Clasificación de todos los participantes por puntos.</div>
              {leaderboard.length === 0 ? (
                <div className="empty-state"><div className="icon">📋</div><p>Aún no hay participantes con predicciones guardadas.</p></div>
              ) : (
                <div className="tabla-card">
                  <div className="tabla-header"><span>#</span><span>Participante</span><span style={{textAlign:"center"}}>Puntos</span><span style={{textAlign:"center"}}>Exactos</span></div>
                  {leaderboard.map((u, i) => (
                    <div key={u.name} className={`tabla-row ${u.name === currentUser ? "me" : ""}`}>
                      <div className={`rank rank-${i+1}`}>{i+1}</div>
                      <div className="player-name">{u.name}{u.name === currentUser && <span className="you-tag">TÚ</span>}</div>
                      <div className="pts-col">{u.pts}</div>
                      <div className="pred-col">⭐ {u.exact}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── VER PREDICCIONES ── */}
          {page === "others" && (
            <div>
              <div className="section-title">PREDICCIONES DE OTROS</div>
              <div className="section-sub">Selecciona a un participante para ver sus picks.</div>
              <div className="player-select">
                {Object.entries(allUsers).filter(([n, u]) => u.savedAt && n !== currentUser).map(([name]) => (
                  <button key={name} className={`player-chip ${selectedPlayer === name ? "active" : ""}`} onClick={() => setSelectedPlayer(selectedPlayer === name ? null : name)}>{name}</button>
                ))}
              </div>
              {!selectedPlayer && <div className="empty-state"><div className="icon">👆</div><p>Selecciona un participante arriba para ver sus predicciones.</p></div>}
              {selectedPlayer && (() => {
                const theirPreds = allUsers[selectedPlayer]?.predictions || {};
                return (
                  <>
                    <div style={{marginBottom:16,fontFamily:"'Barlow Condensed'",fontWeight:700,fontSize:18}}>Predicciones de <span style={{color:"var(--gold)"}}>{selectedPlayer}</span></div>
                    <div className="filter-bar">
                      <button className={`filter-chip ${filterGrupo === "ALL" ? "active" : ""}`} onClick={() => setFilterGrupo("ALL")}>Todos</button>
                      {grupos.map(g => <button key={g} className={`filter-chip ${filterGrupo === g ? "active" : ""}`} onClick={() => setFilterGrupo(g)}>Grupo {g}</button>)}
                    </div>
                    {filteredMatches.map(m => {
                      const tp = theirPreds[m.id] || {};
                      const real = realRes[m.id] || {};
                      const pts = calcPoints(tp, real);
                      const hasReal = real.local !== undefined && real.local !== "";
                      const hasPred = tp.local !== undefined && tp.local !== "";
                      return (
                        <div key={m.id} className="results-match-card">
                          <div className="rc-teams">
                            <div className="rc-meta">{m.fecha} {m.hora} · Grp {m.grupo}</div>
                            <div className="rc-team"><span className="rc-team-flag">{getEmoji(m.local)}</span>{m.local}</div>
                            <div className="rc-team"><span className="rc-team-flag">{getEmoji(m.visitante)}</span>{m.visitante}</div>
                          </div>
                          <div className="rc-scores">
                            <div className="rc-score-col">
                              <div className="rc-lbl">REAL</div>
                              <div className="rc-val real">{hasReal ? real.local : <span className="rc-empty">?</span>}</div>
                              <div className="rc-val real">{hasReal ? real.visitante : <span className="rc-empty">?</span>}</div>
                            </div>
                            <div className="rc-score-col">
                              <div className="rc-lbl">PRED</div>
                              <div className="rc-val pred">{hasPred ? tp.local : <span className="rc-empty">—</span>}</div>
                              <div className="rc-val pred">{hasPred ? tp.visitante : <span className="rc-empty">—</span>}</div>
                            </div>
                          </div>
                          <div className="rc-pts-cell">
                            <div className={`pts-badge ${pts === 3 ? "pts-3" : pts === 1 ? "pts-1" : pts === 0 ? "pts-0" : "pts-null"}`}>{pts === null ? "?" : pts}</div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              })()}
            </div>
          )}

          {/* ── ADMIN ── */}
          {page === "admin" && (
            <div>
              <div className="admin-title">PANEL DE ADMINISTRADOR</div>
              <div className="admin-desc">Ingresa la clave de administrador para gestionar la quiniela.</div>
              {!adminUnlocked ? (
                <div style={{maxWidth:380}}>
                  <div className="form-group">
                    <label>Clave de administrador</label>
                    <input type="password" value={adminKey} onChange={e => setAdminKey(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleAdminUnlock()} />
                  </div>
                  <button className="btn-primary" onClick={handleAdminUnlock}>ACCEDER</button>
                </div>
              ) : (
                <>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
                    <div style={{color:"var(--green)",fontSize:13,fontWeight:600}}>✅ Acceso concedido</div>
                  </div>
                  <div className="admin-tabs">
                    <button className={`admin-tab ${adminSubPage === "results" ? "active" : ""}`} onClick={() => setAdminSubPage("results")}>⚽ Resultados</button>
                    <button className={`admin-tab ${adminSubPage === "users" ? "active" : ""}`} onClick={() => setAdminSubPage("users")}>🗑️ Eliminar Usuarios ({Object.keys(allUsers).length})</button>
                  </div>

                  {adminSubPage === "results" && (
                    <>
                      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:16}}>
                        <button className="btn-save" onClick={handleAdminSave}>GUARDAR RESULTADOS</button>
                      </div>
                      <div className="filter-bar">
                        <button className={`filter-chip ${filterGrupo === "ALL" ? "active" : ""}`} onClick={() => setFilterGrupo("ALL")}>Todos</button>
                        {grupos.map(g => <button key={g} className={`filter-chip ${filterGrupo === g ? "active" : ""}`} onClick={() => setFilterGrupo(g)}>Grupo {g}</button>)}
                      </div>
                      {filteredMatches.map(m => {
                        const r = adminResults[m.id] || {};
                        return (
                          <div key={m.id} className="admin-match">
                            <div className="mc-local"><span className="mc-flag">{getEmoji(m.local)}</span><span className="mc-name">{m.local}</span></div>
                            <div className="mc-center">
                              <div className="mc-info"><span className="mc-hora">{m.hora}</span><span className="mc-fecha">{m.fecha}</span></div>
                              <div className="mc-scores">
                                <input className="mc-input" value={r.local || ""} onChange={e => setReal(m.id, "local", e.target.value)} placeholder="0" maxLength={2} />
                                <span className="mc-sep">-</span>
                                <input className="mc-input" value={r.visitante || ""} onChange={e => setReal(m.id, "visitante", e.target.value)} placeholder="0" maxLength={2} />
                              </div>
                            </div>
                            <div className="mc-visitante"><span className="mc-flag">{getEmoji(m.visitante)}</span><span className="mc-name">{m.visitante}</span></div>
                          </div>
                        );
                      })}
                      <div style={{height:80}} />
                      <div className="save-bar">
                        <div className="save-info">Guardando resultados reales del mundial</div>
                        <button className="btn-save" onClick={handleAdminSave}>GUARDAR RESULTADOS</button>
                      </div>
                    </>
                  )}

                  {adminSubPage === "users" && (
                    <>
                      {/* Bloqueo de inscripciones */}
                      <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:10,padding:"16px 20px",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
                        <div>
                          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"var(--text)",letterSpacing:1}}>INSCRIPCIÓN DE NUEVOS USUARIOS</div>
                          <div style={{fontSize:12,color:"var(--muted)",marginTop:4}}>
                            {store.registrationLocked ? "🔒 Bloqueada" : "🔓 Abierta"}
                          </div>
                        </div>
                        {/* Switch toggle */}
                        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                          <span style={{fontSize:12,color:"var(--muted)",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600}}>
                            {store.registrationLocked ? "BLOQUEADA" : "ABIERTA"}
                          </span>
                          <div
                            onClick={() => {
                              const locked = !store.registrationLocked;
                              persist({ ...store, registrationLocked: locked });
                              showToast(locked ? "🔒 Inscripción bloqueada" : "🔓 Inscripción abierta");
                            }}
                            style={{
                              width:56, height:30, borderRadius:15, cursor:"pointer",
                              backgroundColor: store.registrationLocked ? "#ef4444" : "#22c55e",
                              position:"relative", transition:"background-color 0.3s",
                              flexShrink:0, display:"block",
                              border:"2px solid rgba(255,255,255,0.15)"
                            }}
                          >
                            <div style={{
                              position:"absolute",
                              top:3,
                              left: store.registrationLocked ? 26 : 3,
                              width:20, height:20, borderRadius:"50%",
                              backgroundColor:"#ffffff",
                              transition:"left 0.25s ease",
                              boxShadow:"0 2px 6px rgba(0,0,0,0.4)"
                            }} />
                          </div>
                        </div>
                      </div>
                      <div style={{fontSize:13,color:"var(--muted)",marginBottom:16}}>
                        {Object.keys(allUsers).length} usuarios registrados · Eliminar borra todas sus predicciones
                      </div>
                      <div className="users-list">
                        {Object.entries(allUsers).length === 0 && (
                          <div className="empty-state"><div className="icon">👤</div><p>No hay usuarios registrados.</p></div>
                        )}
                        {Object.entries(allUsers).map(([name, data]) => {
                          const preds = data.predictions || {};
                          const filled = Object.values(preds).filter(p => p?.local !== "" && p?.local !== undefined).length;
                          return (
                            <div key={name} className="user-row">
                              <div className="user-row-info">
                                <div className="user-avatar">👤</div>
                                <div>
                                  <div className="user-row-name">{name}</div>
                                  <div className="user-row-meta">{filled} predicciones · {data.savedAt ? `Guardado ${new Date(data.savedAt).toLocaleDateString("es-MX")}` : "Sin guardar"}</div>
                                </div>
                              </div>
                              <div style={{display:"flex",alignItems:"center",gap:10}}>
                                <span className={`user-status ${data.savedAt ? "saved" : "pending"}`}>{data.savedAt ? "✓ Guardado" : "Pendiente"}</span>
                                <button className="btn-delete" onClick={() => setConfirmDelete(name)}>🗑️ Eliminar</button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {/* CONFIRM DELETE MODAL */}
          {confirmDelete && (
            <div className="confirm-overlay" onClick={() => setConfirmDelete(null)}>
              <div className="confirm-card" onClick={e => e.stopPropagation()}>
                <div className="confirm-icon">⚠️</div>
                <div className="confirm-title">ELIMINAR USUARIO</div>
                <div className="confirm-msg">¿Estás seguro de que deseas eliminar a <span className="confirm-name">{confirmDelete}</span>? Se borrarán todas sus predicciones y no podrá recuperarlas.</div>
                <div className="confirm-btns">
                  <button className="btn-cancel" onClick={() => setConfirmDelete(null)}>Cancelar</button>
                  <button className="btn-confirm-delete" onClick={() => handleDeleteUser(confirmDelete)}>SÍ, ELIMINAR</button>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* SAVE BAR for predictions */}
        {page === "predictions" && (
          <div className="save-bar">
            <div className="save-info"><span>{filledCount}</span> / 72 partidos llenados · Una vez que guardes, no podrás editar</div>
            <button className="btn-save" onClick={handleSave}>GUARDAR PREDICCIONES</button>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}
