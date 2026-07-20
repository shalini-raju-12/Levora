from database.db import supabase


class EmployeeService:

    @staticmethod
    def get_all_employees(search=None):
        try:
            query = supabase.table("employees").select("*")

            if search:
                query = query.or_(
                    f"first_name.ilike.%{search}%,last_name.ilike.%{search}%,email.ilike.%{search}%,phone.ilike.%{search}%,employee_id.ilike.%{search}%"
                )

            response = query.execute()

            return {
                "success": True,
                "message": "Employees fetched successfully",
                "data": response.data
            }

        except Exception as e:
            return {
                "success": False,
                "message": f"Error fetching employees: {str(e)}"
            }

    @staticmethod
    def create_employee(data):
        try:
            # Required field validation
            if not data.get("first_name"):
                return {
                    "success": False,
                    "message": "First name is required"
                }

            if not data.get("last_name"):
                return {
                    "success": False,
                    "message": "Last name is required"
                }

            if not data.get("email"):
                return {
                    "success": False,
                    "message": "Email is required"
                }

            if not data.get("department_id"):
                return {
                    "success": False,
                    "message": "Department is required"
                }

            # Duplicate email check
            existing = (
                supabase.table("employees")
                .select("id")
                .eq("email", data["email"])
                .execute()
            )

            if existing.data:
                return {
                    "success": False,
                    "message": "Email already exists"
                }

            response = (
                supabase.table("employees")
                .insert(data)
                .execute()
            )

            return {
                "success": True,
                "message": "Employee created successfully",
                "data": response.data
            }

        except Exception as e:
            return {
                "success": False,
                "message": f"Error creating employee: {str(e)}"
            }

    @staticmethod
    def update_employee(employee_id, data):
        try:
            response = (
                supabase.table("employees")
                .update(data)
                .eq("id", employee_id)
                .execute()
            )

            return {
                "success": True,
                "message": "Employee updated successfully",
                "data": response.data
            }

        except Exception as e:
            return {
                "success": False,
                "message": f"Error updating employee: {str(e)}"
            }

    @staticmethod
    def delete_employee(employee_id):
        try:
            response = (
                supabase.table("employees")
                .delete()
                .eq("id", employee_id)
                .execute()
            )

            return {
                "success": True,
                "message": "Employee deleted successfully",
                "data": response.data
            }

        except Exception as e:
            return {
                "success": False,
                "message": f"Error deleting employee: {str(e)}"
            }

    @staticmethod
    def get_employee_by_id(employee_id):
        try:
            response = (
                supabase.table("employees")
                .select("*")
                .eq("id", employee_id)
                .execute()
            )

            if not response.data:
                return {
                    "success": False,
                    "message": "Employee not found"
                }

            return {
                "success": True,
                "message": "Employee fetched successfully",
                "data": response.data
            }

        except Exception as e:
            return {
                "success": False,
                "message": f"Error fetching employee: {str(e)}"
            }