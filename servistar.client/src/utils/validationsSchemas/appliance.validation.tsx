import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
export const schemaCreateAppliance = z.object({
  appliance: z.string().min(2, { message: "Mínimo dos caracteres" }),
});

export type FormTypeCreateAppliance = z.infer<typeof schemaCreateAppliance>;

export const useFormCreateAppliance = () =>
  useForm<FormTypeCreateAppliance>({
    resolver: zodResolver(schemaCreateAppliance),
  });

export const FormProviderCreateAppliance = ({
  children,
}: {
  children: ReactNode;
}) => {
  const methods = useFormCreateAppliance();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const useFormContextCreateAppliance = () =>
  useFormContext<FormTypeCreateAppliance>();
