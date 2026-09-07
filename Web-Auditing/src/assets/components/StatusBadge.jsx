import { getStatusColor, getStatusIcon } from '../utils/helpers';

const StatusBadge = ({ status, showIcon = true }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
        status
      )}`}
    >
      {showIcon && <span className="mr-1">{getStatusIcon(status)}</span>}
      {status}
    </span>
  );
};

export default StatusBadge;
