import { FC } from "react";
import FormWrapper from "../wrappers/FormWrapper";
import RegisterForm from "../components/authorization/components/RegisterForm";

const Register: FC = () => {
  return (
    <FormWrapper>
      <RegisterForm/>
    </FormWrapper>
  );
};

export default Register;
