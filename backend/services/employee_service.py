from database.db import supabase


class EmployeeService:

    @staticmethod
    def get_all_employees(search=None):
        try:
            query = supabase.table("employees").select("*")
            if search:
                # Search by first_name, last_name, email, phone, employee_id
                query = query.or_(f"first_name.ilike.%{search}%,last_name.ilike.%{search}%,email.ilike.%{search}%,phone.ilike.%{search}%,employee_id.ilike.%{search}%")
            response = query.execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching employees: {str(e)}")

    @staticmethod
    def create_employee(data):
        try:
            response = supabase.table("employees").insert(data).execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error creating employee: {str(e)}")

    @staticmethod
    def update_employee(employee_id, data):
        try:
            response = (
                supabase.table("employees")
                .update(data)
                .eq("id", employee_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error updating employee: {str(e)}")

    @staticmethod
    def delete_employee(employee_id):
        try:
            response = (
                supabase.table("employees")
                .delete()
                .eq("id", employee_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error deleting employee: {str(e)}")

    @staticmethod
    def get_employee_by_id(employee_id):
        try:
            response = (
                supabase.table("employees")
                .select("*")
                .eq("id", employee_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching employee: {str(e)}")