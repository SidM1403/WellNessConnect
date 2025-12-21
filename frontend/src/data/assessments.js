
export const assessments = [
    {
        id: 'hip-mobility',
        title: 'How Efficient Is My Hip Mobility?',
        description: 'Your hips are the power center of your body. Test your mobility and find out if you need to move more.',
        image: 'https://cdn-icons-png.flaticon.com/512/2548/2548535.png',
        color: 'bg-emerald-50',
        iconColor: 'text-emerald-500',
        questions: [
            {
                id: 1,
                text: 'How comfortable is your deep squat?',
                options: [
                    { text: 'Can squat below parallel with ease', score: 3 },
                    { text: 'Can squat to parallel with some stiffness', score: 2 },
                    { text: 'Can barely reach half squat', score: 1 },
                    { text: 'Squats cause discomfort or instability', score: 0 }
                ]
            },
            {
                id: 2,
                text: 'Can you touch your toes without bending your knees?',
                options: [
                    { text: 'Yes, palms on floor', score: 3 },
                    { text: 'Yes, fingertips touch', score: 2 },
                    { text: 'Almost, within a few inches', score: 1 },
                    { text: 'No, nowhere near', score: 0 }
                ]
            },
            {
                id: 3,
                text: 'Do you feel stiffness after sitting for long periods?',
                options: [
                    { text: 'Rarely or never', score: 3 },
                    { text: 'Sometimes, mild stiffness', score: 2 },
                    { text: 'Often, takes time to walk it off', score: 1 },
                    { text: 'Always, very painful', score: 0 }
                ]
            },
            {
                id: 4,
                text: 'Can you sit cross-legged on the floor comfortably?',
                options: [
                    { text: 'Yes, for a long time', score: 3 },
                    { text: 'Yes, but not for long', score: 2 },
                    { text: 'Only with back support', score: 1 },
                    { text: 'No, it hurts my hips/knees', score: 0 }
                ]
            },
            {
                id: 5,
                text: 'When lying on your back, can you pull one knee to your chest easily?',
                options: [
                    { text: 'Yes, knee touches chest', score: 3 },
                    { text: 'Yes, but feels tight', score: 2 },
                    { text: 'Struggle to get it past 90 degrees', score: 1 },
                    { text: 'Painful to attempt', score: 0 }
                ]
            },
            {
                id: 6,
                text: 'Do your hips click or pop frequently?',
                options: [
                    { text: 'Never', score: 3 },
                    { text: 'Occasionally, no pain', score: 2 },
                    { text: 'Often, with discomfort', score: 1 },
                    { text: 'Constantly and painfully', score: 0 }
                ]
            },
            {
                id: 7,
                text: 'How is your stride length when walking?',
                options: [
                    { text: 'Long and fluid', score: 3 },
                    { text: 'Average', score: 2 },
                    { text: 'Short/shuffling', score: 1 },
                    { text: 'Restricted by pain', score: 0 }
                ]
            },
            {
                id: 8,
                text: 'Can you stand on one leg for 30 seconds without wobbling?',
                options: [
                    { text: 'Yes, easily', score: 3 },
                    { text: 'Yes, with some effort', score: 2 },
                    { text: 'Barely', score: 1 },
                    { text: 'No, instant loss of balance', score: 0 }
                ]
            },
            {
                id: 9,
                text: 'Do you experience lower back pain after standing?',
                options: [
                    { text: 'Never', score: 3 },
                    { text: 'After a long time', score: 2 },
                    { text: 'Frequently', score: 1 },
                    { text: 'Almost immediately', score: 0 }
                ]
            },
            {
                id: 10,
                text: 'How often do you stretch your hips?',
                options: [
                    { text: 'Daily', score: 3 },
                    { text: 'Few times a week', score: 2 },
                    { text: 'Rarely', score: 1 },
                    { text: 'Never', score: 0 }
                ]
            }
        ],
        results: [
            { minScore: 0, maxScore: 10, title: 'Limited Mobility', message: 'Your hip mobility is significantly restricted. This may be contributing to back or knee pain. Recommendation: Incorporate a daily 10-minute mobility routine focusing on hip openers.' },
            { minScore: 11, maxScore: 20, title: 'Moderate Mobility', message: 'Your mobility is average. You have some tightness that could be improved. Recommendation: Add pigeons pose and lunges to your workouts.' },
            { minScore: 21, maxScore: 30, title: 'Excellent Mobility', message: 'Fantastic! Your hips are mobile, stable, and strong. Keep doing what you are doing to maintain this health.' }
        ]
    },
    {
        id: 'stress-check',
        title: 'Do Festivities Bring Excitement Or Anxiety?',
        description: 'Understand your emotional response to social gatherings and holiday seasons.',
        image: 'https://cdn-icons-png.flaticon.com/512/4202/4202831.png',
        color: 'bg-indigo-50',
        iconColor: 'text-indigo-500',
        questions: [
            {
                id: 1,
                text: 'When you receive a party invitation, what is your first reaction?',
                options: [
                    { text: 'Excitement! Can\'t wait.', score: 3 },
                    { text: 'Mixed feelings.', score: 2 },
                    { text: 'Indifference.', score: 1 },
                    { text: 'Dread and anxiety.', score: 0 }
                ]
            },
            {
                id: 2,
                text: 'How do you feel after a social event?',
                options: [
                    { text: 'Energized', score: 3 },
                    { text: 'A bit tired but happy', score: 2 },
                    { text: 'Neutral', score: 1 },
                    { text: 'Drained and exhausted', score: 0 }
                ]
            },
            {
                id: 3,
                text: 'Do you worry about what to wear or say days in advance?',
                options: [
                    { text: 'Never', score: 3 },
                    { text: 'Sometimes', score: 2 },
                    { text: 'Often', score: 1 },
                    { text: 'Always, it consumes me', score: 0 }
                ]
            },
            {
                id: 4,
                text: 'In a group, do you feel comfortable speaking up?',
                options: [
                    { text: 'Yes, always', score: 3 },
                    { text: 'Depends on the crowd', score: 2 },
                    { text: 'Rarely', score: 1 },
                    { text: 'Never, I stay silent', score: 0 }
                ]
            },
            {
                id: 5,
                text: 'Do you ever make up excuses to avoid going out?',
                options: [
                    { text: 'Never', score: 3 },
                    { text: 'Rarely', score: 2 },
                    { text: 'Sometimes', score: 1 },
                    { text: 'Frequently', score: 0 }
                ]
            },
            {
                id: 6,
                text: 'When entering a room full of people, you feel...',
                options: [
                    { text: 'Confident', score: 3 },
                    { text: 'Observant', score: 2 },
                    { text: 'Self-conscious', score: 1 },
                    { text: 'Panicked', score: 0 }
                ]
            },
            {
                id: 7,
                text: 'Do you replay conversations in your head afterwards?',
                options: [
                    { text: 'No, I move on', score: 3 },
                    { text: 'Sometimes', score: 2 },
                    { text: 'Often', score: 1 },
                    { text: 'Yes, obsessively', score: 0 }
                ]
            },
            {
                id: 8,
                text: 'Does the thought of small talk exhaust you?',
                options: [
                    { text: 'No, I enjoy it', score: 3 },
                    { text: 'It is okay in bursts', score: 2 },
                    { text: 'I dislike it', score: 1 },
                    { text: 'Yes, I hate it', score: 0 }
                ]
            },
            {
                id: 9,
                text: 'How often do you feel lonely immediately after being social?',
                options: [
                    { text: 'Never', score: 3 },
                    { text: 'Rarely', score: 2 },
                    { text: 'Sometimes', score: 1 },
                    { text: 'Often', score: 0 }
                ]
            },
            {
                id: 10,
                text: 'Do you prefer 1-on-1 hangouts over groups?',
                options: [
                    { text: 'Enjoy both equally', score: 3 },
                    { text: 'Slight preference for 1-on-1', score: 2 },
                    { text: 'Strong preference for 1-on-1', score: 1 },
                    { text: 'Would rather be alone', score: 0 }
                ]
            }
        ],
        results: [
            { minScore: 0, maxScore: 10, title: 'High Social Anxiety', message: 'Social situations seem to be a significant source of stress for you. Prioritize setting boundaries and consider speaking to a professional if it impacts your daily life.' },
            { minScore: 11, maxScore: 20, title: 'Mild Social Apprehension', message: 'You likely enjoy socializing but need meaningful downtime to recharge. Its known as being an "Ambivert" or sensitive introvert.' },
            { minScore: 21, maxScore: 30, title: 'Socially Confident', message: 'You navigate social situations with ease and likely draw energy from them. Keep enjoying your connections!' }
        ]
    },
    {
        id: 'food-choices',
        title: 'Am I Mindful Of The Environmental Impact Of Food?',
        description: 'Assess how your diet affects the planet and explore sustainable choices.',
        image: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png',
        color: 'bg-teal-50',
        iconColor: 'text-teal-500',
        questions: [
            {
                id: 1,
                text: 'How often do you eat red meat?',
                options: [
                    { text: 'Never / Rare', score: 3 },
                    { text: 'Once a week', score: 2 },
                    { text: 'Few times a week', score: 1 },
                    { text: 'Daily', score: 0 }
                ]
            },
            {
                id: 2,
                text: 'Do you buy local/seasonal produce?',
                options: [
                    { text: 'Always', score: 3 },
                    { text: 'Whenever possible', score: 2 },
                    { text: 'Rarely', score: 1 },
                    { text: 'Never pay attention', score: 0 }
                ]
            },
            {
                id: 3,
                text: 'How much food do you throw away weekly?',
                options: [
                    { text: 'Almost nothing', score: 3 },
                    { text: 'Very little', score: 2 },
                    { text: 'Some leftovers', score: 1 },
                    { text: 'A lot', score: 0 }
                ]
            },
            {
                id: 4,
                text: 'Do you use reusable bags for grocery shopping?',
                options: [
                    { text: 'Always', score: 3 },
                    { text: 'Most of the time', score: 2 },
                    { text: 'Sometimes', score: 1 },
                    { text: 'Never', score: 0 }
                ]
            },
            {
                id: 5,
                text: 'Do you prefer organic products?',
                options: [
                    { text: 'Yes, mostly', score: 3 },
                    { text: 'Occasionally', score: 2 },
                    { text: 'Rarely', score: 1 },
                    { text: 'No preference', score: 0 }
                ]
            },
            {
                id: 6,
                text: 'How often do you eat processed/packaged foods?',
                options: [
                    { text: 'Rarely', score: 3 },
                    { text: 'Sometimes', score: 2 },
                    { text: 'Often', score: 1 },
                    { text: 'Most meals', score: 0 }
                ]
            },
            {
                id: 7,
                text: 'Do you compost your food scraps?',
                options: [
                    { text: 'Yes, always', score: 3 },
                    { text: 'Sometimes', score: 2 },
                    { text: 'Planning to start', score: 1 },
                    { text: 'No', score: 0 }
                ]
            },
            {
                id: 8,
                text: 'Do you drink bottled water?',
                options: [
                    { text: 'No, reusable bottle only', score: 3 },
                    { text: 'Rarely', score: 2 },
                    { text: 'Sometimes', score: 1 },
                    { text: 'Yes, exclusively', score: 0 }
                ]
            },
            {
                id: 9,
                text: 'Are you aware of the "food miles" regarding what you buy?',
                options: [
                    { text: 'Yes, highly aware', score: 3 },
                    { text: 'Somewhat', score: 2 },
                    { text: 'Vaguely', score: 1 },
                    { text: 'No idea', score: 0 }
                ]
            },
            {
                id: 10,
                text: 'Have you tried growing your own food (herbs, veg)?',
                options: [
                    { text: 'Yes, currently do', score: 3 },
                    { text: 'In the past', score: 2 },
                    { text: 'Want to try', score: 1 },
                    { text: 'No interest', score: 0 }
                ]
            }
        ],
        results: [
            { minScore: 0, maxScore: 10, title: 'Room for Improvement', message: 'Your food choices have a significant environmental footprint. Try starting with one plant-based day a week and reducing plastic use.' },
            { minScore: 11, maxScore: 20, title: 'Conscious Consumer', message: 'You are making good efforts to be sustainable. Focus on reducing food waste and buying local to improve further.' },
            { minScore: 21, maxScore: 30, title: 'Eco-Champion', message: 'Excellent! Your diet and habits are very planet-friendly. You are a role model for sustainable living.' }
        ]
    },
    {
        id: 'seasonal-mood',
        title: 'Am I Experiencing Seasonal Mood Changes?',
        description: 'Check if the changing seasons are affecting your energy and mood levels.',
        image: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png',
        color: 'bg-sky-50',
        iconColor: 'text-sky-500',
        questions: [
            {
                id: 1,
                text: 'Do you feel more tired during winter months?',
                options: [
                    { text: 'No difference', score: 3 },
                    { text: 'Slightly more tired', score: 2 },
                    { text: 'Noticeably more tired', score: 1 },
                    { text: 'Extremely lethargic', score: 0 }
                ]
            },
            {
                id: 2,
                text: 'Does your appetite change with the seasons?',
                options: [
                    { text: 'No change', score: 3 },
                    { text: 'Crave slight comfort food', score: 2 },
                    { text: 'Crave carbs/sugar more', score: 1 },
                    { text: 'Insatiable cravings', score: 0 }
                ]
            },
            {
                id: 3,
                text: 'Do you enjoy social activities in winter?',
                options: [
                    { text: 'Yes, just as much', score: 3 },
                    { text: 'A little less', score: 2 },
                    { text: 'Prefer staying home', score: 1 },
                    { text: 'Avoid everyone', score: 0 }
                ]
            },
            {
                id: 4,
                text: 'How is your sleep quality in darker months?',
                options: [
                    { text: 'Great', score: 3 },
                    { text: 'Good', score: 2 },
                    { text: 'Hard to wake up', score: 1 },
                    { text: 'Oversleeping significantly', score: 0 }
                ]
            },
            {
                id: 5,
                text: 'Do you feel irritable during specific seasons?',
                options: [
                    { text: 'No', score: 3 },
                    { text: 'Rarely', score: 2 },
                    { text: 'Sometimes', score: 1 },
                    { text: 'Yes, very irritable', score: 0 }
                ]
            },
            {
                id: 6,
                text: 'Does your ability to concentrate change?',
                options: [
                    { text: 'No, always focused', score: 3 },
                    { text: 'Minimal change', score: 2 },
                    { text: 'Brain fog sometimes', score: 1 },
                    { text: 'Cannot focus at all', score: 0 }
                ]
            },
            {
                id: 7,
                text: 'Do you gain weight during winter?',
                options: [
                    { text: 'No', score: 3 },
                    { text: 'A pound or two', score: 2 },
                    { text: 'Noticeable gain', score: 1 },
                    { text: 'Significant gain', score: 0 }
                ]
            },
            {
                id: 8,
                text: 'Do you feel "down" or sad for no apparent reason in winter?',
                options: [
                    { text: 'Never', score: 3 },
                    { text: 'Rarely', score: 2 },
                    { text: 'Sometimes', score: 1 },
                    { text: 'Often', score: 0 }
                ]
            },
            {
                id: 9,
                text: 'Do you lose interest in hobbies during certain seasons?',
                options: [
                    { text: 'No', score: 3 },
                    { text: 'Slightly', score: 2 },
                    { text: 'Lose some interest', score: 1 },
                    { text: 'Total loss of interest', score: 0 }
                ]
            },
            {
                id: 10,
                text: 'Does getting sunlight improve your mood instantly?',
                options: [
                    { text: 'No effect', score: 3 },
                    { text: 'A little bit', score: 2 },
                    { text: 'Yes, definitely', score: 1 },
                    { text: 'It changes everything', score: 0 }
                ]
            }
        ],
        results: [
            { minScore: 0, maxScore: 10, title: 'High Seasonal Sensitivity', message: 'You may be experiencing symptoms of Seasonal Affective Disorder (SAD). Consider maximizing daylight exposure, exercise, and possibly light therapy.' },
            { minScore: 11, maxScore: 20, title: 'Moderate Sensitivity', message: 'You feel the seasons more than most. Try to maintain active routines and social connection even when you do not feel like it.' },
            { minScore: 21, maxScore: 30, title: 'Resilient', message: 'You maintain your mood and energy well regardless of the weather. That is a great strength!' }
        ]
    },
    {
        id: 'sleep-quality',
        title: 'How Restorative Is My Sleep?',
        description: 'Good sleep is the foundation of health. Evaluate your sleep hygiene and quality.',
        image: 'https://cdn-icons-png.flaticon.com/512/3094/3094837.png',
        color: 'bg-indigo-50',
        iconColor: 'text-indigo-500',
        questions: [
            { id: 1, text: 'How long does it take you to fall asleep?', options: [{ text: '< 20 mins', score: 3 }, { text: '20-40 mins', score: 2 }, { text: '45-60 mins', score: 1 }, { text: '> 1 hour', score: 0 }] },
            { id: 2, text: 'How often do you wake up during the night?', options: [{ text: 'Rarely', score: 3 }, { text: 'Once', score: 2 }, { text: '2-3 times', score: 1 }, { text: 'Every hour', score: 0 }] },
            { id: 3, text: 'Do you feel refreshed when you wake up?', options: [{ text: 'Always', score: 3 }, { text: 'Mostly', score: 2 }, { text: 'Rarely', score: 1 }, { text: 'Never', score: 0 }] },
            { id: 4, text: 'Do you snore or gasp for air?', options: [{ text: 'No', score: 3 }, { text: 'Mildly', score: 2 }, { text: 'Yes, partner complains', score: 1 }, { text: 'Yes, gasp often', score: 0 }] },
            { id: 5, text: 'Do you use screens (phone/TV) right before bed?', options: [{ text: 'No, stop 1hr before', score: 3 }, { text: 'Sometimes', score: 2 }, { text: 'Yes, until sleeping', score: 0 }] },
            { id: 6, text: 'How many hours do you sleep on average?', options: [{ text: '7-9 hours', score: 3 }, { text: '6-7 hours', score: 2 }, { text: '5-6 hours', score: 1 }, { text: '< 5 hours', score: 0 }] },
            { id: 7, text: 'Do you need caffeine to function before noon?', options: [{ text: 'No', score: 3 }, { text: 'A little', score: 2 }, { text: 'Yes, definitely', score: 1 }, { text: 'Require multiple cups', score: 0 }] },
            { id: 8, text: 'Is your bedroom environment dark and cool?', options: [{ text: 'Yes, perfect', score: 3 }, { text: 'Mostly', score: 2 }, { text: 'No, too bright/hot', score: 0 }] },
            { id: 9, text: 'Do you have a consistent sleep schedule?', options: [{ text: 'Yes, strict', score: 3 }, { text: 'Mostly', score: 2 }, { text: 'Weekends vary', score: 1 }, { text: 'No pattern', score: 0 }] },
            { id: 10, text: 'Do you nap during the day?', options: [{ text: 'No, or power naps', score: 3 }, { text: 'Sometimes', score: 2 }, { text: 'Long naps daily', score: 1 }, { text: 'Uncontrollable nodding', score: 0 }] }
        ],
        results: [
            { minScore: 0, maxScore: 10, title: 'Poor Sleep Hygiene', message: 'Your quality of sleep is low. Prioritize a dark room, no screens, and a consistent schedule.' },
            { minScore: 11, maxScore: 20, title: 'Average Sleeper', message: 'You sleep okay but could improve consistency to feel more energized.' },
            { minScore: 21, maxScore: 30, title: 'Sleep Master', message: 'You have excellent sleep habits. Keep prioritizing rest!' }
        ]
    },
    {
        id: 'burnout-risk',
        title: 'Am I At Risk Of Burnout?',
        description: 'Check if your work-life balance is tipping towards meaningful exhaustion.',
        image: 'https://cdn-icons-png.flaticon.com/512/2353/2353678.png',
        color: 'bg-orange-50',
        iconColor: 'text-orange-500',
        questions: [
            { id: 1, text: 'Do you feel emotionally drained from work?', options: [{ text: 'Never', score: 3 }, { text: 'Sometimes', score: 2 }, { text: 'Often', score: 1 }, { text: 'Always', score: 0 }] },
            { id: 2, text: 'Do you dread mondays?', options: [{ text: 'No', score: 3 }, { text: 'A little', score: 2 }, { text: 'Yes', score: 1 }, { text: 'Terrified', score: 0 }] },
            { id: 3, text: 'Can you relax after work hours?', options: [{ text: 'Easily', score: 3 }, { text: 'Takes a while', score: 2 }, { text: 'Hardly', score: 1 }, { text: 'Never', score: 0 }] },
            { id: 4, text: 'Are you becoming cynical or critical at work?', options: [{ text: 'No', score: 3 }, { text: 'Rarely', score: 2 }, { text: 'Increasingly', score: 1 }, { text: 'Very cynical', score: 0 }] },
            { id: 5, text: 'Do you have energy for hobbies?', options: [{ text: 'Yes, lots', score: 3 }, { text: 'Some', score: 2 }, { text: 'Ideally but too tired', score: 1 }, { text: 'None', score: 0 }] },
            { id: 6, text: 'How is your focus/productivity?', options: [{ text: 'Sharp', score: 3 }, { text: 'Okay', score: 2 }, { text: 'Struggling', score: 1 }, { text: 'Dropped significantly', score: 0 }] },
            { id: 7, text: 'Do you feel unappreciated?', options: [{ text: 'No, valued', score: 3 }, { text: 'Sometimes', score: 2 }, { text: 'Often', score: 1 }, { text: 'Constantly', score: 0 }] },
            { id: 8, text: 'Are you experiencing physical symptoms (headaches, stomach)?', options: [{ text: 'No', score: 3 }, { text: 'Rarely', score: 2 }, { text: 'Frequently', score: 1 }, { text: 'Daily', score: 0 }] },
            { id: 9, text: 'Do you skip meals or breaks to work?', options: [{ text: 'Never', score: 3 }, { text: 'Occasionally', score: 2 }, { text: 'Often', score: 1 }, { text: 'Always', score: 0 }] },
            { id: 10, text: 'Do you fantasize about quitting?', options: [{ text: 'No', score: 3 }, { text: 'Rarely', score: 2 }, { text: 'Sometimes', score: 1 }, { text: 'Every day', score: 0 }] }
        ],
        results: [
            { minScore: 0, maxScore: 10, title: 'High Burnout Risk', message: 'You are showing serious signs of burnout. Please speak to a supervisor or professional and prioritize rest immediately.' },
            { minScore: 11, maxScore: 20, title: 'Moderate Risk', message: 'You are stressed and nearing exhaustion. Set stricter boundaries now before it worsens.' },
            { minScore: 21, maxScore: 30, title: 'Balanced', message: 'You seem to have a healthy work-life balance. Keep noticing your needs.' }
        ]
    },
    {
        id: 'hydration',
        title: 'Are You Propery Hydrated?',
        description: 'Water is life. Assess if your daily habits are keeping you hydrated.',
        image: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png',
        color: 'bg-blue-50',
        iconColor: 'text-blue-500',
        questions: [
            { id: 1, text: 'How many glasses of water do you drink daily?', options: [{ text: '8+', score: 3 }, { text: '5-7', score: 2 }, { text: '3-4', score: 1 }, { text: '1-2', score: 0 }] },
            { id: 2, text: 'What color is your urine generally?', options: [{ text: 'Pale yellow/Clear', score: 3 }, { text: 'Yellow', score: 2 }, { text: 'Dark Yellow', score: 1 }, { text: 'Amber/Brown', score: 0 }] },
            { id: 3, text: 'Do you often feel thirsty?', options: [{ text: 'Rarely (I sip often)', score: 3 }, { text: 'Sometimes', score: 2 }, { text: 'Often', score: 1 }, { text: 'Always parched', score: 0 }] },
            { id: 4, text: 'Do you get headaches often?', options: [{ text: 'Rarely', score: 3 }, { text: 'Occasionally', score: 2 }, { text: 'Frequently', score: 0 }] },
            { id: 5, text: 'Do your lips feel dry or chapped?', options: [{ text: 'No, soft', score: 3 }, { text: 'Sometimes', score: 2 }, { text: 'Always', score: 0 }] },
            { id: 6, text: 'Do you drink water first thing in the morning?', options: [{ text: 'Yes, large glass', score: 3 }, { text: 'Sips', score: 2 }, { text: 'No', score: 0 }] },
            { id: 7, text: 'Do you rely on sugary drinks/soda?', options: [{ text: 'No', score: 3 }, { text: 'Occasionally', score: 2 }, { text: 'Daily habit', score: 0 }] },
            { id: 8, text: 'How is your skin elasticity?', options: [{ text: 'Good', score: 3 }, { text: 'Okay', score: 2 }, { text: 'Dry/doesn\'t bounce back', score: 0 }] },
            { id: 9, text: 'Do you feel fatigue mid-afternoon?', options: [{ text: 'Rarely', score: 3 }, { text: 'Sometimes', score: 2 }, { text: 'Usually', score: 0 }] },
            { id: 10, text: 'Do you carry a water bottle with you?', options: [{ text: 'Always', score: 3 }, { text: 'Usually', score: 2 }, { text: 'No', score: 0 }] }
        ],
        results: [
            { minScore: 0, maxScore: 10, title: 'Dehydrated', message: 'You are consistently dehydrated. This affects energy, skin, and brain function. Buy a water bottle today!' },
            { minScore: 11, maxScore: 20, title: 'Needs Improvement', message: 'You drink some water but likely not enough. Try setting reminders.' },
            { minScore: 21, maxScore: 30, title: 'Well Hydrated', message: 'Great job staying hydrated! Your body thanks you.' }
        ]
    },
    {
        id: 'digital-wellbeing',
        title: 'Is My Digital Life Healthy?',
        description: 'Screens are everywhere. Check if your tech usage is impacting your mental health.',
        image: 'https://cdn-icons-png.flaticon.com/512/3063/3063073.png',
        color: 'bg-purple-50',
        iconColor: 'text-purple-500',
        questions: [
            { id: 1, text: 'What is your daily screen time (phone)?', options: [{ text: '< 2 hours', score: 3 }, { text: '2-4 hours', score: 2 }, { text: '4-6 hours', score: 1 }, { text: '6+ hours', score: 0 }] },
            { id: 2, text: 'Do you check your phone immediately upon waking?', options: [{ text: 'No, usually wait', score: 3 }, { text: 'Within 15 mins', score: 2 }, { text: 'Instantly', score: 0 }] },
            { id: 3, text: 'Do you take tech-free breaks?', options: [{ text: 'Yes, daily', score: 3 }, { text: 'Sometimes', score: 2 }, { text: 'Rarely', score: 0 }] },
            { id: 4, text: 'Does social media make you feel bad about yourself?', options: [{ text: 'No', score: 3 }, { text: 'Occasionally', score: 2 }, { text: 'Often', score: 1 }, { text: 'Always', score: 0 }] },
            { id: 5, text: 'Do you use your phone while eating with others?', options: [{ text: 'Never', score: 3 }, { text: 'Rarely', score: 2 }, { text: 'Sometimes', score: 1 }, { text: 'Always', score: 0 }] },
            { id: 6, text: 'Do you feel phantom vibrations?', options: [{ text: 'No', score: 3 }, { text: 'Rarely', score: 2 }, { text: 'Yes', score: 0 }] },
            { id: 7, text: 'Can you watch a movie without checking your phone?', options: [{ text: 'Easily', score: 3 }, { text: 'With effort', score: 2 }, { text: 'No', score: 0 }] },
            { id: 8, text: 'Do you get anxious if you leave your phone at home?', options: [{ text: 'No', score: 3 }, { text: 'A little', score: 2 }, { text: 'Panic', score: 0 }] },
            { id: 9, text: 'Do you use night mode or blue light filters?', options: [{ text: 'Yes', score: 3 }, { text: 'Sometimes', score: 2 }, { text: 'No', score: 0 }] },
            { id: 10, text: 'Have people complained about your phone usage?', options: [{ text: 'Never', score: 3 }, { text: 'Once/Twice', score: 2 }, { text: 'Often', score: 0 }] }
        ],
        results: [
            { minScore: 0, maxScore: 10, title: 'Digital Overload', message: 'You may be addicted to your devices. Try a digital detox weekend or set app limits.' },
            { minScore: 11, maxScore: 20, title: 'Moderate User', message: 'You rely on tech but could be more mindful. Try no-phone dinners.' },
            { minScore: 21, maxScore: 30, title: 'Digital Minimalist', message: 'You have a very healthy, controlled relationship with technology.' }
        ]
    },
    {
        id: 'posture-check',
        title: 'How Is My Posture?',
        description: 'Slumping over a desk all day? Evaluate your posture health.',
        image: 'https://cdn-icons-png.flaticon.com/512/1654/1654193.png',
        color: 'bg-rose-50',
        iconColor: 'text-rose-500',
        questions: [
            { id: 1, text: 'Do you experience neck or shoulder pain?', options: [{ text: 'Rarely', score: 3 }, { text: 'After long days', score: 2 }, { text: 'Often', score: 1 }, { text: 'Chronic', score: 0 }] },
            { id: 2, text: 'How do you sit at your computer?', options: [{ text: 'Straight, feet flat', score: 3 }, { text: 'Slouching slightly', score: 2 }, { text: 'Hunched over', score: 0 }] },
            { id: 3, text: 'Do you look down at your phone constantly?', options: [{ text: 'No, eye level', score: 3 }, { text: 'Sometimes', score: 2 }, { text: 'Yes, "text neck"', score: 0 }] },
            { id: 4, text: 'Does your back hurt when standing for 15 mins?', options: [{ text: 'No', score: 3 }, { text: 'A little fatigue', score: 2 }, { text: 'Yes, pain', score: 0 }] },
            { id: 5, text: 'Are your shoulders rounded forward?', options: [{ text: 'No, back & down', score: 3 }, { text: 'Slightly', score: 2 }, { text: 'Yes, noticeably', score: 0 }] },
            { id: 6, text: 'Do you do back strengthening exercises?', options: [{ text: 'Regularly', score: 3 }, { text: 'Sporadically', score: 2 }, { text: 'Never', score: 0 }] },
            { id: 7, text: 'Is your workspace ergonomic?', options: [{ text: 'Fully setup', score: 3 }, { text: 'Kind of', score: 2 }, { text: 'Not at all', score: 0 }] },
            { id: 8, text: 'Do you get tension headaches?', options: [{ text: 'Never', score: 3 }, { text: 'Rarely', score: 2 }, { text: 'Often', score: 0 }] },
            { id: 9, text: 'Can you touch your hands behind your back (one over shoulder, one under)?', options: [{ text: 'Yes, fingers touch', score: 3 }, { text: 'Close', score: 2 }, { text: 'Not even close', score: 0 }] },
            { id: 10, text: 'Do you take breaks to stretch during work?', options: [{ text: 'Hourly', score: 3 }, { text: 'Couple times a day', score: 2 }, { text: 'Forget to move', score: 0 }] }
        ],
        results: [
            { minScore: 0, maxScore: 10, title: 'Poor Posture', message: 'Your posture habits are causing strain. Consult a PT or start corrective exercises immediately.' },
            { minScore: 11, maxScore: 20, title: 'Average Posture', message: 'You have some bad habits. Focus on "shoulders back" cues and ergonomic setup.' },
            { minScore: 21, maxScore: 30, title: 'Great Posture', message: 'You carry yourself well! Keep strengthening your core and back.' }
        ]
    }
];
