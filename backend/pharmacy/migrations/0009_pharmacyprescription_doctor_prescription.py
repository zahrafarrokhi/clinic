# Generated by Django 4.1 on 2022-12-14 17:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('visit', '0004_doctorprescription_doctorpic'),
        ('pharmacy', '0008_pharmacypayment_alter_pharmacyprescription_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='pharmacyprescription',
            name='doctor_prescription',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='visit.doctorprescription'),
        ),
    ]