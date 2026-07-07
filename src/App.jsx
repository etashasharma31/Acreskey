import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Phone, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Calendar, 
  Clock, 
  User, 
  Home, 
  Building, 
  LandPlot, 
  Briefcase, 
  Monitor, 
  ShoppingBag, 
  Trees, 
  Gem, 
  Users, 
  Play, 
  Check,
  CheckCircle,
  Heart,
  ArrowRight,
  Info,
  UserCheck,
  Zap,
  Sparkles,
  Shield,
  Camera,
  Grid,
  List,
  ChevronDown,
  Mail,
  Menu,
  X,
  Filter,
  RefreshCw,
  DollarSign,
  Construction,
  Percent,
  Headset,
  Target,
  Eye,
  EyeOff,
  Lock,
  ThumbsUp,
  ShieldCheck,
  Upload,
  FileText,
  PlusCircle,
  MoreHorizontal,
  Quote,
  BadgeCheck,
  Globe
} from 'lucide-react';
import PropertyDetailPage from './PropertyDetailPage.jsx';
import { normalizeRupeeText, RUPEE } from './utils/currency.js';
import { PEOPLE_IMAGES } from './constants/peopleImages.js';

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

function App() {
  // Navigation State: 'home', 'buy', 'rent', 'projects', etc.
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for active Search Tab in Hero (Home page)
  const [searchTab, setSearchTab] = useState('buy');
  
  // State for search form inputs
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchBudget, setSearchBudget] = useState('');
  const [searchBhk, setSearchBhk] = useState('');

  // Favorites state for property cards (consistent across pages)
  const [favorites, setFavorites] = useState(new Set([1, 2])); // default items saved

  // Projects page search states
  const [projLocation, setProjLocation] = useState('');
  const [projType, setProjType] = useState('');
  const [projBudget, setProjBudget] = useState('');
  const [projBhk, setProjBhk] = useState('');
  const [projPossession, setProjPossession] = useState('');

  // Client Testimonials carousel state
  const [reviewIndex, setReviewIndex] = useState(0);

  // Auto-animate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // New Launches project list scroll index
  const [projectScrollIndex, setProjectScrollIndex] = useState(0);

  // General Modal state for interactive elements
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalInputPlaceholder, setModalInputPlaceholder] = useState('');
  const [modalButtonText, setModalButtonText] = useState('Submit');
  const [inputValue, setInputValue] = useState('');

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Posted Properties State
  const [postedProperties, setPostedProperties] = useState([]);

  // Post Property Modal State
  const [isPostPropertyModalOpen, setIsPostPropertyModalOpen] = useState(false);
  const [postPropertyType, setPostPropertyType] = useState('Residential');
  const [postPropTitle, setPostPropTitle] = useState('');
  const [postPropLocation, setPostPropLocation] = useState('');
  const [postPropPrice, setPostPropPrice] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility

  const [toastMessage, setToastMessage] = useState('');

  // --- FILTERS STATE FOR BUY PAGE ---
  const [filterLocations, setFilterLocations] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);
  const [filterBhk, setFilterBhk] = useState('');
  const [filterBudget, setFilterBudget] = useState(''); // '50L-1Cr', '1Cr-2Cr', '2Cr+'
  const [sortBy, setSortBy] = useState('relevance');
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' or 'list'

  // --- FILTERS STATE FOR RENT PAGE ---
  const [filterRentLocations, setFilterRentLocations] = useState([]);
  const [filterRentTypes, setFilterRentTypes] = useState([]);
  const [filterRentBhk, setFilterRentBhk] = useState('');
  const [filterRentBudget, setFilterRentBudget] = useState(''); // '0-10k', '10k-25k', '25k-50k', '50k+'
  const [rentSortBy, setRentSortBy] = useState('relevance');
  const [rentLayoutMode, setRentLayoutMode] = useState('grid');


  // Navbar scroll transparency state
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll state on page change so navbar starts transparent again
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setNavScrolled(false);
  }, [currentPage]);

  useEffect(() => {
    document.body.classList.toggle('detail-page-active', currentPage === 'detail');
    return () => document.body.classList.remove('detail-page-active');
  }, [currentPage]);


  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTab === 'rent') {
      if (searchLocation) setFilterRentLocations([searchLocation]);
      if (searchType) setFilterRentTypes([searchType]);
      if (searchBhk) setFilterRentBhk(searchBhk);
      if (searchBudget) setFilterRentBudget(searchBudget);
      setCurrentPage('rent');
    } else if (searchTab === 'projects') {
      if (searchLocation) setProjLocation(searchLocation);
      if (searchBudget) setProjBudget(searchBudget);
      setCurrentPage('projects');
    } else if (searchTab === 'commercial') {
      if (searchLocation) setFilterLocations([searchLocation]);
      setFilterTypes(['Commercial', 'Office Space']);
      if (searchBudget) setFilterBudget(searchBudget);
      setCurrentPage('buy');
    } else {
      if (searchLocation) setFilterLocations([searchLocation]);
      if (searchType) setFilterTypes([searchType]);
      if (searchBhk) setFilterBhk(searchBhk);
      if (searchBudget) setFilterBudget(searchBudget);
      setCurrentPage('buy');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Applied search parameters for ${searchLocation || 'selected areas'}`);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setModalOpen(false);
    showToast('Success! Our expert agent will contact you within 15 minutes.');
  };

  const toggleFavorite = (id) => {
    const updated = new Set(favorites);
    if (updated.has(id)) {
      updated.delete(id);
      showToast('Removed from saved properties');
    } else {
      updated.add(id);
      showToast('Added to saved properties!');
    }
    setFavorites(updated);
  };


  const handleContactAction = (type, agentName) => {
    setModalTitle(`Contact ${agentName}`);
    setModalMessage(`Inquire about properties listed by this agent. You are requesting a ${type === 'phone' ? 'call back' : 'WhatsApp details package'}.`);
    setModalInputPlaceholder('Enter your mobile number');
    setModalButtonText(type === 'phone' ? 'Call Me' : 'Send WhatsApp Details');
    setInputValue('');
    setModalOpen(true);
  };

  const handleAction = (title, message, placeholder = 'Enter your email address', buttonText = 'Proceed') => {
    setModalTitle(title);
    setModalMessage(message);
    setModalInputPlaceholder(placeholder);
    setModalButtonText(buttonText);
    setInputValue('');
    setModalOpen(true);
  };

  const toggleLocationFilter = (loc) => {
    if (filterLocations.includes(loc)) {
      setFilterLocations(filterLocations.filter(item => item !== loc));
    } else {
      setFilterLocations([...filterLocations, loc]);
    }
  };

  const toggleTypeFilter = (type) => {
    if (filterTypes.includes(type)) {
      setFilterTypes(filterTypes.filter(item => item !== type));
    } else {
      setFilterTypes([...filterTypes, type]);
    }
  };

  const clearAllFilters = () => {
    setFilterLocations([]);
    setFilterTypes([]);
    setFilterBhk('');
    setFilterBudget('');
    showToast('Filters cleared successfully');
  };

  const toggleRentLocationFilter = (loc) => {
    if (filterRentLocations.includes(loc)) {
      setFilterRentLocations(filterRentLocations.filter(item => item !== loc));
    } else {
      setFilterRentLocations([...filterRentLocations, loc]);
    }
  };

  const toggleRentTypeFilter = (type) => {
    if (filterRentTypes.includes(type)) {
      setFilterRentTypes(filterRentTypes.filter(item => item !== type));
    } else {
      setFilterRentTypes([...filterRentTypes, type]);
    }
  };

  const clearAllRentFilters = () => {
    setFilterRentLocations([]);
    setFilterRentTypes([]);
    setFilterRentBhk('');
    setFilterRentBudget('');
    showToast('Filters cleared successfully');
  };

  const navigateToBuy = (e) => {
    if (e) e.preventDefault();
    setCurrentPage('buy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToRent = (e) => {
    if (e) e.preventDefault();
    setCurrentPage('rent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (e) => {
    if (e) e.preventDefault();
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDetail = (e, prop) => {
    if (e) e.preventDefault();
    if (prop) setSelectedProperty(prop);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProjects = (e) => {
    e.preventDefault();
    setCurrentPage('projects');
    window.scrollTo(0, 0);
  };

  const navigateToAgents = (e) => {
    e.preventDefault();
    setCurrentPage('agents');
    window.scrollTo(0, 0);
  };

  const navigateToServices = (e) => {
    e.preventDefault();
    setCurrentPage('services');
    window.scrollTo(0, 0);
  };

  const navigateToAbout = (e) => {
    if (e) e.preventDefault();
    setCurrentPage('about');
    window.scrollTo(0, 0);
  };


  // Mock Projects Data
  const projectsList = [
    {
      id: 201,
      title: 'DLF Privana West',
      location: 'Sector 76, Gurgaon',
      price: '\u20B9 3.10 Cr* Onwards',
      priceVal: 310,
      specs: '4 BHK',
      area: '2,357 - 3,596 Sq.Ft.',
      possession: 'Dec 2027 Possession',
      status: 'New Launch',
      builder: 'DLF Limited',
      image: '/apartment_building.png'
    },
    {
      id: 202,
      title: 'Lodha Palava',
      location: 'Dombivli East, Mumbai',
      price: '\u20B9 75 L* Onwards',
      priceVal: 75,
      specs: '1, 2, 3 BHK',
      area: '734 - 1,200 Sq.Ft.',
      possession: 'Dec 2026 Possession',
      status: 'Under Construction',
      builder: 'Lodha Group',
      image: '/hero_villa.png'
    },
    {
      id: 203,
      title: 'Godrej Zenith',
      location: 'Sector 89, Gurgaon',
      price: '\u20B9 2.15 Cr* Onwards',
      priceVal: 215,
      specs: '3, 4 BHK',
      area: '1,850 - 2,950 Sq.Ft.',
      possession: 'Ready to Move',
      status: 'Ready to Move',
      builder: 'Godrej Properties',
      image: '/apartment_building.png'
    },
    {
      id: 204,
      title: 'Sobha Infinia',
      location: 'Koramangala, Bangalore',
      price: '\u20B9 5.80 Cr* Onwards',
      priceVal: 580,
      specs: '3, 4 BHK',
      area: '2,150 - 2,850 Sq.Ft.',
      possession: 'Dec 2026',
      status: 'Luxury',
      builder: 'Sobha Limited',
      image: '/luxury_interior.png'
    }
  ];

  // Mock Data
  const categories = [
    { name: 'Apartments', icon: <Building size={28} /> },
    { name: 'Villas', icon: <Home size={28} /> },
    { name: 'Plots', icon: <LandPlot size={28} /> },
    { name: 'Commercial', icon: <Briefcase size={28} /> },
    { name: 'Offices', icon: <Monitor size={28} /> },
    { name: 'Shops', icon: <ShoppingBag size={28} /> },
    { name: 'Farm House', icon: <Trees size={28} /> },
    { name: 'Luxury Homes', icon: <Gem size={28} /> },
  ];

  const featuredProperties = [
    {
      id: 1,
      price: '\u20B9 3.25 Cr',
      priceVal: 325, // in Lakhs
      title: '3 BHK Luxury Apartment',
      location: 'Sector 65, Gurgaon',
      locCategory: 'Gurgaon',
      type: 'Apartment',
      bhk: '3 BHK',
      beds: '3 Beds',
      baths: '3 Baths',
      area: '1850 Sq. Ft.',
      agentName: 'Rohit Sharma',
      agentRating: 4.8,
      agentReviewsCount: '120',
      agentAvatar: PEOPLE_IMAGES.agentMale1,
      image: '/luxury_interior.png',
      verified: true,
      photos: 15
    },
    {
      id: 2,
      price: '\u20B9 4.85 Cr',
      priceVal: 485,
      title: '4 BHK Luxury Apartment',
      location: 'Golf Course Road, Sector 54, Gurugram',
      locCategory: 'Gurgaon',
      type: 'Apartment',
      bhk: '4 BHK',
      beds: '4 Beds',
      baths: '4 Baths',
      area: '3200 Sq. Ft.',
      agentName: 'Rohit Sharma',
      agentRating: 4.8,
      agentReviewsCount: '120',
      agentAvatar: PEOPLE_IMAGES.agentMale1,
      image: '/luxury_interior.png',
      verified: true,
      photos: 24
    },
    {
      id: 3,
      price: '\u20B9 1.85 Cr',
      priceVal: 185,
      title: '2 BHK Apartment',
      location: 'Sector 150, Noida',
      locCategory: 'Noida',
      type: 'Apartment',
      bhk: '2 BHK',
      beds: '2 Beds',
      baths: '2 Baths',
      area: '1200 Sq. Ft.',
      agentName: 'Amit Verma',
      agentRating: 4.7,
      agentReviewsCount: '80',
      agentAvatar: PEOPLE_IMAGES.agentMale2,
      image: '/apartment_building.png',
      verified: true,
      photos: 18
    },
    {
      id: 4,
      price: '\u20B9 2.95 Cr',
      priceVal: 295,
      title: 'Premium Office Space',
      location: 'Golf Course Road, Gurgaon',
      locCategory: 'Gurgaon',
      type: 'Office Space',
      bhk: 'Commercial',
      beds: '\u2014',
      baths: '4 Baths',
      area: '2000 Sq. Ft.',
      agentName: 'Pooja Mehta',
      agentRating: 4.6,
      agentReviewsCount: '70',
      agentAvatar: PEOPLE_IMAGES.agentFemale1,
      image: '/modern_office.png',
      verified: true,
      photos: 12
    },
    {
      id: 5,
      price: '\u20B9 9.25 Cr',
      priceVal: 925,
      title: '5 BHK Independent House',
      location: 'Sushant Lok 1, Gurgaon',
      locCategory: 'Gurgaon',
      type: 'Independent Floor',
      bhk: '5 BHK+',
      beds: '5 Beds',
      baths: '6 Baths',
      area: '4500 Sq. Ft.',
      agentName: 'Karan Malhotra',
      agentRating: 4.9,
      agentReviewsCount: '110',
      agentAvatar: PEOPLE_IMAGES.agentMale1,
      image: '/luxury_interior.png',
      verified: true,
      photos: 17
    },
    {
      id: 6,
      price: '\u20B9 85.00 L',
      priceVal: 85,
      title: 'Residential Plot',
      location: 'Yamuna Expressway, Noida',
      locCategory: 'Noida',
      type: 'Plot / Land',
      bhk: 'Plot',
      beds: '\u2014',
      baths: '\u2014',
      area: '120 Sq. Yd.',
      agentName: 'Harsh Singh',
      agentRating: 4.5,
      agentReviewsCount: '60',
      agentAvatar: PEOPLE_IMAGES.agentMale2,
      image: '/apartment_building.png',
      verified: true,
      photos: 8
    }
  ];

  const rentProperties = [
    {
      id: 11,
      price: '\u20B9 28,000',
      priceVal: 28000,
      title: '2 BHK Apartment',
      location: 'Koramangala, Bangalore',
      locCategory: 'Bangalore',
      type: 'Apartment',
      bhk: '2 BHK',
      beds: '2 Beds',
      baths: '2 Baths',
      area: '1100 Sq. Ft.',
      furnishing: 'Semi Furnished',
      agentName: 'Rohit Sharma',
      agentRating: 4.8,
      agentReviewsCount: '120',
      agentAvatar: PEOPLE_IMAGES.agentMale1,
      image: '/luxury_interior.png',
      verified: true,
      photos: 15
    },
    {
      id: 12,
      price: '\u20B9 45,000',
      priceVal: 45000,
      title: '3 BHK Apartment',
      location: 'Hiranandani Estate, Thane',
      locCategory: 'Thane',
      type: 'Apartment',
      bhk: '3 BHK',
      beds: '3 Beds',
      baths: '3 Baths',
      area: '1650 Sq. Ft.',
      furnishing: 'Fully Furnished',
      agentName: 'Neha Kapoor',
      agentRating: 4.9,
      agentReviewsCount: '98',
      agentAvatar: PEOPLE_IMAGES.agentFemale2,
      image: '/hero_villa.png',
      verified: true,
      photos: 12
    },
    {
      id: 13,
      price: '\u20B9 18,000',
      priceVal: 18000,
      title: '1 BHK Apartment',
      location: 'Sector 62, Noida',
      locCategory: 'Noida',
      type: 'Apartment',
      bhk: '1 BHK',
      beds: '1 Bed',
      baths: '1 Bath',
      area: '650 Sq. Ft.',
      furnishing: 'Semi Furnished',
      agentName: 'Amit Verma',
      agentRating: 4.7,
      agentReviewsCount: '80',
      agentAvatar: PEOPLE_IMAGES.agentMale2,
      image: '/apartment_building.png',
      verified: true,
      photos: 10
    },
    {
      id: 14,
      price: '\u20B9 22,000',
      priceVal: 22000,
      title: 'Studio Apartment',
      location: 'Andheri West, Mumbai',
      locCategory: 'Mumbai',
      type: 'Studio Apartment',
      bhk: 'Studio',
      beds: '1 Bed',
      baths: '1 Bath',
      area: '450 Sq. Ft.',
      furnishing: 'Fully Furnished',
      agentName: 'Sneha Iyer',
      agentRating: 4.9,
      agentReviewsCount: '110',
      agentAvatar: PEOPLE_IMAGES.agentFemale3,
      image: '/luxury_interior.png',
      verified: true,
      photos: 9
    },
    {
      id: 15,
      price: '\u20B9 35,000',
      priceVal: 35000,
      title: '2 BHK Apartment',
      location: 'Whitefield, Bangalore',
      locCategory: 'Bangalore',
      type: 'Apartment',
      bhk: '2 BHK',
      beds: '2 Beds',
      baths: '2 Baths',
      area: '1050 Sq. Ft.',
      furnishing: 'Semi Furnished',
      agentName: 'Karan Malhotra',
      agentRating: 4.9,
      agentReviewsCount: '110',
      agentAvatar: PEOPLE_IMAGES.agentMale1,
      image: '/hero_villa.png',
      verified: true,
      photos: 11
    },
    {
      id: 16,
      price: '\u20B9 60,000',
      priceVal: 60000,
      title: '4 BHK Villa',
      location: 'Gachibowli, Hyderabad',
      locCategory: 'Hyderabad',
      type: 'Independent House / Villa',
      bhk: '4 BHK',
      beds: '4 Beds',
      baths: '4 Baths',
      area: '2500 Sq. Ft.',
      furnishing: 'Fully Furnished',
      agentName: 'Pooja Mehta',
      agentRating: 4.6,
      agentReviewsCount: '70',
      agentAvatar: PEOPLE_IMAGES.agentFemale1,
      image: '/luxury_interior.png',
      verified: true,
      photos: 8
    }
  ];

  const newLaunches = [
    {
      id: 1,
      title: 'Whiteland Blissville',
      location: 'Sector 76, Gurgaon',
      type: '3 & 4 BHK Apartments',
      price: '\u20B9 1.35 Cr* Onwards',
      possession: 'Possession: Dec 2026',
      image: '/apartment_building.png'
    },
    {
      id: 2,
      title: 'Godrej Aristocrat',
      location: 'Sector 49, Gurgaon',
      type: '3 & 4 BHK Apartments',
      price: '\u20B9 2.45 Cr* Onwards',
      possession: 'Possession: Mar 2027',
      image: '/hero_villa.png'
    },
    {
      id: 3,
      title: 'M3M Mansion',
      location: 'Sector 113, Gurgaon',
      type: '3 & 4 BHK Apartments',
      price: '\u20B9 3.50 Cr* Onwards',
      possession: 'Possession: Jun 2029',
      image: '/apartment_building.png'
    },
    {
      id: 4,
      title: 'Sobha City',
      location: 'Sector 108, Gurgaon',
      type: '2 & 3 BHK Apartments',
      price: '\u20B9 1.90 Cr* Onwards',
      possession: 'Possession: Jun 2028',
      image: '/hero_villa.png'
    }
  ];

  const services = [
    { title: 'Buy Property', desc: 'Find the perfect property that matches your needs and budget.', icon: <Home size={32} /> },
    { title: 'Rent Property', desc: 'Wide range of rental properties for families, professionals & businesses.', icon: <Building size={32} /> },
    { title: 'Sell Property', desc: 'List your property with us and get the best value with quick deals.', icon: <DollarSign size={32} /> },
    { title: 'New Projects', desc: 'Explore premium residential and commercial projects from trusted developers.', icon: <Construction size={32} /> },
    { title: 'Property Management', desc: 'We manage your property so you can enjoy hassle-free ownership.', icon: <UserCheck size={32} /> },
    { title: 'Home Loans', desc: 'Get the best home loan options with low interest rates and quick approval.', icon: <Percent size={32} /> },
    { title: 'Legal Assistance', desc: 'Expert legal support for property documentation and safe transactions.', icon: <Shield size={32} /> },
    { title: 'After Sales Support', desc: 'We\'re here to assist you even after your property purchase.', icon: <Headset size={32} /> }
  ];

  const howItWorks = [
    { step: 1, title: 'Tell Us Your Need', desc: 'Share your requirements and preferences with us.', icon: <List size={28} /> },
    { step: 2, title: 'We Find the Best', desc: 'Our experts find the best options for you.', icon: <Search size={28} /> },
    { step: 3, title: 'Visit & Decide', desc: 'Visit the properties and choose what suits you.', icon: <MapPin size={28} /> },
    { step: 4, title: 'Hassle-Free Process', desc: 'We handle everything for a smooth transaction.', icon: <CheckCircle size={28} /> }
  ];

  const testimonials = [
    {
      id: 1,
      text: "AcresKey helped me find my dream home in Gurgaon. Highly professional and supportive team!",
      stars: 5,
      name: "Sneha Iyer",
      role: "Home Buyer",
      avatar: PEOPLE_IMAGES.agentFemale2
    },
    {
      id: 2,
      text: "I sold my property within a week. Great exposure and genuine buyers.",
      stars: 5,
      name: "Rajeev Malhotra",
      role: "Property Seller",
      avatar: PEOPLE_IMAGES.agentMale2
    },
    {
      id: 3,
      text: "Their legal verification process gave me complete peace of mind.",
      stars: 5,
      name: "Anjali Deshmukh",
      role: "Home Investor",
      avatar: PEOPLE_IMAGES.agentFemale3
    }
  ];

  const blogs = [
    {
      id: 1,
      tag: 'Real Estate Tips',
      title: 'Top 7 Areas in Gurgaon for Real Estate Investment in 2024',
      date: 'May 12, 2024',
      readTime: '5 Min Read',
      image: '/apartment_building.png'
    },
    {
      id: 2,
      tag: 'Market Trends',
      title: 'Property Market Trends: What to Expect in 2024',
      date: 'May 10, 2024',
      readTime: '8 Min Read',
      image: '/hero_villa.png'
    },
    {
      id: 3,
      tag: 'Home Buying Guide',
      title: 'Home Loan Tips: How to Get the Best Interest Rates',
      date: 'May 8, 2024',
      readTime: '4 Min Read',
      image: '/luxury_interior.png'
    }
  ];


  // Dynamic filter application logic for the Buy Page
  const filteredProperties = [...postedProperties, ...featuredProperties].filter((prop) => {
    // 1. Location filter
    if (filterLocations.length > 0) {
      const matchLoc = filterLocations.some(loc => prop.location.toLowerCase().includes(loc.toLowerCase()));
      if (!matchLoc) return false;
    }

    // 2. Property type filter
    if (filterTypes.length > 0) {
      if (!filterTypes.includes(prop.type)) return false;
    }

    // 3. BHK filter
    if (filterBhk) {
      if (filterBhk === '5 BHK+' && prop.bhk !== '5 BHK+') return false;
      if (filterBhk !== '5 BHK+' && prop.bhk !== filterBhk) return false;
    }

    // 4. Budget filter
    if (filterBudget) {
      if (filterBudget === '50L-1Cr') {
        if (prop.priceVal < 50 || prop.priceVal > 100) return false;
      } else if (filterBudget === '1Cr-2Cr') {
        if (prop.priceVal < 100 || prop.priceVal > 200) return false;
      } else if (filterBudget === '2Cr+') {
        if (prop.priceVal < 200) return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.priceVal - b.priceVal;
    } else if (sortBy === 'price-desc') {
      return b.priceVal - a.priceVal;
    } else if (sortBy === 'rating') {
      return b.agentRating - a.agentRating;
    }
    return 0; // relevance
  });

  // Dynamic filter application logic for the Rent Page
  const filteredRentProperties = rentProperties.filter((prop) => {
    // 1. Location filter
    if (filterRentLocations.length > 0) {
      const matchLoc = filterRentLocations.some(loc => prop.location.toLowerCase().includes(loc.toLowerCase()));
      if (!matchLoc) return false;
    }

    // 2. Property type filter
    if (filterRentTypes.length > 0) {
      const matches = filterRentTypes.some(type => {
        if (type === 'Independent House / Villa' && prop.type === 'Independent House / Villa') return true;
        if (type === 'Apartment' && prop.type === 'Apartment') return true;
        if (type === 'Studio Apartment' && prop.type === 'Studio Apartment') return true;
        return prop.type.toLowerCase().includes(type.toLowerCase());
      });
      if (!matches) return false;
    }

    // 3. BHK filter
    if (filterRentBhk) {
      if (prop.bhk !== filterRentBhk) return false;
    }

    // 4. Budget filter (Rent: 0-10k, 10k-25k, 25k-50k, 50k+)
    if (filterRentBudget) {
      if (filterRentBudget === '0-10k') {
        if (prop.priceVal > 10000) return false;
      } else if (filterRentBudget === '10k-25k') {
        if (prop.priceVal < 10000 || prop.priceVal > 25000) return false;
      } else if (filterRentBudget === '25k-50k') {
        if (prop.priceVal < 25000 || prop.priceVal > 50000) return false;
      } else if (filterRentBudget === '50k+') {
        if (prop.priceVal < 50000) return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (rentSortBy === 'price-asc') {
      return a.priceVal - b.priceVal;
    } else if (rentSortBy === 'price-desc') {
      return b.priceVal - a.priceVal;
    } else if (rentSortBy === 'rating') {
      return b.agentRating - a.agentRating;
    }
    return 0; // relevance
  });

  // Dynamic filter application logic for the Projects Page
  const filteredProjects = projectsList.filter((proj) => {
    // 1. Location filter
    if (projLocation) {
      if (!proj.location.toLowerCase().includes(projLocation.toLowerCase()) && !proj.status.toLowerCase().includes(projLocation.toLowerCase())) return false;
    }
    
    // 2. Possession filter
    if (projPossession) {
      if (!proj.possession.toLowerCase().includes(projPossession.toLowerCase()) && !proj.status.toLowerCase().includes(projPossession.toLowerCase())) return false;
    }

    // 3. Budget filter (Projects: 50L-1Cr, 1Cr-2Cr, 2Cr-5Cr, 5Cr+)
    if (projBudget) {
      if (projBudget === '50L-1Cr') {
        if (proj.priceVal < 50 || proj.priceVal > 100) return false;
      } else if (projBudget === '1Cr-2Cr') {
        if (proj.priceVal < 100 || proj.priceVal > 200) return false;
      } else if (projBudget === '2Cr-5Cr') {
        if (proj.priceVal < 200 || proj.priceVal > 500) return false;
      } else if (projBudget === '5Cr+') {
        if (proj.priceVal < 500) return false;
      }
    }
    return true;
  });

  return (
    <div className="app-container">
      {/* --- POST PROPERTY MODAL --- */}
      {isPostPropertyModalOpen && (
        <div className="post-property-overlay">
          <div className="post-property-modal">
            <button className="ppm-close-btn" onClick={() => setIsPostPropertyModalOpen(false)}>
              <X size={20} />
            </button>
            
            <div className="ppm-left">
              <div className="ppm-header">
                <div className="ppm-header-icon">
                  <Home size={28} style={{ color: 'var(--primary-lime)' }} />
                  <div className="ppm-icon-plus"><PlusCircle size={14} fill="var(--white)" color="var(--primary-lime)" /></div>
                </div>
                <div>
                  <h2 className="ppm-title">Post Your Property</h2>
                  <p className="ppm-subtitle">List your property and reach thousands of potential buyers & tenants.</p>
                </div>
              </div>
              
              <div className="ppm-stepper">
                <div className="ppm-step active">
                  <div className="ppm-step-circle">1</div>
                  <span>Basic Details</span>
                </div>
                <div className="ppm-step-line"></div>
                <div className="ppm-step">
                  <div className="ppm-step-circle">2</div>
                  <span>Property Details</span>
                </div>
                <div className="ppm-step-line"></div>
                <div className="ppm-step">
                  <div className="ppm-step-circle">3</div>
                  <span>Images</span>
                </div>
                <div className="ppm-step-line"></div>
                <div className="ppm-step">
                  <div className="ppm-step-circle">4</div>
                  <span>Review & Submit</span>
                </div>
              </div>
              
              <div className="ppm-form-grid">
                <div className="ppm-input-group">
                  <label>Property Type</label>
                  <div className="ppm-input-wrapper">
                    <Home size={18} className="ppm-input-icon" />
                    <select value={postPropertyType} onChange={(e) => setPostPropertyType(e.target.value)}>
                      <option value="Residential">Select property type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                    <ChevronDown size={16} className="ppm-select-arrow" />
                  </div>
                </div>
                
                <div className="ppm-input-group">
                  <label>Purpose</label>
                  <div className="ppm-input-wrapper">
                    <CheckCircle size={18} className="ppm-input-icon" />
                    <select>
                      <option>Select purpose</option>
                      <option>Sell</option>
                      <option>Rent</option>
                    </select>
                    <ChevronDown size={16} className="ppm-select-arrow" />
                  </div>
                </div>
                
                <div className="ppm-input-group full-width">
                  <label>Location</label>
                  <div className="ppm-input-wrapper">
                    <input type="text" placeholder="Enter location" value={postPropLocation} onChange={(e) => setPostPropLocation(e.target.value)} />
                  </div>
                </div>
                
                <div className="ppm-input-group full-width">
                  <label>Property Title</label>
                  <div className="ppm-input-wrapper">
                    <FileText size={18} className="ppm-input-icon" />
                    <input 
                      type="text" 
                      placeholder="Enter property title" 
                      maxLength={60}
                      value={postPropTitle}
                      onChange={(e) => setPostPropTitle(e.target.value)}
                    />
                    <span className="ppm-char-count">{postPropTitle.length}/60</span>
                  </div>
                </div>
                
                <div className="ppm-input-group">
                  <label>Price</label>
                  <div className="ppm-input-wrapper">
                    <span className="ppm-rupee-icon">{RUPEE}</span>
                    <input type="text" placeholder="Enter price" value={postPropPrice} onChange={(e) => setPostPropPrice(e.target.value)} />
                  </div>
                </div>
                
                <div className="ppm-input-group">
                  <label>BHK</label>
                  <div className="ppm-input-wrapper">
                    <select>
                      <option>Select BHK</option>
                      <option>1 BHK</option>
                      <option>2 BHK</option>
                      <option>3 BHK</option>
                      <option>4+ BHK</option>
                    </select>
                    <ChevronDown size={16} className="ppm-select-arrow" />
                  </div>
                </div>
                
                <div className="ppm-input-group">
                  <label>Area (sq.ft)</label>
                  <div className="ppm-input-wrapper">
                    <Maximize2 size={18} className="ppm-input-icon" />
                    <input type="text" placeholder="Enter area" />
                  </div>
                </div>
                
                <div className="ppm-input-group">
                  <label>Furnishing</label>
                  <div className="ppm-input-wrapper">
                    <Bed size={18} className="ppm-input-icon" />
                    <select>
                      <option>Select furnishing</option>
                      <option>Fully Furnished</option>
                      <option>Semi Furnished</option>
                      <option>Unfurnished</option>
                    </select>
                    <ChevronDown size={16} className="ppm-select-arrow" />
                  </div>
                </div>
              </div>
              
              <div className="ppm-actions">
                <button className="ppm-add-details-btn">
                  <PlusCircle size={16} /> Add More Details <ChevronDown size={16} />
                </button>
                <button className="ppm-next-btn" onClick={() => { 
                  if (!isLoggedIn) { showToast('Please login to post a property!'); setIsPostPropertyModalOpen(false); setIsLoginModalOpen(true); return; }
                  if (!postPropTitle || !postPropLocation || !postPropPrice) { showToast('Please fill all required fields'); return; }
                  const newProp = { title: postPropTitle, location: postPropLocation, price: postPropPrice, type: postPropertyType, id: Date.now() };
                  setPostedProperties([newProp, ...postedProperties]);
                  setIsPostPropertyModalOpen(false); 
                  showToast('Property posted successfully!'); 
                }}>
                  Submit <Check size={16} />
                </button>
              </div>
            </div>
            
            <div className="ppm-right">
              <div className="ppm-right-image-container">
                <div className="ppm-blob-shape">
                  <img src="/apartment_building.png" alt="House" />
                </div>
                <div className="ppm-upload-icon-wrapper">
                  <div className="ppm-upload-icon">
                    <Upload size={20} color="var(--white)" />
                  </div>
                </div>
              </div>
              
              <div className="ppm-right-content">
                <h3 className="ppm-right-title">List it. Show it.<br/>Sell it <span>Faster.</span></h3>
                
                <div className="ppm-features-list">
                  <div className="ppm-feature-item">
                    <div className="ppm-feature-icon"><Eye size={18} color="var(--primary-lime)" /></div>
                    <div className="ppm-feature-text">
                      <h4>Get More Visibility</h4>
                      <p>Your property will be visible to thousands of active users.</p>
                    </div>
                  </div>
                  
                  <div className="ppm-feature-item">
                    <div className="ppm-feature-icon"><ShieldCheck size={18} color="var(--primary-lime)" /></div>
                    <div className="ppm-feature-text">
                      <h4>Verified Buyers</h4>
                      <p>Connect with genuine & serious buyers.</p>
                    </div>
                  </div>
                  
                  <div className="ppm-feature-item">
                    <div className="ppm-feature-icon"><Zap size={18} color="var(--primary-lime)" /></div>
                    <div className="ppm-feature-text">
                      <h4>Quick & Easy Process</h4>
                      <p>Just a few steps and you're done!</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="ppm-cityscape"></div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
          zIndex: 9999,
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderLeft: '4px solid #72a801',
          animation: 'slideIn 0.3s ease'
        }}>
          <Info size={16} style={{ color: '#72a801' }} />
          {toastMessage}
        </div>
      )}

      {/* 1. Header */}
      <header className={`navbar${navScrolled || currentPage === 'agents' || currentPage === 'detail' ? ' navbar-scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="premium-logo" onClick={navigateToHome}>
            <div className="premium-logo-mark">
              <Key size={18} strokeWidth={2} className="logo-key-icon" />
            </div>
            <span className="logo-text">
              <span className="text-acres">Acres</span><span className="text-key">Key</span>
            </span>
          </a>

          <nav className="nav-links">
            <a href="#" className={currentPage === 'home' ? 'active' : ''} onClick={navigateToHome}>Home</a>
            <a href="#buy" className={currentPage === 'buy' ? 'active' : ''} onClick={navigateToBuy}>Buy</a>
            <a href="#rent" className={currentPage === 'rent' ? 'active' : ''} onClick={navigateToRent}>Rent</a>
            <a href="#projects" className={currentPage === 'projects' ? 'active' : ''} onClick={navigateToProjects}>Projects</a>
            <a href="#services" className={currentPage === 'services' ? 'active' : ''} onClick={navigateToServices}>Services</a>
            <a href="#agents" className={currentPage === 'agents' ? 'active' : ''} onClick={navigateToAgents}>Agents</a>
          </nav>

          <div className="nav-actions">
            <a href="tel:+919876543210" className="header-contact-btn" title="Contact Us directly">
              <Phone size={18} style={{ color: 'var(--primary-lime)' }} />
            </a>

            <button style={{ 
              color: 'var(--white)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              padding: '6px'
            }} onClick={() => showToast(`You have ${favorites.size} saved properties.`)}>
              <Heart size={18} fill={favorites.size > 0 ? "#72a801" : "none"} stroke={favorites.size > 0 ? "#72a801" : "currentColor"} />
            </button>

            {isLoggedIn ? (
              <button className="login-btn" onClick={() => { setIsLoggedIn(false); setUser(null); showToast('Logged out successfully'); }}>
                <User size={18} />
                Logout
              </button>
            ) : (
              <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>
                <User size={18} />
                Login
              </button>
            )}
            <button className="post-btn" onClick={() => setIsPostPropertyModalOpen(true)}>
              Post Property
            </button>
          </div>
        </div>
      </header>

      {/* DYNAMIC SUBPAGE CONTENT: HOME PAGE */}
      {currentPage === 'home' && (
        <>
          {/* 2. Hero Section */}
          <section className="hero-section">
            <div className="container">
              <div className="hero-grid">
                <div className="hero-left">

                  <h1 className="hero-title">
                    Unlock Your
                    <span>Dream Property</span>
                  </h1>
                  <p className="hero-subtitle">
                    Find verified properties to buy, rent, and invest with confidence. Explore curated premium locations across Noida, Gurgaon, and Delhi.
                  </p>

                  {/* Search Widget */}
                  <div className="search-widget">
                    <div className="search-tabs">
                      <button 
                        className={`tab-btn ${searchTab === 'buy' ? 'active' : ''}`}
                        onClick={() => setSearchTab('buy')}
                      >
                        <Home size={16} /> Buy
                      </button>
                      <button 
                        className={`tab-btn ${searchTab === 'rent' ? 'active' : ''}`}
                        onClick={() => setSearchTab('rent')}
                      >
                        <Key size={16} /> Rent
                      </button>
                      <button 
                        className={`tab-btn ${searchTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setSearchTab('projects')}
                      >
                        <Building size={16} /> Projects
                      </button>
                      <button 
                        className={`tab-btn ${searchTab === 'commercial' ? 'active' : ''}`}
                        onClick={() => setSearchTab('commercial')}
                      >
                        <Briefcase size={16} /> Commercial
                      </button>
                    </div>

                    <form onSubmit={handleSearchSubmit}>
                      <div className="dark-search-capsule">
                        <div className="dark-capsule-group">
                          <span className="dark-capsule-label">Location</span>
                          <input 
                            type="text" 
                            placeholder="Enter city or locality" 
                            className="dark-capsule-input"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                          />
                        </div>
                        <div className="dark-capsule-group">
                          <span className="dark-capsule-label">Property Type</span>
                          <select 
                            className="dark-capsule-select"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                          >
                            <option value="">Select type</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa / House">Villa</option>
                            <option value="Independent Floor">Builder Floor</option>
                            <option value="Plot / Land">Plot</option>
                            <option value="Office Space">Office Space</option>
                          </select>
                        </div>
                        <div className="dark-capsule-group">
                          <span className="dark-capsule-label">Budget</span>
                          <select 
                            className="dark-capsule-select"
                            value={searchBudget}
                            onChange={(e) => setSearchBudget(e.target.value)}
                          >
                            <option value="">Min - Max</option>
                            <option value="50L-1Cr">{RUPEE}50L - {RUPEE}1 Cr</option>
                            <option value="1Cr-2Cr">{RUPEE}1 Cr - {RUPEE}2 Cr</option>
                            <option value="2Cr+">Above {RUPEE}2 Cr</option>
                          </select>
                        </div>


                        <button type="submit" className="capsule-submit-btn">
                          <Search size={16} />
                          Search
                        </button>
                      </div>
                    </form>

                    <div className="popular-locations">
                      <span>POPULAR LOCATIONS:</span>
                      <div className="location-tag" onClick={() => { setSearchLocation('Delhi'); showToast('Selected Delhi'); }}>Delhi</div>
                      <div className="location-tag" onClick={() => { setSearchLocation('Gurgaon'); showToast('Selected Gurgaon'); }}>Gurgaon</div>
                      <div className="location-tag" onClick={() => { setSearchLocation('Noida'); showToast('Selected Noida'); }}>Noida</div>
                      <a href="#all-locations" className="hero-view-all" onClick={navigateToBuy}>View all <ArrowRight size={12} /></a>
                    </div>
                  </div>
                </div>

                {/* Right Card Overlay */}
                <div className="hero-right">
                  <div className="hero-preview-card">
                    <div className="preview-img-container">
                      <img src="/luxury_interior.png" alt="Luxury 4 BHK Villa" />
                      <div className="verified-badge">
                        <Check size={12} strokeWidth={3} />
                        Verified
                      </div>
                      <div className="preview-actions">
                        <button className="circle-action-btn" onClick={() => toggleFavorite(2)}>
                          <Heart size={16} fill={favorites.has(2) ? "#72a801" : "none"} stroke={favorites.has(2) ? "#72a801" : "currentColor"} />
                        </button>
                        <button className="circle-action-btn" onClick={() => showToast(' Villa compared. Features match 98% similarity!')}>
                          <Maximize2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="preview-details">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="preview-title" style={{ cursor: 'pointer' }} onClick={navigateToDetail}>Luxury 4 BHK Villa</h3>
                        <div className="preview-price">{RUPEE} 4.85 Cr</div>
                      </div>
                      <div className="preview-location">
                        <MapPin size={14} />
                        Golf Course Road, Gurgaon
                      </div>

                      <div className="preview-specs">
                        <div className="spec-item"><Bed size={16} /> 4 Beds</div>
                        <div className="spec-item"><Maximize2 size={16} /> 3200 Sq. Ft.</div>
                      </div>

                      <button className="preview-footer-btn" onClick={navigateToDetail}>
                        View Details <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hero-wave-divider">
              <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M0,80 C360,20 720,110 1080,60 C1260,30 1380,60 1440,80" 
                  fill="none" 
                  stroke="var(--primary-lime)" 
                  strokeWidth="6" 
                />
                <path 
                  d="M0,80 C360,20 720,110 1080,60 C1260,30 1380,60 1440,80 L1440,120 L0,120 Z" 
                  fill="var(--white)" 
                />
              </svg>
            </div>
          </section>



          {/* 4. Explore by Category */}
          <section className="section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">Explore <span>Properties By Category</span></h2>
                <a href="#all-categories" className="section-link" onClick={navigateToBuy}>
                  View All Categories <ArrowRight size={14} />
                </a>
              </div>

              <div className="category-grid">
                {categories.map((cat, i) => (
                  <div 
                    key={i} 
                    className="category-card"
                    onClick={() => {
                      setFilterTypes([cat.name.replace(/s$/, '')]); // Map plural to singular
                      navigateToBuy();
                    }}
                  >
                    <div className="category-icon">{cat.icon}</div>
                    <span className="category-name">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Featured Properties */}
          <section className="section" style={{ backgroundColor: '#f8fafc' }}>
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">Featured <span>Properties</span></h2>
                <a href="#all-properties" className="section-link" onClick={navigateToBuy}>
                  View All Properties <ArrowRight size={14} />
                </a>
              </div>

              <div className="featured-grid">
                {[...postedProperties, ...featuredProperties].slice(0, 4).map((prop) => (
                  <div key={prop.id} className="property-card">
                    <div className="property-img-wrapper" style={{ cursor: 'pointer' }} onClick={(e) => navigateToDetail(e, prop)}>
                      <img src={prop.image} alt={prop.title} />
                      {prop.verified && (
                        <div className="verified-badge">
                          <Check size={10} strokeWidth={3} />
                          Verified
                        </div>
                      )}
                      <button 
                        className="circle-action-btn" 
                        style={{ position: 'absolute', top: '16px', right: '16px' }}
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(prop.id); }}
                      >
                        <Heart size={14} fill={favorites.has(prop.id) ? "#72a801" : "none"} stroke={favorites.has(prop.id) ? "#72a801" : "currentColor"} />
                      </button>
                    </div>

                    <div className="property-details">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="property-price">{normalizeRupeeText(prop.price)}</div>
                      </div>
                      <h3 className="property-title" style={{ cursor: 'pointer' }} onClick={(e) => navigateToDetail(e, prop)}>{prop.title}</h3>
                      <div className="property-location">
                        <MapPin size={12} />
                        {prop.location}
                      </div>

                      <div className="property-specs">
                        <span className="spec-item"><Bed size={14} /> {prop.beds}</span>
                        <span className="spec-item"><Maximize2 size={14} /> {prop.area}</span>
                      </div>

                      <div className="property-agent">
                        <div className="agent-profile">
                          <img src={prop.agentAvatar} alt={prop.agentName} className="agent-avatar" />
                          <span className="agent-name">{prop.agentName}</span>
                        </div>
                        <span className="agent-rating">
                          <Star size={12} fill="currentColor" />
                          {prop.agentRating} <span className="rating-count">({prop.agentReviewsCount})</span>
                        </span>
                      </div>

                      <div className="property-card-actions">
                        <button className="card-view-btn" onClick={(e) => navigateToDetail(e, prop)}>
                          View Details
                        </button>
                        <button className="contact-action-btn" onClick={() => handleContactAction('phone', prop.agentName)}>
                          <Phone size={15} />
                        </button>
                        <button className="contact-action-btn" onClick={() => handleContactAction('whatsapp', prop.agentName)}>
                          <MessageSquare size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination-dots">
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </section>

          {/* New Wavy Banner Section */}
          <section className="wavy-banner-section">
            <div className="wavy-banner-top-divider">
              <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M0,40 C360,100 720,10 1080,70 C1260,100 1380,80 1440,40" 
                  fill="none" 
                  stroke="var(--primary-lime)" 
                  strokeWidth="6" 
                />
                <path 
                  d="M0,40 C360,100 720,10 1080,70 C1260,100 1380,80 1440,40 L1440,0 L0,0 Z" 
                  fill="#f8fafc" 
                />
              </svg>
            </div>

            <div className="container">
              <div className="wavy-banner-content">
                <span className="wavy-banner-badge">Exclusive Showcase</span>
                <h2 className="wavy-banner-title">Find Your Signature Address</h2>
                <p className="wavy-banner-desc">
                  Explore premium architectural marvels and luxury residential projects curated directly from India's preeminent builders. Get direct verified re-sales, secure bookings, and tailored payment plans.
                </p>
                <div className="wavy-banner-actions">
                  <button className="post-btn" onClick={navigateToProjects}>
                    Explore Luxury Projects <ArrowRight size={16} />
                  </button>
                  <button className="detail-outline-btn" style={{ borderColor: 'var(--white)', color: 'var(--white)', padding: '10px 24px', borderRadius: '30px' }} onClick={() => handleAction('Schedule Signature Consultation', 'Book an exclusive session with our prime property consultant.', 'Enter your contact number', 'Book Slot')}>
                    Schedule Private Tour
                  </button>
                </div>
              </div>
            </div>

            <div className="wavy-banner-bottom-divider">
              <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M0,80 C360,20 720,110 1080,60 C1260,30 1380,60 1440,80" 
                  fill="none" 
                  stroke="var(--primary-lime)" 
                  strokeWidth="6" 
                />
                <path 
                  d="M0,80 C360,20 720,110 1080,60 C1260,30 1380,60 1440,80 L1440,120 L0,120 Z" 
                  fill="#ffffff" 
                />
              </svg>
            </div>
          </section>

          {/* 6. New Launch Projects */}
          <section className="section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">New Launch <span>Projects</span></h2>

              </div>

              <div className="new-launch-grid">
                {newLaunches.map((proj) => (
                  <div key={proj.id} className="project-card" onClick={() => handleAction(proj.title, `Pre-book details. Exclusive project layouts, location map, pricing sheets, downpayment schedule, RERA certificate.`, 'Your phone number', 'Pre-Register')}>
                    <img src={proj.image} alt={proj.title} />
                    <div className="project-overlay">
                      <h3 className="project-title">{proj.title}</h3>
                      <div className="project-meta">
                        <MapPin size={12} />
                        {proj.location}
                      </div>
                      <div className="project-meta">
                        <Building size={12} />
                        {proj.type}
                      </div>
                      <div className="project-price-range">{normalizeRupeeText(proj.price)}</div>
                      <div className="project-footer">
                        <span>{proj.possession}</span>
                        <div className="circle-arrow-btn">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Our Services */}
          <section className="section" style={{ backgroundColor: '#f8fafc' }}>
            <div className="container">
              <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '50px' }}>
                <h2 className="section-title">Our <span>Services</span></h2>
              </div>

              <div className="services-grid">
                {services.map((service, i) => (
                  <div 
                    key={i} 
                    className="service-card"
                    onClick={() => handleAction(service.title, `Learn more about our customized '${service.title}' features tailored to your real estate interests.`, 'Your mobile number', 'Inquire Service')}
                  >
                    <div className="service-icon-box">{service.icon}</div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Why Choose AcresKey */}
          <section className="section">
            <div className="container">
              <div className="why-grid">
                <div className="why-left">
                  <h2 className="section-title">Why Choose <span>AcresKey</span></h2>
                  
                  <div className="benefits-grid">
                    <div className="benefit-item">
                      <div className="benefit-icon-wrapper"><Check size={18} /></div>
                      <h3 className="benefit-title">Verified Listings</h3>
                      <p className="benefit-desc">Every single property listed on our platform is physically and legally verified by our team of realtors.</p>
                    </div>
                    <div className="benefit-item">
                      <div className="benefit-icon-wrapper"><User size={18} /></div>
                      <h3 className="benefit-title">Expert Guidance</h3>
                      <p className="benefit-desc">Get professional local market predictions and personalized investment advice from expert agents.</p>
                    </div>
                    <div className="benefit-item">
                      <div className="benefit-icon-wrapper"><Check size={18} /></div>
                      <h3 className="benefit-title">Transparent Process</h3>
                      <p className="benefit-desc">Zero hidden charges, direct owner discussions, and clear transaction stages from initial offer to purchase.</p>
                    </div>
                    <div className="benefit-item">
                      <div className="benefit-icon-wrapper"><Users size={18} /></div>
                      <h3 className="benefit-title">End-to-End Support</h3>
                      <p className="benefit-desc">We manage documentation search, RERA clearance checks, home loans, registry, and property possession handover.</p>
                    </div>
                  </div>
                </div>

                <div className="why-right">
                  <img src="/hero_villa.png" alt="AcresKey Trust" />
                  <div className="video-overlay">
                    <button className="play-btn" onClick={() => handleAction('Watch Corporate Video', 'Watch how AcresKey works, client reviews, office setup, and properties site tours verification.', 'Enter your email to receive video link', 'Watch Now')}>
                      <Play size={24} fill="currentColor" style={{ marginLeft: '4px' }} />
                    </button>
                  </div>
                  <div className="experience-badge">
                    <div className="experience-number">15+ Years</div>
                    <div className="experience-label">Of Trust & Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Client Reviews */}
          <section className="section" style={{ backgroundColor: '#f8fafc' }}>
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">What Our <span>Clients Say</span></h2>
                <div className="testimonial-nav-arrows" style={{ display: 'flex', gap: '10px' }}>
                  <button className="contact-action-btn" onClick={() => {
                    setReviewIndex(reviewIndex === 0 ? testimonials.length - 1 : reviewIndex - 1);
                  }}>
                    <ChevronLeft size={16} />
                  </button>
                  <button className="contact-action-btn" onClick={() => {
                    setReviewIndex((reviewIndex + 1) % testimonials.length);
                  }}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="reviews-grid">
                {testimonials.map((test, index) => {
                  const isActive = index === reviewIndex;
                  return (
                    <div 
                      key={test.id} 
                      className="review-card"
                      style={{
                        border: isActive ? '2px solid #72a801' : '1px solid #e2e8f0',
                        transform: isActive ? 'scale(1.02)' : 'none',
                        zIndex: isActive ? 2 : 1
                      }}
                    >
                      <span className="quote-mark">{'\u201c'}</span>
                      <div className="review-stars">
                        {[...Array(test.stars)].map((_, i) => (
                          <Star key={i} size={15} fill="currentColor" />
                        ))}
                      </div>
                      <p className="review-text">"{test.text}"</p>
                      <div className="review-user">
                        <img src={test.avatar} alt={test.name} className="user-avatar" />
                        <div>
                          <h4 className="user-name">{test.name}</h4>
                          <span className="user-role">{test.role}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pagination-dots testimonial-dots">
                {testimonials.map((_, i) => (
                  <div 
                    key={i} 
                    className={`dot ${i === reviewIndex ? 'active' : ''}`}
                    onClick={() => setReviewIndex(i)}
                  ></div>
                ))}
              </div>
            </div>
          </section>

          {/* 10. From Our Blog */}
          <section className="section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">From Our <span>Blog</span></h2>
                <a href="#all-blogs" className="section-link" onClick={() => handleAction('Real Estate Blog', 'Subscribe to receive weekly insights on capital value updates, construction status, and home buying guidelines.', 'Your email address', 'Subscribe')}>
                  View All Blogs <ArrowRight size={14} />
                </a>
              </div>

              <div className="blog-grid">
                {blogs.map((blog) => (
                  <div key={blog.id} className="blog-card" onClick={() => handleAction(blog.title, `Access complete study report on ${blog.tag} market trends and expert analysis.`, 'Your email address', 'Read Full Article')}>
                    <div className="blog-img-wrapper">
                      <img src={blog.image} alt={blog.title} />
                      <span className="blog-tag">{blog.tag}</span>
                    </div>
                    <div className="blog-content">
                      <h3 className="blog-title">{blog.title}</h3>
                      <div className="blog-meta">
                        <span className="blog-meta-item">
                          <Calendar size={13} />
                          {blog.date}
                        </span>
                        <span className="blog-meta-item">
                          <Clock size={13} />
                          {blog.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 11. CTA Banner Section */}
          <section className="cta-section">
            <div className="container">
              <div className="cta-banner">
                <div className="cta-left">
                  <h2 className="cta-title">Ready to Find Your Dream Property?</h2>
                  <p className="cta-subtitle">Explore thousands of verified properties and take the first step towards owning your dream home.</p>
                </div>
                <div className="cta-actions">
                  <button className="cta-btn-white" onClick={navigateToBuy}>
                    Browse Properties <ArrowRight size={16} />
                  </button>
                  <button className="cta-btn-outline" onClick={() => handleAction('Talk with Property Consultant', 'Get custom site tours and developer plans scheduled. Speak with our NCR team leads.', 'Your phone number', 'Request Call')}>
                    <Phone size={15} /> Talk to Expert
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* DYNAMIC SUBPAGE CONTENT: BUY PROPERTIES PAGE */}
      {currentPage === 'buy' && (
        <>
          {/* Subpage Hero Header - matches reference mockup */}
          <section className="buy-hero">
            <div className="container">
              {/* Breadcrumb */}
              <div className="buy-breadcrumb">
                <span onClick={navigateToHome} style={{ cursor: 'pointer' }}>Home</span>
                <ChevronRight size={14} />
                <span>Buy Properties</span>
              </div>

              <div className="buy-hero-content">
                <h1 className="buy-hero-title">
                  Buy <span style={{ color: 'var(--primary-lime)' }}>Properties</span>
                </h1>
                <p className="buy-hero-subtitle">Explore 5000+ verified properties for sale across India.</p>

                {/* Search Bar Capsule */}
                <form className="dark-search-capsule" onSubmit={(e) => { e.preventDefault(); showToast('Search applied'); }}>
                  <div className="dark-capsule-group">
                    <span className="dark-capsule-label">Location</span>
                    <input 
                      type="text" 
                      placeholder="Enter city or locality" 
                      className="dark-capsule-input"
                      value={searchLocation}
                      onChange={(e) => {
                        setSearchLocation(e.target.value);
                        if (e.target.value) {
                          setFilterLocations([e.target.value]);
                        } else {
                          setFilterLocations([]);
                        }
                      }}
                    />
                  </div>
                  <div className="dark-capsule-group">
                    <span className="dark-capsule-label">Property Type</span>
                    <select 
                      className="dark-capsule-select"
                      value={filterTypes[0] || ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFilterTypes([e.target.value]);
                        } else {
                          setFilterTypes([]);
                        }
                      }}
                    >
                      <option value="">Select type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa / House">Villa / House</option>
                      <option value="Independent Floor">Independent Floor</option>
                      <option value="Plot / Land">Plot / Land</option>
                      <option value="Office Space">Office Space</option>
                    </select>
                  </div>
                  <div className="dark-capsule-group">
                    <span className="dark-capsule-label">Budget</span>
                    <select 
                      className="dark-capsule-select"
                      value={filterBudget}
                      onChange={(e) => setFilterBudget(e.target.value)}
                    >
                      <option value="">Min - Max</option>
                      <option value="50L-1Cr">{RUPEE}50L - {RUPEE}1 Cr</option>
                      <option value="1Cr-2Cr">{RUPEE}1 Cr - {RUPEE}2 Cr</option>
                      <option value="2Cr+">Above {RUPEE}2 Cr</option>
                    </select>
                  </div>

                  <button type="submit" className="capsule-submit-btn">
                    <Search size={16} /> Search
                  </button>
                </form>

                {/* Popular Searches */}
                <div className="buy-popular-searches">
                  <span>Popular Searches:</span>
                  <button className="buy-search-pill" onClick={() => { setFilterLocations(['Gurgaon']); setFilterBhk('3 BHK'); showToast('Applied: 3 BHK in Gurgaon'); }}>3 BHK in Gurgaon</button>
                  <button className="buy-search-pill" onClick={() => { setFilterLocations(['Noida']); setFilterTypes(['Villa / House']); showToast('Applied: Villas in Noida'); }}>Villas in Noida</button>
                  <button className="buy-search-pill" onClick={() => { setFilterLocations(['Mumbai']); setFilterTypes(['Apartment']); showToast('Applied: Apartments in Mumbai'); }}>Apartment in Mumbai</button>
                  <button className="buy-search-pill" onClick={() => { setFilterLocations(['Bangalore']); setFilterTypes(['Plot / Land']); showToast('Applied: Plots in Bangalore'); }}>Plots in Bangalore</button>
                  <button className="buy-search-pill" onClick={() => { setFilterBudget('2Cr+'); showToast('Applied: Luxury Homes > \u20B92 Cr'); }}>Luxury Homes</button>
                </div>
              </div>
            </div>
          </section>

          {/* Main Layout Area */}
          <div className="container">
            <div className="buy-layout">
              {/* Sidebar Filters */}
              <aside className={`filter-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
                <div className="filter-sidebar-header">
                  <h3 className="filter-sidebar-title">Filter Properties</h3>
                  <div className="filter-header-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span className="filter-reset-link" onClick={clearAllFilters}>Reset</span>
                    <button className="mobile-filter-close" onClick={() => setIsMobileFilterOpen(false)}><X size={18} /></button>
                  </div>
                </div>

                {/* 1. Location Group */}
                <div className="filter-group">
                  <div className="filter-group-header">
                    <span className="filter-group-title">Location</span>
                    <ChevronDown size={14} />
                  </div>
                  <div className="filter-options-list">
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterLocations.includes('Gurgaon')}
                        onChange={() => toggleLocationFilter('Gurgaon')}
                      />
                      Gurgaon <span>(320+)</span>
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterLocations.includes('Noida')}
                        onChange={() => toggleLocationFilter('Noida')}
                      />
                      Noida <span>(260+)</span>
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterLocations.includes('Delhi')}
                        onChange={() => toggleLocationFilter('Delhi')}
                      />
                      Delhi <span>(180+)</span>
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterLocations.includes('Mumbai')}
                        onChange={() => toggleLocationFilter('Mumbai')}
                      />
                      Mumbai <span>(340+)</span>
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterLocations.includes('Bangalore')}
                        onChange={() => toggleLocationFilter('Bangalore')}
                      />
                      Bangalore <span>(280+)</span>
                    </label>
                  </div>
                </div>

                {/* 2. Property Type Group */}
                <div className="filter-group">
                  <div className="filter-group-header">
                    <span className="filter-group-title">Property Type</span>
                    <ChevronDown size={14} />
                  </div>
                  <div className="filter-options-list">
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterTypes.includes('Apartment')}
                        onChange={() => toggleTypeFilter('Apartment')}
                      />
                      Apartment
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterTypes.includes('Villa / House')}
                        onChange={() => toggleTypeFilter('Villa / House')}
                      />
                      Villa / House
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterTypes.includes('Plot / Land')}
                        onChange={() => toggleTypeFilter('Plot / Land')}
                      />
                      Plot / Land
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterTypes.includes('Office Space')}
                        onChange={() => toggleTypeFilter('Office Space')}
                      />
                      Office Space
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterTypes.includes('Independent Floor')}
                        onChange={() => toggleTypeFilter('Independent Floor')}
                      />
                      Independent Floor
                    </label>
                  </div>
                </div>

                {/* 3. Budget presets */}
                <div className="filter-group">
                  <div className="filter-group-header">
                    <span className="filter-group-title">Budget</span>
                    <ChevronDown size={14} />
                  </div>
                  <div className="budget-presets">
                    <button 
                      className={`budget-preset-btn ${filterBudget === '50L-1Cr' ? 'active' : ''}`}
                      onClick={() => setFilterBudget(filterBudget === '50L-1Cr' ? '' : '50L-1Cr')}
                    >
                      50L - 1Cr
                    </button>
                    <button 
                      className={`budget-preset-btn ${filterBudget === '1Cr-2Cr' ? 'active' : ''}`}
                      onClick={() => setFilterBudget(filterBudget === '1Cr-2Cr' ? '' : '1Cr-2Cr')}
                    >
                      1Cr - 2Cr
                    </button>
                    <button 
                      className={`budget-preset-btn ${filterBudget === '2Cr+' ? 'active' : ''}`}
                      onClick={() => setFilterBudget(filterBudget === '2Cr+' ? '' : '2Cr+')}
                    >
                      2Cr+
                    </button>
                  </div>
                </div>

                {/* 4. BHK selector */}
                <div className="filter-group">
                  <div className="filter-group-header">
                    <span className="filter-group-title">BHK</span>
                    <ChevronDown size={14} />
                  </div>
                  <div className="bhk-selector-grid">
                    <button 
                      className={`bhk-preset-btn ${filterBhk === '1 BHK' ? 'active' : ''}`}
                      onClick={() => setFilterBhk(filterBhk === '1 BHK' ? '' : '1 BHK')}
                    >
                      1 BHK
                    </button>
                    <button 
                      className={`bhk-preset-btn ${filterBhk === '2 BHK' ? 'active' : ''}`}
                      onClick={() => setFilterBhk(filterBhk === '2 BHK' ? '' : '2 BHK')}
                    >
                      2 BHK
                    </button>
                    <button 
                      className={`bhk-preset-btn ${filterBhk === '3 BHK' ? 'active' : ''}`}
                      onClick={() => setFilterBhk(filterBhk === '3 BHK' ? '' : '3 BHK')}
                    >
                      3 BHK
                    </button>
                    <button 
                      className={`bhk-preset-btn ${filterBhk === '4 BHK' ? 'active' : ''}`}
                      onClick={() => setFilterBhk(filterBhk === '4 BHK' ? '' : '4 BHK')}
                    >
                      4 BHK
                    </button>
                    <button 
                      className={`bhk-preset-btn ${filterBhk === '5 BHK+' ? 'active' : ''}`}
                      onClick={() => setFilterBhk(filterBhk === '5 BHK+' ? '' : '5 BHK+')}
                    >
                      5 BHK+
                    </button>
                  </div>
                </div>

                <div className="filter-group">
                  <div className="filter-group-header" onClick={() => showToast('Expanding Area Filters')}>
                    <span className="filter-group-title" style={{ fontSize: '11px', color: 'var(--slate-400)' }}>Area (Sq. Ft.)</span>
                    <ChevronDown size={12} />
                  </div>
                </div>
                <div className="filter-group" style={{ marginTop: '-12px' }}>
                  <div className="filter-group-header" onClick={() => showToast('Expanding Furnishing options')}>
                    <span className="filter-group-title" style={{ fontSize: '11px', color: 'var(--slate-400)' }}>Furnishing</span>
                    <ChevronDown size={12} />
                  </div>
                </div>
                <div className="filter-group" style={{ marginTop: '-12px' }}>
                  <div className="filter-group-header" onClick={() => showToast('Expanding Amenities')}>
                    <span className="filter-group-title" style={{ fontSize: '11px', color: 'var(--slate-400)' }}>Amenities</span>
                    <ChevronDown size={12} />
                  </div>
                </div>

                <button className="clear-filters-btn" onClick={clearAllFilters}>
                  Clear All Filters
                </button>
              </aside>

              {/* Listings Container */}
              <div className="listings-container">
                <div className="results-header-row">
                  <span className="results-count">
                    Showing 1 {'\u2013'} {Math.min(filteredProperties.length, 20)} of 1,250+ properties
                  </span>
                  
                  <div className="results-actions-right">
                    <button className="mobile-filter-toggle-btn" onClick={() => setIsMobileFilterOpen(true)}>
                      <Filter size={15} /> Filters
                    </button>
                    <div className="view-toggle-group">
                      <button 
                        className={`view-toggle-btn ${layoutMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setLayoutMode('grid')}
                      >
                        <Grid size={15} />
                      </button>
                      <button 
                        className={`view-toggle-btn ${layoutMode === 'list' ? 'active' : ''}`}
                        onClick={() => setLayoutMode('list')}
                      >
                        <List size={15} />
                      </button>
                    </div>

                    <div className="sort-select-wrapper">
                      <span>Sort by:</span>
                      <select 
                        className="sort-select-dropdown"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="relevance">Relevance</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>
                </div>

                {filteredProperties.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '80px 20px',
                    backgroundColor: 'var(--slate-50)',
                    border: '1px dashed var(--border-color)',
                    borderRadius: '16px'
                  }}>
                    <Info size={36} style={{ color: 'var(--slate-400)', marginBottom: '16px' }} />
                    <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--slate-800)', marginBottom: '8px' }}>No properties found</h4>
                    <p style={{ color: 'var(--slate-500)', fontSize: '14px' }}>Try loosening your active filters or clear search query to inspect other areas.</p>
                  </div>
                ) : (
                  <div className={`buy-listings-grid${layoutMode === 'list' ? ' buy-listings-grid--list' : ''}`} style={{ gridTemplateColumns: layoutMode === 'list' ? '1fr' : undefined }}>
                    {filteredProperties.map((prop) => (
                      <div 
                        key={prop.id} 
                        className={`property-card${layoutMode === 'list' ? ' property-card--list' : ''}`}
                      >
                        <div 
                          className="property-img-wrapper"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => navigateToDetail(e, prop)}
                        >
                          <img src={prop.image} alt={prop.title} />
                          {prop.verified && (
                            <div className="verified-badge">
                              <Check size={10} strokeWidth={3} />
                              Verified
                            </div>
                          )}
                          <div className="card-photos-badge">
                            <CameraIcon size={12} />
                            {prop.photos} Photos
                          </div>
                          <button 
                            className="circle-action-btn" 
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(prop.id); }}
                          >
                            <Heart size={14} fill={favorites.has(prop.id) ? "#72a801" : "none"} stroke={favorites.has(prop.id) ? "#72a801" : "currentColor"} />
                          </button>
                        </div>

                        <div className="property-details">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="property-price">{normalizeRupeeText(prop.price)}</div>
                          </div>
                          <h3 className="property-title" style={{ cursor: 'pointer' }} onClick={(e) => navigateToDetail(e, prop)}>{prop.title}</h3>
                          <div className="property-location">
                            <MapPin size={12} />
                            {prop.location}
                          </div>

                          <div className="property-specs">
                            <span className="spec-item"><Bed size={14} /> {prop.beds}</span>
                            <span className="spec-item"><Maximize2 size={14} /> {prop.area}</span>
                          </div>

                          <div className="property-agent">
                            <div className="agent-profile">
                              <img src={prop.agentAvatar} alt={prop.agentName} className="agent-avatar" />
                              <span className="agent-name">{prop.agentName}</span>
                            </div>
                            <span className="agent-rating">
                              <Star size={12} fill="currentColor" />
                              {prop.agentRating} <span className="rating-count">({prop.agentReviewsCount})</span>
                            </span>
                          </div>

                          <div className="property-card-actions">
                            <button className="card-view-btn" onClick={(e) => navigateToDetail(e, prop)}>
                              View Details
                            </button>
                            <button className="contact-action-btn" onClick={() => handleContactAction('phone', prop.agentName)}>
                              <Phone size={15} />
                            </button>
                            <button className="contact-action-btn" onClick={() => handleContactAction('whatsapp', prop.agentName)}>
                              <MessageSquare size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="pagination-container">
                  <div className="pagination-item active">1</div>
                  <div className="pagination-item">2</div>
                  <div className="pagination-item">3</div>
                  <div className="pagination-item">4</div>
                  <div className="pagination-item dots">...</div>
                  <div className="pagination-item">62</div>
                  <div className="pagination-item" onClick={() => showToast('Navigating to next page')}><ChevronRight size={14} /></div>
                </div>
              </div>
            </div>
          </div>



        </>
      )}

      {/* DYNAMIC SUBPAGE CONTENT: RENT PROPERTIES PAGE */}
      {currentPage === 'rent' && (
        <>
          {/* Subpage Hero Header */}
          <section className="buy-hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.65) 100%), url('/assets/rent_hero_property.png')` }}>
            <div className="container">
              <div className="buy-hero-content">
                <h1 className="buy-hero-title">Rent <span style={{ color: 'var(--primary-lime)' }}>Properties</span></h1>
                <p className="buy-hero-subtitle">Find the perfect rental property that fits your lifestyle and budget.</p>
 
                {/* Inline Search Bar */}
                <div className="buy-search-widget" style={{ backgroundColor: 'transparent', boxShadow: 'none', padding: 0 }}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="dark-search-capsule">
                      <div className="dark-capsule-group">
                        <span className="dark-capsule-label">Location</span>
                        <input 
                          type="text" 
                          placeholder="Enter city or locality" 
                          className="dark-capsule-input"
                          value={searchLocation}
                          onChange={(e) => {
                            setSearchLocation(e.target.value);
                            if (e.target.value) {
                              setFilterRentLocations([e.target.value]);
                            } else {
                              setFilterRentLocations([]);
                            }
                          }}
                        />
                      </div>
                      <div className="dark-capsule-group">
                        <span className="dark-capsule-label">Property Type</span>
                        <select 
                          className="dark-capsule-select"
                          value={filterRentTypes[0] || ''}
                          onChange={(e) => {
                            if (e.target.value) {
                              setFilterRentTypes([e.target.value]);
                            } else {
                              setFilterRentTypes([]);
                            }
                          }}
                        >
                          <option value="">Select type</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Independent House / Villa">Villa / House</option>
                          <option value="Studio Apartment">Studio Apartment</option>
                          <option value="PG / Co-living">PG / Co-living</option>
                          <option value="Builder Floor">Builder Floor</option>
                        </select>
                      </div>
                      <div className="dark-capsule-group">
                        <span className="dark-capsule-label">Budget</span>
                        <select 
                          className="dark-capsule-select"
                          value={filterRentBudget}
                          onChange={(e) => setFilterRentBudget(e.target.value)}
                        >
                          <option value="">Min - Max</option>
                          <option value="0-10k">{RUPEE}0 - {RUPEE}10,000</option>
                          <option value="10k-25k">{RUPEE}10,000 - {RUPEE}25,000</option>
                          <option value="25k-50k">{RUPEE}25,000 - {RUPEE}50,000</option>
                          <option value="50k+">Above {RUPEE}50,000</option>
                        </select>
                      </div>

                      
                      <button type="button" className="capsule-submit-btn" onClick={() => showToast('Rent search applied')}>
                        <Search size={16} /> Search
                      </button>
                    </div>
                  </form>
                </div>

                <div className="buy-popular-searches">
                  <span>Popular Searches:</span>
                  <div className="search-pill" onClick={() => { setFilterRentLocations(['Mumbai']); setFilterRentBhk('1 BHK'); showToast('Applied Mumbai & 1 BHK filter'); }}>1 BHK in Mumbai</div>
                  <div className="search-pill" onClick={() => { setFilterRentLocations(['Bangalore']); setFilterRentBhk('2 BHK'); showToast('Applied Bangalore & 2 BHK filter'); }}>2 BHK in Bangalore</div>
                  <div className="search-pill" onClick={() => { setFilterRentTypes(['Studio Apartment']); showToast('Applied Studio Apartment filter'); }}>Studio Apartments</div>
                  <div className="search-pill" onClick={() => { setFilterRentBudget('10k-25k'); showToast('Applied budget preset \u20B910k - \u20B925k'); }}>Furnished Flats</div>
                  <div className="search-pill" onClick={() => { setFilterRentLocations([]); setFilterRentTypes([]); setFilterRentBhk(''); setFilterRentBudget(''); showToast('Cleared search filters'); }}>View All {'\u2192'}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Layout Area */}
          <div className="container">
            <div className="buy-layout">
              {/* Sidebar Filters */}
              <aside className={`filter-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
                <div className="filter-sidebar-header">
                  <h3 className="filter-sidebar-title">Filter Properties</h3>
                  <div className="filter-header-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span className="filter-reset-link" onClick={clearAllRentFilters}>Reset</span>
                    <button className="mobile-filter-close" onClick={() => setIsMobileFilterOpen(false)}><X size={18} /></button>
                  </div>
                </div>

                {/* 1. Location Group */}
                <div className="filter-group">
                  <div className="filter-group-header">
                    <span className="filter-group-title">Location</span>
                    <ChevronDown size={14} />
                  </div>
                  <div className="filter-options-list">
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterRentLocations.includes('Mumbai')}
                        onChange={() => toggleRentLocationFilter('Mumbai')}
                      />
                      Mumbai <span>(1220+)</span>
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterRentLocations.includes('Bangalore')}
                        onChange={() => toggleRentLocationFilter('Bangalore')}
                      />
                      Bangalore <span>(980+)</span>
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterRentLocations.includes('Delhi')}
                        onChange={() => toggleRentLocationFilter('Delhi')}
                      />
                      Delhi <span>(870+)</span>
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterRentLocations.includes('Pune')}
                        onChange={() => toggleRentLocationFilter('Pune')}
                      />
                      Pune <span>(640+)</span>
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterRentLocations.includes('Hyderabad')}
                        onChange={() => toggleRentLocationFilter('Hyderabad')}
                      />
                      Hyderabad <span>(520+)</span>
                    </label>
                  </div>
                </div>

                {/* 2. Property Type Group */}
                <div className="filter-group">
                  <div className="filter-group-header">
                    <span className="filter-group-title">Property Type</span>
                    <ChevronDown size={14} />
                  </div>
                  <div className="filter-options-list">
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterRentTypes.includes('Apartment')}
                        onChange={() => toggleRentTypeFilter('Apartment')}
                      />
                      Apartment
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterRentTypes.includes('Independent House / Villa')}
                        onChange={() => toggleRentTypeFilter('Independent House / Villa')}
                      />
                      Independent House / Villa
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterRentTypes.includes('Studio Apartment')}
                        onChange={() => toggleRentTypeFilter('Studio Apartment')}
                      />
                      Studio Apartment
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterRentTypes.includes('PG / Co-living')}
                        onChange={() => toggleRentTypeFilter('PG / Co-living')}
                      />
                      PG / Co-living
                    </label>
                    <label className="filter-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={filterRentTypes.includes('Builder Floor')}
                        onChange={() => toggleRentTypeFilter('Builder Floor')}
                      />
                      Builder Floor
                    </label>
                  </div>
                </div>

                {/* 3. Budget presets */}
                <div className="filter-group">
                  <div className="filter-group-header">
                    <span className="filter-group-title">Budget (Monthly Rent)</span>
                    <ChevronDown size={14} />
                  </div>
                  <div className="budget-presets" style={{ flexWrap: 'wrap', gap: '8px' }}>
                    <button 
                      className={`budget-preset-btn ${filterRentBudget === '0-10k' ? 'active' : ''}`}
                      onClick={() => setFilterRentBudget(filterRentBudget === '0-10k' ? '' : '0-10k')}
                      style={{ flex: '1 0 45%' }}
                    >
                      0 - 10k
                    </button>
                    <button 
                      className={`budget-preset-btn ${filterRentBudget === '10k-25k' ? 'active' : ''}`}
                      onClick={() => setFilterRentBudget(filterRentBudget === '10k-25k' ? '' : '10k-25k')}
                      style={{ flex: '1 0 45%' }}
                    >
                      10k - 25k
                    </button>
                    <button 
                      className={`budget-preset-btn ${filterRentBudget === '25k-50k' ? 'active' : ''}`}
                      onClick={() => setFilterRentBudget(filterRentBudget === '25k-50k' ? '' : '25k-50k')}
                      style={{ flex: '1 0 45%' }}
                    >
                      25k - 50k
                    </button>
                    <button 
                      className={`budget-preset-btn ${filterRentBudget === '50k+' ? 'active' : ''}`}
                      onClick={() => setFilterRentBudget(filterRentBudget === '50k+' ? '' : '50k+')}
                      style={{ flex: '1 0 45%' }}
                    >
                      50k+
                    </button>
                  </div>
                </div>

                {/* 4. BHK selector */}
                <div className="filter-group">
                  <div className="filter-group-header">
                    <span className="filter-group-title">BHK</span>
                    <ChevronDown size={14} />
                  </div>
                  <div className="bhk-selector-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <button 
                      className={`bhk-preset-btn ${filterRentBhk === '1 BHK' ? 'active' : ''}`}
                      onClick={() => setFilterRentBhk(filterRentBhk === '1 BHK' ? '' : '1 BHK')}
                    >
                      1BHK
                    </button>
                    <button 
                      className={`bhk-preset-btn ${filterRentBhk === '2 BHK' ? 'active' : ''}`}
                      onClick={() => setFilterRentBhk(filterRentBhk === '2 BHK' ? '' : '2 BHK')}
                    >
                      2BHK
                    </button>
                    <button 
                      className={`bhk-preset-btn ${filterRentBhk === '3 BHK' ? 'active' : ''}`}
                      onClick={() => setFilterRentBhk(filterRentBhk === '3 BHK' ? '' : '3 BHK')}
                    >
                      3BHK
                    </button>
                    <button 
                      className={`bhk-preset-btn ${filterRentBhk === '4 BHK' ? 'active' : ''}`}
                      onClick={() => setFilterRentBhk(filterRentBhk === '4 BHK' ? '' : '4 BHK')}
                    >
                      4BHK
                    </button>
                    <button 
                      className={`bhk-preset-btn ${filterRentBhk === 'Studio' ? 'active' : ''}`}
                      onClick={() => setFilterRentBhk(filterRentBhk === 'Studio' ? '' : 'Studio')}
                      style={{ fontSize: '11px', padding: '8px 2px' }}
                    >
                      Studio
                    </button>
                    <button 
                      className={`bhk-preset-btn ${filterRentBhk === '1 RK' ? 'active' : ''}`}
                      onClick={() => setFilterRentBhk(filterRentBhk === '1 RK' ? '' : '1 RK')}
                    >
                      1RK
                    </button>
                  </div>
                </div>

                <div className="filter-group">
                  <div className="filter-group-header" onClick={() => showToast('Expanding Furnishing Options')}>
                    <span className="filter-group-title" style={{ fontSize: '11px', color: 'var(--slate-400)' }}>Furnishing</span>
                    <ChevronDown size={12} />
                  </div>
                </div>
                <div className="filter-group" style={{ marginTop: '-12px' }}>
                  <div className="filter-group-header" onClick={() => showToast('Expanding Tenant options')}>
                    <span className="filter-group-title" style={{ fontSize: '11px', color: 'var(--slate-400)' }}>Tenant Type</span>
                    <ChevronDown size={12} />
                  </div>
                </div>
                <div className="filter-group" style={{ marginTop: '-12px' }}>
                  <div className="filter-group-header" onClick={() => showToast('Expanding Availability')}>
                    <span className="filter-group-title" style={{ fontSize: '11px', color: 'var(--slate-400)' }}>Availability</span>
                    <ChevronDown size={12} />
                  </div>
                </div>
                <div className="filter-group" style={{ marginTop: '-12px' }}>
                  <div className="filter-group-header" onClick={() => showToast('Expanding Amenities')}>
                    <span className="filter-group-title" style={{ fontSize: '11px', color: 'var(--slate-400)' }}>Amenities</span>
                    <ChevronDown size={12} />
                  </div>
                </div>

                <button className="clear-filters-btn" onClick={clearAllRentFilters}>
                  Clear All Filters
                </button>
              </aside>

              {/* Listings container grid */}
              <div className="listings-container">
                <div className="results-header-row">
                  <span className="results-count">
                    Showing 1 - {filteredRentProperties.length} of {filteredRentProperties.length} rental properties
                  </span>
                  
                  <div className="results-actions-right">
                    <button className="mobile-filter-toggle-btn" onClick={() => setIsMobileFilterOpen(true)}>
                      <Filter size={15} /> Filters
                    </button>
                    <div className="view-toggle-group">
                      <button 
                        className={`view-toggle-btn ${rentLayoutMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setRentLayoutMode('grid')}
                      >
                        <Grid size={15} />
                      </button>
                      <button 
                        className={`view-toggle-btn ${rentLayoutMode === 'list' ? 'active' : ''}`}
                        onClick={() => setRentLayoutMode('list')}
                      >
                        <List size={15} />
                      </button>
                    </div>

                    <div className="sort-select-wrapper">
                      <span>Sort by:</span>
                      <select 
                        className="sort-select-dropdown"
                        value={rentSortBy}
                        onChange={(e) => setRentSortBy(e.target.value)}
                      >
                        <option value="relevance">Relevance</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>
                </div>

                {filteredRentProperties.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '80px 20px',
                    backgroundColor: 'var(--slate-50)',
                    border: '1px dashed var(--border-color)',
                    borderRadius: '16px'
                  }}>
                    <Info size={36} style={{ color: 'var(--slate-400)', marginBottom: '16px' }} />
                    <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--slate-800)', marginBottom: '8px' }}>No rentals found</h4>
                    <p style={{ color: 'var(--slate-500)', fontSize: '14px' }}>Try loosening your active filters or clear search query to inspect other areas.</p>
                  </div>
                ) : (
                  <div className={`buy-listings-grid${rentLayoutMode === 'list' ? ' buy-listings-grid--list' : ''}`} style={{ gridTemplateColumns: rentLayoutMode === 'list' ? '1fr' : undefined }}>
                    {filteredRentProperties.map((prop) => (
                      <div 
                        key={prop.id} 
                        className={`property-card${rentLayoutMode === 'list' ? ' property-card--list' : ''}`}
                      >
                        <div 
                          className="property-img-wrapper"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => navigateToDetail(e, prop)}
                        >
                          <img src={prop.image} alt={prop.title} />
                          {prop.verified && (
                            <div className="verified-badge">
                              <Check size={10} strokeWidth={3} />
                              Verified
                            </div>
                          )}
                          <div className="card-photos-badge">
                            <CameraIcon size={12} />
                            {prop.photos} Photos
                          </div>
                          <button 
                            className="circle-action-btn" 
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(prop.id); }}
                          >
                            <Heart size={14} fill={favorites.has(prop.id) ? "#72a801" : "none"} stroke={favorites.has(prop.id) ? "#72a801" : "currentColor"} />
                          </button>
                        </div>

                        <div className="property-details">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="property-price">
                              {normalizeRupeeText(prop.price)}
                              <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--slate-500)' }}> / month</span>
                            </div>
                          </div>
                          <h3 className="property-title" style={{ cursor: 'pointer' }} onClick={(e) => navigateToDetail(e, prop)}>{prop.title}</h3>
                          <div className="property-location">
                            <MapPin size={12} />
                            {prop.location}
                          </div>

                          <div className="property-specs">
                            <span className="spec-item"><Bed size={14} /> {prop.beds}</span>
                            <span className="spec-item"><Maximize2 size={14} /> {prop.area}</span>
                            <span className="furnishing-badge" style={{ marginLeft: '4px' }}>{prop.furnishing}</span>
                          </div>

                          <div className="property-agent">
                            <div className="agent-profile">
                              <img src={prop.agentAvatar} alt={prop.agentName} className="agent-avatar" />
                              <span className="agent-name">{prop.agentName}</span>
                            </div>
                            <span className="agent-rating">
                              <Star size={12} fill="currentColor" />
                              {prop.agentRating} <span className="rating-count">({prop.agentReviewsCount})</span>
                            </span>
                          </div>

                          <div className="property-card-actions">
                            <button className="card-view-btn" onClick={(e) => navigateToDetail(e, prop)}>
                              View Details
                            </button>
                            <button className="contact-action-btn" onClick={() => handleContactAction('phone', prop.agentName)}>
                              <Phone size={15} />
                            </button>
                            <button className="contact-action-btn" onClick={() => handleContactAction('whatsapp', prop.agentName)}>
                              <MessageSquare size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="pagination-container">
                  <div className="pagination-item active">1</div>
                  <div className="pagination-item">2</div>
                  <div className="pagination-item">3</div>
                  <div className="pagination-item">4</div>
                  <div className="pagination-item dots">...</div>
                  <div className="pagination-item">117</div>
                  <div className="pagination-item" onClick={() => showToast('Navigating to next page')}><ChevronRight size={14} /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification / Trust features row */}
          <div className="trust-features-bar">
            <div className="container">
              <div className="trust-features-grid">
                <div className="trust-feature-card">
                  <div className="trust-feature-icon">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div className="trust-feature-info">
                    <span className="trust-feature-title">Verified Listings</span>
                    <span className="trust-feature-desc">Every rental property is verified for your safety.</span>
                  </div>
                </div>
                
                <div className="trust-feature-card">
                  <div className="trust-feature-icon">
                    <UserCheck size={20} />
                  </div>
                  <div className="trust-feature-info">
                    <span className="trust-feature-title">No Brokerage</span>
                    <span className="trust-feature-desc">Deal directly with owners, no hidden fees.</span>
                  </div>
                </div>

                <div className="trust-feature-card">
                  <div className="trust-feature-icon">
                    <Gem size={20} />
                  </div>
                  <div className="trust-feature-info">
                    <span className="trust-feature-title">Wide Choice</span>
                    <span className="trust-feature-desc">Explore 1000+ rental options across top cities.</span>
                  </div>
                </div>

                <div className="trust-feature-card">
                  <div className="trust-feature-icon">
                    <Users size={20} />
                  </div>
                  <div className="trust-feature-info">
                    <span className="trust-feature-title">Easy Support</span>
                    <span className="trust-feature-desc">Our experts are here to help you 24/7.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consultant CTA Banner */}
          <section className="cta-section" style={{ backgroundColor: '#ffffff', padding: '40px 0' }}>
            <div className="container">
              <div className="cta-banner" style={{ backgroundImage: `linear-gradient(135deg, var(--primary-lime) 0%, var(--primary-lime-hover) 100%)` }}>
                <div className="cta-left">
                  <h2 className="cta-title">Can't Find the Right Rental?</h2>
                  <p className="cta-subtitle">Share your requirements and our experts will find the best rental options for you.</p>
                </div>
                <div className="cta-actions">
                  <button className="cta-btn-white" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-lime-hover)' }} onClick={() => handleAction('Rent Consultant Assistance', 'Get matched with landlords, rental houses, and developer co-living spaces.', 'Your phone number', 'Request Callback')}>
                    <Phone size={15} /> Talk to an Expert
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}


      {currentPage === 'detail' && (
        <PropertyDetailPage
          property={selectedProperty}
          navigateToHome={navigateToHome}
          navigateToBuy={navigateToBuy}
          handleContactAction={handleContactAction}
          showToast={showToast}
        />
      )}

      {/* PROJECTS SUBPAGE CONTENT */}
      {currentPage === 'projects' && (
        <div className="projects-page-content" style={{ animation: 'fadeIn 0.4s ease' }}>
          {/* Projects Hero Section */}
          <section className="projects-hero">
            <div className="container">
              <span className="projects-hero-tag">Projects</span>
              <h1 className="projects-hero-title">
                India's Finest Projects,<br />All in One Place.
              </h1>
              <p className="projects-hero-subtitle">
                Explore premium residential and commercial projects by India's most trusted developers.
              </p>

              {/* Metrics inside Hero */}
              <div className="projects-metrics-row">
                <div className="projects-metric-card">
                  <span className="projects-metric-number" style={{ color: 'var(--primary-lime)' }}>350+</span>
                  <span className="projects-metric-label">Projects</span>
                </div>
                <div className="projects-metric-card" style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '24px' }}>
                  <span className="projects-metric-number">120+</span>
                  <span className="projects-metric-label">Top Builders</span>
                </div>
                <div className="projects-metric-card" style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '24px' }}>
                  <span className="projects-metric-number">25+</span>
                  <span className="projects-metric-label">Cities</span>
                </div>

              </div>

              {/* Translucent Dark Search Capsule */}
              <form className="dark-search-capsule" onSubmit={(e) => {
                e.preventDefault();
                showToast(`Searching projects in ${projLocation || 'All Locations'}...`);
              }}>
                <div className="dark-capsule-group">
                  <span className="dark-capsule-label">Location</span>
                  <input 
                    type="text" 
                    placeholder="Enter city or locality" 
                    value={projLocation}
                    onChange={(e) => setProjLocation(e.target.value)}
                    className="dark-capsule-input"
                  />
                </div>
                <div className="dark-capsule-group">
                  <span className="dark-capsule-label">Project Type</span>
                  <select 
                    value={projType}
                    onChange={(e) => setProjType(e.target.value)}
                    className="dark-capsule-select"
                  >
                    <option value="">Select type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa / Penthouse</option>
                    <option value="Commercial">Commercial / Office</option>
                  </select>
                </div>
                <div className="dark-capsule-group">
                  <span className="dark-capsule-label">Budget</span>
                  <select 
                    value={projBudget}
                    onChange={(e) => setProjBudget(e.target.value)}
                    className="dark-capsule-select"
                  >
                    <option value="">Min - Max</option>
                    <option value="50L-1Cr">50L - 1Cr</option>
                    <option value="1Cr-2Cr">1Cr - 2Cr</option>
                    <option value="2Cr-5Cr">2Cr - 5Cr</option>
                    <option value="5Cr+">5Cr+</option>
                  </select>
                </div>


                <button type="submit" className="capsule-submit-btn">
                  <Search size={16} /> Search Projects
                </button>
              </form>

              {/* Popular Searches row */}
              <div className="buy-popular-searches" style={{ marginTop: '20px' }}>
                <span style={{ color: 'var(--slate-400)', fontWeight: 600 }}>Popular Searches:</span>
                <span className="search-pill" onClick={() => { setProjLocation('Gurgaon'); showToast('Filtered for Gurgaon projects'); }}>New Launch</span>
                <span className="search-pill" onClick={() => { setProjPossession('Dec 2026'); showToast('Filtered for Dombivli East projects'); }}>Under Construction</span>
                <span className="search-pill" onClick={() => { setProjPossession('Ready to Move'); showToast('Filtered for Ready to Move projects'); }}>Ready to Move</span>
                <span className="search-pill" onClick={() => { setProjBudget('5Cr+'); showToast('Filtered for Luxury projects'); }}>Luxury Projects</span>
                <span className="search-pill" onClick={() => { showToast('Searching top builder catalogues'); }}>Top Builders</span>
              </div>
            </div>
          </section>

          {/* Top Projects Section */}
          <section className="section" style={{ backgroundColor: 'var(--white)' }}>
            <div className="container">
              <div className="section-header">
                <div>
                  <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Top Projects
                    <span style={{ display: 'inline-block', width: '24px', height: '3px', backgroundColor: 'var(--primary-lime)', borderRadius: '2px' }}></span>
                  </h2>
                  <p className="section-subtitle">Handpicked premium projects for you</p>
                </div>
                <button className="outline-btn" onClick={() => showToast('Scrolling to list catalogs')} style={{ borderRadius: '8px', padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  View All Projects <ArrowRight size={14} />
                </button>
              </div>

              {filteredProjects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--slate-50)', borderRadius: '12px', marginTop: '20px' }}>
                  <h3>No projects found</h3>
                  <p style={{ color: 'var(--slate-500)', marginTop: '8px' }}>Try adjusting your filters to find more projects.</p>
                </div>
              ) : (
                <div className="projects-grid">
                  {filteredProjects.map((proj) => (
                    <div key={proj.id} className="property-card">
                      <div className="property-img-wrapper" style={{ cursor: 'pointer' }} onClick={(e) => navigateToDetail(e, proj)}>
                        <img src={proj.image} alt={proj.title} />
                        <div className="verified-badge" style={{ 
                          backgroundColor: proj.status === 'New Launch' ? '#72a801' : 
                                           proj.status === 'Under Construction' ? '#eab308' : 
                                           proj.status === 'Ready to Move' ? '#16a34a' : '#8b5cf6',
                          color: 'white' 
                        }}>
                          {proj.status}
                      </div>
                      <button className="circle-action-btn" style={{ position: 'absolute', top: '16px', right: '16px' }} onClick={(e) => { e.stopPropagation(); toggleFavorite(proj.id); }}>
                        <Heart size={14} fill={favorites.has(proj.id) ? "#72a801" : "none"} stroke={favorites.has(proj.id) ? "#72a801" : "currentColor"} />
                      </button>
                    </div>

                    <div className="property-details">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span className="property-price" style={{ fontSize: '16px' }}>{normalizeRupeeText(proj.price)}</span>
                      </div>
                      <h3 className="property-title" style={{ cursor: 'pointer' }} onClick={(e) => navigateToDetail(e, proj)}>{proj.title}</h3>
                      <div className="property-location"><MapPin size={12} /> {proj.location}</div>
                      
                      <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--slate-500)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '10px 0', margin: '12px 0' }}>
                        <span><Bed size={12} /> {proj.specs}</span>
                        <span><Maximize2 size={12} /> {proj.area}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="developer-logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--slate-600)', fontWeight: 600 }}>
                          <span style={{ display: 'inline-flex', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--slate-100)', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '800', border: '1px solid var(--border-color)', color: 'var(--slate-700)' }}>
                            {proj.builder.charAt(0)}
                          </span>
                          {proj.builder}
                        </div>
                        <button className="detail-outline-btn" style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '6px' }} onClick={(e) => navigateToDetail(e, proj)}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          </section>

          {/* Interactive Dashboard Widgets */}
          <section className="section" style={{ backgroundColor: 'var(--slate-50)', borderTop: '1px solid var(--border-color)' }}>
            <div className="container">
              <div className="dashboard-grid">
                {/* Heatmap Widget */}
                <div className="dashboard-card">
                  <h3 className="dashboard-card-title">Investment Heatmap</h3>
                  <span className="dashboard-card-subtitle">Top cities by average ROI</span>
                  <div className="heatmap-map-frame">
                    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', opacity: 0.85 }} fill="none" stroke="#72a801" strokeWidth="1.5">
                      <path d="M70,40 C65,45 60,35 55,42 C50,50 48,60 52,68 C55,75 58,85 55,95 C52,105 45,115 50,125 C55,135 62,145 60,155 C58,165 65,175 70,185 C75,175 80,165 85,160 C90,155 100,162 105,155 C110,148 115,138 120,132 C125,126 135,120 140,110 C145,100 138,90 142,80 C146,70 155,62 150,52 C145,42 138,48 132,40 C126,32 120,25 110,28 C100,31 92,20 85,25 C78,30 75,35 70,40 Z" fill="rgba(114, 168, 1, 0.04)" />
                      <circle cx="95" cy="85" r="4" fill="#72a801" />
                      <circle cx="102" cy="88" r="4" fill="#72a801" />
                      <circle cx="75" cy="120" r="4" fill="#72a801" />
                      <circle cx="92" cy="148" r="4" fill="#72a801" />
                      <circle cx="96" cy="138" r="4" fill="#72a801" />
                    </svg>
                  </div>
                  <div className="heatmap-roi-list">
                    <div className="heatmap-roi-item">
                      <span>Bangalore</span>
                      <span className="roi-percent">12.6% <span style={{ fontSize: '10px' }}>{'\u25b2'}</span></span>
                    </div>
                    <div className="heatmap-roi-item">
                      <span>Hyderabad</span>
                      <span className="roi-percent">11.2% <span style={{ fontSize: '10px' }}>{'\u25b2'}</span></span>
                    </div>
                    <div className="heatmap-roi-item">
                      <span>Pune</span>
                      <span className="roi-percent">10.8% <span style={{ fontSize: '10px' }}>{'\u25b2'}</span></span>
                    </div>
                    <div className="heatmap-roi-item">
                      <span>Mumbai</span>
                      <span className="roi-percent">9.7% <span style={{ fontSize: '10px' }}>{'\u25b2'}</span></span>
                    </div>
                    <div className="heatmap-roi-item">
                      <span>Gurgaon</span>
                      <span className="roi-percent">9.1% <span style={{ fontSize: '10px' }}>{'\u25b2'}</span></span>
                    </div>
                  </div>
                  <button className="clear-filters-btn" style={{ marginTop: 'auto' }} onClick={() => showToast('Full ROI analytics brochure sent to email!')}>
                    View Full Report
                  </button>
                </div>

                {/* Timeline Stage Widget */}
                <div className="dashboard-card">
                  <h3 className="dashboard-card-title">Project Timeline</h3>
                  <span className="dashboard-card-subtitle">Find projects at every stage of your journey</span>
                  
                  <div className="timeline-progress-track">
                    <div className="timeline-line"></div>
                    <div className="timeline-node active">
                      <div className="timeline-node-circle"></div>
                      <span className="timeline-node-label">New Launch</span>
                      <span className="timeline-node-count">124+ Projects</span>
                    </div>
                    <div className="timeline-node active">
                      <div className="timeline-node-circle"></div>
                      <span className="timeline-node-label">Under Construction</span>
                      <span className="timeline-node-count">156+ Projects</span>
                    </div>
                    <div className="timeline-node">
                      <div className="timeline-node-circle"></div>
                      <span className="timeline-node-label">Ready to Move</span>
                      <span className="timeline-node-count">98+ Projects</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--slate-500)', lineHeight: '1.5', margin: '12px 0 0 0', fontWeight: '500' }}>
                    Track structural updates, tower completions, and dynamic price hikes at every level of builder updates.
                  </p>

                  <button className="clear-filters-btn" style={{ marginTop: 'auto' }} onClick={() => showToast('Stage timeline calendars loaded!')}>
                    Explore All Stages
                  </button>
                </div>

                {/* Luxury Projects Box */}
                <div className="dashboard-card" style={{ padding: '0', overflow: 'hidden' }}>
                  <div className="luxury-showcase-box" style={{ backgroundImage: "url('/luxury_interior.png')", height: '100%', minHeight: '320px' }}>
                    <div className="luxury-showcase-content">
                      <div style={{ flexGrow: 1 }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary-lime)', display: 'block', marginBottom: '4px' }}>Luxury Segment</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 4px 0', color: 'white' }}>The Camellias</h3>
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '8px' }}>DLF, Gurgaon</span>
                        <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary-lime)' }}>{RUPEE} 35 Cr* Onwards</span>
                      </div>
                      <button className="post-btn" style={{ padding: '10px 18px', fontSize: '12px', flexShrink: 0 }} onClick={() => handleAction('The Camellias Inquiry', 'Inquire about premium penthouses, duplex flats, and custom sky mansions at The Camellias.', 'Your mobile number', 'Inquire Now')}>
                        Explore Luxury
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Top Builders Brand Slider */}
          <section className="section" style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--border-color)', paddingBottom: '60px' }}>
            <div className="container">
              <div className="section-header" style={{ marginBottom: '24px' }}>
                <div>
                  <h2 className="section-title">Top Builders</h2>
                  <p className="section-subtitle">Partnering with India's most trusted developers</p>
                </div>
              </div>

              <div className="builders-slider-container">
                <div className="builders-logos-row">
                  {[
                    { name: 'DLF', color: '#111827', border: '#374151' },
                    { name: 'Godrej', color: '#16a34a', border: '#22c55e' },
                    { name: 'Lodha', color: '#b45309', border: '#d97706' },
                    { name: 'Sobha', color: '#1e3a8a', border: '#3b82f6' },
                    { name: 'M3M', color: '#7c3aed', border: '#8b5cf6' },
                    { name: 'Prestige', color: '#dc2626', border: '#ef4444' },
                    { name: 'Mahindra', color: '#be123c', border: '#f43f5e' },
                    { name: 'Brigade', color: '#0369a1', border: '#0ea5e9' }
                  ].map((brand, i) => (
                    <div key={i} className="brand-logo-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }} onClick={() => showToast(`Opening ${brand.name} catalog`)}>
                      <span style={{ fontSize: '16px', fontWeight: 900, color: brand.color, letterSpacing: '0.5px' }}>{brand.name}</span>
                      <span style={{ fontSize: '8px', color: 'var(--slate-400)', fontWeight: 700, textTransform: 'uppercase' }}>Developer</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* DYNAMIC SUBPAGE CONTENT: SERVICES PAGE */}
      {currentPage === 'services' && (
        <div className="services-page-wrapper" style={{ animation: 'fadeIn 0.4s ease' }}>
          {/* Hero Section */}
          <section className="services-hero-new">
            <div className="container">
              <div className="services-hero-content-new">
                <div className="breadcrumb" style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px' }}>
                  Home &gt; Services
                </div>
                <h1 className="services-hero-title-new">
                  Our Services<br />
                  <span style={{ color: 'var(--primary-lime)' }}>Designed Around You</span>
                </h1>
                <p className="services-hero-subtitle-new">
                  We offer end-to-end real estate solutions to help you<br />
                  buy, sell, rent, or invest with confidence.
                </p>
              </div>

              {/* Stats Bar */}
              <div className="services-hero-stats">
                <div className="stat-item">
                  <Users size={32} color="var(--primary-lime)" />
                  <div>
                    <h4>5000+</h4>
                    <p>Happy Clients</p>
                  </div>
                </div>
                <div className="stat-item">
                  <UserCheck size={32} color="var(--primary-lime)" />
                  <div>
                    <h4>100+</h4>
                    <p>Expert Agents</p>
                  </div>
                </div>
                <div className="stat-item">
                  <MapPin size={32} color="var(--primary-lime)" />
                  <div>
                    <h4>20+</h4>
                    <p>Cities Covered</p>
                  </div>
                </div>
                <div className="stat-item">
                  <Shield size={32} color="var(--primary-lime)" />
                  <div>
                    <h4>100%</h4>
                    <p>Trusted Service</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="services-grid-section" style={{ backgroundColor: 'var(--white)', padding: '60px 0 100px' }}>
            <div className="container">
              <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 className="section-title" style={{ fontSize: '32px' }}>What We Offer</h2>
                <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--primary-lime)', margin: '16px auto' }}></div>
              </div>

              <div className="services-grid">
                {services.map((service, index) => (
                  <div key={index} className="service-card-detailed">
                    <div className="service-icon-wrapper">
                      {service.icon}
                    </div>
                    <div className="service-card-content">
                      <h3 className="service-card-title">{service.title}</h3>
                      <p className="service-card-desc">{service.desc}</p>
                      <button className="service-action-btn" onClick={() => handleAction(service.title, `Learn more about our ${service.title} services.`, 'Your contact info', 'Get in Touch')}>
                        Learn More <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Assistance Banner */}
          <section className="assistance-banner">
            <div className="container assistance-banner-container">
              <div className="assistance-banner-left">
                <div className="assistance-icon-large">
                  <Headset size={40} />
                </div>
                <div>
                  <h3>Need Personal Assistance?</h3>
                  <p>Our experts are just a call away to help you find the right property or solution.</p>
                  <button className="btn btn-light" onClick={() => handleAction('Contact Support', 'Get in touch with our experts.', 'Your phone number', 'Contact Now')} style={{ marginTop: '16px', color: 'var(--primary-lime)', fontWeight: '600' }}>
                    Contact Us Today <ArrowRight size={14} />
                  </button>
                </div>
              </div>
              <div className="assistance-banner-right">
                <div className="banner-feature">
                  <div className="banner-feature-icon"><User size={24} /></div>
                  <div>
                    <h4>Expert Guidance</h4>
                    <p>Get advice from industry experts</p>
                  </div>
                </div>
                <div className="banner-feature">
                  <div className="banner-feature-icon"><Clock size={24} /></div>
                  <div>
                    <h4>Quick Response</h4>
                    <p>We respond quickly to all your queries</p>
                  </div>
                </div>
                <div className="banner-feature">
                  <div className="banner-feature-icon"><Shield size={24} /></div>
                  <div>
                    <h4>Trusted Support</h4>
                    <p>Your satisfaction is our top priority</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="how-it-works-section" style={{ backgroundColor: 'var(--white)', padding: '100px 0' }}>
            <div className="container">
              <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 className="section-title" style={{ fontSize: '32px' }}>How It Works</h2>
                <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--primary-lime)', margin: '16px auto' }}></div>
              </div>

              <div className="how-it-works-grid">
                {howItWorks.map((item, index) => (
                  <div key={index} className="how-it-works-step">
                    <div className="step-number">{item.step}</div>
                    <div className="step-icon-container">
                      {item.icon}
                    </div>
                    <h4 className="step-title">{item.title}</h4>
                    <p className="step-desc">{item.desc}</p>
                    {index < howItWorks.length - 1 && <div className="step-connector"></div>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* DYNAMIC SUBPAGE CONTENT: AGENTS PAGE */}
      {currentPage === 'agents' && (
        <div className="new-agents-page" style={{ animation: 'fadeIn 0.4s ease' }}>
          
          {/* Hero Section */}
          <section className="agents-new-hero">
            <div className="container">
              <div className="agents-new-hero-grid">
                
                <div className="agents-new-hero-left">
                  <div className="agents-badge">OUR AGENTS</div>
                  <h1 className="agents-hero-title">
                    Real Experts.<br/>
                    <span className="text-gradient">Real Guidance.</span>
                  </h1>
                  <p className="agents-hero-subtitle">
                    Connect with experienced and verified real estate professionals who are here to help you find, buy, sell or rent the right property.
                  </p>
                  
                  <div className="agents-stats-grid">
                    <div className="agent-stat-item">
                      <Users className="stat-icon" />
                      <div>
                        <h4>100+</h4>
                        <p>Verified Agents</p>
                      </div>
                    </div>
                    <div className="agent-stat-item">
                      <Home className="stat-icon" />
                      <div>
                        <h4>5000+</h4>
                        <p>Homes Sold</p>
                      </div>
                    </div>
                    <div className="agent-stat-item">
                      <Star className="stat-icon" />
                      <div>
                        <h4>4.9/5</h4>
                        <p>Average Rating</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="agents-new-hero-right">
                  <div className="find-agent-card">
                    <h3>Find the Right Agent</h3>
                    
                    <div className="form-group">
                      <label>Search by Agent Name</label>
                      <div className="input-with-icon">
                        <input type="text" placeholder="Enter agent name" />
                        <Search size={18} />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <select><option>Select City</option><option>Mumbai</option><option>Delhi NCR</option></select>
                      </div>
                      <div className="form-group">
                        <label>Specialization</label>
                        <select><option>Select Specialization</option><option>Residential</option><option>Commercial</option></select>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Experience</label>
                        <select><option>Select Experience</option><option>0-2 Years</option><option>5+ Years</option></select>
                      </div>
                      <div className="form-actions">
                        <button className="btn-reset">Reset</button>
                        <button className="btn-find-agent">Find Agent <ArrowRight size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </section>

          {/* Featured Agents */}
          <section className="featured-agents-section">
            <div className="container">
              <div className="section-header-flex">
                <h2 className="section-title">Featured Agents</h2>
                <button className="btn-outline">View All Agents <ArrowRight size={16} /></button>
              </div>
              
              <div className="featured-agents-grid">
                {/* Featured Agent 1 */}
                <div className="featured-agent-card">
                  <div className="fa-tag">Top Performer</div>
                  <div className="fa-image">
                    <img src={PEOPLE_IMAGES.featuredAgentMale} alt="Arjun Mehta" />
                  </div>
                  <div className="fa-content">
                    <h3>Arjun Mehta <BadgeCheck className="verified-icon" size={16} /></h3>
                    <p className="fa-role">Senior Property Consultant</p>
                    <div className="fa-stat"><Briefcase size={14} /> 6+ Years Experience</div>
                    <div className="fa-stat"><Star size={14} /> 4.9 <span className="text-light">(120 Reviews)</span></div>
                    
                    <div className="fa-details-grid">
                      <div>
                        <span className="fa-label">Properties Sold</span>
                        <span className="fa-val">185+</span>
                      </div>
                      <div>
                        <span className="fa-label">Languages</span>
                        <span className="fa-val">English, Hindi, Gujarati</span>
                      </div>
                    </div>
                    
                    <div className="fa-actions">
                      <button className="btn-primary">View Profile</button>
                      <button className="btn-icon"><Phone size={18} /></button>
                      <button className="btn-icon whatsapp"><MessageSquare size={18} /></button>
                    </div>
                  </div>
                </div>

                {/* Featured Agent 2 */}
                <div className="featured-agent-card">
                  <div className="fa-tag">Top Performer</div>
                  <div className="fa-image">
                    <img src={PEOPLE_IMAGES.featuredAgentFemale} alt="Neha Kapoor" />
                  </div>
                  <div className="fa-content">
                    <h3>Neha Kapoor <BadgeCheck className="verified-icon" size={16} /></h3>
                    <p className="fa-role">Luxury Property Specialist</p>
                    <div className="fa-stat"><Briefcase size={14} /> 5+ Years Experience</div>
                    <div className="fa-stat"><Star size={14} /> 4.8 <span className="text-light">(95 Reviews)</span></div>
                    
                    <div className="fa-details-grid">
                      <div>
                        <span className="fa-label">Properties Sold</span>
                        <span className="fa-val">142+</span>
                      </div>
                      <div>
                        <span className="fa-label">Languages</span>
                        <span className="fa-val">English, Hindi, Punjabi</span>
                      </div>
                    </div>
                    
                    <div className="fa-actions">
                      <button className="btn-primary">View Profile</button>
                      <button className="btn-icon"><Phone size={18} /></button>
                      <button className="btn-icon whatsapp"><MessageSquare size={18} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Meet Our Experts */}
          <section className="meet-experts-section">
            <div className="container">
              <h2 className="section-title">Meet Our Experts</h2>
              
              <div className="expert-list">
                {/* Expert 1 */}
                <div className="expert-card">
                  <div className="expert-image">
                    <img src={PEOPLE_IMAGES.expertMale} alt="Rohan Desai" />
                  </div>
                  <div className="expert-content">
                    <h3>Rohan Desai <BadgeCheck className="verified-icon" size={16} /></h3>
                    <p className="expert-role">Commercial Property Advisor</p>
                    <p className="expert-desc">Specializes in office spaces, retail outlets and investment properties. Helping businesses find the perfect space to grow.</p>
                    
                    <div className="expert-stats">
                      <div className="stat-box">
                        <Briefcase className="icon" size={20} />
                        <div>
                          <span className="val">7+</span>
                          <span className="lbl">Years Experience</span>
                        </div>
                      </div>
                      <div className="stat-box">
                        <CheckCircle className="icon" size={20} />
                        <div>
                          <span className="val">250+</span>
                          <span className="lbl">Deals Closed</span>
                        </div>
                      </div>
                      <div className="stat-box">
                        <Star className="icon" size={20} />
                        <div>
                          <span className="val">4.9</span>
                          <span className="lbl">Client Rating</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="btn-primary" style={{marginTop: '24px'}}>View Profile</button>
                  </div>
                </div>

                {/* Expert 2 (Reverse) */}
                <div className="expert-card reverse">
                  <div className="expert-content">
                    <h3>Simran Kaur <BadgeCheck className="verified-icon" size={16} /></h3>
                    <p className="expert-role">Residential Property Expert</p>
                    <p className="expert-desc">Focuses on premium homes, villas and gated communities. Committed to helping families find their dream home.</p>
                    
                    <div className="expert-stats">
                      <div className="stat-box">
                        <Briefcase className="icon" size={20} />
                        <div>
                          <span className="val">5+</span>
                          <span className="lbl">Years Experience</span>
                        </div>
                      </div>
                      <div className="stat-box">
                        <CheckCircle className="icon" size={20} />
                        <div>
                          <span className="val">180+</span>
                          <span className="lbl">Deals Closed</span>
                        </div>
                      </div>
                      <div className="stat-box">
                        <Star className="icon" size={20} />
                        <div>
                          <span className="val">4.8</span>
                          <span className="lbl">Client Rating</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="btn-primary" style={{marginTop: '24px'}}>View Profile</button>
                  </div>
                  <div className="expert-image">
                    <img src={PEOPLE_IMAGES.expertFemale} alt="Simran Kaur" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Our Agents */}
          <section className="why-agents-section">
            <div className="container">
              <h2 className="section-title">Why Choose Our Agents?</h2>
              
              <div className="why-agents-grid">
                <div className="why-agent-box">
                  <div className="icon-circle"><UserCheck size={24} /></div>
                  <h4>Verified Experts</h4>
                  <p>All agents are background verified and highly experienced.</p>
                </div>
                <div className="why-agent-box">
                  <div className="icon-circle"><MapPin size={24} /></div>
                  <h4>Local Market Knowledge</h4>
                  <p>In-depth knowledge of local markets and property trends.</p>
                </div>
                <div className="why-agent-box">
                  <div className="icon-circle"><MessageSquare size={24} /></div>
                  <h4>Negotiation Specialists</h4>
                  <p>Get the best deals with our expert negotiation skills.</p>
                </div>
                <div className="why-agent-box">
                  <div className="icon-circle"><Shield size={24} /></div>
                  <h4>End-to-End Support</h4>
                  <p>From property search to closing, we're with you all the way.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="agent-success-section">
            <div className="container">
              <div className="section-header-flex">
                <h2 className="section-title">Success Stories</h2>
                <div className="carousel-controls">
                  <span className="text-light">View All Reviews</span>
                  <button className="carousel-btn"><ChevronLeft size={16} /></button>
                  <button className="carousel-btn"><ChevronRight size={16} /></button>
                </div>
              </div>
              
              <div className="success-story-card">
                <div className="story-content">
                  <Quote className="quote-icon" size={32} />
                  <p className="story-text">Arjun helped me find my dream home in just 3 weeks. His knowledge, patience and support throughout the process were exceptional.</p>
                  
                  <div className="story-author">
                    <img src={PEOPLE_IMAGES.testimonialFemale} alt="Priya Sharma" />
                    <div>
                      <h4>Priya Sharma</h4>
                      <p>Bought a 3BHK Apartment in Bangalore</p>
                    </div>
                  </div>
                </div>
                <div className="story-image">
                  <div className="story-tag">Purchased</div>
                  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&fit=crop" alt="Purchased Property" />
                  <div className="story-prop-info">
                    <h4>3 BHK Apartment</h4>
                    <p>Bangalore</p>
                  </div>
                </div>
              </div>
              
              <div className="carousel-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </section>

          {/* Cities We Cover */}
          <section className="cities-cover-section">
            <div className="container">
              <div className="cities-cover-grid">
                <div className="cities-list-content">
                  <h2 className="section-title">Cities We Cover</h2>
                  <div className="cities-list">
                    <ul>
                      <li><MapPin size={16} /> Delhi NCR</li>
                      <li><MapPin size={16} /> Mumbai</li>
                      <li><MapPin size={16} /> Bangalore</li>
                      <li><MapPin size={16} /> Hyderabad</li>
                    </ul>
                    <ul>
                      <li><MapPin size={16} /> Pune</li>
                      <li><MapPin size={16} /> Gurgaon</li>
                      <li><MapPin size={16} /> Noida</li>
                      <li><MapPin size={16} /> Chennai</li>
                    </ul>
                  </div>
                </div>
                <div className="cities-map">
                  {/* For simplicity we will use a decorative div to simulate the map image */}
                  <div className="map-placeholder" style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
                    <iframe 
                      title="AcresKey Headquarters Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827184246!2d77.215956!3d28.628901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xc46188eb8d275727!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1) opacity(0.9)' }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Become an Agent CTA */}
          <section className="join-agent-cta-section">
            <div className="container">
              <div className="join-agent-banner">
                <div className="join-agent-image">
                  <img src={PEOPLE_IMAGES.joinAgentBanner} alt="Become an Agent" />
                </div>
                <div className="join-agent-content">
                  <h2>Become an AcresKey Agent</h2>
                  <p>Join India's most trusted real estate platform and grow your business with exclusive leads, brand visibility and technology.</p>
                  
                  <div className="join-benefits">
                    <div><CheckCircle size={16} /> High Quality Leads</div>
                    <div><CheckCircle size={16} /> Advanced Tools</div>
                    <div><CheckCircle size={16} /> Marketing Support</div>
                    <div><CheckCircle size={16} /> Timely Payouts</div>
                  </div>
                  
                  <button className="btn-join-now">Join Now <ArrowRight size={16} /></button>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ABOUT PAGE (REDESIGNED) */}
      {currentPage === 'about' && (
        <div className="about-page-wrapper">
          {/* About Hero */}
          <section className="about-hero">
            <div className="container">
              <div className="about-breadcrumb">
                <span onClick={navigateToHome} style={{ cursor: 'pointer' }}>Home</span>
                <ChevronRight size={14} />
                <span>About Us</span>
              </div>
              <h1 className="about-hero-title">
                About <span style={{ color: 'var(--primary-lime)' }}>AcresKey</span>
              </h1>
              <p className="about-hero-subtitle">Your trusted partner in real estate.</p>
              <p className="about-hero-description">
                AcresKey is a modern real estate platform built on trust, transparency, and technology. We help people buy, sell, rent, and invest in properties with confidence across top cities.
              </p>

              <div className="about-hero-stats">
                <div className="about-stat-item">
                  <div className="about-stat-icon-wrapper">
                    <ShieldCheck size={24} style={{ color: 'var(--primary-lime)' }} />
                  </div>
                  <div className="about-stat-text">
                    <strong>Trusted & Verified</strong>
                    <span>100% Verified Listings</span>
                  </div>
                </div>
                <div className="about-stat-item">
                  <div className="about-stat-icon-wrapper">
                    <Users size={24} style={{ color: 'var(--primary-lime)' }} />
                  </div>
                  <div className="about-stat-text">
                    <strong>Customer First</strong>
                    <span>Your satisfaction is our priority</span>
                  </div>
                </div>
                <div className="about-stat-item">
                  <div className="about-stat-icon-wrapper">
                    <CheckCircle size={24} style={{ color: 'var(--primary-lime)' }} />
                  </div>
                  <div className="about-stat-text">
                    <strong>Transparency</strong>
                    <span>Clear information, no hidden surprises</span>
                  </div>
                </div>
                <div className="about-stat-item">
                  <div className="about-stat-icon-wrapper">
                    <Headset size={24} style={{ color: 'var(--primary-lime)' }} />
                  </div>
                  <div className="about-stat-text">
                    <strong>Expert Support</strong>
                    <span>End-to-end support at every step</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission, Vision & Numbers */}
          <section className="about-split-section">
            <div className="container">
              <div className="about-split-grid">
                {/* Left side */}
                <div className="about-mission-vision">
                  <div className="mv-card">
                    <div className="mv-icon"><Target size={24} style={{ color: 'var(--primary-lime)' }} /></div>
                    <div className="mv-content">
                      <h3>Our Mission</h3>
                      <p>To simplify real estate for everyone by providing verified listings, expert guidance, and seamless experiences.</p>
                    </div>
                  </div>
                  <div className="mv-card">
                    <div className="mv-icon"><Eye size={24} style={{ color: 'var(--primary-lime)' }} /></div>
                    <div className="mv-content">
                      <h3>Our Vision</h3>
                      <p>To become India's most trusted real estate platform, empowering people to find their perfect space and build a better tomorrow.</p>
                    </div>
                  </div>
                </div>

                {/* Right side */}
                <div className="about-numbers-wrapper">
                  <h3 className="section-title">AcresKey in Numbers</h3>
                  <div className="about-numbers-grid">
                    <div className="number-card">
                      <Home size={32} style={{ color: 'var(--primary-lime)', marginBottom: '12px' }} />
                      <div className="number-val">5000+</div>
                      <div className="number-label">Properties Listed</div>
                    </div>
                    <div className="number-card">
                      <Users size={32} style={{ color: 'var(--primary-lime)', marginBottom: '12px' }} />
                      <div className="number-val">1000+</div>
                      <div className="number-label">Happy Clients</div>
                    </div>
                    <div className="number-card">
                      <UserCheck size={32} style={{ color: 'var(--primary-lime)', marginBottom: '12px' }} />
                      <div className="number-val">100+</div>
                      <div className="number-label">Expert Agents</div>
                    </div>
                    <div className="number-card">
                      <Building size={32} style={{ color: 'var(--primary-lime)', marginBottom: '12px' }} />
                      <div className="number-val">20+</div>
                      <div className="number-label">Cities Covered</div>
                    </div>
                    <div className="number-card">
                      <Shield size={32} style={{ color: 'var(--primary-lime)', marginBottom: '12px' }} />
                      <div className="number-val">100%</div>
                      <div className="number-label">Verified Listings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose AcresKey */}
          <section className="about-why-choose">
            <div className="container">
              <div className="why-choose-box">
                <div className="why-choose-content">
                  <h2 className="section-title">Why Choose AcresKey?</h2>
                  <div className="why-choose-grid">
                    <div className="why-card">
                      <div className="why-icon"><Home size={24} style={{ color: 'var(--primary-lime)' }} /></div>
                      <div className="why-text">
                        <h4>Wide Range of Properties</h4>
                        <p>From apartments to villas, plots to commercial spaces - we have it all.</p>
                      </div>
                    </div>
                    <div className="why-card">
                      <div className="why-icon"><Shield size={24} style={{ color: 'var(--primary-lime)' }} /></div>
                      <div className="why-text">
                        <h4>Verified & Reliable</h4>
                        <p>All properties are verified for authenticity and quality.</p>
                      </div>
                    </div>
                    <div className="why-card">
                      <div className="why-icon"><UserCheck size={24} style={{ color: 'var(--primary-lime)' }} /></div>
                      <div className="why-text">
                        <h4>Expert Guidance</h4>
                        <p>Our real estate experts help you make the right decisions.</p>
                      </div>
                    </div>
                    <div className="why-card">
                      <div className="why-icon"><ThumbsUp size={24} style={{ color: 'var(--primary-lime)' }} /></div>
                      <div className="why-text">
                        <h4>Seamless Experience</h4>
                        <p>Easy search, quick communication, and smooth transactions.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="why-choose-image">
                  <img src="/assets/hero_villa.png" alt="AcresKey Team" />
                </div>
              </div>
            </div>
          </section>

          {/* Let's Find Your Perfect Property CTA */}
          <section className="about-cta-banner">
            <div className="container">
              <div className="cta-banner-content">
                <div className="cta-left">
                  <div className="cta-icon"><Home size={32} style={{ color: 'var(--white)' }} /></div>
                  <div className="cta-text">
                    <h2>Let's Find Your Perfect Property</h2>
                    <p>Whether you want to buy, rent, or invest, AcresKey is here to help you every step of the way.</p>
                  </div>
                </div>
                <button className="cta-explore-btn" onClick={navigateToProjects}>
                  Explore Properties <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}



      {/* 12. Footer */}
      <footer className="footer">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', paddingBottom: '20px' }}>
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', minWidth: '150px' }}>
              <a href="#" className="logo" onClick={navigateToHome}>
                <span className="logo-icon"><Key size={24} fill="currentColor" /></span>
                AcresKey
              </a>
              <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: '500' }}>Unlock Your Dream Property</span>
            </div>
            
            <div className="footer-bottom-links" style={{ flex: '1', display: 'flex', justifyContent: 'center', minWidth: '250px' }}>
              <a href="#" onClick={navigateToHome}>Home</a>
              <a href="#about" onClick={navigateToAbout}>About</a>
              <a href="#blog" onClick={(e) => { e.preventDefault(); handleAction('Real Estate Blog', 'Access capital value updates, construction status, and home buying guidelines.', 'Your email address', 'Subscribe'); }}>Blog</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleAction('Contact Support', 'Experiencing issues or have specific investment concerns? Drop your message.', 'Enter support details/phone', 'Contact Us'); }}>Contact</a>
            </div>

            <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', gap: '12px', minWidth: '150px' }}>
              <a href="#instagram" className="social-icon-btn" onClick={() => showToast('Connecting to Instagram...')} style={{ color: 'var(--slate-600)', borderColor: 'var(--border-color)', margin: 0 }}>
                <InstagramIcon size={16} />
              </a>
              <a href="#youtube" className="social-icon-btn" onClick={() => showToast('Connecting to YouTube...')} style={{ color: 'var(--slate-600)', borderColor: 'var(--border-color)', margin: 0 }}>
                <YoutubeIcon size={16} />
              </a>
            </div>
          </div>

          <div className="footer-bottom" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', justifyContent: 'center' }}>
            <span>&copy; 2024 AcresKey. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Bottom Sheet */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="mobile-menu-sheet">
            <div className="mobile-menu-sheet-header">
              <span className="mobile-menu-sheet-title">Menu</span>
              <button className="close-menu-btn" onClick={() => setMobileMenuOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="mobile-menu-links">
              <a href="#" onClick={(e) => { setMobileMenuOpen(false); navigateToBuy(e); }}><Search size={20} /> Buy Properties</a>
              <a href="#" onClick={(e) => { setMobileMenuOpen(false); navigateToRent(e); }}><Key size={20} /> Rent Properties</a>
              <a href="#" onClick={(e) => { setMobileMenuOpen(false); navigateToProjects(e); }}><Building size={20} /> New Projects</a>
              <a href="#" onClick={(e) => { setMobileMenuOpen(false); navigateToServices(e); }}><CheckCircle size={20} /> Services</a>
              <a href="#" onClick={(e) => { setMobileMenuOpen(false); navigateToAgents(e); }}><Users size={20} /> Find Agents</a>
            </div>
          </div>
        </>
      )}

      {/* Mobile Bottom Navigation */}
      {currentPage !== 'detail' && (
      <div className="mobile-bottom-nav">
        <a href="#" className={`bottom-nav-item ${currentPage === 'home' ? 'active' : ''}`} onClick={navigateToHome}>
          <Home size={22} />
          <span>Home</span>
        </a>
        <a href="#" className={`bottom-nav-item ${currentPage === 'buy' || currentPage === 'rent' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('buy'); window.scrollTo(0, 0); }}>
          <Search size={22} />
          <span>Search</span>
        </a>
        <div className="bottom-nav-item bottom-nav-post-btn" onClick={(e) => { e.preventDefault(); setIsPostPropertyModalOpen(true); }}>
          <div className="post-fab">
            <PlusCircle size={28} color="var(--white)" />
          </div>
          <span>Post</span>
        </div>
        <a href="#" className={`bottom-nav-item ${currentPage === 'agents' ? 'active' : ''}`} onClick={navigateToAgents}>
          <Users size={22} />
          <span>Agents</span>
        </a>
        <a href="#" className="bottom-nav-item" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(true); }}>
          <MoreHorizontal size={22} />
          <span>More</span>
        </a>
      </div>
      )}

      {/* Interactive Modal */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px',
          animation: 'fadeIn 0.25s ease'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '480px',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            position: 'relative'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '8px'
            }}>{modalTitle}</h3>
            
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              marginBottom: '24px',
              lineHeight: '1.6',
              whiteSpace: 'pre-line'
            }}>{modalMessage}</p>

            <form onSubmit={handleModalSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Contact Information</label>
                <input 
                  type="text" 
                  placeholder={modalInputPlaceholder} 
                  required
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    fontSize: '14px',
                    width: '100%',
                    backgroundColor: '#f8fafc'
                  }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#64748b',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{
                    backgroundColor: '#72a801',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(114, 168, 1, 0.3)'
                  }}
                >
                  {modalButtonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* --- LOGIN MODAL --- */}
      {isLoginModalOpen && (
        <div className="login-modal-overlay" onClick={() => setIsLoginModalOpen(false)}>
          <div className="login-modal" onClick={e => e.stopPropagation()}>
            <button className="login-close-btn" onClick={() => setIsLoginModalOpen(false)}>
              <X size={20} />
            </button>
            
            <div className="login-header">
              <h2 className="login-title">Welcome Back!</h2>
              <p className="login-subtitle">Login to continue to AcresKey</p>
            </div>
            
            <form className="login-form" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); setUser({ name: 'User' }); setIsLoginModalOpen(false); showToast('Logged in successfully!'); }}>
              <div className="login-input-group">
                <label>Email Address</label>
                <div className="login-input-wrapper">
                  <Mail size={18} className="login-icon" />
                  <input type="email" placeholder="Enter your email address" required />
                </div>
              </div>
              
              <div className="login-input-group">
                <label>Password</label>
                <div className="login-input-wrapper">
                  <Lock size={18} className="login-icon" />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" required />
                  <button type="button" className="login-toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="login-options">
                <label className="login-remember">
                  <input type="checkbox" defaultChecked />
                  <span>Remember Me</span>
                </label>
                <a href="#" className="login-forgot">Forgot Password?</a>
              </div>
              
              <button type="submit" className="login-submit-btn">Login</button>
            </form>
            
            <div className="login-divider">
              <span>or continue with</span>
            </div>
            
            <div className="social-login-grid">
              <button className="social-btn">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button className="social-btn">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
              <button className="social-btn">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#000" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.79 2.04-.04 3.58.96 4.5 2.27-3.86 2.19-3.18 7.3.56 8.78-.81 2.03-1.89 3.8-3.72 5.56v-.06zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.4-1.98 4.41-3.74 4.25z"/></svg>
                Apple
              </button>
            </div>
            
            <div className="login-footer">
              Don't have an account? <a href="#">Sign Up</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Camera Icon subcomponent
const CameraIcon = ({ size = 12 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

export default App;
