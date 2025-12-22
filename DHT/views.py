# views.py
from django.http import JsonResponse
from django.shortcuts import render

from .models import Dht11


def dashboard(request):
    # Rend juste la page; les données sont chargées via JS
    return render(request, "dashboard.html")

def graph_temp(request):
    # Affiche la page du graphe Température (Step 2)
    return render(request, "graph_temp.html")

def graph_hum(request):
    # Affiche la page du graphe Humidité (Step 2)
    return render(request, "graph_hum.html")

def latest_json(request):
    # Fournit la dernière mesure en JSON (sans passer par api.py)
    last = Dht11.objects.order_by('-dt').values('temp', 'hum', 'dt').first()
    if not last:
        return JsonResponse({"detail": "no data"}, status=404)
    return JsonResponse({
        "temperature": last["temp"],
        "humidity":    last["hum"],
        "timestamp":   last["dt"].isoformat()
    })