from sqlalchemy import Column, Integer, ForeignKey
from db.base import Base


class PlanCaseModel(Base):
    __tablename__ = 'plan_case'

    test_plan_id = Column(Integer, ForeignKey('test_plan.id'), primary_key=True)
    test_case_id = Column(Integer, ForeignKey('test_case.id'), primary_key=True)