from flask import Blueprint, jsonify, request
from services.department_service import DepartmentService

department_bp = Blueprint("department", __name__)


@department_bp.route("/departments", methods=["GET"])
def get_departments():
    departments = DepartmentService.get_all_departments()
    return jsonify(departments)


@department_bp.route("/departments", methods=["POST"])
def create_department():
    data = request.get_json()
    department = DepartmentService.create_department(data)
    return jsonify(department), 201


@department_bp.route("/departments/<department_id>", methods=["GET"])
def get_department(department_id):
    department = DepartmentService.get_department_by_id(department_id)
    return jsonify(department)


@department_bp.route("/departments/<department_id>", methods=["PUT"])
def update_department(department_id):
    data = request.get_json()
    department = DepartmentService.update_department(department_id, data)
    return jsonify(department)


@department_bp.route("/departments/<department_id>", methods=["DELETE"])
def delete_department(department_id):
    department = DepartmentService.delete_department(department_id)
    return jsonify(department)
