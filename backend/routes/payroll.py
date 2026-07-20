from flask import Blueprint, jsonify, request
from services.payroll_service import PayrollService

payroll_bp = Blueprint("payroll", __name__)


@payroll_bp.route("/payroll", methods=["GET"])
def get_payroll():
    try:
        month = request.args.get("month")
        year = request.args.get("year")
        employee_id = request.args.get("employee_id")
        payroll = PayrollService.get_all_payroll(
            month=month, year=year, employee_id=employee_id
        )
        return jsonify({
            "status": "success",
            "count": len(payroll),
            "data": payroll
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@payroll_bp.route("/payroll", methods=["POST"])
def create_payroll():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        payroll = PayrollService.create_payroll(data)
        return jsonify({
            "status": "success",
            "message": "Payroll created successfully",
            "data": payroll
        }), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@payroll_bp.route("/payroll/<payroll_id>", methods=["GET"])
def get_payroll_record(payroll_id):
    try:
        payroll = PayrollService.get_payroll_by_id(payroll_id)
        if not payroll:
            return jsonify({"status": "error", "message": "Payroll record not found"}), 404
        return jsonify({
            "status": "success",
            "data": payroll
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@payroll_bp.route("/payroll/<payroll_id>", methods=["PUT"])
def update_payroll(payroll_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        payroll = PayrollService.update_payroll(payroll_id, data)
        if not payroll:
            return jsonify({"status": "error", "message": "Payroll record not found"}), 404
        return jsonify({
            "status": "success",
            "message": "Payroll updated successfully",
            "data": payroll
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@payroll_bp.route("/payroll/<payroll_id>", methods=["DELETE"])
def delete_payroll(payroll_id):
    try:
        payroll = PayrollService.delete_payroll(payroll_id)
        if not payroll:
            return jsonify({"status": "error", "message": "Payroll record not found"}), 404
        return jsonify({
            "status": "success",
            "message": "Payroll deleted successfully"
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
