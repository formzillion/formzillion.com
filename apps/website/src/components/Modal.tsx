import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export function ModalTitle(props: any) {
  const { title, toggle } = props;

  return (
    <>
      <Dialog.Title className="flex flex-row items-center justify-between mx-2 p-4">
        <div className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300">
          {title}
        </div>
        <XMarkIcon
          className="h-6 w-6 text-slate-700 hover:text-slate-500"
          onClick={toggle}
        />
      </Dialog.Title>
      <div className="border-b-2 dark:border-gray-800 w-full"></div>
    </>
  );
}

export default function Modal(props: any) {
  const { toggle, isOpen = true } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={toggle}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black dark:bg-gray-900 dark:bg-opacity-70 bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 top-14 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="min-w-[700px] max-w-md transform overflow-hidden rounded-2xl bg-white dark:from-black dark:to-slate-900 dark:lg:bg-gradient-to-b text-left align-middle shadow-xl transition-all">
                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
