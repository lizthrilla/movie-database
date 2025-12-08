interface LimitSelectionProps {
    value: number;
    onChange: (value:number) => void;
}

export default function LimitSelection({value, onChange}: LimitSelectionProps) {
    return(
        <div>
            <label className="block text-sm font-medium mb-1">Results per page</label>
            <select
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
            >
                {[12, 24, 48].map((option) => (
                <option key={option} value={option}>
                    {option} per page
                </option>
                ))}
            </select>
        </div>
    )
}