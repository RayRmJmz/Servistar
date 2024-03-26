import * as Yup from "yup";
import { FORM_ERRORS } from "../../constants";
export const authValidationSchema = Yup.object().shape({
  userName: Yup.string().required(FORM_ERRORS.Required),
  password: Yup.string()
    .min(4, "Constreña debe ser de mínimo 4 caracteres.")
    .required(FORM_ERRORS.Required),
});
