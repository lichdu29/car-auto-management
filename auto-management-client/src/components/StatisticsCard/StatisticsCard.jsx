import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { handleGrowthColor } from '../../utils'

function StatisticsCard({ title, value, icon, growth }) {
  return (
    <div className="flex flex-auto justify-between items-center p-4 text-center bg-neutral-100 shadow-md rounded-md">
      <div className="text-left">
        <p className="mb-1 text-gray-500 font-medium text-[16px]">{title}</p>
        <span className="font-bold text-3xl">{value}</span>
        <span className={`ml-1 font-medium ${handleGrowthColor(growth)}`}>
          {growth ? (growth >= 0 ? `+${growth}%` : `${growth}%`) : ''}
        </span>
      </div>
      <div className="w-[50px] bg-blue-500 p-[12px] rounded-md text-white">
        <FontAwesomeIcon icon={icon} className="w-[22px] h-[22px]" />
      </div>
    </div>
  )
}

export default StatisticsCard
