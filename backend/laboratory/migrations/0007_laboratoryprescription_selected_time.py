# Generated by Django 4.1 on 2022-12-07 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('laboratory', '0006_laboratoryprescription_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='laboratoryprescription',
            name='selected_time',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
