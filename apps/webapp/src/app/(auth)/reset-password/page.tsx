"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useSupabase } from "@/components/SupbaseProvider";
import { Form, ShowPassword } from "@/ui/fields";
import Button from "@/ui/Buttons";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";

import BlurDotGridBottom from "../showcase/BlurDotGridBottom";
import FormContainer from "../FormContainer";
import { AuthLabel } from "../AuthLabel";

export default function ResetVerification() {
  const formMethods = useForm<any>();
  const { supabase } = useSupabase();
  const router = useRouter();
  const [eventData, setEventData] = useState();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event: any) => {
      if (event === "PASSWORD_RECOVERY") {
        setEventData(event);
      }
    });
  }, []);

  const resetVerification = async (formValues: any) => {
    const { newPassword, confirmPassword } = formValues;

    if (newPassword !== confirmPassword) {
      return showErrorToast("Confirm Password should match New Password");
    }
    try {
      if (eventData === "PASSWORD_RECOVERY") {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (!error) {
          showSuccessToast("Password updated successfully");
          router.push("/login");
        }
        if (error) {
          showErrorToast("There was an error updating your password.");
        }
      } else {
        showErrorToast("There was an error updating your password");
      }
    } catch (error) {
      showErrorToast("There was an error updating your password");
    }
  };

  return (
    <>
      <BlurDotGridBottom />
      <FormContainer
        title={"Reset your password"}
        subtitle={"Forgot Your Password? Enter your new Password"}
      >
        <Form
          form={formMethods}
          handleSubmit={resetVerification}
          className="space-y-6"
        >
          <div>
            <AuthLabel htmlFor="newPassword">New Password</AuthLabel>
            <ShowPassword
              {...formMethods.register("newPassword")}
              autoComplete="newPassword"
              required={true}
              minLength={8}
              maxLength={40}
              id="newPassword"
            />
          </div>
          <div>
            <AuthLabel htmlFor="confirmPassword">
              Confirm new Password
            </AuthLabel>
            <ShowPassword
              {...formMethods.register("confirmPassword")}
              autoComplete="confirm-Password"
              required={true}
              minLength={8}
              maxLength={40}
              id="confirmPassword"
            />
          </div>
          <Button
            className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            type="submit"
          >
            Reset Password
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}
