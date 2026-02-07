from django.shortcuts import render

def home(request):
    experience = [
        {
            "date": "2024 — PRESENT",
            "title": "Senior Frontend Engineer, Accessibility",
            "org": "Klaviyo",
            "url": "https://www.klaviyo.com",
            "desc": "Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
            "tags": ["JavaScript", "TypeScript", "React", "Storybook"]
        },
        {
            "date": "2018 — 2024",
            "title": "Lead Engineer",
            "org": "Upstatement",
            "url": "https://upstatement.com",
            "desc": "Lead the engineering team for a major client platform. Contribute to a reusable design system and ship high-quality, accessible frontends across multiple properties.",
            "tags": ["JavaScript", "TypeScript", "HTML & SCSS", "React", "Next.js", "WordPress", "Contentful", "Node.js"]
        },
    ]

    projects = [
        {
            "title": "Spotify Profile",
            "url": "https://spotify-profile.herokuapp.com",
            "desc": "A web app for visualizing personalized Spotify data. View your top artists, tracks, and playlists over different time ranges.",
            "tags": ["React", "Express", "Spotify API", "Heroku"],
            "thumb": "img/project-placeholder-1.jpg",
            "thumb_alt": "Project thumbnail"
        },
        {
            "title": "Halcyon Theme",
            "url": "https://halcyon-theme.netlify.app",
            "desc": "A minimal, dark blue theme for VS Code, Sublime Text, Atom, and more.",
            "tags": ["VS Code", "Theme", "Netlify"],
            "thumb": "img/project-placeholder-2.jpg",
            "thumb_alt": "Project thumbnail"
        },
    ]

    writing = [
        {"year": "2024", "title": "Accessibility Pitfalls and How to Avoid Them", "url": "https://klaviyo.tech", "thumb": "img/writing-placeholder-1.jpg"},
        {"year": "2020", "title": "Integrating Algolia Search with WordPress Multisite", "url": "https://upstatement.com", "thumb": "img/writing-placeholder-2.jpg"},
        {"year": "2019", "title": "Building a Headless Mobile App CMS From Scratch", "url": "https://upstatement.com", "thumb": "img/writing-placeholder-3.jpg"},
    ]

    ctx = {
        "experience": experience,
        "projects": projects,
        "writing": writing,
    }
    return render(request, "core/home.html", ctx)

def archive(request):
    # placeholder rows for now (we'll replace later with your real data/images)
    rows = [
        {
            "year": 2023,
            "project": "Emerson Collective",
            "made_at": "Upstatement",
            "built_with": ["Next.js", "TypeScript", "SCSS", "Contentful"],
            "link_label": "emersoncollective.com",
            "link_url": "https://www.emersoncollective.com",
        },
        {
            "year": 2022,
            "project": "Threadable",
            "made_at": "Upstatement",
            "built_with": ["React Native", "Ruby on Rails", "Firebase"],
            "link_label": "apps.apple.com",
            "link_url": "https://apps.apple.com",
        },
    ]
    return render(request, "core/archive.html", {"rows": rows})
