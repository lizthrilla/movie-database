interface ErrorProps {
    error: string | null
}
export default function Errors({error}: ErrorProps) {
    return (
        <p className="mb-4 text-sm text-red-400">
            Error: {error}
        </p>
    )
}