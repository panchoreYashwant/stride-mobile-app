export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());

/** @returns {Record<string, string>} Field key → error message (empty object if valid). */
export const validateLoginFields = ({ name, email, password }) => {
  const errors = {};
  if (!name?.trim()) {
    errors.name = "Name is required.";
  }
  if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
};

export const validateLoginPayload = (payload) => {
  const errors = validateLoginFields(payload);
  if (errors.name) return errors.name;
  if (errors.email) return errors.email;
  if (errors.password) return errors.password;
  return null;
};
