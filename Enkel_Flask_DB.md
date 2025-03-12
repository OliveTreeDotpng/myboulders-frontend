# Steg för Flask Databas

## Steg 1: app.py
Skapar en Flask-applikation och startar servern.

```python
from flask import Flask

app = Flask(__name__)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

## Steg 2: app.py - Test Route
Testar en enkel endpoint för att verifiera att servern fungerar.

```python
# test route för att se att endpoints funkar:

@app.route('/ping')
def ping():
    return 'Server is running'
```

## Steg 3: Skapa databas (config/db.py)
Skapar en fil för databasanslutning och hämtar databas-URI från en miljövariabel.

```python
import os
from flask_sqlalchemy import SQLAlchemy 
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()

def get_database_uri():
    return os.getenv("MYSQL_URL")
```

## Steg 4: app.py - Databas Konfiguration
Konfigurerar Flask att använda SQLAlchemy och initierar databasanslutningen.

```python
# Detta är standard för mongo DB

from config.db import db, get_database_uri
app.config['SQLALCHEMY_DATABASE_URI'] = get_database_uri()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
```

## Steg 5: models/User.py
Skapar en användarmodell med funktioner för att hantera lösenord.

```python
from config.db import db 
from werkzeug.security import generate_password_hash, check_password_hash


# Databasmodell för SQLAlchemy
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    
    def __repr__(self):
        return f"<User {self.username}>"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
```

## Steg  6: controllers/user_controller.py
Creating the endpoint folder. Some would have everything in the routes, but we choose to seperate the controllers and routes for readability.

Logiken mot databasen, controllern kollar t.ex om det finns en användare i databasen med det användarnamn som anges.

```python
from models.User import User, db

def get_all_users():
  users = User.query.all()
  return [{'id': user.id, 'username': user.username} for user in users]
``` 

## Steg 7: routes/user_routes.py
Definierar en Blueprint för användarrelaterade rutter, kopplar samman funktioner från controller och routes för att hantera GET-anrop på användarresurser.

```python
from flask import Blueprint, jsonify, request
from controllers.user_controller import get_all_users, create_user, get_user_by_id_or_username
from routes.user_routes import user_routes

user_routes = Blueprint('user_routes', __name__)

db.init_app(app)


@user_routes.route('/', methods=['GET'])
def get_users():
  users = get_all_users() # Denna funktion finns i user_controller.py
  return jsonify({'users': users}), 200

```


## steg 8: user_controller.py
skapa create_user funktion

```python
def create_user(username, password):
  existing_user = User.query.filter_by(username=username).first()
  if existing_user:
    return None, 'Username already exists'
  
  new_user = User(username=username)
  new_user .set_password(password)

  try:
    db.session.add(new_user)
    db.session.commit()
    return {'id': new_user.id, 'username': new_user.username}, None
  except Exception as e:
    db.session.rollback()
    return None, 'Database error'
```

## Steg 9: forts. user_routes.py

Notice how we catch all the errors before posting the success message
```python

@user_routes.route('/', methods=['POST'])
def post_user():
    
  data = request.get_json()

  # if username or password is missing, abort code.
  if not data or 'username' not in data or 'password' not in data:
    return jsonify({'error': 'Missing username or password'}), 400  
  
  # error catches an error msg if it occurs
  new_user, error = create_user(data['username'], data['password'])
  
  if error:
    return jsonify({'error': error}), 400  

  return jsonify({'message': 'User created successfully', 'user': new_user}), 201 


```
## Steg 10 create_db.py
It's possible to have this function in the app.py file instead.

```python
# This code creates the database after models/User.py has been created.
from app import app, db

with app.app_context():
  db.create_all()
  print("Database and tables created!")

```


## At this point you're free to add whatever you'd like


## Steg 11: user_controller.py
A function where you can search for a friend

```python
def get_user_by_id_or_username(user_id=None, username=None): # user_id and username are allowed to be None
  if user_id:
    user = User.query.filter_by(id=user_id).first()
  elif username:
    user = User.query.filter_by(username=username).first()
  else: 
    return None, 'User not found'
  
  # Under normal circumstances you would never return password
  if user: 
    return {'id': user.id, 'username': user.username, 'password_hash': user.password_hash}, None
  else:
    return None, 'User not found'

```

## Steg 12: user_routes.py
Creating the endpoint for searching after a user. Some would have the code from Step 11 in this route, but we choose to seperate the controllers and routes for readability. 

```python
@user_routes.route('/search', methods=['GET'])
def search_user():
  user_id = request.args.get('id')
  username = request.args.get('username')

  user_data, error = get_user_by_id_or_username(user_id=user_id, username=username)

  if error:
    return jsonify({'error': error}), 404
  else:
    return jsonify({'user': user_data}), 200

```

## Steg 13: auth_controller.py
Function that authenticates a user based on the username and password entered
```python
from models.User import User 
from werkzeug.security import check_password_hash

def authenticate_user(username, password):
  user = User.query.filter_by(username=username).first()

  if not user:
    return None, 'User not found'
  
  # If password does not match
  if not check_password_hash(user.password_hash, password):
    return None, 'Incorrect password'
  
  return {'id': user.id, 'username': user.username}, None

```

## Steg 14 create /routes/auth_routes.py

```python
from flask import Blueprint, jsonify, request
from controllers.auth_controller import authenticate_user

auth_routes = Blueprint('auth_routes', __name__)

# POST cause we send in username and password
@auth_routes.route('/login', methods=['POST'])
def login():
  # data has the username and password
  data = request.get_json()

  # if data does not contain log in info, send error msg
  if not data or 'username' not in data or 'password' not in data:
    return jsonify({'error': 'Missing username or password'}), 400
  
  user_data, error = authenticate_user(data['username'], data['password'])

  if error:
    return jsonify({'error': error}), 401
    
  return jsonify({'message': 'Welcome, {}'.format(user_data['username'])}), 200
```

## Steg 15: app.py
Importera auth_routes vi precis skapade och blueprinten in i app.py
```python
  from routes.auth_routes import auth_routes
  app.register_blueprint(user_routes, url_prefix='/users')
```

