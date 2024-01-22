import React, { FC } from 'react'
import { FaArrowRight } from 'react-icons/fa';

interface TitleSectionProps {
  word1: string;
  word2: string;
}

const TitleSection: FC<TitleSectionProps> = ({ word1, word2 }) => {
  return (
    <div className='flex flex-row justify-between items-center'>
        <div className="text-4xl font-bold">
            {word1} <span className="text-primary">{word2}</span>
        </div>
        <div className="inline-flex gap-3 items-center text-primary font-semibold cursor-pointer">
            <span>Show all jobs</span>
            <FaArrowRight />
        </div>
    </div>
  )
}

export default TitleSection;