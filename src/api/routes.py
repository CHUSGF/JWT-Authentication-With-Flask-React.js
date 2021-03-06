"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email=email, password=password).first()
    
    if not user:
        return jsonify({"message": "El usuario no fue encontrado"}), 401

    token = create_access_token(identity=user.id)

    data_response = {
        "token": token,
        "email": user.email,
        "user_id": user.id
    }
    return jsonify(data_response), 200
    
@api.route('/register', methods=['POST'])
def handle_register():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User(email = email, password = password, is_active = True)
    db.session.add(user)
    db.session.commit()
    token = create_access_token(identity=user.id)
    return jsonify({"token": token}), 200

@api.route('/validate', methods=['GET'])
@jwt_required()
def handle_validate():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user: 
        return jsonify({"validate" : True}), 200
    else:
        return jsonify({"validate" : False}), 400
@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

