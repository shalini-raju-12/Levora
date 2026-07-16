from database.db import supabase


class PayrollService:

    @staticmethod
    def get_all_payroll():
        response = supabase.table("payroll").select("*").execute()
        return response.data

    @staticmethod
    def create_payroll(data):
        response = supabase.table("payroll").insert(data).execute()
        return response.data

    @staticmethod
    def update_payroll(payroll_id, data):
        response = (
            supabase.table("payroll")
            .update(data)
            .eq("id", payroll_id)
            .execute()
        )
        return response.data

    @staticmethod
    def delete_payroll(payroll_id):
        response = (
            supabase.table("payroll")
            .delete()
            .eq("id", payroll_id)
            .execute()
        )
        return response.data

    @staticmethod
    def get_payroll_by_id(payroll_id):
        response = (
            supabase.table("payroll")
            .select("*")
            .eq("id", payroll_id)
            .execute()
        )
        return response.data
