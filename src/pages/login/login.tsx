import { Guard } from "@kidneed/types";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { useApp } from "@kidneed/hooks";
import MobileForm from "core-team/components/loginForm/mobileForm";
import Logo from "core-team/components/logo/logo";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSendOtp } from "core-team/api";

const Login = () => {
  const [state, setState] = useState();
  const { login } = useApp();
  const { mutateAsync: requestOtp } = useSendOtp();
  const router = useRouter();

  const handleMobileSubmit = ({ mobile }: any) => {
    requestOtp({ mobile }).then(() => {
      router.push(`/login/verify?mobile=${mobile}`)
    })
  };

  return (
    <div id="login" className="tw-h-screen tw-bg-sky-100">
      <div className="tw-flex tw-flex-col tw-h-full tw-justify-center tw-items-center">
        <Logo />
        <div className="tw-mb-10 tw-text-gray-500">
          به یکودو خوش آمدید، ابتدا لطفا وارد شوید.
        </div>
        <Card className="tw-rounded tw-rounded-3xl tw-w-1/2 tw-max-w-lg tw-pb-16 tw-pt-10 tw-px-10">
          <MobileForm onSubmit={handleMobileSubmit} />
        </Card>
      </div>
    </div>
  );
};

const guard: Guard = (matcher) => {
  return matcher("guest");
};

Login.guard = guard;

export default Login;