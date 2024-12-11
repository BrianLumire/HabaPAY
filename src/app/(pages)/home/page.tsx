import TranStatsChart from "@/components/tran-statschart"
import RecentActivity from "@/components/recentActivities"
import Transactions from "@/components/transactions"
import NewUsers from "@/components/newUsers"

const HomePage = () => {
    return (
     <div className="flex pb-5 flex-col md:flex-row gap-3">
      {/*left */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
      <TranStatsChart/>
      <RecentActivity/>
      </div>
       {/*left */}
       <div className="w-full md:w-1/3 flex flex-col gap-3">
       <Transactions/>
       <NewUsers/>
       </div>
     </div>
    )
  }
  
  export default HomePage
  