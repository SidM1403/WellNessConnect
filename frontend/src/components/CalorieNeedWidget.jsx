import React, { useState } from 'react';
import api from '../api/api';
import { FaCalculator, FaFireAlt } from 'react-icons/fa';

const CalorieNeedWidget = () => {
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        activity: 'moderate'
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/calories/calculate', formData);
            setResult(data.tdee);
        } catch (error) {
            console.error('Failed to calculate', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='flex flex-col h-full'>
            {!result ? (
                <form onSubmit={handleSubmit} className='space-y-3'>
                    <div className='grid grid-cols-2 gap-2'>
                        <input
                            type='number'
                            name='age'
                            placeholder='Age'
                            value={formData.age}
                            onChange={handleChange}
                            className='w-full p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all'
                            required
                        />
                        <select
                            name='gender'
                            value={formData.gender}
                            onChange={handleChange}
                            className='w-full p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all cursor-pointer'
                        >
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <input
                            type='number'
                            name='weight'
                            placeholder='Wt (kg)'
                            value={formData.weight}
                            onChange={handleChange}
                            className='w-full p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all'
                            required
                        />
                        <input
                            type='number'
                            name='height'
                            placeholder='Ht (cm)'
                            value={formData.height}
                            onChange={handleChange}
                            className='w-full p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all'
                            required
                        />
                    </div>
                    <select
                        name='activity'
                        value={formData.activity}
                        onChange={handleChange}
                        className='w-full p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all cursor-pointer'
                    >
                        <option value='sedentary'>Sedentary (Little/no exercise)</option>
                        <option value='light'>Light (1-3 days/week)</option>
                        <option value='moderate'>Moderate (3-5 days/week)</option>
                        <option value='active'>Active (6-7 days/week)</option>
                        <option value='very_active'>Very Active (Physical job)</option>
                    </select>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2'
                    >
                        {loading ? '...' : <><FaCalculator /> Calculate</>}
                    </button>
                </form>
            ) : (
                <div className='flex flex-col items-center justify-center h-full text-center py-2'>
                    <p className='text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2'>Daily Target</p>
                    <div className='text-5xl font-bold text-gray-900 flex items-center gap-2 mb-2'>
                        <FaFireAlt className="text-orange-500 animate-pulse" />
                        {result}
                    </div>
                    <p className='text-gray-600 text-sm font-medium'>calories / day</p>
                    <button
                        onClick={() => setResult(null)}
                        className="mt-6 px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        Recalculate
                    </button>
                </div>
            )}
        </div>
    );
};

export default React.memo(CalorieNeedWidget);
