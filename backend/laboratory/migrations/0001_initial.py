# Generated by Django 4.1 on 2022-12-06 13:04

from django.db import migrations, models
import django.db.models.deletion
import laboratory.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('patient', '0005_address_location'),
    ]

    operations = [
        migrations.CreateModel(
            name='LaboratoryPrescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('description', models.TextField()),
                ('code', models.CharField(max_length=40)),
                ('status', models.CharField(choices=[('waiting_for_response', 'Waiting for response'), ('waiting_for_payment', 'Waiting for payment'), ('waiting_for_test', 'Waiting for test'), ('result', 'Result'), ('canceled', 'Canceled')], default='waiting_for_response', max_length=30)),
                ('address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='patient.address')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='patient.patient')),
            ],
        ),
        migrations.CreateModel(
            name='PatientPrescriptionPic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=laboratory.models.img_upload_path_generator)),
                ('prescription', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laboratory.laboratoryprescription')),
            ],
        ),
    ]
