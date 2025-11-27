// CEO demo charts with dummy data
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const revData = [500,700,600,800,750,900,650];
const bookData = [5,8,6,9,7,12,6];
const dept = ['PlayPlanet','Spa','Cinema','Lounge'];
const deptVals = [1200,900,1500,700];

new Chart(document.getElementById('rev-chart'),{ type:'line', data:{ labels:days, datasets:[{ label:'Revenue', data:revData, borderColor:'rgba(99,102,241,1)', backgroundColor:'rgba(99,102,241,0.2)' }] }, options:{ responsive:true } });

new Chart(document.getElementById('book-chart'),{ type:'bar', data:{ labels:days, datasets:[{ label:'Bookings', data:bookData, backgroundColor:'rgba(79,70,229,0.8)' }] }, options:{ responsive:true } });

new Chart(document.getElementById('dept-chart'),{ type:'doughnut', data:{ labels:dept, datasets:[{ data:deptVals, backgroundColor:['#6366f1','#fb7185','#34d399','#f59e0b'] }] }, options:{ responsive:true } });
