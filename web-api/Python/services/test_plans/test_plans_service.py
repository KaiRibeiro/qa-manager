from datetime import datetime

from models import TestPlanModel
from schemas import TestPlanCreateSchema, TestPlanOutSchema
from schemas.test_plans.test_plan_schema import TestPlanEditSchema


class TestPlansService:
    def __init__(self, session):
        self.session = session

    def get_plan_by_id(self, plan_id: int):
        return self.session.query(TestPlanModel).filter(TestPlanModel.id == plan_id).first()

    def create_plan(self, request_data: TestPlanCreateSchema, user):
        plan_item = TestPlanModel(name=request_data.name,
                                  description=request_data.description,
                                  priority=request_data.priority,
                                  status=request_data.status,
                                  owner_id=user['id'])
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

    def edit_plan(self, existing_plan: TestPlanModel, request_data: TestPlanEditSchema):
        update_fields = request_data.model_dump(exclude_unset=True)

        for key, value in update_fields.items():
            setattr(existing_plan, key, value)

        existing_plan.last_updated = datetime.now()

        self.session.commit()
        self.session.refresh(existing_plan)

        plan_out = TestPlanOutSchema(
            id=existing_plan.id,
            name=existing_plan.name,
            description=existing_plan.description,
            priority=existing_plan.priority,
            status=existing_plan.status,
            created_date=existing_plan.created_date,
            last_updated=existing_plan.last_updated,
            owner_id=existing_plan.owner_id
        )
        return plan_out

    def get_plans(self, user):
        #Todo: Add limit later for pagination
        plans = self.session.query(TestPlanModel).filter(TestPlanModel.owner_id == user['id']).all()
        return plans