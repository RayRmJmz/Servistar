import * as Yup from "yup";
import { FORM_ERRORS } from "../../constants";
export const customerValidationSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERRORS.Required),
  lastName: Yup.string().required(FORM_ERRORS.Required),
  secondLastName: Yup.string().required(FORM_ERRORS.Required),
});
