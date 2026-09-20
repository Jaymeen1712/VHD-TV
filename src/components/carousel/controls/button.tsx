import { Button } from "@heroui/react";
import React from "react";
import { IconType } from "react-icons";

interface CarouselPaginationButtonProps {
  Icon: IconType;
  label: string;
  isDisabled?: boolean;
  handleClick?: () => void;
}

const CarouselPaginationButton = ({
  Icon,
  label,
  isDisabled,
  handleClick,
}: CarouselPaginationButtonProps) => {
  return (
    <Button
      className="group w-fit bg-white/10 backdrop-blur-md hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/10"
      size="md"
      radius="full"
      isIconOnly
      isDisabled={isDisabled}
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
