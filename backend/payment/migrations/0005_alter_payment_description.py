# Generated by Django 4.1 on 2022-11-09 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0004_payment_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='description',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
    ]
