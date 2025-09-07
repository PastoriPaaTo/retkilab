// RetkiLab – profiili (localStorage) + kenttien täyttö
(function(){
    const KEY = 'retkilab_profile_v1';
  
    function loadProfile(){
      try{ const j = localStorage.getItem(KEY); return j? JSON.parse(j) : {}; }catch(e){ return {}; }
    }
    function saveProfile(p){
      const clean = Object.fromEntries(Object.entries(p).map(([k,v])=>[k, (v===''||v==null)?'':String(v)]));
      localStorage.setItem(KEY, JSON.stringify(clean));
      return clean;
    }
    function clearProfile(){ localStorage.removeItem(KEY); }
  
    // kenttälistat – sama arvo voi esiintyä eri nimillä eri laskureissa
    const MAP = {
      weight:   ['weight','body_kg'],
      height:   ['height','height_cm'],
      age:      ['age'],
      sex:      ['sex'],
      hrRest:   ['hrRest'],
      hrMax:    ['hrMax'],
      ownFlat:  ['ownFlat','flat_speed'],
      pack:     ['pack','pack_kg','pack_now_kg']
    };
  
    function setIfExists(id, val){
      const el = document.getElementById(id);
      if(!el || val==='' || val==null) return false;
      if(el.tagName==='SELECT'){
        if([...el.options].some(o=>o.value==val)) el.value = val;
      }else{
        el.value = val;
      }
      return true;
    }
  
    // täyttää kaikki kentät, joita sivulla löytyy
    function applyProfile(){
      const p = loadProfile();
      Object.entries(MAP).forEach(([key, ids])=>{
        const val = p[key];
        if(val==null || val==='') return;
        ids.forEach(id=> setIfExists(id, val));
      });
      // pieni kulmassa näkyvä vinkki
      if(!document.getElementById('rl-prof-banner')){
        const b = document.createElement('div');
        b.id='rl-prof-banner';
        b.style.cssText='position:fixed;right:12px;bottom:12px;background:#12161b;border:1px solid #1f2937;border-radius:10px;padding:8px 10px;font-size:12px;color:#9fb0c0;';
        b.innerHTML = 'Profiili ladattu · <a href="profile.html" style="color:#4fd1c5">Muokkaa</a>';
        document.body.appendChild(b);
        setTimeout(()=>b.remove(), 4000);
      }
    }
  
    // export
    window.RetkiLab = { loadProfile, saveProfile, clearProfile, applyProfile };
    // automaattinen täyttö jos skripti ladattu laskurisivulle
    document.addEventListener('DOMContentLoaded', applyProfile);
  })();
  