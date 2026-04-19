// components/BudgetInput.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateUserBudget } from "../actions/authActions";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const BudgetInput = ({ setBudgetModal }) => {
  const dispatch = useDispatch();
  const [localBudget, setBudget] = useState();
  const { updateBudgetLoading, updateBudgetSuccess, updateBudgetError } =
    useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //await dispatch(updateUserBudget(localBudget));
    setBudgetModal(false);
  };

  useEffect(() => {
    if (updateBudgetError) {
      toast.error(updateBudgetError);
    }
    dispatch({ type: "BUDGET_STATE_RESET" });
  }, [updateBudgetError]);

  useEffect(() => {
    if (updateBudgetSuccess) {
      toast.success("Budget Updated");
    }
    dispatch({ type: "BUDGET_STATE_RESET" });
  }, [updateBudgetSuccess]);
  return (
    <div className="mb-4 fixed shadow-lg border top-[30%]  left-10 rounded-xl right-10 bg-white z-10 px-2 py-2 ">
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
          {updateBudgetLoading ? (
            <div className="flex justify-center items-center">
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-2 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...
            </div>
          ) : (
            "Save Budget"
          )}
        </button>
      </form>
    </div>
  );
};

export default BudgetInput;
