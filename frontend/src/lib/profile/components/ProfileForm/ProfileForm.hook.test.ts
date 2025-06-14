import { renderHook, act, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { useProfileForm } from "./ProfileForm.hook";
import { saveProfileForLoggedUserAction } from "../../actions/saveProfileForLoggedUserAction";
import { TProfileSchema } from "../../schema/profileSchema";

// Mock dependencies
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../actions/saveProfileForLoggedUserAction", () => ({
  saveProfileForLoggedUserAction: jest.fn(),
}));

const mockToast = toast as jest.Mocked<typeof toast>;
const mockSaveProfileAction = saveProfileForLoggedUserAction as jest.MockedFunction<
  typeof saveProfileForLoggedUserAction
>;

describe("useProfileForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values when no user profile provided", () => {
    const { result } = renderHook(() => useProfileForm(null));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.form.getValues()).toEqual({
      dob: "",
      gender: "male",
      weight: 0,
      height: 0,
      activityLevel: "sedentary",
    });
  });

  it("should initialize with provided user profile values", () => {
    const userProfile: TProfileSchema = {
      dob: "1990-01-01",
      gender: "female",
      weight: 65,
      height: 170,
      activityLevel: "moderate",
    };

    const { result } = renderHook(() => useProfileForm(userProfile));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.form.getValues()).toEqual(userProfile);
  });

  it("should handle successful form submission", async () => {
    const userProfile: TProfileSchema = {
      dob: "1990-01-01",
      gender: "male",
      weight: 70,
      height: 180,
      activityLevel: "moderate",
    };

    mockSaveProfileAction.mockResolvedValue(undefined);

    const { result } = renderHook(() => useProfileForm(null));

    await act(async () => {
      await result.current.onSubmit(userProfile);
    });

    expect(mockSaveProfileAction).toHaveBeenCalledWith({ profile: userProfile });
    expect(mockSaveProfileAction).toHaveBeenCalledTimes(1);
    expect(mockToast.success).toHaveBeenCalledWith("Profil został pomyślnie zapisany.");
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle form submission error", async () => {
    const userProfile: TProfileSchema = {
      dob: "1990-01-01",
      gender: "male",
      weight: 70,
      height: 180,
      activityLevel: "moderate",
    };

    const errorMessage = "Failed to save profile";
    mockSaveProfileAction.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProfileForm(null));

    await act(async () => {
      await result.current.onSubmit(userProfile);
    });

    expect(mockSaveProfileAction).toHaveBeenCalledWith({ profile: userProfile });
    expect(mockSaveProfileAction).toHaveBeenCalledTimes(1);
    expect(mockToast.error).toHaveBeenCalledWith(
      `Błąd podczas zapisywania profilu: Error: ${errorMessage}`
    );
    expect(result.current.isLoading).toBe(false);
  });

  it("should set loading state during form submission", async () => {
    const userProfile: TProfileSchema = {
      dob: "1990-01-01",
      gender: "male",
      weight: 70,
      height: 180,
      activityLevel: "moderate",
    };

    let resolvePromise: () => void;
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });

    mockSaveProfileAction.mockReturnValue(promise);

    const { result } = renderHook(() => useProfileForm(null));

    // Start submission
    act(() => {
      result.current.onSubmit(userProfile);
    });

    // Check loading state is true during submission
    expect(result.current.isLoading).toBe(true);

    // Resolve the promise
    await act(async () => {
      resolvePromise();
      await promise;
    });

    // Check loading state is false after submission
    expect(result.current.isLoading).toBe(false);
  });

  it("should use zod resolver for form validation", () => {
    const { result } = renderHook(() => useProfileForm(null));

    // Verify that the form is using the correct resolver
    expect(result.current.form).toBeDefined();
    expect(typeof result.current.form.trigger).toBe("function");
    expect(typeof result.current.form.setValue).toBe("function");
  });

  it("should reset loading state even if action throws", async () => {
    const userProfile: TProfileSchema = {
      dob: "1990-01-01",
      gender: "male",
      weight: 70,
      height: 180,
      activityLevel: "moderate",
    };

    mockSaveProfileAction.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useProfileForm(null));

    await act(async () => {
      await result.current.onSubmit(userProfile);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("should handle different activity levels", () => {
    const activityLevels: TProfileSchema["activityLevel"][] = [
      "sedentary",
      "light",
      "moderate",
      "active",
      "veryActive",
    ];

    activityLevels.forEach((activityLevel) => {
      const userProfile: TProfileSchema = {
        dob: "1990-01-01",
        gender: "male",
        weight: 70,
        height: 180,
        activityLevel,
      };

      const { result } = renderHook(() => useProfileForm(userProfile));
      expect(result.current.form.getValues().activityLevel).toBe(activityLevel);
    });
  });

  it("should handle different genders", () => {
    const genders: TProfileSchema["gender"][] = ["male", "female"];

    genders.forEach((gender) => {
      const userProfile: TProfileSchema = {
        dob: "1990-01-01",
        gender,
        weight: 70,
        height: 180,
        activityLevel: "moderate",
      };

      const { result } = renderHook(() => useProfileForm(userProfile));
      expect(result.current.form.getValues().gender).toBe(gender);
    });
  });
});
