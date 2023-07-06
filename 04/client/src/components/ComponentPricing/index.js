function SelectPricing({ name, id, children, action, keyObj }) {


  return (
    <select
      name={name}
      id={id}
      className="select-pricing"
      onChange={(e) => action(keyObj,e.target.value)}
    >
      {children}
    </select>
  );
}
export default SelectPricing;
