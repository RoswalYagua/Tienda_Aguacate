/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app');



//Web API


//API Internacionalizacion:
// 1 - format fechas
// 2 - format modenas
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD'
    }).format(price);

    return newPrice;
};

// async/await
    /*
    const url = "https://platzi-avo.vercel.app/api/avo";

    //web api
    async function fetchData() {
    const response = await fetch(url),
    data = await response.json(),
    allItems = [];

    data.data.forEach((item) => {
        // create image
        const image = document.createElement("img");
        // create title
        const title = document.createElement("h2");
        // create price
        const price = document.createElement("div");

        const container = document.createElement("div");
        container.append(image, title, price);

        allItems.push(container);
    });

    document.body.append(...allItems)
    }

    fetchData();
    */

//promise
//Conectarse al servidor
window
    .fetch(`${baseUrl}/api/avo`)
    //Procesar la respuesta, y convertirla en JSON
    .then(respuesta => respuesta.json())
    //JSON -> Data -> Renderizar info browser
    .then((responseJson) => {
        const todosLosItems = []
        responseJson.data.forEach(item => {
            //Imagen
            const imagen = document.createElement('img');
            imagen.src = `${baseUrl}${item.image}`;
            imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

            //Titulo
            const title = document.createElement('h2');
            title.textContent = item.name;
            title.className = "text-lg";
            
            //Precio
            const price = document.createElement('div');
            price.textContent = formatPrice(item.price);
            price.className = "text-gray-600";

            //Precio y Titulo
            const priceAndTitle = document.createElement("div");
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.append(title, price);

            //Card
            const container = document.createElement('div');
            container.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300 md:w-96";
            container.appendChild(imagen);
            container.appendChild(priceAndTitle);

            todosLosItems.push(container)
        });

        appNode.append(...todosLosItems);

        appNode.className = "mt-20 flex flex-col md:flex-row md:flex-wrap gap-5 md:justify-around"
    });