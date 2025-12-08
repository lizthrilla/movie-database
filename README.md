This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deployed on Netlify
[https://thrillamoviedatabase.netlify.app/](https://thrillamoviedatabase.netlify.app/)


## Minimum Requirements
As a user,
● I can search for movies and see a paginated list of results
● I can filter search results by genre
● I can navigate through the next and previous pages of the paginated results
● I see the total count of search results
● I see notable information for each search result, such as the summary, poster,
duration, rating, etc.

## Highlights and Notes

### What I found most interesting 
The “total count of search results” requirement was the most interesting challenge.
The API provides a total number of pages, but not a total number of titles. I explored a few ways to approximate a total title count, but each approach involved unnecessary assumptions or extra client-side work.

Ultimately, I decided the most honest and user-friendly solution was to:

- Display the page number alongside the total pages

- Let users choose how many titles appear per page

This turned out to be a thoughtful UX decision and reinforced how much API contracts shape UI possibilities.

### What I am most proud of 
I’m extremely proud of the overall structure and clarity of the implementation:

- A clean separation between API utilities, custom hooks, and UI components

- Small, isolated, reusable components that are easy to debug and extend

- Intuitive data flow with minimal cross-coupling

- Fetching genres dynamically from the API instead of hardcoding values

- The final app feels structured, maintainable, and scalable—qualities I value highly in real-world engineering work.

### Improvements with more time

1. Enhanced search experience

I’d love to add autocomplete/typeahead using the /movies/titles endpoint, and support filtering by multiple genres simultaneously.

2. Improved movie details page

I would add related movies based on shared genres, and make genre “chips” clickable to trigger a new search.

3. Performance and UX enhancements

I would introduce client-side caching (e.g., React Query) and improve poster fallback handling for missing or broken images.

4. Accessibility improvements

While I use semantic HTML by default, I’d like to expand ARIA support and improve keyboard navigation across all interactive elements.