from django.urls import path
from .views import home, archive

urlpatterns = [
    path("", home, name="home"),
    path("archive", archive, name="archive"),
]
