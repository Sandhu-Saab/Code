from datetime import date
import uuid
from django.db import models
import uuid


# Create your models here.
class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    commentId = models.CharField(max_length=100)
    comment = models.CharField(max_length=200)
    owner = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.comment
