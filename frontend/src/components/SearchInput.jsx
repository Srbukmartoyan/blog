const SearchInput = ({ searchTerm, handleSearchChange, placeholder }) => {
    return (
        <div className='flex justify-center mb-8'>
            <div className='flex items-center gap-2 border border-gray-300 rounded-md p-2'>
                <div className='text-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder={placeholder}
                    className="outline-none"
                />
            </div>
        </div>
    );
};

export default SearchInput;