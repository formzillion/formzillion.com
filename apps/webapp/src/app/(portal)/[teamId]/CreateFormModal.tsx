"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialog";
import { Input } from "@/ui/Input/SimpleInput";
import Button from "@/ui/Buttons";
import { showErrorToast, showSuccessToast } from "@/ui/Toast/Toast";
import { randJobTitle } from "@ngneat/falso";

export default function CreateFormModal({
  isOpen,
  closeModal,
  teamSlug,
  userEmail,
}: any) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formValues, setFormValues] = useState<any>({
    name: randJobTitle(),
    sendToEmail: userEmail,
    teamSlug: teamSlug,
  });

  const onClickCreateForm = async () => {
    if (isEmpty(formValues.name)) {
      showErrorToast("Please fill the form name");
    } else {
      try {
        setLoading(true);
        const response = await fetch("/api/form/create", {
          method: "POST",
          body: JSON.stringify(formValues),
        });
        const jsonResponse = await response.json();

        if (jsonResponse.success === true) {
          setLoading(false);

          router.refresh();
          closeModal();
          showSuccessToast("Form created successfully!");
        } else {
          setLoading(false);
          showErrorToast(
            jsonResponse.message ||
              "Form creation failed! make sure you are in a team."
          );
        }
      } catch (e) {
        showErrorToast("Error while creating a new form");
      }
    }
    router.refresh();
  };

  const onChangeField = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <Dialog open={closeModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Form</DialogTitle>
          <DialogDescription className="text-gray-600">
            Add a new form to get an endpoint
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <label htmlFor="formName">Form Name</label>
              <p className="text-sm text-gray-600">
                {`This is your form's visible name within Formzillion.`}
              </p>
              <Input
                type="text"
                name="name"
                id="name"
                autoComplete="formName"
                value={formValues?.name}
                onChange={onChangeField}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="emails">Notification Email</label>
              <p className="text-sm text-gray-600 mt-[-2%]">
                {`We'll send notifications to this email whenever an event happens
                on this form, such as a new form submission, reply, or an
                unexpected error.`}
              </p>
              <Input
                type="email"
                name="sendToEmail"
                id="emails"
                autoComplete="emails"
                value={formValues?.sendToEmail}
                onChange={onChangeField}
                required
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            loading={loading}
            className="bg-orange-600 text-white rounded-none min-w-[80px]"
            onClick={onClickCreateForm}
            type="submit"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
