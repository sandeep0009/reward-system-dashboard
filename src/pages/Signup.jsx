import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  TextField,
  Typography,
  Paper,
  FormHelperText,
} from "@mui/material";
import { axiosInstance } from "../utils/axios";
import { Link } from "react-router-dom";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async(data) => {
    try {
        const res = await axiosInstance.post("/users", data);
        console.log(res);
      } catch (error) {
        console.error("Signup error:", error);
      }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Paper elevation={6} className="p-8 w-full max-w-md">
        <Typography
          variant="h4"
          className="text-center mb-6 font-semibold text-indigo-600"
        >
          Sign Up
        </Typography>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              label="Name"
              fullWidth
              {...register("name")}
              error={!!errors.name}
            />
            {errors.name && (
              <FormHelperText error>{errors.name.message}</FormHelperText>
            )}
          </div>

          <div>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
            />
            {errors.email && (
              <FormHelperText error>{errors.email.message}</FormHelperText>
            )}
          </div>

          <div>
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
            />
            {errors.password && (
              <FormHelperText error>{errors.password.message}</FormHelperText>
            )}
          </div>

          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            type="submit"
          >
            Sign Up
          </Button>
        </form>

        <Typography className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-indigo-600 cursor-pointer hover:underline">

            Sign In
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default SignUp;
