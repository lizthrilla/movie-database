import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchMovies, fetchMovieById } from "./movies";
import * as client from "./client";
import type { MoviesResponse, Movie } from "../../types/movies";

describe("movies API helpers", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetchMovies forwards query params and returns typed data", async () => {
    const mockResponse: MoviesResponse = {
      data: [],
      totalPages: 3,
    };

    const apiGetSpy = vi
      .spyOn(client, "apiGet")
      .mockResolvedValue(mockResponse);

    const result = await fetchMovies({
      page: 2,
      limit: 10,
      search: "alien",
      genre: "Horror",
    });

    expect(apiGetSpy).toHaveBeenCalledWith<MoviesResponse>("/movies", {
      page: 2,
      limit: 10,
      search: "alien",
      genre: "Horror",
    });

    expect(result).toEqual(mockResponse);
  });

  it("fetchMovieById calls the correct path", async () => {
    const mockMovie: Movie = {
      id: "abc",
      title: "Test Movie",
    };

    const apiGetSpy = vi
      .spyOn(client, "apiGet")
      .mockResolvedValue(mockMovie);

    const result = await fetchMovieById("abc");

    expect(apiGetSpy).toHaveBeenCalledWith<Movie>("/movies/abc");
    expect(result).toEqual(mockMovie);
  });
});
