export function Input(props) {
  const { label, ...rest } = props;
  return (
    <>
      {label && <label className="block mb-2 text-sm font-medium text-white">{label}</label>}
      <input type="text" className="bg-zinc-800 px-3 py-2 block my-2 w-full" {...rest} />
    </>
  );
}

export default Input;