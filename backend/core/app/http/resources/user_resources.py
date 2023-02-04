from rest_framework.serializers import ModelSerializer

from core.models import (
    User,
    QuestionnaireTeacher,
    TeacherProfileDB,
    UserBillingInfoEU,
)


class QuestionnaireTeacherResource(ModelSerializer):
    class Meta:
        model = QuestionnaireTeacher
        fields = [
            "id",
            "name",
            "surname",
            "date_of_birth",
            "gender",
            "about_me",
            "work_experience",
            "vk_link",
            "telegram_link",
        ]


class UserBillingInfoResource(ModelSerializer):
    class Meta:
        model = UserBillingInfoEU
        fields = [
            "id",
            "organization",
            "bank",
            "organization_address",
            "inn",
            "correspondent_account",
            "prc",
            "bic",
            "account_number",
        ]


class TeacherPrivateProfileResource(ModelSerializer):
    questionnaire = QuestionnaireTeacherResource()
    billing_info = UserBillingInfoResource()

    class Meta:
        model = TeacherProfileDB
        fields = ["id", "questionnaire", "billing_info"]


class TeacherPublicProfileResource(ModelSerializer):
    questionnaire = QuestionnaireTeacherResource()

    class Meta:
        model = TeacherProfileDB
        fields = ["id", "questionnaire"]


class UserDetailedProfile(ModelSerializer):
    public_teacher_profiles = TeacherPrivateProfileResource(many=True, allow_null=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "about",
            "avatar",
            "public_teacher_profiles",
        ]


class UserResource(ModelSerializer):
    public_teacher_profiles = TeacherPublicProfileResource(many=True, allow_null=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "about",
            "avatar",
            "public_teacher_profiles",
        ]
