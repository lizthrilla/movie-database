interface DetailLabelProps {
    label: string;
    detail: string | number | null;
}

export default function DetailLabel({detail, label}: DetailLabelProps) {
    return (
        <span className="inline-flex items-center rounded-full bg-slate-800 border border-slate-700 px-3 py-1">
            {label} {detail}
        </span>
    )
}