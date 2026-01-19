import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DynamicFormRenderer = ({
  fields = [],
  onSubmit,
  submitLabel = "Submit",
}: any) => {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const handleInternalSubmit = () => {
    const rawData = getValues();
    const dataWithStandardKeys: any = { ...rawData };

    fields.forEach((f: any) => {
      const label = (f?.label || "").toLowerCase();
      const type = (f?.type || "").toLowerCase();
      const id = f?.id;

      if (!id) return;

      if (type === "email" || label.includes("email")) {
        dataWithStandardKeys.email = rawData[id];
      }

      if (label.includes("member") && label.includes("name")) {
        dataWithStandardKeys.name = rawData[id];
      }
    });

    onSubmit(dataWithStandardKeys);
  };

  return (
    <form onSubmit={handleSubmit(handleInternalSubmit)} className="space-y-4">
      {fields.map((field: any, index: number) => {
        const id = field?.id || `field_${index}`;
        const type = (field?.type || "text").toLowerCase();
        const label = field?.label || "Unnamed Field";

        return (
          <div key={id} className="space-y-1">
            <Label className="text-[#741b1b] font-bold">
              {label}
            </Label>

            {type === "textarea" ? (
              <Textarea
                {...register(id, { required: field?.required })}
                className="bg-white/60"
              />
            ) : type === "dropdown" ? (
              <Select onValueChange={(v) => setValue(id, v)}>
                <SelectTrigger className="bg-white/60">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {field?.options?.map((opt: string) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={type}
                {...register(id, { required: field?.required })}
                className="bg-white/60"
              />
            )}
          </div>
        );
      })}

      <Button type="submit" className="w-full bg-[#741b1b] text-white py-6">
        {submitLabel}
      </Button>
    </form>
  );
};
