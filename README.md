Pobieranie projektu:
git clone https://github.com/kicek731/ZglaszanieUsterek.git

Commitowanie:

   1. git pull origin main
   2. git add .
   3. git commit -m "opis"
   4. git push

   ----------

   Ostatnie zmiany (Aktualizacja architektury i API)
   `NavigationContainer` dla poprawnej obsługi ścieżek oraz `QueryClientProvider` do zarządzania stanem asynchronicznym (TanStack Query).
`db.json`, który pełni rolę lokalnego backendu obsługiwanego przez JSON Server.
Podpięto logikę `GET` (pobieranie listy), `POST` (dodawanie nowych zgłoszeń) oraz `PUT` (edycja statusu usterki).

instrukcja obsługi:
1.
npm install @tanstack/react-query axios
npm install -g json-server
2.
ListScreen.js, FormScreen.js oraz EditStatusScreen.js. - zmień w tych plikach adres ip na swój
3.
otworz nowy terminal i uruchom: json-server --watch db.json --host 0.0.0.0 --port 3000
i odpal: npx expo start -c

---------------
Brak szczegółów zgłoszenia: Obecnie po kliknięciu w usterkę na liście, szczegóły (takie jak pełny opis) nie wyświetlają się jeszcze poprawnie w dedykowanym widoku.

Integracja aparatu: Wymagane jest spięcie ekranu formularza z fizycznym aparatem urządzenia, aby dołączać zdjęcia do wysyłanego zapytania POST.
