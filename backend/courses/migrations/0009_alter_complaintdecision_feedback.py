# Generated by Django 4.1.6 on 2023-02-12 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("courses", "0008_merge_20230211_2055"),
    ]

    operations = [
        migrations.AlterField(
            model_name="complaintdecision",
            name="feedback",
            field=models.BooleanField(default=False),
        ),
    ]
