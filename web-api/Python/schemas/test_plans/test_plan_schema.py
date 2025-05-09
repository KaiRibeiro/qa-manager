from datetime import datetime
from typing import Optional

from pydantic import BaseModel

class TestPlanCreateSchema(BaseModel):
    name: str
    description: str
    priority: str
    status: str

class TestPlanOutSchema(BaseModel):
    id: int
    name: str
    description: str
    priority: str
    status: str
    created_date: datetime
    last_updated: datetime
    owner_id: int

class TestPlanEditSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None