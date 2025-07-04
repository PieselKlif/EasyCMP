(function () {
  function createCookieBanner() {
    const analyticstTag = window.analyticstTag || "";
    const marketingTag = window.marketingTag || "";
    const politykaUrl = window.politykaUrl || "/";

    const banner = document.createElement("div");
    banner.id = "cookie-banner";

    banner.innerHTML = `
      <h2>Zarządzaj zgodą na pliki cookie</h2>
      <p class="cookie-description">
        Używamy plików cookie w celu poprawy funkcjonalności, analizy ruchu i personalizacji treści. <a href="${politykaUrl}">Polityka prywatności</a><br> Wybierz, na co się zgadzasz:
      </p>
      <form id="cookie-form">
        <div class="cookie-category cookie-disabled">
          <label>
            <input type="checkbox" checked disabled />
            Niezbędne
          </label>
          <span>Pliki cookie wymagane do działania strony. Nie można ich wyłączyć.</span>
        </div>
        <div class="cookie-category">
          <label>
            <input type="checkbox" name="analytics" />
            Analityczne
          </label>
          <span>Pomagają nam zrozumieć, jak użytkownicy korzystają z witryny.</span>
        </div>
        <div class="cookie-category">
          <label>
            <input type="checkbox" name="marketing" />
            Marketingowe
          </label>
          <span>Służą do wyświetlania spersonalizowanych reklam.</span>
        </div>
        <div class="cookie-buttons">
          <button type="button" class="accept-selected">Akceptuj wybrane</button>
          <button type="button" class="accept-all">Zaakceptuj wszystkie</button>
        </div>
      </form>
    `;
    document.body.appendChild(banner);

    document.querySelector(".accept-selected").onclick = acceptSelected;
    document.querySelector(".accept-all").onclick = acceptAll;

    const button = document.createElement("button");
    button.id = "showCookieBaner";

    button.innerHTML = `
      <svg fill="currentColor" width="24" height="24" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
        <path d="M225.94092,114.89844a15.91968,15.91968,0,0,0-13.46094-3.085,23.99389,23.99389,0,0,1-29.27832-23.14063,15.94771,15.94771,0,0,0-15.87354-15.875A23.99268,23.99268,0,0,1,144.187,43.51953a16.01308,16.01308,0,0,0-15.562-19.51367c-.21729-.001-.43018-.00195-.647-.00195A104,104,0,1,0,231.99463,127.3623v-.001A15.97461,15.97461,0,0,0,225.94092,114.89844ZM75.51465,99.51465a12.0001,12.0001,0,1,1,0,16.9707A12.00062,12.00062,0,0,1,75.51465,99.51465Zm24.9707,72.9707a12.0001,12.0001,0,1,1,0-16.9707A12.00062,12.00062,0,0,1,100.48535,172.48535Zm27.0293-40a12.0001,12.0001,0,1,1,16.9707,0A12.00019,12.00019,0,0,1,127.51465,132.48535Zm36.9707,48a12.0001,12.0001,0,1,1,0-16.9707A12.00062,12.00062,0,0,1,164.48535,180.48535Z"/>
      </svg>
    `;

    button.onclick = toggleCookieBaner;
    document.body.appendChild(button);
  }

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    return document.cookie.split("; ").reduce((r, v) => {
      const parts = v.split("=");
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "");
  }

  function enableFeatures(consent) {
    // console.log("Zgody użytkownika:", consent);

    // --- ANALYTICS ---
    const gaScript = document.querySelector(`script[src*="gtag/js?id=${analyticstTag}"]`);
    if (!consent.analytics && gaScript) {
      gaScript.remove();
      delete window.gtag;
      delete window.dataLayer;
      // console.log("❌ Analityka wyłączona");
    }

    if (consent.analytics && !window.gtag && !(analyticstTag == null || analyticstTag == "")) {
      // console.log("🔍 Analityka aktywna");

      const gtagScript = document.createElement("script");
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticstTag}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);

      gtagScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', analyticstTag);
      };
    }

    // --- MARKETING ---
    const adsScript = document.querySelector(`script[src*="${marketingTag}"]`);
    if (!consent.marketing && adsScript) {
      adsScript.remove();
      // console.log("❌ Marketing wyłączony");
    }

    if (consent.marketing && !document.querySelector(`script[src*="${marketingTag}"]`) && !(marketingTag == null || marketingTag == "")) {
      // console.log("🎯 Marketing aktywny");

      const marketingScript = document.createElement("script");
      marketingScript.src = `https://www.googletagmanager.com/gtag/js?id=${marketingTag}`;
      marketingScript.async = true;
      document.head.appendChild(marketingScript);

      marketingScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;

        gtag('js', new Date());
        gtag('config', marketingTag);
      };
    }
  }

  function acceptSelected() {
    const form = document.getElementById("cookie-form");
    const consent = {
      necessary: true,
      analytics: form.analytics.checked,
      marketing: form.marketing.checked,
    };
    setCookie("cookie_consent", JSON.stringify(consent), 365);
    document.getElementById("cookie-banner").classList.remove("show");
    enableFeatures(consent);
  }

  function acceptAll() {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setCookie("cookie_consent", JSON.stringify(consent), 365);
    document.getElementById("cookie-banner").classList.remove("show");
    enableFeatures(consent);
    const form = document.getElementById("cookie-form");
    form.analytics.checked = consent.analytics;
    form.marketing.checked = consent.marketing;
  }

  window.toggleCookieBaner = function () {
    const saved = getCookie("cookie_consent");
    if (saved) {
      document.getElementById("cookie-banner").classList.toggle("show");
    }
  };

  window.onload = function () {    
    createCookieBanner();
    const saved = getCookie("cookie_consent");
    if (saved) {
      try {
        const consent = JSON.parse(saved);
        enableFeatures(consent);

        const form = document.getElementById("cookie-form");
        form.analytics.checked = consent.analytics;
        form.marketing.checked = consent.marketing;
      } catch (e) {
        console.warn("Błąd parsowania cookie_consent:", e);
      }
    } else {
      document.getElementById("cookie-banner").classList.add("show");
    }
  };
})();
