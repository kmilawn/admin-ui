import React from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";
import CircularProgress from "@mui/material/CircularProgress";

function CardExpenseBreakdown(props) {
  const { data } = props;

  const getIconByCategory = (category) => {
    const categoryMap = {
      "Housing": <Icon.House size={20} color="#8B8B8B" />,
      "Food": <Icon.Food size={20} color="#8B8B8B" />,
      "Transportation": <Icon.Transport size={20} color="#8B8B8B" />,
      "Entertainment": <Icon.Movie size={20} color="#8B8B8B" />, 
      "Shopping": <Icon.Shopping size={20} color="#8B8B8B" />,
      "Others": <Icon.Other size={20} color="#8B8B8B" />,
    };
    return categoryMap[category] || <Icon.Expense size={20} color="#8B8B8B" />;
  };

  if (!data || data.length === 0) {
    return (
      <Card
        title="Expenses Breakdown"
        desc={
          <div className="flex flex-col justify-center items-center h-48 text-primary">
            <CircularProgress color="inherit" size={45} />
            <span className="mt-3 text-sm">Loading Data</span>
          </div>
        }
      />
    );
  }

  const expensesData = data.map((item, index) => {
    const category = item.category || item.name;

    return {
      id: index,
      category,
      amount: item.amount,
      percentage: item.percentage,
      trend:
        item.trend ||
        (["Food", "Transportation", "Entertainment"].includes(category)
          ? "down"
          : "up"),
      icon: getIconByCategory(category), 
    };
  });

  return (
    <Card
      title="Expenses Breakdown"
      desc={
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-8">
          {expensesData.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between"
            >
              {/* kiri */}
              <div className="flex items-center">
                <div className="bg-special-bg text-gray-02 p-3 py-5 px-3 rounded-lg flex flex-col place-content-center">
                  {item.icon}
                </div>

                <div className="ml-3">
                  <p className="text-xs text-gray-400">
                    {item.category}
                  </p>

                  <p className="font-bold text-lg leading-5">
                    ${item.amount}
                  </p>

                  <div className="flex items-center text-sm text-gray-400">
                    <span>{item.percentage}%</span>

                    {item.trend === "up" ? (
                      <span className="ml-1 text-red-500">
                        <Icon.ArrowUp size={12} />
                      </span>
                    ) : (
                      <span className="ml-1 text-green-500">
                        <Icon.ArrowDown size={12} />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* kanan */}
              <Icon.ArrowRight
                size={18}
                color="#D1D5DB"
              />
            </div>
          ))}
        </div>
      }
    />
  );
}

export default CardExpenseBreakdown;