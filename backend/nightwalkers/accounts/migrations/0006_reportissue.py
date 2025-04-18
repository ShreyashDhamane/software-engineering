# Generated by Django 5.1.6 on 2025-04-05 16:33

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0005_user_karma"),
    ]

    operations = [
        migrations.CreateModel(
            name="ReportIssue",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("reported_at", models.DateTimeField(auto_now_add=True)),
                ("title", models.CharField(max_length=100)),
                ("description", models.TextField(max_length=250)),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
