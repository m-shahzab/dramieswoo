import Signup from "@/components/signup/Signup";
import { CardDescription } from "@/components/ui/card";
import Container from "@/components/container/Container";
import CusCard from "@/components/layout/CusCard";
import { Link } from "react-router-dom";

function SignupP() {
  return (
    <div className="grid place-content-center h-screen">
      <Container>
        <CusCard cardTitle="Register" cardDes="Create your account">
          <Signup />
          <CardDescription className="mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </CardDescription>
        </CusCard>
      </Container>
    </div>
  );
}

export default SignupP;
