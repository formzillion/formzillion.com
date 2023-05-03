"use client";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";

import { Form, Input, Label } from "@/ui/fields";
import { CButton } from "@/ui/Buttons/CButton";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { useSupabase } from "@/components/SupbaseProvider";

type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  apiError?: string;
};

export default function PasswordPage() {
  const { supabase } = useSupabase();

  const formMethods = useForm<ChangePasswordFormValues>({
    defaultValues: {},
  });
  const { isSubmitting, isDirty } = formMethods?.formState;

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    const { newPassword, confirmPassword } = values;
    try {
      if (!newPassword || !confirmPassword) {
        throw new Error("Please enter all password fields.");
      }
      if (newPassword !== confirmPassword) {
        throw new Error("New Password and Confirm Password is not matching.");
      }
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      isEmpty(error)
        ? showSuccessToast("Password changed!")
        : showErrorToast("Error while changing password.");
    } catch (e) {
      showErrorToast("Error while changing password.");
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:py-8 lg:px-8 h-screen dark:from-black dark:to-slate-900 dark:lg:bg-gradient-to-b">
      <Form
        form={formMethods}
        className="space-y-8 mx-auto max-w-7xl flex justify-center"
        handleSubmit={handleSubmit}
      >
        <div className="w-[70%] px-14 py-10 border border-gray-200 dark:border-gray-600">
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-200">
                Password
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter your current & new password to reset your password
              </p>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 dark:sm:border-gray-900">
              <Label>New Password</Label>
              <Input
                {...formMethods.register("newPassword")}
                type="password"
                name="newPassword"
                autoComplete="password"
                className="max-w-lg focus:outline-none focus:ring-0 focus:border-gray-400 dark:focus:border-gray-800"
              />
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 dark:sm:border-gray-900">
              <Label>Confirm Password</Label>
              <Input
                {...formMethods.register("confirmPassword")}
                type="password"
                name="confirmPassword"
                autoComplete="password"
                className="max-w-lg focus:outline-none focus:ring-0 focus:border-gray-400 dark:focus:border-gray-800"
              />
            </div>
          </div>

          <div className="flex justify-end pt-8">
            <CButton type="submit" className="ml-2">
              Update Password
            </CButton>
            <CButton type="button" color="secondary" className="ml-2">
              Reset
            </CButton>
          </div>
        </div>
      </Form>
    </div>
  );
}
