"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import WebsiteLayout from "@/components/WebsiteLayout";
import ConfirmModal from "@/components/ConfirmModal";
import {
  useRegister,
  useConfirm,
  type RegisterPayload,
} from "@/hooks/use-auth";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    cPassword: "",
    age: 0,
    phone: "",
    gender: "male",
    address: "",
    role: "user",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: register, isPending, error, data } = useRegister();
  const { mutate: confirm, isPending: isConfirming } = useConfirm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character (@$!%*?&)";
    }

    // Confirm password validation
    if (!form.cPassword) {
      newErrors.cPassword = "Please confirm your password";
    } else if (form.password !== form.cPassword) {
      newErrors.cPassword = "Passwords do not match";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Name validation
    if (!form.userName) {
      newErrors.userName = "Full name is required";
    }

    // Phone validation
    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    }

    // Age validation
    if (!form.age || form.age < 18) {
      newErrors.age = "You must be at least 18 years old";
    }

    // Address validation
    if (!form.address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    register(form, {
      onSuccess: (response) => {
        toast.success(response.message);
        setShowConfirmModal(true);
      },
      onError: (error: any) => {
        toast.error(error.message || "Registration failed");
      },
    });
  };

  const handleConfirm = (otp: string) => {
    confirm(
      { email: form.email, otp },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          setShowConfirmModal(false);
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        },
        onError: (error: any) => {
          toast.error(error.message || "Confirmation failed");
        },
      }
    );
  };

  return (
    <>
      <WebsiteLayout>
        <main>
          <section style={{ minHeight: "100vh", display: "flex" }}>
            <div className="container__register">
              <div className="form register animate-form-register">
                <form className="form" onSubmit={handleSubmit}>
                  <div className="hero"></div>

                <div className="flex-column" style={{ marginBottom: "18px" }}>
                  <label>Full Name</label>
                  <div className="inputForm">
                    <input
                      name="userName"
                      placeholder="Enter your Full Name"
                      className="input"
                      type="text"
                      autoFocus
                      value={form.userName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.userName && (
                    <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                      {errors.userName}
                    </p>
                  )}
                </div>

                <div className="flex-column" style={{ marginBottom: "18px" }}>
                  <label>Email</label>
                  <div className="inputForm">
                    <input
                      name="email"
                      placeholder="Enter Your Email"
                      className="input"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex-column" style={{ marginBottom: "18px" }}>
                  <label>Password</label>
                  <div className="inputForm">
                    <input
                      name="password"
                      placeholder="Enter your Password"
                      className="input password-input"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.password && (
                    <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex-column" style={{ marginBottom: "18px" }}>
                  <label>Confirm Password</label>
                  <div className="inputForm">
                    <input
                      name="cPassword"
                      placeholder="Confirm your Password"
                      className="input password-input"
                      type="password"
                      value={form.cPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.cPassword && (
                    <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                      {errors.cPassword}
                    </p>
                  )}
                </div>

                <div className="flex-column" style={{ marginBottom: "18px" }}>
                  <label>Age</label>
                  <div className="inputForm">
                    <input
                      name="age"
                      placeholder="Enter your Age"
                      className="input"
                      type="number"
                      value={form.age || ""}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.age && (
                    <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                      {errors.age}
                    </p>
                  )}
                </div>

                <div className="flex-column" style={{ marginBottom: "18px" }}>
                  <label>Phone</label>
                  <div className="inputForm">
                    <input
                      name="phone"
                      placeholder="Enter your Phone Number"
                      className="input"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phone && (
                    <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="flex-column" style={{ marginBottom: "18px" }}>
                  <label>Address</label>
                  <div className="inputForm">
                    <input
                      name="address"
                      placeholder="Enter your Address"
                      className="input"
                      type="text"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.address && (
                    <p style={{ color: "red", fontSize: "0.75rem", marginTop: "4px" }}>
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="flex-column" style={{ marginBottom: "18px" }}>
                  <label>Gender</label>
                  <div className="inputForm gender border-0">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={form.gender === "male"}
                        onChange={handleChange}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={form.gender === "female"}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                  </div>
                </div>


                <button className="button-submit type1" disabled={isPending}>
                  <span className="btn-txt">
                    {isPending ? "Creating Account..." : "Create Account"}
                  </span>
                </button>


                <p className="p">
                  Already have an account?{" "}
                  <Link href="/login">
                    <span className="span">Sign In</span>
                  </Link>
                </p>
              </form>
            </div>
            <div className="img__register animate-image-register">
              <div className="img-wrapper register">
                <div className="wrapper__text">
                  <h1>Welcome!</h1>
                  <p>
                    Access secure, real-time autonomous delivery services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      </WebsiteLayout>

      <ConfirmModal
        isOpen={showConfirmModal}
        email={form.email}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        isConfirming={isConfirming}
      />
    </>
  );
}
