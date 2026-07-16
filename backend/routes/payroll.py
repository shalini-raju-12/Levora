from flask import Blueprint, jsonify, request
from services.payroll_service import PayrollService

payroll_bp = Blueprint("payroll", __name__)


@payroll_bp.route("/payroll", methods=["GET"])
def get_payroll():
    payroll = PayrollService.get_all_payroll()
    return jsonify(payroll)


@payroll_bp.route("/payroll", methods=["POST"])
def create_payroll():
    data = request.get_json()
    payroll = PayrollService.create_payroll(data)
    return jsonify(payroll), 201


@payroll_bp.route("/payroll/<payroll_id>", methods=["GET"])
def get_payroll_record(payroll_id):
    payroll = PayrollService.get_payroll_by_id(payroll_id)
    return jsonify(payroll)


@payroll_bp.route("/payroll/<payroll_id>", methods=["PUT"])
def update_payroll(payroll_id):
    data = request.get_json()
    payroll = PayrollService.update_payroll(payroll_id, data)
    return jsonify(payroll)


@payroll_bp.route("/payroll/<payroll_id>", methods=["DELETE"])
def delete_payroll(payroll_id):
    payroll = PayrollService.delete_payroll(payroll_id)
    return jsonify(payroll)
