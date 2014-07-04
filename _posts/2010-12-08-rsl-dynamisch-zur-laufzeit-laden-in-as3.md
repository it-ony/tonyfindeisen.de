---
layout: post
title:  "RSL dynamisch zur Laufzeit laden in AS3"
date:   2010-12-08 00:00:00
tags: AS3 Flash Flex
categories: code
hasCode: true
---

In FlexBuilder 3 können AS3-Anwendungen erstellt werden, welche eine Bibliothek (RSL) 
zur Laufzeit nachladen. Die Runtime Shared Libray liegt als SWC vor und wird automatisch 
beim initialisieren der Anwendung geladen.

In Flash CS4 gibt zwar die Möglichkeit externe Bilbiotheken zu "linken" - das Laden 
übernimmt der FlashPlayer jedoch nicht. Folgende Möglichkeiten gibt es externe 
Bibliotheken in Flash einzubinden:

1. Wird eine RSL in den Bibliothekspfad aufgenommen werden alle in dem Projekt verwendeten 
   Klassen während der Veröffentlichung in die SWF-Datei mit ein kompiliert.
2. Bei der Verwendung der Einstellung Pfad zu externen Bibliotheken prüft der Kompiler das 
   Vorhandensein der entsprechenden Klassen kompiliert diese jedoch nicht in die SWF-Datei 
   ein.

Bei der ersten Variante können alle im Projekt verwendeten Klassen zur Laufzeit erzeugt 
werden. Wird die Bibliothek als externe Bibliothek eingebunden oder eine Klasse dynamisch 
instanziiert, welche in dem Projekt nicht benutzt schlägt die Erstellung der Instanz fehl.

``` as3
import de.it-ony.as3.classInRSL;
import de.it-ony.as3.classInRSLunused;

public class test
{
    public test()
    {
        var c1:classInRSL = new classInRSL();
        var c2:classInRSL = createInstance("de.it-ony.as3.classInRSL");
        
        var c3:Object = createInstance("de.it-ony.as3.classInRSLunused");
    }
    
    public static createInstance(className:String):Object
    {
        var class:Class = getDefinitionByName(str) as Class;
            return new class(); 
    }
}
```

Bibliothek laden
---

Um Klassen aus externen Bibliotheken benutzen in der eigenen Anwendung nutzen zu können 
muss diese in die ApplicationDomain geladen werden. In dem folgenden Quellcode wird über 
die Loader-Klasse eine SWF in die aktuelle ApplicationDomain geladen. Die Events zur 
Verarbeitung von Fehlern und  zur Reaktion auf eine vollständig geladene Bibliothek 
müssen natürlich behandelt werden.

``` as3

private function loadRSL(source:String):void
{

	var loader:Loader = new Loader();
	
	// FIXME LoadComplete-Event verarbeiten
	// loader.contentLoaderInfo.addEventListener(Event.COMPLETE, load_COMPLETE);
	
	// FIXME Fehler verarbeiten
	// loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, load_ERROR);
	
	var context:LoaderContext = new LoaderContext();
	context.checkPolicyFile = true;
	
	// setzen der Ziel-ApplicationDomain
	context.applicationDomain = ApplicationDomain.currentDomain;
	
	_loader.load(new URLRequest(source), context);	
}
```

Wurde die RSL vollständig geladen stehen der ApplicationDomain alle in der Bibliothek 
vorhandenen Klassen zur Verfügung. Als Bibliothek kann neben SWC-Dateien auch SWF-Dateien 
verwendet werden.

Bei SWC-Dateien, welche mit Flex erstellt wurden und in einem Flash-Projekt benutzt 
werden sollen, kann es notwendig sein die SWF-Datei aus der SWC zu extrahieren. Dazu 
muss die SWC-Datei mit einem Entpackprogramm (7Zip, WinRaR, ...) geöffnet werden und 
die darin enthalten library.swf extrahiert werden.