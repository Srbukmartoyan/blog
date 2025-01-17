const InputField = ({ name, value, onChange, placeholder, type = 'text', required = true }) => {

  if (type === 'textarea') {
    return (
      <textarea
        rows={4}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        required={required}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
      required={required}
    />
  );
}

export default InputField;
