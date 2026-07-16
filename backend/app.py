from flask import Flask
from flask_cors import CORS
from config import Config
from database.db import supabase
from routes.employee import employee_bp
from routes.department import department_bp
from routes.leave import leave_bp
from routes.attendance import attendance_bp
from routes.payroll import payroll_bp

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)
app.register_blueprint(employee_bp)
app.register_blueprint(department_bp)
app.register_blueprint(leave_bp)
app.register_blueprint(attendance_bp)
app.register_blueprint(payroll_bp)


@app.route("/")
def home():
    return {
        "message": "Levora Backend Server Running...",
        "status": "success"
    }


@app.route("/test-db")
def test_db():
    try:
        return {
            "status": "success",
            "message": "Supabase Connected Successfully"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }, 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=app.config["DEBUG"]
    )