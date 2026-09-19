(() => {
  const base = window.PORTFOLIO_DATA;
  let data = base;
  try { const saved = localStorage.getItem('ms_portfolio_data'); if(saved) data = JSON.parse(saved); } catch(e) {}
  let lang = localStorage.getItem('ms_portfolio_lang') || 'el';
  const t = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? (v[lang] ?? v.en ?? v.el ?? '') : (v ?? ''));
  const esc = (s='') => String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const pick = (el,en)=>lang==='el'?el:en;

  const labels = {
    el:{about:'Σχετικά',experience:'Εμπειρία',community:'Δράσεις',education:'Σπουδές',publications:'Δημοσιεύσεις',projects:'Έργα',teaching:'Διδασκαλία',certifications:'Πιστοποιήσεις',skills:'Δεξιότητες',websites:'Ιστοσελίδες',contact:'Επικοινωνία',viewWork:'Δες τα έργα',email:'Email',introExperience:'Έρευνα, τεχνική υποστήριξη και ανάπτυξη ψηφιακών υποδομών.',introCommunity:'Εθελοντική, οργανωτική και εκπαιδευτική δραστηριότητα.',introProjects:'Επιλεγμένες εφαρμογές και τεχνολογικές υλοποιήσεις.',introPubs:'Επιστημονική δραστηριότητα σε XR, Digital Twins, Education, CPR και Mobile Technologies.',introEducation:'Ακαδημαϊκή πορεία και βασικοί άξονες σπουδών.',introCerts:'Πιστοποιήσεις και εξειδικευμένη εκπαίδευση.',introSkills:'Τεχνολογίες, εργαλεία και πεδία ενδιαφέροντος.',introWeb:'Επιλεγμένες ιστοσελίδες που έχω υποστηρίξει ή διαχειριστεί.',contactTitle:'Ας συνδεθούμε',contactText:'Για ακαδημαϊκές, ερευνητικές ή τεχνολογικές συνεργασίες, μπορείς να επικοινωνήσεις μαζί μου μέσω email ή LinkedIn.',managed:'Το περιεχόμενο αυτής της σελίδας είναι data-driven και μπορεί να ενημερώνεται από το Content Manager.'},
    en:{about:'About',experience:'Experience',community:'Activities',education:'Education',publications:'Publications',projects:'Projects',teaching:'Teaching',certifications:'Certifications',skills:'Skills',websites:'Websites',contact:'Contact',viewWork:'View projects',email:'Email',introExperience:'Research, technical support and development of digital infrastructure.',introCommunity:'Volunteer, organizational and educational activity.',introProjects:'Selected applications and technology projects.',introPubs:'Scientific work across XR, Digital Twins, Education, CPR and Mobile Technologies.',introEducation:'Academic path and key study areas.',introCerts:'Certifications and specialized training.',introSkills:'Technologies, tools and areas of interest.',introWeb:'Selected websites I have supported or managed.',contactTitle:"Let's connect",contactText:'For academic, research or technology collaborations, you can reach me by email or LinkedIn.',managed:'This page is data-driven and can be updated through the Content Manager.'}
  };
  const L=()=>labels[lang];

  function card(item){
    const bullets = (item.bullets ? t(item.bullets) : []) || [];
    return `<article class="card">
      <div class="card-meta"><span>${esc(item.org||item.issuer||item.subtitle||'')}</span><span>${esc(t(item.period||item.date)||'')}</span></div>
      <h3>${esc(t(item.title)||item.name||'')}</h3>
      ${item.place?`<p>${esc(t(item.place))}</p>`:''}
      ${item.description?`<p>${esc(t(item.description))}</p>`:''}
      ${bullets.length?`<ul>${bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
      ${item.tags?.length?`<div class="chips">${item.tags.map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div>`:''}
      ${item.url?`<a class="link-arrow" href="${esc(item.url)}" target="_blank" rel="noopener">${esc(item.name||item.url)}</a>`:''}
    </article>`;
  }
  function section(id,title,intro,content,klass='grid'){
    return `<section class="section" id="${id}"><div class="section-head"><div><div class="section-kicker">Portfolio</div><h2>${title}</h2></div><p class="section-intro">${intro}</p></div>${content?`<div class="${klass}">${content}</div>`:`<div class="empty">—</div>`}</section>`;
  }

  function render(){
    document.documentElement.lang=lang; document.getElementById('langToggle').textContent=lang==='el'?'EN':'EL';
    const navItems=[['experience',L().experience],['publications',L().publications],['projects',L().projects],['education',L().education],['certifications',L().certifications],['contact',L().contact]];
    document.getElementById('nav').innerHTML=navItems.map(([id,n])=>`<a href="#${id}">${n}</a>`).join('');
    let html=`<section class="hero" id="home"><div><span class="eyebrow">${esc(t(data.profile.availability))}</span><h1 class="gradient-text">${esc(data.profile.name)}</h1><div class="hero-role">${esc(t(data.profile.role))}</div><p class="hero-copy">${esc(t(data.profile.about))}</p><div class="hero-actions"><a class="primary-btn" href="#projects">${L().viewWork}</a><a class="secondary-btn" href="mailto:${esc(data.profile.email)}">${L().email}</a>${data.profile.linkedin?`<a class="secondary-btn" href="${esc(data.profile.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>`:''}</div></div><aside class="hero-aside">${(data.stats||[]).map(s=>`<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(t(s.label))}</span></div>`).join('')}</aside></section>`;
    html+=section('experience',L().experience,L().introExperience,(data.experience||[]).map(card).join(''),'timeline');
    html+=section('community',L().community,L().introCommunity,(data.community||[]).map(card).join(''),'grid');
    html+=section('publications',L().publications,L().introPubs,(data.publications||[]).map((p,i)=>`<article class="card"><div class="pub-number">0${i+1}</div><h3>${esc(p.title)}</h3><p>${esc(p.venue)}</p></article>`).join(''),'grid');
    html+=section('projects',L().projects,L().introProjects,(data.projects||[]).map(card).join(''),'grid');
    html+=section('education',L().education,L().introEducation,(data.education||[]).map(card).join(''),'grid');
    html+=section('teaching',L().teaching,'',(data.teaching||[]).map(card).join(''),'grid');
    html+=section('certifications',L().certifications,L().introCerts,(data.certifications||[]).map(card).join(''),'grid three');
    html+=section('skills',L().skills,L().introSkills,`<div class="skills-wrap">${(data.skills||[]).map(x=>`<span class="skill-pill">${esc(x)}</span>`).join('')}</div>`,'');
    html+=section('websites',L().websites,L().introWeb,(data.websites||[]).map(card).join(''),'grid');
    (data.customSections||[]).forEach((s,idx)=>{ html+=section('custom-'+idx,esc(t(s.title)||'Section'),esc(t(s.intro)||''),(s.items||[]).map(card).join(''),'grid'); });
    html+=`<section class="section" id="contact"><div class="contact-card"><div><div class="section-kicker">Contact</div><h2>${L().contactTitle}</h2><p>${L().contactText}</p><p><small>${L().managed}</small></p></div><div class="contact-links"><a href="mailto:${esc(data.profile.email)}">${esc(data.profile.email)}</a>${data.profile.linkedin?`<a href="${esc(data.profile.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>`:''}</div></div></section>`;
    document.getElementById('app').innerHTML=html;
    document.getElementById('footerRole').textContent=' — '+t(data.profile.role);
    const fm=document.getElementById('footerMail');fm.textContent=data.profile.email;fm.href='mailto:'+data.profile.email;
    document.getElementById('footerYear').textContent=new Date().getFullYear();
  }
  document.getElementById('langToggle').addEventListener('click',()=>{lang=lang==='el'?'en':'el';localStorage.setItem('ms_portfolio_lang',lang);render();});
  render();
})();
