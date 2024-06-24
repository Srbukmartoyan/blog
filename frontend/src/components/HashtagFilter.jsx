import React from 'react';
import Select from 'react-select';
import useSWR from 'swr';

import { authFetcher } from '../utils/fetcher';
import LoadingIndicator from './LoadingIndicator';
import ErrorDisplay from './ErrorDisplay';

const HashtagFilter = ({ selectedHashtags, handleHashtagChange }) => {
    const { data: hashtags, error } = useSWR('/hashtags', authFetcher);

    const handleChange = (selectedOptions) => {
        const selectedIds = selectedOptions ? selectedOptions.map(option => option.id) : [];
        handleHashtagChange(selectedIds);
    };

    if (!error && !hashtags) return <LoadingIndicator />;
    if (error) return <ErrorDisplay message="Failed to load hashtags"/>

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
