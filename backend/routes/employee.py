from flask import Blueprint, jsonify, request
from services.employee_service import EmployeeService

employee_bp = Blueprint("employee", __name__)


@employee_bp.route("/employees", methods=["GET"])
def get_employees():
    try:
        search = request.args.get("search")
        employees = EmployeeService.get_all_employees(search=search)
        return jsonify(employees), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@employee_bp.route("/employees", methods=["POST"])
def create_employee():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        employee = EmployeeService.create_employee(data)
        return jsonify(employee), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@employee_bp.route("/employees/<employee_id>", methods=["GET"])
def get_employee(employee_id):
    try:
        employee = EmployeeService.get_employee_by_id(employee_id)
        if not employee:
            return jsonify({"status": "error", "message": "Employee not found"}), 404
        return jsonify(employee), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@employee_bp.route("/employees/<employee_id>", methods=["PUT"])
def update_employee(employee_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        employee = EmployeeService.update_employee(employee_id, data)
        if not employee:
            return jsonify({"status": "error", "message": "Employee not found"}), 404
        return jsonify(employee), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@employee_bp.route("/employees/<employee_id>", methods=["DELETE"])
def delete_employee(employee_id):
    try:
        employee = EmployeeService.delete_employee(employee_id)
        if not employee:
            return jsonify({"status": "error", "message": "Employee not found"}), 404
        return jsonify(employee), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500