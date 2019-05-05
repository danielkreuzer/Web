# WDP Projekt von Aigner Dominik (S1610307046)

* Projekt-Name: GH-Website
* Projekt-Typ: Webapp
* Gruppenprojekt: Ja (Daniel Kreuzer)
* Zeitaufwand (h): 220

## Externe JS/CSS Bibliotheken
#### Bootstrap
Styling des Frontends
#### W3.css
Styling des Backends
#### Font Awesome
CSS icons
#### JQuery
Bibliothek für AJAX-Abfragen und Vereinfachung der DOM-Navigation
#### bcrypt-nodejs
Passwort Hashing
#### bluebird
Promises in Node.js
#### body-parser
Verarbeitet den body und stellt ihn als Objekt im Node.js Request bereit
#### connect-flash
Flash Nachrichten in der Login-Maske
#### cookie-parser
Lesen von Cookies aus dem Anfrageheader
#### cors
Ermöglicht Cross-Origin-Requests.
#### ejs
HTML-Templating für Node.js
#### errorhandler
Einstellen der Errortiefe (Produktion keine Errors, Dev alle Errors auf die Konsole)
#### express
Webserver für Node.js
#### express-fileupload
Erweiterung für express zum Fileupload
#### express-session
Erweiterung für express zum Verwalten von Sessions
#### file-type
Ermittelt den Dateityp einer Datei anhand des Inhalts
#### fs
Filesystem Zugriff am Server (In unserem Fall zum Bilder speichern)
#### http / https
Zum Starten vom Server in der secure / non-secure Variante.
#### moment
Zum Parsen des PayPal Datums in das JS Datum.
#### morgan
Loggt alle Http-Requests auf die Konsole (nur im DEV environment)
#### mysql
Framework zum Abfragen der verwendeten MySQL Datenbank
#### passport
Library zur Authentifizierung in express
#### passport-local
Erweiterung zu passport für lokalen Login.
#### path
Manipulation von Pfaden
#### paypal-rest-sdk
Einbindung von PayPal zur Zahlung und Rechnungserstellung
#### session-memory-store
Bugfix von express session memory store. (memory-store von express hat memory leak)
#### trix
Rich-Text-Editor zum Editieren des Texts für Beiträge


## Projektbeschreibung
Eine Website für den Gasthof Kreuzer

### Funktionen der Website:
* Webpräsentation des Gasthofs (Übersicht, Gasthof-Detailseite, Kellerbar-Detailseite)
* Auf den Detailseiten werden Posts angezeigt die über eine Admin-Page verwaltet werden können
* Diese Posts enthalten ein Bild oder eine Bildergalerie und einen stylebaren Text
* Webshop
* Der Webshop besteht aus Produktübersicht, Warenkorb und Bezahlseite
* Bezahlung wird über Pay-Pal durchgeführt
* Bestellungen werden ohne Kundenkonto durchgeführt
* Produkte werden über Admin Page angelegt, die Anzahl der Verfügbaren Produkte wird auch dort hinterlegt
* Über Admin Page können alle durchgeführten Bestellungen angzeigt werden

#### Eingesetzte Werkzeuge:
* Bootstrap
* W3.css
* MySQL
* PayPal
* Node.js
* HTML, CSS, JS