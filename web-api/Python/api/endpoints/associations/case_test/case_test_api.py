from typing import Annotated

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette import status

from api.endpoints.users.users_api import get_current_user
from db.session import get_session
from schemas import TestStepOutSchema
from services import TestStepsService, TestCasesService

router = APIRouter()
user_dependency = Annotated[dict, Depends(get_current_user)]


@router.patch("/steps/{step_id}/{case_id}", response_model=TestStepOutSchema, status_code=status.HTTP_200_OK)
async def assign_case_to_step(step_id: int, case_id: int, user: user_dependency, session: Session = Depends(get_session)):
    service = TestStepsService(session)
    case_service = TestCasesService(session)
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
    
    existing_case = case_service.get_case_by_id(case_id)

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


    step = service.assign_case_to_step(existing_step, existing_case)

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

@router.patch("/steps/{step_id}", response_model=TestStepOutSchema, status_code=status.HTTP_200_OK)
async def remove_case_from_step(step_id: int, user: user_dependency, session: Session = Depends(get_session)):
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


    step = service.remove_case_from_step(existing_step)

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