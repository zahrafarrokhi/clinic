# Generated by Django 4.1 on 2022-12-05 12:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0005_alter_payment_description'),
        ('pharmacy', '0007_pharmacyprescription_payment'),
    ]

    operations = [
        migrations.CreateModel(
            name='PharmacyPayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.AlterField(
            model_name='pharmacyprescription',
            name='payment',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pharmacy_prescription', to='payment.payment'),
        ),
    ]
