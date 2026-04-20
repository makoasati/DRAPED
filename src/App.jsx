import { useState } from 'react';

// ─── Brand design tokens (DRAPED Brand Guidelines v1.0) ───────────────────────
const C = {
  parchment:  '#FAFAF0',  // primary background
  umber:      '#2C2418',  // primary text, wordmark, CTA bg
  terracotta: '#B5732A',  // accent — AI labels, active states, price highlights
  linen:      '#E5E0D5',  // borders, dividers
  cream:      '#EAE6DC',  // tags, badges, card surfaces, pills
  stone:      '#7A6E60',  // secondary / muted text, labels
  white:      '#FFFFFF',  // card backgrounds
};

const CONDITION_STYLE = {
  Excellent: { bg: '#EAE6DC', color: '#4A3F2C' },
  Good:      { bg: '#E0EDE4', color: '#2A5035' },
  Fair:      { bg: '#F0E8DE', color: '#5C3E26' },
};

// ─── Mock data ────────────────────────────────────────────────────────────────
const GARMENTS = [
  {
    id: 1,
    photo: '/images/emerald-anarkali.png',
    name: 'Emerald Anarkali Set',
    type: 'Anarkali',
    occasion: ['Sangeet', 'Mehendi'],
    condition: 'Excellent',
    buyPrice: 420,
    rentPrice: 85,
    rentDuration: '4 days',
    description: "A stunning emerald green Anarkali with gold zari embroidery along the hem and dupatta. Crafted in georgette with a silk lining, this piece photographs beautifully under both natural and stage lighting. Worn once for a cousin's sangeet, dry-cleaned and stored in a garment bag.",
    measurements: { bust: 36, waist: 30, hip: 38, length: 54, blouseLength: 15 },
    sellerName: 'Priya S.',
    sellerRating: 4.9,
    sellerRentals: 12,
  },
  {
    id: 2,
    photo: '/images/ivory-bridal-lehenga.png',
    name: 'Ivory Bridal Lehenga',
    type: 'Lehenga',
    occasion: ['Wedding Reception', 'Engagement'],
    condition: 'Excellent',
    buyPrice: 1200,
    rentPrice: null,
    rentDuration: null,
    description: 'An heirloom-quality ivory silk lehenga with hand-embroidered floral motifs and a cathedral-length dupatta. Worn once for a wedding reception, professionally dry-cleaned and stored. Blouse is fully lined with a hook-and-eye closure.',
    measurements: { bust: 34, waist: 28, hip: 36, length: 42, blouseLength: 14 },
    sellerName: 'Aisha K.',
    sellerRating: 5.0,
    sellerRentals: 3,
  },
  {
    id: 3,
    photo: '/images/mustard-bandhani-saree.png',
    name: 'Mustard Bandhani Saree',
    type: 'Saree',
    occasion: ['Haldi', 'Garba/Navratri', 'Diwali'],
    condition: 'Good',
    buyPrice: null,
    rentPrice: 55,
    rentDuration: '3 days',
    description: 'A vibrant mustard Bandhani saree from Rajasthan with traditional tie-dye patterns. Pairs beautifully with a contrasting magenta blouse — blouse included. Light and airy fabric, ideal for outdoor daytime ceremonies.',
    measurements: { bust: 38, waist: 32, hip: 40, length: 45, blouseLength: 16 },
    sellerName: 'Meera D.',
    sellerRating: 4.7,
    sellerRentals: 8,
  },
  {
    id: 4,
    photo: '/images/navy-blue-sherwani.png',
    name: 'Navy Blue Sherwani',
    type: 'Sherwani',
    occasion: ['Wedding Reception', 'Walima', 'Engagement'],
    condition: 'Excellent',
    buyPrice: 680,
    rentPrice: 120,
    rentDuration: '4 days',
    description: 'A tailored navy blue Sherwani with silver threadwork on the collar and cuffs. Comes with matching churidar and a silk pocket square. Perfect for grooms or groomsmen seeking understated elegance without bulk.',
    measurements: { bust: 42, waist: 36, hip: 44, length: 48, blouseLength: null },
    sellerName: 'Rohan M.',
    sellerRating: 4.8,
    sellerRentals: 5,
  },
  {
    id: 5,
    photo: '/images/fuchsia-mirror.png',
    name: 'Fuchsia Mirror-Work Lehenga',
    type: 'Lehenga',
    occasion: ['Sangeet', 'Mehendi', 'Garba/Navratri'],
    condition: 'Good',
    buyPrice: 380,
    rentPrice: 70,
    rentDuration: '4 days',
    description: 'A show-stopping fuchsia silk lehenga with mirror-work embroidery across the full skirt. The blouse features a backless design with tassel ties. Worn twice — a minor inner seam was repaired by a tailor and is fully intact.',
    measurements: { bust: 35, waist: 29, hip: 37, length: 40, blouseLength: 13 },
    sellerName: 'Simran B.',
    sellerRating: 4.6,
    sellerRentals: 15,
  },
  {
    id: 6,
    photo: 'salwar,india/all?lock=1',
    name: 'Pastel Pink Kurta Set',
    type: 'Kurta Set',
    occasion: ['Eid', 'Diwali', 'Engagement'],
    condition: 'Excellent',
    buyPrice: 210,
    rentPrice: 40,
    rentDuration: '3 days',
    description: 'A breezy pastel pink cotton-silk kurta with wide-leg palazzo pants and a sheer dupatta. Delicate chikankari embroidery at the neckline and cuffs. Versatile enough for afternoon garden events and evening celebrations.',
    measurements: { bust: 37, waist: 31, hip: 39, length: 50, blouseLength: null },
    sellerName: 'Fatima A.',
    sellerRating: 4.9,
    sellerRentals: 20,
  },
  {
    id: 7,
    photo: '/images/crimson-saree.png',
    name: 'Crimson Banarasi Saree',
    type: 'Saree',
    occasion: ['Wedding Reception', 'Walima', 'Diwali'],
    condition: 'Fair',
    buyPrice: 290,
    rentPrice: null,
    rentDuration: null,
    description: 'A traditional crimson Banarasi saree with a gold brocade border and pallu. Some natural aging is visible along the border edge; overall drape and sheen remain beautiful. A wonderful piece for someone who appreciates vintage textiles.',
    measurements: { bust: 36, waist: 30, hip: 38, length: 44, blouseLength: 15 },
    sellerName: 'Kavitha R.',
    sellerRating: 4.5,
    sellerRentals: 2,
  },
  {
    id: 8,
    photo: '/images/teal-lehenga.png',
    name: 'Teal Gota Patti Lehenga',
    type: 'Lehenga',
    occasion: ['Mehendi', 'Haldi'],
    condition: 'Excellent',
    buyPrice: null,
    rentPrice: 90,
    rentDuration: '4 days',
    description: 'A teal georgette lehenga adorned with Gota Patti embellishments along the hem and dupatta border. Lightweight and perfect for outdoor day celebrations. Comes with a matching ready-to-wear blouse in the same shade.',
    measurements: { bust: 34, waist: 28, hip: 36, length: 41, blouseLength: 14 },
    sellerName: 'Nadia H.',
    sellerRating: 4.8,
    sellerRentals: 9,
  },
  {
    id: 9,
    photo: '/images/gold-gharara.png',
    name: 'Gold Tissue Gharara Set',
    type: 'Other',
    occasion: ['Walima', 'Eid', 'Wedding Reception'],
    condition: 'Good',
    buyPrice: 520,
    rentPrice: 100,
    rentDuration: '7 days',
    description: 'A luxurious gold tissue gharara with intricate resham embroidery and a matching angrakha-style kurti. A classic South Asian silhouette updated with contemporary draping and clean finishing. Dry-cleaned after last wear.',
    measurements: { bust: 38, waist: 32, hip: 40, length: 38, blouseLength: 22 },
    sellerName: 'Zara Q.',
    sellerRating: 4.7,
    sellerRentals: 6,
  },
  {
    id: 10,
    photo: '/images/orange-chaniya.png',
    name: 'Orange Chaniya Choli',
    type: 'Other',
    occasion: ['Garba/Navratri', 'Diwali'],
    condition: 'Good',
    buyPrice: 175,
    rentPrice: 45,
    rentDuration: '3 days',
    description: 'A vibrant orange chaniya choli with bandhani print and mirror-work detailing on the bodice. Three-tier flared skirt ideal for Garba dancing. Very comfortable with an elasticated waistband — easy to size up or down.',
    measurements: { bust: 36, waist: 30, hip: 38, length: 43, blouseLength: 12 },
    sellerName: 'Pooja V.',
    sellerRating: 4.6,
    sellerRentals: 18,
  },
];

const OCCASIONS = [
  'Mehendi','Sangeet','Wedding Reception','Haldi',
  'Engagement','Eid','Diwali','Garba/Navratri','Walima','Other',
];

function photoUrl(path, w, h) {
  if (path.startsWith('/')) return path;
  return `https://loremflickr.com/${w}/${h}/${path}`;
}

// ─── Measurement unit helpers ─────────────────────────────────────────────────
function toDisplay(inches, unit) {
  if (inches == null) return null;
  if (unit === 'cm') return (inches * 2.54).toFixed(1);
  return String(inches);
}
function unitSuffix(unit) { return unit === 'cm' ? ' cm' : '"'; }

// ─── Shared primitives ────────────────────────────────────────────────────────

function ConditionBadge({ condition }) {
  const s = CONDITION_STYLE[condition] || CONDITION_STYLE.Fair;
  return (
    <span style={{
      display: 'inline-block',
      background: s.bg, color: s.color,
      fontSize: 11, fontWeight: 500, letterSpacing: '0.05em',
      padding: '3px 10px', borderRadius: 20,
    }}>
      {condition}
    </span>
  );
}

// Section label — ALL CAPS, 11px, stone, weight 500
function SectionLabel({ children, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 12,
    }}>
      <span style={{
        fontSize: 11, fontWeight: 500, color: C.stone,
        textTransform: 'uppercase', letterSpacing: '0.10em',
      }}>
        {children}
      </span>
      {right}
    </div>
  );
}

function Section({ title, right, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <SectionLabel right={right}>{title}</SectionLabel>
      {children}
    </div>
  );
}

// "DRAPED AI" terracotta label
function AiLabel({ children }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, color: C.terracotta,
      letterSpacing: '0.08em', textTransform: 'uppercase',
    }}>
      · {children}
    </span>
  );
}

function GarmentCard({ garment, onTap }) {
  return (
    <div
      onClick={() => onTap(garment)}
      style={{
        cursor: 'pointer', background: C.white,
        border: `0.5px solid ${C.linen}`, borderRadius: 12, overflow: 'hidden',
      }}
    >
      <img
        src={photoUrl(garment.photo, 300, 400)}
        alt={garment.name}
        style={{
          width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block',
          borderRadius: '8px 8px 0 0',
        }}
      />
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{
          fontSize: 11, fontWeight: 500, color: C.stone,
          letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4,
        }}>
          {garment.occasion[0]}
        </div>
        <div style={{
          fontSize: 13, fontWeight: 500, color: C.umber,
          marginBottom: 6, lineHeight: 1.4,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {garment.name}
        </div>
        <div style={{ marginBottom: 6 }}>
          <ConditionBadge condition={garment.condition} />
        </div>
        {garment.rentPrice && (
          <div style={{ fontSize: 13, fontWeight: 500, color: C.terracotta }}>
            Rent ${garment.rentPrice} / {garment.rentDuration}
          </div>
        )}
        {garment.buyPrice && (
          <div style={{ fontSize: 13, fontWeight: 500, color: C.umber }}>
            Buy ${garment.buyPrice}
          </div>
        )}
      </div>
    </div>
  );
}

function Modal({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(44,36,24,0.4)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        background: C.white, width: '100%', maxWidth: 390,
        borderRadius: '16px 16px 0 0', padding: '28px 24px 40px',
        textAlign: 'center',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: C.cream,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', color: C.umber, fontSize: 18,
        }}>✓</div>
        <div style={{
          fontSize: 20, fontWeight: 400, color: C.umber, marginBottom: 8,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}>
          Request sent.
        </div>
        <div style={{ fontSize: 14, color: C.stone, lineHeight: 1.7, marginBottom: 24 }}>
          The seller will confirm within 24 hours.
        </div>
        <button onClick={onClose} style={primaryBtn}>Done</button>
      </div>
    </div>
  );
}

// ─── Button style objects ─────────────────────────────────────────────────────
const primaryBtn = {
  width: '100%', height: 48, background: C.umber, color: C.parchment,
  border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 500,
  letterSpacing: '0.04em', cursor: 'pointer', fontFamily: 'inherit',
};
const secondaryBtn = {
  width: '100%', height: 48, background: 'transparent', color: C.umber,
  border: `0.5px solid ${C.umber}`, borderRadius: 4, fontSize: 14, fontWeight: 500,
  cursor: 'pointer', fontFamily: 'inherit',
};

// ─── Form primitives ──────────────────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 500, color: C.stone,
      textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
    }}>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type} value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', boxSizing: 'border-box', height: 48,
        border: `0.5px solid ${C.linen}`, borderRadius: 6,
        padding: '0 14px', fontSize: 14, fontWeight: 400, color: C.umber,
        background: C.white, outline: 'none', fontFamily: 'inherit',
      }}
    />
  );
}

function UnitToggle({ unit, setUnit }) {
  return (
    <div style={{
      display: 'inline-flex', borderRadius: 4,
      border: `0.5px solid ${C.linen}`, overflow: 'hidden', flexShrink: 0,
    }}>
      {['in', 'cm'].map(u => (
        <button key={u} onClick={() => setUnit(u)} style={{
          padding: '5px 12px', border: 'none', cursor: 'pointer',
          background: unit === u ? C.umber : C.white,
          color: unit === u ? C.parchment : C.stone,
          fontSize: 11, fontWeight: 500, letterSpacing: '0.05em',
          fontFamily: 'inherit',
        }}>
          {u}
        </button>
      ))}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
const Divider = () => (
  <div style={{ height: '0.5px', background: C.linen, margin: '0 0 24px' }} />
);

// ─── Screen: Home ─────────────────────────────────────────────────────────────
function HomeScreen({ onViewGarment }) {
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const filtered = selectedOccasion
    ? GARMENTS.filter(g => g.occasion.includes(selectedOccasion))
    : GARMENTS;

  return (
    <div>
      {/* Top bar */}
      <div style={{
        height: 52, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 16px',
        borderBottom: `0.5px solid ${C.linen}`,
        background: C.parchment, position: 'sticky', top: 0, zIndex: 20,
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 24, fontWeight: 400, letterSpacing: '0.18em', color: C.umber,
        }}>
          DRAPED
        </span>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: C.cream, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 13, color: C.stone, cursor: 'pointer',
        }}>
          ◯
        </div>
      </div>

      <div style={{ padding: '32px 16px 0' }}>
        {/* Hero */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 28, fontWeight: 400, color: C.umber,
            lineHeight: 1.3, margin: '0 0 12px',
          }}>
            Find your look<br />for the occasion.
          </h1>
          <p style={{ fontSize: 14, color: C.stone, margin: 0, lineHeight: 1.7 }}>
            Buy or rent verified cultural occasion wear.
          </p>
        </div>

        {/* Occasion pills */}
        <div style={{ marginBottom: 32 }}>
          <SectionLabel>What's the occasion?</SectionLabel>
          <div style={{
            display: 'flex', gap: 8, overflowX: 'auto',
            paddingBottom: 4, scrollbarWidth: 'none',
          }}>
            {OCCASIONS.map(occ => {
              const active = selectedOccasion === occ;
              return (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(active ? null : occ)}
                  style={{
                    flexShrink: 0, height: 36, padding: '0 16px',
                    borderRadius: 20, border: 'none',
                    background: active ? C.umber : C.cream,
                    color: active ? C.parchment : '#4A3F2C',
                    fontSize: 13, fontWeight: 500, letterSpacing: '0.03em',
                    cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
                  }}
                >
                  {occ}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured listings */}
        <div>
          <SectionLabel>
            {selectedOccasion ? `Featured — ${selectedOccasion}` : 'Featured listings'}
          </SectionLabel>
          {filtered.length === 0 ? (
            <div style={{ color: C.stone, padding: '40px 0', fontSize: 14, textAlign: 'center' }}>
              No garments found for this occasion.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {filtered.map(g => <GarmentCard key={g.id} garment={g} onTap={onViewGarment} />)}
            </div>
          )}
        </div>
        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}

// ─── Screen: Browse ───────────────────────────────────────────────────────────
function BrowseScreen({ onViewGarment }) {
  const [mode, setMode] = useState('all');
  const [condition, setCondition] = useState('All');

  const filtered = GARMENTS.filter(g => {
    const modeOk = mode === 'all' || (mode === 'buy' ? !!g.buyPrice : !!g.rentPrice);
    const condOk = condition === 'All' || g.condition === condition;
    return modeOk && condOk;
  });

  const filterPill = (label, active, onClick) => (
    <button key={label} onClick={onClick} style={{
      height: 36, padding: '0 16px', borderRadius: 20, border: 'none',
      background: active ? C.umber : C.cream,
      color: active ? C.parchment : '#4A3F2C',
      fontSize: 13, fontWeight: 500, letterSpacing: '0.03em',
      cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
    }}>{label}</button>
  );

  return (
    <div>
      <div style={{
        position: 'sticky', top: 0, zIndex: 20, background: C.parchment,
        borderBottom: `0.5px solid ${C.linen}`, padding: '12px 16px 14px',
      }}>
        {/* Search bar */}
        <div style={{
          height: 48, background: C.white, border: `0.5px solid ${C.linen}`,
          borderRadius: 6, padding: '0 14px', display: 'flex', alignItems: 'center',
          fontSize: 14, color: C.stone, marginBottom: 12,
        }}>
          Search garments, occasions, styles…
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[['all','All'], ['buy','Buy'], ['rent','Rent']].map(([val, label]) =>
            filterPill(label, mode === val, () => setMode(val))
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {['All','Excellent','Good','Fair'].map(c =>
            filterPill(c, condition === c, () => setCondition(c))
          )}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontSize: 12, color: C.stone, marginBottom: 16 }}>
          {filtered.length} garment{filtered.length !== 1 ? 's' : ''} available
        </div>
        {filtered.length === 0 ? (
          <div style={{ color: C.stone, padding: '48px 0', fontSize: 14, textAlign: 'center' }}>
            No garments found for this occasion.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {filtered.map(g => <GarmentCard key={g.id} garment={g} onTap={onViewGarment} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Garment Detail ───────────────────────────────────────────────────
function GarmentDetail({ garment, onBack }) {
  const [modal, setModal] = useState(false);
  const [unit, setUnit]   = useState('in');

  const priceLow  = garment.buyPrice ? Math.round(garment.buyPrice * 0.88) : garment.rentPrice * 3;
  const priceHigh = garment.buyPrice ? Math.round(garment.buyPrice * 1.06) : garment.rentPrice * 4;

  return (
    <div>
      {modal && <Modal onClose={() => setModal(false)} />}

      {/* Back bar */}
      <div style={{
        height: 52, display: 'flex', alignItems: 'center',
        padding: '0 16px', borderBottom: `0.5px solid ${C.linen}`,
        background: C.parchment, position: 'sticky', top: 0, zIndex: 20,
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 18, color: C.umber, padding: 0, marginRight: 10,
          lineHeight: 1, fontFamily: 'inherit',
        }}>←</button>
        <span style={{ fontSize: 14, fontWeight: 500, color: C.umber }}>Back</span>
      </div>

      {/* Hero photo */}
      <img
        src={photoUrl(garment.photo, 390, 520)}
        alt={garment.name}
        style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
      />

      <div style={{ padding: '24px 16px 110px' }}>
        {/* Name + occasion */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 11, fontWeight: 500, color: C.stone,
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8,
          }}>
            {garment.occasion[0]}
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 28, fontWeight: 400, color: C.umber,
            margin: '0 0 10px', lineHeight: 1.3,
          }}>
            {garment.name}
          </h2>
          <ConditionBadge condition={garment.condition} />
        </div>

        <Divider />

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          {garment.rentPrice && (
            <button onClick={() => setModal(true)} style={{ ...primaryBtn, flex: 1 }}>
              Rent — ${garment.rentPrice} / {garment.rentDuration}
            </button>
          )}
          {garment.buyPrice && (
            <button onClick={() => setModal(true)} style={{ ...secondaryBtn, flex: 1 }}>
              Buy — ${garment.buyPrice}
            </button>
          )}
        </div>

        {/* Condition Report */}
        <Section title="Condition report">
          <ConditionBadge condition={garment.condition} />
          <div style={{ marginTop: 14 }}>
            {['No stains', 'Embroidery intact', 'Color accurate to photos'].map(item => (
              <div key={item} style={{
                display: 'flex', alignItems: 'center',
                marginBottom: 10, gap: 10,
              }}>
                <span style={{ color: '#2A5035', fontSize: 13 }}>✓</span>
                <span style={{ fontSize: 14, color: C.umber, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 11 }}>
            <AiLabel>Verified by DRAPED AI</AiLabel>
          </div>
        </Section>

        {/* Measurements */}
        <Section
          title="Measurements"
          right={<UnitToggle unit={unit} setUnit={setUnit} />}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              ['Bust', garment.measurements.bust],
              ['Waist', garment.measurements.waist],
              ['Hip', garment.measurements.hip],
              ['Length', garment.measurements.length],
              ['Blouse length', garment.measurements.blouseLength],
            ].filter(([, v]) => v != null).map(([label, val]) => (
              <div key={label} style={{
                background: C.cream, borderRadius: 6, padding: '10px 12px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: C.stone, marginBottom: 3 }}>
                  {label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: C.umber }}>
                  {toDisplay(val, unit)}{unitSuffix(unit)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* AI Suggested Price */}
        <Section title="Suggested price">
          <div style={{
            border: `0.5px solid ${C.linen}`, borderRadius: 6, padding: '14px 16px',
          }}>
            <p style={{ fontSize: 14, color: C.umber, margin: '0 0 8px', lineHeight: 1.7 }}>
              Based on garment age, condition, and embellishment, the fair market value
              is <span style={{ fontWeight: 500 }}>${priceLow}–${priceHigh}</span>.
            </p>
            <AiLabel>DRAPED Pricing AI</AiLabel>
          </div>
        </Section>

        {/* About */}
        <Section title="About this piece">
          <p style={{ fontSize: 14, color: C.umber, lineHeight: 1.7, margin: 0 }}>
            {garment.description}
          </p>
        </Section>

        {/* Seller */}
        <Section title="Seller">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: C.cream, border: `0.5px solid ${C.linen}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, color: C.stone, flexShrink: 0,
            }}>
              ◯
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.umber }}>
                {garment.sellerName}
              </div>
              <div style={{ fontSize: 12, color: C.stone, marginTop: 2 }}>
                ⭐ {garment.sellerRating} · {garment.sellerRentals} rentals
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

// ─── Screen: List a Garment ───────────────────────────────────────────────────
function ListGarmentScreen() {
  const [step, setStep]               = useState(1);
  const [submitted, setSubmitted]     = useState(false);

  const [garmentName, setGarmentName]     = useState('');
  const [garmentType, setGarmentType]     = useState('');
  const [sellOccasion, setSellOccasion]   = useState(null);
  const [sellCondition, setSellCondition] = useState(null);
  const [measUnit, setMeasUnit]           = useState('in');
  const [meas, setMeas]                   = useState({ bust:'', waist:'', hip:'', skirtLength:'', blouseLength:'' });
  const [listType, setListType]           = useState('both');
  const [salePrice, setSalePrice]         = useState('');
  const [rentPrice, setRentPrice]         = useState('');
  const [rentDur, setRentDur]             = useState('4 days');

  function reset() {
    setStep(1); setSubmitted(false); setGarmentName(''); setGarmentType('');
    setSellOccasion(null); setSellCondition(null);
    setMeas({ bust:'', waist:'', hip:'', skirtLength:'', blouseLength:'' });
    setSalePrice(''); setRentPrice('');
  }

  if (submitted) {
    return (
      <div style={{ padding: '80px 24px 24px', textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%', background: C.cream,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: C.umber, margin: '0 auto 20px',
        }}>✓</div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 28, fontWeight: 400, color: C.umber, margin: '0 0 12px',
        }}>
          Your listing is live.
        </h2>
        <p style={{ fontSize: 14, color: C.stone, lineHeight: 1.7, margin: '0 0 32px' }}>
          Buyers can now find your piece on DRAPED.
        </p>
        <button onClick={reset} style={primaryBtn}>List another piece</button>
      </div>
    );
  }

  const STEP_LABELS = ['Photos & details', 'Measurements', 'Pricing'];

  return (
    <div>
      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20, background: C.parchment,
        borderBottom: `0.5px solid ${C.linen}`, padding: '14px 16px',
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 20, fontWeight: 400, color: C.umber, marginBottom: 16,
        }}>
          List your piece
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          {[1,2,3].map(s => (
            <span key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 3 ? 1 : 'none' }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: step >= s ? C.umber : C.linen,
              }} />
              {s < 3 && (
                <span style={{
                  flex: 1, height: '0.5px', background: step > s ? C.umber : C.linen,
                  margin: '0 6px',
                }} />
              )}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 400, color: C.stone }}>
          Step {step} of 3 — {STEP_LABELS[step - 1]}
        </div>
      </div>

      <div style={{ padding: '24px 16px 110px' }}>
        {/* ── Step 1 ── */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <FieldLabel>Photos</FieldLabel>
              <div style={{
                width: '100%', aspectRatio: '4/3', background: C.cream,
                border: `0.5px dashed ${C.linen}`, borderRadius: 6,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', color: C.stone,
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>↑</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.umber }}>
                  Upload photos
                </div>
                <div style={{ fontSize: 12, color: C.stone, marginTop: 4 }}>
                  Up to 6 photos
                </div>
              </div>
            </div>

            <div>
              <FieldLabel>Garment name</FieldLabel>
              <TextInput value={garmentName} onChange={setGarmentName} placeholder="e.g. Emerald Anarkali Set" />
            </div>

            <div>
              <FieldLabel>Garment type</FieldLabel>
              <div style={{ position: 'relative' }}>
                <select
                  value={garmentType} onChange={e => setGarmentType(e.target.value)}
                  style={{
                    width: '100%', height: 48, border: `0.5px solid ${C.linen}`,
                    borderRadius: 6, padding: '0 14px', fontSize: 14, fontWeight: 400,
                    color: garmentType ? C.umber : C.stone, background: C.white,
                    outline: 'none', fontFamily: 'inherit', appearance: 'none', cursor: 'pointer',
                  }}
                >
                  <option value="" disabled>Select type</option>
                  {['Lehenga','Saree','Anarkali','Sherwani','Kurta Set','Other'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span style={{
                  position: 'absolute', right: 14, top: '50%',
                  transform: 'translateY(-50%)', color: C.stone, pointerEvents: 'none', fontSize: 11,
                }}>▾</span>
              </div>
            </div>

            <div>
              <FieldLabel>Occasion</FieldLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {OCCASIONS.map(occ => {
                  const active = sellOccasion === occ;
                  return (
                    <button key={occ} onClick={() => setSellOccasion(active ? null : occ)} style={{
                      height: 36, padding: '0 16px', borderRadius: 20, border: 'none',
                      background: active ? C.umber : C.cream,
                      color: active ? C.parchment : '#4A3F2C',
                      fontSize: 13, fontWeight: 500, letterSpacing: '0.03em',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                      {occ}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <FieldLabel>Condition</FieldLabel>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Excellent','Good','Fair'].map(c => (
                  <button key={c} onClick={() => setSellCondition(c)} style={{
                    flex: 1, height: 48, borderRadius: 4, cursor: 'pointer',
                    border: `0.5px solid ${sellCondition === c ? C.umber : C.linen}`,
                    background: sellCondition === c ? C.umber : C.white,
                    color: sellCondition === c ? C.parchment : C.umber,
                    fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                  }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <p style={{ fontSize: 12, color: C.stone, margin: 0, lineHeight: 1.7, flex: 1 }}>
                Accurate measurements reduce returns and build trust with buyers.
              </p>
              <UnitToggle unit={measUnit} setUnit={u => {
                const factor = u === 'cm' ? 2.54 : 1 / 2.54;
                setMeas(m => {
                  const out = {};
                  for (const k of Object.keys(m)) {
                    const n = parseFloat(m[k]);
                    out[k] = isNaN(n) ? '' : (n * factor).toFixed(1);
                  }
                  return out;
                });
                setMeasUnit(u);
              }} />
            </div>

            {[
              ['bust','Bust'],['waist','Waist'],['hip','Hip'],
              ['skirtLength','Skirt length'],['blouseLength','Blouse length'],
            ].map(([key, label]) => {
              const ph = measUnit === 'cm'
                ? { bust:'91',waist:'76',hip:'97',skirtLength:'107',blouseLength:'36' }[key]
                : { bust:'36',waist:'30',hip:'38',skirtLength:'42',blouseLength:'14' }[key];
              return (
                <div key={key}>
                  <FieldLabel>{label} ({measUnit})</FieldLabel>
                  <TextInput
                    value={meas[key]}
                    onChange={v => setMeas(m => ({ ...m, [key]: v }))}
                    placeholder={`e.g. ${ph}`}
                    type="number"
                  />
                </div>
              );
            })}

            {Object.values(meas).some(v => v !== '') && (
              <div style={{
                background: C.cream, border: `0.5px solid ${C.linen}`,
                borderRadius: 6, padding: '12px 14px',
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 500, color: C.stone,
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
                }}>
                  Also shown as
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {[['bust','B'],['waist','W'],['hip','H'],['skirtLength','L'],['blouseLength','Bl']].map(([key, abbr]) => {
                    const raw = parseFloat(meas[key]);
                    if (isNaN(raw)) return null;
                    const converted = measUnit === 'in'
                      ? `${(raw * 2.54).toFixed(1)} cm`
                      : `${(raw / 2.54).toFixed(1)}"`;
                    return (
                      <span key={key} style={{ fontSize: 13, color: C.umber }}>
                        <span style={{ color: C.stone, fontWeight: 500 }}>{abbr} </span>{converted}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 3 ── */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <FieldLabel>Listing type</FieldLabel>
              <div style={{ display: 'flex', gap: 8 }}>
                {[['sale','For sale'],['rent','For rent'],['both','Both']].map(([val, label]) => (
                  <button key={val} onClick={() => setListType(val)} style={{
                    flex: 1, height: 48, borderRadius: 4, cursor: 'pointer',
                    border: `0.5px solid ${listType === val ? C.umber : C.linen}`,
                    background: listType === val ? C.umber : C.white,
                    color: listType === val ? C.parchment : C.umber,
                    fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                  }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {(listType === 'sale' || listType === 'both') && (
              <div>
                <FieldLabel>Sale price ($)</FieldLabel>
                <TextInput value={salePrice} onChange={setSalePrice} placeholder="e.g. 420" type="number" />
              </div>
            )}

            {(listType === 'rent' || listType === 'both') && (
              <>
                <div>
                  <FieldLabel>Rent price ($)</FieldLabel>
                  <TextInput value={rentPrice} onChange={setRentPrice} placeholder="e.g. 85" type="number" />
                </div>
                <div>
                  <FieldLabel>Rental duration</FieldLabel>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={rentDur} onChange={e => setRentDur(e.target.value)}
                      style={{
                        width: '100%', height: 48, border: `0.5px solid ${C.linen}`,
                        borderRadius: 6, padding: '0 14px', fontSize: 14, color: C.umber,
                        background: C.white, outline: 'none', fontFamily: 'inherit',
                        appearance: 'none', cursor: 'pointer',
                      }}
                    >
                      {['3 days','4 days','7 days'].map(d => <option key={d}>{d}</option>)}
                    </select>
                    <span style={{
                      position: 'absolute', right: 14, top: '50%',
                      transform: 'translateY(-50%)', color: C.stone, pointerEvents: 'none', fontSize: 11,
                    }}>▾</span>
                  </div>
                </div>
              </>
            )}

            {/* AI Pricing suggestion */}
            <div style={{
              border: `0.5px solid ${C.linen}`, borderRadius: 6, padding: '14px 16px',
            }}>
              <p style={{ fontSize: 14, color: C.umber, margin: '0 0 8px', lineHeight: 1.7 }}>
                Based on similar listings, we suggest:{' '}
                <span style={{ fontWeight: 500 }}>$380–$440 sale · $75–$95 / 4 days rent</span>
              </p>
              <AiLabel>DRAPED Pricing AI</AiLabel>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)} style={{ ...secondaryBtn, flex: 1 }}>
              Back
            </button>
          )}
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : setSubmitted(true)}
            style={{ ...primaryBtn, flex: 2 }}
          >
            {step < 3 ? 'Continue' : 'Publish listing'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Profile mock data ────────────────────────────────────────────────────────
const MY_LISTINGS = [
  { ...GARMENTS[0], status: 'active'  },
  { ...GARMENTS[1], status: 'active'  },
  { ...GARMENTS[4], status: 'active'  },
  { ...GARMENTS[7], status: 'rented'  },
  { ...GARMENTS[2], status: 'rented'  },
  { ...GARMENTS[3], status: 'sold'    },
  { ...GARMENTS[6], status: 'sold'    },
];

const STATUS_STYLE = {
  active: { bg: '#EAE6DC', color: '#2C2418', label: 'Active'     },
  rented: { bg: '#E0EDE4', color: '#2A5035', label: 'Rented out' },
  sold:   { bg: '#F0E8DE', color: '#5C3E26', label: 'Sold'       },
};

// ─── Burger menu drawer ───────────────────────────────────────────────────────
function BurgerDrawer({ onClose }) {
  const items = [
    { label: 'Edit profile',      icon: '○' },
    { label: 'Notifications',     icon: '○' },
    { label: 'Payment & payouts', icon: '○' },
    { label: 'DRAPED guarantee',  icon: '○' },
    { label: 'Help & support',    icon: '○' },
  ];
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(44,36,24,0.35)',
          zIndex: 200,
        }}
      />
      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 260, background: C.parchment,
        zIndex: 201, display: 'flex', flexDirection: 'column',
        maxWidth: '390px',
      }}>
        {/* Drawer header */}
        <div style={{
          height: 52, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 20px',
          borderBottom: `0.5px solid ${C.linen}`,
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 18, fontWeight: 400, color: C.umber, letterSpacing: '0.10em',
          }}>
            MENU
          </span>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 20, color: C.stone, lineHeight: 1, padding: 0,
            fontFamily: 'inherit',
          }}>×</button>
        </div>

        {/* Profile mini */}
        <div style={{
          padding: '20px', borderBottom: `0.5px solid ${C.linen}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', background: C.umber,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 16, fontWeight: 400, color: C.parchment, flexShrink: 0,
          }}>PS</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: C.umber }}>Priya Sharma</div>
            <div style={{ fontSize: 12, color: C.stone, marginTop: 2 }}>View profile</div>
          </div>
        </div>

        {/* Menu items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {items.map((item, i) => (
            <div key={item.label}>
              <button style={{
                width: '100%', padding: '14px 20px', background: 'none',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontFamily: 'inherit',
              }}>
                <span style={{ fontSize: 14, fontWeight: 400, color: C.umber }}>
                  {item.label}
                </span>
                <span style={{ fontSize: 12, color: C.stone }}>›</span>
              </button>
              {i < items.length - 1 && (
                <div style={{ height: '0.5px', background: C.linen, margin: '0 20px' }} />
              )}
            </div>
          ))}
        </div>

        {/* Sign out */}
        <div style={{ padding: '16px 20px', borderTop: `0.5px solid ${C.linen}` }}>
          <button style={{
            width: '100%', padding: '13px', background: 'none',
            border: `0.5px solid ${C.linen}`, borderRadius: 4, cursor: 'pointer',
            fontSize: 14, fontWeight: 500, color: C.stone, fontFamily: 'inherit',
          }}>
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Screen: Profile ──────────────────────────────────────────────────────────
function ProfileScreen({ onViewGarment }) {
  const [listingTab, setListingTab] = useState('active');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visibleListings = MY_LISTINGS.filter(g => g.status === listingTab);

  return (
    <div style={{ position: 'relative' }}>
      {drawerOpen && <BurgerDrawer onClose={() => setDrawerOpen(false)} />}

      {/* ── Profile Header ── */}
      <div style={{ background: C.cream, padding: '24px 16px 20px', position: 'relative' }}>
        {/* Hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          style={{
            position: 'absolute', top: 20, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 4, display: 'flex', flexDirection: 'column', gap: 4,
          }}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 20, height: '1.5px', background: C.umber,
            }} />
          ))}
        </button>

        {/* Avatar + identity */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: C.umber,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 22, fontWeight: 400, color: C.parchment,
          }}>
            PS
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 20, fontWeight: 400, color: C.umber, marginBottom: 4,
            }}>
              Priya Sharma
            </div>
            <div style={{ fontSize: 12, color: C.stone, marginBottom: 6 }}>
              Member since March 2024
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: C.umber }}>
              ⭐ 4.9 · 28 reviews
            </div>
          </div>
        </div>

        {/* Stat pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 16 }}>
          {[['12', 'Active Listings'], ['8', 'Completed Rentals']].map(([num, label]) => (
            <div key={label} style={{
              background: C.white, border: `0.5px solid ${C.linen}`,
              borderRadius: 20, padding: '6px 16px', textAlign: 'center',
            }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: C.umber }}>
                {num} {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 16px 80px' }}>

        {/* ── Earnings ── */}
        <Section title="This month">
          <div style={{
            background: C.white, border: `0.5px solid ${C.linen}`,
            borderRadius: 12, padding: '16px 20px',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 12, color: C.stone, marginBottom: 4 }}>Earnings</div>
              <div style={{ fontSize: 12, color: C.stone, marginTop: 8 }}>
                2 rentals · 1 sale
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 28, fontWeight: 400, color: C.umber, lineHeight: 1,
              }}>
                $340
              </div>
            </div>
          </div>
        </Section>

        {/* ── My Listings ── */}
        <div>
          <div style={{
            fontSize: 11, fontWeight: 500, color: C.stone,
            textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 12,
          }}>
            My listings
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[['active','Active'], ['rented','Rented out'], ['sold','Sold']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setListingTab(val)}
                style={{
                  height: 36, padding: '0 16px', borderRadius: 20, border: 'none',
                  background: listingTab === val ? C.umber : C.cream,
                  color: listingTab === val ? C.parchment : '#4A3F2C',
                  fontSize: 13, fontWeight: 500, letterSpacing: '0.03em',
                  cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Card grid with status badge overlay */}
          {visibleListings.length === 0 ? (
            <div style={{ color: C.stone, padding: '40px 0', fontSize: 14, textAlign: 'center' }}>
              No {listingTab} listings.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {visibleListings.map(g => {
                const s = STATUS_STYLE[g.status];
                return (
                  <div key={g.id} style={{ position: 'relative' }}>
                    <GarmentCard garment={g} onTap={onViewGarment} />
                    {/* Status badge overlay */}
                    <div style={{
                      position: 'absolute', top: 8, left: 8,
                      background: s.bg, color: s.color,
                      fontSize: 11, fontWeight: 500, letterSpacing: '0.05em',
                      padding: '3px 10px', borderRadius: 20,
                      pointerEvents: 'none',
                    }}>
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({ screen, setScreen }) {
  const tabs = [
    { id: 'home',    label: 'Home',    icon: '⌂' },
    { id: 'browse',  label: 'Browse',  icon: '⊞' },
    { id: 'sell',    label: 'Sell',    icon: '+' },
    { id: 'profile', label: 'Profile', icon: '◯' },
  ];
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 390, height: 64,
      background: C.parchment, borderTop: `0.5px solid ${C.linen}`,
      display: 'flex', zIndex: 100,
    }}>
      {tabs.map(tab => {
        const active = screen === tab.id || (screen === 'detail' && tab.id === 'browse') || (screen === 'detail' && tab.id === 'browse');
        return (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id)}
            style={{
              flex: 1, background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 3, fontFamily: 'inherit',
            }}
          >
            <span style={{ fontSize: 16, color: active ? C.umber : C.stone, lineHeight: 1 }}>
              {tab.icon}
            </span>
            <span style={{
              fontSize: 11, fontWeight: active ? 500 : 400,
              color: active ? C.umber : C.stone,
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]                   = useState('home');
  const [selectedGarment, setSelectedGarment] = useState(null);

  function handleViewGarment(garment) {
    setSelectedGarment(garment);
    setScreen('detail');
  }

  function handleNav(id) {
    setSelectedGarment(null);
    setScreen(id);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400&family=Inter:wght@400;500&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { background: #D6D1C8; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif; }
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input:focus, select:focus { border-color: #2C2418 !important; outline: none; }
        button { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif; }
      `}</style>
      <div style={{
        maxWidth: 390, margin: '0 auto', background: C.parchment,
        minHeight: '100vh', position: 'relative', overflowX: 'hidden',
      }}>
        <div style={{ paddingBottom: 64, overflowY: 'auto', minHeight: '100vh' }}>
          {screen === 'home'    && <HomeScreen onViewGarment={handleViewGarment} />}
          {screen === 'browse'  && <BrowseScreen onViewGarment={handleViewGarment} />}
          {screen === 'sell'    && <ListGarmentScreen />}
          {screen === 'profile' && <ProfileScreen onViewGarment={handleViewGarment} />}
          {screen === 'detail'  && selectedGarment && (
            <GarmentDetail garment={selectedGarment} onBack={() => handleNav('browse')} />
          )}
        </div>
        <BottomNav screen={screen} setScreen={handleNav} />
      </div>
    </>
  );
}
