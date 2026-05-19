(function(){
  const input=document.querySelector('[data-filter-input]');
  const cards=Array.from(document.querySelectorAll('[data-filter-card]'));
  const buttons=Array.from(document.querySelectorAll('[data-filter-value]'));
  let mode='all';
  function apply(){const q=(input?.value||'').trim().toLowerCase();cards.forEach(card=>{const text=card.textContent.toLowerCase();const tags=(card.getAttribute('data-tags')||'').toLowerCase();const modeOk=mode==='all'||tags.includes(mode);const searchOk=!q||text.includes(q)||tags.includes(q);card.style.display=modeOk&&searchOk?'':'none';});}
  input?.addEventListener('input',apply);
  buttons.forEach(button=>button.addEventListener('click',()=>{mode=button.getAttribute('data-filter-value')||'all';buttons.forEach(b=>b.classList.toggle('primary',b===button));apply();}));
  document.querySelectorAll('[data-copy-target]').forEach(button=>button.addEventListener('click',async()=>{const target=document.getElementById(button.getAttribute('data-copy-target'));if(!target)return;try{await navigator.clipboard.writeText(target.textContent.trim());button.classList.add('copied');const old=button.textContent;button.textContent='Copied';setTimeout(()=>{button.textContent=old;button.classList.remove('copied');},1200);}catch(e){button.textContent='Select text';}}));
})();
