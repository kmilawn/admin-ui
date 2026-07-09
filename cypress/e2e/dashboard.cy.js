describe('Dashboard Page - End to End Test', () => {
  
  beforeEach(() => {
    // Login terlebih dahulu sebelum mengakses dashboard
    cy.visit("http://localhost:5173/");
    
    // Isi form login
    cy.get('input[name="email"]').type('hello@example.com');
    cy.get('input[name="password"]').type('123456');
    
    // Klik tombol login
    cy.get('button[type="submit"]').click();
    
    // Tunggu redirect ke dashboard
    cy.url().should('include', '/');
  });

  it('User dapat mengakses halaman dashboard (overview)', () => {
    // 1. Verifikasi URL dashboard
    cy.url().should('http://localhost:5173/');
    
    // 2. Verifikasi elemen header
    cy.get('header').should('be.visible');
    cy.get('header').contains('John Doe').should('be.visible');
    
    // 3. Verifikasi sidebar navigasi
    cy.get('aside').should('be.visible');
    cy.get('aside').contains('Overview').should('be.visible');
    cy.get('aside').contains('Balances').should('be.visible');
    cy.get('aside').contains('Transaction').should('be.visible');
    cy.get('aside').contains('Bills').should('be.visible');
    cy.get('aside').contains('Expenses').should('be.visible');
    cy.get('aside').contains('Goals').should('be.visible');
    cy.get('aside').contains('Settings').should('be.visible');
    
    // 4. Verifikasi Card di dashboard
    // Card Balance
    cy.get('[data-testid="card-balance"]').should('be.visible');
    cy.get('[data-testid="card-balance"]').contains('Total Balance').should('be.visible');
    
    // Card Goals
    cy.get('[data-testid="card-goals"]').should('be.visible');
    cy.get('[data-testid="card-goals"]').contains('Goals').should('be.visible');
    
    // Card Upcoming Bill
    cy.get('[data-testid="card-upcoming-bill"]').should('be.visible');
    cy.get('[data-testid="card-upcoming-bill"]').contains('Upcoming Bill').should('be.visible');
    
    // Card Recent Transaction
    cy.get('[data-testid="card-recent-transaction"]').should('be.visible');
    cy.get('[data-testid="card-recent-transaction"]').contains('Recent Transaction').should('be.visible');
    
    // Card Statistics
    cy.get('[data-testid="card-statistics"]').should('be.visible');
    cy.get('[data-testid="card-statistics"]').contains('Statistics').should('be.visible');
    
    // Card Expense Breakdown
    cy.get('[data-testid="card-expense-breakdown"]').should('be.visible');
    cy.get('[data-testid="card-expense-breakdown"]').contains('Expenses Breakdown').should('be.visible');
  });

  it('User dapat melihat data pada Card Balance', () => {
    cy.get('[data-testid="card-balance"]').within(() => {
      cy.contains('Total Balance').should('be.visible');
      cy.contains('$25,000').should('be.visible');
      cy.contains('Account Type').should('be.visible');
      cy.contains('Credit Card').should('be.visible');
    });
  });

  it('User dapat melihat data pada Card Goals', () => {
    cy.get('[data-testid="card-goals"]').within(() => {
      cy.contains('Goals').should('be.visible');
      // Tunggu data loading selesai jika ada
      cy.get('.MuiCircularProgress-root', { timeout: 10000 }).should('not.exist');
      cy.contains('Target Achieved').should('be.visible');
      cy.contains('This Month Target').should('be.visible');
    });
  });

  it('User dapat melihat data pada Card Upcoming Bill', () => {
    cy.get('[data-testid="card-upcoming-bill"]').within(() => {
      cy.contains('Upcoming Bill').should('be.visible');
      // Tunggu data loading selesai jika ada
      cy.get('.MuiCircularProgress-root', { timeout: 10000 }).should('not.exist');
      cy.contains('Figma - Yearly Plan').should('be.visible');
      cy.contains('Adobe Inc - Yearly Plan').should('be.visible');
    });
  });

  it('User dapat melihat data pada Card Recent Transaction', () => {
    cy.get('[data-testid="card-recent-transaction"]').within(() => {
      cy.contains('Recent Transaction').should('be.visible');
      cy.contains('GTR 5').should('be.visible');
      cy.contains('Polo Shirt').should('be.visible');
      cy.contains('Biriyani').should('be.visible');
      cy.contains('Movie Ticket').should('be.visible');
    });
  });

  it('User dapat melihat data pada Card Statistics', () => {
    cy.get('[data-testid="card-statistics"]').within(() => {
      cy.contains('Statistics').should('be.visible');
      cy.contains('Weekly Comparison').should('be.visible');
    });
  });

  it('User dapat melihat data pada Card Expense Breakdown', () => {
    cy.get('[data-testid="card-expense-breakdown"]').within(() => {
      cy.contains('Expenses Breakdown').should('be.visible');
      cy.contains('Housing').should('be.visible');
      cy.contains('Food').should('be.visible');
      cy.contains('Transportation').should('be.visible');
      cy.contains('Entertainment').should('be.visible');
      cy.contains('Shopping').should('be.visible');
      cy.contains('Others').should('be.visible');
    });
  });

  it('User dapat melihat sidebar navigation yang aktif', () => {
    // Overview harus aktif (warna primary)
    cy.get('aside').contains('Overview')
      .parent()
      .should('have.class', 'bg-primary');
  });

  it('User dapat logout dari dashboard', () => {
    cy.get('aside').contains('Logout').click();
    
    // Backdrop muncul
    cy.get('.MuiBackdrop-root').should('be.visible');
    cy.contains('Logging Out...').should('be.visible');
    
    // Redirect ke login
    cy.url().should('include', '/login', { timeout: 5000 });
  });

});