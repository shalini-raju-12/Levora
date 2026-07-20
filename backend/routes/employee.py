from flask import Blueprint, jsonify, request
from services.employee_service import EmployeeService

employee_bp = Blueprint("employee", __name__)


@employee_bp.route("/employees", methods=["GET"])
def get_employees():
    try:
        search = request.args.get("search")
        result = EmployeeService.get_all_employees(search=search)
        employees = result.get("data", []) if isinstance(result, dict) else result
        return jsonify({
            "status": "success",
            "count": len(employees),
            "data": employees
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@employee_bp.route("/employees", methods=["POST"])
def create_employee():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        result = EmployeeService.create_employee(data)
        if not result.get("success"):
            return jsonify({"status": "error", "message": result.get("message")}), 400
        employee = result.get("data")
        return jsonify({
            "status": "success",
            "message": "Employee created successfully",
            "data": employee
        }), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@employee_bp.route("/employees/<employee_id>", methods=["GET"])
def get_employee(employee_id):
    try:
        result = EmployeeService.get_employee_by_id(employee_id)
        if not result.get("success"):
            return jsonify({"status": "error", "message": result.get("message")}), 404
        employee = result.get("data")
        return jsonify({
            "status": "success",
            "data": employee
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@employee_bp.route("/employees/<employee_id>", methods=["PUT"])
def update_employee(employee_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        result = EmployeeService.update_employee(employee_id, data)
        if not result.get("success"):
            return jsonify({"status": "error", "message": result.get("message")}), 404
        employee = result.get("data")
        return jsonify({
            "status": "success",
            "message": "Employee updated successfully",
            "data": employee
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@employee_bp.route("/employees/<employee_id>", methods=["DELETE"])
def delete_employee(employee_id):
    try:
        result = EmployeeService.delete_employee(employee_id)
        if not result.get("success"):
            return jsonify({"status": "error", "message": result.get("message")}), 404
        return jsonify({
            "status": "success",
            "message": "Employee deleted successfully"
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500