import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";

import {
  fetchExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  logout,
} from "../actions/expenseActions";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import UserInfo from "../components/UserInfo";
import UseChart from "../components/UseChart";
import BudgetInput from "../components/BudgetInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { budget, token, user } = useSelector((state) => state.auth);

  const { expenses, newUserEarliestDate, earliestDate } = useSelector(
    (state) => state.expenses
  );
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [visibleForm, setVisibleForm] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [showBudgetModal, setBudgetModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getMonthOptions = () => {
    //if (!earliestDate||!newUserEarliestDate) return [];

    const startDate = new Date(earliestDate || newUserEarliestDate);
    const currentDate = new Date();

    let months = [];
    for (let y = startDate.getFullYear(); y <= currentDate.getFullYear(); y++) {
      let startM = y === startDate.getFullYear() ? startDate.getMonth() + 1 : 1;
      let endM =
        y === currentDate.getFullYear() ? currentDate.getMonth() + 1 : 12;
      for (let m = startM; m <= endM; m++) {
        months.push({ year: y, month: m });
      }
    }
    return months;
  };

  useEffect(() => {
    dispatch(fetchExpenses(month, year));
  }, [dispatch, month, year]);

  const handleAddExpense = useCallback(
    async (e) => {
      e.preventDefault();
      if (!amount || !category) return;
      const parsedAmount = Number(amount);
      if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }
      const newExpense = { amount: parsedAmount, category: category.trim() };

      if (editId) {
        await dispatch(updateExpense(editId, newExpense));
        setAmount("");
        setCategory("");
        setVisibleForm(false);
        setEditId(null);
      } else {
        await dispatch(addExpense(newExpense));
        setAmount("");
        setCategory("");
        setVisibleForm(false);
      }
    },
    [amount, category, editId, dispatch]
  );

  const handleEditClick = (expense) => {
    setEditId(expense._id);
    setAmount(expense.amount);
    setCategory(expense.category);
    setVisibleForm(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteExpense(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("budget");
    navigate("/login");
  };

  const handleMonthChange = (e) => {
    setMonth(Number(e.target.value));
  };

  const handleYearChange = (e) => {
    setYear(Number(e.target.value));
  };

  const showForm = () => {
    setVisibleForm(!visibleForm);
  };

  const totalExpense = expenses.reduce((accumulator, item) => {
    return accumulator + Number(item.amount || 0);
  }, 0);

  function onEditBudget() {
    setBudgetModal(!showBudgetModal);
  }

  useEffect(() => {
    let sessionBudget = sessionStorage.getItem("budget");
    if (sessionBudget <= 0) {
      toast.info("Please add your budget");
      setTimeout(() => {
        setBudgetModal(true);
      }, 500);
    }
  }, []);

  return (
    <div className="container relative mx-auto pb-20 px-4 pt-5">
      <UserInfo user={user} onLogout={handleLogout} />

      {showBudgetModal && <BudgetInput setBudgetModal={setBudgetModal} />}
      {visibleForm && (
        <ExpenseForm
          amount={amount}
          setAmount={setAmount}
          category={category}
          setCategory={setCategory}
          editId={editId}
          setEditId={setEditId}
          setVisibleForm={setVisibleForm}
          handleAddExpense={handleAddExpense}
        />
      )}
      <UseChart
        totalExpense={totalExpense}
        onEditBudget={onEditBudget}
        budget={budget}
      />
      <div className="flex justify-between text-blue_c items-start pt-5 gap-3">
        <div>
          {" "}
          <h1 className="font-bold text-2xl">Transactions</h1>
          {earliestDate && (
            <div className="flex mt-2 mb-4 flex-wrap gap-2">
              <select
                value={month}
                onChange={handleMonthChange}
                className="border bg-[#E9E9E9] uppercase font-medium rounded-md p-2 min-w-[140px]"
              >
                {getMonthOptions().map(({ year, month }) => (
                  <option key={uuidv4()} value={month}>
                    {new Date(year, month - 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={handleYearChange}
                className="border bg-[#E9E9E9] uppercase font-medium rounded-md p-2 min-w-[110px]"
              >
                {Array.from(
                  {
                    length:
                      new Date().getFullYear() -
                      new Date(
                        earliestDate || newUserEarliestDate
                      ).getFullYear() +
                      1,
                  },
                  (_, i) => new Date().getFullYear() - i
                ).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={showForm}
          className="bg-[#519400] mt-1 font-bold rounded-tr-xl rounded-bl-xl flex items-center text-white h-max px-3 py-2 shadow-sm"
        >
          <IoMdAddCircleOutline className="mr-1" />
          ADD
        </button>
      </div>
      {expenses.length > 0 ? (
        <ExpenseList
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          setVisibleForm={setVisibleForm}
        />
      ) : (
        <h3 className="text-center w-max mx-auto pt-5">No Transactions </h3>
      )}
    </div>
  );
};

export default ExpenseTracker;
