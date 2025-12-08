import { Error, Loading } from '@/components'

interface GenreDropDownProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string | undefined;
    genres: string[];
    genreLoading: boolean;
    genresError: string | null
}
export default function GenreDropDown({value, genres, onChange, genreLoading, genresError}: GenreDropDownProps) {
    return (
        <div className="w-full md:w-48">
            {genreLoading && <Loading />}
            {genresError && <Error error={genresError} />}
            { !genreLoading && !genresError && 
                (<>
                    <label className="block text-sm font-medium mb-1">
                        Genre
                    </label>
                    <select
                        value={value}
                        onChange={onChange}
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-sky-500"
                    >
                        <option value="">All genres</option>
                        {genres.map((genre, key) => {
                            return (
                                <option value={genre} key={key}>{genre}</option>
                            );
                        })}
                    </select>
                </>
            )}
          </div>
    )
}