import BackToSearch from './BackToSearch'

export default function NotFound() {
    return (
        <main className="min-h-screen bg-slate-900 text-slate-100">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <BackToSearch />

                <p>Movie not found.</p>
            </div>
        </main>
    )
}