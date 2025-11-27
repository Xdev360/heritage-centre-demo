// Spa demo
function getDemo(){ return JSON.parse(localStorage.getItem('hc_demo')||'{}'); }
function saveDemo(d){ localStorage.setItem('hc_demo', JSON.stringify(d)); }

const services = [ { id:1, name:'Swedish Massage', dur:'60m', price:80 }, { id:2, name:'Deep Tissue', dur:'60m', price:95 }, { id:3, name:'Facial Treatment', dur:'45m', price:65 } ];

function renderServices(){ const out=document.getElementById('service-list'); out.innerHTML=''; services.forEach(s=>{ const el=document.createElement('div'); el.className='p-3 border rounded flex justify-between items-center'; el.innerHTML=`<div><strong>${s.name}</strong><div class="text-sm text-gray-600">${s.dur} • $${s.price}</div></div><div><button class="select-svc text-indigo-600" data-id="${s.id}">Select</button></div>`; out.appendChild(el); }); }

let selected=null;
document.addEventListener('click',e=>{
  if(e.target.classList.contains('select-svc')){
    const id=parseInt(e.target.dataset.id); selected=services.find(s=>s.id===id); document.getElementById('selected-service').textContent=selected.name + ' • $'+selected.price; }
});

document.getElementById('confirm-spa').addEventListener('click',()=>{
  const dt=document.getElementById('spa-datetime').value; if(!selected || !dt){ document.getElementById('spa-result').textContent='Select service and time'; return; }
  const d=getDemo(); d.bookings = d.bookings || []; const booking={ id:'B-'+Date.now(), dept:'spa', service:selected.name, time:dt, user: d.users && d.users[0] ? d.users[0].email : 'guest' }; d.bookings.push(booking); saveDemo(d); document.getElementById('spa-result').textContent='Booked '+selected.name+' at '+dt; // show email modal
  document.getElementById('email-body').innerHTML=`An email has been sent to <strong>${booking.user}</strong><br/>Service: ${booking.service}<br/>Time: ${booking.time}`; document.getElementById('email-modal').classList.remove('hidden');
});

document.getElementById('close-email').addEventListener('click',()=>{ document.getElementById('email-modal').classList.add('hidden'); });

renderServices();
