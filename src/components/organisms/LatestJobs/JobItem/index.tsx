import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {JobType} from "@/types";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React, {FC} from "react";

interface JobItemProps extends JobType {}

const JobItem: FC<JobItemProps> = ({
  category,
  image,
  id,
  jobType,
  location,
  name,
  type,
  skills,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/detail/job/" + id)}
      className="border border-border p-8 flex flex-row items-start gap-6 cursor-pointer"
    >
      <div>
        <Image src={image} alt={image} width={64} height={64} />
      </div>
      <div>
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm text-muted-foreground mb-2">
          {type} . {location}
        </div>
        <div className="h-5 inline-flex gap-2 item-center">
          <Badge variant="secondary">{jobType}</Badge>
          <Separator orientation="vertical" />
          {skills.map((item: string, i: number) => (
            <Badge
              key={item + i}
              variant="outline"
              className="rounded border-primary bg-primary/5 text-primary"
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobItem;
