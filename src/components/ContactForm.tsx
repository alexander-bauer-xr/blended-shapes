import { useState } from "react";
import { ContactFormData, Step } from "../types/contactTypes";
import { getNextStep } from "./contactFormMachine";

const services = ["Creative Coding", "3D Design", "Art Direction", "Web Development"];

export default function ContactForm() {
  const [step, setStep] = useState<Step>("name");
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    service: "",
    email: "",
    message: "",
  });

  const handleNext = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setStep(getNextStep(step));
  };

  const handleSubmit = async () => {
    await fetch("https://blended-shapes.com/cms-blended-shapes/actions/contact-form/save-entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStep("done");
  };

  return (
    <div className="contact-form container-xl content">
        <h2>Kontakt</h2>
      {step === "name" && (
        <div className="lead-wrapper">
          <h3>Wie heißt du?</h3>
          <input
            type="text"
            onKeyDown={(e) => e.key === "Enter" && handleNext("name", e.currentTarget.value)}
            autoFocus
          />
        </div>
      )}

      {step === "service" && (
        <div className="lead-wrapper">
          <h3>Was interessiert dich?</h3>
          
            <p>Ich bin spezialisiert auf:</p>
            <div className="contact-services">
          {services.map((service) => (
            <button key={service} onClick={() => handleNext("service", service)}>
              {service}
            </button>
          ))}
          </div>
        </div>
      )}

      {step === "email" && (
        <div className="lead-wrapper">
          <h3>Wie lautet deine E-Mail?</h3>
          <input
            type="email"
            onKeyDown={(e) => e.key === "Enter" && handleNext("email", e.currentTarget.value)}
            autoFocus
          />
        </div>
      )}

      {step === "message" && (
        <div className="lead-wrapper">
          <h3>Gibt es etwas, das du uns erzählen willst?</h3>
          <textarea
            onKeyDown={(e) => e.key === "Enter" && handleNext("message", e.currentTarget.value)}
            autoFocus
          />
          <button onClick={handleSubmit}>Senden</button>
        </div>
      )}

      {step === "done" && <p>Danke für deine Nachricht! Wir melden uns bei dir.</p>}
    </div>
  );
}