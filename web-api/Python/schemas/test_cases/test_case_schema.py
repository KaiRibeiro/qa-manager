from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class TestCaseCreateSchema(BaseModel):
    name: str
    description: str
    priority: str
    status: str
    expected_result: str

class TestCaseOutSchema(BaseModel):
    id: int
    name: str
    description: str
    priority: str
    status: str
    expected_result: str
    actual_result: str
    created_date: datetime
    last_updated: datetime
    owner_id: int

class TestCaseEditSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    expected_result: Optional[str] = None
    actual_result: Optional[str] = None