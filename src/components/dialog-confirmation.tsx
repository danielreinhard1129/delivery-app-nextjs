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
import { Check, X } from "lucide-react";

interface DialogAcceptProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  isDangerous?: boolean;
}

export default function DialogConfirmation({
  open = false,
  onOpenChange,
  title = "Confirm Action",
  description = "Are you sure you want to proceed? This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isDangerous = false,
}: DialogAcceptProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="space-y-4">
          <div
            className={`mb-2 flex justify-center ${isDangerous ? "text-red-600" : "text-primary"}`}
          >
            {isDangerous ? (
              <X className="h-12 w-12 opacity-80" />
            ) : (
              <Check className="h-12 w-12 opacity-80" />
            )}
          </div>

          <AlertDialogTitle className="text-center text-xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-3 pt-6">
          <AlertDialogCancel className="h-10 flex-1 border-gray-300 hover:bg-gray-100">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={`h-10 flex-1 ${
              isDangerous
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-primary hover:bg-secondary-foreground text-white"
            }`}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
