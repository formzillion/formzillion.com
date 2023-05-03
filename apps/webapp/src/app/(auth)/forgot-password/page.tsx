"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useSupabase } from "@/components/SupbaseProvider";
import Button from "@/ui/Buttons";
import { Form, EmailInput } from "@/ui/fields";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { AuthLabel } from "../AuthLabel";
import FormContainer from "../FormContainer";
import BlurDotGridBottom from "../showcase/BlurDotGridBottom";

export default function ForgotPassword() {
  const formMethods = useForm<any>();
  const { supabase, session } = useSupabase();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetPassword = async (formValues: any) => {
    const { email } = formValues;
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      });
      if (!error) {
        showSuccessToast("Reset Password mail sent successfully");
        router.push("/login");
      } else {
        showErrorToast(error.message);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(error.message);
    }
  };

  return (
    <>
      <BlurDotGridBottom />
      <FormContainer
        title={"Lost your password? No worries!"}
        subtitle={
          "Enter your email address. We'll send you a link to reset your password, if you have already registered with us."
        }
      >
        <Form
          form={formMethods}
          handleSubmit={resetPassword}
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
            <Button
              type="submit"
              loading={loading}
              className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Send Reset Instructions
            </Button>
          </div>
          <div className="text-sm text-center">
            <AuthLabel className="inline text-gray-100">Back to</AuthLabel>
            <Link
              href="/login"
              className="ml-1 font-medium text-orange-500 hover:text-orange-500"
            >
              Sign in
            </Link>
          </div>
        </Form>
      </FormContainer>
    </>
  );
}
