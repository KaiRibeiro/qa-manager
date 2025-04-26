from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from db.base import Base


class TestPlanModel(Base):
    __tablename__ = 'test_plan'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(60), nullable=False)
    description = Column(String(100), nullable=False)
    priority = Column(String(15), nullable=False)
    status = Column(String(15), nullable=False)
    created_date = Column(DateTime, default=datetime.now)
    last_updated = Column(DateTime, default=datetime.now)
    owner_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    test_cases = relationship(
        "TestCaseModel",
        secondary="plan_case",
        back_populates="test_plans"
    )
    deleted = Column(Boolean, default=False)