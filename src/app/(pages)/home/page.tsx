
import RecentsActivities from "@/components/RecentsActivities"
import Transactions from "@/components/Transactions"
import NewUser from "@/components/NewUser"
import TranStatsChart from "@/components/TranStatsCharts"

const HomePage = () => {
    return (
     <div className="flex pb-5 flex-col md:flex-row gap-3">
      {/*left */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
      <TranStatsChart/>
      <RecentsActivities/>
      </div>
       {/*left */}
       <div className="w-full md:w-1/3 flex flex-col gap-3">
       <Transactions/>
       <NewUser/>
       </div>
     </div>
    )
  }
  
  export default HomePage
  