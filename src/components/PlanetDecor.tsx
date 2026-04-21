import Image from "next/image";

type PlanetDecorName = "earth" | "uranus";

const imageByName: Record<PlanetDecorName, string> = {
  earth: "/images/decor/earth.png",
  uranus: "/images/decor/uranus.png",
};

export function PlanetDecor({
  name,
  className,
}: {
  name: PlanetDecorName;
  className: string;
}) {
  return (
    <Image
      src={imageByName[name]}
      alt=""
      width={420}
      height={420}
      aria-hidden="true"
      className={`pointer-events-none absolute select-none object-contain ${className}`}
    />
  );
}
