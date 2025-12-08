interface SearchBarProps {
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string; 
    value: string;
}
export default function SearchBar({ label, onChange, placeholder, value }: SearchBarProps) {
    return (
        <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              {label}
            </label>
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-sky-500"
            />
          </div>
    )
}