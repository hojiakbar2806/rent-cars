type FormInputProps = {
  label: string;
  register: any;
  error?: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
};

const FormInput: React.FC<FormInputProps> = (props) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {props.label}
      </label>
      <input
        {...props.register}
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        data-error={props.error}
        className="w-full p-2 border rounded-lg border-gray-300
        focus:outline-none focus:ring-2 focus:ring-blue-400
        data-[error=true]:border-red-500"
      />
      {props.error && (
        <p className="text-red-500 text-sm mt-1">{props.error}</p>
      )}
    </div>
  );
};

export default FormInput;
