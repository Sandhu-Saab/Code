# Generated by Django 4.0.6 on 2023-01-29 06:45

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Priority',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('priority_id', models.IntegerField(unique=True)),
                ('priority_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('status_id', models.IntegerField(unique=True)),
                ('status_name', models.CharField(max_length=100, unique=True)),
            ],
        ),
    ]
