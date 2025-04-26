from db.session import engine
from models import UserModel, TestPlanModel, TestCaseModel, PlanCaseModel

UserModel.metadata.create_all(engine)
TestPlanModel.metadata.create_all(engine)
TestCaseModel.metadata.create_all(engine)
PlanCaseModel.metadata.create_all(engine)