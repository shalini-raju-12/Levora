from flask import Blueprint, jsonify, request
from services.auth_service import AuthService

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/auth/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "status": "error",
                "message": "No data provided"
            }), 400
        
        email = data.get("email")
        password = data.get("password")
        
        if not email:
            return jsonify({
                "status": "error",
                "message": "Email is required"
            }), 400
        
        if not password:
            return jsonify({
                "status": "error",
                "message": "Password is required"
            }), 400
        
        result = AuthService.signup(email, password)
        
        if not result.get("success"):
            return jsonify({
                "status": "error",
                "message": result.get("message")
            }), 400
        
        return jsonify({
            "status": "success",
            "message": result.get("message"),
            "data": result.get("data")
        }), 201
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@auth_bp.route("/auth/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "status": "error",
                "message": "No data provided"
            }), 400
        
        email = data.get("email")
        password = data.get("password")
        
        if not email:
            return jsonify({
                "status": "error",
                "message": "Email is required"
            }), 400
        
        if not password:
            return jsonify({
                "status": "error",
                "message": "Password is required"
            }), 400
        
        result = AuthService.login(email, password)
        
        if not result.get("success"):
            return jsonify({
                "status": "error",
                "message": result.get("message")
            }), 401
        
        return jsonify({
            "status": "success",
            "message": result.get("message"),
            "data": result.get("data")
        }), 200
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
