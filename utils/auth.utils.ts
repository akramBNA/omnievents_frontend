/* eslint-disable @typescript-eslint/no-explicit-any */
import { setUser } from "@/store/authSlice";
import { AppDispatch } from "@/store";

export const setAuthFromResponse = (
  res: any,
  dispatch: AppDispatch
) => {
  const payload = JSON.parse(atob(res.token.split(".")[1]));
  const data = res.data;

  localStorage.setItem("token", res.token);

  dispatch(
    setUser({
      user: {
        user_id: data.user_id,
        user_name: data.user_name,
        user_lastname: data.user_lastname,
        user_email: data.user_email,
        user_role_id: data.user_role_id,
      },
      token: res.token,
      role: payload.role,
    })
  );

  return payload.role;
};