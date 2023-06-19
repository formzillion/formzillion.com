"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialog";
import { Button } from "@/ui/Buttons/SButton";

export default function DisconnectConnectionModal({
  closeModal,
  handleDisconnect,
  appName,
  isLoading,
}: {
  closeModal: any;
  handleDisconnect: any;
  appName: string;
  isLoading: boolean;
}) {
  return (
    <Dialog open={closeModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disconnect {appName} Account</DialogTitle>
          <DialogDescription className="text-gray-600">
            Disconnecting your {appName} account will render all associated
            workflows inoperable.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={closeModal} className="rounded-none">
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            className="bg-orange-600 text-white rounded-none"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
