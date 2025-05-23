import { describe, it, expect } from "vitest";
import { sayHello, add } from "./core";

describe("Utility Functions", () => {
    describe("sayHello", () => {
        it("should return 'hello'", () => {
            expect(sayHello()).toBe("hello");
        });
    });

    describe("add", () => {
        it("should add two positive numbers correctly", () => {
            expect(add(2, 3)).toBe(5);
        });

        it("should handle negative numbers", () => {
            expect(add(-2, 3)).toBe(1);
            expect(add(2, -3)).toBe(-1);
            expect(add(-2, -3)).toBe(-5);
        });

        it("should handle zero", () => {
            expect(add(0, 5)).toBe(5);
            expect(add(5, 0)).toBe(5);
            expect(add(0, 0)).toBe(0);
        });
    });
});