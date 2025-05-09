from typing import Annotated, List

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette import status

from api.endpoints.auth.auth_api import get_current_user
from db.session import get_session
from schemas import TestPlanOutSchema, TestPlanCreateSchema
from schemas.test_plans.test_plan_schema import TestPlanEditSchema
from services import TestPlansService

router = APIRouter()
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.post("/", response_model=TestPlanOutSchema, status_code=status.HTTP_201_CREATED)
async def create_plan(plan_request: TestPlanCreateSchema,user: user_dependency, session: Session = Depends(get_session)):
    service = TestPlansService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )
    plan = service.create_plan(plan_request, user)

    return TestPlanOutSchema(id=plan.id,
                             name=plan.name,
                             description=plan.description,
                             priority=plan.priority,
                             status=plan.status,
                             created_date=plan.created_date,
                             last_updated=plan.last_updated,
                             owner_id=plan.owner_id
    )

@router.get("/{plan_id}", response_model=TestPlanOutSchema, status_code=status.HTTP_200_OK)
async def get_plan(plan_id: int, user: user_dependency, session: Session = Depends(get_session)):
    service = TestPlansService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )

    existing_plan = service.get_plan_by_id(plan_id)

    if existing_plan is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Plan does not exist"
        )

    if existing_plan.owner_id != user['id']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No permission"
        )

    return existing_plan

@router.get("/", response_model=List[TestPlanOutSchema], status_code=status.HTTP_200_OK)
async def get_plans(user: user_dependency, session: Session = Depends(get_session)):
    # Todo: Add limit later for pagination
    service = TestPlansService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )
    plans = service.get_plans(user)

    return plans

@router.patch("/{plan_id}", response_model=TestPlanOutSchema, status_code=status.HTTP_200_OK)
async def edit_plan(plan_id: int, plan_request: TestPlanEditSchema,user: user_dependency, session: Session = Depends(get_session)):
    service = TestPlansService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )

    existing_plan = service.get_plan_by_id(plan_id)

    if existing_plan is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Plan does not exist"
        )

    if existing_plan.owner_id != user['id']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No permission"
        )

    plan = service.edit_plan(existing_plan, plan_request)

    return TestPlanOutSchema(id=plan.id,
                             name=plan.name,
                             description=plan.description,
                             priority=plan.priority,
                             status=plan.status,
                             created_date=plan.created_date,
                             last_updated=plan.last_updated,
                             owner_id=plan.owner_id
    )