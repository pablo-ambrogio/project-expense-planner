import { useState, ChangeEvent, FormEvent, useMemo } from "react";
import { useBudget } from "../hooks/useBudget";

export const BudgetForm = () => {
    const [budget, setBudget] = useState(0);

    // we call the custom hook to use dispatch
    const { dispatch } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(+e.target.valueAsNumber);
    };

    // we define the function isValid for valid the state 'budget', and so know if budget is 0 or null
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //if (budget < 0) return console.log("The budget must be greater than 0");

        // use the dispatch for carry out the action 'add-budget'
        dispatch({ type: "add-budget", payload: { budget } });
        console.log("Budget assigned");
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label
                    htmlFor="budget"
                    className="text-4xl text-blue-600 font-bold text-center"
                >
                    Define budget
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define your budget"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value={"Define budget"}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    );
};
