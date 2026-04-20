// components/BudgetInput.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserBudget } from "../actions/authActions"; // ✅ UNCOMMENTED
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const BudgetInput = ({ setBudgetModal }) => {
  const dispatch = useDispatch();
  const [localBudget, setBudget] = useState("");

  const { updateBudgetLoading, updateBudgetSuccess, updateBudgetError } =
    useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ SEND CORRECT FORMAT
    dispatch(
      updateUserBudget({
        budget: Number(localBudget),
      })
    );

    setBudgetModal(false);
  };

  useEffect(() => {
    if (updateBudgetError) {
      toast.error(updateBudgetError);
    }
    dispatch({ type: "BUDGET_STATE_RESET" });
  }, [updateBudgetError, dispatch]);

  useEffect(() => {
    if (updateBudgetSuccess) {
      toast.success("Budget Updated");
    }
    dispatch({ type: "BUDGET_STATE_RESET" });
  }, [updateBudgetSuccess, dispatch]);

  return (
    <div className="mb-4 fixed shadow-lg border top-[30%] left-10 rounded-xl right-10 bg-white z-10 px-2 py-2">
      <div
        className="w-max cursor-pointer ml-auto text-3xl"
        onClick={() => setBudgetModal(false)}
      >
        <IoMdCloseCircleOutline />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label className="text-lg text-light_black font-semibold mb-2">
          Set Your Monthly Budget
        </label>

        <input
          type="number"
          value={localBudget}
          required
          onChange={(e) => setBudget(e.target.value)}
          className="border rounded-md p-2 mb-2"
          placeholder="Enter your budget"
        />

        <button
          type="submit"
          disabled={updateBudgetLoading}
          className="w-full bg-blue_c w-max px-4 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {updateBudgetLoading ? "Loading..." : "Save Budget"}
        </button>
      </form>
    </div>
  );
};

export default BudgetInput;