from database.db import supabase


class DepartmentService:

    @staticmethod
    def get_all_departments():
        response = supabase.table("departments").select("*").execute()
        return response.data

    @staticmethod
    def create_department(data):
        response = supabase.table("departments").insert(data).execute()
        return response.data

    @staticmethod
    def update_department(department_id, data):
        response = (
            supabase.table("departments")
            .update(data)
            .eq("id", department_id)
            .execute()
        )
        return response.data

    @staticmethod
    def delete_department(department_id):
        response = (
            supabase.table("departments")
            .delete()
            .eq("id", department_id)
            .execute()
        )
        return response.data

    @staticmethod
    def get_department_by_id(department_id):
        response = (
            supabase.table("departments")
            .select("*")
            .eq("id", department_id)
            .execute()
        )
        return response.data
