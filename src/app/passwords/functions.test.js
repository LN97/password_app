import { checkPasswordStrength } from "./functions/funcs.passwordUtils";

describe('Password Strength Checker', () => {
    test('should return 0 for empty password', () => {
        expect(checkPasswordStrength('')).toBe(0);
    });

    test('should return 6 for a strong password', () => {
        expect(checkPasswordStrength('Str0ng!Pass')).toBe(6);
    });

    // Add more tests to cover all scenarios
    test('should return 1 for a password with only lowercase letters', () => {
        expect(checkPasswordStrength('weakpassword')).toBe(1);
    });

    test('should deduct points for common words', () => {
        expect(checkPasswordStrength('password')).toBeLessThan(6);
    });
    // Continue adding tests for other criteria
});