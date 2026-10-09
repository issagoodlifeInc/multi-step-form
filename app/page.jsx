"use client";

import { useState } from "react";

const steps = ["Your info", "Select plan", "Add-ons", "Summary"];
const plans = [
  { name: "Arcade", monthly: 9, yearly: 90, icon: "arcade" },
  { name: "Advanced", monthly: 12, yearly: 120, icon: "advanced" },
  { name: "Pro", monthly: 15, yearly: 150, icon: "pro" },
];
const addOns = [
  { name: "Online service", description: "Access to multiplayer games", monthly: 1, yearly: 10 },
  { name: "Larger storage", description: "Extra 1TB of cloud save", monthly: 2, yearly: 20 },
  { name: "Customizable Profile", description: "Custom theme on your profile", monthly: 2, yearly: 20 },
];

function formatPrice(amount, yearly) {
  return `$${amount}/${yearly ? "yr" : "mo"}`;
}

function validateInfo(info) {
  const errors = {};
  if (!info.name.trim()) errors.name = "This field is required";
  if (!info.email.trim()) errors.email = "This field is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email.trim())) {
    errors.email = "Please enter a valid email address";
  }
  const phoneDigits = info.phone.replace(/\D/g, "");
  if (!info.phone.trim()) errors.phone = "This field is required";
  else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Please enter a valid phone number";
  }
  return errors;
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [yearly, setYearly] = useState(false);
  const [plan, setPlan] = useState("Arcade");
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const selectedPlan = plans.find((item) => item.name === plan) ?? plans[0];
  const total =
    (yearly ? selectedPlan.yearly : selectedPlan.monthly) +
    selectedAddOns.reduce((sum, name) => {
      const item = addOns.find((addOn) => addOn.name === name);
      return sum + (item ? (yearly ? item.yearly : item.monthly) : 0);
    }, 0);

  function nextStep(event) {
    event?.preventDefault();
    if (step === 1) {
      const validation = validateInfo(info);
      setErrors(validation);
      if (Object.keys(validation).length) return;
    }
    setStep((current) => Math.min(current + 1, 5));
  }

  function updateInfo(event) {
    const { name, value } = event.target;
    setInfo((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function toggleAddOn(name) {
    setSelectedAddOns((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
  }

  return (
    <main className="page-shell">
      <section className="form-card" aria-label="Subscription setup">
        <nav className="step-sidebar" aria-label="Form steps">
          <ol className="step-list">
            {steps.map((label, index) => {
              const number = index + 1;
              return (
                <li className="step-item" key={label}>
                  <span className={`step-number${step === number ? " is-active" : ""}`}
                    aria-current={step === number ? "step" : undefined}>{number}</span>
                  <span className="step-copy">
                    <span className="step-eyebrow">Step {number}</span>
                    <span className="step-label">{label}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>

        {step < 5 ? (
          <div className="step-content" key={step}>
            {step === 1 && (
              <form className="step-form" onSubmit={nextStep} noValidate>
                <header className="step-heading">
                  <h1>Personal info</h1>
                  <p>Please provide your name, email address, and phone number.</p>
                </header>
                <div className="field-list">
                  {[
                    { name: "name", label: "Name", placeholder: "e.g. Stephen King", type: "text", autoComplete: "name" },
                    { name: "email", label: "Email Address", placeholder: "e.g. stephenking@lorem.com", type: "email", autoComplete: "email" },
                    { name: "phone", label: "Phone Number", placeholder: "e.g. +1 234 567 890", type: "tel", autoComplete: "tel" },
                  ].map((field) => (
                    <div className="field" key={field.name}>
                      <div className="field-label-row">
                        <label htmlFor={field.name}>{field.label}</label>
                        {errors[field.name] && <span className="field-error" id={`${field.name}-error`}>{errors[field.name]}</span>}
                      </div>
                      <input
                        autoComplete={field.autoComplete}
                        aria-invalid={Boolean(errors[field.name])}
                        aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                        id={field.name}
                        name={field.name}
                        onChange={updateInfo}
                        placeholder={field.placeholder}
                        type={field.type}
                        value={info[field.name]}
                      />
                    </div>
                  ))}
                </div>
                <div className="form-actions form-actions-first">
                  <button className="button button-primary" type="submit">Next Step</button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="step-form">
                <header className="step-heading">
                  <h1>Select your plan</h1>
                  <p>You have the option of monthly or yearly billing.</p>
                </header>
                <fieldset className="plan-options">
                  <legend className="visually-hidden">Choose a plan</legend>
                  {plans.map((item) => (
                    <label className={`plan-card${plan === item.name ? " is-selected" : ""}`} key={item.name}>
                      <input checked={plan === item.name} name="plan" onChange={() => setPlan(item.name)} type="radio" value={item.name} />
                      <span className={`plan-icon icon-${item.icon}`} aria-hidden="true" />
                      <span className="plan-details">
                        <span className="plan-name">{item.name}</span>
                        <span className="plan-price">{formatPrice(yearly ? item.yearly : item.monthly, yearly)}</span>
                        {yearly && <span className="plan-promo">2 months free</span>}
                      </span>
                    </label>
                  ))}
                </fieldset>
                <div className="billing-toggle">
                  <span className={!yearly ? "is-current" : ""}>Monthly</span>
                  <button aria-checked={yearly} aria-label="Yearly billing" className="switch"
                    onClick={() => setYearly((current) => !current)} role="switch" type="button"><span /></button>
                  <span className={yearly ? "is-current" : ""}>Yearly</span>
                </div>
                <div className="form-actions">
                  <button className="button button-back" onClick={() => setStep(1)} type="button">Go Back</button>
                  <button className="button button-primary" onClick={nextStep} type="button">Next Step</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step-form">
                <header className="step-heading">
                  <h1>Pick add-ons</h1>
                  <p>Add-ons help enhance your gaming experience.</p>
                </header>
                <fieldset className="extra-options">
                  <legend className="visually-hidden">Optional add-ons</legend>
                  {addOns.map((item) => {
                    const checked = selectedAddOns.includes(item.name);
                    return (
                      <label className={`extra-card${checked ? " is-selected" : ""}`} key={item.name}>
                        <input checked={checked} onChange={() => toggleAddOn(item.name)} type="checkbox" value={item.name} />
                        <span className="custom-checkbox" aria-hidden="true" />
                        <span className="extra-copy">
                          <span className="extra-name">{item.name}</span>
                          <span className="extra-description">{item.description}</span>
                        </span>
                        <span className="extra-price">+{formatPrice(yearly ? item.yearly : item.monthly, yearly)}</span>
                      </label>
                    );
                  })}
                </fieldset>
                <div className="form-actions">
                  <button className="button button-back" onClick={() => setStep(2)} type="button">Go Back</button>
                  <button className="button button-primary" onClick={nextStep} type="button">Next Step</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="step-form">
                <header className="step-heading">
                  <h1>Finishing up</h1>
                  <p>Double-check everything looks OK before confirming.</p>
                </header>
                <div className="summary">
                  <div className="summary-plan">
                    <div>
                      <p className="summary-plan-name">{selectedPlan.name} ({yearly ? "Yearly" : "Monthly"})</p>
                      <button className="text-link" onClick={() => setStep(2)} type="button">Change</button>
                    </div>
                    <strong>{formatPrice(yearly ? selectedPlan.yearly : selectedPlan.monthly, yearly)}</strong>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div className="summary-extras">
                      {selectedAddOns.map((name) => {
                        const item = addOns.find((addOn) => addOn.name === name);
                        if (!item) return null;
                        return (
                          <div className="summary-extra" key={name}>
                            <span>{name}</span>
                            <span>+{formatPrice(yearly ? item.yearly : item.monthly, yearly)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="summary-total">
                  <span>Total (per {yearly ? "year" : "month"})</span>
                  <strong>{formatPrice(total, yearly)}</strong>
                </div>
                <div className="form-actions">
                  <button className="button button-back" onClick={() => setStep(3)} type="button">Go Back</button>
                  <button className="button button-confirm" onClick={() => setStep(5)} type="button">Confirm</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <section className="thank-you" aria-labelledby="thank-you-title">
            <div className="thank-you-icon" aria-hidden="true" />
            <h1 id="thank-you-title">Thank you!</h1>
            <p>
              Thanks for confirming your subscription! We hope you have fun using our platform. If you
              ever need support, please feel free to email us at{" "}
              <a href="mailto:support@loremgaming.com">support@loremgaming.com</a>.
            </p>
          </section>
        )}
      </section>
      <nav className="mobile-step-list" aria-label="Form steps">
        {steps.map((label, index) => {
          const number = index + 1;
          return <span aria-current={step === number ? "step" : undefined}
            className={`step-number${step === number ? " is-active" : ""}`} key={label}>{number}</span>;
        })}
      </nav>
    </main>
  );
}
