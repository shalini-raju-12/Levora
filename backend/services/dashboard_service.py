from database.db import supabase
from datetime import date


class DashboardService:

    @staticmethod
    def get_dashboard_stats():
        try:
            # Total employees
            employees_response = supabase.table("employees").select("id").execute()
            total_employees = len(employees_response.data)

            # Total departments
            departments_response = supabase.table("departments").select("id").execute()
            total_departments = len(departments_response.data)

            # Today's attendance
            today = date.today().isoformat()
            print(f"DEBUG: Today's date (ISO): {today}")
            attendance_response = (
                supabase.table("attendance")
                .select("*")
                .eq("attendance_date", today)
                .execute()
            )
            attendance_data = attendance_response.data
            print(f"DEBUG: Attendance data for today: {attendance_data}")
            print(f"DEBUG: Attendance data length: {len(attendance_data)}")
            total_attendance_today = len(attendance_data)

            # Present and Absent today
            present_today = len([a for a in attendance_data if a.get("status") == "Present"])
            absent_today = len([a for a in attendance_data if a.get("status") == "Absent"])
            print(f"DEBUG: Present today: {present_today}, Absent today: {absent_today}")

            # Leave statistics
            leaves_response = supabase.table("leaves").select("*").execute()
            leaves_data = leaves_response.data
            pending_leaves = len([l for l in leaves_data if l.get("status") == "Pending"])
            approved_leaves = len([l for l in leaves_data if l.get("status") == "Approved"])

            # Paid payrolls
            payroll_response = supabase.table("payroll").select("*").execute()
            paid_payrolls = len(payroll_response.data)

            return {
                "total_employees": total_employees,
                "total_departments": total_departments,
                "total_attendance_today": total_attendance_today,
                "present_today": present_today,
                "absent_today": absent_today,
                "pending_leaves": pending_leaves,
                "approved_leaves": approved_leaves,
                "paid_payrolls": paid_payrolls
            }
        except Exception as e:
            raise Exception(f"Error fetching dashboard statistics: {str(e)}")
