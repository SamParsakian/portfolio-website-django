from django.shortcuts import render

def home(request):
    return render(request, "core/home.html")

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
