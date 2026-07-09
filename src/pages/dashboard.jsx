import React, { useContext, useEffect, useState } from 'react'
import MainLayout from '../components/Layouts/MainLayout';
import Card from '../components/Elements/Card';
import CardBalance from '../components/Fragments/CardBalance';
import CardGoal from '../components/Fragments/CardGoal';
import CardUpcomingBill from '../components/Fragments/CardUpcomingBill';
import CardRecentTransaction from '../components/Fragments/CardRecentTransaction';
import CardStatistic from '../components/Fragments/CardStatistic';
import CardExpenseBreakdown from '../components/Fragments/CardExpenseBreakdown';
import { 
  transactions, 
  bills, 
  expensesBreakdowns, 
  balances, 
  goals, 
  expensesStatistics
} from '../data';

import { goalService, billService } from '../services/dataService';
import { AuthContext } from '../context/authContext';
import AppSnackbar from '../components/Elements/AppSnackbar';

function Dashboard() {
  const [goals, setGoals] = useState({});
  const [bills, setBills] = useState([]);
  const [loadingBills, setLoadingBills] = useState(true);
  const { logout } = useContext(AuthContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  }); 
  
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchGoals = async () => {
    try {
      const data = await goalService();
      setGoals(data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Gagal mengambil data goals",
        severity: "error",
      });
      if (err.status === 401) {
        logout();
      }
    }
  };

 const fetchBills = async () => {
    setLoadingBills(true);
    try {
      const data = await billService();
      console.log('Bills data:', data);
      setBills(data || []);
    } catch (err) {
      console.error("Gagal mengambil data bills:", err);
      if (err.status === 401) {
        logout();
      }
    } finally {
      setLoadingBills(false);
    }
  };

  useEffect(() => {
    fetchGoals();
    fetchBills();
  }, []);
  
  console.log(goals);

  return (
    <>
        <MainLayout>
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <CardBalance data={balances} />
          </div>
          <div className="sm:col-span-4">
            <CardGoal data={goals} />
          </div>
          <div className="sm:col-span-4">
            <CardUpcomingBill data={loadingBills ? [] : bills} />
          </div>
          <div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransaction data={transactions} />
          </div>
          <div className="sm:col-span-8">
            <CardStatistic data={expensesStatistics} />
          </div>
          <div className="sm:col-span-8">
            <CardExpenseBreakdown data={expensesBreakdowns} />
          </div>
        </div>

        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </MainLayout>
    </>
  );
}

export default Dashboard;