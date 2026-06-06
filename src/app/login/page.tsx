"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import WebsiteLayout from "@/components/WebsiteLayout";
import { useSignIn, type SignInPayload } from "@/hooks/use-auth";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { mutate: signIn, isPending } = useSignIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(form as SignInPayload, {
      onSuccess: (response) => {
        toast.success(response.message);
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        localStorage.setItem("user_role", response.role);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      },
      onError: (error: any) => {
        toast.error(error.message || "Login failed");
      },
    });
  };

  return (
    <WebsiteLayout>
      <main>
        <section style={{ minHeight: "100vh", display: "flex" }}>
          <div className="container__login">
            <div className="img__login">
              <div className="img-wrapper login animate-image-login">
                <div className="wrapper__text">
                  <h1>Hey! Welcome Back</h1>
                  <p>Monitor and manage autonomous deliveries in real time</p>
                </div>
              </div>
            </div>
            <div className="form login animate-form-login">
              <form className="form" onSubmit={handleSubmit}>
                <div className="flex-column">
                  <label>Email or Phone number </label>
                  <div className="inputForm">
                    <input
                      name="email"
                      placeholder="Enter your Email Or Phone Number"
                      className="input"
                      type="text"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex-column">
                  <label>Password </label>
                  <div className="inputForm">
                    <input
                      name="password"
                      placeholder="Enter your Password"
                      className="input"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <i className="fa-solid fa-eye"></i>
                  </div>
                </div>

                <div className="flex-row">
                  <div>
                    <input type="radio" />
                    <label>Remember me </label>
                  </div>
                  <span className="span">Forgot password?</span>
                </div>

                <button className="button-submit type1" disabled={isPending}>
                  <span className="btn-txt">
                    {isPending ? "Logging in..." : "Log In"}
                  </span>
                </button>
                <p className="p">
                  New to DELY X ?
                  <Link href="/register">
                    <span className="span">Create Account</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </WebsiteLayout>
  );
}
