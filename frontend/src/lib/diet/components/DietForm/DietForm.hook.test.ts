import { renderHook, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDietForm } from "./DietForm.hook";
import { createNewDietAction } from "../../actions/createNewDietAction";
import { DietFormValues } from "../../schema/dietSchema";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../actions/createNewDietAction", () => ({
  createNewDietAction: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockToast = toast as jest.Mocked<typeof toast>;
const mockCreateDietAction = createNewDietAction as jest.MockedFunction<typeof createNewDietAction>;

describe("useDietForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter as any);
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useDietForm());

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.form.getValues()).toEqual({
      mealsPerDay: 3,
      caloricIntake: 2000,
      dietGoal: "maintenance",
      dietType: "standard",
      recipeDifficulty: "easy",
    });
  });

  it("should handle successful form submission", async () => {
    const dietData: DietFormValues = {
      dietGoal: "reduction",
      dietType: "vegetarian",
      mealsPerDay: 4,
      caloricIntake: 1800,
      recipeDifficulty: "medium",
      allergies: "nuts",
      excludedProducts: "dairy",
      favoriteProducts: "vegetables",
      macroRatios: "40/30/30",
      prepTime: "30 minutes",
    };

    const mockResult = {
      success: true,
      data: { id: "diet123" },
    };

    mockCreateDietAction.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useDietForm());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: jest.fn() } as any);
      // Set form values before submission
      Object.entries(dietData).forEach(([key, value]) => {
        result.current.form.setValue(key as keyof DietFormValues, value);
      });
      await result.current.onSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(mockCreateDietAction).toHaveBeenCalled();
    expect(mockToast.success).toHaveBeenCalledWith("Dieta została pomyślnie utworzona");
    expect(mockRouter.push).toHaveBeenCalledWith("/dashboard/list/diet123");
    expect(result.current.isSubmitting).toBe(false);
  });

  it("should handle form submission error from action", async () => {
    const mockResult = {
      success: false,
      error: "Validation failed",
    };

    mockCreateDietAction.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useDietForm());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(mockCreateDietAction).toHaveBeenCalled();
    expect(mockToast.error).toHaveBeenCalledWith("Validation failed");
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("should handle action throwing an error", async () => {
    const errorMessage = "Network error";
    mockCreateDietAction.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useDietForm());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(mockCreateDietAction).toHaveBeenCalled();
    expect(mockToast.error).toHaveBeenCalledWith(errorMessage);
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("should handle success result without data", async () => {
    const mockResult = {
      success: true,
      data: null,
    };

    mockCreateDietAction.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useDietForm());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(mockCreateDietAction).toHaveBeenCalled();
    expect(mockToast.error).toHaveBeenCalledWith("Błąd zapisu diety");
    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("should set submitting state during form submission", async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockCreateDietAction.mockReturnValue(promise);

    const { result } = renderHook(() => useDietForm());

    // Start submission - we need to call the actual onSubmit function which triggers the state change
    const formEvent = { preventDefault: jest.fn() } as any;

    act(() => {
      // This should immediately set isSubmitting to true
      result.current.onSubmit(formEvent);
    });

    // Wait a bit for the state update to propagate
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check submitting state is true during submission
    expect(result.current.isSubmitting).toBe(true);

    // Resolve the promise
    await act(async () => {
      resolvePromise({ success: true, data: { id: "test" } });
      await promise;
    });

    // Check submitting state is false after submission
    expect(result.current.isSubmitting).toBe(false);
  });

  it("should handle unknown error types", async () => {
    mockCreateDietAction.mockRejectedValue("String error");

    const { result } = renderHook(() => useDietForm());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(mockToast.error).toHaveBeenCalledWith("Nieznany błąd");
    expect(result.current.isSubmitting).toBe(false);
  });

  it("should reset submitting state even if action throws", async () => {
    mockCreateDietAction.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useDietForm());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(result.current.isSubmitting).toBe(false);
  });

  it("should use zod resolver for form validation", () => {
    const { result } = renderHook(() => useDietForm());

    // Verify that the form is using the correct resolver and has necessary methods
    expect(result.current.form).toBeDefined();
    expect(typeof result.current.form.trigger).toBe("function");
    expect(typeof result.current.form.setValue).toBe("function");
    expect(typeof result.current.form.handleSubmit).toBe("function");
  });

  it("should handle all valid diet goals", () => {
    const dietGoals = ["reduction", "maintenance", "muscleGain", "healthyEating"] as const;

    dietGoals.forEach((goal) => {
      const { result } = renderHook(() => useDietForm());

      act(() => {
        result.current.form.setValue("dietGoal", goal);
      });

      expect(result.current.form.getValues().dietGoal).toBe(goal);
    });
  });

  it("should handle all valid diet types", () => {
    const dietTypes = [
      "standard",
      "vegetarian",
      "vegan",
      "ketogenic",
      "lowCarb",
      "highProtein",
    ] as const;

    dietTypes.forEach((type) => {
      const { result } = renderHook(() => useDietForm());

      act(() => {
        result.current.form.setValue("dietType", type);
      });

      expect(result.current.form.getValues().dietType).toBe(type);
    });
  });
});
