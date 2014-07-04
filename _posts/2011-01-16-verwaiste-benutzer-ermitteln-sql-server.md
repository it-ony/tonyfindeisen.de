---
layout: post
title:  "verwaiste Benutzer ermitteln - SQL Server"
date:   2011-01-16 00:00:00
tags: SQL
hasCode: true
---

Wer oft Backups von MS-SQL Datenbanken von einem Server auf einen anderen aufspielt, 
kennt das folgende Problem: Trotz der Korrekten konfiguration der Benutzerrechte sowohl 
auf Datenbank als auch auf Serverebene kann der Benutzer nicht auf die Daten zugreifen.

Der MS-SQL Server speichert die Logininformationen für die entsprechende Datenbank in der 
Datenbank selbst und somit auch in dem erstellten Backup. Wird das Backup von einem 
Server auf einem anderen Server zurückgespielt, werden die Anmeldeinformationen der 
Datenbank wiederhergestellt. Wenn der Datenbankbenutzer schon auf dem Server angelegt 
ist kann zwar der Zugriff für die Datenbank gesetzt werden jedoch erfolgt dieser nicht.

Für den Datenbankadministrator sieht es auf den ersten Blick aus als seien die Rechte 
korrekt gesetzt, da die Benutzernamen übereinstimmen. Intern verwendet der SQL-Server 
logischerweise IDs, welche sich auf den Servern unterscheiden.

Mit der gespeicherten Prozedur sp_change_users_login des SQL-Servers können die nicht 
übereinstimmenden Anmeldeinformationen der ausgewählten Datenbank angezeigt und 
korrigiert werden. Das folgende Skript fasst diese Informationen für alle Datenbanken 
des Servers zusammen. Dazu werden nacheinander alle Datenbanken ausgewählt und nach 
verwaisten Benutzern abgefragt. Das Ergebnis wird in einen tempöräre Tabelle geschrieben 
und am Ende ausgegeben.

``` sql
DECLARE @UNMAPPEDUSER TABLE
	(
		DB NVARCHAR(128) NULL,
		login NVARCHAR(128),
		SID VARBINARY(85) NULL
	) 

DECLARE DB CURSOR FOR
	SELECT
		name
	FROM
		sys.sysdatabases
	
OPEN DB

DECLARE @DBName VARCHAR(128)

DECLARE @SID VARBINARY(85)
DECLARE @login NVARCHAR(128)

FETCH NEXT FROM DB
	INTO @DBName
	
WHILE @@FETCH_STATUS = 0
	BEGIN
		-- change Database
		EXEC('USE ' + @DBName)
		

		INSERT INTO @UNMAPPEDUSER 
			(login, SID)
		EXEC sp_change_users_login 'Report'	
		
		UPDATE
			@UNMAPPEDUSER
		SET 
			DB = @DBName
		WHERE
			DB IS NULL
		
		
		FETCH NEXT FROM DB 
			INTO @DBName
	END

CLOSE DB
DEALLOCATE DB

SELECT
	*
FROM
	@UNMAPPEDUSER
```

Über die gespeicherte Prozedur können dann die notwendigen Änderungen ausgeführt werden. 
Der Artikel [ms174378](http://msdn.microsoft.com/de-de/library/ms174378.aspx) von 
Microsoft beschreibt das vorgehen im Detail. Für alle die schnell zum Ziel kommen 
wollen hier der entsprechende Code.

``` sql
-- wechsel der Datenbank
USE <Datenbank>

-- SIDs gleichsetzen
EXEC sp_change_users_login 'AUTO_FIX', '<Username>'
```


