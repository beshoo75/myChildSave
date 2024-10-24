// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n

    .use(initReactI18next) // استخدم React i18next
    .init(

        {
            resources: {
                en: {
                    translation: {
                        notfiy: "Enable Notifications",
                        theme: "Theme",
                        lngAddBus: 'Add Bus',
                        lngBuses: 'Buses',
                        lngBuseNumber: 'Buse Number',
                        lngDriverName: "Driver Name",
                        lngBuseLicenes: "Buse License",
                        lngBusPath: 'Buse Path'
                    }
                },
                ar: {
                    translation: {
                        notfiy: "تفعيل الاشعارات",
                        theme: "تغير الثيم",
                        lngAddBus: 'إضافة حافلة',
                        lngBuses: 'الحافلات',
                        lngBuseNumber: 'رقم الحافله',
                        lngDriverName: 'اسم السائق',
                        lngBuseLicenes: 'لوحة رخصه الحافله',
                        lngBusPath: 'مسار الحافله'
                    }
                }
            },

            lng: "ar", // اللغة الافتراضية
            fallbackLng: "en", // اللغة الاحتياطية
            interpolation: {
                escapeValue: false,
                // لا حاجة للهروب في React
            }
        });

export default i18n;
