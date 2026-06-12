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
        console.log('[Login Success]', {
          message: response.message,
          accessTokenLength: response.access_token?.length,
          accessTokenPreview: response.access_token ? `${response.access_token.substring(0, 20)}...` : 'none',
          refreshTokenLength: response.refresh_token?.length,
          role: response.role,
        });

        // Trim tokens to remove any whitespace
        const accessToken = response.access_token?.trim();
        const refreshToken = response.refresh_token?.trim();

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("user_role", response.role);

        // Verify storage
        console.log('[Login Storage]', {
          storedAccessToken: localStorage.getItem("access_token")?.substring(0, 20) + '...',
          storedRefreshToken: localStorage.getItem("refresh_token")?.substring(0, 20) + '...',
          storedRole: localStorage.getItem("user_role"),
        });

        toast.success(response.message);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      },
      onError: (error: any) => {
        console.error('[Login Error]', error);
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
                <div className="flex-column mb-4" >
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

                <div className="flex-column mb-4">
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
                  <div className="remember-label">
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
