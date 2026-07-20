from flask import Blueprint, jsonify, request
from services.leave_service import LeaveService

leave_bp = Blueprint("leave", __name__)


@leave_bp.route("/leaves", methods=["GET"])
def get_leaves():
    try:
        status = request.args.get("status")
        employee_id = request.args.get("employee_id")
        leaves = LeaveService.get_all_leaves(status=status, employee_id=employee_id)
        return jsonify({
            "status": "success",
            "count": len(leaves),
            "data": leaves
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@leave_bp.route("/leaves", methods=["POST"])
def create_leave():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        leave = LeaveService.create_leave(data)
        return jsonify({
            "status": "success",
            "message": "Leave created successfully",
            "data": leave
        }), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@leave_bp.route("/leaves/<leave_id>", methods=["GET"])
def get_leave(leave_id):
    try:
        leave = LeaveService.get_leave_by_id(leave_id)
        if not leave:
            return jsonify({"status": "error", "message": "Leave not found"}), 404
        return jsonify({
            "status": "success",
            "data": leave
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@leave_bp.route("/leaves/<leave_id>", methods=["PUT"])
def update_leave(leave_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        leave = LeaveService.update_leave(leave_id, data)
        if not leave:
            return jsonify({"status": "error", "message": "Leave not found"}), 404
        return jsonify({
            "status": "success",
            "message": "Leave updated successfully",
            "data": leave
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@leave_bp.route("/leaves/<leave_id>", methods=["DELETE"])
def delete_leave(leave_id):
    try:
        leave = LeaveService.delete_leave(leave_id)
        if not leave:
            return jsonify({"status": "error", "message": "Leave not found"}), 404
        return jsonify({
            "status": "success",
            "message": "Leave deleted successfully"
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
