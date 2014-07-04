---
layout: post
title:  "reguläre Ausdrücke in XSLT 1.0"
date:   2011-04-27 00:00:00
tags: XSLT
hasCode: true
---

Da der im .NET-Framework enthaltene XSL-Prozessor nur XSLT 1.0 unterstütz können nativ 
keine regulären Ausdrücke für die Transformation verwendet werden.

Mithilfe von eingebetteten Skripen und den Klassen aus dem Namespace
`System.Text.RegularExpressions` können reguläre Ausdrücke auch in XSLT 1.0 unter
Verwendung des Microsoft Prozessors verwendet werden.

``` xml
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
    xmlns:script="urn:my-scripts"
>
	<xsl:output method="xml" indent="yes"/>

	<xsl:template match="/*">
		<xsl:value-of select="script:getRegex(@myString, '(\w+)\s.*')"/>
	</xsl:template>

	<msxsl:script implements-prefix="script" language="VB">
		<![CDATA[
    
		public function getRegex(s as string, regEx as string) as string
		  return System.Text.RegularExpressions.Regex.Match(s, regEx, Text.RegularExpressions.RegexOptions.IgnoreCase).Groups(1).Value
		end function
	
    ]]>
	</msxsl:script>

</xsl:stylesheet>
```

Damit der XSL-Prozessor die Funktionen benutzen darf, muss für XSLT-Setting 
enableScript aktiviert werden. Der folgende Code erzeugt einen neue Instanz des 
XSL-Prozessors und setzt die entsprechende Eigenschaft.

``` 
'benötigte Namespaces
Imports System.Xml.Xsl

'Prozessor erstellen 
Dim xslt As New XslCompiledTransform()
xslt.Load(XSLTUri, New XsltSettings(False, True), New XmlUrlResolver())

```
