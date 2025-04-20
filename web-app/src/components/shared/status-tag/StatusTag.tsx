import { PlanStatus } from '../../../enums/PlanStatus';
import { CaseStatus } from '../../../enums/CaseStatus';
import {
  LiaBanSolid,
  LiaCheckCircle,
  LiaForwardSolid,
  LiaPauseCircleSolid,
  LiaPlayCircle,
  LiaTimesCircleSolid,
} from 'react-icons/lia';

function StatusTag({ status, caseStatus }: { status?: PlanStatus; caseStatus?: CaseStatus }) {
  const getStatusIcon = () => {
    if (status === PlanStatus.COMPLETE || caseStatus === CaseStatus.PASSED) {
      return <LiaCheckCircle size={20} />;
    } else if (status === PlanStatus.IN_PROGRESS || caseStatus === CaseStatus.IN_PROGRESS) {
      return <LiaPlayCircle size={20} />;
    } else if (caseStatus === CaseStatus.FAILED) {
      return <LiaTimesCircleSolid size={20} />;
    } else if (caseStatus === CaseStatus.BLOCKED) {
      return <LiaBanSolid size={20} />;
    } else if (caseStatus === CaseStatus.SKIPPED) {
      return <LiaForwardSolid size={20} />;
    } else {
      return <LiaPauseCircleSolid size={20} />;
    }
  };

  const getStatusStyle = () => {
    if (status === PlanStatus.COMPLETE || caseStatus === CaseStatus.PASSED) {
      return 'text-emerald-800 bg-emerald-400';
    } else if (status === PlanStatus.IN_PROGRESS || caseStatus === CaseStatus.IN_PROGRESS) {
      return 'text-yellow-800 bg-amber-100';
    } else if (caseStatus === CaseStatus.FAILED) {
      return 'text-red-800 bg-red-100';
    } else if (caseStatus === CaseStatus.BLOCKED) {
      return 'text-orange-800 bg-orange-100';
    } else if (caseStatus === CaseStatus.SKIPPED) {
      return <LiaForwardSolid size={20} />;
    } else {
      return 'text-gray-800 bg-gray-400';
    }
  };

  const formatStatus = () => {
    if (status) {
      switch (status) {
        case PlanStatus.IN_PROGRESS:
          return 'IN PROGRESS';
        default:
          return status;
      }
    }
    if (caseStatus) {
      switch (caseStatus) {
        case CaseStatus.IN_PROGRESS:
          return 'IN PROGRESS';
        case CaseStatus.NOT_STARTED:
          return 'NOT STARTED';
        default:
          return caseStatus;
      }
    }
  };

  return (
    <>
      <div className={`${getStatusStyle()} flex justify-center items-center rounded-md border`}>
        <div className="flex flex-row items-center justify-center font-semibold text-xs p-2 text-center">
          {getStatusIcon()}
          {formatStatus()}
        </div>
      </div>
    </>
  );
}

export default StatusTag;
