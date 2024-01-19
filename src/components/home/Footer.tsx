import Container from "../container/Container";
import { TypographyP } from "@/components/ui/Typography/TypographyP";
import { Button } from "../ui/button";
function Footer() {
  return (
    <footer className="bg-card my-2">
      <Container>
        <TypographyP className="bg-card px-2 py-3 font-semibold">
          Designed and Developed by{" "}
          <Button asChild variant={"link"} className="py-0 px-0 text-lg">
            <a
              href="https://github.com/m-shahzab"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              Muhammad ShahZaiB
            </a>
          </Button>
        </TypographyP>
      </Container>
    </footer>
  );
}

export default Footer;
