# Generated by Django 4.0.6 on 2023-01-29 06:45

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Approvals',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='BackoutPlan',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('description', models.TextField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='BusinessJustification',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('purpose', models.CharField(max_length=100)),
                ('need', models.CharField(max_length=100)),
                ('duration', models.CharField(max_length=100)),
                ('accessibility', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='CommunicationPlan',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('description', models.TextField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='InstallPlan',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('description', models.TextField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='RiskAssesment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('doc_config', models.CharField(max_length=100)),
                ('enviroment', models.CharField(max_length=100)),
                ('redundancy', models.CharField(max_length=100)),
                ('enviroment_maturity', models.CharField(max_length=100)),
                ('time_to_implement', models.CharField(max_length=100)),
                ('change_history', models.CharField(max_length=100)),
                ('deployment_window', models.CharField(max_length=100)),
                ('num_of_staff', models.CharField(max_length=100)),
                ('testing', models.CharField(max_length=100)),
                ('backout_plan', models.CharField(max_length=100)),
                ('scheduling', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ChangeRequest',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('requestNumber', models.IntegerField(default=1)),
                ('status', models.IntegerField(default=1)),
                ('requestType', models.CharField(max_length=100)),
                ('requestDateTime', models.DateTimeField()),
                ('requestName', models.CharField(max_length=100)),
                ('projectName', models.CharField(max_length=100)),
                ('department', models.CharField(max_length=100)),
                ('requestContact', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=300)),
                ('isActive', models.BooleanField(default=True)),
                ('assets', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100, null=True), null=True, size=None)),
                ('approvals', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='approvals', to='changes.approvals')),
            ],
        ),
    ]