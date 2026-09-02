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
import { login } from "@/constant/routs";
import { useState } from "react";
import { useNavigate } from "react-router";
import { checkDataRegister } from "./services/checkData";
import { register } from "@/service/register";
import LoadingIcon from "@/assets/icons/loading";

const RegistrationPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleSubmit = () => {
    setLoading(true);
    const isOk = checkDataRegister(formData);

    if (isOk) {
      register(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        () => navigate(login),
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
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>Enter all your informations</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </Field>
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
                  <CardDescription className="text-xs">
                    the password should not be less than 5 characters
                  </CardDescription>
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.confirm}
                    onChange={(e) =>
                      setFormData({ ...formData, confirm: e.target.value })
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
                    {loading ? <LoadingIcon /> : "Create Account"}
                  </Button>
                  <FieldDescription className="text-center">
                    Do you have an account?{" "}
                    <a
                      className="cursor-pointer"
                      onClick={() => navigate(login)}
                    >
                      Sign in
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

export default RegistrationPage;
