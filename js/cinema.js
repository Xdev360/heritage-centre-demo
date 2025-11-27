// Cinema demo
const seats = Array.from({length:40}).map((_,i)=>({ id: 'S'+(i+1), taken:false }));
let selected=[];
const board=document.getElementById('seat-board');
seats.forEach(s=>{ const b=document.createElement('button'); b.className='p-3 border rounded bg-gray-100'; b.textContent=s.id; b.dataset.id=s.id; b.addEventListener('click',()=>{ if(selected.includes(s.id)){ selected=selected.filter(x=>x!==s.id); b.classList.remove('bg-indigo-500','text-white'); b.classList.add('bg-gray-100'); } else { selected.push(s.id); b.classList.add('bg-indigo-500','text-white'); } document.getElementById('selected-seats').textContent = selected.length? selected.join(', '): 'None'; }); board.appendChild(b); });

document.getElementById('checkout').addEventListener('click',()=>{
  if(!selected.length) return alert('Select seats'); const d=JSON.parse(localStorage.getItem('hc_demo')||'{}'); d.bookings = d.bookings||[]; const booking={ id:'C-'+Date.now(), dept:'cinema', seats:selected.slice(), time: new Date().toISOString() }; d.bookings.push(booking); localStorage.setItem('hc_demo', JSON.stringify(d)); document.getElementById('mini-cart').innerHTML = `<div class="p-3 border rounded">Seats: ${selected.join(', ')}<div class="mt-2"><button id="show-qr" class="bg-indigo-600 text-white px-3 py-1 rounded">Show QR</button></div></div>`; document.getElementById('show-qr').addEventListener('click',()=>{ const el=document.getElementById('qr-canvas'); el.innerHTML=''; const c=document.createElement('canvas'); c.width=200; c.height=200; const ctx=c.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,200,200); ctx.fillStyle='#000'; ctx.font='14px monospace'; ctx.fillText('CINEMA:'+booking.id,20,100); el.appendChild(c); document.getElementById('qr-modal').classList.remove('hidden'); }); });

document.getElementById('close-qr').addEventListener('click',()=>{ document.getElementById('qr-modal').classList.add('hidden'); });
