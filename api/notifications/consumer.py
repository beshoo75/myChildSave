from .models import Notification
import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
import logging

logger = logging.getLogger(__name__)


# class AttendanceNotificationConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         try:
#             print("accepted")
#             name = str(self.scope["url_route"]["kwargs"]["room_name"])
#             user = 0
#             if name.find("_") != -1:
#                 self.room_name = name.split()[0]
#                 user = int(name.split()[1])
#             else:
#                 self.room_name = name

#             self.room_group_name = f"notifications_{self.room_name}"
#             # Join room group
#             await self.channel_layer.group_add(self.room_group_name, self.channel_name)
#             await self.accept()

#             # Load unreaded notifications from the database and send the count of theme
#             if user > 0:
#                 await self.channel_layer.group_send(
#                     self.room_group_name,
#                     {
#                         "type": "send_all_notifications",
#                         "user": user,
#                     },
#                 )
#                 await self.channel_layer.group_send(
#                     self.room_group_name,
#                     {
#                         "type": "get_notifications_count",
#                         "user": user,
#                     },
#                 )

#             logger.info(f"WebSocket connected to room: {self.room_name}")
#         except Exception as e:
#             logger.error(f"Error in connect: {str(e)}")
#             await self.close()

#     async def disconnect(self, close_code):
#         # Leave room group
#         await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


class AttendanceNotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            print("accepted")
            user = int(self.scope["url_route"]["kwargs"]["user_id"])
            self.room_group_name = f"notifications_{user}"
            self.room_name = user

            # Join room group
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()

            # Load unread notifications from the database and send the count
            if user > 0:
                # await self.channel_layer.group_send(
                #     self.room_group_name,
                #     {
                #         "type": "send_all_notifications",
                #         "user": user,
                #     },
                # )
                # await self.channel_layer.group_send(
                #     self.room_group_name,
                #     {
                #         "type": "send_notification_count",
                #         "user": user,
                #     },
                # )
                count = await database_sync_to_async(self.get_notifications_count)(user)

                # Send notifications update to WebSocket
                await self.send(
                    text_data=json.dumps(
                        {
                            "type": "notif_count",
                            "user": user,
                            "count": count,
                        }
                    )
                )

            logger.info(f"WebSocket connected to room: {self.room_name}")
        except Exception as e:
            logger.error(f"Error in connect: {str(e)}")
            await self.close()

    async def disconnect(self, close_code):
        # Check if the room_group_name attribute exists before using it
        # if hasattr(self, "room_group_name"):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        logger.info(
            f"WebSocket disconnected from room: {self.room_name} with code: {close_code}"
        )

    async def receive(self, text_data):
        # logger.info("Received data")
        # print("received")
        try:
            text_data_json = json.loads(text_data)
            user = int(text_data_json["user"])

            # Save notification to the database
            # await database_sync_to_async(self.save_notification)(
            #     user=user,
            # )
            # Save notification to the database
            # count = await database_sync_to_async(self.get_notifications_count)(
            #     user=user
            # )

            # Send notification update to room group
            # await self.channel_layer.group_send(
            #     self.room_group_name,
            #     {
            #         "type": "send_notification",
            #         "user": user,
            #     },
            # )

            # # Send unreaded notifications count update to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "send_notification_count",
                    "user": user,
                    # 'room_name': self.room_name
                },
            )
        except Exception as e:
            logger.error(str(e))

    async def send_notification(self, event):
        user = event["user"]
        # Send notification update to WebSocket
        notif = await database_sync_to_async(self.get_all_notifications)(user)
        await self.send(
            text_data=json.dumps(
                {
                    "type": "new_notif",
                    "user": user,
                    "notif": notif,
                }
            )
        )

    async def send_all_notifications(self, event):
        user = int(event["user"])
        notifs = await database_sync_to_async(self.get_all_notifications)(user)
        await self.send(
            text_data=json.dumps(
                {
                    "type": "all_notifs",
                    "user": user,
                    "notifs": notifs,
                }
            )
        )

    async def send_notification_count(self, event):
        user = int(event["user"])
        count = await database_sync_to_async(self.get_notifications_count)(user)

        # Send notifications update to WebSocket
        await self.send(
            text_data=json.dumps(
                {
                    "type": "notif_count",
                    "user": user,
                    "count": count,
                }
            )
        )

    def save_notification(self, user, title, message):
        notification = Notification(
            user=user,
            title=title,
            message=message,
        )
        notification.save()

    def get_notifications_count(self, user):
        count = Notification.objects.filter(user=user).filter(read=False).count()
        # return Notification.objects.filter(user=user).filter(read=False).count()
        print(count)
        return count

    def get_all_notifications(self, user):
        # from latest notification
        notifications = (
            Notification.objects.filter(user=user)
            .filter(read=False)
            .order_by("-notif_timestamp")
        )
        data_list = []
        for ntf in notifications:
            data = {
                "id": ntf.id,
                "user": ntf.user.id,
                "read": ntf.read,
                "notif_timestamp": ntf.notif_timestamp.strftime("%Y-%m-%d %H:%M:%S"),
                "title": ntf.message,
                "message": ntf.title,
            }
            data_list.append(data)
        return data_list

    def get_latest_notification(self, user):
        ntf = (
            Notification.objects.filter(user=user)
            .filter(read=False)
            .order_by("-notif_timestamp")
            .first()
        )
        return {
            "id": ntf.id,
            "user": ntf.user.id,
            "read": ntf.read,
            "notif_timestamp": ntf.notif_timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            "title": ntf.title,
            "message": ntf.message,
        }
