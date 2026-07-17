from database.db import supabase


class LeaveService:

    @staticmethod
    def get_all_leaves(status=None, employee_id=None):
        try:
            query = supabase.table("leaves").select("*")
            if status:
                query = query.eq("status", status)
            if employee_id:
                query = query.eq("employee_id", employee_id)
            response = query.execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching leaves: {str(e)}")

    @staticmethod
    def create_leave(data):
        try:
            response = supabase.table("leaves").insert(data).execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error creating leave: {str(e)}")

    @staticmethod
    def update_leave(leave_id, data):
        try:
            response = (
                supabase.table("leaves")
                .update(data)
                .eq("id", leave_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error updating leave: {str(e)}")

    @staticmethod
    def delete_leave(leave_id):
        try:
            response = (
                supabase.table("leaves")
                .delete()
                .eq("id", leave_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error deleting leave: {str(e)}")

    @staticmethod
    def get_leave_by_id(leave_id):
        try:
            response = (
                supabase.table("leaves")
                .select("*")
                .eq("id", leave_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching leave: {str(e)}")
