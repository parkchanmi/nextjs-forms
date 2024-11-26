interface FormInputProps {
    type: string;
    placeholder: string;
    required: boolean;
    errors: string[];
    name: string;
  }
  export default function FormInput({
    type,
    placeholder,
    required,
    errors,
    name,
  }: FormInputProps) {
    return (
      <div className="flex flex-col gap-2">
        {errors.length==0?
        <input
        name={name}
        className="px-10 bg-transparent rounded-2xl w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-200 border-none placeholder:text-neutral-400"
        type={type}
        placeholder={placeholder}
        required={required}
      />:
      <input
        name={name}
        className="px-10 bg-transparent rounded-2xl w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-red-500 focus:ring-red-500 border-none "
        type={type}
        placeholder={placeholder}
        required={required}
      />
        }
        {errors.map((error, index) => (
          <span key={index} className="text-red-500 font-medium peer error">
            {error}
          </span>
        ))}
      </div>
    );
  }