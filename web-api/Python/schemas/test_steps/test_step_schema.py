from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class TestStepCreateSchema(BaseModel):
    name: str
    description: str
    status: str
    expected_result: str

class TestStepOutSchema(BaseModel):
    id: int
    name: str
    description: str
    status: str
    expected_result: str
    actual_result: str
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    duration: float
    created_date: datetime
    last_updated: datetime
    owner_id: int

class TestStepEditSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    expected_result: Optional[str] = None
    actual_result: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    duration: Optional[float] = None
