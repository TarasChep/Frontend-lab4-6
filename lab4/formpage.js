document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("flowerOrderForm");
    const filterBtn = document.querySelector('.filter-btn');
    const filterInputs = document.querySelectorAll('.filter-input');
    const resultContainer = document.querySelector('.survey-results');

    filterBtn.addEventListener('click', () => {
        const filters = {};
        filterInputs.forEach((filter) => {
            filters[filter.name] = filter.value;
        });
        const data = getSurveyResults();
        filter(data, filters, resultContainer);
    });

    onSubmit(form);
});

const saveSurveyResult = (result) => {
    let surveyResults = JSON.parse(localStorage.getItem('surveyResults')) || [];
    surveyResults.push(result);
    localStorage.setItem('surveyResults', JSON.stringify(surveyResults));
};

const getSurveyResults = () => {
    return JSON.parse(localStorage.getItem('surveyResults')) || [];
};

const onSubmit = (form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        saveSurveyResult(formObject);
        form.reset();
        alert('Ваші дані успішно збережено!');
    });
};

function filter(data, filters, resultContainer) {
    if (!data) {
        alert('No data to filter');
        return;
    }
    const filteredData = data.filter((submission) => {
        let match = true;
        const keys = Object.keys(filters);
        keys.forEach(key => {
            if (key === 'flowers') {
                if (filters[key] !== '' && submission[key] !== filters[key]) {
                    match = false;
                }
            } else {
                if (filters[key] !== '' && submission[key] !== filters[key]) {
                    match = false;
                }
            }
        });
        return match;
    });

    resultContainer.innerHTML = '';
    filteredData.forEach(element => {
        const li = document.createElement('li');
        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                const span = document.createElement('span');
                span.textContent = `${key}: ${element[key]}`;
                li.appendChild(span);
                li.appendChild(document.createElement('br'));
            }
        }
        resultContainer.appendChild(li);
    });
}



