# Generated by Django 4.1 on 2022-10-17 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctor', '0003_department_icon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='department',
            name='icon',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
