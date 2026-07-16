from database.db import supabase


class AttendanceService:

    @staticmethod
    def get_all_attendance():
        response = supabase.table("attendance").select("*").execute()
        return response.data

    @staticmethod
    def create_attendance(data):
        response = supabase.table("attendance").insert(data).execute()
        return response.data

    @staticmethod
    def update_attendance(attendance_id, data):
        response = (
            supabase.table("attendance")
            .update(data)
            .eq("id", attendance_id)
            .execute()
        )
        return response.data

    @staticmethod
    def delete_attendance(attendance_id):
        response = (
            supabase.table("attendance")
            .delete()
            .eq("id", attendance_id)
            .execute()
        )
        return response.data

    @staticmethod
    def get_attendance_by_id(attendance_id):
        response = (
            supabase.table("attendance")
            .select("*")
            .eq("id", attendance_id)
            .execute()
        )
        return response.data
