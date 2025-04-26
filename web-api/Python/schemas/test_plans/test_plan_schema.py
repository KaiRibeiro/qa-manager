from datetime import datetime
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