//Functions

const getSaveProducts = () => {
    const productJSON = localStorage.getItem('products')
    return productJSON !== null ? JSON.parse(productJSON) : []
}

const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products))
}

const removeProduct = (id) => {
    const productIndex = products.findIndex(item => item.id === id)
    if(productIndex > -1){
        products.splice(productIndex,1)
    }

}
//for toggle when checkbox clicked 
const toggleProduct = (id) => {
    const product = products.find(item => item.id === id)
    if (product !== undefined) {
        product.exist = !product.exist
    }
}

const sortProducts = (products, sortBy) => {
    if (sortBy === 'byEdited') {
        return products.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1
            } else if (a.updated < b.updated) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return products.sort((a,b) => {
            if(a.created > b.created) {
                return -1
            } else if(a.created < b.created) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return products
    }
}
const renderProducts = (products, filters) => {
    products = sortProducts(products, filters.sortBy)
    let filteredProducts = products.filter((item) => {    
        return item.title.toLowerCase().includes(filters.searchItems.toLowerCase())
    })
    filteredProducts = filteredProducts.filter((item) => {
        if(filters.availableProducts) {
            return item.exist
        } else {
            return true
        }
    })

    document.querySelector('#result').innerHTML = ''
    filteredProducts.forEach((item) => {
        document.querySelector('#result').appendChild(createProductDOM(item))
    })
}

const createProductDOM = (product) => {
    const productEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const productItem = document.createElement('a')
    const removeButton = document.createElement('button')
    const productPrice = document.createElement('p')

    checkbox.setAttribute('type','checkbox')
    checkbox.checked = !product.exist //when click checkbox exist = false
    productEl.appendChild(checkbox)
    checkbox.addEventListener('change',() => {
        toggleProduct(product.id)
        saveProducts(products)
        renderProducts(products, filters)
    })

    productItem.textContent = product.title
    productItem.setAttribute('href', `./edit-product.html#${product.id}`)
    productEl.appendChild(productItem)

    productEl.setAttribute('class', 'product-row')

    productPrice.textContent = `${product.price} تومان`
    productEl.appendChild(productPrice)

    removeButton.textContent = 'حذف'
    productEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeProduct(product.id)
        saveProducts(products)
        renderProducts(products,filters)
    })

    return productEl
}

const LastEditMessage = (timestamp) => {
    return `آخرین ویرایش: ${moment(timestamp).locale('fa').fromNow()}`
}