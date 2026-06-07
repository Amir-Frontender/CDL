"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowUpRight,
  BadgeCheck,
  Camera,
  ChevronDown,
  Gem,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type FaqItem = {
  question: string;
  answer: string;
};

type Locale = "ru" | "en" | "uz";

const telegramAdmin = "https://t.me/CDL_admin";
const telegramMain = "https://t.me/casadilusso_uzb";
const telegramVintage = "https://t.me/casadilussovintage";
const instagram = "https://www.instagram.com/casadilusso.uzb/";
const whatsapp = "https://api.whatsapp.com/send?text=Hello%20Casa%20di%20Lusso%2C%20I%20would%20like%20to%20view%20the%20collection.";

const localeLabels: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  uz: "UZ",
};

const copy = {
  ru: {
    nav: ["Коллекция", "Почему мы", "Галерея", "Контакты"],
    telegram: "Telegram",
    heroKicker: "Premium Tableware & Vintage Collections",
    heroTitle: "Casa di Lusso",
    heroLead: "Curated luxury tableware and timeless vintage pieces for elegant living.",
    viewCollection: "View Collection",
    contactUs: "Contact Us",
    scroll: "Scroll",
    introKicker: "Европейская культура сервировки, отобранная сдержанно и точно.",
    introTitle: "Премиальная посуда для дома, интерьера и private hospitality.",
    introText:
      "Casa di Lusso подбирает современную сервировку, коллекционный фарфор и винтажные предметы для столов, которые выглядят персонально, собранно и запоминаются.",
    collectionKicker: "Коллекция",
    collectionTitle: "Предметы, выбранные за выразительность, баланс и происхождение.",
    collectionText:
      "От современного стекла до редких фарфоровых сервизов: каждая позиция рассматривается как часть интерьера, где важны пропорции, отделка, цвет и атмосфера.",
    productCta: "Подробнее",
    whyKicker: "Why Casa di Lusso",
    whyTitle: "Тихая роскошь и внимательная работа с деталями.",
    brandsKicker: "Featured Brands",
    galleryKicker: "Галерея",
    galleryTitle: "Сервировка с настроением старой европейской квартиры.",
    galleryText: "Вдохновляющие сцены, винтажные находки и современные акценты для элегантной жизни.",
    testimonialsKicker: "Отзывы",
    testimonialsTitle: "Нам доверяют те, кому важно ощущение за столом.",
    faqKicker: "FAQ",
    faqTitle: "Детали перед заказом.",
    contactKicker: "Контакты",
    contactTitle: "Позвольте нам собрать вашу следующую сервировку.",
    contactText:
      "Отправьте референс, уточните наличие или запросите персональную подборку современной и винтажной посуды.",
    footerText: "Copyright 2026 Casa di Lusso. Премиальная посуда и винтажные коллекции.",
    products: [
      ["Цветное стекло", "Акценты в итальянском настроении", "от 650 000 сум"],
      ["Ресторанная подача", "Профессиональные предметы для hospitality", "от 480 000 сум"],
      ["Акцентная сервировка", "Современная многослойная подача", "от 520 000 сум"],
      ["Современные коллекции", "Изысканные ежедневные ритуалы", "от 390 000 сум"],
      ["Фарфор с историей", "Редкие цветочные фарфоровые находки", "цена по запросу"],
      ["Коллекционные тарелки", "Декоративная европейская классика", "цена по запросу"],
    ],
    why: [
      ["Carefully Selected Collections", "Каждый предмет выбран по пропорции, состоянию, отделке и тому, как он живет на столе."],
      ["Premium Quality", "Оригинальная посуда, стекло и фарфор от признанных европейских домов."],
      ["Worldwide Delivery", "Бережная упаковка и согласованная доставка по Узбекистану, СНГ и отдельным международным направлениям."],
      ["Exclusive Vintage Pieces", "Лимитированные предметы с историей, характером и тихой драматургией настоящей сервировки."],
    ],
    stats: ["Товаров", "Винтажных коллекций", "Довольных клиентов", "Стран доставки"],
    testimonials: [
      ["Casa di Lusso нашли фарфоровый сервиз, который ощущается собранным, а не просто купленным. Стол полностью изменился.", "Мадина Р.", "Частный клиент"],
      ["Подбор элегантный и точный. Нам предложили варианты под интерьерную палитру и формат сервиса.", "Даниэль К.", "Ресторатор"],
      ["Красивые винтажные предметы, аккуратная упаковка и очень спокойная премиальная консультация с первого сообщения.", "Лола А.", "Стилист интерьеров"],
    ],
    faqs: [
      ["Delivery", "Доставка по Ташкенту согласовывается индивидуально. Региональные и международные заказы бережно упаковываются и отправляются надежными службами."],
      ["Payment", "Заказ подтверждается предоплатой. Финальные условия оплаты согласовываются до отправки с учетом наличия и маршрута."],
      ["Product Authenticity", "Мы работаем с оригинальными брендовыми предметами и заранее раскрываем состояние винтажа, включая видимые следы времени."],
      ["Returns", "Возвраты рассматриваются индивидуально. Хрупкие и винтажные предметы требуют проверки состояния перед подтверждением."],
    ],
  },
  en: {
    nav: ["Collection", "Why us", "Gallery", "Contact"],
    telegram: "Telegram",
    heroKicker: "Premium Tableware & Vintage Collections",
    heroTitle: "Casa di Lusso",
    heroLead: "Curated luxury tableware and timeless vintage pieces for elegant living.",
    viewCollection: "View Collection",
    contactUs: "Contact Us",
    scroll: "Scroll",
    introKicker: "European table culture, selected with restraint.",
    introTitle: "Luxury tableware for homes, interiors and private hospitality.",
    introText:
      "Casa di Lusso curates modern serving pieces, collectible porcelain and refined vintage finds for tables that feel personal, composed and quietly memorable.",
    collectionKicker: "The Collection",
    collectionTitle: "Objects chosen for presence, balance and provenance.",
    collectionText:
      "From contemporary glassware to rare porcelain services, every selection is treated like an interior detail: proportion, finish, color and atmosphere matter.",
    productCta: "View details",
    whyKicker: "Why Casa di Lusso",
    whyTitle: "Quiet luxury, handled with obsessive care.",
    brandsKicker: "Featured Brands",
    galleryKicker: "Gallery",
    galleryTitle: "Table scenes with the mood of an old European apartment.",
    galleryText: "Explore styling references, vintage finds and modern table accents curated for elegant living.",
    testimonialsKicker: "Testimonials",
    testimonialsTitle: "Trusted by people who care how a table feels.",
    faqKicker: "FAQ",
    faqTitle: "Details before your order.",
    contactKicker: "Contact Section",
    contactTitle: "Let us curate your next table setting.",
    contactText: "Send a reference, ask for availability or request a private selection of modern and vintage tableware.",
    footerText: "Copyright 2026 Casa di Lusso. Curated luxury tableware and vintage collections.",
    products: [
      ["Colored Glassware", "Italian inspired table accents", "from 650,000 UZS"],
      ["Restaurant Serving", "Professional hospitality pieces", "from 480,000 UZS"],
      ["Statement Setting", "Layered modern tableware", "from 520,000 UZS"],
      ["Modern Collections", "Refined daily rituals", "from 390,000 UZS"],
      ["Heritage Porcelain", "Rare floral porcelain finds", "price on request"],
      ["Collectible Plates", "Decorative European classics", "price on request"],
    ],
    why: [
      ["Carefully Selected Collections", "Every piece is chosen for proportion, condition, finish and the way it lives on a table."],
      ["Premium Quality", "Original tableware, glassware and porcelain from established European houses."],
      ["Worldwide Delivery", "Careful packing and coordinated delivery across Uzbekistan, CIS and selected international routes."],
      ["Exclusive Vintage Pieces", "Limited pieces with history, character and the quiet drama of proper table culture."],
    ],
    stats: ["Products", "Vintage Collections", "Satisfied Clients", "Countries Served"],
    testimonials: [
      ["Casa di Lusso found a porcelain set that felt collected, not simply purchased. The table changed completely.", "Madina R.", "Private client"],
      ["The curation is elegant and precise. We received options that matched our interior palette and service style.", "Daniel K.", "Restaurant owner"],
      ["Beautiful vintage pieces, careful packing and a very calm, premium consultation from the first message.", "Lola A.", "Interior stylist"],
    ],
    faqs: [
      ["Delivery", "Delivery in Tashkent is arranged individually. Regional and international orders are packed carefully and shipped through trusted carriers."],
      ["Payment", "Orders are confirmed with prepayment. Final payment terms are agreed before dispatch, depending on item availability and route."],
      ["Product Authenticity", "We work with original branded pieces and disclose vintage condition before purchase, including visible marks or age-related details."],
      ["Returns", "Returns are reviewed individually. Fragile and vintage pieces require condition verification before approval."],
    ],
  },
  uz: {
    nav: ["Kolleksiya", "Nega biz", "Galereya", "Aloqa"],
    telegram: "Telegram",
    heroKicker: "Premium Tableware & Vintage Collections",
    heroTitle: "Casa di Lusso",
    heroLead: "Nafis hayot uchun tanlangan premium idishlar va vaqt sinovidan o'tgan vintage buyumlar.",
    viewCollection: "Kolleksiyani ko'rish",
    contactUs: "Bog'lanish",
    scroll: "Scroll",
    introKicker: "Yevropa dasturxon madaniyati, bosiq va did bilan tanlangan.",
    introTitle: "Uy, interyer va private hospitality uchun premium idishlar.",
    introText:
      "Casa di Lusso zamonaviy servis buyumlari, kolleksion farfor va nafis vintage topilmalarni shaxsiy, uyg'un va esda qoladigan dasturxonlar uchun tanlaydi.",
    collectionKicker: "Kolleksiya",
    collectionTitle: "Ifoda, muvozanat va kelib chiqishiga qarab tanlangan buyumlar.",
    collectionText:
      "Zamonaviy shisha buyumlardan noyob farfor servislargacha: har bir tanlov interyer detali sifatida ko'riladi.",
    productCta: "Batafsil",
    whyKicker: "Why Casa di Lusso",
    whyTitle: "Sokin hashamat va detallarga juda ehtiyotkor yondashuv.",
    brandsKicker: "Featured Brands",
    galleryKicker: "Galereya",
    galleryTitle: "Eski Yevropa xonadoni kayfiyatidagi dasturxon sahnalari.",
    galleryText: "Nafis hayot uchun tanlangan styling namunalar, vintage topilmalar va zamonaviy aksentlar.",
    testimonialsKicker: "Mijozlar fikri",
    testimonialsTitle: "Dasturxon hissiyotiga e'tibor beradiganlar bizga ishonadi.",
    faqKicker: "FAQ",
    faqTitle: "Buyurtmadan oldingi tafsilotlar.",
    contactKicker: "Aloqa",
    contactTitle: "Keyingi dasturxoningizni siz uchun jamlaymiz.",
    contactText: "Referens yuboring, mavjudlikni so'rang yoki zamonaviy va vintage idishlar bo'yicha shaxsiy tanlov oling.",
    footerText: "Copyright 2026 Casa di Lusso. Premium idishlar va vintage kolleksiyalar.",
    products: [
      ["Rangli shisha", "Italyancha kayfiyatdagi stol aksentlari", "650 000 so'mdan"],
      ["Restoran servisi", "Hospitality uchun professional buyumlar", "480 000 so'mdan"],
      ["Aksentli dasturxon", "Zamonaviy qatlamli servis", "520 000 so'mdan"],
      ["Zamonaviy kolleksiyalar", "Nafis kundalik marosimlar", "390 000 so'mdan"],
      ["Tarixli farfor", "Noyob gulli farfor topilmalar", "narx so'rov bo'yicha"],
      ["Kolleksion likopchalar", "Dekorativ Yevropa klassikasi", "narx so'rov bo'yicha"],
    ],
    why: [
      ["Carefully Selected Collections", "Har bir buyum proporsiya, holat, pardoz va dasturxondagi ta'siriga qarab tanlanadi."],
      ["Premium Quality", "Taniqli Yevropa brendlaridan original idishlar, shisha buyumlar va farfor."],
      ["Worldwide Delivery", "O'zbekiston, MDH va ayrim xalqaro yo'nalishlarga ehtiyotkor qadoqlash va yetkazish."],
      ["Exclusive Vintage Pieces", "Tarix, xarakter va haqiqiy servis madaniyatiga ega limitlangan vintage buyumlar."],
    ],
    stats: ["Mahsulotlar", "Vintage kolleksiyalar", "Mamnun mijozlar", "Yetkazilgan davlatlar"],
    testimonials: [
      ["Casa di Lusso topgan farfor servis oddiy xarid emas, yig'ilgan kolleksiya kabi sezildi. Dasturxon butunlay o'zgardi.", "Madina R.", "Xususiy mijoz"],
      ["Tanlov nafis va aniq. Interyer palitrasi va servis uslubimizga mos variantlar oldik.", "Daniel K.", "Restoran egasi"],
      ["Chiroyli vintage buyumlar, ehtiyotkor qadoqlash va birinchi xabardan premium maslahat.", "Lola A.", "Interyer stilisti"],
    ],
    faqs: [
      ["Delivery", "Toshkent bo'yicha yetkazish individual kelishiladi. Hududiy va xalqaro buyurtmalar ehtiyotkor qadoqlanib ishonchli xizmatlar orqali yuboriladi."],
      ["Payment", "Buyurtma oldindan to'lov bilan tasdiqlanadi. Yakuniy to'lov shartlari mavjudlik va yo'nalishga qarab kelishiladi."],
      ["Product Authenticity", "Biz original brend buyumlari bilan ishlaymiz va vintage holatini, jumladan vaqt izlarini, oldindan ko'rsatamiz."],
      ["Returns", "Qaytarish individual ko'rib chiqiladi. Mo'rt va vintage buyumlar uchun holat tekshiruvi talab qilinadi."],
    ],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const products = [
  {
    image: "/images/modern-purple-jug.jpg",
    title: "Colored Glassware",
    meta: "Italian inspired table accents",
    price: "from 650,000 UZS",
  },
  {
    image: "/images/modern-restaurant.jpg",
    title: "Restaurant Serving",
    meta: "Professional hospitality pieces",
    price: "from 480,000 UZS",
  },
  {
    image: "/images/modern-green-close.jpg",
    title: "Statement Setting",
    meta: "Layered modern tableware",
    price: "from 520,000 UZS",
  },
  {
    image: "/images/green-table.jpg",
    title: "Modern Collections",
    meta: "Refined daily rituals",
    price: "from 390,000 UZS",
  },
  {
    image: "/images/vintage-pink-set.jpg",
    title: "Heritage Porcelain",
    meta: "Rare floral porcelain finds",
    price: "price on request",
  },
  {
    image: "/images/vintage-ornate-plates.jpg",
    title: "Collectible Plates",
    meta: "Decorative European classics",
    price: "price on request",
  },
];

const why = [
  {
    icon: BadgeCheck,
    title: "Carefully Selected Collections",
    text: "Every piece is chosen for proportion, condition, finish and the way it lives on a table.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    text: "Original tableware, glassware and porcelain from established European houses.",
  },
  {
    icon: Truck,
    title: "Worldwide Delivery",
    text: "Careful packing and coordinated delivery across Uzbekistan, CIS and selected international routes.",
  },
  {
    icon: Gem,
    title: "Exclusive Vintage Pieces",
    text: "Limited pieces with history, character and the quiet drama of proper table culture.",
  },
];

const brands = ["Rosenthal", "Villeroy & Boch", "Hutschenreuther", "Wedgwood", "Royal Albert"];

const gallery = [
  { src: "/images/hero-vintage.jpg", alt: "Vintage porcelain table setting", tall: true },
  { src: "/images/spring-table.jpg", alt: "Spring table with luxury tableware" },
  { src: "/images/art-plates.jpg", alt: "Decorative art plates", tall: true },
  { src: "/images/blue-breakfast.jpg", alt: "Blue breakfast porcelain" },
  { src: "/images/vintage-lemon-table.jpg", alt: "Lemon vintage service", tall: true },
  { src: "/images/silver-tea.jpg", alt: "Silver tea service" },
  { src: "/images/vintage-flower-tea.jpg", alt: "Floral porcelain tea pair" },
  { src: "/images/glass-jug.jpg", alt: "Glass jug table detail", tall: true },
];

const stats = [
  { value: 500, suffix: "+", label: "Products" },
  { value: 50, suffix: "+", label: "Vintage Collections" },
  { value: 100, suffix: "+", label: "Satisfied Clients" },
  { value: 10, suffix: "+", label: "Countries Served" },
];

function orderHref() {
  const text = "Hello! I would like to view the Casa di Lusso collection.";
  return `${telegramAdmin}?text=${encodeURIComponent(text)}`;
}

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        const duration = 1300;
        const start = performance.now();
        const tick = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <article className="faq-item" key={item.question}>
          <button
            aria-expanded={open === index}
            aria-controls={`faq-${index}`}
            onClick={() => setOpen(open === index ? -1 : index)}
            type="button"
          >
            <span>{item.question}</span>
            <ChevronDown aria-hidden className={open === index ? "is-open" : ""} />
          </button>
          <div className="faq-answer" id={`faq-${index}`} hidden={open !== index}>
            <p>{item.answer}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const orderLink = useMemo(() => orderHref(), []);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [locale, setLocale] = useState<Locale>("ru");
  const t = copy[locale];
  const localizedProducts = products.map((product, index) => ({
    image: product.image,
    title: t.products[index][0],
    meta: t.products[index][1],
    price: t.products[index][2],
  }));
  const localizedWhy = why.map((item, index) => ({
    icon: item.icon,
    title: t.why[index][0],
    text: t.why[index][1],
  }));
  const localizedStats = stats.map((item, index) => ({
    ...item,
    label: t.stats[index],
  }));
  const localizedTestimonials = t.testimonials.map(([quote, name, role]) => ({ quote, name, role }));
  const localizedFaqs = t.faqs.map(([question, answer]) => ({ question, answer }));

  return (
    <main>
      <SmoothScroll />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Casa di Lusso home">
          <Image src="/images/brand-mark.png" alt="" width={34} height={46} priority />
          <span>Casa di Lusso</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#collection">{t.nav[0]}</a>
          <a href="#why">{t.nav[1]}</a>
          <a href="#gallery">{t.nav[2]}</a>
          <a href="#contacts">{t.nav[3]}</a>
        </nav>
        <div className="locale-switcher" aria-label="Language switcher">
          {(["ru", "en", "uz"] as Locale[]).map((item) => (
            <button
              className={locale === item ? "active" : ""}
              key={item}
              onClick={() => setLocale(item)}
              type="button"
            >
              {localeLabels[item]}
            </button>
          ))}
        </div>
        <a className="header-action" href={orderLink} target="_blank" rel="noreferrer">
          <Send size={16} />
          <span>{t.telegram}</span>
        </a>
      </header>

      <section className="hero" id="top" ref={heroRef}>
        <motion.div className="hero-image" style={{ y: heroY, scale: heroScale }}>
          <Image
            src="/images/hero-service.jpg"
            alt="Premium Casa di Lusso table setting"
            fill
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="hero-overlay" />
        <motion.div className="hero-content" initial={false} animate={{ opacity: 1, y: 0 }}>
          <motion.p className="eyebrow">
            {t.heroKicker}
          </motion.p>
          <motion.h1>{t.heroTitle}</motion.h1>
          <motion.p className="hero-lead">
            {t.heroLead}
          </motion.p>
          <motion.div className="hero-actions">
            <a className="button primary" href="#collection">
              {t.viewCollection}
              <ArrowUpRight size={17} />
            </a>
            <a className="button ghost" href="#contacts">
              {t.contactUs}
            </a>
          </motion.div>
        </motion.div>
        <div className="hero-scroll">{t.scroll}</div>
      </section>

      <Reveal className="intro section">
        <div className="section-kicker">{t.introKicker}</div>
        <div>
          <h2>{t.introTitle}</h2>
          <p>{t.introText}</p>
        </div>
      </Reveal>

      <section className="section" id="collection">
        <Reveal className="section-heading">
          <p className="eyebrow">{t.collectionKicker}</p>
          <h2>{t.collectionTitle}</h2>
          <p>{t.collectionText}</p>
        </Reveal>

        <motion.div
          className="product-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {localizedProducts.map((product) => (
            <motion.article className="product-card" variants={fadeUp} key={product.image}>
              <a href={telegramMain} target="_blank" rel="noreferrer" aria-label={`View ${product.title}`}>
                <div className="product-image">
                  <Image src={product.image} alt={product.title} fill sizes="(max-width: 760px) 100vw, 33vw" />
                  <span className="product-overlay">{t.productCta}</span>
                </div>
                <div className="product-copy">
                  <span>{product.meta}</span>
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                </div>
              </a>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <section className="section why" id="why">
        <Reveal className="section-heading centered">
          <p className="eyebrow">{t.whyKicker}</p>
          <h2>{t.whyTitle}</h2>
        </Reveal>

        <motion.div
          className="why-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {localizedWhy.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article className="why-card" variants={fadeUp} key={item.title}>
                <Icon aria-hidden />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      <Reveal className="section logo-wall">
        <p className="eyebrow">{t.brandsKicker}</p>
        <div className="brand-wall" aria-label="Featured tableware brands">
          {brands.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>
      </Reveal>

      <section className="section gallery-section" id="gallery">
        <Reveal className="section-heading">
          <p className="eyebrow">{t.galleryKicker}</p>
          <h2>{t.galleryTitle}</h2>
          <p>{t.galleryText}</p>
        </Reveal>

        <motion.div
          className="masonry"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {gallery.map((item, index) => (
            <motion.button
              className={item.tall ? "gallery-tile tall" : "gallery-tile"}
              type="button"
              onClick={() => setLightbox(index)}
              variants={fadeUp}
              key={item.src}
            >
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 25vw" />
            </motion.button>
          ))}
        </motion.div>
      </section>

      <section className="statistics">
        <div className="stats-grid">
          {localizedStats.map((item) => (
            <Reveal className="stat-card" key={item.label}>
              <AnimatedCounter value={item.value} suffix={item.suffix} />
              <p>{item.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section testimonials">
        <Reveal className="section-heading">
          <p className="eyebrow">{t.testimonialsKicker}</p>
          <h2>{t.testimonialsTitle}</h2>
        </Reveal>
        <Reveal>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={18}
            slidesPerView={1}
            breakpoints={{ 860: { slidesPerView: 3 } }}
            className="testimonial-swiper"
          >
            {localizedTestimonials.map((item) => (
              <SwiperSlide key={item.name}>
                <article className="testimonial-card">
                  <Sparkles aria-hidden />
                  <p>&ldquo;{item.quote}&rdquo;</p>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </section>

      <section className="section faq">
        <Reveal className="section-heading">
          <p className="eyebrow">{t.faqKicker}</p>
          <h2>{t.faqTitle}</h2>
        </Reveal>
        <Reveal>
          <FaqAccordion items={localizedFaqs} />
        </Reveal>
      </section>

      <section className="contact section" id="contacts">
        <Reveal>
          <p className="eyebrow">{t.contactKicker}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
          <div className="contact-actions">
            <a className="contact-link" href={telegramMain} target="_blank" rel="noreferrer">
              <Send />
              Telegram
            </a>
            <a className="contact-link" href={instagram} target="_blank" rel="noreferrer">
              <Camera />
              Instagram
            </a>
            <a className="contact-link" href={whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <a className="footer-brand" href="#top" aria-label="Casa di Lusso home">
          <Image src="/images/brand-mark.png" alt="" width={40} height={54} />
          <span>Casa di Lusso</span>
        </a>
        <div className="footer-links">
          <a href="#collection">{t.nav[0]}</a>
          <a href="#why">{t.nav[1]}</a>
          <a href="#gallery">{t.nav[2]}</a>
          <a href="#contacts">{t.nav[3]}</a>
        </div>
        <div className="footer-social">
          <a href={telegramMain} target="_blank" rel="noreferrer" aria-label="Telegram">
            <Send size={18} />
          </a>
          <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Camera size={18} />
          </a>
          <a href={telegramVintage} target="_blank" rel="noreferrer" aria-label="Vintage Telegram">
            <Gem size={18} />
          </a>
          <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <MessageCircle size={18} />
          </a>
        </div>
        <p>{t.footerText}</p>
      </footer>

      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image">
          <button className="lightbox-close" type="button" onClick={() => setLightbox(null)} aria-label="Close">
            <X />
          </button>
          <button
            className="lightbox-stage"
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close gallery image"
          >
            <Image src={gallery[lightbox].src} alt={gallery[lightbox].alt} fill sizes="100vw" priority />
          </button>
        </div>
      )}
    </main>
  );
}
