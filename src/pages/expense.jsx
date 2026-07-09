import React, { useContext, useEffect, useState } from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import { expenseService } from '../services/dataService';
import { AuthContext } from '../context/authContext';
import CircularProgress from '@mui/material/CircularProgress';
import Icon from '../components/Elements/Icon';

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  // Data dummy sesuai gambar
  const expensesData = [
  {
    id: 1,
    category: "Housing",
    icon: <Icon.House size={22} color="#8B8B8B" />,
    amount: 250,
    percentage: 15,
    trend: "up",
    items: [
      {
        title: "House Rent",
        amount: 230,
        date: "17 May 2023",
      },
      {
        title: "Parking",
        amount: 20,
        date: "17 May 2023",
      },
    ],
  },

  {
    id: 2,
    category: "Food",
    icon: <Icon.Food size={22} color="#8B8B8B" />,
    amount: 350,
    percentage: 8,
    trend: "down",
    items: [
      {
        title: "Grocery",
        amount: 230,
        date: "17 May 2023",
      },
      {
        title: "Restaurant Bill",
        amount: 120,
        date: "17 May 2023",
      },
    ],
  },

  {
    id: 3,
    category: "Transportation",
    icon: <Icon.Transport size={22} color="#8B8B8B" />,
    amount: 50,
    percentage: 12,
    trend: "down",
    items: [
      {
        title: "Taxi Fare",
        amount: 30,
        date: "17 May 2023",
      },
      {
        title: "Metro Card Bill",
        amount: 20,
        date: "17 May 2023",
      },
    ],
  },

  {
    id: 4,
    category: "Entertainment",
    icon: <Icon.Movie size={22} color="#8B8B8B" />,
    amount: 80,
    percentage: 15,
    trend: "down",
    items: [
      {
        title: "Movie Ticket",
        amount: 30,
        date: "17 May 2023",
      },
      {
        title: "iTunes",
        amount: 50,
        date: "17 May 2023",
      },
    ],
  },

  {
    id: 5,
    category: "Shopping",
    icon: <Icon.Shopping size={22} color="#8B8B8B" />,
    amount: 420,
    percentage: 25,
    trend: "up",
    items: [
      {
        title: "Shirt",
        amount: 230,
        date: "17 May 2023",
      },
      {
        title: "Jeans",
        amount: 190,
        date: "17 May 2023",
      },
    ],
  },

  {
    id: 6,
    category: "Others",
    icon: <Icon.Other size={22} color="#8B8B8B" />,
    amount: 50,
    percentage: 23,
    trend: "up",
    items: [
      {
        title: "Donation",
        amount: 30,
        date: "17 May 2023",
      },
      {
        title: "Gift",
        amount: 20,
        date: "17 May 2023",
      },
    ],
  },
];

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await expenseService();
      console.log('Expenses data:', data);
      
      if (data && Array.isArray(data) && data.length > 0) {
        setExpenses(data);
      } else {
        setExpenses(dummyData);
      }
    } catch (err) {
      console.error("Gagal mengambil data expenses:", err);
      setExpenses(dummyData);
      if (err.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Icon untuk setiap kategori
  const getIcon = (category) => {
    const icons = {
      "Housing": <Icon.House size={20} color="#6B7280" />,
      "Food": <Icon.Food size={20} color="#6B7280" />,
      "Transportation": <Icon.Transport size={20} color="#6B7280" />,
      "House Rent": <Icon.House size={20} color="#6B7280" />,
      "Grocery": <Icon.Food size={20} color="#6B7280" />,
      "Taxi Fare": <Icon.Transport size={20} color="#6B7280" />,
      "Parking": <Icon.Transport size={20} color="#6B7280" />,
      "Restaurant Bill": <Icon.Food size={20} color="#6B7280" />,
      "Metro Card Bill": <Icon.Transport size={20} color="#6B7280" />,
      "Entertainment": <Icon.Movie size={20} color="#6B7280" />,
      "Shopping": <Icon.Shopping size={20} color="#6B7280" />,
      "Others": <Icon.Other size={20} color="#6B7280" />,
      "Movie Ticket": <Icon.Movie size={20} color="#6B7280" />,
      "Shirt": <Icon.Shopping size={20} color="#6B7280" />,
      "Donation": <Icon.Other size={20} color="#6B7280" />,
      "iTunes": <Icon.Movie size={20} color="#6B7280" />,
      "Jeans": <Icon.Shopping size={20} color="#6B7280" />,
      "Gift": <Icon.Other size={20} color="#6B7280" />
    };
    return icons[category] || <Icon.Expense size={20} color="#6B7280" />;
  };

  // Tampilkan arrow berdasarkan trend
  const getTrendArrow = (trend) => {
    if (trend === "up") return <span className="text-green-500">↑</span>;
    if (trend === "down") return <span className="text-red-500">↓</span>;
    return null;
  };

  // Split data menjadi 2 kolom
  const midIndex = Math.ceil(expenses.length / 2);
  const leftColumn = expenses.slice(0, midIndex);
  const rightColumn = expenses.slice(midIndex);

  return (
    <MainLayout>
      <div >

    <h2 className="text-2xl text-gray-500 mb-5">
        Expenses Comparison
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {expensesData.map((card) => (

            <div
                key={card.id}
                className="bg-[#F4F4F4] rounded-xl overflow-hidden "
            >

                {/* Header */}

                <div className="flex justify-between p-5">

                    <div className="flex">

                        <div className="bg-special-bg text-gray-02 px-3 rounded-lg flex flex-col place-content-center">

                            {card.icon}

                        </div>

                        <div className="ml-4">

                            <p className="text-gray-500 font-semibold">

                                {card.category}

                            </p>

                            <h1 className="text-xl font-bold dark:text-black">

                                ${card.amount}

                            </h1>

                        </div>

                    </div>

                    <div className="text-right">

                        <div
                            className={`flex justify-end items-center gap-1 font-bold ${
                                card.trend === "up"
                                    ? "text-red-500"
                                    : "text-green-500"
                            }`}
                        >
                            <span className="text-gray-400 font-bold text-sm">
                                {card.percentage}%
                            </span>

                            {card.trend === "up" ? (
                                <Icon.ArrowUp size={16} />
                            ) : (
                                <Icon.ArrowDown size={16} />
                            )}
                        </div>

                        <p className="text-gray-400 text-sm">

                            Compare to the last month

                        </p>

                    </div>

                </div>

                {/* List */}

                <div className="bg-white">

                    {card.items.map((item, index) => (

                        <div
                            key={index}
                            className={`flex justify-between px-5 py-5 ${
                                index !== card.items.length - 1
                                    ? "border-b"
                                    : ""
                            }`}
                        >

                            <span className="font-bold text-gray-500 ">

                                {item.title}

                            </span>

                            <div className="text-right">

                                <div className="font-bold text-gray-500">

                                    ${item.amount}

                                </div>

                                <div className="text-sm text-gray-500">

                                    {item.date}

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        ))}

    </div>

</div>
    </MainLayout>
  );
}

export default ExpensesPage;