from rest_framework.permissions import BasePermission


class AdminPermissions(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser


class SupervisorPermissions(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff


class AdminOrSupervisorPermissions(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff or request.user.is_superuser


class ParentPermission(BasePermission):
    def has_permission(self, request, view):
        return (not request.user.is_staff) and (not request.user.is_superuser)
