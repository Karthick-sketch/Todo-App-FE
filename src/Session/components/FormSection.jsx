function FormField({ type, title }) {
  return (
    <div className="Form-section">
      <p className="FormInput-label">{title}:</p>
      <input type={type} id={title} className="Form-input" autoFocus />
    </div>
  );
}

function FormSubmit({ title, handleSubmit }) {
  return (
    <div className="Form-section">
      <button className="Form-submit" onClick={handleSubmit}>
        {title}
      </button>
    </div>
  );
}

export { FormField, FormSubmit };
