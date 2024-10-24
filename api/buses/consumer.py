# # # from .models import Messages
# # # import json
# # # from channels.db import database_sync_to_async
# # # from channels.generic.websocket import AsyncWebsocketConsumer
# # # import logging

# # # logger = logging.getLogger(__name__)


# # # class ChatConsumer(AsyncWebsocketConsumer):
# # #     # async def connect(self):
# # #     #     self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
# # #     #     self.room_group_name = f"chat_{self.room_name}"

# # #     #     # Join room group
# # #     #     await self.channel_layer.group_add(self.room_group_name, self.channel_name)

# # #     #     await self.accept()
# # #     async def connect(self):
# # #         try:
# # #             self.room_name = self.scope['url_route']['kwargs']['room_name']
# # #             self.room_group_name = f'chat_{self.room_name}'
# # #             await self.channel_layer.group_add(self.room_group_name, self.channel_name)
# # #             await self.accept()
# # #             logger.info(f"WebSocket connected to room: {self.room_name}")
# # #             messages = await self.get_messages()
# # #             await self.send(text_data=json.dumps({
# # #                 'messages': messages
# # #             }))
# # #         except Exception as e:
# # #             logger.error(f"Error in connect: {e}")
# # #             await self.close()

# # #         # Load previous messages from the database

# # #     async def disconnect(self, close_code):
# # #         # Leave room group
# # #         await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
# # #         # return await super().disconnect(close_code)

# # #     async def receive(self, text_data):
# # #         text_data_json = json.loads(text_data)
# # #         message_text = text_data_json['message_text']
# # #         user = text_data_json['user']

# # #         #s Save message to the database
# # #         self.save_message(user, message_text)

# # #         # Send message to room group
# # #         await self.channel_layer.group_send(
# # #             self.room_group_name,
# # #             {
# # #                 'type': 'chat_message',
# # #                 'message_text':message_text,
# # #                 'user': user,
# # #             }
# # #         )

# # #     async def chat_message(self, event):
# # #         message_text = event['message_text']
# # #         user = event['user']

# # #         # Send message to WebSocket
# # #         await self.send(text_data=json.dumps({
# # #             'message_text': message_text,
# # #             'user': user
# # #         }))

# # #     async def get_messages(self):
# # #         messages = await database_sync_to_async(Messages.objects.filter)(room_name=self.room_name)
# # #         return [
# # #             {
# # #                 'user': msg.user,
# # #                 'message_text': msg.messsage_text,
# # #                 'timestamp': msg.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
# # #             } for msg in messages
# # #         ]

# # #     async def save_message(self, user, content):
# # #         message = Messages(room_name = self.room_name, user = user, message_text = content)
# # #         await database_sync_to_async(message.save)()

# # # from .models import Messages
# # import json
# # from channels.db import database_sync_to_async
# # from channels.generic.websocket import AsyncWebsocketConsumer
# # from .models import Bus, Traffic

# # # from users.models import User

# # import logging

# # logger = logging.getLogger(__name__)


# # class TrafficConsumer(AsyncWebsocketConsumer):
# #     async def connect(self):
# #         try:
# #             print("accepted")
# #             self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
# #             self.room_group_name = f"chat_{self.room_name}"

# #             # Join room group
# #             await self.channel_layer.group_add(self.room_group_name, self.channel_name)
# #             await self.accept()
# #             logger.info(f"WebSocket connected to room: {self.room_name}")

# #             # Load previous messages from the database
# #             # messages = await database_sync_to_async(self.get_messages)()
# #             # await self.send(text_data=json.dumps({"messages": messages}))
# #         except Exception as e:
# #             logger.error(f"Error in connect: {e.message}")
# #             await self.close()

# #     async def disconnect(self, close_code):
# #         # Leave room group
# #         await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

# #     async def receive(self, text_data):
# #         logger.info("receive")
# #         text_data_json = json.loads(text_data)
# #         lat = text_data_json["lat"]
# #         lng = text_data_json["lng"]
# #         user = text_data_json["user"]

# #         # Save message to the database
# #         await database_sync_to_async(self.save_message)(
# #             user=user, lat=lat, lng=lng
# #         )

# #         # Send message to room group
# #         await self.channel_layer.group_send(
# #             self.room_group_name,
# #             {
# #                 "type": "traffic_message",
# #                 "lat": lat,
# #                 "lng": lng,
# #                 "bus": Bus.objects.get(supervisor=user),
# #             },
# #         )

# #     async def chat_message(self, event):
# #         get_geolocation = event["get_geolocation"]
# #         user = event["user"]
# #         lat = event["lat"]
# #         lng = event["lng"]

# #         # Send message to WebSocket
# #         await self.send(
# #             text_data=json.dumps(
# #                 {
# #                     "type": "traffic_message",
# #                     "lat": lat,
# #                     "lng": lng,
# #                     "bus": Bus.objects.get(supervisor=user),
# #                 }
# #             )
# #         )

# #     # def get_messages(self):
# #     #     # messages = await database_sync_to_async(Messages.objects.filter)(room_name=self.room_name)
# #     #     traffics = Traffic.objects.filter(room_name=self.room_name)
# #     #     data_list = []
# #     #     for traffic in traffics:
# #     #         data = {
# #     #             "user": tra.user.id,
# #     #             "message_text": msg.message_text,  # Fixed typo here
# #     #             "timestamp": msg.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
# #     #         }
# #     #         data_list.append(data)
# #     #     return data_list

# #     def save_message(self, user, lat, lng):
# #         message = Traffic(
# #             room_name=self.room_name,
# #             bus=Bus.objects.get(supervisor=user),
# #             lat=lat,
# #             lng=lng,
# #         )
# #         message.save()


# from .models import Bus, Traffic
# import json
# from channels.db import database_sync_to_async
# from channels.generic.websocket import AsyncWebsocketConsumer
# import logging

# logger = logging.getLogger(__name__)


# class TrafficConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         try:
#             print("accepted")
#             self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
#             self.room_group_name = f"traffic_{self.room_name}"

#             # Join room group
#             await self.channel_layer.group_add(self.room_group_name, self.channel_name)
#             await self.accept()
#             logger.info(f"WebSocket connected to room: {self.room_name}")

#             # Optionally load previous messages or state here
#             # messages = await database_sync_to_async(self.get_messages)()
#             # await self.send(text_data=json.dumps({"messages": messages}))
#         except Exception as e:
#             logger.error(f"Error in connect: {str(e)}")
#             await self.close()

#     async def disconnect(self, close_code):
#         # Leave room group
#         await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

#     async def receive(self, text_data):
#         logger.info("Received data")
#         text_data_json = json.loads(text_data)
#         print(text_data_json)
#         lat = text_data_json["lat"]
#         lng = text_data_json["lng"]
#         user = text_data_json["user"]

#         bus = Bus.objects.get(supervisor=user)

#         # Save message to the database
#         await database_sync_to_async(self.save_traffic)(bus=bus, lat=lat, lng=lng)

#         # Send geolocation update to room group
#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 "type": "send_geolocation",
#                 "lat": lat,
#                 "lng": lng,
#                 "bus": bus,
#             },
#         )

#     async def send_geolocation(self, event):
#         lat = event["lat"]
#         lng = event["lng"]
#         bus = event["bus"]

#         # Send geolocation update to WebSocket
#         await self.send(
#             text_data=json.dumps(
#                 {
#                     "type": "geolocation_update",
#                     "lat": lat,
#                     "lng": lng,
#                     "bus": bus,
#                 }
#             )
#         )

#     def save_traffic(self, bus, lat, lng):
#         # Save the traffic data to the database
#         traffic = Traffic(
#             room_name=self.room_name,
#             bus=bus,
#             lat=lat,
#             lng=lng,
#         )
#         traffic.save()


from .models import Bus, Traffic
import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
import logging

logger = logging.getLogger(__name__)

class TrafficConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            print("accepted")
            self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
            self.room_group_name = f"traffic_{self.room_name}"

            # Join room group
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
            logger.info(f"WebSocket connected to room: {self.room_name}")
        except Exception as e:
            logger.error(f"Error in connect: {str(e)}")
            await self.close()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        # logger.info("Received data")
        # print("received")
        try:
            text_data_json = json.loads(text_data)
            lat = text_data_json["lat"]
            lng = text_data_json["lng"]
            user = text_data_json["user"]

            # print(text_data_json)

            # Fetch bus object safely
            bus = await database_sync_to_async(self.get_bus)(user)

            # print(bus)

            # Save message to the database
            await database_sync_to_async(self.save_traffic)(bus=bus, lat=lat, lng=lng)

            # Send geolocation update to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "send_geolocation",
                    "lat": lat,
                    "lng": lng,
                    "bus": bus.id,  # Send only the bus ID
                },
            )
        except Exception as e:
            logger.error(str(e))

    async def send_geolocation(self, event):
        lat = event["lat"]
        lng = event["lng"]
        bus_id = event["bus"]

        # Send geolocation update to WebSocket
        await self.send(
            text_data=json.dumps(
                {
                    "type": "geolocation_update",
                    "lat": lat,
                    "lng": lng,
                    "bus_id": bus_id,
                }
            )
        )

    def save_traffic(self, bus, lat, lng):
        traffic = Traffic(
            bus=bus,
            lat=lat,
            lng=lng,
        )
        traffic.save()

    def get_bus(self, user):
        try:
            return Bus.objects.get(supervisor=user)
        except Bus.DoesNotExist:
            logger.error(f"No bus found for supervisor: {user}")
            return None
        
class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            print("accepted")
            self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
            self.room_group_name = f"traffic_{self.room_name}"

            # Join room group
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
            logger.info(f"WebSocket connected to room: {self.room_name}")
        except Exception as e:
            logger.error(f"Error in connect: {str(e)}")
            await self.close()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        # logger.info("Received data")
        # print("received")
        try:
            text_data_json = json.loads(text_data)
            lat = text_data_json["lat"]
            lng = text_data_json["lng"]
            user = text_data_json["user"]

            # print(text_data_json)

            # Fetch bus object safely
            bus = await database_sync_to_async(self.get_bus)(user)

            # print(bus)

            # Save message to the database
            await database_sync_to_async(self.save_traffic)(bus=bus, lat=lat, lng=lng)

            # Send geolocation update to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "send_geolocation",
                    "lat": lat,
                    "lng": lng,
                    "bus": bus.id,  # Send only the bus ID
                },
            )
        except Exception as e:
            logger.error(str(e))

    async def send_geolocation(self, event):
        lat = event["lat"]
        lng = event["lng"]
        bus_id = event["bus"]

        # Send geolocation update to WebSocket
        await self.send(
            text_data=json.dumps(
                {
                    "type": "geolocation_update",
                    "lat": lat,
                    "lng": lng,
                    "bus_id": bus_id,
                }
            )
        )

    def save_traffic(self, bus, lat, lng):
        traffic = Traffic(
            bus=bus,
            lat=lat,
            lng=lng,
        )
        traffic.save()

    def get_bus(self, user):
        try:
            return Bus.objects.get(supervisor=user)
        except Bus.DoesNotExist:
            logger.error(f"No bus found for supervisor: {user}")
            return None