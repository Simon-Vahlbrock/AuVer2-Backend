# AuVer2-Backend

## Getting Started

Um das Backend starten zu können, müssen Sie folgende Schritte durchführen:

- Das Projekt wurde in Node.js Version 18+ entwickelt
- Installieren Sie alle Dependencies
- Verbindung der mySQL Datenbank mit dem Backend herstellen.
    - Dazu müssen die Dateien initDevData.ts und database.ts angepasst werden.
    - Zudem kann es vorkommen, dass die lokale Datenbank Anfragen dieses Backends ablehnt. Da müssen de Berechtigungen
      des Users angepasst werden
- Um Beispieldatensätze zu erzeugen, muss das Script ´dev-data´ ausgeführt werden
- Danach kann das Script ´start´ ausgeführt werden.

> Ein Benutzerkonto muss über den Endpunkt `/users/register` angelegt werden. Der Body muss folgendes Enthalten:
>```json
>{
>   "userName": "simon",
>   "password": "1234"
>}
>```
