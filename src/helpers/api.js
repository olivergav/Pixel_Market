export async function handleDataFromAPI({
    endpoint,
    method = 'GET',
    body,
    credentials = false,
} = {}) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    if (body !== undefined) {
        options['body'] = JSON.stringify(body)
    }

    if (credentials) {
        options.headers['Authorization'] = `Bearer ${credentials}`
    }

    const response = await fetch(`/${endpoint}`, options)

    if (response.status === 401) {
        throw new Error('User is not logged in')
    }

    return await response.json()
}

export const getAllProductData = async (id, credentials) => {
    const data = await handleDataFromAPI({
        endpoint: `v1/products/${id}`,
        credentials,
    })

    const [comments, opinions, category, subcategory] = await Promise.all([
        handleDataFromAPI({
            endpoint: `v1/comments?${data.comments
                .map((comment) => 'id=' + comment)
                .join('&')}`,
            credentials,
        }),
        handleDataFromAPI({
            endpoint: `v1/opinions?${data.opinions
                .map((opinion) => 'id=' + opinion)
                .join('&')}`,
            credentials,
        }),
        handleDataFromAPI({
            endpoint: `v1/categories/${data.category}`,
            credentials,
        }),
        handleDataFromAPI({
            endpoint: `v1/subcategories/${data.subcategory}`,
            credentials,
        }),
    ])

    return new Promise((resolve, reject) => {
        resolve({
            ...data,
            comments,
            opinions,
            category: category.name,
            subcategory: subcategory.name,
        })
    })
}
