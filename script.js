/* ================================================================
   MIRACLE COFFEE & SHOP â€” JAVASCRIPT (script.js)
   ================================================================
   Ä°Ã§erdiÄŸi fonksiyonlar:
   1. Mobil Hamburger MenÃ¼ (AÃ§/Kapat)
   2. KaranlÄ±k Mod (Dark Mode) â€” LocalStorage ile kalÄ±cÄ±
   3. MenÃ¼ Filtreleme (Kategori Sekmeleri)
   4. Sayfa Ä°Ã§i Linklerde YumuÅŸak KaydÄ±rma (Smooth Scroll)
   5. Sticky Header GÃ¶lge Efekti (Scroll)
   6. Web3Forms Form GÃ¶nderme (Fetch API ile)
   7. Rezervasyon AlanlarÄ± â€” Select ile GÃ¶ster/Gizle
   ================================================================ */


/* ============================================================
   1. SAYFA YÃœKLENDÄ°ÄžÄ°NDE Ã‡ALIÅžACAK KODLAR
   ============================================================
   DOMContentLoaded: HTML tamamen yÃ¼klendiÄŸinde tetiklenir.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

    // ----- HTML'den gerekli elementleri seÃ§iyoruz -----
    const hamburgerBtn  = document.getElementById('hamburger-btn');  // Hamburger buton
    const navList       = document.getElementById('nav-list');       // Navigasyon listesi
    const themeToggle   = document.getElementById('theme-toggle');   // Dark mode butonu
    const themeIcon     = document.getElementById('theme-icon');     // Ä°kon (ay/gÃ¼neÅŸ)
    const headerEl      = document.getElementById('header');         // Header (sticky)
    const navLinks      = document.querySelectorAll('.nav__link');  // TÃ¼m nav linkleri
    const contactForm   = document.getElementById('contact-form');  // Ä°letiÅŸim formu
    const formStatus    = document.getElementById('form-status');   // Durum mesajÄ± div'i

    // Rezervasyon alanlarÄ± (sonraki bÃ¶lÃ¼mde doldurulur, burada tanÄ±mlanÄ±r ki
    // Web3Forms baÅŸarÄ± callback'i de bu deÄŸiÅŸkenlere eriÅŸebilsin)
    let reservationDiv  = null;
    let reservationInputs = [];


    /* ============================================================
        2. DÄ°L DEÄžÄ°ÅžTÄ°RME (i18n â€” TÃ¼rkÃ§e / English)
       ============================================================ */
    const TRANSLATIONS = {"tr":{"html.lang":"tr","meta.title":"Miracle Coffee & Shop | DoÄŸanÄ±n Ä°Ã§inde Mucizevi Bir Mola","meta.description":"Miracle Coffee & Shop - Serpme kahvaltÄ±, Ã¶zel kahveler, sÄ±cak Ã§ikolata, tatlÄ±lar ve daha fazlasÄ±. DoÄŸanÄ±n iÃ§inde huzurlu bir mola.","nav.home":"Anasayfa","nav.about":"HakkÄ±mÄ±zda","nav.menu":"MenÃ¼","nav.gallery":"Galeri","nav.contact":"Ä°letiÅŸim","nav.aria":"Ana navigasyon","nav.logo.aria":"Ana sayfaya git","nav.logo.alt":"Miracle Coffee & Shop logosu","nav.theme.aria":"KaranlÄ±k modu aÃ§/kapat","nav.menu.aria":"MenÃ¼yÃ¼ aÃ§/kapat","nav.lang.aria":"Dil deÄŸiÅŸtir","hero.title.part1":"DoÄŸanÄ±n Ä°Ã§inde","hero.title.part2":"Kalite ve Lezzetin Buluşma Noktası","hero.subtitle":"Serpme kahvaltÄ±dan Ã¶zel kahvelere, el yapÄ±mÄ± tatlÄ±lardan sÄ±cak sohbetlereâ€¦","hero.cta":"MenÃ¼yÃ¼ Ä°ncele","hero.scroll.aria":"AÅŸaÄŸÄ± kaydÄ±r","about.title":"HakkÄ±mÄ±zda","about.subtitle":"Her fincanda bir hikaye, her kÃ¶ÅŸede bir yeÅŸillik","about.text1":"Miracle Coffee & Miracle Coffee & Shop olarak, KÃ¼tahya'nÄ±n en nezih mahallelerinden birinde misafirlerimize ÅŸÄ±k, modern ve sÄ±cak bir atmosfer sunuyoruz. Ã–zenle tasarlanmÄ±ÅŸ iÃ§ mekanÄ±mÄ±z, konforlu oturma alanlarÄ±mÄ±z ve keyifli mÃ¼ziklerimizle, kapÄ±dan iÃ§eri adÄ±m attÄ±ÄŸÄ±nÄ±z an kendinizi evinizde hissedeceÄŸiniz samimi bir ortam yarattÄ±k. Åžehrin temposuna keyifli bir es vermek isteyenlerin yeni favori duraÄŸÄ±yÄ±z.","about.text2":"Taze Ã§ekirdeklerden hazÄ±rladÄ±ÄŸÄ±mÄ±z kahvelerimiz, mevsimlik malzemelerle hazÄ±rladÄ±ÄŸÄ±mÄ±z serpme kahvaltÄ± tabaklarÄ±mÄ±z ve gÃ¶rÃ¼ntÃ¼sÃ¼yle olduÄŸu kadar lezzetiyle de bÃ¼yÃ¼leyen tatlÄ±larÄ±mÄ±z sizleri bekliyor.","menu.title":"MenÃ¼","menu.subtitle":"Kategori seÃ§in, lezzetleri keÅŸfedin.","menu.tab.all":"TÃ¼mÃ¼","menu.tab.hot":"SÄ±cak Ä°Ã§ecekler","menu.tab.cold":"SoÄŸuk Ä°Ã§ecekler & Milkshake","menu.tab.dessert":"TatlÄ±lar","menu.tab.breakfast":"KahvaltÄ± & AtÄ±ÅŸtÄ±rmalÄ±k","menu.tab.food":"Yemekler & Salatalar","menu.item.1":"Ã‡ay","menu.item.2":"Duble Ã‡ay","menu.item.3":"SÃ¼tlÃ¼ Ã‡ay","menu.item.4":"Bitki Ã‡ayÄ±","menu.item.5":"TÃ¼rk Kahvesi","menu.item.6":"MenengiÃ§ Kahvesi","menu.item.7":"Filtre Kahve","menu.item.8":"Espresso","menu.item.9":"Americano","menu.item.10":"Latte","menu.item.11":"Cappuccino","menu.item.12":"Mocha","menu.item.13":"White Mocha","menu.item.14":"SÄ±cak Ã‡ikolata","menu.item.15":"Salep","menu.item.16":"Sahlep","menu.item.17":"SoÄŸuk Ã‡ay","menu.item.18":"SoÄŸuk Kahve (Cold Brew)","menu.item.19":"Ice Latte","menu.item.20":"Caramel Frappe","menu.item.21":"Milkshake (Ã‡ilek / Ã‡ikolata / Muz / Oreo / Karamel)","menu.item.22":"Bubble Tea","menu.item.23":"Waffle (Ã‡ilekli / Muzlu / KarÄ±ÅŸÄ±k / NutellalÄ± / Oreo)","menu.item.24":"Ã‡ikolata Mozza","menu.item.25":"Magnolia (Ã‡ilekli / Meyveli / Muzlu / Karamelli / Kurabiyeli)","menu.item.26":"Tiramisu Kup","menu.item.27":"Quesadilla","menu.item.28":"Serpme KahvaltÄ± (KiÅŸi BaÅŸÄ±)","menu.item.29":"KÄ±zarmÄ±ÅŸ Ekmek (KaÅŸarlÄ±)","menu.item.30":"Tavuklu Wrap","menu.item.31":"KaÅŸarlÄ± Tavuklu Wrap","menu.item.32":"Sushili Wrap","menu.item.33":"SoÄŸuk SandviÃ§","menu.item.34":"Sosisli SoÄŸuk SandviÃ§","menu.item.35":"Tost","menu.item.36":"KaÅŸarlÄ± Tost","menu.item.37":"Sosisli Tost","menu.item.38":"Cheeseburger","menu.item.39":"Double Cheeseburger","menu.item.40":"Chicken Burger","menu.item.41":"Steak Burger","menu.item.42":"Sushi (8'li / 12'li)","menu.item.43":"Stir Fry Noodles","menu.item.44":"Fettuccine Alfredo","menu.item.45":"Beef Stroganoff","menu.item.46":"Patates KÄ±zartmasÄ±","menu.item.47":"SoÄŸan HalkasÄ±","menu.item.48":"Ã‡Ä±tÄ±r Tavuk","menu.item.49":"Parmak Patates","menu.item.50":"Mozzarella Ã‡ubuklarÄ±","menu.item.51":"Sosis TabaÄŸÄ±","menu.item.52":"KaÅŸarlÄ± Nugget","menu.item.53":"Tavuklu Nugget","menu.item.54":"KaÅŸar TabaÄŸÄ±","menu.item.55":"Cesar Salata","menu.item.56":"Tavuklu Cesar Salata","menu.item.57":"Ton BalÄ±klÄ± Salata","menu.item.58":"Akdeniz Salata","menu.item.59":"Elma Dilim Patates","menu.tabs.aria":"MenÃ¼ kategorileri","menu.item.note":"Patates kÄ±zartmasÄ± ile servis edilir.","menu.category.hot":"SÄ±cak Ä°Ã§ecekler","menu.category.cold":"SoÄŸuk Ä°Ã§ecekler & Milkshake","menu.category.dessert":"TatlÄ±lar","menu.category.breakfast":"KahvaltÄ± & AtÄ±ÅŸtÄ±rmalÄ±k","menu.category.food":"Yemekler & Salatalar","gallery.title":"Galeri","gallery.subtitle":"MekanÄ±mÄ±zdan ve lezzetlerimizden kareler.","gallery.caption.1":"Ã‡Ã¶kertme KebabÄ±","gallery.caption.2":"Serpme KahvaltÄ±","gallery.caption.3":"Latte Art","gallery.caption.4":"Red Velvet","gallery.caption.5":"Neon IÅŸÄ±klar","gallery.caption.6":"SoÄŸuk Lezzetler","org.title":"Ã–zel GÃ¼nlerinizi Birlikte GÃ¼zelleÅŸtirelim","org.subtitle":"Ä°ster kÃ¼Ã§Ã¼k bir kutlama, ister kurumsal bir organizasyon â€” Miracle Coffee size Ã¶zel alanlarÄ±yla her anÄ±nÄ±za eÅŸlik eder.","org.card1.title":"DoÄŸum GÃ¼nÃ¼ & Kutlamalar","org.card1.desc":"Sevdiklerinizle unutulmaz anÄ±lar biriktirin. Ã–zel dekorasyon, pasta sÃ¼sleme atÃ¶lyesi ve size Ã¶zel menÃ¼ seÃ§enekleriyle kutlamanÄ±zÄ± renklendirelim.","org.card2.title":"Kurumsal ToplantÄ±lar","org.card2.desc":"Sakin ve ÅŸÄ±k atmosferimizde iÅŸinize odaklanÄ±n. Projeksiyon, ses sistemi ve kahve ikramÄ±yla donatÄ±lmÄ±ÅŸ toplantÄ± odalarÄ±mÄ±z hizmetinize hazÄ±r.","org.card3.title":"Ã–zel Davetler & AtÃ¶lyeler","org.card3.desc":"Gruplara Ã¶zel rezervasyon alanlarÄ±, kahve yapÄ±m atÃ¶lyeleri ve sanat etkinlikleri ile dolu dolu bir deneyim yaÅŸayÄ±n.","org.cta":"Bilgi ve Rezervasyon Ä°Ã§in Ä°letiÅŸime GeÃ§in","contact.title":"Ä°letiÅŸim & Rezervasyon","contact.subtitle":"GÃ¶rÃ¼ÅŸlerinizi paylaÅŸÄ±n, rezervasyon yapÄ±n ya da sadece merhaba deyin â€” size dÃ¶nÃ¼ÅŸ yapalÄ±m.","contact.heading":"Bize UlaÅŸÄ±n","contact.feedback.title":"GÃ¶rÃ¼ÅŸleriniz Bizim Ä°Ã§in DeÄŸerli!","contact.feedback.text":"Ä°ster bir Ã¶neri, ister ÅŸikayet, isterse rezervasyon â€” her mesajÄ±nÄ±z bizim iÃ§in kÄ±ymetli. Kahvenizi yudumlarken bize yazÄ±n, en kÄ±sa sÃ¼rede dÃ¶nÃ¼ÅŸ yapalÄ±m.","contact.phone":"Telefon","contact.instagram":"Instagram","contact.response.time":"Genellikle 1 saat iÃ§inde yanÄ±tlÄ±yoruz","contact.form.name":"AdÄ±nÄ±z SoyadÄ±nÄ±z","contact.form.email":"E-posta Adresiniz","contact.form.phone":"Telefon NumaranÄ±z (Ä°steÄŸe BaÄŸlÄ±)","contact.form.subject":"Konu SeÃ§iniz","contact.form.select.placeholder":"â€” SeÃ§iniz â€”","contact.form.subject.rez":"Rezervasyon","contact.form.subject.suggestion":"Ã–neri / Åžikayet","contact.form.subject.org":"Organizasyon","contact.form.subject.other":"DiÄŸer","contact.form.message":"MesajÄ±nÄ±z","contact.form.submit":"GÃ¶nder","contact.form.sending":"GÃ¶nderiliyor...","contact.form.reservation.date":"Rezervasyon Tarihi","contact.form.reservation.time":"Rezervasyon Saati","contact.form.reservation.guests":"KiÅŸi SayÄ±sÄ±","contact.form.reservation.guests.placeholder":"Ã–rn: 4","contact.form.success":"MesajÄ±nÄ±z baÅŸarÄ±yla gÃ¶nderildi! En kÄ±sa sÃ¼rede size dÃ¶nÃ¼ÅŸ yapacaÄŸÄ±z.","contact.form.error.api":"Bir hata oluÅŸtu. LÃ¼tfen daha sonra tekrar deneyin.","contact.form.error.network":"Sunucuya baÄŸlanÄ±lamadÄ±. LÃ¼tfen internet baÄŸlantÄ±nÄ±zÄ± kontrol edin.","contact.form.required":"Bu alan zorunludur.","footer.rights":"TÃ¼m haklarÄ± saklÄ±dÄ±r.","footer.tagline":"DoÄŸanÄ±n ve kahvenin buluÅŸtuÄŸu nokta."},"en":{"html.lang":"en","meta.title":"Miracle Coffee & Shop | A Miraculous Break in Nature","meta.description":"Miracle Coffee & Shop - Breakfast, specialty coffees, hot chocolate, desserts and more. A peaceful break in nature.","nav.home":"Home","nav.about":"About Us","nav.menu":"Menu","nav.gallery":"Gallery","nav.contact":"Contact","nav.aria":"Main navigation","nav.logo.aria":"Go to homepage","nav.logo.alt":"Miracle Coffee & Shop logo","nav.theme.aria":"Toggle dark mode","nav.menu.aria":"Toggle menu","nav.lang.aria":"Change language","hero.title.part1":"In Kütahya","hero.title.part2":"The Meeting Point of Quality and Taste","hero.subtitle":"From breakfast to specialty coffees, from handmade desserts to warm conversationsâ€¦","hero.cta":"Explore Menu","hero.scroll.aria":"Scroll down","about.title":"About Us","about.subtitle":"A story in every cup, green in every corner","about.text1":"As Miracle Coffee & Shop, we offer our guests a stylish, modern and warm atmosphere in one of KÃ¼tahya's most distinguished neighborhoods. With our carefully designed interior, comfortable seating areas and pleasant music, we have created a friendly environment where you will feel at home the moment you step through the door. We are the new favorite stop for those who want to take a pleasant break from the city's pace.","about.text2":"Our coffees prepared from fresh beans, our breakfast plates prepared with seasonal ingredients, and our desserts that enchant with both their appearance and taste are waiting for you.","menu.title":"Menu","menu.subtitle":"Select a category, discover flavors.","menu.tab.all":"All","menu.tab.hot":"Hot Drinks","menu.tab.cold":"Cold Drinks & Milkshake","menu.tab.dessert":"Desserts","menu.tab.breakfast":"Breakfast & Snacks","menu.tab.food":"Meals & Salads","menu.item.1":"Tea","menu.item.2":"Double Tea","menu.item.3":"Tea with Milk","menu.item.4":"Herbal Tea","menu.item.5":"Turkish Coffee","menu.item.6":"MenengiÃ§ Coffee","menu.item.7":"Filter Coffee","menu.item.8":"Espresso","menu.item.9":"Americano","menu.item.10":"Latte","menu.item.11":"Cappuccino","menu.item.12":"Mocha","menu.item.13":"White Mocha","menu.item.14":"Hot Chocolate","menu.item.15":"Salep","menu.item.16":"Sahlep","menu.item.17":"Iced Tea","menu.item.18":"Cold Brew","menu.item.19":"Ice Latte","menu.item.20":"Caramel Frappe","menu.item.21":"Milkshake (Strawberry / Chocolate / Banana / Oreo / Caramel)","menu.item.22":"Bubble Tea","menu.item.23":"Waffle (Strawberry / Banana / Mixed / Nutella / Oreo)","menu.item.24":"Chocolate Mozza","menu.item.25":"Magnolia (Strawberry / Mixed / Banana / Caramel / Cookie)","menu.item.26":"Tiramisu Cup","menu.item.27":"Quesadilla","menu.item.28":"Turkish Breakfast (Per Person)","menu.item.29":"Fried Bread (Cheese)","menu.item.30":"Chicken Wrap","menu.item.31":"Cheese Chicken Wrap","menu.item.32":"Sushi Wrap","menu.item.33":"Cold Sandwich","menu.item.34":"Sausage Cold Sandwich","menu.item.35":"Toast","menu.item.36":"Cheese Toast","menu.item.37":"Sausage Toast","menu.item.38":"Cheeseburger","menu.item.39":"Double Cheeseburger","menu.item.40":"Chicken Burger","menu.item.41":"Steak Burger","menu.item.42":"Sushi (8pcs / 12pcs)","menu.item.43":"Stir Fry Noodles","menu.item.44":"Fettuccine Alfredo","menu.item.45":"Beef Stroganoff","menu.item.46":"French Fries","menu.item.47":"Onion Rings","menu.item.48":"Chicken Strips","menu.item.49":"French Fries (Thin)","menu.item.50":"Mozzarella Sticks","menu.item.51":"Sausage Plate","menu.item.52":"Cheese Nuggets","menu.item.53":"Chicken Nuggets","menu.item.54":"Cheese Plate","menu.item.55":"Caesar Salad","menu.item.56":"Chicken Caesar Salad","menu.item.57":"Tuna Salad","menu.item.58":"Mediterranean Salad","menu.item.59":"Apple Wedge Potatoes","menu.tabs.aria":"Menu categories","menu.item.note":"Served with french fries.","menu.category.hot":"Hot Drinks","menu.category.cold":"Cold Drinks & Milkshake","menu.category.dessert":"Desserts","menu.category.breakfast":"Breakfast & Snacks","menu.category.food":"Meals & Salads","gallery.title":"Gallery","gallery.subtitle":"Snapshots from our venue and flavors.","gallery.caption.1":"Ã‡Ã¶kertme Kebab","gallery.caption.2":"Turkish Breakfast","gallery.caption.3":"Latte Art","gallery.caption.4":"Red Velvet","gallery.caption.5":"Neon Lights","gallery.caption.6":"Cold Delights","org.title":"Let's Make Your Special Days Beautiful Together","org.subtitle":"Whether a small celebration or a corporate event â€” Miracle Coffee accompanies every moment with its private spaces.","org.card1.title":"Birthday & Celebrations","org.card1.desc":"Create unforgettable memories with your loved ones. Let us color your celebration with special decorations, cake decorating workshops and customized menu options.","org.card2.title":"Corporate Meetings","org.card2.desc":"Focus on your work in our calm and stylish atmosphere. Our meeting rooms equipped with projection, sound system and coffee service are at your disposal.","org.card3.title":"Private Events & Workshops","org.card3.desc":"Enjoy a full experience with private group reservations, coffee workshops and art events.","org.cta":"Contact Us for Information & Reservation","contact.title":"Contact & Reservation","contact.subtitle":"Share your thoughts, make a reservation, or just say hello â€” let us get back to you.","contact.heading":"Get In Touch","contact.feedback.title":"Your Opinion Matters to Us!","contact.feedback.text":"Whether it's a suggestion, complaint, or reservation â€” every message matters to us. Write to us while sipping your coffee, and we'll get back to you as soon as possible.","contact.phone":"Phone","contact.instagram":"Instagram","contact.response.time":"We usually reply within 1 hour","contact.form.name":"Your Full Name","contact.form.email":"Your Email","contact.form.phone":"Your Phone (Optional)","contact.form.subject":"Select Subject","contact.form.select.placeholder":"â€” Select â€”","contact.form.subject.rez":"Reservation","contact.form.subject.suggestion":"Suggestion / Complaint","contact.form.subject.org":"Organization","contact.form.subject.other":"Other","contact.form.message":"Your Message","contact.form.submit":"Send","contact.form.sending":"Sending...","contact.form.reservation.date":"Reservation Date","contact.form.reservation.time":"Reservation Time","contact.form.reservation.guests":"Number of Guests","contact.form.reservation.guests.placeholder":"E.g. 4","contact.form.success":"Your message has been sent successfully! We will get back to you as soon as possible.","contact.form.error.api":"An error occurred. Please try again later.","contact.form.error.network":"Could not connect to server. Please check your internet connection.","contact.form.required":"This field is required.","footer.rights":"All rights reserved.","footer.tagline":"Where nature meets coffee."}};

    const i18n = {
        currentLang: localStorage.getItem('lang') || 'tr',

        t(key) {
            return TRANSLATIONS?.[this.currentLang]?.[key] ?? null;
        },

        apply() {
            const lang = this.currentLang;

            document.documentElement.lang = this.t('html.lang') || lang;

            const title = this.t('meta.title');
            if (title) document.title = title;

            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.content = this.t('meta.description') || metaDesc.content;

            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.content = this.t('meta.title') || ogTitle.content;

            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.content = this.t('meta.description') || ogDesc.content;

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const val = this.t(el.dataset.i18n);
                if (val !== null) el.textContent = val;
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const val = this.t(el.dataset.i18nPlaceholder);
                if (val !== null) el.placeholder = val;
            });

            document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
                const val = this.t(el.dataset.i18nAriaLabel);
                if (val !== null) el.setAttribute('aria-label', val);
            });

            document.querySelectorAll('[data-i18n-alt]').forEach(el => {
                const val = this.t(el.dataset.i18nAlt);
                if (val !== null) el.alt = val;
            });

            document.querySelectorAll('[data-i18n-value]').forEach(el => {
                const val = this.t(el.dataset.i18nValue);
                if (val !== null) el.textContent = val;
            });

            let itemId = 1;
            document.querySelectorAll('.menu__item').forEach(item => {
                const nameEl = item.querySelector('.menu__item-name');
                if (nameEl) {
                    const val = this.t(`menu.item.${itemId}`);
                    if (val !== null) nameEl.textContent = val;
                }
                itemId++;
            });

            const langBtn = document.getElementById('lang-toggle');
            if (langBtn) {
                langBtn.textContent = lang === 'tr' ? 'EN' : 'TR';
                const aria = this.t('nav.lang.aria');
                if (aria) langBtn.setAttribute('aria-label', aria);
            }
        },

        setupToggle() {
            const btn = document.getElementById('lang-toggle');
            if (!btn) return;
            btn.addEventListener('click', () => {
                this.currentLang = this.currentLang === 'tr' ? 'en' : 'tr';
                localStorage.setItem('lang', this.currentLang);
                this.apply();
            });
        }
    };

    i18n.setupToggle();
    i18n.apply();


    /* ============================================================
        3. HAMBURGER MENÃœ (MOBÄ°L NAVÄ°GASYON)
       ============================================================
       Butona tÄ±klanÄ±nca:
         - MenÃ¼ aÃ§Ä±lÄ±r/kapanÄ±r
         - Hamburger Ã§izgileri "X" ÅŸeklini alÄ±r
         - aria-expanded Ã¶zniteliÄŸi gÃ¼ncellenir (A11y)
       ============================================================ */
    if (hamburgerBtn && navList) {
        hamburgerBtn.addEventListener('click', function () {
            // Hamburger'in "X" dÃ¶nÃ¼ÅŸÃ¼mÃ¼ iÃ§in class ekle/Ã§Ä±kar
            hamburgerBtn.classList.toggle('nav__hamburger--active');
            // MenÃ¼ listesinin gÃ¶rÃ¼nÃ¼rlÃ¼ÄŸÃ¼nÃ¼ deÄŸiÅŸtir
            navList.classList.toggle('nav__list--open');
            // EriÅŸilebilirlik: menÃ¼ durumunu gÃ¼ncelle
            const isOpen = navList.classList.contains('nav__list--open');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
        });
    }


    /* ============================================================
       3. KARANLIK MOD (DARK MODE) TERCÄ°HÄ°
       ============================================================
       - KullanÄ±cÄ± butona tÄ±klayÄ±nca dark mode aÃ§Ä±lÄ±r/kapanÄ±r.
       - Tercih LocalStorage'a kaydedilir.
       - Sayfa yenilendiÄŸinde kaydedilen tercih uygulanÄ±r.
       ============================================================ */

    // ---- Sayfa ilk aÃ§Ä±ldÄ±ÄŸÄ±nda LocalStorage'dan tercihi oku ----
    const savedTheme = localStorage.getItem('miracle-theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');  // GÃ¼neÅŸ ikonu (karanlÄ±k moddayken)
    }

    // ---- Butona tÄ±klanÄ±nca tema deÄŸiÅŸtir ----
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            // body'de dark-mode class'Ä± var mÄ±?
            const isDark = document.body.classList.toggle('dark-mode');

            // Ä°konu gÃ¼ncelle: karanlÄ±kta gÃ¼neÅŸ, aydÄ±nlÄ±kta ay
            if (isDark) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('miracle-theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('miracle-theme', 'light');
            }
        });
    }


    /* ============================================================
       4. YUMUÅžAK KAYDIRMA (SMOOTH SCROLL)
       ============================================================
       Sayfa iÃ§i linklere (#ile baÅŸlayan) tÄ±klanÄ±nca hedef bÃ¶lÃ¼me
       yumuÅŸakÃ§a kayar. Header yÃ¼ksekliÄŸi kadar yukarÄ± Ã§eker ki
       iÃ§erik sabit navbar'Ä±n altÄ±nda kalsÄ±n.
       ============================================================ */

    // YardÄ±mcÄ± fonksiyon: hedef ID'ye yumuÅŸak kaydÄ±rma yapar
    function smoothScrollToTarget(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = headerEl ? headerEl.offsetHeight : 70;
            const targetPosition = targetSection.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Nav linklerine tÄ±klandÄ±ÄŸÄ±nda yumuÅŸak kaydÄ±r
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollToTarget(this.getAttribute('href'));

            // Mobilde menÃ¼yÃ¼ kapat (eÄŸer aÃ§Ä±ksa)
            if (navList && navList.classList.contains('nav__list--open')) {
                navList.classList.remove('nav__list--open');
                hamburgerBtn.classList.remove('nav__hamburger--active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Organizasyon CTA butonu ve diÄŸer sayfa iÃ§i linkler
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(function (link) {
        // Sadece nav__link olmayanlara ekle (nav__link zaten yukarÄ±da iÅŸlendi)
        if (!link.classList.contains('nav__link')) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                smoothScrollToTarget(this.getAttribute('href'));
            });
        }
    });


    /* ============================================================
       5. MENÃœ FÄ°LTRELEME (KATEGORÄ° SEKMELERÄ°)
       ============================================================
       MantÄ±k:
       1. TÃ¼m menÃ¼ Ã¶ÄŸelerini ve sekme butonlarÄ±nÄ± seÃ§.
       2. Her butona tÄ±klandÄ±ÄŸÄ±nda:
          a) TÃ¼m butonlardan "active" class'Ä±nÄ± kaldÄ±r,
             tÄ±klanan butona ekle.
          b) SeÃ§ilen kategoriyi data-category'den oku.
          c) "all" seÃ§ilirse tÃ¼m Ã¶ÄŸeleri gÃ¶ster.
          d) DeÄŸilse, yalnÄ±zca eÅŸleÅŸen data-category'ye
             sahip Ã¶ÄŸeleri gÃ¶ster, diÄŸerlerini gizle.
       ============================================================ */

    // ----- HTML'den menÃ¼ Ã¶ÄŸelerini ve butonlarÄ± seÃ§ -----
    const menuTabs   = document.querySelectorAll('.menu__tab');     // TÃ¼m kategori butonlarÄ±
    const menuItems  = document.querySelectorAll('.menu__item');    // TÃ¼m Ã¼rÃ¼n Ã¶ÄŸeleri

    if (menuTabs.length > 0 && menuItems.length > 0) {

        // Her butona ayrÄ± ayrÄ± tÄ±klama olayÄ± ekle
        menuTabs.forEach(function (tab) {
            tab.addEventListener('click', function () {

                // 1. TÃ¼m butonlardan "active" class'Ä±nÄ± ve aria-pressed'i kaldÄ±r
                menuTabs.forEach(function (btn) {
                    btn.classList.remove('menu__tab--active');
                    btn.setAttribute('aria-pressed', 'false');
                });

                // 2. TÄ±klanan butonu aktif yap
                this.classList.add('menu__tab--active');
                this.setAttribute('aria-pressed', 'true');

                // 3. Hangi kategori seÃ§ildi? ("all", "hot", "cold", "dessert", "food")
                const selectedCategory = this.getAttribute('data-category');

                // 4. Her Ã¼rÃ¼n Ã¶ÄŸesini kontrol et
                menuItems.forEach(function (item) {
                    // ÃœrÃ¼nÃ¼n kategorisi (data-category deÄŸeri)
                    const itemCategory = item.getAttribute('data-category');

                    // EÄŸer "TÃ¼mÃ¼" seÃ§ildiyse veya Ã¼rÃ¼n kategorisi seÃ§ilenle eÅŸleÅŸiyorsa GÃ–STER
                    if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                        item.style.display = 'block';    // GÃ¶ster
                    } else {
                        item.style.display = 'none';     // Gizle
                    }
                });
            });
        });
    }


    /* ============================================================
       7. STICKY HEADER â€” SCROLL'DA GÃ–LGE EKLE
       ============================================================
       Sayfa 50px'den fazla kaydÄ±rÄ±lÄ±rsa header'a "scrolled"
       class'Ä± eklenir, bÃ¶ylece gÃ¶lge ve opaklÄ±k artar.
       ============================================================ */
    if (headerEl) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                headerEl.classList.add('scrolled');
            } else {
                headerEl.classList.remove('scrolled');
            }
        });
    }


    /* ============================================================
       8. WEB3FORMS Ä°LETÄ°ÅžÄ°M FORMU (FETCH API)
       ============================================================
       Form backend olmadan Ã§alÄ±ÅŸsÄ±n diye Fetch ile
       Web3Forms API'sine POST yapÄ±yoruz.
       BaÅŸarÄ±lÄ±/baÅŸarÄ±sÄ±z mesajÄ±nÄ± kullanÄ±cÄ±ya gÃ¶steriyoruz.
       ============================================================ */
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();  // SayfanÄ±n yenilenmesini engelle

            // Form verilerini al
            const formData = new FormData(contactForm);

            // Butonu devre dÄ±ÅŸÄ± bÄ±rak (Ã§ift tÄ±klama Ã¶nlemi)
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (i18n.t('contact.form.sending') || 'GÃ¶nderiliyor...');
            }

            // Web3Forms API'sine POST isteÄŸi gÃ¶nder
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(function (response) {
                return response.json();  // JSON yanÄ±tÄ± parse et
            })
            .then(function (data) {
                if (data.success) {
                    // BaÅŸarÄ±lÄ±: yeÅŸil mesaj gÃ¶ster
                    formStatus.textContent = i18n.t('contact.form.success') || 'MesajÄ±nÄ±z baÅŸarÄ±yla gÃ¶nderildi! En kÄ±sa sÃ¼rede size dÃ¶nÃ¼ÅŸ yapacaÄŸÄ±z.';
                    formStatus.className = 'contact__status contact__status--success';
                    contactForm.reset();  // Formu temizle

                    // Rezervasyon alanlarÄ±nÄ± da gizle (eÄŸer aÃ§Ä±ksa)
                    if (reservationDiv) {
                        reservationDiv.classList.remove('contact__reservation-fields--visible');
                        reservationInputs.forEach(function (input) {
                            input.removeAttribute('required');
                            input.removeAttribute('aria-required');
                        });
                    }
                } else {
                    // API hatasÄ±: kÄ±rmÄ±zÄ± mesaj
                    formStatus.textContent = i18n.t('contact.form.error.api') || 'Bir hata oluÅŸtu. LÃ¼tfen daha sonra tekrar deneyin.';
                    formStatus.className = 'contact__status contact__status--error';
                }
            })
            .catch(function () {
                // AÄŸ hatasÄ±
                formStatus.textContent = i18n.t('contact.form.error.network') || 'Sunucuya baÄŸlanÄ±lamadÄ±. LÃ¼tfen internet baÄŸlantÄ±nÄ±zÄ± kontrol edin.';
                formStatus.className = 'contact__status contact__status--error';
            })
            .finally(function () {
                // Butonu tekrar aktif et
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + (i18n.t('contact.form.submit') || 'Mesaj GÃ¶nder');
                }
            });
        });
    }

    /* ============================================================
       9. REZERVASYON ALANLARI â€” GÃ–STER / GÄ°ZLE
       ============================================================
       MantÄ±k:
       1. Konu seÃ§imindeki <select> deÄŸiÅŸtiÄŸinde tetiklenir.
       2. "Rezervasyon" seÃ§eneÄŸi seÃ§ilmiÅŸse:
          - #rezervasyonAlanlari div'ine "visible" class'Ä± eklenir
          - Ä°Ã§indeki input'lara required niteliÄŸi eklenir
       3. BaÅŸka bir konu seÃ§ilmiÅŸse:
          - "visible" class'Ä± kaldÄ±rÄ±lÄ±r
          - required nitelikleri kaldÄ±rÄ±lÄ±r
       ============================================================ */

    // HTML'den rezervasyonla ilgili elemanlarÄ± seÃ§
    const subjectSelect  = document.getElementById('form-subject');        // Konu seÃ§imi
    reservationDiv       = document.getElementById('rezervasyonAlanlari'); // Rezervasyon alanlarÄ± div'i

    // Rezervasyon alanÄ±ndaki input'lar (required ekleyip Ã§Ä±karmak iÃ§in)
    reservationInputs = reservationDiv
        ? reservationDiv.querySelectorAll('input')
        : [];

    if (subjectSelect && reservationDiv) {

        // Konu seÃ§imi deÄŸiÅŸince Ã§alÄ±ÅŸacak fonksiyon
        subjectSelect.addEventListener('change', function () {

            // SeÃ§ilen option'un value deÄŸerini al ("Rezervasyon" mu diye kontrol et)
            const selectedValue = this.value;

            if (selectedValue === 'Rezervasyon') {
                // "Rezervasyon" seÃ§ildi â†’ alanlarÄ± gÃ¶ster
                reservationDiv.classList.add('contact__reservation-fields--visible');

                // TÃ¼m rezervasyon input'larÄ±na required ekle (zorunlu yap)
                reservationInputs.forEach(function (input) {
                    input.setAttribute('required', '');
                    input.setAttribute('aria-required', 'true');
                });

            } else {
                // BaÅŸka bir konu seÃ§ildi â†’ alanlarÄ± gizle
                reservationDiv.classList.remove('contact__reservation-fields--visible');

                // Required niteliklerini kaldÄ±r (form gÃ¶nderimi engellenmesin)
                reservationInputs.forEach(function (input) {
                    input.removeAttribute('required');
                    input.removeAttribute('aria-required');
                });
            }
        });
    }

});  // DOMContentLoaded sonu

