import React, { useState, useEffect, useRef, memo } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Volume2,
  VolumeX,
  Check,
  Sparkles,
  Heart,
  ChevronDown,
  Maximize2,
  X,
  Smartphone,
  Monitor,
  Send,
  BookOpen,
  Image as ImageIcon,
  MessageSquareHeart,
  Menu,
  MailOpen,
  RotateCcw,
  Lock,
  QrCode,
  Download,
  Copy,
  ExternalLink,
} from 'lucide-react';

// ============================================================================
// 1. DAFTAR RESMI TAMU UNDANGAN (WHITELIST 39 TAMU)
// ============================================================================
const INVITED_GUESTS = [
  'Ais & partner',
  'Sarah & partner',
  'Pute & partner',
  'Tiwi & partner',
  'Fina & partner',
  'Alifia & partner',
  'Sella & partner',
  'Nayla & partner',
  'Nisa & partner',
  'Agni & Thorieq',
  'Anggun & Partner',
  'Awdilla & Partner',
  'Tika & Partner',
  'Titin & Partner',
  'Muthia & Partner',
  'Dela & Partner',
  'Andi & Partner',
  'Bibil & Partner',
  'Wira & Partner',
  'Ara & Partner',
  'Adonk & partner',
  'Lyna & partner',
  'Widya & partner',
  'Alya & partner',
  'Diva & partner',
  'Caca & partner',
  'Said & partner',
  'Jali & Partner',
  'Rafi & Neltha',
  'Hendri & Amel',
  'Alya & Aji',
  'Aish & partner',
  'Radit & partner',
  'Bhita & partner',
  'Naypit & Partner',
  'Zelda & Partner',
  'Brutal Trailrun',
  'Uno Jaesan',
  '7icon',
];

const createGuestSlug = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, ' ')
    .replace(/\bdan\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const findAuthorizedGuest = (rawCandidate) => {
  if (!rawCandidate) return null;
  const decoded = decodeURIComponent(rawCandidate).trim();
  if (!decoded) return null;

  const targetSlug = createGuestSlug(decoded);
  const targetNormalized = decoded.toLowerCase().replace(/\s+/g, ' ');

  return (
    INVITED_GUESTS.find((guest) => {
      const guestSlug = createGuestSlug(guest);
      const guestNormalized = guest.toLowerCase().replace(/\s+/g, ' ');
      return guestSlug === targetSlug || guestNormalized === targetNormalized;
    }) || null
  );
};

// ============================================================================
// 2. KONFIGURASI DATA PERNIKAHAN - TIARA & RIFQI (TEMA "CHOCOLATE LILAC")
// ============================================================================
const DEFAULT_WEDDING_CONFIG = {
  couple: {
    brideShort: 'Tiara',
    brideFull: 'Tiara Nazwa Andira Ali',
    brideParents: 'Putri keempat dari Bapak H. Alimuddin & Ibu Hj. Siti Zubaidah',
    bridePhoto: '/galeryfoto/2.JPG',

    groomShort: 'Rifqi',
    groomFull: 'Muhammad Rifqi Ihsan',
    groomParents: 'Putra pertama dari Bapak Rusdi Anwar, S.P. & Ibu Maisyarah',
    groomPhoto: '/galeryfoto/3.jpg',

    monogram: 'T & R',
  },
  weddingDate: {
    dayNumber: '08',
    monthYear: 'November 2026',
    displayDate: 'Minggu, 08 November 2026',
    dotDate: '08 . 11 . 2026',
    isoDate: '2026-11-08T10:00:00+08:00',
    calendarTitle: 'The Wedding of Tiara & Rifqi',
    calendarDetails:
      'Mohon doa restu dan kehadiran Bapak/Ibu/Saudara/i pada acara pernikahan Tiara Nazwa Andira Ali & Muhammad Rifqi Ihsan.',
  },
  welcome: {
    salutation: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
    openingText:
      'Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta’ala, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir serta berbagi kebahagiaan dalam momen sakral penyatuan janji suci pernikahan kami.',
    quote:
      '“Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”',
    quoteSource: 'QS. Ar-Rum : 21',
    gratitude:
      'Kehadiran serta untaian doa tulus dari keluarga dan sahabat tercinta merupakan anugerah terindah bagi awal perjalanan rumah tangga kami.',
  },
  events: {
    akad: {
      badge: 'Sacred Ceremony',
      title: 'Akad Nikah',
      dayDate: 'Minggu, 08 November 2026',
      time: '09:00 WITA',
      venueName: 'Kediaman Mempelai Wanita',
      address: 'Kelurahan Nenang RT 001',
      mapsUrl: '',
    },
    resepsi: {
      badge: 'Wedding Reception',
      title: 'Resepsi Pernikahan',
      dayDate: 'Minggu, 08 November 2026',
      time: '10:00 WITA s/d Selesai',
      venueName: 'Hotel GPN',
      address: 'Jl. Propinsi KM 3,5',
      mapsUrl: 'https://maps.app.goo.gl/uipPmyRfb9uXiGwt7',
    },
  },
  loveStory: [
    {
      stage: 'The First Meeting',
      date: 'Mei 2025',
      description:
        'Pertama kali bertemu pada akhir Mei 2025 melalui perkenalan seorang teman. Saat itu, kami tidak pernah menyangka bahwa pertemuan sederhana tersebut akan membawa kami sampai sejauh ini.',
      photo: '/lovestory/the first meeting.jpg',
    },
    {
      stage: 'The Beginning',
      date: 'Juni 2025',
      description:
        'Dari perkenalan itu, kami mulai saling mengenal dan memahami satu sama lain. Seiring berjalannya waktu, kami merasa nyaman dan mulai melihat kemungkinan untuk membangun masa depan bersama.',
      photo: '/lovestory/the beginning.JPG',
    },
    {
      stage: 'The Special Moment',
      date: '2025',
      description:
        'Kami belajar bahwa sebuah hubungan bukan hanya tentang kebahagiaan, tetapi juga tentang saling memahami dan mendukung. Dari perjalanan yang kami lalui, tumbuh keyakinan untuk terus bersama dan melangkah ke tahap yang lebih serius.',
      photo: '/lovestory/best moment.jpg',
    },
    {
      stage: 'The Proposal',
      date: '2026',
      description:
        'Tanpa harus menunggu cerita yang sempurna, kami sepakat untuk membawa hubungan ini ke jenjang pernikahan. Dengan restu keluarga dan niat yang tulus, kami memilih untuk memulai babak baru bersama.',
      photo: '/lovestory/the proposal.jpg',
    },
    {
      stage: 'Forever Begins',
      date: '08 November 2026',
      description:
        'Pada tanggal 08 November 2026, kami akan mengikat janji suci untuk memulai kehidupan sebagai suami dan istri. Sebuah perjalanan baru akan dimulai, dengan harapan untuk selalu saling menjaga, mencintai, dan menemani dalam setiap keadaan.',
      photo: '/lovestory/forever begins.jpg',
    },
  ],
  gallery: [
    { id: 1, url: '/galeryfoto/1.PNG', caption: 'Galeri 1' },
    { id: 2, url: '/galeryfoto/5.JPEG', caption: 'Galeri 2' },
    { id: 3, url: '/lovestory/the beginning.JPG', caption: 'Galeri 3' },
    { id: 4, url: '/galeryfoto/4.jpg', caption: 'Galeri 4' },
    { id: 5, url: '/galeryfoto/8.png', caption: 'Galeri 5' },
    { id: 6, url: '/galeryfoto/6.jpg', caption: 'Galeri 6' },
    { id: 7, url: '/galeryfoto/7.JPEG', caption: 'Galeri 7' },
  ],
  closingPhoto: '/galeryfoto/7.JPEG',
  gifts: [
    {
      bankName: 'Bank Rakyat Indonesia (BRI)',
      accountNumber: '458201053989534',
      accountHolder: 'a.n. Tiara Nazwa Andira Ali',
    },
    {
      bankName: 'Bank Mandiri',
      accountNumber: '1480022294162',
      accountHolder: 'a.n. Muhammad Rifqi Ihsan',
    },
  ],
  qrisGift: {
    title: 'QRIS Tanda Kasih Pernikahan',
    merchantName: 'Tiara Nazwa Andira Ali & Muhammad Rifqi Ihsan',
    imageUrl: '/qris.png',
    note: 'Silakan pindai (scan) atau unduh kode QRIS di atas melalui aplikasi Mobile Banking atau E-Wallet (GoPay, OVO, DANA, ShopeePay, LinkAja, BRI, Mandiri, BCA, dll).',
  },
  music: {
    title: 'The Script - Never Seen Anything Quite Like You',
    audioUrl: '/The Script - Never Seen Anything Quite Like You (Audio).mp3',
    startTime: 5, // Mulai dari detik ke-5 dengan suara normal (100%)
  },
  support: {
    companyName: 'PT. MUSTDHIYA TEKNOLOGI INDONESIA',
    websiteUrl: 'https://mustdhiya.com',
    websiteLabel: 'mustdhiya.com',
    logoUrl: '/logo.png',
  },
};

const INITIAL_WISHES = [
  {
    id: 'w-1',
    name: 'Fauzan & partner',
    attendance: 'Hadir',
    guests: 2,
    message:
      'Selamat menempuh hidup baru Tiara & Rifqi! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah, dan bahagia selalu sampai tua.',
    createdAt: 'Baru saja',
  },
  {
    id: 'w-2',
    name: 'Nur & partner',
    attendance: 'Hadir',
    guests: 2,
    message:
      'Lancar sampai hari H Tiara dan Rifqi! Semoga cinta kasih dan keberkahan selalu menyertai rumah tangga kalian.',
    createdAt: '1 jam yang lalu',
  },
];

const NAV_ITEMS = [
  { id: 'section-cover', label: 'Cover', icon: BookOpen },
  { id: 'section-couple', label: 'Couple', icon: Heart },
  { id: 'section-story', label: 'Story', icon: Sparkles },
  { id: 'section-gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'section-events', label: 'Event', icon: Calendar },
  { id: 'section-rsvp', label: 'RSVP', icon: MessageSquareHeart },
];

// ============================================================================
// 3. KOMPONEN ORNAMEN FLORAL & IKON ARTISTIK (MEMOIZED)
// ============================================================================
const ChocolateLilacFloralCrest = memo(({ className = 'w-44 h-28' }) => (
  <svg viewBox="0 0 240 130" fill="none" className={className} aria-hidden="true">
    <path
      d="M120 75 C85 70, 50 45, 22 25 M120 75 C155 70, 190 45, 218 25"
      stroke="#A77B4D"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M120 75 C75 88, 45 95, 15 90 M120 75 C165 88, 195 95, 225 90"
      stroke="#B9C4B7"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <ellipse cx="62" cy="48" rx="14" ry="6" transform="rotate(-25 62 48)" fill="#B9C4B7" opacity="0.9" />
    <ellipse cx="178" cy="48" rx="14" ry="6" transform="rotate(25 178 48)" fill="#B9C4B7" opacity="0.9" />
    <ellipse cx="48" cy="76" rx="12" ry="5" transform="rotate(15 48 76)" fill="#D8C9E8" opacity="0.85" />
    <ellipse cx="192" cy="76" rx="12" ry="5" transform="rotate(-15 192 76)" fill="#D8C9E8" opacity="0.85" />
    <circle cx="120" cy="64" r="28" fill="#35241B" />
    <circle cx="116" cy="61" r="22" fill="#4A3428" />
    <path
      d="M104 58 C110 44, 130 44, 136 58 C140 72, 120 82, 108 72 C98 64, 108 50, 120 52 C128 54, 130 64, 120 67 C114 68, 113 61, 118 59"
      stroke="#D8C9E8"
      strokeWidth="1.2"
      fill="none"
      opacity="0.9"
    />
    <circle cx="84" cy="70" r="16" fill="#D8C9E8" />
    <path
      d="M76 68 C80 60, 90 60, 92 68 C94 75, 82 78, 78 72"
      stroke="#4A3428"
      strokeWidth="0.9"
      fill="none"
      opacity="0.65"
    />
    <circle cx="156" cy="70" r="16" fill="#FAF9F7" stroke="#D8C9E8" strokeWidth="1" />
    <path
      d="M148 68 C152 60, 162 60, 164 68 C166 75, 154 78, 150 72"
      stroke="#A77B4D"
      strokeWidth="1"
      fill="none"
      opacity="0.8"
    />
    <circle cx="38" cy="36" r="2.5" fill="#FAF9F7" stroke="#4A3428" strokeWidth="0.8" />
    <circle cx="52" cy="28" r="2" fill="#D8C9E8" />
    <circle cx="202" cy="36" r="2.5" fill="#FAF9F7" stroke="#4A3428" strokeWidth="0.8" />
    <circle cx="188" cy="28" r="2" fill="#D8C9E8" />
    <circle cx="96" cy="36" r="2.2" fill="#A77B4D" />
    <circle cx="144" cy="36" r="2.2" fill="#D8C9E8" />
  </svg>
));

// Ornamen Bunga Samping Vertikal (Untuk Mengapit Sisi Kiri & Kanan Halaman)
const SideFloralBouquet = memo(({ className = 'w-20 sm:w-28 md:w-36 h-auto', flip = false }) => (
  <svg
    viewBox="0 0 140 420"
    fill="none"
    className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}
    aria-hidden="true"
  >
    {/* Batang Utama Sulur Bronze & Silver Sage */}
    <path
      d="M-10 40 C45 95, 55 170, 28 240 C5 300, 40 355, -5 400"
      stroke="#A77B4D"
      strokeWidth="1.4"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M5 90 C65 120, 85 185, 52 255 C30 300, 60 340, 20 385"
      stroke="#B9C4B7"
      strokeWidth="1.1"
      strokeDasharray="3 3"
      strokeLinecap="round"
      opacity="0.75"
    />

    {/* Daun Eucalyptus Silver Sage */}
    <ellipse cx="38" cy="82" rx="18" ry="7" transform="rotate(28 38 82)" fill="#B9C4B7" opacity="0.8" />
    <ellipse cx="58" cy="135" rx="20" ry="8" transform="rotate(-18 58 135)" fill="#B9C4B7" opacity="0.85" />
    <ellipse cx="26" cy="175" rx="16" ry="6.5" transform="rotate(35 26 175)" fill="#D8C9E8" opacity="0.75" />
    <ellipse cx="62" cy="235" rx="19" ry="7.5" transform="rotate(-24 62 235)" fill="#B9C4B7" opacity="0.8" />
    <ellipse cx="32" cy="295" rx="17" ry="7" transform="rotate(22 32 295)" fill="#D8C9E8" opacity="0.75" />
    <ellipse cx="48" cy="348" rx="16" ry="6" transform="rotate(-15 48 348)" fill="#B9C4B7" opacity="0.8" />

    {/* Bunga Mawar Chocolate Brown #1 (Atas) */}
    <g transform="translate(42, 110)">
      <circle cx="0" cy="0" r="20" fill="#35241B" />
      <circle cx="-2" cy="-2" r="15" fill="#4A3428" />
      <path
        d="M-9 -4 C-5 -13, 8 -13, 12 -4 C15 6, 0 13, -7 6 C-13 0, -6 -9, 2 -8 C8 -7, 9 0, 2 2"
        stroke="#D8C9E8"
        strokeWidth="1.1"
        fill="none"
        opacity="0.9"
      />
    </g>

    {/* Bunga Peony Soft White & Lilac (Tengah) */}
    <g transform="translate(56, 192)">
      <circle cx="0" cy="0" r="22" fill="#D8C9E8" />
      <circle cx="-3" cy="-2" r="16" fill="#FAF9F7" stroke="#A77B4D" strokeWidth="0.8" />
      <path
        d="M-8 -3 C-4 -10, 6 -10, 8 -3 C10 4, -2 8, -6 2"
        stroke="#4A3428"
        strokeWidth="0.9"
        fill="none"
        opacity="0.7"
      />
      <circle cx="-1" cy="-1" r="2.5" fill="#A77B4D" />
    </g>

    {/* Bunga Mawar Chocolate Brown #2 (Bawah) */}
    <g transform="translate(35, 268)">
      <circle cx="0" cy="0" r="18" fill="#4A3428" />
      <path
        d="M-8 -3 C-4 -11, 7 -11, 10 -3 C12 5, 0 11, -6 5 C-11 0, -5 -7, 2 -6"
        stroke="#FAF9F7"
        strokeWidth="1"
        fill="none"
        opacity="0.85"
      />
    </g>

    {/* Kuncup Bunga Lilac & Putik Bronze */}
    <circle cx="24" cy="142" r="11" fill="#D8C9E8" />
    <circle cx="24" cy="142" r="6" fill="#FAF9F7" />
    <circle cx="52" cy="318" r="12" fill="#D8C9E8" />
    <circle cx="50" cy="316" r="7" fill="#4A3428" />

    {/* Taburan Baby's Breath / Berry Kecil */}
    <circle cx="72" cy="95" r="3" fill="#FAF9F7" stroke="#A77B4D" strokeWidth="0.8" />
    <circle cx="82" cy="160" r="2.5" fill="#D8C9E8" />
    <circle cx="78" cy="218" r="3" fill="#A77B4D" opacity="0.8" />
    <circle cx="68" cy="282" r="2.5" fill="#FAF9F7" stroke="#4A3428" strokeWidth="0.7" />
    <circle cx="22" cy="365" r="3" fill="#D8C9E8" />
  </svg>
));

// Komponen Pembungkus Bunga Samping Kiri & Kanan di Setiap Section
const SectionSideFlorals = memo(({ opacity = 'opacity-75 sm:opacity-90', topOffset = 'top-12' }) => (
  <>
    <div
      className={`pointer-events-none absolute left-0 ${topOffset} z-0 -translate-x-5 sm:-translate-x-3 ${opacity} animate-float-slow`}
    >
      <SideFloralBouquet />
    </div>
    <div
      className={`pointer-events-none absolute right-0 ${topOffset} z-0 translate-x-5 sm:translate-x-3 ${opacity} animate-float-slow`}
      style={{ animationDelay: '2.2s' }}
    >
      <SideFloralBouquet flip />
    </div>
  </>
));

const WaxSealStamp = memo(({ monogram = 'T & R', size = 'w-20 h-20' }) => (
  <div className={`relative inline-flex items-center justify-center select-none ${size}`}>
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" aria-hidden="true">
      <defs>
        <radialGradient id="chocoBronzeWaxGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#A77B4D" />
          <stop offset="55%" stopColor="#4A3428" />
          <stop offset="100%" stopColor="#2D1F18" />
        </radialGradient>
      </defs>
      <path
        d="M60 6 C74 5, 86 12, 97 21 C108 30, 115 44, 114 59 C113 74, 109 89, 98 99 C87 109, 73 115, 58 114 C43 113, 28 109, 19 97 C10 85, 5 72, 6 57 C7 42, 13 28, 24 18 C35 8, 46 7, 60 6 Z"
        fill="url(#chocoBronzeWaxGrad)"
      />
      <circle cx="60" cy="60" r="39" fill="none" stroke="#D8C9E8" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.75" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="#2D1F18" strokeWidth="2.5" opacity="0.75" />
      <circle cx="60" cy="60" r="33" fill="none" stroke="#FAF9F7" strokeWidth="0.7" opacity="0.55" />
    </svg>
    <span className="absolute font-script text-lg sm:text-xl text-[#FAF9F7] tracking-wider drop-shadow">
      {monogram}
    </span>
  </div>
));

const DoveOrnament = memo(({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <path
      d="M54 18 C44 18, 36 24, 32 31 C28 22, 17 14, 8 16 C14 23, 18 31, 22 36 C15 38, 10 43, 8 48 C18 46, 26 44, 33 41 C41 45, 49 44, 56 38 C50 36, 46 33, 45 29 C50 26, 53 22, 54 18 Z"
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
));

const VintageCarriageIllustration = memo(({ className = 'w-64 h-32' }) => (
  <svg viewBox="0 0 360 150" fill="none" className={className} aria-hidden="true">
    <path d="M20 135 H340" stroke="#4A3428" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.5" />
    <circle cx="85" cy="105" r="28" stroke="#4A3428" strokeWidth="1.4" />
    <circle cx="85" cy="105" r="24" stroke="#A77B4D" strokeWidth="0.8" />
    <circle cx="85" cy="105" r="4" fill="#4A3428" />
    <path d="M85 77 V133 M57 105 H113 M65 85 L105 125 M105 85 L65 125" stroke="#4A3428" strokeWidth="0.8" opacity="0.65" />
    <circle cx="175" cy="111" r="22" stroke="#4A3428" strokeWidth="1.4" />
    <circle cx="175" cy="111" r="18" stroke="#A77B4D" strokeWidth="0.8" />
    <circle cx="175" cy="111" r="3.5" fill="#4A3428" />
    <path d="M175 89 V133 M153 111 H197 M160 96 L190 126 M190 96 L160 126" stroke="#4A3428" strokeWidth="0.8" opacity="0.65" />
    <path d="M65 78 C62 46, 85 28, 125 28 C165 28, 182 46, 175 78 C165 96, 85 96, 65 78 Z" fill="#FAF9F7" stroke="#4A3428" strokeWidth="1.5" />
    <path d="M112 28 L120 18 L125 24 L130 18 L138 28" stroke="#A77B4D" strokeWidth="1.3" fill="none" />
    <path d="M92 42 H152 V68 C152 72, 92 72, 92 68 Z" fill="#FFFFFF" stroke="#4A3428" strokeWidth="1.1" />
    <path d="M92 42 C105 52, 112 58, 92 68 M152 42 C139 52, 132 58, 152 68" stroke="#D8C9E8" strokeWidth="1.2" />
    <path d="M175 95 C205 95, 225 82, 250 75" stroke="#4A3428" strokeWidth="1" />
    <path
      d="M245 92 C245 72, 260 62, 278 62 C288 62, 294 46, 302 36 C307 32, 314 38, 312 45 C308 54, 303 65, 300 76 C300 88, 295 95, 288 95 L294 133 M278 95 L273 133 M255 94 L248 133 M262 94 L264 133"
      stroke="#4A3428"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M42 92 C52 108, 72 112, 125 112 C178 112, 195 100, 208 86" stroke="#A77B4D" strokeWidth="1.5" fill="none" />
  </svg>
));

// ============================================================================
// 4. SUB-KOMPONEN UI MODULAR BERBASIS DAISY-UI (CLEAN & DRY CODE)
// ============================================================================
const RevealOnScroll = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all duration-1000 will-change-transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const CountdownTimer = memo(({ isoDate }) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(isoDate).getTime();
      const diff = Math.max(0, target - Date.now());

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [isoDate]);

  const items = [
    { label: 'Hari', value: countdown.days },
    { label: 'Jam', value: countdown.hours },
    { label: 'Menit', value: countdown.minutes },
    { label: 'Detik', value: countdown.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-[340px] sm:max-w-[420px] mx-auto mt-5 mb-12 sm:mb-16">
      {items.map((item) => (
        <div
          key={item.label}
          className="card bg-[#FAF9F7]/95 backdrop-blur-sm border border-[#D8C9E8] py-3 sm:py-4 px-2 shadow-sm relative overflow-hidden"
        >
          <div className="absolute inset-x-1 top-1 h-[1px] bg-gradient-to-r from-transparent via-[#A77B4D]/50 to-transparent" />
          <span className="block font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-semibold text-[#4A3428] tracking-tight">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="font-sans-refined text-[7px] sm:text-[8px] uppercase tracking-[0.22em] text-[#4A3428]/70 mt-1 block">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
});

const CoupleProfileCard = memo(({ roleLabel, shortName, fullName, parents, photo, isGroom, onSelectPhoto }) => (
  <div className="card bg-[#4A3428] text-[#FAF9F7] rounded-t-[175px] p-4 sm:p-5 shadow-2xl border border-[#35241B] h-full">
    <div className="rounded-t-[160px] border border-[#D8C9E8]/50 pt-8 pb-9 px-4 sm:px-6 flex flex-col items-center justify-center h-full">
      <span className="badge badge-outline border-[#D8C9E8]/60 text-[#D8C9E8] font-sans-refined text-[8px] uppercase tracking-[0.3em] mb-4 px-3 py-2">
        {roleLabel}
      </span>
      <div
        onClick={() => onSelectPhoto({ url: photo, caption: fullName })}
        className="w-36 h-44 sm:w-40 sm:h-48 rounded-t-full overflow-hidden border-2 border-[#D8C9E8] shadow-lg mb-5 bg-[#2B1D16] cursor-pointer group"
      >
        <img
          src={photo}
          alt={fullName}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="font-script text-3xl sm:text-4xl text-[#D8C9E8]">{shortName}</h3>
      <p className="font-serif-luxury text-lg sm:text-xl font-medium tracking-wide text-[#FAF9F7] mt-1">
        {fullName}
      </p>
      <div className="divider before:bg-[#A77B4D]/50 after:bg-[#A77B4D]/50 my-3 w-16 mx-auto" />
      <p className="font-serif-luxury text-xs sm:text-sm text-[#FAF9F7]/90 leading-relaxed">
        {parents}
      </p>
    </div>
  </div>
));

// Komponen Item Love Story - Disesuaikan agar Foto Tidak Terpotong (Revisi 1)
const StoryTimelineItem = memo(({ item, index, isForcedMobile, onSelectPhoto }) => {
  const isEven = index % 2 === 0;
  return (
    <div
      className={`relative flex flex-col ${
        isForcedMobile ? 'items-center' : isEven ? 'sm:flex-row items-center' : 'sm:flex-row-reverse items-center'
      } gap-4 sm:gap-6`}
    >
      {/* Bingkai Foto Fleksibel (Tidak Memotong Wajah Kiri/Kanan) */}
      <div
        onClick={() => onSelectPhoto({ url: item.photo, caption: `${item.stage} (${item.date})` })}
        className="group relative z-10 w-32 sm:w-36 rounded-2xl p-1.5 bg-[#35241B] border border-[#D8C9E8] shadow-xl shrink-0 cursor-pointer"
        title="Ketuk untuk memperbesar foto"
      >
        <div className="overflow-hidden rounded-xl bg-[#241812] flex items-center justify-center">
          <img
            src={item.photo}
            alt={item.stage}
            className="w-full h-auto max-h-36 object-contain transition-transform duration-500 group-hover:scale-105 block"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="badge bg-[#4A3428] border border-[#D8C9E8]/70 px-2.5 py-0.5 text-[8px] font-sans-refined tracking-widest uppercase text-[#D8C9E8] absolute -bottom-2.5 left-1/2 -translate-x-1/2 shadow">
          0{index + 1}
        </span>
      </div>

      {/* Kartu Deskripsi Cerita */}
      <div
        className={`card w-full flex-1 bg-[#2D1F18]/85 backdrop-blur-sm border border-[#D8C9E8]/35 p-4 sm:p-6 text-center ${
          isForcedMobile ? '' : isEven ? 'sm:text-left' : 'sm:text-right'
        }`}
      >
        <span className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#D8C9E8]">
          {item.date}
        </span>
        <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#FAF9F7] mt-0.5">
          {item.stage}
        </h3>
        <p className="font-serif-luxury text-xs sm:text-sm text-[#FAF9F7]/85 leading-relaxed mt-2">
          {item.description}
        </p>
      </div>
    </div>
  );
});

const EventScheduleCard = memo(({ eventData }) => (
  <div className="card h-full bg-[#FAF9F7] border border-[#D8C9E8] p-6 sm:p-8 shadow-lg text-center flex flex-col justify-between relative">
    <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#D8C9E8]/60 pointer-events-none" />
    <div className="relative z-10">
      <span className="badge bg-[#F3EDF9] border-[#D8C9E8] text-[#4A3428] font-sans-refined text-[8px] uppercase tracking-[0.3em] px-3 py-2.5">
        {eventData.badge}
      </span>
      <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#4A3428] mt-4">
        {eventData.title}
      </h3>
      <div className="w-10 h-[1px] bg-[#A77B4D] mx-auto my-4" />
      <div className="space-y-2 text-xs sm:text-sm font-serif-luxury">
        <p className="flex items-center justify-center gap-2 text-[#4A3428] font-semibold">
          <Calendar className="w-3.5 h-3.5 text-[#A77B4D]" />
          <span>{eventData.dayDate}</span>
        </p>
        <p className="flex items-center justify-center gap-2 text-[#4A3428]/80">
          <Clock className="w-3.5 h-3.5 text-[#A77B4D]" />
          <span>{eventData.time}</span>
        </p>
      </div>
      <div className="mt-5 pt-4 border-t border-[#D8C9E8]">
        <p className="font-serif-luxury text-base font-semibold text-[#4A3428]">
          {eventData.venueName}
        </p>
        <p className="font-serif-luxury text-xs sm:text-sm text-[#4A3428]/75 mt-1 leading-relaxed">
          {eventData.address}
        </p>
      </div>
    </div>

    {eventData.mapsUrl && (
      <div className="relative z-10 mt-7">
        <a
          href={eventData.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn min-h-[44px] inline-flex items-center justify-center gap-2 w-full py-2.5 px-5 bg-[#4A3428] text-[#FAF9F7] font-sans-refined text-[10px] uppercase tracking-[0.25em] hover:bg-[#35241B] transition-colors border-none rounded-none"
        >
          <MapPin className="w-3.5 h-3.5 text-[#D8C9E8]" />
          <span>View Location</span>
        </a>
      </div>
    )}
  </div>
));

const BankAccountCard = memo(({ gift, index, copiedAccount, onCopy }) => (
  <div className="card bg-[#FFFFFF] border border-[#D8C9E8] p-4 sm:p-5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left relative rounded-none">
    <div>
      <span className="inline-block font-sans-refined text-[9px] uppercase tracking-[0.22em] text-[#A77B4D] font-semibold">
        {gift.bankName}
      </span>
      <p className="font-serif-luxury text-lg sm:text-xl font-semibold text-[#4A3428] tracking-wider mt-1">
        {gift.accountNumber}
      </p>
      <p className="font-serif-luxury italic text-xs text-[#4A3428]/75">{gift.accountHolder}</p>
    </div>
    <button
      type="button"
      onClick={() => onCopy(gift.accountNumber, index)}
      className="btn min-h-[40px] shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#4A3428] text-[#FAF9F7] font-sans-refined text-[9px] uppercase tracking-widest hover:bg-[#35241B] transition-colors rounded-none border-none"
    >
      {copiedAccount === index ? (
        <>
          <Check className="w-3 h-3 text-[#D8C9E8]" />
          <span>Tersalin</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3 text-[#D8C9E8]" />
          <span>Salin Rekening</span>
        </>
      )}
    </button>
  </div>
));

// ============================================================================
// 5. GENERATOR AUDIO AMBIENT FALLBACK
// ============================================================================
class RomanticAmbientSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.step = 0;
    this.notes = [
      349.23, 440.0, 523.25, 659.25, 329.63, 392.0, 493.88, 587.33, 293.66, 349.23, 440.0, 523.25,
      261.63, 329.63, 392.0, 493.88,
    ];
  }

  start() {
    if (this.isPlaying) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) this.ctx = new AudioCtx();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    this.isPlaying = true;
    this.playNote();
    this.intervalId = setInterval(() => {
      if (this.isPlaying) this.playNote();
    }, 1450);
  }

  playNote() {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const freq = this.notes[this.step % this.notes.length];
    this.step += 1;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    subOsc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    subOsc.frequency.setValueAtTime(freq * 0.5, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.04, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 2.9);
    subOsc.stop(now + 2.9);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// ============================================================================
// 6. KOMPONEN UTAMA APLIKASI
// ============================================================================
export default function App() {
  const [config] = useState(DEFAULT_WEDDING_CONFIG);
  const [envelopeStage, setEnvelopeStage] = useState('closed');
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [isOpeningTransition, setIsOpeningTransition] = useState(false);

  const [guestName, setGuestName] = useState('');
  const [isAuthorizedGuest, setIsAuthorizedGuest] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isGuestListModalOpen, setIsGuestListModalOpen] = useState(false);
  const [copiedGuestLink, setCopiedGuestLink] = useState(null);
  const [copiedAccount, setCopiedAccount] = useState(null);

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isQrisZoomOpen, setIsQrisZoomOpen] = useState(false);
  const [qrisImageError, setQrisImageError] = useState(false);

  const [viewportMode, setViewportMode] = useState('responsive');
  const [activeSection, setActiveSection] = useState('section-cover');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('tiara_rifqi_wishes_v1');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });

  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    guests: '2',
    attendance: 'Hadir',
    message: '',
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const synthRef = useRef(null);
  const htmlAudioRef = useRef(null);
  const mainContentRef = useRef(null);

  // Pasang Favicon & Judul Halaman Otomatis
  useEffect(() => {
    document.title = `The Wedding of ${config.couple.brideShort} & ${config.couple.groomShort} - Supported by ${config.support.companyName}`;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = config.support.logoUrl;
  }, [config]);

  // Validasi URL terhadap Whitelist Tamu
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');
    if (adminParam === 'mdt' || adminParam === '1') {
      setIsAdminMode(true);
    }

    const queryCandidate = params.get('to') || params.get('guest') || params.get('u');
    const pathCandidate = window.location.pathname.replace(/^\/+|\/+$/g, '');

    const matchedGuest =
      findAuthorizedGuest(queryCandidate) || findAuthorizedGuest(pathCandidate);

    if (matchedGuest) {
      setGuestName(matchedGuest);
      setIsAuthorizedGuest(true);
      setRsvpForm((prev) => ({ ...prev, name: matchedGuest }));
    } else {
      setIsAuthorizedGuest(false);
    }
  }, []);

  // Scroll Spy Navigation
  useEffect(() => {
    if (!isAuthorizedGuest) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0.05 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isAuthorizedGuest]);

  useEffect(() => {
    synthRef.current = new RomanticAmbientSynth();
    return () => {
      if (synthRef.current) synthRef.current.stop();
    };
  }, []);

  useEffect(() => {
    if (!isAuthorizedGuest) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = envelopeStage !== 'opened' ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [envelopeStage, isAuthorizedGuest]);

  // REVISI 3: Suara Musik Normal (100% Volume Tanpa Pembatas maxVolume), Mulai dari Detik ke-5 & Loop Sampai Akhir
  useEffect(() => {
    const audio = htmlAudioRef.current;
    if (!audio || !config.music.audioUrl) return;

    const start = config.music.startTime ?? 5;
    audio.volume = 1.0;

    const handleTimeUpdate = () => {
      if (audio.currentTime < start) {
        audio.currentTime = start;
      }
    };

    const handleEnded = () => {
      audio.currentTime = start;
      audio.volume = 1.0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [config.music]);

  const toggleMusic = () => {
    if (isPlayingMusic) {
      if (config.music.audioUrl && htmlAudioRef.current) {
        htmlAudioRef.current.pause();
      } else if (synthRef.current) {
        synthRef.current.stop();
      }
      setIsPlayingMusic(false);
    } else {
      if (config.music.audioUrl && htmlAudioRef.current) {
        const audio = htmlAudioRef.current;
        const start = config.music.startTime ?? 5;

        if (audio.currentTime < start) {
          audio.currentTime = start;
        }
        audio.volume = 1.0; // Normal penuh tanpa maxVolume
        audio.play().catch(() => {
          if (synthRef.current) synthRef.current.start();
        });
      } else if (synthRef.current) {
        synthRef.current.start();
      }
      setIsPlayingMusic(true);
    }
  };

  const handleTriggerEnvelopeOpen = () => {
    if (envelopeStage !== 'closed') return;
    setEnvelopeStage('opening');

    if (!isPlayingMusic) toggleMusic();

    setTimeout(() => {
      setEnvelopeStage('opened');
      setIsInvitationOpened(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2350);
  };

  const handleReplayEnvelope = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setEnvelopeStage('closed');
  };

  const handleOpenInvitation = () => {
    setIsOpeningTransition(true);
    if (!isPlayingMusic) toggleMusic();

    setTimeout(() => {
      setIsInvitationOpened(true);
      setIsOpeningTransition(false);
      if (mainContentRef.current) {
        mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 550);
  };

  const handleCopyGuestUrl = (guest) => {
    const slug = createGuestSlug(guest);
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard?.writeText(url);
    setCopiedGuestLink(guest);
    setTimeout(() => setCopiedGuestLink(null), 2200);
  };

  const handleCopyAccount = (number, index) => {
    const cleanNumber = number.replace(/\s+/g, '');
    navigator.clipboard?.writeText(cleanNumber);
    setCopiedAccount(index);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;

    const newEntry = {
      id: `w-${Date.now()}`,
      name: rsvpForm.name.trim(),
      guests: Number(rsvpForm.guests),
      attendance: rsvpForm.attendance,
      message:
        rsvpForm.message.trim() ||
        'Selamat berbahagia untuk Tiara & Rifqi, semoga cinta kasih selalu menyertai.',
      createdAt: 'Baru saja',
    };

    const updated = [newEntry, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('tiara_rifqi_wishes_v1', JSON.stringify(updated));
    } catch {
      // Abaikan jika localStorage diblokir
    }
    setRsvpSubmitted(true);
    setRsvpForm((prev) => ({ ...prev, message: '' }));
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isForcedMobile = viewportMode === 'mobile-preview';

  // ==========================================================================
  // LAYAR AKSES TERBATAS JIKA URL TIDAK TERDAFTAR
  // ==========================================================================
  if (!isAuthorizedGuest) {
    return (
      <div
        data-theme="chocolatelilac"
        className="min-h-screen bg-[#FAF9F7] text-[#4A3428] flex flex-col items-center justify-center px-5 py-12 relative overflow-hidden"
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
          .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
          .font-sans-refined { font-family: 'Montserrat', sans-serif; }
          .font-script { font-family: 'Great Vibes', cursive; }
        `}</style>

        <SectionSideFlorals opacity="opacity-65" topOffset="top-16" />

        <div className="card relative z-10 max-w-md w-full bg-[#FAF9F7]/95 backdrop-blur-xl border border-[#D8C9E8] p-7 sm:p-10 text-center shadow-2xl rounded-none">
          <div className="flex justify-center mb-3">
            <ChocolateLilacFloralCrest className="w-36 h-20" />
          </div>

          <div className="w-12 h-12 rounded-full bg-[#4A3428] border border-[#A77B4D] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-[#D8C9E8]" />
          </div>

          <p className="font-sans-refined text-[9px] uppercase tracking-[0.35em] text-[#A77B4D]">
            Private Wedding Invitation
          </p>
          <h1 className="font-script text-4xl sm:text-5xl text-[#4A3428] mt-2">
            {config.couple.brideShort} &amp; {config.couple.groomShort}
          </h1>
          <p className="font-sans-refined text-[10px] uppercase tracking-[0.25em] text-[#4A3428]/75 mt-1">
            {config.weddingDate.displayDate}
          </p>

          <div className="w-16 h-[1px] bg-[#D8C9E8] mx-auto my-5" />

          <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#4A3428] font-semibold">
            Tautan Undangan Khusus Tamu Terdaftar
          </h2>
          <p className="font-serif-luxury text-sm text-[#4A3428]/80 leading-relaxed mt-2.5">
            Mohon maaf, halaman undangan pernikahan ini bersifat privat dan hanya dapat diakses
            melalui tautan personal resmi yang dikirimkan kepada masing-masing tamu undangan.
          </p>

          <div className="mt-6 p-3.5 bg-[#D8C9E8]/25 border border-[#D8C9E8] text-left">
            <p className="font-sans-refined text-[8px] uppercase tracking-[0.22em] text-[#4A3428] font-semibold">
              Petunjuk Bagi Tamu Undangan:
            </p>
            <p className="font-serif-luxury text-xs text-[#4A3428]/90 mt-1 leading-relaxed">
              Silakan buka kembali pesan WhatsApp undangan Anda dan klik tautan lengkap yang
              mencantumkan nama Anda yang tertera di sana. Jika Anda tidak menerima tautan resmi, harap hubungi pihak penyelenggara pernikahan untuk mendapatkan akses yang sah. Terima kasih atas pengertian dan kerjasamanya.
            </p>
          </div>

          {isAdminMode && (
            <div className="mt-6 pt-5 border-t border-[#D8C9E8] text-left">
              <p className="font-sans-refined text-[9px] uppercase tracking-[0.25em] text-[#4A3428] font-semibold mb-3">
                Panel Admin - Daftar 39 Link Undangan Tamu:
              </p>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {INVITED_GUESTS.map((g) => {
                  const slug = createGuestSlug(g);
                  return (
                    <div
                      key={g}
                      className="flex items-center justify-between gap-2 bg-[#FFFFFF] border border-[#D8C9E8] px-3 py-2 text-xs"
                    >
                      <div className="truncate">
                        <p className="font-serif-luxury font-semibold text-[#4A3428] truncate">
                          {g}
                        </p>
                        <p className="font-sans-refined text-[9px] text-[#A77B4D] truncate">
                          /{slug}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopyGuestUrl(g)}
                          className="btn btn-xs bg-[#4A3428] text-[#FAF9F7] font-sans-refined text-[8px] uppercase tracking-wider rounded-none border-none"
                        >
                          {copiedGuestLink === g ? 'Tersalin' : 'Salin Link'}
                        </button>
                        <a
                          href={`/${slug}`}
                          className="p-1 bg-[#D8C9E8]/35 text-[#4A3428] border border-[#D8C9E8]"
                          title="Buka Undangan Tamu Ini"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-[#D8C9E8]/70 flex flex-col items-center">
            <a
              href={config.support.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 opacity-85 hover:opacity-100 transition-opacity"
            >
              <img
                src={config.support.logoUrl}
                alt={config.support.companyName}
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-sans-refined text-[8px] uppercase tracking-[0.22em] text-[#4A3428]">
                {config.support.companyName}
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // TAMPILAN UTAMA UNDANGAN PERNIKAHAN
  // ==========================================================================
  return (
    <div
      data-theme="chocolatelilac"
      className="min-h-screen bg-[#FAF9F7] text-[#4A3428] selection:bg-[#4A3428] selection:text-[#FAF9F7] antialiased overflow-x-hidden pb-20 sm:pb-0"
    >
      {config.music.audioUrl && (
        <audio ref={htmlAudioRef} src={config.music.audioUrl} preload="auto" />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

        :root, [data-theme="chocolatelilac"] {
          --p: #4A3428;
          --s: #D8C9E8;
          --a: #A77B4D;
          --n: #35241B;
          --b1: #FAF9F7;
          --b2: #F4EFFA;
        }

        .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-refined { font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif; }
        .font-script { font-family: 'Great Vibes', cursive; }

        .bg-lilac-softwhite-satin {
          background-color: #FAF9F7;
          background-image:
            radial-gradient(ellipse 90% 60% at 20% 15%, rgba(255, 255, 255, 0.98) 0%, transparent 60%),
            radial-gradient(ellipse 75% 50% at 85% 35%, rgba(216, 201, 232, 0.55) 0%, transparent 65%),
            linear-gradient(128deg, #FAF9F7 0%, #F2ECF9 26%, #FAF9F7 50%, #E8DDF4 76%, #FAF9F7 100%);
        }

        .bg-lilac-drape {
          background-color: #F4EFFA;
          background-image:
            radial-gradient(circle at 75% 22%, rgba(250, 249, 247, 0.96) 0%, rgba(216, 201, 232, 0.45) 45%, transparent 70%),
            linear-gradient(112deg, #F3EDF9 0%, #FAF9F7 30%, #E7DCF2 55%, #FAF9F7 80%, #EFE8F6 100%);
        }

        .bg-chocolate-lilac-satin {
          background-color: #4A3428;
          background-image:
            radial-gradient(ellipse 80% 55% at 70% 20%, rgba(216, 201, 232, 0.22) 0%, transparent 65%),
            radial-gradient(ellipse 70% 65% at 20% 75%, rgba(167, 123, 77, 0.25) 0%, transparent 65%),
            linear-gradient(135deg, #35241B 0%, #4A3428 32%, #3D2B21 60%, #4A3428 82%, #2B1D16 100%);
        }

        .bg-fine-paper {
          background-color: #FAF9F7;
          background-image:
            radial-gradient(rgba(74, 52, 40, 0.03) 1px, transparent 0),
            radial-gradient(rgba(216, 201, 232, 0.22) 1px, #FAF9F7 0);
          background-size: 24px 24px;
          background-position: 0 0, 12px 12px;
        }

        .deckle-card {
          box-shadow:
            0 28px 65px -15px rgba(45, 31, 24, 0.65),
            0 0 0 1px rgba(216, 201, 232, 0.6),
            inset 0 0 36px rgba(216, 201, 232, 0.28);
        }

        @keyframes floatSlow {
          0%, 100% { transform: translate3d(0, 0px, 0) rotate(0deg); }
          50% { transform: translate3d(0, -6px, 0) rotate(1deg); }
        }

        @keyframes shimmerSweep {
          0% { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%) skewX(-15deg); }
        }

        .animate-float-slow {
          animation: floatSlow 7s ease-in-out infinite;
          will-change: transform;
        }

        .btn-luxury-shimmer {
          position: relative;
          overflow: hidden;
        }
        .btn-luxury-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 45%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          transform: translateX(-120%) skewX(-15deg);
          animation: shimmerSweep 4.5s infinite;
        }

        .envelope-perspective { perspective: 1500px; }
        .envelope-flap-3d {
          transform-origin: top center;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          will-change: transform;
          transition: transform 1.05s cubic-bezier(0.33, 1, 0.68, 1), z-index 0s 0.42s;
        }
        .envelope-flap-open { transform: rotateX(180deg); }

        .letter-slide-3d {
          will-change: transform, box-shadow;
          transition: transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.5s,
                      box-shadow 1.25s ease 0.5s;
        }
        .letter-slide-out {
          transform: translate3d(0, -45%, 0) scale(1.04);
          box-shadow: 0 32px 75px -12px rgba(45, 31, 24, 0.55);
        }

        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.75; }
          70% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .animate-pulse-ring { animation: pulseRing 2.4s cubic-bezier(0.24, 0, 0.38, 1) infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow, .animate-pulse-ring, .btn-luxury-shimmer::after { animation: none !important; }
          .envelope-flap-3d, .letter-slide-3d { transition-duration: 0.15s !important; transition-delay: 0s !important; }
        }
      `}</style>

      {/* =====================================================================
          STAGE PEMBUKA SURAT 3D INTERAKTIF
      ===================================================================== */}
      {envelopeStage !== 'opened' && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-between py-6 sm:py-10 px-4 overflow-hidden transition-all duration-700 ${
            envelopeStage === 'opening' ? 'bg-[#F3EDF9]/95' : 'bg-[#F3EDF9]'
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 35%, rgba(250, 249, 247, 0.96) 0%, rgba(216, 201, 232, 0.68) 78%)',
          }}
        >
          <SectionSideFlorals opacity="opacity-70" topOffset="top-20" />

          <div
            className={`relative z-20 text-center transition-all duration-500 ${
              envelopeStage === 'opening' ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#A77B4D]">
              Personal Wedding Invitation
            </p>
            <h1 className="font-serif-luxury italic text-lg sm:text-2xl text-[#4A3428] mt-1">
              The Wedding of {config.couple.brideShort} &amp; {config.couple.groomShort}
            </h1>
          </div>

          <div
            className={`relative z-20 w-full max-w-[340px] sm:max-w-[430px] md:max-w-[470px] my-auto pt-16 sm:pt-20 pb-4 flex flex-col items-center envelope-perspective transition-all duration-700 ${
              envelopeStage === 'opening'
                ? 'scale-[1.03] sm:scale-105 translate-y-8 sm:translate-y-10'
                : 'scale-100'
            }`}
          >
            <div
              className={`pointer-events-none absolute -top-2 sm:-top-4 z-0 transition-all duration-700 ${
                envelopeStage === 'opening'
                  ? 'opacity-90 -translate-y-6 scale-110'
                  : 'opacity-85 animate-float-slow'
              }`}
            >
              <ChocolateLilacFloralCrest className="w-48 h-28 sm:w-56 sm:h-32" />
            </div>

            <div
              onClick={handleTriggerEnvelopeOpen}
              role="button"
              tabIndex={0}
              aria-label="Buka surat undangan pernikahan"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTriggerEnvelopeOpen();
                }
              }}
              className="relative w-full aspect-[4/3] cursor-pointer select-none group"
            >
              <div
                className="absolute inset-0 rounded-sm bg-[#4A3428] border border-[#A77B4D]/55 shadow-[0_32px_85px_rgba(74,52,40,0.35)] overflow-hidden"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 25%, #614536 0%, #4A3428 62%, #33231A 100%)',
                }}
              >
                <div className="absolute inset-2 border border-[#D8C9E8]/35 pointer-events-none" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 opacity-35">
                  <ChocolateLilacFloralCrest className="w-40 h-24" />
                </div>
              </div>

              <div
                className={`letter-slide-3d absolute left-[6%] right-[6%] top-[7%] bottom-[6%] z-20 bg-fine-paper border border-[#D8C9E8] p-3.5 sm:p-5 flex flex-col items-center justify-between text-center shadow-xl ${
                  envelopeStage === 'opening' ? 'letter-slide-out' : ''
                }`}
              >
                <div className="w-full h-full border border-[#A77B4D]/35 px-3 py-2.5 sm:px-5 sm:py-4 flex flex-col items-center justify-between relative bg-[#FAF9F7]/95">
                  <span className="font-sans-refined text-[7px] sm:text-[8px] uppercase tracking-[0.34em] text-[#4A3428]/70">
                    The Wedding Of
                  </span>
                  <div className="my-auto py-1">
                    <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#4A3428] leading-none">
                      {config.couple.brideShort} &amp; {config.couple.groomShort}
                    </h2>
                    <div className="w-14 h-[1px] bg-[#D8C9E8] mx-auto my-2 sm:my-2.5" />
                    <p className="font-serif-luxury italic text-[11px] sm:text-xs text-[#4A3428]/85 max-w-[230px] mx-auto leading-relaxed">
                      “Kami mengundang Anda untuk menjadi bagian dari hari bahagia penyatuan janji suci kami.”
                    </p>
                  </div>
                  <div className="w-full pt-1.5 border-t border-[#D8C9E8] flex items-center justify-between text-[8px] sm:text-[9px] font-sans-refined uppercase tracking-[0.2em] text-[#4A3428]">
                    <span>{config.weddingDate.dotDate}</span>
                    <span className="text-[#A77B4D]">Tiara &amp; Rifqi</span>
                  </div>
                </div>
              </div>

              <div
                className="pointer-events-none absolute inset-0 z-30"
                style={{
                  background: 'linear-gradient(135deg, #EFE8F7 0%, #FAF9F7 55%, #E3D6F0 100%)',
                  clipPath: 'polygon(0 0, 52% 52%, 0 100%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 z-30"
                style={{
                  background: 'linear-gradient(-135deg, #EFE8F7 0%, #FAF9F7 55%, #E3D6F0 100%)',
                  clipPath: 'polygon(100% 0, 48% 52%, 100% 100%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-end pb-3 sm:pb-4 px-4"
                style={{
                  background: 'linear-gradient(to top, #F2EBF8 0%, #FAF9F7 68%, #E6D9F3 100%)',
                  clipPath: 'polygon(0 100%, 50% 44%, 100% 100%)',
                }}
              >
                <div className="bg-[#FAF9F7]/95 border border-[#D8C9E8] px-4 sm:px-6 py-2 sm:py-2.5 shadow-sm text-center max-w-[85%]">
                  <p className="font-sans-refined text-[7px] sm:text-[8px] uppercase tracking-[0.26em] text-[#4A3428]/70">
                    Kepada Yth.
                  </p>
                  <p className="font-serif-luxury text-xs sm:text-sm md:text-base font-semibold text-[#4A3428] truncate">
                    {guestName}
                  </p>
                </div>
              </div>
              <svg viewBox="0 0 400 300" className="pointer-events-none absolute inset-0 w-full h-full z-30" preserveAspectRatio="none">
                <path d="M0 300 L200 132 L400 300" stroke="#A77B4D" strokeWidth="1.1" fill="none" opacity="0.6" />
                <path d="M0 0 L200 156 L0 300 M400 0 L200 156 L400 300" stroke="#D8C9E8" strokeWidth="1" fill="none" opacity="0.8" />
              </svg>

              <div
                className={`envelope-flap-3d pointer-events-none absolute inset-x-0 top-0 h-[60%] ${
                  envelopeStage === 'opening' ? 'envelope-flap-open z-10' : 'z-40'
                }`}
              >
                <div
                  className="w-full h-full relative"
                  style={{
                    background:
                      envelopeStage === 'opening'
                        ? 'linear-gradient(to bottom, #4A3428 0%, #35241B 100%)'
                        : 'linear-gradient(180deg, #FAF9F7 0%, #F3ECF9 70%, #E5D7F2 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                >
                  <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M14 6 L200 168 L386 6"
                      stroke={envelopeStage === 'opening' ? '#D8C9E8' : '#A77B4D'}
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      fill="none"
                      opacity="0.55"
                    />
                  </svg>
                </div>
              </div>

              <div
                className={`absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
                  envelopeStage === 'opening'
                    ? 'scale-125 opacity-0 pointer-events-none'
                    : 'scale-100 opacity-100 group-hover:scale-105'
                }`}
              >
                <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#A77B4D] animate-pulse-ring" />
                <WaxSealStamp monogram={config.couple.monogram} size="w-20 h-20 sm:w-24 sm:h-24" />
              </div>
            </div>

            <div
              className={`mt-7 sm:mt-8 text-center transition-all duration-500 ${
                envelopeStage === 'opening'
                  ? 'opacity-0 translate-y-4 pointer-events-none'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              <button
                type="button"
                onClick={handleTriggerEnvelopeOpen}
                className="btn btn-luxury-shimmer min-h-[46px] inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 rounded-full bg-[#4A3428] text-[#FAF9F7] font-sans-refined text-[10px] sm:text-xs uppercase tracking-[0.26em] font-medium shadow-xl border border-[#A77B4D] hover:bg-[#35241B] transition-all active:scale-95"
              >
                <MailOpen className="w-4 h-4 text-[#D8C9E8]" />
                <span>Buka Surat Undangan</span>
              </button>
              <p className="font-serif-luxury italic text-xs sm:text-sm text-[#4A3428]/80 mt-3">
                Sentuh segel lilin atau tombol di atas untuk membuka amplop
              </p>
            </div>
          </div>

          <div
            className={`relative z-20 text-center transition-opacity duration-500 ${
              envelopeStage === 'opening' ? 'opacity-0' : 'opacity-80'
            }`}
          >
            <p className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#4A3428]/70">
              {config.weddingDate.displayDate}
            </p>
          </div>
        </div>
      )}

      {/* =====================================================================
          TOP UTILITY BAR
      ===================================================================== */}
      <div className="fixed top-3 right-3 z-40 flex items-center gap-1.5 sm:gap-2">
        {envelopeStage === 'opened' && (
          <button
            onClick={handleReplayEnvelope}
            className="btn btn-xs sm:btn-sm inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#4A3428]/90 backdrop-blur-md border border-[#D8C9E8]/55 text-[#FAF9F7] font-sans-refined text-[9px] sm:text-[10px] tracking-wider uppercase hover:bg-[#35241B] transition-colors shadow-lg"
          >
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D8C9E8]" />
            <span>Ulangi Surat</span>
          </button>
        )}
        <button
          onClick={() =>
            setViewportMode((prev) => (prev === 'responsive' ? 'mobile-preview' : 'responsive'))
          }
          className="btn btn-xs sm:btn-sm hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#4A3428]/90 backdrop-blur-md border border-[#D8C9E8]/50 text-[#FAF9F7] font-sans-refined text-[10px] tracking-wider uppercase hover:bg-[#35241B] transition-colors shadow-lg"
        >
          {viewportMode === 'responsive' ? (
            <>
              <Smartphone className="w-3.5 h-3.5 text-[#D8C9E8]" />
              <span>Simulasi HP (430px)</span>
            </>
          ) : (
            <>
              <Monitor className="w-3.5 h-3.5 text-[#D8C9E8]" />
              <span>Mode Responsif</span>
            </>
          )}
        </button>

        {isAdminMode && (
          <button
            onClick={() => setIsGuestListModalOpen(true)}
            className="btn btn-xs sm:btn-sm inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#4A3428]/95 backdrop-blur-md border border-[#D8C9E8]/60 text-[#FAF9F7] font-sans-refined text-[10px] tracking-wider uppercase hover:bg-[#35241B] transition-colors shadow-lg"
          >
            <Copy className="w-3 h-3 text-[#D8C9E8]" />
            <span>Link Tamu</span>
          </button>
        )}
      </div>

      {/* =====================================================================
          WRAPPER UTAMA UNDANGAN
      ===================================================================== */}
      <div
        className={`mx-auto transition-all duration-500 ${
          isForcedMobile
            ? 'max-w-[430px] shadow-[0_0_100px_rgba(74,52,40,0.4)] border-x border-[#D8C9E8] my-0'
            : 'w-full max-w-[1140px] shadow-[0_0_90px_rgba(74,52,40,0.22)]'
        }`}
      >
        {/* SECTION 1 - HERO STATIONERY COLLAGE */}
        <header
          id="section-cover"
          className={`relative min-h-screen bg-lilac-softwhite-satin flex flex-col items-center justify-between py-10 sm:py-14 px-4 sm:px-8 md:px-14 overflow-hidden transition-all duration-700 ${
            isOpeningTransition ? 'scale-[1.02] opacity-90' : 'scale-100 opacity-100'
          }`}
        >
          <SectionSideFlorals opacity="opacity-80" topOffset="top-24" />

          <div className="relative z-10 text-center pt-4 sm:pt-0">
            <p className="font-sans-refined text-[9px] sm:text-[11px] uppercase tracking-[0.34em] text-[#4A3428]/80">
              The Wedding Of {config.couple.brideShort} &amp; {config.couple.groomShort}
            </p>
          </div>

          <div
            className={`relative z-10 w-full ${
              isForcedMobile ? 'max-w-[340px]' : 'max-w-[330px] sm:max-w-[400px] md:max-w-[440px]'
            } my-4 sm:my-6 flex flex-col items-center`}
          >
            <div className="relative z-30 -mb-5 sm:-mb-6 animate-float-slow">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#FAF9F7] border border-[#D8C9E8] shadow-md flex items-center justify-center rotate-45 overflow-hidden">
                <div className="-rotate-45">
                  <ChocolateLilacFloralCrest className="w-28 h-20 sm:w-32 sm:h-24" />
                </div>
              </div>
            </div>

            <div className="relative w-full pt-6 sm:pt-8 pb-4 sm:pb-6 px-2 flex flex-col items-center">
              <div className="relative z-10 -mb-3 mr-24 sm:mr-32 w-36 sm:w-44 bg-[#FAF9F7] border border-[#D8C9E8] p-2.5 sm:p-3 shadow-md -rotate-3 text-left">
                <p className="font-sans-refined text-[7px] sm:text-[8px] tracking-[0.25em] uppercase text-[#A77B4D]">
                  Save Our Date
                </p>
                <p className="font-serif-luxury italic text-[11px] sm:text-xs text-[#4A3428]/85 mt-0.5">
                  {config.weddingDate.dotDate}
                </p>
              </div>

              <div className="card relative z-20 w-full max-w-[250px] sm:max-w-[280px] bg-[#4A3428] text-[#FAF9F7] p-5 sm:p-7 shadow-2xl border border-[#35241B] rounded-none">
                <div className="border border-[#D8C9E8]/45 p-4 sm:p-5 text-center">
                  <p className="font-sans-refined text-[7px] sm:text-[8px] uppercase tracking-[0.28em] text-[#D8C9E8]">
                    The Wedding Of
                  </p>
                  <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide mt-2 leading-tight text-[#FAF9F7]">
                    {config.couple.brideShort}
                  </h1>
                  <p className="font-script text-xl sm:text-2xl text-[#D8C9E8] my-1">&amp;</p>
                  <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide leading-tight text-[#FAF9F7]">
                    {config.couple.groomShort}
                  </h1>
                  <div className="w-10 h-[1px] bg-[#A77B4D] mx-auto my-3" />
                  <p className="font-sans-refined text-[8px] sm:text-[9px] tracking-[0.24em] text-[#D8C9E8]">
                    {config.weddingDate.dotDate}
                  </p>
                </div>
              </div>

              <div className="relative z-30 flex items-center justify-center gap-2 sm:gap-3 -mt-3">
                <div className="bg-[#FAF9F7] border border-[#D8C9E8] px-3.5 sm:px-4 py-2 sm:py-3 shadow-md -rotate-2 text-center">
                  <span className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#4A3428] font-light tracking-tighter">
                    {config.weddingDate.dayNumber}
                  </span>
                  <span className="block font-sans-refined text-[7px] sm:text-[8px] uppercase tracking-[0.22em] text-[#A77B4D]">
                    {config.weddingDate.monthYear}
                  </span>
                </div>
                <WaxSealStamp
                  monogram={config.couple.monogram}
                  size="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
                <div className="bg-[#4A3428] text-[#FAF9F7] px-3 sm:px-3.5 py-2.5 sm:py-3 shadow-md rotate-3 rounded-t-full border border-[#D8C9E8]/55 text-center">
                  <span className="block font-sans-refined text-[6px] sm:text-[7px] uppercase tracking-[0.2em] text-[#D8C9E8]">
                    RSVP
                  </span>
                  <span className="font-serif-luxury italic text-[11px] sm:text-xs">Cordially</span>
                </div>
              </div>
            </div>

            <div className="card mt-2 sm:mt-3 w-full max-w-[300px] sm:max-w-[340px] bg-[#FAF9F7]/95 backdrop-blur-sm border border-[#D8C9E8] px-4 sm:px-6 py-3.5 sm:py-4 text-center shadow-sm rounded-none">
              <p className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.26em] text-[#4A3428]/75">
                Kepada Yth. Bapak / Ibu / Saudara / i
              </p>
              <p className="font-serif-luxury text-base sm:text-lg md:text-xl font-semibold text-[#4A3428] mt-1 break-words">
                {guestName}
              </p>
              <p className="font-serif-luxury italic text-[11px] sm:text-xs text-[#A77B4D] mt-0.5">
                Di Tempat
              </p>
            </div>

            <button
              onClick={handleOpenInvitation}
              className="btn btn-luxury-shimmer mt-5 sm:mt-6 min-h-[46px] group relative inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-3.5 bg-[#4A3428] text-[#FAF9F7] font-sans-refined text-[11px] sm:text-xs uppercase tracking-[0.26em] shadow-xl border border-[#35241B] hover:bg-[#35241B] transition-all duration-300 active:scale-95 rounded-none"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D8C9E8] transition-transform group-hover:scale-110" />
              <span>Open Invitation</span>
            </button>

            {isInvitationOpened && (
              <button
                onClick={() => scrollToSection('section-welcome')}
                className="mt-4 inline-flex flex-col items-center text-[#4A3428]/75 hover:text-[#4A3428] transition-colors"
              >
                <span className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.25em]">
                  Scroll Story
                </span>
                <ChevronDown className="w-4 h-4 mt-1 animate-bounce" />
              </button>
            )}
          </div>
          <div className="relative z-10 text-center pb-4 sm:pb-0">
            <p className="font-serif-luxury italic text-xs text-[#4A3428]/65">
              {config.couple.brideShort} &amp; {config.couple.groomShort} -{' '}
              {config.weddingDate.dotDate}
            </p>
          </div>
        </header>

        {/* SECTION 2 - CINEMATIC WELCOME */}
        <section
          id="section-welcome"
          ref={mainContentRef}
          className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-10 md:px-16 bg-[#35241B] overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(74, 52, 40, 0.85) 0%, rgba(38, 25, 19, 0.98) 75%)',
          }}
        >
          <SectionSideFlorals opacity="opacity-70" topOffset="top-16" />

          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-10 sm:w-24 md:w-36 opacity-90"
            style={{
              background:
                'repeating-linear-gradient(90deg, #2D1F18 0px, #4A3428 18px, #241812 36px, #5C4133 54px)',
              clipPath: 'polygon(0 0, 100% 0, 62% 55%, 88% 100%, 0 100%)',
              boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.75)',
            }}
          />
          <div
            className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 sm:w-24 md:w-36 opacity-90"
            style={{
              background:
                'repeating-linear-gradient(-90deg, #2D1F18 0px, #4A3428 18px, #241812 36px, #5C4133 54px)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12% 100%, 38% 55%)',
              boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.75)',
            }}
          />

          <RevealOnScroll className="relative z-10 w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px]">
            <div className="card bg-fine-paper deckle-card px-5 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16 text-center relative border-4 border-double border-[#D8C9E8] rounded-none">
              <div className="w-12 h-12 mx-auto mb-3 sm:mb-4 text-[#4A3428] flex items-center justify-center">
                <span className="font-script text-2xl sm:text-3xl">{config.couple.monogram}</span>
              </div>
              <p className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#A77B4D] mb-3 sm:mb-4">
                {config.welcome.salutation}
              </p>
              <p className="font-serif-luxury text-xs sm:text-sm md:text-[15px] leading-[1.85] sm:leading-[1.9] text-[#4A3428]/90 mb-5 sm:mb-6">
                {config.welcome.openingText}
              </p>
              <div className="my-5 sm:my-7 py-4 sm:py-5 border-y border-[#D8C9E8]">
                <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#4A3428]">
                  {config.couple.brideShort} &amp; {config.couple.groomShort}
                </h2>
                <p className="font-sans-refined text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-[#A77B4D] mt-2">
                  {config.weddingDate.displayDate}
                </p>
              </div>
              <blockquote className="font-serif-luxury italic text-xs sm:text-sm leading-[1.8] text-[#4A3428]/85 px-1 sm:px-3">
                {config.welcome.quote}
              </blockquote>
              <p className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#A77B4D] mt-2 mb-5 sm:mb-6">
                - {config.welcome.quoteSource} -
              </p>
              <p className="font-serif-luxury text-xs sm:text-sm leading-[1.8] text-[#4A3428]/75">
                {config.welcome.gratitude}
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* SECTION 3 - COUPLE & COUNTDOWN */}
        <section
          id="section-couple"
          className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-14 bg-lilac-drape overflow-hidden"
        >
          <SectionSideFlorals opacity="opacity-80" topOffset="top-24" />
          <SectionSideFlorals opacity="opacity-70" topOffset="bottom-16" />

          <div className="relative z-10 max-w-[780px] mx-auto text-center">
            <RevealOnScroll>
              <p className="font-script text-3xl sm:text-4xl md:text-5xl text-[#4A3428]">
                Menghitung Hari Bahagia
              </p>
              <CountdownTimer isoDate={config.weddingDate.isoDate} />
            </RevealOnScroll>

            <RevealOnScroll>
              <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#A77B4D]">
                The Bride &amp; The Groom
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#4A3428] mt-1 mb-10 sm:mb-12">
                Kedua Mempelai
              </h2>
            </RevealOnScroll>

            <div
              className={`grid grid-cols-1 ${
                isForcedMobile ? '' : 'md:grid-cols-2'
              } gap-8 sm:gap-10 items-stretch justify-items-center`}
            >
              <RevealOnScroll className="w-full max-w-[340px] sm:max-w-[360px]">
                <CoupleProfileCard
                  roleLabel="The Bride"
                  shortName={config.couple.brideShort}
                  fullName={config.couple.brideFull}
                  parents={config.couple.brideParents}
                  photo={config.couple.bridePhoto}
                  onSelectPhoto={setSelectedPhoto}
                />
              </RevealOnScroll>

              <RevealOnScroll className="w-full max-w-[340px] sm:max-w-[360px]" delay={120}>
                <CoupleProfileCard
                  roleLabel="The Groom"
                  shortName={config.couple.groomShort}
                  fullName={config.couple.groomFull}
                  parents={config.couple.groomParents}
                  photo={config.couple.groomPhoto}
                  isGroom
                  onSelectPhoto={setSelectedPhoto}
                />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION 4 - LOVE STORY (DENGAN PERBAIKAN GAMBAR POLAROID & TIMELINE TIDAK TERPOTONG) */}
        <section
          id="section-story"
          className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-10 md:px-14 bg-chocolate-lilac-satin text-[#FAF9F7] overflow-hidden"
        >
          <SectionSideFlorals opacity="opacity-75" topOffset="top-20" />
          <SectionSideFlorals opacity="opacity-75" topOffset="bottom-24" />

          <div className="relative z-10 max-w-[680px] mx-auto">
            <RevealOnScroll className="text-center mb-12 sm:mb-16">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="w-10 h-[1px] bg-[#D8C9E8]/50" />
                <DoveOrnament className="w-6 h-6 text-[#D8C9E8]" />
                <span className="w-10 h-[1px] bg-[#D8C9E8]/50" />
              </div>
              <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#D8C9E8]">
                A Journey Written in Time
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FAF9F7] mt-1">
                Our Love Story
              </h2>
            </RevealOnScroll>

            <div className="relative space-y-10 sm:space-y-14">
              <div className="pointer-events-none absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#D8C9E8]/45 to-transparent" />
              {config.loveStory.map((item, index) => (
                <RevealOnScroll key={item.stage} delay={index * 70}>
                  <StoryTimelineItem
                    item={item}
                    index={index}
                    isForcedMobile={isForcedMobile}
                    onSelectPhoto={setSelectedPhoto}
                  />
                </RevealOnScroll>
              ))}
            </div>

            {/* Kartu Kutipan & Foto Polaroid Utuh Tanpa Terpotong (Revisi 1) */}
            <RevealOnScroll className="mt-16 sm:mt-20 flex flex-col items-center">
              <div className="card w-full max-w-[310px] sm:max-w-[350px] bg-fine-paper text-[#4A3428] rounded-t-[160px] p-4 shadow-2xl border border-[#D8C9E8] rounded-b-none">
                <div className="rounded-t-[146px] border border-[#A77B4D]/55 pt-8 pb-7 px-5 sm:px-6 text-center">
                  <span className="font-serif-luxury text-4xl leading-none text-[#4A3428]">“</span>
                  <p className="font-serif-luxury italic text-xs sm:text-sm leading-[1.85] text-[#4A3428]/85 -mt-2">
                    Cinta sejati bukanlah tentang menemukan seseorang yang sempurna, melainkan
                    belajar melihat ketidaksempurnaan dengan cara yang paling indah.
                  </p>
                  <p className="font-script text-2xl text-[#4A3428] mt-4">
                    {config.couple.brideShort} &amp; {config.couple.groomShort}
                  </p>
                </div>
              </div>

              <div className="w-[1.5px] h-8 bg-[#D8C9E8]" />

              {/* Bingkai Polaroid Natural Aspect Ratio: Wajah & Tulisan Bawah Tidak Terpotong */}
              <div
                onClick={() =>
                  setSelectedPhoto({
                    url: config.loveStory[4]?.photo,
                    caption: 'Forever Begins - Tiara & Rifqi',
                  })
                }
                className="group relative w-full max-w-[310px] sm:max-w-[360px] bg-[#FAF9F7] p-3.5 sm:p-4 pb-7 shadow-2xl border border-[#D8C9E8] cursor-pointer"
                title="Ketuk untuk melihat ukuran penuh"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#4A3428] border border-[#D8C9E8] shadow-md flex items-center justify-center z-10">
                  <Heart className="w-3 h-3 text-[#FAF9F7] fill-current" />
                </div>
                <div className="w-full overflow-hidden bg-[#241812] rounded-sm">
                  <img
                    src={config.loveStory[4]?.photo}
                    alt="Forever Begins"
                    className="w-full h-auto object-contain block transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="font-script text-2xl text-center text-[#4A3428] mt-4">
                  Forever Begins Here
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 5 - GALLERY */}
        <section
          id="section-gallery"
          className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-10 md:px-14 bg-fine-paper text-[#4A3428] border-t border-[#D8C9E8] overflow-hidden"
        >
          <SectionSideFlorals opacity="opacity-75" topOffset="top-24" />
          <SectionSideFlorals opacity="opacity-75" topOffset="bottom-24" />

          <div className="relative z-10 max-w-[820px] mx-auto">
            <RevealOnScroll className="text-center mb-12 sm:mb-14">
              <ChocolateLilacFloralCrest className="w-36 h-20 mx-auto -mb-2" />
              <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#A77B4D]">
                Fine-Art Prewedding Editorial
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#4A3428] mt-1">
                Potret Kebersamaan
              </h2>
              <p className="font-serif-luxury italic text-xs sm:text-sm text-[#4A3428]/70 mt-2">
                Ketuk foto untuk melihat dalam tampilan penuh
              </p>
            </RevealOnScroll>

            {/* Baris 1: Foto 1 & Foto 2 */}
            <div
              className={`grid grid-cols-1 ${
                isForcedMobile ? '' : 'sm:grid-cols-12'
              } gap-6 sm:gap-8 items-center mb-10 sm:mb-14`}
            >
              <RevealOnScroll className={isForcedMobile ? '' : 'sm:col-span-6'}>
                <div
                  onClick={() => setSelectedPhoto(config.gallery[0])}
                  className="card group cursor-pointer bg-[#F3EDF9] p-3 sm:p-4 border border-[#D8C9E8] shadow-md rounded-none"
                >
                  <div className="overflow-hidden bg-[#241812]">
                    <img
                      src={config.gallery[0].url}
                      alt={config.gallery[0].caption}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 block"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-serif-luxury italic text-xs sm:text-sm text-[#4A3428]">
                      {config.gallery[0].caption}
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#4A3428]/60" />
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll
                className={isForcedMobile ? '' : 'sm:col-span-6 sm:mt-10'}
                delay={120}
              >
                <div
                  onClick={() => setSelectedPhoto(config.gallery[1])}
                  className="card group cursor-pointer bg-[#FFFFFF] p-4 sm:p-6 border border-[#D8C9E8] shadow-lg rounded-none"
                >
                  <p className="font-sans-refined text-[8px] uppercase tracking-[0.3em] text-[#A77B4D] mb-3">
                    Editorial Note No. 02
                  </p>
                  <div className="overflow-hidden bg-[#241812]">
                    <img
                      src={config.gallery[1].url}
                      alt={config.gallery[1].caption}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 block"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="font-serif-luxury italic text-xs sm:text-sm text-[#4A3428] mt-3 text-right">
                    {config.gallery[1].caption}
                  </p>
                </div>
              </RevealOnScroll>
            </div>

            {/* Baris 2: Foto 3 */}
            <RevealOnScroll className="mb-10 sm:mb-14">
              <div
                onClick={() => setSelectedPhoto(config.gallery[2])}
                className="card group cursor-pointer relative overflow-hidden border border-[#D8C9E8] shadow-xl rounded-none"
              >
                <div className="w-full overflow-hidden bg-[#241812]">
                  <img
                    src={config.gallery[2].url}
                    alt={config.gallery[2].caption}
                    className="w-full h-auto max-h-[540px] object-contain mx-auto transition-transform duration-1000 group-hover:scale-105 block"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="bg-[#FFFFFF] px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between border-t border-[#D8C9E8]">
                  <span className="font-serif-luxury italic text-xs sm:text-sm text-[#4A3428]">
                    {config.gallery[2].caption}
                  </span>
                  <span className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#A77B4D]">
                    Full Frame
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Baris 3: Foto 4 & Foto 5 */}
            <div
              className={`grid grid-cols-1 ${
                isForcedMobile ? '' : 'sm:grid-cols-12'
              } gap-6 sm:gap-8 items-start mb-10 sm:mb-14`}
            >
              <RevealOnScroll className={isForcedMobile ? '' : 'sm:col-span-5'}>
                <div
                  onClick={() => setSelectedPhoto(config.gallery[3])}
                  className="card group cursor-pointer bg-[#FFFFFF] p-4 pb-8 sm:pb-10 border border-[#D8C9E8] shadow-lg rounded-none"
                >
                  <div className="overflow-hidden bg-[#241812]">
                    <img
                      src={config.gallery[3].url}
                      alt={config.gallery[3].caption}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 block"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="font-script text-2xl text-[#4A3428] text-center mt-4">
                    {config.gallery[3].caption}
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll className={isForcedMobile ? '' : 'sm:col-span-7'} delay={140}>
                <div
                  onClick={() => setSelectedPhoto(config.gallery[4])}
                  className="card group cursor-pointer bg-[#F3EDF9] px-5 py-7 sm:px-8 sm:py-8 border border-[#D8C9E8] shadow-md rounded-none"
                >
                  <div className="overflow-hidden mb-4 sm:mb-5 bg-[#241812]">
                    <img
                      src={config.gallery[4].url}
                      alt={config.gallery[4].caption}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 block"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#A77B4D]">
                    {config.gallery[4].caption}
                  </p>
                  <p className="font-serif-luxury italic text-xs sm:text-sm text-[#4A3428]/80 mt-1 leading-relaxed">
                    “Setiap bingkai menyimpan doa dan ketulusan langkah kami menuju hari penyatuan
                    janji suci.”
                  </p>
                </div>
              </RevealOnScroll>
            </div>

            {/* Baris 4: Foto 6 & Foto 7 */}
            <div
              className={`grid grid-cols-1 ${
                isForcedMobile ? '' : 'sm:grid-cols-12'
              } gap-6 sm:gap-8 items-center`}
            >
              {[config.gallery[5], config.gallery[6]].map((item, idx) => (
                <RevealOnScroll
                  key={item.id}
                  className={isForcedMobile ? '' : 'sm:col-span-6'}
                  delay={idx * 120}
                >
                  <div
                    onClick={() => setSelectedPhoto(item)}
                    className={`card group cursor-pointer ${
                      idx === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F3EDF9]'
                    } p-3.5 sm:p-5 border border-[#D8C9E8] shadow-md rounded-none`}
                  >
                    <div className="overflow-hidden bg-[#241812]">
                      <img
                        src={item.url}
                        alt={item.caption}
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 block"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-serif-luxury italic text-xs sm:text-sm text-[#4A3428]">
                        {item.caption}
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-[#4A3428]/60" />
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 - EVENTS */}
        <section
          id="section-events"
          className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-10 md:px-14 bg-[#F3EDF9] text-[#4A3428] overflow-hidden border-t border-[#D8C9E8]"
        >
          <SectionSideFlorals opacity="opacity-80" topOffset="top-16" />

          <div className="relative z-10 max-w-[700px] mx-auto">
            <RevealOnScroll className="text-center mb-10 sm:mb-14">
              <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#A77B4D]">
                Wedding Schedule &amp; Venue
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl tracking-wide text-[#4A3428] mt-1">
                SAVE THE DATE
              </h2>
              <div className="w-16 h-[1px] bg-[#A77B4D]/50 mx-auto mt-3" />
            </RevealOnScroll>

            <div
              className={`relative grid grid-cols-1 ${
                isForcedMobile ? '' : 'md:grid-cols-2'
              } gap-6 sm:gap-8`}
            >
              <RevealOnScroll>
                <EventScheduleCard eventData={config.events.akad} />
              </RevealOnScroll>
              <RevealOnScroll delay={140}>
                <EventScheduleCard eventData={config.events.resepsi} />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION 7 - OFFICIAL CARD */}
        <section
          id="section-card"
          className="relative py-16 sm:py-24 md:py-28 px-4 sm:px-10 md:px-14 bg-[#EDE4F5] text-[#4A3428] overflow-hidden"
        >
          <SectionSideFlorals opacity="opacity-75" topOffset="top-12" />

          <RevealOnScroll className="relative z-10 max-w-[520px] mx-auto">
            <div className="card relative bg-fine-paper border border-[#D8C9E8] p-5 sm:p-10 md:p-12 shadow-2xl text-center rounded-none">
              <div className="border border-[#A77B4D]/35 p-5 sm:p-8">
                <p className="font-sans-refined text-[8px] uppercase tracking-[0.35em] text-[#A77B4D]">
                  Official Printed Invitation
                </p>
                <div className="my-5 flex justify-center">
                  <WaxSealStamp monogram={config.couple.monogram} size="w-20 h-20 sm:w-24 sm:h-24" />
                </div>
                <p className="font-serif-luxury italic text-xs sm:text-sm text-[#4A3428]/80 leading-relaxed">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
                  berkenan hadir untuk memberikan doa restu kepada kedua mempelai:
                </p>
                <div className="my-5 sm:my-6">
                  <h3 className="font-serif-luxury text-lg sm:text-2xl font-semibold text-[#4A3428]">
                    {config.couple.brideFull}
                  </h3>
                  <p className="font-script text-2xl text-[#A77B4D] my-1">&amp;</p>
                  <h3 className="font-serif-luxury text-lg sm:text-2xl font-semibold text-[#4A3428]">
                    {config.couple.groomFull}
                  </h3>
                </div>
                <div className="w-16 h-[1px] bg-[#D8C9E8] mx-auto my-4" />
                <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#4A3428] font-medium">
                  {config.weddingDate.displayDate}
                </p>
                <p className="font-serif-luxury text-xs sm:text-sm text-[#4A3428]/75 mt-1">
                  {config.events.resepsi.venueName} - {config.events.resepsi.address}
                </p>
                <div className="mt-6 sm:mt-7">
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      config.weddingDate.calendarTitle
                    )}&details=${encodeURIComponent(
                      config.weddingDate.calendarDetails
                    )}&location=${encodeURIComponent(
                      `${config.events.resepsi.venueName}, ${config.events.resepsi.address}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn min-h-[42px] inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#4A3428] bg-transparent text-[#4A3428] font-sans-refined text-[9px] uppercase tracking-[0.25em] hover:bg-[#4A3428] hover:text-[#FAF9F7] transition-colors rounded-none"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Save to Calendar</span>
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* SECTION 8 - RSVP & TANDA KASIH PERNIKAHAN */}
        <section
          id="section-rsvp"
          className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-10 md:px-14 bg-fine-paper text-[#4A3428] border-t border-[#D8C9E8] overflow-hidden"
        >
          <SectionSideFlorals opacity="opacity-75" topOffset="top-20" />
          <SectionSideFlorals opacity="opacity-75" topOffset="bottom-20" />

          <div className="relative z-10 max-w-[580px] mx-auto">
            <RevealOnScroll className="text-center mb-10 sm:mb-12">
              <VintageCarriageIllustration className="w-56 sm:w-72 h-24 sm:h-28 mx-auto mb-3" />
              <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#A77B4D]">
                RSVP &amp; Warmest Wishes
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#4A3428] mt-1">
                Konfirmasi Kehadiran &amp; Doa
              </h2>
            </RevealOnScroll>

            <RevealOnScroll>
              <form
                onSubmit={handleRsvpSubmit}
                className="card bg-[#F3EDF9] border border-[#D8C9E8] p-5 sm:p-8 md:p-9 shadow-md space-y-5 rounded-none"
              >
                <div className="form-control">
                  <label
                    htmlFor="rsvp-name"
                    className="label block font-sans-refined text-[9px] uppercase tracking-[0.25em] text-[#4A3428] mb-2 p-0"
                  >
                    Nama Tamu Undangan *
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    className="input input-bordered w-full min-h-[44px] bg-[#FAF9F7] border border-[#D8C9E8] px-4 py-3 font-serif-luxury text-sm text-[#4A3428] focus:outline-none focus:border-[#4A3428] rounded-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label
                      htmlFor="rsvp-guests"
                      className="label block font-sans-refined text-[9px] uppercase tracking-[0.25em] text-[#4A3428] mb-2 p-0"
                    >
                      Jumlah Tamu Hadir
                    </label>
                    <select
                      id="rsvp-guests"
                      value={rsvpForm.guests}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                      className="select select-bordered w-full min-h-[44px] bg-[#FAF9F7] border border-[#D8C9E8] px-4 py-3 font-serif-luxury text-sm text-[#4A3428] focus:outline-none focus:border-[#4A3428] rounded-none"
                    >
                      <option value="1">1 Orang</option>
                      <option value="2">2 Orang</option>
                      <option value="3">3 Orang</option>
                      <option value="4">4 Orang</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <span className="label block font-sans-refined text-[9px] uppercase tracking-[0.25em] text-[#4A3428] mb-2 p-0">
                      Konfirmasi Kehadiran
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {['Hadir', 'Tidak Hadir'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setRsvpForm({ ...rsvpForm, attendance: status })}
                          className={`btn min-h-[44px] py-2.5 px-3 font-sans-refined text-[10px] uppercase tracking-widest border transition-colors rounded-none ${
                            rsvpForm.attendance === status
                              ? 'bg-[#4A3428] text-[#FAF9F7] border-[#4A3428]'
                              : 'bg-[#FAF9F7] text-[#4A3428] border-[#D8C9E8] hover:border-[#4A3428]'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-control">
                  <label
                    htmlFor="rsvp-message"
                    className="label block font-sans-refined text-[9px] uppercase tracking-[0.25em] text-[#4A3428] mb-2 p-0"
                  >
                    Pesan &amp; Doa untuk Kedua Mempelai
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    placeholder="Tuliskan doa dan harapan terbaik Anda untuk Tiara & Rifqi..."
                    className="textarea textarea-bordered w-full bg-[#FAF9F7] border border-[#D8C9E8] px-4 py-3 font-serif-luxury text-sm text-[#4A3428] focus:outline-none focus:border-[#4A3428] rounded-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-luxury-shimmer w-full min-h-[46px] py-3.5 bg-[#4A3428] text-[#FAF9F7] font-sans-refined text-[10px] uppercase tracking-[0.3em] hover:bg-[#35241B] transition-colors flex items-center justify-center gap-2 shadow-md rounded-none border-none"
                >
                  <Send className="w-3.5 h-3.5 text-[#D8C9E8]" />
                  <span>Kirim Konfirmasi &amp; Ucapan</span>
                </button>
                {rsvpSubmitted && (
                  <div className="mt-4 p-4 bg-[#FAF9F7] border border-[#D8C9E8] text-center">
                    <p className="font-serif-luxury text-base font-semibold text-[#4A3428]">
                      Terima kasih atas konfirmasi dan untaian doa Anda!
                    </p>
                  </div>
                )}
              </form>
            </RevealOnScroll>

            <RevealOnScroll className="mt-8 sm:mt-10">
              <div className="card border border-[#D8C9E8] bg-[#FFFFFF] p-5 sm:p-6 max-h-80 overflow-y-auto space-y-4 rounded-none">
                <p className="font-sans-refined text-[9px] uppercase tracking-[0.28em] text-[#4A3428] border-b border-[#D8C9E8] pb-2">
                  Untaian Doa Restu ({wishes.length})
                </p>
                {wishes.map((w) => (
                  <div key={w.id} className="pb-3.5 border-b border-[#D8C9E8]/50 last:border-none">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif-luxury font-semibold text-sm text-[#4A3428]">
                        {w.name}
                      </span>
                      <span
                        className={`badge font-sans-refined text-[8px] uppercase tracking-widest px-2 py-0.5 border rounded-none ${
                          w.attendance === 'Hadir'
                            ? 'bg-[#D8C9E8]/40 text-[#4A3428] border-[#D8C9E8]'
                            : 'bg-[#FAF9F7] text-[#A77B4D] border-[#D8C9E8]'
                        }`}
                      >
                        {w.attendance}
                      </span>
                    </div>
                    <p className="font-serif-luxury italic text-xs sm:text-sm text-[#4A3428]/85 mt-1.5 leading-relaxed">
                      “{w.message}”
                    </p>
                    <span className="block font-sans-refined text-[8px] text-[#A77B4D] mt-1">
                      {w.createdAt}
                    </span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* TANDA KASIH PERNIKAHAN - REKENING BRI & MANDIRI + FOTO QRIS */}
            <RevealOnScroll className="mt-14 sm:mt-16 text-center">
              <p className="font-sans-refined text-[9px] uppercase tracking-[0.3em] text-[#A77B4D]">
                Wedding Gift
              </p>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#4A3428] mt-1">
                Tanda Kasih Pernikahan
              </h3>
              <p className="font-serif-luxury italic text-xs sm:text-sm text-[#4A3428]/75 mt-2 max-w-md mx-auto leading-relaxed">
                Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Bapak/Ibu/Saudara/i
                ingin memberikan tanda kasih secara digital, dapat melalui rekening atau pindai QRIS berikut:
              </p>

              <div className="space-y-4 max-w-[400px] mx-auto mt-6">
                {config.gifts.map((gift, idx) => (
                  <BankAccountCard
                    key={gift.accountNumber}
                    gift={gift}
                    index={idx}
                    copiedAccount={copiedAccount}
                    onCopy={handleCopyAccount}
                  />
                ))}
              </div>

              <div className="card mt-6 max-w-[360px] mx-auto bg-[#FFFFFF] border border-[#D8C9E8] p-5 sm:p-7 shadow-xl relative rounded-none">
                <div className="border border-[#A77B4D]/30 p-4 sm:p-5 bg-[#FAF9F7]">
                  <div className="flex items-center justify-between border-b border-[#D8C9E8] pb-2.5 mb-4">
                    <span className="font-sans-refined text-[9px] font-semibold uppercase tracking-[0.24em] text-[#4A3428]">
                      QRIS • ALL PAYMENT
                    </span>
                    <QrCode className="w-4 h-4 text-[#A77B4D]" />
                  </div>

                  <div
                    onClick={() => setIsQrisZoomOpen(true)}
                    className="group relative aspect-square w-full max-w-[240px] mx-auto bg-[#FFFFFF] border border-[#D8C9E8] p-3 flex items-center justify-center cursor-pointer overflow-hidden shadow-inner"
                  >
                    {!qrisImageError ? (
                      <img
                        src={config.qrisGift.imageUrl}
                        alt="QRIS Tanda Kasih Pernikahan Tiara & Rifqi"
                        onError={() => setQrisImageError(true)}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <QrCode className="w-24 h-24 text-[#4A3428]/80 mx-auto mb-2 stroke-[1.2]" />
                        <p className="font-sans-refined text-[9px] uppercase tracking-[0.2em] text-[#4A3428]">
                          Foto QRIS
                        </p>
                        <p className="font-serif-luxury italic text-xs text-[#A77B4D] mt-1">
                          Simpan file foto QRIS Anda di folder{' '}
                          <code className="text-[#4A3428] font-semibold">public/qris.png</code>
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="font-serif-luxury font-semibold text-sm sm:text-base text-[#4A3428] mt-4">
                    {config.qrisGift.merchantName}
                  </p>
                  <p className="font-serif-luxury italic text-[11px] sm:text-xs text-[#4A3428]/75 mt-1 leading-relaxed">
                    {config.qrisGift.note}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsQrisZoomOpen(true)}
                      className="btn min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-[#4A3428] bg-transparent text-[#4A3428] font-sans-refined text-[9px] uppercase tracking-widest hover:bg-[#4A3428] hover:text-[#FAF9F7] transition-colors rounded-none"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Perbesar</span>
                    </button>

                    <a
                      href={config.qrisGift.imageUrl}
                      download="QRIS-Tiara-Rifqi.png"
                      className="btn min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#4A3428] text-[#FAF9F7] font-sans-refined text-[9px] uppercase tracking-widest hover:bg-[#35241B] transition-colors rounded-none border-none"
                    >
                      <Download className="w-3 h-3 text-[#D8C9E8]" />
                      <span>Unduh QRIS</span>
                    </a>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 9 - CLOSING & SUPPORT BY PT. MUSTDHIYA TEKNOLOGI INDONESIA */}
        <footer
          id="section-closing"
          className="relative min-h-[540px] sm:min-h-[640px] flex flex-col items-center justify-between text-center text-[#FAF9F7] overflow-hidden bg-[#2D1F18] pt-20 pb-28 sm:pb-12 px-5"
        >
          <SectionSideFlorals opacity="opacity-65" topOffset="top-16" />

          <img
            src={config.closingPhoto}
            alt="The Beginning of Forever"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-45 scale-105"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(45, 31, 24, 0.88) 0%, rgba(74, 52, 40, 0.68) 45%, rgba(32, 21, 16, 0.96) 100%)',
            }}
          />

          <RevealOnScroll className="relative z-10 max-w-[480px] my-auto">
            <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#D8C9E8]">
              The Beginning of Forever
            </p>
            <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#FAF9F7] my-4 drop-shadow-md">
              {config.couple.brideShort} &amp; {config.couple.groomShort}
            </h2>
            <p className="font-sans-refined text-[10px] uppercase tracking-[0.35em] text-[#D8C9E8] mb-6">
              {config.weddingDate.dotDate}
            </p>
            <div className="w-14 h-[1px] bg-[#D8C9E8]/50 mx-auto mb-6" />
            <p className="font-serif-luxury italic text-sm sm:text-base text-[#FAF9F7]/90 leading-relaxed">
              Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i
              berkenan hadir dan memberikan doa restu. Terima kasih atas segala perhatian dan kasih
              sayang yang diberikan.
            </p>
            <div className="mt-8 flex justify-center">
              <ChocolateLilacFloralCrest className="w-36 h-20" />
            </div>
          </RevealOnScroll>

          <div className="relative z-10 mt-12 pt-6 border-t border-[#D8C9E8]/25 w-full max-w-md flex flex-col items-center">
            <p className="font-sans-refined text-[8px] uppercase tracking-[0.28em] text-[#D8C9E8]/75 mb-2">
              Digital Invitation Supported By
            </p>
            <a
              href={config.support.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex flex-col sm:flex-row items-center gap-2.5 px-4 py-2 rounded-full bg-[#FAF9F7]/10 hover:bg-[#FAF9F7]/20 border border-[#D8C9E8]/30 transition-all"
            >
              <img
                src={config.support.logoUrl}
                alt={config.support.companyName}
                className="w-6 h-6 object-contain rounded-sm"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="text-center sm:text-left">
                <span className="block font-sans-refined text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] text-[#FAF9F7]">
                  {config.support.companyName}
                </span>
                <span className="block font-serif-luxury italic text-[11px] text-[#D8C9E8] group-hover:underline">
                  {config.support.websiteLabel}
                </span>
              </div>
            </a>
          </div>
        </footer>
      </div>

      {/* =====================================================================
          BOTTOM NAVIGATION BAR
      ===================================================================== */}
      {envelopeStage === 'opened' && (
        <nav
          aria-label="Navigasi Bagian Undangan"
          className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-1rem)] max-w-[420px] sm:max-w-[660px]"
        >
          {isMobileMenuOpen && (
            <div className="sm:hidden mb-2 p-3 rounded-2xl bg-[#35241B]/95 backdrop-blur-xl border border-[#D8C9E8]/40 shadow-2xl grid grid-cols-3 gap-2">
              {NAV_ITEMS.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-center transition-all ${
                      isActive
                        ? 'bg-[#D8C9E8] text-[#4A3428] border-[#FAF9F7] font-semibold'
                        : 'bg-[#4A3428]/60 text-[#FAF9F7] border-[#D8C9E8]/25'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mb-1" />
                    <span className="font-sans-refined text-[9px] uppercase tracking-wider">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl sm:rounded-full bg-[#35241B]/95 backdrop-blur-xl border border-[#D8C9E8]/45 shadow-[0_12px_35px_rgba(45,31,24,0.65)]">
            <div className="flex items-center justify-around flex-1 gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar">
              {NAV_ITEMS.map((nav) => {
                const IconComponent = nav.icon;
                const isActive = activeSection === nav.id;
                return (
                  <button
                    key={nav.id}
                    onClick={() => scrollToSection(nav.id)}
                    className={`group flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 flex-1 sm:flex-initial px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-full transition-all duration-300 min-w-[44px] ${
                      isActive
                        ? 'bg-[#D8C9E8] text-[#4A3428] shadow-sm font-semibold'
                        : 'text-[#FAF9F7]/80 hover:text-[#FAF9F7] hover:bg-[#4A3428]'
                    }`}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? 'text-[#4A3428]' : 'text-[#D8C9E8]'
                      }`}
                    />
                    <span className="font-sans-refined text-[8px] sm:text-[10px] uppercase tracking-[0.06em] sm:tracking-[0.16em] leading-tight whitespace-nowrap">
                      {nav.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="w-[1px] h-6 bg-[#D8C9E8]/25 mx-0.5 shrink-0" />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="sm:hidden w-9 h-9 shrink-0 rounded-xl flex items-center justify-center border border-[#D8C9E8]/35 bg-[#4A3428] text-[#D8C9E8]"
              aria-label="Menu Bagian"
            >
              <Menu className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleMusic}
              className={`w-9 h-9 shrink-0 rounded-xl sm:rounded-full flex items-center justify-center border transition-all ${
                isPlayingMusic
                  ? 'bg-[#D8C9E8] border-[#FAF9F7] text-[#4A3428]'
                  : 'bg-[#4A3428] border-[#D8C9E8]/40 text-[#D8C9E8]'
              }`}
              aria-label={isPlayingMusic ? 'Matikan musik' : 'Putar musik'}
            >
              {isPlayingMusic ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      )}

      {/* LIGHTBOX MODAL GALERI & LOVE STORY */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="modal modal-open fixed inset-0 z-50 bg-[#241812]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-box relative max-w-3xl w-full bg-fine-paper p-3 sm:p-5 border border-[#D8C9E8] shadow-2xl rounded-none"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="btn btn-circle btn-sm absolute -top-4 -right-4 w-9 h-9 rounded-full bg-[#4A3428] text-[#FAF9F7] border border-[#D8C9E8] flex items-center justify-center shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-[#241812] flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>
            <p className="font-serif-luxury italic text-sm text-[#4A3428] text-center mt-3">
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}

      {/* MODAL ZOOM FOTO QRIS */}
      {isQrisZoomOpen && (
        <div
          onClick={() => setIsQrisZoomOpen(false)}
          className="modal modal-open fixed inset-0 z-50 bg-[#241812]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-box relative max-w-md w-full bg-[#FFFFFF] p-5 sm:p-7 border border-[#D8C9E8] shadow-2xl text-center rounded-none"
          >
            <button
              onClick={() => setIsQrisZoomOpen(false)}
              className="btn btn-circle btn-sm absolute -top-4 -right-4 w-9 h-9 rounded-full bg-[#4A3428] text-[#FAF9F7] border border-[#D8C9E8] flex items-center justify-center shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="font-sans-refined text-[9px] uppercase tracking-[0.28em] text-[#A77B4D] mb-3">
              {config.qrisGift.title}
            </p>
            <div className="aspect-square w-full bg-[#FAF9F7] border border-[#D8C9E8] p-3 flex items-center justify-center">
              {!qrisImageError ? (
                <img
                  src={config.qrisGift.imageUrl}
                  alt="QRIS Tiara & Rifqi"
                  className="w-full h-full object-contain"
                />
              ) : (
                <QrCode className="w-32 h-32 text-[#4A3428]" />
              )}
            </div>
            <p className="font-serif-luxury font-semibold text-base text-[#4A3428] mt-3">
              {config.qrisGift.merchantName}
            </p>
          </div>
        </div>
      )}

      {/* MODAL DAFTAR 39 LINK TAMU (MODE ADMIN ?admin=mdt) */}
      {isGuestListModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#FAF9F7] text-[#4A3428] h-full overflow-y-auto p-6 sm:p-8 shadow-2xl border-l border-[#D8C9E8]">
            <div className="flex items-center justify-between border-b border-[#D8C9E8] pb-4 mb-5">
              <div>
                <p className="font-sans-refined text-[9px] uppercase tracking-[0.25em] text-[#A77B4D]">
                  Whitelisted Guests ({INVITED_GUESTS.length})
                </p>
                <h3 className="font-serif-luxury text-2xl font-semibold">
                  Daftar Link Undangan Tamu
                </h3>
              </div>
              <button
                onClick={() => setIsGuestListModalOpen(false)}
                className="p-2 text-[#4A3428] hover:bg-[#F3EDF9] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {INVITED_GUESTS.map((guest, idx) => {
                const slug = createGuestSlug(guest);
                return (
                  <div
                    key={guest}
                    className="bg-[#FFFFFF] border border-[#D8C9E8] p-3 flex items-center justify-between gap-2"
                  >
                    <div className="truncate">
                      <p className="font-serif-luxury font-semibold text-sm text-[#4A3428]">
                        {idx + 1}. {guest}
                      </p>
                      <p className="font-sans-refined text-[10px] text-[#A77B4D] truncate">
                        wedding.mustdhiya.com/{slug}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyGuestUrl(guest)}
                      className="btn btn-xs shrink-0 px-3 py-1.5 bg-[#4A3428] text-[#FAF9F7] font-sans-refined text-[9px] uppercase tracking-wider rounded-none border-none"
                    >
                      {copiedGuestLink === guest ? 'Tersalin' : 'Salin'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}