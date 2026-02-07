from django.shortcuts import render
from .site_data import SITE

def home(request):
    ctx = {
        "profile": SITE["profile"],
        "social": SITE["social"],
        "about_paragraphs": SITE["about"],
        "experience": SITE["experience"],
        "projects": SITE["projects"],
        "writing": SITE["writing"],
        "resume_path": SITE.get("resume"),
    }
    return render(request, "core/home.html", ctx)

def archive(request):
    return render(request, "core/archive.html", {
        "profile": SITE["profile"],
        "rows": SITE["archive_rows"]
    })

def writing_archive(request):
    return render(request, "core/writing_archive.html", {
        "profile": SITE["profile"],
        "writing": SITE["writing"],
    })
