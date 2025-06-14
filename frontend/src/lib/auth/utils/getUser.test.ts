import { getUser } from "./getUser";
import { currentUser } from "@clerk/nextjs/server";

// Mock the Clerk module
jest.mock("@clerk/nextjs/server", () => ({
  currentUser: jest.fn(),
}));

const mockCurrentUser = currentUser as jest.MockedFunction<typeof currentUser>;

describe("getUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data when user is authenticated", async () => {
    const mockUser = {
      id: "user123",
      fullName: "John Doe",
    };

    mockCurrentUser.mockResolvedValue(mockUser as any);

    const result = await getUser();

    expect(result).toEqual({
      id: "user123",
      name: "John Doe",
    });
    expect(mockCurrentUser).toHaveBeenCalledTimes(1);
  });

  it("should return null when user is not authenticated", async () => {
    mockCurrentUser.mockResolvedValue(null);

    const result = await getUser();

    expect(result).toBeNull();
    expect(mockCurrentUser).toHaveBeenCalledTimes(1);
  });

  it("should return null when user is undefined", async () => {
    mockCurrentUser.mockResolvedValue(undefined as any);

    const result = await getUser();

    expect(result).toBeNull();
    expect(mockCurrentUser).toHaveBeenCalledTimes(1);
  });

  it("should handle user with null fullName", async () => {
    const mockUser = {
      id: "user123",
      fullName: null,
    };

    mockCurrentUser.mockResolvedValue(mockUser as any);

    const result = await getUser();

    expect(result).toEqual({
      id: "user123",
      name: null,
    });
    expect(mockCurrentUser).toHaveBeenCalledTimes(1);
  });
});
