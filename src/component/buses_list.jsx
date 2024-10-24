import React, { useState } from 'react';
import busesData from '../data/static/buses_data.jsx';

const ListOfBuses = () => {
    const [buses, setBuses] = useState(busesData);
    const [filter, setFilter] = useState('');

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredBuses = filter
        ? buses.filter(bus => bus.busClass === filter)
        : buses;

    const uniqueBusClasses = [...new Set(buses.map(bus => bus.busClass))];

    return (
        <div dir='rtl' className="p-4 bg-gray-100 min-h-screen">
            <div className='flex  m-auto w-'>
                <h1 className="text-2xl font-bold mb-4 px-8 m-auto">الباصات</h1>
                <button className="bg-green-500 text-white py-1 px-4 rounded m-auto hover:bg-green-600 mx-4">
                    اضافة باص
                </button>
            </div>
            <div className="mb-4 bg-blue-200 rounded shadow-lg p-3">
                <label htmlFor="busClass" className="mx-2">الصف</label>
                <select
                    id="busClass"
                    value={filter}
                    onChange={handleFilterChange}
                    className="border p-2 rounded bg-inherit"
                >
                    <option value="">All</option>
                    {uniqueBusClasses.map((busClass) => (
                        <option key={busClass} value={busClass}>
                            {busClass}
                        </option>
                    ))}
                </select>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">رقم الباص</th>
                        <th className="py-2 px-4 border">الصف</th>
                        <th className="py-2 px-4 border">العدد</th>
                        <th className="py-2 px-4 border">المشرف</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {filteredBuses.map(bus => (
                        <tr key={bus.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">{bus.busNumber}</td>
                            <td className="py-2 px-4 border">{bus.busClass}</td>
                            <td className="py-2 px-4 border">{bus.capacity}</td>
                            <td className="py-2 px-4 border">{bus.supervisor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOfBuses;
