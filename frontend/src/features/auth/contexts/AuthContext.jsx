import {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  changePassword as changePasswordApi,
  login as loginApi,
  logout as logoutApi,
  me,
} from "../api/authApi";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem("auth_token") ?? "",
  user: getAuthUser(),
  authUserRole: "",
  isLoading: true,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "loading/start":
      return { ...state, isLoading: true };
    case "loading/finish":
      return { ...state, isLoading: false };
    case "setAuth": {
      localStorage.setItem("auth_token", action.payload.token);
      localStorage.setItem("auth_user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authUserRole: action.payload.authUserRole,
        isAuthenticated: true,
      };
    }
    case "clearAuth": {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      return { ...state, user: null, token: "", isAuthenticated: false };
    }
    default:
      return state;
  }
}

function getAuthUser() {
  const storedUser = localStorage.getItem("auth_user");
  return storedUser ? JSON.parse(storedUser) : null;
}

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, token, isLoading, isAuthenticated } = state;
  useEffect(() => {
    initializeAuth();
  }, []);

  async function login(credentials) {
    try {
      const response = await loginApi(credentials);

      if (response.success) {
        console.log("User data", response.data.user);
        dispatch({
          type: "setAuth",
          payload: {
            user: response.data.user,
            token: response.data.token,
            authUserRole: response.data.roles,
          },
        });

        return {
          success: true,
          message: response.message || "Successfully logged In",
        };
      } else {
        return {
          success: false,
          message:
            response.message || "Failed to log in, Please try again later",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to log in, Please try again later",
      };
    }
  }
  async function logout() {
    try {
      const response = await logoutApi();
      if (response.success) {
        dispatch({ type: "clearAuth" });
        return {
          success: true,
          message: response.message || "Successfully logged out",
        };
      } else {
        return {
          success: false,
          message:
            response.message || "Failed to log out, Please try again later",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to log out, Please try again later",
      };
    }
  }
  const clearAuth = () => {
    dispatch({ type: "clearAuth" });
  };

  async function initializeAuth() {
    // setIsLoading(true);
    dispatch({ type: "loading/start" });

    try {
      const storedToken = localStorage.getItem("auth_token");

      if (!storedToken) {
        clearAuth();
        return;
      }

      const response = await me();

      if (response.success) {
        dispatch({
          type: "setAuth",
          payload: {
            user: response.data.user,
            token: storedToken,
            authUserRole: response.data.roles,
          },
        });
      } else {
        clearAuth();
      }
    } catch (error) {
      console.error("Failed to initialize authentication:", error);
      clearAuth();
    } finally {
      // setIsLoading(false);
      dispatch({ type: "loading/finish" });
    }
  }
  async function changePassword(data) {
    const response = await changePasswordApi(data);
    if (response.success) {
      return { success: true, message: "Password updated successfully" };
    }
    return { success: false, message: "An error occured" };
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        isAuthenticated,
        logout,
        isLoading,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth context used out pf scope");
  }
  return context;
}
export { useAuth, AuthContextProvider };
