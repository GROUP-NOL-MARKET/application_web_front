import React, { useState } from 'react'

const CountryDropdown = () => {


    const [selectedCountry, setSelectedCountry] = useState('');

    const countries = [
        { code: '+229', name: 'Bénin' },
    ];
    // Gérer le changement de pays
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };
    return (
        <div className="h-100 w-100">
            <select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className='h-100 w-100'
            >
                {selectedCountry && (<p>{countries.find(c => c.code === selectedCountry)?.code}</p>)}
                {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.code}
                    </option>
                ))}

            </select>


        </div>
    );
};

export default CountryDropdown;
