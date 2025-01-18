//const root = "/TESTERD3";

/*const navItens = [
    {
        name: "Home", href: `${root}/index,html`
    },
    {
        name: "About", href: `${root}/pages/about.html`
    },
    {
        name: "Services", href: `${root}/pages/services.html`
    },
    {
        name: "Design", href: `${root}/pages/design.html`
    },
    {
        name: "Contact", href: `${root}/pages/contact.html`
    }
];*/

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    // Store pages in an array
    const pages = [
        { name: 'Home', link: '/index.html' },
        { name: 'About', link: '/pages/about.html' },
        { name: 'Services', link: '/pages/services.html' },
        { name: 'Contact', link: '/pages/contact.html' },
        { name: 'Design', link: '/pages/design.html'}
    ];

    // Create a <ul> element for the navbar
    const navList = document.createElement('ul');

    // Loop through the pages array and create a list item for each page
    pages.forEach(page => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        // Set the link href and text content
        link.href = page.link;
        link.textContent = page.name;

        // Append the link to the list item
        listItem.appendChild(link);

        // Append the list item to the nav list
        navList.appendChild(listItem);
    });

    // Append the navigation list to the navbar
    navbar.appendChild(navList);
});

const width = 960, height = 600;

        // Append SVG element
        const svg = d3.select("#map")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Define projection and path generator
        const projection = d3.geoMercator()
            .center([-73.94, 40.70]) // Center of NYC
            .scale(55000) // Scale to zoom into NYC
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        // Define zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        svg.call(zoom); // Apply zoom behavior to the SVG

        // Load GeoJSON data (replace with a proper URL to NYC boroughs GeoJSON)
        const geoJsonUrl = 'https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson';

        d3.json(geoJsonUrl).then(function(data) {
            // Draw the map
            svg.append("g")
                .attr("class", "map")
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

            // Label boroughs
            svg.selectAll("text")
                .data(data.features)
                .enter()
                .append("text")
                .attr("x", d => path.centroid(d)[0])
                .attr("y", d => path.centroid(d)[1])
                .attr("text-anchor", "middle")
                .attr("fill", "black")
                .attr("font-size", "12px")
                .text(d => d.properties.borough);

        }).catch(error => console.error("Error loading GeoJSON:", error));

        // Zoom function to apply transformations
        function zoomed(event) {
            svg.selectAll('path')
                .attr('transform', event.transform);
        }
