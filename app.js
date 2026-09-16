// Sample Vetted Job Listings Data
const jobListings = [
    {
        id: 1,
        title: "Remote Frontend Engineer",
        company: "TechCare Solutions",
        location: "Remote (Global)",
        type: "women-only",
        tags: ["Women-Centric", "Flexible Hours", "Remote"],
        description: "Specialized team role designed for returnships and female developers returning to tech."
    },
    {
        id: 2,
        title: "Operations & HR Manager",
        company: "Velsci Assist",
        location: "Hybrid / Remote",
        type: "inclusive",
        tags: ["Inclusive", "Men & Women", "Full-Time"],
        description: "Managing client relations and family support logistics with flexible scheduling."
    },
    {
        id: 3,
        title: "Digital Marketing Specialist",
        company: "Frauera Network",
        location: "Remote",
        type: "women-only",
        tags: ["Women-Centric", "Part-Time", "Maternity Friendly"],
        description: "Leading digital advocacy and community campaigns for maternal wellness."
    }
];

// Initial Forum Data
let forumPosts = [
    {
        author: "Sarah M.",
        category: "Postpartum Support",
        content: "Returning to work after 6 months felt overwhelming. Having a structured flexible arrangement made all the difference.",
        date: "2026-09-15"
    }
];

// DOM Load Initialization
document.addEventListener("DOMContentLoaded", () => {
    renderJobs('all');
    renderForum();
    checkCookieConsent();
});

// HTML Entity Sanitization Function
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Render Jobs
function renderJobs(filter) {
    const grid = document.getElementById("jobGrid");
    grid.innerHTML = "";

    const filtered = jobListings.filter(job => {
        if (filter === 'all') return true;
        if (filter === 'remote') return job.tags.includes('Remote');
        return job.type === filter;
    });

    filtered.forEach(job => {
        const card = document.createElement("article");
        card.className = "job-card";
        card.innerHTML = `
            <span class="job-type-tag">${escapeHTML(job.tags[0])}</span>
            <h3>${escapeHTML(job.title)}</h3>
            <p><strong>${escapeHTML(job.company)}</strong> • ${escapeHTML(job.location)}</p>
            <p style="margin: 12px 0; font-size: 0.9rem;">${escapeHTML(job.description)}</p>
            <button class="btn btn-outline btn-sm" onclick="alert('Redirecting to secure application link...')">Apply Now</button>
        `;
        grid.appendChild(card);
    });
}

function filterJobs(filterType) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderJobs(filterType);
}

// Render Sanitized Forum
function renderForum() {
    const feed = document.getElementById("forumFeed");
    feed.innerHTML = "";

    forumPosts.forEach(post => {
        const item = document.createElement("div");
        item.className = "forum-post";
        item.innerHTML = `
            <div class="forum-meta">
                <span><strong>${escapeHTML(post.author)}</strong> (${escapeHTML(post.category)})</span>
                <span>${escapeHTML(post.date)}</span>
            </div>
            <p>${escapeHTML(post.content)}</p>
        `;
        feed.appendChild(item);
    });
}

function handlePostSubmit(e) {
    e.preventDefault();
    const author = document.getElementById("authorName").value.trim() || "Anonymous Mother";
    const category = document.getElementById("postCategory").value;
    const content = document.getElementById("postText").value.trim();

    if (!content) return;

    forumPosts.unshift({
        author: author,
        category: category,
        content: content,
        date: new Date().toISOString().split('T')[0]
    });

    renderForum();
    document.getElementById("forumForm").reset();
}

// Memory-Safe Breathing Timer
let breathingInterval = null;
let breathState = 0; // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold

function toggleBreathing() {
    const circle = document.getElementById("breathCircle");
    const text = document.getElementById("breathText");
    const btn = document.getElementById("breathBtn");

    if (breathingInterval) {
        clearInterval(breathingInterval);
        breathingInterval = null;
        circle.classList.remove("expand");
        text.innerText = "Prepare";
        btn.innerText = "Start Exercise";
        return;
    }

    btn.innerText = "Stop Exercise";
    runBreathingCycle(circle, text);
    breathingInterval = setInterval(() => runBreathingCycle(circle, text), 4000);
}

function runBreathingCycle(circle, text) {
    const states = [
        { label: "Inhale (4s)", expand: true },
        { label: "Hold (4s)", expand: true },
        { label: "Exhale (4s)", expand: false },
        { label: "Hold (4s)", expand: false }
    ];

    const current = states[breathState];
    text.innerText = current.label;
    if (current.expand) {
        circle.classList.add("expand");
    } else {
        circle.classList.remove("expand");
    }

    breathState = (breathState + 1) % states.length;
}

// Modal Handlers
function openModal(id) {
    document.getElementById(id).classList.add("active");
}

function closeModal(id) {
    document.getElementById(id).classList.remove("active");
}

// Cookie Consent Handlers
function acceptCookies() {
    localStorage.setItem("frauera_cookie_consent", "all");
    document.getElementById("gdprBanner").style.display = "none";
}

function acceptEssentialCookies() {
    localStorage.setItem("frauera_cookie_consent", "essential");
    document.getElementById("gdprBanner").style.display = "none";
}

function checkCookieConsent() {
    if (localStorage.getItem("frauera_cookie_consent")) {
        document.getElementById("gdprBanner").style.display = "none";
    }
}