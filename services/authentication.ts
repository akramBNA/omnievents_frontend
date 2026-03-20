const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/users/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_email: email,
      user_password: password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const logout = () => {
  sessionStorage.removeItem("token");
};

export const signup = async ( firstName: string, lastName: string, email: string, password: string ) => {
  const res = await fetch(`${API_URL}/users/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: firstName,
      user_lastname: lastName,
      user_email: email,
      user_password: password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};
