import { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPLOYEE_CODE_PATTERN = /^[A-Za-z0-9._-]{2,30}$/;

function validateUsername(value) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
        return { valid: false, message: "Username is required" };
    }

    if (EMAIL_PATTERN.test(trimmedValue) || EMPLOYEE_CODE_PATTERN.test(trimmedValue)) {
        return { valid: true, message: "" };
    }

    return {
        valid: false,
        message: "Use your email address or employee code as username",
    };
}

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [usernameError, setUsernameError] = useState("");


    const {login}=useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const usernameValidation = validateUsername(username);
        if (!usernameValidation.valid) {
            setUsernameError(usernameValidation.message);
            toast.error(usernameValidation.message);
            return;
        }

        setUsernameError("");
        setIsSubmitting(true);

        try {
            if (!password.trim()) {
                toast.error("Password is required");
                return;
            }

            const result = await login({
                username: username.trim(),
                password,
            });

            if (result.success) {
                toast.success(result.message);
                setTimeout(()=>{
                    navigate('/dashboard');
                },2000);
            
            } else {
                toast.error(result.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: "100%",
                maxWidth: 400,
            }}
        >
            
            <TextField
                fullWidth
                label="Email or Employee Code"
                margin="normal"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    if (usernameError) {
                        setUsernameError("");
                    }
                }}
                placeholder="name@example.com or EMP001"
                helperText={usernameError || "Use your email address or employee code"}
                error={Boolean(usernameError)}
            />

            <TextField
                fullWidth
                label="Password"
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{
                    mt: 4,
                    py: 1.5,
                    borderRadius: 2,
                }}
            >
                {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    "Sign In"
                )}
            </Button>
        </Box>
    );
}