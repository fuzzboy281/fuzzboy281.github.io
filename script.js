/* ============ DONNÉES DU MENU ============ */
const MENU = [
  {cat:'Poulet', items:[
    {id:'p1', n:'Poulet entier rôti', d:'Poulet fermier mariné aux épices maison, servi avec frites et sauce.', p:6500, e:'🍗', tag:'Best-seller'},
    {id:'p2', n:'Demi poulet', d:'Un demi poulet rôti, frites et sauce au choix.', p:3800, e:'🍗'},
    {id:'p3', n:'Quart de poulet', d:'Cuisse ou blanc, avec frites et salade.', p:2200, e:'🍗'},
    {id:'p4', n:'Poulet yassa', d:'Poulet grillé, oignons confits au citron, riz blanc.', p:3500, e:'🍛'},
    {id:'p5', n:'Bucket famille (2 poulets)', d:'Deux poulets, grande frite, 4 sauces, 4 boissons.', p:15000, e:'🪣', tag:'À partager'},
  ]},
  {cat:'Poulet pané', items:[
    {id:'c1', n:'Tenders x5', d:'Filets de poulet panés croustillants, sauce au choix.', p:3000, e:'🍤'},
    {id:'c2', n:'Tenders x10', d:'Dix filets panés, deux sauces, frites.', p:5500, e:'🍤', tag:'Best-seller'},
    {id:'c3', n:'Nuggets x9', d:'Neuf nuggets dorés, idéal pour les enfants.', p:2000, e:'🍟'},
    {id:'c4', n:'Poulet pané épicé', d:'Cuisse panée façon Master, panure pimentée.', p:2800, e:'🔥', tag:'Épicé', spicy:true},
    {id:'c5', n:'Box Crispy', d:'5 tenders, 6 nuggets, 4 wings, frites XL, 3 sauces.', p:9500, e:'📦', tag:'À partager'},
  ]},
  {cat:'Burgers', items:[
    {id:'b1', n:'Master Burger', d:'Poulet pané, cheddar, salade, tomate, sauce Master.', p:3500, e:'🍔', tag:'Best-seller'},
    {id:'b2', n:'Double Master', d:'Deux filets panés, double cheddar, oignons croustillants.', p:4800, e:'🍔'},
    {id:'b3', n:'Spicy Chicken', d:'Poulet croustillant pimenté, jalapeños, sauce piquante.', p:3800, e:'🌶️', tag:'Épicé', spicy:true},
    {id:'b4', n:'Chicken Bacon', d:'Poulet grillé, bacon de dinde, cheddar, sauce BBQ.', p:4200, e:'🥓'},
    {id:'b5', n:'Menu burger', d:'Un burger au choix + frites + boisson 33cl.', p:5000, e:'🍟'},
  ]},
  {cat:'Wings', items:[
    {id:'w1', n:'Wings x6', d:'Six ailes croustillantes, sauce au choix.', p:2500, e:'🍗'},
    {id:'w2', n:'Wings x12', d:'Douze ailes, deux sauces.', p:4500, e:'🍗', tag:'Best-seller'},
    {id:'w3', n:'Wings BBQ x12', d:'Douze ailes laquées à la sauce barbecue fumée.', p:4800, e:'🔥'},
    {id:'w4', n:'Wings Hot Master x12', d:'Douze ailes très piquantes, pour les courageux.', p:4800, e:'🌶️', tag:'Épicé', spicy:true},
    {id:'w5', n:'Wings x24 party', d:'Vingt-quatre ailes, trois sauces, frites XL.', p:9000, e:'🎉', tag:'À partager'},
  ]},
  {cat:'Accompagnements', items:[
    {id:'a1', n:'Frites', d:'Portion généreuse de frites maison.', p:1000, e:'🍟'},
    {id:'a2', n:'Frites XL', d:'Pour deux ou trois personnes.', p:1800, e:'🍟'},
    {id:'a3', n:'Salade fraîcheur', d:'Salade, tomate, concombre, maïs.', p:1200, e:'🥗'},
    {id:'a4', n:'Sauce supplémentaire', d:'Master, BBQ, moutarde miel, piquante, mayo.', p:300, e:'🥫'},
  ]},
  {cat:'Boissons', items:[
    {id:'d1', n:'Soda 33cl', d:'Coca-Cola, Fanta, Sprite.', p:700, e:'🥤'},
    {id:'d2', n:'Soda 1L', d:'Coca-Cola, Fanta, Sprite.', p:1500, e:'🥤'},
    {id:'d3', n:'Eau minérale 50cl', d:'Kirène.', p:500, e:'💧'},
    {id:'d4', n:'Bissap maison', d:'Jus de bissap frais, 50cl.', p:1000, e:'🧃'},
    {id:'d5', n:'Bouye maison', d:'Jus de bouye onctueux, 50cl.', p:1000, e:'🧃'},
    {id:'d6', n:'Jus de gingembre', d:'Fait maison, bien relevé, 50cl.', p:1000, e:'🧃'},
  ]},
  {cat:'Glaces', items:[
    {id:'g1', n:'Glace 1 boule', d:'Vanille, chocolat, fraise, mangue ou bissap.', p:1000, e:'🍦'},
    {id:'g2', n:'Glace 2 boules', d:'Deux parfums au choix.', p:1800, e:'🍨'},
    {id:'g3', n:'Sundae Master', d:'Vanille, sauce chocolat chaude, éclats de cacahuètes.', p:2200, e:'🍨', tag:'Nouveau'},
    {id:'g4', n:'Milkshake', d:'Vanille, chocolat ou fraise, 40cl.', p:2500, e:'🥤'},
  ]},
];
const ALL = MENU.flatMap(c=>c.items.map(i=>({...i,cat:c.cat})));
const FRAIS = 1000, FRANCO = 15000;
const fmt = n => n.toLocaleString('fr-FR') + ' FCFA';

/* ============ STOCKAGE (démo : localStorage) ============ */
const store = {
  get(k, d){ try{ const v = localStorage.getItem('cm_'+k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem('cm_'+k, JSON.stringify(v)); }catch(e){} },
};
let cart = store.get('cart', {});
let users = store.get('users', []);
let session = store.get('session', null);
let orders = store.get('orders', []);

/* ============ MENU ============ */
const tabs = document.getElementById('tabs'), grid = document.getElementById('grid');
let activeCat = MENU[0].cat;
function renderTabs(){
  tabs.innerHTML = MENU.map(c=>`<button class="tab ${c.cat===activeCat?'active':''}" data-cat="${c.cat}">${c.cat}</button>`).join('');
}
function renderGrid(){
  const cat = MENU.find(c=>c.cat===activeCat);
  grid.innerHTML = cat.items.map((it,i)=>`
    <article class="item" style="animation-delay:${i*50}ms">
      <div class="emoji">${it.e}</div>
      ${it.tag?`<span class="tag ${it.spicy?'spicy':''}">${it.tag}</span>`:''}
      <h3>${it.n}</h3>
      <p>${it.d}</p>
      <div class="row"><span class="price">${fmt(it.p)}</span><button class="add" data-add="${it.id}" aria-label="Ajouter ${it.n}">+</button></div>
    </article>`).join('');
}
tabs.addEventListener('click', e=>{ const b=e.target.closest('.tab'); if(!b) return; activeCat=b.dataset.cat; renderTabs(); renderGrid(); });
grid.addEventListener('click', e=>{ const b=e.target.closest('[data-add]'); if(!b) return; addToCart(b.dataset.add); });
renderTabs(); renderGrid();

/* ============ PANIER ============ */
const badge=document.getElementById('badge'), cartBody=document.getElementById('cartBody'), cartFoot=document.getElementById('cartFoot');
function cartCount(){ return Object.values(cart).reduce((a,b)=>a+b,0); }
function cartTotal(){ return Object.entries(cart).reduce((a,[id,q])=>a+ALL.find(i=>i.id===id).p*q,0); }
function addToCart(id){ cart[id]=(cart[id]||0)+1; saveCart(); toast(`${ALL.find(i=>i.id===id).n} ajouté au panier`); }
function saveCart(){ store.set('cart',cart); renderCart(); }
function renderCart(){
  const n=cartCount(); badge.textContent=n; badge.classList.toggle('on',n>0);
  const ids=Object.keys(cart);
  if(!ids.length){ cartBody.innerHTML=`<div class="empty"><div class="big">🍗</div><p>Votre panier est vide.<br>Ajoutez vos plats préférés depuis le menu.</p></div>`; cartFoot.style.display='none'; return; }
  cartFoot.style.display='block';
  cartBody.innerHTML=ids.map(id=>{const it=ALL.find(i=>i.id===id);return`
    <div class="cart-line"><div class="emoji">${it.e}</div>
      <div class="info"><strong>${it.n}</strong><span>${fmt(it.p)}</span></div>
      <div class="qty"><button data-q="${id}" data-d="-1" aria-label="Retirer">−</button><b>${cart[id]}</b><button data-q="${id}" data-d="1" aria-label="Ajouter">+</button></div>
    </div>`}).join('');
  document.getElementById('subTotal').textContent=fmt(cartTotal());
  document.getElementById('cartTotal').textContent=fmt(cartTotal());
}
cartBody.addEventListener('click',e=>{const b=e.target.closest('[data-q]'); if(!b) return; const id=b.dataset.q; cart[id]+=+b.dataset.d; if(cart[id]<=0) delete cart[id]; saveCart();});
renderCart();

const overlay=document.getElementById('overlay'), drawer=document.getElementById('drawer');
function openCart(){ drawer.classList.add('on'); overlay.classList.add('on'); }
function closeCart(){ drawer.classList.remove('on'); overlay.classList.remove('on'); }
document.getElementById('cartBtn').onclick=openCart;
document.getElementById('closeCart').onclick=closeCart;
overlay.onclick=closeCart;

/* ============ MODALES ============ */
function openModal(id){ document.getElementById(id).classList.add('on'); }
function closeModal(id){ document.getElementById(id).classList.remove('on'); }
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{ if(e.target===m) m.classList.remove('on'); }));
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ document.querySelectorAll('.modal.on').forEach(m=>m.classList.remove('on')); closeCart(); }});

/* ============ AUTH ============ */
const authBtn=document.getElementById('authBtn'), authMsg=document.getElementById('authMsg');
const loginForm=document.getElementById('loginForm'), signupForm=document.getElementById('signupForm');
const cleanTel = t => t.replace(/\D/g,'').replace(/^221/,'');
const validTel = t => /^7[05678]\d{7}$/.test(cleanTel(t));
const fmtTel = t => cleanTel(t).replace(/(\d{2})(\d{3})(\d{2})(\d{2})/,'$1 $2 $3 $4');
function setSession(u){ session=u?{tel:u.tel}:null; store.set('session',session); renderAuthBtn(); }
function currentUser(){ return session ? users.find(u=>u.tel===session.tel) : null; }
function renderAuthBtn(){ const u=currentUser(); authBtn.textContent = u ? `👤 ${u.prenom}` : 'Se connecter'; }
renderAuthBtn();
authBtn.onclick=()=>{ currentUser() ? openAccount() : openAuth('login'); };
document.getElementById('footAccount').onclick=e=>{e.preventDefault(); authBtn.onclick();};
function openAuth(mode){ switchAuth(mode); authMsg.className='form-msg'; openModal('authModal'); }
function switchAuth(mode){
  const login=mode==='login';
  loginForm.style.display=login?'block':'none'; signupForm.style.display=login?'none':'block';
  document.getElementById('swLogin').classList.toggle('active',login); document.getElementById('swSignup').classList.toggle('active',!login);
  document.getElementById('authTitle').textContent=login?'Se connecter':'Créer un compte';
  authMsg.className='form-msg';
}
document.getElementById('swLogin').onclick=()=>switchAuth('login');
document.getElementById('swSignup').onclick=()=>switchAuth('signup');
function msg(el,type,text){ el.className='form-msg '+type; el.textContent=text; }
function mark(input,ok){ input.closest('.field').classList.toggle('invalid',!ok); return ok; }
let afterLogin=null;

signupForm.onsubmit=e=>{
  e.preventDefault();
  const prenom=sPrenom.value.trim(), nom=sNom.value.trim(), tel=sTel.value, adr=sAdr.value.trim(), pass=sPass.value;
  let ok=true;
  ok=mark(sPrenom,prenom.length>1)&&ok; ok=mark(sTel,validTel(tel))&&ok; ok=mark(sAdr,adr.length>3)&&ok; ok=mark(sPass,pass.length>=6)&&ok;
  if(!ok) return;
  if(users.some(u=>u.tel===cleanTel(tel))) return msg(authMsg,'error','Ce numéro a déjà un compte. Connectez-vous.');
  const u={prenom,nom,tel:cleanTel(tel),adresse:adr,pass,cree:Date.now()};
  users.push(u); store.set('users',users); setSession(u);
  signupForm.reset(); closeModal('authModal'); toast(`Bienvenue ${prenom} ! Votre compte est créé.`);
  if(afterLogin){ const f=afterLogin; afterLogin=null; f(); }
};
loginForm.onsubmit=e=>{
  e.preventDefault();
  const u=users.find(x=>x.tel===cleanTel(lTel.value));
  if(!u || u.pass!==lPass.value) return msg(authMsg,'error','Numéro ou mot de passe incorrect.');
  setSession(u); loginForm.reset(); closeModal('authModal'); toast(`Content de vous revoir, ${u.prenom} !`);
  if(afterLogin){ const f=afterLogin; afterLogin=null; f(); }
};

/* ============ COMPTE ============ */
function openAccount(){
  const u=currentUser(); if(!u) return openAuth('login');
  const mine=orders.filter(o=>o.tel===u.tel).sort((a,b)=>b.date-a.date);
  accountBody.innerHTML=`
    <div class="summary">
      <div><span>Prénom</span><b>${u.prenom} ${u.nom||''}</b></div>
      <div><span>Téléphone</span><b>${fmtTel(u.tel)}</b></div>
      <div><span>Adresse</span><b style="text-align:right;max-width:60%">${u.adresse}</b></div>
    </div>
    <details style="margin-bottom:16px"><summary style="cursor:pointer;font-weight:800;color:var(--orange-d)">Modifier mes informations</summary>
      <form id="editForm" style="margin-top:12px" novalidate>
        <div class="row2"><div class="field"><label>Prénom</label><input id="ePrenom" value="${u.prenom}"></div><div class="field"><label>Nom</label><input id="eNom" value="${u.nom||''}"></div></div>
        <div class="field"><label>Adresse de livraison</label><input id="eAdr" value="${u.adresse}"></div>
        <button class="btn btn-primary btn-sm" type="submit">Enregistrer</button>
      </form></details>
    <h3 style="font-size:1.3rem;color:var(--orange-d);margin-bottom:10px">Mes commandes (${mine.length})</h3>
    ${mine.length?mine.map(orderCard).join(''):'<div class="empty" style="padding:20px"><p>Aucune commande pour l\'instant.</p></div>'}
    <button class="btn btn-dark" style="width:100%;justify-content:center;margin-top:10px" id="logoutBtn">Se déconnecter</button>`;
  openModal('accountModal');
  document.getElementById('logoutBtn').onclick=()=>{ setSession(null); closeModal('accountModal'); toast('Vous êtes déconnecté.'); };
  document.getElementById('editForm').onsubmit=e=>{ e.preventDefault(); u.prenom=ePrenom.value.trim()||u.prenom; u.nom=eNom.value.trim(); u.adresse=eAdr.value.trim()||u.adresse; store.set('users',users); renderAuthBtn(); toast('Informations enregistrées'); openAccount(); };
}
function orderCard(o){
  const st=orderStatus(o);
  return `<div class="order"><div class="top"><strong>${o.num}</strong><span class="status ${st==='Livrée'?'livre':''}">${st}</span></div>
    <ul>${o.lignes.map(l=>`<li>${l.q} × ${l.n}</li>`).join('')}</ul>
    <div class="foot"><span>${new Date(o.date).toLocaleString('fr-FR',{dateStyle:'short',timeStyle:'short'})} · ${o.mode==='livraison'?'Livraison':'À emporter'} · ${o.resto}</span><span>${fmt(o.total)}</span></div></div>`;
}
function orderStatus(o){ const m=(Date.now()-o.date)/60000; return m<5?'Reçue':m<15?'En préparation':m<40?'En route':'Livrée'; }

/* ============ COMMANDE ============ */
document.getElementById('checkoutBtn').onclick=()=>{
  if(!currentUser()){ closeCart(); afterLogin=openCheckout; openAuth('signup'); msg(authMsg,'ok','Créez un compte ou connectez-vous pour commander.'); return; }
  closeCart(); openCheckout();
};
function openCheckout(){
  const u=currentUser(); const sub=cartTotal();
  checkoutBody.innerHTML=`
    <div class="form-msg" id="coMsg"></div>
    <form id="coForm" novalidate>
      <div class="opt-grid">
        <label class="opt"><input type="radio" name="mode" value="livraison" checked>🛵 Livraison</label>
        <label class="opt"><input type="radio" name="mode" value="emporter">🏃 À emporter</label>
      </div>
      <div class="field"><label>Restaurant</label><select id="coResto"><option>Mermoz</option><option>Maristes</option></select></div>
      <div class="row2">
        <div class="field"><label>Prénom</label><input id="coPrenom" value="${u.prenom}"><span class="err">Indiquez votre prénom</span></div>
        <div class="field"><label>Téléphone</label><input id="coTel" value="${fmtTel(u.tel)}"><span class="err">Numéro invalide</span></div>
      </div>
      <div class="field" id="adrField"><label>Adresse de livraison</label><input id="coAdr" value="${u.adresse}" placeholder="Quartier, rue, repère"><span class="err">Indiquez une adresse</span></div>
      <div class="field"><label>Instructions (facultatif)</label><textarea id="coNote" rows="2" placeholder="Ex. sans oignons, sonner à la porte bleue…"></textarea></div>
      <div class="field"><label>Paiement</label></div>
      <div class="opt-grid">
        <label class="opt"><input type="radio" name="pay" value="Espèces" checked>💵 Espèces</label>
        <label class="opt"><input type="radio" name="pay" value="Wave">🌊 Wave</label>
        <label class="opt"><input type="radio" name="pay" value="Orange Money">🍊 Orange Money</label>
        <label class="opt"><input type="radio" name="pay" value="Carte">💳 Carte bancaire</label>
      </div>
      <div class="summary" id="coSum"></div>
      <button class="btn btn-primary" style="width:100%;justify-content:center;font-size:1.1rem" type="submit">Confirmer la commande</button>
    </form>`;
  const form=document.getElementById('coForm');
  function sum(){
    const liv=form.mode.value==='livraison'; document.getElementById('adrField').style.display=liv?'flex':'none';
    const frais=liv&&sub<FRANCO?FRAIS:0;
    document.getElementById('coSum').innerHTML=Object.entries(cart).map(([id,q])=>{const it=ALL.find(i=>i.id===id);return`<div><span>${q} × ${it.n}</span><span>${fmt(it.p*q)}</span></div>`}).join('')+
      `<div><span>Sous-total</span><span>${fmt(sub)}</span></div><div><span>Livraison</span><span>${liv?(frais?fmt(frais):'Offerte'):'—'}</span></div><div class="t"><span>Total</span><span>${fmt(sub+frais)}</span></div>`;
    return sub+frais;
  }
  form.addEventListener('change',sum); sum();
  form.onsubmit=e=>{
    e.preventDefault();
    const liv=form.mode.value==='livraison';
    let ok=true; ok=mark(coPrenom,coPrenom.value.trim().length>1)&&ok; ok=mark(coTel,validTel(coTel.value))&&ok; if(liv) ok=mark(coAdr,coAdr.value.trim().length>3)&&ok;
    if(!ok) return;
    const total=sum();
    const o={num:'CM-'+String(1000+orders.length+1),tel:u.tel,prenom:coPrenom.value.trim(),telLiv:cleanTel(coTel.value),mode:form.mode.value,resto:coResto.value,adresse:liv?coAdr.value.trim():'',note:coNote.value.trim(),pay:form.pay.value,
      lignes:Object.entries(cart).map(([id,q])=>({id,n:ALL.find(i=>i.id===id).n,q,p:ALL.find(i=>i.id===id).p})),total,date:Date.now()};
    orders.push(o); store.set('orders',orders); cart={}; saveCart();
    checkoutBody.innerHTML=`<div class="confirm"><div class="check">✓</div><h3>Commande confirmée !</h3>
      <p>Merci ${o.prenom}, on se met tout de suite aux fourneaux.</p><div class="num">${o.num}</div>
      <p style="color:var(--ink-2)">${liv?`Livraison à <b>${o.adresse}</b> dans 30 à 45 min.`:`À retirer au restaurant de <b>${o.resto}</b> dans 15 min.`}<br>Paiement : ${o.pay} · Total : <b>${fmt(o.total)}</b></p>
      <p style="margin-top:10px;font-size:.9rem;color:var(--ink-2)">Un SMS de confirmation sera envoyé au ${fmtTel(o.telLiv)}.</p>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap"><button class="btn btn-primary" id="seeOrders">Suivre ma commande</button><button class="btn btn-dark" data-close="checkoutModal">Fermer</button></div></div>`;
    checkoutBody.querySelector('[data-close]').onclick=()=>closeModal('checkoutModal');
    document.getElementById('seeOrders').onclick=()=>{closeModal('checkoutModal'); openAccount();};
  };
  openModal('checkoutModal');
}

/* ============ CONTACT ============ */
document.getElementById('contactForm').onsubmit=e=>{ e.preventDefault(); if(!cNom.value.trim()||!cMsg.value.trim()) return toast('Remplissez votre nom et votre message.'); e.target.reset(); toast('Message envoyé, on vous rappelle très vite !'); };

/* ============ DIVERS ============ */
const toastEl=document.getElementById('toast'); let toastT;
function toast(t){ toastEl.textContent=t; toastEl.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>toastEl.classList.remove('on'),2600); }
const links=document.getElementById('links');
document.getElementById('burgerBtn').onclick=()=>links.classList.toggle('open');
links.addEventListener('click',()=>links.classList.remove('open'));
const io=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} }),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
