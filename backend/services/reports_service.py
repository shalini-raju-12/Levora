from database.db import supabase
from datetime import datetime, timedelta
from calendar import monthrange


class ReportsService:

    @staticmethod
    def get_attendance_report(month=None, year=None):
        try:
            query = supabase.table("attendance").select(
                "employee_id",
                "attendance_date",
                "status",
                "check_in",
                "check_out",
                "work_hours"
            )
            
            if month and year:
                # Filter by specific month and year using date range
                month = int(month)
                year = int(year)
                first_day = datetime(year, month, 1).date()
                last_day = datetime(year, month, monthrange(year, month)[1]).date()
                query = query.gte("attendance_date", first_day.isoformat())
                query = query.lte("attendance_date", last_day.isoformat())
            elif year:
                # Filter by year only using date range
                year = int(year)
                first_day = datetime(year, 1, 1).date()
                last_day = datetime(year, 12, 31).date()
                query = query.gte("attendance_date", first_day.isoformat())
                query = query.lte("attendance_date", last_day.isoformat())
            
            response = query.execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching attendance report: {str(e)}")

    @staticmethod
    def get_leave_report(month=None, year=None):
        try:
            query = supabase.table("leaves").select(
                "employee_id",
                "leave_type",
                "start_date",
                "end_date",
                "status",
                "reason"
            )
            
            if month and year:
                # Filter by specific month and year using date range
                month = int(month)
                year = int(year)
                first_day = datetime(year, month, 1).date()
                last_day = datetime(year, month, monthrange(year, month)[1]).date()
                query = query.gte("start_date", first_day.isoformat())
                query = query.lte("start_date", last_day.isoformat())
            elif year:
                # Filter by year only using date range
                year = int(year)
                first_day = datetime(year, 1, 1).date()
                last_day = datetime(year, 12, 31).date()
                query = query.gte("start_date", first_day.isoformat())
                query = query.lte("start_date", last_day.isoformat())
            
            response = query.execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching leave report: {str(e)}")

    @staticmethod
    def get_payroll_report(month=None, year=None):
        try:
            query = supabase.table("payroll").select(
                "employee_id",
                "basic_salary",
                "allowance",
                "deduction",
                "net_salary",
                "pay_month",
                "pay_year",
                "payment_date",
                "status"
            )
            
            if month:
                query = query.eq("pay_month", month)
            if year:
                query = query.eq("pay_year", year)
            
            response = query.execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error fetching payroll report: {str(e)}")
