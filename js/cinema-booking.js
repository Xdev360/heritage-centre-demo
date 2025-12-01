// Cinema Data
const movies = [
    {
        id: 1,
        title: "Quantum Nexus",
        genre: "scifi",
        duration: "2h 18m",
        rating: "13+",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop",
        synopsis: "In a future where reality can be hacked, a rogue programmer discovers a conspiracy that threatens to collapse the fabric of existence itself.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Michael Chen", "Sarah Williams", "David Park"],
        director: "James Anderson",
        fillingFast: true,
        showtimes: [
            { date: '2025-11-27', time: '10:30', hall: 'Screen 1', format: 'standard', availability: 'low', price: 2500 },
            { date: '2025-11-27', time: '14:00', hall: 'Screen 2', format: 'vip', availability: 'medium', price: 5000 },
            { date: '2025-11-27', time: '18:30', hall: 'Screen 1', format: 'standard', availability: 'low', price: 3000 },
            { date: '2025-11-27', time: '21:00', hall: 'VIP Lounge', format: 'vip', availability: 'high', price: 6000 },
            { date: '2025-11-28', time: '11:00', hall: 'Screen 1', format: 'standard', availability: 'high', price: 2500 },
            { date: '2025-11-28', time: '15:30', hall: 'Screen 2', format: 'vip', availability: 'medium', price: 5000 },
        ]
    },
    {
        id: 2,
        title: "Midnight Laughter",
        genre: "comedy",
        duration: "1h 45m",
        rating: "PG",
        poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop",
        synopsis: "A stand-up comedian accidentally becomes the target of a mob boss after a case of mistaken identity leads to hilarious consequences.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Chris Thompson", "Emily Davis", "Marcus Johnson"],
        director: "Rachel Green",
        fillingFast: false,
        showtimes: [
            { date: '2025-11-27', time: '12:00', hall: 'Screen 3', format: 'standard', availability: 'high', price: 2500 },
            { date: '2025-11-27', time: '16:30', hall: 'Screen 1', format: 'standard', availability: 'medium', price: 3000 },
            { date: '2025-11-27', time: '19:45', hall: 'Screen 3', format: 'standard', availability: 'high', price: 3000 },
            { date: '2025-11-28', time: '13:00', hall: 'Screen 2', format: 'vip', availability: 'high', price: 5000 },
        ]
    },
    {
        id: 3,
        title: "Shadows of Lagos",
        genre: "drama",
        duration: "2h 5m",
        rating: "18+",
        poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=500&h=750&fit=crop",
        synopsis: "A gripping tale of family, betrayal, and redemption set against the vibrant backdrop of modern Lagos.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Chiwetel Okonkwo", "Adeola Adeyemi", "Femi Bankole"],
        director: "Kemi Adetiba",
        fillingFast: true,
        showtimes: [
            { date: '2025-11-27', time: '13:30', hall: 'Screen 2', format: 'standard', availability: 'low', price: 2500 },
            { date: '2025-11-27', time: '17:15', hall: 'VIP Lounge', format: 'vip', availability: 'low', price: 6000 },
            { date: '2025-11-27', time: '20:30', hall: 'Screen 2', format: 'standard', availability: 'medium', price: 3000 },
            { date: '2025-11-28', time: '14:00', hall: 'Screen 1', format: 'standard', availability: 'high', price: 2500 },
        ]
    },
    {
        id: 4,
        title: "Thunder Strike",
        genre: "action",
        duration: "2h 32m",
        rating: "13+",
        poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=750&fit=crop",
        synopsis: "An elite special forces team must race against time to prevent a devastating terrorist attack on multiple cities.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Jason Rodriguez", "Michelle Lee", "Tom Bradley"],
        director: "Michael Bay Jr.",
        fillingFast: true,
        showtimes: [
            { date: '2025-11-27', time: '11:45', hall: 'Screen 1', format: 'standard', availability: 'medium', price: 2500 },
            { date: '2025-11-27', time: '15:00', hall: 'VIP Lounge', format: 'vip', availability: 'low', price: 6000 },
            { date: '2025-11-27', time: '19:00', hall: 'Screen 1', format: 'standard', availability: 'low', price: 3000 },
            { date: '2025-11-27', time: '22:00', hall: 'Screen 2', format: 'standard', availability: 'medium', price: 3500 },
        ]
    },
    {
        id: 5,
        title: "The Haunting Hour",
        genre: "horror",
        duration: "1h 38m",
        rating: "18+",
        poster: "https://images.unsplash.com/photo-1509817067355-d77a0cd59e99?w=500&h=750&fit=crop",
        synopsis: "A family moves into their dream home, only to discover it harbors a dark presence that feeds on their deepest fears.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Amanda White", "Robert Harris", "Lily Chen"],
        director: "Jordan Peele",
        fillingFast: false,
        showtimes: [
            { date: '2025-11-27', time: '20:00', hall: 'Screen 3', format: 'standard', availability: 'high', price: 3000 },
            { date: '2025-11-27', time: '22:30', hall: 'Screen 3', format: 'standard', availability: 'high', price: 3500 },
            { date: '2025-11-28', time: '21:00', hall: 'Screen 1', format: 'standard', availability: 'medium', price: 3000 },
        ]
    },
    {
        id: 6,
        title: "Love in December",
        genre: "drama",
        duration: "1h 52m",
        rating: "PG",
        poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500&h=750&fit=crop",
        synopsis: "Two strangers meet on a train during the holiday season and embark on an unexpected journey of love and self-discovery.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Sophie Turner", "James Mitchell", "Grace Adewale"],
        director: "Nancy Meyers",
        fillingFast: false,
        showtimes: [
            { date: '2025-11-27', time: '14:30', hall: 'Screen 3', format: 'standard', availability: 'high', price: 2500 },
            { date: '2025-11-27', time: '18:00', hall: 'Screen 2', format: 'vip', availability: 'high', price: 5000 },
            { date: '2025-11-28', time: '12:30', hall: 'Screen 3', format: 'standard', availability: 'high', price: 2500 },
        ]
    },
    {
        id: 7,
        title: "Galaxy Warriors",
        genre: "scifi",
        duration: "2h 45m",
        rating: "13+",
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop",
        synopsis: "An intergalactic war reaches Earth, and a ragtag team of heroes must unite to save humanity from extinction.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Chris Evans", "Zoe Saldana", "Idris Elba"],
        director: "The Russo Brothers",
        fillingFast: true,
        showtimes: [
            { date: '2025-11-27', time: '12:30', hall: 'VIP Lounge', format: 'vip', availability: 'low', price: 6000 },
            { date: '2025-11-27', time: '17:00', hall: 'Screen 1', format: 'standard', availability: 'low', price: 3000 },
            { date: '2025-11-27', time: '21:30', hall: 'VIP Lounge', format: 'vip', availability: 'medium', price: 6500 },
        ]
    },
    {
        id: 8,
        title: "The Last Laugh",
        genre: "comedy",
        duration: "1h 58m",
        rating: "13+",
        poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=750&fit=crop",
        synopsis: "A retired comedian decides to make one final comeback tour, discovering that laughter truly is the best medicine.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Kevin Hart", "Tiffany Haddish", "Ali Wong"],
        director: "Judd Apatow",
        fillingFast: false,
        showtimes: [
            { date: '2025-11-27', time: '13:00', hall: 'Screen 3', format: 'standard', availability: 'high', price: 2500 },
            { date: '2025-11-28', time: '16:00', hall: 'Screen 2', format: 'standard', availability: 'high', price: 2500 },
        ]
    },
    {
        id: 9,
        title: "The King's Bride",
        genre: "drama",
        duration: "2h 12m",
        rating: "PG",
        poster: "https://images.unsplash.com/photo-1574267432644-f86d6314e0bf?w=500&h=750&fit=crop",
        synopsis: "A powerful Nigerian epic about love, tradition, and duty set in the ancient Benin Kingdom during its golden age.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Genevieve Nnaji", "Richard Mofe-Damijo", "Ramsey Nouah"],
        director: "Kunle Afolayan",
        fillingFast: true,
        showtimes: [
            { date: '2025-12-01', time: '11:00', hall: 'Screen 1', format: 'standard', availability: 'medium', price: 2500 },
            { date: '2025-12-01', time: '15:30', hall: 'VIP Lounge', format: 'vip', availability: 'low', price: 6000 },
            { date: '2025-12-01', time: '19:00', hall: 'Screen 2', format: 'standard', availability: 'low', price: 3000 },
            { date: '2025-12-02', time: '14:00', hall: 'Screen 1', format: 'standard', availability: 'high', price: 2500 },
        ]
    },
    {
        id: 10,
        title: "Cyber Protocol",
        genre: "action",
        duration: "2h 8m",
        rating: "18+",
        poster: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&h=750&fit=crop",
        synopsis: "A rogue AI threatens global infrastructure. A team of hackers must infiltrate the system before it's too late.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["John Boyega", "Lupita Nyong'o", "Oscar Isaac"],
        director: "Denis Villeneuve",
        fillingFast: true,
        showtimes: [
            { date: '2025-12-01', time: '12:00', hall: 'Screen 2', format: 'standard', availability: 'low', price: 2500 },
            { date: '2025-12-01', time: '16:45', hall: 'Screen 1', format: 'standard', availability: 'medium', price: 3000 },
            { date: '2025-12-01', time: '20:30', hall: 'VIP Lounge', format: 'vip', availability: 'low', price: 6500 },
            { date: '2025-12-02', time: '13:00', hall: 'Screen 2', format: 'standard', availability: 'high', price: 2500 },
        ]
    },
    {
        id: 11,
        title: "Laughter Therapy",
        genre: "comedy",
        duration: "1h 42m",
        rating: "PG",
        poster: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=750&fit=crop",
        synopsis: "A stressed executive is forced to attend a laughter therapy retreat and discovers joy in the most unexpected ways.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Basketmouth", "Bovi", "Ayo Makun"],
        director: "Desmond Elliot",
        fillingFast: false,
        showtimes: [
            { date: '2025-12-01', time: '14:00', hall: 'Screen 3', format: 'standard', availability: 'high', price: 2500 },
            { date: '2025-12-01', time: '17:30', hall: 'Screen 3', format: 'standard', availability: 'high', price: 3000 },
            { date: '2025-12-02', time: '11:30', hall: 'Screen 2', format: 'standard', availability: 'high', price: 2500 },
        ]
    },
    {
        id: 12,
        title: "Nightmare Mansion",
        genre: "horror",
        duration: "1h 55m",
        rating: "18+",
        poster: "https://images.unsplash.com/photo-1603650592365-3c2f1915e9c8?w=500&h=750&fit=crop",
        synopsis: "Five friends spend the night in an abandoned mansion and awaken a vengeful spirit that won't let them leave alive.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Lupita Nyong'o", "Daniel Kaluuya", "Letitia Wright"],
        director: "Ari Aster",
        fillingFast: false,
        showtimes: [
            { date: '2025-12-01', time: '21:00', hall: 'Screen 3', format: 'standard', availability: 'medium', price: 3000 },
            { date: '2025-12-01', time: '23:15', hall: 'Screen 1', format: 'standard', availability: 'high', price: 3500 },
            { date: '2025-12-02', time: '20:00', hall: 'Screen 3', format: 'standard', availability: 'high', price: 3000 },
        ]
    },
    {
        id: 13,
        title: "Beyond the Stars",
        genre: "scifi",
        duration: "2h 28m",
        rating: "13+",
        poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=750&fit=crop",
        synopsis: "Humanity's first interstellar voyage leads to the discovery of an ancient alien civilization and a threat to our existence.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        director: "Christopher Nolan",
        fillingFast: true,
        showtimes: [
            { date: '2025-12-01', time: '10:00', hall: 'VIP Lounge', format: 'vip', availability: 'low', price: 6000 },
            { date: '2025-12-01', time: '14:30', hall: 'Screen 1', format: 'standard', availability: 'medium', price: 3000 },
            { date: '2025-12-01', time: '18:45', hall: 'Screen 2', format: 'standard', availability: 'low', price: 3000 },
            { date: '2025-12-02', time: '12:00', hall: 'VIP Lounge', format: 'vip', availability: 'medium', price: 6000 },
        ]
    },
    {
        id: 14,
        title: "Wedding Chaos",
        genre: "comedy",
        duration: "1h 48m",
        rating: "PG",
        poster: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=750&fit=crop",
        synopsis: "Everything that can go wrong does when a couple tries to plan their dream Nigerian wedding in just two weeks.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Funke Akindele", "Alexx Ekubo", "Nancy Isime"],
        director: "Mo Abudu",
        fillingFast: false,
        showtimes: [
            { date: '2025-12-01', time: '13:15', hall: 'Screen 3', format: 'standard', availability: 'high', price: 2500 },
            { date: '2025-12-01', time: '16:00', hall: 'Screen 2', format: 'vip', availability: 'high', price: 5000 },
            { date: '2025-12-02', time: '15:00', hall: 'Screen 3', format: 'standard', availability: 'high', price: 2500 },
        ]
    },
    {
        id: 15,
        title: "Blood Diamond Legacy",
        genre: "action",
        duration: "2h 15m",
        rating: "18+",
        poster: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=500&h=750&fit=crop",
        synopsis: "A mercenary seeks revenge and redemption while protecting a priceless African artifact from international crime syndicates.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Idris Elba", "Michael B. Jordan", "Danai Gurira"],
        director: "Antoine Fuqua",
        fillingFast: true,
        showtimes: [
            { date: '2025-12-01', time: '11:30', hall: 'Screen 1', format: 'standard', availability: 'medium', price: 2500 },
            { date: '2025-12-01', time: '15:00', hall: 'Screen 2', format: 'standard', availability: 'low', price: 3000 },
            { date: '2025-12-01', time: '19:30', hall: 'VIP Lounge', format: 'vip', availability: 'low', price: 6500 },
            { date: '2025-12-02', time: '17:00', hall: 'Screen 1', format: 'standard', availability: 'medium', price: 3000 },
        ]
    },
    {
        id: 16,
        title: "Echoes of the Past",
        genre: "drama",
        duration: "2h 3m",
        rating: "13+",
        poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=750&fit=crop",
        synopsis: "A journalist uncovers family secrets spanning three generations that reshape her understanding of identity and belonging.",
        trailer: "https://youtube.com/watch?v=demo",
        cast: ["Viola Davis", "Chadwick Boseman", "Angela Bassett"],
        director: "Ava DuVernay",
        fillingFast: false,
        showtimes: [
            { date: '2025-12-01', time: '12:45', hall: 'Screen 2', format: 'standard', availability: 'high', price: 2500 },
            { date: '2025-12-01', time: '17:00', hall: 'VIP Lounge', format: 'vip', availability: 'medium', price: 5000 },
            { date: '2025-12-02', time: '13:30', hall: 'Screen 2', format: 'standard', availability: 'high', price: 2500 },
        ]
    }
];

// Generate dates
function generateDates() {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
    }
    return dates;
}

// Format date
function formatDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
        day: days[date.getDay()],
        date: date.getDate(),
        month: months[date.getMonth()],
        full: date.toISOString().split('T')[0]
    };
}

// Render date selector
function renderDateSelector() {
    const dates = generateDates();
    const container = document.getElementById('dateButtons');
    const today = new Date().toISOString().split('T')[0];
    
    dates.forEach((date, index) => {
        const formatted = formatDate(date);
        const isToday = formatted.full === today;
        const btn = document.createElement('button');
        btn.className = `date-btn ${index === 0 ? 'active' : ''}`;
        btn.dataset.date = formatted.full;
        btn.innerHTML = `
            <div class="text-sm">${isToday ? 'Today' : formatted.day}</div>
            <div class="text-lg font-bold">${formatted.date}</div>
            <div class="text-xs opacity-75">${formatted.month}</div>
        `;
        container.appendChild(btn);
    });
}

// Render movies
let currentFilters = {
    genre: 'all',
    format: 'all',
    time: 'all',
    date: new Date().toISOString().split('T')[0]
};

function renderMovies() {
    const container = document.getElementById('moviesGrid');
    const filtered = movies.filter(movie => {
        // Genre filter
        if (currentFilters.genre !== 'all' && movie.genre !== currentFilters.genre) return false;
        
        // Check if movie has showtimes for selected date
        const dateShowtimes = movie.showtimes.filter(st => st.date === currentFilters.date);
        if (dateShowtimes.length === 0) return false;
        
        // Format filter
        if (currentFilters.format !== 'all') {
            const hasFormat = dateShowtimes.some(st => st.format === currentFilters.format);
            if (!hasFormat) return false;
        }
        
        // Time filter
        if (currentFilters.time !== 'all') {
            const hasTime = dateShowtimes.some(st => {
                const hour = parseInt(st.time.split(':')[0]);
                if (currentFilters.time === 'morning') return hour < 12;
                if (currentFilters.time === 'afternoon') return hour >= 12 && hour < 17;
                if (currentFilters.time === 'evening') return hour >= 17;
                return true;
            });
            if (!hasTime) return false;
        }
        
        return true;
    });
    
    container.innerHTML = filtered.map(movie => {
        const ratingClass = movie.rating === 'PG' ? 'badge-pg' : movie.rating === '13+' ? 'badge-13' : 'badge-18';
        return `
            <div class="movie-card">
                <div class="relative">
                    <img src="${movie.poster}" alt="${movie.title}" class="w-full h-96 object-cover">
                    ${movie.fillingFast ? '<div class="absolute top-3 right-3 badge badge-filling">Filling Fast</div>' : ''}
                    <div class="absolute bottom-3 left-3 badge ${ratingClass}">${movie.rating}</div>
                </div>
                <div class="p-5">
                    <h3 class="text-xl font-bold mb-2">${movie.title}</h3>
                    <div class="flex items-center gap-3 text-sm text-gray-400 mb-4">
                        <span class="capitalize">${movie.genre}</span>
                        <span>•</span>
                        <span>${movie.duration}</span>
                    </div>
                    <button onclick="viewMovie(${movie.id})" class="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105">
                        View Showtimes
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// View movie details
function viewMovie(movieId) {
    localStorage.setItem('selectedMovie', movieId);
    localStorage.setItem('selectedDate', currentFilters.date);
    window.location.href = 'cinema-movie-detail.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderDateSelector();
    renderMovies();
    
    // Date selector
    document.getElementById('dateButtons').addEventListener('click', (e) => {
        const btn = e.target.closest('.date-btn');
        if (!btn) return;
        
        document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilters.date = btn.dataset.date;
        renderMovies();
    });
    
    // Genre filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.genre = btn.dataset.filter;
            renderMovies();
        });
    });
    
    // Format filter
    document.getElementById('formatFilter').addEventListener('change', (e) => {
        currentFilters.format = e.target.value;
        renderMovies();
    });
    
    // Time filter
    document.getElementById('timeFilter').addEventListener('change', (e) => {
        currentFilters.time = e.target.value;
        renderMovies();
    });
});

// Export for other pages
window.moviesData = movies;
