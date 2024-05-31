import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetails from "./ExpenseDetails";

const ExpenseList = () => {
    const { state } = useBudget();

    const filteredExpenses = state.currentCategory
        ? state.expenses.filter(
              (expense) => expense.category === state.currentCategory
          )
        : state.expenses;

    const isEmpty = useMemo(
        () => filteredExpenses.length === 0,
        [filteredExpenses]
    );

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {isEmpty ? (
                <p className="text-gray-600 text-2xl font-bold">
                    There aren't expenses
                </p>
            ) : (
                <>
                    <p className="text-gray-600 text-2xl font-bold">
                        List of expenses
                    </p>
                    <ul>
                        {filteredExpenses.map((expense) => (
                            <ExpenseDetails
                                key={expense.id}
                                expense={expense}
                            />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};
export default ExpenseList;
