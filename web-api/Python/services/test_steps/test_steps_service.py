from datetime import datetime
from typing import List

from models import TestStepModel, TestCaseModel
from schemas import TestStepCreateSchema, TestStepOutSchema, TestStepEditSchema


class TestStepsService:
    def __init__(self, session):
        self.session = session

    def get_step_by_id(self, step_id: int):
        return self.session.query(TestStepModel).filter(TestStepModel.id == step_id).first()

    def create_step(self, request_data: TestStepCreateSchema, user):
        step_item = TestStepModel(  
                                    name=request_data.name,
                                    description=request_data.description,
                                    status=request_data.status,
                                    expected_result=request_data.expected_result,
                                    owner_id=user['id']
                                  )
        self.session.add(step_item)
        self.session.commit()
        self.session.refresh(step_item)
        step_out = TestStepOutSchema(
            id=step_item.id,
            name=step_item.name,
            description=step_item.description,
            status=step_item.status,
            expected_result=step_item.expected_result,
            actual_result=step_item.actual_result,
            start_time=step_item.start_time,
            end_time=step_item.end_time,
            duration=step_item.duration,
            created_date=step_item.created_date,
            last_updated=step_item.last_updated,
            owner_id=step_item.owner_id
        )
        return step_out

    def edit_step(self, existing_step: TestStepModel, request_data: TestStepEditSchema):
        update_fields = request_data.model_dump(exclude_unset=True)

        for key, value in update_fields.items():
            setattr(existing_step, key, value)

        existing_step.last_updated = datetime.now()

        self.session.commit()
        self.session.refresh(existing_step)

        plan_out = TestStepOutSchema(
            id=existing_step.id,
            name=existing_step.name,
            description=existing_step.description,
            status=existing_step.status,
            expected_result=existing_step.expected_result,
            actual_result=existing_step.actual_result,
            start_time=existing_step.start_time,
            end_time=existing_step.end_time,
            duration=existing_step.duration,
            created_date=existing_step.created_date,
            last_updated=existing_step.last_updated,
            owner_id=existing_step.owner_id
        )
        return plan_out

    def get_steps(self, user):
        #Todo: Add limit later for pagination
        plans = self.session.query(TestStepModel).filter(TestStepModel.owner_id == user['id']).all()
        return plans

    def assign_case_to_step(self, step: TestStepModel, case: TestCaseModel):
        step.test_case = case
        step.last_updated = datetime.now()

        self.session.commit()
        self.session.refresh(step)

        return step

    def remove_case_from_step(self, step: TestStepModel):
        step.test_case = None
        step.last_updated = datetime.now()

        self.session.commit()
        self.session.refresh(step)

        return step
