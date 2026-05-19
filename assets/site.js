(function(){
  const input=document.querySelector('[data-filter-input]');
  const cards=Array.from(document.querySelectorAll('[data-filter-card]'));
  const buttons=Array.from(document.querySelectorAll('[data-filter-value]'));
  const links=Array.from(document.querySelectorAll('.toc a'));
  let mode='all';
  function apply(){const q=(input?.value||'').trim().toLowerCase();cards.forEach(card=>{const text=card.textContent.toLowerCase();const tags=(card.getAttribute('data-tags')||'').toLowerCase();const modeOk=mode==='all'||tags.includes(mode);const searchOk=!q||text.includes(q)||tags.includes(q);card.hidden=!(modeOk&&searchOk);});}
  input?.addEventListener('input',apply);
  buttons.forEach(button=>button.addEventListener('click',()=>{mode=button.getAttribute('data-filter-value')||'all';buttons.forEach(b=>b.classList.toggle('primary',b===button));apply();}));
  document.querySelectorAll('[data-copy-target]').forEach(button=>button.addEventListener('click',async()=>{const target=document.getElementById(button.getAttribute('data-copy-target'));if(!target)return;const original=button.textContent;try{await navigator.clipboard.writeText(target.textContent.trim());button.textContent='Copied';setTimeout(()=>button.textContent=original,1200);}catch(e){button.textContent='Select text';setTimeout(()=>button.textContent=original,1500);}}));
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));});},{rootMargin:'-35% 0px -55% 0px',threshold:0});
  document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
})();
