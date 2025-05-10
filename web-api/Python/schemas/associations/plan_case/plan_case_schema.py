from typing import List

from pydantic import BaseModel


class PlanCaseSchema(BaseModel):
    test_case_ids: List[int]