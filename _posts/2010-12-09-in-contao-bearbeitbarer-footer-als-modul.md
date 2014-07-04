---
layout: post
title:  "bearbeitbarer Footer in Contao als Modul"
date:   2010-12-09 00:00:00
tags: Contao
---

In Contao können Inhalte für eine Seite auf zwei Arten erzeugt werden:

1. Entweder der Inhalt wird durch ein Modul generiert, welches in dem verwendeten 
   Seitenlayout der Seite an in dem entsprechenden Inhaltsbereich (Kopfzeile, Fußzeile, 
   Hauptspalte, Links, Rechts, eigener Bereich) eingebunden ist oder
2. der Inhalt wird durch einen oder mehreren Artikel(n) im entsprechenden Inhaltsbereich 
   angezeigt. Für die Verwendung eines Footers, welcher Seitenunabhängig immer den 
   gleichen Inhalt anzeigen sind die beiden Methoden nicht wirklich praktikabel.

Bei der Verwendung der ersten Methode kommt nur das Modul vom Typ "eigener HTML Code" 
in Frage. Für die Inhaltsgestaltung wird d.h. ein entsprechendes Modul angelegt und 
der Inhalt direkt in HTML codiert.

Der zweite Ansatz setzt die Zuweisung des Moduls "Artikel" für die Fußzeile im 
Seitenlayout vorraus. Der Inhalt des Footers muss für jede Seite als Artikel mit dem 
Zielbereich "Fußzeile" angelegt werden. Durch Duplizieren der entsprechenden 
"Footer"-Artikel geht diese Methode einfach von der Hand; erweist sich jedoch als 
sehr fehleranfällig und aufwändig bei der Seitenneuanlage oder bei 
Inhaltsänderungen des Footers. Der Änderungsaufwand des Footers kann durch die Verwendung 
von Artikelaliase minimiert werden.

Vorraussetzungen
---

Die Lösung der folgenden Punkte sind Vorraussetzung für einen praktikable Verwaltung 
des Footers:

* Einbindung des Footers über die Seitenstruktur
* WYSIWYG-Inhaltsverwaltung über das Backend
* Änderung des Inhalts an zentraler Stelle

Lösungsansatz
---

Durch Kombination der beschriebenen Methoden unter der Zuhilfenahme von Insert-Tags 
kann der Footer im Backend an zentraler Stelle bearbeitet werden. Hier die Anleitung 
im Telegrammstil:

* Erstelle eine neue Seite in der Seitenstruktur, welche weder im Menü noch in der 
  Sitemap angezeigt wird
* Wechsel in die Artikelansicht und Hover mit der Maus über das Bearbeitensymbol des 
  automatisch angelegten Artikels der neuen Seite
* Merke dir die Artikel-ID, welche beim Hovern angezeigt wird (in diesem Beispiel ID 19)
* Erstelle ein neues Modul vom Typ "eigener HTML-Code" mit dem Namen "Footer" und 
  dem Inhalt "{{insert_article::19}}", wobei die 19 durch die gemerkte Artikel-ID 
  ersetzt wird und das Leerzeichen zwischen den schließenden Klammern entfernt werden muss
* Füge deinem Seitenlayout das Modul "Footer" der Fußzeile hinzu

Fertig! Sollte ich auch mal mal bei mir implementieren...