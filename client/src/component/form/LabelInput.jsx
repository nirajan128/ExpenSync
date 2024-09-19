function LabelInput(props) {
  return (
    <div className="mt-3">
      <label htmlFor={props.name} className="form-label fw-bold">
        {props.name}
      </label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className="form-control"
        required
      />
    </div>
  );
}
export default LabelInput;
