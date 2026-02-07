from django.urls import path
from .views import home, archive, writing_archive

urlpatterns = [
    path("", home, name="home"),
    path("archive/", archive, name="archive"),
    path("writing/", writing_archive, name="writing_archive"),
]
