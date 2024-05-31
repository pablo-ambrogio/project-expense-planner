import { useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext'

// This custom hook was created for use the context throughout app
export const useBudget = () => {
    const context = useContext(BudgetContext)

    // We ask if context has something, if context doesn't have something we return an error
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider')
    }

    return context
}