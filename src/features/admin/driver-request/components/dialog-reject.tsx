"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

interface DialogRejectProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (reason: string) => void;
  placeholder?: string;
}

export default function DialogReject({
  open = true,
  onOpenChange,
  title = "Reject Request",
  description = "Please provide a reason for rejecting this request. This information will be sent to the applicant.",
  confirmText = "Reject",
  cancelText = "Cancel",
  onConfirm,
  placeholder = "Enter rejection reason...",
}: DialogRejectProps) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(reason);
      setReason("");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="space-y-4">
          <div className="mb-2 flex justify-center text-red-600">
            <AlertCircle className="h-12 w-12 opacity-80" />
          </div>

          <AlertDialogTitle className="text-center text-xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3 py-4">
          <label
            htmlFor="rejection-reason"
            className="text-sm font-medium text-gray-700"
          >
            Reason for Rejection
          </label>
          <textarea
            id="rejection-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={placeholder}
            maxLength={500}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
            rows={4}
          />
          <p className="text-xs text-gray-500">
            {reason.length}/500 characters
          </p>
        </div>

        <AlertDialogFooter className="flex gap-3 pt-4">
          <AlertDialogCancel className="h-10 flex-1 border-gray-300 hover:bg-gray-100">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="h-10 flex-1 bg-red-600 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
