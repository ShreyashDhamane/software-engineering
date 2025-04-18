# Generated by Django 5.1.6 on 2025-04-14 03:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0008_user_is_banned"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="is_banned",
            field=models.BooleanField(
                blank=True, default=False, null=True, verbose_name="Is the user banned"
            ),
        ),
    ]
