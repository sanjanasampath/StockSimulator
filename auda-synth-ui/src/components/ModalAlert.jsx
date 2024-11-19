import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "./Button";

export default function ModalAlert({ openModal, message, onClose }) {
  return (
    <Dialog className="relative z-10" open={openModal} onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-navBackground text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-gray-700 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-center">
                <div className="mt-3 text-center pb-5 sm:ml-4 sm:mt-0">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold leading-6 text-brand mb-8"
                  ></DialogTitle>
                  <div className="mt-2">
                    <p className="text-brand text-base whitespace-pre-line">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-4 sm:flex sm:flex-row-reverse sm:px-6 items-center justify-center">
              <Button
                type="button"
                customStyles="rounded-md px-3 py-2 sm:ml-3 sm:w-auto"
                onClick={() => {
                  onClose();
                }}
                data-autofocus
              >
                Okay!
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
