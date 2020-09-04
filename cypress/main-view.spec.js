const { createYield } = require("typescript")

describe('Main window', () => {
    it('Its has de correct header and in Spanish by default', () => {
        cy.visit('http://localhost:4200');
        cy.contains('WishlistCoursera'); //Verifica encabezado en toda la pagina
        cy.get('h1 b').should('contain', 'TRADUCIR es');
        //Contains de un texto dentro inner HTML
    });
});