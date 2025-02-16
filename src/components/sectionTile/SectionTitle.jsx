import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center space-y-4 mt-20 mb-10 md:w-3/12 mx-auto ">
            <p className="text-yellow-500">{subHeading}</p>
            <h2 className="text-4xl uppercase border-y-2">{heading}</h2>
        </div>
    );
};

export default SectionTitle;