import React, { useState, useMemo } from "react";
import {
  MapPin, Star, Search, Sparkles, Menu, X, Heart,
  Phone, Globe, Clock, ChevronRight, ChevronLeft, Check,
  Utensils, ArrowRight, LogOut, ExternalLink, SlidersHorizontal,
} from "lucide-react";

/* ── Design tokens ────────────────────────────────────────────── */
const C = {
  bg: "#FAF8F5",
  surface: "#FFFFFF",
  ink: "#1A1815",
  inkSoft: "#8A8278",
  line: "#ECE6DD",
  lineSoft: "#F3EFE8",
  accent: "#B8390E",
  accentDark: "#8F2C0A",
  accentSoft: "#FAEEE6",
  gold: "#C29A42",
  shadow: "0 1px 3px rgba(26,24,21,0.06), 0 8px 24px -12px rgba(26,24,21,0.12)",
  shadowLg: "0 4px 12px rgba(26,24,21,0.08), 0 24px 48px -20px rgba(26,24,21,0.18)",
};

const FONT = "https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600&display=swap";
const DISPLAY = "'Fraunces', Georgia, serif";
const BODY = "'Inter', system-ui, sans-serif";

const px = (id: number, w = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/* ── Image pools ──────────────────────────────────────────────── */
const GALLERY: Record<string, number[]> = {
  pizza: [6223172, 1878346, 6605187, 9543813],
  sushi: [28559483, 31393434, 4724481, 2098143],
  burger: [5488052, 3727243, 36691286, 4315148],
  steak: [14515091, 27643017, 36683019, 36630840],
  vegetarian: [33323285, 4958946, 6065181, 3026013],
  asian: [24243345, 3054690, 28895978, 29145757],
  mexican: [36498696, 25391591, 36498704, 34289262],
  italian: [546945, 1438672, 8917285, 31637791],
  seafood: [16743486, 14499018, 19524049, 33041124],
  brunch: [8616015, 2874780, 947898, 35160887],
  dessert: [39240983, 39240989, 31928755, 32916204],
};

/* ── Data ─────────────────────────────────────────────────────── */
const CITIES = ["București", "Craiova", "Cluj-Napoca", "Timișoara", "Brașov", "Constanța", "Iași", "Sibiu", "Oradea", "Galați", "Ploiești", "Arad", "Bacău", "Târgu Mureș"];

const CUISINES = [
  { id: "pizza", label: "Pizza", icon: "🍕" },
  { id: "sushi", label: "Sushi", icon: "🍣" },
  { id: "burger", label: "Burger", icon: "🍔" },
  { id: "steak", label: "Steak", icon: "🥩" },
  { id: "italian", label: "Italian", icon: "🍝" },
  { id: "asian", label: "Asian", icon: "🍜" },
  { id: "mexican", label: "Mexican", icon: "🌮" },
  { id: "vegetarian", label: "Vegetarian", icon: "🥗" },
  { id: "seafood", label: "Fructe de mare", icon: "🦐" },
  { id: "brunch", label: "Brunch", icon: "🥐" },
  { id: "dessert", label: "Desert", icon: "🍰" },
  { id: "orice", label: "Orice", icon: "✨" },
];

const BUDGETS = ["€", "€€", "€€€", "€€€€"];

const MOODS = [
  { id: "romantic", label: "Romantic", icon: "❤️" },
  { id: "familie", label: "Familie", icon: "👨‍👩‍👧" },
  { id: "elegant", label: "Elegant", icon: "🍷" },
  { id: "casual", label: "Casual", icon: "😎" },
  { id: "distractie", label: "Distracție", icon: "🎉" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "rooftop", label: "Rooftop", icon: "🌃" },
];

type Booking = { type: "online" | "phone" | "website"; url?: string; phone?: string };
type Restaurant = {
  id: number; name: string; city: string; cuisine: string; cuisineLabel: string;
  mood: string; price: string; rating: number; distance: string; openUntil: string;
  image: string; address: string; hours: string; description: string;
  dishes: string[]; booking: Booking; tags?: string[];
};

const R = (d: Partial<Restaurant> & { id: number; name: string; city: string; cuisine: string; cuisineLabel: string; mood: string; price: string; rating: number; image: string; address: string; hours: string; description: string; dishes: string[]; booking: Booking; distance: string; openUntil: string }): Restaurant => d as Restaurant;

const RESTAURANTS: Restaurant[] = [
  R({ id: 1, name: "La Trattoria", city: "Craiova", cuisine: "italian", cuisineLabel: "Italian • Pizza", mood: "romantic", price: "€€", rating: 4.7, distance: "1.2 km", openUntil: "23:00", image: px(1438672), address: "Str. Unirii 14, Craiova", hours: "12:00 – 23:00, zilnic", description: "Un colț liniștit de Italia, cu paste proaspete și un fond muzical discret. Ideal pentru o cină pe îndelete.", dishes: ["Tagliatelle al tartufo", "Pizza Margherita DOP", "Tiramisu de casă"], booking: { type: "online", url: "#" }, tags: ["Paste făcute în casă", "Vinuri toscane"] }),
  R({ id: 2, name: "Burger Society", city: "Craiova", cuisine: "burger", cuisineLabel: "Burger • American", mood: "casual", price: "€", rating: 4.5, distance: "0.8 km", openUntil: "22:00", image: px(5488052), address: "Bd. Carol I 22, Craiova", hours: "11:00 – 22:00, zilnic", description: "Chifle coapte în casă, carne măcinată zilnic și un tonus relaxat, prietenos cu grupurile mari.", dishes: ["Smash Burger clasic", "Burger cu cheddar afumat", "Cartofi cu rozmarin"], booking: { type: "phone", phone: "+40 251 123 456" }, tags: ["Carne Angus", "Bere artizanală"] }),
  R({ id: 3, name: "Sakura Sushi Bar", city: "București", cuisine: "sushi", cuisineLabel: "Sushi • Asian", mood: "elegant", price: "€€€", rating: 4.8, distance: "2.4 km", openUntil: "23:30", image: px(31393436), address: "Str. Dorobanți 45, București", hours: "12:30 – 23:30, zilnic", description: "Pește proaspăt adus zilnic și o sală elegantă cu tejghea deschisă, perfectă pentru o seară specială.", dishes: ["Omakase 8 piese", "Sashimi de ton roșu", "Ramen tonkotsu"], booking: { type: "online", url: "#" }, tags: ["Omakase", "Tejghea deschisă"] }),
  R({ id: 4, name: "Casa Boierească", city: "București", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "business", price: "€€€€", rating: 4.6, distance: "3.1 km", openUntil: "00:00", image: px(27643017), address: "Calea Victoriei 88, București", hours: "12:00 – 00:00, zilnic", description: "Cărnuri maturate uscat, o carte de vinuri solidă și săli separate pentru întâlniri de afaceri.", dishes: ["Ribeye maturat 30 zile", "Tartar de vită", "Cartofi gratinați"], booking: { type: "website", url: "#" }, tags: ["Cărnuri maturate", "Somelier"] }),
  R({ id: 5, name: "Verde Bistro", city: "Cluj-Napoca", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.4, distance: "1.5 km", openUntil: "21:30", image: px(6065181), address: "Str. Memorandumului 12, Cluj-Napoca", hours: "09:00 – 21:30, zilnic", description: "Meniu sezonier construit în jurul legumelor de la producători locali, într-un decor luminos.", dishes: ["Bowl cu quinoa și legume la grătar", "Supă cremă de dovleac", "Tarta de mere"], booking: { type: "phone", phone: "+40 264 987 654" }, tags: ["Farm-to-table", "Sezonier"] }),
  R({ id: 6, name: "Rooftop 21", city: "Cluj-Napoca", cuisine: "asian", cuisineLabel: "Asian Fusion", mood: "rooftop", price: "€€€", rating: 4.6, distance: "2.0 km", openUntil: "01:00", image: px(37844216), address: "Str. Napoca 21, etaj 8, Cluj-Napoca", hours: "17:00 – 01:00, zilnic", description: "Panoramă asupra orașului, cocktailuri de autor și un meniu asiatic gândit pentru împărțit.", dishes: ["Bao cu piept de rață", "Tataki de ton", "Curry verde"], booking: { type: "online", url: "#" }, tags: ["Panoramă oraș", "Cocktailuri de autor"] }),
  R({ id: 7, name: "Taco Loco", city: "Timișoara", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.3, distance: "0.6 km", openUntil: "23:00", image: px(36498696), address: "Piața Victoriei 5, Timișoara", hours: "12:00 – 23:00, zilnic", description: "Muzică bună, tortilla făcută pe loc și un happy-hour care umple terasa în fiecare seară.", dishes: ["Tacos al pastor", "Guacamole proaspăt", "Quesadilla cu brânză"], booking: { type: "phone", phone: "+40 256 445 221" }, tags: ["Happy-hour", "Terasă"] }),
  R({ id: 8, name: "Pizzeria Napoli", city: "Timișoara", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.7, distance: "1.1 km", openUntil: "22:30", image: px(6223172), address: "Str. Take Ionescu 30, Timișoara", hours: "12:00 – 22:30, zilnic", description: "Cuptor pe lemne adus din Napoli și un aluat lăsat la dospit 48 de ore. Locul preferat al familiilor.", dishes: ["Pizza Napoletana", "Calzone cu ricotta", "Panna cotta"], booking: { type: "online", url: "#" }, tags: ["Cuptor pe lemne", "Aluat 48h"] }),
  R({ id: 9, name: "Bistro de Brașov", city: "Brașov", cuisine: "italian", cuisineLabel: "Italian • Bistro", mood: "romantic", price: "€€", rating: 4.5, distance: "1.8 km", openUntil: "22:00", image: px(8917285), address: "Str. Republicii 40, Brașov", hours: "12:00 – 22:00, zilnic", description: "O sală mică, cu lumânări și ferestre spre stradă, potrivită pentru cine liniștite în doi.", dishes: ["Risotto cu ciuperci", "Ravioli de casă", "Crème brûlée"], booking: { type: "website", url: "#" }, tags: ["Cină romantică", "Lumânări"] }),
  R({ id: 10, name: "Steak & Wine", city: "Constanța", cuisine: "steak", cuisineLabel: "Steak • Vinuri", mood: "elegant", price: "€€€€", rating: 4.8, distance: "2.7 km", openUntil: "00:30", image: px(36683019), address: "Bd. Mamaia 150, Constanța", hours: "13:00 – 00:30, zilnic", description: "Vedere la mare, cramă proprie și fripturi la grătar pe cărbuni de lemn de fag.", dishes: ["Tomahawk pentru două persoane", "Tartar de somon", "Selecție de brânzeturi"], booking: { type: "online", url: "#" }, tags: ["Vedere la mare", "Cramă proprie"] }),
  R({ id: 11, name: "Sushi Ken", city: "Craiova", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "elegant", price: "€€€", rating: 4.7, distance: "1.6 km", openUntil: "23:00", image: px(31393434), address: "Str. Brestei 9, Craiova", hours: "12:00 – 23:00, zilnic", description: "Un mic sanctuar japonez în centrul Craiovei, cu orez preparat după rețetă tradițională.", dishes: ["Set nigiri 10 piese", "Uramaki California", "Miso ramen"], booking: { type: "online", url: "#" }, tags: ["Orez tradițional", "Bar de sake"] }),
  R({ id: 12, name: "Green Fork", city: "Craiova", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Vegan", mood: "casual", price: "€€", rating: 4.4, distance: "0.9 km", openUntil: "21:00", image: px(4958946), address: "Str. Fraților 8, Craiova", hours: "10:00 – 21:00, zilnic", description: "Bowluri colorate, sucuri presate la rece și un spațiu plin de lumină naturală.", dishes: ["Buddha bowl cu năut", "Supă cremă de linte roșie", "Cheesecake vegan"], booking: { type: "phone", phone: "+40 251 220 118" }, tags: ["Sucuri presate", "100% vegetal"] }),
  R({ id: 13, name: "Steakhouse Vlaicu", city: "Craiova", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "business", price: "€€€€", rating: 4.6, distance: "2.1 km", openUntil: "23:30", image: px(36683013), address: "Str. Vlaicu Vodă 3, Craiova", hours: "12:00 – 23:30, zilnic", description: "Cărnuri la grătar pe cărbune, o listă scurtă de vinuri românești și o sală discretă pentru afaceri.", dishes: ["Antricot de vită la grătar", "Cartofi wedges", "Salată de sezon"], booking: { type: "online", url: "#" }, tags: ["Grătar pe cărbune", "Sala privată"] }),
  R({ id: 14, name: "Pizza Roma", city: "București", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.5, distance: "1.4 km", openUntil: "22:30", image: px(9543813), address: "Bd. Unirii 12, București", hours: "11:30 – 22:30, zilnic", description: "Pizza subțire, coaptă rapid la foc mare, într-un local mereu plin de familii în weekend.", dishes: ["Pizza Diavola", "Pizza Quattro Formaggi", "Bruschette cu roșii"], booking: { type: "phone", phone: "+40 21 335 220" }, tags: ["Familie", "Foc mare"] }),
  R({ id: 15, name: "Taco Fiesta", city: "București", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.3, distance: "2.0 km", openUntil: "00:00", image: px(25391591), address: "Str. Lipscani 20, București", hours: "17:00 – 00:00, zilnic", description: "Terasă animată în centrul vechi, margarita înghețată și tacos serviți pe tăvi de tablă.", dishes: ["Tacos de pui la grătar", "Nachos supreme", "Burrito bowl"], booking: { type: "online", url: "#" }, tags: ["Centru vechi", "Margarita"] }),
  R({ id: 16, name: "Curry House", city: "București", cuisine: "asian", cuisineLabel: "Asian • Curry", mood: "casual", price: "€€", rating: 4.5, distance: "3.4 km", openUntil: "22:00", image: px(28895978), address: "Str. Popa Nan 5, București", hours: "12:00 – 22:00, zilnic", description: "Arome intense de curry și un meniu care schimbă rețetele lunar, în funcție de sezon.", dishes: ["Curry verde thailandez", "Pad thai cu creveți", "Orez cu cocos"], booking: { type: "website", url: "#" }, tags: ["Meniu sezonier", "Vegetarian friendly"] }),
  R({ id: 17, name: "Ramen Doi", city: "Cluj-Napoca", cuisine: "asian", cuisineLabel: "Asian • Ramen", mood: "casual", price: "€€", rating: 4.6, distance: "1.0 km", openUntil: "21:30", image: px(24243345), address: "Str. Universității 6, Cluj-Napoca", hours: "11:00 – 21:30, zilnic", description: "Bulion tras la foc mic timp de 12 ore și un local mic, mereu cu coadă la prânz.", dishes: ["Ramen tonkotsu", "Gyoza la abur", "Ceai verde matcha"], booking: { type: "phone", phone: "+40 264 552 310" }, tags: ["Bulion 12h", "Local autentic"] }),
  R({ id: 18, name: "Casa Toscana", city: "Cluj-Napoca", cuisine: "italian", cuisineLabel: "Italian • Toscan", mood: "romantic", price: "€€€", rating: 4.7, distance: "1.9 km", openUntil: "23:00", image: px(546945), address: "Str. Iuliu Maniu 14, Cluj-Napoca", hours: "12:00 – 23:00, zilnic", description: "Un decor cald, cu grinzi de lemn și lumânări, inspirat de trattoriile din Toscana.", dishes: ["Ossobuco cu risotto", "Bruschette toscane", "Panna cotta cu fructe de pădure"], booking: { type: "online", url: "#" }, tags: ["Grinzi de lemn", "Vinuri toscane"] }),
  R({ id: 19, name: "Burger Lab", city: "Cluj-Napoca", cuisine: "burger", cuisineLabel: "Burger • Craft", mood: "casual", price: "€", rating: 4.4, distance: "0.7 km", openUntil: "22:00", image: px(3727243), address: "Str. Horea 22, Cluj-Napoca", hours: "11:00 – 22:00, zilnic", description: "Combinații experimentale de burgeri, schimbate lunar, plus bere artizanală la halbă.", dishes: ["Burger cu chimen și brânză de capră", "Burger picant cu jalapeño", "Cartofi condimentați"], booking: { type: "website", url: "#" }, tags: ["Meniu lunar", "Bere artizanală"] }),
  R({ id: 20, name: "Sushi Zen", city: "Timișoara", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "elegant", price: "€€€", rating: 4.6, distance: "1.3 km", openUntil: "23:00", image: px(4724481), address: "Str. Alba Iulia 9, Timișoara", hours: "12:30 – 23:00, zilnic", description: "Prezentare minimalistă, pește proaspăt și un bar de sake bine pus la punct.", dishes: ["Sashimi mix", "Dragon roll", "Sake cald"], booking: { type: "online", url: "#" }, tags: ["Minimalist", "Bar de sake"] }),
  R({ id: 21, name: "Trattoria Bella", city: "Timișoara", cuisine: "italian", cuisineLabel: "Italian • Familial", mood: "familie", price: "€€", rating: 4.5, distance: "1.7 km", openUntil: "22:00", image: px(31637791), address: "Piața Unirii 4, Timișoara", hours: "12:00 – 22:00, zilnic", description: "Porții generoase, mese lungi pentru familii numeroase și paste făcute zilnic în bucătărie.", dishes: ["Lasagna clasică", "Tagliatelle cu ciuperci", "Tiramisu"], booking: { type: "phone", phone: "+40 256 220 774" }, tags: ["Familie", "Paste zilnice"] }),
  R({ id: 22, name: "Skyline Lounge", city: "Timișoara", cuisine: "asian", cuisineLabel: "Asian Fusion", mood: "rooftop", price: "€€€", rating: 4.5, distance: "2.2 km", openUntil: "01:00", image: px(4765862), address: "Bd. Take Ionescu 50, etaj 10, Timișoara", hours: "18:00 – 01:00, zilnic", description: "Cea mai înaltă terasă din oraș, cocktailuri semnătură și platouri asiatice pentru grup.", dishes: ["Platou dim sum", "Tataki de Vită", "Curry roșu"], booking: { type: "online", url: "#" }, tags: ["Cea mai înaltă terasă", "Cocktailuri semnătură"] }),
  R({ id: 23, name: "Pizza Montana", city: "Brașov", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.6, distance: "1.0 km", openUntil: "22:30", image: px(12645182), address: "Str. Republicii 12, Brașov", hours: "12:00 – 22:30, zilnic", description: "Vedere spre munte de pe terasă și pizza coaptă în cuptor cu lemne, ideală pentru familii.", dishes: ["Pizza Prosciutto e Funghi", "Pizza Quattro Stagioni", "Salată caprese"], booking: { type: "phone", phone: "+40 268 419 220" }, tags: ["Vedere la munte", "Cuptor cu lemne"] }),
  R({ id: 24, name: "Carnivore Steakhouse", city: "Brașov", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "business", price: "€€€€", rating: 4.7, distance: "1.6 km", openUntil: "23:30", image: px(14515091), address: "Str. Mureșenilor 7, Brașov", hours: "12:30 – 23:30, zilnic", description: "Cărnuri maturate expuse la vedere și o listă de vinuri roșii selectată de un somelier local.", dishes: ["Tomahawk maturat", "Tartar de vită", "Cartofi gratinați cu trufe"], booking: { type: "online", url: "#" }, tags: ["Camera de uscare", "Somelier"] }),
  R({ id: 25, name: "Veggie Garden", city: "Brașov", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.4, distance: "0.8 km", openUntil: "21:00", image: px(33323285), address: "Str. Lungă 18, Brașov", hours: "09:30 – 21:00, zilnic", description: "Grădină interioară cu plante, meniu 100% vegetal și produse de la fermieri din zonă.", dishes: ["Salată de quinoa cu sfeclă", "Supă cremă de ciuperci", "Prăjitură raw cu cacao"], booking: { type: "website", url: "#" }, tags: ["Grădină interioară", "Farm-to-table"] }),
  R({ id: 26, name: "Taco Street", city: "Brașov", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.3, distance: "1.2 km", openUntil: "23:00", image: px(36498704), address: "Str. Nicolae Bălcescu 15, Brașov", hours: "17:00 – 23:00, zilnic", description: "Food-truck devenit local fix, cu tortilla proaspătă și sos picant preparat zilnic.", dishes: ["Tacos de porc pulled", "Elote (porumb mexican)", "Margarita clasică"], booking: { type: "phone", phone: "+40 268 552 903" }, tags: ["Food-truck", "Sos picant de casă"] }),
  R({ id: 27, name: "Marea Sushi", city: "Constanța", cuisine: "sushi", cuisineLabel: "Sushi • Fructe de mare", mood: "romantic", price: "€€€", rating: 4.7, distance: "1.1 km", openUntil: "23:30", image: px(2098143), address: "Bd. Mamaia 78, Constanța", hours: "13:00 – 23:30, zilnic", description: "Pește proaspăt din Marea Neagră și o terasă cu vedere spre apă, ideală la apus.", dishes: ["Sashimi de calcan", "Sushi roll cu creveți", "Tartar de ton"], booking: { type: "online", url: "#" }, tags: ["Vedere la mare", "Pește local"] }),
  R({ id: 28, name: "Burger Port", city: "Constanța", cuisine: "burger", cuisineLabel: "Burger • American", mood: "casual", price: "€", rating: 4.3, distance: "0.9 km", openUntil: "22:00", image: px(36691286), address: "Str. Ștefan cel Mare 33, Constanța", hours: "11:00 – 22:00, zilnic", description: "Burgeri simpli, făcuți bine, la doi pași de plajă, cu limonadă de casă.", dishes: ["Cheeseburger clasic", "Burger cu bacon", "Cartofi prăjiți dublu"], booking: { type: "phone", phone: "+40 241 335 118" }, tags: ["Lângă plajă", "Limonadă de casă"] }),
  R({ id: 29, name: "La Piazza", city: "Constanța", cuisine: "italian", cuisineLabel: "Italian • Familial", mood: "familie", price: "€€", rating: 4.5, distance: "1.5 km", openUntil: "22:30", image: px(1566837), address: "Bd. Tomis 90, Constanța", hours: "12:00 – 22:30, zilnic", description: "Terasă spațioasă lângă mare, porții pentru toată familia și pizza la tavă.", dishes: ["Pizza la tavă cu fructe de mare", "Spaghete alle vongole", "Panna cotta"], booking: { type: "website", url: "#" }, tags: ["Terasă la mare", "Pizza la tavă"] }),
  R({ id: 30, name: "Asian Wave", city: "Constanța", cuisine: "asian", cuisineLabel: "Asian Fusion", mood: "elegant", price: "€€€", rating: 4.6, distance: "2.3 km", openUntil: "00:00", image: px(3054690), address: "Bd. Mamaia 210, Constanța", hours: "13:00 – 00:00, zilnic", description: "Bucătărie asiatică modernă, cu influențe din Vietnam și Thailanda, servită elegant.", dishes: ["Pho de vită", "Tom yum cu creveți", "Bao cu tofu crocant"], booking: { type: "online", url: "#" }, tags: ["Vietnamez", "Thailandez"] }),
  R({ id: 31, name: "Pizza Danubio", city: "Craiova", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.5, distance: "1.3 km", openUntil: "22:30", image: px(29626980), address: "Str. Calea București 45, Craiova", hours: "12:00 – 22:30, zilnic", description: "Cuptor cu vatră de piatră și un meniu clasic italian, potrivit pentru cine în familie.", dishes: ["Pizza Capricciosa", "Pizza Prosciutto", "Salată de rucola cu parmezan"], booking: { type: "phone", phone: "+40 251 411 220" }, tags: ["Vatră de piatră", "Clasic italian"] }),
  R({ id: 32, name: "Bamboo Wok", city: "Craiova", cuisine: "asian", cuisineLabel: "Asian • Wok", mood: "casual", price: "€€", rating: 4.3, distance: "1.7 km", openUntil: "22:00", image: px(29145757), address: "Str. Fraților 22, Craiova", hours: "12:00 – 22:00, zilnic", description: "Legume și tăiței preparați rapid la wok, la vedere, cu sosuri asiatice de casă.", dishes: ["Wok de pui cu legume", "Tăiței cu creveți", "Rulouri de primăvară"], booking: { type: "online", url: "#" }, tags: ["Wok la vedere", "Sosuri de casă"] }),
  R({ id: 33, name: "El Sombrero", city: "Craiova", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.2, distance: "1.0 km", openUntil: "23:30", image: px(34289262), address: "Str. Amaradia 8, Craiova", hours: "17:00 – 23:30, zilnic", description: "Muzică live în weekend, tacos ieftini și cocktailuri cu tequila pentru grupuri mari.", dishes: ["Tacos de vită picantă", "Chimichanga", "Nachos cu guacamole"], booking: { type: "phone", phone: "+40 251 660 902" }, tags: ["Muzică live", "Cocktailuri tequila"] }),
  R({ id: 34, name: "Prime Burger Co.", city: "București", cuisine: "burger", cuisineLabel: "Burger • American", mood: "casual", price: "€€", rating: 4.5, distance: "1.8 km", openUntil: "22:30", image: px(4315148), address: "Str. Ștefan cel Mare 30, București", hours: "11:00 – 22:30, zilnic", description: "Carne de vită Angus măcinată zilnic și chifle brioșă coapte în bucătăria proprie.", dishes: ["Prime Burger cu bacon", "Burger vegetal cu sfeclă", "Milkshake cu caramel"], booking: { type: "online", url: "#" }, tags: ["Angus", "Chifle brioșă"] }),
  R({ id: 35, name: "Osteria Centrale", city: "București", cuisine: "italian", cuisineLabel: "Italian • Osteria", mood: "romantic", price: "€€€", rating: 4.7, distance: "2.5 km", openUntil: "23:00", image: px(6845342), address: "Str. Franceză 12, București", hours: "12:30 – 23:00, zilnic", description: "O sală mică în Centrul Vechi, cu mese apropiate și un chelner care recită meniul zilei.", dishes: ["Risotto ai funghi porcini", "Ravioli di ricotta", "Tiramisu clasic"], booking: { type: "online", url: "#" }, tags: ["Centru Vechi", "Meniul zilei"] }),
  R({ id: 36, name: "Plant House", city: "București", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Vegan", mood: "casual", price: "€€", rating: 4.4, distance: "3.0 km", openUntil: "21:00", image: px(3026013), address: "Str. Traian 40, București", hours: "09:00 – 21:00, zilnic", description: "Meniu complet vegetal, cu accent pe proteine din leguminoase și fermentate de casă.", dishes: ["Bowl cu tofu marinat", "Supă miso cu legume", "Brownie vegan"], booking: { type: "website", url: "#" }, tags: ["100% vegetal", "Fermentate de casă"] }),
  R({ id: 37, name: "Pizza Napoli Cluj", city: "Cluj-Napoca", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.6, distance: "1.4 km", openUntil: "22:30", image: px(6605187), address: "Str. Regele Ferdinand 18, Cluj-Napoca", hours: "12:00 – 22:30, zilnic", description: "Aluat lăsat la dospit lent și un cuptor napolitan adus special din Italia.", dishes: ["Pizza Marinara", "Pizza Napoletana", "Calzone cu șuncă"], booking: { type: "phone", phone: "+40 264 331 770" }, tags: ["Cuptor napolitan", "Aluat lent"] }),
  R({ id: 38, name: "Sushi Point", city: "Cluj-Napoca", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "elegant", price: "€€€", rating: 4.6, distance: "1.1 km", openUntil: "23:00", image: px(28559483), address: "Str. Emil Isac 5, Cluj-Napoca", hours: "12:30 – 23:00, zilnic", description: "Selecție zilnică de pește proaspăt și un bar minimalist, ideal pentru o cină rapidă și elegantă.", dishes: ["Rainbow roll", "Sashimi de somon", "Edamame"], booking: { type: "online", url: "#" }, tags: ["Pește zilnic", "Bar minimalist"] }),
  R({ id: 39, name: "Grill House Cluj", city: "Cluj-Napoca", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "business", price: "€€€€", rating: 4.7, distance: "2.0 km", openUntil: "23:30", image: px(36630840), address: "Str. Motilor 60, Cluj-Napoca", hours: "12:00 – 23:30, zilnic", description: "Săli separate pentru întâlniri de afaceri și cărnuri maturate la vedere în camera de uscare.", dishes: ["T-bone maturat 45 zile", "Tartar de vită", "Cartofi gratinați"], booking: { type: "online", url: "#" }, tags: ["Săli private", "Maturare 45 zile"] }),
  R({ id: 40, name: "Cantina Mexicana", city: "Cluj-Napoca", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.3, distance: "1.5 km", openUntil: "23:00", image: px(36498697), address: "Str. Baba Novac 14, Cluj-Napoca", hours: "17:00 – 23:00, zilnic", description: "Terasă colorată, muzică latino și un happy-hour zilnic pentru cocktailuri cu tequila.", dishes: ["Fajitas de pui", "Quesadilla cu ciuperci", "Guacamole proaspăt"], booking: { type: "phone", phone: "+40 264 774 118" }, tags: ["Muzică latino", "Happy-hour zilnic"] }),
  R({ id: 41, name: "Smash House", city: "Timișoara", cuisine: "burger", cuisineLabel: "Burger • Smash", mood: "casual", price: "€", rating: 4.4, distance: "1.0 km", openUntil: "22:00", image: px(27049612), address: "Str. Coriolan Brediceanu 9, Timișoara", hours: "11:00 – 22:00, zilnic", description: "Chifle presate pe plită la comandă și un meniu scurt, gândit să fie perfect, nu variat.", dishes: ["Double Smash Burger", "Burger cu ceapă caramelizată", "Cartofi crispy"], booking: { type: "online", url: "#" }, tags: ["Smash", "Meniu scurt"] }),
  R({ id: 42, name: "Steak Corner", city: "Timișoara", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "business", price: "€€€€", rating: 4.6, distance: "2.3 km", openUntil: "23:30", image: px(8775049), address: "Bd. Revoluției 15, Timișoara", hours: "12:00 – 23:30, zilnic", description: "Un local discret, cu mese distanțate și un meniu axat exclusiv pe fripturi de calitate.", dishes: ["Ribeye la grătar", "File de vită cu sos de piper", "Salată Caesar"], booking: { type: "website", url: "#" }, tags: ["Discret", "Doar fripturi"] }),
  R({ id: 43, name: "Garden Bowl", city: "Timișoara", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.3, distance: "1.2 km", openUntil: "21:00", image: "https://images.pexels.com/photos/16313570/pexels-photo-16313570.png?auto=compress&cs=tinysrgb&w=1000", address: "Str. Circumvalațiunii 4, Timișoara", hours: "09:00 – 21:00, zilnic", description: "Bowluri personalizabile cu legume de sezon, năut și sosuri făcute în casă.", dishes: ["Bowl mediteranean", "Supă cremă de broccoli", "Clătite cu ovăz"], booking: { type: "phone", phone: "+40 256 443 887" }, tags: ["Bowluri personalizabile", "Sosuri de casă"] }),
  R({ id: 44, name: "Mountain Burger", city: "Brașov", cuisine: "burger", cuisineLabel: "Burger • American", mood: "familie", price: "€", rating: 4.4, distance: "1.1 km", openUntil: "22:00", image: px(5865422), address: "Str. Zizinului 20, Brașov", hours: "11:00 – 22:00, zilnic", description: "Porții mari, terasă spre munte și un meniu pentru copii, potrivit pentru familii.", dishes: ["Burger clasic cu cheddar", "Burger cu pui crocant", "Cartofi cu cașcaval"], booking: { type: "phone", phone: "+40 268 220 441" }, tags: ["Meniu copii", "Terasă la munte"] }),
  R({ id: 45, name: "Sakura Brașov", city: "Brașov", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "romantic", price: "€€€", rating: 4.6, distance: "1.6 km", openUntil: "23:00", image: px(2104568), address: "Str. Republicii 55, Brașov", hours: "12:30 – 23:00, zilnic", description: "O sală mică și liniștită, potrivită pentru o cină romantică cu sushi proaspăt.", dishes: ["Set sashimi romantic pentru doi", "Uramaki cu somon", "Sake fierbinte"], booking: { type: "online", url: "#" }, tags: ["Cină în doi", "Sake fierbinte"] }),
  R({ id: 46, name: "Wok & Roll", city: "Brașov", cuisine: "asian", cuisineLabel: "Asian • Wok", mood: "casual", price: "€€", rating: 4.3, distance: "1.3 km", openUntil: "22:00", image: px(24738507), address: "Str. Iuliu Maniu 8, Brașov", hours: "12:00 – 22:00, zilnic", description: "Tăiței și orez preparate la wok, la vedere, cu opțiuni vegane și de pui.", dishes: ["Tăiței cu pui și legume", "Orez cu creveți", "Rulouri de vară"], booking: { type: "website", url: "#" }, tags: ["Opțiuni vegane", "Wok la vedere"] }),
  R({ id: 47, name: "Pizza Riviera", city: "Constanța", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.5, distance: "1.4 km", openUntil: "22:30", image: px(1878346), address: "Bd. Mamaia 60, Constanța", hours: "12:00 – 22:30, zilnic", description: "Terasă la malul mării, pizza clasică italiană și un meniu potrivit pentru copii.", dishes: ["Pizza Margherita", "Pizza cu fructe de mare", "Tiramisu"], booking: { type: "phone", phone: "+40 241 550 220" }, tags: ["Malul mării", "Meniu copii"] }),
  R({ id: 48, name: "Seaside Greens", city: "Constanța", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.4, distance: "1.0 km", openUntil: "21:00", image: px(23384612), address: "Str. Ecaterina Varga 3, Constanța", hours: "09:00 – 21:00, zilnic", description: "Salate proaspete și smoothie-uri, la doi pași de plajă, cu produse locale de sezon.", dishes: ["Salată grecească cu quinoa", "Smoothie bowl cu fructe", "Supă rece de castraveți"], booking: { type: "online", url: "#" }, tags: ["Smoothie-uri", "Lângă plajă"] }),
  R({ id: 49, name: "Cantina del Mar", city: "Constanța", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.2, distance: "1.6 km", openUntil: "23:30", image: px(31769337), address: "Bd. Mamaia 140, Constanța", hours: "17:00 – 23:30, zilnic", description: "Terasă vibrantă lângă plajă, cu muzică latino și cocktailuri cu fructe tropicale.", dishes: ["Tacos de pește", "Ceviche de creveți", "Piña colada"], booking: { type: "phone", phone: "+40 241 668 320" }, tags: ["Terasă la plajă", "Cocktailuri tropicale"] }),

  /* ── New restaurants (50–70) ─────────────────────────────── */
  R({ id: 50, name: "Mar & Sol", city: "Constanța", cuisine: "seafood", cuisineLabel: "Fructe de mare • Mediteranean", mood: "elegant", price: "€€€€", rating: 4.8, distance: "0.7 km", openUntil: "23:30", image: px(16743486), address: "Bd. Mamaia 230, Constanța", hours: "13:00 – 23:30, mar–dum", description: "Paella preparată la foc deschis, fructe de mare aduse zilnic din Marea Neagră și o listă de vinuri albe românești.", dishes: ["Paella mixta", "Midié gratinate", "Tartar de somon fume"], booking: { type: "online", url: "#" }, tags: ["Paella la foc deschis", "Vinuri albe"] }),
  R({ id: 51, name: "Bistroul de Mare", city: "București", cuisine: "seafood", cuisineLabel: "Fructe de mare • Bistro", mood: "elegant", price: "€€€", rating: 4.6, distance: "1.9 km", openUntil: "23:00", image: px(14499018), address: "Str. Calea Floreasca 49, București", hours: "12:00 – 23:00, zilnic", description: "Fructe de mare proaspete livrate zilnic din Constanța, servite într-o sală intimă cu lumânări.", dishes: ["Platou de fructe de mare", "Linguine alle vongole", "Gamberi la grătar"], booking: { type: "online", url: "#" }, tags: ["Livre zilnic", "Sală intimă"] }),
  R({ id: 52, name: "Ocean 21", city: "Cluj-Napoca", cuisine: "seafood", cuisineLabel: "Fructe de mare • Fusion", mood: "rooftop", price: "€€€€", rating: 4.7, distance: "1.8 km", openUntil: "01:00", image: px(19524049), address: "Str. Septimiu Albini 21, Cluj-Napoca", hours: "17:00 – 01:00, joi–dum", description: "Terasă la înălțime cu platouri de fructe de mare, cocktailuri cu gin și o vedere panoramă a orașului.", dishes: ["Platou royal de fructe de mare", "Tartar de ton cu avocado", "Oysters cu mignonette"], booking: { type: "online", url: "#" }, tags: ["Terasă panoramă", "Oysters"] }),
  R({ id: 53, name: "Pesce Vetro", city: "Timișoara", cuisine: "seafood", cuisineLabel: "Fructe de mare • Italian", mood: "romantic", price: "€€€", rating: 4.5, distance: "1.2 km", openUntil: "22:30", image: px(33041124), address: "Piața Libertății 3, Timișoara", hours: "12:00 – 22:30, zilnic", description: "Un bistro italian cu accent pe pește și fructe de mare, într-o sală cu pereți de sticlă și lumină caldă.", dishes: ["Risotto ai frutti di mare", "Branzino in crosta di sale", "Carpaccio di branzino"], booking: { type: "website", url: "#" }, tags: ["Pereți de sticlă", "Pește italian"] }),
  R({ id: 54, name: "Aqua Craiova", city: "Craiova", cuisine: "seafood", cuisineLabel: "Fructe de mare • Mediteranean", mood: "elegant", price: "€€€", rating: 4.5, distance: "2.0 km", openUntil: "23:00", image: px(31748679), address: "Calea Severinului 12, Craiova", hours: "12:00 – 23:00, zilnic", description: "Bucătărie mediteraneană cu accent pe pește proaspăt, într-un spațiu modern cu terasă.", dishes: ["Grigliata di pesce", "Calamari fritti", "Supă de creveți"], booking: { type: "online", url: "#" }, tags: ["Mediteranean", "Terasă modernă"] }),
  R({ id: 55, name: "Maison Brunch", city: "București", cuisine: "brunch", cuisineLabel: "Brunch • Cafe", mood: "casual", price: "€€", rating: 4.6, distance: "1.0 km", openUntil: "17:00", image: px(8616015), address: "Str. Lipscani 35, București", hours: "08:00 – 17:00, zilnic", description: "Brunch all-day cu ouă preparate în zece moduri, croissante proaspete și cafea de specialitate.", dishes: ["Eggs Benedict", "Avocado toast cu ou poșat", "Pancakes cu sirop de arțar"], booking: { type: "online", url: "#" }, tags: ["All-day brunch", "Cafea de specialitate"] }),
  R({ id: 56, name: "Morning Light", city: "Cluj-Napoca", cuisine: "brunch", cuisineLabel: "Brunch • Cafe", mood: "casual", price: "€€", rating: 4.5, distance: "0.5 km", openUntil: "16:00", image: px(2874780), address: "Str. Croitorilor 14, Cluj-Napoca", hours: "08:00 – 16:00, zilnic", description: "Un café luminos cu brunch all-day, produse de patiserie proaspete și o selecție de ceaiuri rare.", dishes: ["Shakshuka", "French toast cu caramel", "Bowl de iaurt cu granola de casă"], booking: { type: "phone", phone: "+40 264 112 998" }, tags: ["Patiserie proaspătă", "Ceaiuri rare"] }),
  R({ id: 57, name: "Le Petit Déjeuner", city: "Timișoara", cuisine: "brunch", cuisineLabel: "Brunch • French", mood: "romantic", price: "€€", rating: 4.7, distance: "0.9 km", openUntil: "18:00", image: px(947898), address: "Piața Unirii 8, Timișoara", hours: "08:30 – 18:00, mar–dum", description: "Un bistrou franțuzesc cu croissante coapte pe loc, eclairs de casă și cafea filtru de origine unică.", dishes: ["Croque Madame", "Tartine cu brie și miere", "Éclair de ciocolată"], booking: { type: "website", url: "#" }, tags: ["Bistrou franțuzesc", "Cafea filtru"] }),
  R({ id: 58, name: "Sunrise Café", city: "Constanța", cuisine: "brunch", cuisineLabel: "Brunch • Cafe", mood: "casual", price: "€", rating: 4.3, distance: "0.4 km", openUntil: "15:00", image: px(35160887), address: "Str. Liliacului 2, Constanța", hours: "07:30 – 15:00, zilnic", description: "Mic dejun cu vedere la mare, smoothie-uri de fructe proaspete și produse de patiserie vegană.", dishes: ["Bowl de ovăz cu fructe de sezon", "Sandwich cu somon afumat", "Smoothie tropical"], booking: { type: "phone", phone: "+40 241 778 220" }, tags: ["Vedere la mare", "Patiserie vegană"] }),
  R({ id: 59, name: "Brunch & Bloom", city: "Brașov", cuisine: "brunch", cuisineLabel: "Brunch • Garden", mood: "familie", price: "€€", rating: 4.5, distance: "0.8 km", openUntil: "17:00", image: px(14529354), address: "Str. Mureșenilor 20, Brașov", hours: "08:00 – 17:00, zilnic", description: "Un café cu grădină interioară, meniu de brunch generos și produse de panificație făcute zilnic.", dishes: ["Full English breakfast", "Omeletă cu trufe", "Waffles cu fructe și frișcă"], booking: { type: "online", url: "#" }, tags: ["Grădină interioară", "Panificație zilnică"] }),
  R({ id: 60, name: "Atelier de Dulce", city: "București", cuisine: "dessert", cuisineLabel: "Desert • Patiserie", mood: "elegant", price: "€€", rating: 4.7, distance: "1.3 km", openUntil: "21:00", image: px(39240983), address: "Str. Arthur Verona 17, București", hours: "10:00 – 21:00, zilnic", description: "O patiserie de autor cu prăjituri franceze, eclairs colorați și torte la comandă pentru ocazii speciale.", dishes: ["Opera prăjitură", "Saint-Honoré cu vanilie", "Tartă cu fructe de sezon"], booking: { type: "online", url: "#" }, tags: ["Patiserie de autor", "Torte la comandă"] }),
  R({ id: 61, name: "Sugar & Spice", city: "Cluj-Napoca", cuisine: "dessert", cuisineLabel: "Desert • Cofetărie", mood: "casual", price: "€", rating: 4.4, distance: "0.6 km", openUntil: "20:00", image: px(39240989), address: "Str. Croitorilor 25, Cluj-Napoca", hours: "10:00 – 20:00, zilnic", description: "Cofetărie modernă cu prăjituri inspirate din rețete internaționale și o selecție de ceaiuri.", dishes: ["Cheesecake cu matcha", "Tartă cu lămâie și merenge", "Trufe de ciocolată"], booking: { type: "phone", phone: "+40 264 334 110" }, tags: ["Rețete internaționale", "Trufe de ciocolată"] }),
  R({ id: 62, name: "Dolce Vita", city: "Timișoara", cuisine: "dessert", cuisineLabel: "Desert • Gelateria", mood: "familie", price: "€", rating: 4.5, distance: "1.0 km", openUntil: "22:00", image: px(31928755), address: "Piața Victoriei 12, Timișoara", hours: "11:00 – 22:00, zilnic", description: "Gelateria artizanală cu sortimente schimbate zilnic, plus torte italienești și brioșe proaspete.", dishes: ["Gelato de fisticio", "Tiramisu semifreddo", "Cannoli siciliani"], booking: { type: "online", url: "#" }, tags: ["Gelato artizanală", "Sortimente zilnice"] }),
  R({ id: 63, name: "Sweet Art", city: "Brașov", cuisine: "dessert", cuisineLabel: "Desert • Boutique", mood: "elegant", price: "€€", rating: 4.6, distance: "1.1 km", openUntil: "20:00", image: px(32916204), address: "Str. Republicii 30, Brașov", hours: "10:00 – 20:00, mar–dum", description: "Boutique de deserturi cu prăjituri miniaturale decorate manual și o selecție de cafea de specialitate.", dishes: ["Mini fruit tart", "Mousse de ciocolată 70%", "Macarons assortiti"], booking: { type: "website", url: "#" }, tags: ["Decor manual", "Macarons"] }),
  R({ id: 64, name: "Caramelo", city: "Craiova", cuisine: "dessert", cuisineLabel: "Desert • Cofetărie", mood: "casual", price: "€", rating: 4.3, distance: "0.8 km", openUntil: "21:00", image: px(12124906), address: "Str. Alexandru Ioan Cuza 10, Craiova", hours: "10:00 – 21:00, zilnic", description: "Cofetărie prietenoasă cu deserturi clasice și de sezon, plus o zonă de cafea cu șezlonguri.", dishes: ["Pavlova cu fructe de pădure", "Panna cotta cu caramel", "Clătite cu ciocolată"], booking: { type: "phone", phone: "+40 251 550 778" }, tags: ["Deserturi de sezon", "Cafea relax"] }),
  R({ id: 65, name: "Noodle Bar Bucur", city: "București", cuisine: "asian", cuisineLabel: "Asian • Noodle Bar", mood: "casual", price: "€€", rating: 4.5, distance: "2.1 km", openUntil: "23:00", image: px(7490494), address: "Str. Colței 5, București", hours: "11:00 – 23:00, zilnic", description: "Un noodle bar rapid cu tăiței preparați la comandă, bulion vegetarian și toppinguri variate.", dishes: ["Ramen shoyu", "Udon cu pui karaage", "Rice bowl cu tofu"], booking: { type: "online", url: "#" }, tags: ["Noodle bar", "Bulion vegetarian"] }),
  R({ id: 66, name: "Iași Sushi Club", city: "Iași", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "elegant", price: "€€€", rating: 4.6, distance: "1.0 km", openUntil: "23:00", image: px(31393431), address: "Str. Copou 18, Iași", hours: "12:30 – 23:00, zilnic", description: "Sushi club modern în inima Copoului, cu omakase seri de weekend și un bar de cocktailuri japoneze.", dishes: ["Omakase de weekend", "Nigiri flight 6 piese", "Yuzu sour"], booking: { type: "online", url: "#" }, tags: ["Omakase weekend", "Cocktailuri japoneze"] }),
  R({ id: 67, name: "Taverna Moldovei", city: "Iași", cuisine: "italian", cuisineLabel: "Italian • Trattoria", mood: "romantic", price: "€€", rating: 4.4, distance: "1.5 km", openUntil: "22:30", image: px(31637791), address: "Str. Ștefan cel Mare 42, Iași", hours: "12:00 – 22:30, zilnic", description: "O trattoria caldă cu paste făcute în casă, vinuri românești și o sală cu muzică live vinerea.", dishes: ["Pappardelle cu ragu", "Gnocchi cu gorgonzola", "Panna cotta"], booking: { type: "phone", phone: "+40 232 118 770" }, tags: ["Paste în casă", "Muzică live vinerea"] }),
  R({ id: 68, name: "Sibiu Bistro", city: "Sibiu", cuisine: "italian", cuisineLabel: "Italian • Bistro", mood: "casual", price: "€€", rating: 4.5, distance: "0.7 km", openUntil: "22:00", image: px(546945), address: "Piața Mare 10, Sibiu", hours: "12:00 – 22:00, zilnic", description: "Bistro italian în Piața Mare, cu vedere spre turnurile Sibiului, paste făcute zilnic și gelato de casă.", dishes: ["Spaghetti carbonara", "Risotto cu șofran", "Gelato de casă"], booking: { type: "online", url: "#" }, tags: ["Piața Mare", "Gelato de casă"] }),
  R({ id: 69, name: "Grill & Vine Sibiu", city: "Sibiu", cuisine: "steak", cuisineLabel: "Steak • Vinuri", mood: "business", price: "€€€€", rating: 4.7, distance: "1.2 km", openUntil: "23:30", image: px(27643017), address: "Str. Tribului 7, Sibiu", hours: "12:00 – 23:30, mar–dum", description: "Steakhouse cu cărnuri maturate 40 de zile, o pivniță de vinuri în pivniță medievală și săli private.", dishes: ["Dry-aged ribeye", "Platou de brânzeturi", "File cu sos de trufe"], booking: { type: "online", url: "#" }, tags: ["Pivniță medievală", "Maturare 40 zile"] }),
  R({ id: 70, name: "Brunch Sibiu", city: "Sibiu", cuisine: "brunch", cuisineLabel: "Brunch • Cafe", mood: "familie", price: "€€", rating: 4.4, distance: "0.5 km", openUntil: "16:00", image: px(8616015), address: "Str. Cetății 22, Sibiu", hours: "08:00 – 16:00, zilnic", description: "Café de brunch în cetatea Sibiului, cu produse locale, cafea de specialitate și terasă cu vedere spre ziduri.", dishes: ["Omeletă cu brânză de Sibiu", "Pancakes cu fructe de pădure", "Cafea filtru"], booking: { type: "phone", phone: "+40 269 220 555" }, tags: ["Cetate", "Produse locale"] }),

  /* ── Oradea (71–73) ──────────────────────────────────────── */
  R({ id: 71, name: "Piața Italiană", city: "Oradea", cuisine: "italian", cuisineLabel: "Italian • Trattoria", mood: "romantic", price: "€€", rating: 4.6, distance: "0.8 km", openUntil: "22:30", image: px(6845342), address: "Piața Unirii 15, Oradea", hours: "12:00 – 22:30, zilnic", description: "Trattoria în inima Pieței Unirii, cu paste făcute în casă, vinuri italiene și o terasă cu vedere spre clădirile Art Nouveau.", dishes: ["Tagliatelle cu ragu de vită", "Risotto cu fructe de mare", "Panna cotta"], booking: { type: "online", url: "#" }, tags: ["Piața Unirii", "Art Nouveau"] }),
  R({ id: 72, name: "Black Eagle Burger", city: "Oradea", cuisine: "burger", cuisineLabel: "Burger • Craft", mood: "casual", price: "€", rating: 4.4, distance: "0.4 km", openUntil: "23:00", image: px(3727243), address: "Str. Republicii 9, Oradea", hours: "11:00 – 23:00, zilnic", description: "Burgeri craft în Pasajul Vulturul Negru, cu carne locală și chifle brioșă coapte zilnic.", dishes: ["Black Eagle double", "Burger cu brânză afumată", "Cartofi condimentați"], booking: { type: "phone", phone: "+40 259 330 778" }, tags: ["Pasajul Vulturul Negru", "Carne locală"] }),
  R({ id: 73, name: "Sakura Oradea", city: "Oradea", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "elegant", price: "€€€", rating: 4.5, distance: "1.2 km", openUntil: "23:00", image: px(31393434), address: "Calea Republicii 40, Oradea", hours: "12:30 – 23:00, mar–dum", description: "Sushi bar elegant cu pește proaspțat adus de două ori pe săptămână și un meniu omakase pentru seri speciale.", dishes: ["Omakase 6 piese", "Nigiri de somon", "Ramen shoyu"], booking: { type: "online", url: "#" }, tags: ["Omakase", "Pește proaspăt"] }),

  /* ── Galați (74–76) ──────────────────────────────────────── */
  R({ id: 74, name: "Dunărea Seafood", city: "Galați", cuisine: "seafood", cuisineLabel: "Fructe de mare • Mediteranean", mood: "elegant", price: "€€€", rating: 4.6, distance: "1.0 km", openUntil: "23:00", image: px(16743486), address: "Str. Portului 5, Galați", hours: "12:00 – 23:00, zilnic", description: "Pește proaspăt din Dunăre și Marea Neagră, paella la foc deschis și o terasă cu vedere la fluviu.", dishes: ["Paella cu fructe de mare", "Șalău la grătar", "Supă de creveți"], booking: { type: "online", url: "#" }, tags: ["Pește din Dunăre", "Vedere la fluviu"] }),
  R({ id: 75, name: "Pizza Garibaldi", city: "Galați", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.4, distance: "1.3 km", openUntil: "22:30", image: px(29626980), address: "Bd. Galați 45, Galați", hours: "12:00 – 22:30, zilnic", description: "Cuptor cu lemne și pizza napolitană autentică, într-un local prietenos cu grupuri și familii.", dishes: ["Pizza Margherita DOP", "Pizza Capricciosa", "Calzone"], booking: { type: "phone", phone: "+40 236 330 445" }, tags: ["Cuptor cu lemne", "Napolitană"] }),
  R({ id: 76, name: "Taco del Río", city: "Galați", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.2, distance: "0.7 km", openUntil: "23:30", image: px(34289262), address: "Str. Brăilei 18, Galați", hours: "17:00 – 23:30, zilnic", description: "Terasă animată cu tacos, margarita și muzică latino în fiecare weekend.", dishes: ["Tacos al pastor", "Nachos supreme", "Margarita înghețată"], booking: { type: "phone", phone: "+40 236 778 220" }, tags: ["Terasă animată", "Muzică latino"] }),

  /* ── Ploiești (77–79) ────────────────────────────────────── */
  R({ id: 77, name: "Caru' cu Bere Ploiești", city: "Ploiești", cuisine: "italian", cuisineLabel: "Italian • Trattoria", mood: "familie", price: "€€", rating: 4.5, distance: "0.6 km", openUntil: "22:30", image: px(1438672), address: "Str. Independenței 20, Ploiești", hours: "12:00 – 22:30, zilnic", description: "Trattoria cu paste făcute zilnic, pizza la cuptor cu lemne și o sală caldă, prietenasă cu familiile.", dishes: ["Spaghetti carbonara", "Pizza Diavola", "Tiramisu"], booking: { type: "online", url: "#" }, tags: ["Paste zilnice", "Cuptor cu lemne"] }),
  R({ id: 78, name: "Steak 42", city: "Ploiești", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "business", price: "€€€€", rating: 4.5, distance: "1.8 km", openUntil: "23:30", image: px(36683013), address: "Bd. Carol I 42, Ploiești", hours: "12:00 – 23:30, lun–sâm", description: "Steakhouse discret cu cărnuri maturate 28 de zile, o listă de vinuri roșii și săli pentru întâlniri de afaceri.", dishes: ["Ribeye maturat 28 zile", "File de vită cu trufe", "Cartofi gratinați"], booking: { type: "online", url: "#" }, tags: ["Maturare 28 zile", "Săli private"] }),
  R({ id: 79, name: "Green Ploiești", city: "Ploiești", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.3, distance: "0.9 km", openUntil: "21:00", image: px(3026013), address: "Str. Târgul de Vechi 8, Ploiești", hours: "09:00 – 21:00, zilnic", description: "Bowluri sănătoase, sucuri presate la rece și un spațiu luminos pentru prânzuri rapide.", dishes: ["Buddha bowl cu avocado", "Supă cremă de linte", "Smoothie verde"], booking: { type: "phone", phone: "+40 244 550 118" }, tags: ["Sucuri presate", "Prânz rapid"] }),

  /* ── Arad (80–82) ────────────────────────────────────────── */
  R({ id: 80, name: "Casa Arad", city: "Arad", cuisine: "italian", cuisineLabel: "Italian • Bistro", mood: "romantic", price: "€€", rating: 4.4, distance: "0.7 km", openUntil: "22:00", image: px(8917285), address: "Piața Avram Iancu 4, Arad", hours: "12:00 – 22:00, zilnic", description: "Bistro italian în Piața Avram Iancu, cu risotto, paste de casă și o sală mică, cu lumânări.", dishes: ["Risotto ai funghi", "Ravioli de casă", "Crème brûlée"], booking: { type: "website", url: "#" }, tags: ["Piața Avram Iancu", "Sală intimă"] }),
  R({ id: 81, name: "Burger Arad", city: "Arad", cuisine: "burger", cuisineLabel: "Burger • American", mood: "casual", price: "€", rating: 4.3, distance: "1.0 km", openUntil: "22:00", image: px(5488052), address: "Bd. Revoluției 30, Arad", hours: "11:00 – 22:00, zilnic", description: "Burgeri simpli și buni, cu chifle coapte în casă și cartofi cu rozmarin.", dishes: ["Cheeseburger clasic", "Burger cu bacon", "Cartofi cu rozmarin"], booking: { type: "phone", phone: "+40 257 330 778" }, tags: ["Chifle în casă", "Casual"] }),
  R({ id: 82, name: "Pho Arad", city: "Arad", cuisine: "asian", cuisineLabel: "Asian • Vietnamese", mood: "casual", price: "€€", rating: 4.5, distance: "0.8 km", openUntil: "21:30", image: px(3054690), address: "Str. Odobescu 12, Arad", hours: "11:00 – 21:30, zilnic", description: "Pho autentic vietnamez cu bulion tras 10 ore, plus tăiței și rulouri de primăvară proaspete.", dishes: ["Pho de vită", "Bun cha cu porc", "Rulouri de primăvară"], booking: { type: "online", url: "#" }, tags: ["Bulion 10h", "Vietnamez autentic"] }),

  /* ── Bacău (83–85) ───────────────────────────────────────── */
  R({ id: 83, name: "Trattoria Moldova", city: "Bacău", cuisine: "italian", cuisineLabel: "Italian • Trattoria", mood: "familie", price: "€€", rating: 4.5, distance: "0.9 km", openUntil: "22:30", image: px(31637791), address: "Str. Mărășești 25, Bacău", hours: "12:00 – 22:30, zilnic", description: "Trattoria familială cu paste făcute în casă, pizza la cuptor și o sală generoasă pentru grupuri.", dishes: ["Lasagna de casă", "Spaghetti alle vongole", "Tiramisu"], booking: { type: "phone", phone: "+40 234 550 778" }, tags: ["Paste în casă", "Familie"] }),
  R({ id: 84, name: "Steak Bacău", city: "Bacău", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "elegant", price: "€€€", rating: 4.6, distance: "1.5 km", openUntil: "23:00", image: px(14515091), address: "Bd. Nicolae Iorga 10, Bacău", hours: "12:00 – 23:00, mar–dum", description: "Steakhouse elegant cu cărnuri la grătar pe cărbune și o listă de vinuri românești.", dishes: ["Antricot la grătar", "File cu sos de piper", "Cartofi wedges"], booking: { type: "online", url: "#" }, tags: ["Grătar pe cărbune", "Vinuri românești"] }),
  R({ id: 85, name: "Sweet Bacău", city: "Bacău", cuisine: "dessert", cuisineLabel: "Desert • Cofetărie", mood: "casual", price: "€", rating: 4.4, distance: "0.5 km", openUntil: "20:00", image: px(31928755), address: "Str. Ana Ipătescu 6, Bacău", hours: "10:00 – 20:00, zilnic", description: "Cofetărie cu prăjituri clasice și de sezon, plus o zonă de cafea cu terasă.", dishes: ["Ecler de ciocolată", "Cheesecake cu fructe", "Tartă cu mere"], booking: { type: "phone", phone: "+40 234 220 330" }, tags: ["Prăjituri de sezon", "Terasă cafea"] }),

  /* ── Târgu Mureș (86–88) ─────────────────────────────────── */
  R({ id: 86, name: "Piața Mare Târgu Mureș", city: "Târgu Mureș", cuisine: "italian", cuisineLabel: "Italian • Bistro", mood: "casual", price: "€€", rating: 4.4, distance: "0.5 km", openUntil: "22:00", image: px(546945), address: "Piața Trandafirilor 10, Târgu Mureș", hours: "12:00 – 22:00, zilnic", description: "Bistro italian în Piața Trandafirilor, cu paste, pizza și gelato de casă, plus terasă cu vedere spre piață.", dishes: ["Spaghetti carbonara", "Pizza Margherita", "Gelato de casă"], booking: { type: "online", url: "#" }, tags: ["Piața Trandafirilor", "Gelato de casă"] }),
  R({ id: 87, name: "Sushi Mureș", city: "Târgu Mureș", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "elegant", price: "€€€", rating: 4.5, distance: "1.0 km", openUntil: "22:30", image: px(28559483), address: "Str. Bolyai 15, Târgu Mureș", hours: "12:30 – 22:30, mar–dum", description: "Sushi bar minimalist cu pește proaspăt de două ori pe săptămână și un meniu fix pentru prânz.", dishes: ["Set nigiri 8 piese", "Uramaki California", "Edamame"], booking: { type: "online", url: "#" }, tags: ["Meniu fix prânz", "Minimalist"] }),
  R({ id: 88, name: "Brunch Rose", city: "Târgu Mureș", cuisine: "brunch", cuisineLabel: "Brunch • Cafe", mood: "casual", price: "€€", rating: 4.5, distance: "0.6 km", openUntil: "17:00", image: px(2874780), address: "Str. Koteles Samuel 8, Târgu Mureș", hours: "08:00 – 17:00, zilnic", description: "Café de brunch all-day cu ouă în zece moduri, croissante proaspete și cafea de specialitate.", dishes: ["Eggs Benedict", "Avocado toast", "Pancakes cu afine"], booking: { type: "phone", phone: "+40 265 330 778" }, tags: ["All-day brunch", "Cafea de specialitate"] }),

  /* ── Iași: +7 (89–95) ───────────────────────────────────── */
  R({ id: 89, name: "Burger Copou", city: "Iași", cuisine: "burger", cuisineLabel: "Burger • Craft", mood: "casual", price: "€", rating: 4.4, distance: "0.8 km", openUntil: "22:00", image: px(5488052), address: "Str. Alexandru Lupu 12, Iași", hours: "11:00 – 22:00, zilnic", description: "Burgeri craft lângă Parcul Copou, cu chifle brioșă coapte zilnic și bere artizanală la halbă.", dishes: ["Double cheeseburger", "Burger cu jalapeño", "Cartofi cu rozmarin"], booking: { type: "phone", phone: "+40 232 330 445" }, tags: ["Lângă Copou", "Bere artizanală"] }),
  R({ id: 90, name: "Pizza Palas", city: "Iași", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.6, distance: "0.5 km", openUntil: "22:30", image: px(6223172), address: "Str. Palas 7, Iași", hours: "12:00 – 22:30, zilnic", description: "Cuptor pe lemne și pizza napolitană, la doi pași de Palas Mall, cu o sală spațioasă pentru familii.", dishes: ["Pizza Napoletana", "Pizza Quattro Formaggi", "Bruschette"], booking: { type: "online", url: "#" }, tags: ["Cuptor pe lemne", "Familie"] }),
  R({ id: 91, name: "Steak Iași", city: "Iași", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "business", price: "€€€€", rating: 4.7, distance: "1.4 km", openUntil: "23:30", image: px(36683019), address: "Bd.Ștefan cel Mare 88, Iași", hours: "12:00 – 23:30, lun–sâm", description: "Steakhouse cu cărnuri maturate 35 de zile, o pivniță de vinuri și săli private pentru întâlniri.", dishes: ["Dry-aged ribeye", "Tartar de vită", "File cu sos de trufe"], booking: { type: "online", url: "#" }, tags: ["Maturare 35 zile", "Săli private"] }),
  R({ id: 92, name: "Verde Iași", city: "Iași", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.3, distance: "0.9 km", openUntil: "21:00", image: px(4958946), address: "Str. Lăpușneanu 20, Iași", hours: "09:00 – 21:00, zilnic", description: "Bowluri sănătoase, sucuri presate la rece și un spațiu luminos în centrul istoric.", dishes: ["Buddha bowl cu năut", "Supă cremă de linte", "Smoothie verde"], booking: { type: "phone", phone: "+40 232 552 778" }, tags: ["Sucuri presate", "Centru istoric"] }),
  R({ id: 93, name: "Taco Iași", city: "Iași", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.2, distance: "1.1 km", openUntil: "23:30", image: px(36498696), address: "Str. Gării 15, Iași", hours: "17:00 – 23:30, zilnic", description: "Terasă animată cu tacos, nachos și margarita, plus muzică latino în weekend.", dishes: ["Tacos al pastor", "Nachos supreme", "Margarita"], booking: { type: "phone", phone: "+40 232 668 330" }, tags: ["Terasă animată", "Muzică latino"] }),
  R({ id: 94, name: "Wok Iași", city: "Iași", cuisine: "asian", cuisineLabel: "Asian • Wok", mood: "casual", price: "€€", rating: 4.4, distance: "1.3 km", openUntil: "22:00", image: px(29145757), address: "Str. Gheorge Asachi 10, Iași", hours: "12:00 – 22:00, zilnic", description: "Tăiței și orez preparați la wok, la vedere, cu sosuri asiatice de casă și opțiuni vegane.", dishes: ["Wok de pui cu legume", "Tăiței cu creveți", "Rulouri de primăvară"], booking: { type: "online", url: "#" }, tags: ["Wok la vedere", "Opțiuni vegane"] }),
  R({ id: 95, name: "Dulce Iași", city: "Iași", cuisine: "dessert", cuisineLabel: "Desert • Cofetărie", mood: "casual", price: "€", rating: 4.4, distance: "0.7 km", openUntil: "20:00", image: px(32916204), address: "Str. Cuza Vodă 33, Iași", hours: "10:00 – 20:00, zilnic", description: "Cofetărie boutique cu prăjituri miniaturale, macarons și o selecție de cafea de specialitate.", dishes: ["Mini fruit tart", "Macarons assortiti", "Cheesecake cu fructe"], booking: { type: "phone", phone: "+40 232 220 778" }, tags: ["Macarons", "Cafea de specialitate"] }),

  /* ── Sibiu: +7 (96–102) ─────────────────────────────────── */
  R({ id: 96, name: "Pizza Cetății", city: "Sibiu", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.5, distance: "0.4 km", openUntil: "22:30", image: px(9543813), address: "Str. Cetății 12, Sibiu", hours: "12:00 – 22:30, zilnic", description: "Pizza la cuptor cu lemne, lângă zidurile cetății, cu o terasă pitorească pentru familii.", dishes: ["Pizza Margherita", "Pizza Prosciutto", "Salată caprese"], booking: { type: "phone", phone: "+40 269 330 445" }, tags: ["Lângă cetate", "Terasă pitorească"] }),
  R({ id: 97, name: "Sushi Sibiu", city: "Sibiu", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "elegant", price: "€€€", rating: 4.5, distance: "0.9 km", openUntil: "22:30", image: px(4724481), address: "Str. Tribunei 6, Sibiu", hours: "12:30 – 22:30, mar–dum", description: "Sushi bar elegant în centrul istoric, cu pește proaspăt de două ori pe săptămână.", dishes: ["Set nigiri 8 piese", "Dragon roll", "Sake cald"], booking: { type: "online", url: "#" }, tags: ["Centru istoric", "Pește proaspăt"] }),
  R({ id: 98, name: "Burger Sibiu", city: "Sibiu", cuisine: "burger", cuisineLabel: "Burger • American", mood: "casual", price: "€", rating: 4.3, distance: "0.6 km", openUntil: "22:00", image: px(4315148), address: "Str. Ocnetului 4, Sibiu", hours: "11:00 – 22:00, zilnic", description: "Burgeri clasici și craft, cu chifle coapte în casă și milkshake-uri consistente.", dishes: ["Cheeseburger clasic", "Burger cu bacon", "Milkshake de ciocolată"], booking: { type: "phone", phone: "+40 269 552 778" }, tags: ["Chifle în casă", "Milkshake"] }),
  R({ id: 99, name: "Taco Sibiu", city: "Sibiu", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.2, distance: "0.8 km", openUntil: "23:00", image: px(25391591), address: "Piața Mică 5, Sibiu", hours: "17:00 – 23:00, zilnic", description: "Terasă în Piața Mică cu tacos, guacamole proaspăt și cocktailuri cu tequila.", dishes: ["Tacos de pui", "Guacamole proaspăt", "Margarita"], booking: { type: "online", url: "#" }, tags: ["Piața Mică", "Cocktailuri tequila"] }),
  R({ id: 100, name: "Verde Sibiu", city: "Sibiu", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.3, distance: "0.7 km", openUntil: "21:00", image: px(33323285), address: "Str. Fluxului 3, Sibiu", hours: "09:00 – 21:00, zilnic", description: "Meniu sezonier cu legume de la producători locali, bowluri și sucuri presate la rece.", dishes: ["Bowl cu quinoa și sfeclă", "Supă cremă de dovleac", "Smoothie de fructe"], booking: { type: "phone", phone: "+40 269 668 220" }, tags: ["Farm-to-table", "Sezonier"] }),
  R({ id: 101, name: "Desert Sibiu", city: "Sibiu", cuisine: "dessert", cuisineLabel: "Desert • Patiserie", mood: "elegant", price: "€€", rating: 4.5, distance: "0.5 km", openUntil: "20:00", image: px(39240983), address: "Str. Balcescu 14, Sibiu", hours: "10:00 – 20:00, zilnic", description: "Patiserie de autor cu prăjituri franceze, eclairs și torte la comandă.", dishes: ["Opera prăjitură", "Éclair de ciocolată", "Tartă cu fructe de sezon"], booking: { type: "online", url: "#" }, tags: ["Patiserie de autor", "Torte la comandă"] }),
  R({ id: 102, name: "Wok Sibiu", city: "Sibiu", cuisine: "asian", cuisineLabel: "Asian • Noodle", mood: "casual", price: "€€", rating: 4.4, distance: "1.0 km", openUntil: "22:00", image: px(24243345), address: "Str. Corneliu Coposu 10, Sibiu", hours: "11:00 – 22:00, zilnic", description: "Ramen și tăiței asiatici preparați la comandă, cu bulion vegetarian și toppinguri variate.", dishes: ["Ramen tonkotsu", "Udon cu pui", "Rice bowl cu tofu"], booking: { type: "phone", phone: "+40 269 778 330" }, tags: ["Ramen", "Bulion vegetarian"] }),

  /* ── Oradea: +7 (103–109) ───────────────────────────────── */
  R({ id: 103, name: "Steak Oradea", city: "Oradea", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "business", price: "€€€€", rating: 4.6, distance: "1.2 km", openUntil: "23:30", image: px(36683013), address: "Calea Republicii 55, Oradea", hours: "12:00 – 23:30, mar–dum", description: "Steakhouse cu cărnuri maturate 30 de zile, listă de vinuri roșii și o sală discretă pentru afaceri.", dishes: ["Ribeye maturat 30 zile", "File cu sos de piper", "Cartofi gratinați"], booking: { type: "online", url: "#" }, tags: ["Maturare 30 zile", "Sala privată"] }),
  R({ id: 104, name: "Pizza Oradea", city: "Oradea", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.5, distance: "0.6 km", openUntil: "22:30", image: px(6223172), address: "Str. Republicii 30, Oradea", hours: "12:00 – 22:30, zilnic", description: "Cuptor cu lemne și pizza napolitană, într-un local prietenos cu terasă pe strada pietonală.", dishes: ["Pizza Margherita DOP", "Pizza Diavola", "Calzone"], booking: { type: "phone", phone: "+40 259 552 778" }, tags: ["Cuptor cu lemne", "Stradă pietonală"] }),
  R({ id: 105, name: "Verde Oradea", city: "Oradea", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.3, distance: "0.8 km", openUntil: "21:00", image: px(3026013), address: "Str. Teatrului 5, Oradea", hours: "09:00 – 21:00, zilnic", description: "Bowluri sănătoase, sucuri presate și un spațiu luminos lângă Teatrul de Stat.", dishes: ["Buddha bowl cu avocado", "Supă cremă de broccoli", "Smoothie verde"], booking: { type: "phone", phone: "+40 259 668 330" }, tags: ["Lângă teatru", "Sucuri presate"] }),
  R({ id: 106, name: "Taco Oradea", city: "Oradea", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.2, distance: "0.9 km", openUntil: "23:30", image: px(34289262), address: "Str. Nufărului 18, Oradea", hours: "17:00 – 23:30, zilnic", description: "Terasă cu tacos, chimichanga și margarita, plus muzică latino în weekend.", dishes: ["Tacos al pastor", "Chimichanga", "Margarita"], booking: { type: "phone", phone: "+40 259 220 778" }, tags: ["Terasă", "Muzică latino"] }),
  R({ id: 107, name: "Wok Oradea", city: "Oradea", cuisine: "asian", cuisineLabel: "Asian • Wok", mood: "casual", price: "€€", rating: 4.4, distance: "1.0 km", openUntil: "22:00", image: px(29145757), address: "Calea Republicii 70, Oradea", hours: "12:00 – 22:00, zilnic", description: "Tăiței și orez la wok, cu opțiuni vegane și sosuri de casă preparate zilnic.", dishes: ["Wok de pui cu legume", "Orez cu creveți", "Rulouri de primăvară"], booking: { type: "online", url: "#" }, tags: ["Wok la vedere", "Opțiuni vegane"] }),
  R({ id: 108, name: "Brunch Oradea", city: "Oradea", cuisine: "brunch", cuisineLabel: "Brunch • Cafe", mood: "casual", price: "€€", rating: 4.5, distance: "0.5 km", openUntil: "16:00", image: px(8616015), address: "Piața Unirii 20, Oradea", hours: "08:00 – 16:00, zilnic", description: "Brunch all-day în Piața Unirii, cu ouă în zece moduri, croissante și cafea de specialitate.", dishes: ["Eggs Benedict", "Avocado toast", "Pancakes cu afine"], booking: { type: "online", url: "#" }, tags: ["Piața Unirii", "All-day brunch"] }),
  R({ id: 109, name: "Desert Oradea", city: "Oradea", cuisine: "dessert", cuisineLabel: "Desert • Cofetărie", mood: "casual", price: "€", rating: 4.3, distance: "0.4 km", openUntil: "20:00", image: px(12124906), address: "Str. Republicii 14, Oradea", hours: "10:00 – 20:00, zilnic", description: "Cofetărie cu prăjituri clasice și de sezon, plus o zonă de cafea cu șezlonguri.", dishes: ["Pavlova cu fructe", "Panna cotta", "Clătite cu ciocolată"], booking: { type: "phone", phone: "+40 259 330 552" }, tags: ["Prăjituri de sezon", "Cafea relax"] }),

  /* ── Galați: +7 (110–116) ───────────────────────────────── */
  R({ id: 110, name: "Burger Galați", city: "Galați", cuisine: "burger", cuisineLabel: "Burger • American", mood: "casual", price: "€", rating: 4.3, distance: "0.6 km", openUntil: "22:00", image: px(3727243), address: "Bd. Galați 60, Galați", hours: "11:00 – 22:00, zilnic", description: "Burgeri clasici cu chifle coapte în casă, la doi pași de faleza Dunării.", dishes: ["Cheeseburger clasic", "Burger cu bacon", "Cartofi cu rozmarin"], booking: { type: "phone", phone: "+40 236 330 778" }, tags: ["Lângă Dunăre", "Chifle în casă"] }),
  R({ id: 111, name: "Sushi Galați", city: "Galați", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "elegant", price: "€€€", rating: 4.5, distance: "1.0 km", openUntil: "22:30", image: px(31393434), address: "Str. Brăilei 40, Galați", hours: "12:30 – 22:30, mar–dum", description: "Sushi bar elegant cu pește proaspăt din Marea Neagră și un bar de sake.", dishes: ["Nigiri de somon", "Uramaki California", "Sake cald"], booking: { type: "online", url: "#" }, tags: ["Pește din Marea Neagră", "Bar de sake"] }),
  R({ id: 112, name: "Verde Galați", city: "Galați", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.3, distance: "0.7 km", openUntil: "21:00", image: px(23384612), address: "Str. Traian 25, Galați", hours: "09:00 – 21:00, zilnic", description: "Salate proaspete, bowluri sănătoase și smoothie-uri, într-un spațiu luminos din centru.", dishes: ["Salată grecească cu quinoa", "Buddha bowl", "Smoothie tropical"], booking: { type: "phone", phone: "+40 236 552 330" }, tags: ["Smoothie-uri", "Centru"] }),
  R({ id: 113, name: "Wok Galați", city: "Galați", cuisine: "asian", cuisineLabel: "Asian • Noodle", mood: "casual", price: "€€", rating: 4.4, distance: "0.9 km", openUntil: "22:00", image: px(24243345), address: "Str. Episcopiei 8, Galați", hours: "11:00 – 22:00, zilnic", description: "Ramen și tăiței preparați la comandă, cu bulion tras la foc mic 10 ore.", dishes: ["Ramen tonkotsu", "Udon cu pui karaage", "Gyoza"], booking: { type: "online", url: "#" }, tags: ["Bulion 10h", "Ramen"] }),
  R({ id: 114, name: "Brunch Galați", city: "Galați", cuisine: "brunch", cuisineLabel: "Brunch • Cafe", mood: "casual", price: "€€", rating: 4.4, distance: "0.5 km", openUntil: "16:00", image: px(2874780), address: "Str. Domnească 12, Galați", hours: "08:00 – 16:00, zilnic", description: "Café de brunch all-day cu produse de patiserie proaspete și cafea de specialitate.", dishes: ["Shakshuka", "French toast", "Bowl de iaurt cu granola"], booking: { type: "phone", phone: "+40 236 220 778" }, tags: ["All-day brunch", "Patiserie proaspătă"] }),
  R({ id: 115, name: "Desert Galați", city: "Galați", cuisine: "dessert", cuisineLabel: "Desert • Cofetărie", mood: "casual", price: "€", rating: 4.3, distance: "0.6 km", openUntil: "20:00", image: px(31928755), address: "Str. Mihai Bravu 5, Galați", hours: "10:00 – 20:00, zilnic", description: "Cofetărie cu prăjituri clasice, cheesecake și o zonă de cafea cu terasă.", dishes: ["Cheesecake cu fructe", "Ecler de ciocolată", "Tartă cu mere"], booking: { type: "phone", phone: "+40 236 668 330" }, tags: ["Cheesecake", "Terasă cafea"] }),
  R({ id: 116, name: "Steak Galați", city: "Galați", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "elegant", price: "€€€", rating: 4.5, distance: "1.5 km", openUntil: "23:00", image: px(14515091), address: "Bd. Galați 100, Galați", hours: "12:00 – 23:00, mar–dum", description: "Steakhouse elegant cu cărnuri la grătar pe cărbune și o listă de vinuri românești.", dishes: ["Antricot la grătar", "File cu sos de piper", "Cartofi wedges"], booking: { type: "online", url: "#" }, tags: ["Grătar pe cărbune", "Vinuri românești"] }),

  /* ── Ploiești: +7 (117–123) ─────────────────────────────── */
  R({ id: 117, name: "Burger Ploiești", city: "Ploiești", cuisine: "burger", cuisineLabel: "Burger • Craft", mood: "casual", price: "€", rating: 4.3, distance: "0.7 km", openUntil: "22:00", image: px(5488052), address: "Str. Lipscani 10, Ploiești", hours: "11:00 – 22:00, zilnic", description: "Burgeri craft cu chifle brioșă coapte zilnic și bere artizanală la halbă.", dishes: ["Double smash burger", "Burger cu cheddar", "Cartofi crispy"], booking: { type: "phone", phone: "+40 244 330 778" }, tags: ["Chifle brioșă", "Bere artizanală"] }),
  R({ id: 118, name: "Sushi Ploiești", city: "Ploiești", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "elegant", price: "€€€", rating: 4.4, distance: "1.0 km", openUntil: "22:30", image: px(4724481), address: "Bd. Carol I 30, Ploiești", hours: "12:30 – 22:30, mar–dum", description: "Sushi bar elegant cu pește proaspțat de două ori pe săptămână și un meniu omakase.", dishes: ["Omakase 6 piese", "Nigiri de somon", "Edamame"], booking: { type: "online", url: "#" }, tags: ["Omakase", "Pește proaspăt"] }),
  R({ id: 119, name: "Taco Ploiești", city: "Ploiești", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.2, distance: "0.8 km", openUntil: "23:00", image: px(36498696), address: "Str. Târgul de Vechi 20, Ploiești", hours: "17:00 – 23:00, zilnic", description: "Terasă cu tacos, nachos și margarita, plus muzică latino în weekend.", dishes: ["Tacos al pastor", "Nachos supreme", "Margarita"], booking: { type: "phone", phone: "+40 244 552 330" }, tags: ["Terasă", "Muzică latino"] }),
  R({ id: 120, name: "Wok Ploiești", city: "Ploiești", cuisine: "asian", cuisineLabel: "Asian • Wok", mood: "casual", price: "€€", rating: 4.3, distance: "0.9 km", openUntil: "22:00", image: px(29145757), address: "Str. Independenței 40, Ploiești", hours: "12:00 – 22:00, zilnic", description: "Tăiței și orez la wok, cu sosuri de casă și opțiuni vegane.", dishes: ["Wok de pui cu legume", "Orez cu creveți", "Rulouri de primăvară"], booking: { type: "online", url: "#" }, tags: ["Wok la vedere", "Opțiuni vegane"] }),
  R({ id: 121, name: "Brunch Ploiești", city: "Ploiești", cuisine: "brunch", cuisineLabel: "Brunch • Cafe", mood: "casual", price: "€€", rating: 4.4, distance: "0.5 km", openUntil: "16:00", image: px(947898), address: "Str. Mareșal 5, Ploiești", hours: "08:00 – 16:00, zilnic", description: "Café de brunch all-day cu croissante proaspete, ouă în zece moduri și cafea de specialitate.", dishes: ["Eggs Benedict", "Croque Madame", "Pancakes cu sirop de arțar"], booking: { type: "phone", phone: "+40 244 220 778" }, tags: ["All-day brunch", "Croissante proaspete"] }),
  R({ id: 122, name: "Desert Ploiești", city: "Ploiești", cuisine: "dessert", cuisineLabel: "Desert • Cofetărie", mood: "casual", price: "€", rating: 4.3, distance: "0.6 km", openUntil: "20:00", image: px(39240989), address: "Str. Mareșal 15, Ploiești", hours: "10:00 – 20:00, zilnic", description: "Cofetărie modernă cu prăjituri internaționale, cheesecake și o selecție de ceaiuri.", dishes: ["Cheesecake cu matcha", "Tartă cu lămâie", "Trufe de ciocolată"], booking: { type: "phone", phone: "+40 244 668 330" }, tags: ["Rețete internaționale", "Ceaiuri"] }),
  R({ id: 123, name: "Seafood Ploiești", city: "Ploiești", cuisine: "seafood", cuisineLabel: "Fructe de mare • Mediteranean", mood: "elegant", price: "€€€", rating: 4.5, distance: "1.4 km", openUntil: "22:30", image: px(14499018), address: "Bd. Carol I 88, Ploiești", hours: "12:00 – 22:30, zilnic", description: "Fructe de mare livrate zilnic din Constanța, servite într-o sală intimă cu lumânări.", dishes: ["Platou de fructe de mare", "Linguine alle vongole", "Gamberi la grătar"], booking: { type: "online", url: "#" }, tags: ["Livre zilnic", "Sală intimă"] }),

  /* ── Arad: +7 (124–130) ─────────────────────────────────── */
  R({ id: 124, name: "Pizza Arad", city: "Arad", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.5, distance: "0.5 km", openUntil: "22:30", image: px(29626980), address: "Piața Avram Iancu 12, Arad", hours: "12:00 – 22:30, zilnic", description: "Cuptor cu vatră de piatră și pizza clasică italiană, într-un local de familie.", dishes: ["Pizza Capricciosa", "Pizza Margherita", "Calzone"], booking: { type: "phone", phone: "+40 257 552 778" }, tags: ["Vatră de piatră", "Familie"] }),
  R({ id: 125, name: "Sushi Arad", city: "Arad", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "elegant", price: "€€€", rating: 4.4, distance: "0.9 km", openUntil: "22:30", image: px(28559483), address: "Bd. Revoluției 45, Arad", hours: "12:30 – 22:30, mar–dum", description: "Sushi bar minimalist cu pește proaspăt de două ori pe săptămână și sake cald.", dishes: ["Set nigiri 8 piese", "Dragon roll", "Sake cald"], booking: { type: "online", url: "#" }, tags: ["Minimalist", "Sake cald"] }),
  R({ id: 126, name: "Steak Arad", city: "Arad", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "business", price: "€€€€", rating: 4.6, distance: "1.3 km", openUntil: "23:30", image: px(36683019), address: "Calea Aurel Vlaicu 20, Arad", hours: "12:00 – 23:30, lun–sâm", description: "Steakhouse cu cărnuri maturate 28 de zile, o listă de vinuri și săli pentru afaceri.", dishes: ["Ribeye maturat 28 zile", "File cu sos de trufe", "Cartofi gratinați"], booking: { type: "online", url: "#" }, tags: ["Maturare 28 zile", "Săli private"] }),
  R({ id: 127, name: "Taco Arad", city: "Arad", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.2, distance: "0.8 km", openUntil: "23:00", image: px(25391591), address: "Str. Tribul Popular 10, Arad", hours: "17:00 – 23:00, zilnic", description: "Terasă cu tacos, nachos și margarita, plus muzică latino în weekend.", dishes: ["Tacos de pui", "Nachos supreme", "Margarita"], booking: { type: "phone", phone: "+40 257 220 778" }, tags: ["Terasă", "Muzică latino"] }),
  R({ id: 128, name: "Verde Arad", city: "Arad", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.3, distance: "0.6 km", openUntil: "21:00", image: px(6065181), address: "Str. Cloșca 8, Arad", hours: "09:00 – 21:00, zilnic", description: "Meniu sezonier cu legume locale, bowluri și sucuri presate la rece.", dishes: ["Bowl cu quinoa și sfeclă", "Supă cremă de linte", "Smoothie verde"], booking: { type: "phone", phone: "+40 257 668 330" }, tags: ["Farm-to-table", "Sucuri presate"] }),
  R({ id: 129, name: "Brunch Arad", city: "Arad", cuisine: "brunch", cuisineLabel: "Brunch • Cafe", mood: "casual", price: "€€", rating: 4.4, distance: "0.4 km", openUntil: "16:00", image: px(8616015), address: "Piața Avram Iancu 18, Arad", hours: "08:00 – 16:00, zilnic", description: "Brunch all-day în Piața Avram Iancu, cu ouă în zece moduri, croissante și cafea filtru.", dishes: ["Eggs Benedict", "Avocado toast", "French toast"], booking: { type: "online", url: "#" }, tags: ["Piața Avram Iancu", "Cafea filtru"] }),
  R({ id: 130, name: "Desert Arad", city: "Arad", cuisine: "dessert", cuisineLabel: "Desert • Cofetărie", mood: "casual", price: "€", rating: 4.3, distance: "0.5 km", openUntil: "20:00", image: px(32916204), address: "Bd. Revoluției 22, Arad", hours: "10:00 – 20:00, zilnic", description: "Cofetărie boutique cu prăjituri miniaturale, macarons și cafea de specialitate.", dishes: ["Mini fruit tart", "Macarons assortiti", "Mousse de ciocolată"], booking: { type: "phone", phone: "+40 257 330 552" }, tags: ["Macarons", "Cafea de specialitate"] }),

  /* ── Bacău: +7 (131–137) ────────────────────────────────── */
  R({ id: 131, name: "Burger Bacău", city: "Bacău", cuisine: "burger", cuisineLabel: "Burger • American", mood: "casual", price: "€", rating: 4.3, distance: "0.6 km", openUntil: "22:00", image: px(3727243), address: "Str. Mărășești 30, Bacău", hours: "11:00 – 22:00, zilnic", description: "Burgeri clasici cu chifle coapte în casă și milkshake-uri, într-un local relaxat.", dishes: ["Cheeseburger clasic", "Burger cu bacon", "Milkshake de ciocolată"], booking: { type: "phone", phone: "+40 234 330 778" }, tags: ["Chifle în casă", "Milkshake"] }),
  R({ id: 132, name: "Sushi Bacău", city: "Bacău", cuisine: "sushi", cuisineLabel: "Sushi • Japonez", mood: "elegant", price: "€€€", rating: 4.4, distance: "1.0 km", openUntil: "22:30", image: px(31393434), address: "Bd. Nicolae Iorga 25, Bacău", hours: "12:30 – 22:30, mar–dum", description: "Sushi bar elegant cu pește proaspăt de două ori pe săptămână și un bar de sake.", dishes: ["Nigiri de somon", "Uramaki California", "Sake cald"], booking: { type: "online", url: "#" }, tags: ["Pește proaspăt", "Bar de sake"] }),
  R({ id: 133, name: "Pizza Bacău", city: "Bacău", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.4, distance: "0.7 km", openUntil: "22:30", image: px(6223172), address: "Str. Ana Ipătescu 12, Bacău", hours: "12:00 – 22:30, zilnic", description: "Cuptor cu lemne și pizza napolitană, într-un local de familie cu terasă.", dishes: ["Pizza Margherita", "Pizza Diavola", "Bruschette"], booking: { type: "phone", phone: "+40 234 552 330" }, tags: ["Cuptor cu lemne", "Familie"] }),
  R({ id: 134, name: "Taco Bacău", city: "Bacău", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.2, distance: "0.9 km", openUntil: "23:00", image: px(36498696), address: "Str. Mărășești 40, Bacău", hours: "17:00 – 23:00, zilnic", description: "Terasă cu tacos, guacamole și margarita, plus muzică latino în weekend.", dishes: ["Tacos al pastor", "Guacamole proaspăt", "Margarita"], booking: { type: "phone", phone: "+40 234 668 330" }, tags: ["Terasă", "Muzică latino"] }),
  R({ id: 135, name: "Wok Bacău", city: "Bacău", cuisine: "asian", cuisineLabel: "Asian • Wok", mood: "casual", price: "€€", rating: 4.3, distance: "0.8 km", openUntil: "22:00", image: px(24243345), address: "Str. Traian 15, Bacău", hours: "12:00 – 22:00, zilnic", description: "Tăiței și orez la wok, cu sosuri de casă și opțiuni vegane.", dishes: ["Wok de pui cu legume", "Tăiței cu creveți", "Rulouri de primăvară"], booking: { type: "online", url: "#" }, tags: ["Wok la vedere", "Opțiuni vegane"] }),
  R({ id: 136, name: "Brunch Bacău", city: "Bacău", cuisine: "brunch", cuisineLabel: "Brunch • Cafe", mood: "casual", price: "€€", rating: 4.4, distance: "0.5 km", openUntil: "16:00", image: px(2874780), address: "Str. Mărășești 50, Bacău", hours: "08:00 – 16:00, zilnic", description: "Café de brunch all-day cu ouă în zece moduri, croissante și cafea de specialitate.", dishes: ["Eggs Benedict", "Avocado toast", "Pancakes cu afine"], booking: { type: "phone", phone: "+40 234 220 778" }, tags: ["All-day brunch", "Cafea de specialitate"] }),
  R({ id: 137, name: "Verde Bacău", city: "Bacău", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.3, distance: "0.6 km", openUntil: "21:00", image: px(3026013), address: "Str. Ana Ipătescu 20, Bacău", hours: "09:00 – 21:00, zilnic", description: "Bowluri sănătoase, sucuri presate și un spațiu luminos în centru.", dishes: ["Buddha bowl cu năut", "Supă cremă de linte", "Smoothie verde"], booking: { type: "phone", phone: "+40 234 552 778" }, tags: ["Sucuri presate", "Centru"] }),

  /* ── Târgu Mureș: +7 (138–144) ──────────────────────────── */
  R({ id: 138, name: "Pizza Târgu Mureș", city: "Târgu Mureș", cuisine: "pizza", cuisineLabel: "Pizza • Italian", mood: "familie", price: "€€", rating: 4.5, distance: "0.5 km", openUntil: "22:30", image: px(9543813), address: "Piața Trandafirilor 15, Târgu Mureș", hours: "12:00 – 22:30, zilnic", description: "Cuptor cu lemne și pizza napolitană, în Piața Trandafirilor, cu terasă pentru familii.", dishes: ["Pizza Margherita", "Pizza Capricciosa", "Calzone"], booking: { type: "phone", phone: "+40 265 552 778" }, tags: ["Piața Trandafirilor", "Cuptor cu lemne"] }),
  R({ id: 139, name: "Burger Târgu Mureș", city: "Târgu Mureș", cuisine: "burger", cuisineLabel: "Burger • Craft", mood: "casual", price: "€", rating: 4.3, distance: "0.7 km", openUntil: "22:00", image: px(5488052), address: "Str. Bolyai 20, Târgu Mureș", hours: "11:00 – 22:00, zilnic", description: "Burgeri craft cu chifle brioșă coapte zilnic și bere artizanală.", dishes: ["Double cheeseburger", "Burger cu jalapeño", "Cartofi crispy"], booking: { type: "phone", phone: "+40 265 330 445" }, tags: ["Chifle brioșă", "Bere artizanală"] }),
  R({ id: 140, name: "Steak Târgu Mureș", city: "Târgu Mureș", cuisine: "steak", cuisineLabel: "Steak • Grătar", mood: "elegant", price: "€€€", rating: 4.5, distance: "1.2 km", openUntil: "23:00", image: px(14515091), address: "Bd. 1 Decembrie 30, Târgu Mureș", hours: "12:00 – 23:00, mar–dum", description: "Steakhouse elegant cu cărnuri la grătar pe cărbune și o listă de vinuri românești.", dishes: ["Antricot la grătar", "File cu sos de piper", "Cartofi wedges"], booking: { type: "online", url: "#" }, tags: ["Grătar pe cărbune", "Vinuri românești"] }),
  R({ id: 141, name: "Taco Târgu Mureș", city: "Târgu Mureș", cuisine: "mexican", cuisineLabel: "Mexican", mood: "distractie", price: "€", rating: 4.2, distance: "0.8 km", openUntil: "23:00", image: px(34289262), address: "Str. Koteles Samuel 14, Târgu Mureș", hours: "17:00 – 23:00, zilnic", description: "Terasă cu tacos, nachos și margarita, plus muzică latino în weekend.", dishes: ["Tacos al pastor", "Nachos supreme", "Margarita"], booking: { type: "phone", phone: "+40 265 668 330" }, tags: ["Terasă", "Muzică latino"] }),
  R({ id: 142, name: "Verde Târgu Mureș", city: "Târgu Mureș", cuisine: "vegetarian", cuisineLabel: "Vegetarian • Sănătos", mood: "casual", price: "€€", rating: 4.3, distance: "0.6 km", openUntil: "21:00", image: px(33323285), address: "Str. Bolyai 30, Târgu Mureș", hours: "09:00 – 21:00, zilnic", description: "Meniu sezonier cu legume locale, bowluri și sucuri presate la rece.", dishes: ["Bowl cu quinoa și sfeclă", "Supă cremă de dovleac", "Smoothie verde"], booking: { type: "phone", phone: "+40 265 220 778" }, tags: ["Farm-to-table", "Sucuri presate"] }),
  R({ id: 143, name: "Desert Târgu Mureș", city: "Târgu Mureș", cuisine: "dessert", cuisineLabel: "Desert • Cofetărie", mood: "casual", price: "€", rating: 4.3, distance: "0.4 km", openUntil: "20:00", image: px(39240989), address: "Piața Trandafirilor 20, Târgu Mureș", hours: "10:00 – 20:00, zilnic", description: "Cofetărie cu prăjituri clasice, cheesecake și o zonă de cafea cu terasă.", dishes: ["Cheesecake cu matcha", "Tartă cu lămâie", "Trufe de ciocolată"], booking: { type: "phone", phone: "+40 265 552 330" }, tags: ["Cheesecake", "Terasă cafea"] }),
  R({ id: 144, name: "Wok Târgu Mureș", city: "Târgu Mureș", cuisine: "asian", cuisineLabel: "Asian • Noodle", mood: "casual", price: "€€", rating: 4.4, distance: "0.9 km", openUntil: "22:00", image: px(29145757), address: "Str. Revoluției 8, Târgu Mureș", hours: "11:00 – 22:00, zilnic", description: "Ramen și tăiței preparați la comandă, cu bulion vegetarian și toppinguri variate.", dishes: ["Ramen tonkotsu", "Udon cu pui", "Rice bowl cu tofu"], booking: { type: "online", url: "#" }, tags: ["Ramen", "Bulion vegetarian"] }),

  /* ── Iași: +1 (145) ─────────────────────────────────────── */
  R({ id: 145, name: "Brunch Iași", city: "Iași", cuisine: "brunch", cuisineLabel: "Brunch • Cafe", mood: "casual", price: "€€", rating: 4.4, distance: "0.6 km", openUntil: "16:00", image: px(8616015), address: "Str. Copou 30, Iași", hours: "08:00 – 16:00, zilnic", description: "Café de brunch all-day lângă Parcul Copou, cu ouă în zece moduri, croissante proaspete și cafea de specialitate.", dishes: ["Eggs Benedict", "Avocado toast cu ou poșat", "Pancakes cu sirop de arțar"], booking: { type: "phone", phone: "+40 232 552 778" }, tags: ["Lângă Copou", "All-day brunch"] }),
];

const priceRank: Record<string, number> = { "€": 1, "€€": 2, "€€€": 3, "€€€€": 4 };

function computeMatch(r: Restaurant, answers: Record<string, any>): number {
  let score = 55;
  if (answers.cuisine && (answers.cuisine === r.cuisine || answers.cuisine === "orice")) score += 22;
  if (answers.mood && answers.mood === r.mood) score += 14;
  if (answers.budget && answers.budget === r.price) score += 9;
  score += Math.round(Math.random() * 4);
  return Math.min(99, score);
}

function googleMapsUrl(r: Restaurant): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${r.name}, ${r.address}`)}`;
}

/* ── Reviews ──────────────────────────────────────────────────── */
const REVIEWERS = ["Andrei P.","Elena M.","Mihai R.","Ioana T.","Cristian D.","Ana V.","George B.","Larisa S.","Bogdan N.","Diana C.","Alexandru F.","Raluca I.","Vlad O.","Simona K.","Radu H."];
const REVIEW_LINES = [
  "Am comandat {dish} și a fost exact ce aveam nevoie. Ne întoarcem sigur.",
  "Atmosfera e superbă, iar {dish} a fost punctul culminant al serii.",
  "Porții generoase și personal amabil. Recomand cu încredere {dish}.",
  "{dish} a fost foarte bun, dar am așteptat puțin mai mult decât mă așteptam.",
  "Locul e mic și cald, perfect pentru o seară liniștită. {dish} — foarte reușit.",
  "Am fost impresionat de prospețimea ingredientelor din {dish}.",
  "Prețul e corect pentru calitate. {dish} merită încercat.",
  "Personalul a fost foarte atent, iar {dish} a venit exact cum a fost descris în meniu.",
  "Revin de fiecare dată pentru {dish} — nu m-a dezamăgit niciodată.",
  "Decor plăcut, muzică potrivită, iar {dish} a fost punctul forte al mesei.",
  "Recomand rezervare din timp, mai ales în weekend. {dish} a fost delicios.",
  "O experiență solidă per total, iar {dish} chiar merită menționat separat.",
];

function getReviews(r: Restaurant) {
  return Array.from({ length: 3 }).map((_, i) => {
    const lineIdx = (r.id * 3 + i * 2) % REVIEW_LINES.length;
    const authorIdx = (r.id * 5 + i * 3) % REVIEWERS.length;
    const dish = r.dishes[i % r.dishes.length];
    const ratingVariant = Math.max(3.5, Math.min(5, r.rating + (i - 1) * 0.3));
    return {
      author: REVIEWERS[authorIdx],
      rating: Math.round(ratingVariant * 2) / 2,
      text: REVIEW_LINES[lineIdx].replace("{dish}", dish),
      daysAgo: 2 + ((r.id * 7 + i * 13) % 45),
    };
  });
}

function getReviewCount(r: Restaurant): number { return 38 + ((r.id * 17) % 260); }
function getGallery(r: Restaurant): string[] { return (GALLERY[r.cuisine] || GALLERY.italian).map((id) => px(id, 600)); }

/* ── UI primitives ────────────────────────────────────────────── */
function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5" style={{ background: "none", border: "none", cursor: "pointer" }}>
      <span style={{ width: 34, height: 34, borderRadius: 10, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Utensils size={17} color="#fff" strokeWidth={2.2} />
      </span>
      <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, color: C.ink, letterSpacing: -0.4 }}>RestoMatch</span>
    </button>
  );
}

function Pill({ active, onClick, children, style }: { active?: boolean; onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} className="transition-all" style={{
      padding: "9px 16px", borderRadius: 999, border: `1px solid ${active ? C.accent : C.line}`,
      background: active ? C.accent : "#fff", color: active ? "#fff" : C.ink,
      fontFamily: BODY, fontWeight: 500, fontSize: 13.5, cursor: "pointer", whiteSpace: "nowrap",
      transition: "all .2s ease", ...style,
    }}>{children}</button>
  );
}

function BtnPrimary({ children, onClick, full, style, type = "button" }: { children: React.ReactNode; onClick?: () => void; full?: boolean; style?: React.CSSProperties; type?: "button" | "submit" }) {
  return (
    <button type={type} onClick={onClick} className="transition-all" style={{
      background: C.ink, color: "#fff", border: "none", padding: "14px 28px", borderRadius: 12,
      fontFamily: BODY, fontWeight: 600, fontSize: 14.5, cursor: "pointer",
      width: full ? "100%" : "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      transition: "all .2s ease", ...style,
    }} onMouseEnter={(e) => (e.currentTarget.style.background = "#000")}
      onMouseLeave={(e) => (e.currentTarget.style.background = C.ink)}>{children}</button>
  );
}

function BtnOutline({ children, onClick, full, style }: { children: React.ReactNode; onClick?: () => void; full?: boolean; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} className="transition-all" style={{
      background: "transparent", color: C.ink, border: `1px solid ${C.line}`, padding: "14px 28px", borderRadius: 12,
      fontFamily: BODY, fontWeight: 600, fontSize: 14.5, cursor: "pointer",
      width: full ? "100%" : "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      transition: "all .2s ease", ...style,
    }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.ink; e.currentTarget.style.background = C.lineSoft; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.background = "transparent"; }}>{children}</button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: BODY, color: C.accent, fontWeight: 600, fontSize: 13, marginBottom: 8, letterSpacing: 0.3 }}>{children}</p>;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      <Star size={13} color={C.gold} fill={C.gold} />
      <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: C.ink }}>{rating.toFixed(1)}</span>
    </span>
  );
}

function Card({ children, style, onClick, hover }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void; hover?: boolean }) {
  return (
    <div onClick={onClick} className="transition-all" style={{
      background: C.surface, border: `1px solid ${C.line}`, borderRadius: 16, transition: "all .25s ease",
      ...(hover ? { cursor: "pointer" } : {}), ...style,
    }} onMouseEnter={hover ? (e) => { e.currentTarget.style.borderColor = "#D5CCBF"; e.currentTarget.style.boxShadow = C.shadow; } : undefined}
      onMouseLeave={hover ? (e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.boxShadow = "none"; } : undefined}>{children}</div>
  );
}

/* ── Header ──────────────────────────────────────────────────── */
function Header({ view, setView, loggedIn }: { view: string; setView: (v: string) => void; loggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const items = [{ id: "home", label: "Acasă" }, { id: "results", label: "Explorează" }, { id: "how", label: "Cum funcționează" }, { id: "for-restaurants", label: "Prețuri" }];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(250,248,245,0.85)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.line}` }}>
      <div className="mx-auto flex items-center justify-between" style={{ maxWidth: 1200, padding: "14px 24px" }}>
        <Logo onClick={() => { setView("home"); setOpen(false); }} />
        <nav className="hidden md:flex items-center" style={{ gap: 32 }}>
          {items.map((it) => (
            <button key={it.id} onClick={() => setView(it.id)} style={{
              background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontWeight: 500, fontSize: 14,
              color: view === it.id ? C.ink : C.inkSoft, transition: "color .2s",
            }} onMouseEnter={(e) => (e.currentTarget.style.color = C.ink)} onMouseLeave={(e) => (e.currentTarget.style.color = view === it.id ? C.ink : C.inkSoft)}>{it.label}</button>
          ))}
        </nav>
        <div className="hidden md:flex items-center" style={{ gap: 14 }}>
          <button onClick={() => setView(loggedIn ? "dashboard" : "login")} style={{
            background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontWeight: 500, fontSize: 14, color: C.inkSoft,
          }}>{loggedIn ? "Contul meu" : "Login"}</button>
          <BtnPrimary onClick={() => setView("search")} style={{ padding: "10px 20px", fontSize: 14, borderRadius: 10 }}>Găsește un restaurant</BtnPrimary>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none" }}>
          {open ? <X size={24} color={C.ink} /> : <Menu size={24} color={C.ink} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden" style={{ borderTop: `1px solid ${C.line}`, padding: "12px 24px", display: "flex", flexDirection: "column", gap: 2, background: C.surface }}>
          {items.map((it) => (
            <button key={it.id} onClick={() => { setView(it.id); setOpen(false); }} style={{ textAlign: "left", padding: "12px 0", background: "none", border: "none", fontFamily: BODY, fontWeight: 500, fontSize: 15, color: view === it.id ? C.ink : C.inkSoft }}>{it.label}</button>
          ))}
          <button onClick={() => { setView(loggedIn ? "dashboard" : "login"); setOpen(false); }} style={{ textAlign: "left", padding: "12px 0", background: "none", border: "none", fontFamily: BODY, fontWeight: 500, fontSize: 15, color: C.inkSoft }}>{loggedIn ? "Contul meu" : "Login"}</button>
          <BtnPrimary onClick={() => { setView("search"); setOpen(false); }} full style={{ marginTop: 8 }}>Găsește un restaurant</BtnPrimary>
        </div>
      )}
    </header>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */
function Footer({ setView }: { setView: (v: string) => void }) {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, marginTop: 100, background: C.surface }}>
      <div className="mx-auto" style={{ maxWidth: 1200, padding: "56px 24px 32px" }}>
        <div className="flex flex-col md:flex-row md:justify-between" style={{ gap: 32 }}>
          <div style={{ maxWidth: 320 }}>
            <Logo onClick={() => setView("home")} />
            <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 14, marginTop: 14, lineHeight: 1.6 }}>Restaurantul potrivit, găsit pentru tine. Fără compromisuri.</p>
          </div>
          <div className="flex flex-wrap" style={{ gap: 48 }}>
            <div>
              <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: C.ink, marginBottom: 12, letterSpacing: 0.3 }}>Platformă</p>
              {[["home","Acasă"],["results","Explorează"],["how","Cum funcționează"],["surprise","Surprinde-mă"]].map(([v,l]) => (
                <button key={v} onClick={() => setView(v)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontSize: 14, color: C.inkSoft, padding: "5px 0" }}>{l}</button>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: C.ink, marginBottom: 12, letterSpacing: 0.3 }}>Cont</p>
              {[["login","Login"],["dashboard","Dashboard"],["for-restaurants","Pentru restaurante"]].map(([v,l]) => (
                <button key={v} onClick={() => setView(v)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontSize: 14, color: C.inkSoft, padding: "5px 0" }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 12, marginTop: 44 }}>Prototip demonstrativ. Restaurantele și datele afișate sunt fictive.</p>
      </div>
    </footer>
  );
}

/* ── Search Wizard ───────────────────────────────────────────── */
function SearchWizard({ answers, setAnswers, onSubmit }: { answers: any; setAnswers: React.Dispatch<React.SetStateAction<any>>; onSubmit: () => void }) {
  const [step, setStep] = useState(0);
  const steps = ["Oraș", "Mâncare", "Buget", "Atmosferă", "Rating"];
  const set = (k: string, v: any) => setAnswers((a: any) => ({ ...a, [k]: v }));
  const canNext = () => { if (step === 0) return !!answers.city; if (step === 1) return !!answers.cuisine; if (step === 2) return !!answers.budget; if (step === 3) return !!answers.mood; return true; };

  return (
    <Card style={{ padding: "32px 28px", boxShadow: C.shadowLg, borderColor: C.line }}>
      <div className="flex items-center" style={{ gap: 6, marginBottom: 28 }}>
        {steps.map((s, i) => (<div key={s} style={{ flex: 1, height: 3, borderRadius: 3, background: i <= step ? C.ink : C.line, transition: "background .3s" }} />))}
      </div>
      {step === 0 && (<div><h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 24, color: C.ink, marginBottom: 18 }}>Unde vrei să mănânci?</h3><div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 8 }}>{CITIES.map((c) => (<Pill key={c} active={answers.city === c} onClick={() => set("city", c)} style={{ justifyContent: "flex-start", width: "100%" }}><MapPin size={13} style={{ marginRight: 5 }} /> {c}</Pill>))}</div></div>)}
      {step === 1 && (<div><h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 24, color: C.ink, marginBottom: 18 }}>Ce vrei să mănânci?</h3><div className="flex flex-wrap" style={{ gap: 8 }}>{CUISINES.map((c) => (<Pill key={c.id} active={answers.cuisine === c.id} onClick={() => set("cuisine", c.id)}>{c.icon} {c.label}</Pill>))}</div></div>)}
      {step === 2 && (<div><h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 24, color: C.ink, marginBottom: 18 }}>Care este bugetul tău?</h3><div className="flex flex-wrap" style={{ gap: 8 }}>{BUDGETS.map((b) => (<Pill key={b} active={answers.budget === b} onClick={() => set("budget", b)} style={{ fontSize: 15, minWidth: 56, justifyContent: "center" }}>{b}</Pill>))}</div></div>)}
      {step === 3 && (<div><h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 24, color: C.ink, marginBottom: 18 }}>Ce atmosferă cauți?</h3><div className="flex flex-wrap" style={{ gap: 8 }}>{MOODS.map((m) => (<Pill key={m.id} active={answers.mood === m.id} onClick={() => set("mood", m.id)}>{m.icon} {m.label}</Pill>))}</div></div>)}
      {step === 4 && (<div><h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 24, color: C.ink, marginBottom: 4 }}>Cât de important este ratingul?</h3><p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 14, marginBottom: 20 }}>Alege ratingul minim pe care trebuie să-l aibă restaurantul.</p><input type="range" min="3" max="5" step="0.5" value={answers.minRating || 4} onChange={(e) => set("minRating", parseFloat(e.target.value))} style={{ width: "100%", accentColor: C.ink }} /><div className="flex items-center justify-between" style={{ marginTop: 10 }}><span style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 13 }}>★★★☆☆</span><span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 20, color: C.ink }}>{(answers.minRating || 4).toFixed(1)} ★</span><span style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 13 }}>★★★★★</span></div></div>)}
      <div className="flex items-center justify-between" style={{ marginTop: 28 }}>
        {step > 0 ? (<button onClick={() => setStep(step - 1)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: BODY, fontWeight: 500, color: C.inkSoft, fontSize: 14 }}><ChevronLeft size={16} /> Înapoi</button>) : <span />}
        {step < 4 ? (<BtnPrimary onClick={() => canNext() && setStep(step + 1)} style={{ opacity: canNext() ? 1 : 0.4, padding: "11px 22px" }}>Continuă <ArrowRight size={15} /></BtnPrimary>) : (<BtnPrimary onClick={onSubmit} style={{ padding: "12px 26px" }}><Search size={16} /> Găsește restaurante</BtnPrimary>)}
      </div>
    </Card>
  );
}

/* ── Home ────────────────────────────────────────────────────── */
function Home({ setView, answers, setAnswers, goSearch }: { setView: (v: string) => void; answers: any; setAnswers: React.Dispatch<React.SetStateAction<any>>; goSearch: () => void }) {
  const cuisines: { label: string; id: string; img: string }[] = [
    { label: "Pizza", id: "pizza", img: px(1566837, 500) },
    { label: "Sushi", id: "sushi", img: px(31393436, 500) },
    { label: "Burger", id: "burger", img: px(3727243, 500) },
    { label: "Steak", id: "steak", img: px(36683019, 500) },
    { label: "Italian", id: "italian", img: px(546945, 500) },
    { label: "Asian", id: "asian", img: px(24243345, 500) },
    { label: "Mexican", id: "mexican", img: px(36498696, 500) },
    { label: "Vegetarian", id: "vegetarian", img: px(6065181, 500) },
    { label: "Fructe de mare", id: "seafood", img: px(16743486, 500) },
    { label: "Brunch", id: "brunch", img: px(8616015, 500) },
    { label: "Desert", id: "dessert", img: px(39240983, 500) },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div className="mx-auto" style={{ maxWidth: 1200, padding: "72px 24px 32px" }}>
          <div className="grid md:grid-cols-2 items-center" style={{ gap: 48 }}>
            <div>
              <p style={{ fontFamily: BODY, color: C.accent, fontWeight: 600, fontSize: 13, letterSpacing: 0.5, marginBottom: 16 }}>RESTOMATCH • ROMÂNIA</p>
              <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(36px, 5.5vw, 58px)", lineHeight: 1.05, color: C.ink, letterSpacing: -1.2 }}>
                Restaurantul potrivit,<br />de fiecare dată.
              </h1>
              <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 17, lineHeight: 1.6, marginTop: 22, maxWidth: 460 }}>
                Spune-ne orașul, ce ai poftă, bugetul și atmosfera. Noi găsim cele mai potrivite restaurante pentru tine.
              </p>
              <div className="flex flex-col sm:flex-row" style={{ gap: 12, marginTop: 32 }}>
                <BtnPrimary onClick={() => setView("search")}>Găsește-mi restaurantul <ArrowRight size={16} /></BtnPrimary>
                <BtnOutline onClick={() => setView("results")}>Explorează restaurante</BtnOutline>
              </div>
              <div className="flex items-center" style={{ gap: 24, marginTop: 36 }}>
                <div><p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 28, color: C.ink }}>{RESTAURANTS.length}+</p><p style={{ fontFamily: BODY, fontSize: 13, color: C.inkSoft }}>Restaurante</p></div>
                <div style={{ width: 1, height: 32, background: C.line }} />
                <div><p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 28, color: C.ink }}>{CITIES.length}</p><p style={{ fontFamily: BODY, fontSize: 13, color: C.inkSoft }}>Orașe</p></div>
                <div style={{ width: 1, height: 32, background: C.line }} />
                <div><p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 28, color: C.ink }}>{CUISINES.length - 1}</p><p style={{ fontFamily: BODY, fontSize: 13, color: C.inkSoft }}>Bucătării</p></div>
              </div>
            </div>
            <div style={{ position: "relative", height: 440 }}>
              <img src={px(6223172, 750)} alt="Pizza" style={{ position: "absolute", top: 0, right: 0, width: "70%", height: 280, objectFit: "cover", borderRadius: 20, boxShadow: C.shadowLg }} />
              <div style={{ position: "absolute", left: 0, bottom: 0, width: "58%", background: C.surface, borderRadius: 18, padding: 14, boxShadow: C.shadowLg, border: `1px solid ${C.line}` }}>
                <img src={px(28575445, 400)} alt="Interior" style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 12 }} />
                <div className="flex items-center justify-between" style={{ marginTop: 10 }}>
                  <div><p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 14, color: C.ink }}>La Trattoria</p><p style={{ fontFamily: BODY, fontSize: 12, color: C.inkSoft }}>Italian • Romantic</p></div>
                  <span style={{ background: C.ink, color: "#fff", fontFamily: BODY, fontWeight: 600, fontSize: 12, padding: "5px 10px", borderRadius: 999 }}>96%</span>
                </div>
              </div>
              <div style={{ position: "absolute", top: 24, left: -4, background: C.surface, borderRadius: 14, padding: "10px 14px", boxShadow: C.shadow, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 8 }}>
                <Stars rating={4.8} /><span style={{ fontFamily: BODY, fontSize: 12, color: C.inkSoft }}>Sakura Sushi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH WIDGET */}
      <section className="mx-auto" style={{ maxWidth: 680, padding: "56px 24px 16px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 32, color: C.ink }}>Unde vrei să mănânci?</h2>
          <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 15, marginTop: 8 }}>Răspunde la 5 întrebări și găsește restaurantul perfect.</p>
        </div>
        <SearchWizard answers={answers} setAnswers={setAnswers} onSubmit={goSearch} />
      </section>

      {/* CUISINE SHOWCASE */}
      <section className="mx-auto" style={{ maxWidth: 1200, padding: "88px 24px 16px" }}>
        <Eyebrow>Gastronomie</Eyebrow>
        <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 32, color: C.ink, marginBottom: 28 }}>Poftă de ceva anume?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" style={{ gap: 12 }}>
          {cuisines.map((c) => (
            <button key={c.label} onClick={() => { setAnswers((a) => ({ ...a, cuisine: c.id })); setView("results"); }} className="transition-all" style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "none", cursor: "pointer", height: 130, transition: "all .25s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = C.shadow; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              <img src={c.img} alt={c.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,24,21,0.75), transparent 55%)" }} />
              <span style={{ position: "absolute", bottom: 10, left: 12, fontFamily: BODY, fontWeight: 600, fontSize: 14, color: "#fff" }}>{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto" style={{ maxWidth: 1200, padding: "88px 24px 16px" }}>
        <Eyebrow>Cum funcționează</Eyebrow>
        <div className="grid md:grid-cols-3" style={{ gap: 20 }}>
          {[
            { t: "Spune-ne ce cauți", d: "Alege orașul, mâncarea, bugetul și atmosfera în mai puțin de un minut.", img: px(24433378, 400) },
            { t: "Noi căutăm", d: "RestoMatch compară restaurantele și calculează un scor de potrivire pentru fiecare.", img: px(17057034, 400) },
            { t: "Alege și rezervă", d: "Alege restaurantul preferat și rezervă online sau sună direct.", img: px(9543813, 400) },
          ].map((s, i) => (
            <Card key={s.t} hover style={{ overflow: "hidden" }}>
              <img src={s.img} alt={s.t} style={{ width: "100%", height: 150, objectFit: "cover" }} />
              <div style={{ padding: 24 }}>
                <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 28, color: C.accent }}>0{i + 1}</span>
                <p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 18, color: C.ink, marginTop: 8, marginBottom: 6 }}>{s.t}</p>
                <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 14, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto" style={{ maxWidth: 1200, padding: "88px 24px 16px" }}>
        <Eyebrow>De ce RestoMatch</Eyebrow>
        <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 32, color: C.ink, marginBottom: 28, maxWidth: 520 }}>Găsești un restaurant potrivit, nu doar unul căutat.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5" style={{ gap: 14 }}>
          {["Mai puțin timp căutând.", "Recomandări personalizate.", "Restaurante pentru orice buget.", "Rezervare rapidă.", "Descoperă locuri noi."].map((t) => (
            <Card key={t} style={{ padding: 22 }}>
              <Check size={18} color={C.accent} style={{ marginBottom: 10 }} />
              <p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 14, color: C.ink, lineHeight: 1.5 }}>{t}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* SURPRISE ME */}
      <section className="mx-auto" style={{ maxWidth: 1200, padding: "88px 24px 16px" }}>
        <div style={{ position: "relative", borderRadius: 22, overflow: "hidden" }}>
          <img src={px(14471525, 1200)} alt="Rooftop" style={{ width: "100%", height: 260, objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,24,21,0.85), rgba(26,24,21,0.4))", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", padding: "32px", gap: 20 }}>
            <div style={{ maxWidth: 460 }}>
              <p style={{ fontFamily: BODY, color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Nu știi ce vrei să mănânci?</p>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 26, color: "#fff" }}>Lasă-ne pe noi să alegem pentru tine.</h3>
            </div>
            <BtnPrimary onClick={() => setView("surprise")} style={{ background: "#fff", color: C.ink }}>Surprinde-mă <Sparkles size={16} /></BtnPrimary>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Results ─────────────────────────────────────────────────── */
function ResultsPage({ answers, setView, openRestaurant, saved, toggleSaved }: { answers: any; setView: (v: string) => void; openRestaurant: (id: number) => void; saved: Set<number>; toggleSaved: (id: number) => void }) {
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("match");

  const list = useMemo(() => {
    let base = RESTAURANTS.filter((r) => !answers.city || r.city === answers.city);
    if (priceFilter) base = base.filter((r) => r.price === priceFilter);
    if (answers.cuisine && answers.cuisine !== "orice") base = base.filter((r) => r.cuisine === answers.cuisine);
    let withScore = base.map((r) => ({ ...r, score: computeMatch(r, answers) }));
    if (sortBy === "match") withScore.sort((a, b) => b.score - a.score);
    if (sortBy === "rating") withScore.sort((a, b) => b.rating - a.rating);
    if (sortBy === "price") withScore.sort((a, b) => priceRank[a.price] - priceRank[b.price]);
    return withScore;
  }, [answers, priceFilter, sortBy]);

  return (
    <div className="mx-auto" style={{ maxWidth: 1200, padding: "40px 24px 64px" }}>
      <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 13, marginBottom: 6 }}>{answers.city ? `în ${answers.city}` : "în toate orașele"}</p>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 34, color: C.ink, marginBottom: 24 }}>
        {list.length} restaurante pentru tine
      </h1>
      <div className="flex flex-wrap items-center" style={{ gap: 8, marginBottom: 32 }}>
        <Pill active={!priceFilter} onClick={() => setPriceFilter(null)}>Toate prețurile</Pill>
        {BUDGETS.map((b) => (<Pill key={b} active={priceFilter === b} onClick={() => setPriceFilter(b)}>{b}</Pill>))}
        <span style={{ width: 1, height: 20, background: C.line, margin: "0 6px" }} />
        <div className="flex items-center" style={{ gap: 6 }}>
          <SlidersHorizontal size={14} color={C.inkSoft} />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ border: `1px solid ${C.line}`, borderRadius: 999, padding: "8px 14px", fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.ink, background: "#fff", cursor: "pointer" }}>
            <option value="match">Sortează: Match</option>
            <option value="rating">Sortează: Rating</option>
            <option value="price">Sortează: Preț</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 20 }}>
        {list.map((r) => (<RestaurantCard key={r.id} r={r} onOpen={() => openRestaurant(r.id)} saved={saved.has(r.id)} onToggleSave={() => toggleSaved(r.id)} />))}
      </div>
      {list.length === 0 && (<div style={{ textAlign: "center", padding: "80px 0", color: C.inkSoft, fontFamily: BODY }}>Nu am găsit restaurante pentru acest filtru. Încearcă alt oraș sau buget.</div>)}
    </div>
  );
}

function RestaurantCard({ r, onOpen, saved, onToggleSave }: { r: Restaurant & { score?: number }; onOpen: () => void; saved: boolean; onToggleSave: () => void }) {
  return (
    <Card hover onClick={onOpen} style={{ overflow: "hidden" }}>
      <div style={{ position: "relative" }}>
        <img src={r.image} alt={r.name} style={{ width: "100%", height: 190, objectFit: "cover" }} />
        <span style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.95)", color: C.ink, fontFamily: BODY, fontWeight: 600, fontSize: 12, padding: "5px 10px", borderRadius: 999, backdropFilter: "blur(4px)" }}>{r.score ?? 90}% match</span>
        <button onClick={(e) => { e.stopPropagation(); onToggleSave(); }} style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 999, background: "rgba(255,255,255,0.95)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Heart size={15} color={saved ? C.accent : C.inkSoft} fill={saved ? C.accent : "none"} />
        </button>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div className="flex items-center justify-between"><p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 17, color: C.ink }}>{r.name}</p><Stars rating={r.rating} /></div>
        <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 13, marginTop: 5 }}>{r.cuisineLabel} • {MOODS.find((m) => m.id === r.mood)?.label}</p>
        <div className="flex items-center justify-between" style={{ marginTop: 12 }}>
          <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: C.ink }}>{r.price}</span>
          <span style={{ fontFamily: BODY, fontSize: 12.5, color: C.inkSoft, display: "flex", alignItems: "center", gap: 3 }}><MapPin size={12} /> {r.distance}</span>
        </div>
        <p style={{ fontFamily: BODY, fontSize: 12, color: C.inkSoft, marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> Deschis până la {r.openUntil}</p>
      </div>
    </Card>
  );
}

/* ── Restaurant Detail ───────────────────────────────────────── */
function RestaurantDetail({ restaurant, setView, saved, toggleSaved }: { restaurant: Restaurant | undefined; setView: (v: string) => void; saved: Set<number>; toggleSaved: (id: number) => void }) {
  if (!restaurant) return null;
  const r = restaurant;
  const gallery = getGallery(r);
  return (
    <div className="mx-auto" style={{ maxWidth: 1000, padding: "32px 24px 72px" }}>
      <button onClick={() => setView("results")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: BODY, fontWeight: 500, color: C.inkSoft, fontSize: 14, marginBottom: 20 }}><ChevronLeft size={16} /> Înapoi la rezultate</button>
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
        <img src={r.image} alt={r.name} style={{ width: "100%", height: 380, objectFit: "cover" }} />
        <button onClick={() => toggleSaved(r.id)} style={{ position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: 999, background: "rgba(255,255,255,0.95)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Heart size={18} color={saved.has(r.id) ? C.accent : C.inkSoft} fill={saved.has(r.id) ? C.accent : "none"} /></button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 8, marginTop: 10 }}>
        {gallery.map((src, i) => (<img key={i} src={src} alt={`${r.name} ${i + 1}`} style={{ width: "100%", height: 85, objectFit: "cover", borderRadius: 12 }} />))}
      </div>
      <div className="grid md:grid-cols-3" style={{ gap: 40, marginTop: 32 }}>
        <div className="md:col-span-2">
          <div className="flex items-center justify-between" style={{ flexWrap: "wrap", gap: 10 }}><h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 32, color: C.ink }}>{r.name}</h1><Stars rating={r.rating} /></div>
          <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 14, marginTop: 6 }}>{r.cuisineLabel} • {r.price}</p>
          {r.tags && (<div className="flex flex-wrap" style={{ gap: 6, marginTop: 12 }}>{r.tags.map((t) => (<span key={t} style={{ background: C.lineSoft, color: C.inkSoft, fontFamily: BODY, fontWeight: 500, fontSize: 12, padding: "5px 11px", borderRadius: 999 }}>{t}</span>))}</div>)}
          <p style={{ fontFamily: BODY, color: C.ink, fontSize: 15, lineHeight: 1.7, marginTop: 22 }}>{r.description}</p>
          <div style={{ marginTop: 32 }}><Eyebrow>Mâncăruri recomandate</Eyebrow><div className="grid sm:grid-cols-3" style={{ gap: 10 }}>{r.dishes.map((d) => (<Card key={d} style={{ padding: "14px 16px" }}><p style={{ fontFamily: BODY, fontWeight: 500, fontSize: 14, color: C.ink }}>{d}</p></Card>))}</div></div>
          <div style={{ marginTop: 32 }}><Eyebrow>Galerie foto</Eyebrow><div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: 8 }}>{gallery.map((src, i) => (<img key={i} src={src} alt={`${r.name} ${i + 1}`} style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 12 }} />))}</div></div>
          <div style={{ marginTop: 32 }}>
            <Eyebrow>Locație</Eyebrow>
            <button onClick={() => window.open(googleMapsUrl(r), "_blank")} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.line}`, height: 200, position: "relative", background: "#EFE9DE", width: "100%", padding: 0, cursor: "pointer", display: "block" }}>
              <img src={px(2514002, 900)} alt="Hartă" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ background: C.accent, width: 32, height: 32, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", boxShadow: "0 6px 14px rgba(0,0,0,0.25)" }} /></div>
              <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(255,255,255,0.95)", borderRadius: 999, padding: "7px 13px", display: "flex", alignItems: "center", gap: 5, fontFamily: BODY, fontWeight: 500, fontSize: 12, color: C.ink }}><ExternalLink size={12} /> Google Maps</div>
            </button>
          </div>
          <div style={{ marginTop: 36 }}>
            <Eyebrow>Recenzii</Eyebrow>
            <div className="flex items-center" style={{ gap: 10, marginBottom: 16 }}><Stars rating={r.rating} /><span style={{ fontFamily: BODY, fontSize: 13, color: C.inkSoft }}>{getReviewCount(r)} recenzii</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {getReviews(r).map((rev, i) => (
                <Card key={i} style={{ padding: "16px 18px" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                    <div className="flex items-center" style={{ gap: 10 }}>
                      <span style={{ width: 30, height: 30, borderRadius: 999, background: C.lineSoft, color: C.ink, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: BODY, fontWeight: 600, fontSize: 12, flexShrink: 0 }}>{rev.author.charAt(0)}</span>
                      <div><p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, color: C.ink }}>{rev.author}</p><p style={{ fontFamily: BODY, fontSize: 11, color: C.inkSoft }}>acum {rev.daysAgo} zile</p></div>
                    </div>
                    <Stars rating={rev.rating} />
                  </div>
                  <p style={{ fontFamily: BODY, fontSize: 14, color: C.ink, lineHeight: 1.6 }}>{rev.text}</p>
                </Card>
              ))}
            </div>
            <p style={{ fontFamily: BODY, fontSize: 12, color: C.inkSoft, marginTop: 10 }}>Recenzii demonstrative, generate pentru acest prototip.</p>
          </div>
        </div>
        <aside>
          <Card style={{ padding: 24, position: "sticky", top: 88 }}>
            <p style={{ fontFamily: BODY, fontSize: 13.5, color: C.inkSoft, display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 14 }}><MapPin size={15} style={{ marginTop: 2, flexShrink: 0 }} /> {r.address}</p>
            <p style={{ fontFamily: BODY, fontSize: 13.5, color: C.inkSoft, display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 22 }}><Clock size={15} style={{ marginTop: 2, flexShrink: 0 }} /> {r.hours}</p>
            {r.booking.type === "online" && <BtnPrimary full onClick={() => setView("reserve")}>Rezervă online</BtnPrimary>}
            {r.booking.type === "phone" && (<div><BtnPrimary full style={{ background: C.ink }} onClick={() => window.open(`tel:${r.booking.phone?.replace(/\s+/g, "")}`)}><Phone size={15} /> Sună pentru rezervare</BtnPrimary><p style={{ fontFamily: BODY, textAlign: "center", marginTop: 10, fontWeight: 600, color: C.ink, fontSize: 14 }}>{r.booking.phone}</p></div>)}
            {r.booking.type === "website" && <BtnOutline full onClick={() => window.open(r.booking.url, "_blank")}><Globe size={15} /> Vezi website-ul</BtnOutline>}
            <button onClick={() => window.open(googleMapsUrl(r), "_blank")} style={{ width: "100%", marginTop: 12, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.inkSoft, padding: "8px 0" }}><MapPin size={13} /> Vezi traseul în Google Maps</button>
          </Card>
        </aside>
      </div>
    </div>
  );
}

/* ── Surprise Me ─────────────────────────────────────────────── */
function SurpriseMe({ answers, openRestaurant }: { answers: any; openRestaurant: (id: number) => void }) {
  const [pick, setPick] = useState<(Restaurant & { score?: number }) | null>(null);
  const roll = () => { const pool = RESTAURANTS.filter((r) => !answers.city || r.city === answers.city); const chosen = pool[Math.floor(Math.random() * pool.length)] || RESTAURANTS[0]; setPick({ ...chosen, score: 90 + Math.floor(Math.random() * 9) }); };
  return (
    <div className="mx-auto" style={{ maxWidth: 640, padding: "64px 24px 96px", textAlign: "center" }}>
      <Sparkles size={28} color={C.accent} style={{ margin: "0 auto 16px" }} />
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 32, color: C.ink }}>Nu știu ce vreau să mănânc.</h1>
      <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 15, marginTop: 12, marginBottom: 32 }}>Alegem noi, pe baza preferințelor tale.</p>
      <BtnPrimary onClick={roll} style={{ margin: "0 auto" }}>Surprinde-mă <Sparkles size={15} /></BtnPrimary>
      {pick && (
        <Card hover onClick={() => openRestaurant(pick.id)} style={{ marginTop: 40, overflow: "hidden", textAlign: "left" }}>
          <img src={pick.image} alt={pick.name} style={{ width: "100%", height: 220, objectFit: "cover" }} />
          <div style={{ padding: 24 }}>
            <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 14 }}>Cred că acesta o să-ți placă.</p>
            <div className="flex items-center justify-between" style={{ marginTop: 6 }}>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, color: C.ink }}>{pick.name}</h3>
              <span style={{ background: C.ink, color: "#fff", fontFamily: BODY, fontWeight: 600, fontSize: 13, padding: "6px 12px", borderRadius: 999 }}>{pick.score}%</span>
            </div>
            <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 14, marginTop: 4 }}>{pick.score}% match • {pick.cuisineLabel}</p>
            <p style={{ fontFamily: BODY, color: C.accent, fontSize: 14, fontWeight: 600, marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>Vezi detaliile <ArrowRight size={14} /></p>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ── How It Works ────────────────────────────────────────────── */
function HowItWorks({ setView }: { setView: (v: string) => void }) {
  const steps = [
    { t: "Spune-ne ce cauți", d: "Alege orașul, tipul de mâncare, bugetul și atmosfera dorită în mai puțin de un minut.", img: px(24433378, 700) },
    { t: "Noi căutăm", d: "RestoMatch compară restaurantele disponibile și calculează un scor de potrivire pentru fiecare.", img: px(28575445, 700) },
    { t: "Alege și rezervă", d: "Alege restaurantul preferat din listă și rezervă online sau sună direct.", img: px(9543813, 700) },
  ];
  return (
    <div className="mx-auto" style={{ maxWidth: 1000, padding: "56px 24px 96px" }}>
      <Eyebrow>Cum funcționează</Eyebrow>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 38, color: C.ink, maxWidth: 600 }}>Trei pași, de la idee la masă rezervată.</h1>
      <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 48 }}>
        {steps.map((s, i) => (
          <div key={s.t} className="grid md:grid-cols-2 items-center" style={{ gap: 32 }}>
            <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
              <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 32, color: C.accent }}>0{i + 1}</span>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 24, color: C.ink, marginTop: 6, marginBottom: 8 }}>{s.t}</h3>
              <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 15, lineHeight: 1.7 }}>{s.d}</p>
            </div>
            <img src={s.img} alt={s.t} style={{ order: i % 2 === 1 ? 1 : 2, width: "100%", height: 240, objectFit: "cover", borderRadius: 18 }} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 64, textAlign: "center" }}><BtnPrimary onClick={() => setView("search")} style={{ margin: "0 auto" }}>Găsește-mi restaurantul <ArrowRight size={15} /></BtnPrimary></div>
    </div>
  );
}

/* ── For Restaurants ─────────────────────────────────────────── */
function ForRestaurants() {
  const tiers = [
    { name: "FREE", price: "0 €/lună", features: ["Profil de bază", "Informații despre restaurant", "Website și telefon"], cta: "Începe gratuit" },
    { name: "PRO", price: "49 €/lună", features: ["Profil îmbunătățit", "Fotografii nelimitate", "Promovare în rezultate", "Statistici de bază"], cta: "Alege PRO", highlight: true },
    { name: "PREMIUM", price: "129 €/lună", features: ["Promovare avansată", "Recomandări prioritare", "Statistici detaliate", "Instrumente pentru rezervări"], cta: "Alege PREMIUM" },
  ];
  return (
    <div>
      <section className="mx-auto" style={{ maxWidth: 1000, padding: "64px 24px 24px", textAlign: "center" }}>
        <Eyebrow>Pentru restaurante</Eyebrow>
        <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(30px, 4.5vw, 42px)", color: C.ink, maxWidth: 680, margin: "0 auto" }}>Adu mai mulți clienți la restaurantul tău.</h1>
        <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 16, lineHeight: 1.7, maxWidth: 560, margin: "18px auto 0" }}>Restaurantul tău poate avea un profil premium și poate fi promovat direct utilizatorilor care caută exact tipul tău de bucătărie.</p>
      </section>
      <section className="mx-auto" style={{ maxWidth: 1100, padding: "40px 24px 96px" }}>
        <div className="grid md:grid-cols-3" style={{ gap: 20 }}>
          {tiers.map((t) => (
            <div key={t.name} style={{ background: t.highlight ? C.ink : C.surface, border: `1px solid ${t.highlight ? C.ink : C.line}`, borderRadius: 18, padding: 30, display: "flex", flexDirection: "column", transform: t.highlight ? "translateY(-6px)" : "none", boxShadow: t.highlight ? C.shadowLg : "none" }}>
              <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: 13, letterSpacing: 1, color: t.highlight ? "#fff" : C.accent }}>{t.name}</p>
              <p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 32, color: t.highlight ? "#fff" : C.ink, marginTop: 10 }}>{t.price}</p>
              <div style={{ flex: 1, marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                {t.features.map((f) => (<div key={f} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}><Check size={16} color={t.highlight ? "#fff" : C.accent} style={{ marginTop: 2, flexShrink: 0 }} /><span style={{ fontFamily: BODY, fontSize: 14, color: t.highlight ? "rgba(255,255,255,0.85)" : C.ink }}>{f}</span></div>))}
              </div>
              {t.highlight ? <BtnPrimary full style={{ marginTop: 26, background: "#fff", color: C.ink }}>{t.cta}</BtnPrimary> : <BtnOutline full style={{ marginTop: 26 }}>{t.cta}</BtnOutline>}
            </div>
          ))}
        </div>
        <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 13, textAlign: "center", marginTop: 32 }}>Prețuri demonstrative pentru versiunea de prezentare.</p>
      </section>
    </div>
  );
}

/* ── Login ───────────────────────────────────────────────────── */
function Login({ onLogin }: { setView: (v: string) => void; onLogin: () => void }) {
  return (
    <div className="mx-auto" style={{ maxWidth: 400, padding: "80px 24px 112px" }}>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 28, color: C.ink, textAlign: "center" }}>Bun venit înapoi</h1>
      <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 14, textAlign: "center", marginTop: 8, marginBottom: 32 }}>Intră în cont pentru recomandări personalizate.</p>
      <Card style={{ padding: 28 }}>
        <label style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.ink }}>Email</label>
        <input type="email" placeholder="nume@exemplu.ro" style={{ width: "100%", marginTop: 6, marginBottom: 16, padding: "12px 14px", borderRadius: 10, border: `1px solid ${C.line}`, fontFamily: BODY, fontSize: 14, boxSizing: "border-box", outline: "none" }} />
        <label style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.ink }}>Parolă</label>
        <input type="password" placeholder="••••••••" style={{ width: "100%", marginTop: 6, marginBottom: 22, padding: "12px 14px", borderRadius: 10, border: `1px solid ${C.line}`, fontFamily: BODY, fontSize: 14, boxSizing: "border-box", outline: "none" }} />
        <BtnPrimary full onClick={onLogin}>Intră în cont</BtnPrimary>
        <div className="flex items-center" style={{ gap: 10, margin: "18px 0" }}><span style={{ flex: 1, height: 1, background: C.line }} /><span style={{ fontFamily: BODY, fontSize: 12, color: C.inkSoft }}>sau</span><span style={{ flex: 1, height: 1, background: C.line }} /></div>
        <BtnOutline full onClick={onLogin}>Continuă cu Google</BtnOutline>
        <p style={{ fontFamily: BODY, fontSize: 13, color: C.inkSoft, textAlign: "center", marginTop: 20 }}>Nu ai cont? <button onClick={onLogin} style={{ background: "none", border: "none", color: C.accent, fontWeight: 600, cursor: "pointer", fontFamily: BODY, fontSize: 13 }}>Creează cont</button></p>
      </Card>
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────────── */
function Dashboard({ setView, saved, toggleSaved, openRestaurant, onLogout }: { setView: (v: string) => void; saved: Set<number>; toggleSaved: (id: number) => void; openRestaurant: (id: number) => void; onLogout: () => void }) {
  const recommended = RESTAURANTS.slice(0, 4);
  const savedList = RESTAURANTS.filter((r) => saved.has(r.id));
  return (
    <div className="mx-auto" style={{ maxWidth: 1200, padding: "44px 24px 96px" }}>
      <div className="flex items-center justify-between" style={{ flexWrap: "wrap", gap: 14, marginBottom: 36 }}>
        <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 28, color: C.ink }}>Bun venit înapoi</h1>
        <button onClick={onLogout} style={{ background: "none", border: `1px solid ${C.line}`, borderRadius: 10, padding: "8px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.inkSoft }}><LogOut size={14} /> Ieși din cont</button>
      </div>
      <Eyebrow>Restaurante recomandate pentru tine</Eyebrow>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 16, marginBottom: 52 }}>
        {recommended.map((r) => (<RestaurantCard key={r.id} r={{ ...r, score: 88 + (r.id % 10) }} onOpen={() => openRestaurant(r.id)} saved={saved.has(r.id)} onToggleSave={() => toggleSaved(r.id)} />))}
      </div>
      <div className="grid md:grid-cols-2" style={{ gap: 28 }}>
        <div>
          <Eyebrow>Preferințele tale</Eyebrow>
          <Card style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            {[["Tipuri de mâncare", "Italian, Sushi"],["Buget","€€"],["Rating minim","4.5 ★"],["Atmosferă","Romantic"],["Orașe","Craiova, București"]].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between"><span style={{ fontFamily: BODY, fontSize: 14, color: C.inkSoft }}>{k}</span><span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 14, color: C.ink }}>{v}</span></div>
            ))}
          </Card>
        </div>
        <div>
          <Eyebrow>Restaurante salvate</Eyebrow>
          {savedList.length === 0 ? (
            <Card style={{ borderStyle: "dashed", padding: 28, textAlign: "center" }}>
              <Heart size={26} color={C.line} style={{ margin: "0 auto 10px" }} />
              <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 14 }}>Nu ai salvat încă niciun restaurant. Apasă pe inima de pe un card pentru a-l adăuga aici.</p>
            </Card>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {savedList.map((r) => (
                <Card key={r.id} hover onClick={() => openRestaurant(r.id)} style={{ display: "flex", gap: 12, alignItems: "center", padding: 10 }}>
                  <img src={r.image} alt={r.name} style={{ width: 54, height: 54, borderRadius: 10, objectFit: "cover" }} />
                  <div style={{ flex: 1 }}><p style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 14, color: C.ink }}>{r.name}</p><p style={{ fontFamily: BODY, fontSize: 12, color: C.inkSoft }}>{r.cuisineLabel}</p></div>
                  <Heart size={15} color={C.accent} fill={C.accent} />
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Reservation ─────────────────────────────────────────────── */
function ReservationForm({ restaurant, setView, onConfirm }: { restaurant: Restaurant | undefined; setView: (v: string) => void; onConfirm: (d: any) => void }) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ date: today, time: "19:00", people: 2, name: "", phone: "", email: "", notes: "" });
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  const canSubmit = form.date && form.time && form.name.trim() && form.phone.trim();
  if (!restaurant) return null;
  const SLOTS = ["12:00","13:00","18:00","19:00","19:30","20:00","20:30","21:00","21:30"];
  const inputStyle: React.CSSProperties = { width: "100%", marginTop: 6, padding: "12px 14px", borderRadius: 10, border: `1px solid ${C.line}`, fontFamily: BODY, fontSize: 14, boxSizing: "border-box", outline: "none" };

  return (
    <div className="mx-auto" style={{ maxWidth: 640, padding: "40px 24px 96px" }}>
      <button onClick={() => setView("restaurant")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: BODY, fontWeight: 500, color: C.inkSoft, fontSize: 14, marginBottom: 20 }}><ChevronLeft size={16} /> Înapoi la restaurant</button>
      <div className="flex items-center" style={{ gap: 14, marginBottom: 28 }}>
        <img src={restaurant.image} alt={restaurant.name} style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover" }} />
        <div><h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, color: C.ink }}>Rezervă la {restaurant.name}</h1><p style={{ fontFamily: BODY, fontSize: 13, color: C.inkSoft }}>{restaurant.address}</p></div>
      </div>
      <Card style={{ padding: "28px 26px" }}>
        <div className="grid sm:grid-cols-2" style={{ gap: 16, marginBottom: 16 }}>
          <div><label style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.ink }}>Dată</label><input type="date" min={today} value={form.date} onChange={(e) => set("date", e.target.value)} style={inputStyle} /></div>
          <div><label style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.ink }}>Oră</label><select value={form.time} onChange={(e) => set("time", e.target.value)} style={{ ...inputStyle, background: "#fff" }}>{SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.ink }}>Număr de persoane</label>
          <div className="flex items-center" style={{ gap: 14, marginTop: 8 }}>
            <button onClick={() => set("people", Math.max(1, form.people - 1))} style={{ width: 36, height: 36, borderRadius: 999, border: `1px solid ${C.line}`, background: "#fff", cursor: "pointer", fontFamily: BODY, fontWeight: 600, fontSize: 16 }}>−</button>
            <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 18, color: C.ink, minWidth: 24, textAlign: "center" }}>{form.people}</span>
            <button onClick={() => set("people", Math.min(12, form.people + 1))} style={{ width: 36, height: 36, borderRadius: 999, border: `1px solid ${C.line}`, background: "#fff", cursor: "pointer", fontFamily: BODY, fontWeight: 600, fontSize: 16 }}>+</button>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}><label style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.ink }}>Nume complet</label><input type="text" placeholder="Numele tău" value={form.name} onChange={(e) => set("name", e.target.value)} style={inputStyle} /></div>
        <div className="grid sm:grid-cols-2" style={{ gap: 16, marginBottom: 16 }}>
          <div><label style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.ink }}>Telefon</label><input type="tel" placeholder="07xx xxx xxx" value={form.phone} onChange={(e) => set("phone", e.target.value)} style={inputStyle} /></div>
          <div><label style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.ink }}>Email (opțional)</label><input type="email" placeholder="nume@exemplu.ro" value={form.email} onChange={(e) => set("email", e.target.value)} style={inputStyle} /></div>
        </div>
        <div style={{ marginBottom: 24 }}><label style={{ fontFamily: BODY, fontWeight: 500, fontSize: 13, color: C.ink }}>Cerințe speciale (opțional)</label><textarea rows={3} placeholder="Ex: masă lângă fereastră, scaun de copil, aniversare..." value={form.notes} onChange={(e) => set("notes", e.target.value)} style={{ ...inputStyle, resize: "vertical" }} /></div>
        <BtnPrimary full style={{ opacity: canSubmit ? 1 : 0.45 }} onClick={() => canSubmit && onConfirm(form)}>Trimite cererea de rezervare</BtnPrimary>
        <p style={{ fontFamily: BODY, fontSize: 12, color: C.inkSoft, textAlign: "center", marginTop: 12 }}>Rezervare demonstrativă — nu se trimite unei rezervări reale.</p>
      </Card>
    </div>
  );
}

function ReservationConfirmation({ restaurant, details, setView }: { restaurant: Restaurant | undefined; details: any; setView: (v: string) => void }) {
  if (!restaurant || !details) return null;
  const code = `RM-${String(restaurant.id).padStart(3, "0")}${details.people}${details.time.replace(":", "")}`;
  return (
    <div className="mx-auto" style={{ maxWidth: 540, padding: "80px 24px 112px", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: 999, background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><Check size={26} color={C.accent} /></div>
      <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 26, color: C.ink }}>Cererea ta de rezervare a fost trimisă.</h1>
      <p style={{ fontFamily: BODY, color: C.inkSoft, fontSize: 15, marginTop: 10 }}>{restaurant.name} va confirma rezervarea în scurt timp.</p>
      <Card style={{ padding: 26, marginTop: 30, textAlign: "left" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}><span style={{ fontFamily: BODY, fontSize: 13, color: C.inkSoft }}>Cod rezervare</span><span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 16, color: C.accent, letterSpacing: 1 }}>{code}</span></div>
        {[["Restaurant", restaurant.name],["Dată", new Date(details.date).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })],["Oră", details.time],["Persoane", String(details.people)],["Nume", details.name],["Telefon", details.phone]].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between" style={{ padding: "8px 0", borderTop: `1px solid ${C.line}` }}><span style={{ fontFamily: BODY, fontSize: 14, color: C.inkSoft }}>{k}</span><span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 14, color: C.ink }}>{v}</span></div>
        ))}
      </Card>
      <div className="flex flex-col sm:flex-row" style={{ gap: 12, marginTop: 30, justifyContent: "center" }}>
        <BtnOutline onClick={() => setView("restaurant")}>Înapoi la restaurant</BtnOutline>
        <BtnPrimary onClick={() => setView("results")}>Explorează alte restaurante</BtnPrimary>
      </div>
    </div>
  );
}

/* ── App Root ────────────────────────────────────────────────── */
export default function App() {
  const [view, setViewRaw] = useState("home");
  const [answers, setAnswers] = useState<any>({ minRating: 4 });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [loggedIn, setLoggedIn] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<any>(null);

  const setView = (v: string) => { setViewRaw(v); window.scrollTo?.(0, 0); };
  const openRestaurant = (id: number) => { setSelectedId(id); setView("restaurant"); };
  const toggleSaved = (id: number) => setSaved((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const goSearch = () => setView("results");
  const confirmReservation = (details: any) => { setReservationDetails(details); setView("reserve-confirm"); };
  const selectedRestaurant = RESTAURANTS.find((r) => r.id === selectedId);

  return (
    <div style={{ background: C.bg, minHeight: "100%", fontFamily: BODY }}>
      <link rel="stylesheet" href={FONT} />
      <Header view={view} setView={setView} loggedIn={loggedIn} />
      {view === "home" && <Home setView={setView} answers={answers} setAnswers={setAnswers} goSearch={goSearch} />}
      {view === "search" && (<div className="mx-auto" style={{ maxWidth: 680, padding: "56px 24px 96px" }}><div style={{ textAlign: "center", marginBottom: 24 }}><h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 30, color: C.ink }}>Unde vrei să mănânci?</h1></div><SearchWizard answers={answers} setAnswers={setAnswers} onSubmit={goSearch} /></div>)}
      {view === "results" && <ResultsPage answers={answers} setView={setView} openRestaurant={openRestaurant} saved={saved} toggleSaved={toggleSaved} />}
      {view === "restaurant" && <RestaurantDetail restaurant={selectedRestaurant} setView={setView} saved={saved} toggleSaved={toggleSaved} />}
      {view === "reserve" && <ReservationForm restaurant={selectedRestaurant} setView={setView} onConfirm={confirmReservation} />}
      {view === "reserve-confirm" && <ReservationConfirmation restaurant={selectedRestaurant} details={reservationDetails} setView={setView} />}
      {view === "surprise" && <SurpriseMe answers={answers} openRestaurant={openRestaurant} />}
      {view === "how" && <HowItWorks setView={setView} />}
      {view === "for-restaurants" && <ForRestaurants />}
      {view === "login" && <Login setView={setView} onLogin={() => { setLoggedIn(true); setView("dashboard"); }} />}
      {view === "dashboard" && <Dashboard setView={setView} saved={saved} toggleSaved={toggleSaved} openRestaurant={openRestaurant} onLogout={() => { setLoggedIn(false); setView("home"); }} />}
      <Footer setView={setView} />
    </div>
  );
}
