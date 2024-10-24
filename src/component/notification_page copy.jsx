
import React, { useState } from 'react';


const allNotifications = [
    { id: 1, message: 'لديك رسالة جديده من ضحى', time: '2024-10-04T10:00:00Z' },
    { id: 2, message: 'الطالب/ة بشرى تعذر عن الحضور اليوم.', time: '2024-10-04T10:05:00Z' },
    { id: 3, message: 'لديك رسالة من ولي الامر محمد', time: '2024-10-04T11:00:00Z' },
    { id: 4, message: 'تم تسجيل الطالب علي !', time: '2024-10-04T12:00:00Z' },
];


const timeFilters = [
    { label: 'All', value: 'all' },
    { label: 'Last 5 minutes', value: '5' },
    { label: 'Last hour', value: '60' },
    { label: 'Last 24 hours', value: '1440' },
];

function NotificationCard({ notification }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <p className="text-green-600 font-semibold">{notification.message}</p>
            <p className="text-gray-500">{new Date(notification.time).toLocaleString()}</p>
            <div className='flex justify-around my-2'><button className='border border-green-300 rounded p-2 hover:bg-green-100'>تعين كمقروة</button>
                <button className='border border-red-300 rounded p-2 hover:bg-red-200'> الغاء</button></div>
        </div>
    );
}

function NotificationPage() {
    const [filter, setFilter] = useState('all');

    const filteredNotifications = allNotifications.filter(notification => {
        const notificationTime = new Date(notification.time);
        const now = new Date();
        const differenceInMinutes = (now - notificationTime) / (1000 * 60);

        if (filter === 'all') return true; // Show all notifications
        return differenceInMinutes <= parseInt(filter); // Filter based on selected time
    });

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-green-700 mb-6">الاشعارات</h1>
            <div className="mb-4 flex">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                >
                    {timeFilters.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div className="w-full max-w-md">
                {filteredNotifications.map(notification => (
                    <NotificationCard key={notification.id} notification={notification} />
                ))}
            </div>
        </div>
    );
}

export default NotificationPage;