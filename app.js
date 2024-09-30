const navItens = [
    {
        name: "Home", href: "./pages/index.html"
    },
    {
        name: "About", href: "./pages/about.html"
    },
    {
        name: "Services", href: "./pages/services.html"
    },
    {
        name: "Design", href: "./pages/design.html"
    },
    {
        name: "Contact", href: "./pages/contact.html"
    }
];

function createNavBar() {
    // Get the navbar element
    const navBar = document.getElementById('navbar');

    // Iterate over the navItems array to create links
    navItems.forEach(item => {
        // Create an anchor (a) element
        const link = document.createElement('a');

        // Set the href attribute and the text content
        link.href = item.href;
        link.textContent = item.name;

        // Append the link to the nav bar
        navBar.appendChild(link);
    });
}

createNavBar();