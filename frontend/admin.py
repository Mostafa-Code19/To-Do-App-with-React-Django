from django.contrib import admin
from .models import *

class Todo_Admin(admin.ModelAdmin):
    list_display = ('task', 'completed')

admin.site.register(Todo, Todo_Admin)