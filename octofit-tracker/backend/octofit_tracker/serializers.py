from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout

class UserSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = User
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Team
        fields = '__all__'
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Members is already a list from MongoDB, just pass it through
        if isinstance(instance.members, list):
            ret['members'] = instance.members
        return ret

class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Activity
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Leaderboard
        fields = '__all__'

class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Workout
        fields = '__all__'
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Exercises is already a list from MongoDB, just pass it through
        if isinstance(instance.exercises, list):
            ret['exercises'] = instance.exercises
        return ret
