"use client";
import { useGetCodes, useGetUser } from "@/actions/queries";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const CodeLayout = () => {
  const { data: session } = useSession();

  const user = useGetUser(session?.user.id);

  const codes = useGetCodes(session?.user.id);

  const [name, setName] = useState<string>("");
  return (
    <div className="flex flex-col justify-center items-start col-span-12 mt-6">
      <div className="flex w-full justify-between items-center">
        <Input
          name={name}
          onChange={(e) => setName(e.target.value)}
          className="shad-input max-w-[220px] max-h-[35px]"
          placeholder="role"
        />

        <div className="flex justify-center items-center">
          <Select>
            <SelectTrigger className="shad-select-trigger text-slate-500 max-h-[35px]">
              <SelectValue placeholder="state" />
            </SelectTrigger>
            <SelectContent className="shad-select-content ">
              {["used","Not used"].map((value) => (
                <Selectit
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CodeLayout;
