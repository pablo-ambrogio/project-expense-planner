import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ChangeEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

const ExpenseForm = () => {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date(),
    });
    const [error, setError] = useState("");
    const [previousAmount, setPreviousAmount] = useState(0);
    const { state, dispatch, remainingBudget } = useBudget();

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(
                (expense) => expense.id === state.editingId
            )[0];
            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount);
        }
    }, [state.editingId]);

    const handelChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const isAmountField = ["amount"].includes(name);

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value,
        });
    };

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // valid
        if (Object.values(expense).includes("")) {
            setError("All fields are required");
            return;
        }

        // validate not to go over the limit
        if (expense.amount - previousAmount > remainingBudget) {
            setError("That expense is out of budget");
            return;
        }

        // add or update the expense
        if (state.editingId) {
            dispatch({
                type: "update-expense",
                payload: {
                    expense: {
                        id: state.editingId,
                        ...expense,
                    },
                },
            });
        } else {
            dispatch({ type: "add-expense", payload: { expense } });
        }

        //    setExpense({
        //         amount: 0,
        //         expenseName: "",
        //         category: "",
        //         date: new Date(),
        //     });
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500">
                {state.editingId ? "Edit expense" : "New expense"}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Name expense
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Add the name the expense"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handelChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Amount
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Add the amount of the expense"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handelChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">
                    Category
                </label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handelChange}
                >
                    <option value=""> --- Select --- </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Date expense
                </label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId ? "Edit expense" : "Add expense"}
            />
        </form>
    );
};
export default ExpenseForm;
