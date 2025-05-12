from db.session import engine
from models import UserModel, TestPlanModel, TestCaseModel, PlanCaseModel, TestStepModel

for model in [UserModel, TestPlanModel, TestCaseModel, PlanCaseModel, TestStepModel]:
    model.metadata.create_all(engine, checkfirst=True)
