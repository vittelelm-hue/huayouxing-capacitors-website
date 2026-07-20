"use client";

import { useState } from "react";
import { capacitanceSelections } from "../site";

type CapacitanceSelectorProps = {
  initialSeries?: string;
  showSeriesTabs?: boolean;
};

export default function CapacitanceSelector({
  initialSeries,
  showSeriesTabs = true,
}: CapacitanceSelectorProps) {
  const initialSelection =
    capacitanceSelections.find((selection) => selection.code === initialSeries) ??
    capacitanceSelections[0];
  const [activeCode, setActiveCode] = useState(initialSelection.code);
  const activeSelection =
    capacitanceSelections.find((selection) => selection.code === activeCode) ??
    initialSelection;

  return (
    <div className="capacitance-selector">
      <div className="capacitance-selector-heading">
        <p className="eyebrow">Product selection</p>
        <h2>Available capacitance and rated voltage.</h2>
        <p>
          Select a product series to review the available values. Confirm
          tolerance, dimensions, terminals and order requirements by inquiry.
        </p>
      </div>

      {showSeriesTabs ? (
        <div className="capacitance-tablist" role="tablist" aria-label="Capacitor series">
          {capacitanceSelections.map((selection) => {
            const active = selection.code === activeSelection.code;

            return (
              <button
                aria-selected={active}
                className="capacitance-tab"
                key={selection.code}
                onClick={() => setActiveCode(selection.code)}
                role="tab"
                type="button"
              >
                {selection.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="capacitance-selection" role="tabpanel">
        <div className="capacitance-selection-intro">
          <span className="product-code">{activeSelection.code}</span>
          <h3>{activeSelection.subtitle}</h3>
          <a className="text-link" href={`/#inquiry`}>
            Request {activeSelection.code} specifications
          </a>
        </div>
        <div className="capacitance-variant-grid">
          {activeSelection.variants.map((variant) => (
            <section className="capacitance-variant" key={variant.label}>
              <div className="capacitance-variant-heading">
                <h4>{variant.label}</h4>
                <span>{variant.voltage}</span>
              </div>
              <div className="capacitance-value-list" aria-label={`${variant.label} capacitance values`}>
                {variant.values.map((value) => (
                  <span className="capacitance-value" key={value}>
                    {value}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
