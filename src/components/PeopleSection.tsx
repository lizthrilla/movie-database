interface PeopleSectionProps {
    title: string;
    detail: string;
}

export default function PeopleSection({title, detail}: PeopleSectionProps) {
    return (
         <section>
            <h3 className="text-sm font-semibold mb-1">{title}</h3>
            <p className="text-sm text-slate-200">
                {detail}
            </p>
        </section>
    )
}