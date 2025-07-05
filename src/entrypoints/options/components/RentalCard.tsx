import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Spacer } from "@heroui/spacer";

interface RentalCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  nearMrt: boolean;
  imgUrl: string;
  features: string[];
  postDate: string;
}

const RentalCard = ({
  id,
  title,
  price,
  location,
  nearMrt,
  imgUrl,
  features,
  postDate,
}: RentalCardProps) => {
  return (
    <Card key={id}>
      <div className="w-full h-48 overflow-hidden bg-gray-100">
        <Image alt={title} className="object-cover" src={imgUrl} />
      </div>

      <CardBody className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>

        <div className="text-gray-500 text-sm line-clamp-1">{location}</div>

        <Spacer y={2} />

        <div className="flex flex-wrap gap-1.5 ">
          {features.slice(0, 3).map((feature, i) => (
            <Chip key={i} variant="bordered">
              {feature}
            </Chip>
          ))}
          {features.length > 3 && (
            <Chip className="bg-gray-100 text-gray-700">
              +{features.length - 3} more
            </Chip>
          )}
        </div>

        <Spacer y={2} />

        <div className="text-xs text-gray-400">Posted {postDate}</div>
      </CardBody>
    </Card>
  );
};

export default RentalCard;
