"use client";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";

import { Form, Label, ShowPassword } from "@/ui/fields";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { useSupabase } from "@/components/SupbaseProvider";
import { Input } from "@/ui/Input/SimpleInput";
import Header from "@/ui/Header";
import { useState } from "react";
import CardFooter from "@/ui/CardFooter";

type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  apiError?: string;
};

const Page = () => {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<any>(false);

  const formMethods = useForm<ChangePasswordFormValues>({
    defaultValues: {},
  });

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    const { newPassword, confirmPassword } = values;
    try {
      if (newPassword.length < 8) {
        showErrorToast("Password must be at least 8 characters long.");
        return;
      }

      if (!newPassword || !confirmPassword) {
        showErrorToast("Please enter both the fields.");
      } else if (newPassword !== confirmPassword) {
        showErrorToast("New Password and Confirm Password should match.");
      } else {
        setLoading(true);
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (data) {
          setLoading(false);
        }
        isEmpty(error)
          ? showSuccessToast("Password changed!")
          : showErrorToast("Error while changing password.");
      }
    } catch (e) {
      showErrorToast("Error while changing password.");
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="space-y-5">
        <Form form={formMethods} handleSubmit={handleSubmit}>
          <div className="divide-y divide-gray-300  bg-white shadow dark:bg-black border border-gray-300 dark:border-gray-700 dark:divide-gray-800">
            <div className="p-4 px-6 divide-y divide-gray-300">
              <Header title={"Change Password"} />

              <div className="py-4 space-y-5">
                <Label htmlFor="password">New Password
                <ShowPassword
                  {...formMethods.register("newPassword")}
                  required={true}
                  minLength={8}
                  maxLength={40}
                  id="password"
                  autoComplete="current-password"
                  className="h-[44px] rounded-none my-1"
                />
                </Label>
                <Label htmlFor="confirmPassword">Confirm Password
                <ShowPassword
                  {...formMethods.register("confirmPassword")}
                  required={true}
                  minLength={8}
                  maxLength={40}
                  id="confirmPassword"
                  autoComplete="current-password"
                  className="h-[44px] rounded-none my-1"
                />
                </Label>
              </div>
            </div>
            <CardFooter
              type="submit"
              title={"Password must be at least 8 characters long."}
              btnText={"Update Password"}
              loading={loading}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Page;
