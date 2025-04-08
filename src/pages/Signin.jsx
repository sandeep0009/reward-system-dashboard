import React from "react";
import { Button, TextField, Typography, Paper, FormHelperText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "../utils/axios";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../features/users/userSlice";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignIn = () => {
  const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.get("/users", {
        params: {
          email: data.email,
          password: data.password,
        },
      });

      if (res.data.length > 0) {
        const user=res.data[0]
        localStorage.setItem("isAdmin",user.isAdmin);
        dispatch(getUserInfo(user));
      } else {
        setError("email", { message: "Invalid email or password" });
        setError("password", { message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Paper elevation={6} className="p-8 w-full max-w-md">
        <Typography variant="h4" className="text-center mb-6 font-semibold text-indigo-600">
          Sign In
        </Typography>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
            />
            {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
          </div>

          <div>
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
            />
            {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
          </div>

          <Button
            variant="contained"
            color="primary"
            size="large"
            className="mt-2"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </form>

        <Typography className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 cursor-pointer hover:underline">
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default SignIn;
