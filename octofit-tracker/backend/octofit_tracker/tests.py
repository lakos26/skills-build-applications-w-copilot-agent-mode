from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class BasicModelTest(TestCase):
    def test_user_creation(self):
        user = User.objects.create(name='Test', email='test@example.com', team='Testers', role='Tester')
        self.assertEqual(user.email, 'test@example.com')

    def test_team_creation(self):
        team = Team.objects.create(name='Testers', description='Test team')
        self.assertEqual(team.name, 'Testers')

    def test_activity_creation(self):
        activity = Activity.objects.create(user_email='test@example.com', user_name='Test', activity_type='Running', duration_minutes=30, calories_burned=200, distance_km=5.0, date='2026-01-01T00:00:00Z')
        self.assertEqual(activity.activity_type, 'Running')

    def test_leaderboard_creation(self):
        lb = Leaderboard.objects.create(user_email='test@example.com', user_name='Test', team='Testers', total_calories=1000, total_distance=10.0, total_duration=60, total_workouts=1, rank=1, last_updated='2026-01-01T00:00:00Z')
        self.assertEqual(lb.rank, 1)

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Test Workout', description='Test', category='Strength', difficulty='Easy', duration_minutes=30, calories_estimate=200, exercises=['Push-ups'])
        self.assertEqual(workout.name, 'Test Workout')
