const STAR = 'M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'
const FILLED_STAR = 'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'
const HALF_STAR = 'M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z'

const rateProto = Object.create(HTMLElement.prototype)
/**
 * custom html element handle rate with stars
 */
class Rate extends HTMLElement {

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    // add 5 stars to the page
    // light the star <= value 
    connectedCallback() {
        this.readonly = this.getAttribute('readonly') != null
        let value = this.getAttribute('value')
        this.value = value ? parseInt(value) : 4
        value = this.value
        while (value-- > 0)
            this.shadow.appendChild(this.createStar({ type: 'FILLED_STAR' }))
        let rest = 5 - this.value
        while (rest-- > 0)
            this.shadow.appendChild(this.createStar({ type: 'STAR' }))
        if (!this.readonly) this.addClickEvent()
    }

    static get observedAttributes() { return ['value', 'readonly']; }

    // update the stars with the new changes (changed attributes)
    attributeChangedCallback(name, _, value) {
        if (name = 'value') this.value = value ? parseInt(value) : 3
        else this[name] = value
        this.updateStars(this.value)
    }

    // create star element based on type
    // star it's just an svg element
    // it can be STAR (empty)
    // or FILLED_STAR (filled)
    // or HALF_STAR (half empty)
    // setting the cursor to pointer if not readonly
    createStar({ type, width = 20, height = 20, fill = "#ffc107" }) {
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        star.setAttribute('width', width)
        star.setAttribute('height', height)
        star.setAttribute('fill', fill)
        star.setAttribute('viewBox', '0 0 16 16')
        star.style.padding = '2px'
        if (!this.readonly) star.style.cursor = 'pointer'
        const star_path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        if (type == 'FILLED_STAR') star_path.setAttribute('d', FILLED_STAR)
        else if (type == 'HALF_STAR') star_path.setAttribute('d', HALF_STAR)
        else star_path.setAttribute('d', STAR)
        star.appendChild(star_path)
        return star
    }

    // listen to click event on the custom element
    // get the rating based on which star clicked
    // light stars before <= rating
    // fire onchange event
    addClickEvent() {
        this.shadow.addEventListener('click', ({ path }) => {
            const value = this.getRating(path)
            if (value == this.value) this.value = 0
            else this.value = value
            this.updateStars(this.value)
            if (this.onchange) this.onchange({ target: this })
        }, true)
    }

    // look foor the clicked star
    // by comparing the list of the stars
    // with clicked stars
    getRating(path) {
        // get the clicked star
        // if the last clicked element is path (inside the star)
        // must get the parent (star it self)
        const clickedNode = path[0].tagName == 'path' ? path[1] : path[0]
        // convert iterator to list
        const nodelist = Array.from(this.shadow.children)
        return nodelist.indexOf(clickedNode) + 1
    }

    // update the stars based on rating as index
    updateStars(rating) {
        // convert iterator to list
        const nodelist = Array.from(this.shadow.children)
        // light stars before <= rating
        nodelist.forEach((node, index) =>
            this.shadow.replaceChild(this.createStar({ type: index + 1 > rating ? "STAR" : "FILLED_STAR" }), node)
        )
    }
}
// define custom element as rate-me tag
customElements.define('rate-me', Rate, {})