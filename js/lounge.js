// Lounge & Events demo
function getDemo(){ return JSON.parse(localStorage.getItem('hc_demo')||'{}'); }
function saveDemo(d){ localStorage.setItem('hc_demo', JSON.stringify(d)); }

// Seed menu data if not exists
function seedMenuData() {
    const existingMenu = localStorage.getItem('lounge_menu');
    if (existingMenu) return; // Already seeded

    const menuData = {
        starters: [
            {
                id: 'ST001',
                name: 'Truffle Arancini',
                description: 'Crispy risotto balls stuffed with mozzarella, parmesan, and black truffle oil. Served with roasted garlic aioli.',
                price: 3500,
                category: 'starters',
                image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            },
            {
                id: 'ST002',
                name: 'Spicy Tuna Tartare',
                description: 'Fresh tuna with avocado, sesame seeds, and spicy mayo on crispy wonton chips.',
                price: 4200,
                category: 'starters',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: false
            },
            {
                id: 'ST003',
                name: 'Crispy Calamari',
                description: 'Tender squid rings lightly battered and fried golden. Served with lemon aioli and marinara.',
                price: 3800,
                category: 'starters',
                image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: false
            },
            {
                id: 'ST004',
                name: 'Caprese Skewers',
                description: 'Cherry tomatoes, fresh mozzarella, and basil drizzled with balsamic glaze.',
                price: 2900,
                category: 'starters',
                image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            },
            {
                id: 'ST005',
                name: 'Beef Carpaccio',
                description: 'Paper-thin slices of premium beef tenderloin with arugula, parmesan shavings, and truffle oil.',
                price: 5500,
                category: 'starters',
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: true
            }
        ],
        mains: [
            {
                id: 'MN001',
                name: 'Grilled Ribeye Steak',
                description: '300g premium ribeye steak grilled to perfection. Served with herb butter, roasted vegetables, and truffle mashed potatoes.',
                price: 12500,
                category: 'mains',
                image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: false
            },
            {
                id: 'MN002',
                name: 'Pan-Seared Salmon',
                description: 'Fresh Atlantic salmon with lemon butter sauce, asparagus, and jasmine rice.',
                price: 9800,
                category: 'mains',
                image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: false
            },
            {
                id: 'MN003',
                name: 'Lobster Thermidor',
                description: 'Whole lobster tail with creamy brandy sauce, cheese crust, and garlic butter vegetables.',
                price: 18500,
                category: 'mains',
                image: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: true
            },
            {
                id: 'MN004',
                name: 'Chicken Parmesan',
                description: 'Breaded chicken breast topped with marinara and melted mozzarella. Served with spaghetti.',
                price: 7500,
                category: 'mains',
                image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: false
            },
            {
                id: 'MN005',
                name: 'Mushroom Risotto',
                description: 'Creamy arborio rice with wild mushrooms, parmesan, white wine, and fresh herbs.',
                price: 6800,
                category: 'mains',
                image: 'https://images.unsplash.com/photo-1476124369491-f51d85c697e0?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            },
            {
                id: 'MN006',
                name: 'Lamb Chops',
                description: 'Herb-crusted New Zealand lamb chops with rosemary jus, grilled vegetables, and potato gratin.',
                price: 14500,
                category: 'mains',
                image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: false
            }
        ],
        drinks: [
            {
                id: 'DR001',
                name: 'Moët & Chandon Champagne',
                description: 'Premium French champagne with delicate bubbles and fruity notes.',
                price: 45000,
                category: 'drinks',
                image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: true
            },
            {
                id: 'DR002',
                name: 'Golden Sunset Cocktail',
                description: 'Signature blend of rum, passion fruit, mango, and a hint of chili. Our house special!',
                price: 3500,
                category: 'drinks',
                image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            },
            {
                id: 'DR003',
                name: 'Classic Old Fashioned',
                description: 'Premium bourbon, sugar, bitters, and orange peel. A timeless classic.',
                price: 4200,
                category: 'drinks',
                image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            },
            {
                id: 'DR004',
                name: 'Glenfiddich 18 Year Whisky',
                description: 'Smooth single malt Scotch whisky with notes of oak, fruit, and spice.',
                price: 12000,
                category: 'drinks',
                image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            },
            {
                id: 'DR005',
                name: 'Espresso Martini',
                description: 'Vodka, coffee liqueur, and fresh espresso topped with coffee beans.',
                price: 3800,
                category: 'drinks',
                image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            },
            {
                id: 'DR006',
                name: 'Fresh Mango Juice',
                description: 'Freshly squeezed Nigerian mangoes. Sweet, refreshing, and natural.',
                price: 1500,
                category: 'drinks',
                image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            },
            {
                id: 'DR007',
                name: 'Chapman Mocktail',
                description: 'Nigerian classic - Fanta, Sprite, grenadine, Angostura bitters, cucumber, and lemon.',
                price: 2000,
                category: 'drinks',
                image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            }
        ],
        desserts: [
            {
                id: 'DS001',
                name: 'Chocolate Lava Cake',
                description: 'Warm chocolate cake with a molten center. Served with vanilla ice cream and berry coulis.',
                price: 3500,
                category: 'desserts',
                image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            },
            {
                id: 'DS002',
                name: 'Tiramisu',
                description: 'Classic Italian dessert with espresso-soaked ladyfingers, mascarpone cream, and cocoa.',
                price: 3200,
                category: 'desserts',
                image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            },
            {
                id: 'DS003',
                name: 'Crème Brûlée',
                description: 'Silky vanilla custard with a caramelized sugar crust. Served with fresh berries.',
                price: 3800,
                category: 'desserts',
                image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            },
            {
                id: 'DS004',
                name: 'New York Cheesecake',
                description: 'Rich and creamy cheesecake on graham cracker crust with strawberry compote.',
                price: 3600,
                category: 'desserts',
                image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=600&h=400&fit=crop',
                vegetarian: true,
                vipOnly: false
            }
        ],
        intercontinental: [
            {
                id: 'IC001',
                name: 'Premium Jollof Rice Platter',
                description: 'Signature Nigerian jollof rice with grilled chicken, plantains, coleslaw, and spicy sauce.',
                price: 6500,
                category: 'intercontinental',
                image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: false
            },
            {
                id: 'IC002',
                name: 'Suya Platter',
                description: 'Spicy grilled beef suya skewers served with sliced onions, tomatoes, and yaji spice.',
                price: 4500,
                category: 'intercontinental',
                image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: false
            },
            {
                id: 'IC003',
                name: 'Assorted Pepper Soup',
                description: 'Traditional Nigerian pepper soup with goat meat, catfish, and assorted offal in spicy broth.',
                price: 5200,
                category: 'intercontinental',
                image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: false
            },
            {
                id: 'IC004',
                name: 'Pounded Yam & Egusi Soup',
                description: 'Smooth pounded yam served with rich egusi soup, stockfish, and assorted meats.',
                price: 7200,
                category: 'intercontinental',
                image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: false
            },
            {
                id: 'IC005',
                name: 'Gizdodo',
                description: 'Spicy stir-fried gizzard and plantain in peppered sauce. A Nigerian favorite!',
                price: 4800,
                category: 'intercontinental',
                image: 'https://images.unsplash.com/photo-1587740896339-96a76170508d?w=600&h=400&fit=crop',
                vegetarian: false,
                vipOnly: false
            }
        ]
    };

    localStorage.setItem('lounge_menu', JSON.stringify(menuData));
    console.log('✅ Lounge menu data seeded successfully!');
}

// Seed events data
function seedEventsData() {
    const existingEvents = localStorage.getItem('lounge_events');
    if (existingEvents) return;

    const eventsData = [
        {
            id: 'EV001',
            name: 'Live Jazz Night',
            description: 'Smooth jazz performances by renowned saxophonist featuring classic and contemporary pieces.',
            date: '2025-12-05',
            time: '20:00',
            category: 'Music',
            price: 8000,
            ticketsAvailable: 80,
            image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop',
            vipOnly: false
        },
        {
            id: 'EV002',
            name: 'Wine Tasting Evening',
            description: 'Exclusive wine tasting featuring premium selections from around the world, paired with gourmet appetizers.',
            date: '2025-12-12',
            time: '19:00',
            category: 'Food',
            price: 12000,
            ticketsAvailable: 40,
            image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop',
            vipOnly: false
        },
        {
            id: 'EV003',
            name: 'VIP Exclusive Gala',
            description: 'An unforgettable night of champagne, live orchestra, and five-star dining for our most distinguished guests.',
            date: '2025-12-15',
            time: '21:00',
            category: 'Exclusive Nights',
            price: 35000,
            ticketsAvailable: 25,
            image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop',
            vipOnly: true
        },
        {
            id: 'EV004',
            name: 'DJ Night - Afrobeats Edition',
            description: 'Dance the night away with the hottest Afrobeats, Amapiano, and Afro-fusion tracks.',
            date: '2025-12-19',
            time: '22:00',
            category: 'Music',
            price: 6000,
            ticketsAvailable: 120,
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop',
            vipOnly: false
        },
        {
            id: 'EV005',
            name: 'Cocktail Masterclass',
            description: 'Learn to craft signature cocktails from our expert mixologist. Includes welcome drink and recipe booklet.',
            date: '2025-12-22',
            time: '18:30',
            category: 'Food',
            price: 10000,
            ticketsAvailable: 30,
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop',
            vipOnly: false
        }
    ];

    localStorage.setItem('lounge_events', JSON.stringify(eventsData));
    console.log('✅ Lounge events data seeded successfully!');
}

// Initialize data on load
document.addEventListener('DOMContentLoaded', () => {
    seedMenuData();
    seedEventsData();
});

function renderEvents(){ const d=getDemo(); const list=document.getElementById('event-list'); const sel=document.getElementById('res-event'); list.innerHTML=''; sel.innerHTML=''; (d.events||[]).forEach(e=>{ const el=document.createElement('div'); el.className='p-3 border rounded mb-2'; el.innerHTML=`<div class="font-semibold">${e.title}</div><div class="text-sm text-gray-600">${e.date} • Seats: ${e.seats}</div>`; list.appendChild(el); const opt=document.createElement('option'); opt.value=e.id; opt.textContent=e.title+' - '+e.date; sel.appendChild(opt); }); }

const resSubmit = document.getElementById('res-submit');
if (resSubmit) {
    resSubmit.addEventListener('click',()=>{ const d=getDemo(); const eventId=parseInt(document.getElementById('res-event').value); const name=document.getElementById('res-name').value||'Guest'; const guests=parseInt(document.getElementById('res-guests').value)||1; const ev=(d.events||[]).find(x=>x.id===eventId); const res={ id:'R-'+Date.now(), event: ev? ev.title: 'Unknown', name, guests }; d.bookings = d.bookings||[]; d.bookings.push(res); saveDemo(d); document.getElementById('res-body').textContent = `Reservation for ${name} at ${res.event} — ${guests} guests.`; document.getElementById('res-modal').classList.remove('hidden'); });
}

const closeRes = document.getElementById('close-res');
if (closeRes) {
    closeRes.addEventListener('click',()=>{ document.getElementById('res-modal').classList.add('hidden'); });
}

if (typeof renderEvents === 'function' && document.getElementById('event-list')) {
    renderEvents();
}
