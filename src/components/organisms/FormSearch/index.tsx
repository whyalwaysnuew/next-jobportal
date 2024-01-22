import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, {FC} from "react";
import {BsSearch} from "react-icons/bs";
import {IoLocationOutline} from "react-icons/io5";

interface FormSearchProps {}

const FormSearch: FC<FormSearchProps> = ({}) => {
  return (
    <>
      <div className="mt-6 bg-background p-4 shadow-md inline-flex items-center gap-4 relative w-max z-10">
        <div className="inline-flex gap-3 items-center">
          <BsSearch className="w-6 h-6" />
          <Input
            className="py-8 w-[300px] border-none"
            placeholder="Job Title or keyword"
          />
        </div>
        <div className="inline-flex gap-3 items-center">
          <IoLocationOutline className="w-6 h-6" />
          <Select>
            <SelectTrigger className="w-[300px] border-none text-gray-500 outline-none py-8">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Norway">Norway</SelectItem>
              <SelectItem value="Lithuania">Lithuania</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Romania">Romania</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button className="py-8 px-10 text-lg">Find</Button>
        </div>
      </div>
      <div>
        <div className="text-muted-foreground mt-3">
          Popular: UI Designer, UX Researcher, Android, Admin
        </div>
      </div>
    </>
  );
};

export default FormSearch;
