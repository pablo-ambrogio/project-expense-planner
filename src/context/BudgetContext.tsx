import { createContext, useReducer, Dispatch, ReactNode, useMemo } from "react";
import {
    BudgetActions,
    BudgetState,
    budgetReducer,
    initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetActions>;
    totalExpenses: number;
    remainingBudget: number;
};

type BudgetProverderProps = {
    children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProverderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    const totalExpenses = useMemo(
        () =>
            state.expenses.reduce(
                (total, expense) => expense.amount + total,
                0
            ),
        [state.expenses]
    );

    const remainingBudget = state.budget - totalExpenses;

    const data = {
        state,
        dispatch,
        totalExpenses,
        remainingBudget,
    };
    return (
        <BudgetContext.Provider value={data}>{children}</BudgetContext.Provider>
    );
};
