import { isValidEmail, validateLoginFields, validateLoginPayload } from "../src/utils/validators";

describe("validators", () => {
  it("validates email", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("bad-email")).toBe(false);
  });

  it("validates login payload", () => {
    expect(validateLoginPayload({ name: "", email: "a@b.com", password: "123456" })).toBe(
      "Name is required."
    );
    expect(
      validateLoginPayload({ name: "A", email: "invalid", password: "123456" })
    ).toBe("Enter a valid email address.");
    expect(
      validateLoginPayload({ name: "A", email: "a@b.com", password: "123" })
    ).toBe("Password must be at least 6 characters.");
    expect(
      validateLoginPayload({ name: "A", email: "a@b.com", password: "123456" })
    ).toBeNull();
  });

  it("validateLoginFields returns per-field errors", () => {
    expect(validateLoginFields({ name: "", email: "bad", password: "12" })).toEqual({
      name: "Name is required.",
      email: "Enter a valid email address.",
      password: "Password must be at least 6 characters.",
    });
    expect(validateLoginFields({ name: "A", email: "a@b.com", password: "123456" })).toEqual({});
  });
});
