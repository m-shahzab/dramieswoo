import Login from "@/components/login/Login";
import { CardDescription } from "@/components/ui/card";
import Container from "@/components/container/Container";
import CusCard from "@/components/layout/CusCard";
import { Link } from "react-router-dom";

function LoginP() {
  return (
    <div className="grid place-content-center h-screen">
      <Container>
        <CusCard cardTitle="Login" cardDes="Login your account">
          <Login />
          <CardDescription className="mt-2">
            Don't have account? <Link to="/signup">Register</Link>
          </CardDescription>
        </CusCard>
      </Container>
    </div>
  );
}

export default LoginP;
