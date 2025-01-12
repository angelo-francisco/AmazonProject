class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id
    this.image = productDetails.image
    this.name = productDetails.name
    this.rating = productDetails.rating
    this.priceCents = productDetails.priceCents
    this.keywords = productDetails.keywords
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice() {
    return (Math.round(this.priceCents) / 100).toFixed(2)
  }

  extraInfo() { return '' }
}

// inheritance with 'extends <super class>'
export class Clothing extends Product {
  constructor(productDetails) {
    super(productDetails)

    this.sizeChartLink = productDetails.sizeChartLink
  }

  // overriding
  extraInfo() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`
  }
}

export let products = []

export function loadProducts(func) {
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((details) => {
      return (
        details.type && details.type === 'clothing' ?
          new Clothing(details) :
          new Product(details))
    })
    func()
  })

  xhr.open('get', 'https://supersimplebackend.dev/products/')
  xhr.send()
}



// const date = new Date()

// console.log(date.toLocaleDateString())

// changing this to whatever we want
// function logThis() {
//   console.log(this)
// }

// logThis()
// logThis.call('Changing this')