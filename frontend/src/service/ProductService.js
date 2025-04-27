const path = "http://localhost:8080"

const getProductsList = async () => {
    const response = await fetch(`${path}/products`, {
        method : "GET"
    });
    return response.json();
}

export {getProductsList};