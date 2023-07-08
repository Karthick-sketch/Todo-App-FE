function FormField(props) {
  return (
    <div className="Form-section">
      <p className="FormInput-label">{props.title}:</p>
      <input
        type={props.type}
        id={props.title}
        className="Form-input"
        autoFocus
      />
    </div>
  );
}

function FormSubmit(props) {
  return (
    <div className="Form-section">
      <button className="Form-submit" onClick={props.handleSubmit}>
        {props.title}
      </button>
    </div>
  );
}

export { FormField, FormSubmit };
