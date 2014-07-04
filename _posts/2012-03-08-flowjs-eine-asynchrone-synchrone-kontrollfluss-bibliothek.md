---
layout: post
title:  "flow.js - eine asynchrone, synchrone Kontrollfluss Bibliothek"
date:   2012-03-08 00:00:00
tags: XSLT
---

Flow.js ist eine Kontrollfluss Bibliothek, welche komplett Test-Driven von mir entwickelt 
wurde. Die Library kann sowohl im Browser als auf auf einem Node.js server betrieben 
werden.

Zu den Features zählen:

* Sequenz
* Parallel
* Parallel forEach
* Unterbrechung

Die Bibliothek ist unkomprimiert 10kb klein und kommt mit knapp 900 Zeilen Tests, welche 
ebendfalls in Javascript mit Mocha und Chai geschrieben sind.

``` js
flow()
    .seq("a", function() {
        // do something
    }
    .par({
        b: function() {
            // do something synchron in parallel ...

            // end flow on condition
            if (condition) {
                this.end(); // end flow after return statement
                return -2;
            }

            return 2;
        },
        c: function(cb) {
            // ... with something asynchron

            // end flow the asynchron way
            this.end(null, 3); // or cb.end(null, 3) or cb(null, 3, true) or this(null, 3, true)
        }
    })
    .seq("e", function() {
        // this would executed, because either b or c will end the flow
    }
    .exec(function(err, results) {
        /* this function is called on
           * error thrown in synchron method
           * error object passed in asynchron method
           * this.end() is called
           * flow is executed completely
        */
    });
```

Flow.js wurde entwickelt um mehre Server-Anfragen beim Laden von Daten in rAppid.js zu 
parallelisieren. Mit der fortgeschrittenen Entwicklung von rAppid.js hat sich flow.js 
als hervorangender Wegbegleiter erwiesen. 

Den Quelltext von flow.js findet ihr in meinem Github Repository unter 
[https://github.com/it-ony/flow.js](https://github.com/it-ony/flow.js). Weiterhin könnt ihr flow.js über npm installieren.
 
``` bash
npm install -g flow.js
```
