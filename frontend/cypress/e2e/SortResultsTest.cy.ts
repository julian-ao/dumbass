import { expect } from 'chai';

describe('Check that sort functionality works correct', () => {
    it('Sort on alphabetical and check that the results is sorted correct', () => {
        cy.visit('http://localhost:5173/project2/search?filter=song&sort=relevance');

        // Search for "Fa" and change sort to "Alphabetical" and check they are sorted correctly
        cy.get('#searchInput').type('Fa');
        cy.get('#search-button').click();
        cy.get('#sort-button').click();
        cy.get('#sort-option-3').click();

        const songsArray: string[] = [];
        const songsArraySorted: string[] = [];

        cy.get('article').each((article) => {
            // Use jQuery method to find the 'h2' element within the current article
            const h2Element = Cypress.$(article).find('h2');
            const songText = h2Element.text();
            songsArray.push(songText);
            songsArraySorted.push(songText);
        })
        .then(() => {
            // Sort the array for comparison
            songsArraySorted.sort();
            expect(songsArray).to.deep.equal(songsArraySorted);
        });

        for (let i = 0; i < 10; i++) {
            cy.get('#next-pagination-button').should('exist').click();
        }

        const songsArray2: string[] = [];
        const songsArraySorted2: string[] = [];

        cy.get('article').each((article) => {
            // Use jQuery method to find the 'h2' element within the current article
            const h2Element = Cypress.$(article).find('h2');
            const songText = h2Element.text();
            songsArray2.push(songText);
            songsArraySorted2.push(songText);
        })
        .then(() => {
            // Sort the array for comparison
            songsArraySorted2.sort();
            expect(songsArray2).to.deep.equal(songsArraySorted2);
        });
    });

    it('Sort on rating and check that the results is sorted correct', () => {
        cy.visit('http://localhost:5173/project2/search?filter=song&sort=relevance');

        // Search for "a" and change sort to "Rating" and check they are sorted correctly
        cy.get('#searchInput').type('a');
        cy.get('#search-button').click();
        cy.get('#sort-button').click();
        cy.get('#sort-option-2').click();

        const songsArray: number[] = [];
        const songsArraySorted: number[] = [];

        cy.get('article').each((article) => {
            // Use jQuery method to find the 'h2' element within the current article
            const ratingElement = Cypress.$(article).find('.cardRating');
            const ratingText = ratingElement.text();
            const rating = parseFloat(ratingText);
            songsArray.push(rating);
            songsArraySorted.push(rating);
        })
        .then(() => {
            // Sort the array for comparison
            songsArraySorted.sort((a, b) => b - a);
            expect(songsArray).to.deep.equal(songsArraySorted);
        });

        // Search for "l" on artists and change sort to "Rating" and check they are sorted correctly
        cy.visit('http://localhost:5173/project2/search?filter=artist&sort=relevance');
        cy.get('#searchInput').type('l');
        cy.get('#filter-button').click();
        cy.contains('button', 'Artist').click();
        cy.get('#search-button').click();
        cy.get('#sort-button').click();
        cy.get('#sort-option-2').click();

        const songsArray2: number[] = [];
        const songsArraySorted2: number[] = [];

        cy.get('article').each((article) => {
            // Use jQuery method to find the 'h2' element within the current article
            const ratingElement = Cypress.$(article).find('.cardRating');
            const ratingText = ratingElement.text();
            const rating = parseFloat(ratingText);
            songsArray2.push(rating);
            songsArraySorted2.push(rating);
        })
        .then(() => {
            // Sort the array for comparison
            songsArraySorted2.sort((a, b) => b - a);
            expect(songsArray2).to.deep.equal(songsArraySorted2);
        });
    });
})