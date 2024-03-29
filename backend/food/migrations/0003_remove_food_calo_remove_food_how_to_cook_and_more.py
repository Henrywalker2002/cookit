# Generated by Django 4.2.2 on 2023-11-29 04:20

import base.custom_middleware
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('food', '0002_alter_food_calo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='food',
            name='calo',
        ),
        migrations.RemoveField(
            model_name='food',
            name='how_to_cook',
        ),
        migrations.RemoveField(
            model_name='food',
            name='ingredient',
        ),
        migrations.RemoveField(
            model_name='ingredient',
            name='img',
        ),
        migrations.RemoveField(
            model_name='ingredient',
            name='name',
        ),
        migrations.AddField(
            model_name='food',
            name='image',
            field=models.CharField(default='a', max_length=128),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ingredient',
            name='food',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='ingredients', to='food.food'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ingredient',
            name='orgin',
            field=models.CharField(default='a', max_length=128),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='food',
            name='description',
            field=models.TextField(),
        ),
        migrations.CreateModel(
            name='Nutrient',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=128)),
                ('amount', models.FloatField()),
                ('unit', models.CharField(max_length=128)),
                ('percentOFdailyNeeds', models.FloatField()),
                ('created_by', models.ForeignKey(default=base.custom_middleware.get_current_user, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_created_by', to=settings.AUTH_USER_MODEL)),
                ('food', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='nutrients', to='food.food')),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_updated_by', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='IntructionSetep',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('number', models.IntegerField()),
                ('step', models.TextField()),
                ('created_by', models.ForeignKey(default=base.custom_middleware.get_current_user, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_created_by', to=settings.AUTH_USER_MODEL)),
                ('food', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='intructions', to='food.food')),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_updated_by', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
