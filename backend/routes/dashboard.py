from flask import Blueprint, jsonify
from services.dashboard_service import DashboardService

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
def get_dashboard():
    try:
        stats = DashboardService.get_dashboard_stats()
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
