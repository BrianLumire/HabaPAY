import Image from "next/image";

const transactions = () => {
  // Transaction data
  const transactionData = [
    {
      name: "Jane Mukenya M.",
      number: "+25478374899",
      amount: "Ksh 240",
      time: "12.45 PM",
      icon: "/hand.svg",
    },
    {
      name: "Peter Kariuki",
      number: "+25471234567",
      amount: "Ksh 500",
      time: "10.30 AM",
      icon: "/send.svg",
    },
    {
      name: "Mary Wanjiku",
      number: "+25479876543",
      amount: "Ksh 1,200",
      time: "9.15 AM",
      icon: "/hand.svg",
    },
    {
      name: "James Mwangi",
      number: "+25472345678",
      amount: "Ksh 700",
      time: "2.15 PM",
      icon: "/send.svg",
    },
    {
      name: "Anne Njoroge",
      number: "+25479987654",
      amount: "Ksh 300",
      time: "4.00 PM",
      icon: "/hand.svg",
    },
    {
      name: "John Kimani",
      number: "+25471238765",
      amount: "Ksh 1,050",
      time: "11.25 AM",
      icon: "/send.svg",
    },
    {
      name: "Catherine Wafula",
      number: "+254710223344",
      amount: "Ksh 850",
      time: "1.50 PM",
      icon: "/hand.svg",
    },
    {
      name: "Martin Ochieng",
      number: "+254701112233",
      amount: "Ksh 2,000",
      time: "3.15 PM",
      icon: "/send.svg",
    },
  ];

  return (
    <div className="border border-gray-200 rounded-sm">
      {/* Header */}
      <div className="flex flex-col pb-2 border-b border-gray-200 mb-2 p-1">
        <h2 className="font-ibmPlexSans text-lg font-semibold mb-1">
          Transactions
        </h2>
        <div className="flex justify-center items-center gap-3">
          <button className="text-white bg-[#FDAC15] border border-[#FDAC15] rounded-md font-ibmPlexSans px-2 py-[1px]">
            Pending
          </button>
          <button className="rounded-md text-[#FDAC15] bg-white border border-[#FDAC15] px-2 py-[1px]">
            Approved
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-1">
        {transactionData.map((transaction, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-1 md:pr-4 mb-3"
          >
            <div className="flex items-center gap-3">
              <div className="p-1 border border-[#fff1d7] rounded-full bg-[#FFF7E8]">
                <Image
                  src={transaction.icon}
                  alt={transaction.name}
                  width={22}
                  height={22}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-ibmPlexSans text-sm font-semibold">
                  {transaction.name}
                </p>
                <span className="text-xs font-ibmPlexSans">
                  {transaction.number}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-ibmPlexSans text-sm font-semibold">
                {transaction.amount}
              </p>
              <span className="text-[12px] font-ibmPlexSans text-right">
                {transaction.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default transactions;
