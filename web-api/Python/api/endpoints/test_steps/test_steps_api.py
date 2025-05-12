from typing import Annotated, List

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette import status

from api.endpoints.auth.auth_api import get_current_user
from db.session import get_session
from schemas import TestStepCreateSchema, TestStepOutSchema, TestStepEditSchema
from services import TestStepsService, TestCasesService

router = APIRouter()
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.post("/", response_model=TestStepCreateSchema, status_code=status.HTTP_201_CREATED)
async def create_step(step_request: TestStepCreateSchema,user: user_dependency, session: Session = Depends(get_session)):
    service = TestStepsService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )
    step = service.create_step(step_request, user)

    return TestStepOutSchema(id=step.id,
                             name=step.name,
                             description=step.description,
                             status=step.status,
                             expected_result=step.expected_result,
                             actual_result=step.actual_result,
                             start_time=step.start_time,
                             end_time=step.end_time,
                             duration=step.duration,
                             created_date=step.created_date,
                             last_updated=step.last_updated,
                             owner_id=step.owner_id
    )

@router.patch("/{step_id}", response_model=TestStepOutSchema, status_code=status.HTTP_200_OK)
async def edit_case(step_id: int, step_request: TestStepEditSchema,user: user_dependency, session: Session = Depends(get_session)):
    service = TestStepsService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )

    existing_step = service.get_step_by_id(step_id)

    if existing_step is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Step does not exist"
        )

    if existing_step.owner_id != user['id']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No permission"
        )

    step = service.edit_step(existing_step, step_request)

    return TestStepOutSchema(id=step.id,
                             name=step.name,
                             description=step.description,
                             status=step.status,
                             expected_result=step.expected_result,
                             actual_result=step.actual_result,
                             start_time=step.start_time or None,
                             end_time=step.end_time or None,
                             duration=step.duration,
                             created_date=step.created_date,
                             last_updated=step.last_updated,
                             owner_id=step.owner_id
    )

@router.get("/{step_id}", response_model=TestStepOutSchema, status_code=status.HTTP_200_OK)
async def get_step(step_id: int, user: user_dependency, session: Session = Depends(get_session)):
    service = TestStepsService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )

    existing_step = service.get_step_by_id(step_id)

    if existing_step is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Step does not exist"
        )

    if existing_step.owner_id != user['id']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No permission"
        )

    return existing_step


@router.get("/", response_model=List[TestStepOutSchema], status_code=status.HTTP_200_OK)
async def get_steps(user: user_dependency, session: Session = Depends(get_session)):
    # Todo: Add limit later for pagination
    service = TestStepsService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )
    cases = service.get_steps(user)

    return cases

