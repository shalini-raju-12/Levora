from flask import Blueprint, jsonify, request
from services.reports_service import ReportsService

reports_bp = Blueprint("reports", __name__)


@reports_bp.route("/reports/attendance", methods=["GET"])
def get_attendance_report():
    try:
        month = request.args.get("month")
        year = request.args.get("year")
        
        attendance_data = ReportsService.get_attendance_report(
            month=month, year=year
        )
        
        return jsonify({
            "status": "success",
            "count": len(attendance_data),
            "data": attendance_data
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@reports_bp.route("/reports/leaves", methods=["GET"])
def get_leave_report():
    try:
        month = request.args.get("month")
        year = request.args.get("year")
        
        leave_data = ReportsService.get_leave_report(
            month=month, year=year
        )
        
        return jsonify({
            "status": "success",
            "count": len(leave_data),
            "data": leave_data
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@reports_bp.route("/reports/payroll", methods=["GET"])
def get_payroll_report():
    try:
        month = request.args.get("month")
        year = request.args.get("year")
        
        payroll_data = ReportsService.get_payroll_report(
            month=month, year=year
        )
        
        return jsonify({
            "status": "success",
            "count": len(payroll_data),
            "data": payroll_data
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
