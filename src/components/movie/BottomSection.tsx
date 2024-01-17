import LazyImage from "@/utils/LazyImage";
import { TypographyH2 } from "../ui/Typography/TypographyH2";

function BottomSection({
  production,
}: {
  production: ProductionCompanies[] | undefined;
}) {
  return (
    <div>
      <TypographyH2 className="border-none ">Production</TypographyH2>
      <div className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]">
        {production?.map((company) => (
          <div
            key={company.id}
            className="flex gap-x-1 bg-accent rounded-md p-1"
          >
            <div className="flex items-center overflow-hidden relative w-20 h-20">
              <LazyImage
                imgPath={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                alt={company.name}
                className="w-full"
              />
            </div>
            <div>
              <p>{company.name}</p>
              <small>{company.origin_country}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BottomSection;
