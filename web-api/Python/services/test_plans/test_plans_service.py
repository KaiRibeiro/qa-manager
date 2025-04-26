from models import TestPlanModel
from schemas import TestPlanCreateSchema, TestPlanOutSchema

class TestPlansService:
    def __init__(self, session):
        self.session = session

    def create_plan(self, request_data: TestPlanCreateSchema):
        plan_item = TestPlanModel(name=request_data.name,
                                  description=request_data.description,
                                  priority=request_data.priority,
                                  status=request_data.status,
                                  owner_id=1)
        self.session.add(plan_item)
        self.session.commit()
        self.session.refresh(plan_item)
        plan_out = TestPlanOutSchema(
            id=plan_item.id,
            name=plan_item.name,
            description=plan_item.description,
            priority=plan_item.priority,
            status=plan_item.status,
            created_date=plan_item.created_date,
            last_updated=plan_item.last_updated,
            owner_id=plan_item.owner_id
        )
        return plan_out