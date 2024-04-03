import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

const schemaCreateAddress = z.object({
  number: z.string().min(3, { message: "Numero es requerido" }),
  street: z.string().min(3),
  colony: z.string().min(3),
  minicipalityId: z.number(),
  state: z.string().min(3),
  postalCode: z.string().min(5),
});

const schemaCreatePhonebook = z.object({
  phoneNumber: z.string().min(10, { message: "Phone number min 10" }),
});

export const schemaCreateCustomer = z.object({
  name: z.string().min(2, { message: "Nombre mínimo dos caratacteres" }),
  lastName: z.string().min(2, { message: "Apellido mínimo dos caratacteres" }),
  secondLastName: z
    .string()
    .min(2, { message: "Segundo apellido mínimo dos caratacteres" }),
  phoneNumbers: z
    .array(schemaCreatePhonebook, {
      required_error: "Debes agregar por lo menos un número telefónico",
    })
    .min(1, { message: "Debes agregar por lo menos un número telefónico" }),
  address: z
    .array(schemaCreateAddress, {
      required_error: "Debes agregar por lo menos una dirección",
    })
    .min(1, { message: "Debes agregar por lo menos una dirección" }),
});

export type FormTypeCreateCustomer = z.infer<typeof schemaCreateCustomer>;

export const useFormCreateCustomer = () =>
  useForm<FormTypeCreateCustomer>({
    resolver: zodResolver(schemaCreateCustomer),
  });

export const FormProviderCreateCustomer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const methods = useFormCreateCustomer();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const useFormContextCreateCustomer = () =>
  useFormContext<FormTypeCreateCustomer>();
