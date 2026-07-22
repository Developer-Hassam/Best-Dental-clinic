import doctorPhoto from './imports/doctor.png'

export interface ServiceItem {
  id: string
  title: string
  desc: string
  image: string
  badge: string
}

export interface TestimonialItem {
  id: string
  name: string
  area: string
  text: string
  stars: number
  date: string
  treatment: string
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: string
  span?: string
}

export const siteConfig = {
  // Clinic Branding & Info
  clinicName: "Bright Smile Dental Care",
  clinicShortName: "Bright Smile Dental",
  tagline: "Your Smile, Our Priority",
  subTagline: "Modern Dental Care & Aesthetic Excellence",
  yearEstablished: "2020",

  // Contact Information
  phone: {
    display: "0300-1234567",
    tel: "+923001234567"
  },
  whatsapp: {
    number: "923001234567",
    display: "0300-1234567"
  },
  address: {
    line1: "Suite 102, Medical Plaza",
    line2: "Main Boulevard, Model Town",
    city: "Multan, Punjab",
    zip: "60000",
    full: "Suite 102, Medical Plaza, Main Boulevard, Model Town, Multan"
  },
  hours: {
    daily: "Open Daily till 10:00 PM",
    text: "Open daily 10:00 AM – 10:00 PM"
  },
  mapEmbedUrl: "https://maps.google.com/maps?q=Model+Town,+Multan&t=&z=15&ie=UTF8&iwloc=&output=embed",

  // Doctor Info — High Definition Upscaled Photo
  doctor: {
    name: "Dr. Sameer Ahmed",
    title: "Lead Dental Surgeon & Implantologist",
    qualification: "B.D.S, M.Sc Orthodontics & Implantology (UHS)",
    photo: doctorPhoto,
    bio1: "Dr. Sameer Ahmed is a certified Dental Surgeon with over 8 years of clinical experience in advanced restorative, cosmetic, and preventative dentistry.",
    bio2: "At Bright Smile Dental Care, we utilize state-of-the-art diagnostic tools, complete 100% autoclave sterilization protocols, and gentle treatment techniques to ensure every patient leaves with a confident smile.",
    bio3: "Committed to clinical excellence, gentle care, and patient satisfaction across all age groups.",
    specialties: [
      { label: "Lead Dentist", value: "Dr. Sameer Ahmed" },
      { label: "Qualification", value: "B.D.S, M.Sc Orthodontics" },
      { label: "Experience", value: "8+ Years Practice" },
      { label: "Availability", value: "Open till 10:00 PM" }
    ]
  },

  // Ratings & Social Links
  reviews: {
    rating: "5.0",
    count: "150+",
    googleMapsUrl: "https://www.google.com/maps/search/Dental+Clinic+Multan/"
  },
  social: {
    instagram: {
      url: "https://www.instagram.com/",
      handle: "@brightsmiledental"
    },
    facebook: {
      url: "https://www.facebook.com/"
    }
  },

  // 8 Full Professional Dental Clinic Services
  services: [
    {
      id: "whitening",
      title: "Teeth Whitening & Bleaching",
      desc: "Advanced laser whitening treatments to safely brighten your smile by up to 8 shades and eliminate stubborn tea, coffee, and tobacco stains in a single 45-minute session.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop&auto=format",
      badge: "Cosmetic Dentistry"
    },
    {
      id: "ortho",
      title: "Invisible Aligners & Braces",
      desc: "Custom metal braces, ceramic aesthetic braces, and clear invisible aligners to correct crooked teeth, gaps, and bite misalignments comfortably.",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop&auto=format",
      badge: "Orthodontics"
    },
    {
      id: "implants",
      title: "Dental Implants & Permanent Teeth",
      desc: "Permanent biocompatible titanium implant posts topped with natural-looking zirconia crowns to replace missing teeth with maximum strength.",
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop&auto=format",
      badge: "Oral Surgery"
    },
    {
      id: "rct",
      title: "Painless Root Canal Therapy (RCT)",
      desc: "Single-visit painless endodontic treatment utilizing computerized rotary instruments to eliminate severe toothache and preserve your natural tooth.",
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&h=400&fit=crop&auto=format",
      badge: "Endodontics"
    },
    {
      id: "scaling",
      title: "Ultrasonic Scaling & Deep Cleaning",
      desc: "Thorough ultrasonic plaque & tartar removal followed by high-gloss fluoridated polishing to cure bleeding gums and ensure long-lasting fresh breath.",
      image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop&auto=format",
      badge: "Preventative Care"
    },
    {
      id: "crowns",
      title: "Porcelain Crowns & Fixed Bridges",
      desc: "High-strength metal-free Zirconia crowns and fixed bridges engineered with CAD/CAM technology for flawless aesthetics and chewing comfort.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&auto=format",
      badge: "Restorative"
    },
    {
      id: "makeover",
      title: "Cosmetic Smile Makeover & Veneers",
      desc: "Digital smile design incorporating ultra-thin porcelain veneers, composite bonding, and gum contouring to transform damaged or discolored teeth.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop&auto=format",
      badge: "Aesthetics"
    },
    {
      id: "pediatric",
      title: "Pediatric & Kids Dental Care",
      desc: "Gentle, friendly dental checkups, cavity sealants, fluoride treatments, and painless fillings specifically designed to make children feel calm and happy.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop&auto=format",
      badge: "Pediatric Care"
    }
  ] as ServiceItem[],

  // 6 Authentic Patient Reviews
  testimonials: [
    {
      id: "rev-1",
      name: "Ali Raza",
      area: "Model Town, Multan",
      text: "Exceptional dental service! The clinic environment is spotlessly clean, fully sterile, and the root canal treatment was 100% painless. Highly recommended for family dental care.",
      stars: 5,
      date: "2 days ago",
      treatment: "Root Canal Therapy"
    },
    {
      id: "rev-2",
      name: "Fatima Noor",
      area: "Gulgasht Colony, Multan",
      text: "Got my laser teeth whitening and clear aligners consultation done here. Dr. Sameer explained the whole procedure with immense patience. Results are brilliant!",
      stars: 5,
      date: "1 week ago",
      treatment: "Teeth Whitening & Aligners"
    },
    {
      id: "rev-3",
      name: "Usman Ghani",
      area: "Cantt, Multan",
      text: "Best dentist in Multan! Very polite staff, state of the art X-ray equipment, and extremely reasonable charges for zirconia crowns.",
      stars: 5,
      date: "2 weeks ago",
      treatment: "Zirconia Crown"
    },
    {
      id: "rev-4",
      name: "Zainab Bibi",
      area: "Boson Road, Multan",
      text: "Took my 7-year-old son for cavity treatment. Dr. Sameer was so gentle that my son didn't cry even once! Very clean and kid-friendly clinic.",
      stars: 5,
      date: "3 weeks ago",
      treatment: "Pediatric Care"
    },
    {
      id: "rev-5",
      name: "Hamza Malik",
      area: "Shah Rukn-e-Alam, Multan",
      text: "Had severe toothache and got an emergency appointment. Scaling and laser filling was completed in less than 30 minutes with zero discomfort.",
      stars: 5,
      date: "1 month ago",
      treatment: "Scaling & Laser Filling"
    },
    {
      id: "rev-6",
      name: "Saima Bilal",
      area: "Officers Colony, Multan",
      text: "Complete smile design transformation with porcelain veneers. My confidence has boosted tremendously. Truly 5-star quality!",
      stars: 5,
      date: "1 month ago",
      treatment: "Smile Makeover"
    }
  ] as TestimonialItem[],

  // 6 High-Res Gallery Photos
  gallery: [
    {
      id: "gal-1",
      src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop&auto=format",
      alt: "Modern hygienic reception & consultation operatory",
      category: "Clinic Environment",
      span: "lg:col-span-2"
    },
    {
      id: "gal-2",
      src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=600&fit=crop&auto=format",
      alt: "Laser teeth whitening procedure in progress",
      category: "Teeth Whitening",
      span: ""
    },
    {
      id: "gal-3",
      src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&h=600&fit=crop&auto=format",
      alt: "Intraoral digital examination with modern tools",
      category: "Examination",
      span: ""
    },
    {
      id: "gal-4",
      src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=500&fit=crop&auto=format",
      alt: "Sterile dental operatory unit with digital X-ray",
      category: "Operatory",
      span: "lg:col-span-2"
    },
    {
      id: "gal-5",
      src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=500&fit=crop&auto=format",
      alt: "Happy patient showcasing bright new smile",
      category: "Patient Smiles",
      span: ""
    },
    {
      id: "gal-6",
      src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=500&fit=crop&auto=format",
      alt: "Autoclave sterile dental surgical instruments",
      category: "Sterilization",
      span: ""
    }
  ] as GalleryItem[],

  // Why Us Section
  whyUs: {
    title: "Why Patients Trust Our Clinic",
    description: "We combine modern dental technology, strict hygiene standards, and patient-centered care to deliver gentle, reliable dentistry for the whole family.",
    points: [
      {
        title: "100% Autoclave Sterilization Protocols",
        body: "Strict multi-stage autoclave sterilization for all surgical and clinical instruments to guarantee 0% cross-contamination."
      },
      {
        title: "5.0 Rating · 150+ Verifiable Patient Reviews",
        body: "Consistently rated five stars by patients for compassionate care, clean facilities, and painless treatment."
      },
      {
        title: "Digital Radiography & Intraoral Scanners",
        body: "Equipped with low-radiation digital X-rays, intraoral cameras, rotary endodontics, and modern laser teeth whitening units."
      },
      {
        title: "Convenient Daily Hours (Open till 10 PM)",
        body: "Open daily until 10:00 PM, making it easy to schedule appointments after work, school, or business hours."
      }
    ],
    stats: [
      { big: "100%", label: "Sterile & Safe", sub: "Clinical Hygiene" },
      { big: "5.0★", label: "Google Rating", sub: "150+ Reviews" },
      { big: "10 PM", label: "Open Daily", sub: "Flexible Hours" },
      { big: "8+ Yrs", label: "Dental Practice", sub: "Expert Care" }
    ],
    quote: "Patient comfort and clinical quality are at the heart of everything we do. We strive to make every dental visit stress-free and effective."
  }
}
