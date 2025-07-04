# EasyCMP
Lekki Cookie Consent Manager (RODO/GDPR)

EasyCMP to prosty, lekki i łatwy do osadzenia na stronie baner cookies zgodny z RODO (GDPR), z obsługą kategorii zgód: Niezbędne, Analityczne i Marketingowe.

## 🚀 Funkcje
- 🔒 Obsługa zgód per kategoria (Niezbędne, Analityka, Marketing)
- 📊 Dynamiczne ładowanie Google Analytics/Ads tylko przy zgodzie
- 🎯 Możliwość ponownego wyświetlenia banera
- 🎨 Responsywny i lekki design bez bibliotek zewnętrznych
- 📁 Łatwy do integracji w dowolnej stronie HTML

## 🔧 Szybki start
1. Dołącz skrypt i styl do strony oraz zdefiniuj globalne zmienne:

	```html
	<script src="https://raw.githubusercontent.com/PieselKlif/EasyCMP/refs/heads/main/dist/script.min.js" defer></script>
	<link rel="stylesheet" href="https://raw.githubusercontent.com/PieselKlif/EasyCMP/refs/heads/main/dist/style.min.css">
	<script>
	  const analyticstTag = "G-XXXXXXX"; // ID Google Analytics
	  const marketingTag = "AW-XXXXXXX"; // (opcjonalnie) ID Google Ads
	  const politykaUrl = "/polityka-prywatnosci.html"; // Link do Twojej polityki prywatności
	</script>
	```
	
2. Gotowe! Baner pokaże się automatycznie przy pierwszej wizycie.

## 📝 Licencja
Projekt dostępny na licencji MIT. Możesz swobodnie używać, modyfikować i rozpowszechniać.

## 🤝 Wsparcie
Masz sugestię, znalazłeś błąd? Stwórz [issue](https://github.com/PieselKlif/EasyCMP/issues) lub napisz do mnie.
