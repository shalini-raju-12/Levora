from flask import Blueprint, jsonify, request
from services.attendance_service import AttendanceService

attendance_bp = Blueprint("attendance", __name__)


@attendance_bp.route("/attendance", methods=["GET"])
def get_attendance():
    attendance = AttendanceService.get_all_attendance()
    return jsonify(attendance)


@attendance_bp.route("/attendance", methods=["POST"])
def create_attendance():
    data = request.get_json()
    attendance = AttendanceService.create_attendance(data)
    return jsonify(attendance), 201


@attendance_bp.route("/attendance/<attendance_id>", methods=["GET"])
def get_attendance_record(attendance_id):
    attendance = AttendanceService.get_attendance_by_id(attendance_id)
    return jsonify(attendance)


@attendance_bp.route("/attendance/<attendance_id>", methods=["PUT"])
def update_attendance(attendance_id):
    data = request.get_json()
    attendance = AttendanceService.update_attendance(attendance_id, data)
    return jsonify(attendance)


@attendance_bp.route("/attendance/<attendance_id>", methods=["DELETE"])
def delete_attendance(attendance_id):
    attendance = AttendanceService.delete_attendance(attendance_id)
    return jsonify(attendance)
