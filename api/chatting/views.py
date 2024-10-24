from rest_framework import viewsets
from .models import Messages
from .serializers import MessageSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Messages.objects.all().order_by('-timestamp')
    serializer_class = MessageSerializer