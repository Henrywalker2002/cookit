# Generated by Django 4.2.2 on 2023-11-29 04:22

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('food', '0003_remove_food_calo_remove_food_how_to_cook_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='IntructionSetep',
            new_name='IntructionStep',
        ),
    ]
