from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=50)
    role = models.CharField(max_length=50)
    
    class Meta:
        db_table = 'users'

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    members = models.TextField()  # Will be handled as list by serializer
    
    class Meta:
        db_table = 'teams'

class Activity(models.Model):
    user_email = models.EmailField()
    user_name = models.CharField(max_length=100)
    activity_type = models.CharField(max_length=50)
    duration_minutes = models.IntegerField()
    calories_burned = models.IntegerField()
    distance_km = models.FloatField()
    date = models.DateTimeField()
    notes = models.TextField(blank=True)
    
    class Meta:
        db_table = 'activities'

class Leaderboard(models.Model):
    user_email = models.EmailField()
    user_name = models.CharField(max_length=100)
    team = models.CharField(max_length=50)
    total_calories = models.IntegerField()
    total_distance = models.FloatField()
    total_duration = models.IntegerField()
    total_workouts = models.IntegerField()
    rank = models.IntegerField()
    last_updated = models.DateTimeField()
    
    class Meta:
        db_table = 'leaderboard'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50)
    difficulty = models.CharField(max_length=50)
    duration_minutes = models.IntegerField()
    calories_estimate = models.IntegerField()
    exercises = models.TextField()  # Will be handled as list by serializer
    
    class Meta:
        db_table = 'workouts'
