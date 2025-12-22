from .models import Dht11
from .serializers import DHT11serialize

from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .utils import send_telegram


@api_view(['GET'])
def Dlist(request):
    # CHANGEZ cette ligne pour trier par date ASCENDANTE (plus ancien → plus récent)
    all_data = Dht11.objects.all().order_by('dt')  # Enlevez le '-' devant 'dt'
    data = DHT11serialize(all_data, many=True).data
    return Response({'data': data})

class Dhtviews(generics.CreateAPIView):
    queryset = Dht11.objects.all()
    serializer_class = DHT11serialize

    def perform_create(self, serializer):
        instance = serializer.save()
        temp = instance.temp

        if temp > 25:
            # 1) Email (si tu veux le garder)
            try:
                send_mail(
                    subject="⚠️ Alerte Température élevée",
                    message=f"Bonjour ! Nous sommes ABDOUSSI Ibtissame et EL OIZZANI CHAHDI Wiam \n {temp:.1f} °C à {instance.dt}.",
                    from_email=settings.EMAIL_HOST_USER,

                    #recipient_list=["elmouss@yahoo.com"],
                    fail_silently=True,
                )
            except Exception:
                pass
            # 2) Telegram
            msg = f"⚠️ Alerte DHT11: {temp:.1f} °C (>25) à {instance.dt}"
            send_telegram(msg)

            # Alertwhatsapp
            from twilio.rest import Client

            account_sid = 'AC2b121cb8df368618f1b3573d39cb57e1'
            auth_token = '23020efebc397b980c59e67f32bef1af'
            client = Client(account_sid, auth_token)

            message = client.messages.create(
                from_='whatsapp:+14155238886',
                body='Il y a une alerte importante sur votre Capteur la température dépasse le seuil',
                to='whatsapp:+212664520040'
            )

            print(message.sid)