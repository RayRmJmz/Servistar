import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
export const schemaCreateBrnad = z.object({
  brand: z.string().min(2, { message: "Mínimo dos caracteres" }),
});

export type FormTypeCreateBrand = z.infer<typeof schemaCreateBrnad>;

export const useFormCreateBrand = () =>
  useForm<FormTypeCreateBrand>({
    resolver: zodResolver(schemaCreateBrnad),
  });

export const FormProviderCreateBrand = ({
  children,
}: {
  children: ReactNode;
}) => {
  const methods = useFormCreateBrand();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const useFormContextCreateBrand = () =>
  useFormContext<FormTypeCreateBrand>();
