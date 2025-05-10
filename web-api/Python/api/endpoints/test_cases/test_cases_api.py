from typing import Annotated, List

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette import status

from api.endpoints.auth.auth_api import get_current_user
from db.session import get_session
from schemas import TestCaseCreateSchema, TestCaseOutSchema
from schemas.test_cases.test_case_schema import TestCaseEditSchema
from services import TestCasesService

router = APIRouter()
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.post("/", response_model=TestCaseOutSchema, status_code=status.HTTP_201_CREATED)
async def create_case(case_request: TestCaseCreateSchema,user: user_dependency, session: Session = Depends(get_session)):
    service = TestCasesService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )
    case = service.create_case(case_request, user)

    return TestCaseOutSchema(id=case.id,
                             name=case.name,
                             description=case.description,
                             priority=case.priority,
                             status=case.status,
                             expected_result=case.expected_result,
                             actual_result=case.actual_result,
                             created_date=case.created_date,
                             last_updated=case.last_updated,
                             owner_id=case.owner_id
    )

@router.patch("/{case_id}", response_model=TestCaseOutSchema, status_code=status.HTTP_200_OK)
async def edit_case(case_id: int, case_request: TestCaseEditSchema,user: user_dependency, session: Session = Depends(get_session)):
    service = TestCasesService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )

    existing_case = service.get_case_by_id(case_id)

    if existing_case is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case does not exist"
        )

    if existing_case.owner_id != user['id']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No permission"
        )

    case = service.edit_case(existing_case, case_request)

    return TestCaseOutSchema(id=case.id,
                             name=case.name,
                             description=case.description,
                             priority=case.priority,
                             status=case.status,
                             expected_result=case.expected_result,
                             actual_result=case.actual_result,
                             created_date=case.created_date,
                             last_updated=case.last_updated,
                             owner_id=case.owner_id
    )

@router.get("/{case_id}", response_model=TestCaseOutSchema, status_code=status.HTTP_200_OK)
async def get_case(case_id: int, user: user_dependency, session: Session = Depends(get_session)):
    service = TestCasesService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )

    existing_case = service.get_case_by_id(case_id)

    if existing_case is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case does not exist"
        )

    if existing_case.owner_id != user['id']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No permission"
        )

    return existing_case


@router.get("/", response_model=List[TestCaseOutSchema], status_code=status.HTTP_200_OK)
async def get_cases(user: user_dependency, session: Session = Depends(get_session)):
    # Todo: Add limit later for pagination
    service = TestCasesService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )
    cases = service.get_cases(user)

    return cases

