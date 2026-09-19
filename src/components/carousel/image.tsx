import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

interface CarouselImageProps extends ImageProps {
  type: string;
  detailId: number;
  priority?: boolean;
}

const CarouselImage = ({
  alt,
  type,
  detailId,
  priority,
  ...rest
}: CarouselImageProps) => {
  const width = 780;
  const height = 439;

  return (
    <Link href={`/${type === "tv" ? "series" : "movie"}/${detailId}`}>
      <div className="group relative flex cursor-pointer items-center justify-center">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ">
          <div className="rounded-full bg-white/10 p-4 backdrop-blur-md duration-200 group-hover:bg-white/20 sm:p-7">
            <FaPlay
              color="white"
              className="h-[22px] w-[22px] pl-1 sm:h-[35px] sm:w-[35px] sm:pl-2"
            />
          </div>
        </div>
        <Image
          className="h-auto w-full rounded-3xl"
          alt={alt}
          {...rest}
          width={width}
          height={height}
          sizes="(max-width: 768px) 92vw, 45vw"
          priority={priority}
        />
      </div>
    </Link>
  );
};

export default CarouselImage;
