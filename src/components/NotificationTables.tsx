type Notification = {
  type: string;
  browser: boolean;
  email: boolean;
  text: boolean;
};

type NotificationTableProps = {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
};

const NotificationTables = ({ notifications, setNotifications }: NotificationTableProps) => {
  // Handle checkbox change for individual notification
  const handleCheckboxChange = (index: number, type: 'browser' | 'email' | 'text') => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index][type] = !updatedNotifications[index][type];
    setNotifications(updatedNotifications);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead >
          <tr>
            <th className="py-2 px-4 text-left font-semibold">Type</th>
            <th className="py-2 px-4 text-center font-semibold">Browser</th>
            <th className="py-2 px-4 text-center font-semibold">Email</th>
            <th className="py-2 px-4 text-center font-semibold">Text</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-2 px-4">{notification.type}</td>
              <td className="py-2 px-4 text-center">
                <input
                  type="checkbox"
                  checked={notification.browser}
                  onChange={() => handleCheckboxChange(index, 'browser')}
                />
              </td>
              <td className="py-2 px-4 text-center">
                <input
                  type="checkbox"
                  checked={notification.email}
                  onChange={() => handleCheckboxChange(index, 'email')}
                />
              </td>
              <td className="py-2 px-4 text-center">
                <input
                  type="checkbox"
                  checked={notification.text}
                  onChange={() => handleCheckboxChange(index, 'text')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTables;
