import TestCaseCard from "../test-case-card/TestCaseCard";

function TestCaseList() {
    return (
        <>
            <div className="w-fit md:w-full flex flex-col flex-wrap md:flex-row justify-between gap-8 m-10">
                <TestCaseCard />
                <TestCaseCard />
                <TestCaseCard />
                <TestCaseCard />
                <TestCaseCard />
                <TestCaseCard />
            </div>
        </>
    );
}

export default TestCaseList;