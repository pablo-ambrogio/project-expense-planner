import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

const FilterByCategory = () => {
    const { dispatch } = useBudget();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: "filter-by-category",
            payload: { id: e.target.value },
        });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form action="">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filter by category</label>
                    <select
                        id="category"
                        className="bg-slate-100 p-3 flex-1 rounded"
                        onChange={handleChange}
                    >
                        <option value="">All categories</option>
                        {categories.map((category) => (
                            <option id={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
};
export default FilterByCategory;
