"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Locale = "ru" | "uz" | "en";

const telegramAdmin = "https://t.me/CDL_admin";
const telegramMain = "https://t.me/casadilusso_uzb";
const telegramVintage = "https://t.me/casadilussovintage";

const modernProducts = [
  {
    image: "/images/modern-purple-jug.jpg",
    title: { ru: "Цветное стекло", uz: "Rangli shisha", en: "Colored glassware" },
    price: { ru: "от 650 000 сум", uz: "650 000 so'mdan", en: "from 650,000 UZS" },
  },
  {
    image: "/images/modern-restaurant.jpg",
    title: { ru: "Ресторанная подача", uz: "Restoran servirovkasi", en: "Restaurant serving" },
    price: { ru: "от 480 000 сум", uz: "480 000 so'mdan", en: "from 480,000 UZS" },
  },
  {
    image: "/images/modern-green-close.jpg",
    title: { ru: "Сервировка с акцентом", uz: "Aksentli dasturxon", en: "Statement setting" },
    price: { ru: "от 520 000 сум", uz: "520 000 so'mdan", en: "from 520,000 UZS" },
  },
  {
    image: "/images/green-table.jpg",
    title: { ru: "Современные коллекции", uz: "Zamonaviy kolleksiyalar", en: "Modern collections" },
    price: { ru: "от 390 000 сум", uz: "390 000 so'mdan", en: "from 390,000 UZS" },
  },
];

const vintageProducts = [
  {
    image: "/images/vintage-lemon-table.jpg",
    title: { ru: "Лимонная сервировка", uz: "Limonli servis", en: "Lemon table setting" },
    price: { ru: "цена по запросу", uz: "narx so'rov bo'yicha", en: "price on request" },
  },
  {
    image: "/images/vintage-pink-set.jpg",
    title: { ru: "Фарфор с историей", uz: "Tarixli farfor", en: "Heritage porcelain" },
    price: { ru: "цена по запросу", uz: "narx so'rov bo'yicha", en: "price on request" },
  },
  {
    image: "/images/vintage-tea-berries.jpg",
    title: { ru: "Чайные пары vintage", uz: "Vintage choy juftliklari", en: "Vintage tea pairings" },
    price: { ru: "цена по запросу", uz: "narx so'rov bo'yicha", en: "price on request" },
  },
  {
    image: "/images/vintage-ornate-plates.jpg",
    title: { ru: "Коллекционные тарелки", uz: "Kolleksion likopchalar", en: "Collectible plates" },
    price: { ru: "цена по запросу", uz: "narx so'rov bo'yicha", en: "price on request" },
  },
  {
    image: "/images/vintage-green-table.jpg",
    title: { ru: "Винтажная сервировка", uz: "Vintage dasturxon", en: "Vintage table setting" },
    price: { ru: "цена по запросу", uz: "narx so'rov bo'yicha", en: "price on request" },
  },
  {
    image: "/images/vintage-flower-tea.jpg",
    title: { ru: "Цветочный фарфор", uz: "Gulli farfor", en: "Floral porcelain" },
    price: { ru: "цена по запросу", uz: "narx so'rov bo'yicha", en: "price on request" },
  },
  {
    image: "/images/vintage-blue-breakfast.jpg",
    title: { ru: "Завтрак в стиле vintage", uz: "Vintage nonushta", en: "Vintage breakfast" },
    price: { ru: "цена по запросу", uz: "narx so'rov bo'yicha", en: "price on request" },
  },
];

const gallery = [
  "/images/hero-vintage.jpg",
  "/images/spring-table.jpg",
  "/images/art-plates.jpg",
  "/images/blue-breakfast.jpg",
];

const copy = {
  ru: {
    nav: ["Каталог", "Услуги", "Заказ", "Контакты"],
    eyebrow: "Премиальная посуда и аксессуары",
    titleTop: "Casa",
    titleBottom: "di Lusso",
    subtitle:
      "Профессиональный подбор посуды для дома, офиса и ресторанов с вниманием к стилю, качеству и сервировке.",
    primary: "Оформить заказ",
    secondary: "Смотреть каталог",
    stats: ["15 лет опыта", "Оригинальные бренды", "Доставка по Узбекистану и СНГ"],
    aboutTitle: "Ваш личный посудмейстер",
    about:
      "Мы помогаем собрать посуду, аксессуары, текстиль и подарочные решения под ваш интерьер, событие или ресторанную задачу. В подборе делаем акцент на оригинальность, долговечность и выразительную сервировку.",
    catalogTitle: "Каталог коллекций",
    catalogNote:
      "Разделили ассортимент на современные коллекции и винтажные находки. Актуальные цены и наличие уточняем перед оформлением.",
    modernTitle: "Современные коллекции",
    modernText: "Актуальная посуда, стекло, сервировка и подарочные решения для дома, офиса и ресторанов.",
    vintageTitle: "Винтажные коллекции",
    vintageText: "Редкие предметы, фарфор с историей и коллекционные сервизы для атмосферной сервировки.",
    openCatalog: "Перейти в Telegram каталог",
    openVintage: "Перейти в vintage каталог",
    servicesTitle: "Что можно заказать",
    services: [
      "Подбор посуды и аксессуаров под интерьер",
      "Комплектация дома, офиса, ресторана или кофейни",
      "Подарочные решения для семьи, партнеров и мероприятий",
      "Винтажные находки и коллекционные предметы",
    ],
    orderTitle: "Как оформить заказ",
    steps: [
      "Выберите товар на сайте, в Telegram или отправьте нам референс.",
      "Мы уточним наличие, цену и предложим подходящие варианты.",
      "Для подтверждения заказа вносится предоплата 50%.",
      "Оставшаяся сумма оплачивается после получения товара.",
    ],
    deliveryTitle: "Доставка и оплата",
    delivery:
      "Работаем онлайн без физического адреса. По Ташкенту условия доставки согласовываются при заказе. По Узбекистану, кроме столицы, отправляем через BTS почту. Также оформляем доставку в страны СНГ. Форма оплаты любая.",
    brandsTitle: "Бренды и качество",
    brands:
      "В подборке Casa di Lusso представлены оригинальные товары и бренды уровня Villeroy & Boch, Rosenthal, Bordallo Pinheiro, Seletti, Sieger by Furstenberg, Georg Jensen и другие.",
    contactsTitle: "Связаться с нами",
    contactText: "Для заказа и консультации напишите администратору Casa di Lusso.",
    schedule: "Пн-Сб, 10:00-19:00",
    admin: "Написать @CDL_admin",
  },
  uz: {
    nav: ["Katalog", "Xizmatlar", "Buyurtma", "Aloqa"],
    eyebrow: "Premium idishlar va uy aksessuarlari",
    titleTop: "Casa",
    titleBottom: "di Lusso",
    subtitle:
      "Uy, ofis va restoranlar uchun idishlarni uslub, sifat va dasturxon madaniyatiga mos holda professional tanlab beramiz.",
    primary: "Buyurtma berish",
    secondary: "Katalogni ko'rish",
    stats: ["15 yillik tajriba", "Original brendlar", "O'zbekiston va MDH bo'ylab yetkazish"],
    aboutTitle: "Sizning shaxsiy idish mutaxassisingiz",
    about:
      "Interyeringiz, tadbiringiz yoki restoran ehtiyojingizga mos idishlar, aksessuarlar, tekstil va sovg'a yechimlarini jamlashga yordam beramiz.",
    catalogTitle: "Kolleksiyalar katalogi",
    catalogNote:
      "Assortiment zamonaviy kolleksiyalar va vintage topilmalarga bo'lindi. Aniq narx va mavjudlik buyurtmadan oldin tasdiqlanadi.",
    modernTitle: "Zamonaviy kolleksiyalar",
    modernText: "Uy, ofis va restoranlar uchun dolzarb idishlar, shisha buyumlar, servirovka va sovg'a yechimlari.",
    vintageTitle: "Vintage kolleksiyalar",
    vintageText: "Atmosferali dasturxon uchun noyob buyumlar, tarixli farfor va kolleksion servislar.",
    openCatalog: "Telegram katalogga o'tish",
    openVintage: "Vintage katalogga o'tish",
    servicesTitle: "Nimalarni buyurtma qilish mumkin",
    services: [
      "Interyerga mos idish va aksessuar tanlash",
      "Uy, ofis, restoran yoki qahvaxonani komplektlash",
      "Oila, hamkorlar va tadbirlar uchun sovg'a yechimlari",
      "Vintage va kolleksion buyumlar",
    ],
    orderTitle: "Buyurtma qanday beriladi",
    steps: [
      "Saytdan yoki Telegramdan mahsulot tanlang, yoki bizga namuna yuboring.",
      "Mavjudlik, narx va mos variantlarni aniqlashtiramiz.",
      "Buyurtmani tasdiqlash uchun 50% oldindan to'lov qilinadi.",
      "Qolgan summa mahsulot olingandan keyin to'lanadi.",
    ],
    deliveryTitle: "Yetkazish va to'lov",
    delivery:
      "Faoliyatimiz online, jismoniy manzil yo'q. Toshkent bo'yicha yetkazish shartlari buyurtmada kelishiladi. O'zbekiston bo'ylab, poytaxtdan tashqari, BTS pochta orqali yuboramiz. MDH davlatlariga ham yetkazib beramiz. To'lov shakli istalgan.",
    brandsTitle: "Brendlar va sifat",
    brands:
      "Casa di Lusso tanlovida Villeroy & Boch, Rosenthal, Bordallo Pinheiro, Seletti, Sieger by Furstenberg, Georg Jensen va boshqa original brendlar mavjud.",
    contactsTitle: "Biz bilan bog'lanish",
    contactText: "Buyurtma va maslahat uchun Casa di Lusso administratoriga yozing.",
    schedule: "Du-Sh, 10:00-19:00",
    admin: "@CDL_admin ga yozish",
  },
  en: {
    nav: ["Catalog", "Services", "Order", "Contacts"],
    eyebrow: "Premium tableware and home accessories",
    titleTop: "Casa",
    titleBottom: "di Lusso",
    subtitle:
      "Professional tableware selection for homes, offices and restaurants with a focus on style, quality and refined table setting.",
    primary: "Place an order",
    secondary: "View catalog",
    stats: ["15 years of expertise", "Original brands", "Delivery across Uzbekistan and CIS"],
    aboutTitle: "Your personal tableware expert",
    about:
      "We curate tableware, accessories, textiles and gifts for interiors, occasions and hospitality projects with a focus on authenticity and expressive serving.",
    catalogTitle: "Collection catalog",
    catalogNote:
      "The assortment is divided into modern collections and vintage finds. Current prices and availability are confirmed before ordering.",
    modernTitle: "Modern collections",
    modernText: "Current tableware, glassware, serving pieces and gift solutions for homes, offices and restaurants.",
    vintageTitle: "Vintage collections",
    vintageText: "Rare objects, heritage porcelain and collectible sets for atmospheric table settings.",
    openCatalog: "Open Telegram catalog",
    openVintage: "Open vintage catalog",
    servicesTitle: "What you can order",
    services: [
      "Tableware and accessories matched to your interior",
      "Complete sets for homes, offices, restaurants and cafes",
      "Gift solutions for family, partners and events",
      "Vintage finds and collectible pieces",
    ],
    orderTitle: "How to order",
    steps: [
      "Choose an item on the site, in Telegram, or send us a reference.",
      "We confirm availability, price and suitable alternatives.",
      "A 50% prepayment confirms the order.",
      "The remaining amount is paid after receiving the goods.",
    ],
    deliveryTitle: "Delivery and payment",
    delivery:
      "We operate online without a physical address. Tashkent delivery terms are agreed per order. Across Uzbekistan, except the capital, we ship via BTS post. We also arrange delivery to CIS countries. Any payment method is accepted.",
    brandsTitle: "Brands and quality",
    brands:
      "Casa di Lusso offers original pieces from Villeroy & Boch, Rosenthal, Bordallo Pinheiro, Seletti, Sieger by Furstenberg, Georg Jensen and more.",
    contactsTitle: "Contact us",
    contactText: "For orders and consultation, message the Casa di Lusso administrator.",
    schedule: "Mon-Sat, 10:00-19:00",
    admin: "Message @CDL_admin",
  },
};

function telegramHref(locale: Locale) {
  const text =
    locale === "ru"
      ? "Здравствуйте! Хочу оформить заказ в Casa di Lusso."
      : locale === "uz"
        ? "Salom! Casa di Lusso orqali buyurtma bermoqchiman."
        : "Hello! I would like to place an order with Casa di Lusso.";

  return `${telegramAdmin}?text=${encodeURIComponent(text)}`;
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ru");
  const t = copy[locale];
  const orderLink = useMemo(() => telegramHref(locale), [locale]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Casa di Lusso">
          <Image src="/images/brand-mark.png" alt="Casa di Lusso" width={42} height={56} priority />
          <span className="brand-word">Casa di Lusso</span>
        </a>
        <nav aria-label="Primary navigation">
          {t.nav.map((item, index) => (
            <a key={item} href={["#catalog", "#services", "#order", "#contacts"][index]}>
              {item}
            </a>
          ))}
        </nav>
        <div className="locale-switcher" aria-label="Language switcher">
          {(["ru", "uz", "en"] as Locale[]).map((item) => (
            <button
              key={item}
              className={locale === item ? "active" : ""}
              onClick={() => setLocale(item)}
              type="button"
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="logo-title">
            <span>{t.titleTop}</span>
            <em>{t.titleBottom}</em>
          </h1>
          <p>{t.subtitle}</p>
          <div className="hero-actions">
            <a className="button primary" href={orderLink} target="_blank">
              {t.primary}
            </a>
            <a className="button ghost" href="#catalog">
              {t.secondary}
            </a>
          </div>
          <div className="stats">
            {t.stats.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="hero-media">
          <Image
            src="/images/hero-vintage.jpg"
            alt="Casa di Lusso table setting"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>
      </section>

      <section className="intro section">
        <div>
          <p className="eyebrow">Since 15 years</p>
          <h2>{t.aboutTitle}</h2>
        </div>
        <p>{t.about}</p>
      </section>

      <section className="section" id="catalog">
        <div className="section-heading">
          <h2>{t.catalogTitle}</h2>
          <p>{t.catalogNote}</p>
        </div>

        <div className="collection-block">
          <div className="collection-intro">
            <div>
              <p className="eyebrow">Modern</p>
              <h3>{t.modernTitle}</h3>
              <p>{t.modernText}</p>
            </div>
            <a className="button primary" href={telegramMain} target="_blank">
              {t.openCatalog}
            </a>
          </div>
          <div className="product-grid">
            {modernProducts.map((product) => (
              <article className="product-card" key={product.image}>
                <div className="product-image">
                  <Image src={product.image} alt={product.title[locale]} fill sizes="(max-width: 800px) 100vw, 25vw" />
                </div>
                <div>
                  <h3>{product.title[locale]}</h3>
                  <p>{product.price[locale]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="collection-block vintage">
          <div className="collection-intro">
            <div>
              <p className="eyebrow">Vintage</p>
              <h3>{t.vintageTitle}</h3>
              <p>{t.vintageText}</p>
            </div>
            <a className="button primary" href={telegramVintage} target="_blank">
              {t.openVintage}
            </a>
          </div>
          <div className="product-grid vintage-grid">
            {vintageProducts.map((product) => (
              <article className="product-card" key={product.image}>
                <div className="product-image">
                  <Image src={product.image} alt={product.title[locale]} fill sizes="(max-width: 800px) 100vw, 25vw" />
                </div>
                <div>
                  <h3>{product.title[locale]}</h3>
                  <p>{product.price[locale]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="split section" id="services">
        <div className="panel">
          <h2>{t.servicesTitle}</h2>
          <ul>
            {t.services.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="gallery">
          {gallery.map((image) => (
            <Image key={image} src={image} alt="Casa di Lusso product styling" width={420} height={560} />
          ))}
        </div>
      </section>

      <section className="section order" id="order">
        <div className="section-heading">
          <h2>{t.orderTitle}</h2>
          <a className="button primary light" href={orderLink} target="_blank">
            {t.primary}
          </a>
        </div>
        <div className="steps">
          {t.steps.map((step, index) => (
            <article key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
        <div className="info-band">
          <h3>{t.deliveryTitle}</h3>
          <p>{t.delivery}</p>
        </div>
      </section>

      <section className="section brands">
        <div>
          <h2>{t.brandsTitle}</h2>
          <p>{t.brands}</p>
        </div>
        <Image src="/images/brand-mark.png" alt="" width={220} height={260} />
      </section>

      <footer className="section footer" id="contacts">
        <div>
          <p className="eyebrow">{t.schedule}</p>
          <h2>{t.contactsTitle}</h2>
          <p>{t.contactText}</p>
        </div>
        <div className="contact-actions">
          <a className="button primary" href={orderLink} target="_blank">
            {t.admin}
          </a>
          <a className="button ghost" href={telegramMain} target="_blank">
            Telegram
          </a>
          <a className="button ghost" href={telegramVintage} target="_blank">
            Vintage
          </a>
          <a className="button ghost" href="https://www.instagram.com/casadilusso.uzb/" target="_blank">
            Instagram
          </a>
        </div>
      </footer>
      <a className="back-to-top" href="#top" aria-label="Scroll to top">
        ↑
      </a>
    </main>
  );
}
