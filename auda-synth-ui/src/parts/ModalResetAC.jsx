import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import { useAuth } from "../providers/AuthProvider";
import { resetAccount } from "../services/stock";
import ModalAlert from "../components/ModalAlert";

export default function ModalResetAC({
  resetAccountModal,
  setResetAccountModal,
  balance,
  setBalance,
}) {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

  async function handleReset(e) {
    e.preventDefault();
    console.log(user);
    if (user.id) {
      const resetAccountResult = await resetAccount(user.id);
      console.log(resetAccountResult);
      if (resetAccountResult.status === "success") {
        setBalance(resetAccountResult.user.balance);
        setOpenModal(true);
        setMessage(
          `Success!\n\n Your balance has been reset to $ ${resetAccountResult.user.balance}.\n\n`
        );
      } else if (resetAccountResult.status === "fail") {
        console.log(resetAccountResult.message);
        setOpenModal(true);
        setMessage(`Failed!\n\n ${resetAccountResult.message}`);
      }
    }
  }

  return (
    <Dialog
      className="relative z-10"
      open={resetAccountModal}
      onClose={() => setResetAccountModal(false)}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <form onSubmit={handleReset}>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-navBackground text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-background px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-center w-full">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold leading-6 text-brand mb-8"
                    >
                      Reset Account
                    </DialogTitle>
                    <div className="mt-2">
                      <div className="flex flex-col relative">
                        <div className="flex gap-2 bg-textboxBackground h-11 py-1.5 px-2 mb-2 rounded border border-transparent border-solid items-center">
                          <TextBox
                            type="text"
                            id="name"
                            name="name"
                            placeholder="User Name"
                            defaultValue={user.username}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="flex flex-col relative">
                        <div className="flex gap-2 bg-textboxBackground h-11 py-1.5 px-2 mb-2 rounded border border-transparent border-solid items-center">
                          <TextBox
                            type="text"
                            id="balance"
                            name="balance"
                            placeholder="balance"
                            value={balance}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-textboxBackground p-8 sm:flex sm:flex-row-reverse sm:px-6 items-center justify-center">
                <Button
                  type="submit"
                  customStyles="rounded-md px-3 py-2 sm:ml-3 sm:w-auto"
                >
                  Reset Account
                </Button>
                <Button
                  type="button"
                  customStyles="rounded-md bg-white px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setResetAccountModal(false)}
                  data-autofocus
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </form>
      </div>
      {openModal && message && (
        <ModalAlert
          openModal={openModal}
          message={message}
          onClose={() => {
            setOpenModal(false);
            setResetAccountModal(false);
          }}
        />
      )}
    </Dialog>
  );
}
