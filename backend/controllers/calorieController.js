import CalorieLog from '../models/CalorieLog.js';

export const calculateNeeds = async (req, res) => {
    try {
        const { age, gender, weight, height, activity } = req.body;

        if (!age || !gender || !weight || !height || !activity) {
            return res.status(400).json({ message: 'Please provide all details' });
        }

        // Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Activity Multipliers
        const multipliers = {
            sedentary: 1.2,      // Little or no exercise
            light: 1.375,        // Light exercise 1-3 days/week
            moderate: 1.55,      // Moderate exercise 3-5 days/week
            active: 1.725,       // Hard exercise 6-7 days/week
            very_active: 1.9     // Very hard exercise & physical job
        };

        const tdee = Math.round(bmr * (multipliers[activity] || 1.2));

        // Save to Database
        if (req.user) {
            await CalorieLog.create({
                user: req.user._id,
                age,
                gender,
                weight,
                height,
                activity,
                bmr: Math.round(bmr),
                tdee
            });
        }

        res.status(200).json({
            bmr: Math.round(bmr),
            tdee,
            message: 'Calculation successful'
        });
    } catch (error) {
        console.error('Calorie calc error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
