"""
Django settings for save_my_child project.

Generated by 'django-admin startproject' using Django 5.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path

# import os.path
# from corsheaders.defaults import default_headers

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-7z#qv*mu+x00h1x_zi_a=4*l(v+!9t9kl2+locjqngqpeg-k+e"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "192.168.43.160", "192.168.0.186"]
# ALLOWED_HOSTS = []

CORS_ALLOWED_ORIGINS = [
    #     "http://localhost:5173",
    #     "http://127.0.0.1:5173",
    #     "https://localhost:5173",
    "https://127.0.0.1",
    "https://localhost",
    "https://192.168.43.160",
    "https://192.168.0.186",
    # "https://192.168.24.182:5173",
    # "https://192.168.43.223:5173",
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    # "sslserver",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "daphne",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "channels",
    "users.apps.UsersConfig",
    "students.apps.StudentsConfig",
    "buses.apps.BusesConfig",
    "notifications.apps.NotificationsConfig",
    "chatting.apps.ChattingConfig",
    "django_extensions",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "save_my_child.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "save_my_child.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "my-child-save",  # Your database name
        "USER": "postgres",  # Your database username
        "PASSWORD": "1234",  # Your database password
        "HOST": "localhost",  # Set to empty string for localhost
        "PORT": "5432",  # Set to empty string for default
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"

# STATICFILES_DIRS = [    # defining path of static folder
#     os.path.join(BASE_DIR, "static"),
# ]

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
AUTH_USER_MODEL = "users.User"
# LOGIN_REDIRECT_URL = 'dashboard'
# LOGOUT_REDIRECT_URL = 'login'
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        # "rest_framework.authentication.BasicAuthentication"
    ),
    # 'DEFAULT_RENDERER_CLASSES': [
    #     'rest_framework.renderers.JSONRenderer',
    # ],
}

CSRF_COOKIE_NAME = "csrftoken"
CSRF_COOKIE_HTTPONLY = False  # This should be False to allow javascript access
CSRF_COOKIE_SECURE = False  # Set it to True if using HTTPS

# CSRF_COOKIE_SAMESITE = "Strict"
# SESSION_COOKIE_SAMESITE = "Strict"
# CSRF_COOKIE_HTTPONLY = True
# SESSION_COOKIE_HTTPONLY = True
CSRF_TRUSTED_ORIGINS = [
    "https://localhost",
    #     "http://localhost:5173",
    "https://127.0.0.1",
    #     "https://localhost:5173",
    #     "https://localhost:443",
    # "https://192.168.24.182:5173",
    # "https://192.168.43.223:5173",
    "https://192.168.43.160",
    "https://192.168.0.186",
]

# PROD ONLY
# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True

# CORS_ALLOW_HEADERS = list(default_headers) + [
#     'X-CSRFToken',  # Add this line
# ]
# Allow specific headers, including the default headers
# CORS_ALLOW_METHODS = [
#     "GET",
#     "POST",
#     "PUT",
#     'PATCH',
#     "DELETE",
#     # "OPTIONS",
# ]

# CORS_ALLOW_HEADERS = [
#     'X-CSRFToken',
#     'Authorization',
#     'Content-Type',
#     'X-Requested-With',
# ]

# Set session expiration parameters
SESSION_COOKIE_AGE = 86400  # 1 day, in seconds
SESSION_EXPIRE_AT_BROWSER_CLOSE = True  # Optional: expire session on browser close

# channel
ASGI_APPLICATION = "save_my_child.asgi.application"
CHANNEL_LAYERS = {
    "default": {
        # 'BACKEND': 'channels_redis.core.RedisChannelLayer',
        "BACKEND": "channels.layers.InMemoryChannelLayer",
        # 'CONFIG': {
        #     'hosts':[('127.0.0.1', 6379)],
        #     # 'hosts':[('redis', 6379)],
        # }
    }
}

# USE_X_FORWARDED_HOST = True
# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DATA_UPLOAD_MAX_MEMORY_SIZE = 20971520 # 20 x 1024 x 1024 = 20MB
