# Generated by Django 4.1 on 2022-12-07 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('laboratory', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='laboratoryprescription',
            name='delivery_price',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='laboratoryprescription',
            name='doctor',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='laboratoryprescription',
            name='laboratory_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='laboratoryprescription',
            name='price',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='laboratoryprescription',
            name='status',
            field=models.CharField(choices=[('waiting_for_response', 'Waiting for response'), ('waiting_for_payment', 'Waiting for payment'), ('waiting_for_test', 'Waiting for test'), ('waiting_for_result', 'Waiting for result'), ('result', 'Result'), ('canceled', 'Canceled')], default='waiting_for_response', max_length=30),
        ),
    ]
