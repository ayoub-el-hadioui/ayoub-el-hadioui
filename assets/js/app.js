/* Profile configuration */
const PROFILE = {
  name: "Ayoub El Hadioui",
  title: "Network & Security Engineer",
  location: "Morocco",
  email: "ayoub.hadioui02@gmail.com",
  phone: "+212 766 40 41 77",
  github: "ayoub-el-hadioui",
  linkedin: "el-hadioui-ayoub",
};

/* Terminal log animation (general Net/Sec) */
const LOG_LINES = [
  "[WAN] FortiGate SD-WAN: SLA checks (latency/jitter/loss) — ISP1/ISP2 healthy.",
  "[VPN] Site-to-Site IPsec tunnel up (Cisco ↔ FortiGate).",
  "[FW] Cisco IOS ZBF policy applied: interzone ACL updates pushed.",
  "[LAN] VLAN/DHCP/DNS services validated for campus segment.",
  "[Cloud] AWS VPC route table updated; security groups synced.",
  "[SecOps] Graylog alert reviewed; case linked in TheHive (triage complete).",
];

function typeLines(el, lines, speed=28){
  let i=0, j=0;
  function tick(){
    if(i >= lines.length){ return; }
    const line = lines[i];
    if(j === 0){
      const row = document.createElement('div');
      row.className = 'line';
      row.innerHTML = `<span class="prompt">$</span><span class="text"></span><span class="cursor"></span>`;
      el.appendChild(row);
    }
    const current = el.lastElementChild.querySelector('.text');
    current.textContent = line.slice(0, j+1);
    j++;
    if(j >= line.length){
      i++; j=0;
      setTimeout(tick, 500);
    }else{
      setTimeout(tick, speed);
    }
  }
  tick();
}

/* Render GitHub repos */
async function loadRepos(){
  const grid = document.getElementById('repo-grid');
  if(!grid) return;
  try{
    const res = await fetch(`https://api.github.com/users/${PROFILE.github}/repos?sort=updated&per_page=6`);
    if(!res.ok) throw new Error('GitHub API error');
    const repos = await res.json();
    grid.innerHTML = '';
    repos.forEach(r => {
      const card = document.createElement('a');
      card.className = 'repo';
      card.href = r.html_url;
      card.target = '_blank';
      card.rel = 'noopener';
      card.innerHTML = `
        <div class="name">${r.name}</div>
        <div class="desc">${r.description ?? ''}</div>
        <div class="meta">
          <span>★ ${r.stargazers_count}</span>
          <span>⬚ ${r.language ?? '—'}</span>
          <span>⟳ ${new Date(r.updated_at).toLocaleDateString()}</span>
        </div>`;
      grid.appendChild(card);
    });
  }catch(e){
    // leave defaults
  }
}

/* Language toggle (EN/FR headings + small strings only) */
const STRINGS = {
  en: {
    nav_about: "About",
    nav_skills: "Skills",
    nav_experience: "Experience",
    nav_projects: "Projects",
    nav_certs: "Certifications",
    nav_contact: "Contact",
    hero_title: "Network & Security Portfolio",
    hero_sub: "Enterprise networking (routing, VPN/SD‑WAN, firewalls) and security operations.",
    btn_cv: "Download CV (PDF)",
    btn_vcf: "Save Contact (vCard)",
    skills_title: "Skills",
    experience_title: "Experience",
    projects_title: "Projects",
    certs_title: "Certifications",
    contact_title: "Contact",
  },
  fr: {
    nav_about: "À propos",
    nav_skills: "Compétences",
    nav_experience: "Expérience",
    nav_projects: "Projets",
    nav_certs: "Certifications",
    nav_contact: "Contact",
    hero_title: "Portfolio Réseaux & Sécurité",
    hero_sub: "Réseaux d’entreprise (routage, VPN/SD‑WAN, pare‑feu) et opérations de sécurité.",
    btn_cv: "Télécharger le CV (PDF)",
    btn_vcf: "Enregistrer le contact (vCard)",
    skills_title: "Compétences",
    experience_title: "Expérience",
    projects_title: "Projets",
    certs_title: "Certifications",
    contact_title: "Contact",
  }
};

function setLang(lang){
  const s = STRINGS[lang];
  document.querySelector('[data-i18n="nav_about"]').textContent = s.nav_about;
  document.querySelector('[data-i18n="nav_skills"]').textContent = s.nav_skills;
  document.querySelector('[data-i18n="nav_experience"]').textContent = s.nav_experience;
  document.querySelector('[data-i18n="nav_projects"]').textContent = s.nav_projects;
  document.querySelector('[data-i18n="nav_certs"]').textContent = s.nav_certs;
  document.querySelector('[data-i18n="nav_contact"]').textContent = s.nav_contact;
  document.querySelector('[data-i18n="hero_title"]').textContent = s.hero_title;
  document.querySelector('[data-i18n="hero_sub"]').textContent = s.hero_sub;
  document.querySelector('[data-i18n="btn_cv"]').textContent = s.btn_cv;
  document.querySelector('[data-i18n="btn_vcf"]').textContent = s.btn_vcf;
  document.querySelector('[data-i18n="skills_title"]').textContent = s.skills_title;
  document.querySelector('[data-i18n="experience_title"]').textContent = s.experience_title;
  document.querySelector('[data-i18n="projects_title"]').textContent = s.projects_title;
  document.querySelector('[data-i18n="certs_title"]').textContent = s.certs_title;
  document.querySelector('[data-i18n="contact_title"]').textContent = s.contact_title;
  document.documentElement.lang = (lang === 'fr' ? 'fr' : 'en');
}

window.addEventListener('DOMContentLoaded', () => {
  // Set initial strings
  setLang('en');
  // Terminal
  const term = document.getElementById('term-body');
  typeLines(term, LOG_LINES);
  // Repos
  loadRepos();
  // Lang toggle
  const btn = document.getElementById('lang-toggle');
  btn.addEventListener('click', () => {
    const next = document.documentElement.lang === 'fr' ? 'en' : 'fr';
    setLang(next);
    btn.textContent = next.toUpperCase();
  });
});
