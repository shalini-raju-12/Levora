import logging
import traceback
from flask import Blueprint, jsonify, request
from services.auth_service import AuthService

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/auth/signup", methods=["POST"])
def signup():
    try:
        logger.info("Signup request received")
        
        data = request.get_json()
        logger.info(f"Request data: {data}")
        
        if not data:
            return jsonify({
                "status": "error",
                "message": "No data provided"
            }), 400
        
        email = data.get("email")
        password = data.get("password")
        
        logger.info(f"Email received: {email}")
        
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
        
        logger.info("Before calling AuthService.signup()")
        result = AuthService.signup(email, password)
        logger.info(f"After AuthService.signup() returns: {result}")
        
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
        logger.error(f"Exception in signup: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@auth_bp.route("/auth/login", methods=["POST"])
def login():
    try:
        logger.info("Login request received")
        
        data = request.get_json()
        logger.info(f"Request data: {data}")
        
        if not data:
            return jsonify({
                "status": "error",
                "message": "No data provided"
            }), 400
        
        email = data.get("email")
        password = data.get("password")
        
        logger.info(f"Email received: {email}")
        
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
        
        logger.info("Before calling AuthService.login()")
        result = AuthService.login(email, password)
        logger.info(f"After AuthService.login() returns: {result}")
        
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
        logger.error(f"Exception in login: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
