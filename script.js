// ===== NAVBAR =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// ===== LEAD FORMS =====
function initLeadForm(formId, successId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    const s = document.getElementById(successId);
    if (s) s.style.display = 'block';
    setTimeout(() => { form.reset(); form.style.display = 'block'; if (s) s.style.display = 'none'; }, 6000);
  });
}
initLeadForm('lead-form-main', 'success-main');
initLeadForm('lead-form-product', 'success-product');

// ===== FAQ =====
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
});

// ===== LICENSE PLATE LOOKUP =====
const COMPANIES = {
  phoenix: {
    name: 'הפניקס ביטוח',
    icon: '🦅',
    color: '#C0392B',
    phone: '03-7333333',
    links: {
      change:  'https://www.hphnx.co.il/digital/car',
      renew:   'https://www.hphnx.co.il/digital/car/renew',
      manage:  'https://www.hphnx.co.il/digital/car',
    },
    roadside: { name: 'שגריר', phone: '*5555' }
  },
  migdal: {
    name: 'מגדל ביטוח',
    icon: '🏰',
    color: '#2980B9',
    phone: '03-9494747',
    links: {
      change:  'https://www.migdal.co.il/insurance/car/',
      renew:   'https://www.migdal.co.il/insurance/car/',
      manage:  'https://www.migdal.co.il/insurance/car/',
    },
    roadside: { name: 'שגריר', phone: '*5555' }
  },
  harel: {
    name: 'הראל ביטוח',
    icon: '🦁',
    color: '#8E44AD',
    phone: '03-7540000',
    links: {
      change:  'https://www.harel-ins.co.il/car',
      renew:   'https://www.harel-ins.co.il/car',
      manage:  'https://www.harel-ins.co.il/car',
    },
    roadside: { name: 'שגריר', phone: '*5555' }
  },
  clal: {
    name: 'כלל ביטוח',
    icon: '⭐',
    color: '#D4A017',
    phone: '03-6387777',
    links: {
      change:  'https://www.clalbit.co.il/car-insurance/',
      renew:   'https://www.clalbit.co.il/car-insurance/',
      manage:  'https://www.clalbit.co.il/car-insurance/',
    },
    roadside: { name: 'ביטוח ישיר', phone: '*6262' }
  },
  menora: {
    name: 'מנורה מבטחים',
    icon: '🕯️',
    color: '#16A085',
    phone: '03-5350777',
    links: {
      change:  'https://www.menora.co.il/car',
      renew:   'https://www.menora.co.il/car',
      manage:  'https://www.menora.co.il/car',
    },
    roadside: { name: 'רכב בע"מ', phone: '*4411' }
  },
  ayalon: {
    name: 'איילון ביטוח',
    icon: '🦌',
    color: '#27AE60',
    phone: '03-5100777',
    links: {
      change:  'https://www.ayalon.co.il/car-insurance',
      renew:   'https://www.ayalon.co.il/car-insurance',
      manage:  'https://www.ayalon.co.il/car-insurance',
    },
    roadside: { name: 'שגריר', phone: '*5555' }
  },
  shirbit: {
    name: 'שירביט ביטוח',
    icon: '🛡️',
    color: '#E67E22',
    phone: '03-5558000',
    links: {
      change:  'https://www.shirbit.co.il/car',
      renew:   'https://www.shirbit.co.il/car',
      manage:  'https://www.shirbit.co.il/car',
    },
    roadside: { name: 'שגריר', phone: '*5555' }
  },
  direct: {
    name: 'ביטוח ישיר',
    icon: '🔷',
    color: '#2E86C1',
    phone: '*6262',
    links: {
      change:  'https://www.direct.co.il/car',
      renew:   'https://www.direct.co.il/car',
      manage:  'https://www.direct.co.il/car',
    },
    roadside: { name: 'ביטוח ישיר', phone: '*6262' }
  }
};

const PLATE_DB = {
  '1234567': { companyKey: 'phoenix', policyNum: 'POL-2024-88754', type: 'מקיף', expiry: '15/03/2025' },
  '7890123': { companyKey: 'migdal',  policyNum: 'POL-2024-33210', type: 'מקיף', expiry: '01/07/2025' },
  '4561237': { companyKey: 'harel',   policyNum: 'POL-2024-77631', type: 'מקיף + חובה', expiry: '22/11/2024' },
  '9876543': { companyKey: 'clal',    policyNum: 'POL-2024-55892', type: 'מקיף', expiry: '08/09/2025' },
  '1112223': { companyKey: 'menora',  policyNum: 'POL-2024-91234', type: 'חובה בלבד', expiry: '14/04/2025' },
  '5554443': { companyKey: 'ayalon',  policyNum: 'POL-2024-66123', type: 'מקיף', expiry: '30/06/2025' },
  '3334445': { companyKey: 'shirbit', policyNum: 'POL-2024-12398', type: 'מקיף + חובה', expiry: '11/12/2024' },
  '2223334': { companyKey: 'direct',  policyNum: 'POL-2024-44567', type: 'מקיף', expiry: '19/05/2025' },
};

function lookupPlate() {
  const input  = document.getElementById('license-input');
  const result = document.getElementById('result-card');
  const errMsg = document.getElementById('error-msg');
  if (!input) return;

  const raw   = input.value.trim().replace(/[^0-9]/g, '');
  result.classList.remove('show');
  errMsg.classList.remove('show');

  if (raw.length < 5 || raw.length > 8) {
    errMsg.textContent = 'אנא הכנס מספר רישוי תקין (5–8 ספרות)';
    errMsg.classList.add('show');
    return;
  }

  let entry = PLATE_DB[raw];
  if (!entry) {
    const keys = Object.keys(PLATE_DB);
    entry = { ...PLATE_DB[keys[Math.floor(Math.random() * keys.length)]] };
    entry.policyNum = 'POL-DEMO-' + (Math.floor(Math.random() * 90000) + 10000);
  }

  const co = COMPANIES[entry.companyKey];

  document.getElementById('res-icon').textContent   = co.icon;
  document.getElementById('res-company').textContent = co.name;
  document.getElementById('res-type').textContent    = 'ביטוח רכב – ' + entry.type;
  document.getElementById('res-plate').textContent   = raw;
  document.getElementById('res-policy').textContent  = entry.policyNum;
  document.getElementById('res-expiry').textContent  = entry.expiry;

  // phone link
  const ph = document.getElementById('res-phone');
  ph.innerHTML = `<a href="tel:${co.phone}">${co.phone}</a>`;

  // action buttons
  document.getElementById('link-change').href = co.links.change;
  document.getElementById('link-renew').href  = co.links.renew;
  document.getElementById('link-manage').href = co.links.manage;

  // roadside
  const rd = document.getElementById('roadside-info');
  if (co.roadside) {
    rd.innerHTML = `🚗 <strong>שירותי דרך:</strong> ${co.roadside.name} – <a href="tel:${co.roadside.phone}">${co.roadside.phone}</a>`;
    rd.parentElement.style.display = 'flex';
  } else {
    rd.parentElement.style.display = 'none';
  }

  result.classList.add('show');
}

const searchBtn = document.getElementById('search-btn');
if (searchBtn) searchBtn.addEventListener('click', lookupPlate);

const licenseInput = document.getElementById('license-input');
if (licenseInput) licenseInput.addEventListener('keyup', e => { if (e.key === 'Enter') lookupPlate(); });

const demoHint = document.getElementById('demo-hint');
if (demoHint) demoHint.addEventListener('click', e => {
  e.preventDefault();
  const keys = Object.keys(PLATE_DB);
  licenseInput.value = keys[Math.floor(Math.random() * keys.length)];
  lookupPlate();
});
