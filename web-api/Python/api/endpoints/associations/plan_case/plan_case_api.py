from typing import Annotated

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette import status

from api.endpoints.users.users_api import get_current_user
from db.session import get_session
from schemas import PlanCaseSchema, TestPlanOutSchema
from services import TestPlansService, TestCasesService

router = APIRouter()
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.post("/plans/{plan_id}/cases", response_model=TestPlanOutSchema, status_code=status.HTTP_200_OK)
async def assign_cases_to_plan(
    plan_id: int,
    request_cases: PlanCaseSchema,
    user: user_dependency,
    session: Session = Depends(get_session)
):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )

    plans_service = TestPlansService(session)
    plan = plans_service.get_plan_by_id(plan_id)

    if plan is None:
        raise HTTPException(
            status_code=404,
            detail="Plan does not exist"
        )

    if plan.owner_id != user['id']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No permission"
        )

    cases_service = TestCasesService(session)
    cases = cases_service.get_cases_by_ids(request_cases,user)

    if not cases:
        raise HTTPException(status_code=404, detail="No matching test cases found")

    plan = plans_service.assign_cases_to_plan(plan, cases)

    return TestPlanOutSchema(
        id=plan.id,
        name=plan.name,
        description=plan.description,
        priority=plan.priority,
        status=plan.status,
        created_date=plan.created_date,
        last_updated=plan.last_updated,
        owner_id=plan.owner_id
    )

@router.delete("/plans/{plan_id}/{case_id}", response_model=TestPlanOutSchema, status_code=status.HTTP_200_OK)
async def unassign_case_from_plan(
    plan_id: int,
    case_id: int,
    user: user_dependency,
    session: Session = Depends(get_session)
):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )

    plans_service = TestPlansService(session)
    plan = plans_service.get_plan_by_id(plan_id)

    if plan is None:
        raise HTTPException(
            status_code=404,
            detail="Plan does not exist"
        )

    if plan.owner_id != user['id']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No permission"
        )

    plan = plans_service.unassign_cases_to_plan(plan, case_id)

    return TestPlanOutSchema(
        id=plan.id,
        name=plan.name,
        description=plan.description,
        priority=plan.priority,
        status=plan.status,
        created_date=plan.created_date,
        last_updated=plan.last_updated,
        owner_id=plan.owner_id
    )