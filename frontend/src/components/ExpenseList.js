import React, { useEffect, useMemo, useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { FaRegEdit } from "react-icons/fa";
import { MdAutoDelete, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ExpenseList = ({
  setVisibleForm,
  handleEditClick,
  handleDeleteClick,
}) => {
  const { deleteSuccess, expenses, deleteLoading, deleteError, fetchLoading, fetchError } = useSelector(
    (state) => state.expenses
  );

  const dispatch = useDispatch();
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Expense deleted");
      dispatch({ type: "RESET_STATUS" });
      setDeletingId(null); // Reset deletingId after successful deletion
    }
  }, [deleteSuccess, dispatch]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
      dispatch({ type: "RESET_STATUS" });
      setDeletingId(null); // Reset deletingId if there's an error
    }
  }, [deleteError, dispatch]);

  const handleDelete = (id) => {
    setDeletingId(id); // Set the deletingId to the id of the expense being deleted
    handleDeleteClick(id);
  };

  const memoizedExpenses = useMemo(
    () =>
      expenses?.map((expense) => (
        <li
          key={expense._id}
          className="flex items-center bg-[#E9E9E9] justify-between mt-3 px-3 rounded-lg py-2 shadow-sm"
        >
          <div>
            <h1 className="font-semibold text-light_black text-xl">
              {expense.category}
            </h1>
            <span className="text-gray-400 text-sm">
              {formatDate(expense.date)}
            </span>
          </div>

          <div className="text-2xl flex justify-center items-center">
            <span className="text-blue_c font-bold text-2xl">
              ₹ {Number(expense.amount || 0).toFixed(2)}
            </span>

            <button
              onClick={() => {
                setVisibleForm(true);
                handleEditClick(expense);
              }}
              className="pl-3 text-light_black pr-1"
            >
              <FaRegEdit />
            </button>
            <button
              disabled={deleteLoading && deletingId === expense._id}
              onClick={() => handleDelete(expense._id)}
              className="pl-1 text-red-500"
            >
              {deleteLoading && deletingId === expense._id ? (
                <MdAutoDelete />
              ) : (
                <MdDelete />
              )}
            </button>
          </div>
        </li>
      )),
    [expenses, handleEditClick, handleDeleteClick, deleteLoading, deletingId]
  );

  if (fetchLoading) {
    return (
      <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
        <div className="flex items-center w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
        <div className="flex items-center w-full max-w-[480px]">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        </div>
        <div className="flex items-center w-full max-w-[400px]">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
        <div className="flex items-center w-full max-w-[480px]">
          <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        </div>
        <div className="flex items-center w-full max-w-[440px]">
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        </div>
        <div className="flex items-center w-full max-w-[360px]">
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
          <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-red-500">
        Failed to load expenses. Please try again later.
      </div>
    );
  }

  return <ul>{memoizedExpenses}</ul>;
};

export default ExpenseList;
