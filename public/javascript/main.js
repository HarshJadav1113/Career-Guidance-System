
// Function to handle career assessment
function assessCareer() {
    const interests = document.getElementById('interests').selectedOptions;
    const skills = document.getElementById('skills').selectedOptions;

    const selectedInterests = Array.from(interests).map(option => option.value);
    const selectedSkills = Array.from(skills).map(option => option.value);

    // Mock data for career suggestions based on interests and skills
    const careerSuggestions = [
        {
            career: 'Software Developer',
            interests: ['technology'],
            skills: ['programming', 'analysis']
        },
        {
            career: 'Graphic Designer',
            interests: ['arts'],
            skills: ['design']
        },
        {
            career: 'Financial Analyst',
            interests: ['finance'],
            skills: ['analysis', 'financial-planning']
        },
        {
            career: 'Teacher',
            interests: ['education'],
            skills: ['teaching', 'communication']
        },
        {
            career: 'Environmental Scientist',
            interests: ['environment'],
            skills: ['research', 'environmental-science']
        },
        {
            career: 'Marketing Manager',
            interests: ['marketing'],
            skills: ['strategy', 'digital-marketing']
        },
        {
            career: 'Web Developer',
            interests: ['technology'],
            skills: ['web-development', 'frontend', 'backend']
        },
        {
            career: 'Nurse',
            interests: ['healthcare'],
            skills: ['patient-care', 'medical-knowledge']
        },
        {
            career: 'Lawyer',
            interests: ['law'],
            skills: ['legal-research', 'advocacy']
        },
        {
            career: 'Mechanical Engineer',
            interests: ['engineering'],
            skills: ['mechanical-design', 'problem-solving']
        },
        // Add more career suggestions as needed
    ];

    // Filter suggestions based on user input
    const suggestions = careerSuggestions.filter(suggestion =>
        selectedInterests.some(interest => suggestion.interests.includes(interest)) &&
        selectedSkills.some(skill => suggestion.skills.includes(skill))
    );

    displaySuggestions(suggestions);
}

// Function to display career suggestions
function displaySuggestions(suggestions) {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';

    if (suggestions.length === 0) {
        suggestionsList.innerHTML = '<p>No career suggestions found. Please refine your selections.</p>';
    } else {
        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.classList.add('suggestion');
            suggestionElement.innerHTML = `<h3>${suggestion.career}</h3>`;
            suggestionsList.appendChild(suggestionElement);
        });
    }
}

// Function to handle booking of career counseling
function bookCounseling() {
    alert('Thank you for your interest! Our team will contact you soon to schedule a counseling session.');
}

// Mock data for industry insights
const industryInsights = [
    {
        title: 'The Rise of Artificial Intelligence in Technology',
        description: 'Explore the impact of AI on various industries and the future job market.',
        link: '#'
    },
    {
        title: 'Sustainable Practices in the Modern Business World',
        description: 'Learn how businesses are incorporating sustainability into their operations.',
        link: '#'
    },
    {
        title: 'Healthcare Innovations: What to Expect in the Next Decade',
        description: 'Discover the latest trends and technologies shaping the healthcare industry.',
        link: '#'
    },
    // Add more mock data as needed
];

// Function to display industry insights
function displayIndustryInsights() {
    const insightsList = document.getElementById('insights-list');
    insightsList.innerHTML = '';

    industryInsights.forEach(insight => {
        const insightElement = document.createElement('div');
        insightElement.classList.add('insight');
        insightElement.innerHTML = `
            <h3>${insight.title}</h3>
            <p>${insight.description}</p>
            <a href="${insight.link}">Read more</a>
        `;
        insightsList.appendChild(insightElement);
    });
}

// Initialize the page with industry insights
document.addEventListener('DOMContentLoaded', () => {
    displayIndustryInsights();
});
