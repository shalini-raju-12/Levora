from database.db import supabase


class EmployeeService:

    @staticmethod
    def get_all_employees():
        response = supabase.table("employees").select("*").execute()
        return response.data

    @staticmethod
    def create_employee(data):
        response = supabase.table("employees").insert(data).execute()
        return response.data

    @staticmethod
    def update_employee(employee_id, data):
        response = (
            supabase.table("employees")
            .update(data)
            .eq("id", employee_id)
            .execute()
        )
        return response.data

    @staticmethod
    def delete_employee(employee_id):
        response = (
            supabase.table("employees")
            .delete()
            .eq("id", employee_id)
            .execute()
        )
        return response.data

    @staticmethod
    def get_employee_by_id(employee_id):
        response = (
            supabase.table("employees")
            .select("*")
            .eq("id", employee_id)
            .execute()
        )
        return response.data