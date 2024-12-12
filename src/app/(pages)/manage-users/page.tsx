import UserList from "@/components/UserList"
import UserActivity from "@/components/UserActivity"
import NewUsers from "@/components/NewUsers"

const ManageUsersPage = () => {
    return (
     <div className="pb-5">
      {/*top */}
      <div className="mb-4  ">
        <UserList/>
      </div>
      {/*bottom */}
      <div className="flex gap-3 flex-col md:flex-row ">
        <div className="md:w-2/3"><UserActivity/></div>
        <div className="md:w-1/3"><NewUsers/></div>
      
      
      </div>
     </div>
    )
  }
  
  export default ManageUsersPage
  