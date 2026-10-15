import React, { useState, useEffect, useRef, memo } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sparkles,
  Heart,
  ChevronDown,
  Maximize2,
  X,
  Sliders,
  Smartphone,
  Monitor,
  Send,
  BookOpen,
  Image as ImageIcon,
  MessageSquareHeart,
  Menu,
  MailOpen,
  RotateCcw,
} from 'lucide-react';

// ============================================================================
// IKON INSTAGRAM KUSTOM (Mencegah Error Export dari Lucide-React)
// ============================================================================
const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// ============================================================================
// KONFIGURASI DATA PERNIKAHAN — TEMA "NAVY SERENITY"
// ============================================================================
const DEFAULT_WEDDING_CONFIG = {
  couple: {
    brideShort: 'Aurelia',
    brideFull: 'Aurelia Maharani Putri, S.Ars.',
    brideBio:
      'Putri bungsu yang mencintai seni arsitektur Eropa klasik, sastra puisi, dan ketenangan pagi.',
    brideParents: 'Putri tercinta dari Bapak H. Hendra Wijaya & Ibu Hj. Sofia Kartika',
    brideInstagram: '@aureliamaharani',
    bridePhoto:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',

    groomShort: 'Keenan',
    groomFull: 'Keenan Aditya Pratama, M.B.A.',
    groomBio:
      'Sosok tenang penikmat fotografi analog, musik klasik, dan perjalanan menyusuri kota tua.',
    groomParents: 'Putra pertama dari Bapak Ir. Darmawan Pratama & Ibu Ratna Prameswari',
    groomInstagram: '@keenanaditya',
    groomPhoto:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',

    monogram: 'A & K',
  },
  weddingDate: {
    displayDate: 'Sabtu, 24 Oktober 2026',
    dotDate: '24 . 10 . 2026',
    isoDate: '2026-10-24T08:00:00+07:00',
    calendarTitle: 'The Wedding of Aurelia & Keenan',
    calendarDetails:
      'Mohon doa restu dan kehadiran Bapak/Ibu/Saudara/i pada acara pernikahan Aurelia & Keenan.',
  },
  welcome: {
    salutation: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
    openingText:
      'Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan berbagi kebahagiaan dalam momen sakral penyatuan janji suci pernikahan kami.',
    quote:
      '“Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”',
    quoteSource: 'QS. Ar-Rum : 21',
    gratitude:
      'Kehadiran serta untaian doa tulus dari keluarga dan sahabat tercinta merupakan anugerah terindah bagi awal perjalanan rumah tangga kami.',
  },
  dressCode: {
    themeTitle: 'Navy Serenity',
    subtitle: 'European Wedding • Luxury Blue • Timeless Romance',
    note: 'Warna navy memberikan kesan elegan sementara dusty blue membuat keseluruhan tampak lebih lembut dan modern.',
    colors: [
      { name: 'Midnight Navy', hex: '#1B2A49', textLight: true },
      { name: 'Dusty Blue', hex: '#AEBFD6', textLight: false },
      { name: 'White Smoke', hex: '#F5F5F5', textLight: false },
      { name: 'Silver', hex: '#C5CCD6', textLight: false },
      { name: 'Soft Grey', hex: '#A8ADB5', textLight: false },
    ],
  },
  events: {
    akad: {
      title: 'Akad Nikah',
      dayDate: 'Sabtu, 24 Oktober 2026',
      time: '08.00 — 10.00 WIB',
      venueName: 'Glasshouse Heritage Ballroom',
      address: 'Jl. Wijaya Kusuma No. 42, Kebayoran Baru, Jakarta Selatan 12120',
      mapsUrl: 'https://maps.google.com/?q=Kebayoran+Baru+Jakarta+Selatan',
    },
    resepsi: {
      title: 'Resepsi Pernikahan',
      dayDate: 'Sabtu, 24 Oktober 2026',
      time: '11.30 — 14.30 WIB',
      venueName: 'The Grand Majapahit Conservatory',
      address: 'Jl. Wijaya Kusuma No. 42, Kebayoran Baru, Jakarta Selatan 12120',
      mapsUrl: 'https://maps.google.com/?q=Kebayoran+Baru+Jakarta+Selatan',
    },
  },
  loveStory: [
    {
      stage: 'The First Meeting',
      date: 'Oktober 2021',
      description:
        'Pertemuan pertama yang tak terduga di sebuah pameran arsitektur dan fotografi klasik. Sebuah percakapan singkat tentang cahaya sore yang membuka lembaran baru.',
      photo:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    },
    {
      stage: 'The Beginning',
      date: 'Maret 2022',
      description:
        'Dari secangkir kopi hangat dan surat-surat pendek, kami menyadari bahwa ketenangan terbaik adalah saat berbagi cerita tanpa perlu berpura-pura.',
      photo:
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80',
    },
    {
      stage: 'The Special Moment',
      date: 'Desember 2024',
      description:
        'Melalui berbagai musim, jarak, dan doa yang dipanjatkan dalam diam, kami tumbuh bersama menjadi tempat pulang yang paling teduh.',
      photo:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80',
    },
    {
      stage: 'The Proposal',
      date: 'Mei 2025',
      description:
        'Di bawah langit senja yang temaram, sebuah janji diikrarkan di hadapan kedua keluarga besar untuk melangkah menuju ikatan seumur hidup.',
      photo:
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=700&q=80',
    },
    {
      stage: 'Forever Begins',
      date: '24 Oktober 2026',
      description:
        'Hari di mana dua perjalanan menyatu dalam ikatan suci pernikahan. Awal dari selamanya yang kami tulis bersama.',
      photo:
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80',
    },
  ],
  gallery: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      type: 'portrait-left',
      caption: 'I. Dalam Teduh Cahaya Senja',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
      type: 'portrait-right',
      caption: 'II. Langkah yang Searah',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=85',
      type: 'full-landscape',
      caption: 'III. Serenade Biru Malam — Fine Art Editorial Series',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85',
      type: 'paper-frame',
      caption: 'IV. Menggenggam Waktu',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
      type: 'magazine-margin',
      caption: 'V. Menuju Hari Bahagia',
    },
  ],
  closingPhoto:
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=85',
  gifts: [
    {
      bankName: 'Bank Central Asia (BCA)',
      accountNumber: '8420 1928 37',
      accountHolder: 'a.n. Aurelia Maharani Putri [Placeholder]',
    },
    {
      bankName: 'Bank Mandiri',
      accountNumber: '1240 0098 2341 2',
      accountHolder: 'a.n. Keenan Aditya Pratama [Placeholder]',
    },
  ],
  music: {
    title: 'Lagu Pilihan Pernikahan',
    audioUrl: '/The Script - Never Seen Anything Quite Like You (Audio).mp3', // Mengarah ke file di dalam folder public/musik.mp3
    startTime: 0,           // Mulai dari 00:00 (0 detik)
    endTime: 66,            // Berhenti & ulangi di 01:06 (66 detik)
    maxVolume: 0.65,        // Volume maksimal (0.0 sampai 1.0)
    fadeDuration: 2.5,      // Durasi transisi halus (2.5 detik sebelum habis)
  },
};

const INITIAL_WISHES = [
  {
    id: 'w-1',
    name: 'Keluarga Besar Bapak H. Surya Atmaja',
    attendance: 'Hadir',
    guests: 2,
    message:
      'Selamat menempuh hidup baru Aurelia & Keenan. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah, serta diberkahi kebahagiaan sepanjang masa.',
    createdAt: 'Baru saja',
  },
  {
    id: 'w-2',
    name: 'Clara & Julian Wijaya',
    attendance: 'Hadir',
    guests: 2,
    message:
      'Undangan dengan nuansa Navy Serenity yang sangat anggun! Tidak sabar menyaksikan hari bahagia kalian berdua.',
    createdAt: '2 jam yang lalu',
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
// KOMPONEN ORNAMEN SVG ARTISTIK (MEMOIZED AGAR TIDAK RE-RENDER)
// ============================================================================
const NavySerenityFloralCrest = memo(({ className = 'w-44 h-28' }) => (
  <svg viewBox="0 0 240 130" fill="none" className={className} aria-hidden="true">
    <path
      d="M120 75 C85 70, 50 45, 22 25 M120 75 C155 70, 190 45, 218 25"
      stroke="#A8ADB5"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M120 75 C75 88, 45 95, 15 90 M120 75 C165 88, 195 95, 225 90"
      stroke="#AEBFD6"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <ellipse cx="62" cy="48" rx="14" ry="6" transform="rotate(-25 62 48)" fill="#A8ADB5" opacity="0.85" />
    <ellipse cx="178" cy="48" rx="14" ry="6" transform="rotate(25 178 48)" fill="#A8ADB5" opacity="0.85" />
    <ellipse cx="48" cy="76" rx="12" ry="5" transform="rotate(15 48 76)" fill="#AEBFD6" opacity="0.8" />
    <ellipse cx="192" cy="76" rx="12" ry="5" transform="rotate(-15 192 76)" fill="#AEBFD6" opacity="0.8" />
    <circle cx="120" cy="64" r="28" fill="#101A30" />
    <circle cx="116" cy="61" r="22" fill="#1B2A49" />
    <path
      d="M104 58 C110 44, 130 44, 136 58 C140 72, 120 82, 108 72 C98 64, 108 50, 120 52 C128 54, 130 64, 120 67 C114 68, 113 61, 118 59"
      stroke="#AEBFD6"
      strokeWidth="1.2"
      fill="none"
      opacity="0.85"
    />
    <circle cx="84" cy="70" r="16" fill="#AEBFD6" />
    <path
      d="M76 68 C80 60, 90 60, 92 68 C94 75, 82 78, 78 72"
      stroke="#1B2A49"
      strokeWidth="0.9"
      fill="none"
      opacity="0.65"
    />
    <circle cx="156" cy="70" r="16" fill="#F5F5F5" stroke="#C5CCD6" strokeWidth="1" />
    <path
      d="M148 68 C152 60, 162 60, 164 68 C166 75, 154 78, 150 72"
      stroke="#A8ADB5"
      strokeWidth="1"
      fill="none"
      opacity="0.8"
    />
    <circle cx="38" cy="36" r="2.5" fill="#F5F5F5" stroke="#1B2A49" strokeWidth="0.8" />
    <circle cx="52" cy="28" r="2" fill="#AEBFD6" />
    <circle cx="202" cy="36" r="2.5" fill="#F5F5F5" stroke="#1B2A49" strokeWidth="0.8" />
    <circle cx="188" cy="28" r="2" fill="#AEBFD6" />
    <circle cx="96" cy="36" r="2.2" fill="#C5CCD6" />
    <circle cx="144" cy="36" r="2.2" fill="#AEBFD6" />
  </svg>
));

const BotanicalSprigSvg = memo(({ strokeColor = '#1B2A49' }) => (
  <svg viewBox="0 0 60 90" fill="none" className="w-8 h-12 sm:w-9 sm:h-14" aria-hidden="true">
    <path d="M12 84 C24 62, 34 40, 48 12" stroke={strokeColor} strokeWidth="1.1" strokeLinecap="round" />
    <path d="M20 68 C14 63, 13 55, 22 57 C25 62, 23 66, 20 68 Z" stroke={strokeColor} strokeWidth="0.9" fill="none" />
    <path d="M27 56 C35 55, 39 61, 31 64 C27 62, 26 59, 27 56 Z" stroke={strokeColor} strokeWidth="0.9" fill="none" />
    <path d="M32 45 C25 40, 25 32, 33 35 C36 39, 34 43, 32 45 Z" stroke={strokeColor} strokeWidth="0.9" fill="none" />
    <path d="M38 34 C46 33, 49 39, 41 42 C38 40, 37 37, 38 34 Z" stroke={strokeColor} strokeWidth="0.9" fill="none" />
    <path d="M43 22 C38 17, 39 11, 46 14 C47 18, 45 20, 43 22 Z" stroke={strokeColor} strokeWidth="0.9" fill="none" />
  </svg>
));

const WaxSealStamp = memo(({ monogram = 'A&K', size = 'w-20 h-20' }) => (
  <div className={`relative inline-flex items-center justify-center select-none ${size}`}>
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl" aria-hidden="true">
      <defs>
        <radialGradient id="navyWaxGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#355085" />
          <stop offset="55%" stopColor="#1B2A49" />
          <stop offset="100%" stopColor="#0B1324" />
        </radialGradient>
      </defs>
      <path
        d="M60 6 C74 5, 86 12, 97 21 C108 30, 115 44, 114 59 C113 74, 109 89, 98 99 C87 109, 73 115, 58 114 C43 113, 28 109, 19 97 C10 85, 5 72, 6 57 C7 42, 13 28, 24 18 C35 8, 46 7, 60 6 Z"
        fill="url(#navyWaxGrad)"
      />
      <circle cx="60" cy="60" r="39" fill="none" stroke="#AEBFD6" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.75" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="#0F182B" strokeWidth="2.5" opacity="0.75" />
      <circle cx="60" cy="60" r="33" fill="none" stroke="#C5CCD6" strokeWidth="0.7" opacity="0.55" />
    </svg>
    <span className="absolute font-script text-lg sm:text-xl text-[#F5F5F5] tracking-wider drop-shadow">
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
    <path d="M20 135 H340" stroke="#1B2A49" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.5" />
    <circle cx="85" cy="105" r="28" stroke="#1B2A49" strokeWidth="1.4" />
    <circle cx="85" cy="105" r="24" stroke="#A8ADB5" strokeWidth="0.8" />
    <circle cx="85" cy="105" r="4" fill="#1B2A49" />
    <path d="M85 77 V133 M57 105 H113 M65 85 L105 125 M105 85 L65 125" stroke="#1B2A49" strokeWidth="0.8" opacity="0.65" />
    <circle cx="175" cy="111" r="22" stroke="#1B2A49" strokeWidth="1.4" />
    <circle cx="175" cy="111" r="18" stroke="#A8ADB5" strokeWidth="0.8" />
    <circle cx="175" cy="111" r="3.5" fill="#1B2A49" />
    <path d="M175 89 V133 M153 111 H197 M160 96 L190 126 M190 96 L160 126" stroke="#1B2A49" strokeWidth="0.8" opacity="0.65" />
    <path d="M65 78 C62 46, 85 28, 125 28 C165 28, 182 46, 175 78 C165 96, 85 96, 65 78 Z" fill="#F5F5F5" stroke="#1B2A49" strokeWidth="1.5" />
    <path d="M112 28 L120 18 L125 24 L130 18 L138 28" stroke="#1B2A49" strokeWidth="1.3" fill="none" />
    <path d="M92 42 H152 V68 C152 72, 92 72, 92 68 Z" fill="#FFFFFF" stroke="#1B2A49" strokeWidth="1.1" />
    <path d="M92 42 C105 52, 112 58, 92 68 M152 42 C139 52, 132 58, 152 68" stroke="#AEBFD6" strokeWidth="1.1" />
    <path d="M175 95 C205 95, 225 82, 250 75" stroke="#1B2A49" strokeWidth="1" />
    <path
      d="M245 92 C245 72, 260 62, 278 62 C288 62, 294 46, 302 36 C307 32, 314 38, 312 45 C308 54, 303 65, 300 76 C300 88, 295 95, 288 95 L294 133 M278 95 L273 133 M255 94 L248 133 M262 94 L264 133"
      stroke="#1B2A49"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M42 92 C52 108, 72 112, 125 112 C178 112, 195 100, 208 86" stroke="#AEBFD6" strokeWidth="1.5" fill="none" />
  </svg>
));

// ============================================================================
// KOMPONEN COUNTDOWN MANDIRI (Mencegah Re-Render Seluruh Halaman Setiap Detik)
// ============================================================================
const CountdownTimer = memo(({ isoDate }) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(isoDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);

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
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#C5CCD6] py-3 sm:py-4 px-2 shadow-[0_10px_25px_-5px_rgba(27,42,73,0.08)] relative overflow-hidden group"
        >
          <div className="absolute inset-x-1 top-1 h-[1px] bg-gradient-to-r from-transparent via-[#AEBFD6]/60 to-transparent" />
          <span className="block font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1B2A49] tracking-tight">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="font-sans-refined text-[7px] sm:text-[8px] uppercase tracking-[0.22em] text-[#1B2A49]/70 mt-1 block">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
});

// ============================================================================
// GENERATOR AUDIO AMBIENT ROMANTIS (DENGAN CLEANUP MEMORI)
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

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

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
    gain.gain.exponentialRampToValueAtTime(0.03, now + 0.4);
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
// KOMPONEN SCROLL REVEAL (UNOBSERVE SETELAH MUNCUL AGAR RINGAN DI HP)
// ============================================================================
const RevealOnScroll = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node); // Hemat memori setelah elemen terlihat
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
      className={`transition-all duration-1000 will-change-transform ${ visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7' } ${className}`}
    >
      {children}
    </div>
  );
};

// ============================================================================
// KOMPONEN UTAMA APLIKASI
// ============================================================================
export default function App() {
  const [config, setConfig] = useState(DEFAULT_WEDDING_CONFIG);
  const [envelopeStage, setEnvelopeStage] = useState('closed'); // 'closed' | 'opening' | 'opened'
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [isOpeningTransition, setIsOpeningTransition] = useState(false);
  const [guestName, setGuestName] = useState('Bapak/Ibu/Saudara/i Tamu Kehormatan');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [copiedAccount, setCopiedAccount] = useState(null);

  const [viewportMode, setViewportMode] = useState('responsive');
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('section-cover');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simpan RSVP di localStorage agar tidak hilang saat di-refresh
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('navy_serenity_wishes_v1');
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('guest');
    if (toParam) {
      setGuestName(toParam);
    }
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0.05 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    synthRef.current = new RomanticAmbientSynth();
    return () => {
      if (synthRef.current) synthRef.current.stop();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = envelopeStage !== 'opened' ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [envelopeStage]);
// Mengatur Smooth Loop dari 00:00 (0s) ke 01:06 (66s) dengan efek Fade-In & Fade-Out
  useEffect(() => {
    const audio = htmlAudioRef.current;
    if (!audio || !config.music.audioUrl) return;

    const start = config.music.startTime ?? 0;
    const end = config.music.endTime ?? 66;
    const maxVol = config.music.maxVolume ?? 0.65;
    const fade = config.music.fadeDuration ?? 2.5;

    const handleTimeUpdate = () => {
      const current = audio.currentTime;

      // 1. Jika melewati batas 01:06 (66 detik), kembalikan ke 00:00 secara halus
      if (current >= end || current < start) {
        audio.currentTime = start;
        audio.volume = 0;
        audio.play().catch(() => {});
        return;
      }

      // 2. Efek Smooth Fade-In saat baru mulai dari 00:00
      if (current - start <= fade) {
        const progress = Math.max(0, (current - start) / fade);
        audio.volume = Math.min(maxVol, progress * maxVol);
      }
      // 3. Efek Smooth Fade-Out saat mendekati 01:06 (mulai mengecil di 01:03.5)
      else if (end - current <= fade) {
        const progress = Math.max(0, (end - current) / fade);
        audio.volume = Math.min(maxVol, progress * maxVol);
      }
      // 4. Volume stabil di tengah lagu
      else {
        audio.volume = maxVol;
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
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
        const start = config.music.startTime ?? 0;
        const end = config.music.endTime ?? 66;

        // Pastikan mulai dari rentang 00:00 - 01:06 dan mulai dengan volume lembut
        if (audio.currentTime < start || audio.currentTime >= end) {
          audio.currentTime = start;
        }
        audio.volume = 0.05;
        audio.play().catch(() => {});
      } else if (synthRef.current) {
        synthRef.current.start();
      }
      setIsPlayingMusic(true);
    }
  };

  const handleTriggerEnvelopeOpen = () => {
    if (envelopeStage !== 'closed') return;
    setEnvelopeStage('opening');

    if (!isPlayingMusic) {
      toggleMusic();
    }

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
    if (!isPlayingMusic) {
      toggleMusic();
    }
    setTimeout(() => {
      setIsInvitationOpened(true);
      setIsOpeningTransition(false);
      if (mainContentRef.current) {
        mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 550);
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
        'Selamat berbahagia untuk kedua mempelai, semoga cinta kasih selalu menyertai.',
      createdAt: 'Baru saja',
    };

    const updated = [newEntry, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('navy_serenity_wishes_v1', JSON.stringify(updated));
    } catch {
      // Abaikan jika mode private browser memblokir storage
    }
    setRsvpSubmitted(true);
    setRsvpForm({ name: '', guests: '2', attendance: 'Hadir', message: '' });
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isForcedMobile = viewportMode === 'mobile-preview';

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#1B2A49] selection:bg-[#1B2A49] selection:text-[#F5F5F5] antialiased overflow-x-hidden pb-20 sm:pb-0">
      {config.music.audioUrl && (
        <audio ref={htmlAudioRef} src={config.music.audioUrl} loop preload="none" />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

        .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-refined { font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif; }
        .font-script { font-family: 'Great Vibes', cursive; }

        .bg-whitesmoke-satin {
          background-color: #F5F5F5;
          background-image:
            radial-gradient(ellipse 90% 60% at 20% 15%, rgba(255, 255, 255, 0.98) 0%, transparent 60%),
            radial-gradient(ellipse 75% 50% at 85% 35%, rgba(174, 191, 214, 0.42) 0%, transparent 65%),
            linear-gradient(128deg, #FFFFFF 0%, #E9EDF2 24%, #F9FAFB 47%, #D8E0EB 72%, #F5F5F5 100%);
        }

        .bg-silver-drape {
          background-color: #EEF1F5;
          background-image:
            radial-gradient(circle at 75% 22%, rgba(255, 255, 255, 0.96) 0%, rgba(174, 191, 214, 0.35) 42%, transparent 70%),
            linear-gradient(112deg, #E2E7EE 0%, #F9FAFC 28%, #CFD8E3 52%, #F5F7FA 78%, #DFE5ED 100%);
        }

        .bg-navy-satin {
          background-color: #1B2A49;
          background-image:
            radial-gradient(ellipse 80% 55% at 70% 20%, rgba(56, 84, 138, 0.55) 0%, transparent 65%),
            radial-gradient(ellipse 70% 65% at 20% 75%, rgba(27, 42, 73, 0.85) 0%, transparent 65%),
            linear-gradient(135deg, #0B1221 0%, #243861 28%, #131F38 53%, #1B2A49 78%, #090F1C 100%);
        }

        .bg-fine-paper {
          background-color: #F8F9FA;
          background-image:
            radial-gradient(rgba(27, 42, 73, 0.03) 1px, transparent 0),
            radial-gradient(rgba(174, 191, 214, 0.14) 1px, #F8F9FA 0);
          background-size: 24px 24px;
          background-position: 0 0, 12px 12px;
        }

        .deckle-card {
          box-shadow:
            0 28px 65px -15px rgba(6, 12, 24, 0.78),
            0 0 0 1px rgba(174, 191, 214, 0.5),
            inset 0 0 36px rgba(197, 204, 214, 0.28);
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
          box-shadow: 0 32px 75px -12px rgba(5, 10, 22, 0.82);
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
          STAGE PEMBUKA SURAT 3D INTERAKTIF (SEBELUM MASUK KE UNDANGAN)
      ===================================================================== */}
      {envelopeStage !== 'opened' && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-between py-6 sm:py-10 px-4 overflow-hidden transition-all duration-700 ${
            envelopeStage === 'opening' ? 'bg-[#0B1220]/95' : 'bg-[#0B1220]'
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 35%, rgba(36, 56, 97, 0.8) 0%, rgba(9, 15, 28, 0.99) 78%)',
          }}
        >
          {/* Ambient Glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 65% 40% at 20% 15%, rgba(174, 191, 214, 0.35) 0%, transparent 65%), radial-gradient(ellipse 70% 45% at 85% 85%, rgba(174, 191, 214, 0.25) 0%, transparent 65%)',
            }}
          />

          <div
            className={`relative z-20 text-center transition-all duration-500 ${
              envelopeStage === 'opening' ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#AEBFD6]">
              Personal Wedding Invitation
            </p>
            <h1 className="font-serif-luxury italic text-lg sm:text-2xl text-[#F5F5F5] mt-1">
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
                  : 'opacity-80 animate-float-slow'
              }`}
            >
              <NavySerenityFloralCrest className="w-48 h-28 sm:w-56 sm:h-32" />
            </div>

            {/* Amplop 3D */}
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
                className="absolute inset-0 rounded-sm bg-[#101A30] border border-[#AEBFD6]/45 shadow-[0_32px_85px_rgba(0,0,0,0.88)] overflow-hidden"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 25%, #243861 0%, #131F38 62%, #0B1221 100%)',
                }}
              >
                <div className="absolute inset-2 border border-[#AEBFD6]/25 pointer-events-none" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 opacity-30">
                  <NavySerenityFloralCrest className="w-40 h-24" />
                </div>
              </div>

              {/* Kartu Surat yang Meluncur Naik */}
              <div
                className={`letter-slide-3d absolute left-[6%] right-[6%] top-[7%] bottom-[6%] z-20 bg-fine-paper border border-[#C5CCD6] p-3.5 sm:p-5 flex flex-col items-center justify-between text-center shadow-xl ${
                  envelopeStage === 'opening' ? 'letter-slide-out' : ''
                }`}
              >
                <div className="w-full h-full border border-[#1B2A49]/20 px-3 py-2.5 sm:px-5 sm:py-4 flex flex-col items-center justify-between relative bg-[#F8F9FA]/95">
                  <span className="font-sans-refined text-[7px] sm:text-[8px] uppercase tracking-[0.34em] text-[#1B2A49]/70">
                    The Wedding Of
                  </span>
                  <div className="my-auto py-1">
                    <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#1B2A49] leading-none">
                      {config.couple.brideShort} &amp; {config.couple.groomShort}
                    </h2>
                    <div className="w-14 h-[1px] bg-[#AEBFD6] mx-auto my-2 sm:my-2.5" />
                    <p className="font-serif-luxury italic text-[11px] sm:text-xs text-[#1B2A49]/85 max-w-[230px] mx-auto leading-relaxed">
                      “Kami mengundang Anda untuk menjadi bagian dari hari bahagia penyatuan janji suci kami.”
                    </p>
                  </div>
                  <div className="w-full pt-1.5 border-t border-[#C5CCD6]/70 flex items-center justify-between text-[8px] sm:text-[9px] font-sans-refined uppercase tracking-[0.2em] text-[#1B2A49]">
                    <span>{config.weddingDate.dotDate}</span>
                    <span className="text-[#889BB5]">Navy Serenity</span>
                  </div>
                </div>
              </div>

              {/* Lipatan Samping & Bawah Amplop */}
              <div
                className="pointer-events-none absolute inset-0 z-30"
                style={{
                  background: 'linear-gradient(135deg, #E5E9F0 0%, #F5F5F5 55%, #D5DCE6 100%)',
                  clipPath: 'polygon(0 0, 52% 52%, 0 100%)',
                  filter: 'drop-shadow(2px 0px 4px rgba(13,21,38,0.18))',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 z-30"
                style={{
                  background: 'linear-gradient(-135deg, #E5E9F0 0%, #F5F5F5 55%, #D5DCE6 100%)',
                  clipPath: 'polygon(100% 0, 48% 52%, 100% 100%)',
                  filter: 'drop-shadow(-2px 0px 4px rgba(13,21,38,0.18))',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-end pb-3 sm:pb-4 px-4"
                style={{
                  background: 'linear-gradient(to top, #EDEFF3 0%, #F9FAFB 68%, #DFE5EE 100%)',
                  clipPath: 'polygon(0 100%, 50% 44%, 100% 100%)',
                  boxShadow: 'inset 0 -8px 25px rgba(27,42,73,0.08)',
                }}
              >
                <div className="bg-[#FFFFFF]/95 border border-[#C5CCD6] px-4 sm:px-6 py-2 sm:py-2.5 shadow-sm text-center max-w-[85%]">
                  <p className="font-sans-refined text-[7px] sm:text-[8px] uppercase tracking-[0.26em] text-[#1B2A49]/70">
                    Kepada Yth.
                  </p>
                  <p className="font-serif-luxury text-xs sm:text-sm md:text-base font-semibold text-[#1B2A49] truncate">
                    {guestName}
                  </p>
                </div>
              </div>
              <svg viewBox="0 0 400 300" className="pointer-events-none absolute inset-0 w-full h-full z-30" preserveAspectRatio="none">
                <path d="M0 300 L200 132 L400 300" stroke="#AEBFD6" strokeWidth="1.2" fill="none" opacity="0.75" />
                <path d="M0 0 L200 156 L0 300 M400 0 L200 156 L400 300" stroke="#C5CCD6" strokeWidth="0.9" fill="none" opacity="0.6" />
              </svg>

              {/* Flap Atas 3D */}
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
                        ? 'linear-gradient(to bottom, #1B2A49 0%, #101A30 100%)'
                        : 'linear-gradient(180deg, #FFFFFF 0%, #EEF1F6 70%, #DCE3ED 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    boxShadow: '0 12px 25px rgba(10, 16, 30, 0.28)',
                  }}
                >
                  <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M14 6 L200 168 L386 6"
                      stroke={envelopeStage === 'opening' ? '#AEBFD6' : '#1B2A49'}
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      fill="none"
                      opacity="0.45"
                    />
                  </svg>
                </div>
              </div>

              {/* Segel Lilin */}
              <div
                className={`absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
                  envelopeStage === 'opening'
                    ? 'scale-125 opacity-0 pointer-events-none'
                    : 'scale-100 opacity-100 group-hover:scale-105'
                }`}
              >
                <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#AEBFD6] animate-pulse-ring" />
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
                className="btn-luxury-shimmer min-h-[46px] inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 rounded-full bg-[#F5F5F5] text-[#1B2A49] font-sans-refined text-[10px] sm:text-xs uppercase tracking-[0.26em] font-medium shadow-[0_12px_32px_rgba(0,0,0,0.55)] border border-[#AEBFD6] hover:bg-[#AEBFD6] hover:text-[#101A30] transition-all active:scale-95"
              >
                <MailOpen className="w-4 h-4 text-[#1B2A49]" />
                <span>Buka Surat Undangan</span>
              </button>
              <p className="font-serif-luxury italic text-xs sm:text-sm text-[#AEBFD6]/85 mt-3">
                Sentuh segel lilin atau tombol di atas untuk membuka amplop
              </p>
            </div>
          </div>

          <div
            className={`relative z-20 text-center transition-opacity duration-500 ${
              envelopeStage === 'opening' ? 'opacity-0' : 'opacity-80'
            }`}
          >
            <p className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#C5CCD6]/70">
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
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#1B2A49]/90 backdrop-blur-md border border-[#AEBFD6]/45 text-[#F5F5F5] font-sans-refined text-[9px] sm:text-[10px] tracking-wider uppercase hover:bg-[#101A30] transition-colors shadow-lg"
          >
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#AEBFD6]" />
            <span>Ulangi Surat</span>
          </button>
        )}
        <button
          onClick={() =>
            setViewportMode((prev) => (prev === 'responsive' ? 'mobile-preview' : 'responsive'))
          }
          className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1B2A49]/90 backdrop-blur-md border border-[#AEBFD6]/40 text-[#F5F5F5] font-sans-refined text-[10px] tracking-wider uppercase hover:bg-[#101A30] transition-colors shadow-lg"
        >
          {viewportMode === 'responsive' ? (
            <>
              <Smartphone className="w-3.5 h-3.5 text-[#AEBFD6]" />
              <span>Simulasi HP (430px)</span>
            </>
          ) : (
            <>
              <Monitor className="w-3.5 h-3.5 text-[#AEBFD6]" />
              <span>Mode Responsif</span>
            </>
          )}
        </button>
        <button
          onClick={() => setIsCustomizeOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#1B2A49]/95 backdrop-blur-md border border-[#AEBFD6]/50 text-[#F5F5F5] font-sans-refined text-[10px] sm:text-[11px] tracking-wider uppercase hover:bg-[#101A30] transition-colors shadow-lg"
        >
          <Sliders className="w-3.5 h-3.5 text-[#AEBFD6]" />
          <span>Data Undangan</span>
        </button>
      </div>

      {/* =====================================================================
          WRAPPER UTAMA UNDANGAN
      ===================================================================== */}
      <div
        className={`mx-auto transition-all duration-500 ${
          isForcedMobile
            ? 'max-w-[430px] shadow-[0_0_100px_rgba(0,0,0,0.85)] border-x border-[#AEBFD6]/25 my-0'
            : 'w-full max-w-[1140px] shadow-[0_0_90px_rgba(0,0,0,0.75)]'
        }`}
      >
        {/* SECTION 1 — HERO STATIONERY COLLAGE */}
        <header
          id="section-cover"
          className={`relative min-h-screen bg-whitesmoke-satin flex flex-col items-center justify-between py-10 sm:py-14 px-4 sm:px-8 md:px-14 overflow-hidden transition-all duration-700 ${
            isOpeningTransition ? 'scale-[1.02] opacity-90' : 'scale-100 opacity-100'
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.95), transparent 45%), radial-gradient(circle at 85% 80%, rgba(174,191,214,0.45), transparent 55%)',
            }}
          />
          <div className="relative z-10 text-center pt-4 sm:pt-0">
            <p className="font-sans-refined text-[9px] sm:text-[11px] uppercase tracking-[0.34em] text-[#1B2A49]/80">
              Navy Serenity • Wedding Stationery
            </p>
          </div>

          <div
            className={`relative z-10 w-full ${
              isForcedMobile ? 'max-w-[340px]' : 'max-w-[330px] sm:max-w-[400px] md:max-w-[460px]'
            } my-4 sm:my-6 flex flex-col items-center`}
          >
            <div className="relative z-30 -mb-5 sm:-mb-6 animate-float-slow">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#F5F5F5] border border-[#C5CCD6] shadow-md flex items-center justify-center rotate-45 overflow-hidden">
                <div className="-rotate-45">
                  <NavySerenityFloralCrest className="w-28 h-20 sm:w-32 sm:h-24" />
                </div>
              </div>
            </div>

            <div className="relative w-full pt-6 sm:pt-8 pb-4 sm:pb-6 px-1 sm:px-2">
              <div className="relative z-10 ml-2 sm:ml-4 w-36 sm:w-44 bg-[#F5F5F5] border border-[#C5CCD6] p-2.5 sm:p-3 shadow-md -rotate-3">
                <p className="font-sans-refined text-[7px] sm:text-[8px] tracking-[0.25em] uppercase text-[#1B2A49]">
                  Save Our Date
                </p>
                <p className="font-serif-luxury italic text-[11px] sm:text-xs text-[#1B2A49]/80 mt-0.5">
                  European Elegance
                </p>
              </div>

              <div className="relative z-20 grid grid-cols-12 gap-0 items-center -mt-2">
                <div className="col-span-6 bg-[#1B2A49] text-[#F5F5F5] p-3.5 sm:p-5 md:p-6 shadow-xl border border-[#101A30] -rotate-2 relative overflow-hidden">
                  <div className="border border-[#AEBFD6]/35 p-2.5 sm:p-3.5 text-center">
                    <p className="font-sans-refined text-[7px] sm:text-[8px] uppercase tracking-[0.24em] text-[#AEBFD6]">
                      The Wedding Of
                    </p>
                    <h1 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-normal tracking-wide mt-1.5 sm:mt-2 leading-tight text-[#F5F5F5]">
                      {config.couple.brideShort}
                    </h1>
                    <p className="font-script text-lg sm:text-xl text-[#AEBFD6] my-0.5">&amp;</p>
                    <h1 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-normal tracking-wide leading-tight text-[#F5F5F5]">
                      {config.couple.groomShort}
                    </h1>
                    <div className="w-6 sm:w-8 h-[1px] bg-[#AEBFD6]/50 mx-auto my-2 sm:my-3" />
                    <p className="font-sans-refined text-[7px] sm:text-[8px] tracking-[0.2em] text-[#C5CCD6]">
                      {config.weddingDate.dotDate}
                    </p>
                  </div>
                </div>

                <div className="col-span-6 -ml-2 sm:-ml-3 mt-5 sm:mt-6 bg-fine-paper text-[#1B2A49] p-3.5 sm:p-5 md:p-6 shadow-xl border border-[#C5CCD6] rotate-2">
                  <div className="flex justify-end -mt-1 -mr-1 mb-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#1B2A49]" />
                  </div>
                  <p className="font-sans-refined text-[7px] sm:text-[8px] uppercase tracking-[0.22em] text-[#1B2A49]/75">
                    We Invite You
                  </p>
                  <p className="font-script text-xl sm:text-2xl md:text-3xl text-[#1B2A49] mt-1">
                    {config.couple.brideShort} &amp; {config.couple.groomShort}
                  </p>
                  <p className="font-serif-luxury text-[10px] sm:text-xs leading-relaxed text-[#1B2A49]/80 mt-1.5 sm:mt-2">
                    Untuk hadir merayakan ikatan janji suci pernikahan kami.
                  </p>
                  <p className="font-sans-refined text-[8px] sm:text-[9px] font-medium tracking-[0.15em] text-[#1B2A49] mt-2.5 sm:mt-3 uppercase">
                    {config.weddingDate.displayDate}
                  </p>
                </div>
              </div>

              <div className="relative z-30 flex items-center justify-center gap-2 sm:gap-3 -mt-2 sm:-mt-3">
                <div className="bg-[#F5F5F5] border border-[#C5CCD6] px-3 sm:px-4 py-2 sm:py-3 shadow-md -rotate-2 text-center">
                  <span className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#1B2A49] font-light tracking-tighter">
                    24
                  </span>
                  <span className="block font-sans-refined text-[7px] sm:text-[8px] uppercase tracking-[0.22em] text-[#1B2A49]/80">
                    Oktober 2026
                  </span>
                </div>
                <WaxSealStamp
                  monogram={config.couple.monogram}
                  size="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
                <div className="bg-[#1B2A49] text-[#F5F5F5] px-3 sm:px-3.5 py-2.5 sm:py-3 shadow-md rotate-3 rounded-t-full border border-[#AEBFD6]/45 text-center">
                  <span className="block font-sans-refined text-[6px] sm:text-[7px] uppercase tracking-[0.2em] text-[#AEBFD6]">
                    RSVP
                  </span>
                  <span className="font-serif-luxury italic text-[11px] sm:text-xs">Cordially</span>
                </div>
              </div>
            </div>

            <div className="mt-2 sm:mt-3 w-full max-w-[300px] sm:max-w-[340px] bg-[#FFFFFF]/95 backdrop-blur-sm border border-[#C5CCD6] px-4 sm:px-6 py-3.5 sm:py-4 text-center shadow-sm">
              <p className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.26em] text-[#1B2A49]/75">
                Kepada Yth. Bapak / Ibu / Saudara / i
              </p>
              <p className="font-serif-luxury text-base sm:text-lg md:text-xl font-semibold text-[#1B2A49] mt-1 break-words">
                {guestName}
              </p>
              <p className="font-serif-luxury italic text-[11px] sm:text-xs text-[#A8ADB5] mt-0.5">
                Di Tempat
              </p>
            </div>

            <button
              onClick={handleOpenInvitation}
              className="btn-luxury-shimmer mt-5 sm:mt-6 min-h-[46px] group relative inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-3.5 bg-[#1B2A49] text-[#F5F5F5] font-sans-refined text-[11px] sm:text-xs uppercase tracking-[0.26em] shadow-xl border border-[#101A30] hover:bg-[#101A30] transition-all duration-300 active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#AEBFD6] transition-transform group-hover:scale-110" />
              <span>Open Invitation</span>
            </button>

            {isInvitationOpened && (
              <button
                onClick={() => scrollToSection('section-welcome')}
                className="mt-4 inline-flex flex-col items-center text-[#1B2A49]/75 hover:text-[#1B2A49] transition-colors"
              >
                <span className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.25em]">
                  Scroll Story
                </span>
                <ChevronDown className="w-4 h-4 mt-1 animate-bounce" />
              </button>
            )}
          </div>
          <div className="relative z-10 text-center pb-4 sm:pb-0">
            <p className="font-serif-luxury italic text-xs text-[#1B2A49]/65">
              {config.couple.brideShort} &amp; {config.couple.groomShort} —{' '}
              {config.weddingDate.dotDate}
            </p>
          </div>
        </header>

        {/* SECTION 2 — CINEMATIC WELCOME */}
        <section
          id="section-welcome"
          ref={mainContentRef}
          className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-10 md:px-16 bg-[#0B1221] overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(27, 42, 73, 0.72) 0%, rgba(9, 15, 28, 0.98) 75%)',
          }}
        >
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-10 sm:w-24 md:w-36 opacity-90"
            style={{
              background:
                'repeating-linear-gradient(90deg, #0F182B 0px, #1B2A49 18px, #0A101E 36px, #243861 54px)',
              clipPath: 'polygon(0 0, 100% 0, 62% 55%, 88% 100%, 0 100%)',
              boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.8)',
            }}
          />
          <div
            className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 sm:w-24 md:w-36 opacity-90"
            style={{
              background:
                'repeating-linear-gradient(-90deg, #0F182B 0px, #1B2A49 18px, #0A101E 36px, #243861 54px)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12% 100%, 38% 55%)',
              boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.8)',
            }}
          />
          <div className="pointer-events-none absolute left-1 sm:left-6 md:left-8 top-[54%] w-7 sm:w-14 md:w-16 h-2 sm:h-2.5 rounded-full bg-gradient-to-r from-[#A8ADB5] via-[#F5F5F5] to-[#AEBFD6] shadow-md" />
          <div className="pointer-events-none absolute right-1 sm:right-6 md:right-8 top-[54%] w-7 sm:w-14 md:w-16 h-2 sm:h-2.5 rounded-full bg-gradient-to-l from-[#A8ADB5] via-[#F5F5F5] to-[#AEBFD6] shadow-md" />

          <RevealOnScroll className="relative z-10 w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px]">
            <div className="bg-fine-paper deckle-card px-5 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16 text-center relative border-4 border-double border-[#C5CCD6]">
              <div className="w-12 h-12 mx-auto mb-3 sm:mb-4 text-[#1B2A49] flex items-center justify-center">
                <span className="font-script text-2xl sm:text-3xl">{config.couple.monogram}</span>
              </div>
              <p className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#1B2A49] mb-3 sm:mb-4">
                {config.welcome.salutation}
              </p>
              <p className="font-serif-luxury text-xs sm:text-sm md:text-[15px] leading-[1.85] sm:leading-[1.9] text-[#1B2A49]/90 mb-5 sm:mb-6">
                {config.welcome.openingText}
              </p>
              <div className="my-5 sm:my-7 py-4 sm:py-5 border-y border-[#C5CCD6]">
                <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#1B2A49]">
                  {config.couple.brideShort} &amp; {config.couple.groomShort}
                </h2>
                <p className="font-sans-refined text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-[#A8ADB5] mt-2">
                  {config.weddingDate.displayDate}
                </p>
              </div>
              <blockquote className="font-serif-luxury italic text-xs sm:text-sm leading-[1.8] text-[#1B2A49]/85 px-1 sm:px-3">
                {config.welcome.quote}
              </blockquote>
              <p className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#1B2A49] mt-2 mb-5 sm:mb-6">
                — {config.welcome.quoteSource} —
              </p>
              <p className="font-serif-luxury text-xs sm:text-sm leading-[1.8] text-[#1B2A49]/75">
                {config.welcome.gratitude}
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* SECTION 3 — COUPLE & COUNTDOWN */}
        <section
          id="section-couple"
          className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-14 bg-silver-drape overflow-hidden"
        >
          <div className="max-w-[780px] mx-auto text-center">
            <RevealOnScroll>
              <p className="font-script text-3xl sm:text-4xl md:text-5xl text-[#1B2A49]">
                Menghitung Hari Bahagia
              </p>
              <CountdownTimer isoDate={config.weddingDate.isoDate} />

              <div className="mb-16 sm:mb-20 bg-[#F5F5F5]/85 backdrop-blur-md border border-[#C5CCD6] p-5 sm:p-8 md:p-10 shadow-lg max-w-[680px] mx-auto">
                <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#1B2A49]/70">
                  D R E S S &nbsp; C O D E &nbsp; P A L E T T E
                </p>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#1B2A49] mt-1">
                  Navy <span className="text-[#889BB5] font-light">Serenity</span>
                </h3>
                <p className="font-serif-luxury italic text-xs sm:text-sm text-[#1B2A49]/75 mt-1">
                  {config.dressCode.subtitle}
                </p>
                <div
                  className={`grid ${
                    isForcedMobile ? 'grid-cols-3' : 'grid-cols-3 sm:grid-cols-5'
                  } gap-3 sm:gap-4 justify-items-center my-6 sm:my-8`}
                >
                  {config.dressCode.colors.map((c, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className="relative w-16 h-24 sm:w-20 sm:h-28 rounded-full p-1 border border-[#C5CCD6] shadow-md flex items-center justify-center overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                        style={{ backgroundColor: c.hex }}
                      >
                        <div className="w-full h-full rounded-full border border-white/60 relative overflow-hidden">
                          <div className="absolute -bottom-1 right-1 opacity-85">
                            <BotanicalSprigSvg
                              strokeColor={c.textLight ? '#C5CCD6' : '#1B2A49'}
                            />
                          </div>
                        </div>
                      </div>
                      <span className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#1B2A49] mt-2">
                        {c.name}
                      </span>
                      <span className="font-sans-refined text-[8px] sm:text-[9px] tracking-widest uppercase text-[#A8ADB5]">
                        {c.hex}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="font-serif-luxury text-xs sm:text-sm text-[#1B2A49]/80 max-w-md mx-auto leading-relaxed">
                  {config.dressCode.note}
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#1B2A49]/75">
                The Bride &amp; The Groom
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1B2A49] mt-1 mb-10 sm:mb-12">
                Kedua Mempelai
              </h2>
            </RevealOnScroll>

            <div
              className={`grid grid-cols-1 ${
                isForcedMobile ? '' : 'md:grid-cols-2'
              } gap-8 sm:gap-10 items-stretch justify-items-center`}
            >
              <RevealOnScroll className="w-full max-w-[340px] sm:max-w-[360px]">
                <div className="h-full bg-[#1B2A49] text-[#F5F5F5] rounded-t-[175px] p-4 sm:p-5 shadow-2xl border border-[#101A30]">
                  <div className="h-full rounded-t-[160px] border border-[#AEBFD6]/45 pt-8 pb-7 px-4 sm:px-6 flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center">
                      <span className="font-sans-refined text-[8px] uppercase tracking-[0.3em] text-[#AEBFD6] mb-4">
                        The Bride
                      </span>
                      <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-t-full overflow-hidden border-2 border-[#AEBFD6]/80 shadow-lg mb-5 bg-[#101A30]">
                        <img
                          src={config.couple.bridePhoto}
                          alt={config.couple.brideFull}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <h3 className="font-script text-3xl sm:text-4xl text-[#AEBFD6]">
                        {config.couple.brideShort}
                      </h3>
                      <p className="font-serif-luxury text-lg sm:text-xl font-medium tracking-wide text-[#F5F5F5] mt-1">
                        {config.couple.brideFull}
                      </p>
                      <p className="font-serif-luxury italic text-xs sm:text-sm text-[#C5CCD6] mt-3 leading-relaxed">
                        {config.couple.brideBio}
                      </p>
                      <div className="w-10 h-[1px] bg-[#AEBFD6]/40 my-4" />
                      <p className="font-serif-luxury text-xs sm:text-sm text-[#F5F5F5]/90 leading-relaxed">
                        {config.couple.brideParents}
                      </p>
                    </div>
                    <a
                      href={`https://instagram.com/${config.couple.brideInstagram.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 min-h-[38px] inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#AEBFD6]/50 text-[10px] font-sans-refined tracking-widest uppercase text-[#AEBFD6] hover:bg-[#AEBFD6] hover:text-[#1B2A49] transition-colors"
                    >
                      <InstagramIcon className="w-3 h-3" />
                      <span>{config.couple.brideInstagram}</span>
                    </a>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll className="w-full max-w-[340px] sm:max-w-[360px]" delay={120}>
                <div className="h-full bg-[#1B2A49] text-[#F5F5F5] rounded-b-[175px] md:rounded-b-none md:rounded-t-[175px] p-4 sm:p-5 shadow-2xl border border-[#101A30]">
                  <div className="h-full rounded-b-[160px] md:rounded-b-none md:rounded-t-[160px] border border-[#AEBFD6]/45 pt-7 pb-10 md:pt-8 md:pb-7 px-4 sm:px-6 flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center">
                      <span className="font-sans-refined text-[8px] uppercase tracking-[0.3em] text-[#AEBFD6] mb-4">
                        The Groom
                      </span>
                      <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-t-full overflow-hidden border-2 border-[#AEBFD6]/80 shadow-lg mb-5 bg-[#101A30]">
                        <img
                          src={config.couple.groomPhoto}
                          alt={config.couple.groomFull}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <h3 className="font-script text-3xl sm:text-4xl text-[#AEBFD6]">
                        {config.couple.groomShort}
                      </h3>
                      <p className="font-serif-luxury text-lg sm:text-xl font-medium tracking-wide text-[#F5F5F5] mt-1">
                        {config.couple.groomFull}
                      </p>
                      <p className="font-serif-luxury italic text-xs sm:text-sm text-[#C5CCD6] mt-3 leading-relaxed">
                        {config.couple.groomBio}
                      </p>
                      <div className="w-10 h-[1px] bg-[#AEBFD6]/40 my-4" />
                      <p className="font-serif-luxury text-xs sm:text-sm text-[#F5F5F5]/90 leading-relaxed">
                        {config.couple.groomParents}
                      </p>
                    </div>
                    <a
                      href={`https://instagram.com/${config.couple.groomInstagram.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 min-h-[38px] inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#AEBFD6]/50 text-[10px] font-sans-refined tracking-widest uppercase text-[#AEBFD6] hover:bg-[#AEBFD6] hover:text-[#1B2A49] transition-colors"
                    >
                      <InstagramIcon className="w-3 h-3" />
                      <span>{config.couple.groomInstagram}</span>
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION 4 — LOVE STORY */}
        <section
          id="section-story"
          className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-10 md:px-14 bg-navy-satin text-[#F5F5F5] overflow-hidden"
        >
          <div className="max-w-[680px] mx-auto">
            <RevealOnScroll className="text-center mb-12 sm:mb-16">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="w-10 h-[1px] bg-[#AEBFD6]/50" />
                <DoveOrnament className="w-6 h-6 text-[#F5F5F5]" />
                <span className="w-10 h-[1px] bg-[#AEBFD6]/50" />
              </div>
              <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#AEBFD6]">
                A Journey Written in Time
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#F5F5F5] mt-1">
                Our Love Story
              </h2>
            </RevealOnScroll>

            <div className="relative space-y-10 sm:space-y-14">
              <div className="pointer-events-none absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#AEBFD6]/45 to-transparent" />
              {config.loveStory.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <RevealOnScroll key={index} delay={index * 70}>
                    <div
                      className={`relative flex flex-col ${
                        isForcedMobile
                          ? 'items-center'
                          : isEven
                          ? 'sm:flex-row items-center'
                          : 'sm:flex-row-reverse items-center'
                      } gap-4 sm:gap-6`}
                    >
                      <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1.5 bg-[#101A30] border border-[#AEBFD6] shadow-xl shrink-0">
                        <img
                          src={item.photo}
                          alt={item.stage}
                          className="w-full h-full object-cover rounded-full"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1B2A49] border border-[#AEBFD6]/60 px-2.5 py-0.5 text-[8px] font-sans-refined tracking-widest uppercase text-[#AEBFD6] whitespace-nowrap">
                          0{index + 1}
                        </span>
                      </div>
                      <div
                        className={`w-full flex-1 bg-[#0F182B]/80 backdrop-blur-sm border border-[#AEBFD6]/30 p-4 sm:p-6 text-center ${
                          isForcedMobile ? '' : isEven ? 'sm:text-left' : 'sm:text-right'
                        }`}
                      >
                        <span className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#AEBFD6]">
                          {item.date}
                        </span>
                        <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F5F5F5] mt-0.5">
                          {item.stage}
                        </h3>
                        <p className="font-serif-luxury text-xs sm:text-sm text-[#C5CCD6] leading-relaxed mt-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>

            <RevealOnScroll className="mt-16 sm:mt-20 flex flex-col items-center">
              <div className="w-full max-w-[300px] sm:max-w-[330px] bg-fine-paper text-[#1B2A49] rounded-t-[160px] p-4 shadow-2xl border border-[#C5CCD6]">
                <div className="rounded-t-[146px] border border-[#AEBFD6] pt-8 pb-7 px-5 sm:px-6 text-center">
                  <span className="font-serif-luxury text-4xl leading-none text-[#1B2A49]">“</span>
                  <p className="font-serif-luxury italic text-xs sm:text-sm leading-[1.85] text-[#1B2A49]/85 -mt-2">
                    Cinta sejati bukanlah tentang menemukan seseorang yang sempurna, melainkan
                    belajar melihat ketidaksempurnaan dengan cara yang paling indah.
                  </p>
                  <p className="font-script text-2xl text-[#1B2A49] mt-4">
                    {config.couple.brideShort} &amp; {config.couple.groomShort}
                  </p>
                </div>
              </div>
              <div className="w-[1.5px] h-8 bg-[#AEBFD6]" />
              <div className="relative w-full max-w-[290px] sm:max-w-[310px] bg-[#F5F5F5] p-3.5 pb-8 shadow-2xl border border-[#C5CCD6]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1B2A49] border border-[#AEBFD6] shadow-md flex items-center justify-center">
                  <Heart className="w-3 h-3 text-[#F5F5F5] fill-current" />
                </div>
                <div className="aspect-[4/5] overflow-hidden bg-[#101A30]">
                  <img
                    src={config.loveStory[4]?.photo}
                    alt="Forever Begins"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="font-script text-2xl text-center text-[#1B2A49] mt-4">
                  Forever Begins Here
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 5 — GALLERY */}
        <section
          id="section-gallery"
          className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-10 md:px-14 bg-fine-paper text-[#1B2A49] border-t border-[#C5CCD6]"
        >
          <div className="max-w-[820px] mx-auto">
            <RevealOnScroll className="text-center mb-12 sm:mb-14">
              <NavySerenityFloralCrest className="w-36 h-20 mx-auto -mb-2" />
              <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#1B2A49]/75">
                Fine-Art Prewedding Editorial
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1B2A49] mt-1">
                Potret Kebersamaan
              </h2>
              <p className="font-serif-luxury italic text-xs sm:text-sm text-[#A8ADB5] mt-2">
                Ketuk foto untuk melihat dalam tampilan penuh
              </p>
            </RevealOnScroll>

            <div
              className={`grid grid-cols-1 ${
                isForcedMobile ? '' : 'sm:grid-cols-12'
              } gap-6 sm:gap-8 items-center mb-10 sm:mb-14`}
            >
              <RevealOnScroll className={isForcedMobile ? '' : 'sm:col-span-6'}>
                <div
                  onClick={() => setSelectedPhoto(config.gallery[0])}
                  className="group cursor-pointer bg-[#EEF1F5] p-3 sm:p-4 border border-[#C5CCD6] shadow-md"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={config.gallery[0].url}
                      alt={config.gallery[0].caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-serif-luxury italic text-xs sm:text-sm text-[#1B2A49]">
                      {config.gallery[0].caption}
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#1B2A49]/60" />
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll
                className={isForcedMobile ? '' : 'sm:col-span-6 sm:mt-12'}
                delay={120}
              >
                <div
                  onClick={() => setSelectedPhoto(config.gallery[1])}
                  className="group cursor-pointer bg-[#FFFFFF] p-4 sm:p-7 border border-[#C5CCD6] shadow-lg"
                >
                  <p className="font-sans-refined text-[8px] uppercase tracking-[0.3em] text-[#1B2A49]/70 mb-3">
                    Editorial Note No. 02
                  </p>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={config.gallery[1].url}
                      alt={config.gallery[1].caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="font-serif-luxury italic text-xs sm:text-sm text-[#1B2A49] mt-3 text-right">
                    {config.gallery[1].caption}
                  </p>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll className="mb-10 sm:mb-14">
              <div
                onClick={() => setSelectedPhoto(config.gallery[2])}
                className="group cursor-pointer relative overflow-hidden border border-[#C5CCD6] shadow-xl"
              >
                <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#1B2A49]">
                  <img
                    src={config.gallery[2].url}
                    alt={config.gallery[2].caption}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="bg-[#FFFFFF] px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between border-t border-[#C5CCD6]">
                  <span className="font-serif-luxury italic text-xs sm:text-sm text-[#1B2A49]">
                    {config.gallery[2].caption}
                  </span>
                  <span className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#1B2A49]/70">
                    Full Frame
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            <div
              className={`grid grid-cols-1 ${
                isForcedMobile ? '' : 'sm:grid-cols-12'
              } gap-6 sm:gap-8 items-start`}
            >
              <RevealOnScroll className={isForcedMobile ? '' : 'sm:col-span-5'}>
                <div
                  onClick={() => setSelectedPhoto(config.gallery[3])}
                  className="group cursor-pointer bg-[#FFFFFF] p-4 pb-8 sm:pb-10 border border-[#C5CCD6] shadow-lg"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={config.gallery[3].url}
                      alt={config.gallery[3].caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="font-script text-2xl text-[#1B2A49] text-center mt-4">
                    {config.gallery[3].caption}
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll className={isForcedMobile ? '' : 'sm:col-span-7'} delay={140}>
                <div
                  onClick={() => setSelectedPhoto(config.gallery[4])}
                  className="group cursor-pointer bg-[#EEF1F5] px-5 py-7 sm:px-10 sm:py-10 border border-[#C5CCD6] shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4 sm:mb-5">
                    <img
                      src={config.gallery[4].url}
                      alt={config.gallery[4].caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="font-sans-refined text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#1B2A49]">
                    {config.gallery[4].caption}
                  </p>
                  <p className="font-serif-luxury italic text-xs sm:text-sm text-[#1B2A49]/80 mt-1 leading-relaxed">
                    “Setiap bingkai menyimpan doa dan ketulusan langkah kami menuju hari penyatuan
                    janji suci.”
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION 6 — EVENTS */}
        <section
          id="section-events"
          className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-10 md:px-14 bg-[#EEF1F5] text-[#1B2A49] overflow-hidden border-t border-[#C5CCD6]"
        >
          <div className="relative z-10 max-w-[700px] mx-auto">
            <RevealOnScroll className="text-center mb-10 sm:mb-14">
              <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#1B2A49]/75">
                Wedding Schedule &amp; Venue
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl tracking-wide text-[#1B2A49] mt-1">
                SAVE THE DATE
              </h2>
              <div className="w-16 h-[1px] bg-[#1B2A49]/35 mx-auto mt-3" />
            </RevealOnScroll>

            <div
              className={`relative grid grid-cols-1 ${
                isForcedMobile ? '' : 'md:grid-cols-2'
              } gap-6 sm:gap-8`}
            >
              {[
                { badge: 'Sacred Ceremony', data: config.events.akad, delay: 0 },
                { badge: 'Wedding Reception', data: config.events.resepsi, delay: 140 },
              ].map((ev, i) => (
                <RevealOnScroll key={i} delay={ev.delay}>
                  <div className="h-full bg-[#F8F9FA] border border-[#C5CCD6] p-6 sm:p-8 shadow-lg text-center flex flex-col justify-between relative">
                    <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#AEBFD6]/45 pointer-events-none" />
                    <div>
                      <span className="inline-block font-sans-refined text-[8px] uppercase tracking-[0.3em] text-[#1B2A49] bg-[#EEF1F5] px-3 py-1 border border-[#C5CCD6]">
                        {ev.badge}
                      </span>
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1B2A49] mt-4">
                        {ev.data.title}
                      </h3>
                      <div className="w-10 h-[1px] bg-[#AEBFD6] mx-auto my-4" />
                      <div className="space-y-2 text-xs sm:text-sm font-serif-luxury">
                        <p className="flex items-center justify-center gap-2 text-[#1B2A49] font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-[#1B2A49]" />
                          <span>{ev.data.dayDate}</span>
                        </p>
                        <p className="flex items-center justify-center gap-2 text-[#1B2A49]/80">
                          <Clock className="w-3.5 h-3.5 text-[#1B2A49]" />
                          <span>{ev.data.time}</span>
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-[#C5CCD6]">
                        <p className="font-serif-luxury text-base font-semibold text-[#1B2A49]">
                          {ev.data.venueName}
                        </p>
                        <p className="font-serif-luxury text-xs sm:text-sm text-[#1B2A49]/75 mt-1 leading-relaxed">
                          {ev.data.address}
                        </p>
                      </div>
                    </div>
                    <div className="mt-7">
                      <a
                        href={ev.data.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="min-h-[44px] inline-flex items-center justify-center gap-2 w-full py-2.5 px-5 bg-[#1B2A49] text-[#F5F5F5] font-sans-refined text-[10px] uppercase tracking-[0.25em] hover:bg-[#101A30] transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#AEBFD6]" />
                        <span>View Location</span>
                      </a>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7 — OFFICIAL CARD */}
        <section
          id="section-card"
          className="relative py-16 sm:py-24 md:py-28 px-4 sm:px-10 md:px-14 bg-[#E4E9F0] text-[#1B2A49] overflow-hidden"
        >
          <RevealOnScroll className="max-w-[520px] mx-auto">
            <div className="relative bg-fine-paper border border-[#C5CCD6] p-5 sm:p-10 md:p-12 shadow-2xl text-center">
              <div className="border border-[#1B2A49]/25 p-5 sm:p-8">
                <p className="font-sans-refined text-[8px] uppercase tracking-[0.35em] text-[#1B2A49]/75">
                  Official Printed Invitation
                </p>
                <div className="my-5 flex justify-center">
                  <WaxSealStamp monogram={config.couple.monogram} size="w-20 h-20 sm:w-24 sm:h-24" />
                </div>
                <p className="font-serif-luxury italic text-xs sm:text-sm text-[#1B2A49]/80 leading-relaxed">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
                  berkenan hadir untuk memberikan doa restu kepada kedua mempelai:
                </p>
                <div className="my-5 sm:my-6">
                  <h3 className="font-serif-luxury text-lg sm:text-2xl font-semibold text-[#1B2A49]">
                    {config.couple.brideFull}
                  </h3>
                  <p className="font-script text-2xl text-[#A8ADB5] my-1">&amp;</p>
                  <h3 className="font-serif-luxury text-lg sm:text-2xl font-semibold text-[#1B2A49]">
                    {config.couple.groomFull}
                  </h3>
                </div>
                <div className="w-16 h-[1px] bg-[#AEBFD6] mx-auto my-4" />
                <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#1B2A49] font-medium">
                  {config.weddingDate.displayDate}
                </p>
                <p className="font-serif-luxury text-xs sm:text-sm text-[#1B2A49]/75 mt-1">
                  {config.events.resepsi.venueName}
                </p>
                <div className="mt-6 sm:mt-7">
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      config.weddingDate.calendarTitle
                    )}&details=${encodeURIComponent( config.weddingDate.calendarDetails )}&location=${encodeURIComponent(config.events.resepsi.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[42px] inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#1B2A49] text-[#1B2A49] font-sans-refined text-[9px] uppercase tracking-[0.25em] hover:bg-[#1B2A49] hover:text-[#F5F5F5] transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Save to Calendar</span>
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* SECTION 8 — RSVP & GIFTS */}
        <section
          id="section-rsvp"
          className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-10 md:px-14 bg-fine-paper text-[#1B2A49] border-t border-[#C5CCD6]"
        >
          <div className="max-w-[580px] mx-auto">
            <RevealOnScroll className="text-center mb-10 sm:mb-12">
              <VintageCarriageIllustration className="w-56 sm:w-72 h-24 sm:h-28 mx-auto mb-3" />
              <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#1B2A49]/75">
                RSVP &amp; Warmest Wishes
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1B2A49] mt-1">
                Konfirmasi Kehadiran &amp; Doa
              </h2>
            </RevealOnScroll>

            <RevealOnScroll>
              <form
                onSubmit={handleRsvpSubmit}
                className="bg-[#EEF1F5] border border-[#C5CCD6] p-5 sm:p-8 md:p-9 shadow-md space-y-5"
              >
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="block font-sans-refined text-[9px] uppercase tracking-[0.25em] text-[#1B2A49] mb-2"
                  >
                    Nama Lengkap Tamu *
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="Contoh: Bpk. Adrian & Ibu Nadia"
                    className="w-full min-h-[44px] bg-[#FFFFFF] border border-[#C5CCD6] px-4 py-3 font-serif-luxury text-sm text-[#1B2A49] focus:outline-none focus:border-[#1B2A49]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="rsvp-guests"
                      className="block font-sans-refined text-[9px] uppercase tracking-[0.25em] text-[#1B2A49] mb-2"
                    >
                      Jumlah Tamu Hadir
                    </label>
                    <select
                      id="rsvp-guests"
                      value={rsvpForm.guests}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                      className="w-full min-h-[44px] bg-[#FFFFFF] border border-[#C5CCD6] px-4 py-3 font-serif-luxury text-sm text-[#1B2A49] focus:outline-none focus:border-[#1B2A49]"
                    >
                      <option value="1">1 Orang</option>
                      <option value="2">2 Orang</option>
                      <option value="3">3 Orang</option>
                      <option value="4">4 Orang</option>
                    </select>
                  </div>
                  <div>
                    <span className="block font-sans-refined text-[9px] uppercase tracking-[0.25em] text-[#1B2A49] mb-2">
                      Konfirmasi Kehadiran
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {['Hadir', 'Tidak Hadir'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setRsvpForm({ ...rsvpForm, attendance: status })}
                          className={`min-h-[44px] py-2.5 px-3 font-sans-refined text-[10px] uppercase tracking-widest border transition-colors ${
                            rsvpForm.attendance === status
                              ? 'bg-[#1B2A49] text-[#F5F5F5] border-[#1B2A49]'
                              : 'bg-[#FFFFFF] text-[#1B2A49] border-[#C5CCD6] hover:border-[#1B2A49]'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="rsvp-message"
                    className="block font-sans-refined text-[9px] uppercase tracking-[0.25em] text-[#1B2A49] mb-2"
                  >
                    Pesan &amp; Doa untuk Kedua Mempelai
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    placeholder="Tuliskan doa dan harapan terbaik Anda..."
                    className="w-full bg-[#FFFFFF] border border-[#C5CCD6] px-4 py-3 font-serif-luxury text-sm text-[#1B2A49] focus:outline-none focus:border-[#1B2A49]"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-luxury-shimmer w-full min-h-[46px] py-3.5 bg-[#1B2A49] text-[#F5F5F5] font-sans-refined text-[10px] uppercase tracking-[0.3em] hover:bg-[#101A30] transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-3.5 h-3.5 text-[#AEBFD6]" />
                  <span>Kirim Konfirmasi &amp; Ucapan</span>
                </button>
                {rsvpSubmitted && (
                  <div className="mt-4 p-4 bg-[#FFFFFF] border border-[#AEBFD6] text-center">
                    <p className="font-serif-luxury text-base font-semibold text-[#1B2A49]">
                      Terima kasih atas konfirmasi dan untaian doa Anda!
                    </p>
                  </div>
                )}
              </form>
            </RevealOnScroll>

            <RevealOnScroll className="mt-8 sm:mt-10">
              <div className="border border-[#C5CCD6] bg-[#FFFFFF] p-5 sm:p-6 max-h-80 overflow-y-auto space-y-4">
                <p className="font-sans-refined text-[9px] uppercase tracking-[0.28em] text-[#1B2A49] border-b border-[#C5CCD6] pb-2">
                  Untaian Doa Restu ({wishes.length})
                </p>
                {wishes.map((w) => (
                  <div key={w.id} className="pb-3.5 border-b border-[#C5CCD6]/50 last:border-none">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif-luxury font-semibold text-sm text-[#1B2A49]">
                        {w.name}
                      </span>
                      <span
                        className={`font-sans-refined text-[8px] uppercase tracking-widest px-2 py-0.5 border ${
                          w.attendance === 'Hadir'
                            ? 'bg-[#AEBFD6]/30 text-[#1B2A49] border-[#AEBFD6]'
                            : 'bg-[#F5F5F5] text-[#A8ADB5] border-[#C5CCD6]'
                        }`}
                      >
                        {w.attendance}
                      </span>
                    </div>
                    <p className="font-serif-luxury italic text-xs sm:text-sm text-[#1B2A49]/85 mt-1.5 leading-relaxed">
                      “{w.message}”
                    </p>
                    <span className="block font-sans-refined text-[8px] text-[#A8ADB5] mt-1">
                      {w.createdAt}
                    </span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="mt-14 sm:mt-16 text-center">
              <p className="font-sans-refined text-[9px] uppercase tracking-[0.3em] text-[#1B2A49]/75">
                Wedding Gift
              </p>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1B2A49] mt-1">
                Tanda Kasih Pernikahan
              </h3>
              <div className="space-y-4 max-w-[400px] mx-auto mt-6">
                {config.gifts.map((gift, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FFFFFF] border border-[#C5CCD6] rounded-lg p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
                  >
                    <div>
                      <span className="inline-block font-sans-refined text-[9px] uppercase tracking-[0.22em] text-[#1B2A49] font-semibold">
                        {gift.bankName}
                      </span>
                      <p className="font-serif-luxury text-lg sm:text-xl font-semibold text-[#1B2A49] tracking-wider mt-1">
                        {gift.accountNumber}
                      </p>
                      <p className="font-serif-luxury italic text-xs text-[#A8ADB5]">
                        {gift.accountHolder}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount(gift.accountNumber, idx)}
                      className="min-h-[40px] shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#1B2A49] text-[#F5F5F5] font-sans-refined text-[9px] uppercase tracking-widest hover:bg-[#101A30] transition-colors"
                    >
                      {copiedAccount === idx ? (
                        <>
                          <Check className="w-3 h-3 text-[#AEBFD6]" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#AEBFD6]" />
                          <span>Salin Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 9 — CLOSING */}
        <footer
          id="section-closing"
          className="relative min-h-[520px] sm:min-h-[620px] flex items-center justify-center text-center text-[#F5F5F5] overflow-hidden bg-[#0D1526]"
        >
          <img
            src={config.closingPhoto}
            alt="The Beginning of Forever"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50 scale-105"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(13, 21, 38, 0.88) 0%, rgba(27, 42, 73, 0.62) 45%, rgba(10, 16, 30, 0.96) 100%)',
            }}
          />
          <RevealOnScroll className="relative z-10 max-w-[480px] px-5 py-20">
            <p className="font-sans-refined text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#AEBFD6]">
              The Beginning of Forever
            </p>
            <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#F5F5F5] my-4 drop-shadow-md">
              {config.couple.brideShort} &amp; {config.couple.groomShort}
            </h2>
            <p className="font-sans-refined text-[10px] uppercase tracking-[0.35em] text-[#AEBFD6] mb-6">
              {config.weddingDate.dotDate}
            </p>
            <div className="w-14 h-[1px] bg-[#AEBFD6]/50 mx-auto mb-6" />
            <p className="font-serif-luxury italic text-sm sm:text-base text-[#F5F5F5]/90 leading-relaxed">
              Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i
              berkenan hadir dan memberikan doa restu. Terima kasih atas segala perhatian dan kasih
              sayang yang diberikan.
            </p>
            <div className="mt-8 flex justify-center">
              <NavySerenityFloralCrest className="w-36 h-20" />
            </div>
          </RevealOnScroll>
        </footer>
      </div>

      {/* =====================================================================
          BOTTOM NAVIGATION BAR (MOBILE-FIRST ERGONOMIC DOCK)
      ===================================================================== */}
      {envelopeStage === 'opened' && (
        <nav
          aria-label="Navigasi Bagian Undangan"
          className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-1rem)] max-w-[420px] sm:max-w-[660px]"
        >
          {isMobileMenuOpen && (
            <div className="sm:hidden mb-2 p-3 rounded-2xl bg-[#101A30]/95 backdrop-blur-xl border border-[#AEBFD6]/40 shadow-2xl grid grid-cols-3 gap-2">
              {NAV_ITEMS.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-center transition-all ${
                      isActive
                        ? 'bg-[#AEBFD6] text-[#1B2A49] border-[#F5F5F5] font-semibold'
                        : 'bg-[#1B2A49]/60 text-[#F5F5F5] border-[#AEBFD6]/25'
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

          <div className="flex items-center justify-between gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl sm:rounded-full bg-[#101A30]/95 backdrop-blur-xl border border-[#AEBFD6]/40 shadow-[0_12px_35px_rgba(0,0,0,0.65)]">
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
                        ? 'bg-[#AEBFD6] text-[#1B2A49] shadow-sm font-semibold'
                        : 'text-[#C5CCD6] hover:text-[#F5F5F5] hover:bg-[#1B2A49]'
                    }`}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? 'text-[#1B2A49]' : 'text-[#AEBFD6]'
                      }`}
                    />
                    <span className="font-sans-refined text-[8px] sm:text-[10px] uppercase tracking-[0.06em] sm:tracking-[0.16em] leading-tight whitespace-nowrap">
                      {nav.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="w-[1px] h-6 bg-[#AEBFD6]/25 mx-0.5 shrink-0" />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="sm:hidden w-9 h-9 shrink-0 rounded-xl flex items-center justify-center border border-[#AEBFD6]/35 bg-[#1B2A49] text-[#AEBFD6]"
              aria-label="Menu Bagian"
            >
              <Menu className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleMusic}
              className={`w-9 h-9 shrink-0 rounded-xl sm:rounded-full flex items-center justify-center border transition-all ${
                isPlayingMusic
                  ? 'bg-[#AEBFD6] border-[#F5F5F5] text-[#1B2A49]'
                  : 'bg-[#1B2A49] border-[#AEBFD6]/40 text-[#AEBFD6]'
              }`}
              aria-label={isPlayingMusic ? 'Matikan musik' : 'Putar musik'}
            >
              {isPlayingMusic ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-[#0A101E]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-fine-paper p-3 sm:p-5 border border-[#C5CCD6] shadow-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-[#1B2A49] text-[#F5F5F5] border border-[#AEBFD6] flex items-center justify-center shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-[#101A30]">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>
            <p className="font-serif-luxury italic text-sm text-[#1B2A49] text-center mt-3">
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}

      {/* DRAWER KUSTOMISASI REAL-TIME LENGKAP */}
      {isCustomizeOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#F5F5F5] text-[#1B2A49] h-full overflow-y-auto p-6 sm:p-8 shadow-2xl border-l border-[#C5CCD6]">
            <div className="flex items-center justify-between border-b border-[#C5CCD6] pb-4 mb-6">
              <div>
                <p className="font-sans-refined text-[9px] uppercase tracking-[0.25em] text-[#1B2A49]/70">
                  Live Configuration
                </p>
                <h3 className="font-serif-luxury text-2xl font-semibold">
                  Kustomisasi Data Undangan
                </h3>
              </div>
              <button
                onClick={() => setIsCustomizeOpen(false)}
                className="p-2 text-[#1B2A49] hover:bg-[#E4E9F0] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 font-serif-luxury text-sm">
              <div>
                <label className="block font-sans-refined text-[9px] uppercase tracking-widest text-[#1B2A49] mb-1">
                  Nama Tamu di Amplop &amp; Sampul
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full border border-[#C5CCD6] px-3 py-2 bg-[#FFFFFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-sans-refined text-[9px] uppercase tracking-widest text-[#1B2A49] mb-1">
                    Panggilan Wanita
                  </label>
                  <input
                    type="text"
                    value={config.couple.brideShort}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: { ...config.couple, brideShort: e.target.value },
                      })
                    }
                    className="w-full border border-[#C5CCD6] px-3 py-2 bg-[#FFFFFF]"
                  />
                </div>
                <div>
                  <label className="block font-sans-refined text-[9px] uppercase tracking-widest text-[#1B2A49] mb-1">
                    Panggilan Pria
                  </label>
                  <input
                    type="text"
                    value={config.couple.groomShort}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: { ...config.couple, groomShort: e.target.value },
                      })
                    }
                    className="w-full border border-[#C5CCD6] px-3 py-2 bg-[#FFFFFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans-refined text-[9px] uppercase tracking-widest text-[#1B2A49] mb-1">
                  Tanggal Tampilan
                </label>
                <input
                  type="text"
                  value={config.weddingDate.displayDate}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      weddingDate: { ...config.weddingDate, displayDate: e.target.value },
                    })
                  }
                  className="w-full border border-[#C5CCD6] px-3 py-2 bg-[#FFFFFF]"
                />
              </div>

              <div>
                <label className="block font-sans-refined text-[9px] uppercase tracking-widest text-[#1B2A49] mb-1">
                  Lokasi Resepsi
                </label>
                <input
                  type="text"
                  value={config.events.resepsi.venueName}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      events: {
                        ...config.events,
                        resepsi: { ...config.events.resepsi, venueName: e.target.value },
                      },
                    })
                  }
                  className="w-full border border-[#C5CCD6] px-3 py-2 bg-[#FFFFFF]"
                />
              </div>

              <button
                onClick={() => setIsCustomizeOpen(false)}
                className="w-full mt-6 py-3 bg-[#1B2A49] text-[#F5F5F5] font-sans-refined text-[10px] uppercase tracking-[0.25em]"
              >
                Terapkan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}