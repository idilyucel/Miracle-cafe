# Miracle Coffee & Shop

 Tek sayfa (single page) uygulaması.

## Özellikler

- Responsive tasarım (mobil/tablet/masaüstü)
- Türkçe / İngilizce dil desteği (i18n)
- Menü kategorisi filtreleme
- İletişim formu (Web3Forms)
- Galeri mozaiği
- Organizasyon kartları

## Kullanılan Teknolojiler

- HTML5, CSS3, JavaScript (vanilla)
- Google Fonts (Poppins) → sistem fontuna çevrildi
- Font Awesome 6 (solid only)
- WebP görsel formatı

## Çalıştırma

Herhangi bir statik sunucu ile açılabilir:

```bash
npx serve .
Performans Optimizasyonları
- Görseller WebP formatında ve 800px genişliğe optimize edildi
- CSS/JS/HTML minify edildi
- Kritik CSS inline, geri kalanı async yüklendi
- JavaScript translations ayrı dosyaya alındı
- Kullanılmayan dosyalar temizlendi
- Font Awesome sadece solid ikonlar (non-blocking)
- Görsel lazy loading
