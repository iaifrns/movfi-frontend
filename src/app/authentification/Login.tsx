import FishIcon from "@/assets/icons/fish";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Dashboard, register } from "@/constant/routs";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { checkDataLogin } from "./services/checkData";
import LoadingIcon from "@/assets/icons/loading";
import { login } from "@/service/login";
import { dataContext } from "@/hooks/useContext";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {setUser} = useContext(dataContext)

  const handleSubmit = () => {
    setLoading(true);
    const isOk = checkDataLogin(formData);

    if (isOk) {
      login(
        {
          email: formData.email,
          password: formData.password,
        },
        () => navigate(Dashboard),
        setUser
      ).then(()=>setLoading(false));
    }
  };

  return (
    <div className="flex h-screen w-full flex-col justify-center items-center gap-5">
      <div className="flex items-center justify-center gap-2">
        <FishIcon w="24px" h="24px" />
        <span className="text-base font-semibold">MovFi.</span>
      </div>
      <div className={"flex flex-col gap-6 w-100"}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Enter your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <Button
                    type="submit"
                    onClick={() => {
                      if (!loading) handleSubmit();
                    }}
                  >
                    {loading ? <LoadingIcon /> : "Login"}
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <a
                      className="cursor-pointer"
                      onClick={() => navigate(register)}
                    >
                      Sign up
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
