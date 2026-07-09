import React from "react";
import Icon from "../Elements/Icon";
import Card from "../Elements/Card";
import CircularProgress from '@mui/material/CircularProgress';

function CardUpcomingBill(props) {
  const { data } = props;

  const getBillIcon = (name) => {
    const billName = name.toLowerCase();

    if (billName.includes("figma")) {
      return <Icon.Figma size={50} />;
    }

    if (billName.includes("adobe")) {
      return <Icon.Adobe size={50} />;
    }

    return <Icon.Bill size={50} />;
  };

  // Jika data kosong atau tidak ada, tampilkan loader
  if (!data || data.length === 0) {
    return (
      <Card
        title="Upcoming Bill"
        link="/bill"
        desc={
          <div className="flex flex-col justify-center items-center h-full text-primary">
            <CircularProgress color="inherit" size={50} />
            <span className="mt-4">Loading Data</span>
          </div>
        }
      />
    );
  }

  return (
    <Card
      title="Upcoming Bill"
      link="/bill"
      desc={
        <div className="flex flex-col h-full">
          {data.map((item, index) => (
            <React.Fragment key={item.id || index}>
              <div className="flex justify-between items-center py-4">
                {/* LEFT */}
                <div className="flex items-center">
                  {/* DATE */}
                  <div className="bg-special-bg w-16 h-20 rounded-lg flex flex-col justify-center items-center">
                    <span className="text-xs">{item.month}</span>
                    <span className="text-2xl font-bold">
                      {item.date}
                    </span>
                  </div>

                  {/* INFO */}
                  <div className="ms-3 flex flex-col">
                    {getBillIcon(item.name)}

                    <span className="font-bold text-sm">
                      {item.name}
                    </span>

                    <span className="text-xs text-black-400">
                      Last Charge - {item.lastCharge}
                    </span>
                  </div>
                </div>

                {/* PRICE */}
                <div className="flex items-center">
                  <span className="py-1 px-2 border border-gray-200 rounded-lg font-bold">
                    ${item.amount}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      }
    />
  );
}

export default CardUpcomingBill;