from typing import Annotated

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette import status

from api.endpoints.auth.auth_api import get_current_user
from db.session import get_session
from schemas import TestPlanOutSchema, TestPlanCreateSchema
from services import TestPlansService

router = APIRouter()
user_dependency = Annotated[dict, Depends(get_current_user)]

#TODO: Add owner id in the backend
@router.post("/", response_model=TestPlanOutSchema, status_code=status.HTTP_201_CREATED)
async def create_plan(plan_request: TestPlanCreateSchema,user: user_dependency, session: Session = Depends(get_session)):
    service = TestPlansService(session)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )
    plan = service.create_plan(plan_request)

    return TestPlanOutSchema(id=plan.id,
                             name=plan.name,
                             description=plan.description,
                             priority=plan.priority,
                             status=plan.status,
                             created_date=plan.created_date,
                             last_updated=plan.last_updated,
                             owner_id=plan.owner_id
    )