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
    }
    return render(request, "core/home.html", ctx)

def archive(request):
    return render(request, "core/archive.html", {
        "rows": SITE["archive_rows"]
    })
