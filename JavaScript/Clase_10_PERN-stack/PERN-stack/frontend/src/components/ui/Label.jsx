export function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-400 mb-2">
      {children}
    </label>
  );
}

export default Label;
