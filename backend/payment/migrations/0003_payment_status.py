# Generated by Django 4.1 on 2022-10-18 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0002_alter_payment_ref_id_alter_payment_rrn'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='status',
            field=models.CharField(choices=[('successful', 'Successful'), ('failed', 'Failed'), ('pending', 'Pending')], default='pending', max_length=30),
        ),
    ]
