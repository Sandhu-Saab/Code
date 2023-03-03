# Generated by Django 4.0.6 on 2023-01-29 06:45

from django.db import migrations, models
import incidents.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Incident',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('ticketNumber', models.IntegerField(default=incidents.models.Incident.ids, unique=True)),
                ('reportDateTime', models.DateTimeField()),
                ('multipleAffectedUser', models.BooleanField()),
                ('affectedUserSize', models.IntegerField()),
                ('ticketDateTime', models.DateTimeField(auto_now_add=True)),
                ('subject', models.CharField(max_length=100)),
                ('details', models.TextField()),
                ('isAssigned', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='TicketType',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=100)),
            ],
        ),
    ]
