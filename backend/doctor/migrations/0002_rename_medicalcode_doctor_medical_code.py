# Generated by Django 4.1 on 2022-10-04 09:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('doctor', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='doctor',
            old_name='medicalCode',
            new_name='medical_code',
        ),
    ]