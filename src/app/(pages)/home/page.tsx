
import RecentsActivities from "@/components/RecentsActivities"
import Transaction from "@/components/Transaction"
import NewUser from "@/components/NewUser"
import TranStatsCharts from "@/components/TranStatsCharts"

const HomePage = () => {
    return (
     <div className="flex pb-5 mt-4 flex-col md:flex-row gap-3">
      {/*left */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
      <TranStatsCharts/>
      <RecentsActivities/>
      </div>
       {/*left */}
       <div className="w-full md:w-1/3 flex flex-col gap-3">
       <Transaction/>
       <NewUser/>
       </div>
     </div>
    )
  }
  
  export default HomePage
  