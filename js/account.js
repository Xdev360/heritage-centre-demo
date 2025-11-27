// Account demo (no backend)
function getDemo(){ return JSON.parse(localStorage.getItem('hc_demo')||'{}'); }
function saveDemo(d){ localStorage.setItem('hc_demo', JSON.stringify(d)); }

function renderProfile(){ const d=getDemo(); const user = JSON.parse(localStorage.getItem('hc_user')||'null'); const profile=document.getElementById('profile'); const points=document.getElementById('points'); const history=document.getElementById('history'); if(!user){ profile.textContent='Not logged in'; points.textContent=''; history.textContent=''; return; } profile.innerHTML = `<strong>${user.name}</strong><div class="text-sm text-gray-600">${user.email}</div>`; points.textContent = 'Reward points: '+(user.points||0); const bookings = d.bookings || []; history.innerHTML = '<div class="font-semibold">Booking History</div>' + (bookings.length? bookings.map(b=>`<div class="text-sm">${b.dept||'N/A'} - ${b.service||b.seats||b.event||''} • ${b.time||''}</div>`).join('') : '<div class="text-sm">No bookings</div>'); }

document.getElementById('signup').addEventListener('click',()=>{ const email=document.getElementById('email').value; const name=document.getElementById('name').value||'Guest'; if(!email) return alert('Enter email'); const d=getDemo(); d.users = d.users || []; let u = d.users.find(x=>x.email===email); if(!u){ u = { id: Date.now(), name, email, points: 100 }; d.users.push(u); } localStorage.setItem('hc_user', JSON.stringify(u)); saveDemo(d); document.getElementById('login-res').textContent='Logged in as '+u.email; renderProfile(); });

renderProfile();
