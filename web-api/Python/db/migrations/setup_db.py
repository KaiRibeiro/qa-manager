from db.session import engine
from models import UserModel

UserModel.metadata.create_all(engine)