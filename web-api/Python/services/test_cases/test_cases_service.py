from datetime import datetime

from models import TestCaseModel
from schemas import TestCaseCreateSchema, TestCaseOutSchema, TestCaseEditSchema


class TestCasesService:
    def __init__(self, session):
        self.session = session

    def get_case_by_id(self, case_id: int):
        case = self.session.query(TestCaseModel).filter(TestCaseModel.id == case_id).first()

        return case

    def create_case(self, request_data: TestCaseCreateSchema, user):
        case_item = TestCaseModel(name=request_data.name,
                                  description=request_data.description,
                                  priority=request_data.priority,
                                  status=request_data.status,
                                  expected_result=request_data.expected_result,
                                  owner_id=user['id'])
        self.session.add(case_item)
        self.session.commit()
        self.session.refresh(case_item)
        case_out = TestCaseOutSchema(
            id=case_item.id,
            name=case_item.name,
            description=case_item.description,
            priority=case_item.priority,
            status=case_item.status,
            expected_result=case_item.expected_result,
            actual_result=case_item.actual_result,
            created_date=case_item.created_date,
            last_updated=case_item.last_updated,
            owner_id=case_item.owner_id
        )
        return case_out

    def edit_case(self, existing_case: TestCaseModel, request_data: TestCaseEditSchema):
        update_fields = request_data.model_dump(exclude_unset=True)

        for key, value in update_fields.items():
            setattr(existing_case, key, value)

        existing_case.last_updated = datetime.now()

        self.session.commit()
        self.session.refresh(existing_case)

        case_out = TestCaseOutSchema(
            id=existing_case.id,
            name=existing_case.name,
            description=existing_case.description,
            priority=existing_case.priority,
            status=existing_case.status,
            expected_result=existing_case.expected_result,
            actual_result=existing_case.actual_result,
            created_date=existing_case.created_date,
            last_updated=existing_case.last_updated,
            owner_id=existing_case.owner_id
        )
        return case_out

    def get_cases(self, user):
        #Todo: Add limit later for pagination
        cases = self.session.query(TestCaseModel).filter(TestCaseModel.owner_id == user['id']).all()

        return cases