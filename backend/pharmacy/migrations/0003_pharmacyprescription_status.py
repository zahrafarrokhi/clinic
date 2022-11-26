# Generated by Django 4.1 on 2022-11-26 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pharmacy', '0002_pharmacyprescription_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='pharmacyprescription',
            name='status',
            field=models.CharField(choices=[('waiting_for_response', 'Waiting for response'), ('waiting_for_payment', 'Waiting for payment'), ('waiting_for_delivery', 'Waiting for delivery'), ('delivered', 'Delivered'), ('canceled', 'Canceled')], default='waiting_for_response', max_length=30),
        ),
    ]
