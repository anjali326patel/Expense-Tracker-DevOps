import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";

function UseChart({ totalExpense, onEditBudget }) {
  // GET BUDGET FROM REDUX (NOT sessionStorage)
  const { budget } = useSelector((state) => state.auth);

  const budgetValue = Number(budget || 0);
  const expensesValue = Number(totalExpense || 0);
  const remainingBudget = Math.max(budgetValue - expensesValue, 0);

  return (
    <div className="relative mx-auto">
      <div className="relative w-3/5 mx-auto">
        <PieChart
          data={[
            { title: "Expenses", value: expensesValue, color: "#F9A11B" },
            {
              title: "Remaining Budget",
              value: remainingBudget,
              color: "#2A306E",
            },
          ]}
          labelStyle={{
            fontSize: "5px",
            fontFamily: "sans-serif",
            fill: "#fff",
          }}
          radius={42}
          animate
          lineWidth={20}
        />

        <div className="absolute text-4xl inset-0 flex flex-col items-center justify-center">
          <div className="relative text-center rounded-full p-4">
            <p className="text-sm font-semibold text-[#6E6D6D]">Balance</p>

            {/* FIXED DISPLAY */}
            <p className="font-bold text-[1.7vw] text-light_black">
              Rs.{budgetValue.toFixed(2)}
            </p>

            <p
              onClick={onEditBudget}
              className="text-[#6E6D6D] w-max mx-auto text-lg cursor-pointer"
            >
              <MdEdit />
            </p>
          </div>
        </div>
      </div>

      <div className="flex text-light_black border-b pb-3 justify-center whitespace-nowrap mt-2">
        <div className="flex items-center mr-4">
          <div
            className="w-4 h-4 mr-2"
            style={{ backgroundColor: "#F9A11B" }}
          ></div>
          <span>Expenses</span>
        </div>
        <div className="flex items-center">
          <div
            className="w-4 h-4 mr-2"
            style={{ backgroundColor: "#2A306E" }}
          ></div>
          <span>Remaining Budget</span>
        </div>
      </div>

      <ul className="font-bold list-disc text-md pl-5 text-start text-blue_c flex justify-between mt-4">
        <li>
          EXPENSES
          <h2 className="text-light_black text-xl">
            Rs.{expensesValue.toFixed(2)}
          </h2>
        </li>
        <li>
          REMAINING
          <h3 className="text-light_black text-xl">
            Rs.{remainingBudget.toFixed(2)}
          </h3>
        </li>
      </ul>
    </div>
  );
}

export default UseChart;