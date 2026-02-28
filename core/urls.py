from django.urls import path
from .views import home, archive, articles_archive

urlpatterns = [
    path("", home, name="home"),
    path("archive/", archive, name="archive"),
    path("articles/", articles_archive, name="articles_archive"),
]
