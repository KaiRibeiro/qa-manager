from datetime import datetime
from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from db.base import Base


class TestStepModel(Base):
    __tablename__ = 'test_step'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(60), nullable=False)
    description = Column(String(100), nullable=False)
    status = Column(String(15), nullable=False)
    expected_result = Column(String(100), nullable=False)
    actual_result = Column(String(100), default='')
    start_time = Column(DateTime, nullable=True)
    end_time = Column(DateTime, nullable=True)
    duration = Column(Float, default=0.0)
    created_date = Column(DateTime, default=datetime.now)
    last_updated = Column(DateTime, default=datetime.now)
    owner_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    deleted = Column(Boolean, default=False)
    test_case_id = Column(Integer, ForeignKey('test_case.id'))
    
    test_case = relationship("TestCaseModel", back_populates="test_steps")