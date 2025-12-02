"use client";

import { ImageUploadZone } from "@/components/image-upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePresignedDriverUrls } from "@/features/storage/api/useCreatePresignedDriverUrl";
import { generateFileName } from "@/utils/generete-file-name";
import { scrollToElement } from "@/utils/scroll-to";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useCreateDriverRequest } from "../api/useCreateDriverRequest";
import {
  DriverApplicationFormData,
  driverApplicationSchema,
} from "../schemas/driver-application-schema";

export function DriverApplicationForm() {
  const form = useForm<DriverApplicationFormData>({
    resolver: zodResolver(driverApplicationSchema),
    defaultValues: {
      phoneNumber: "",
      address: "",
      ktp: undefined,
      sim: undefined,
      stnk: undefined,
      vehiclePhoto: undefined,
    },
  });

  const { mutateAsync: createPresignedUrl, isPending: isPendingPresigned } =
    useCreatePresignedDriverUrls();
  const { mutateAsync: createDriverRequest, isPending: isPendingCreate } =
    useCreateDriverRequest();

  const clearFunctions = useRef({
    ktp: () => {},
    sim: () => {},
    stnk: () => {},
    vehiclePhoto: () => {},
  });

  const watchedFiles = {
    ktp: form.watch("ktp"),
    sim: form.watch("sim"),
    stnk: form.watch("stnk"),
    vehiclePhoto: form.watch("vehiclePhoto"),
  };

  const handleFileChange = (
    fieldName: keyof typeof watchedFiles,
    file: File | null,
  ) => {
    if (file) {
      form.setValue(fieldName, file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: DriverApplicationFormData) => {
    const keys = [
      generateFileName(data.ktp),
      generateFileName(data.sim),
      generateFileName(data.stnk),
      generateFileName(data.vehiclePhoto),
    ];

    const presignedUrls = await createPresignedUrl({ keys });

    const files = [data.ktp, data.sim, data.stnk, data.vehiclePhoto];

    await Promise.all(
      presignedUrls.map(async (item, index) => {
        await axios.put(item.url, files[index], {
          headers: {
            "Content-Type": files[index].type,
          },
          transformRequest: (data) => data,
        });
      }),
    );

    await createDriverRequest({
      phoneNumber: data.phoneNumber,
      address: data.address,
      ktp: [presignedUrls[0].bucket, presignedUrls[0].key],
      sim: [presignedUrls[1].bucket, presignedUrls[1].key],
      stnk: [presignedUrls[2].bucket, presignedUrls[2].key],
      vehiclePhoto: [presignedUrls[3].bucket, presignedUrls[3].key],
    });

    form.reset({
      phoneNumber: "",
      address: "",
      ktp: undefined,
      sim: undefined,
      stnk: undefined,
      vehiclePhoto: undefined,
    });

    clearFunctions.current.ktp();
    clearFunctions.current.sim();
    clearFunctions.current.stnk();
    clearFunctions.current.vehiclePhoto();

    scrollToElement("page-wrapper");
  };

  return (
    <Card className="border-border border shadow-lg">
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-foreground text-lg font-semibold">
                  Personal Information
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Provide your contact details
                </p>
              </div>

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Example: 08123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Full Address</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-24 resize-none"
                        placeholder="Enter your complete address with details (street, house number, district, city)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Documents Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-foreground text-lg font-semibold">
                  Required Documents
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Upload clear photos or scans of your documents (JPG, PNG - max
                  5MB each)
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* KTP Upload */}
                <div className="space-y-2">
                  <Label className="font-medium">
                    ID Card (KTP) <span className="text-destructive">*</span>
                  </Label>
                  <ImageUploadZone
                    onFileSelect={(file) => handleFileChange("ktp", file)}
                    onMountClear={(fn) => (clearFunctions.current.ktp = fn)}
                    label="National ID"
                  />
                  {form.formState.errors.ktp && (
                    <p className="text-destructive mt-1 text-xs">
                      {form.formState.errors.ktp.message}
                    </p>
                  )}
                </div>

                {/* SIM Upload */}
                <div className="space-y-2">
                  <Label className="font-medium">
                    Driver's License (SIM){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <ImageUploadZone
                    onFileSelect={(file) => handleFileChange("sim", file)}
                    onMountClear={(fn) => (clearFunctions.current.sim = fn)}
                    label="Driver's License"
                  />
                  {form.formState.errors.sim && (
                    <p className="text-destructive mt-1 text-xs">
                      {form.formState.errors.sim.message}
                    </p>
                  )}
                </div>

                {/* STNK Upload */}
                <div className="space-y-2">
                  <Label className="font-medium">
                    Vehicle Registration (STNK){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <ImageUploadZone
                    onFileSelect={(file) => handleFileChange("stnk", file)}
                    onMountClear={(fn) => (clearFunctions.current.stnk = fn)}
                    label="Vehicle Registration"
                  />
                  {form.formState.errors.stnk && (
                    <p className="text-destructive mt-1 text-xs">
                      {form.formState.errors.stnk.message}
                    </p>
                  )}
                </div>

                {/* Vehicle Photo Upload */}
                <div className="space-y-2">
                  <Label className="font-medium">
                    Vehicle Photo <span className="text-destructive">*</span>
                  </Label>
                  <ImageUploadZone
                    onFileSelect={(file) =>
                      handleFileChange("vehiclePhoto", file)
                    }
                    onMountClear={(fn) =>
                      (clearFunctions.current.vehiclePhoto = fn)
                    }
                    label="Front View of Vehicle"
                  />
                  {form.formState.errors.vehiclePhoto && (
                    <p className="text-destructive mt-1 text-xs">
                      {form.formState.errors.vehiclePhoto.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={
                isPendingCreate || isPendingPresigned || !form.formState.isDirty
              }
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-6 text-base font-semibold"
            >
              Submit Application
            </Button>

            <p className="text-muted-foreground text-center text-xs">
              By submitting, you agree to our terms and conditions. Your
              information will be kept safe and reviewed by our team.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
