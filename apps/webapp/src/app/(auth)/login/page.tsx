"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useSupabase } from "@/components/SupbaseProvider";
import Button from "@/ui/Buttons";
import {
  showErrorToast,
  showSuccessToast,
  toastMessages,
} from "@/ui/Toast/Toast";
import { EmailInput, Form, ShowPassword } from "@/ui/fields";
import { Checkbox } from "@/ui/Checkbox";
import BlurDotGridBottom from "../showcase/BlurDotGridBottom";
import { AuthLabel } from "../AuthLabel";
import FormContainer from "../FormContainer";
import { isEmpty, snakeCase } from "lodash";
import login from "@/app/fetch/auth/login";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { supabase, session } = useSupabase();
  const formMethods = useForm<any>();
  const router = useRouter();

  useEffect(() => {
    if (!isEmpty(session)) {
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "hasSession" }),
      })
        .then((res) => {
          return res.json();
        })
        .then(({ url, avatar, planName }) => {
          sessionStorage.setItem(
            "teamData",
            JSON.stringify({
              label: url,
              avatar,
              planName: snakeCase(planName),
              type: "personal",
              value: url,
            })
          );
          router.push(`/${url}`);
        });
    }
  }, []);

  const onClickLogin = async (formValues: any) => {
    const { email, password } = formValues;

    if (!email || !password) {
      setLoading(false);
      showErrorToast(toastMessages.error);
    }

    try {
      setLoading(true);
      const { url, avatar, planName, error } = await login({ email, password });

      if (url) {
        sessionStorage.setItem(
          "teamData",
          JSON.stringify({
            label: url,
            avatar,
            planName: snakeCase(planName),
            type: "personal",
            value: url,
          })
        );
      }
      if (error) {
        showErrorToast(error?.message);
        setLoading(false);
        return;
      }
      if (url) {
        showSuccessToast("Logged In Successfully.");
        router.push(`/${url}`);
      }

      setLoading(false);
    } catch (e) {
      showErrorToast(toastMessages.error);
    }
  };

  return (
    <>
      <BlurDotGridBottom />
      <FormContainer
        title={"Welcome back!"}
        subtitle={"Please enter your credentials to sign in."}
      >
        <Form
          form={formMethods}
          handleSubmit={onClickLogin}
          className="space-y-6"
        >
          <div>
            <AuthLabel htmlFor="email">Email address</AuthLabel>
            <div className="mt-1">
              <EmailInput
                {...formMethods.register("email")}
                id="email"
                type="email"
                autoComplete="email"
                required={true}
              />
            </div>
          </div>

          <div>
            <AuthLabel className="text-gray-100" htmlFor="password">
              Password
            </AuthLabel>
            <ShowPassword
              {...formMethods.register("password")}
              required={true}
              minLength={8}
              maxLength={40}
              id="password"
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                {...formMethods.register("rememberMe")}
                name="rememberMe"
                description=""
                required={false}
                id="rememberMe"
              />
              <AuthLabel className="text-gray-100" htmlFor="rememberMe">
                Remember me
              </AuthLabel>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              loading={loading}
              className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              type="submit"
            >
              Sign in
            </Button>
          </div>
          <div className="text-center text-sm">
            <AuthLabel className="inline text-gray-100">{`Don't have an account yet?`}</AuthLabel>
            <Link
              href="/register"
              className="ml-2 font-medium text-orange-600 hover:text-orange-500"
            >
              Register
            </Link>
          </div>
        </Form>
      </FormContainer>
    </>
  );
}
