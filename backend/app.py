from flask import Flask
from flask_cors import CORS
from config import Config

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)


@app.route("/")
def home():
    return {
        "message": "Levora Backend Server Running...",
        "status": "success"
    }


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=app.config["DEBUG"]
    )