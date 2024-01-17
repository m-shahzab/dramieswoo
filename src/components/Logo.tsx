import { Link } from "react-router-dom";

function Logo({ className }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Link to="/">
        <img src="/imgs/logo.png" alt="Logo" />
      </Link>
    </div>
  );
}

export default Logo;
