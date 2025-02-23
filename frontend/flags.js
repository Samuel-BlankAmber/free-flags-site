document.addEventListener('DOMContentLoaded', () => {
  fetch('/flags.json')
    .then(response => response.json())
    .then(flagsData => {
      let numFlags = 0;
      const container = document.getElementById('flags-container');

      const sortedCategories = Object.keys(flagsData).sort((a, b) => {
        const aMaxDate = Math.max(
          ...Object.values(flagsData[a]).map(ch => new Date(ch.date))
        );
        const bMaxDate = Math.max(
          ...Object.values(flagsData[b]).map(ch => new Date(ch.date))
        );
        return bMaxDate - aMaxDate;
      });

      sortedCategories.forEach(category => {
        const section = document.createElement('section');
        section.className = 'category-section';

        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title blink';
        categoryTitle.textContent = category;
        section.appendChild(categoryTitle);

        const challengesArray = Object.entries(flagsData[category]).sort((a, b) => {
          return new Date(b[1].date) - new Date(a[1].date);
        });

        challengesArray.forEach(([challengeName, challengeData]) => {
          numFlags++;

          const challengeDiv = document.createElement('div');
          challengeDiv.className = 'challenge';

          const challengeNameSpan = document.createElement('span');
          challengeNameSpan.className = 'challenge-name';
          challengeNameSpan.textContent = `${challengeName.trim()}: `;

          const flagCode = document.createElement('span');
          flagCode.className = 'flag-code';
          flagCode.textContent = challengeData.flag;

          challengeDiv.appendChild(challengeNameSpan);
          challengeDiv.appendChild(flagCode);
          section.appendChild(challengeDiv);
        });

        container.appendChild(section);
      });
    })
    .catch(error => console.error('Error loading flags:', error));
});
