from database.db import supabase


class LeaveService:

    @staticmethod
    def get_all_leaves():
        response = supabase.table("leaves").select("*").execute()
        return response.data

    @staticmethod
    def create_leave(data):
        response = supabase.table("leaves").insert(data).execute()
        return response.data

    @staticmethod
    def update_leave(leave_id, data):
        response = (
            supabase.table("leaves")
            .update(data)
            .eq("id", leave_id)
            .execute()
        )
        return response.data

    @staticmethod
    def delete_leave(leave_id):
        response = (
            supabase.table("leaves")
            .delete()
            .eq("id", leave_id)
            .execute()
        )
        return response.data

    @staticmethod
    def get_leave_by_id(leave_id):
        response = (
            supabase.table("leaves")
            .select("*")
            .eq("id", leave_id)
            .execute()
        )
        return response.data
