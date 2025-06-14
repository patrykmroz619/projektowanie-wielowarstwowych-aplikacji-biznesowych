import { cn, getAge } from "./utils";

describe("Utils", () => {
  describe("cn function", () => {
    it("merges class names correctly", () => {
      const result = cn("px-2 py-1", "px-4", "bg-red-500");
      expect(result).toBe("py-1 px-4 bg-red-500");
    });

    it("handles conditional classes", () => {
      const isActive = true;
      const result = cn("base-class", isActive && "active-class", "another-class");
      expect(result).toBe("base-class active-class another-class");
    });

    it("removes duplicate classes", () => {
      const result = cn("p-4", "p-2", "text-red-500");
      expect(result).toBe("p-2 text-red-500");
    });

    it("handles empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });
  });

  describe("getAge function", () => {
    beforeEach(() => {
      // Mock the current date to December 15, 2024
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2024-12-15"));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("calculates age correctly for birthday already passed this year", () => {
      const birthDate = "1990-06-15";
      const age = getAge(birthDate);
      expect(age).toBe(34);
    });

    it("calculates age correctly for birthday not yet reached this year", () => {
      const birthDate = "1990-12-20";
      const age = getAge(birthDate);
      expect(age).toBe(33);
    });

    it("calculates age correctly for birthday today", () => {
      const birthDate = "1990-12-15";
      const age = getAge(birthDate);
      expect(age).toBe(34);
    });

    it("calculates age correctly for someone born this year", () => {
      const birthDate = "2024-01-01";
      const age = getAge(birthDate);
      expect(age).toBe(0);
    });

    it("handles different date formats", () => {
      const birthDate = "1985/03/22";
      const age = getAge(birthDate);
      expect(age).toBe(39);
    });
  });
});
