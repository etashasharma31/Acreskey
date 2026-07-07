import React, { useState } from 'react';
import { normalizeRupeeText, RUPEE } from './utils/currency.js';
import { PEOPLE_IMAGES } from './constants/peopleImages.js';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  Building,
  ShieldCheck,
  Key,
  FileText,
  Car,
  Trees,
  Dumbbell,
  Zap,
  Shield,
  Heart,
  Upload,
  ArrowRight,
  Camera,
  Play,
  BadgeCheck,
  Mail,
  Clock,
} from 'lucide-react';

const DEFAULT_PROPERTY = {
  price: '\u20B9 3.25 Cr',
  title: '3 BHK Luxury Apartment',
  location: 'Sector 65, Gurgaon',
  beds: '3 Beds',
  baths: '3 Baths',
  area: '1850 Sq. Ft.',
  agentName: 'Rohit Sharma',
  agentAvatar: PEOPLE_IMAGES.agentMale1,
  agentRating: 4.8,
  agentReviewsCount: 120,
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&fit=crop',
  photos: 24,
};

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&fit=crop',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&fit=crop',
  'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=300&fit=crop',
];

function SpaIcon({ size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

const AMENITIES = [
  { icon: Trees, label: 'Clubhouse' },
  { icon: MapPin, label: 'Swimming Pool' },
  { icon: Dumbbell, label: 'Gymnasium' },
  { icon: Zap, label: 'Power Backup' },
  { icon: Shield, label: 'Security' },
  { icon: Trees, label: 'Garden' },
  { icon: Building, label: 'Tennis Court' },
  { icon: MapPin, label: 'Jogging Track' },
  { icon: Trees, label: 'Kids Play Area' },
  { icon: Building, label: 'Indoor Games' },
  { icon: Building, label: 'Party Hall' },
  { icon: SpaIcon, label: 'Spa' },
];

const SIMILAR_PROPERTIES = [
  { price: '3.10 Cr', title: '3 BHK Apartment', loc: 'Sector 62, Gurgaon', area: '1780 Sq. Ft.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&fit=crop' },
  { price: '3.45 Cr', title: '3 BHK Apartment', loc: 'Sector 66, Gurgaon', area: '1900 Sq. Ft.', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&fit=crop' },
  { price: '2.95 Cr', title: '3 BHK Apartment', loc: 'Sector 65, Gurgaon', area: '1680 Sq. Ft.', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&fit=crop' },
];

export default function PropertyDetailPage({
  property,
  navigateToHome,
  navigateToBuy,
  handleContactAction,
  showToast,
}) {
  const prop = {
    ...DEFAULT_PROPERTY,
    ...property,
    price: normalizeRupeeText(property?.price ?? DEFAULT_PROPERTY.price),
  };
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeTimeSlot, setActiveTimeSlot] = useState('10:00 AM');

  const handleBack = (e) => {
    if (e) e.preventDefault();
    navigateToBuy(e);
  };

  const tabs = ['Overview', 'Details', 'Amenities', 'Location', 'Floor Plan', 'Nearby', `Reviews (${prop.agentReviewsCount})`];
  const timeSlots = ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'];

  const prevImage = () => setActiveImage((i) => (i === 0 ? GALLERY_IMAGES.length - 1 : i - 1));
  const nextImage = () => setActiveImage((i) => (i === GALLERY_IMAGES.length - 1 ? 0 : i + 1));

  return (
    <div className="property-detail-page">
      <div className="detail-mobile-topbar">
        <button type="button" className="detail-back-btn" onClick={handleBack} aria-label="Go back">
          <ChevronLeft size={20} />
        </button>
        <span className="detail-topbar-title">{prop.title}</span>
      </div>

      <div className="container">
        <div className="detail-content-layout">
          <div className="detail-main">
            <div className="detail-gallery">
              <div className="detail-gallery-main">
                <img src={GALLERY_IMAGES[activeImage]} alt={prop.title} />
                <div className="verified-badge"><CheckCircle size={12} strokeWidth={3} /> Verified</div>
                <button type="button" className="circle-action-btn detail-gallery-fav" onClick={() => showToast('Saved!')} aria-label="Save property">
                  <Heart size={16} />
                </button>
                <button type="button" className="carousel-nav-btn prev" onClick={prevImage} aria-label="Previous photo">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" className="carousel-nav-btn next" onClick={nextImage} aria-label="Next photo">
                  <ChevronRight size={20} />
                </button>
                <button type="button" className="view-photos-btn">
                  <Camera size={16} /> View Photos ({prop.photos})
                </button>
              </div>
              <div className="detail-gallery-thumbs">
                {GALLERY_IMAGES.slice(0, 4).map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className={`detail-thumb${activeImage === i ? ' active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
                <button type="button" className="detail-thumb detail-thumb-video">
                  <img src={GALLERY_IMAGES[4]} alt="" />
                  <span className="detail-thumb-play"><Play size={18} fill="#fff" /></span>
                </button>
                <button type="button" className="detail-thumb detail-thumb-more" onClick={() => setActiveImage(5)}>
                  <img src={GALLERY_IMAGES[5]} alt="" />
                  <span className="detail-thumb-overlay">+18</span>
                </button>
              </div>
            </div>

            <div className="mobile-only-header detail-mobile-header">
              <div className="detail-mobile-price">{prop.price}</div>
              <h1>{prop.title}</h1>
              <p><MapPin size={14} /> {prop.location}</p>
              <div className="detail-mobile-specs">
                <span><Bed size={14} /> {prop.beds}</span>
                <span><Maximize2 size={14} /> {prop.area}</span>
              </div>
            </div>

            <div className="detail-mobile-agent">
              <img src={prop.agentAvatar} alt={prop.agentName} className="detail-agent-avatar" />
              <div className="detail-mobile-agent-info">
                <strong>{prop.agentName}</strong>
                <span><Star size={11} fill="#eab308" color="#eab308" /> {prop.agentRating} ({prop.agentReviewsCount})</span>
              </div>
              <button type="button" className="btn btn-primary detail-mobile-call" onClick={() => handleContactAction('phone', prop.agentName)}>
                <Phone size={14} />
              </button>
            </div>

            <div className="detail-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <section className="detail-section detail-overview-box">
              <div className="detail-stats-row detail-stats-row-5">
                <div className="detail-stat-card">
                  <div className="detail-stat-icon"><Building size={20} /></div>
                  <div>
                    <strong>Well Maintained</strong>
                    <span>Property Age<br />2-5 Years</span>
                  </div>
                </div>
                <div className="detail-stat-card">
                  <div className="detail-stat-icon"><ShieldCheck size={20} /></div>
                  <div>
                    <strong>Ownership</strong>
                    <span>Freehold</span>
                  </div>
                </div>
                <div className="detail-stat-card">
                  <div className="detail-stat-icon"><Key size={20} /></div>
                  <div>
                    <strong>Possession</strong>
                    <span>Ready To Move</span>
                  </div>
                </div>
                <div className="detail-stat-card">
                  <div className="detail-stat-icon"><FileText size={20} /></div>
                  <div>
                    <strong>RERA ID</strong>
                    <span>HRERA-12345-2023</span>
                  </div>
                </div>
                <div className="detail-stat-card">
                  <div className="detail-stat-icon"><Car size={20} /></div>
                  <div>
                    <strong>Parking</strong>
                    <span>2 Covered</span>
                  </div>
                </div>
              </div>

              <h3 className="detail-section-title">About This Property</h3>
              <p className="detail-section-text">
                Experience luxury living in this premium 3 BHK apartment located in the heart of Sector 65, Gurgaon.
                Designed for modern lifestyles, this home offers spacious interiors, top-notch amenities, and excellent connectivity.
              </p>

              <h4 className="detail-subtitle">Property Highlights</h4>
              <ul className="highlights-list">
                <li><CheckCircle size={16} /> Prime location on Golf Course Extension Road</li>
                <li><CheckCircle size={16} /> Gated community with 24x7 security</li>
                <li><CheckCircle size={16} /> Clubhouse, Swimming Pool &amp; Gym</li>
                <li><CheckCircle size={16} /> Close to schools, hospitals &amp; malls</li>
              </ul>
            </section>

            <section className="detail-section">
              <div className="detail-section-header">
                <h3 className="detail-section-title">Amenities</h3>
                <a href="#" className="detail-link" onClick={(e) => e.preventDefault()}>View All Amenities <ArrowRight size={14} /></a>
              </div>
              <div className="amenities-grid amenities-grid-detail">
                {AMENITIES.map(({ icon: Icon, label }) => (
                  <div key={label} className="amenity-item">
                    <Icon size={24} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="detail-section">
              <div className="detail-section-header">
                <h3 className="detail-section-title">Floor Plan</h3>
                <a href="#" className="detail-link" onClick={(e) => e.preventDefault()}>View Full Size <ArrowRight size={14} /></a>
              </div>
              <div className="floor-plan-container">
                <div className="floor-plan-sidebar">
                  <select className="floor-plan-select" defaultValue="3bhk">
                    <option value="3bhk">3 BHK - 1850 Sq. Ft.</option>
                  </select>
                  <ul className="floor-plan-list">
                    <li><strong>3</strong> Bedrooms</li>
                    <li><strong>1</strong> Living Room</li>
                    <li><strong>1</strong> Kitchen</li>
                    <li><strong>2</strong> Balconies</li>
                  </ul>
                </div>
                <div className="floor-plan-image-wrap">
                  <img src="/floor_plan.png" alt="Floor Plan" />
                </div>
              </div>
            </section>

            <section className="detail-section location-section-wrapper">
              <h3 className="detail-section-title">Location</h3>
              <div className="location-container">
                <div className="location-places">
                  <div className="place-item"><span><MapPin size={14} /> Metro Station</span><strong>8 min</strong></div>
                  <div className="place-item"><span><MapPin size={14} /> Fortis Hospital</span><strong>10 min</strong></div>
                  <div className="place-item"><span><MapPin size={14} /> Rapid Metro</span><strong>12 min</strong></div>
                  <div className="place-item"><span><MapPin size={14} /> Shopping Mall</span><strong>5 min</strong></div>
                  <button type="button" className="btn btn-primary detail-map-btn" onClick={() => showToast('Opening map...')}>
                    View on Map
                  </button>
                </div>
                <div className="location-map">
                  <iframe
                    title="Property Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.114827184246!2d77.05!3d28.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI0JzAwLjAiTiA3N8KwMDMnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </section>

            <section className="detail-section">
              <div className="detail-section-header">
                <h3 className="detail-section-title">Reviews &amp; Ratings</h3>
                <a href="#" className="detail-link" onClick={(e) => e.preventDefault()}>View All Reviews <ArrowRight size={14} /></a>
              </div>
              <div className="reviews-container">
                <div className="reviews-score">
                  <div className="reviews-score-value">{prop.agentRating}</div>
                  <div className="reviews-score-stars">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="#eab308" color="#eab308" />)}
                  </div>
                  <div className="reviews-score-count">{prop.agentReviewsCount} Reviews</div>
                </div>
                <div className="reviews-bars">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="reviews-bar-row">
                      <span>{star} ★</span>
                      <div className="reviews-bar-track">
                        <div className="reviews-bar-fill" style={{ width: star === 5 ? '82%' : star === 4 ? '6%' : '1%' }} />
                      </div>
                      <span>{star === 5 ? '82%' : star === 4 ? '6%' : '1%'}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="detail-review-card">
                <img src={PEOPLE_IMAGES.agentFemale2} alt="Reviewer" />
                <div>
                  <h5>Ankita Singh</h5>
                  <div className="detail-review-meta">
                    <span className="detail-review-stars">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="#eab308" color="#eab308" />)}
                    </span>
                    <span>2 weeks ago</span>
                  </div>
                  <p>Amazing property with all modern amenities. The location is perfect and connectivity is excellent. Highly recommended!</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="detail-sidebar">
            <div className="sidebar-card agent-contact-card">
              <div className="desktop-only-header detail-sidebar-header">
                <div className="detail-sidebar-price">{prop.price}</div>
                <h1>{prop.title}</h1>
                <p><MapPin size={14} /> {prop.location}</p>
                <div className="detail-sidebar-specs">
                  <span><Bed size={16} /> {prop.beds}</span>
                  <span><Maximize2 size={16} /> {prop.area}</span>
                </div>
              </div>

              <div className="detail-agent-row">
                <img src={prop.agentAvatar} alt={prop.agentName} className="detail-agent-avatar" />
                <div>
                  <h4>{prop.agentName} <BadgeCheck size={14} /></h4>
                  <p>Senior Property Consultant</p>
                  <div className="detail-agent-rating">
                    <Star size={12} fill="#eab308" color="#eab308" /> {prop.agentRating}
                    <span>({prop.agentReviewsCount} Reviews)</span>
                  </div>
                </div>
              </div>

              <button type="button" className="btn btn-primary detail-contact-main" onClick={() => handleContactAction('phone', prop.agentName)}>
                <Phone size={16} /> Contact Agent
              </button>
              <div className="contact-split-buttons">
                <button type="button" className="btn btn-outline" onClick={() => handleContactAction('phone', prop.agentName)}><Phone size={16} /> Call</button>
                <button type="button" className="btn btn-outline" onClick={() => handleContactAction('whatsapp', prop.agentName)}><MessageSquare size={16} /> Chat</button>
              </div>
              <div className="contact-split-buttons">
                <button type="button" className="btn detail-secondary-btn" onClick={() => showToast('Shared!')}><Upload size={16} /> Share</button>
                <button type="button" className="btn detail-secondary-btn" onClick={() => showToast('Saved!')}><Heart size={16} /> Save</button>
              </div>
            </div>

            <div className="sidebar-card schedule-visit-card detail-sidebar-desktop-only">
              <h3>Schedule a Visit</h3>
              <p>Choose a convenient time and our agent will call you.</p>
              <input type="date" className="schedule-input" defaultValue="2024-10-15" />
              <div className="time-slots">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`time-slot${activeTimeSlot === slot ? ' active' : ''}`}
                    onClick={() => setActiveTimeSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <button type="button" className="btn btn-primary detail-schedule-btn" onClick={() => showToast('Visit Scheduled Successfully!')}>
                Schedule Visit
              </button>
            </div>

            <div className="sidebar-card detail-sidebar-desktop-only">
              <div className="detail-section-header">
                <h3>Similar Properties</h3>
                <a href="#" className="detail-link" onClick={(e) => e.preventDefault()}>View All <ArrowRight size={14} /></a>
              </div>
              <div className="similar-properties-list">
                {SIMILAR_PROPERTIES.map((sim, i) => (
                  <div key={sim.title} className={`similar-property-item${i < SIMILAR_PROPERTIES.length - 1 ? ' bordered' : ''}`}>
                    <div className="similar-property-thumb">
                      <img src={sim.img} alt={sim.title} />
                      <button type="button" aria-label="Save"><Heart size={12} /></button>
                    </div>
                    <div>
                      <div className="similar-property-price">{RUPEE} {sim.price}</div>
                      <div className="similar-property-title">{sim.title}</div>
                      <div className="similar-property-loc"><MapPin size={12} /> {sim.loc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-card property-worth-card detail-sidebar-desktop-only">
              <h3>What&apos;s Your<br />Property Worth?</h3>
              <p>Get a free property valuation by our real estate experts.</p>
              <button type="button" className="property-worth-btn">Check Now <ArrowRight size={14} /></button>
              <Building size={150} className="property-worth-bg" />
            </div>

            <div className="sidebar-card need-help-card detail-sidebar-desktop-only">
              <h3>Need Help?</h3>
              <p>Talk to our property experts</p>
              <div className="need-help-list">
                <div><Phone size={16} /> (+91) 98765 43210</div>
                <div><Mail size={16} /> support@acreskey.com</div>
                <div><Clock size={16} /> Mon - Sat: 9:00 AM - 8:00 PM</div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="sticky-bottom-bar">
        <div className="container">
          <div className="sticky-agent-info">
            <img src={prop.agentAvatar} alt={prop.agentName} />
            <div>
              <h4>{prop.agentName}</h4>
              <span>Senior Property Consultant</span>
            </div>
            <div className="sticky-agent-divider" />
            <div>
              <strong>Interested in this property?</strong>
              <span>Connect with our expert for more details.</span>
            </div>
          </div>
          <div className="sticky-bottom-buttons">
            <button type="button" className="btn btn-outline" onClick={() => handleContactAction('phone', prop.agentName)}>
              <Phone size={16} /> Call Now
            </button>
            <button type="button" className="btn btn-primary" onClick={() => handleContactAction('whatsapp', prop.agentName)}>
              <MessageSquare size={16} /> Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
