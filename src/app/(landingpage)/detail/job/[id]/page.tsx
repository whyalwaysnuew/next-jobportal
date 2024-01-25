import FormModalApply from "@/components/organisms/FormModalApply";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React, {FC} from "react";
import {BiCategory} from "react-icons/bi";
import prisma from "../../../../../../lib/prisma";
import { supabasePublicUrl } from "@/lib/supabase";
import { dateFormat } from "@/lib/utils";

async function getDetailJob(id: string) {
  const data = await prisma.job.findFirst({
    where: {
      id,
    },
    include: {
      Company: {
        include: {
          Companyoverview: true,
        },
      },
      CategoryJob: true,
    },
  });

  let imageUrl

  if(data?.Company?.Companyoverview[0].image) {
    imageUrl = await supabasePublicUrl(data.Company.Companyoverview[0].image, 'company')
  } else {
    imageUrl = '/images/company2.png'
  }

  const applicants = data?.applicants || 0
  const needs = data?.needs || 0

  return {...data, image: imageUrl, benefits: data?.benefits, applicants, needs};
}

const DetailJobPage = async ({params}: {params: {id: string}}) => {
  const data = await getDetailJob(params.id);

  return (
    <>
      <div className="bg-slate-100 px-32 pt-10 pb-14">
        <div className="inline-flex gap-3 text-sm text-muted-foreground">
          <Link className="hover:underline hover:text-primary" href="/">
            Home
          </Link>{" "}
          /{" "}
          <Link
            className="hover:underline hover:text-primary"
            href="/find-companies"
          >
            Companies
          </Link>{" "}
          /{" "}
          <Link
            className="hover:underline hover:text-primary"
            href={`/detail/company/${data?.Company?.Companyoverview[0].id}`}
          >
            {data?.Company?.Companyoverview[0].name}
          </Link>{" "}
          /{" "}
          <Link
            className="hover:underline hover:text-primary"
            href={`/detail/job/${data?.id}`}
          >
            {data?.roles}
          </Link>
        </div>

        <div className="bg-white shadow mt-10 p-5 w-11/12 mx-auto flex flex-row justify-between items-center">
          <div className="inline-flex items-center gap-5">
            <Image
              src={data.image}
              alt={data.image}
              width={88}
              height={88}
            />
            <div>
              <div className="text-2xl font-semibold">{data?.roles}</div>
              <div className="text-muted-foreground">
                {data?.Company?.Companyoverview[0].industry} . {data?.Company?.Companyoverview[0].location} . {data?.jobType}
              </div>
            </div>
          </div>
          <FormModalApply id={data.id!!} industry={data.Company?.Companyoverview[0].industry} image={data.image} roles={data.roles} jobType={data.jobType} location={data.Company?.Companyoverview[0].location}  />
        </div>
      </div>

      <div className="px-32 py-16 flex flex-row items-start gap-10">
        <div className="w-3/4">
          <div className="mb-16">
            <div className="text-3xl font-semibold mb-3">Description</div>
            <div className="text-muted-foreground" dangerouslySetInnerHTML={{__html: data?.description!!}}>
            </div>
          </div>
          <div className="mb-16">
            <div className="text-3xl font-semibold mb-3">Responsibilities</div>
            <div className="text-muted-foreground" dangerouslySetInnerHTML={{__html: data?.whoYouAre!!}}>
            </div>
          </div>
          <div className="mb-16">
            <div className="text-3xl font-semibold mb-3">Who You Are</div>
            <div className="text-muted-foreground" dangerouslySetInnerHTML={{__html: data?.niceToHaves!!}}>
            </div>
          </div>
          <div className="mb-16">
            <div className="text-3xl font-semibold mb-3">Nice-To-Haves</div>
            <div className="text-muted-foreground">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div>
            <div className="text-3xl font-semibold">About this role</div>

            <div className="mt-6 p-4 bg-slate-50">
              <div className="mb-2">
                <span className="font-semibold">{data?.applicants} Applied</span>{" "}
                <span className="text-gray-600">of {data?.needs} capacity</span>
              </div>
              <Progress value={(data.applicants / data.needs) * 100} />
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Apply Before</div>
                <div className="font-semibold">{dateFormat(data.dueDate!!)}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Job Posted On</div>
                <div className="font-semibold">{dateFormat(data.datePosted!!)}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Job Type</div>
                <div className="font-semibold">{data?.jobType}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Salary</div>
                <div className="font-semibold">${data?.salaryFrom} - ${data?.SalaryTo} USD</div>
              </div>
            </div>
          </div>

          <Separator className="my-10" />

          <div>
            <div className="text-3xl font-semibold">Category</div>
            <div className="my-10 inline-flex gap-4">
              <Badge>{data?.CategoryJob?.name}</Badge>
            </div>
          </div>

          <Separator className="my-10" />

          <div>
            <div className="text-3xl font-semibold">Required Skills</div>
            <div className="my-10 inline-flex gap-4">
              {data?.requiredSkills?.map((item: any, i: number) => (
                <Badge variant="outline" key={item + i}>
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-32 pb-16">
        <Separator className="mb-14" />

        <div className="mb-6">
          <div className="font-semibold text-3xl">Perks & Benefits</div>
          <div className="text-gray-500 mt-1">
            This job comes with several perks and benefits
          </div>
        </div>

        <div className="grid grid-cols-5 gap-5">
          {data?.benefits?.map((item: any, i: number) => (
            <div key={i}>
              <BiCategory className="w-12 h-12 text-primary" />
              <div className="font-semibold text-xl mt-6">{item.benefit}</div>
              <div className="mt-3 text-sm text-gray-500">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailJobPage;
