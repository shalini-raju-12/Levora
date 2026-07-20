from flask import Blueprint, jsonify, request
from services.department_service import DepartmentService

department_bp = Blueprint("department", __name__)


@department_bp.route("/departments", methods=["GET"])
def get_departments():
    try:
        departments = DepartmentService.get_all_departments()
        return jsonify({
            "status": "success",
            "count": len(departments),
            "data": departments
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@department_bp.route("/departments", methods=["POST"])
def create_department():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        department = DepartmentService.create_department(data)
        return jsonify({
            "status": "success",
            "message": "Department created successfully",
            "data": department
        }), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@department_bp.route("/departments/<department_id>", methods=["GET"])
def get_department(department_id):
    try:
        department = DepartmentService.get_department_by_id(department_id)
        if not department:
            return jsonify({"status": "error", "message": "Department not found"}), 404
        return jsonify({
            "status": "success",
            "data": department
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@department_bp.route("/departments/<department_id>", methods=["PUT"])
def update_department(department_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        department = DepartmentService.update_department(department_id, data)
        if not department:
            return jsonify({"status": "error", "message": "Department not found"}), 404
        return jsonify({
            "status": "success",
            "message": "Department updated successfully",
            "data": department
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@department_bp.route("/departments/<department_id>", methods=["DELETE"])
def delete_department(department_id):
    try:
        department = DepartmentService.delete_department(department_id)
        if not department:
            return jsonify({"status": "error", "message": "Department not found"}), 404
        return jsonify({
            "status": "success",
            "message": "Department deleted successfully"
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
