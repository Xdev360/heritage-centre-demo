// PlayPlanet demo logic
function getDemo() { return JSON.parse(localStorage.getItem('hc_demo')||'{}'); }
function saveDemo(d){ localStorage.setItem('hc_demo', JSON.stringify(d)); }

function renderCards(){ const d=getDemo(); const out=document.getElementById('card-list'); out.innerHTML=''; (d.cards||[]).forEach(c=>{ const el=document.createElement('div'); el.className='p-3 border rounded flex justify-between items-center'; el.innerHTML=`<div><strong>${c.id}</strong><div class="text-sm text-gray-600">Balance: $${c.balance.toFixed(2)}</div></div><div><button class="text-indigo-600 gen-qr-btn" data-id="${c.id}">QR</button></div>`; out.appendChild(el); }); }

document.getElementById('buy-card').addEventListener('click',()=>{
  const amt=parseFloat(document.getElementById('buy-amount').value)||0; const d=getDemo(); const id='CARD-'+(1000 + Math.floor(Math.random()*9000)); d.cards = d.cards||[]; d.cards.push({ id, balance: amt }); saveDemo(d); document.getElementById('buy-result').textContent=`Created ${id} with $${amt.toFixed(2)}`; renderCards(); });

document.getElementById('reload-card').addEventListener('click',()=>{
  const id=document.getElementById('reload-id').value; const amt=parseFloat(document.getElementById('reload-amount').value)||0; const d=getDemo(); const card=(d.cards||[]).find(c=>c.id===id); if(!card){ document.getElementById('reload-result').textContent='Card not found'; return; } card.balance += amt; saveDemo(d); document.getElementById('reload-result').textContent=`Reloaded ${id} +$${amt.toFixed(2)} -> $${card.balance.toFixed(2)}`; renderCards(); });

document.getElementById('gen-qr').addEventListener('click',()=>{
  const id=document.getElementById('qr-id').value; const el=document.getElementById('qr-output'); el.innerHTML=''; // generate fake QR using canvas
  const canvas=document.createElement('canvas'); canvas.width=200; canvas.height=200; const ctx=canvas.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,200,200); ctx.fillStyle='#000'; ctx.font='14px monospace'; ctx.fillText('QR:'+id,20,100); el.appendChild(canvas);
});

document.addEventListener('click',e=>{ if(e.target.classList.contains('gen-qr-btn')){ document.getElementById('qr-id').value=e.target.dataset.id; document.getElementById('gen-qr').click(); } });

renderCards();
