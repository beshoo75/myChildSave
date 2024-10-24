from django.shortcuts import render

def dashboard(request):
    # if request.method == "POST":
    return render(request=request,template_name="views/dashboard.html")