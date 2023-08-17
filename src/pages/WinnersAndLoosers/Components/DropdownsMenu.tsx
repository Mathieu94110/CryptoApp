import { ChangeEvent } from "react";
import "./DropdownsMenu.scss";

export default function DropdownsMenu({
  selectedCategory,
  top,
  period,
  changeParams,
}: {
  selectedCategory: string;
  top: string;
  period: string;
  changeParams: ({ name, value }: { name: string; value: string }) => void;
}) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    changeParams({ name, value });
  };
  return (
    <div className="dropdowns-menu">
      <label>
        Rubrique
        <select
          value={selectedCategory}
          name="category"
          onChange={handleChange}
          className="dropdowns-menu__select"
        >
          <option value="Gagnants">Gagnants</option>
          <option value="Perdants">Perdants</option>
        </select>
      </label>
      <label>
        Top
        <select
          value={top}
          onChange={handleChange}
          name="top"
          className="dropdowns-menu__select"
        >
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="150">150</option>
          <option value="200">200</option>
          <option value="250">250</option>
        </select>
      </label>
      <label>
        Période
        <select
          value={period}
          onChange={handleChange}
          name="period"
          className="dropdowns-menu__select"
        >
          <option value="24h">24h</option>
          <option value="7j">7j</option>
        </select>
      </label>
    </div>
  );
}
