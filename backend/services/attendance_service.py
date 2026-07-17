from database.db import supabase


class AttendanceService:

    @staticmethod
    def get_all_attendance(date=None, employee_id=None, status=None):
        try:
            query = supabase.table("attendance").select("*")
            if date:
                query = query.eq("attendance_date", date)
            if employee_id:
                query = query.eq("employee_id", employee_id)
            if status:
                query = query.eq("status", status)
            response = query.execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching attendance: {str(e)}")

    @staticmethod
    def create_attendance(data):
        try:
            response = supabase.table("attendance").insert(data).execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error creating attendance: {str(e)}")

    @staticmethod
    def update_attendance(attendance_id, data):
        try:
            response = (
                supabase.table("attendance")
                .update(data)
                .eq("id", attendance_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error updating attendance: {str(e)}")

    @staticmethod
    def delete_attendance(attendance_id):
        try:
            response = (
                supabase.table("attendance")
                .delete()
                .eq("id", attendance_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error deleting attendance: {str(e)}")

    @staticmethod
    def get_attendance_by_id(attendance_id):
        try:
            response = (
                supabase.table("attendance")
                .select("*")
                .eq("id", attendance_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching attendance: {str(e)}")
