import { useState } from "react";
import "./DropdownsMenu.scss";

export default function DropdownsMenu({
  selectedCategory,
  top,
  period,
  changeTop,
  changeCategory,
  changePeriod,
}: {
  selectedCategory: string;
  top: string;
  period: string;
  changeTop: any;
  changeCategory: any;
  changePeriod: any;
}) {
  function handleTopChange(e: any) {
    const topValue = e.target.value;
    changeTop(topValue);
  }
  function handleCategoryChange(e: any) {
    const categoryValue = e.target.value;
    changeCategory(categoryValue);
  }
  function handlePeriodChange(e: any) {
    const periodValue = e.target.value;
    changePeriod(periodValue);
  }

  return (
    <div className="dropdown">
      <label>
        Rubrique
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="dropdown__select"
        >
          <option value="Gagnants">Gagnants</option>
          <option value="Perdants">Perdants</option>
        </select>
      </label>
      <label>
        Top
        <select
          value={top}
          onChange={handleTopChange}
          className="dropdown__select"
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
          onChange={handlePeriodChange}
          className="dropdown__select"
        >
          <option value="24h">24 heures</option>
          <option value="7">7 jours</option>
          <option value="14">14 jours</option>
          <option value="30">30 jours</option>
        </select>
      </label>
    </div>
  );
}
