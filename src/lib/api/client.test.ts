/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { apiGet, __resetTokenForTests } from "./client";

describe("apiGet", () => {
  beforeEach(() => {
    __resetTokenForTests();
    vi.restoreAllMocks();
  });

  it("fetches a token and calls the API with a bearer header", async () => {
    const tokenResponse = { token: "test-token" };
    const apiResponse = { data: [], totalPages: 0 };

    const fetchMock = vi.fn()
      // 1st call: /auth/token
      .mockResolvedValueOnce(
        new Response(JSON.stringify(tokenResponse), { status: 200 })
      )
      // 2nd call: actual API request
      .mockResolvedValueOnce(
        new Response(JSON.stringify(apiResponse), { status: 200 })
      );

    global.fetch = fetchMock as any;

    const result = await apiGet<{ data: unknown[]; totalPages: number }>(
      "/movies",
      { page: 1, limit: 5 }
    );

    expect(result).toEqual(apiResponse);

    // First call: token endpoint
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/auth/token",
    );

    // Second call: /movies with params + Authorization header
    const secondCallArgs = fetchMock.mock.calls[1];
    expect(secondCallArgs[0]).toContain("/movies?");
    const secondCallInit = secondCallArgs[1] as RequestInit;
    expect(secondCallInit.headers).toMatchObject({
      Authorization: "Bearer test-token",
    });
  });

  it("throws a helpful error when token fetch fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("nope", { status: 500 }));

    global.fetch = fetchMock as any;

    await expect(apiGet("/movies")).rejects.toThrow(
      "Failed to fetch auth token: 500"
    );
  });

  it("throws a helpful error when API request fails", async () => {
    const tokenResponse = { token: "test-token" };

    const fetchMock = vi
      .fn()
      // /auth/token
      .mockResolvedValueOnce(
        new Response(JSON.stringify(tokenResponse), { status: 200 })
      )
      // /movies
      .mockResolvedValueOnce(new Response("nope", { status: 404 }));

    global.fetch = fetchMock as any;

    await expect(apiGet("/movies")).rejects.toThrow(
      "API request failed: 404"
    );
  });
});
