from flask import Blueprint, jsonify, request
from services.leave_service import LeaveService

leave_bp = Blueprint("leave", __name__)


@leave_bp.route("/leaves", methods=["GET"])
def get_leaves():
    leaves = LeaveService.get_all_leaves()
    return jsonify(leaves)


@leave_bp.route("/leaves", methods=["POST"])
def create_leave():
    data = request.get_json()
    leave = LeaveService.create_leave(data)
    return jsonify(leave), 201


@leave_bp.route("/leaves/<leave_id>", methods=["GET"])
def get_leave(leave_id):
    leave = LeaveService.get_leave_by_id(leave_id)
    return jsonify(leave)


@leave_bp.route("/leaves/<leave_id>", methods=["PUT"])
def update_leave(leave_id):
    data = request.get_json()
    leave = LeaveService.update_leave(leave_id, data)
    return jsonify(leave)


@leave_bp.route("/leaves/<leave_id>", methods=["DELETE"])
def delete_leave(leave_id):
    leave = LeaveService.delete_leave(leave_id)
    return jsonify(leave)
