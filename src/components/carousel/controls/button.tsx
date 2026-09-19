import { Button } from "@heroui/react";
import React from "react";
import { IconType } from "react-icons";

interface CarouselPaginationButtonProps {
  Icon: IconType;
  label: string;
  handleClick?: () => void;
}

const CarouselPaginationButton = ({
  Icon,
  label,
  handleClick,
}: CarouselPaginationButtonProps) => {
  return (
    <Button
      className="w-fit bg-white/10 backdrop-blur-md hover:bg-white/30 group"
      size="md"
      radius="full"
      isIconOnly
      aria-label={label}
      onPress={handleClick}
    >
      <Icon
        size={20}
        className={`text-white group-hover:text-primary`}
      />
    </Button>
  );
};

export default CarouselPaginationButton;
