describe('Search page', () => {
  it('sets "Search by" to "Title" by default', () => {
    cy.visit('/')

    cy
      .get('form[name="search-form"]')
      .as('form')
      .find('[name="searchBy"]')
      .filter('[value="title"]')
      .should('be.checked')
  })

  it('sets "Sort by" to "release date" by default', () => {
    cy.visit('/')

    cy
      .get('[data-cy="search-results-panel"]')
      .find('[name="sortBy"]')
      .filter('[value="release_date"]')
      .should('be.checked')
  })

  it('displays 15 films by default', () => {
    cy.visit('/')

    cy
      .get('[data-cy="film-grid"]')
      .find('[data-cy="film-grid-item"]')
      .should('have.length', 15)
  })

  it('performs search by title', () => {
    cy.visit('/')

    cy
      .get('form[name="search-form"]')
      .as('form')
      .find('input[name="search"]')
      .type('spirited away')
      .should('have.value', 'spirited away')

    cy.get('@form').submit()

    cy
      .get('[data-cy="film-grid"]')
      .should('have.length', 1)
      .contains('Spirited Away')
  })

  it('performs search by genre', () => {
    cy.visit('/')

    cy
      .get('form[name="search-form"]')
      .as('form')
      .find('[name="searchBy"]')
      .check('genres')

    cy
      .get('@form')
      .find('input[name="search"]')
      .type('Horror{enter}')

    cy
      .get('[data-cy="film-grid"]')
      .should('have.length', 1)
      .contains('Truth or Dare')
  })

  it('performs sort by rating', () => {
    cy.visit('/')

    cy
      .get('[data-cy="search-results-panel"]')
      .find('[name="sortBy"]')
      .check('vote_average')

    cy
      .get('[data-cy="film-grid"]')
      .find('[data-cy="film-grid-item"]')
      .first()
      .contains('Gemini')
  })
})
