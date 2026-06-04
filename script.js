/* script.js */


/* DOMContentLoaded */
document.addEventListener('DOMContentLoaded', function () {

    const hamburgerBtn  = document.getElementById('hamburger-btn');
    const navList       = document.getElementById('nav-list');     
    const themeToggle   = document.getElementById('theme-toggle'); 
    const themeIcon     = document.getElementById('theme-icon');     // İkon (ay/güneş)
    const headerEl      = document.getElementById('header');         // Header (sticky)
    const navLinks      = document.querySelectorAll('.nav__link');  // Tüm nav linkleri
    const contactForm   = document.getElementById('contact-form');  // İletişim formu
    const formStatus    = document.getElementById('form-status');   // Durum mesajı div'i

    // Rezervasyon alanları (sonraki bölümde doldurulur, burada tanımlanır ki
    // Web3Forms başarı callback'i de bu değişkenlere erişebilsin)
    let reservationDiv  = null;
    let reservationInputs = [];


    /* 2. Dil Değiştirme */
    const TRANSLATIONS = {"tr":{"html.lang":"tr","meta.title":"Miracle Coffee & Shop | Doğanın İçinde Mucizevi Bir Mola","meta.description":"Miracle Coffee & Shop - Serpme kahvaltı, özel kahveler, sıcak çikolata, tatlılar ve daha fazlası. Doğanın içinde huzurlu bir mola.","nav.home":"Anasayfa","nav.about":"Hakkımızda","nav.menu":"Menü","nav.gallery":"Galeri","nav.contact":"İletişim","nav.aria":"Ana navigasyon","nav.logo.aria":"Ana sayfaya git","nav.logo.alt":"Miracle Coffee & Shop logosu","nav.theme.aria":"Karanlık modu aç/kapat","nav.menu.aria":"Menüyü aç/kapat","nav.lang.aria":"Dil değiştir","hero.title.part1":"Doğanın İçinde","hero.title.part2":"Mucizevi Bir Mola","hero.subtitle":"Serpme kahvaltıdan özel kahvelere, el yapımı tatlılardan sıcak sohbetlere…","hero.cta":"Menüyü İncele","hero.scroll.aria":"Aşağı kaydır","about.title":"Hakkımızda","about.subtitle":"Her fincanda bir hikaye, her köşede bir yeşillik","about.text1":"Miracle Coffee & Miracle Coffee & Shop olarak, Kütahya'nın en nezih mahallelerinden birinde misafirlerimize şık, modern ve sıcak bir atmosfer sunuyoruz. Özenle tasarlanmış iç mekanımız, konforlu oturma alanlarımız ve keyifli müziklerimizle, kapıdan içeri adım attığınız an kendinizi evinizde hissedeceğiniz samimi bir ortam yarattık. Şehrin temposuna keyifli bir es vermek isteyenlerin yeni favori durağıyız.","about.text2":"Taze çekirdeklerden hazırladığımız kahvelerimiz, mevsimlik malzemelerle hazırladığımız serpme kahvaltı tabaklarımız ve görüntüsüyle olduğu kadar lezzetiyle de büyüleyen tatlılarımız sizleri bekliyor.","menu.title":"Menü","menu.subtitle":"Kategori seçin, lezzetleri keşfedin.","menu.tab.all":"Tümü","menu.tab.hot":"Sıcak İçecekler","menu.tab.cold":"Soğuk İçecekler & Milkshake","menu.tab.dessert":"Tatlılar","menu.tab.breakfast":"Kahvaltı & Atıştırmalık","menu.tab.food":"Yemekler & Salatalar","menu.tabs.aria":"Menü kategorileri","gallery.title":"Galeri","gallery.subtitle":"Mekanımızdan ve lezzetlerimizden kareler.","gallery.caption.1":"Çökertme Kebabı","gallery.caption.2":"Serpme Kahvaltı","gallery.caption.3":"Latte Art","gallery.caption.4":"Red Velvet","gallery.caption.5":"Neon Işıklar","gallery.caption.6":"Soğuk Lezzetler","org.title":"Özel Günlerinizi Birlikte Güzelleştirelim","org.subtitle":"İster küçük bir kutlama, ister kurumsal bir organizasyon — Miracle Coffee size özel alanlarıyla her anınıza eşlik eder.","org.card1.title":"Doğum Günü & Kutlamalar","org.card1.desc":"Sevdiklerinizle unutulmaz anılar biriktirin. Özel dekorasyon, pasta süsleme atölyesi ve size özel menü seçenekleriyle kutlamanızı renklendirelim.","org.card2.title":"Kurumsal Toplantılar","org.card2.desc":"Sakin ve şık atmosferimizde işinize odaklanın. Ekip görüşmeleriniz için hazırladığımız rahat çalışma alanlarımız ve taze kahve ikramlarımızla hizmetinizdeyiz.","org.card3.title":"Özel Davetler & Atölyeler","org.card3.desc":"Gruplara özel rezervasyon alanları, kahve yapım atölyeleri ve sanat etkinlikleri ile dolu dolu bir deneyim yaşayın.","org.cta":"Bilgi ve Rezervasyon İçin İletişime Geçin","contact.title":"İletişim & Rezervasyon","contact.subtitle":"Görüşlerinizi paylaşın, rezervasyon yapın ya da sadece merhaba deyin — size dönüş yapalım.","contact.heading":"Bize Ulaşın","contact.feedback.title":"Görüşleriniz Bizim İçin Değerli!","contact.feedback.text":"İster bir öneri, ister şikayet, isterse rezervasyon — her mesajınız bizim için kıymetli. Kahvenizi yudumlarken bize yazın, en kısa sürede dönüş yapalım.","contact.phone":"Telefon","contact.instagram":"Instagram","contact.response.time":"Genellikle 1 saat içinde yanıtlıyoruz","contact.form.name":"Adınız Soyadınız","contact.form.email":"E-posta Adresiniz","contact.form.phone":"Telefon Numaranız (İsteğe Bağlı)","contact.form.subject":"Konu Seçiniz","contact.form.select.placeholder":"— Seçiniz —","contact.form.subject.rez":"Rezervasyon","contact.form.subject.suggestion":"Öneri / Şikayet","contact.form.subject.org":"Organizasyon","contact.form.subject.other":"Diğer","contact.form.message":"Mesajınız","contact.form.submit":"Gönder","contact.form.sending":"Gönderiliyor...","contact.form.reservation.date":"Rezervasyon Tarihi","contact.form.reservation.time":"Rezervasyon Saati","contact.form.reservation.guests":"Kişi Sayısı","contact.form.reservation.guests.placeholder":"Örn: 4","contact.form.success":"Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.","contact.form.error.api":"Bir hata oluştu. Lütfen daha sonra tekrar deneyin.","contact.form.error.network":"Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.","contact.form.required":"Bu alan zorunludur.","footer.rights":"Tüm hakları saklıdır.","footer.tagline":"Doğanın ve kahvenin buluştuğu nokta.","menu.category.hot":"Sıcak İçecekler","menu.item.hot.1":"Çay","menu.item.hot.2":"Duble Çay","menu.item.hot.3":"Bitki Çayı","menu.item.hot.4":"Türk Kahvesi","menu.item.hot.5":"Duble Türk Kahvesi","menu.item.hot.6":"Dibek Kahvesi","menu.item.hot.7":"Duble Dibek Kahvesi","menu.item.hot.8":"Menengiç Kahvesi","menu.item.hot.9":"Duble Menengiç Kahvesi","menu.item.hot.10":"Filtre Kahve","menu.item.hot.11":"Espresso","menu.item.hot.12":"Duble Espresso","menu.item.hot.13":"Americano","menu.item.hot.14":"Flat White","menu.item.hot.15":"Latte","menu.item.hot.16":"Cappuccino","menu.item.hot.17":"Mocha","menu.item.hot.18":"White Chocolate Mocha","menu.item.hot.19":"Salep","menu.item.hot.20":"Sıcak Çikolata","menu.item.hot.21":"Ruby(Pembe) Sıcak Çikolata","menu.item.hot.22":"Beyaz Sıcak Çikolata","menu.category.cold":"Soğuk İçecekler & Milkshake","menu.item.cold.1":"Iced Latte","menu.item.cold.2":"Iced Americano","menu.item.cold.3":"Iced Mocha","menu.item.cold.4":"Iced White Chocolate Mocha","menu.item.cold.5":"Frappe","menu.item.cold.6":"Bubble Tea","menu.item.cold.7":"Churchill","menu.item.cold.8":"Soda","menu.item.cold.9":"Meyveli Soda","menu.item.cold.10":"Limonata","menu.item.cold.11":"Meyve Suyu","menu.item.cold.12":"Gazlı İçecek","menu.item.cold.13":"Cool Lime","menu.item.cold.14":"Frozen","menu.item.cold.15":"Su","menu.item.cold.16":"Vanilyalı Milkshake","menu.item.cold.17":"Çikolatalı Milkshake","menu.item.cold.18":"Çilekli Milkshake","menu.item.cold.19":"Karamelli Milkshake","menu.category.dessert":"Tatlılar","menu.item.dessert.1":"Çilek Cedric Grolet","menu.item.dessert.2":"Antep Fıstıklı Cedric Grolet","menu.item.dessert.3":"Limonlu Cedric Grolet","menu.item.dessert.4":"Mango Cedric Grolet","menu.item.dessert.5":"Kahveli Cedric Grolet","menu.item.dessert.6":"Dilim Pasta Çeşitleri","menu.item.dessert.7":"Waffle","menu.item.dessert.8":"Dubai Çikolatalı Cup","menu.item.dessert.9":"Cup Tatlılar","menu.item.dessert.10":"Sufle","menu.item.dessert.11":"Sıcak Browni","menu.category.breakfast":"Kahvaltı & Atıştırmalık","menu.item.breakfast.1":"Kahvaltı Tabağı","menu.item.breakfast.2":"Jumbo Karışık Tost","menu.item.breakfast.3":"Ayvalık Tostu","menu.item.breakfast.4":"Kaşarlı Tost","menu.item.breakfast.5":"Bazlama Tost","menu.item.breakfast.6":"Atıştırmalık Çıtır Sepeti","menu.category.food":"Yemekler & Salatalar","menu.item.food.1":"Çıtır Sezar Salata","menu.item.food.2":"Ton Ton Salata","menu.item.food.3":"Izgara Hellim Salata","menu.item.food.4":"Çıtır Tavuklu Salata","menu.item.food.5":"Cheeseburger","menu.item.food.6":"Çıtır Tavuk Burger","menu.item.food.7":"Klasik Burger","menu.item.food.8":"Karışık Pizza","menu.item.food.9":"3 Peynirli Pizza","menu.item.food.10":"Anadolu Usulü Penne Arabiata","menu.item.food.11":"3 Peynirli Penne","menu.item.food.12":"Stir Fry Noddles","menu.item.food.13":"Fettuccine Alfredo","menu.item.food.14":"Köri Soslu Tavuk","menu.item.food.15":"Dağ Kekikli Tavuk","menu.item.food.16":"Fajita Wrap (Tavuk)","menu.item.food.17":"Quesadilla Tavuklu","menu.item.food.18":"Kajun Baharatlı Çıtır Tavuk","menu.item.food.19":"Soslu Külbastı (Tavuk)","menu.item.food.20":"Çökertme Kebabı (Tavuk Etli)","menu.item.food.21":"Çökertme Kebabı (Kırmızı Etli)","menu.item.food.22":"Beef Stroganoff","menu.item.food.23":"Kayseri Yağlaması","menu.item.food.24":"Mantı"},"en":{"html.lang":"en","meta.title":"Miracle Coffee & Shop | A Miraculous Break in Nature","meta.description":"Miracle Coffee & Shop - Breakfast, specialty coffees, hot chocolate, desserts and more. A peaceful break in nature.","nav.home":"Home","nav.about":"About Us","nav.menu":"Menu","nav.gallery":"Gallery","nav.contact":"Contact","nav.aria":"Main navigation","nav.logo.aria":"Go to homepage","nav.logo.alt":"Miracle Coffee & Shop logo","nav.theme.aria":"Toggle dark mode","nav.menu.aria":"Toggle menu","nav.lang.aria":"Change language","hero.title.part1":"A Miraculous","hero.title.part2":"Break in Nature","hero.subtitle":"From breakfast to specialty coffees, from handmade desserts to warm conversations…","hero.cta":"Explore Menu","hero.scroll.aria":"Scroll down","about.title":"About Us","about.subtitle":"A story in every cup, green in every corner","about.text1":"As Miracle Coffee & Shop, we offer our guests a stylish, modern and warm atmosphere in one of Kütahya's most distinguished neighborhoods. With our carefully designed interior, comfortable seating areas and pleasant music, we have created a friendly environment where you will feel at home the moment you step through the door. We are the new favorite stop for those who want to take a pleasant break from the city's pace.","about.text2":"Our coffees prepared from fresh beans, our breakfast plates prepared with seasonal ingredients, and our desserts that enchant with both their appearance and taste are waiting for you.","menu.title":"Menu","menu.subtitle":"Select a category, discover flavors.","menu.tab.all":"All","menu.tab.hot":"Hot Drinks","menu.tab.cold":"Cold Drinks & Milkshake","menu.tab.dessert":"Desserts","menu.tab.breakfast":"Breakfast & Snacks","menu.tab.food":"Meals & Salads","menu.tabs.aria":"Menu categories","gallery.title":"Gallery","gallery.subtitle":"Snapshots from our venue and flavors.","gallery.caption.1":"Cokertme Kebab","gallery.caption.2":"Turkish Breakfast","gallery.caption.3":"Latte Art","gallery.caption.4":"Red Velvet","gallery.caption.5":"Neon Lights","gallery.caption.6":"Cold Delights","org.title":"Let's Make Your Special Days Beautiful Together","org.subtitle":"Whether a small celebration or a corporate event — Miracle Coffee accompanies every moment with its private spaces.","org.card1.title":"Birthday & Celebrations","org.card1.desc":"Create unforgettable memories with your loved ones. Let us color your celebration with special decorations, cake decorating workshops and customized menu options.","org.card2.title":"Corporate Meetings","org.card2.desc":"Focus on your work in our calm and chic atmosphere. We are at your service with comfortable workspaces prepared for your team meetings and fresh coffee treats.","org.card3.title":"Private Events & Workshops","org.card3.desc":"Enjoy a full experience with private group reservations, coffee workshops and art events.","org.cta":"Contact Us for Information & Reservation","contact.title":"Contact & Reservation","contact.subtitle":"Share your thoughts, make a reservation, or just say hello — let us get back to you.","contact.heading":"Get In Touch","contact.feedback.title":"Your Opinion Matters to Us!","contact.feedback.text":"Whether it's a suggestion, complaint, or reservation — every message matters to us. Write to us while sipping your coffee, and we'll get back to you as soon as possible.","contact.phone":"Phone","contact.instagram":"Instagram","contact.response.time":"We usually reply within 1 hour","contact.form.name":"Your Full Name","contact.form.email":"Your Email","contact.form.phone":"Your Phone (Optional)","contact.form.subject":"Select Subject","contact.form.select.placeholder":"— Select —","contact.form.subject.rez":"Reservation","contact.form.subject.suggestion":"Suggestion / Complaint","contact.form.subject.org":"Organization","contact.form.subject.other":"Other","contact.form.message":"Your Message","contact.form.submit":"Send","contact.form.sending":"Sending...","contact.form.reservation.date":"Reservation Date","contact.form.reservation.time":"Reservation Time","contact.form.reservation.guests":"Number of Guests","contact.form.reservation.guests.placeholder":"E.g. 4","contact.form.success":"Your message has been sent successfully! We will get back to you as soon as possible.","contact.form.error.api":"An error occurred. Please try again later.","contact.form.error.network":"Could not connect to server. Please check your internet connection.","contact.form.required":"This field is required.","footer.rights":"All rights reserved.","footer.tagline":"Where nature meets coffee.","menu.category.hot":"Hot Drinks","menu.item.hot.1":"Tea","menu.item.hot.2":"Double Tea","menu.item.hot.3":"Herbal Tea","menu.item.hot.4":"Turkish Coffee","menu.item.hot.5":"Double Turkish Coffee","menu.item.hot.6":"Dibek Coffee","menu.item.hot.7":"Double Dibek Coffee","menu.item.hot.8":"Menengiç Coffee","menu.item.hot.9":"Double Menengiç Coffee","menu.item.hot.10":"Filter Coffee","menu.item.hot.11":"Espresso","menu.item.hot.12":"Double Espresso","menu.item.hot.13":"Americano","menu.item.hot.14":"Flat White","menu.item.hot.15":"Latte","menu.item.hot.16":"Cappuccino","menu.item.hot.17":"Mocha","menu.item.hot.18":"White Chocolate Mocha","menu.item.hot.19":"Salep","menu.item.hot.20":"Hot Chocolate","menu.item.hot.21":"Ruby (Pink) Hot Chocolate","menu.item.hot.22":"White Hot Chocolate","menu.category.cold":"Cold Drinks & Milkshake","menu.item.cold.1":"Iced Latte","menu.item.cold.2":"Iced Americano","menu.item.cold.3":"Iced Mocha","menu.item.cold.4":"Iced White Chocolate Mocha","menu.item.cold.5":"Frappe","menu.item.cold.6":"Bubble Tea","menu.item.cold.7":"Churchill","menu.item.cold.8":"Soda","menu.item.cold.9":"Fruit Soda","menu.item.cold.10":"Lemonade","menu.item.cold.11":"Fruit Juice","menu.item.cold.12":"Soft Drink","menu.item.cold.13":"Cool Lime","menu.item.cold.14":"Frozen","menu.item.cold.15":"Water","menu.item.cold.16":"Vanilla Milkshake","menu.item.cold.17":"Chocolate Milkshake","menu.item.cold.18":"Strawberry Milkshake","menu.item.cold.19":"Caramel Milkshake","menu.category.dessert":"Desserts","menu.item.dessert.1":"Strawberry Cedric Grolet","menu.item.dessert.2":"Pistachio Cedric Grolet","menu.item.dessert.3":"Lemon Cedric Grolet","menu.item.dessert.4":"Mango Cedric Grolet","menu.item.dessert.5":"Coffee Cedric Grolet","menu.item.dessert.6":"Sliced Cake Selection","menu.item.dessert.7":"Waffle","menu.item.dessert.8":"Dubai Chocolate Cup","menu.item.dessert.9":"Cup Desserts","menu.item.dessert.10":"Souffle","menu.item.dessert.11":"Hot Brownie","menu.category.breakfast":"Breakfast & Snacks","menu.item.breakfast.1":"Breakfast Plate","menu.item.breakfast.2":"Jumbo Mixed Toast","menu.item.breakfast.3":"Ayvalik Toast","menu.item.breakfast.4":"Cheese Toast","menu.item.breakfast.5":"Bazlama Toast","menu.item.breakfast.6":"Crunchy Snack Basket","menu.category.food":"Meals & Salads","menu.item.food.1":"Crispy Caesar Salad","menu.item.food.2":"Tuna Tuna Salad","menu.item.food.3":"Grilled Halloumi Salad","menu.item.food.4":"Crispy Chicken Salad","menu.item.food.5":"Cheeseburger","menu.item.food.6":"Crispy Chicken Burger","menu.item.food.7":"Classic Burger","menu.item.food.8":"Mixed Pizza","menu.item.food.9":"3 Cheese Pizza","menu.item.food.10":"Anatolian Style Penne Arrabiata","menu.item.food.11":"3 Cheese Penne","menu.item.food.12":"Stir Fry Noodles","menu.item.food.13":"Fettuccine Alfredo","menu.item.food.14":"Chicken in Curry Sauce","menu.item.food.15":"Chicken with Mountain Thyme","menu.item.food.16":"Fajita Wrap (Chicken)","menu.item.food.17":"Chicken Quesadilla","menu.item.food.18":"Cajun Spiced Crispy Chicken","menu.item.food.19":"Saucy Chicken Külbastı","menu.item.food.20":"Çökertme Kebab (Chicken)","menu.item.food.21":"Çökertme Kebab (Beef)","menu.item.food.22":"Beef Stroganoff","menu.item.food.23":"Kayseri Yağlaması","menu.item.food.24":"Manti"}};

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
        3. HAMBURGER MENÜ (MOBİL NAVİGASYON)
       ============================================================
       Butona tıklanınca:
         - Menü açılır/kapanır
         - Hamburger çizgileri "X" şeklini alır
         - aria-expanded özniteliği güncellenir (A11y)
       ============================================================ */
    if (hamburgerBtn && navList) {
        hamburgerBtn.addEventListener('click', function () {
            // Hamburger'in "X" dönüşümü için class ekle/çıkar
            hamburgerBtn.classList.toggle('nav__hamburger--active');
            // Menü listesinin görünürlüğünü değiştir
            navList.classList.toggle('nav__list--open');
            // Erişilebilirlik: menü durumunu güncelle
            const isOpen = navList.classList.contains('nav__list--open');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
        });
    }


    /* ============================================================
       3. KARANLIK MOD (DARK MODE) TERCİHİ
       ============================================================
       - Kullanıcı butona tıklayınca dark mode açılır/kapanır.
       - Tercih LocalStorage'a kaydedilir.
       - Sayfa yenilendiğinde kaydedilen tercih uygulanır.
       ============================================================ */

    // ---- Sayfa ilk açıldığında LocalStorage'dan tercihi oku ----
    const savedTheme = localStorage.getItem('miracle-theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');  // Güneş ikonu (karanlık moddayken)
    }

    // ---- Butona tıklanınca tema değiştir ----
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            // body'de dark-mode class'ı var mı?
            const isDark = document.body.classList.toggle('dark-mode');

            // İkonu güncelle: karanlıkta güneş, aydınlıkta ay
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
       4. YUMUŞAK KAYDIRMA (SMOOTH SCROLL)
       ============================================================
       Sayfa içi linklere (#ile başlayan) tıklanınca hedef bölüme
       yumuşakça kayar. Header yüksekliği kadar yukarı çeker ki
       içerik sabit navbar'ın altında kalsın.
       ============================================================ */

    // Yardımcı fonksiyon: hedef ID'ye yumuşak kaydırma yapar
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

    // Nav linklerine tıklandığında yumuşak kaydır
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollToTarget(this.getAttribute('href'));

            // Mobilde menüyü kapat (eğer açıksa)
            if (navList && navList.classList.contains('nav__list--open')) {
                navList.classList.remove('nav__list--open');
                hamburgerBtn.classList.remove('nav__hamburger--active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Organizasyon CTA butonu ve diğer sayfa içi linkler
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(function (link) {
        // Sadece nav__link olmayanlara ekle (nav__link zaten yukarıda işlendi)
        if (!link.classList.contains('nav__link')) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                smoothScrollToTarget(this.getAttribute('href'));
            });
        }
    });


    /* ============================================================
       5. MENÜ FİLTRELEME (KATEGORİ SEKMELERİ)
       ============================================================
       Mantık:
       1. Tüm menü öğelerini ve sekme butonlarını seç.
       2. Her butona tıklandığında:
          a) Tüm butonlardan "active" class'ını kaldır,
             tıklanan butona ekle.
          b) Seçilen kategoriyi data-category'den oku.
          c) "all" seçilirse tüm öğeleri göster.
          d) Değilse, yalnızca eşleşen data-category'ye
             sahip öğeleri göster, diğerlerini gizle.
       ============================================================ */

    // ----- HTML'den menü öğelerini ve butonları seç -----
    const menuTabs   = document.querySelectorAll('.menu__tab');     // Tüm kategori butonları
    const menuItems  = document.querySelectorAll('.menu__item');    // Tüm ürün öğeleri

    if (menuTabs.length > 0 && menuItems.length > 0) {

        // Her butona ayrı ayrı tıklama olayı ekle
        menuTabs.forEach(function (tab) {
            tab.addEventListener('click', function () {

                // 1. Tüm butonlardan "active" class'ını ve aria-pressed'i kaldır
                menuTabs.forEach(function (btn) {
                    btn.classList.remove('menu__tab--active');
                    btn.setAttribute('aria-pressed', 'false');
                });

                // 2. Tıklanan butonu aktif yap
                this.classList.add('menu__tab--active');
                this.setAttribute('aria-pressed', 'true');

                // 3. Hangi kategori seçildi? ("all", "hot", "cold", "dessert", "food")
                const selectedCategory = this.getAttribute('data-category');

                // 4. Her ürün öğesini kontrol et
                menuItems.forEach(function (item) {
                    // Ürünün kategorisi (data-category değeri)
                    const itemCategory = item.getAttribute('data-category');

                    // Eğer "Tümü" seçildiyse veya ürün kategorisi seçilenle eşleşiyorsa GÖSTER
                    if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                        item.style.display = 'block';    // Göster
                    } else {
                        item.style.display = 'none';     // Gizle
                    }
                });
            });
        });
    }


    /* ============================================================
       7. STICKY HEADER — SCROLL'DA GÖLGE EKLE
       ============================================================
       Sayfa 50px'den fazla kaydırılırsa header'a "scrolled"
       class'ı eklenir, böylece gölge ve opaklık artar.
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
       8. WEB3FORMS İLETİŞİM FORMU (FETCH API)
       ============================================================
       Form backend olmadan çalışsın diye Fetch ile
       Web3Forms API'sine POST yapıyoruz.
       Başarılı/başarısız mesajını kullanıcıya gösteriyoruz.
       ============================================================ */
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();  // Sayfanın yenilenmesini engelle

            // Form verilerini al
            const formData = new FormData(contactForm);

            // Butonu devre dışı bırak (çift tıklama önlemi)
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (i18n.t('contact.form.sending') || 'Gönderiliyor...');
            }

            // Web3Forms API'sine POST isteği gönder
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(function (response) {
                return response.json();  // JSON yanıtı parse et
            })
            .then(function (data) {
                if (data.success) {
                    // Başarılı: yeşil mesaj göster
                    formStatus.textContent = i18n.t('contact.form.success') || 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
                    formStatus.className = 'contact__status contact__status--success';
                    contactForm.reset();  // Formu temizle

                    // Rezervasyon alanlarını da gizle (eğer açıksa)
                    if (reservationDiv) {
                        reservationDiv.classList.remove('contact__reservation-fields--visible');
                        reservationInputs.forEach(function (input) {
                            input.removeAttribute('required');
                            input.removeAttribute('aria-required');
                        });
                    }
                } else {
                    // API hatası: kırmızı mesaj
                    formStatus.textContent = i18n.t('contact.form.error.api') || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
                    formStatus.className = 'contact__status contact__status--error';
                }
            })
            .catch(function () {
                // Ağ hatası
                formStatus.textContent = i18n.t('contact.form.error.network') || 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.';
                formStatus.className = 'contact__status contact__status--error';
            })
            .finally(function () {
                // Butonu tekrar aktif et
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + (i18n.t('contact.form.submit') || 'Mesaj Gönder');
                }
            });
        });
    }

    /* ============================================================
       9. REZERVASYON ALANLARI — GÖSTER / GİZLE
       ============================================================
       Mantık:
       1. Konu seçimindeki <select> değiştiğinde tetiklenir.
       2. "Rezervasyon" seçeneği seçilmişse:
          - #rezervasyonAlanlari div'ine "visible" class'ı eklenir
          - İçindeki input'lara required niteliği eklenir
       3. Başka bir konu seçilmişse:
          - "visible" class'ı kaldırılır
          - required nitelikleri kaldırılır
       ============================================================ */

    // HTML'den rezervasyonla ilgili elemanları seç
    const subjectSelect  = document.getElementById('form-subject');        // Konu seçimi
    reservationDiv       = document.getElementById('rezervasyonAlanlari'); // Rezervasyon alanları div'i

    // Rezervasyon alanındaki input'lar (required ekleyip çıkarmak için)
    reservationInputs = reservationDiv
        ? reservationDiv.querySelectorAll('input')
        : [];

    if (subjectSelect && reservationDiv) {

        // Konu seçimi değişince çalışacak fonksiyon
        subjectSelect.addEventListener('change', function () {

            // Seçilen option'un value değerini al ("Rezervasyon" mu diye kontrol et)
            const selectedValue = this.value;

            if (selectedValue === 'Rezervasyon') {
                // "Rezervasyon" seçildi → alanları göster
                reservationDiv.classList.add('contact__reservation-fields--visible');

                // Tüm rezervasyon input'larına required ekle (zorunlu yap)
                reservationInputs.forEach(function (input) {
                    input.setAttribute('required', '');
                    input.setAttribute('aria-required', 'true');
                });

            } else {
                // Başka bir konu seçildi → alanları gizle
                reservationDiv.classList.remove('contact__reservation-fields--visible');

                // Required niteliklerini kaldır (form gönderimi engellenmesin)
                reservationInputs.forEach(function (input) {
                    input.removeAttribute('required');
                    input.removeAttribute('aria-required');
                });
            }
        });
    }

});  // DOMContentLoaded sonu
