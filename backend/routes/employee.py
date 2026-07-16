from flask import Blueprint, jsonify, request
from services.employee_service import EmployeeService

employee_bp = Blueprint("employee", __name__)


@employee_bp.route("/employees", methods=["GET"])
def get_employees():
    employees = EmployeeService.get_all_employees()
    return jsonify(employees)


@employee_bp.route("/employees", methods=["POST"])
def create_employee():
    data = request.get_json()
    employee = EmployeeService.create_employee(data)
    return jsonify(employee), 201


@employee_bp.route("/employees/<employee_id>", methods=["GET"])
def get_employee(employee_id):
    employee = EmployeeService.get_employee_by_id(employee_id)
    return jsonify(employee)


@employee_bp.route("/employees/<employee_id>", methods=["PUT"])
def update_employee(employee_id):
    data = request.get_json()
    employee = EmployeeService.update_employee(employee_id, data)
    return jsonify(employee)


@employee_bp.route("/employees/<employee_id>", methods=["DELETE"])
def delete_employee(employee_id):
    employee = EmployeeService.delete_employee(employee_id)
    return jsonify(employee)