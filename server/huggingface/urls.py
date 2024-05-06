
from django.urls import path
from huggingface import views

urlpatterns = [
    path('', views.healthy, name='huggingface_healthy'),
    path('emotions/', views.emotions, name='huggingface_emotions'),
    path('sentiments/', views.sentiments, name='huggingface_sentiments'),
]