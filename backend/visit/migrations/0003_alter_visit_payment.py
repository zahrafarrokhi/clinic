# Generated by Django 4.1 on 2022-10-22 11:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0003_payment_status'),
        ('visit', '0002_visit_room_id_visit_room_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visit',
            name='payment',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='payment.payment'),
        ),
    ]