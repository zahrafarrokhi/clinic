# Generated by Django 4.1 on 2022-11-06 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0003_payment_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='description',
            field=models.CharField(default='', max_length=200),
        ),
    ]
