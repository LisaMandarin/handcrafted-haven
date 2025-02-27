import { Breadcrumb } from "antd";
import { TitleType } from "@/types/data";

export default function Title({
  name,
  description,
  breadcrumbItems,
}: TitleType) {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="relative font-bold text-2xl mb-4">
        Here are the {name} {description}
        <div className="absolute bottom-2 -z-10 bg-custom-yellow-2 w-full h-1"></div>
      </h1>
    </>
  );
}
