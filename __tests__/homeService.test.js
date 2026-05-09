jest.mock("../src/services/apiClient", () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

import { apiClient } from "../src/services/apiClient";
import { fetchHomeItems } from "../src/services/homeService";

describe("homeService", () => {
  it("maps API response into list-friendly data", async () => {
    apiClient.get.mockResolvedValue({
      data: [{ id: 1, title: "Post", body: "Body" }],
    });
    const result = await fetchHomeItems();
    expect(apiClient.get).toHaveBeenCalledWith("/posts");
    expect(result).toEqual([{ id: 1, title: "Post", body: "Body" }]);
  });
});
