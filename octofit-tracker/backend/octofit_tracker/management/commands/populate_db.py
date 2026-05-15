from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from pymongo import MongoClient
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Clear existing data
        self.stdout.write('Clearing existing data...')
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Create unique index on email
        db.users.create_index('email', unique=True)

        # Create superhero users data
        superhero_users = [
            # Team Marvel
            {'name': 'Tony Stark', 'email': 'ironman@marvel.com', 'team': 'Team Marvel', 'role': 'Engineer'},
            {'name': 'Steve Rogers', 'email': 'captainamerica@marvel.com', 'team': 'Team Marvel', 'role': 'Leader'},
            {'name': 'Natasha Romanoff', 'email': 'blackwidow@marvel.com', 'team': 'Team Marvel', 'role': 'Spy'},
            {'name': 'Bruce Banner', 'email': 'hulk@marvel.com', 'team': 'Team Marvel', 'role': 'Scientist'},
            {'name': 'Thor Odinson', 'email': 'thor@marvel.com', 'team': 'Team Marvel', 'role': 'God of Thunder'},
            {'name': 'Peter Parker', 'email': 'spiderman@marvel.com', 'team': 'Team Marvel', 'role': 'Web-Slinger'},
            
            # Team DC
            {'name': 'Bruce Wayne', 'email': 'batman@dc.com', 'team': 'Team DC', 'role': 'Detective'},
            {'name': 'Clark Kent', 'email': 'superman@dc.com', 'team': 'Team DC', 'role': 'Reporter'},
            {'name': 'Diana Prince', 'email': 'wonderwoman@dc.com', 'team': 'Team DC', 'role': 'Ambassador'},
            {'name': 'Barry Allen', 'email': 'flash@dc.com', 'team': 'Team DC', 'role': 'Forensic Scientist'},
            {'name': 'Arthur Curry', 'email': 'aquaman@dc.com', 'team': 'Team DC', 'role': 'King of Atlantis'},
            {'name': 'Hal Jordan', 'email': 'greenlantern@dc.com', 'team': 'Team DC', 'role': 'Test Pilot'},
        ]

        # Insert users
        self.stdout.write('Creating superhero users...')
        user_ids = db.users.insert_many(superhero_users).inserted_ids
        self.stdout.write(self.style.SUCCESS(f'Created {len(user_ids)} users'))

        # Create teams
        self.stdout.write('Creating teams...')
        teams_data = [
            {
                'name': 'Team Marvel',
                'description': 'Earth\'s Mightiest Heroes',
                'created_date': datetime.now(),
                'members': [u['email'] for u in superhero_users if u['team'] == 'Team Marvel']
            },
            {
                'name': 'Team DC',
                'description': 'Justice League of America',
                'created_date': datetime.now(),
                'members': [u['email'] for u in superhero_users if u['team'] == 'Team DC']
            }
        ]
        team_ids = db.teams.insert_many(teams_data).inserted_ids
        self.stdout.write(self.style.SUCCESS(f'Created {len(team_ids)} teams'))

        # Create activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Boxing']
        activities = []
        
        for user in superhero_users:
            # Create 5-10 activities per user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity = {
                    'user_email': user['email'],
                    'user_name': user['name'],
                    'activity_type': random.choice(activity_types),
                    'duration_minutes': random.randint(20, 120),
                    'calories_burned': random.randint(100, 800),
                    'distance_km': round(random.uniform(1.0, 20.0), 2),
                    'date': datetime.now() - timedelta(days=random.randint(0, 30)),
                    'notes': f'Great workout session #{i+1}'
                }
                activities.append(activity)
        
        activity_ids = db.activities.insert_many(activities).inserted_ids
        self.stdout.write(self.style.SUCCESS(f'Created {len(activity_ids)} activities'))

        # Create leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        leaderboard_entries = []
        
        for user in superhero_users:
            user_activities = [a for a in activities if a['user_email'] == user['email']]
            total_calories = sum(a['calories_burned'] for a in user_activities)
            total_distance = sum(a['distance_km'] for a in user_activities)
            total_duration = sum(a['duration_minutes'] for a in user_activities)
            
            entry = {
                'user_email': user['email'],
                'user_name': user['name'],
                'team': user['team'],
                'total_calories': total_calories,
                'total_distance': round(total_distance, 2),
                'total_duration': total_duration,
                'total_workouts': len(user_activities),
                'rank': 0,  # Will be calculated based on total_calories
                'last_updated': datetime.now()
            }
            leaderboard_entries.append(entry)
        
        # Sort by total_calories and assign ranks
        leaderboard_entries.sort(key=lambda x: x['total_calories'], reverse=True)
        for idx, entry in enumerate(leaderboard_entries, 1):
            entry['rank'] = idx
        
        leaderboard_ids = db.leaderboard.insert_many(leaderboard_entries).inserted_ids
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_ids)} leaderboard entries'))

        # Create workout suggestions
        self.stdout.write('Creating workout suggestions...')
        workouts = [
            {
                'name': 'Super Soldier Training',
                'description': 'High-intensity interval training for peak performance',
                'category': 'Strength',
                'difficulty': 'Advanced',
                'duration_minutes': 45,
                'calories_estimate': 500,
                'exercises': ['Push-ups', 'Pull-ups', 'Squats', 'Burpees', 'Planks']
            },
            {
                'name': 'Speed Force Cardio',
                'description': 'Lightning-fast cardio workout to boost endurance',
                'category': 'Cardio',
                'difficulty': 'Intermediate',
                'duration_minutes': 30,
                'calories_estimate': 350,
                'exercises': ['Running', 'High Knees', 'Mountain Climbers', 'Jump Rope', 'Sprints']
            },
            {
                'name': 'Asgardian Strength',
                'description': 'Mythical strength training for ultimate power',
                'category': 'Strength',
                'difficulty': 'Advanced',
                'duration_minutes': 60,
                'calories_estimate': 600,
                'exercises': ['Deadlifts', 'Bench Press', 'Squats', 'Overhead Press', 'Rows']
            },
            {
                'name': 'Zen Warrior Yoga',
                'description': 'Find inner peace and flexibility',
                'category': 'Flexibility',
                'difficulty': 'Beginner',
                'duration_minutes': 40,
                'calories_estimate': 200,
                'exercises': ['Sun Salutation', 'Warrior Pose', 'Tree Pose', 'Child Pose', 'Meditation']
            },
            {
                'name': 'Atlantean Swimming',
                'description': 'Master the waters with aquatic training',
                'category': 'Cardio',
                'difficulty': 'Intermediate',
                'duration_minutes': 45,
                'calories_estimate': 400,
                'exercises': ['Freestyle', 'Butterfly', 'Backstroke', 'Breaststroke', 'Treading Water']
            },
            {
                'name': 'Dark Knight Combat',
                'description': 'Mixed martial arts and combat training',
                'category': 'Combat',
                'difficulty': 'Advanced',
                'duration_minutes': 50,
                'calories_estimate': 550,
                'exercises': ['Boxing', 'Kickboxing', 'Jiu-Jitsu', 'Shadow Boxing', 'Bag Work']
            }
        ]
        
        workout_ids = db.workouts.insert_many(workouts).inserted_ids
        self.stdout.write(self.style.SUCCESS(f'Created {len(workout_ids)} workout suggestions'))

        # Summary
        self.stdout.write(self.style.SUCCESS('\n' + '='*50))
        self.stdout.write(self.style.SUCCESS('Database population complete!'))
        self.stdout.write(self.style.SUCCESS('='*50))
        self.stdout.write(f'Users: {len(user_ids)}')
        self.stdout.write(f'Teams: {len(team_ids)}')
        self.stdout.write(f'Activities: {len(activity_ids)}')
        self.stdout.write(f'Leaderboard Entries: {len(leaderboard_ids)}')
        self.stdout.write(f'Workout Suggestions: {len(workout_ids)}')
