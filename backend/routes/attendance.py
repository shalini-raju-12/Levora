from flask import Blueprint, jsonify, request
from services.attendance_service import AttendanceService

attendance_bp = Blueprint("attendance", __name__)


@attendance_bp.route("/attendance", methods=["GET"])
def get_attendance():
    try:
        date = request.args.get("date")
        employee_id = request.args.get("employee_id")
        status = request.args.get("status")
        attendance = AttendanceService.get_all_attendance(
            date=date, employee_id=employee_id, status=status
        )
        return jsonify(attendance), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@attendance_bp.route("/attendance", methods=["POST"])
def create_attendance():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        attendance = AttendanceService.create_attendance(data)
        return jsonify(attendance), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@attendance_bp.route("/attendance/<attendance_id>", methods=["GET"])
def get_attendance_record(attendance_id):
    try:
        attendance = AttendanceService.get_attendance_by_id(attendance_id)
        if not attendance:
            return jsonify({"status": "error", "message": "Attendance record not found"}), 404
        return jsonify(attendance), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@attendance_bp.route("/attendance/<attendance_id>", methods=["PUT"])
def update_attendance(attendance_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        attendance = AttendanceService.update_attendance(attendance_id, data)
        if not attendance:
            return jsonify({"status": "error", "message": "Attendance record not found"}), 404
        return jsonify(attendance), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@attendance_bp.route("/attendance/<attendance_id>", methods=["DELETE"])
def delete_attendance(attendance_id):
    try:
        attendance = AttendanceService.delete_attendance(attendance_id)
        if not attendance:
            return jsonify({"status": "error", "message": "Attendance record not found"}), 404
        return jsonify(attendance), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
