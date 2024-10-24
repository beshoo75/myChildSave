from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django import forms
from .models import User


class UserLoginForm(AuthenticationForm):
    # username = forms.CharField(required=True, widget=forms.Widget(attrs={"placeholder":"Username","class": "rounded shadow text-orange-400 w-100 border-b-2 border-orange-200 focus:border-orange-500 outline-none p-3 bg-orange-50 mb-3",}))
    # password = forms.CharField(required=True, widget=forms.Widget(attrs={"placeholder":"Password","class": "rounded shadow text-orange-400 w-100 border-b-2 border-orange-200 focus:border-orange-500 outline-none p-3 bg-orange-50 mb-3",}))
    username = forms.CharField(required=True)
    password = forms.CharField(required=True, widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ("username", "password")


class UserCreateForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            "username",
            'user_type',
            'first_name',
            "last_name",
            'email',
            "password1",
            'password2',
            'phone_number',
            'nationality',
            'id_doc',
            'home_address'
        ]
