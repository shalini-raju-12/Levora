from database.db import supabase


class PayrollService:

    @staticmethod
    def get_all_payroll(month=None, year=None, employee_id=None):
        try:
            query = supabase.table("payroll").select("*")
            if month:
                query = query.eq("pay_month", month)
            if year:
                query = query.like("pay_month", f"{year}-%")
            if employee_id:
                query = query.eq("employee_id", employee_id)
            response = query.execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching payroll: {str(e)}")

    @staticmethod
    def create_payroll(data):
        try:
            response = supabase.table("payroll").insert(data).execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error creating payroll: {str(e)}")

    @staticmethod
    def update_payroll(payroll_id, data):
        try:
            response = (
                supabase.table("payroll")
                .update(data)
                .eq("id", payroll_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error updating payroll: {str(e)}")

    @staticmethod
    def delete_payroll(payroll_id):
        try:
            response = (
                supabase.table("payroll")
                .delete()
                .eq("id", payroll_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error deleting payroll: {str(e)}")

    @staticmethod
    def get_payroll_by_id(payroll_id):
        try:
            response = (
                supabase.table("payroll")
                .select("*")
                .eq("id", payroll_id)
                .execute()
            )
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching payroll: {str(e)}")
