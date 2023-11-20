const taylorSwiftGoodReviews = [
  'Taylor Swift is a musical genius! 5 stars',
  'I love Taylor Swift\'s latest album. Amazing work!',
  'Taylor Swift never disappoints. Every song is a masterpiece.',
  'Taylor Swift\'s lyrics are so relatable. I can connect with every song.',
  'Taylor Swift has a voice of an angel. Her music is pure magic. 5 stars'
];

describe('Login and rate Taylor Swift', () => {
  it('logs in, searches for and rates Taylor swift to 5 stars', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/project2/login/');

    // Log in with username "hei" and password "123"
    cy.get('#username').type('hei');
    cy.get('#password').type('123');
    cy.get('form').submit();

    // Changing the filter to "artist"
    // Select "artist" from the filter dropdown
    cy.get('#filter-button').click();
    cy.contains('button', 'Artist').click();

    // Search for "Taylor"
    cy.get('#searchInput').type('Taylor Swift');
    cy.get('#search-button').click();

    // Choose the first result
    cy.get('article').first().find('h2').click();

    // Check if the URL contains "artist"
    cy.url().should('include', '/artist/1177');

    // Click on the review button and write a review with 5 stars
    cy.get('#tab-button1').click();
    cy.get('#star-5').click();

    // Choose a random review from the list of good reviews
    const randomIndex = Math.floor(Math.random() * taylorSwiftGoodReviews.length);
    const randomReview = taylorSwiftGoodReviews[randomIndex];
    cy.get('#yourReview').type(randomReview);
    cy.get('#submitReview').click();

    // Sign out user
    cy.get('#user-menu-button').click();
    cy.get('#sign-out-button').click();
    cy.contains('Successfully signed out').should('be.visible');
  });

  afterEach(() => {
        const reviewTargetId = 1177;
        cy.request({
          method: 'POST',
          url: 'http://localhost:8000/graphql',
          body: {
            query: `
              mutation ($userName: String!, $targetType: String!, $targetId: Int!) {
                deleteReview(userName: $userName, targetType: $targetType, targetId: $targetId)
              }
            `,
            variables: {
              userName: 'hei',
              targetType: 'artist',
              targetId: reviewTargetId
            }
          }
        });
  });
});

describe('Login and rate Empire State of Mind', () => {
  it('logs in, searches for and rates Empire state of mind to 1 star', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/project2/login/');

    // Log in with username "hei" and password "123"
    cy.get('#username').type('hei');
    cy.get('#password').type('123');
    cy.get('form').submit();

    // Search for "empire state"
    cy.get('#searchInput').type('Empire State');
    cy.get('#search-button').click();

    // Choose the first result
    cy.get('article').first().find('h2').click();

    // Check if the URL contains "artist"
    cy.url().should('include', '/song/75');

    // Click on the review button and write a review with 5 stars
    cy.get('#tab-button1').click();
    cy.get('#star-1').click();

    cy.get('#yourReview').type("This song is overrated....");
    cy.get('#submitReview').click();

    // Sign out user
    cy.get('#user-menu-button').click();
    cy.get('#sign-out-button').click();
    cy.contains('Successfully signed out').should('be.visible');
  });

  afterEach(() => {
        const reviewTargetId = 75;
        cy.request({
          method: 'POST',
          url: 'http://localhost:8000/graphql',
          body: {
            query: `
              mutation ($userName: String!, $targetType: String!, $targetId: Int!) {
                deleteReview(userName: $userName, targetType: $targetType, targetId: $targetId)
              }
            `,
            variables: {
              userName: 'hei',
              targetType: 'song',
              targetId: reviewTargetId
            }
          }
        });
  });
});
