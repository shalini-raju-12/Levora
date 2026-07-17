from database.db import supabase


class DepartmentService:

    @staticmethod
    def get_all_departments():
        try:
            response = supabase.table("departments").select("*").execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching departments: {str(e)}")

    @staticmethod
    def create_department(data):
        try:
            response = supabase.table("departments").insert(data).execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error creating department: {str(e)}")

    @staticmethod
    def update_department(department_id, data):
        try:
            response = (
                supabase.table("departments")
                .update(data)
                .eq("id", department_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error updating department: {str(e)}")

    @staticmethod
    def delete_department(department_id):
        try:
            response = (
                supabase.table("departments")
                .delete()
                .eq("id", department_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error deleting department: {str(e)}")

    @staticmethod
    def get_department_by_id(department_id):
        try:
            response = (
                supabase.table("departments")
                .select("*")
                .eq("id", department_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching department: {str(e)}")
