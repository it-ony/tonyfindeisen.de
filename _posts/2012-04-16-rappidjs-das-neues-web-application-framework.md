---
layout: post
title:  "rAppid.js - das neues Web Application Framework"
date:   2012-04-16 00:00:00
tags: XSLT
---

rAppid.js ist ein auf Javascript und XML basierendes Anwendungsframework, welches 
Anwendungen komplett im Client (Browser) rendert. Der Server ist nur für das ausliefern 
von statischen, wiederverwendbaren Javascript Dateien zuständig. Eine rAppid.js bekommt 
seine Daten immer von einer Datenquelle z.B. einem RestDatasource.

rAppid.js wird seit dem 01. Februar 2012 von mir und Marcus Krejpowicz entwickelt und 
kann schon beachtilich viele Features hervorweisen. Zu den Hauptfeatures gehören:

* Dependency loading
* Shadow DOM
* Code Behind
* Model-View-Binding & View-Model-Binding
* Dependency Injection
* virtuelle Attribute

sowie viele weitere. Die komplette Liste der Features kann unter 
[http://rappidjs.com/features.html](http://rappidjs.com/features.html) eingesehen werden.

rAppid.js Anwendungen laufen komplett im Browser ab und laden ihre Daten dynamisch nach. 
Da dies aus SEO technischer Sicht eine Katastophe ist, unterstützt rAppid.js das rendern 
von HTML Snapshots auf einem node.js Server und löst somit das hash-bang problem.

Schaut euch den Quelltext in meinem [github](https://github.com/it-ony/rAppid.js) 
repository an. Eine Beispielanwendung findet ihr live unter 
[http://todo.rappidjs.com](http://todo.rappidjs.com) oder als Quellcode 
im git von Marcus. 