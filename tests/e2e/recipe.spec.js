const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Cooking By The Book Recipe E2E', () => {
    test.beforeAll( async ({ requestUtils }) => {
        await requestUtils.activatePlugin( 'Cooking-By-The-Book' );
    });

    test( 'Should create a new recipe post', async ({ admin, editor, page }) => {
        await admin.createNewPost( { postType: 'cbtb_recipe' } );

        await editor.canvas.locator( 'h1[aria-label="Add title"]' ).fill( 'My Playwright Recipe' );
        await page.keyboard.press( 'Enter' );
        await page.keyboard.type( 'This is an end-to-end test recipe.' );

        await editor.publishPost();

        const successNotice = page.locator( '.components-snackbar' );
        await expect( successNotice ).toContainText( 'Post published' );

        await page.goto( await page.locator( '.components-snackbar a' ).getAttribute('href') );
        await expect( page.locator( '.entry-title' ) ).toHaveText( 'My Playwright Recipe' );
    });
});
