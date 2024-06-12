import React from 'react';
import Select from 'react-select';
import useSWR from 'swr';
import { authFetcher } from '../utils/fetcher';

const HashtagFilter = ({ selectedHashtags, handleHashtagChange }) => {
    const { data: hashtags, error } = useSWR('/hashtags', authFetcher);

    const handleChange = (selectedOptions) => {
        const selectedIds = selectedOptions ? selectedOptions.map(option => option.id) : [];
        handleHashtagChange(selectedIds);
    };

    if (!error && !hashtags) return <div>Loading hashtags...</div>;
    if (error) return <div className='mt-4 text-center text-red-700 font-bold'>{error.message}</div>;

    return (
        <div className='flex justify-center mb-8'>
            <Select
                isMulti
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                value={hashtags.filter(hashtag => selectedHashtags.includes(hashtag.id))}
                onChange={handleChange}
                options={hashtags}
                placeholder="Filter by hashtags..."
            />
        </div>

    );
};

export default HashtagFilter;
