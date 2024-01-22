import { Badge } from '@/components/ui/badge';
import { CompanyType } from '@/types';
import Image from 'next/image';
import React, { FC } from 'react'

interface CompanyCardProps extends CompanyType {
  
}

const CompanyCard: FC<CompanyCardProps> = ({ categories, description, image, name, totalJobs }) => {
  return (
    <div className='border border-border p-6'>
        <div className="flex flex-row justify-between items-start">
            <Image src='/images/company2.png' alt='/images/company2.png' width={66} height={66}/>
            <Badge>{totalJobs} Jobs</Badge>
        </div>
        <div className="my-4">
            <div className="text-lg font-semibold mb-2">{name}</div>
            <div className="line-clamp-3 text-sm text-muted-foregorund">
                {description}
            </div>
        </div>
        <div className="space-x-2">
            <Badge variant='outline'>
                {categories}
            </Badge>
        </div>
    </div>
  )
}

export default CompanyCard;