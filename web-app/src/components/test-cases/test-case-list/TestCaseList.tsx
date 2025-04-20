import TestCaseCard from '../test-case-card/TestCaseCard';
import { TestCase } from '../../../types/TestCase';
import { CaseStatus } from '../../../enums/CaseStatus';
import { Priority } from '../../../enums/Priority';

function TestCaseList() {
  const mockCase: TestCase = {
    id: '12375134895',
    code: 'TC-001',
    actual_result: 'Test plan gets deleted',
    created_date: new Date(Date.now()),
    description: 'Test case for testing plan deletion.',
    expected_result: 'Test plan gets deleted and dialog message confirms deletion.',
    name: 'Delete test plan',
    last_updated: new Date(Date.now()),
    owner_id: 'Kaique Campos',
    status: CaseStatus.IN_PROGRESS,
    priority: Priority.LOW,
  };
  return (
    <>
      <div className="w-fit md:w-full flex flex-col flex-wrap md:flex-row justify-between gap-8 m-10">
        <TestCaseCard testCase={mockCase} />
        <TestCaseCard testCase={mockCase} />
        <TestCaseCard testCase={mockCase} />
        <TestCaseCard testCase={mockCase} />
        <TestCaseCard testCase={mockCase} />
        <TestCaseCard testCase={mockCase} />
      </div>
    </>
  );
}

export default TestCaseList;
