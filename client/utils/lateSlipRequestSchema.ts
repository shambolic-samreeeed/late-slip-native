import * as Yup from "yup";

export const RequestSchema = Yup.object().shape({
  reason: Yup.string().required("Reason is required"),
});
