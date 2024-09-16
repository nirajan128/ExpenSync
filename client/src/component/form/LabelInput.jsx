function LabelInput(props) {
  return (
    <>
      <label htmlFor={props.name} className="form-label">
        {props.name}
      </label>
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        className="form-control"
      />
    </>
  );
}
export default LabelInput;
