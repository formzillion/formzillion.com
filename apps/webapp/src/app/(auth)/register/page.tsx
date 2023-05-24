"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Button from "@/ui/Buttons";
import {
  showErrorToast,
  showSuccessToast,
  toastMessages,
} from "@/ui/Toast/Toast";
import { Form, EmailInput, ShowPassword } from "@/ui/fields";
import { Checkbox } from "@/ui/Checkbox";
import BlurDotGridBottom from "../showcase/BlurDotGridBottom";
import { AuthLabel } from "../AuthLabel";
import FormContainer from "../FormContainer";

export default function Register() {
  const formMethods = useForm<any>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const registerUser = async (formValues: any) => {
    const { email, password } = formValues;
    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let data = await res.json();
      setMessage(data?.message);
      if (data.success) {
        showSuccessToast(data.message || toastMessages.success);
        return router.push("/login");
      } else {
        handleErrors(data?.message);
      }
      setLoading(false);
    } catch (e) {
      handleErrors("");
      setLoading(false);
    }
  };

  const handleErrors = (message: any) => {
    setLoading(false);
    showErrorToast(message || toastMessages.error);
  };

  return (
    <>
      <BlurDotGridBottom />
      <FormContainer
        title={"Create your account"}
        subtitle={
          "We'll quickly get you set up and running, including a risk-free 7 day trial. No credit card required."
        }
      >
        <Form
          form={formMethods}
          handleSubmit={registerUser}
          className="space-y-6"
        >
          <div>
            <AuthLabel className="text-gray-100">Email address</AuthLabel>
            <div className="mt-1">
              <EmailInput
                type="email"
                autoComplete="email"
                required
                {...formMethods.register("email")}
              />
            </div>
          </div>

          <div>
            <AuthLabel className="text-gray-100">Password</AuthLabel>
            <ShowPassword
              {...formMethods.register("password")}
              autoComplete="current-password"
              required
              minLength={8}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center">
              <Checkbox
                {...formMethods.register("agree")}
                name="agree"
                description=""
                required={true}
                id="agree"
              />
              <AuthLabel className="font-normal text-gray-100" htmlFor="agree">
                I understand and agree to the terms of use and privacy policy.
              </AuthLabel>
            </div>
          </div>

          <div>
            <Button
              loading={loading}
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Register
            </Button>
          </div>
          <div className="text-center text-sm">
            <AuthLabel className="inline text-gray-100">
              Already have an account?
            </AuthLabel>
            <Link
              href="/login"
              className="ml-2 font-medium text-orange-600 hover:text-orange-500"
            >
              Sign in
            </Link>
          </div>
        </Form>
      </FormContainer>
    </>
  );
}
