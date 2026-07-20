import {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { login as loginApi, logout as logoutApi, me } from "../api/authApi";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem("auth_token") ?? "",
  user: getAuthUser(),
  isLoading: false,
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
        isAuthenticated: true,
      };
    }
    case "clearAuth": {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      return { ...state, user: null, token: "", isAuthenticated: false };
    }
  }
}

function getAuthUser() {
  const storedUser = localStorage.getItem("auth_user");
  return storedUser ? JSON.stringify(storedUser) : null;
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
        // setToken(response.data.token);
        // setUser(response.data.user);
        // localStorage.setItem("auth_token", response.data.token);
        // localStorage.setItem("auth_user", JSON.stringify(response.data.user));
        dispatch({
          type: "setAuth",
          payload: { user: response.data.user, token: response.data.token },
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
        // setToken(storedToken);
        // setUser(response.data);

        // // Optional: Update cached user in localStorage
        // localStorage.setItem("auth_user", response.user);
        dispatch({
          type: "setAuth",
          payload: {
            user: response.user,
            token: storedToken,
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
  return (
    <AuthContext.Provider
      value={{ user, token, login, isAuthenticated, logout, isLoading }}
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
