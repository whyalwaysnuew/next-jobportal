"use client";

import ExploreDataContainer from "@/containers/ExploreDataContainer";
import {formFilterSchema} from "@/lib/form-schema";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {JobType, filterFormType} from "@/types";
import {CATEGORIES_OPTIONS} from "@/constants";

const FILTER_FORMS: filterFormType[] = [
  {
    name: "categories",
    label: "Categories",
    items: CATEGORIES_OPTIONS,
  },
];

const dummyData: JobType[] = [
  {
    applicants: 5,
    categories: ['Marketing', 'Technology'],
    desc: 'Description',
    image: '/images/company2.png',
    jobType: 'Full-Time',
    location: 'Oslo, Norway',
    name: 'SEO Specialist',
    needs: 10,
    type: 'Corporate'
  },
  {
    applicants: 2,
    categories: ['Technology', 'Software'],
    desc: 'Description',
    image: '/images/company2.png',
    jobType: 'Full-Time',
    location: 'Palermo, Buenos Aires',
    name: 'Dev Ops',
    needs: 20,
    type: 'Agency'
  },
  {
    applicants: 7,
    categories: ['Technology', 'Software'],
    desc: 'Description',
    image: '/images/company2.png',
    jobType: 'Full-Time',
    location: 'Helsinki, Finland',
    name: 'Software Engineer',
    needs: 30,
    type: 'Start up'
  },
]

export default function FindJobsPage() {
  const formFilter = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: [],
    },
  });

  const onSubmitFormFilter = async (val: z.infer<typeof formFilterSchema>) =>
    console.log(val);

  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={onSubmitFormFilter}
      filterForms={FILTER_FORMS}
      title="dream job"
      subtitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
      loading={false}
      type="job"
      data={dummyData}
    />
  );
}
